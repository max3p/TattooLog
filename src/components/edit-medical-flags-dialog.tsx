import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import type { MedicalFlag } from '@/types/account';
import { COMMON_MEDICAL_FLAGS } from '@/lib/medical-constants';

interface EditMedicalFlagsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medicalFlags: MedicalFlag[];
  onSave: (flags: MedicalFlag[]) => void;
}

export function EditMedicalFlagsDialog({
  open,
  onOpenChange,
  medicalFlags,
  onSave,
}: EditMedicalFlagsDialogProps) {
  const [localFlags, setLocalFlags] = useState<MedicalFlag[]>(medicalFlags);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setLocalFlags(medicalFlags);
    }
    onOpenChange(isOpen);
  };

  const isChecked = (flagValue: string) =>
    localFlags.some((f) => f.flag === flagValue && f.active);

  const toggleFlag = (flagValue: string) => {
    const existing = localFlags.find((f) => f.flag === flagValue);
    if (existing) {
      setLocalFlags(
        localFlags.map((f) =>
          f.flag === flagValue ? { ...f, active: !f.active } : f
        )
      );
    } else {
      setLocalFlags([
        ...localFlags,
        { id: crypto.randomUUID(), flag: flagValue, active: true },
      ]);
    }
  };

  const customFlags = localFlags.filter((f) => f.flag === 'custom');

  const addCustomFlag = () => {
    setLocalFlags([
      ...localFlags,
      {
        id: crypto.randomUUID(),
        flag: 'custom',
        customLabel: '',
        active: true,
      },
    ]);
  };

  const updateCustomLabel = (id: string, label: string) => {
    setLocalFlags(
      localFlags.map((f) =>
        f.id === id ? { ...f, customLabel: label } : f
      )
    );
  };

  const removeCustomFlag = (id: string) => {
    setLocalFlags(localFlags.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out custom flags with empty labels
    const cleaned = localFlags.filter(
      (f) => f.flag !== 'custom' || (f.customLabel && f.customLabel.trim())
    );
    onSave(cleaned);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Medical Flags</DialogTitle>
          <DialogDescription>
            Select any relevant medical conditions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            {COMMON_MEDICAL_FLAGS.map((flag) => (
              <div key={flag.value} className="flex items-center space-x-3">
                <Checkbox
                  id={`flag-${flag.value}`}
                  checked={isChecked(flag.value)}
                  onCheckedChange={() => toggleFlag(flag.value)}
                />
                <Label
                  htmlFor={`flag-${flag.value}`}
                  className="font-normal cursor-pointer"
                >
                  {flag.label}
                </Label>
              </div>
            ))}
          </div>

          {customFlags.length > 0 && (
            <div className="space-y-2">
              <Label>Custom Flags</Label>
              {customFlags.map((flag) => (
                <div key={flag.id} className="flex items-center gap-2">
                  <Input
                    value={flag.customLabel ?? ''}
                    onChange={(e) =>
                      updateCustomLabel(flag.id, e.target.value)
                    }
                    placeholder="Condition name"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    aria-label="Remove custom flag"
                    onClick={() => removeCustomFlag(flag.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCustomFlag}
          >
            + Add Custom Flag
          </Button>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
