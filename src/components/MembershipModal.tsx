import React, { useState, useMemo } from 'react';
import {
  X,
  Crown,
  CheckCircle2,
  Globe,
  MessageSquare,
  FileText,
  UserCheck,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { FounderMember } from '../types';
import { FounderGridLogo } from './FounderGridLogo';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingMembers?: FounderMember[];
  onActivateMembership: (details: {
    fullName: string;
    companyName: string;
    subdomain: string;
    industry: string;
    role: 'Founder' | 'Investor';
  }) => void;
  customDomain?: string;
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  isOpen,
  onClose,
  existingMembers = [],
  onActivateMembership,
  customDomain = 'thefoundergrid.com'
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [fullName, setFullName] = useState('Alexander Sterling');
  const [companyName, setCompanyName] = useState('Sterling Capital Group');
  const [subdomain, setSubdomain] = useState('alexsterling');
  const [industry, setIndustry] = useState('Fintech & Asset Management');
  const [role, setRole] = useState<'Founder' | 'Investor'>('Founder');

  // Real-time handle availability check
  const isHandleTaken = useMemo(() => {
    if (!subdomain.trim()) return false;
    const clean = subdomain.toLowerCase().trim();
    return existingMembers.some((m) => m.subdomain.toLowerCase() === clean);
  }, [subdomain, existingMembers]);

  // Smart alternative suggestions if taken
  const smartAlternatives = useMemo(() => {
    if (!subdomain.trim()) return [];
    const base = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
    return [
      `${base}-ventures`,
      `${base}-scale`,
      `the-${base}`,
      `${base}-capital`
    ].filter((alt) => !existingMembers.some((m) => m.subdomain.toLowerCase() === alt));
  }, [subdomain, existingMembers]);

  if (!isOpen) return null;

  const handleSubdomainChange = (val: string) => {
    const clean = val.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSubdomain(clean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subdomain.trim() || !fullName.trim() || isHandleTaken) return;

    onActivateMembership({
      fullName,
      companyName,
      subdomain,
      industry,
      role
    });
    onClose();
  };

  return (
    <div id="membership-modal-overlay" className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl relative flex flex-col my-auto text-neutral-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950/50 via-neutral-900 to-neutral-950 p-6 sm:p-8 border-b border-neutral-800 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-3 max-w-lg">
            <FounderGridLogo variant="full" size="sm" theme="dark" showTagline={true} />
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-neutral-100 tracking-tight">
              Feature Yourself on The Founder Grid
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300">
              Join elite operators and enterprise founders. Unlock your auto-provisioned subdomain, 3 articles/week publishing quota, and gated community deal roundtable.
            </p>
          </div>
        </div>

        {/* Pricing & Form */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Plan Perks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-neutral-900/50 p-4 rounded-2xl border border-neutral-800">
            <div className="flex items-start space-x-2.5 text-xs text-neutral-200">
              <Globe className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-neutral-100">Auto-Provisioned Subdomain</span>
                <span className="text-neutral-400 text-[11px]">yourname.{customDomain}</span>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 text-xs text-neutral-200">
              <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-neutral-100">3 Articles/Week Quota</span>
                <span className="text-neutral-400 text-[11px]">Auto-resets every Monday 00:00 UTC</span>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 text-xs text-neutral-200">
              <MessageSquare className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-neutral-100">Real-Time Community & Chat</span>
                <span className="text-neutral-400 text-[11px]">WebSocket-backed channels & 1:1 DMs</span>
              </div>
            </div>

            <div className="flex items-start space-x-2.5 text-xs text-neutral-200">
              <UserCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-neutral-100">Custom Executive Portfolio</span>
                <span className="text-neutral-400 text-[11px]">1-Click PDF export & Verifiable Certificate</span>
              </div>
            </div>
          </div>

          {/* Billing Cycle Switcher */}
          <div className="flex items-center justify-between bg-neutral-900/80 p-2 rounded-xl border border-neutral-800 text-xs">
            <button
              type="button"
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Monthly Billing: $49/mo
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle('annual')}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <span>Annual: $490/yr</span>
              <span className="bg-emerald-400 text-neutral-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                Save 2 Mo
              </span>
            </button>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alexander Sterling"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">
                  Enterprise / Company <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Sterling Capital Group"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-neutral-300 font-medium mb-1">Primary Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('Founder')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      role === 'Founder'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    Founder
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('Investor')}
                    className={`py-2 px-3 rounded-xl border text-center transition-all ${
                      role === 'Investor'
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                    }`}
                  >
                    Investor
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 font-medium mb-1">Industry Sector</label>
                <input
                  type="text"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Enterprise SaaS & AI"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Custom Subdomain Field with Real-Time Availability Check */}
            <div>
              <label className="block text-neutral-300 font-medium mb-1">
                Selected Subdomain Name <span className="text-amber-400">*</span>
              </label>
              <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 focus-within:border-amber-500">
                <span className="text-neutral-500 font-mono">https://</span>
                <input
                  type="text"
                  required
                  value={subdomain}
                  onChange={(e) => handleSubdomainChange(e.target.value)}
                  placeholder="yourname"
                  className="bg-transparent text-neutral-100 font-mono font-bold focus:outline-none flex-1 px-1"
                />
                <span className="text-amber-400 font-mono font-semibold">.{customDomain}</span>
              </div>

              {/* Real-time Status Indicator */}
              <div className="mt-2 space-y-2">
                {isHandleTaken ? (
                  <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3 space-y-2">
                    <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>The handle &quot;{subdomain}&quot; is already registered by a syndicate member.</span>
                    </div>

                    {smartAlternatives.length > 0 && (
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center space-x-1 text-[11px] text-neutral-400">
                          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                          <span>Smart alternative suggestions:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {smartAlternatives.map((alt) => (
                            <button
                              key={alt}
                              type="button"
                              onClick={() => setSubdomain(alt)}
                              className="px-2.5 py-1 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-amber-500/30 text-amber-300 text-xs font-mono transition-colors"
                            >
                              + {alt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-1.5 text-emerald-400 text-[11px] font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Handle is available for auto-provisioning!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Submission CTA */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={isHandleTaken || !subdomain.trim()}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center space-x-2 ${
                  isHandleTaken || !subdomain.trim()
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 shadow-amber-950/40'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  Confirm & Auto-Provision Subdomain ({billingCycle === 'monthly' ? '$49' : '$490'})
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
