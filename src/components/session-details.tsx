import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CheckInDialog } from '@/components/check-in-dialog';
import { CheckInTimeline } from '@/components/check-in-timeline';
import type { TattooSession, CheckIn } from '@/types/session';
import { formatDate } from '@/lib/format-utils';

interface SessionDetailsProps {
  session: TattooSession;
  onAddCheckIn: (data: Omit<CheckIn, 'id'>) => void;
}

function formatDuration(minutes: number | null): string {
  if (minutes === null) return '—';
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
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

export function SessionDetails({ session, onAddCheckIn }: SessionDetailsProps) {
  const [checkInOpen, setCheckInOpen] = useState(false);
  const checkIns = session.checkIns ?? [];

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

      {session.healingNotes && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Session Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{session.healingNotes}</p>
            <Field label="Follow-up Date" value={formatDate(session.followUpDate)} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg">Healing Check-ins</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCheckInOpen(true)}
          >
            Add Check-in
          </Button>
        </CardHeader>
        <CardContent>
          <CheckInTimeline checkIns={checkIns} />
        </CardContent>
      </Card>

      {session.followUpDate && !session.healingNotes && (
        <>
          <Separator />
          <Field label="Follow-up Date" value={formatDate(session.followUpDate)} />
        </>
      )}

      <CheckInDialog
        open={checkInOpen}
        onOpenChange={setCheckInOpen}
        onSubmit={(data) => {
          onAddCheckIn(data);
          setCheckInOpen(false);
        }}
      />
    </div>
  );
}
