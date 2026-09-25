import React from 'react';
import { ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { Advertisement, AdSlotId } from '../types';

interface AdvertisementBannerProps {
  ad?: Advertisement;
  slot: AdSlotId;
  onAdClick?: (adId: string) => void;
  onOpenAdminAdConfig?: (slot: AdSlotId) => void;
  className?: string;
}

export const AdvertisementBanner: React.FC<AdvertisementBannerProps> = ({
  ad,
  slot,
  onAdClick,
  onOpenAdminAdConfig,
  className = ''
}) => {
  if (!ad || !ad.active) return null;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAdClick) onAdClick(ad.id);
    if (ad.ctaUrl) {
      window.open(ad.ctaUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // 1. Top Leaderboard Format (above main header)
  if (slot === 'top_leaderboard') {
    return (
      <div className={`w-full bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-b border-neutral-800/80 text-xs py-2 px-3 sm:px-6 relative ${className}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center space-x-2 text-neutral-400 text-[11px]">
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {ad.badge || 'Sponsored'}
            </span>
            <span className="font-semibold text-neutral-200">{ad.sponsor}:</span>
            <span className="text-neutral-300 line-clamp-1 hidden md:inline">{ad.description}</span>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a
              href={ad.ctaUrl}
              onClick={handleClick}
              className="inline-flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold px-3 py-1 rounded-full text-xs transition-colors shadow-sm"
            >
              <span>{ad.ctaText}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {onOpenAdminAdConfig && (
              <button
                onClick={() => onOpenAdminAdConfig(slot)}
                className="text-[10px] text-neutral-500 hover:text-neutral-300 underline"
                title="Configure this Ad slot in Admin"
              >
                Slot #{slot}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. In-Feed Banner (Homepage and Newsfeed)
  if (slot === 'in_feed_home') {
    return (
      <div className={`my-8 p-1 rounded-2xl bg-gradient-to-r from-amber-500/20 via-neutral-800/60 to-amber-500/20 border border-amber-500/30 overflow-hidden shadow-lg ${className}`}>
        <div className="bg-neutral-950/90 rounded-xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {ad.badge}
              </span>
              <span className="text-xs text-neutral-400 font-medium">B2B Partner Spotlight</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-neutral-100 font-cinzel">
              {ad.title}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl leading-relaxed">
              {ad.description}
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4 text-[11px] text-neutral-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Vetted & Pre-Approved Deal
              </span>
              <span>•</span>
              <span className="font-mono text-neutral-400">{ad.sponsor}</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col items-center gap-2">
            <a
              href={ad.ctaUrl}
              onClick={handleClick}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-neutral-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center space-x-2"
            >
              <span>{ad.ctaText}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <span className="text-[10px] text-neutral-500 font-mono">
              Impressions: {ad.impressions.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 3. Sidebars (Left / Right)
  if (slot === 'sidebar_left' || slot === 'sidebar_right') {
    return (
      <div className={`bg-neutral-900/80 border border-neutral-800 rounded-xl p-4 space-y-3 ${className}`}>
        <div className="flex items-center justify-between">
          <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
            {ad.badge}
          </span>
          <span className="text-[10px] text-neutral-500 font-mono">Sponsored</span>
        </div>
        <h5 className="font-bold text-sm text-neutral-200 leading-snug">
          {ad.title}
        </h5>
        <p className="text-xs text-neutral-400 leading-relaxed">
          {ad.description}
        </p>
        <div className="pt-1">
          <a
            href={ad.ctaUrl}
            onClick={handleClick}
            className="w-full py-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-amber-400 hover:text-amber-300 font-medium text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5"
          >
            <span>{ad.ctaText}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    );
  }

  // 4. In-Article Paragraph Break
  return (
    <div className={`my-6 p-4 rounded-xl bg-neutral-900/60 border-l-4 border-amber-500 border-y border-r border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${className}`}>
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
            {ad.badge}
          </span>
          <span className="text-xs font-semibold text-neutral-200">{ad.sponsor}</span>
        </div>
        <p className="text-xs text-neutral-300">{ad.description}</p>
      </div>
      <a
        href={ad.ctaUrl}
        onClick={handleClick}
        className="shrink-0 text-xs font-bold text-neutral-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg transition-colors inline-flex items-center space-x-1"
      >
        <span>{ad.ctaText}</span>
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
};
