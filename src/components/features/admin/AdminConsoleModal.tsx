import React, { useState } from 'react';
import {
  X,
  Shield,
  FileCheck,
  Newspaper,
  Layout,
  Users,
  Inbox,
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ExternalLink,
  PlusCircle,
  RefreshCw,
  Bell,
  Eye,
  Send,
  Sliders,
  AlertTriangle,
  Loader2,
  Wand2,
  Database
} from 'lucide-react';
import { requestAIGenerateArticle } from '../../../services/aiArticleService';
import {
  FounderMember,
  MemberArticle,
  NewsArticle,
  Advertisement,
  VisitorInquiry,
  AutomatedEmailNotification,
  ArticleCategory,
  EmailTriggerType,
  AdSlotId
} from '../../../types';
import { FounderGridLogo } from '../../common/FounderGridLogo';
import { SupabaseStatusCard } from './SupabaseStatusCard';

interface AdminConsoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  members: FounderMember[];
  newsArticles: NewsArticle[];
  ads: Advertisement[];
  inquiries: VisitorInquiry[];
  emailNotifications: AutomatedEmailNotification[];
  onApproveArticle: (memberId: string, articleId: string) => void;
  onRejectArticle: (memberId: string, articleId: string, remarks: string) => void;
  onPublishAdminNews: (news: Omit<NewsArticle, 'id' | 'views'>) => void;
  onUpdateAd: (updatedAd: Advertisement) => void;
  onResetWeeklyQuotas: () => void;
  onTriggerSimulatedEmail: (triggerType: EmailTriggerType, member: FounderMember) => void;
  onUpdateInquiryStatus: (inquiryId: string, status: VisitorInquiry['status']) => void;
  onToggleMemberVerification: (memberId: string) => void;
  customDomain?: string;
}

