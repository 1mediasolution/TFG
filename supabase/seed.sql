-- ==============================================================================
-- The Founder Grid - Seed Data Script
-- Run this in your Supabase SQL Editor after running schema.sql
-- ==============================================================================

-- 1. Seed Initial Members
INSERT INTO public.members (
    id, role, name, handle, subdomain, title, company_name, company_url, industry, location,
    avatar_url, cover_url, bio, mission_vision, core_values, services, case_studies,
    funding_stage, metrics, is_verified, membership_tier, membership_badge,
    membership_certificate_id, membership_joined_date, renewal_date, articles_published_this_week,
    weekly_article_quota, looking_for, can_offer, email, phone, linkedin_url
) VALUES
(
    'mem-sarah-chen',
    'Founder',
    'Sarah Chen',
    'sarahchen',
    'sarahchen',
    'Founder & Managing Partner',
    'Aura Protocol',
    'https://auraprotocol.example.com',
    'Fintech',
    'Singapore & San Francisco',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80',
    'Building institutional liquidity routing protocols across APAC. Angel investor in 14 B2B infrastructure fintechs.',
    'To architect transparent, latency-free global capital rails bridging emerging enterprise liquidity with institutional treasury requirements.',
    ARRAY['Execution Velocity', 'Deterministic Security', 'Fiduciary Rigor', 'Radical Transparency'],
    '[{"title": "Institutional Liquidity Architecture", "description": "High-throughput smart order routing and multi-venue settlement."}, {"title": "Cross-Border Treasury Engineering", "description": "API-driven multi-currency settlement rails for tier-1 Asian commercial banks."}]'::jsonb,
    '[{"id": "cs-aura-1", "title": "Cross-Border APAC Settlement Rails", "client": "Tier-1 Regional Bank", "outcome": "Compressed T+2 FX settlement to 840ms with zero reconciliation breaks.", "metric": "840ms Settlement Time", "year": "2025"}]'::jsonb,
    'Series B ($32M Raised)',
    '{"revenueOrAum": "$4.2B Annual Volume", "teamSize": "48 Engineers", "growthRate": "+184% YoY"}'::jsonb,
    true,
    'founder_pro',
    'Charter Founder',
    'TFG-CERT-2026-001',
    'January 2024',
    'January 2027',
    1,
    3,
    ARRAY['Capital', 'Partners'],
    ARRAY['Software', 'Mentorship'],
    'sarah@auraprotocol.example.com',
    '+65 6789 0123',
    'https://linkedin.com'
),
(
    'mem-rajesh-nair',
    'Founder',
    'Rajesh Nair',
    'rajeshnair',
    'rajeshnair',
    'CEO & Co-Founder',
    'Kaveri Compute',
    'https://kavericompute.example.com',
    'Cloud Infrastructure',
    'Bengaluru, India',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80',
    'Architecting high-density GPU bare-metal infrastructure clusters for AI foundational models in South Asia.',
    'To establish sovereign compute infrastructure in India offering deterministic cost-per-token economics for foundational model developers.',
    ARRAY['Sovereignty', 'Energy Efficiency', 'Extreme Scale', 'Client First'],
    '[{"title": "Dedicated GPU Pod Deployment", "description": "Custom liquid-cooled clusters running H100 and H200 accelerators."}, {"title": "Low-Latency Slurm Orchestration", "description": "Turnkey HPC environments optimized for distributed transformer training."}]'::jsonb,
    '[{"id": "cs-kav-1", "title": "Foundational LLM Cluster Provisioning", "client": "Leading Indic AI Lab", "outcome": "Provisioned 1,024 GPU cluster with 99.98% uninterrupted training uptime.", "metric": "99.98% Training Uptime", "year": "2026"}]'::jsonb,
    'Series A ($18.5M)',
    '{"revenueOrAum": "$12.4M ARR", "teamSize": "64 Specialists", "growthRate": "+310% YoY"}'::jsonb,
    true,
    'executive_fellow',
    'Founding 100',
    'TFG-CERT-2026-002',
    'March 2024',
    'March 2027',
    2,
    3,
    ARRAY['Clients', 'Distributors'],
    ARRAY['Services', 'Software'],
    'rajesh@kavericompute.example.com',
    '+91 80 4123 4567',
    'https://linkedin.com'
)
ON CONFLICT (id) DO NOTHING;

-- 2. Seed Chat Channels
INSERT INTO public.chat_channels (id, name, description, topic, is_private_paid, member_count) VALUES
('chan-announcements', 'announcements', 'Official Syndicate Dispatches & Market Intelligence', 'Syndicate Bulletin', true, 184),
('chan-fundraising', 'fundraising-roundtable', 'Venture Capital syndications, Term Sheet discussions, Co-investor matching', 'Capital & Syndication', true, 142),
('chan-business-leads', 'commercial-referrals', 'Direct client intros, cross-border distributor agreements & high-value contracts', 'Commercial Contracts', true, 168),
('chan-enterprise-tech', 'enterprise-stack', 'Technical infrastructure, GPU capacity sharing, developer hiring', 'Engineering & Tech', true, 115)
ON CONFLICT (id) DO NOTHING;

-- 3. Seed Advertisements
INSERT INTO public.advertisements (id, slot, title, sponsor, description, cta_text, cta_url, badge, impressions, clicks, active) VALUES
('ad-top-leaderboard-1', 'top_leaderboard', 'Enterprise Cross-Border Escrow for M&A and Private Equity', 'SilverOak Trust & Custody', 'Institutional multi-sig escrow settlements in Singapore & London.', 'Request Access', 'https://example.com/silveroak', 'Executive Sponsor', 18450, 412, true),
('ad-infeed-home-1', 'in_feed_home', 'Accelerate Enterprise B2B Pipeline across APAC & EMEA', 'Vertex Market Access', 'Exclusive programmatic buyer-matching for Series A+ technology companies.', 'Schedule Briefing', 'https://example.com/vertex', 'Preferred Partner', 12380, 294, true),
('ad-sidebar-right-1', 'sidebar_right', 'Sovereign AI Compute Infrastructure', 'Kaveri Compute', 'Liquid-cooled enterprise clusters for distributed machine learning training.', 'Reserve Capacity', 'https://example.com/kaveri', 'Verified Partner', 8920, 185, true)
ON CONFLICT (id) DO NOTHING;
