import React, { useState, useRef, useEffect } from 'react';
import {
  Newspaper,
  Users,
  MessageSquare,
  Globe,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  Crown,
  Server,
  ChevronDown,
  Briefcase,
  Layers,
  Award,
  Shield,
  Send,
  Sun,
  Moon
} from 'lucide-react';
import { FounderMember } from '../types';
import { FounderGridLogo } from './FounderGridLogo';

interface NavbarProps {
  currentTab: 'news' | 'community' | 'chat' | 'studio';
  onSelectTab: (tab: 'news' | 'community' | 'chat' | 'studio') => void;
  currentUser: FounderMember;
  isPaidMember: boolean;
  onToggleMembershipState: () => void;
  onOpenMembershipModal: () => void;
  onOpenDomainModal: () => void;
  onOpenPortfolio: (member: FounderMember) => void;
  onOpenCredentialPack: (member: FounderMember) => void;
  onOpenAdminConsole: () => void;
  pendingReviewCount?: number;
  onFilterDirectory?: (role: string, industry: string) => void;
  customDomain?: string;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  currentUser,
  isPaidMember,
  onToggleMembershipState,
  onOpenMembershipModal,
  onOpenDomainModal,
  onOpenPortfolio,
  onOpenCredentialPack,
  onOpenAdminConsole,
  pendingReviewCount = 0,
  onFilterDirectory,
  customDomain = 'thefoundergrid.com',
  theme = 'dark',
  onToggleTheme
}) => {
  const [isMembersDropdownOpen, setIsMembersDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsMembersDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectMemberFilter = (role: string, industry: string = 'All') => {
    setIsMembersDropdownOpen(false);
    if (onFilterDirectory) {
      onFilterDirectory(role, industry);
    }
    onSelectTab('community');
  };

  return (
    <header id="main-header" className="sticky top-8 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
          {/* Logo & Masthead */}
          <div className="flex items-center shrink-0 min-w-0">
            <button
              id="brand-logo-button"
              onClick={() => onSelectTab('news')}
              className="group focus:outline-none flex items-center shrink-0 transition-transform hover:opacity-95"
              aria-label="The Founder Grid - Home"
            >
              <FounderGridLogo variant="full" size="md" theme={theme} showTagline={true} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav id="primary-navigation" className="hidden lg:flex items-center space-x-1 shrink-0">
            {/* News Portal */}
            <button
              id="nav-news-tab"
              onClick={() => onSelectTab('news')}
              className={`flex items-center space-x-1.5 px-2.5 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                currentTab === 'news'
                  ? 'bg-neutral-800 text-amber-400 border border-neutral-700 shadow-inner'
                  : 'text-neutral-300 hover:text-neutral-100 hover:bg-neutral-900'
              }`}
            >
              <Newspaper className="w-4 h-4 shrink-0" />
              <span><span className="hidden xl:inline">Editorial </span>News</span>
            </button>

            {/* "Members" Interactive Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="nav-members-dropdown"
                onClick={() => setIsMembersDropdownOpen(!isMembersDropdownOpen)}
                className={`flex items-center space-x-1.5 px-2.5 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                  isMembersDropdownOpen
                    ? 'bg-neutral-800 text-amber-400 border border-neutral-700'
                    : 'text-neutral-300 hover:text-neutral-100 hover:bg-neutral-900'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>Members</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMembersDropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {isMembersDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl p-3 space-y-3 z-50 animate-in fade-in-50">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold px-2 py-1">
                      Filter by Role
                    </div>
                    <div className="space-y-0.5">
                      <button
                        onClick={() => handleSelectMemberFilter('Founder')}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-neutral-300 hover:bg-neutral-900 hover:text-amber-400 transition-colors flex items-center justify-between"
                      >
                        <span>Founders & CEOs</span>
                        <span className="text-[10px] text-neutral-500 font-mono">Operators</span>
                      </button>
                      <button
                        onClick={() => handleSelectMemberFilter('Investor')}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-neutral-300 hover:bg-neutral-900 hover:text-amber-400 transition-colors flex items-center justify-between"
                      >
                        <span>Venture Capital & Investors</span>
                        <span className="text-[10px] text-neutral-500 font-mono">Capital</span>
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-neutral-800 pt-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold px-2 py-1">
                      Filter by Industry
                    </div>
                    <div className="space-y-0.5">
                      {['Enterprise SaaS', 'Fintech', 'Private Equity', 'Cloud Infrastructure'].map((ind) => (
                        <button
                          key={ind}
                          onClick={() => handleSelectMemberFilter('All', ind)}
                          className="w-full text-left px-2.5 py-1 rounded-lg text-xs text-neutral-300 hover:bg-neutral-900 hover:text-amber-400 transition-colors"
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* "Directory" Direct Link */}
            <button
              id="nav-directory-tab"
              onClick={() => onSelectTab('community')}
              className={`flex items-center space-x-1.5 px-2.5 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                currentTab === 'community'
                  ? 'bg-neutral-800 text-amber-400 border border-neutral-700 shadow-inner'
                  : 'text-neutral-300 hover:text-neutral-100 hover:bg-neutral-900'
              }`}
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              <span>Directory</span>
            </button>

            {/* "Community" 1-Click Direct Link */}
            <button
              id="nav-chat-tab"
              onClick={() => onSelectTab('chat')}
              className={`flex items-center space-x-1.5 px-2.5 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all relative ${
                currentTab === 'chat'
                  ? 'bg-neutral-800 text-amber-400 border border-neutral-700 shadow-inner'
                  : 'text-neutral-300 hover:text-neutral-100 hover:bg-neutral-900'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>Community</span>
              {!isPaidMember && (
                <span className="ml-1 text-[9px] xl:text-[10px] bg-neutral-800 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30">
                  Paid
                </span>
              )}
            </button>

            {/* Author Workspace (Publish Studio) */}
            <button
              id="nav-studio-tab"
              onClick={() => onSelectTab('studio')}
              className={`flex items-center space-x-1.5 px-2.5 xl:px-3.5 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                currentTab === 'studio'
                  ? 'bg-neutral-800 text-amber-400 border border-neutral-700 shadow-inner'
                  : 'text-neutral-300 hover:text-neutral-100 hover:bg-neutral-900'
              }`}
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span><span className="hidden xl:inline">Author </span>Workspace</span>
              {isPaidMember && (
                <span className="text-[9px] xl:text-[10px] font-mono text-neutral-400 bg-neutral-900 px-1.5 py-0.5 rounded">
                  {currentUser.articlesPublishedThisWeek}/3
                </span>
              )}
            </button>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            {/* Admin Console Shortcut */}
            <button
              id="nav-admin-console-btn"
              onClick={onOpenAdminConsole}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-amber-500 text-xs font-semibold text-neutral-200 transition-colors flex items-center space-x-1.5 relative"
              title="Open Admin Console & Automations"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Admin</span>
              {pendingReviewCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping absolute -top-0.5 -right-0.5" />
              )}
            </button>

            {/* Theme Mode Toggle (Executive Obsidian vs Editorial Print) */}
            {onToggleTheme && (
              <button
                id="theme-mode-toggle"
                onClick={onToggleTheme}
                className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-400 hover:border-amber-500/40 transition-all flex items-center space-x-1.5 text-xs"
                title={`Switch to ${theme === 'dark' ? 'Editorial Print (Light)' : 'Executive Obsidian (Dark)'} Theme`}
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span className="hidden xl:inline text-[11px] font-medium text-neutral-400">Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-amber-500" />
                    <span className="hidden xl:inline text-[11px] font-medium text-neutral-600">Dark</span>
                  </>
                )}
              </button>
            )}

            {/* Member Identity / Join CTAs */}
            {!isPaidMember ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={onToggleMembershipState}
                  className="text-xs text-neutral-400 hover:text-neutral-200 hidden sm:inline"
                >
                  Sign In
                </button>
                <button
                  onClick={onOpenMembershipModal}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Join Syndicate ($49/mo)</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenCredentialPack(currentUser)}
                  className="p-2 rounded-xl bg-neutral-900 text-amber-400 hover:bg-neutral-800 border border-neutral-800 transition-colors hidden sm:block"
                  title="Member Credential Pack"
                >
                  <Award className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenPortfolio(currentUser)}
                  className="flex items-center space-x-2 bg-neutral-900 border border-amber-500/40 hover:border-amber-400 rounded-xl px-3 py-1.5 transition-all text-left"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <div className="hidden md:block">
                    <div className="text-xs font-bold text-neutral-200">{currentUser.name}</div>
                    <div className="text-[10px] text-amber-400 font-mono truncate max-w-[120px]">
                      {currentUser.subdomain}.{customDomain}
                    </div>
                  </div>
                </button>

                <button
                  onClick={onToggleMembershipState}
                  className="text-[10px] text-neutral-500 hover:text-neutral-300 font-mono hidden xl:inline"
                  title="Toggle between Guest and Paid Member simulation"
                >
                  [Logout]
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-neutral-800/80 text-xs">
          <button
            onClick={() => onSelectTab('news')}
            className={`flex items-center space-x-1 py-1 px-2 rounded ${currentTab === 'news' ? 'text-amber-400 font-bold' : 'text-neutral-400'}`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>News</span>
          </button>
          <button
            onClick={() => onSelectTab('community')}
            className={`flex items-center space-x-1 py-1 px-2 rounded ${currentTab === 'community' ? 'text-amber-400 font-bold' : 'text-neutral-400'}`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Directory</span>
          </button>
          <button
            onClick={() => onSelectTab('chat')}
            className={`flex items-center space-x-1 py-1 px-2 rounded ${currentTab === 'chat' ? 'text-amber-400 font-bold' : 'text-neutral-400'}`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Community</span>
          </button>
          <button
            onClick={() => onSelectTab('studio')}
            className={`flex items-center space-x-1 py-1 px-2 rounded ${currentTab === 'studio' ? 'text-amber-400 font-bold' : 'text-neutral-400'}`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Workspace</span>
          </button>
        </div>
      </div>
    </header>
  );
};
