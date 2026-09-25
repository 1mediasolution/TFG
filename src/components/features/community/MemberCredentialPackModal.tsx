import React, { useState } from 'react';
import {
  X,
  Award,
  FileText,
  ShieldCheck,
  Download,
  Printer,
  Copy,
  CheckCircle,
  ExternalLink,
  Sparkles,
  QrCode,
  Building,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { FounderMember } from '../../../types';
import { FounderGridLogo } from '../../common/FounderGridLogo';

export interface MemberCredentialPackModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: FounderMember;
  customDomain?: string;
}

export const MemberCredentialPackModal: React.FC<MemberCredentialPackModalProps> = ({
  isOpen,
  onClose,
  member,
  customDomain = 'thefoundergrid.com'
}) => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'certificate' | 'badge' | 'letter'>('pdf');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyBadge = (snippet: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const badgeEmbedCode = `<!-- The Founder Grid Verified Credential Badge -->
<a href="https://${member.subdomain}.${customDomain}" target="_blank" rel="noopener noreferrer">
  <img src="https://${customDomain}/badges/${member.membershipBadge.toLowerCase().replace(/\s+/g, '-')}.svg" alt="Verified Member of The Founder Grid - ${member.name}" width="220" height="60" />
</a>`;

  return (
    <div id="credential-pack-overlay" className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-5xl max-h-[95vh] overflow-y-auto shadow-2xl relative flex flex-col my-auto text-neutral-100">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-cinzel text-base font-bold text-neutral-100">Member Assets & Credentials Pack</span>
                <span className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded font-mono">
                  Verified Active
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                {member.name} • {member.companyName} ({member.membershipCertificateId})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 rounded-xl text-xs font-semibold transition-colors flex items-center space-x-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF (A4)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-neutral-800 bg-neutral-900/40 px-6 py-2 flex flex-wrap gap-2 text-xs">
          <button
            onClick={() => setActiveTab('pdf')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'pdf'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>1-Click A4 Portfolio PDF</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'certificate'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Verifiable Membership Certificate</span>
          </button>

          <button
            onClick={() => setActiveTab('badge')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'badge'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dynamic Member Badge</span>
          </button>

          <button
            onClick={() => setActiveTab('letter')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'letter'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-md'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Official Recommendation Letter</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {/* TAB 1: 1-CLICK A4 PORTFOLIO PDF */}
          {activeTab === 'pdf' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-neutral-400 bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
                <div className="flex items-center space-x-2">
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>Formatted for Standard ISO A4 Executive Briefing Document</span>
                </div>
                <button
                  onClick={handlePrint}
                  className="text-amber-400 hover:text-amber-300 font-bold underline"
                >
                  Click here to Save as PDF
                </button>
              </div>

              {/* A4 Sheet Container */}
              <div id="printable-a4-portfolio" className="bg-neutral-900/90 border border-neutral-700/80 rounded-2xl p-8 sm:p-12 space-y-8 max-w-4xl mx-auto shadow-2xl text-neutral-100">
                {/* Document Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-amber-500/80 pb-6 gap-4">
                  <div>
                    <div className="font-cinzel text-xl font-bold tracking-wider text-amber-400">
                      THE FOUNDER GRID
                    </div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
                      Executive Dossier & Credential Report
                    </div>
                  </div>
                  <div className="text-right text-xs font-mono text-neutral-400">
                    <div>Credential ID: <span className="text-neutral-200 font-bold">{member.membershipCertificateId}</span></div>
                    <div>Domain: <span className="text-amber-400">{member.subdomain}.{customDomain}</span></div>
                  </div>
                </div>

                {/* Profile Overview */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="w-24 h-24 rounded-2xl object-cover border-2 border-amber-500/50 shadow-md"
                  />
                  <div className="space-y-2 flex-1 text-center sm:text-left">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <h2 className="text-2xl font-bold font-editorial text-neutral-100">{member.name}</h2>
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded text-[10px] font-bold">
                        {member.membershipBadge}
                      </span>
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded text-[10px] font-bold">
                        Verified {member.role}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-neutral-300">
                      {member.title} • {member.companyName}
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-neutral-400 pt-1 font-mono">
                      <span>Location: <strong className="text-neutral-200">{member.location}</strong></span>
                      <span>Stage: <strong className="text-neutral-200">{member.fundingStage}</strong></span>
                      <span>Scale: <strong className="text-amber-400">{member.metrics.revenueOrAum}</strong></span>
                      <span>Team: <strong className="text-neutral-200">{member.metrics.teamSize}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Mission & Vision */}
                <div className="bg-neutral-950/70 p-5 rounded-xl border border-neutral-800 space-y-2">
                  <h4 className="text-xs font-bold font-cinzel text-amber-400 uppercase tracking-wider">
                    Executive Mission & Vision
                  </h4>
                  <p className="text-xs text-neutral-300 italic leading-relaxed">
                    &quot;{member.missionVision}&quot;
                  </p>
                </div>

                {/* Core Values */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold font-cinzel text-amber-400 uppercase tracking-wider">
                    Operational Core Values
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {member.coreValues.map((val, idx) => (
                      <div key={idx} className="bg-neutral-950/60 p-2.5 rounded-lg border border-neutral-800 text-[11px] text-neutral-300 font-medium">
                        • {val}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured Case Studies */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold font-cinzel text-amber-400 uppercase tracking-wider">
                    Featured Enterprise Case Studies & Track Record
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {member.caseStudies.map((cs) => (
                      <div key={cs.id} className="bg-neutral-950/60 p-4 rounded-xl border border-neutral-800 space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-neutral-200">{cs.title}</span>
                          <span className="text-amber-400 font-mono">{cs.year}</span>
                        </div>
                        <p className="text-xs text-neutral-400">{cs.outcome}</p>
                        <div className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/40 p-1.5 rounded border border-emerald-800/40">
                          Impact: {cs.metric}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Published Articles Bibliography */}
                <div className="space-y-2 border-t border-neutral-800 pt-4">
                  <h4 className="text-xs font-bold font-cinzel text-amber-400 uppercase tracking-wider">
                    Approved Publications on {member.subdomain}.{customDomain}
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {member.articles.map((art) => (
                      <div key={art.id} className="flex items-center justify-between text-neutral-300 bg-neutral-950/40 p-2 rounded">
                        <span className="font-medium">{art.title}</span>
                        <span className="text-[11px] text-neutral-500 font-mono">{art.publishedAt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Document Footer */}
                <div className="border-t border-neutral-800 pt-4 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                  <span>Issued by The Founder Grid Syndicate</span>
                  <span>Verifiable at https://{customDomain}/verify/{member.membershipCertificateId}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VERIFIABLE MEMBERSHIP CERTIFICATE */}
          {activeTab === 'certificate' && (
            <div className="space-y-6">
              {/* Certificate Frame */}
              <div className="bg-gradient-to-b from-neutral-900 via-neutral-950 to-neutral-900 p-3 sm:p-6 rounded-3xl border-4 border-amber-500/60 shadow-2xl max-w-3xl mx-auto text-center space-y-6 relative overflow-hidden">
                {/* Corner Accents */}
                <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
                <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

                <div className="pt-6 space-y-3">
                  <div className="flex justify-center">
                    <FounderGridLogo variant="mark" size="lg" theme="dark" />
                  </div>
                  <div className="font-cinzel text-xs sm:text-sm uppercase tracking-widest text-amber-400 font-semibold">
                    The Founder Grid Syndicate of Business & Finance
                  </div>
                  <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-neutral-100 tracking-wide">
                    Certificate of Executive Membership
                  </h3>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
                </div>

                <div className="space-y-3 max-w-xl mx-auto">
                  <p className="text-xs text-neutral-400 uppercase tracking-widest">
                    This is to formally certify that
                  </p>
                  <h4 className="font-editorial text-3xl sm:text-4xl text-amber-300 font-bold">
                    {member.name}
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Founder of <strong className="text-neutral-100">{member.companyName}</strong> has been inducted into The Founder Grid Syndicate under the designation of <strong className="text-amber-400">{member.membershipBadge}</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 border-y border-neutral-800 py-4 max-w-xl mx-auto text-xs text-neutral-400 font-mono">
                  <div>
                    <span className="block text-[10px] text-neutral-500 uppercase">Credential ID</span>
                    <span className="font-bold text-neutral-200">{member.membershipCertificateId}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-500 uppercase">Subdomain Hub</span>
                    <span className="font-bold text-amber-400">{member.subdomain}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-neutral-500 uppercase">Induction Date</span>
                    <span className="font-bold text-neutral-200">{member.membershipJoinedDate}</span>
                  </div>
                </div>

                {/* Signatures & Seal */}
                <div className="flex items-center justify-between max-w-xl mx-auto pt-4 text-left">
                  <div>
                    <div className="font-editorial text-base italic text-neutral-300">A. K. Sterling</div>
                    <div className="text-[10px] text-neutral-500 border-t border-neutral-700 pt-1">
                      President of the Syndicate
                    </div>
                  </div>

                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-400/80 flex items-center justify-center p-1 shadow-inner bg-amber-500/10">
                    <div className="w-full h-full rounded-full border border-amber-400 flex items-center justify-center text-[8px] font-cinzel font-bold text-amber-300 text-center leading-tight">
                      OFFICIAL<br/>SEAL
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-editorial text-base italic text-neutral-300">V. R. Malhotra</div>
                    <div className="text-[10px] text-neutral-500 border-t border-neutral-700 pt-1">
                      Editorial Review Board
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DYNAMIC MEMBER BADGE */}
          {activeTab === 'badge' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-2">
                <h3 className="font-cinzel text-xl font-bold text-neutral-100">Dynamic Syndicate Member Badge</h3>
                <p className="text-xs text-neutral-400">
                  Embed your verified badge on your personal website, investor deck, or GitHub profile.
                </p>
              </div>

              {/* Badge Preview */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-4">
                <div className="p-4 rounded-2xl bg-neutral-950 border border-amber-500/40 shadow-xl flex items-center space-x-3.5">
                  <FounderGridLogo variant="icon" size="sm" />
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                      The Founder Grid
                    </div>
                    <div className="font-bold text-sm text-neutral-100">{member.membershipBadge}</div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      Verified ID: {member.membershipCertificateId}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-neutral-400">
                  Tier: <strong className="text-amber-400">{member.membershipBadge}</strong> (Upgrades with publishing tenure)
                </div>
              </div>

              {/* Embed Code */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <label className="font-medium">HTML Embed Snippet</label>
                  <button
                    onClick={() => handleCopyBadge(badgeEmbedCode)}
                    className="text-amber-400 hover:text-amber-300 flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy Snippet'}</span>
                  </button>
                </div>
                <pre className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 font-mono text-xs text-amber-300 overflow-x-auto whitespace-pre-wrap">
                  {badgeEmbedCode}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: OFFICIAL RECOMMENDATION LETTER */}
          {activeTab === 'letter' && (
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-8 sm:p-12 max-w-3xl mx-auto space-y-6 text-neutral-200">
              <div className="border-b border-neutral-800 pb-4 flex items-center justify-between">
                <div>
                  <div className="font-cinzel text-lg font-bold text-amber-400">THE FOUNDER GRID</div>
                  <div className="text-[10px] text-neutral-400 uppercase font-mono">Editorial Board & Syndicate Secretariat</div>
                </div>
                <div className="text-xs text-neutral-400 font-mono">Date: September 2026</div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-neutral-300 font-editorial">
                <p><strong>To:</strong> Institutional Partners, Venture Investment Committees & Enterprise Clients</p>
                <p><strong>Subject:</strong> Official Letter of Commercial Standing & Verification for <strong>{member.name}</strong> ({member.companyName})</p>

                <p>
                  This official memorandum certifies that <strong>{member.name}</strong> is an active, vetted member in good standing of The Founder Grid under Certificate ID <strong>{member.membershipCertificateId}</strong>.
                </p>

                <p>
                  During their tenure, {member.name} has demonstrated exemplary domain authority in {member.industry}, maintaining verified publications across their dedicated institutional subdomain (<em>{member.subdomain}.{customDomain}</em>) and participating in peer referral governance.
                </p>

                <p>
                  Our editorial review board and venture council validate {member.companyName}&apos;s operational integrity and endorse {member.name} for institutional commercial contracts, venture syndications, and high-impact partnerships.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div className="text-xs">
                  <div className="font-bold text-neutral-200">Editorial Review Secretariat</div>
                  <div className="text-[11px] text-neutral-500">The Founder Grid Global Network</div>
                </div>
                <div className="text-xs font-mono text-amber-400">
                  Status: Diligence Passed
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
