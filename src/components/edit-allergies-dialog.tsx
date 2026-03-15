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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X } from 'lucide-react';
import type { Allergy, AllergyType } from '@/types/account';
import { ALLERGY_TYPES, SKIN_TYPES } from '@/lib/medical-constants';

interface EditAllergiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allergies: Allergy[];
  skinType: string;
  skinNotes: string;
  onSave: (data: {
    allergies: Allergy[];
    skinType: string;
    skinNotes: string;
  }) => void;
}

export function EditAllergiesDialog({
  open,
  onOpenChange,
  allergies,
  skinType,
  skinNotes,
  onSave,
}: EditAllergiesDialogProps) {
  const [localAllergies, setLocalAllergies] = useState<Allergy[]>(allergies);
  const [localSkinType, setLocalSkinType] = useState(skinType);
  const [localSkinNotes, setLocalSkinNotes] = useState(skinNotes);

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setLocalAllergies(allergies);
      setLocalSkinType(skinType);
      setLocalSkinNotes(skinNotes);
    }
    onOpenChange(isOpen);
  };

  const addAllergy = () => {
    setLocalAllergies([
      ...localAllergies,
      { id: crypto.randomUUID(), type: 'other', description: '' },
    ]);
  };

  const removeAllergy = (id: string) => {
    setLocalAllergies(localAllergies.filter((a) => a.id !== id));
  };

  const updateAllergy = (id: string, updates: Partial<Allergy>) => {
    setLocalAllergies(
      localAllergies.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      allergies: localAllergies,
      skinType: localSkinType,
      skinNotes: localSkinNotes,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Allergies & Skin Notes</DialogTitle>
          <DialogDescription>
            Record known allergies and skin observations.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Label>Allergies</Label>
            {localAllergies.map((allergy) => (
              <div key={allergy.id} className="flex items-start gap-2">
                <Select
                  value={allergy.type}
                  onValueChange={(value) =>
                    updateAllergy(allergy.id, { type: value as AllergyType })
                  }
                >
                  <SelectTrigger className="w-[140px] shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ALLERGY_TYPES.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  value={allergy.description}
                  onChange={(e) =>
                    updateAllergy(allergy.id, { description: e.target.value })
                  }
                  placeholder="Details (e.g., brand name)"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  aria-label="Remove allergy"
                  onClick={() => removeAllergy(allergy.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addAllergy}
            >
              + Add Allergy
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Skin Type</Label>
            <Select value={localSkinType} onValueChange={setLocalSkinType}>
              <SelectTrigger>
                <SelectValue placeholder="Select skin type" />
              </SelectTrigger>
              <SelectContent>
                {SKIN_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skin-notes">Skin Notes</Label>
            <Textarea
              id="skin-notes"
              value={localSkinNotes}
              onChange={(e) => setLocalSkinNotes(e.target.value)}
              placeholder="Additional skin observations..."
              rows={3}
            />
          </div>

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
