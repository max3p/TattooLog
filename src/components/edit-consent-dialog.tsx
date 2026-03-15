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
import type { ConsentRecord } from '@/types/account';

interface EditConsentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consent: ConsentRecord;
  onSave: (consent: ConsentRecord) => void;
}

function today() {
  return new Date().toISOString().split('T')[0];
}

export function EditConsentDialog({
  open,
  onOpenChange,
  consent,
  onSave,
}: EditConsentDialogProps) {
  const [signed, setSigned] = useState(consent.signed);
  const [signedDate, setSignedDate] = useState(consent.signedDate ?? '');

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setSigned(consent.signed);
      setSignedDate(consent.signedDate ?? '');
    }
    onOpenChange(isOpen);
  };

  const handleSignedChange = (checked: boolean) => {
    setSigned(checked);
    if (checked && !signedDate) {
      setSignedDate(today());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      signed,
      signedDate: signed && signedDate ? signedDate : null,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Consent & Waiver</DialogTitle>
          <DialogDescription>
            Track the client's waiver status.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="consent-signed"
              checked={signed}
              onCheckedChange={(checked) => handleSignedChange(checked === true)}
            />
            <Label htmlFor="consent-signed" className="font-normal cursor-pointer">
              Client has signed waiver
            </Label>
          </div>

          {signed && (
            <div className="space-y-2">
              <Label htmlFor="consent-signed-date">Date Signed *</Label>
              <Input
                id="consent-signed-date"
                type="date"
                required
                value={signedDate}
                onChange={(e) => setSignedDate(e.target.value)}
              />
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={signed && !signedDate}>
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
