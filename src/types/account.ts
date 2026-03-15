export type AllergyType = 'latex' | 'ink_brand' | 'adhesive' | 'topical' | 'other';

export interface Allergy {
  id: string;
  type: AllergyType;
  description: string;
}

export interface MedicalFlag {
  id: string;
  flag: string;
  customLabel?: string;
  active: boolean;
}

export type WaiverStatus = 'current' | 'expired' | 'missing';

export interface ConsentRecord {
  signed: boolean;
  signedDate: string | null;
  expiresDate: string | null;
  notes: string;
}

export interface HealthProfile {
  allergies: Allergy[];
  skinType: string;
  skinNotes: string;
  medicalFlags: MedicalFlag[];
  consent: ConsentRecord;
}

export interface Account {
  id: string;
  name: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  createdAt: string;
  healthProfile?: HealthProfile;
}
