import {
  FounderMember,
  NewsArticle,
  MemberArticle,
  ChatChannel,
  ChatMessage,
  MarketTickerItem,
  Advertisement,
  VisitorInquiry,
  AutomatedEmailNotification
} from '../types';

export const MARKET_TICKERS: MarketTickerItem[] = [
  { symbol: 'NIFTY 50', name: 'Nifty 50 Index', price: '25,418.50', change: '+0.74%', isPositive: true, isIndianIndex: true },
  { symbol: 'SENSEX', name: 'BSE Sensex 30', price: '83,184.20', change: '+0.68%', isPositive: true, isIndianIndex: true },
  { symbol: 'BANK NIFTY', name: 'Nifty Bank', price: '52,145.80', change: '+0.92%', isPositive: true, isIndianIndex: true },
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: '₹2,985.40', change: '+1.15%', isPositive: true, isIndianIndex: true },
  { symbol: 'TCS', name: 'Tata Consultancy Svcs', price: '₹4,210.60', change: '-0.32%', isPositive: false, isIndianIndex: true },
  { symbol: 'HDFC BANK', name: 'HDFC Bank Ltd', price: '₹1,680.15', change: '+0.94%', isPositive: true, isIndianIndex: true },
  { symbol: 'INFY', name: 'Infosys Ltd', price: '₹1,915.20', change: '+1.48%', isPositive: true, isIndianIndex: true },
  { symbol: 'S&P 500', name: 'S&P 500', price: '5,864.20', change: '+0.64%', isPositive: true },
  { symbol: 'NASDAQ', name: 'Nasdaq 100', price: '18,340.50', change: '+1.12%', isPositive: true },
  { symbol: 'GRID-50', name: 'Founder Tech Index', price: '3,412.80', change: '+2.45%', isPositive: true }
];

export const INITIAL_ADS: Advertisement[] = [
  {
    id: 'ad-top-1',
    slot: 'top_leaderboard',
    title: 'HDFC Bank SmartUp for Growth-Stage Founders',
    sponsor: 'HDFC Bank SmartUp',
    description: 'Zero-fee multi-currency accounts, collateral-free venture debt up to ₹25 Cr, and prioritized RBI regulatory advisory.',
    ctaText: 'Apply in 3 Minutes',
    ctaUrl: 'https://hdfcbank.com/smartup',
    badge: 'Official Banking Sponsor',
    bannerImageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
    impressions: 48920,
    clicks: 1420,
    active: true
  },
  {
    id: 'ad-in-feed-1',
    slot: 'in_feed_home',
    title: 'Scale on AWS: Claim Up to $100,000 in GPU & Compute Credits',
    sponsor: 'Amazon Web Services',
    description: 'Exclusive AWS Activate package for verified members of The Founder Grid. Fast-track approval for AI inference & cloud workloads.',
    ctaText: 'Claim $100K Credits',
    ctaUrl: 'https://aws.amazon.com/activate',
    badge: 'Founder Infrastructure Deal',
    bannerImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    impressions: 34100,
    clicks: 980,
    active: true
  },
  {
    id: 'ad-sidebar-left',
    slot: 'sidebar_left',
    title: 'Vertex Capital: Series A Cross-Border Syndicate',
    sponsor: 'Vertex Ventures',
    description: '$50M dedicated deployment fund for B2B SaaS, FinTech, and Industrial Automation founders expanding globally.',
    ctaText: 'Submit Pitch Deck',
    ctaUrl: 'https://vertexventures.com',
    badge: 'Venture Partner',
    impressions: 19800,
    clicks: 450,
    active: true
  },
  {
    id: 'ad-sidebar-right',
    slot: 'sidebar_right',
    title: 'Deel: Hire Engineers & Sales Across 150+ Countries',
    sponsor: 'Deel Global HR',
    description: 'Compliant international contracts, automated payroll, and visa sponsorship for fast-growing venture teams.',
    ctaText: 'Get 20% Off Deel',
    ctaUrl: 'https://deel.com',
    badge: 'Exclusive Perk',
    impressions: 22400,
    clicks: 610,
    active: true
  },
  {
    id: 'ad-in-article',
    slot: 'in_article',
    title: 'Stripe Treasury: Embedded Finance for Modern SaaS Platforms',
    sponsor: 'Stripe',
    description: 'Enable business bank accounts, cards, and money movement inside your software application with simple API calls.',
    ctaText: 'Explore Documentation',
    ctaUrl: 'https://stripe.com/treasury',
    badge: 'Platform Sponsor',
    impressions: 15300,
    clicks: 390,
    active: true
  }
];

