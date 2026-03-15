import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchForm } from '@/components/search-form';
import { CreateAccountModal } from '@/components/create-account-modal';
import { useAccounts } from '@/hooks/use-accounts';

export function SearchPage() {
  const navigate = useNavigate();
  const { findByPhoneOrEmail, createAccount } = useAccounts();
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    const account = findByPhoneOrEmail(query);
    if (account) {
      navigate(`/account/${account.id}`);
    } else {
      setSearchQuery(query);
      setModalOpen(true);
    }
  };

  const handleCreate = (data: Parameters<typeof createAccount>[0]) => {
    const account = createAccount(data);
    setModalOpen(false);
    navigate(`/account/${account.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">TattooLog</h1>
      <p className="text-muted-foreground mb-6">
        Look up a client by phone number or email
      </p>
      <SearchForm onSearch={handleSearch} />
      <CreateAccountModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        prefill={searchQuery}
        onSubmit={handleCreate}
      />
    </div>
  );
}
