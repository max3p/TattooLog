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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { CheckIn } from '@/types/session';

interface CheckInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<CheckIn, 'id'>) => void;
}

export function CheckInDialog({
  open,
  onOpenChange,
  onSubmit,
}: CheckInDialogProps) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [healingStatus, setHealingStatus] = useState<CheckIn['healingStatus'] | ''>('');
  const [notes, setNotes] = useState('');
  const [touchUpNeeded, setTouchUpNeeded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!healingStatus) return;
    onSubmit({ date, healingStatus, notes, touchUpNeeded });
    setDate(new Date().toISOString().split('T')[0]);
    setHealingStatus('');
    setNotes('');
    setTouchUpNeeded(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Check-in</DialogTitle>
          <DialogDescription>
            Record how the tattoo is healing.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="checkin-date">Date</Label>
            <Input
              id="checkin-date"
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Healing Status *</Label>
            <Select
              value={healingStatus}
              onValueChange={(value) =>
                setHealingStatus(value as CheckIn['healingStatus'])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="How is it healing?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="minor_issues">Minor Issues</SelectItem>
                <SelectItem value="complications">Complications</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="checkin-notes">Notes</Label>
            <Textarea
              id="checkin-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any observations..."
              rows={3}
            />
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="checkin-touchup"
              checked={touchUpNeeded}
              onCheckedChange={(checked) => setTouchUpNeeded(checked === true)}
            />
            <Label htmlFor="checkin-touchup" className="font-normal cursor-pointer">
              Touch-up Needed
            </Label>
          </div>
          <Button type="submit" className="w-full" disabled={!healingStatus}>
            Save Check-in
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
