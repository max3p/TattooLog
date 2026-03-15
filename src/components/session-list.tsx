import { Link } from 'react-router-dom';
import { useSessions } from '@/hooks/use-sessions';
import { SessionCard } from '@/components/session-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SessionListProps {
  accountId: string;
}

export function SessionList({ accountId }: SessionListProps) {
  const { getByAccountId } = useSessions();
  const sessions = getByAccountId(accountId);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold">Tattoo Sessions</h2>
          <Badge variant="secondary">{sessions.length}</Badge>
        </div>
        <Link to={`/account/${accountId}/sessions/new`}>
          <Button>Add Session</Button>
        </Link>
      </div>
      {sessions.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center">
          No sessions recorded yet.
        </p>
      ) : (
        <div className="space-y-2">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}
