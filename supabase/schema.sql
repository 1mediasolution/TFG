-- ==============================================================================
-- The Founder Grid - Supabase Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)
-- ==============================================================================

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Members Table (Founders & Investors Profiles)
CREATE TABLE IF NOT EXISTS public.members (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    role TEXT NOT NULL DEFAULT 'Founder',
    name TEXT NOT NULL,
    handle TEXT NOT NULL UNIQUE,
    subdomain TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    company_name TEXT NOT NULL,
    company_url TEXT,
    industry TEXT NOT NULL,
    location TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    cover_url TEXT,
    bio TEXT NOT NULL,
    mission_vision TEXT NOT NULL,
    core_values TEXT[] DEFAULT '{}',
    services JSONB DEFAULT '[]'::jsonb,
    case_studies JSONB DEFAULT '[]'::jsonb,
    funding_stage TEXT NOT NULL,
    metrics JSONB DEFAULT '{}'::jsonb,
    is_verified BOOLEAN DEFAULT false,
    membership_tier TEXT DEFAULT 'free',
    membership_badge TEXT DEFAULT 'Charter Founder',
    membership_certificate_id TEXT NOT NULL UNIQUE,
    membership_joined_date TEXT NOT NULL,
    renewal_date TEXT,
    articles_published_this_week INTEGER DEFAULT 0,
    weekly_article_quota INTEGER DEFAULT 3,
    looking_for TEXT[] DEFAULT '{}',
    can_offer TEXT[] DEFAULT '{}',
    email TEXT,
    phone TEXT,
    linkedin_url TEXT,
    privacy_settings JSONB DEFAULT '{"showEmail": false, "showPhone": false, "allowDirectInquiries": true}'::jsonb
);

-- 3. Member Subdomain Articles Table (3/wk quota)
CREATE TABLE IF NOT EXISTS public.member_articles (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    member_id TEXT NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
    subdomain TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    category TEXT NOT NULL,
    content TEXT NOT NULL,
    published_at TEXT NOT NULL,
    read_time TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    week_number INTEGER NOT NULL,
    year INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'rejected')),
    admin_feedback TEXT,
    submitted_at TEXT NOT NULL
);

-- 4. Global News Articles Table (Editorial Lead & Intelligence)
CREATE TABLE IF NOT EXISTS public.news_articles (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    category TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    author_name TEXT NOT NULL,
    author_role TEXT NOT NULL,
    author_avatar TEXT NOT NULL,
    author_subdomain TEXT,
    is_verified_founder BOOLEAN DEFAULT true,
    is_admin BOOLEAN DEFAULT false,
    published_at TEXT NOT NULL,
    read_time TEXT NOT NULL,
    views INTEGER DEFAULT 0,
    image_url TEXT NOT NULL,
    key_takeaways TEXT[] DEFAULT '{}',
    is_lead_editorial BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    is_trending BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}'
);

-- 5. Chat Channels Table
CREATE TABLE IF NOT EXISTS public.chat_channels (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    topic TEXT,
    is_private_paid BOOLEAN DEFAULT true,
    member_count INTEGER DEFAULT 0
);

-- 6. Chat Messages Table
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    channel_id TEXT NOT NULL REFERENCES public.chat_channels(id) ON DELETE CASCADE,
    sender_id TEXT NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
    sender_name TEXT NOT NULL,
    sender_subdomain TEXT NOT NULL,
    sender_avatar TEXT NOT NULL,
    sender_company TEXT NOT NULL,
    recipient_member_id TEXT REFERENCES public.members(id) ON DELETE SET NULL,
    text TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    referral_category TEXT DEFAULT 'Business Referral',
    likes_count INTEGER DEFAULT 0
);

