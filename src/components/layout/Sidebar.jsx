import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Briefcase,
  Mail,
  User,
  Settings,
  ShieldCheck,
  Globe,
  Award
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar = ({ items = [], title = 'Navigation' }) => {
  const auth = useAuth();
  const user = auth?.user;

  const defaultItems = [
    { label: 'Overview', path: '/founder/dashboard', icon: LayoutDashboard },
    { label: 'My Articles', path: '/founder/articles', icon: FileText },
    { label: 'Create Article', path: '/founder/create-article', icon: PlusCircle },
    { label: 'My Portfolio', path: '/founder/portfolio', icon: Briefcase },
    { label: 'Inbound Inquiries', path: '/founder/inquiries', icon: Mail },
    { label: 'Profile Settings', path: '/founder/profile', icon: User },
  ];

  const navItems = items.length > 0 ? items : defaultItems;

  return (
    <aside className="w-64 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 p-4 space-y-6">
      {/* User brief header */}
      {user && (
        <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover border border-amber-500/50"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">{user.name}</h4>
              <p className="text-[10px] text-zinc-500 truncate">{user.company}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-[9px] uppercase font-mono text-amber-600 dark:text-amber-400 font-bold">
                  {user.tier === 'executive_fellow' ? 'Executive' : 'Founder Pro'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nav List */}
      <div className="space-y-1">
        <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
          {title}
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`
              }
            >
              {Icon && <Icon className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0" />}
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Quick link to live publication subdomain */}
      {user?.subdomain && (
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 text-xs">
            <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold mb-1">
              <Globe className="w-3.5 h-3.5" />
              <span>Your Subdomain</span>
            </div>
            <p className="text-[11px] font-mono text-zinc-600 dark:text-zinc-400 truncate">
              {user.subdomain}.thefoundergrid.com
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
