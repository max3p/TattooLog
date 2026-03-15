import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SessionBasics } from '@/types/session';

const BODY_PLACEMENTS = [
  'Upper Arm',
  'Forearm',
  'Wrist',
  'Hand',
  'Finger',
  'Chest',
  'Ribs',
  'Stomach',
  'Upper Back',
  'Lower Back',
  'Shoulder',
  'Neck',
  'Behind Ear',
  'Thigh',
  'Calf',
  'Ankle',
  'Foot',
  'Hip',
  'Other',
];

interface WizardBasicsProps {
  data: SessionBasics;
  onChange: (updates: Partial<SessionBasics>) => void;
}

export function WizardBasics({ data, onChange }: WizardBasicsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="session-date">Date *</Label>
        <Input
          id="session-date"
          type="date"
          required
          value={data.date}
          onChange={(e) => onChange({ date: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Artist Name</Label>
        <Select
          value={data.artistName}
          onValueChange={(value) => onChange({ artistName: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select artist" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Jo">Jo</SelectItem>
            <SelectItem value="Max">Max</SelectItem>
            <SelectItem value="Luqman">Luqman</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder='e.g. "Sleeve continuation — koi fish"'
        />
      </div>
      <div className="space-y-2">
        <Label>Body Placement</Label>
        <Select
          value={data.bodyPlacement}
          onValueChange={(value) => onChange({ bodyPlacement: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select placement" />
          </SelectTrigger>
          <SelectContent>
            {BODY_PLACEMENTS.map((placement) => (
              <SelectItem key={placement} value={placement}>
                {placement}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="size">Size</Label>
        <Input
          id="size"
          value={data.size}
          onChange={(e) => onChange({ size: e.target.value })}
          placeholder='e.g. "2x3 inches", "half sleeve"'
        />
      </div>
    </div>
  );
}
