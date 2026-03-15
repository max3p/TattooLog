import { useCallback, useEffect, useState } from 'react';
import type { TattooSession, SessionDraft, CheckIn } from '@/types/session';
import { createSessionFromDraft } from '@/lib/session-defaults';

const STORAGE_KEY = 'tattoo_passport_sessions';

function loadSessions(): TattooSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSessions(sessions: TattooSession[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function useSessions() {
  const [sessions, setSessions] = useState<TattooSession[]>(loadSessions);

  // Re-read from localStorage on mount to pick up changes from other components
  useEffect(() => {
    setSessions(loadSessions());
  }, []);

  const getByAccountId = useCallback(
    (accountId: string): TattooSession[] => {
      return sessions
        .filter((s) => s.accountId === accountId)
        .sort((a, b) => b.date.localeCompare(a.date));
    },
    [sessions]
  );

  const getById = useCallback(
    (id: string): TattooSession | undefined => {
      return sessions.find((s) => s.id === id);
    },
    [sessions]
  );

  const createSession = useCallback(
    (accountId: string, draft: SessionDraft): TattooSession => {
      const newSession = createSessionFromDraft(accountId, draft);
      const updated = [...sessions, newSession];
      setSessions(updated);
      saveSessions(updated);
      return newSession;
    },
    [sessions]
  );

  const updateSession = useCallback(
    (id: string, updates: Partial<TattooSession>): TattooSession | undefined => {
      const index = sessions.findIndex((s) => s.id === id);
      if (index === -1) return undefined;
      const updatedSession = {
        ...sessions[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      const updated = [...sessions];
      updated[index] = updatedSession;
      setSessions(updated);
      saveSessions(updated);
      return updatedSession;
    },
    [sessions]
  );

  const deleteSession = useCallback(
    (id: string) => {
      const updated = sessions.filter((s) => s.id !== id);
      setSessions(updated);
      saveSessions(updated);
    },
    [sessions]
  );

  const addCheckIn = useCallback(
    (sessionId: string, data: Omit<CheckIn, 'id'>): TattooSession | undefined => {
      const session = sessions.find((s) => s.id === sessionId);
      if (!session) return undefined;
      const newCheckIn: CheckIn = { ...data, id: crypto.randomUUID() };
      const updatedCheckIns = [...(session.checkIns ?? []), newCheckIn];
      return updateSession(sessionId, { checkIns: updatedCheckIns });
    },
    [sessions, updateSession]
  );

  return { sessions, getByAccountId, getById, createSession, updateSession, deleteSession, addCheckIn };
}
