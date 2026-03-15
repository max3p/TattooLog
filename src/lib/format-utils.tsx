import { Badge } from '@/components/ui/badge';
import { COMMON_MEDICAL_FLAGS, ALLERGY_TYPES } from '@/lib/medical-constants';
import type { HealingStatus } from '@/types/session';

export function formatDate(iso: string): string {
  if (!iso) return '—';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(iso: string): string {
  if (!iso) return 'No date';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatPhone(phone: string): string {
  if (phone.length === 10) {
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  }
  return phone;
}

export function healingStatusBadge(status: HealingStatus) {
  switch (status) {
    case 'good':
      return <Badge className="bg-[#5F7154] text-white">Good</Badge>;
    case 'minor_issues':
      return <Badge className="bg-[#A67C37] text-white">Minor Issues</Badge>;
    case 'complications':
      return <Badge className="bg-[#8C4B42] text-white">Complications</Badge>;
    default:
      return null;
  }
}

export function getFlagLabel(flag: string, customLabel?: string): string {
  if (flag === 'custom' && customLabel) return customLabel;
  const found = COMMON_MEDICAL_FLAGS.find((f) => f.value === flag);
  return found?.label ?? flag;
}

export function getAllergyTypeLabel(type: string): string {
  const found = ALLERGY_TYPES.find((a) => a.value === type);
  return found?.label ?? type;
}
