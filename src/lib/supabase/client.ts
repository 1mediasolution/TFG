import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../../types/supabase';

// Safely access Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    supabaseUrl.includes('.supabase.co') &&
    supabaseAnonKey.length > 20
  );
};

export const getSupabaseConfig = () => ({
  url: supabaseUrl,
  anonKey: supabaseAnonKey,
  isConfigured: isSupabaseConfigured(),
  projectRef: supabaseUrl ? supabaseUrl.replace('https://', '').split('.')[0] : null
});

// Singleton client instance
let supabaseInstance: SupabaseClient<any> | null = null;

export const getSupabase = (): SupabaseClient<any> | null => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }
  return supabaseInstance;
};

// Health test method to ping Supabase connection
export const testSupabaseConnection = async (): Promise<{
  success: boolean;
  message: string;
  latencyMs?: number;
}> => {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: 'Supabase credentials (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) are not configured in environment.'
    };
  }

  const client = getSupabase();
  if (!client) {
    return {
      success: false,
      message: 'Unable to initialize Supabase client instance.'
    };
  }

  const startTime = Date.now();
  try {
    const { error } = await client.from('members').select('id', { count: 'exact', head: true });
    const latency = Date.now() - startTime;
    if (error) {
      // If table doesn't exist yet, it's connected to Supabase but schema is pending
      if (error.code === '42P01' || error.message.includes('relation "public.members" does not exist')) {
        return {
          success: true,
          message: 'Connected to Supabase! (Database schema migration pending. Run supabase/schema.sql in SQL Editor).',
          latencyMs: latency
        };
      }
      return {
        success: false,
        message: `Supabase query responded with error: ${error.message}`,
        latencyMs: latency
      };
    }
    return {
      success: true,
      message: 'Successfully connected to Supabase backend!',
      latencyMs: latency
    };
  } catch (err: any) {
    return {
      success: false,
      message: err?.message || 'Network error connecting to Supabase.'
    };
  }
};
