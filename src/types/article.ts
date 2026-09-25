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
