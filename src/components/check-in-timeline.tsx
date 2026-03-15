import { Badge } from '@/components/ui/badge';
import type { CheckIn } from '@/types/session';
import { formatDateShort, healingStatusBadge } from '@/lib/format-utils';

interface CheckInTimelineProps {
  checkIns: CheckIn[];
}

export function CheckInTimeline({ checkIns }: CheckInTimelineProps) {
  if (checkIns.length === 0) {
    return (
      <p className="text-muted-foreground text-sm py-4">
        No check-ins yet.
      </p>
    );
  }

  const sorted = [...checkIns].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-3">
      {sorted.map((checkIn) => (
        <div
          key={checkIn.id}
          className="border-l-2 border-border pl-4 py-2 space-y-1"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {formatDateShort(checkIn.date)}
            </span>
            {healingStatusBadge(checkIn.healingStatus)}
            {checkIn.touchUpNeeded && (
              <Badge variant="outline" className="text-xs">
                Touch-up needed
              </Badge>
            )}
          </div>
          {checkIn.notes && (
            <p className="text-sm text-muted-foreground">{checkIn.notes}</p>
          )}
        </div>
      ))}
    </div>
  );
}