export const INITIAL_MEMBERS: FounderMember[] = [
  {
    id: 'founder-1',
    role: 'Founder',
    name: 'Sarah Chen',
    handle: 'sarahchen',
    subdomain: 'sarahchen',
    title: 'Founder & CEO',
    companyName: 'ApexScale AI',
    companyUrl: 'https://apexscale.ai',
    industry: 'Enterprise SaaS / AI Workflows',
    location: 'San Francisco & Bengaluru',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    bio: 'Former VP of Product at Stripe. Scaling automated financial forecasting pipelines for mid-market CFOs. Passionate about vertical AI and sustainable capital allocation.',
    missionVision: 'To automate 80% of repetitive financial operations for B2B enterprises, letting executive teams make real-time decisions grounded in deterministic mathematical certainty.',
    coreValues: [
      'Deterministic Accuracy Over Hallucination',
      'Radical Capital Efficiency',
      'Founder-Led Distribution',
      'Enterprise Privacy by Design'
    ],
    services: [
      { title: 'Autonomous CFO Forecasting', desc: 'AI engines connected directly into ERP ledgers to predict runway, cashflow variance, and COGS.' },
      { title: 'GPU & Inference Unit Cost Optimization', desc: 'Benchmarking framework to reduce generative token costs by 40% in production workflows.' },
      { title: 'Enterprise Migration Advisory', desc: 'Tailored roadmaps for transitioning from legacy NetSuite and SAP workflows into modern telemetry.' }
    ],
    caseStudies: [
      {
        id: 'cs-1',
        title: 'Halving Variance in Multi-Entity Treasury Operations',
        client: 'FinFlow Global (Fintech Unicorn)',
        outcome: 'Reduced quarterly financial forecast variance from 18% down to 2.1%.',
        metric: '92% faster month-end closing',
        year: '2025'
      },
      {
        id: 'cs-2',
        title: 'GPU Cost Arbitrage Across Multi-Cloud Ingress',
        client: 'CognitiveLogix ($12M ARR)',
        outcome: 'Shifted production training from on-demand to spot clusters with zero downtime.',
        metric: '$420,000 annual cloud savings',
        year: '2025'
      },
      {
        id: 'cs-3',
        title: 'Automated Revenue Recognition for Series B B2B SaaS',
        client: 'ScaleCloud Networks',
        outcome: 'Replaced manual spreadsheets with automated contract amortization pipelines.',
        metric: '100% ASC 606 audit compliance',
        year: '2026'
      }
    ],
    fundingStage: 'Series A',
    metrics: {
      revenueOrAum: '$4.2M ARR',
      growthRate: '180% YoY',
      teamSize: 24,
      foundedYear: 2023
    },
    isVerified: true,
    membershipTier: 'founder_pro',
    membershipBadge: 'Charter Founder',
    membershipCertificateId: 'TFG-CERT-2025-001',
    membershipJoinedDate: 'Jan 2025',
    membershipExpiryDate: '2026-10-15',
    articlesPublishedThisWeek: 2, // Hard cap 3 per week
    weeklyArticleQuota: 3,
    articles: [
      {
        id: 'sc-art-1',
        memberId: 'founder-1',
        subdomain: 'sarahchen',
        title: 'The CFO Operating Model in the Era of Autonomous Inference',
        subtitle: 'Why financial engineering is shifting from headcount to GPU token budgeting.',
        category: 'Finance',
        content: `Over the past two quarters, enterprise budgeting cycles have undergone a quiet tectonic shift. Where legacy finance leaders evaluated headcount-to-ARR ratios, forward-looking CFOs now benchmark compute efficiency per gross margin dollar.

In this deep dive, we examine how 30+ B2B software enterprises restructured their ledger accounts to classify generative model inference as cost-of-goods (COGS) rather than traditional operating expense (OpEx).

Key Takeaways:
1. Inference amortisation must mirror revenue milestones to prevent margin compression.
2. Vendor lock-in risk remains the #1 compliance concern cited by venture audit committees.
3. Proprietary contextual data moats yield 3.4x higher customer lifetime value (LTV).

Founders scaling through Series A must build observable telemetry into their billing engines from day zero.`,
        publishedAt: 'Yesterday at 9:30 AM',
        readTime: '4 min read',
        views: 1420,
        tags: ['Finance', 'Enterprise AI', 'CFO Strategy'],
        weekNumber: 38,
        year: 2026,
        status: 'approved',
        submittedAt: '2026-09-20'
      },
      {
        id: 'sc-art-2',
        memberId: 'founder-1',
        subdomain: 'sarahchen',
        title: 'Bootstrapping vs Venture Capital: The Hybrid Capital Playbook',
        subtitle: 'How we reached $1M ARR before taking institutional capital on our terms.',
        category: 'Venture Capital',
        content: `There is a persistent false dichotomy in modern entrepreneurship: you are either an austere bootstrapper or an aggressive venture-backed blitzscaler.

In reality, the highest quartile of tech founders increasingly leverage a hybrid framework: cash-flow discipline through founder-led enterprise pilot sales, followed by non-dilutive credit or targeted equity syndicates to accelerate proven distribution.`,
        publishedAt: '3 days ago',
        readTime: '6 min read',
        views: 2890,
        tags: ['Venture Capital', 'Fundraising', 'SaaS'],
        weekNumber: 38,
        year: 2026,
        status: 'approved',
        submittedAt: '2026-09-18'
      }
    ],
    intentLookingFor: ['Clients', 'Capital', 'Partners'],
    intentCanOffer: ['Software', 'Mentorship', 'Services'],
    privacySettings: {
      showEmail: true,
      showPhone: false,
      email: 'sarah@apexscale.ai',
      phone: '+1 (415) 890-4122'
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahchen-mock',
      twitter: 'https://twitter.com/sarahchen_ai',
      website: 'https://sarahchen.thefoundergrid.com',
      calendly: 'https://calendly.com/sarahchen-mock'
    },
    featuredQuote: 'Capital is a commodity; speed of execution paired with economic unit discipline is the only durable moat.',
    joinedDate: 'Jan 2025'
  },
  {
    id: 'founder-2',
    role: 'Investor',
    name: 'Marcus Vance',
    handle: 'marcusvance',
    subdomain: 'marcusvance',
    title: 'Managing Partner & Co-Founder',
    companyName: 'Vance & Sterling Partners',
    companyUrl: 'https://vancesterling.example.com',
    industry: 'Private Equity / B2B Services',
    location: 'Mumbai & New York',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    coverUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    bio: 'Acquiring and modernizing mission-critical legacy logistics and industrial supply chain operations. Backed by family offices and institutional endowments across North America and India.',
    missionVision: 'To bridge traditional manufacturing and industrial cashflows with 21st-century tech infrastructure and institutional debt capital.',
    coreValues: [
      'Cash Flow Realism',
      'Long-Term Operator Ownership',
      'No High-Multiple Speculation',
      'Integrity in Diligence'
    ],
    services: [
      { title: 'Founder Succession Buyouts', desc: 'Providing full or partial exits for founders of $5M-$20M EBITDA industrial businesses.' },
      { title: 'Supply Chain Recapitalisation', desc: 'Structuring asset-backed credit facilities and operational modernization capital.' },
      { title: 'Cross-Border APAC Growth', desc: 'Expanding North American industrial manufacturing into high-efficiency Indian industrial corridors.' }
    ],
    caseStudies: [
      {
        id: 'cs-4',
        title: 'Modernizing a 34-Year-Old Precision Tooling Manufacturer',
        client: 'Apex Precision Engineering',
        outcome: 'Automated scheduling and deployed ERP, boosting EBITDA from $3.2M to $6.8M in 24 months.',
        metric: '112% EBITDA expansion',
        year: '2024'
      },
      {
        id: 'cs-5',
        title: 'Cold Storage Warehouse Consolidation',
        client: 'Midwest Intermodal Logistics',
        outcome: 'Merged 4 regional logistics operators into a unified cold chain network.',
        metric: '$48M combined revenue',
        year: '2025'
      }
    ],
    fundingStage: 'Institutional Fund',
    metrics: {
      revenueOrAum: '$38M AUM',
      growthRate: '28% EBITDA margin',
      teamSize: 110,
      foundedYear: 2019
    },
    isVerified: true,
    membershipTier: 'founder_pro',
    membershipBadge: 'Founding 100',
    membershipCertificateId: 'TFG-CERT-2025-002',
    membershipJoinedDate: 'Mar 2025',
    membershipExpiryDate: '2026-10-22',
    articlesPublishedThisWeek: 1,
    weeklyArticleQuota: 3,
    articles: [
      {
        id: 'mv-art-1',
        memberId: 'founder-2',
        subdomain: 'marcusvance',
        title: 'The Micro-Private Equity Playbook: Acquiring $5M-$20M EBITDA Businesses',
        subtitle: 'Why the silver tsunami represents the greatest transfer of wealth in business history.',
        category: 'M&A',
        content: `Over 10,000 baby boomer business owners retire every day. Many operate remarkably resilient, high-cashflow regional monopolies without formal succession plans.

By applying modern tech stacks, automated inventory routing, and institutional debt structures, search funds and micro-PE firms are generating superior risk-adjusted alpha compared to high-multiple tech speculations.`,
        publishedAt: '2 days ago',
        readTime: '7 min read',
        views: 3120,
        tags: ['Private Equity', 'M&A', 'Succession'],
        weekNumber: 38,
        year: 2026,
        status: 'approved',
        submittedAt: '2026-09-19'
      }
    ],
    intentLookingFor: ['Capital', 'Distributors', 'Partners'],
    intentCanOffer: ['Mentorship', 'Services'],
    privacySettings: {
      showEmail: true,
      showPhone: true,
      email: 'marcus@vancesterling.example.com',
      phone: '+91 98201 44512'
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/marcusvance-pe',
      website: 'https://marcusvance.thefoundergrid.com'
    },
    featuredQuote: 'Glamour is expensive. Cash flow in unsexy industries compounds quietly in your favor.',
    joinedDate: 'Mar 2025'
  },
  {
    id: 'founder-3',
    role: 'Founder',
    name: 'Elena Rostova',
    handle: 'elena-rostova',
    subdomain: 'elena-rostova',
    title: 'Founder & Head of Research',
    companyName: 'Kallisto Treasury',
    companyUrl: 'https://kallisto.example.com',
    industry: 'Fintech & Algorithmic Hedging',
    location: 'London & Zurich',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop',
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    bio: 'Ex-Barclays quantitative strategist building cross-border FX liquidity routers for global digital commerce merchants.',
    missionVision: 'To insulate high-growth international businesses from devastating foreign exchange slippage through mathematical execution.',
    coreValues: [
      'Sub-Millisecond Settlement',
      'Zero Hidden Markups',
      'Bank-Grade Encryption',
      'Audit Transparency'
    ],
    services: [
      { title: 'Dynamic Multi-Currency Treasury', desc: 'Real-time liquidity routing across GBP, USD, EUR, and INR.' },
      { title: 'Programmatic Hedging APIs', desc: 'Algorithmic micro-hedges executed at point-of-sale for global marketplaces.' }
    ],
    caseStudies: [
      {
        id: 'cs-6',
        title: 'Preventing 14% Margin Erosion for EU Cross-Border Marketplace',
        client: 'ShopNova Europe',
        outcome: 'Implemented real-time volatility dampening algorithms, protecting €3.4M in GMV.',
        metric: '€490,000 saved in FX spread',
        year: '2025'
      }
    ],
    fundingStage: 'Series A',
    metrics: {
      revenueOrAum: '$1.4B Annual Volume',
      growthRate: '220% YoY',
      teamSize: 18,
      foundedYear: 2023
    },
    isVerified: true,
    membershipTier: 'founder_pro',
    membershipBadge: 'Venture Fellow',
    membershipCertificateId: 'TFG-CERT-2025-003',
    membershipJoinedDate: 'May 2025',
    membershipExpiryDate: '2026-11-10',
    articlesPublishedThisWeek: 1,
    weeklyArticleQuota: 3,
    articles: [
      {
        id: 'er-art-1',
        memberId: 'founder-3',
        subdomain: 'elena-rostova',
        title: 'Foreign Exchange Volatility Mitigation for Multinational Startups',
        subtitle: 'How currency fluctuations can erase 30% of your gross margins unnoticed.',
        category: 'Finance',
        content: `When scaling into UK, EU, and APAC territories, revenue recognized in local currency often bears severe FX variance by the time it settles into your primary treasury accounts.

We outline a systematic programmatic hedging structure that high-growth startups can deploy without expensive tier-one prime brokerage mandates.`,
        publishedAt: '4 days ago',
        readTime: '5 min read',
        views: 1840,
        tags: ['Treasury', 'Fintech', 'FX Hedging'],
        weekNumber: 38,
        year: 2026,
        status: 'approved',
        submittedAt: '2026-09-17'
      }
    ],
    intentLookingFor: ['Clients', 'Distributors'],
    intentCanOffer: ['Software', 'Services'],
    privacySettings: {
      showEmail: false,
      showPhone: false,
      email: 'elena@kallisto.example.com'
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/elenarostova',
      website: 'https://elena-rostova.thefoundergrid.com'
    },
    featuredQuote: 'The best companies eliminate financial friction before their customers even know it exists.',
    joinedDate: 'May 2025'
  },
  {
    id: 'founder-4',
    role: 'Founder',
    name: 'Rohit Sharma',
    handle: 'rohitsharma',
    subdomain: 'rohitsharma',
    title: 'Founder & Managing Director',
    companyName: 'BharatGrid Logistics',
    companyUrl: 'https://bharatgrid.in',
    industry: 'Supply Chain & Manufacturing Tech',
    location: 'Bengaluru & Pune, India',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    coverUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    bio: 'Pioneering IoT-enabled multi-modal container tracking across Indian port corridors. Connecting 400+ precision manufacturers with western buyers.',
    missionVision: 'Empower Indian MSME manufacturing clusters with Tier-1 digital logistics infrastructure to accelerate India to a $10 Trillion economy.',
    coreValues: [
      'Grounded Bharat Ingenuity',
      'Zero Cargo Loss',
      'Transparency Across Corridors',
      'Empowering Small Manufacturers'
    ],
    services: [
      { title: 'Multimodal Container Telemetry', desc: 'Real-time GPS + temperature sensing for export containers through JNPT and Mundra ports.' },
      { title: 'Direct Factory-to-Port Customs Clearance', desc: 'Paperless digital customs filing and bonded warehousing networks.' },
      { title: 'Export Supplier Matchmaking', desc: 'Connecting vetted European and US retail chains with certified Indian manufacturing units.' }
    ],
    caseStudies: [
      {
        id: 'cs-7',
        title: 'Accelerating Garment Exports from Tirupur to Rotterdam',
        client: 'Vanguard Textiles India',
        outcome: 'Reduced transit dwell time from 14 days to 4.5 days at port customs.',
        metric: '68% speed enhancement',
        year: '2025'
      },
      {
        id: 'cs-8',
        title: 'Cold Chain Pharmaceutical Export for Vaccine Logistics',
        client: 'Seraph BioTech',
        outcome: 'Maintained 2°C - 8°C temperature integrity across 1,800 km road-to-air transit.',
        metric: 'Zero temperature breach',
        year: '2025'
      }
    ],
    fundingStage: 'Series B+',
    metrics: {
      revenueOrAum: '₹185 Cr Annual Run-Rate',
      growthRate: '95% YoY',
      teamSize: 180,
      foundedYear: 2021
    },
    isVerified: true,
    membershipTier: 'executive_fellow',
    membershipBadge: 'Charter Founder',
    membershipCertificateId: 'TFG-CERT-2025-004',
    membershipJoinedDate: 'Feb 2025',
    membershipExpiryDate: '2026-09-30', // Approaching renewal!
    articlesPublishedThisWeek: 0,
    weeklyArticleQuota: 3,
    articles: [],
    intentLookingFor: ['Partners', 'Distributors', 'Capital'],
    intentCanOffer: ['Manufacturing', 'Software', 'Mentorship'],
    privacySettings: {
      showEmail: true,
      showPhone: true,
      email: 'rohit@bharatgrid.in',
      phone: '+91 99800 12345'
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/rohitsharma-bharat',
      website: 'https://rohitsharma.thefoundergrid.com'
    },
    featuredQuote: 'Physical infrastructure powered by ruthless software telemetry is the greatest compounding asset in emerging markets.',
    joinedDate: 'Feb 2025'
  },
  {
    id: 'founder-5',
    role: 'Investor',
    name: 'Ananya Mehta',
    handle: 'ananyamehta',
    subdomain: 'ananyamehta',
    title: 'General Partner',
    companyName: 'Kaveri Ventures',
    companyUrl: 'https://kaveri.vc',
    industry: 'Early-Stage Venture Capital',
    location: 'Mumbai & Singapore',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    coverUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop',
    bio: 'Investing $500k-$3M in technical founders building developer tools, enterprise B2B SaaS, and domestic manufacturing ecosystems.',
    missionVision: 'Backing relentless founders who turn non-consensus industrial insights into defining category leaders.',
    coreValues: [
      'Founder-Centric Governance',
      'Unwavering High-Conviction',
      'Deep Technical Diligence',
      'Speed in Term Sheets'
    ],
    services: [
      { title: 'Seed & Pre-Series A Lead Checks', desc: 'Writing lead cheques from $1M to $3M with board-level strategic participation.' },
      { title: 'US & Global Customer Intros', desc: 'Direct access to Kaveri CXO Council with 150+ enterprise decision makers.' }
    ],
    caseStudies: [
      {
        id: 'cs-9',
        title: 'Leading the Seed Round for AI Observability Leader',
        client: 'TracePulse AI',
        outcome: 'Helped close first 12 US enterprise contracts within 9 months of seed closing.',
        metric: '$0 to $2.8M ARR in 14 mos',
        year: '2024'
      }
    ],
    fundingStage: 'Institutional Fund',
    metrics: {
      revenueOrAum: '$120M Fund II',
      growthRate: '3.4x Net TVPI',
      teamSize: 12,
      foundedYear: 2020
    },
    isVerified: true,
    membershipTier: 'founder_pro',
    membershipBadge: 'Charter Founder',
    membershipCertificateId: 'TFG-CERT-2025-005',
    membershipJoinedDate: 'Apr 2025',
    membershipExpiryDate: '2026-12-01',
    articlesPublishedThisWeek: 0,
    weeklyArticleQuota: 3,
    articles: [],
    intentLookingFor: ['Partners', 'Clients'],
    intentCanOffer: ['Mentorship', 'Services'],
    privacySettings: {
      showEmail: true,
      showPhone: false,
      email: 'ananya@kaveri.vc'
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/ananyamehta-vc',
      twitter: 'https://twitter.com/ananyavc',
      website: 'https://ananyamehta.thefoundergrid.com'
    },
    featuredQuote: 'The best founders do not need cheerleaders; they need partners who tell them the unvarnished mathematical truth.',
    joinedDate: 'Apr 2025'
  }
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-lead-1',
    title: 'India Q2 GDP Accelerates to 7.8%: Manufacturing & Capex Surge Drives Capital Goods Rally',
    slug: 'india-gdp-accelerates-manufacturing-capex-surge',
    category: 'Macro Economy',
    excerpt: 'Robust private capital expenditure and domestic electronics manufacturing propel Indian equity indices to fresh historic peaks.',
    content: `New Delhi — In an authoritative release by the National Statistical Office, India's Gross Domestic Product expanded at an annualized clip of 7.8% for the second consecutive quarter. 

The standout performers were manufacturing, registering an 8.4% expansion, and gross fixed capital formation, indicating that corporate India is vigorously reinvesting retained earnings into factory floor automation, solar logistics, and specialized semiconductor packaging corridors.

Institutional foreign portfolio investors (FPIs) injected an estimated ₹14,200 crore into Indian capital markets over the past 10 trading sessions, heavily weighting Nifty 50 constituents and domestic private banking champions.

Meanwhile, RBI Governor reaffirmed that liquidity buffers remain resilient, positioning Indian benchmark yields as one of the most stable emerging market asset classes globally.`,
    author: {
      name: 'The Founder Grid Editorial Board',
      role: 'Lead Business Desk',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
      isAdmin: true
    },
    publishedAt: '28 mins ago',
    readTime: '4 min read',
    views: 8940,
    imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop',
    keyTakeaways: [
      'Gross Fixed Capital Formation surged 9.2%, signaling robust private capex cycle.',
      'Domestic electronics & component manufacturing led sectoral output growth.',
      'FPI net inflows crossed ₹14,200 Cr across Nifty 50 and private banking assets.'
    ],
    isLeadEditorial: true,
    isFeatured: true,
    isTrending: true,
    tags: ['India Economy', 'NIFTY 50', 'Capex', 'Manufacturing']
  },
  {
    id: 'news-2',
    title: 'Venture Capitalists Shift from Growth-at-All-Costs to Rule of 40 in Series B Valuations',
    slug: 'venture-capital-rule-of-40-discipline',
    category: 'Venture Capital',
    excerpt: 'How late-stage venture term sheets now penalize burn multiples above 1.2x while rewarding deterministic enterprise net dollar retention.',
    content: `Silicon Valley & Bengaluru — Over the past twelve months, the valuation algorithms deployed by top-tier venture partnerships have converged on a unified metric: the efficiency score. 

Where founders previously commanded 30x forward revenue multiples for triple-digit burn rates, Series B term sheets now demand minimum 30%+ operating margins or a combined Rule-of-40 score exceeding 45.

"We are no longer pricing hypothetical TAMs," remarks one General Partner. "We are pricing the net operating cash generated per unit of cloud compute."`,
    author: {
      name: 'Vikram Malhotra',
      role: 'Venture Editor',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop',
      isAdmin: true
    },
    publishedAt: '2 hours ago',
    readTime: '5 min read',
    views: 5310,
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    keyTakeaways: [
      'Net retention over 120% now acts as a mandatory gate for top-quartile multiples.',
      'Average Series B dilution stabilized at 18-22% across global venture hubs.'
    ],
    isLeadEditorial: false,
    isFeatured: true,
    isTrending: true,
    tags: ['Venture Capital', 'Startups', 'Valuations']
  },
  {
    id: 'news-3',
    title: 'Commercial Real Estate vs AI Data Centers: The Great Megawatt Land Grab',
    slug: 'commercial-real-estate-ai-data-centers',
    category: 'Markets',
    excerpt: 'Institutional capital reallocates from downtown commercial office space into high-voltage power-grid connected AI infrastructure.',
    content: `As enterprise demand for model inference surges, data center landlords with guaranteed electrical substation capacity are commanding 40% lease premiums over standard industrial warehouses.`,
    author: {
      name: 'Sarah Chen',
      role: 'Founder Member',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
      subdomain: 'sarahchen',
      isVerifiedFounder: true
    },
    publishedAt: '4 hours ago',
    readTime: '6 min read',
    views: 4120,
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    keyTakeaways: [
      'Substation interconnection delays have created a 36-month backlog for new server parks.',
      'Nuclear and hydro co-located facilities trade at peak asset valuations.'
    ],
    isFeatured: false,
    isTrending: false,
    tags: ['AI Infrastructure', 'Data Centers', 'Real Estate']
  }
];

