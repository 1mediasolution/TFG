import React, { useState } from 'react';
import {
  MessageSquare,
  Lock,
  Send,
  Sparkles,
  ShieldCheck,
  Hash,
  Users,
  Handshake,
  Heart,
  Globe,
  Tag,
  ArrowUpRight,
  ExternalLink,
  Mail,
  Phone,
  Linkedin,
  Radio,
  UserCheck,
  X,
  MessageCircle
} from 'lucide-react';
import { ChatChannel, ChatMessage, FounderMember, VisitorInquiry } from '../../../types';

export interface DiscussionChatProps {
  channels: ChatChannel[];
  messages: ChatMessage[];
  currentChannelId: string;
  onSelectChannel: (channelId: string) => void;
  onSendMessage: (text: string, category?: ChatMessage['referralCategory'], recipientMemberId?: string) => void;
  currentUser: FounderMember;
  isPaidMember: boolean;
  onOpenMembershipModal: () => void;
  onOpenPortfolio: (member: FounderMember) => void;
  onOpenSubdomain: (subdomain: string) => void;
  onOpenInquiryModal?: (member: FounderMember) => void;
  allMembers: FounderMember[];
  customDomain?: string;
}

export const DiscussionChat: React.FC<DiscussionChatProps> = ({
  channels,
  messages,
  currentChannelId,
  onSelectChannel,
  onSendMessage,
  currentUser,
  isPaidMember,
  onOpenMembershipModal,
  onOpenPortfolio,
  onOpenSubdomain,
  onOpenInquiryModal,
  allMembers,
  customDomain = 'thefoundergrid.com'
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedReferralCategory, setSelectedReferralCategory] = useState<ChatMessage['referralCategory'] | ''>('Business Referral');
  const [activeTab, setActiveTab] = useState<'channels' | 'direct'>('channels');
  const [activeDirectMemberId, setActiveDirectMemberId] = useState<string>(allMembers[0]?.id || '');
  const [selectedPopoverMember, setSelectedPopoverMember] = useState<FounderMember | null>(null);

  // Active Channel & Messages
  const activeChannel = channels.find((c) => c.id === currentChannelId) || channels[0];
  const activeDirectMember = allMembers.find((m) => m.id === activeDirectMemberId) || allMembers[0];

  const displayedMessages = activeTab === 'channels'
    ? messages.filter((m) => m.channelId === activeChannel.id && !m.recipientMemberId)
    : messages.filter((m) =>
        (m.senderId === currentUser.id && m.recipientMemberId === activeDirectMember?.id) ||
        (m.senderId === activeDirectMember?.id && m.recipientMemberId === currentUser.id)
      );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (activeTab === 'channels') {
      onSendMessage(
        inputText.trim(),
        selectedReferralCategory ? (selectedReferralCategory as ChatMessage['referralCategory']) : undefined
      );
    } else {
      onSendMessage(
        inputText.trim(),
        'Direct Introduction',
        activeDirectMember?.id
      );
    }

    setInputText('');
  };

  const getMemberByIdOrSubdomain = (idOrSubdomain: string) => {
    return allMembers.find(
      (m) => m.id === idOrSubdomain || m.subdomain.toLowerCase() === idOrSubdomain.toLowerCase()
    );
  };

  return (
    <div id="discussion-chat-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-neutral-100">
      {/* Page Title & Status */}
      <div className="border-b border-neutral-800 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Handshake className="w-3.5 h-3.5" />
            <span>Community Roundtable & Real-Time Deal Network</span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-semibold text-neutral-100">
            Member Community & Networking
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Share ideas, request enterprise introductions, and close cross-border business referrals.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl flex items-center space-x-2 text-xs">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-[11px] text-neutral-300 font-mono">
              WebSocket (Socket.io) Active • $0 Per-Seat Cost
            </span>
          </div>

          <span className="text-[11px] px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono">
            {isPaidMember ? (
              <span className="text-emerald-400 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>Paid Access Active</span>
              </span>
            ) : (
              <span className="text-amber-400 flex items-center space-x-1">
                <Lock className="w-3 h-3 text-amber-500" />
                <span>Members Only</span>
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Main Chat Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px] relative">
        {/* Sidebar: Channels & 1:1 DMs */}
        <div className="lg:col-span-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Tab Switcher: Channels vs Direct Messages */}
            <div className="grid grid-cols-2 gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800 text-xs">
              <button
                onClick={() => setActiveTab('channels')}
                className={`py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'channels'
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Hash className="w-3.5 h-3.5" />
                <span>Channels</span>
              </button>

              <button
                onClick={() => setActiveTab('direct')}
                className={`py-2 px-3 rounded-lg font-bold transition-all flex items-center justify-center space-x-1.5 ${
                  activeTab === 'direct'
                    ? 'bg-amber-500 text-neutral-950 shadow-md'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>1-to-1 DMs</span>
              </button>
            </div>

            {/* Channels List */}
            {activeTab === 'channels' && (
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-wider font-mono text-neutral-500 px-3 py-1">
                  Community Channels
                </div>
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => onSelectChannel(channel.id)}
                    className={`w-full text-left px-3.5 py-3 rounded-xl text-xs transition-all flex items-start space-x-3 ${
                      currentChannelId === channel.id
                        ? 'bg-neutral-800/90 text-amber-300 border border-amber-500/30'
                        : 'text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200'
                    }`}
                  >
                    <Hash className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold flex items-center justify-between">
                        <span className="truncate">{channel.name}</span>
                        {channel.unreadCount && channel.unreadCount > 0 ? (
                          <span className="bg-amber-500 text-neutral-950 text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                            {channel.unreadCount}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">{channel.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* 1-to-1 DMs List */}
            {activeTab === 'direct' && (
              <div className="space-y-1">
                <div className="text-[10px] uppercase tracking-wider font-mono text-neutral-500 px-3 py-1">
                  Direct Messages (Founders & Investors)
                </div>
                {allMembers
                  .filter((m) => m.id !== currentUser.id)
                  .map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveDirectMemberId(m.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center space-x-3 ${
                        activeDirectMemberId === m.id
                          ? 'bg-neutral-800/90 text-amber-300 border border-amber-500/30'
                          : 'text-neutral-400 hover:bg-neutral-800/40 hover:text-neutral-200'
                      }`}
                    >
                      <div className="relative">
                        <img src={m.avatarUrl} alt={m.name} className="w-8 h-8 rounded-lg object-cover" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-neutral-900 absolute -bottom-0.5 -right-0.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-neutral-200 truncate">{m.name}</div>
                        <div className="text-[10px] text-neutral-400 truncate">{m.companyName}</div>
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Current User Pod */}
          <div className="mt-4 pt-4 border-t border-neutral-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-9 h-9 rounded-xl object-cover border border-amber-500/40"
              />
              <div>
                <div className="text-xs font-bold text-neutral-200">{currentUser.name}</div>
                <div className="text-[10px] text-amber-400 font-mono">{currentUser.subdomain}.{customDomain}</div>
              </div>
            </div>
            <button
              onClick={() => onOpenPortfolio(currentUser)}
              className="text-neutral-400 hover:text-amber-400 p-1.5"
              title="My Portfolio"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Conversation Stream */}
        <div className="lg:col-span-8 bg-neutral-900/60 border border-neutral-800 rounded-2xl flex flex-col justify-between overflow-hidden relative">
          {/* Header of Stream */}
          <div className="bg-neutral-950 border-b border-neutral-800 px-6 py-3 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              {activeTab === 'channels' ? (
                <>
                  <Hash className="w-4 h-4 text-amber-400" />
                  <div>
                    <span className="font-bold text-neutral-100">{activeChannel.name}</span>
                    <span className="text-neutral-500 text-[11px] ml-2 hidden sm:inline">{activeChannel.description}</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-2.5">
                  <img src={activeDirectMember?.avatarUrl} alt="" className="w-7 h-7 rounded-lg object-cover" />
                  <div>
                    <span className="font-bold text-neutral-100">{activeDirectMember?.name}</span>
                    <span className="text-emerald-400 text-[11px] ml-2">● Online (WebSocket Connected)</span>
                  </div>
                </div>
              )}
            </div>

            {activeTab === 'direct' && activeDirectMember && (
              <button
                onClick={() => setSelectedPopoverMember(activeDirectMember)}
                className="text-xs text-amber-400 hover:text-amber-300 font-medium flex items-center space-x-1"
              >
                <span>Member Profile & Contact</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[480px]">
            {displayedMessages.length === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-500">
                No messages yet in this discussion thread. Start the conversation!
              </div>
            ) : (
              displayedMessages.map((msg) => {
                const authorMember = getMemberByIdOrSubdomain(msg.senderSubdomain || msg.senderId);
                const isSelf = msg.senderId === currentUser.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start space-x-3 group ${isSelf ? 'flex-row-reverse space-x-reverse' : ''}`}
                  >
                    {/* Avatar with Popover Trigger */}
                    <button
                      onClick={() => authorMember && setSelectedPopoverMember(authorMember)}
                      className="shrink-0 focus:outline-none"
                      title="Click to view member contact popover"
                    >
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-9 h-9 rounded-xl object-cover border border-neutral-700 group-hover:border-amber-500/80 transition-colors"
                      />
                    </button>

                    <div className={`space-y-1 max-w-[82%] sm:max-w-lg ${isSelf ? 'text-right' : 'text-left'}`}>
                      <div className={`flex items-center space-x-2 text-[11px] ${isSelf ? 'justify-end' : 'justify-start'}`}>
                        <button
                          onClick={() => authorMember && setSelectedPopoverMember(authorMember)}
                          className="font-bold text-neutral-200 hover:text-amber-400 transition-colors"
                        >
                          {msg.senderName}
                        </button>
                        <span className="text-neutral-500">•</span>
                        <span className="text-neutral-500 font-mono text-[10px]">{msg.timestamp}</span>

                        {msg.referralCategory && (
                          <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded text-[9px] font-bold">
                            {msg.referralCategory}
                          </span>
                        )}
                      </div>

                      <div
                        className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isSelf
                            ? 'bg-amber-500/15 border border-amber-500/30 text-neutral-100'
                            : 'bg-neutral-950 border border-neutral-800 text-neutral-200'
                        }`}
                      >
                        {msg.content || msg.text}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Compose Box (or Gated Lock if not paid) */}
          {!isPaidMember ? (
            <div className="p-6 bg-neutral-950/90 border-t border-neutral-800 text-center space-y-3">
              <div className="flex items-center justify-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>Discussion & Referrals Gated to Paid Members</span>
              </div>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Only verified paid founders can send referral requests, engage in private channels, and access direct messaging.
              </p>
              <button
                onClick={onOpenMembershipModal}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl transition-all shadow-md inline-flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Activate Paid Membership to Chat</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="p-4 bg-neutral-950 border-t border-neutral-800 space-y-3">
              {activeTab === 'channels' && (
                <div className="flex items-center space-x-2 text-[11px] text-neutral-400">
                  <Tag className="w-3 h-3 text-amber-400" />
                  <span>Referral Tag:</span>
                  {(['Business Referral', 'Fundraising Intro', 'M&A Advisory', 'Talent / Co-Founder'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedReferralCategory(selectedReferralCategory === cat ? '' : cat)}
                      className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                        selectedReferralCategory === cat
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    activeTab === 'channels'
                      ? `Message #${activeChannel.name}...`
                      : `Direct message ${activeDirectMember?.name}...`
                  }
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />

                <button
                  type="submit"
                  className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl text-xs transition-all shadow-md flex items-center space-x-1.5 shrink-0"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Contact Popover Modal */}
      {selectedPopoverMember && (
        <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 max-w-md w-full space-y-5 text-xs shadow-2xl relative">
            <button
              onClick={() => setSelectedPopoverMember(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-neutral-900 text-neutral-400 hover:text-neutral-100"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Profile Overview */}
            <div className="flex items-center space-x-3.5">
              <img
                src={selectedPopoverMember.avatarUrl}
                alt={selectedPopoverMember.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/50"
              />
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-neutral-100">{selectedPopoverMember.name}</h3>
                  <span className="bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] px-1.5 py-0.2 rounded font-bold">
                    {selectedPopoverMember.membershipBadge}
                  </span>
                </div>
                <p className="text-xs text-neutral-400">{selectedPopoverMember.title} at {selectedPopoverMember.companyName}</p>
                <div className="text-[11px] text-amber-400 font-mono">
                  {selectedPopoverMember.subdomain}.{customDomain}
                </div>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed bg-neutral-900/60 p-3 rounded-xl border border-neutral-800">
              {selectedPopoverMember.bio}
            </p>

            {/* Privacy & Permission-based Email / Phone */}
            <div className="space-y-2 bg-neutral-900/40 p-3 rounded-xl border border-neutral-800/80">
              <div className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">
                Permission-Based Contact Info
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-neutral-300">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Email:</span>
                  </div>
                  {selectedPopoverMember.privacy?.showEmail ? (
                    <span className="font-mono text-amber-400 font-semibold">{selectedPopoverMember.email || 'contact@thefoundergrid.com'}</span>
                  ) : (
                    <span className="text-neutral-500 flex items-center space-x-1">
                      <Lock className="w-3 h-3" />
                      <span>Protected by Member Privacy Toggle</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-neutral-300">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Phone / Mobile:</span>
                  </div>
                  {selectedPopoverMember.privacy?.showPhone ? (
                    <span className="font-mono text-amber-400 font-semibold">{selectedPopoverMember.phone || '+91 98200 12345'}</span>
                  ) : (
                    <span className="text-neutral-500 flex items-center space-x-1">
                      <Lock className="w-3 h-3" />
                      <span>Protected by Member Privacy Toggle</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Connect Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setActiveTab('direct');
                  setActiveDirectMemberId(selectedPopoverMember.id);
                  setSelectedPopoverMember(null);
                }}
                className="py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Open 1:1 Chat</span>
              </button>

              <a
                href={selectedPopoverMember.linkedinUrl || selectedPopoverMember.socialLinks?.linkedin || 'https://linkedin.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
              >
                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                <span>Connect on LinkedIn</span>
              </a>

              {onOpenInquiryModal && (
                <button
                  onClick={() => {
                    const m = selectedPopoverMember;
                    setSelectedPopoverMember(null);
                    onOpenInquiryModal(m);
                  }}
                  className="col-span-2 py-2.5 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-neutral-950 font-bold rounded-xl text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Commercial Inquiry</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
