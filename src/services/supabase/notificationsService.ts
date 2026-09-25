import { getSupabase } from '../../lib/supabase/client';
import { AutomatedEmailNotification, EmailTriggerType } from '../../types';

export const notificationsService = {
  async getNotifications(): Promise<AutomatedEmailNotification[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('email_notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((row: any): AutomatedEmailNotification => ({
        id: row.id,
        recipientEmail: row.recipient_email,
        recipientName: row.recipient_name,
        subject: row.subject,
        triggerType: row.trigger_type as EmailTriggerType,
        body: row.body,
        sentAt: row.sent_at,
        read: row.read
      }));
    } catch (err) {
      console.error('Error fetching notifications from Supabase:', err);
      return null;
    }
  },

  async logNotification(notification: AutomatedEmailNotification): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const { error } = await supabase.from('email_notifications').insert({
        id: notification.id,
        recipient_email: notification.recipientEmail,
        recipient_name: notification.recipientName,
        subject: notification.subject,
        trigger_type: notification.triggerType,
        body: notification.body,
        sent_at: notification.sentAt,
        read: notification.read
      });

      return !error;
    } catch (err) {
      console.error('Error logging notification in Supabase:', err);
      return false;
    }
  }
};
