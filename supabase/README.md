# The Founder Grid — Supabase Backend Architecture & Integration Guide

This application is built with a strictly separated, enterprise-grade modular architecture designed specifically for connecting to a **Supabase (PostgreSQL)** backend.

---

## 📁 Clean Folder Structure Overview

```text
├── supabase/
│   ├── schema.sql              # Complete PostgreSQL tables, foreign keys, and RLS policies
│   ├── seed.sql                # Initial seed data for members, channels, and advertisements
│   └── README.md               # Backend documentation & migration guide
│
├── src/
│   ├── types/                  # Strictly separated domain & database types
│   │   ├── common.ts           # Shared enums and market models
│   │   ├── member.ts           # FounderMember, CaseStudy, ServiceOffering, Portfolios
│   │   ├── article.ts          # NewsArticle, MemberArticle, ArticleReviewStatus
│   │   ├── chat.ts             # ChatMessage, ChatChannel
│   │   ├── ad.ts               # Advertisement, AdSlotId
│   │   ├── inquiry.ts          # VisitorInquiry
│   │   ├── notification.ts     # AutomatedEmailNotification
│   │   ├── supabase.ts         # Supabase PostgreSQL Database interface
│   │   └── index.ts            # Clean single entrypoint
│   │
│   ├── lib/
│   │   └── supabase/           # Supabase connection & client initialization
│   │       ├── client.ts       # Typed createClient, health ping, status detector
│   │       └── types.ts        # Database types
│   │
│   ├── services/
│   │   ├── supabase/           # Dedicated Supabase Service Layer (Repository Pattern)
│   │   │   ├── membersService.ts       # CRUD for profiles, metrics, portfolios
│   │   │   ├── articlesService.ts      # News articles & 3/week member quota review
│   │   │   ├── chatService.ts          # Real-time WebSocket discussion & channels
│   │   │   ├── adsService.ts           # Banner slots and click performance tracking
│   │   │   ├── inquiriesService.ts     # Inbound visitor leads capture
│   │   │   ├── notificationsService.ts # Automated email event log
│   │   │   └── index.ts
│   │   └── aiArticleService.ts # Server-side Gemini AI content generation
│   │
│   ├── hooks/
│   │   └── useSupabaseStatus.ts # Hook for connection health, latency, & project info
│   │
│   ├── components/             # Organized into feature domains & layouts
│   │   ├── common/             # Shared elements (FounderGridLogo)
│   │   ├── layout/             # Navbar, MarketTickerBar, AdvertisementBanner
│   │   └── features/
│   │       ├── news/           # NewsPortal, ArticleDetailModal
│   │       ├── community/      # CommunityDirectory, CustomPortfolioModal, MemberCredentialPackModal
│   │       ├── chat/           # DiscussionChat
│   │       ├── studio/         # SubdomainPublisher, SubdomainViewModal
│   │       ├── membership/     # MembershipModal, CustomDomainModal, InquiryFormModal
│   │       └── admin/          # AdminConsoleModal, SupabaseStatusCard
│   │
│   ├── data/
│   │   └── mockData.ts         # Seed data & fallback state
│   ├── server/                 # Fullstack Express API handlers
│   ├── App.tsx                 # Main application controller
│   └── main.tsx                # Client entrypoint
```

---

## 🚀 How to Connect to Supabase

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a free project.
2. Note your **Project URL** and **anon public key** from `Settings` -> `API`.

### Step 2: Run Database Migrations
1. Open the **SQL Editor** in your Supabase dashboard (`https://supabase.com/dashboard/project/_/sql`).
2. Copy and paste the contents of `supabase/schema.sql` and click **Run**.
3. (Optional) Run `supabase/seed.sql` to populate sample founder members, publications, and discussion channels.

### Step 3: Configure Environment Variables
Add your credentials to your `.env` file:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your_anon_key
```

Once configured, the applet detects your Supabase connection automatically and switches to live PostgreSQL queries!
