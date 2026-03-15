import { useParams, Link } from 'react-router-dom';
import { useAccounts } from '@/hooks/use-accounts';
import { useSessions } from '@/hooks/use-sessions';
import { SessionDetails } from '@/components/session-details';
import { Button } from '@/components/ui/button';

export function SessionDetailPage() {
  const { id: accountId, sessionId } = useParams<{
    id: string;
    sessionId: string;
  }>();
  const { getById: getAccountById } = useAccounts();
  const { getById: getSessionById } = useSessions();

  const account = accountId ? getAccountById(accountId) : undefined;
  const session = sessionId ? getSessionById(sessionId) : undefined;

  if (!account || !session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
        <h1 className="text-2xl font-bold">
          {!account ? 'Client Not Found' : 'Session Not Found'}
        </h1>
        <Link to={account ? `/account/${account.id}` : '/'}>
          <Button variant="outline">
            {account ? 'Back to Profile' : 'Back to Search'}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto space-y-6">
      <Link
        to={`/account/${accountId}`}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; {account.name}
      </Link>
      <SessionDetails session={session} />
    </div>
  );
}
