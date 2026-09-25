import React, { useState, useMemo } from 'react';
import {
  Search,
  ShieldCheck,
  Globe,
  Briefcase,
  MapPin,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Filter,
  MessageSquare,
  FileText,
  Linkedin,
  Mail,
  Send,
  Lock,
  Layers,
  Award,
  ExternalLink
} from 'lucide-react';
import { FounderMember, MatchmakingIntent, MatchmakingOffering, Advertisement } from '../../../types';
import { AdvertisementBanner } from '../../layout/AdvertisementBanner';

export interface CommunityDirectoryProps {
  members: FounderMember[];
  onOpenPortfolio: (member: FounderMember) => void;
  onOpenSubdomain: (subdomain: string) => void;
  onOpenInquiryModal: (member: FounderMember) => void;
  onOpenMembershipModal: () => void;
  onOpenCredentialPack: (member: FounderMember) => void;
  isPaidMember: boolean;
  currentUser: FounderMember;
  onNavigateToChat: () => void;
  sidebarAd?: Advertisement;
  customDomain?: string;
  initialRoleFilter?: string;
  initialIndustryFilter?: string;
}

export const CommunityDirectory: React.FC<CommunityDirectoryProps> = ({
  members,
  onOpenPortfolio,
  onOpenSubdomain,
  onOpenInquiryModal,
  onOpenMembershipModal,
  onOpenCredentialPack,
  isPaidMember,
  currentUser,
  onNavigateToChat,
  sidebarAd,
  customDomain = 'thefoundergrid.com',
  initialRoleFilter = 'All',
  initialIndustryFilter = 'All'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>(initialRoleFilter);
  const [selectedIndustry, setSelectedIndustry] = useState<string>(initialIndustryFilter);
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const [selectedIntent, setSelectedIntent] = useState<string>('All');
  const [selectedOffering, setSelectedOffering] = useState<string>('All');

  const roles = ['All', 'Founder', 'Investor'];
  const industries = [
    'All',
    'Enterprise SaaS',
    'Fintech',
    'Private Equity',
    'Cloud Infrastructure',
    'Supply Chain & Manufacturing'
  ];
  const locations = ['All', 'Bengaluru', 'Mumbai', 'San Francisco', 'New York', 'London', 'Singapore'];
  const intentOptions: ('All' | MatchmakingIntent)[] = ['All', 'Clients', 'Capital', 'Distributors', 'Partners'];
  const offeringOptions: ('All' | MatchmakingOffering)[] = ['All', 'Services', 'Software', 'Manufacturing', 'Mentorship'];

  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchSearch =
        searchQuery === '' ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subdomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchRole = selectedRole === 'All' || m.role.toLowerCase() === selectedRole.toLowerCase();

      const matchIndustry =
        selectedIndustry === 'All' || m.industry.toLowerCase().includes(selectedIndustry.toLowerCase());

      const matchLocation =
        selectedLocation === 'All' || m.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchIntent =
        selectedIntent === 'All' || (m.lookingFor && m.lookingFor.includes(selectedIntent as MatchmakingIntent));

      const matchOffering =
        selectedOffering === 'All' || (m.canOffer && m.canOffer.includes(selectedOffering as MatchmakingOffering));

      return matchSearch && matchRole && matchIndustry && matchLocation && matchIntent && matchOffering;
    });
  }, [members, searchQuery, selectedRole, selectedIndustry, selectedLocation, selectedIntent, selectedOffering]);

  return (
    <div id="community-directory-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-neutral-100">
      {/* Masthead Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated B2B Matchmaking & Member Directory</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-neutral-100 font-semibold tracking-tight">
            Founders & Investors Directory
          </h1>
          <p className="text-neutral-400 text-sm mt-1 max-w-3xl">
            Vetted operators, private enterprise owners, and venture capital partners. Discover synergies through on-page filtering by Role, Industry, Strategic Intent (&quot;Looking For&quot;), and Operational Offering (&quot;Can Offer&quot;).
          </p>
        </div>

        {/* Action Button */}
        {!isPaidMember ? (
          <button
            onClick={onOpenMembershipModal}
            className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-lg shadow-amber-950/40 shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Join & Feature Yourself ($49/mo)</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => onOpenCredentialPack(currentUser)}
              className="flex items-center space-x-1.5 bg-neutral-900 border border-neutral-700 hover:border-amber-500 text-neutral-200 text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>My Credential Pack</span>
            </button>

            <button
              onClick={() => onOpenPortfolio(currentUser)}
              className="flex items-center space-x-1.5 bg-neutral-900 border border-amber-500/40 hover:border-amber-400 text-amber-400 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
            >
              <span>View My Portfolio</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Content Layout with Sidebars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Directory Area */}
        <div className="lg:col-span-9 space-y-6">
          {/* On-Page Filter Console */}
          <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-5 space-y-4 shadow-sm">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search directory by name, company, bio, location, or subdomain..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-300 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              {/* Role Filter */}
              <div>
                <label className="block text-neutral-400 text-[11px] font-semibold mb-1 uppercase tracking-wider">
                  Role (Founders / Investors)
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-neutral-200 focus:outline-none focus:border-amber-500"
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>{r === 'All' ? 'All Roles (Founders & Investors)' : r}</option>
                  ))}
                </select>
              </div>

              {/* Industry Filter */}
              <div>
                <label className="block text-neutral-400 text-[11px] font-semibold mb-1 uppercase tracking-wider">
                  Industry Sector
                </label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-neutral-200 focus:outline-none focus:border-amber-500"
                >
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind === 'All' ? 'All Industries' : ind}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-neutral-400 text-[11px] font-semibold mb-1 uppercase tracking-wider">
                  Geographic Hub
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-neutral-200 focus:outline-none focus:border-amber-500"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc === 'All' ? 'All Locations' : loc}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Strategic Intent & Offering Matchmaking Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-800/80">
              {/* Intent: "Looking For" */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                  <span>Intent: &quot;Looking For&quot;</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {intentOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedIntent(opt)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                        selectedIntent === opt
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Offering: "Can Offer" */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold text-neutral-300 uppercase tracking-wider flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  <span>Offering: &quot;Can Offer&quot;</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {offeringOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedOffering(opt)}
                      className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                        selectedOffering === opt
                          ? 'bg-emerald-400 text-neutral-950 font-bold'
                          : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
            <span>Showing <strong className="text-neutral-200">{filteredMembers.length}</strong> matching syndicate members</span>
            {(selectedRole !== 'All' || selectedIndustry !== 'All' || selectedLocation !== 'All' || selectedIntent !== 'All' || selectedOffering !== 'All' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedRole('All');
                  setSelectedIndustry('All');
                  setSelectedLocation('All');
                  setSelectedIntent('All');
                  setSelectedOffering('All');
                  setSearchQuery('');
                }}
                className="text-amber-400 hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Members Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all hover:shadow-xl hover:shadow-neutral-950/50 group"
              >
                <div className="space-y-3">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-amber-500/40 shadow-sm"
                      />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <h3 className="font-bold text-neutral-100 text-base group-hover:text-amber-400 transition-colors">
                            {member.name}
                          </h3>
                          {member.isVerified && (
                            <span title="Verified Member">
                              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-300 font-medium">
                          {member.title} • <span className="text-neutral-200">{member.companyName}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-[11px] text-neutral-400 pt-0.5">
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-0.5 text-neutral-500" />
                            {member.location}
                          </span>
                          <span>•</span>
                          <span className="font-mono text-amber-400">{member.role}</span>
                        </div>
                      </div>
                    </div>

                    <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                      {member.membershipBadge}
                    </span>
                  </div>

                  {/* Subdomain Pill */}
                  <div className="flex items-center justify-between bg-neutral-950 px-3 py-1.5 rounded-xl border border-neutral-800 text-xs">
                    <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                      <Globe className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-amber-400">{member.subdomain}</span>
                      <span className="text-neutral-500">.{customDomain}</span>
                    </div>

                    <button
                      onClick={() => onOpenSubdomain(member.subdomain)}
                      className="text-[11px] text-neutral-400 hover:text-neutral-200 flex items-center space-x-1"
                    >
                      <span>Visit Hub</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Intent Tags ("Looking For") & Offering Tags ("Can Offer") */}
                  <div className="space-y-2 pt-1">
                    {member.lookingFor && member.lookingFor.length > 0 && (
                      <div className="flex items-center space-x-1.5 text-[11px] overflow-hidden">
                        <span className="text-neutral-500 font-mono text-[10px] uppercase shrink-0">Looking For:</span>
                        <div className="flex flex-wrap gap-1">
                          {member.lookingFor.map((item) => (
                            <span key={item} className="bg-neutral-950 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded text-[10px] font-medium">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {member.canOffer && member.canOffer.length > 0 && (
                      <div className="flex items-center space-x-1.5 text-[11px] overflow-hidden">
                        <span className="text-neutral-500 font-mono text-[10px] uppercase shrink-0">Can Offer:</span>
                        <div className="flex flex-wrap gap-1">
                          {member.canOffer.map((item) => (
                            <span key={item} className="bg-neutral-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.2 rounded text-[10px] font-medium">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Connect Actions */}
                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onOpenPortfolio(member)}
                      className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1"
                    >
                      <span>View Portfolio</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={member.linkedinUrl || member.socialLinks?.linkedin || 'https://linkedin.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-sky-400 rounded-lg transition-colors"
                      title="Connect on LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onOpenInquiryModal(member)}
                      className="px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-neutral-950 border border-amber-500/40 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
                    >
                      <Send className="w-3 h-3" />
                      <span>Inquire</span>
                    </button>

                    <button
                      onClick={() => onOpenCredentialPack(member)}
                      className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-amber-400 rounded-lg transition-colors"
                      title="View Member Credentials & Certificate"
                    >
                      <Award className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar Ad & Platform Stats */}
        <div className="lg:col-span-3 space-y-6">
          {/* Pre-allocated Sidebar Ad Placement */}
          <AdvertisementBanner
            ad={sidebarAd}
            slot="sidebar_right"
          />

          {/* Syndicate Discovery Metric Card */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-amber-400 uppercase tracking-wider">
              Syndicate Benchmark
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-400">Verified Members:</span>
                <span className="font-mono font-bold text-neutral-100">{members.length} operators</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-400">Total Capital Raised:</span>
                <span className="font-mono font-bold text-amber-400">$340M+</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-400">Referrals Exchanged:</span>
                <span className="font-mono font-bold text-emerald-400">1,480+</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-400">Weekly Quota Cap:</span>
                <span className="font-mono text-neutral-200">3 Articles/Wk</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
