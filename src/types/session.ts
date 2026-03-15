export interface TattooSession {
  id: string;
  accountId: string;
  shopId: string;
  artistId: string;

  // Step 1: Basics
  date: string;
  artistName: string;
  description: string;
  bodyPlacement: string;
  size: string;

  // Step 2: Technical
  needleConfig: string;
  inkBrands: string;
  inkColors: string;
  machineType: string;
  stencilMethod: string;
  durationMinutes: number | null;

  // Step 4: Healing & Notes
  healingOutcome: '' | 'good' | 'minor_issues' | 'complications';
  healingNotes: string;
  touchUpNeeded: boolean;
  touchUpNotes: string;
  followUpDate: string;

  createdAt: string;
  updatedAt: string;
}

export type SessionBasics = Pick<
  TattooSession,
  'date' | 'artistName' | 'description' | 'bodyPlacement' | 'size'
>;

export type SessionTechnical = Pick<
  TattooSession,
  'needleConfig' | 'inkBrands' | 'inkColors' | 'machineType' | 'stencilMethod' | 'durationMinutes'
>;

export type SessionHealing = Pick<
  TattooSession,
  'healingOutcome' | 'healingNotes' | 'touchUpNeeded' | 'touchUpNotes' | 'followUpDate'
>;

export type SessionDraft = Partial<
  Omit<TattooSession, 'id' | 'accountId' | 'createdAt' | 'updatedAt' | 'shopId' | 'artistId'>
>;
