import { Badge } from '@/components/ui/badge';
import type { CheckIn } from '@/types/session';

interface CheckInTimelineProps {
  checkIns: CheckIn[];
}

function formatDate(iso: string): string {
  if (!iso) return 'No date';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function statusBadge(status: CheckIn['healingStatus']) {
  switch (status) {
    case 'good':
      return <Badge className="bg-[#5F7154] text-white">Good</Badge>;
    case 'minor_issues':
      return <Badge className="bg-[#A67C37] text-white">Minor Issues</Badge>;
    case 'complications':
      return <Badge className="bg-[#8C4B42] text-white">Complications</Badge>;
  }
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
              {formatDate(checkIn.date)}
            </span>
            {statusBadge(checkIn.healingStatus)}
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
