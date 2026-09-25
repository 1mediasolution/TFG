import React, { useState } from 'react';
import { X, Send, ShieldCheck, Mail, Building, User, Phone, Sparkles, CheckCircle2 } from 'lucide-react';
import { FounderMember, VisitorInquiry } from '../types';

interface InquiryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetMember: FounderMember | null;
  onSubmitInquiry: (inquiry: Omit<VisitorInquiry, 'id' | 'submittedAt' | 'status'>) => void;
  customDomain?: string;
}

export const InquiryFormModal: React.FC<InquiryFormModalProps> = ({
  isOpen,
  onClose,
  targetMember,
  onSubmitInquiry,
  customDomain = 'thefoundergrid.com'
}) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderCompany, setSenderCompany] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [intentType, setIntentType] = useState<VisitorInquiry['intentType']>('Clients');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen || !targetMember) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) return;

    onSubmitInquiry({
      targetMemberId: targetMember.id,
      targetMemberName: targetMember.name,
      targetSubdomain: targetMember.subdomain,
      senderName,
      senderEmail,
      senderCompany: senderCompany || 'Independent Enterprise',
      senderPhone: senderPhone || undefined,
      intentType,
      message
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      // Reset form
      setSenderName('');
      setSenderEmail('');
      setSenderCompany('');
      setSenderPhone('');
      setMessage('');
    }, 2200);
  };

  return (
    <div id="inquiry-form-overlay" className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl relative flex flex-col my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-950 p-6 border-b border-neutral-800 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg bg-neutral-900 text-neutral-400 hover:text-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-3">
            <img
              src={targetMember.avatarUrl}
              alt={targetMember.name}
              className="w-12 h-12 rounded-xl object-cover border-2 border-amber-500/50 shadow-md"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-neutral-100 text-base sm:text-lg">{targetMember.name}</span>
                <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
                  {targetMember.subdomain}.{customDomain}
                </span>
              </div>
              <p className="text-xs text-neutral-400">{targetMember.title} at {targetMember.companyName}</p>
            </div>
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-neutral-100">Inquiry Dispatched Successfully</h3>
            <p className="text-xs text-neutral-300 max-w-sm mx-auto leading-relaxed">
              Your inquiry has been routed to {targetMember.name}&apos;s executive dashboard and logged in the Syndicate Admin Audit. An instant email alert was dispatched.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="bg-neutral-900/60 p-3 rounded-xl border border-neutral-800 text-[11px] text-neutral-300 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Encrypted Executive Dispatch • Admin Audit Logged</span>
              </div>
              <span className="text-neutral-500 font-mono">Priority Route</span>
            </div>

            {/* Intent Category */}
            <div>
              <label className="block text-neutral-300 font-medium mb-1.5">
                Primary Intent / Collaboration Reason <span className="text-amber-400">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Clients', 'Capital', 'Partnership', 'Distributors', 'Mentorship', 'General'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setIntentType(type)}
                    className={`py-2 px-2 rounded-lg border text-center transition-all ${
                      intentType === type
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Sender Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-medium mb-1">
                  Your Full Name <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Vikram Singhania"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-medium mb-1">
                  Executive Work Email <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="v.singhania@apexcapital.in"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-medium mb-1">Company / Organization</label>
                <div className="relative">
                  <Building className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                  <input
                    type="text"
                    value={senderCompany}
                    onChange={(e) => setSenderCompany(e.target.value)}
                    placeholder="e.g. Reliance Growth Fund"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 font-medium mb-1">Phone / WhatsApp (Optional)</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                  <input
                    type="text"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="+91 98200 54321"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-3 py-2.5 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label className="block text-neutral-400 font-medium mb-1">
                Collaboration Brief / Message <span className="text-amber-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="State your strategic objective, potential synergies, or context for the introduction..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500 leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">
                Directly alerts {targetMember.name}&apos;s verified inbox
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold rounded-xl shadow-lg transition-all flex items-center space-x-2"
              >
                <span>Send Direct Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
