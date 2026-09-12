export async function fetchNesco(customer, action = 'all') {
  const url = `/api/nesco?customer=${encodeURIComponent(customer)}&action=${action}`;
  const res = await fetch(url);
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

const KEY = 'mojimelt:nesco-recent:v1';

export function getRecentCustomers() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]');
  } catch {
    return [];
  }
}

export function pushRecentCustomer(customer) {
  try {
    const list = [customer, ...getRecentCustomers().filter((c) => c !== customer)].slice(0, 5);
    localStorage.setItem(KEY, JSON.stringify(list));
    return list;
  } catch {
    return getRecentCustomers();
  }
}

export function formatBanglaTime(iso) {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  } catch {
    return iso;
  }
}
