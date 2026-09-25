import React from 'react';
import { Briefcase, TrendingUp, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const CaseStudies = ({ caseStudies = [] }) => {
  const defaultStudies = [
    {
      id: 'cs-1',
      title: 'Enterprise Multi-Model Orchestration Platform',
      client: 'Global Fortune 100 Asset Manager',
      outcome: 'Reduced unstructured equity analysis turnaround from 4 days to 18 seconds across 12,000 tickers.',
      metric: '94% OpEx Reduction',
      year: '2024',
    },
    {
      id: 'cs-2',
      title: 'Cross-Border Real-Time Liquidity Settlement Hub',
      client: 'Tier-1 International Clearing House',
      outcome: 'Integrated zero-knowledge cryptographic verification for $420M in monthly sovereign bond settlements.',
      metric: '$420M/mo Handled',
      year: '2023',
    },
  ];

  const items = caseStudies.length > 0 ? caseStudies : defaultStudies;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-amber-600" />
          <h3 className="font-serif text-lg font-bold text-zinc-950 dark:text-white">
            Validated Case Studies & Deployments
          </h3>
        </div>
        <span className="text-xs font-mono text-zinc-400">{items.length} Tracked</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((cs) => (
          <div
            key={cs.id}
            className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span className="font-semibold text-amber-600">{cs.client}</span>
                <span className="font-mono">{cs.year}</span>
              </div>
              <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                {cs.title}
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                {cs.outcome}
              </p>
            </div>

            <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <TrendingUp className="w-3.5 h-3.5" />
                {cs.metric}
              </span>
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                Verified Outcome <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
