import React, { useState } from 'react';
import {
  X,
  Globe,
  ShieldCheck,
  Clock,
  Eye,
  ExternalLink,
  ArrowLeft,
  Share2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  BookOpen,
  Send,
  Linkedin,
  Mail,
  Phone,
  Lock,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { FounderMember, MemberArticle } from '../types';
import { FounderGridLogo } from './FounderGridLogo';

interface SubdomainViewModalProps {
  subdomain: string | null;
  members: FounderMember[];
  onClose: () => void;
  onOpenPortfolio: (member: FounderMember) => void;
  onOpenInquiryModal?: (member: FounderMember) => void;
  customDomain?: string;
}

export const SubdomainViewModal: React.FC<SubdomainViewModalProps> = ({
  subdomain,
  members,
  onClose,
  onOpenPortfolio,
  onOpenInquiryModal,
  customDomain = 'thefoundergrid.com'
}) => {
  const [selectedArticle, setSelectedArticle] = useState<MemberArticle | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;

  if (!subdomain) return null;

  const member = members.find((m) => m.subdomain.toLowerCase() === subdomain.toLowerCase());

  if (!member) {
    return (
      <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 max-w-md text-center space-y-4 text-neutral-100">
          <Globe className="w-10 h-10 text-neutral-500 mx-auto" />
          <h3 className="text-lg font-bold text-neutral-200">Subdomain Not Found</h3>
          <p className="text-xs text-neutral-400">
            The subdomain <code className="text-amber-400">{subdomain}.{customDomain}</code> has not been claimed yet.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 text-neutral-200 text-xs rounded-lg font-semibold"
          >
            Return to Grid
          </button>
        </div>
      </div>
    );
  }

  // Approved articles for this member's subdomain
  const approvedArticles = member.articles.filter((a) => a.status === 'approved');

  // Pagination
  const totalPages = Math.max(1, Math.ceil(approvedArticles.length / articlesPerPage));
  const paginatedArticles = approvedArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <div id="subdomain-preview-overlay" className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden shadow-2xl flex flex-col my-auto text-neutral-100">
        {/* Browser Mock Navigation Bar */}
        <div className="bg-neutral-900 border-b border-neutral-800 px-4 py-3 flex items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>

          <div className="flex-1 max-w-2xl bg-neutral-950 border border-neutral-700/80 rounded-lg px-3 py-1.5 flex items-center justify-between text-neutral-300 font-mono text-[11px] sm:text-xs">
            <div className="flex items-center space-x-2 overflow-hidden text-ellipsis whitespace-nowrap">
              <FounderGridLogo variant="mark" size="xs" theme="dark" />
              <span className="text-emerald-400">https://</span>
              <span className="text-amber-400 font-semibold">{member.subdomain}</span>
              <span className="text-neutral-400">.{customDomain}</span>
              {selectedArticle && <span className="text-neutral-500">/articles/{selectedArticle.id}</span>}
            </div>
            <span className="text-[10px] bg-emerald-950/70 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-800 shrink-0">
              Verified DNS
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Subdomain Webpage Content */}
        <div className="flex-1 overflow-y-auto bg-neutral-950 text-neutral-100">
          {/* Subdomain Masthead */}
          <div className="border-b border-neutral-800 bg-gradient-to-b from-neutral-900/60 to-neutral-950 px-6 sm:px-12 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-amber-500/60 shadow-lg"
              />
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-100">{member.name}</h1>
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {member.membershipBadge}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-neutral-300 font-medium">
                  {member.title} at <strong className="text-neutral-100">{member.companyName}</strong>
                </div>
                <div className="text-xs text-neutral-400 font-mono">
                  {member.industry} • {member.location}
                </div>
              </div>
            </div>

            {/* Connect Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={member.linkedinUrl || member.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-neutral-900 hover:bg-neutral-800 text-sky-400 border border-neutral-700 rounded-xl transition-colors"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {onOpenInquiryModal && (
                <button
                  onClick={() => onOpenInquiryModal(member)}
                  className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Inquiry</span>
                </button>
              )}

              <button
                onClick={() => onOpenPortfolio(member)}
                className="px-3.5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5"
              >
                <span>Full Portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Privacy & Contact Banner */}
          <div className="bg-neutral-900/40 border-b border-neutral-800 px-6 sm:px-12 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-neutral-500" />
                {member.privacy?.showEmail ? (
                  <span className="font-mono text-amber-400">{member.email || 'contact@thefoundergrid.com'}</span>
                ) : (
                  <span className="text-neutral-500 flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span>Email protected by privacy toggle</span>
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-neutral-500" />
                {member.privacy?.showPhone ? (
                  <span className="font-mono text-amber-400">{member.phone || '+91 98200 12345'}</span>
                ) : (
                  <span className="text-neutral-500 flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span>Phone protected by privacy toggle</span>
                  </span>
                )}
              </div>
            </div>

            <div className="text-[11px] text-neutral-400 font-mono">
              The Founder Grid Verified Host: <span className="text-amber-400">{member.subdomain}.{customDomain}</span>
            </div>
          </div>

          {/* Body Section: Article Detail or Paginated Articles Grid */}
          <div className="p-6 sm:p-12 space-y-8">
            {selectedArticle ? (
              <div className="space-y-6 max-w-3xl mx-auto">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="inline-flex items-center space-x-2 text-amber-400 hover:text-amber-300 text-xs font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to All Articles</span>
                </button>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-neutral-400 font-mono">
                    <span className="text-amber-400 font-bold uppercase">{selectedArticle.category}</span>
                    <span>•</span>
                    <span>{selectedArticle.publishedAt}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                    <span>•</span>
                    <span>{selectedArticle.views.toLocaleString()} views</span>
                  </div>

                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-100 leading-tight">
                    {selectedArticle.title}
                  </h2>

                  <p className="text-sm text-neutral-300 font-medium italic border-l-2 border-amber-500 pl-3">
                    {selectedArticle.subtitle}
                  </p>
                </div>

                <div className="prose prose-invert max-w-none text-xs sm:text-sm text-neutral-200 leading-relaxed space-y-4 pt-4 border-t border-neutral-800">
                  {selectedArticle.content.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 font-mono">Published via {member.subdomain}.{customDomain}</span>
                  {onOpenInquiryModal && (
                    <button
                      onClick={() => onOpenInquiryModal(member)}
                      className="text-amber-400 hover:underline font-bold"
                    >
                      Inquire with {member.name} regarding this article
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <div>
                    <h3 className="font-editorial text-xl font-bold text-neutral-100">
                      Dispatches & Thought Leadership
                    </h3>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Vetted analysis published weekly under The Founder Grid Syndicate
                    </p>
                  </div>

                  <span className="text-xs font-mono text-amber-400">
                    {approvedArticles.length} Published
                  </span>
                </div>

                {paginatedArticles.length === 0 ? (
                  <div className="p-12 text-center text-xs text-neutral-500 bg-neutral-900/30 rounded-2xl border border-neutral-800">
                    No approved articles published on this subdomain yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => setSelectedArticle(art)}
                        className="bg-neutral-900/50 border border-neutral-800 hover:border-amber-500/40 rounded-2xl p-6 space-y-3 cursor-pointer transition-all hover:shadow-xl group"
                      >
                        <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                          <span className="bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded font-sans font-bold uppercase">
                            {art.category}
                          </span>
                          <span>{art.readTime}</span>
                        </div>

                        <h4 className="font-editorial text-base font-bold text-neutral-100 group-hover:text-amber-400 transition-colors leading-snug">
                          {art.title}
                        </h4>

                        <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed">
                          {art.subtitle}
                        </p>

                        <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500 font-mono">
                          <span>{art.publishedAt}</span>
                          <span className="text-amber-400 flex items-center space-x-1">
                            <Eye className="w-3.5 h-3.5" />
                            <span>{art.views.toLocaleString()}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center space-x-3 pt-6 border-t border-neutral-800 text-xs">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="font-mono text-neutral-400">
                      Page <strong className="text-neutral-100">{currentPage}</strong> of {totalPages}
                    </span>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
