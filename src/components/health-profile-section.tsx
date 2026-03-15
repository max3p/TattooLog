import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type {
  HealthProfile,
  Allergy,
  MedicalFlag,
  ConsentRecord,
} from '@/types/account';
import { getHealthProfile, getWaiverStatus } from '@/lib/consent-utils';
import { formatDate, getFlagLabel, getAllergyTypeLabel } from '@/lib/format-utils';
import { EditAllergiesDialog } from '@/components/edit-allergies-dialog';
import { EditMedicalFlagsDialog } from '@/components/edit-medical-flags-dialog';
import { EditConsentDialog } from '@/components/edit-consent-dialog';

interface HealthProfileSectionProps {
  healthProfile?: HealthProfile;
  onUpdate: (profile: HealthProfile) => void;
}

function WaiverStatusBadge({ consent }: { consent: ConsentRecord }) {
  const status = getWaiverStatus(consent);

  if (status === 'missing') {
    return <Badge variant="outline">Missing</Badge>;
  }
  return (
    <Badge className="bg-[#5F7154] hover:bg-[#5F7154] text-white">
      Current
    </Badge>
  );
}

export function HealthProfileSection({
  healthProfile,
  onUpdate,
}: HealthProfileSectionProps) {
  const profile = getHealthProfile(healthProfile);
  const activeFlags = profile.medicalFlags.filter((f) => f.active);

  const [allergiesOpen, setAllergiesOpen] = useState(false);
  const [flagsOpen, setFlagsOpen] = useState(false);
  const [consentOpen, setConsentOpen] = useState(false);

  const handleAllergyUpdate = (data: {
    allergies: Allergy[];
    skinType: string;
    skinNotes: string;
  }) => {
    onUpdate({ ...profile, ...data });
  };

  const handleFlagsUpdate = (flags: MedicalFlag[]) => {
    onUpdate({ ...profile, medicalFlags: flags });
  };

  const handleConsentUpdate = (consent: ConsentRecord) => {
    onUpdate({ ...profile, consent });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Health Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Allergies & Skin Notes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Allergies & Skin</h3>
              <Button
                variant={profile.allergies.length > 0 || profile.skinType ? 'ghost' : 'outline'}
                size="sm"
                onClick={() => setAllergiesOpen(true)}
              >
                {profile.allergies.length > 0 || profile.skinType ? 'Edit' : 'Add'}
              </Button>
            </div>
            {profile.allergies.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {profile.allergies.map((a) => (
                  <Badge
                    key={a.id}
                    variant={a.type === 'latex' ? 'destructive' : 'secondary'}
                  >
                    {getAllergyTypeLabel(a.type)}
                    {a.description ? `: ${a.description}` : ''}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No allergies recorded
              </p>
            )}
            {profile.skinType && (
              <p className="text-sm">
                <span className="text-muted-foreground">Skin type: </span>
                {profile.skinType}
              </p>
            )}
            {profile.skinNotes && (
              <p className="text-sm text-muted-foreground">
                {profile.skinNotes}
              </p>
            )}
          </div>

          <Separator />

          {/* Medical Flags */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Medical Flags</h3>
              <Button
                variant={activeFlags.length > 0 ? 'ghost' : 'outline'}
                size="sm"
                onClick={() => setFlagsOpen(true)}
              >
                {activeFlags.length > 0 ? 'Edit' : 'Add'}
              </Button>
            </div>
            {activeFlags.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {activeFlags.map((f) => (
                  <Badge
                    key={f.id}
                    className="bg-[#8C4B42] hover:bg-[#8C4B42] text-white"
                  >
                    {getFlagLabel(f.flag, f.customLabel)}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No medical flags</p>
            )}
          </div>

          <Separator />

          {/* Consent & Waiver */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Consent & Waiver</h3>
              <Button
                variant={profile.consent.signed ? 'ghost' : 'outline'}
                size="sm"
                onClick={() => setConsentOpen(true)}
              >
                {profile.consent.signed ? 'Edit' : 'Add'}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <WaiverStatusBadge consent={profile.consent} />
              {profile.consent.signedDate && (
                <span className="text-sm text-muted-foreground">
                  Signed {formatDate(profile.consent.signedDate)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <EditAllergiesDialog
        open={allergiesOpen}
        onOpenChange={setAllergiesOpen}
        allergies={profile.allergies}
        skinType={profile.skinType}
        skinNotes={profile.skinNotes}
        onSave={handleAllergyUpdate}
      />
      <EditMedicalFlagsDialog
        open={flagsOpen}
        onOpenChange={setFlagsOpen}
        medicalFlags={profile.medicalFlags}
        onSave={handleFlagsUpdate}
      />
      <EditConsentDialog
        open={consentOpen}
        onOpenChange={setConsentOpen}
        consent={profile.consent}
        onSave={handleConsentUpdate}
      />
    </>
  );
}
