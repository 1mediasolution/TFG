import { MembershipTier, UserRole } from './common';
import { MemberArticle } from './article';

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