export const CHAT_CHANNELS: ChatChannel[] = [
  {
    id: 'chan-announcements',
    name: 'announcements',
    description: 'Official syndicate announcements, platform updates & editorial drops',
    topic: 'Curated by Editorial Desk',
    isPrivatePaid: true,
    memberCount: 248
  },
  {
    id: 'chan-business-networking',
    name: 'business-networking',
    description: 'Founder referrals, enterprise vendor recommendations & introductions',
    topic: 'Open to all verified founders & investors',
    isPrivatePaid: true,
    memberCount: 215
  },
  {
    id: 'chan-deals-and-partnerships',
    name: 'deals-and-partnerships',
    description: 'M&A syndicates, joint venture proposals, co-investments & term sheet deal-flow',
    topic: 'Deal-flow exchange & institutional intros',
    isPrivatePaid: true,
    memberCount: 194
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    channelId: 'chan-announcements',
    senderId: 'admin-1',
    senderName: 'The Founder Grid Editorial',
    senderSubdomain: 'editorial',
    senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    senderCompany: 'The Founder Grid HQ',
    text: 'Welcome to all 24 new founders joining this week from Bengaluru, Mumbai, London, and San Francisco. Weekly article quotas have reset for the week (3 articles max). Remember to review your verifiable credentials in your dashboard.',
    timestamp: 'Today at 8:00 AM',
    likesCount: 18
  },
  {
    id: 'msg-2',
    channelId: 'chan-business-networking',
    senderId: 'founder-1',
    senderName: 'Sarah Chen',
    senderSubdomain: 'sarahchen',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    senderCompany: 'ApexScale AI',
    text: 'Looking for warm introductions to Tier-1 Enterprise CFOs or Chief Accounting Officers in banking/insurance exploring automated month-end forecasting. Happy to reciprocate with West Coast venture introductions or technical AI architecture reviews!',
    timestamp: 'Today at 10:15 AM',
    referralCategory: 'Business Referral',
    likesCount: 9
  },
  {
    id: 'msg-3',
    channelId: 'chan-deals-and-partnerships',
    senderId: 'founder-2',
    senderName: 'Marcus Vance',
    senderSubdomain: 'marcusvance',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    senderCompany: 'Vance & Sterling Partners',
    text: 'Reviewing two profitable industrial tooling & manufacturing assets ($3M-$6M EBITDA, zero debt, 25+ yr operating history) in Western India corridor. Seeking co-investors or specialized operating partners for the buyout syndicate.',
    timestamp: 'Today at 11:40 AM',
    referralCategory: 'Partnership Lead',
    likesCount: 14
  }
];

