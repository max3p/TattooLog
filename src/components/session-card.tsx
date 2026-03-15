import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import type { TattooSession } from '@/types/session';
import { getLatestHealingStatus } from '@/lib/check-in-utils';
import { formatDateShort, healingStatusBadge } from '@/lib/format-utils';

interface SessionCardProps {
  session: TattooSession;
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
              {healingStatusBadge(getLatestHealingStatus(session))}
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDateShort(session.date)}
              {session.artistName && ` · ${session.artistName}`}
              {session.bodyPlacement && ` · ${session.bodyPlacement}`}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
