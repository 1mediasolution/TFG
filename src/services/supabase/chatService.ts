import { getSupabase } from '../../lib/supabase/client';
import { ChatMessage, ChatChannel } from '../../types';

export const chatService = {
  async getChannels(): Promise<ChatChannel[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('chat_channels')
        .select('*')
        .order('created_at', { ascending: true });

      if (error || !data) return null;

      return data.map((row: any): ChatChannel => ({
        id: row.id,
        name: row.name,
        description: row.description,
        topic: row.topic || undefined,
        isPrivatePaid: row.is_private_paid,
        memberCount: row.member_count
      }));
    } catch (err) {
      console.error('Error fetching chat channels:', err);
      return null;
    }
  },

  async getMessages(channelId?: string): Promise<ChatMessage[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      let query = supabase.from('chat_messages').select('*').order('created_at', { ascending: true });
      if (channelId) {
        query = query.eq('channel_id', channelId);
      }
      const { data, error } = await query;
      if (error || !data) return null;

      return data.map((row: any): ChatMessage => ({
        id: row.id,
        channelId: row.channel_id,
        senderId: row.sender_id,
        senderName: row.sender_name,
        senderSubdomain: row.sender_subdomain,
        senderAvatar: row.sender_avatar,
        senderCompany: row.sender_company,
        recipientMemberId: row.recipient_member_id || undefined,
        text: row.text,
        content: row.text,
        timestamp: row.timestamp,
        referralCategory: row.referral_category as any,
        likesCount: row.likes_count
      }));
    } catch (err) {
      console.error('Error fetching chat messages:', err);
      return null;
    }
  },

  async sendMessage(msg: ChatMessage): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const { error } = await supabase.from('chat_messages').insert({
        id: msg.id,
        channel_id: msg.channelId,
        sender_id: msg.senderId,
        sender_name: msg.senderName,
        sender_subdomain: msg.senderSubdomain,
        sender_avatar: msg.senderAvatar,
        sender_company: msg.senderCompany,
        recipient_member_id: msg.recipientMemberId || null,
        text: msg.text,
        timestamp: msg.timestamp,
        referral_category: msg.referralCategory || 'Business Referral',
        likes_count: msg.likesCount || 0
      });

      return !error;
    } catch (err) {
      console.error('Error sending message to Supabase:', err);
      return false;
    }
  },

  subscribeToChannel(channelId: string, onNewMessage: (msg: ChatMessage) => void) {
    const supabase = getSupabase();
    if (!supabase) return () => {};

    const subscription = supabase
      .channel(`chat_${channelId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `channel_id=eq.${channelId}`
        },
        (payload: any) => {
          const row = payload.new;
          if (row) {
            onNewMessage({
              id: row.id,
              channelId: row.channel_id,
              senderId: row.sender_id,
              senderName: row.sender_name,
              senderSubdomain: row.sender_subdomain,
              senderAvatar: row.sender_avatar,
              senderCompany: row.sender_company,
              recipientMemberId: row.recipient_member_id || undefined,
              text: row.text,
              content: row.text,
              timestamp: row.timestamp,
              referralCategory: row.referral_category,
              likesCount: row.likes_count
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }
};