export const INITIAL_INQUIRIES: VisitorInquiry[] = [
  {
    id: 'inq-1',
    targetMemberId: 'founder-1',
    targetMemberName: 'Sarah Chen',
    targetSubdomain: 'sarahchen',
    senderName: 'Rohan Deshmukh',
    senderEmail: 'rohan.deshmukh@kotakfin.example.com',
    senderCompany: 'Kotak Institutional Securities',
    intentType: 'Clients',
    message: 'We reviewed your published dispatch on autonomous inference COGS budgeting. We would like to evaluate ApexScale for our enterprise wealth management division.',
    submittedAt: 'Today at 9:15 AM',
    status: 'new'
  },
  {
    id: 'inq-2',
    targetMemberId: 'founder-4',
    targetMemberName: 'Rohit Sharma',
    targetSubdomain: 'rohitsharma',
    senderName: 'Julian Weber',
    senderEmail: 'j.weber@hamburg-logistics.de',
    senderCompany: 'Hanseatic Freight GmbH',
    intentType: 'Distributors',
    message: 'Interested in partnering with BharatGrid for our bonded cold-chain pharmaceutical shipments entering Mumbai port from Frankfurt.',
    submittedAt: 'Yesterday at 4:30 PM',
    status: 'reviewed'
  }
];

