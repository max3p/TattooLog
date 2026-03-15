import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SessionTechnical } from '@/types/session';

interface WizardTechnicalProps {
  data: SessionTechnical;
  onChange: (updates: Partial<SessionTechnical>) => void;
}

export function WizardTechnical({ data, onChange }: WizardTechnicalProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="needle-config">Needle Configuration</Label>
        <Input
          id="needle-config"
          value={data.needleConfig}
          onChange={(e) => onChange({ needleConfig: e.target.value })}
          placeholder='e.g. "5RL, 7RS, 14M1"'
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ink-brands">Ink Brands</Label>
        <Input
          id="ink-brands"
          value={data.inkBrands}
          onChange={(e) => onChange({ inkBrands: e.target.value })}
          placeholder='e.g. "Eternal, Intenze"'
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ink-colors">Ink Colors</Label>
        <Input
          id="ink-colors"
          value={data.inkColors}
          onChange={(e) => onChange({ inkColors: e.target.value })}
          placeholder='e.g. "Black, Red, Blue"'
        />
      </div>
      <div className="space-y-2">
        <Label>Machine Type</Label>
        <Select
          value={data.machineType}
          onValueChange={(value) => onChange({ machineType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select machine type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Coil">Coil</SelectItem>
            <SelectItem value="Rotary">Rotary</SelectItem>
            <SelectItem value="Pen">Pen</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Stencil Method</Label>
        <Select
          value={data.stencilMethod}
          onValueChange={(value) => onChange({ stencilMethod: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select stencil method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Thermal">Thermal</SelectItem>
            <SelectItem value="Freehand">Freehand</SelectItem>
            <SelectItem value="Digital">Digital / iPad</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="duration">Session Duration (minutes)</Label>
        <Input
          id="duration"
          type="number"
          min={0}
          value={data.durationMinutes ?? ''}
          onChange={(e) =>
            onChange({
              durationMinutes: e.target.value ? Number(e.target.value) : null,
            })
          }
          placeholder="e.g. 120"
        />
      </div>
    </div>
  );
}
