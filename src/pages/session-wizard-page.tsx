import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAccounts } from '@/hooks/use-accounts';
import { useSessions } from '@/hooks/use-sessions';
import { createEmptyDraft } from '@/lib/session-defaults';
import { WizardBasics } from '@/components/wizard/wizard-basics';
import { WizardTechnical } from '@/components/wizard/wizard-technical';
import { WizardPhotos } from '@/components/wizard/wizard-photos';
import { WizardNotes } from '@/components/wizard/wizard-notes';
import { WizardNav } from '@/components/wizard/wizard-nav';
import { Button } from '@/components/ui/button';
import type { SessionDraft } from '@/types/session';

export function SessionWizardPage() {
  const { id: accountId, sessionId } = useParams<{
    id: string;
    sessionId?: string;
  }>();
  const navigate = useNavigate();
  const { getById: getAccountById } = useAccounts();
  const { getById: getSessionById, createSession, updateSession } = useSessions();

  const account = accountId ? getAccountById(accountId) : undefined;
  const existingSession = sessionId ? getSessionById(sessionId) : undefined;
  const isEditMode = !!sessionId;

  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<SessionDraft>(createEmptyDraft);

  useEffect(() => {
    if (existingSession) {
      setDraft({
        date: existingSession.date,
        artistName: existingSession.artistName,
        description: existingSession.description,
        bodyPlacement: existingSession.bodyPlacement,
        size: existingSession.size,
        needleConfig: existingSession.needleConfig,
        inkBrands: existingSession.inkBrands,
        inkColors: existingSession.inkColors,
        machineType: existingSession.machineType,
        stencilMethod: existingSession.stencilMethod,
        durationMinutes: existingSession.durationMinutes,
        healingOutcome: existingSession.healingOutcome,
        healingNotes: existingSession.healingNotes,
        touchUpNeeded: existingSession.touchUpNeeded,
        touchUpNotes: existingSession.touchUpNotes,
        followUpDate: existingSession.followUpDate,
      });
    }
  }, [existingSession]);

  if (!account) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-4">
        <h1 className="text-2xl font-bold">Client Not Found</h1>
        <Link to="/">
          <Button variant="outline">Back to Search</Button>
        </Link>
      </div>
    );
  }

  const handleChange = (updates: Partial<SessionDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const handleSave = () => {
    if (!draft.date) {
      setStep(0);
      return;
    }

    if (isEditMode && sessionId) {
      updateSession(sessionId, draft);
    } else {
      createSession(accountId!, draft);
    }
    navigate(`/account/${accountId}`);
  };

  const stepContent = [
    <WizardBasics
      key="basics"
      data={{
        date: draft.date ?? '',
        artistName: draft.artistName ?? '',
        description: draft.description ?? '',
        bodyPlacement: draft.bodyPlacement ?? '',
        size: draft.size ?? '',
      }}
      onChange={handleChange}
    />,
    <WizardTechnical
      key="technical"
      data={{
        needleConfig: draft.needleConfig ?? '',
        inkBrands: draft.inkBrands ?? '',
        inkColors: draft.inkColors ?? '',
        machineType: draft.machineType ?? '',
        stencilMethod: draft.stencilMethod ?? '',
        durationMinutes: draft.durationMinutes ?? null,
      }}
      onChange={handleChange}
    />,
    <WizardPhotos key="photos" />,
    <WizardNotes
      key="notes"
      data={{
        healingNotes: draft.healingNotes ?? '',
        followUpDate: draft.followUpDate ?? '',
      }}
      onChange={handleChange}
    />,
  ];

  return (
    <div className="min-h-screen p-4 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link
            to={`/account/${accountId}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            &larr; {account.name}
          </Link>
          <h1 className="text-2xl font-bold">
            {isEditMode ? 'Edit Session' : 'New Session'}
          </h1>
        </div>
      </div>

      <WizardNav
        currentStep={step}
        onStepClick={setStep}
        onPrev={() => setStep((s) => Math.max(0, s - 1))}
        onNext={() => setStep((s) => Math.min(3, s + 1))}
        onSave={handleSave}
      />

      <div className="py-2">{stepContent[step]}</div>
    </div>
  );
}
