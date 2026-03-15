import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AccountDetails } from '@/components/account-details';
import { SessionList } from '@/components/session-list';
import { HealthAlertBanner } from '@/components/health-alert-banner';
import { HealthProfileSection } from '@/components/health-profile-section';
import { useAccounts } from '@/hooks/use-accounts';
import { useRecentClients } from '@/hooks/use-recent-clients';
import { Button } from '@/components/ui/button';
import type { HealthProfile } from '@/types/account';

export function AccountPage() {
  const { id } = useParams<{ id: string }>();
  const { accounts, getById, updateAccount } = useAccounts();
  const { addRecent } = useRecentClients(accounts);
  const account = id ? getById(id) : undefined;

  useEffect(() => {
    if (account) addRecent(account.id);
  }, [account?.id]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleHealthUpdate = (healthProfile: HealthProfile) => {
    updateAccount(account.id, { healthProfile });
  };

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto space-y-6 py-8">
      <Link to="/">
        <Button variant="outline">Back to Search</Button>
      </Link>
      <AccountDetails account={account} />
      <HealthAlertBanner healthProfile={account.healthProfile} />
      <HealthProfileSection
        healthProfile={account.healthProfile}
        onUpdate={handleHealthUpdate}
      />
      <SessionList accountId={account.id} />
    </div>
  );
}
