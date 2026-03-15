import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STEPS = ['Basics', 'Technical', 'Photos', 'Notes'];

interface WizardNavProps {
  currentStep: number;
  onStepClick: (step: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onSave: () => void;
}

export function WizardNav({
  currentStep,
  onStepClick,
  onPrev,
  onNext,
  onSave,
}: WizardNavProps) {
  const isLast = currentStep === STEPS.length - 1;
  const isFirst = currentStep === 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center gap-2">
        {STEPS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => onStepClick(i)}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
              i === currentStep
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-accent'
            )}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-background/20 text-xs">
              {i + 1}
            </span>
            {label}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isFirst}
        >
          Previous
        </Button>
        {isLast ? (
          <Button type="button" onClick={onSave}>
            Save &amp; Finish
          </Button>
        ) : (
          <Button type="button" onClick={onNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
