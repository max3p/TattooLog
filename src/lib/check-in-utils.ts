import type { TattooSession, CheckIn, HealingStatus } from '@/types/session';

export function getLatestCheckIn(session: TattooSession): CheckIn | undefined {
  const checkIns = session.checkIns ?? [];
  if (checkIns.length === 0) return undefined;
  return [...checkIns].sort((a, b) => b.date.localeCompare(a.date))[0];
}

export function getLatestHealingStatus(session: TattooSession): HealingStatus {
  const latest = getLatestCheckIn(session);
  if (latest) return latest.healingStatus;
  return session.healingOutcome; // fallback for legacy data
}
