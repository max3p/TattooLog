import type { ConsentRecord, HealthProfile, WaiverStatus } from '@/types/account';

export function getWaiverStatus(consent: ConsentRecord): WaiverStatus {
  if (!consent.signed || !consent.signedDate) return 'missing';
  return 'current';
}

export function getDefaultHealthProfile(): HealthProfile {
  return {
    allergies: [],
    skinType: '',
    skinNotes: '',
    medicalFlags: [],
    consent: {
      signed: false,
      signedDate: null,
      expiresDate: null,
      notes: '',
    },
  };
}

export function getHealthProfile(profile?: HealthProfile): HealthProfile {
  return profile ?? getDefaultHealthProfile();
}
