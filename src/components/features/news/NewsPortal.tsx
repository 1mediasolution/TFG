import React, { useState, useMemo } from 'react';
import {
  Search,
  Flame,
  Clock,
  Eye,
  TrendingUp,
  Bookmark,
  Share2,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  BookOpen,
  Filter,
  ShieldCheck,
  Send,
  Linkedin,
  MapPin,
  Award,
  Loader2,
  Wand2,
  Bot
} from 'lucide-react';
import { NewsArticle, FounderMember, Advertisement, ArticleCategory } from '../../../types';
import { AdvertisementBanner } from '../../layout/AdvertisementBanner';
import { requestAIGenerateArticle } from '../../../services/aiArticleService';

export interface NewsPortalProps {
  articles: NewsArticle[];
  members: FounderMember[];
  onSelectArticle: (article: NewsArticle) => void;
  onOpenSubdomain: (subdomain: string) => void;
  onOpenPortfolio: (member: FounderMember) => void;
  onOpenInquiryModal: (member: FounderMember) => void;
  onOpenMembershipModal: () => void;
  onOpenCredentialPack: (member: FounderMember) => void;
  onNavigateToDirectory: () => void;
  onPublishAdminNews?: (newArticle: Omit<NewsArticle, 'id' | 'views'>) => void;
  inFeedAd?: Advertisement;
  customDomain?: string;
}

