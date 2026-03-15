import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import type { TattooSession } from '@/types/session';

interface SessionDetailsProps {
  session: TattooSession;
}

function formatDate(iso: string): string {
  if (!iso) return '—';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatDuration(minutes: number | null): string {
  if (minutes === null) return '—';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function healingLabel(outcome: TattooSession['healingOutcome']) {
  switch (outcome) {
    case 'good':
      return <Badge className="bg-[#5F7154] text-white">Good</Badge>;
    case 'minor_issues':
      return <Badge className="bg-[#A67C37] text-white">Minor Issues</Badge>;
    case 'complications':
      return <Badge className="bg-[#8C4B42] text-white">Complications</Badge>;
    default:
      return <span className="text-muted-foreground">Not recorded</span>;
  }
}

function Field({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p>{value}</p>
    </div>
  );
}

export function SessionDetails({ session }: SessionDetailsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {session.description || 'Untitled Session'}
        </h1>
        <Link
          to={`/account/${session.accountId}/sessions/${session.id}/edit`}
        >
          <Button variant="outline">Edit</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Field label="Date" value={formatDate(session.date)} />
          <Field label="Artist" value={session.artistName} />
          <Field label="Body Placement" value={session.bodyPlacement} />
          <Field label="Size" value={session.size} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technical Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Field label="Needle Configuration" value={session.needleConfig} />
          <Field label="Ink Brands" value={session.inkBrands} />
          <Field label="Ink Colors" value={session.inkColors} />
          <Field label="Machine Type" value={session.machineType} />
          <Field label="Stencil Method" value={session.stencilMethod} />
          <Field
            label="Session Duration"
            value={formatDuration(session.durationMinutes)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Healing &amp; Notes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Healing Outcome</p>
            <div className="mt-1">{healingLabel(session.healingOutcome)}</div>
          </div>
          <Field label="Healing Notes" value={session.healingNotes} />
          <Separator />
          <div>
            <p className="text-sm text-muted-foreground">Touch-up Needed</p>
            <p>{session.touchUpNeeded ? 'Yes' : 'No'}</p>
          </div>
          {session.touchUpNeeded && (
            <Field label="Touch-up Notes" value={session.touchUpNotes} />
          )}
          <Field label="Follow-up Date" value={formatDate(session.followUpDate)} />
        </CardContent>
      </Card>
    </div>
  );
}
