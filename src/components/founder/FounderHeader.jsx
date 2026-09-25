import React from 'react';
import { ShieldCheck, Globe, Linkedin, Twitter, Mail, ExternalLink, Award, Share2 } from 'lucide-react';
import { Button } from '../common/Button';

export const FounderHeader = ({
  member,
  onOpenCredentialPack,
  onOpenInquiry,
  isOwner = false,
}) => {
  if (!member) return null;

  return (
    <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-xs overflow-hidden">
      {/* Decorative gradient strip */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700" />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Left: Avatar & Identity */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <img
              src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt={member.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-zinc-100 dark:border-zinc-800 shadow-md"
            />
            {member.verified && (
              <div
                className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1 rounded-full border-2 border-white dark:border-zinc-900"
                title="Verified Syndicate Member"
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-950 dark:text-white">
                {member.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 uppercase">
                {member.tier === 'executive_fellow' ? 'Executive Fellow' : 'Founder Pro'}
              </span>
            </div>

            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
              {member.title} at <span className="font-semibold text-zinc-900 dark:text-zinc-100">{member.company}</span>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-1">
              <a
                href={`https://${member.subdomain}.thefoundergrid.com`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline font-mono"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{member.subdomain}.thefoundergrid.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {member.location && (
                <span>📍 {member.location}</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {onOpenCredentialPack && (
            <Button
              variant="outline"
              size="sm"
              icon={Award}
              onClick={() => onOpenCredentialPack(member)}
            >
              Credential Pack
            </Button>
          )}

          {onOpenInquiry && !isOwner && (
            <Button
              variant="gold"
              size="sm"
              icon={Mail}
              onClick={() => onOpenInquiry(member)}
            >
              Direct Inquiry
            </Button>
          )}

          {isOwner && (
            <Button variant="secondary" size="sm">
              Edit Dossier
            </Button>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      {member.stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <span className="text-[10px] uppercase font-mono text-zinc-400 block">Valuation</span>
            <span className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {member.stats.valuation || '$12M'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <span className="text-[10px] uppercase font-mono text-zinc-400 block">Annual Revenue</span>
            <span className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {member.stats.revenue || '$3.4M'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <span className="text-[10px] uppercase font-mono text-zinc-400 block">Total Capital Raised</span>
            <span className="font-serif text-lg font-bold text-amber-600 dark:text-amber-400">
              {member.stats.totalRaised || '$4.2M'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <span className="text-[10px] uppercase font-mono text-zinc-400 block">Team Headcount</span>
            <span className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
              {member.stats.employees || '24'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FounderHeader;