export const NewsPortal: React.FC<NewsPortalProps> = ({
  articles,
  members,
  onSelectArticle,
  onOpenSubdomain,
  onOpenPortfolio,
  onOpenInquiryModal,
  onOpenMembershipModal,
  onOpenCredentialPack,
  onNavigateToDirectory,
  onPublishAdminNews,
  inFeedAd,
  customDomain = 'thefoundergrid.com'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);

  const handleSingleClickAIGenerate = async (targetCategory?: string, customTopic?: string) => {
    if (!onPublishAdminNews || isAiGenerating) return;
    setIsAiGenerating(true);
    setAiSuccessMessage(null);

    const chosenCat = (targetCategory && targetCategory !== 'All'
      ? targetCategory
      : selectedCategory !== 'All'
      ? selectedCategory
      : 'Venture Capital') as any;

    try {
      const generated = await requestAIGenerateArticle({
        category: chosenCat,
        topic: customTopic || `Breaking strategic analysis on ${chosenCat}`,
        authorName: 'Executive Editorial Board',
        authorRole: 'Chief Market Strategist',
        type: 'editorial'
      });

      const editorialImages: Record<string, string> = {
        'Macro Economy': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
        'Venture Capital': 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
        'Fintech & Banking': 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80',
        'Founders': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=1200&auto=format&fit=crop&q=80'
      };

      const newArticle: Omit<NewsArticle, 'id' | 'views'> = {
        title: generated.title,
        excerpt: generated.excerpt,
        content: generated.content,
        category: generated.category,
        author: {
          name: 'Executive Editorial Board',
          role: 'The Founder Grid Intelligence Desk',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          subdomain: 'editorial',
          isAdmin: true
        },
        imageUrl: editorialImages[generated.category] || editorialImages['Venture Capital'],
        publishedAt: 'Just now',
        readTime: generated.readTime,
        isFeatured: true,
        isLeadEditorial: true,
        tags: generated.tags
      };

      onPublishAdminNews(newArticle);
      setAiSuccessMessage(`✨ AI Published: "${generated.title.slice(0, 48)}..."`);
      setTimeout(() => setAiSuccessMessage(null), 6000);
    } catch (err: any) {
      console.error('Failed to generate article:', err);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const categories = [
    'All',
    'Macro Economy',
    'Venture Capital',
    'Fintech & Banking',
    'Markets',
    'M&A',
    'Tech/AI',
    'Business',
    'Founders'
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const matchCategory = selectedCategory === 'All' || art.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.author.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  // Lead Editorial Story
  const leadEditorialArticle = useMemo(() => {
    return articles.find((a) => a.isLeadEditorial) || articles.find((a) => a.isFeatured) || articles[0];
  }, [articles]);

  const secondaryArticles = useMemo(() => {
    return filteredArticles.filter((a) => a.id !== leadEditorialArticle?.id);
  }, [filteredArticles, leadEditorialArticle]);

  // Section 5: Featured Founders Spotlight (Reserved exclusively for verified/premium members)
  const featuredFounders = useMemo(() => {
    return members.filter((m) => m.isVerified && m.membershipTier !== 'free' && m.role === 'Founder');
  }, [members]);

  // Section 6: General Member Directory Grid
  const generalMembers = useMemo(() => {
    return members.slice(0, 6);
  }, [members]);

  return (
    <div id="news-portal-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 text-neutral-100">
      {/* Breaking Wire Strip */}
      <div id="breaking-news-strip" className="bg-gradient-to-r from-amber-950/60 via-neutral-900 to-neutral-900 border border-amber-500/30 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-500 text-neutral-950 font-bold text-[11px] uppercase tracking-wider animate-pulse">
            <Flame className="w-3 h-3" />
            <span>Breaking Wire</span>
          </span>
          <p className="text-xs sm:text-sm text-neutral-200 font-medium line-clamp-1">
            Indian Equity Indices touch fresh session highs led by banking majors; private capex pipeline records 14.2% YoY expansion.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-amber-400/90 font-mono self-end sm:self-center shrink-0">
          <span>Live Editorial Feed</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. ADMIN LEAD NEWS & EDITORIAL (Mandatory Category Tag)    */}
      {/* ========================================================= */}
      <section id="admin-lead-news-section" className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-500 text-xs font-semibold uppercase tracking-wider mb-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Executive Editorial Board</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-neutral-100 font-semibold tracking-tight">
              Lead News & Financial Intelligence
            </h2>
          </div>

          {/* 1-Click AI Generation Controls for Admin / Editors */}
          <div className="flex flex-wrap items-center gap-2.5">
            {onPublishAdminNews && (
              <button
                id="ai-generate-lead-story-btn"
                onClick={() => handleSingleClickAIGenerate()}
                disabled={isAiGenerating}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 disabled:opacity-60"
                title="Single-click AI content generator for editorial lead story"
              >
                {isAiGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>AI Writing Lead Story...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>1-Click AI Generate Story</span>
                  </>
                )}
              </button>
            )}

            {/* Search & Category Filter */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search headlines..."
                  className="bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar py-1">
                {categories.slice(0, 5).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-amber-500 text-neutral-950 font-bold'
                        : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Generation Success Toast Banner */}
        {aiSuccessMessage && (
          <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-3.5 text-xs text-amber-700 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-semibold">{aiSuccessMessage}</span>
            </div>
            <span className="text-[10px] font-mono text-amber-600">Live on Lead Wire</span>
          </div>
        )}

        {/* Lead Hero Article Card */}
        {leadEditorialArticle && (
          <div className="bg-neutral-900/80 border border-neutral-800 hover:border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl transition-all grid grid-cols-1 lg:grid-cols-12 group">
            <div className="lg:col-span-7 relative min-h-[280px] lg:min-h-[420px] overflow-hidden">
              <img
                src={leadEditorialArticle.imageUrl}
                alt={leadEditorialArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent lg:hidden" />
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="bg-amber-500 text-neutral-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {leadEditorialArticle.category}
                </span>
                {leadEditorialArticle.isLeadEditorial && (
                  <span className="bg-neutral-950/80 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase backdrop-blur-sm">
                    Admin Lead Editorial
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs text-neutral-400 font-mono">
                  <span>{leadEditorialArticle.publishedAt}</span>
                  <span>•</span>
                  <span>{leadEditorialArticle.readTime}</span>
                  <span>•</span>
                  <span className="text-amber-400">{leadEditorialArticle.views.toLocaleString()} reads</span>
                </div>

                <h3
                  onClick={() => onSelectArticle(leadEditorialArticle)}
                  className="font-editorial text-2xl sm:text-3xl font-bold text-neutral-100 hover:text-amber-400 transition-colors cursor-pointer leading-tight"
                >
                  {leadEditorialArticle.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                  {leadEditorialArticle.excerpt}
                </p>

                {/* Key Takeaways */}
                {leadEditorialArticle.keyTakeaways && leadEditorialArticle.keyTakeaways.length > 0 && (
                  <div className="bg-neutral-950/70 p-3.5 rounded-xl border border-neutral-800 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">
                      Key Takeaways
                    </span>
                    <ul className="space-y-1 text-xs text-neutral-300">
                      {leadEditorialArticle.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                        <li key={idx} className="flex items-start space-x-1.5">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <img
                    src={leadEditorialArticle.author.avatar}
                    alt={leadEditorialArticle.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-amber-500/40"
                  />
                  <div>
                    <div className="text-xs font-bold text-neutral-200">{leadEditorialArticle.author.name}</div>
                    <div className="text-[10px] text-neutral-400">{leadEditorialArticle.author.role}</div>
                  </div>
                </div>

                <button
                  onClick={() => onSelectArticle(leadEditorialArticle)}
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read Full Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {secondaryArticles.slice(0, 3).map((art) => (
            <div
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="bg-neutral-900/50 border border-neutral-800 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all hover:shadow-xl cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-neutral-950/80 backdrop-blur-sm text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[11px] text-neutral-500 font-mono flex items-center space-x-2">
                    <span>{art.publishedAt}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h4 className="font-editorial text-base font-bold text-neutral-100 group-hover:text-amber-400 transition-colors line-clamp-2">
                    {art.title}
                  </h4>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs text-neutral-400 border-t border-neutral-800/80 mt-2">
                <span>By {art.author.name}</span>
                <span className="text-amber-400 font-mono text-[11px]">{art.views.toLocaleString()} reads</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. IN-FEED AD BANNER                                      */}
      {/* ========================================================= */}
      <section id="in-feed-ad-section">
        <AdvertisementBanner
          ad={inFeedAd}
          slot="in_feed_home"
        />
      </section>

      {/* ========================================================= */}
      {/* 5. FEATURED FOUNDERS SPOTLIGHT (Verified/Premium Members) */}
      {/* ========================================================= */}
      <section id="featured-founders-spotlight-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Syndicate Exclusive</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-neutral-100 font-semibold tracking-tight">
              Featured Founders Spotlight
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Reserved exclusively for verified, premium founders with active enterprise publications and peer review standing.
            </p>
          </div>

          <button
            onClick={onOpenMembershipModal}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-all shrink-0 flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apply for Spotlight Verification</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredFounders.slice(0, 3).map((founder) => (
            <div
              key={founder.id}
              className="bg-neutral-900/70 border border-neutral-800 hover:border-amber-500/50 rounded-2xl p-6 space-y-4 transition-all hover:shadow-2xl hover:shadow-neutral-950 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Header with Verified Badge */}
                <div className="flex items-start justify-between">
                  <div className="relative">
                    <img
                      src={founder.avatarUrl}
                      alt={founder.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-500/60 shadow-md group-hover:border-amber-400 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-neutral-950 rounded-full p-0.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>

                  <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {founder.membershipBadge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-neutral-100 text-lg group-hover:text-amber-400 transition-colors">
                    {founder.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-medium">
                    {founder.title} at <span className="text-neutral-100">{founder.companyName}</span>
                  </p>
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    {founder.industry} • {founder.location}
                  </p>
                </div>

                {/* Subdomain Link */}
                <button
                  onClick={() => onOpenSubdomain(founder.subdomain)}
                  className="w-full text-left bg-neutral-950 px-3 py-2 rounded-xl border border-neutral-800/80 hover:border-amber-500/40 text-xs text-neutral-300 flex items-center justify-between transition-colors group/sub"
                >
                  <span className="font-mono text-amber-400 truncate">
                    https://{founder.subdomain}.{customDomain}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover/sub:text-amber-400 shrink-0 ml-2" />
                </button>

                <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                  {founder.bio}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 bg-neutral-950/60 p-2.5 rounded-xl border border-neutral-800 text-[11px] font-mono">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Scale / Rev</span>
                    <span className="text-neutral-200 font-bold">{founder.metrics.revenueOrAum}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Stage</span>
                    <span className="text-amber-400 font-bold">{founder.fundingStage}</span>
                  </div>
                </div>

                {/* Intent Tags */}
                {founder.lookingFor && (
                  <div className="flex items-center space-x-1.5 text-[10px]">
                    <span className="text-neutral-500 font-mono uppercase">Seeking:</span>
                    <div className="flex flex-wrap gap-1">
                      {founder.lookingFor.map((tag) => (
                        <span key={tag} className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.2 rounded font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onOpenPortfolio(founder)}
                  className="flex-1 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center space-x-1"
                >
                  <span>View Portfolio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenInquiryModal(founder)}
                  className="py-2 px-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-colors flex items-center space-x-1 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Connect</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. GENERAL MEMBER DIRECTORY GRID                          */}
      {/* ========================================================= */}
      <section id="general-member-directory-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Syndicate Directory</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl text-neutral-100 font-semibold tracking-tight">
              General Member Directory
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Founders and venture partners registered across The Founder Grid. Explore portfolios, send inquiries, or connect on LinkedIn.
            </p>
          </div>

          <button
            onClick={onNavigateToDirectory}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-amber-400 border border-amber-500/40 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 self-start sm:self-auto"
          >
            <span>Open Dedicated Directory & Matchmaking</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {generalMembers.map((member) => (
            <div
              key={member.id}
              className="bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 rounded-2xl p-5 space-y-3 flex flex-col justify-between transition-all"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-11 h-11 rounded-xl object-cover border border-neutral-700"
                    />
                    <div>
                      <h4 className="font-bold text-neutral-200 text-sm">{member.name}</h4>
                      <p className="text-xs text-neutral-400">{member.title}</p>
                      <p className="text-[11px] text-amber-400 font-medium">{member.companyName}</p>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono bg-neutral-950 text-neutral-400 px-2 py-0.5 rounded border border-neutral-800 uppercase">
                    {member.role}
                  </span>
                </div>

                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {member.bio}
                </p>

                {/* Intent & Offering Tags */}
                <div className="space-y-1 text-[10px]">
                  {member.lookingFor && (
                    <div className="flex items-center space-x-1">
                      <span className="text-neutral-500 font-mono">Looking:</span>
                      <span className="text-amber-400">{member.lookingFor.join(', ')}</span>
                    </div>
                  )}
                  {member.canOffer && (
                    <div className="flex items-center space-x-1">
                      <span className="text-neutral-500 font-mono">Offering:</span>
                      <span className="text-emerald-400">{member.canOffer.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom CTAs: View Portfolio & LinkedIn */}
              <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                <button
                  onClick={() => onOpenPortfolio(member)}
                  className="text-xs text-neutral-300 hover:text-amber-400 font-semibold flex items-center space-x-1 transition-colors"
                >
                  <span>View Portfolio</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>

                <div className="flex items-center space-x-2">
                  <a
                    href={member.linkedinUrl || member.socialLinks?.linkedin || 'https://linkedin.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded-lg bg-neutral-800 text-sky-400 hover:bg-neutral-700 transition-colors"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => onOpenInquiryModal(member)}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs hover:bg-amber-500 hover:text-neutral-950 font-semibold transition-all"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
