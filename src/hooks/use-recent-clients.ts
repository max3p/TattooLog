import { useCallback, useState } from 'react';
import type { Account } from '@/types/account';

const STORAGE_KEY = 'tattoo_passport_recent_clients';
const MAX_RECENT = 10;

interface RecentEntry {
  accountId: string;
  viewedAt: string;
}

function loadRecent(): RecentEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecent(entries: RecentEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function useRecentClients(accounts: Account[]) {
  const [entries, setEntries] = useState<RecentEntry[]>(loadRecent);

  const addRecent = useCallback(
    (accountId: string) => {
      const filtered = entries.filter((e) => e.accountId !== accountId);
      const updated = [
        { accountId, viewedAt: new Date().toISOString() },
        ...filtered,
      ].slice(0, MAX_RECENT);
      setEntries(updated);
      saveRecent(updated);
    },
    [entries]
  );

  // Resolve entries to account objects, filtering out deleted accounts
  const recentClients = entries
    .map((e) => {
      const account = accounts.find((a) => a.id === e.accountId);
      return account ? { account, viewedAt: e.viewedAt } : null;
    })
    .filter(Boolean) as { account: Account; viewedAt: string }[];

  return { recentClients, addRecent };
}
