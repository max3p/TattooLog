import { AlertTriangle } from 'lucide-react';
import type { HealthProfile } from '@/types/account';
import { getHealthProfile } from '@/lib/consent-utils';
import { getFlagLabel, getAllergyTypeLabel } from '@/lib/format-utils';

interface HealthAlertBannerProps {
  healthProfile?: HealthProfile;
}

export function HealthAlertBanner({ healthProfile }: HealthAlertBannerProps) {
  const profile = getHealthProfile(healthProfile);
  const activeFlags = profile.medicalFlags.filter((f) => f.active);
  const hasFlags = activeFlags.length > 0;
  const hasAllergies = profile.allergies.length > 0;

  if (!hasFlags && !hasAllergies) return null;

  const bgColor = hasFlags ? 'bg-[#8C4B42]' : 'bg-[#A67C37]';

  return (
    <div
      role="alert"
      className={`${bgColor} text-white rounded-lg px-4 py-3 flex items-start gap-3`}
    >
      <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
      <div className="space-y-1 text-sm">
        {hasFlags && (
          <p>
            <span className="font-semibold">Medical flags: </span>
            {activeFlags
              .map((f) => getFlagLabel(f.flag, f.customLabel))
              .join(', ')}
          </p>
        )}
        {hasAllergies && (
          <p>
            <span className="font-semibold">Allergies: </span>
            {profile.allergies
              .map(
                (a) =>
                  a.description
                    ? `${getAllergyTypeLabel(a.type)} (${a.description})`
                    : getAllergyTypeLabel(a.type)
              )
              .join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
