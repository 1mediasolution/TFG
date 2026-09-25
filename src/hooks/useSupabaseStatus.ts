import { useState, useEffect, useCallback } from 'react';
import { isSupabaseConfigured, getSupabaseConfig, testSupabaseConnection } from '../lib/supabase/client';

export interface SupabaseStatusState {
  isConfigured: boolean;
  isConnected: boolean;
  isChecking: boolean;
  latencyMs?: number;
  message: string;
  projectRef: string | null;
  url: string;
}

export const useSupabaseStatus = () => {
  const config = getSupabaseConfig();
  const [status, setStatus] = useState<SupabaseStatusState>({
    isConfigured: config.isConfigured,
    isConnected: false,
    isChecking: false,
    message: config.isConfigured
      ? 'Configured in environment. Testing connection...'
      : 'Supabase credentials pending (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)',
    projectRef: config.projectRef,
    url: config.url
  });

  const checkStatus = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      setStatus({
        isConfigured: false,
        isConnected: false,
        isChecking: false,
        message: 'Supabase is not configured yet. Using local state simulation with ready-to-connect schema.',
        projectRef: null,
        url: ''
      });
      return;
    }

    setStatus((prev) => ({ ...prev, isChecking: true }));
    const result = await testSupabaseConnection();
    setStatus({
      isConfigured: true,
      isConnected: result.success,
      isChecking: false,
      latencyMs: result.latencyMs,
      message: result.message,
      projectRef: getSupabaseConfig().projectRef,
      url: getSupabaseConfig().url
    });
  }, []);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  return {
    ...status,
    refreshStatus: checkStatus
  };
};
