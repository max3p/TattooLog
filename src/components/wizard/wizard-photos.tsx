import { ImageIcon } from 'lucide-react';

export function WizardPhotos() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-muted-foreground space-y-4">
      <ImageIcon className="h-16 w-16" />
      <p className="text-lg font-medium">Photo uploads coming soon</p>
      <p className="text-sm text-center max-w-sm">
        In a future update, you'll be able to attach reference images, stencil
        photos, fresh tattoo photos, and healed progress shots.
      </p>
    </div>
  );
}
