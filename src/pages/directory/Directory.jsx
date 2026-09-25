import React, { useState, useEffect } from 'react';
import { DirectoryFilters } from '../../components/directory/DirectoryFilters';
import { MemberCard } from '../../components/directory/MemberCard';
import { CustomPortfolioModal } from '../../components/features/community/CustomPortfolioModal';
import { MemberCredentialPackModal } from '../../components/features/community/MemberCredentialPackModal';
import { InquiryFormModal } from '../../components/features/membership/InquiryFormModal';
import { INITIAL_MEMBERS } from '../../data/mockData';
import { directoryService } from '../../services/directoryService';

export const Directory = () => {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [tierFilter, setTierFilter] = useState('All');
  const [verificationFilter, setVerificationFilter] = useState('All');

  const [selectedMember, setSelectedMember] = useState(null);
  const [credentialPackMember, setCredentialPackMember] = useState(null);
  const [inquiryMember, setInquiryMember] = useState(null);

  useEffect(() => {
    directoryService
      .searchMembers({
        query: searchQuery,
        role: roleFilter,
        tier: tierFilter,
        verified: verificationFilter,
      })
      .then((res) => setMembers(res));
  }, [searchQuery, roleFilter, tierFilter, verificationFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Syndicate Member Directory
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2 max-w-2xl">
          Verified directory of founders, enterprise operators, and accredited institutional investors across North America, Europe, and Asia.
        </p>
      </div>

      {/* Filter Bar */}
      <DirectoryFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        roleFilter={roleFilter}
        onRoleChange={setRoleFilter}
        tierFilter={tierFilter}
        onTierChange={setTierFilter}
        verificationFilter={verificationFilter}
        onVerificationChange={setVerificationFilter}
        totalResults={members.length}
      />

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onSelect={(m) => setSelectedMember(m)}
            onOpenPortfolio={(m) => setSelectedMember(m)}
          />
        ))}
      </div>

      {/* Portfolio Dossier Modal */}
      {selectedMember && (
        <CustomPortfolioModal
          member={selectedMember}
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          onOpenCredentialPack={(m) => setCredentialPackMember(m)}
          onOpenInquiry={(m) => setInquiryMember(m)}
        />
      )}

      {/* Credential Pack Modal */}
      {credentialPackMember && (
        <MemberCredentialPackModal
          member={credentialPackMember}
          isOpen={!!credentialPackMember}
          onClose={() => setCredentialPackMember(null)}
        />
      )}

      {/* Inquiry Modal */}
      {inquiryMember && (
        <InquiryFormModal
          isOpen={!!inquiryMember}
          onClose={() => setInquiryMember(null)}
          targetMember={inquiryMember}
        />
      )}
    </div>
  );
};

export default Directory;
