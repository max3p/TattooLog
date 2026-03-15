import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchForm } from '@/components/search-form';
import { SearchResultCard } from '@/components/search-result-card';
import { CreateAccountModal } from '@/components/create-account-modal';
import { useAccounts } from '@/hooks/use-accounts';
import { useRecentClients } from '@/hooks/use-recent-clients';
import { Button } from '@/components/ui/button';

function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

const MAX_RESULTS = 5;

export function SearchPage() {
  const navigate = useNavigate();
  const { accounts, search, createAccount } = useAccounts();
  const { recentClients } = useRecentClients(accounts);
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');

  const trimmed = query.trim();
  const results = trimmed ? search(trimmed).slice(0, MAX_RESULTS) : [];
  const hasQuery = trimmed.length > 0;
  const hasResults = results.length > 0;
  const noResults = hasQuery && !hasResults;

  const handleCreate = (data: Parameters<typeof createAccount>[0]) => {
    const account = createAccount(data);
    setModalOpen(false);
    navigate(`/account/${account.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-24">
      <h1 className="text-4xl font-bold mb-8">TattooLog</h1>
      <p className="text-muted-foreground mb-6">
        Look up a client by name, phone, or email
      </p>
      <SearchForm value={query} onChange={setQuery} />

      <div className="w-full max-w-md mt-4">
        {/* Live Search Results */}
        {hasResults && (
          <div className="space-y-2">
            {results.map((account) => (
              <SearchResultCard key={account.id} account={account} />
            ))}
          </div>
        )}

        {/* No Results */}
        {noResults && (
          <div className="text-center space-y-3 py-4">
            <p className="text-muted-foreground">No clients found</p>
            <Button
              variant="outline"
              onClick={() => setModalOpen(true)}
            >
              Create Account
            </Button>
          </div>
        )}

        {/* Recent Clients (shown when input is empty) */}
        {!hasQuery && recentClients.length > 0 && (
          <div className="space-y-2 mt-2">
            <p className="text-sm font-semibold">Recent Clients</p>
            {recentClients.map(({ account, viewedAt }) => (
              <button
                key={account.id}
                onClick={() => navigate(`/account/${account.id}`)}
                className="w-full text-left rounded-lg border p-3 hover:bg-accent transition-colors flex items-center justify-between"
              >
                <span className="font-medium">{account.name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatRelativeDate(viewedAt)}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <CreateAccountModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        prefill={query}
        onSubmit={handleCreate}
      />
    </div>
  );
}
