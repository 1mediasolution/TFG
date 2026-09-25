import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MarketTickerBar } from './components/MarketTickerBar';
import { AdvertisementBanner } from './components/AdvertisementBanner';
import { NewsPortal } from './components/NewsPortal';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { CommunityDirectory } from './components/CommunityDirectory';
import { CustomPortfolioModal } from './components/CustomPortfolioModal';
import { SubdomainPublisher } from './components/SubdomainPublisher';
import { SubdomainViewModal } from './components/SubdomainViewModal';
import { DiscussionChat } from './components/DiscussionChat';
import { MembershipModal } from './components/MembershipModal';
import { CustomDomainModal } from './components/CustomDomainModal';
import { MemberCredentialPackModal } from './components/MemberCredentialPackModal';
import { AdminConsoleModal } from './components/AdminConsoleModal';
import { InquiryFormModal } from './components/InquiryFormModal';
import { FounderGridLogo } from './components/FounderGridLogo';

import {
  INITIAL_MEMBERS,
  NEWS_ARTICLES,
  CHAT_CHANNELS,
  INITIAL_CHAT_MESSAGES,
  MARKET_TICKERS,
  INITIAL_ADS,
  INITIAL_INQUIRIES,
  INITIAL_EMAIL_NOTIFICATIONS
} from './data/mockData';
import {
  FounderMember,
  NewsArticle,
  ChatMessage,
  MemberArticle,
  Advertisement,
  VisitorInquiry,
  AutomatedEmailNotification,
  ArticleCategory,
  EmailTriggerType,
  AdSlotId
} from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'news' | 'community' | 'chat' | 'studio'>('news');
  const [isPaidMember, setIsPaidMember] = useState<boolean>(true);
  const [customDomain, setCustomDomain] = useState<string>('thefoundergrid.com');

  // Theme mode: 'light' (The Founder Grid Editorial Light) or 'dark' (Executive Obsidian)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('tfg_theme') as 'dark' | 'light') || 'light';
  });

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('tfg_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Core Data
  const [members, setMembers] = useState<FounderMember[]>(INITIAL_MEMBERS);
  const [currentUser, setCurrentUser] = useState<FounderMember>(INITIAL_MEMBERS[0]); // Default: Sarah Chen
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(NEWS_ARTICLES);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [currentChannelId, setCurrentChannelId] = useState<string>('chan-announcements');
  const [ads, setAds] = useState<Advertisement[]>(INITIAL_ADS);
  const [inquiries, setInquiries] = useState<VisitorInquiry[]>(INITIAL_INQUIRIES);
  const [emailNotifications, setEmailNotifications] = useState<AutomatedEmailNotification[]>(INITIAL_EMAIL_NOTIFICATIONS);

  // Directory Filter State (from Navbar "Members" dropdown)
  const [directoryRoleFilter, setDirectoryRoleFilter] = useState<string>('All');
  const [directoryIndustryFilter, setDirectoryIndustryFilter] = useState<string>('All');

  // Modals & Overlays
  const [activeArticleDetail, setActiveArticleDetail] = useState<NewsArticle | null>(null);
  const [activePortfolioMember, setActivePortfolioMember] = useState<FounderMember | null>(null);
  const [activeSubdomain, setActiveSubdomain] = useState<string | null>(null);
  const [activeInquiryMember, setActiveInquiryMember] = useState<FounderMember | null>(null);
  const [activeCredentialMember, setActiveCredentialMember] = useState<FounderMember | null>(null);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState<boolean>(false);
  const [isDomainModalOpen, setIsDomainModalOpen] = useState<boolean>(false);
  const [isAdminConsoleOpen, setIsAdminConsoleOpen] = useState<boolean>(false);

  // Filter Ad slots
  const topLeaderboardAd = ads.find((a) => a.slot === 'top_leaderboard' && a.active);
  const inFeedHomeAd = ads.find((a) => a.slot === 'in_feed_home' && a.active);
  const sidebarRightAd = ads.find((a) => a.slot === 'sidebar_right' && a.active);

  // Calculate pending review articles count across all members
  const pendingReviewCount = members.reduce(
    (acc, m) => acc + m.articles.filter((a) => a.status === 'pending_review').length,
    0
  );

  // Ad click tracking
  const handleAdClick = (adId: string) => {
    setAds((prev) =>
      prev.map((ad) => (ad.id === adId ? { ...ad, clicks: ad.clicks + 1 } : ad))
    );
  };

  // Toggle user state between Paid Founder and Guest
  const handleToggleMembershipState = () => {
    setIsPaidMember((prev) => !prev);
  };

  // 1. Author Workspace: Submit draft article for Admin Review (Hard cap 3/week)
  const handleSubmitDraftForReview = (articleDraft: {
    title: string;
    subtitle: string;
    category: ArticleCategory;
    content: string;
    readTime: string;
    tags: string[];
  }) => {
    if (currentUser.articlesPublishedThisWeek >= 3) {
      alert('You have reached the weekly publishing quota of 3 articles per calendar week.');
      return;
    }

    const createdArticle: MemberArticle = {
      ...articleDraft,
      id: `art-${Date.now()}`,
      memberId: currentUser.id,
      subdomain: currentUser.subdomain,
      status: 'pending_review',
      submittedAt: 'Just now',
      publishedAt: 'Pending Review',
      views: 0,
      weekNumber: 38,
      year: 2026
    };

    const updatedUser: FounderMember = {
      ...currentUser,
      articles: [createdArticle, ...currentUser.articles]
    };

    setCurrentUser(updatedUser);
    setMembers((prev) => prev.map((m) => (m.id === updatedUser.id ? updatedUser : m)));

    // Automated Trigger: Article Submitted
    const newNotif: AutomatedEmailNotification = {
      id: `email-${Date.now()}`,
      recipientEmail: currentUser.email || 'contact@thefoundergrid.com',
      recipientName: currentUser.name,
      subject: `Draft Submitted for Editorial Review: "${createdArticle.title}"`,
      triggerType: 'article_submitted',
      body: `Your draft has been submitted to The Founder Grid Editorial Board. Articles require 1-click Admin Approval before syndication live to ${currentUser.subdomain}.${customDomain}.`,
      sentAt: 'Just now',
      read: false
    };
    setEmailNotifications((prev) => [newNotif, ...prev]);
  };

  // Delete an article
  const handleDeleteArticle = (articleId: string) => {
    const updatedUser: FounderMember = {
      ...currentUser,
      articles: currentUser.articles.filter((a) => a.id !== articleId)
    };

    setCurrentUser(updatedUser);
    setMembers((prev) => prev.map((m) => (m.id === updatedUser.id ? updatedUser : m)));
  };

  // Update subdomain handle
  const handleUpdateSubdomainName = (newSubdomain: string) => {
    const updatedUser: FounderMember = {
      ...currentUser,
      subdomain: newSubdomain
    };

    setCurrentUser(updatedUser);
    setMembers((prev) => prev.map((m) => (m.id === updatedUser.id ? updatedUser : m)));
  };

  // 2. Admin Console: Approve Article (1-Click)
  const handleApproveArticle = (memberId: string, articleId: string) => {
    let targetAuthor: FounderMember | null = null;
    let approvedTitle = '';

    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          targetAuthor = m;
          const updatedArticles = m.articles.map((art) => {
            if (art.id === articleId) {
              approvedTitle = art.title;
              return {
                ...art,
                status: 'approved' as const,
                publishedAt: 'Today'
              };
            }
            return art;
          });

          const newWeeklyCount = Math.min(3, m.articlesPublishedThisWeek + 1);
          const updated = {
            ...m,
            articlesPublishedThisWeek: newWeeklyCount,
            articles: updatedArticles
          };

          if (currentUser.id === m.id) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return m;
      })
    );

    // Automated Trigger: Article Approved
    if (targetAuthor) {
      const auth = targetAuthor as FounderMember;
      const newNotif: AutomatedEmailNotification = {
        id: `email-${Date.now()}`,
        recipientEmail: auth.email || 'contact@thefoundergrid.com',
        recipientName: auth.name,
        subject: `✅ Article Approved & Live: "${approvedTitle}"`,
        triggerType: 'article_approved',
        body: `Congratulations! Your dispatch "${approvedTitle}" has been approved by the Editorial Board and is now live on ${auth.subdomain}.${customDomain} and the global news directory.`,
        sentAt: 'Just now',
        read: false
      };

      // Quota Alert if quota reached 3/3
      const quotaNotif: AutomatedEmailNotification | null =
        auth.articlesPublishedThisWeek + 1 >= 3
          ? {
              id: `email-quota-${Date.now()}`,
              recipientEmail: auth.email || 'contact@thefoundergrid.com',
              recipientName: auth.name,
              subject: '⚠️ Weekly Publishing Quota Cap Reached (3 of 3)',
              triggerType: 'quota_reached',
              body: `You have reached your 3 articles/week quota. Your publishing allowance will automatically reset next Monday at 00:00 UTC.`,
              sentAt: 'Just now',
              read: false
            }
          : null;

      setEmailNotifications((prev) => [
        ...(quotaNotif ? [quotaNotif] : []),
        newNotif,
        ...prev
      ]);
    }
  };

  // 3. Admin Console: Reject Article with Remarks
  const handleRejectArticle = (memberId: string, articleId: string, remarks: string) => {
    let targetAuthor: FounderMember | null = null;
    let rejectedTitle = '';

    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === memberId) {
          targetAuthor = m;
          const updatedArticles = m.articles.map((art) => {
            if (art.id === articleId) {
              rejectedTitle = art.title;
              return {
                ...art,
                status: 'rejected' as const,
                adminFeedback: remarks
              };
            }
            return art;
          });
          const updated = { ...m, articles: updatedArticles };
          if (currentUser.id === m.id) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return m;
      })
    );

    // Automated Trigger: Article Rejected
    if (targetAuthor) {
      const auth = targetAuthor as FounderMember;
      const newNotif: AutomatedEmailNotification = {
        id: `email-${Date.now()}`,
        recipientEmail: auth.email || 'contact@thefoundergrid.com',
        recipientName: auth.name,
        subject: `❌ Revision Requested: "${rejectedTitle}"`,
        triggerType: 'article_rejected',
        body: `Editorial Feedback from The Founder Grid Review Board: "${remarks}". Please revise your draft in the Author Workspace and resubmit.`,
        sentAt: 'Just now',
        read: false
      };
      setEmailNotifications((prev) => [newNotif, ...prev]);
    }
  };

  // 4. Admin Console: Publish Global News & Editorial
  const handlePublishAdminNews = (newArticleData: Omit<NewsArticle, 'id' | 'views'>) => {
    const createdNews: NewsArticle = {
      ...newArticleData,
      id: `news-${Date.now()}`,
      views: 120
    };

    setNewsArticles((prev) => [createdNews, ...prev]);
  };

  // 5. Admin Console: Update Ad Spaces
  const handleUpdateAd = (updatedAd: Advertisement) => {
    setAds((prev) => prev.map((a) => (a.id === updatedAd.id ? updatedAd : a)));
  };

  // 6. Admin Console: Simulate Monday 00:00 Quota Reset
  const handleResetWeeklyQuotas = () => {
    setMembers((prev) =>
      prev.map((m) => ({
        ...m,
        articlesPublishedThisWeek: 0
      }))
    );
    setCurrentUser((prev) => ({
      ...prev,
      articlesPublishedThisWeek: 0
    }));

    // Broadcast automated email notifications to all members
    const resetNotifs: AutomatedEmailNotification[] = members.slice(0, 3).map((m) => ({
      id: `email-reset-${m.id}-${Date.now()}`,
      recipientEmail: m.email || 'contact@thefoundergrid.com',
      recipientName: m.name,
      subject: '🔄 Weekly Publishing Quota Reset (Monday 00:00 UTC)',
      triggerType: 'quota_reset',
      body: `Happy Monday! Your publishing quota on The Founder Grid has been reset to 0/3. You may now submit up to 3 thought-leadership articles this week.`,
      sentAt: 'Monday 00:00 UTC',
      read: false
    }));

    setEmailNotifications((prev) => [...resetNotifs, ...prev]);
    alert('Weekly publishing quotas successfully reset to 0/3 for all members. Monday 00:00 automated broadcast notifications dispatched!');
  };

  // 7. Automated Email Trigger Simulator
  const handleTriggerSimulatedEmail = (triggerType: EmailTriggerType, member: FounderMember) => {
    let subject = '';
    let body = '';

    switch (triggerType) {
      case 'article_approved':
        subject = '✅ Article Approved & Live on Subdomain';
        body = `Your latest article has been approved by the Editorial Board and is now accessible at https://${member.subdomain}.${customDomain}.`;
        break;
      case 'article_rejected':
        subject = '❌ Editorial Revision Required';
        body = `The review board has returned your submission with notes: "Please include verified unit economic metrics and cite quarterly EBITDA growth."`;
        break;
      case 'quota_reached':
        subject = '⚠️ Weekly Quota Cap Reached (3/3)';
        body = `You have submitted your maximum allocation of 3 articles for this calendar week. Quotas reset Monday at 00:00 UTC.`;
        break;
      case 'quota_reset':
        subject = '🔄 Weekly Quota Reset: 3 Submissions Available';
        body = `Your weekly publishing allowance has been reset. Feature up to 3 articles this week on ${member.subdomain}.${customDomain}.`;
        break;
      case 'renewal_15_days':
        subject = '⏳ Annual Membership Renewal in 15 Days';
        body = `Your Charter Founder syndicate subscription renews on October 5, 2026. Ensure your billing method is up to date to maintain active subdomain DNS routing.`;
        break;
      case 'renewal_3_days':
        subject = '🚨 Urgent: 3 Days Remaining Until Membership Renewal';
        body = `Action required: Your Founder Grid verified membership and personal subdomain will renew in 72 hours.`;
        break;
      case 'inbound_lead':
        subject = `🔔 New Inbound Lead via ${member.subdomain}.${customDomain}`;
        body = `A high-intent commercial enterprise inquiry was just submitted through your subdomain portfolio. Check your admin audit log.`;
        break;
      default:
        subject = 'Notification from The Founder Grid';
        body = 'Automated lifecycle event triggered.';
    }

    const newNotif: AutomatedEmailNotification = {
      id: `email-sim-${Date.now()}`,
      recipientEmail: member.email || 'contact@thefoundergrid.com',
      recipientName: member.name,
      subject,
      triggerType,
      body,
      sentAt: 'Just now',
      read: false
    };

    setEmailNotifications((prev) => [newNotif, ...prev]);
  };

  // 8. Inbound Visitor Inquiry Submission (from subdomains / portfolios)
  const handleSubmitInquiry = (
    inquiryData: Omit<VisitorInquiry, 'id' | 'submittedAt' | 'status'>
  ) => {
    const createdInquiry: VisitorInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      submittedAt: 'Just now',
      status: 'new'
    };

    setInquiries((prev) => [createdInquiry, ...prev]);

    // Dispatch automated inbound lead alert
    const newNotif: AutomatedEmailNotification = {
      id: `email-lead-${Date.now()}`,
      recipientEmail: currentUser.email || 'contact@thefoundergrid.com',
      recipientName: inquiryData.targetMemberName,
      subject: `🔔 Inbound Commercial Lead from ${inquiryData.senderName} (${inquiryData.senderCompany})`,
      triggerType: 'inbound_lead',
      body: `${inquiryData.senderName} has submitted an inquiry regarding "${inquiryData.intentType}". Message: "${inquiryData.message}". Direct reply email: ${inquiryData.senderEmail}`,
      sentAt: 'Just now',
      read: false
    };
    setEmailNotifications((prev) => [newNotif, ...prev]);
  };

  const handleUpdateInquiryStatus = (inquiryId: string, status: VisitorInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === inquiryId ? { ...inq, status } : inq))
    );
  };

  const handleToggleMemberVerification = (memberId: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, isVerified: !m.isVerified } : m))
    );
  };

  // Send a message in discussion chat
  const handleSendMessage = (
    text: string,
    category?: ChatMessage['referralCategory'],
    recipientMemberId?: string
  ) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      channelId: currentChannelId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderSubdomain: currentUser.subdomain,
      senderAvatar: currentUser.avatarUrl,
      senderCompany: currentUser.companyName,
      recipientMemberId,
      text,
      content: text,
      timestamp: 'Just now',
      referralCategory: category || 'Business Referral',
      likesCount: 0
    };

    setChatMessages((prev) => [...prev, newMsg]);
  };

  // Member Registration / Activation
  const handleActivateMembership = (details: {
    fullName: string;
    companyName: string;
    subdomain: string;
    industry: string;
    role: 'Founder' | 'Investor';
  }) => {
    const newMember: FounderMember = {
      id: `member-${Date.now()}`,
      role: details.role,
      name: details.fullName,
      handle: details.subdomain,
      subdomain: details.subdomain,
      title: details.role === 'Founder' ? 'Founder & CEO' : 'Managing Partner',
      companyName: details.companyName,
      industry: details.industry,
      location: 'Bengaluru & San Francisco',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      bio: `Executive in ${details.industry}. Building scalable commercial operations and exploring strategic syndications.`,
      missionVision: `To build category-defining infrastructure in ${details.industry} with radical focus on unit economics and client trust.`,
      coreValues: ['Execution Velocity', 'Deterministic Engineering', 'Strategic Synergies', 'Integrity'],
      services: [
        { title: `${details.industry} Solutions`, description: 'Comprehensive enterprise architecture and workflow scaling.' },
        { title: 'Strategic Advisory', description: 'Cross-border expansion and capital structure planning.' }
      ],
      caseStudies: [
        {
          id: `cs-${Date.now()}-1`,
          title: 'Initial Enterprise Deployment',
          client: 'Tier-1 Partner',
          outcome: 'Successful operational scale with zero disruption.',
          metric: '3.4x efficiency multiplier',
          year: '2026'
        }
      ],
      articles: [],
      articlesPublishedThisWeek: 0,
      isVerified: true,
      membershipTier: 'founder_pro',
      membershipBadge: 'Charter Founder',
      membershipCertificateId: `TFG-CERT-2026-${Math.floor(100 + Math.random() * 900)}`,
      membershipJoinedDate: 'September 2026',
      renewalDate: 'September 2027',
      metrics: {
        revenueOrAum: '$1.5M ARR',
        fundingRaised: 'Bootstrapped / Seed',
        teamSize: '12 Specialists'
      },
      lookingFor: ['Clients', 'Capital', 'Partners'],
      canOffer: ['Software', 'Services', 'Mentorship'],
      fundingStage: 'Seed / Early Growth',
      email: `${details.subdomain}@${details.companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.example.com`,
      phone: '+91 98200 12345',
      linkedinUrl: 'https://linkedin.com',
      privacy: {
        showEmail: false,
        showPhone: false,
        allowDirectInquiries: true
      }
    };

    setMembers((prev) => [newMember, ...prev]);
    setCurrentUser(newMember);
    setIsPaidMember(true);

    // Trigger welcome automated notification
    const welcomeNotif: AutomatedEmailNotification = {
      id: `email-welcome-${Date.now()}`,
      recipientEmail: newMember.email || 'contact@thefoundergrid.com',
      recipientName: newMember.name,
      subject: `🎉 Welcome to The Founder Grid! Subdomain Provisioned: ${newMember.subdomain}.${customDomain}`,
      triggerType: 'article_approved',
      body: `Your executive subdomain https://${newMember.subdomain}.${customDomain} has been successfully auto-provisioned with verified SSL certificates. You have 3 articles/week publishing rights and full community roundtable access.`,
      sentAt: 'Just now',
      read: false
    };
    setEmailNotifications((prev) => [welcomeNotif, ...prev]);

    // Open their live subdomain view immediately
    setActiveSubdomain(newMember.subdomain);
  };

  const handleFilterDirectoryFromNavbar = (role: string, industry: string) => {
    setDirectoryRoleFilter(role);
    setDirectoryIndustryFilter(industry);
    setCurrentTab('community');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-amber-500 selection:text-neutral-950 flex flex-col font-sans">
      {/* ========================================================= */}
      {/* 1. TOP LEADERBOARD AD SLOT (Above Main Header)             */}
      {/* ========================================================= */}
      <AdvertisementBanner
        ad={topLeaderboardAd}
        slot="top_leaderboard"
        onAdClick={handleAdClick}
        onOpenAdminAdConfig={() => setIsAdminConsoleOpen(true)}
      />

      {/* ========================================================= */}
      {/* 2. MAIN HEADER & INDIAN STOCK MARKET LIVE TICKER           */}
      {/* ========================================================= */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentUser={currentUser}
        isPaidMember={isPaidMember}
        onToggleMembershipState={handleToggleMembershipState}
        onOpenMembershipModal={() => setIsMembershipModalOpen(true)}
        onOpenDomainModal={() => setIsDomainModalOpen(true)}
        onOpenPortfolio={(member) => setActivePortfolioMember(member)}
        onOpenCredentialPack={(member) => setActiveCredentialMember(member)}
        onOpenAdminConsole={() => setIsAdminConsoleOpen(true)}
        pendingReviewCount={pendingReviewCount}
        onFilterDirectory={handleFilterDirectoryFromNavbar}
        customDomain={customDomain}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <MarketTickerBar tickers={MARKET_TICKERS} />

      {/* ========================================================= */}
      {/* PRIMARY MAIN VIEWS (News / Directory / Chat / Studio)     */}
      {/* ========================================================= */}
      <main className="flex-1">
        {/* HOMEPAGE / NEWS TAB */}
        {currentTab === 'news' && (
          <NewsPortal
            articles={newsArticles}
            members={members}
            onSelectArticle={(article) => setActiveArticleDetail(article)}
            onOpenSubdomain={(subdomain) => setActiveSubdomain(subdomain)}
            onOpenPortfolio={(member) => setActivePortfolioMember(member)}
            onOpenInquiryModal={(member) => setActiveInquiryMember(member)}
            onOpenMembershipModal={() => setIsMembershipModalOpen(true)}
            onOpenCredentialPack={(member) => setActiveCredentialMember(member)}
            onNavigateToDirectory={() => setCurrentTab('community')}
            onPublishAdminNews={handlePublishAdminNews}
            inFeedAd={inFeedHomeAd}
            customDomain={customDomain}
          />
        )}

        {/* 4. DEDICATED DIRECTORY & MATCHMAKING TAB */}
        {currentTab === 'community' && (
          <CommunityDirectory
            members={members}
            onOpenPortfolio={(member) => setActivePortfolioMember(member)}
            onOpenSubdomain={(subdomain) => setActiveSubdomain(subdomain)}
            onOpenInquiryModal={(member) => setActiveInquiryMember(member)}
            onOpenMembershipModal={() => setIsMembershipModalOpen(true)}
            onOpenCredentialPack={(member) => setActiveCredentialMember(member)}
            isPaidMember={isPaidMember}
            currentUser={currentUser}
            onNavigateToChat={() => setCurrentTab('chat')}
            sidebarAd={sidebarRightAd}
            customDomain={customDomain}
            initialRoleFilter={directoryRoleFilter}
            initialIndustryFilter={directoryIndustryFilter}
          />
        )}

        {/* 6. GATED COMMUNITY DASHBOARD & REAL-TIME CHAT */}
        {currentTab === 'chat' && (
          <DiscussionChat
            channels={CHAT_CHANNELS}
            messages={chatMessages}
            currentChannelId={currentChannelId}
            onSelectChannel={setCurrentChannelId}
            onSendMessage={handleSendMessage}
            currentUser={currentUser}
            isPaidMember={isPaidMember}
            onOpenMembershipModal={() => setIsMembershipModalOpen(true)}
            onOpenPortfolio={(member) => setActivePortfolioMember(member)}
            onOpenSubdomain={(subdomain) => setActiveSubdomain(subdomain)}
            onOpenInquiryModal={(member) => setActiveInquiryMember(member)}
            allMembers={members}
            customDomain={customDomain}
          />
        )}

        {/* 5. AUTHOR WORKSPACE & PUBLISHING RULES (3/wk Quota) */}
        {currentTab === 'studio' && (
          <SubdomainPublisher
            currentUser={currentUser}
            isPaidMember={isPaidMember}
            onOpenMembershipModal={() => setIsMembershipModalOpen(true)}
            onOpenSubdomain={(subdomain) => setActiveSubdomain(subdomain)}
            onSubmitDraftForReview={handleSubmitDraftForReview}
            onDeleteArticle={handleDeleteArticle}
            onUpdateSubdomainName={handleUpdateSubdomainName}
            onOpenAdminConsole={() => setIsAdminConsoleOpen(true)}
            customDomain={customDomain}
          />
        )}
      </main>

      {/* ========================================================= */}
      {/* MODALS & WORKFLOW DRAWERS                                 */}
      {/* ========================================================= */}

      {/* Article Full Reader Modal */}
      {activeArticleDetail && (
        <ArticleDetailModal
          article={activeArticleDetail}
          onClose={() => setActiveArticleDetail(null)}
          onOpenSubdomain={(subdomain) => {
            setActiveArticleDetail(null);
            setActiveSubdomain(subdomain);
          }}
          members={members}
          customDomain={customDomain}
        />
      )}

      {/* Executive Portfolio Modal */}
      {activePortfolioMember && (
        <CustomPortfolioModal
          member={activePortfolioMember}
          onClose={() => setActivePortfolioMember(null)}
          onOpenSubdomain={(subdomain) => {
            setActivePortfolioMember(null);
            setActiveSubdomain(subdomain);
          }}
          onOpenInquiryModal={(m) => {
            setActivePortfolioMember(null);
            setActiveInquiryMember(m);
          }}
          onOpenCredentialPack={(m) => {
            setActivePortfolioMember(null);
            setActiveCredentialMember(m);
          }}
          isCurrentUser={activePortfolioMember.id === currentUser.id}
          onUpdateMember={(updated) => {
            setCurrentUser(updated);
            setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
          }}
          customDomain={customDomain}
        />
      )}

      {/* Standalone Subdomain Site View (founder.thefoundergrid.com) */}
      {activeSubdomain && (
        <SubdomainViewModal
          subdomain={activeSubdomain}
          members={members}
          onClose={() => setActiveSubdomain(null)}
          onOpenPortfolio={(member) => {
            setActiveSubdomain(null);
            setActivePortfolioMember(member);
          }}
          onOpenInquiryModal={(member) => {
            setActiveSubdomain(null);
            setActiveInquiryMember(member);
          }}
          customDomain={customDomain}
        />
      )}

      {/* Direct Inbound Inquiry Form Modal */}
      {activeInquiryMember && (
        <InquiryFormModal
          isOpen={!!activeInquiryMember}
          onClose={() => setActiveInquiryMember(null)}
          targetMember={activeInquiryMember}
          onSubmitInquiry={handleSubmitInquiry}
          customDomain={customDomain}
        />
      )}

      {/* Member Assets & Credential Pack (A4 PDF, Certificate, Badge, Letter) */}
      {activeCredentialMember && (
        <MemberCredentialPackModal
          isOpen={!!activeCredentialMember}
          onClose={() => setActiveCredentialMember(null)}
          member={activeCredentialMember}
          customDomain={customDomain}
        />
      )}

      {/* Membership Onboarding Modal with Real-time Handle Check */}
      <MembershipModal
        isOpen={isMembershipModalOpen}
        onClose={() => setIsMembershipModalOpen(false)}
        existingMembers={members}
        onActivateMembership={handleActivateMembership}
        customDomain={customDomain}
      />

      {/* Custom Domain Settings Modal */}
      <CustomDomainModal
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
        currentDomain={customDomain}
        onSaveDomain={setCustomDomain}
      />

      {/* Admin Console & Automation Engine */}
      <AdminConsoleModal
        isOpen={isAdminConsoleOpen}
        onClose={() => setIsAdminConsoleOpen(false)}
        members={members}
        newsArticles={newsArticles}
        ads={ads}
        inquiries={inquiries}
        emailNotifications={emailNotifications}
        onApproveArticle={handleApproveArticle}
        onRejectArticle={handleRejectArticle}
        onPublishAdminNews={handlePublishAdminNews}
        onUpdateAd={handleUpdateAd}
        onResetWeeklyQuotas={handleResetWeeklyQuotas}
        onTriggerSimulatedEmail={handleTriggerSimulatedEmail}
        onUpdateInquiryStatus={handleUpdateInquiryStatus}
        onToggleMemberVerification={handleToggleMemberVerification}
        customDomain={customDomain}
      />

      {/* Global Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <FounderGridLogo variant="full" size="sm" theme={theme} showTagline={true} />
            <div className="hidden sm:block h-6 w-px bg-neutral-800" />
            <div className="flex items-center space-x-2 text-[11px] text-neutral-500 font-mono">
              <span>Est. 2024</span>
              <span>•</span>
              <span>https://{customDomain}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-neutral-400">
            <button
              onClick={() => setIsAdminConsoleOpen(true)}
              className="text-amber-400 hover:text-amber-300 underline font-semibold transition-colors"
            >
              Open Admin Console & Automations
            </button>
            <span>•</span>
            <button
              onClick={() => setIsMembershipModalOpen(true)}
              className="hover:text-neutral-200 transition-colors"
            >
              Membership & Subdomains
            </button>
            <span>•</span>
            <button
              onClick={() => setIsDomainModalOpen(true)}
              className="hover:text-neutral-200 transition-colors"
            >
              Domain Settings
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
