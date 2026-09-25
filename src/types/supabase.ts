export interface SupabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  isConnected: boolean;
  isConfigured: boolean;
}

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      members: {
        Row: {
          id: string;
          created_at: string;
          role: string;
          name: string;
          handle: string;
          subdomain: string;
          title: string;
          company_name: string;
          company_url: string | null;
          industry: string;
          location: string;
          avatar_url: string;
          cover_url: string | null;
          bio: string;
          mission_vision: string;
          core_values: string[];
          services: Json;
          case_studies: Json;
          funding_stage: string;
          metrics: Json;
          is_verified: boolean;
          membership_tier: string;
          membership_badge: string;
          membership_certificate_id: string;
          membership_joined_date: string;
          renewal_date: string | null;
          articles_published_this_week: number;
          weekly_article_quota: number;
          looking_for: string[];
          can_offer: string[];
          email: string | null;
          phone: string | null;
          linkedin_url: string | null;
          privacy_settings: Json | null;
        };
        Insert: Omit<Database['public']['Tables']['members']['Row'], 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['members']['Insert']>;
      };
      member_articles: {
        Row: {
          id: string;
          member_id: string;
          subdomain: string;
          title: string;
          subtitle: string;
          category: string;
          content: string;
          published_at: string;
          read_time: string;
          views: number;
          tags: string[];
          week_number: number;
          year: number;
          status: 'pending_review' | 'approved' | 'rejected';
          admin_feedback: string | null;
          submitted_at: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['member_articles']['Row'], 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['member_articles']['Insert']>;
      };
      news_articles: {
        Row: {
          id: string;
          title: string;
          slug: string | null;
          category: string;
          excerpt: string;
          content: string;
          author_name: string;
          author_role: string;
          author_avatar: string;
          author_subdomain: string | null;
          is_verified_founder: boolean;
          is_admin: boolean;
          published_at: string;
          read_time: string;
          views: number;
          image_url: string;
          key_takeaways: string[] | null;
          is_lead_editorial: boolean;
          is_featured: boolean;
          is_trending: boolean;
          tags: string[];
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['news_articles']['Row'], 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['news_articles']['Insert']>;
      };
      chat_channels: {
        Row: {
          id: string;
          name: string;
          description: string;
          topic: string | null;
          is_private_paid: boolean;
          member_count: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['chat_channels']['Row'], 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['chat_channels']['Insert']>;
      };
      chat_messages: {
        Row: {
          id: string;
          channel_id: string;
          sender_id: string;
          sender_name: string;
          sender_subdomain: string;
          sender_avatar: string;
          sender_company: string;
          recipient_member_id: string | null;
          text: string;
          timestamp: string;
          referral_category: string;
          likes_count: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['chat_messages']['Row'], 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['chat_messages']['Insert']>;
      };
      advertisements: {
        Row: {
          id: string;
          slot: string;
          title: string;
          sponsor: string;
          description: string;
          cta_text: string;
          cta_url: string;
          badge: string;
          banner_image_url: string | null;
          impressions: number;
          clicks: number;
          active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['advertisements']['Row'], 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['advertisements']['Insert']>;
      };
      visitor_inquiries: {
        Row: {
          id: string;
          target_member_id: string;
          target_member_name: string;
          target_subdomain: string;
          sender_name: string;
          sender_email: string;
          sender_phone: string | null;
          sender_company: string;
          intent_type: string;
          message: string;
          status: 'new' | 'reviewed' | 'responded';
          submitted_at: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['visitor_inquiries']['Row'], 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['visitor_inquiries']['Insert']>;
      };
      email_notifications: {
        Row: {
          id: string;
          recipient_email: string;
          recipient_name: string;
          subject: string;
          trigger_type: string;
          body: string;
          sent_at: string;
          read: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['email_notifications']['Row'], 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['email_notifications']['Insert']>;
      };
    };
  };
}
