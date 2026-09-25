import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ShieldCheck,
  FileCheck,
  Users,
  Megaphone,
  CheckCircle2,
  Sliders,
  Database,
  ArrowLeft
} from 'lucide-react';

export const AdminSidebar = () => {
  const links = [
    { label: 'Admin Overview', path: '/admin', exact: true, icon: ShieldCheck },
    { label: 'Article Review Queue', path: '/admin/articles', icon: FileCheck },
    { label: 'Member Management', path: '/admin/members', icon: Users },
    { label: 'Ad Placements', path: '/admin/advertisements', icon: Megaphone },
    { label: 'Verification Protocol', path: '/admin/verification', icon: CheckCircle2 },
    { label: 'Platform Moderation', path: '/admin/moderation', icon: Sliders },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 p-4 space-y-6">
      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Admin Syndicate Board</span>
        </div>
        <p className="text-[10px] text-zinc-500 mt-1">Editorial & Governance Control Panel</p>
      </div>

      <nav className="space-y-1">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-bold border border-rose-200/50'
                    : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Portal</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default AdminSidebar;
