import { Link } from 'react-router-dom';
import type { Account } from '@/types/account';
import { formatPhone } from '@/lib/format-utils';

interface SearchResultCardProps {
  account: Account;
}

export function SearchResultCard({ account }: SearchResultCardProps) {
  return (
    <Link
      to={`/account/${account.id}`}
      className="block rounded-lg border p-4 hover:bg-accent transition-colors"
    >
      <p className="font-semibold">{account.name}</p>
      <p className="text-sm text-muted-foreground">
        {formatPhone(account.phone)}
        {account.email && ` · ${account.email}`}
      </p>
    </Link>
  );
}
