import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Moon,
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { FounderGridLogo } from '../common/FounderGridLogo';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = ({
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
  theme = 'light',
  onToggleTheme,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const user = currentUser || auth?.user;
  const isPaid = isPaidMember !== undefined ? isPaidMember : auth?.isPaidMember;

  const navLinks = [
    { id: 'news', path: '/', label: 'The Wire & Intelligence', icon: Newspaper },
    { id: 'directory', path: '/directory', label: 'Member Directory', icon: Users },
    { id: 'community', path: '/community', label: 'Founder Exchange', icon: MessageSquare },
    { id: 'studio', path: '/founder/dashboard', label: 'Editorial Studio', icon: Globe },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/95 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <FounderGridLogo variant="full" size="md" />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path)) ||
                currentTab === item.id;

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => onSelectTab && onSelectTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors ${
                    isActive
                      ? 'bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-white font-bold'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-500" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Admin badge / trigger */}
          {(user?.role === 'Admin' || user?.subdomain === 'elenavance' || onOpenAdminConsole) && (
            <button
              onClick={() => onOpenAdminConsole ? onOpenAdminConsole() : navigate('/admin')}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400 rounded-lg border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 transition-colors cursor-pointer"
              title="Admin Moderation Console"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
              {pendingReviewCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-rose-600 text-white font-mono">
                  {pendingReviewCount}
                </span>
              )}
            </button>
          )}

          {/* Theme Switcher */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="p-2 text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Executive Dark'} mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* User Profile / Auth State */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 pl-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <div className="text-right hidden sm:block">
                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
                    {user.name}
                  </div>
                  <div className="text-[10px] uppercase font-mono text-amber-600 dark:text-amber-400">
                    {user.tier === 'executive_fellow'
                      ? 'Executive'
                      : user.tier === 'founder_pro'
                      ? 'Founder Pro'
                      : 'Member'}
                  </div>
                </div>
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-amber-500/40"
                />
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setIsUserMenuOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">{user.name}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{user.company}</p>
                    <p className="text-[11px] font-mono text-amber-600 mt-0.5">{user.subdomain}.thefoundergrid.com</p>
                  </div>

                  <Link
                    to="/founder/dashboard"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <Globe className="w-3.5 h-3.5 text-amber-600" />
                    <span>Founder Studio</span>
                  </Link>

                  <Link
                    to="/founder/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <User className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Profile Settings</span>
                  </Link>

                  <Link
                    to="/founder/portfolio"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-zinc-500" />
                    <span>My Public Portfolio</span>
                  </Link>

                  {onOpenMembershipModal && (
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onOpenMembershipModal();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                      <Crown className="w-3.5 h-3.5 text-amber-500" />
                      <span>Membership Tiers</span>
                    </button>
                  )}

                  <div className="border-t border-zinc-100 dark:border-zinc-800 my-1" />

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      auth?.logout();
                      navigate('/');
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth/login"
                className="px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 dark:text-zinc-300"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="px-3.5 py-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white rounded-lg transition-colors shadow-xs"
              >
                Join Network
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
