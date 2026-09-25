# The Founder Grid (the-founder-grid)

> **Where Business Meets Opportunity**
> Premium financial intelligence portal, verified founder network, custom publication subdomains, and investor deal-flow ecosystem.

---

## 🏛 Architecture & Project Structure

The project strictly follows the requested modular architecture:

```
the-founder-grid/
│
├── public/
│   ├── logo.png
│   ├── favicon.ico
│   └── images/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── logos/
│   │
│   ├── components/
│   │   ├── common/             # Button, Input, Modal, Loader, EmptyState
│   │   ├── layout/             # Navbar, Footer, Sidebar, DashboardLayout
│   │   ├── home/               # Hero, AdBanner, StockTicker, NewsSection, FeaturedFounders, FounderCard, MemberDirectory
│   │   ├── founder/            # FounderCard, FounderProfile, FounderHeader, FounderStory, CaseStudies, FounderArticles
│   │   ├── directory/          # DirectoryFilters, SearchBar, MemberCard, FilterDropdown
│   │   ├── community/          # CommunitySidebar, ChannelList, ChatWindow, Message, MemberPopup
│   │   ├── auth/               # LoginForm, RegisterForm, ForgotPassword, ResetPassword
│   │   └── admin/              # AdminSidebar, ArticleReview, MemberManagement, AdManager, VerificationManager
│   │
│   ├── pages/
│   │   ├── Home.jsx            # Main portal & news feed
│   │   ├── auth/               # Login, Register, ForgotPassword, ResetPassword
│   │   ├── founder/            # FounderDashboard, FounderProfile, MyPortfolio, MyArticles, CreateArticle, Inquiries
│   │   ├── directory/          # Directory, Founders, Investors
│   │   ├── community/          # Community, Announcements, BusinessNetworking, DealsPartnerships, Messages
│   │   ├── portfolio/          # Portfolio, PublicFounderProfile
│   │   └── admin/              # AdminDashboard, Articles, Members, Advertisements, Verification, Moderation
│   │
│   ├── context/
│   │   ├── AuthContext.jsx     # User authentication & session state
│   │   ├── UserContext.jsx     # Current active user profile, tier & settings
│   │   └── CommunityContext.jsx# Real-time channels, chat & networking
│   │
│   ├── services/
│   │   ├── api.js              # Base API client and fetch wrapper
│   │   ├── authService.js      # Authentication and credentials service
│   │   ├── founderService.js   # Founder profile & portfolio operations
│   │   ├── directoryService.js # Search and directory filtering operations
│   │   ├── articleService.js   # News and member article publishing
│   │   └── communityService.js # Chat channels and messaging operations
│   │
│   ├── hooks/
│   │   ├── useAuth.js          # Authentication hook
│   │   ├── useFetch.js         # Generic data fetching hook
│   │   └── useDebounce.js      # Search input debounce hook
│   │
│   ├── utils/
│   │   ├── constants.js        # App-wide constants, categories & tiers
│   │   ├── validators.js       # Form validators
│   │   └── formatters.js       # Currency, date, and text formatters
│   │
│   ├── routes/
│   │   ├── AppRoutes.jsx       # Central React Router configuration
│   │   ├── ProtectedRoute.jsx  # Member route guard
│   │   └── AdminRoute.jsx      # Admin route guard
│   │
│   ├── App.jsx                 # Application entry with Provider trees
│   ├── main.jsx                # DOM bootstrap
│   └── index.css               # Tailwind CSS & custom typography
│
├── .env
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## ✨ Core Features
- **Editorial & Market Intelligence**: Live stock ticker, breaking financial news, category filtering.
- **Custom Subdomains & AI Studio**: Executive members publish to their own branded subdomains (`name.thefoundergrid.com`).
- **Private Community & Deal Flow**: Dedicated channels for Announcements, Business Networking, Deals & Partnerships, and Direct Messaging.
- **Member Portfolios & Credential Packs**: Official member certificates, press kits, and investor one-pagers.
- **Admin Governance**: Full moderation console for article approvals, tier management, ad placement, and verification badges.
