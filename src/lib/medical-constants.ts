export const COMMON_MEDICAL_FLAGS = [
  { value: 'blood_thinners', label: 'Blood Thinners' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'autoimmune', label: 'Autoimmune Condition' },
  { value: 'pregnancy', label: 'Pregnancy' },
  { value: 'hemophilia', label: 'Hemophilia' },
  { value: 'skin_condition', label: 'Skin Condition (eczema, psoriasis)' },
  { value: 'heart_condition', label: 'Heart Condition' },
  { value: 'immunocompromised', label: 'Immunocompromised' },
] as const;

export const ALLERGY_TYPES = [
  { value: 'latex', label: 'Latex' },
  { value: 'ink_brand', label: 'Ink Brand' },
  { value: 'adhesive', label: 'Adhesive / Bandage' },
  { value: 'topical', label: 'Topical Ointment' },
  { value: 'other', label: 'Other' },
] as const;

export const SKIN_TYPES = [
  'Normal',
  'Sensitive',
  'Oily',
  'Dry',
  'Combination',
] as const;
