import type { SessionDraft, TattooSession } from '@/types/session';

export function createEmptyDraft(): SessionDraft {
  return {
    date: new Date().toISOString().split('T')[0],
    artistName: '',
    description: '',
    bodyPlacement: '',
    size: '',
    needleConfig: '',
    inkBrands: '',
    inkColors: '',
    machineType: '',
    stencilMethod: '',
    durationMinutes: null,
    healingOutcome: '',
    healingNotes: '',
    touchUpNeeded: false,
    touchUpNotes: '',
    followUpDate: '',
  };
}

export function createSessionFromDraft(
  accountId: string,
  draft: SessionDraft
): TattooSession {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    accountId,
    shopId: '',
    artistId: '',
    date: draft.date ?? '',
    artistName: draft.artistName ?? '',
    description: draft.description ?? '',
    bodyPlacement: draft.bodyPlacement ?? '',
    size: draft.size ?? '',
    needleConfig: draft.needleConfig ?? '',
    inkBrands: draft.inkBrands ?? '',
    inkColors: draft.inkColors ?? '',
    machineType: draft.machineType ?? '',
    stencilMethod: draft.stencilMethod ?? '',
    durationMinutes: draft.durationMinutes ?? null,
    healingOutcome: draft.healingOutcome ?? '',
    healingNotes: draft.healingNotes ?? '',
    touchUpNeeded: draft.touchUpNeeded ?? false,
    touchUpNotes: draft.touchUpNotes ?? '',
    followUpDate: draft.followUpDate ?? '',
    createdAt: now,
    updatedAt: now,
  };
}