export const INITIAL_ARTICLE_REVIEWS: MemberArticle[] = INITIAL_MEMBERS.flatMap((m) => m.articles || []);

export const INITIAL_EMAIL_NOTIFICATIONS: AutomatedEmailNotification[] = [

  {
    id: 'email-notif-1',
    recipientEmail: 'sarah@apexscale.ai',
    recipientName: 'Sarah Chen',
    subject: '✅ Article Approved & Live: "The CFO Operating Model in the Era of Autonomous Inference"',
    triggerType: 'article_approved',
    body: 'Your submitted article has been reviewed by the Editorial Board and approved! It is now live across your subdomain (sarahchen.thefoundergrid.com) and syndicated on the global news directory.',
    sentAt: 'Yesterday at 9:30 AM',
    read: false
  },
  {
    id: 'email-notif-2',
    recipientEmail: 'sarah@apexscale.ai',
    recipientName: 'Sarah Chen',
    subject: '⚠️ Weekly Publishing Quota Update: 2 of 3 Articles Used',
    triggerType: 'quota_reached',
    body: 'You have published 2 articles this week. You have 1 remaining submission slot. Quotas automatically reset every Monday at 00:00 UTC.',
    sentAt: 'Yesterday at 10:00 AM',
    read: true
  },
  {
    id: 'email-notif-3',
    recipientEmail: 'rohit@bharatgrid.in',
    recipientName: 'Rohit Sharma',
    subject: '⏳ Annual Membership Renewal Reminder (15 Days Remaining)',
    triggerType: 'renewal_15_days',
    body: 'Your Charter Founder membership on The Founder Grid will renew on September 30, 2026. Review your active subdomains, credential badges, and billing preferences.',
    sentAt: 'Sep 15, 2026',
    read: false
  },
  {
    id: 'email-notif-4',
    recipientEmail: 'sarah@apexscale.ai',
    recipientName: 'Sarah Chen',
    subject: '🔔 New Inbound Lead via sarahchen.thefoundergrid.com',
    triggerType: 'inbound_lead',
    body: 'Rohan Deshmukh from Kotak Institutional Securities submitted an inquiry on your portfolio regarding enterprise forecasting pilots.',
    sentAt: 'Today at 9:15 AM',
    read: false
  }
];
