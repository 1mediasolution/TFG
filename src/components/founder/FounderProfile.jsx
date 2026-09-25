import React from 'react';
import { FounderHeader } from './FounderHeader';
import { FounderStory } from './FounderStory';
import { CaseStudies } from './CaseStudies';
import { FounderArticles } from './FounderArticles';

export const FounderProfile = ({
  member,
  onOpenCredentialPack,
  onOpenInquiry,
  onSelectArticle,
  isOwner = false,
}) => {
  if (!member) return null;

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6">
      <FounderHeader
        member={member}
        onOpenCredentialPack={onOpenCredentialPack}
        onOpenInquiry={onOpenInquiry}
        isOwner={isOwner}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <FounderStory member={member} />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <CaseStudies caseStudies={member.caseStudies} />
          <FounderArticles
            articles={member.articles || []}
            onSelectArticle={onSelectArticle}
          />
        </div>
      </div>
    </div>
  );
};

export default FounderProfile;
