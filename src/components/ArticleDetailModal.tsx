import React from 'react';
import { X, Clock, Eye, Share2, Bookmark, CheckCircle2, Globe, ArrowRight, ExternalLink } from 'lucide-react';
import { NewsArticle, FounderMember } from '../types';

interface ArticleDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  members: FounderMember[];
  onOpenSubdomain: (subdomain: string) => void;
  onOpenPortfolio?: (member: FounderMember) => void;
  customDomain?: string;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  members,
  onOpenSubdomain,
  onOpenPortfolio,
  customDomain = 'thefoundergrid.com'
}) => {
  if (!article) return null;

  // Check if author matches one of our registered members
  const memberAuthor = article.author.subdomain
    ? members.find((m) => m.subdomain === article.author.subdomain)
    : undefined;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://thefoundergrid.com/news/${article.slug}`);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div id="article-detail-overlay" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        id="article-detail-modal"
        className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col my-auto"
      >
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-20 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs">
            <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20">
              {article.category}
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-400 font-mono">{article.readTime}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              title="Share article link"
              className="p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              id="close-article-modal-button"
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="font-editorial text-2xl sm:text-4xl text-neutral-100 font-semibold leading-tight">
              {article.title}
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed border-l-2 border-amber-500 pl-4 py-1">
              {article.excerpt}
            </p>
          </div>

          {/* Featured Image */}
          <div className="w-full h-64 sm:h-96 rounded-xl overflow-hidden border border-neutral-800 relative">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Key Takeaways */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                <span>Executive Summary & Takeaways</span>
              </div>
              <ul className="space-y-2 text-sm text-neutral-300">
                {article.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Article Body */}
          <div className="prose prose-invert max-w-none text-neutral-200 text-base leading-relaxed space-y-4 font-sans">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author Bio Box / Subdomain Integration */}
          <div className="border-t border-neutral-800 pt-8 mt-10">
            <div className="bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/40"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-base font-semibold text-neutral-100">
                      {article.author.name}
                    </span>
                    {article.author.isVerifiedFounder && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[11px] font-semibold border border-amber-500/30">
                        Verified Founder
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">{article.author.role}</p>
                  {article.author.subdomain && (
                    <p className="text-xs text-amber-400/90 font-mono mt-1">
                      Subdomain: {article.author.subdomain}.thefoundergrid.com
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                {article.author.subdomain && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSubdomain(article.author.subdomain!);
                    }}
                    className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 hover:text-amber-400 text-xs font-semibold transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>View Subdomain</span>
                  </button>
                )}
                {memberAuthor && onOpenPortfolio && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPortfolio(memberAuthor);
                    }}
                    className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-colors"
                  >
                    <span>View Portfolio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
