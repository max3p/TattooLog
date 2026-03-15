import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SessionHealing } from '@/types/session';

interface WizardHealingProps {
  data: SessionHealing;
  onChange: (updates: Partial<SessionHealing>) => void;
}

export function WizardHealing({ data, onChange }: WizardHealingProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Healing Outcome</Label>
        <Select
          value={data.healingOutcome}
          onValueChange={(value) =>
            onChange({
              healingOutcome: value as SessionHealing['healingOutcome'],
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select outcome" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="minor_issues">Minor Issues</SelectItem>
            <SelectItem value="complications">Complications</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="healing-notes">Healing Notes</Label>
        <Textarea
          id="healing-notes"
          value={data.healingNotes}
          onChange={(e) => onChange({ healingNotes: e.target.value })}
          placeholder="Any observations about the healing process..."
          rows={3}
        />
      </div>
      <div className="flex items-center space-x-2">
        <input
          id="touch-up"
          type="checkbox"
          checked={data.touchUpNeeded}
          onChange={(e) => onChange({ touchUpNeeded: e.target.checked })}
          className="h-4 w-4 rounded border-border"
        />
        <Label htmlFor="touch-up">Touch-up Needed</Label>
      </div>
      {data.touchUpNeeded && (
        <div className="space-y-2">
          <Label htmlFor="touch-up-notes">Touch-up Notes</Label>
          <Textarea
            id="touch-up-notes"
            value={data.touchUpNotes}
            onChange={(e) => onChange({ touchUpNotes: e.target.value })}
            placeholder="What needs to be touched up..."
            rows={2}
          />
        </div>
      )}
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
