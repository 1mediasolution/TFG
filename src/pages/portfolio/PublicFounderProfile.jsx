import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FounderProfile } from '../../components/founder/FounderProfile';
import { MemberCredentialPackModal } from '../../components/features/community/MemberCredentialPackModal';
import { InquiryFormModal } from '../../components/features/membership/InquiryFormModal';
import { ArticleDetailModal } from '../../components/features/news/ArticleDetailModal';
import { founderService } from '../../services/founderService';
import { Button } from '../../components/common/Button';
import { ArrowLeft, Globe } from 'lucide-react';

export const PublicFounderProfile = () => {
  const { subdomain } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCredentialPack, setShowCredentialPack] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    if (subdomain) {
      founderService.getFounderBySubdomain(subdomain).then((res) => {
        setMember(res);
        setLoading(false);
      });
    }
  }, [subdomain]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
        <Globe className="w-10 h-10 text-zinc-400 mx-auto" />
        <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Subdomain Not Found
        </h3>
        <p className="text-xs text-zinc-500">
          No active founder dossier is published at <span className="font-mono text-amber-600 font-bold">{subdomain}.thefoundergrid.com</span>.
        </p>
        <Link to="/directory">
          <Button variant="outline" size="sm" icon={ArrowLeft}>
            Back to Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Subdomain Breadcrumb Banner */}
      <div className="flex items-center justify-between p-3 px-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-mono font-semibold">
          <Globe className="w-3.5 h-3.5" />
          <span>https://{member.subdomain}.thefoundergrid.com</span>
        </div>
        <Link to="/directory" className="text-zinc-600 dark:text-zinc-400 hover:text-amber-600">
          ← Directory
        </Link>
      </div>

      <FounderProfile
        member={member}
        onOpenCredentialPack={() => setShowCredentialPack(true)}
        onOpenInquiry={() => setShowInquiryModal(true)}
        onSelectArticle={(art) => setSelectedArticle(art)}
        isOwner={false}
      />

      {showCredentialPack && (
        <MemberCredentialPackModal
          member={member}
          isOpen={showCredentialPack}
          onClose={() => setShowCredentialPack(false)}
        />
      )}

      {showInquiryModal && (
        <InquiryFormModal
          isOpen={showInquiryModal}
          onClose={() => setShowInquiryModal(false)}
          targetMember={member}
        />
      )}

      {selectedArticle && (
        <ArticleDetailModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          members={member ? [member] : []}
        />
      )}
    </div>
  );
};

export default PublicFounderProfile;
