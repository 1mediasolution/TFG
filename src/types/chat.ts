export interface ChatMessage {
  id: string;
  channelId: string;
  isDirectMessage?: boolean;
  recipientId?: string;
  recipientMemberId?: string;
  senderId: string;
  senderName: string;
  senderSubdomain: string;
  senderAvatar: string;
  senderCompany: string;
  text: string;
  content?: string;
  timestamp: string;
  referralCategory?:
    | 'Business Referral'
    | 'Investor Intro'
    | 'Partnership Lead'
    | 'Hiring / Talent'
    | 'Tech & Tools'
    | 'Direct Introduction'
    | 'Fundraising Intro'
    | 'M&A Advisory'
    | 'Talent / Co-Founder';
  likesCount?: number;
}

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  topic?: string;
  isPrivatePaid?: boolean;
  memberCount?: number;
  unreadCount?: number;
}