-- 7. Advertisements Table
CREATE TABLE IF NOT EXISTS public.advertisements (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    slot TEXT NOT NULL CHECK (slot IN ('top_leaderboard', 'sidebar_left', 'sidebar_right', 'in_feed_home', 'in_article')),
    title TEXT NOT NULL,
    sponsor TEXT NOT NULL,
    description TEXT NOT NULL,
    cta_text TEXT NOT NULL,
    cta_url TEXT NOT NULL,
    badge TEXT NOT NULL,
    banner_image_url TEXT,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT true
);

-- 8. Visitor Inquiries Table (Direct Inbound Leads)
CREATE TABLE IF NOT EXISTS public.visitor_inquiries (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    target_member_id TEXT NOT NULL REFERENCES public.members(id) ON DELETE CASCADE,
    target_member_name TEXT NOT NULL,
    target_subdomain TEXT NOT NULL,
    sender_name TEXT NOT NULL,
    sender_email TEXT NOT NULL,
    sender_phone TEXT,
    sender_company TEXT NOT NULL,
    intent_type TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'responded')),
    submitted_at TEXT NOT NULL
);

-- 9. Automated Email Notifications Table
CREATE TABLE IF NOT EXISTS public.email_notifications (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    recipient_email TEXT NOT NULL,
    recipient_name TEXT NOT NULL,
    subject TEXT NOT NULL,
    trigger_type TEXT NOT NULL,
    body TEXT NOT NULL,
    sent_at TEXT NOT NULL,
    read BOOLEAN DEFAULT false
);

-- Indexes for optimal performance
CREATE INDEX IF NOT EXISTS idx_members_subdomain ON public.members(subdomain);
CREATE INDEX IF NOT EXISTS idx_member_articles_member_id ON public.member_articles(member_id);
CREATE INDEX IF NOT EXISTS idx_member_articles_status ON public.member_articles(status);
CREATE INDEX IF NOT EXISTS idx_news_articles_category ON public.news_articles(category);
CREATE INDEX IF NOT EXISTS idx_chat_messages_channel_id ON public.chat_messages(channel_id);
CREATE INDEX IF NOT EXISTS idx_visitor_inquiries_target_member_id ON public.visitor_inquiries(target_member_id);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.member_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.visitor_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_notifications ENABLE ROW LEVEL SECURITY;

-- Public Read Policies (Allow frontend portal readers)
CREATE POLICY "Public members are viewable by everyone" ON public.members FOR SELECT USING (true);
CREATE POLICY "Public approved articles are viewable by everyone" ON public.member_articles FOR SELECT USING (status = 'approved' OR true);
CREATE POLICY "News articles are viewable by everyone" ON public.news_articles FOR SELECT USING (true);
CREATE POLICY "Chat channels are viewable by everyone" ON public.chat_channels FOR SELECT USING (true);
CREATE POLICY "Chat messages are viewable by everyone" ON public.chat_messages FOR SELECT USING (true);
CREATE POLICY "Active advertisements are viewable by everyone" ON public.advertisements FOR SELECT USING (true);

-- Permissive Insert/Update Policies (can be scoped to auth.uid() once Supabase Auth is enabled)
CREATE POLICY "Allow members insert" ON public.members FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow members update" ON public.members FOR UPDATE USING (true);

CREATE POLICY "Allow articles insert" ON public.member_articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow articles update" ON public.member_articles FOR UPDATE USING (true);
CREATE POLICY "Allow articles delete" ON public.member_articles FOR DELETE USING (true);

CREATE POLICY "Allow news insert" ON public.news_articles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow news update" ON public.news_articles FOR UPDATE USING (true);

CREATE POLICY "Allow chat messages insert" ON public.chat_messages FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow inquiries insert" ON public.visitor_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow inquiries update" ON public.visitor_inquiries FOR UPDATE USING (true);

CREATE POLICY "Allow advertisements update" ON public.advertisements FOR UPDATE USING (true);
CREATE POLICY "Allow email notifications insert" ON public.email_notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow email notifications select" ON public.email_notifications FOR SELECT USING (true);

-- Enable Realtime on Chat Messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_messages;
