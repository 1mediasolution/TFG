export interface VisitorInquiry {
  id: string;
  targetMemberId: string;
  targetMemberName: string;
  targetSubdomain: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  senderCompany: string;
  intentType: 'Clients' | 'Capital' | 'Partnership' | 'Distributors' | 'Mentorship' | 'General' | string;
  message: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'responded';
}
