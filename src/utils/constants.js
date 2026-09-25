export const APP_NAME = 'The Founder Grid';
export const APP_TAGLINE = 'Where Business Meets Opportunity';
export const BASE_DOMAIN = 'thefoundergrid.com';

export const MEMBERSHIP_TIERS = {
  FREE: 'free',
  FOUNDER_PRO: 'founder_pro',
  EXECUTIVE_FELLOW: 'executive_fellow',
};

export const TIER_CONFIG = {
  free: {
    label: 'Guest Member',
    price: 0,
    monthlyQuota: 0,
    features: ['Public News Access', 'Directory Read-Only', 'Community Preview'],
  },
  founder_pro: {
    label: 'Founder Pro',
    price: 49,
    monthlyQuota: 5,
    features: ['Custom Subdomain', '5 Verified Articles/mo', 'Full Community Access', 'Direct Messaging', 'Custom Portfolio'],
  },
  executive_fellow: {
    label: 'Executive Fellow',
    price: 199,
    monthlyQuota: 20,
    features: ['Custom Subdomain & DNS', '20 Verified Articles/mo', 'Executive Lounge', 'Priority Editorial Review', 'Investor Deal Room', 'Official Credential Pack'],
  },
};

export const ARTICLE_CATEGORIES = [
  'All',
  'Business',
  'Finance',
  'Tech/AI',
  'Founders',
  'Macro Economy',
  'Venture Capital',
  'Fintech & Banking',
  'Markets',
  'M&A',
];

export const DIRECTORY_ROLES = ['All', 'Founder', 'Investor'];
export const VERIFICATION_STATUSES = ['All', 'Verified', 'Pending', 'Unverified'];