export const AdminConsoleModal: React.FC<AdminConsoleModalProps> = ({
  isOpen,
  onClose,
  members,
  newsArticles,
  ads,
  inquiries,
  emailNotifications,
  onApproveArticle,
  onRejectArticle,
  onPublishAdminNews,
  onUpdateAd,
  onResetWeeklyQuotas,
  onTriggerSimulatedEmail,
  onUpdateInquiryStatus,
  onToggleMemberVerification,
  customDomain = 'thefoundergrid.com'
}) => {
  const [activeTab, setActiveTab] = useState<'queue' | 'news' | 'ads' | 'members' | 'inquiries' | 'emails' | 'supabase'>('queue');
  const [rejectModalArticle, setRejectModalArticle] = useState<{ memberId: string; articleId: string; title: string } | null>(null);
  const [rejectionRemarks, setRejectionRemarks] = useState('');

  // Admin New Article State
  const [adminTitle, setAdminTitle] = useState('');
  const [adminCategory, setAdminCategory] = useState<ArticleCategory>('Macro Economy');
  const [adminExcerpt, setAdminExcerpt] = useState('');
  const [adminContent, setAdminContent] = useState('');
  const [adminImage, setAdminImage] = useState('https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop');
  const [adminTakeaways, setAdminTakeaways] = useState('Capital goods surge, Private capex accelerating');
  const [isLeadEditorial, setIsLeadEditorial] = useState(true);

  // Selected Email Preview
  const [selectedEmail, setSelectedEmail] = useState<AutomatedEmailNotification | null>(null);

  if (!isOpen) return null;

  // Flatten pending articles
  const pendingArticles: { member: FounderMember; article: MemberArticle }[] = [];
  const allMemberArticles: { member: FounderMember; article: MemberArticle }[] = [];

  members.forEach((m) => {
    m.articles.forEach((art) => {
      allMemberArticles.push({ member: m, article: art });
      if (art.status === 'pending_review') {
        pendingArticles.push({ member: m, article: art });
      }
    });
  });

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiStatusMsg, setAiStatusMsg] = useState<string | null>(null);

  const handleAdminAIGenerate = async (
    targetTopic?: string,
    targetCategory?: ArticleCategory,
    autoPublish: boolean = false
  ) => {
    setIsAiGenerating(true);
    setAiStatusMsg(null);
    try {
      const cat = targetCategory || adminCategory || 'Macro Economy';
      const generated = await requestAIGenerateArticle({
        category: (['Macro Economy', 'Venture Capital', 'Fintech & Banking', 'Founders'].includes(cat)
          ? cat
          : 'Macro Economy') as any,
        topic: targetTopic || adminTitle || `Lead institutional dispatch on ${cat} dynamics`,
        authorName: 'The Founder Grid Editorial Board',
        authorRole: 'Lead Desk Admin',
        type: 'editorial'
      });

      setAdminTitle(generated.title);
      setAdminExcerpt(generated.excerpt);
      setAdminContent(generated.content);
      if (generated.category) {
        setAdminCategory(generated.category as any);
      }
      if (generated.tags && generated.tags.length > 0) {
        setAdminTakeaways(generated.tags.join(', '));
      }

      if (autoPublish) {
        onPublishAdminNews({
          title: generated.title,
          slug: generated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          category: (generated.category as any) || cat,
          excerpt: generated.excerpt,
          content: generated.content,
          author: {
            name: 'The Founder Grid Editorial Board',
            role: 'Lead Desk Admin',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
            isAdmin: true
          },
          publishedAt: 'Just now',
          readTime: generated.readTime || '4 min read',
          imageUrl: adminImage,
          keyTakeaways: generated.tags || ['Executive Intelligence', cat],
          isLeadEditorial: true,
          isFeatured: true,
          isTrending: true,
          tags: ['Admin Lead', cat]
        });
        setAiStatusMsg(`✨ AI Generated & Published Directly to Live Wire: "${generated.title.slice(0, 42)}..."`);
      } else {
        setAiStatusMsg(`✨ AI Draft Populated: "${generated.title.slice(0, 42)}..." (Review & Publish below)`);
      }
      setTimeout(() => setAiStatusMsg(null), 8000);
    } catch (err: any) {
      console.error('Admin AI generation failed:', err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleAdminPublishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminTitle.trim() || !adminContent.trim()) return;

    onPublishAdminNews({
      title: adminTitle,
      slug: adminTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: adminCategory,
      excerpt: adminExcerpt || adminContent.slice(0, 160) + '...',
      content: adminContent,
      author: {
        name: 'The Founder Grid Editorial Board',
        role: 'Lead Desk Admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
        isAdmin: true
      },
      publishedAt: 'Just now',
      readTime: `${Math.max(3, Math.ceil(adminContent.split(' ').length / 180))} min read`,
      imageUrl: adminImage,
      keyTakeaways: adminTakeaways.split(',').map((t) => t.trim()).filter(Boolean),
      isLeadEditorial,
      isFeatured: true,
      isTrending: true,
      tags: ['Admin Lead', adminCategory]
    });

    setAdminTitle('');
    setAdminExcerpt('');
    setAdminContent('');
    setActiveTab('news');
  };

  const handleConfirmRejection = () => {
    if (!rejectModalArticle) return;
    onRejectArticle(rejectModalArticle.memberId, rejectModalArticle.articleId, rejectionRemarks || 'Please align tone with institutional finance standards and add concrete metric citations.');
    setRejectModalArticle(null);
    setRejectionRemarks('');
  };

  return (
    <div id="admin-console-overlay" className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl relative flex flex-col my-auto text-neutral-100">
        {/* Top Bar */}
        <div className="bg-neutral-900 border-b border-neutral-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3.5">
            <FounderGridLogo variant="mark" size="sm" theme="dark" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-cinzel text-base font-bold text-neutral-100">
                  The Founder Grid • Admin Console & Automation
                </span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-mono font-bold">
                  SUPER ADMIN
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Editorial Review Queue • News Publisher • Ad Management • Triggers & Inquiry Audit
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-neutral-800 text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-neutral-800 bg-neutral-950 px-6 py-2 flex flex-wrap gap-2 text-xs shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shrink-0 ${
              activeTab === 'queue'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Editorial Queue</span>
            {pendingArticles.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${activeTab === 'queue' ? 'bg-neutral-950 text-amber-400' : 'bg-amber-500 text-neutral-950 font-bold'}`}>
                {pendingArticles.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shrink-0 ${
              activeTab === 'news'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Publish Lead News</span>
          </button>

          <button
            onClick={() => setActiveTab('ads')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shrink-0 ${
              activeTab === 'ads'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Ad Spaces ({ads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shrink-0 ${
              activeTab === 'members'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Members & Quotas ({members.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shrink-0 ${
              activeTab === 'inquiries'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Inquiry Audit ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('emails')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shrink-0 ${
              activeTab === 'emails'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Automated Triggers ({emailNotifications.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('supabase')}
            className={`px-3.5 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shrink-0 ${
              activeTab === 'supabase'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-neutral-800'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Supabase Backend</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: EDITORIAL REVIEW QUEUE */}
          {activeTab === 'queue' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-neutral-100">Editorial Review Queue</h3>
                  <p className="text-xs text-neutral-400">
                    Rule Enforced: Zero direct publishing. All member drafts require 1-click Admin Approval before going live on subdomains and directory.
                  </p>
                </div>
                <div className="text-xs font-mono text-amber-400 bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-800/60">
                  {pendingArticles.length} Drafts Awaiting Decision
                </div>
              </div>

              {pendingArticles.length === 0 ? (
                <div className="p-12 text-center bg-neutral-900/40 rounded-2xl border border-neutral-800 space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-neutral-200">Editorial Queue Clear</h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    All submitted member articles have been audited. When members submit new dispatches in their Subdomain Studio, they appear here instantly.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingArticles.map(({ member, article }) => (
                    <div
                      key={article.id}
                      className="bg-neutral-900/70 border border-neutral-800 hover:border-amber-500/40 rounded-2xl p-5 space-y-4 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="w-10 h-10 rounded-xl object-cover border border-amber-500/40"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-sm text-neutral-200">{member.name}</span>
                              <span className="text-[10px] text-amber-400 font-mono bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                                {member.subdomain}.{customDomain}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-400">{member.companyName} • {member.industry}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 text-xs">
                          <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-semibold text-[11px]">
                            {article.category}
                          </span>
                          <span className="text-neutral-500 font-mono text-[11px]">{article.submittedAt}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-base font-bold text-neutral-100 font-editorial">
                          {article.title}
                        </h4>
                        <p className="text-xs text-neutral-300 font-medium italic">
                          {article.subtitle}
                        </p>
                        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800/80 text-xs text-neutral-300 leading-relaxed font-sans max-h-48 overflow-y-auto whitespace-pre-wrap">
                          {article.content}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                        <div className="flex items-center space-x-2 text-[11px] text-neutral-400 font-mono">
                          <span>Est: {article.readTime}</span>
                          <span>•</span>
                          <span>Quota: {member.articlesPublishedThisWeek}/3 this week</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setRejectModalArticle({ memberId: member.id, articleId: article.id, title: article.title })}
                            className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900 border border-rose-800/60 text-rose-300 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject with Feedback</span>
                          </button>

                          <button
                            onClick={() => onApproveArticle(member.id, article.id)}
                            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>1-Click Approve & Go Live</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Previously Approved Articles List */}
              <div className="border-t border-neutral-800 pt-6 space-y-3">
                <h4 className="text-xs font-bold font-cinzel text-neutral-300 uppercase tracking-wider">
                  Audited & Approved Articles Archive
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {allMemberArticles
                    .filter(({ article }) => article.status === 'approved')
                    .map(({ member, article }) => (
                      <div key={article.id} className="bg-neutral-900/40 p-3 rounded-xl border border-neutral-800/80 flex items-center justify-between text-xs">
                        <div className="space-y-0.5">
                          <div className="font-semibold text-neutral-200 line-clamp-1">{article.title}</div>
                          <div className="text-[11px] text-neutral-400">
                            By {member.name} on <span className="text-amber-400">{member.subdomain}</span>
                          </div>
                        </div>
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800 shrink-0">
                          Live (HTTP 200)
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PUBLISH LEAD NEWS */}
          {activeTab === 'news' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-neutral-100">Publish Global Lead News & Editorial</h3>
                <p className="text-xs text-neutral-400">
                  Direct editorial publishing. Mandatory category tag required. Appears at the top of the homepage wire and syndication feed.
                </p>
              </div>

              {/* 1-Click AI Editorial Generator Box */}
              <div className="bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-900 border border-amber-500/30 rounded-2xl p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500">
                      <Wand2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-100 flex items-center gap-1.5">
                        <span>Automated 1-Click AI Lead Editorial Writer</span>
                        <span className="text-[10px] font-mono bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">
                          GEMINI AI
                        </span>
                      </h4>
                      <p className="text-xs text-neutral-400">
                        Single click generates an institutional-grade editorial piece with deep analytics and key takeaways.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleAdminAIGenerate(undefined, undefined, false)}
                      disabled={isAiGenerating}
                      className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-amber-500/40 text-amber-400 font-bold text-xs rounded-xl transition-all flex items-center space-x-1.5 disabled:opacity-50"
                    >
                      {isAiGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      <span>Fill Form</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdminAIGenerate(undefined, undefined, true)}
                      disabled={isAiGenerating}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5 disabled:opacity-50"
                    >
                      {isAiGenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                      <span>1-Click Auto-Publish</span>
                    </button>
                  </div>
                </div>

                {/* 1-Click Sector Presets */}
                <div className="space-y-1.5 pt-1 border-t border-neutral-800/60">
                  <div className="text-[11px] font-medium text-neutral-400">Quick 1-Click Sector Intelligence:</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'Macro Economy: Sovereign Capex & Growth', cat: 'Macro Economy' },
                      { label: 'Venture Capital: Term Sheet Multiples', cat: 'Venture Capital' },
                      { label: 'Fintech & Banking: Real-Time Cross-Border Rails', cat: 'Fintech & Banking' },
                      { label: 'Founders: Institutional Scaling Playbook', cat: 'Founders' }
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => handleAdminAIGenerate(item.label, item.cat as ArticleCategory, true)}
                        disabled={isAiGenerating}
                        className="text-xs px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-neutral-300 hover:text-amber-400 transition-colors flex items-center space-x-1.5 disabled:opacity-50"
                        title="Click to automatically generate and publish this article"
                      >
                        <Sparkles className="w-3 h-3 text-amber-500" />
                        <span>⚡ {item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              {aiStatusMsg && (
                <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-4 text-xs text-amber-400 flex items-center justify-between animate-fadeIn">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="font-semibold">{aiStatusMsg}</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-500">Live</span>
                </div>
              )}

              <form onSubmit={handleAdminPublishSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-neutral-300 font-medium mb-1">
                      Lead Editorial Headline <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={adminTitle}
                      onChange={(e) => setAdminTitle(e.target.value)}
                      placeholder="e.g. Reserve Bank of India Holds Benchmark Repo Rate Steady at 6.5%"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 text-sm font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">
                      Mandatory Category Tag <span className="text-amber-400">*</span>
                    </label>
                    <select
                      value={adminCategory}
                      onChange={(e) => setAdminCategory(e.target.value as ArticleCategory)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-neutral-100 focus:outline-none focus:border-amber-500"
                    >
                      <option value="Macro Economy">Macro Economy</option>
                      <option value="Venture Capital">Venture Capital</option>
                      <option value="Fintech & Banking">Fintech & Banking</option>
                      <option value="Markets">Markets</option>
                      <option value="M&A">M&A</option>
                      <option value="Tech/AI">Tech/AI</option>
                      <option value="Business">Business</option>
                      <option value="Founders">Founders</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Editorial Excerpt / Subheading
                  </label>
                  <input
                    type="text"
                    value={adminExcerpt}
                    onChange={(e) => setAdminExcerpt(e.target.value)}
                    placeholder="Brief 1-line lead summary for wire distribution"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">Hero Cover Image URL</label>
                    <input
                      type="url"
                      value={adminImage}
                      onChange={(e) => setAdminImage(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-2.5 text-neutral-100 font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-medium mb-1">Key Takeaways (Comma Separated)</label>
                    <input
                      type="text"
                      value={adminTakeaways}
                      onChange={(e) => setAdminTakeaways(e.target.value)}
                      placeholder="Takeaway 1, Takeaway 2, Takeaway 3"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-2.5 text-neutral-100 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-300 font-medium mb-1">
                    Full Article Text & Financial Analysis <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={8}
                    value={adminContent}
                    onChange={(e) => setAdminContent(e.target.value)}
                    placeholder="Compose the full authoritative briefing..."
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-sans leading-relaxed text-xs sm:text-sm"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center space-x-2 text-neutral-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isLeadEditorial}
                      onChange={(e) => setIsLeadEditorial(e.target.checked)}
                      className="rounded bg-neutral-900 border-neutral-700 text-amber-500 focus:ring-amber-500"
                    />
                    <span>Feature as Primary Homepage Lead Editorial</span>
                  </label>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold rounded-xl shadow-lg transition-all flex items-center space-x-2"
                  >
                    <span>Publish Global Lead News</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: AD SPACES MANAGEMENT */}
          {activeTab === 'ads' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-neutral-100">Ad Spaces & Revenue Inventory</h3>
                <p className="text-xs text-neutral-400">
                  Manage pre-allocated slots: Top Leaderboard, In-feed Home, Sidebars (Left/Right), and In-article breaks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ads.map((ad) => (
                  <div key={ad.id} className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[11px] font-bold text-amber-400 uppercase bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                          {ad.slot}
                        </span>
                        <span className="text-xs text-neutral-400">{ad.badge}</span>
                      </div>

                      <button
                        onClick={() => onUpdateAd({ ...ad, active: !ad.active })}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors ${
                          ad.active
                            ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800'
                            : 'bg-neutral-950 text-neutral-500 border-neutral-800'
                        }`}
                      >
                        {ad.active ? 'ACTIVE' : 'PAUSED'}
                      </button>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-bold text-neutral-200">{ad.sponsor}</div>
                      <h4 className="text-sm font-semibold text-neutral-100">{ad.title}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-2">{ad.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono pt-2 border-t border-neutral-800">
                      <div>Impressions: <strong className="text-neutral-200">{ad.impressions.toLocaleString()}</strong></div>
                      <div>Clicks: <strong className="text-amber-400">{ad.clicks.toLocaleString()}</strong></div>
                      <div>CTR: <strong className="text-emerald-400">{((ad.clicks / Math.max(1, ad.impressions)) * 100).toFixed(2)}%</strong></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MEMBERS & QUOTAS */}
          {activeTab === 'members' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-cinzel text-lg font-bold text-neutral-100">Founders & Investors Syndicate Management</h3>
                  <p className="text-xs text-neutral-400">
                    Hard publishing cap: 3 articles per calendar week per member. Quotas auto-reset every Monday at 00:00.
                  </p>
                </div>

                <button
                  onClick={onResetWeeklyQuotas}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/40 rounded-xl text-xs font-semibold transition-all flex items-center space-x-2 self-start sm:self-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Simulate Monday 00:00 Quota Reset</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-neutral-800 rounded-2xl overflow-hidden">
                  <thead className="bg-neutral-900/80 text-neutral-400 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-3">Member & Company</th>
                      <th className="p-3">Role & Tier</th>
                      <th className="p-3">Subdomain Hub</th>
                      <th className="p-3">Articles This Week (Cap: 3)</th>
                      <th className="p-3">Badge</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 bg-neutral-950">
                    {members.map((m) => (
                      <tr key={m.id} className="hover:bg-neutral-900/50 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center space-x-2.5">
                            <img src={m.avatarUrl} alt={m.name} className="w-8 h-8 rounded-lg object-cover" />
                            <div>
                              <div className="font-bold text-neutral-200">{m.name}</div>
                              <div className="text-[11px] text-neutral-400">{m.companyName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="font-medium text-neutral-300">{m.role}</span>
                          <span className="block text-[10px] text-neutral-500">{m.membershipTier}</span>
                        </td>
                        <td className="p-3 font-mono text-amber-400">
                          {m.subdomain}.{customDomain}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-1.5">
                            <div className="w-16 bg-neutral-800 h-2 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${m.articlesPublishedThisWeek >= 3 ? 'bg-rose-500' : 'bg-amber-500'}`}
                                style={{ width: `${(m.articlesPublishedThisWeek / 3) * 100}%` }}
                              />
                            </div>
                            <span className="font-mono text-xs font-bold text-neutral-200">
                              {m.articlesPublishedThisWeek}/3
                            </span>
                          </div>
                        </td>
                        <td className="p-3">
                          <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold">
                            {m.membershipBadge}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => onToggleMemberVerification(m.id)}
                            className={`px-2 py-1 rounded text-[10px] font-semibold border transition-colors ${
                              m.isVerified
                                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                                : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                            }`}
                          >
                            {m.isVerified ? 'Verified' : 'Unverified'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: VISITOR INQUIRY AUDIT LOG */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-neutral-100">Visitor Inquiry Audit Log</h3>
                <p className="text-xs text-neutral-400">
                  Comprehensive audit trail of commercial inquiries submitted via founder subdomains. Dispatched instantly to both member dashboard & admin log.
                </p>
              </div>

              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-neutral-100 text-sm">{inq.senderName}</span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-xs text-neutral-300">{inq.senderCompany}</span>
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded font-mono uppercase">
                          {inq.intentType}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 text-xs font-mono">
                        <span className="text-neutral-400">Target: <strong className="text-amber-400">{inq.targetMemberName}</strong> ({inq.targetSubdomain})</span>
                        <span className="text-neutral-500">•</span>
                        <span className="text-neutral-500">{inq.submittedAt}</span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 bg-neutral-950 p-3 rounded-xl border border-neutral-800/60 leading-relaxed">
                      &quot;{inq.message}&quot;
                    </p>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <div className="text-neutral-400 font-mono text-[11px]">
                        Email: <span className="text-neutral-200">{inq.senderEmail}</span>
                        {inq.senderPhone && <span className="ml-2">Phone: {inq.senderPhone}</span>}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateInquiryStatus(inq.id, inq.status === 'responded' ? 'new' : 'responded')}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors ${
                            inq.status === 'responded'
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                              : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                          }`}
                        >
                          {inq.status === 'responded' ? 'Marked Responded' : 'Mark as Responded'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: AUTOMATED EMAIL TRIGGERS */}
          {activeTab === 'emails' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-cinzel text-lg font-bold text-neutral-100">Automated Email Triggers System & Simulator</h3>
                <p className="text-xs text-neutral-400">
                  Lifecycle triggers: Article approvals/rejections, weekly quota alerts (3/3 reached & Monday resets), annual membership renewal reminders (15 days & 3 days prior), and inbound leads.
                </p>
              </div>

              {/* Trigger Simulator Buttons */}
              <div className="bg-neutral-900/80 p-4 rounded-2xl border border-neutral-800 space-y-3">
                <div className="text-xs font-bold text-amber-400 font-cinzel uppercase tracking-wider">
                  Dispatch Simulated Lifecycle Notification
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => onTriggerSimulatedEmail('article_approved', members[0])}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 rounded-lg border border-neutral-700 flex items-center space-x-1"
                  >
                    <span>✅ Article Approved</span>
                  </button>

                  <button
                    onClick={() => onTriggerSimulatedEmail('article_rejected', members[0])}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 rounded-lg border border-neutral-700 flex items-center space-x-1"
                  >
                    <span>❌ Article Rejected</span>
                  </button>

                  <button
                    onClick={() => onTriggerSimulatedEmail('quota_reached', members[0])}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 rounded-lg border border-neutral-700 flex items-center space-x-1"
                  >
                    <span>⚠️ 3/3 Quota Reached Alert</span>
                  </button>

                  <button
                    onClick={() => onTriggerSimulatedEmail('quota_reset', members[0])}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 rounded-lg border border-neutral-700 flex items-center space-x-1"
                  >
                    <span>🔄 Monday 00:00 Reset Alert</span>
                  </button>

                  <button
                    onClick={() => onTriggerSimulatedEmail('renewal_15_days', members[3] || members[0])}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 rounded-lg border border-neutral-700 flex items-center space-x-1"
                  >
                    <span>⏳ 15-Day Renewal Reminder</span>
                  </button>

                  <button
                    onClick={() => onTriggerSimulatedEmail('renewal_3_days', members[3] || members[0])}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 rounded-lg border border-neutral-700 flex items-center space-x-1"
                  >
                    <span>🚨 3-Day Urgent Renewal Reminder</span>
                  </button>

                  <button
                    onClick={() => onTriggerSimulatedEmail('inbound_lead', members[0])}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 rounded-lg border border-neutral-700 flex items-center space-x-1"
                  >
                    <span>🔔 Inbound Lead Alert</span>
                  </button>
                </div>
              </div>

              {/* Email Notifications Feed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-neutral-400 uppercase">Recent Triggered Notifications</h4>
                  {emailNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => setSelectedEmail(notif)}
                      className={`p-4 rounded-xl border text-xs cursor-pointer transition-all ${
                        selectedEmail?.id === notif.id
                          ? 'bg-neutral-800 border-amber-500'
                          : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-neutral-200 line-clamp-1">{notif.subject}</span>
                        <span className="text-[10px] text-neutral-500 font-mono shrink-0">{notif.sentAt}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400">To: {notif.recipientName} ({notif.recipientEmail})</div>
                      <p className="text-neutral-300 line-clamp-2 mt-1">{notif.body}</p>
                    </div>
                  ))}
                </div>

                {/* Live Rendered Email Preview */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 space-y-4">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-wider font-cinzel">
                    Automated Email Client Preview
                  </div>

                  {selectedEmail ? (
                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 space-y-4 text-xs">
                      <div className="border-b border-neutral-800 pb-3 space-y-1">
                        <div className="text-neutral-400">From: <strong className="text-neutral-200">The Founder Grid &lt;notifications@{customDomain}&gt;</strong></div>
                        <div className="text-neutral-400">To: <strong className="text-neutral-200">{selectedEmail.recipientName} &lt;{selectedEmail.recipientEmail}&gt;</strong></div>
                        <div className="text-neutral-100 font-bold text-sm pt-1">{selectedEmail.subject}</div>
                      </div>

                      <div className="space-y-3 text-neutral-300 leading-relaxed font-sans">
                        <div className="font-cinzel text-xs font-bold text-amber-400">THE FOUNDER GRID SYNDICATE</div>
                        <p>Dear {selectedEmail.recipientName},</p>
                        <p className="bg-neutral-900/80 p-3 rounded-lg border border-neutral-800 text-neutral-200">
                          {selectedEmail.body}
                        </p>
                        <p className="text-neutral-400 text-[11px]">
                          This is an automated lifecycle notification dispatched by The Founder Grid Engine. Manage your notification preferences in your executive settings.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-xs text-neutral-500">
                      Click on any notification on the left to preview the rendered HTML email template.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SUPABASE BACKEND INFRASTRUCTURE */}
          {activeTab === 'supabase' && (
            <div className="space-y-6">
              <SupabaseStatusCard />
            </div>
          )}
        </div>

        {/* Rejection Feedback Modal Backdrop */}
        {rejectModalArticle && (
          <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 max-w-lg w-full space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="font-bold text-rose-400 text-sm">Provide Editorial Feedback</span>
                <button onClick={() => setRejectModalArticle(null)} className="text-neutral-400 hover:text-neutral-200">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-neutral-300">
                Article: <strong className="text-neutral-100">&quot;{rejectModalArticle.title}&quot;</strong>
              </p>
              <div>
                <label className="block text-neutral-400 mb-1">Editorial Revision Notes</label>
                <textarea
                  rows={4}
                  value={rejectionRemarks}
                  onChange={(e) => setRejectionRemarks(e.target.value)}
                  placeholder="State specifically what revisions are required for compliance and republishing..."
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-neutral-100 focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  onClick={() => setRejectModalArticle(null)}
                  className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-lg hover:bg-neutral-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRejection}
                  className="px-4 py-2 bg-rose-600 text-neutral-100 font-bold rounded-lg hover:bg-rose-500"
                >
                  Reject & Send Revision Email
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
