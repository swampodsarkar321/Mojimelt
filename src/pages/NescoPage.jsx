import { useState } from 'react';
import {
  Zap, Search, RefreshCw, Wallet, User, History, BarChart3,
  Clock3, ShieldCheck, AlertTriangle, Loader2, Receipt, PlugZap,
} from 'lucide-react';
import { fetchNesco, getRecentCustomers, pushRecentCustomer, formatBanglaTime } from '../utils/nescoApi.js';

function num(v) {
  const n = parseFloat(String(v || '').replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function Stat({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 dark:border-white/10 dark:bg-white/5">
      <p className="flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">
        {icon} {label}
      </p>
      <p className="mt-1 truncate text-base font-extrabold text-slate-900 dark:text-white" title={value || '—'}>
        {value || '—'}
      </p>
    </div>
  );
}

export default function NescoPage() {
  const [customer, setCustomer] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('recharge');
  const [recent, setRecent] = useState(() => getRecentCustomers());

  const load = async (cust) => {
    const clean = String(cust || '').replace(/\D/g, '').slice(0, 12);
    if (!/^\d{6,12}$/.test(clean)) {
      setError('Please enter a valid 6–12 digit NESCO customer number.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetchNesco(clean, 'all');
      setData({ ...res, customer: clean });
      setRecent(pushRecentCustomer(clean));
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const usageRows = (data?.consumption?.rows || []).filter((r) => r[0]);
  const maxUsage = Math.max(1, ...usageRows.map((r) => num(r[4])));
  const totalRecharge = usageRows.reduce((s, r) => s + num(r[2]), 0);
  const totalUsage = usageRows.reduce((s, r) => s + num(r[4]), 0);

  return (
    <main className="mx-auto max-w-4xl px-4 pt-6 pb-4 sm:px-6 sm:pt-10">
      <p className="flex items-center justify-center gap-2 text-center text-xs font-extrabold tracking-[0.25em] text-emerald-600 uppercase dark:text-emerald-300">
        <Zap size={14} aria-hidden /> Mojimelt Tools · Unofficial
      </p>
      <h1 className="font-display mt-1 text-center text-3xl font-black text-slate-900 sm:text-4xl dark:text-white">
        NESCO Bill Check
      </h1>
      <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-500 sm:text-base dark:text-slate-400">
        Live prepaid balance, recharge history &amp; monthly usage — straight from the NESCO server.
      </p>

      {/* search card */}
      <section aria-label="Customer lookup" className="mx-auto mt-6 max-w-xl rounded-[2rem] border border-slate-200/80 bg-white p-5 shadow-xl sm:p-6 dark:border-white/10 dark:bg-white/[0.06]">
        <label htmlFor="nesco-customer" className="text-xs font-extrabold tracking-widest text-slate-400 uppercase">
          Customer number
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="nesco-customer"
            inputMode="numeric"
            autoComplete="off"
            placeholder="e.g. 12345678"
            value={customer}
            onChange={(e) => setCustomer(e.target.value.replace(/\D/g, '').slice(0, 12))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') load(customer);
            }}
            className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 font-mono text-lg font-bold tracking-widest text-slate-900 placeholder:text-slate-300 focus:border-emerald-400 focus:bg-white focus:outline-none dark:border-white/10 dark:bg-black/30 dark:text-white"
          />
          <button
            type="button"
            onClick={() => load(customer)}
            disabled={loading}
            className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-3.5 text-sm font-black text-white shadow-lg transition hover:scale-[1.03] active:scale-95 disabled:opacity-70"
          >
            {loading ? <Loader2 size={17} className="animate-spin" aria-hidden /> : <Search size={17} aria-hidden />}
            {loading ? '…' : 'Check'}
          </button>
        </div>
        {recent.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400">Recent:</span>
            {recent.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCustomer(c);
                  load(c);
                }}
                className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-bold text-slate-600 transition hover:bg-emerald-100 hover:text-emerald-700 dark:bg-white/10 dark:text-slate-300"
              >
                {c}
              </button>
            ))}
          </div>
        )}
        {error && (
          <p role="alert" className="mt-3 flex items-start gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 dark:bg-red-500/10 dark:text-red-300">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" aria-hidden /> {error}
          </p>
        )}
      </section>

      {/* last refreshed bar */}
      {data && !loading && (
        <div className="mx-auto mt-4 flex max-w-xl flex-wrap items-center justify-center gap-2 text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-extrabold text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
            <Clock3 size={13} aria-hidden />
            Last refreshed: {formatBanglaTime(data.fetchedAt)} · Live from NESCO
          </p>
          <button
            type="button"
            onClick={() => load(data.customer)}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-extrabold text-slate-600 transition hover:scale-105 hover:border-emerald-300 dark:border-white/10 dark:bg-white/10 dark:text-slate-200"
          >
            <RefreshCw size={13} aria-hidden /> Refresh
          </button>
        </div>
      )}

      {/* loading skeletons */}
      {loading && (
        <div className="mt-6 grid animate-pulse gap-3" aria-hidden>
          <div className="h-36 rounded-[2rem] bg-slate-200 dark:bg-white/10" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="h-20 rounded-2xl bg-slate-200 dark:bg-white/10" />
            <div className="h-20 rounded-2xl bg-slate-200 dark:bg-white/10" />
            <div className="h-20 rounded-2xl bg-slate-200 dark:bg-white/10" />
          </div>
        </div>
      )}

      {/* results */}
      {data && !loading && (
        <div className="animate-pop-in mt-6 grid gap-4">
          {/* balance hero */}
          <section aria-label="Current balance" className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-6 text-white shadow-2xl sm:p-8">
            <PlugZap size={120} aria-hidden className="absolute -right-4 -bottom-4 opacity-15" />
            <p className="flex items-center gap-1.5 text-xs font-extrabold tracking-[0.2em] uppercase opacity-80">
              <Wallet size={14} aria-hidden /> Current Balance
            </p>
            <p className="font-display mt-1 text-5xl font-black tracking-tight sm:text-6xl">
              ৳{data.balance ?? '—'}
            </p>
            <p className="mt-1 text-xs font-semibold opacity-75">
              {data.balanceLabel || 'Balance'} · Customer {data.customer}
            </p>
          </section>

          {/* customer info */}
          <section aria-label="Customer information">
            <h2 className="flex items-center gap-2 font-display text-lg font-black text-slate-900 dark:text-white">
              <User size={18} aria-hidden /> Customer Info
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              <Stat icon={null} label="Name" value={data.customerInfo?.name} />
              <Stat icon={null} label="Address" value={data.customerInfo?.address} />
              <Stat icon={null} label="Office" value={data.customerInfo?.office} />
              <Stat icon={null} label="Feeder" value={data.customerInfo?.feeder} />
              <Stat icon={null} label="Meter No" value={data.customerInfo?.meter} />
              <Stat icon={null} label="Load (kW)" value={data.customerInfo?.load} />
            </div>
          </section>

          {/* tabs */}
          <section aria-label="History and usage">
            <div className="flex gap-2" role="tablist" aria-label="Data views">
              {[
                { id: 'recharge', label: 'Recharge History', Icon: History },
                { id: 'usage', label: 'Monthly Usage', Icon: BarChart3 },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  onClick={() => setTab(id)}
                  className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-extrabold transition ${
                    tab === id
                      ? 'bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-white/10 dark:text-slate-300'
                  }`}
                >
                  <Icon size={16} aria-hidden /> {label}
                </button>
              ))}
            </div>

            {tab === 'recharge' && (
              <div className="nice-scroll mt-3 overflow-x-auto rounded-3xl border border-slate-200/80 bg-white dark:border-white/10 dark:bg-white/[0.04]">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 text-[11px] tracking-wider text-slate-400 uppercase dark:border-white/10">
                      {(data.recharge?.headers || []).map((h) => (
                        <th key={h} className="px-4 py-3 font-extrabold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(data.recharge?.rows || []).map((r, i) => (
                      <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-emerald-50/50 dark:border-white/5 dark:hover:bg-white/5">
                        <td className="px-4 py-3 font-bold text-slate-400">{r[0]}</td>
                        <td className="px-4 py-3 font-mono text-xs font-bold text-slate-700 dark:text-slate-200">{r[1]}</td>
                        <td className="px-4 py-3 font-bold text-slate-700 dark:text-slate-200">{r[2]}</td>
                        <td className="px-4 py-3 font-black text-emerald-600 dark:text-emerald-300">৳{r[3]}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-[11px] font-extrabold text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
                            {r[4]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs font-semibold whitespace-nowrap text-slate-500 dark:text-slate-400">{r[5]}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200">
                            {r[6]}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {(data.recharge?.rows || []).length === 0 && (
                      <tr><td className="px-4 py-8 text-center text-sm text-slate-400">No recharge records found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {tab === 'usage' && (
              <div className="mt-3 rounded-3xl border border-slate-200/80 bg-white p-5 dark:border-white/10 dark:bg-white/[0.04]">
                <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-500 dark:text-slate-400">
                  <span>Total recharge: <strong className="text-emerald-600 dark:text-emerald-300">৳{totalRecharge.toLocaleString()}</strong></span>
                  <span>Total usage: <strong className="text-slate-800 dark:text-white">{totalUsage.toLocaleString()} kWh</strong></span>
                </div>
                <div className="mt-4 grid gap-3">
                  {usageRows.map((r, i) => (
                    <div key={i}>
                      <div className="flex items-baseline justify-between text-xs font-bold">
                        <span className="text-slate-600 dark:text-slate-300">{r[1]} {r[0]}</span>
                        <span className="text-slate-400">৳{r[2]} · {r[4]} kWh</span>
                      </div>
                      <div className="mt-1 h-3.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all"
                          style={{ width: `${Math.max(3, (num(r[4]) / maxUsage) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  {usageRows.length === 0 && (
                    <p className="py-6 text-center text-sm text-slate-400">No consumption records found.</p>
                  )}
                </div>
                <p className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                  <Receipt size={12} aria-hidden /> Discount shown as per NESCO records.
                </p>
              </div>
            )}
          </section>

          <p className="flex items-start gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-xs font-medium text-slate-500 dark:bg-white/5 dark:text-slate-400">
            <ShieldCheck size={15} className="mt-0.5 shrink-0 text-emerald-500" aria-hidden />
            Unofficial tool — data fetched live from customer.nesco.gov.bd and never stored. Figures refresh on every check.
          </p>
        </div>
      )}
    </main>
  );
}
