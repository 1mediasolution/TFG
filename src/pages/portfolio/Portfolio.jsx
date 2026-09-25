import React, { useState } from 'react';
import { FounderProfile } from '../../components/founder/FounderProfile';
import { MemberCredentialPackModal } from '../../components/features/community/MemberCredentialPackModal';
import { useAuth } from '../../hooks/useAuth';

export const Portfolio = () => {
  const auth = useAuth();
  const [showCredentialPack, setShowCredentialPack] = useState(false);
  const member = auth.user;

  if (!member) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center text-xs text-zinc-500">
        Please sign in to view your portfolio.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <FounderProfile
        member={member}
        onOpenCredentialPack={() => setShowCredentialPack(true)}
        isOwner={true}
      />

      {showCredentialPack && (
        <MemberCredentialPackModal
          member={member}
          isOpen={showCredentialPack}
          onClose={() => setShowCredentialPack(false)}
        />
      )}
    </div>
  );
};

export default Portfolio;
