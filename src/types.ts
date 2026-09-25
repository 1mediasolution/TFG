export type MembershipTier = 'free' | 'founder_pro' | 'executive_fellow';

export type UserRole = 'Founder' | 'Investor';

export interface MarketTickerItem {
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
  isIndianIndex?: boolean;
}

export type AdSlotId = 'top_leaderboard' | 'sidebar_left' | 'sidebar_right' | 'in_feed_home' | 'in_article';

export interface Advertisement {
  id: string;
  slot: AdSlotId;
  title: string;
  sponsor: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  badge: string;
  bannerImageUrl?: string;
  impressions: number;
  clicks: number;
  active: boolean;
}

export type ArticleCategory =
  | 'Business'
  | 'Finance'
  | 'Tech/AI'
  | 'Founders'
  | 'Macro Economy'
  | 'Venture Capital'
  | 'Fintech & Banking'
  | 'Markets'
  | 'M&A';

export interface NewsArticle {
  id: string;
  title: string;
  slug?: string;
  category: ArticleCategory | string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    subdomain?: string;
    isVerifiedFounder?: boolean;
    isAdmin?: boolean;
  };
  publishedAt: string;
  readTime: string;
  views: number;
  imageUrl: string;
  keyTakeaways?: string[];
  isLeadEditorial?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  tags?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  outcome: string;
  metric: string;
  year: string;
}

export interface ServiceOffering {
  title: string;
  description?: string;
  desc?: string;
}

export type ArticleReviewStatus = 'pending_review' | 'approved' | 'rejected';

export interface MemberArticle {
  id: string;
  memberId: string;
  subdomain: string;
  title: string;
  subtitle: string;
  category: ArticleCategory | string;
  content: string;
  publishedAt: string;
  readTime: string;
  views: number;
  tags: string[];
  weekNumber: number; // For tracking 3 articles per week quota
  year: number;
  status: ArticleReviewStatus;
  adminFeedback?: string;
  submittedAt: string;
  viewsHistory?: { date: string; views: number; uniqueVisitors?: number }[];
}

export type FounderBadge = 'Charter Founder' | 'Founding 100' | 'Venture Fellow' | 'Verified Partner';

export type MatchmakingIntent = 'Clients' | 'Capital' | 'Distributors' | 'Partners';
export type MatchmakingOffering = 'Services' | 'Software' | 'Manufacturing' | 'Mentorship';

export interface FounderMember {
  id: string;
  role: UserRole | string;
  name: string;
  handle: string;
  subdomain: string; // e.g., 'sarahchen' -> sarahchen.thefoundergrid.com
  title: string;
  companyName: string;
  companyUrl?: string;
  industry: string;
  location: string;
  avatarUrl: string;
  coverUrl?: string;
  bio: string;
  missionVision: string;
  coreValues: string[];
  services: ServiceOffering[];
  caseStudies: CaseStudy[];
  fundingStage: string;
  metrics: {
    revenueOrAum: string;
    growthRate?: string;
    teamSize: number | string;
    foundedYear?: number;
    fundingRaised?: string;
  };
  isVerified: boolean;
  membershipTier: MembershipTier | string;
  membershipBadge: FounderBadge | string;
  membershipCertificateId: string;
  membershipJoinedDate: string;
  membershipExpiryDate?: string;
  renewalDate?: string;
  articlesPublishedThisWeek: number; // Hard cap 3 per week
  weeklyArticleQuota?: number; // 3
  articles: MemberArticle[];
  lookingFor?: MatchmakingIntent[];
  canOffer?: MatchmakingOffering[];
  intentLookingFor?: string[];
  intentCanOffer?: string[];
  email?: string;
  phone?: string;
  linkedinUrl?: string;
  privacy?: {
    showEmail: boolean;
    showPhone: boolean;
    allowDirectInquiries?: boolean;
  };
  privacySettings?: {
    showEmail: boolean;
    showPhone: boolean;
    email?: string;
    phone?: string;
  };
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
    calendly?: string;
  };
  featuredQuote?: string;
  joinedDate?: string;
}

export interface VisitorInquiry {
  id: string;
  targetMemberId: string;
  targetMemberName: string;
  targetSubdomain: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  senderCompany: string;
  intentType: 'Clients' | 'Capital' | 'Partnership' | 'Distributors' | 'Mentorship' | 'General' | string;
  message: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'responded';
}

export type EmailTriggerType =
  | 'article_approved'
  | 'article_rejected'
  | 'article_submitted'
  | 'quota_reached'
  | 'quota_reset'
  | 'renewal_15_days'
  | 'renewal_3_days'
  | 'inbound_lead';

export interface AutomatedEmailNotification {
  id: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  triggerType: EmailTriggerType;
  body: string;
  sentAt: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  isDirectMessage?: boolean;
  recipientId?: string;
  recipientMemberId?: string;
  senderId: string;
  senderName: string;
  senderSubdomain: string;
  senderAvatar: string;
  senderCompany: string;
  text: string;
  content?: string;
  timestamp: string;
  referralCategory?:
    | 'Business Referral'
    | 'Investor Intro'
    | 'Partnership Lead'
    | 'Hiring / Talent'
    | 'Tech & Tools'
    | 'Direct Introduction'
    | 'Fundraising Intro'
    | 'M&A Advisory'
    | 'Talent / Co-Founder';
  likesCount?: number;
}

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  topic?: string;
  isPrivatePaid?: boolean;
  memberCount?: number;
  unreadCount?: number;
}
