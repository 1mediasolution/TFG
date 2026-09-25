import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { FounderProfile as FounderProfileView } from '../../components/founder/FounderProfile';
import { MemberCredentialPackModal } from '../../components/features/community/MemberCredentialPackModal';
import { Button } from '../../components/common/Button';
import { Award, Globe, ExternalLink, Printer } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const MyPortfolio = () => {
  const auth = useAuth();
  const [showCredentialPack, setShowCredentialPack] = useState(false);
  const user = auth.user;

  return (
    <DashboardLayout
      title="My Executive Portfolio & Dossier"
      subtitle={`Live at ${user?.subdomain || 'founder'}.thefoundergrid.com`}
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Award}
            onClick={() => setShowCredentialPack(true)}
          >
            Generate Credential Pack
          </Button>
          <a
            href={`/portfolio/${user?.subdomain}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950"
          >
            <Globe className="w-3.5 h-3.5 text-amber-500" />
            <span>Public View</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      }
    >
      <FounderProfileView
        member={user}
        onOpenCredentialPack={() => setShowCredentialPack(true)}
        isOwner={true}
      />

      {showCredentialPack && (
        <MemberCredentialPackModal
          isOpen={showCredentialPack}
          onClose={() => setShowCredentialPack(false)}
          member={user}
        />
      )}
    </DashboardLayout>
  );
};

export default MyPortfolio;
