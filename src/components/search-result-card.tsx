import { Link } from 'react-router-dom';
import type { Account } from '@/types/account';

interface SearchResultCardProps {
  account: Account;
}

function formatPhone(phone: string): string {
  if (phone.length === 10) {
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  }
  return phone;
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
