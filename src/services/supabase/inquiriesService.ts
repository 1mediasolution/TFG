import { getSupabase } from '../../lib/supabase/client';
import { VisitorInquiry } from '../../types';

export const inquiriesService = {
  async getInquiries(): Promise<VisitorInquiry[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('visitor_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) return null;

      return data.map((row: any): VisitorInquiry => ({
        id: row.id,
        targetMemberId: row.target_member_id,
        targetMemberName: row.target_member_name,
        targetSubdomain: row.target_subdomain,
        senderName: row.sender_name,
        senderEmail: row.sender_email,
        senderPhone: row.sender_phone || undefined,
        senderCompany: row.sender_company,
        intentType: row.intent_type,
        message: row.message,
        submittedAt: row.submitted_at,
        status: row.status
      }));
    } catch (err) {
      console.error('Error fetching inquiries from Supabase:', err);
      return null;
    }
  },

  async createInquiry(inquiry: VisitorInquiry): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const { error } = await supabase.from('visitor_inquiries').insert({
        id: inquiry.id,
        target_member_id: inquiry.targetMemberId,
        target_member_name: inquiry.targetMemberName,
        target_subdomain: inquiry.targetSubdomain,
        sender_name: inquiry.senderName,
        sender_email: inquiry.senderEmail,
        sender_phone: inquiry.senderPhone || null,
        sender_company: inquiry.senderCompany,
        intent_type: inquiry.intentType,
        message: inquiry.message,
        status: inquiry.status,
        submitted_at: inquiry.submittedAt
      });

      return !error;
    } catch (err) {
      console.error('Error creating inquiry in Supabase:', err);
      return false;
    }
  },

  async updateInquiryStatus(inquiryId: string, status: VisitorInquiry['status']): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const { error } = await supabase
        .from('visitor_inquiries')
        .update({ status })
        .eq('id', inquiryId);

      return !error;
    } catch (err) {
      console.error('Error updating inquiry status in Supabase:', err);
      return false;
    }
  }
};
