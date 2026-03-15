import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';
import type { Account } from '@/types/account';
import { getHealthProfile, getWaiverStatus } from '@/lib/consent-utils';

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

function ConsentBadge({ account }: { account: Account }) {
  const profile = getHealthProfile(account.healthProfile);
  const status = getWaiverStatus(profile.consent);

  if (status === 'missing') {
    return <Badge variant="outline" className="text-xs">No Waiver</Badge>;
  }
  return (
    <Badge className="text-xs bg-[#5F7154] hover:bg-[#5F7154] text-white">
      Waiver Current
    </Badge>
  );
}

export function AccountDetails({ account }: AccountDetailsProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex gap-5 pt-6">
        <div className="shrink-0 flex items-start">
          <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center">
            <User className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-3 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-2xl font-bold">{account.name}</h2>
            <ConsentBadge account={account} />
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              <p>{formatDate(account.dateOfBirth)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p>{formatPhone(account.phone)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p>{account.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p>{new Date(account.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
