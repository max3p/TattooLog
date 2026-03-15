import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { SessionNotes } from '@/types/session';

interface WizardNotesProps {
  data: SessionNotes;
  onChange: (updates: Partial<SessionNotes>) => void;
}

export function WizardNotes({ data, onChange }: WizardNotesProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="session-notes">Session Notes</Label>
        <Textarea
          id="session-notes"
          value={data.healingNotes}
          onChange={(e) => onChange({ healingNotes: e.target.value })}
          placeholder="Any notes from the session (e.g., client used numbing cream, skin was reactive...)"
          rows={4}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="follow-up-date">Follow-up Date</Label>
        <Input
          id="follow-up-date"
          type="date"
          value={data.followUpDate}
          onChange={(e) => onChange({ followUpDate: e.target.value })}
        />
      </div>
    </div>
  );
}
