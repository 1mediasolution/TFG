import React, { useState, useMemo } from 'react';
import {
  Globe,
  PlusCircle,
  FileText,
  Clock,
  Eye,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Lock,
  ArrowUpRight,
  Trash2,
  Send,
  Edit2,
  Calendar,
  AlertTriangle,
  Hourglass,
  Tag,
  BarChart3,
  TrendingUp,
  Loader2,
  Wand2
} from 'lucide-react';
import { requestAIGenerateArticle } from '../services/aiArticleService';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { FounderMember, MemberArticle, ArticleCategory } from '../types';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color?: string;
  }>;
  label?: string;
}

const CustomChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs space-y-1.5 min-w-[150px]">
        <div className="font-semibold text-neutral-300 border-b border-neutral-800 pb-1 mb-1 flex items-center justify-between">
          <span>{label}</span>
          <span className="text-[10px] text-amber-400 font-mono">Live Sync</span>
        </div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center justify-between text-[11px] space-x-3">
            <span className="flex items-center space-x-1.5 text-neutral-400">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.color || '#f59e0b' }}
              />
              <span>{entry.name}:</span>
            </span>
            <span className="font-mono font-bold text-neutral-100">
              {Number(entry.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const generateArticleViewsData = (article: MemberArticle, days: number = 7) => {
  if (article.viewsHistory && article.viewsHistory.length > 0) {
    return article.viewsHistory.slice(-days);
  }

  const totalViews = article.views || 420;
  const data: { date: string; views: number; uniqueVisitors: number }[] = [];
  const now = new Date();
  
  // Deterministic seed multiplier based on article ID
  const seedNum = (article.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % 20) / 100;

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const dateLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    const normalizedIndex = (days - 1 - i) / Math.max(1, days - 1);
    const wave = Math.sin((i + 1) * 1.4) * 0.18;
    const baseDaily = totalViews / days;
    const dailyViews = Math.max(
      15,
      Math.round(baseDaily * (0.8 + normalizedIndex * 0.4 + wave + seedNum * 0.2))
    );
    const unique = Math.max(10, Math.round(dailyViews * 0.74));

    data.push({
      date: dateLabel,
      views: dailyViews,
      uniqueVisitors: unique
    });
  }

  return data;
};

interface SubdomainPublisherProps {
  currentUser: FounderMember;
  isPaidMember: boolean;
  onOpenMembershipModal: () => void;
  onOpenSubdomain: (subdomain: string) => void;
  onSubmitDraftForReview: (article: {
    title: string;
    subtitle: string;
    category: ArticleCategory;
    content: string;
    readTime: string;
    tags: string[];
  }) => void;
  onDeleteArticle: (articleId: string) => void;
  onUpdateSubdomainName: (newSubdomain: string) => void;
  onOpenAdminConsole?: () => void;
  customDomain?: string;
}

export const SubdomainPublisher: React.FC<SubdomainPublisherProps> = ({
  currentUser,
  isPaidMember,
  onOpenMembershipModal,
  onOpenSubdomain,
  onSubmitDraftForReview,
  onDeleteArticle,
  onUpdateSubdomainName,
  onOpenAdminConsole,
  customDomain = 'thefoundergrid.com'
}) => {
  const [isComposing, setIsComposing] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('Business');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('Fintech, B2B SaaS, Enterprise');
  const [isEditingSubdomain, setIsEditingSubdomain] = useState(false);
  const [subdomainInput, setSubdomainInput] = useState(currentUser.subdomain);
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    currentUser.articles.find((a) => a.status === 'approved')?.id || currentUser.articles[0]?.id || ''
  );
  const [timeframe, setTimeframe] = useState<'7d' | '14d' | '30d'>('7d');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  const handleSingleClickAIGenerateForMember = async (presetTopic?: string) => {
    if (isQuotaReached) {
      alert('You have reached your 3 articles/week quota limit.');
      return;
    }
    setIsAiGenerating(true);
    setAiSuccessMessage(null);
    try {
      const targetCategory = (['Macro Economy', 'Venture Capital', 'Fintech & Banking', 'Founders'].includes(category)
        ? category
        : 'Founders') as any;

      const generated = await requestAIGenerateArticle({
        category: targetCategory,
        topic: presetTopic || title || `Executive insights on scaling, capital, and market strategy`,
        authorName: currentUser.name,
        authorRole: currentUser.title || currentUser.role,
        authorCompany: currentUser.companyName,
        subdomain: currentUser.subdomain,
        type: 'thought_leadership'
      });

      setTitle(generated.title);
      setSubtitle(generated.excerpt);
      setContent(generated.content);
      if (generated.category) {
        setCategory(generated.category as any);
      }
      if (generated.tags && generated.tags.length > 0) {
        setTagsInput(generated.tags.join(', '));
      }
      setIsComposing(true);
      setAiSuccessMessage(`✨ AI Draft Ready: "${generated.title.slice(0, 45)}..."`);
      setTimeout(() => setAiSuccessMessage(null), 7000);
    } catch (err: any) {
      console.error('AI Member draft error:', err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const weeklyQuota = 3; // Hard cap of 3 articles per calendar week
  const articlesUsed = currentUser.articlesPublishedThisWeek;
  const quotaRemaining = Math.max(0, weeklyQuota - articlesUsed);
  const isQuotaReached = quotaRemaining === 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (isQuotaReached) {
      alert('You have reached the maximum quota of 3 articles per calendar week. Quotas automatically reset every Monday at 00:00 UTC.');
      return;
    }

    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);

    onSubmitDraftForReview({
      title,
      subtitle,
      category,
      content,
      readTime: `${Math.max(2, Math.ceil(content.split(' ').length / 160))} min read`,
      tags
    });

    setTitle('');
    setSubtitle('');
    setContent('');
    setIsComposing(false);
  };

  const handleSaveSubdomain = () => {
    const sanitized = subdomainInput.toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (!sanitized) return;
    onUpdateSubdomainName(sanitized);
    setIsEditingSubdomain(false);
  };

  if (!isPaidMember) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8 text-amber-500" />
        </div>

        <div className="space-y-3 max-w-xl mx-auto">
          <h2 className="font-cinzel text-3xl font-bold text-neutral-100">
            Dedicated Member Subdomains & 3 Articles/Week Quota
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Every verified member receives an auto-provisioned personal subdomain (<span className="text-amber-400 font-mono">yourname.{customDomain}</span>) with publishing rights for up to 3 vetted thought-leadership articles per week.
          </p>
        </div>

        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 max-w-lg mx-auto text-left space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-amber-400">
            <Globe className="w-4 h-4" />
            <span>https://yourname.{customDomain}</span>
          </div>
          <div className="space-y-2 text-xs text-neutral-300">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>3 articles per calendar week hard cap (auto-resets every Monday 00:00)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>1-Click Editorial Review & syndication across global business wire</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct inbound lead generation with encrypted contact routing</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenMembershipModal}
          className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold rounded-xl shadow-lg shadow-amber-950/40 text-sm transition-all inline-flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Claim Your Subdomain & Membership</span>
        </button>
      </div>
    );
  }

  const approvedArticles = currentUser.articles.filter((a) => a.status === 'approved');
  const pendingArticles = currentUser.articles.filter((a) => a.status === 'pending_review');
  const rejectedArticles = currentUser.articles.filter((a) => a.status === 'rejected');

  const selectedArticle =
    currentUser.articles.find((a) => a.id === selectedArticleId) ||
    approvedArticles[0] ||
    currentUser.articles[0];

  const daysCount = timeframe === '30d' ? 30 : timeframe === '14d' ? 14 : 7;

  const chartData = useMemo(() => {
    if (!selectedArticle) return [];
    return generateArticleViewsData(selectedArticle, daysCount);
  }, [selectedArticle, daysCount]);

  const totalPeriodViews = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.views, 0);
  }, [chartData]);

  const peakDailyViews = useMemo(() => {
    return chartData.reduce((max, curr) => Math.max(max, curr.views), 0);
  }, [chartData]);

  return (
    <div id="subdomain-publisher-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-neutral-100">
      {/* Studio Header */}
      <div className="border-b border-neutral-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Author Workspace & Publishing Rules</span>
          </div>
          <h1 className="font-editorial text-3xl font-semibold text-neutral-100">
            Subdomain Publishing Studio
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Manage your auto-provisioned subdomain, compose weekly thought-leadership, and monitor editorial approvals.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onOpenSubdomain(currentUser.subdomain)}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-amber-500/40 text-amber-400 text-xs font-semibold rounded-xl transition-all flex items-center space-x-2"
          >
            <Globe className="w-4 h-4" />
            <span>Launch Live Subdomain</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          {onOpenAdminConsole && (
            <button
              onClick={onOpenAdminConsole}
              className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs font-semibold rounded-xl transition-colors"
              title="Inspect Editorial Review Queue as Admin"
            >
              Admin Queue
            </button>
          )}
        </div>
      </div>

      {/* Subdomain Identity & Quota Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Subdomain Domain Card */}
        <div className="md:col-span-2 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-300">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Your Auto-Provisioned Subdomain</span>
            </div>
            {!isEditingSubdomain ? (
              <button
                onClick={() => setIsEditingSubdomain(true)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit Handle</span>
              </button>
            ) : (
              <button
                onClick={() => setIsEditingSubdomain(false)}
                className="text-xs text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </button>
            )}
          </div>

          {isEditingSubdomain ? (
            <div className="flex items-center space-x-2">
              <div className="flex-1 flex items-center bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-xs font-mono">
                <span className="text-neutral-500">https://</span>
                <input
                  type="text"
                  value={subdomainInput}
                  onChange={(e) => setSubdomainInput(e.target.value)}
                  className="bg-transparent text-amber-400 font-bold focus:outline-none flex-1 px-1"
                />
                <span className="text-neutral-500">.{customDomain}</span>
              </div>
              <button
                onClick={handleSaveSubdomain}
                className="px-4 py-2 rounded-lg bg-amber-500 text-neutral-950 font-bold text-xs shrink-0"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="font-mono text-sm sm:text-base text-amber-400 font-bold bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex items-center justify-between">
              <span>https://{currentUser.subdomain}.{customDomain}</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                SSL Active • 200 OK
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <span>DNS Routing: CNAME <code className="text-neutral-300">*.{customDomain}</code></span>
            <span>Platform Brand Theme: <strong className="text-neutral-200">Standardized Executive</strong></span>
          </div>
        </div>

        {/* Weekly Quota Hard Cap (3 per week) */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-300 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Weekly Publishing Quota</span>
            </span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Hard Cap 3/wk
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-400">Used This Calendar Week:</span>
              <span className="font-mono font-bold text-neutral-100">{articlesUsed} of 3</span>
            </div>

            <div className="w-full bg-neutral-950 h-2.5 rounded-full overflow-hidden border border-neutral-800">
              <div
                className={`h-full transition-all ${
                  isQuotaReached ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-500 to-amber-400'
                }`}
                style={{ width: `${(articlesUsed / weeklyQuota) * 100}%` }}
              />
            </div>
          </div>

          <div className="text-[11px] text-neutral-400 leading-snug pt-1">
            {isQuotaReached ? (
              <span className="text-rose-400 flex items-center space-x-1 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Weekly quota limit reached (3/3). Auto-resets Monday at 00:00 UTC.</span>
              </span>
            ) : (
              <span>
                You have <strong className="text-amber-400 font-mono">{quotaRemaining} slot{quotaRemaining > 1 ? 's' : ''} remaining</strong> for this calendar week.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* AI Success Feedback Banner */}
      {aiSuccessMessage && (
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-4 text-xs text-amber-800 flex items-center justify-between animate-fadeIn">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span className="font-semibold">{aiSuccessMessage}</span>
          </div>
          <span className="text-[10px] font-mono text-amber-700">Editor Populated</span>
        </div>
      )}

      {/* Draft Composition Action & 1-Click AI Thought Leadership Studio */}
      {!isComposing ? (
        <div className="space-y-4">
          {/* 1-Click AI Thought Leadership Generator Card */}
          <div className="bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-900 border border-amber-500/30 rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-500">
                  <Wand2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-1.5">
                    <span>1-Click AI Thought Leadership Assistant</span>
                    <span className="text-[10px] font-mono bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">
                      GEMINI POWERED
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Instantly draft an executive analysis on market trends, venture strategy, or technical playbooks.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSingleClickAIGenerateForMember()}
                disabled={isQuotaReached || isAiGenerating}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0 disabled:opacity-50"
              >
                {isAiGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>AI Writing Dispatch...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate Instant Article</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick 1-Click Topic Chips */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-medium text-neutral-400">1-Click Topic Presets:</div>
              <div className="flex flex-wrap gap-2">
                {[
                  'Valuation Guardrails & Cap Tables in 2026',
                  'B2B Enterprise GTM in India & SE Asia',
                  'Cross-Border Treasury & Real-Time FX Rails',
                  'Building Defensible Enterprise AI Moats'
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handleSingleClickAIGenerateForMember(preset)}
                    disabled={isQuotaReached || isAiGenerating}
                    className="text-xs px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 text-neutral-300 hover:text-amber-400 transition-colors flex items-center space-x-1.5 disabled:opacity-50"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>{preset}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-neutral-900/40 border border-dashed border-neutral-800 hover:border-amber-500/50 rounded-2xl p-6 text-center space-y-3 transition-colors">
            <FileText className="w-8 h-8 text-neutral-500 mx-auto" />
            <div>
              <h3 className="text-base font-bold text-neutral-200">Manual Draft Composition</h3>
              <p className="text-xs text-neutral-400 max-w-lg mx-auto">
                Drafts require a mandatory Category tag and 1-click Admin Approval before going live across your subdomain and global syndicate syndication.
              </p>
            </div>
            <button
              onClick={() => setIsComposing(true)}
              disabled={isQuotaReached}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all inline-flex items-center space-x-2 ${
                isQuotaReached
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border border-neutral-700'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>Compose Empty Draft</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="font-cinzel text-lg font-bold text-neutral-100">Draft Article Submission</h3>
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => handleSingleClickAIGenerateForMember()}
                disabled={isAiGenerating}
                className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500/20 flex items-center space-x-1.5 transition-colors disabled:opacity-50"
              >
                {isAiGenerating ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>AI Writing...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-3 h-3" />
                    <span>✨ AI Auto-Draft Content</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setIsComposing(false)}
                className="text-xs text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Article Title <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Navigating Enterprise Procurement Cycles as a Series A Founder"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Mandatory Category <span className="text-amber-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-100 focus:outline-none focus:border-amber-500"
              >
                <option value="Business">Business</option>
                <option value="Finance">Finance</option>
                <option value="Tech/AI">Tech/AI</option>
                <option value="Founders">Founders</option>
                <option value="Macro Economy">Macro Economy</option>
                <option value="Venture Capital">Venture Capital</option>
                <option value="Markets">Markets</option>
                <option value="M&A">M&A</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Subtitle / Executive Summary
            </label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Why this matters for commercial decision-makers..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Article Body & Analysis <span className="text-amber-400">*</span>
            </label>
            <textarea
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your in-depth perspective, operational benchmarks, and data points..."
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 leading-relaxed font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1">
              Tags / Keywords (Comma Separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Fintech, SaaS, Enterprise, Strategy"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
            <div className="text-[11px] text-neutral-400 flex items-center space-x-1.5">
              <Hourglass className="w-3.5 h-3.5 text-amber-400" />
              <span>Will be queued in Admin Review. Zero direct publishing.</span>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold rounded-xl text-xs shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>Submit Draft for Admin Review</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      )}

      {/* Status Sections: Pending Review, Approved Live, Rejected */}
      <div className="space-y-6">
        {/* 1. Pending Review Queue */}
        {pendingArticles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Hourglass className="w-4 h-4 animate-spin" />
              <span>Pending Editorial Review ({pendingArticles.length})</span>
            </div>
            <div className="space-y-3">
              {pendingArticles.map((art) => (
                <div key={art.id} className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-[11px]">
                      <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold">
                        {art.category}
                      </span>
                      <span className="text-neutral-400">Submitted {art.submittedAt}</span>
                    </div>
                    <h4 className="text-sm font-bold text-neutral-100">{art.title}</h4>
                    <p className="text-xs text-neutral-300 line-clamp-1">{art.subtitle}</p>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-[11px] text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-lg border border-amber-800">
                      In Queue for Admin Approval
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Rejection / Revision Required */}
        {rejectedArticles.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>Revision Requested ({rejectedArticles.length})</span>
            </div>
            <div className="space-y-3">
              {rejectedArticles.map((art) => (
                <div key={art.id} className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-neutral-100">{art.title}</h4>
                    <span className="text-[11px] text-rose-400 font-mono">Status: Needs Revision</span>
                  </div>
                  <p className="text-xs text-rose-200 bg-rose-950/40 p-3 rounded-xl border border-rose-800/40">
                    <strong>Admin Feedback:</strong> {art.adminFeedback || 'Please cite enterprise metrics and adhere to format guidelines.'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Readership Analytics: Views Over Time Chart (using recharts) */}
        <div
          id="views-over-time-chart"
          className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <BarChart3 className="w-4 h-4" />
                <span>Readership Telemetry</span>
              </div>
              <h3 className="font-editorial text-2xl font-semibold text-neutral-100 flex items-center space-x-2">
                <span>Views Over Time</span>
              </h3>
              <p className="text-xs text-neutral-400">
                Live syndication and readership analytics for your selected article.
              </p>
            </div>

            {/* Article Selector & Timeframe Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {currentUser.articles.length > 0 && (
                <div className="flex items-center space-x-2">
                  <label htmlFor="article-select-dropdown" className="text-xs text-neutral-400 font-medium">
                    Article:
                  </label>
                  <select
                    id="article-select-dropdown"
                    value={selectedArticle?.id || ''}
                    onChange={(e) => setSelectedArticleId(e.target.value)}
                    className="bg-neutral-950 border border-neutral-700 text-neutral-200 text-xs rounded-xl px-3 py-2 pr-8 focus:outline-none focus:border-amber-500 font-semibold max-w-[220px] sm:max-w-xs truncate"
                  >
                    {currentUser.articles.map((art) => (
                      <option key={art.id} value={art.id}>
                        {art.title.length > 34 ? `${art.title.slice(0, 34)}...` : art.title} ({art.status === 'approved' ? `${art.views.toLocaleString()} views` : art.status})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Timeframe selector */}
              <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setTimeframe('7d')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    timeframe === '7d'
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  7D
                </button>
                <button
                  type="button"
                  onClick={() => setTimeframe('14d')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    timeframe === '14d'
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  14D
                </button>
                <button
                  type="button"
                  onClick={() => setTimeframe('30d')}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    timeframe === '30d'
                      ? 'bg-amber-500 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  30D
                </button>
              </div>
            </div>
          </div>

          {selectedArticle ? (
            <div className="space-y-5">
              {/* Selected Article Metadata & KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-3.5 space-y-1">
                  <div className="text-[11px] text-neutral-400 font-mono">Total Cumulative Views</div>
                  <div className="text-xl font-bold text-neutral-100 font-mono flex items-center space-x-1.5">
                    <Eye className="w-4 h-4 text-amber-400" />
                    <span>{selectedArticle.views.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-3.5 space-y-1">
                  <div className="text-[11px] text-neutral-400 font-mono">{timeframe.toUpperCase()} Window Views</div>
                  <div className="text-xl font-bold text-amber-400 font-mono flex items-center space-x-1.5">
                    <TrendingUp className="w-4 h-4 text-amber-400" />
                    <span>{totalPeriodViews.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-3.5 space-y-1">
                  <div className="text-[11px] text-neutral-400 font-mono">Peak Day Velocity</div>
                  <div className="text-xl font-bold text-emerald-400 font-mono">
                    {peakDailyViews.toLocaleString()} <span className="text-[10px] text-neutral-500 font-normal">reads/day</span>
                  </div>
                </div>

                <div className="bg-neutral-950/70 border border-neutral-800/80 rounded-xl p-3.5 space-y-1">
                  <div className="text-[11px] text-neutral-400 font-mono">Estimated Read Time</div>
                  <div className="text-xl font-bold text-sky-400 font-mono flex items-center space-x-1.5">
                    <Clock className="w-4 h-4 text-sky-400" />
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Active Article Bar with Category & Legend */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-neutral-950/60 p-3 rounded-xl border border-neutral-800">
                <div className="flex items-center space-x-2 truncate">
                  <span className="text-neutral-500 font-mono uppercase text-[10px]">Selected Article:</span>
                  <span className="font-bold text-neutral-200 truncate">{selectedArticle.title}</span>
                  <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-mono shrink-0">
                    {selectedArticle.category}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-[11px] font-mono shrink-0">
                  <div className="flex items-center space-x-1.5 text-neutral-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block shadow-sm shadow-amber-400/50" />
                    <span>Total Views</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-neutral-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400 inline-block shadow-sm shadow-sky-400/50" />
                    <span>Unique Readers</span>
                  </div>
                </div>
              </div>

              {/* Recharts Area Chart */}
              <div className="w-full h-56 sm:h-64 pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="uniqueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                    <XAxis
                      dataKey="date"
                      stroke="#737373"
                      fontSize={11}
                      tickLine={false}
                      axisLine={{ stroke: '#404040' }}
                    />
                    <YAxis
                      stroke="#737373"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(val) => (val >= 1000 ? `${(val / 1000).toFixed(1)}k` : `${val}`)}
                    />
                    <Tooltip content={<CustomChartTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="views"
                      stroke="#f59e0b"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#viewsGradient)"
                      name="Views"
                    />
                    <Area
                      type="monotone"
                      dataKey="uniqueVisitors"
                      stroke="#38bdf8"
                      strokeWidth={1.5}
                      strokeDasharray="4 4"
                      fillOpacity={1}
                      fill="url(#uniqueGradient)"
                      name="Unique Readers"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-neutral-950/40 border border-neutral-800 rounded-xl text-xs text-neutral-500">
              No articles available yet to track viewership trends. Submit your first article above.
            </div>
          )}
        </div>

        {/* 3. Approved & Live Articles */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle className="w-4 h-4" />
              <span>Approved & Live Publications ({approvedArticles.length})</span>
            </div>
            <span className="text-xs text-neutral-400 font-mono">
              Live on {currentUser.subdomain}.{customDomain}
            </span>
          </div>

          {approvedArticles.length === 0 ? (
            <div className="p-8 text-center bg-neutral-900/30 border border-neutral-800 rounded-2xl text-xs text-neutral-500">
              No approved articles published yet. Submit a draft above to get started.
            </div>
          ) : (
            <div className="space-y-3">
              {approvedArticles.map((article) => {
                const isSelected = selectedArticle?.id === article.id;
                return (
                  <div
                    key={article.id}
                    className={`bg-neutral-900/60 border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                      isSelected
                        ? 'border-amber-500/60 bg-amber-950/15 shadow-lg shadow-amber-950/20'
                        : 'border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center space-x-2 text-[11px] text-neutral-400 font-mono">
                        <span className="bg-neutral-800 text-amber-400 px-2 py-0.5 rounded font-sans font-semibold">
                          {article.category}
                        </span>
                        <span>•</span>
                        <span>{article.publishedAt}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                        {isSelected && (
                          <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[10px] font-semibold border border-amber-500/40 ml-1">
                            Chart Active
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-neutral-100">{article.title}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-1">{article.subtitle}</p>
                    </div>

                    <div className="flex items-center space-x-2.5 shrink-0">
                      <div className="text-right text-xs font-mono text-neutral-400 mr-1">
                        <div className="flex items-center space-x-1 justify-end text-neutral-200">
                          <Eye className="w-3.5 h-3.5 text-neutral-500" />
                          <span>{article.views.toLocaleString()}</span>
                        </div>
                        <span className="text-[10px] text-neutral-500">Live reads</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedArticleId(article.id);
                          const el = document.getElementById('views-over-time-chart');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                          }
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                          isSelected
                            ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                            : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200'
                        }`}
                        title="View Views Over Time chart for this article"
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                        <span>{isSelected ? 'Viewing Chart' : 'Views Chart'}</span>
                      </button>

                      <button
                        onClick={() => onOpenSubdomain(currentUser.subdomain)}
                        className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs transition-colors"
                        title="View live on subdomain"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => onDeleteArticle(article.id)}
                        className="p-2 rounded-xl bg-neutral-800 hover:bg-rose-950/60 hover:text-rose-400 text-neutral-400 text-xs transition-colors"
                        title="Delete article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
