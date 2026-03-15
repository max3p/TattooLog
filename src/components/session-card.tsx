import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TattooSession, HealingStatus } from '@/types/session';
import { getLatestHealingStatus } from '@/lib/check-in-utils';

interface SessionCardProps {
  session: TattooSession;
}

function formatDate(iso: string): string {
  if (!iso) return 'No date';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function healingBadge(outcome: HealingStatus) {
  switch (outcome) {
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

export function SessionCard({ session }: SessionCardProps) {
  return (
    <Link to={`/account/${session.accountId}/sessions/${session.id}`}>
      <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="h-16 w-16 rounded bg-muted flex items-center justify-center shrink-0">
            <span className="text-xs text-muted-foreground">No img</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium truncate">
                {session.description || 'Untitled Session'}
              </span>
              {healingBadge(getLatestHealingStatus(session))}
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDate(session.date)}
              {session.artistName && ` · ${session.artistName}`}
              {session.bodyPlacement && ` · ${session.bodyPlacement}`}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
