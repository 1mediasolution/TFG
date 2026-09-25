import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Globe,
  Building2,
  Calendar,
  Users,
  TrendingUp,
  Mail,
  Linkedin,
  Twitter,
  ExternalLink,
  Share2,
  Printer,
  Sparkles,
  FileText,
  ArrowRight,
  Handshake,
  CheckCircle,
  Copy,
  Code2,
  Edit3,
  MapPin,
  Send,
  Lock,
  Phone,
  Award,
  Layers
} from 'lucide-react';
import { FounderMember } from '../types';

interface CustomPortfolioModalProps {
  member: FounderMember | null;
  onClose: () => void;
  onOpenSubdomain: (subdomain: string) => void;
  onOpenInquiryModal?: (member: FounderMember) => void;
  onOpenCredentialPack?: (member: FounderMember) => void;
  isCurrentUser: boolean;
  onUpdateMember?: (updated: FounderMember) => void;
  customDomain?: string;
}

export const CustomPortfolioModal: React.FC<CustomPortfolioModalProps> = ({
  member,
  onClose,
  onOpenSubdomain,
  onOpenInquiryModal,
  onOpenCredentialPack,
  isCurrentUser,
  onUpdateMember,
  customDomain = 'thefoundergrid.com'
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Editable local state for member
  const [editBio, setEditBio] = useState(member?.bio || '');
  const [editMission, setEditMission] = useState(member?.missionVision || '');
  const [editRevenue, setEditRevenue] = useState(member?.metrics.revenueOrAum || '');
  const [editShowEmail, setEditShowEmail] = useState(member?.privacy?.showEmail ?? false);
  const [editShowPhone, setEditShowPhone] = useState(member?.privacy?.showPhone ?? false);

  if (!member) return null;

  const portfolioUrl = `https://${customDomain}/portfolio/${member.subdomain}`;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSaveEdit = () => {
    if (onUpdateMember) {
      onUpdateMember({
        ...member,
        bio: editBio,
        missionVision: editMission,
        metrics: {
          ...member.metrics,
          revenueOrAum: editRevenue
        },
        privacy: {
          showEmail: editShowEmail,
          showPhone: editShowPhone,
          allowDirectInquiries: true
        }
      });
    }
    setIsEditing(false);
  };

  return (
    <div id="portfolio-modal-overlay" className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        id="custom-portfolio-card"
        className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col my-auto text-neutral-100"
      >
        {/* Top Control Bar */}
        <div className="sticky top-0 z-30 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-cinzel font-bold text-amber-400 tracking-wider uppercase flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Executive Founder Portfolio</span>
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-[11px] text-neutral-400 font-mono">
              ID: {member.subdomain}.{customDomain}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {onOpenCredentialPack && (
              <button
                onClick={() => onOpenCredentialPack(member)}
                className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-amber-500 text-neutral-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Credentials & Certificate</span>
              </button>
            )}

            {isCurrentUser && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-700 hover:border-amber-500 text-amber-400 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
            )}

            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-neutral-100 transition-colors"
              title="Copy shareable link"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Portfolio Content */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Executive Header Card */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 border-b border-neutral-800 pb-8">
            <div className="relative">
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 border-amber-500/60 shadow-xl"
              />
              <div className="absolute -bottom-1 -right-1 bg-neutral-950 rounded-full p-1 border border-amber-500/40">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-neutral-100">{member.name}</h1>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  {member.membershipBadge}
                </span>
                <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                  Verified {member.role}
                </span>
              </div>

              <div className="text-sm font-semibold text-neutral-300">
                {member.title} at <strong className="text-neutral-100">{member.companyName}</strong>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-neutral-400 font-mono pt-1">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{member.location}</span>
                </span>
                <span>•</span>
                <span className="text-amber-400">{member.industry}</span>
                <span>•</span>
                <span>Stage: <strong className="text-neutral-200">{member.fundingStage}</strong></span>
              </div>

              {/* Subdomain Pill */}
              <div className="pt-2">
                <button
                  onClick={() => onOpenSubdomain(member.subdomain)}
                  className="inline-flex items-center space-x-2 bg-neutral-900 border border-neutral-800 hover:border-amber-500/50 px-3.5 py-1.5 rounded-xl text-xs text-neutral-300 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-mono text-amber-400">{member.subdomain}.{customDomain}</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </button>
              </div>
            </div>

            {/* Connect Actions */}
            <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
              <a
                href={member.linkedinUrl || member.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-sky-400 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5"
              >
                <Linkedin className="w-4 h-4" />
                <span>Connect on LinkedIn</span>
              </a>

              {onOpenInquiryModal && (
                <button
                  onClick={() => onOpenInquiryModal(member)}
                  className="flex-1 sm:flex-initial py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center space-x-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Direct Inquiry Form</span>
                </button>
              )}
            </div>
          </div>

          {/* Edit Mode Panel */}
          {isEditing && (
            <div className="bg-neutral-900/80 border border-amber-500/40 rounded-2xl p-6 space-y-4 text-xs">
              <h3 className="font-cinzel text-sm font-bold text-amber-400">Edit Portfolio Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Executive Bio</label>
                  <textarea
                    rows={3}
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-neutral-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Mission & Vision Statement</label>
                  <textarea
                    rows={2}
                    value={editMission}
                    onChange={(e) => setEditMission(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-neutral-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-neutral-300 font-medium mb-1">Annual Revenue / AUM</label>
                  <input
                    type="text"
                    value={editRevenue}
                    onChange={(e) => setEditRevenue(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-neutral-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Privacy Toggles for Email & Phone */}
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                  <span className="font-bold text-neutral-200 block">Contact Privacy Controls:</span>
                  <label className="flex items-center space-x-2 text-neutral-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editShowEmail}
                      onChange={(e) => setEditShowEmail(e.target.checked)}
                      className="rounded bg-neutral-900 border-neutral-700 text-amber-500 focus:ring-amber-500"
                    />
                    <span>Show Email publicly on portfolio & subdomain</span>
                  </label>
                  <label className="flex items-center space-x-2 text-neutral-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editShowPhone}
                      onChange={(e) => setEditShowPhone(e.target.checked)}
                      className="rounded bg-neutral-900 border-neutral-700 text-amber-500 focus:ring-amber-500"
                    />
                    <span>Show Phone / WhatsApp publicly on portfolio & subdomain</span>
                  </label>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-neutral-800 text-neutral-300 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-5 py-2 bg-amber-500 text-neutral-950 font-bold rounded-xl"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Privacy & Direct Contact Strip */}
          <div className="bg-neutral-900/40 p-4 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-neutral-500" />
                {member.privacy?.showEmail ? (
                  <span className="font-mono text-amber-400 font-semibold">{member.email || 'contact@thefoundergrid.com'}</span>
                ) : (
                  <span className="text-neutral-500 flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span>Email Protected by Member Privacy</span>
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-neutral-500" />
                {member.privacy?.showPhone ? (
                  <span className="font-mono text-amber-400 font-semibold">{member.phone || '+91 98200 12345'}</span>
                ) : (
                  <span className="text-neutral-500 flex items-center space-x-1">
                    <Lock className="w-3 h-3" />
                    <span>Phone Protected by Member Privacy</span>
                  </span>
                )}
              </div>
            </div>

            <span className="text-[11px] text-neutral-500 font-mono">
              Inquiries route to Member Dashboard & Admin Audit Log
            </span>
          </div>

          {/* Operational Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 space-y-1">
              <span className="text-[11px] text-neutral-500 uppercase font-mono">Revenue / Scale</span>
              <div className="text-lg font-bold text-amber-400 font-mono">{member.metrics.revenueOrAum}</div>
            </div>
            <div className="bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 space-y-1">
              <span className="text-[11px] text-neutral-500 uppercase font-mono">Funding Stage</span>
              <div className="text-lg font-bold text-neutral-100 font-mono">{member.fundingStage}</div>
            </div>
            <div className="bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 space-y-1">
              <span className="text-[11px] text-neutral-500 uppercase font-mono">Total Capital Raised</span>
              <div className="text-lg font-bold text-emerald-400 font-mono">{member.metrics.fundingRaised || 'Undisclosed'}</div>
            </div>
            <div className="bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800 space-y-1">
              <span className="text-[11px] text-neutral-500 uppercase font-mono">Enterprise Team</span>
              <div className="text-lg font-bold text-neutral-100 font-mono">{member.metrics.teamSize}</div>
            </div>
          </div>

          {/* Mission & Vision Statement */}
          <div className="bg-gradient-to-r from-amber-950/20 via-neutral-900 to-neutral-950 p-6 rounded-2xl border border-amber-500/30 space-y-2">
            <h3 className="font-cinzel text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mission & Vision</span>
            </h3>
            <p className="text-sm text-neutral-200 italic leading-relaxed font-editorial">
              &quot;{member.missionVision}&quot;
            </p>
          </div>

          {/* Operational Core Values */}
          <div className="space-y-3">
            <h3 className="font-cinzel text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Core Operating Values
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {member.coreValues.map((val, idx) => (
                <div key={idx} className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800 text-xs font-medium text-neutral-200 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Services & Capabilities */}
          <div className="space-y-3">
            <h3 className="font-cinzel text-xs font-bold text-neutral-300 uppercase tracking-wider">
              Commercial Services & Strategic Capabilities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {member.services.map((svc) => (
                <div key={svc.title} className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 space-y-1.5">
                  <h4 className="font-bold text-sm text-neutral-100">{svc.title}</h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">{svc.description || svc.desc || ''}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Case Studies & Track Record (3-5 projects) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Featured Enterprise Case Studies & Track Record
              </h3>
              <span className="text-[11px] font-mono text-amber-400">
                {member.caseStudies.length} Verified Deployments
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {member.caseStudies.map((cs) => (
                <div key={cs.id} className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-neutral-100 text-sm">{cs.title}</span>
                      <span className="font-mono text-amber-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800 text-[10px]">
                        {cs.year}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400">Client: <strong className="text-neutral-200">{cs.client}</strong></div>
                    <p className="text-xs text-neutral-300 leading-relaxed">{cs.outcome}</p>
                  </div>

                  <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-semibold bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800">
                      Metric: {cs.metric}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approved Published Articles Grid */}
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-cinzel text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Publications on {member.subdomain}.{customDomain}
                </h3>
                <p className="text-xs text-neutral-500">
                  Approved editorial dispatches syndicated to global network
                </p>
              </div>
              <button
                onClick={() => onOpenSubdomain(member.subdomain)}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
              >
                <span>View All Articles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {member.articles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => onOpenSubdomain(member.subdomain)}
                  className="bg-neutral-900/60 border border-neutral-800 hover:border-amber-500/40 p-4 rounded-2xl space-y-2 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                    <span className="text-amber-400 font-sans font-semibold">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="font-bold text-sm text-neutral-100 hover:text-amber-400 transition-colors">
                    {art.title}
                  </h4>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {art.subtitle}
                  </p>
                  <div className="pt-1 text-[11px] text-neutral-500 font-mono">
                    Published: {art.publishedAt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
