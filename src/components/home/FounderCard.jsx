import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Globe, ArrowUpRight, TrendingUp, Users } from 'lucide-react';
import { Button } from '../common/Button';

export const FounderCard = ({ member, onSelect, onOpenPortfolio }) => {
  if (!member) return null;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-xs hover:border-amber-500/50 hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Top bar with tier & verification */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${
              member.tier === 'executive_fellow'
                ? 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {member.tier === 'executive_fellow' ? 'Executive Fellow' : 'Founder Pro'}
          </span>

          {member.verified && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </span>
          )}
        </div>

        {/* Founder Info */}
        <div className="flex items-start gap-3.5 mb-4">
          <img
            src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
            alt={member.name}
            className="w-12 h-12 rounded-xl object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
          />
          <div className="min-w-0">
            <h3 className="font-serif text-base font-bold text-zinc-950 dark:text-white truncate">
              {member.name}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              {member.title} at <span className="font-semibold text-zinc-800 dark:text-zinc-200">{member.company}</span>
            </p>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-mono text-amber-600 dark:text-amber-400">
              <Globe className="w-3 h-3" />
              <span>{member.subdomain}.thefoundergrid.com</span>
            </div>
          </div>
        </div>

        {/* Bio preview */}
        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
          {member.bio}
        </p>

        {/* Quick Metrics */}
        {member.stats && (
          <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 mb-4 text-center">
            {member.stats.valuation && (
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-mono block">Valuation</span>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 font-serif">
                  {member.stats.valuation}
                </span>
              </div>
            )}
            {member.stats.totalRaised && (
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-mono block">Raised</span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 font-serif">
                  {member.stats.totalRaised}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
        <button
          onClick={() => onOpenPortfolio ? onOpenPortfolio(member) : onSelect && onSelect(member)}
          className="flex-1 py-1.5 px-3 text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer text-center"
        >
          View Dossier
        </button>
        <Link
          to={`/portfolio/${member.subdomain}`}
          className="p-1.5 text-zinc-400 hover:text-amber-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          title="Open Public Subdomain"
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default FounderCard;
