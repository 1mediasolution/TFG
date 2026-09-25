export type EmailTriggerType =
  | 'article_approved'
  | 'article_rejected'
  | 'article_submitted'
  | 'quota_reached'
  | 'quota_reset'
  | 'renewal_15_days'
  | 'renewal_3_days'
  | 'inbound_lead';

export interface AutomatedEmailNotification {
  id: string;
  recipientEmail: string;
  recipientName: string;
  subject: string;
  triggerType: EmailTriggerType;
  body: string;
  sentAt: string;
  read: boolean;
}
