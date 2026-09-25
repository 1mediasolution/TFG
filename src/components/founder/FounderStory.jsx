import React from 'react';
import { BookOpen, Sparkles, Target, Milestone, ShieldCheck } from 'lucide-react';

export const FounderStory = ({ member }) => {
  if (!member) return null;

  return (
    <div className="space-y-6">
      {/* Executive Bio */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-amber-600" />
          <h3 className="font-serif text-lg font-bold text-zinc-950 dark:text-white">
            Executive Narrative & Background
          </h3>
        </div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
          {member.bio ||
            'Elena Vance is a multi-venture operator focused on high-throughput algorithmic systems, enterprise generative models, and cross-border fintech infrastructure. Previously founded and exited two frontier technology startups.'}
        </p>

        {member.story && (
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {member.story}
          </div>
        )}
      </div>

      {/* Syndicate Verification Notice */}
      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs">
          <h4 className="font-bold text-zinc-900 dark:text-zinc-100">
            Syndicate Verification Protocol Completed
          </h4>
          <p className="text-zinc-600 dark:text-zinc-400 mt-0.5">
            Identity, corporate entity registration, capitalization metrics, and publication bylines have been certified under The Founder Grid Standard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FounderStory;
