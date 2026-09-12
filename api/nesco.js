// ── NESCO prepaid proxy (Vercel serverless) ─────────────────────────────────
// Mirrors the official customer.nesco.gov.bd form flow:
//   GET /pre/panel → CSRF token + session cookies → POST form → parse HTML.
// Query: /api/nesco?customer=XXXX&action=all|balance|customer|recharge|consumption

const PANEL_URL = 'https://customer.nesco.gov.bd/pre/panel';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36';
const SUBMIT_RECHARGE = 'রিচার্জ হিস্ট্রি';
const SUBMIT_CONSUMPTION = 'মাসিক ব্যবহার';

function stripTags(s) {
  return String(s || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseCsrf(html) {
  const m1 = html.match(/<meta[^>]*name=["']csrf-token["'][^>]*content=["']([^"']+)["']/i);
  if (m1) return m1[1];
  const m2 = html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']csrf-token["']/i);
  return m2 ? m2[1] : null;
}

function collectCookies(res, jar) {
  const setCookies =
    typeof res.headers.getSetCookie === 'function' ? res.headers.getSetCookie() : [];
  for (const c of setCookies) {
    const pair = c.split(';')[0];
    const eq = pair.indexOf('=');
    if (eq > 0) jar.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim());
  }
}

function cookieHeader(jar) {
  return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join('; ');
}

// pair each <label> with the next unused <input> after it (like BeautifulSoup find_next)
function pairLabelsInputs(html) {
  const labels = [...html.matchAll(/<label\b[^>]*>([\s\S]*?)<\/label>/gi)].map((m) => ({
    text: stripTags(m[1]),
    index: m.index,
  }));
  const inputs = [...html.matchAll(/<input\b[^>]*>/gi)].map((m) => {
    const tag = m[0];
    const vm = tag.match(/\bvalue\s*=\s*"([^"]*)"/i) || tag.match(/\bvalue\s*=\s*'([^']*)'/i);
    return { value: (vm ? vm[1] : '').trim(), index: m.index, used: false };
  });
  return labels
    .map((l) => {
      const inp = inputs.find((i) => !i.used && i.index > l.index);
      if (inp) inp.used = true;
      return { label: l.text, value: inp ? inp.value : '' };
    })
    .filter((p) => p.label);
}

function parseTable(html) {
  const tm = html.match(
    /<table\b[^>]*class=["'][^"']*bfont_post[^"']*["'][^>]*>([\s\S]*?)<\/table>/i
  );
  if (!tm) return { headers: [], rows: [] };
  const body = tm[1];
  const thead = (body.match(/<thead\b[^>]*>([\s\S]*?)<\/thead>/i) || [])[1] || '';
  const tbody = (body.match(/<tbody\b[^>]*>([\s\S]*?)<\/tbody>/i) || [])[1] || body;
  const headers = [...thead.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)].map((m) => stripTags(m[1]));
  const rows = [...tbody.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((tr) =>
      [...tr[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((m) => stripTags(m[1]))
    )
    .filter((r) => r.length > 0);
  return { headers, rows };
}

async function fetchWithTimeout(url, opts, ms = 9000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...opts, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function postForm(jar, csrf, customer, submit) {
  const body = new URLSearchParams({ _token: csrf, cust_no: customer, submit });
  const res = await fetchWithTimeout(PANEL_URL, {
    method: 'POST',
    headers: {
      'User-Agent': UA,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Accept: 'text/html',
      Origin: 'https://customer.nesco.gov.bd',
      Referer: PANEL_URL,
      Cookie: cookieHeader(jar),
    },
    body: body.toString(),
  });
  collectCookies(res, jar);
  if (!res.ok) throw new Error(`NESCO server error (${res.status})`);
  return res.text();
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, s-maxage=120, stale-while-revalidate=60');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const customer = String(req.query.customer || '').replace(/\D/g, '').slice(0, 12);
    const action = String(req.query.action || 'all');
    if (!/^\d{6,12}$/.test(customer)) {
      return res.status(400).json({ ok: false, error: 'Valid 6–12 digit customer number required.' });
    }
    if (!['all', 'balance', 'customer', 'recharge', 'consumption'].includes(action)) {
      return res.status(400).json({ ok: false, error: 'Unknown action.' });
    }

    const jar = new Map();
    const getRes = await fetchWithTimeout(PANEL_URL, {
      headers: { 'User-Agent': UA, Accept: 'text/html' },
    });
    collectCookies(getRes, jar);
    if (!getRes.ok) throw new Error(`NESCO upstream HTTP ${getRes.status}. Try again in a moment.`);
    const csrf = parseCsrf(await getRes.text());
    if (!csrf) throw new Error('NESCO page format changed. Please try again later.');

    const needRecharge = ['all', 'balance', 'customer', 'recharge'].includes(action);
    const needConsumption = ['all', 'consumption'].includes(action);
    const [rechargeHtml, consumptionHtml] = await Promise.all([
      needRecharge ? postForm(jar, csrf, customer, SUBMIT_RECHARGE) : Promise.resolve(null),
      needConsumption ? postForm(jar, csrf, customer, SUBMIT_CONSUMPTION) : Promise.resolve(null),
    ]);

    const out = { ok: true, customer, fetchedAt: new Date().toISOString() };

    if (rechargeHtml) {
      const pairs = pairLabelsInputs(rechargeHtml);
      const values = pairs.map((p) => p.value);
      out.balance = values.length ? values[values.length - 1] : null;
      out.balanceLabel = pairs.length ? pairs[pairs.length - 1].label : null;
      out.customerInfo = {
        name: values[1] || null,
        address: values[3] || null,
        office: values[5] || null,
        feeder: values[6] || null,
        meter: values[8] || null,
        load: values[9] || null,
      };
      const table = parseTable(rechargeHtml);
      out.recharge = {
        headers: ['ID', 'Token', 'Power', 'Amount', 'Via', 'Date', 'Status'],
        rows: table.rows.map((r) => [r[0], r[1], r[8], r[9], r[11], r[12], r[13]]),
      };
      if (!table.rows.length && !out.balance) {
        return res.status(404).json({
          ok: false,
          error: 'No data found for this customer number. Please check the number and try again.',
        });
      }
    }

    if (consumptionHtml) {
      const table = parseTable(consumptionHtml);
      out.consumption = {
        headers: ['Year', 'Month', 'Recharge', 'Discount', 'Usage'],
        rows: table.rows.map((r) => r.slice(0, 5)),
      };
    }

    return res.status(200).json(out);
  } catch (err) {
    const detail = err?.cause?.message || err?.message || String(err);
    const msg =
      err?.name === 'AbortError'
        ? 'NESCO server is taking too long. Please try again.'
        : err?.message || 'Something went wrong.';
    return res.status(502).json({ ok: false, error: msg, detail });
  }
}
