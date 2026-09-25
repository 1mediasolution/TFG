import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, ShieldCheck, TrendingUp, Users, Globe } from 'lucide-react';
import { Button } from '../common/Button';

export const Hero = ({ onOpenMembershipModal }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-10 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Main Editorial Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>THE FOUNDER GRID INTELLIGENCE NETWORK</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
              Where High-Growth Business Meets Capital & Opportunity.
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
              Curated financial dispatches, accredited founder networks, executive publishing subdomains, and institutional deal-flow syndicate.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/directory">
                <Button variant="gold" size="md" icon={Users}>
                  Explore Verified Directory
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="outline" size="md" icon={Globe}>
                  Enter Deal Exchange
                </Button>
              </Link>
              {onOpenMembershipModal && (
                <Button variant="ghost" size="md" onClick={onOpenMembershipModal}>
                  View Executive Tiers →
                </Button>
              )}
            </div>
          </div>

          {/* Quick Syndicate Metrics */}
          <div className="grid grid-cols-2 gap-4 lg:w-80 shrink-0">
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <div className="text-[11px] font-mono text-zinc-400 uppercase">Verified Founders</div>
              <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                2,480+
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5 font-medium">
                <TrendingUp className="w-3 h-3" /> +18% this month
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <div className="text-[11px] font-mono text-zinc-400 uppercase">Total Syndicate Vol</div>
              <div className="font-serif text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                $1.8B+
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Across 420 ventures
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <div className="text-[11px] font-mono text-zinc-400 uppercase">Subdomains Live</div>
              <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                850+
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Automated DNS & SSL
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <div className="text-[11px] font-mono text-zinc-400 uppercase">Editorial Wire</div>
              <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                Daily
              </div>
              <div className="text-[11px] text-amber-600 flex items-center gap-1 mt-0.5 font-medium">
                <ShieldCheck className="w-3 h-3" /> Verified Bylines
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
