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
