import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { SubdomainPublisher } from '../../components/features/studio/SubdomainPublisher';
import { SubdomainViewModal } from '../../components/features/studio/SubdomainViewModal';
import { CustomDomainModal } from '../../components/features/membership/CustomDomainModal';
import { MembershipModal } from '../../components/features/membership/MembershipModal';
import { useAuth } from '../../hooks/useAuth';

export const FounderDashboard = () => {
  const auth = useAuth();
  const [currentUser, setCurrentUser] = useState(auth.user);
  const [showSubdomainModal, setShowSubdomainModal] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [customDomain, setCustomDomain] = useState('thefoundergrid.com');

  const handlePublishArticle = (articleData) => {
    const newArt = {
      id: 'art_' + Date.now(),
      views: 1,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ...articleData,
    };
    const updated = {
      ...currentUser,
      publishedArticlesCount: (currentUser.publishedArticlesCount || 0) + 1,
      quotaUsed: (currentUser.quotaUsed || 0) + 1,
      articles: [newArt, ...(currentUser.articles || [])],
    };
    setCurrentUser(updated);
    auth.updateUser(updated);
  };

  const handleUpdateSubdomain = (newSubdomain) => {
    const updated = { ...currentUser, subdomain: newSubdomain };
    setCurrentUser(updated);
    auth.updateUser(updated);
  };

  return (
    <DashboardLayout
      title="Editorial Subdomain Studio"
      subtitle={`Publish executive analyses under ${currentUser?.subdomain || 'founder'}.${customDomain}`}
    >
      <SubdomainPublisher
        currentUser={currentUser}
        onPublishArticle={handlePublishArticle}
        onOpenSubdomainView={() => setShowSubdomainModal(true)}
        onOpenDomainModal={() => setShowDomainModal(true)}
        onOpenMembershipModal={() => setShowMembershipModal(true)}
        onUpdateSubdomain={handleUpdateSubdomain}
        customDomain={customDomain}
      />

      {showSubdomainModal && (
        <SubdomainViewModal
          isOpen={showSubdomainModal}
          onClose={() => setShowSubdomainModal(false)}
          member={currentUser}
          customDomain={customDomain}
        />
      )}

      {showDomainModal && (
        <CustomDomainModal
          isOpen={showDomainModal}
          onClose={() => setShowDomainModal(false)}
          member={currentUser}
          currentDomain={customDomain}
          onSaveDomain={(dom) => setCustomDomain(dom)}
        />
      )}

      {showMembershipModal && (
        <MembershipModal
          isOpen={showMembershipModal}
          onClose={() => setShowMembershipModal(false)}
          currentTier={currentUser.tier}
          onSelectTier={(tier) => {
            const updated = { ...currentUser, tier };
            setCurrentUser(updated);
            auth.updateUser(updated);
            setShowMembershipModal(false);
          }}
        />
      )}
    </DashboardLayout>
  );
};

export default FounderDashboard;
