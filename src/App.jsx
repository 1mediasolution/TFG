import React, { useState, useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { CommunityProvider } from './context/CommunityContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes/AppRoutes';
import { MembershipModal } from './components/features/membership/MembershipModal';
import { CustomDomainModal } from './components/features/membership/CustomDomainModal';
import { AdminConsoleModal } from './components/features/admin/AdminConsoleModal';
import { INITIAL_MEMBERS, INITIAL_ARTICLE_REVIEWS, INITIAL_ADS } from './data/mockData';

function AppLayout() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => {
    return (localStorage.getItem('tfg_theme')) || 'light';
  });

  const [showMembershipModal, setShowMembershipModal] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [showAdminConsole, setShowAdminConsole] = useState(false);
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [ads, setAds] = useState(INITIAL_ADS);
  const [reviewArticles, setReviewArticles] = useState(INITIAL_ARTICLE_REVIEWS);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('theme-light', 'bg-[#FAF8F5]', 'text-[#121316]');
      document.body.classList.add('theme-dark', 'bg-[#0B0C0E]', 'text-zinc-100');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('theme-dark', 'bg-[#0B0C0E]', 'text-zinc-100');
      document.body.classList.add('theme-light', 'bg-[#FAF8F5]', 'text-[#121316]');
    }
    localStorage.setItem('tfg_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Determine if header should be hidden (for specific standalone fullscreen layouts if any)
  const isDashboardRoute = location.pathname.startsWith('/founder/') || location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Universal Sticky Header (only if not already nested in DashboardLayout to prevent duplication) */}
      {!isDashboardRoute && (
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenMembershipModal={() => setShowMembershipModal(true)}
          onOpenDomainModal={() => setShowDomainModal(true)}
          onOpenAdminConsole={() => setShowAdminConsole(true)}
          pendingReviewCount={reviewArticles.filter((a) => a.reviewStatus === 'pending').length}
        />
      )}

      {/* Main Routed Content */}
      <div className="flex-1">
        <AppRoutes />
      </div>

      {/* Universal Footer (only if not already nested in DashboardLayout) */}
      {!isDashboardRoute && <Footer />}

      {/* Global Modals */}
      {showMembershipModal && (
        <MembershipModal
          isOpen={showMembershipModal}
          onClose={() => setShowMembershipModal(false)}
          currentTier={INITIAL_MEMBERS[0].tier}
          onSelectTier={() => setShowMembershipModal(false)}
        />
      )}

      {showDomainModal && (
        <CustomDomainModal
          isOpen={showDomainModal}
          onClose={() => setShowDomainModal(false)}
          member={INITIAL_MEMBERS[0]}
          currentDomain="thefoundergrid.com"
          onSaveDomain={() => setShowDomainModal(false)}
        />
      )}

      {showAdminConsole && (
        <AdminConsoleModal
          isOpen={showAdminConsole}
          onClose={() => setShowAdminConsole(false)}
          pendingArticles={reviewArticles}
          members={members}
          ads={ads}
          onApproveArticle={(id) => {
            setReviewArticles((prev) =>
              prev.map((a) => (a.id === id ? { ...a, reviewStatus: 'approved' } : a))
            );
          }}
          onRejectArticle={(id, feedback) => {
            setReviewArticles((prev) =>
              prev.map((a) => (a.id === id ? { ...a, reviewStatus: 'rejected', reviewFeedback: feedback } : a))
            );
          }}
          onUpdateMemberTier={(id, tier) => {
            setMembers((prev) =>
              prev.map((m) => (m.id === id ? { ...m, tier } : m))
            );
          }}
          onToggleMemberVerification={(id) => {
            setMembers((prev) =>
              prev.map((m) => (m.id === id ? { ...m, verified: !m.verified } : m))
            );
          }}
          onToggleAdActive={() => {}}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <CommunityProvider>
            <AppLayout />
          </CommunityProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
