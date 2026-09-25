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
