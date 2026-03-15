import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Account } from '@/types/account';

interface AccountDetailsProps {
  account: Account;
}

function formatPhone(phone: string): string {
  if (phone.length === 10) {
    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
  }
  return phone;
}

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function AccountDetails({ account }: AccountDetailsProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">{account.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Date of Birth</p>
          <p>{formatDate(account.dateOfBirth)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p>{account.email}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Phone</p>
          <p>{formatPhone(account.phone)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Member Since</p>
          <p>{new Date(account.createdAt).toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}
