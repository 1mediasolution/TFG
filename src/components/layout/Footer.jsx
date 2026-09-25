import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Globe, ExternalLink, Sparkles } from 'lucide-react';
import { FounderGridLogo } from '../common/FounderGridLogo';

export const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-[#FAF8F5] dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <FounderGridLogo variant="full" size="md" />
            <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
              The Founder Grid is the premier financial and business intelligence exchange for high-caliber founders, vetted investors, and institutional operators.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              <span>GLOBAL SYNDICATE NETWORK ACTIVE</span>
            </div>
          </div>

          {/* Intelligence */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
              Intelligence Wire
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-amber-600 transition-colors">Daily Market Wire</Link></li>
              <li><Link to="/?category=Venture+Capital" className="hover:text-amber-600 transition-colors">Venture & Seed Rounds</Link></li>
              <li><Link to="/?category=Tech/AI" className="hover:text-amber-600 transition-colors">Tech & AI Deployments</Link></li>
              <li><Link to="/?category=M&A" className="hover:text-amber-600 transition-colors">M&A & Liquidity Events</Link></li>
            </ul>
          </div>

          {/* Network & Ecosystem */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
              Founder Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/directory" className="hover:text-amber-600 transition-colors">Member Directory</Link></li>
              <li><Link to="/directory/founders" className="hover:text-amber-600 transition-colors">Verified Founders</Link></li>
              <li><Link to="/directory/investors" className="hover:text-amber-600 transition-colors">Accredited Investors</Link></li>
              <li><Link to="/community" className="hover:text-amber-600 transition-colors">Private Deal Rooms</Link></li>
            </ul>
          </div>

          {/* Subdomains & Governance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 mb-3">
              Platform & Standards
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/founder/dashboard" className="hover:text-amber-600 transition-colors">Subdomain Publisher</Link></li>
              <li><Link to="/admin" className="hover:text-amber-600 transition-colors">Editorial Board & Standards</Link></li>
              <li><span className="text-zinc-400">DNS & Custom Domain Gateway</span></li>
              <li><span className="text-zinc-400">Verification Protocol 2.4</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} The Founder Grid Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Terms of Syndicate</span>
            <span>Privacy Charter</span>
            <span>Security Disclosures</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
