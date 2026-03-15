import { useCallback, useState } from 'react';
import type { Account } from '@/types/account';
import { normalizePhone } from '@/lib/phone';

const STORAGE_KEY = 'tattoo_passport_accounts';

function loadAccounts(): Account[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts: Account[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>(loadAccounts);

  const findByPhoneOrEmail = useCallback(
    (query: string): Account | undefined => {
      const trimmed = query.trim().toLowerCase();
      const normalizedQuery = normalizePhone(trimmed);

      return accounts.find(
        (a) =>
          a.email.toLowerCase() === trimmed ||
          normalizePhone(a.phone) === normalizedQuery
      );
    },
    [accounts]
  );

  const getById = useCallback(
    (id: string): Account | undefined => {
      return accounts.find((a) => a.id === id);
    },
    [accounts]
  );

  const createAccount = useCallback(
    (data: Omit<Account, 'id' | 'createdAt'>): Account => {
      const newAccount: Account = {
        ...data,
        phone: normalizePhone(data.phone),
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      const updated = [...accounts, newAccount];
      setAccounts(updated);
      saveAccounts(updated);
      return newAccount;
    },
    [accounts]
  );

  const updateAccount = useCallback(
    (id: string, updates: Partial<Account>): Account | undefined => {
      const idx = accounts.findIndex((a) => a.id === id);
      if (idx === -1) return undefined;
      const updated = { ...accounts[idx], ...updates };
      const newList = [...accounts];
      newList[idx] = updated;
      setAccounts(newList);
      saveAccounts(newList);
      return updated;
    },
    [accounts]
  );

  const search = useCallback(
    (query: string): Account[] => {
      const trimmed = query.trim();
      if (!trimmed) return [];
      const lower = trimmed.toLowerCase();
      const digits = normalizePhone(trimmed);
      const isEmailQuery = trimmed.includes('@');
      const isPhoneQuery = digits.length >= 3 && digits.length === trimmed.replace(/[\s()\-+.]/g, '').length;

      if (isEmailQuery) {
        return accounts.filter((a) => a.email.toLowerCase().includes(lower));
      }
      if (isPhoneQuery) {
        return accounts.filter((a) => normalizePhone(a.phone).includes(digits));
      }
      // Name search — partial, case-insensitive
      return accounts.filter((a) =>
        a.name.toLowerCase().includes(lower)
      );
    },
    [accounts]
  );

  return { accounts, findByPhoneOrEmail, search, getById, createAccount, updateAccount };
}
