export interface CheckIn {
  id: string;
  date: string;
  healingStatus: 'good' | 'minor_issues' | 'complications';
  notes: string;
  touchUpNeeded: boolean;
}

export type HealingStatus = '' | 'good' | 'minor_issues' | 'complications';

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

  // Step 4: Session Notes
  healingOutcome: HealingStatus; // legacy — prefer checkIns
  healingNotes: string;          // repurposed as general session notes
  touchUpNeeded: boolean;        // legacy — prefer checkIns
  touchUpNotes: string;          // legacy — prefer checkIns
  followUpDate: string;

  // Check-ins
  checkIns: CheckIn[];

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

export type SessionNotes = Pick<
  TattooSession,
  'healingNotes' | 'followUpDate'
>;

export type SessionDraft = Partial<
  Omit<TattooSession, 'id' | 'accountId' | 'createdAt' | 'updatedAt' | 'shopId' | 'artistId'>
>;
