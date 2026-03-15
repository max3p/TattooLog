import { useParams, Link } from 'react-router-dom';
import { AccountDetails } from '@/components/account-details';
import { SessionList } from '@/components/session-list';
import { useAccounts } from '@/hooks/use-accounts';
import { Button } from '@/components/ui/button';

export function AccountPage() {
  const { id } = useParams<{ id: string }>();
  const { getById } = useAccounts();
  const account = id ? getById(id) : undefined;

  if (!account) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
        <h1 className="text-2xl font-bold">Account Not Found</h1>
        <p className="text-muted-foreground">
          The account you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button variant="outline">Back to Search</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto space-y-6 py-8">
      <Link to="/">
        <Button variant="outline">Back to Search</Button>
      </Link>
      <AccountDetails account={account} />
      <SessionList accountId={account.id} />
    </div>
  );
}
