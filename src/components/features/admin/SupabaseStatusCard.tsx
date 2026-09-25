import React, { useState } from 'react';
import {
  Database,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Copy,
  ExternalLink,
  Shield,
  Layers,
  Terminal,
  Zap,
  Server
} from 'lucide-react';
import { useSupabaseStatus } from '../../../hooks/useSupabaseStatus';

export const SupabaseStatusCard: React.FC = () => {
  const { isConfigured, isConnected, isChecking, latencyMs, message, projectRef, url, refreshStatus } = useSupabaseStatus();
  const [copiedEnv, setCopiedEnv] = useState(false);

  const envSample = `# Supabase Backend Connection Credentials
VITE_SUPABASE_URL=https://${projectRef || 'your-project-id'}.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...your_anon_public_key...`;

  const handleCopyEnv = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(envSample);
      setCopiedEnv(true);
      setTimeout(() => setCopiedEnv(false), 2500);
    }
  };

  return (
    <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 space-y-5 text-neutral-100 shadow-xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-neutral-100 text-sm sm:text-base">Supabase Backend Infrastructure</h3>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  isConnected
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : isConfigured
                    ? 'bg-amber-950 text-amber-400 border-amber-800'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-700'
                }`}
              >
                {isConnected ? '● Connected' : isConfigured ? '○ Configured (Checking)' : '○ Ready for Supabase'}
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Clean separation of services, type-safe client, and relational Postgres tables.
            </p>
          </div>
        </div>

        <button
          onClick={refreshStatus}
          disabled={isChecking}
          className="px-3.5 py-1.5 bg-neutral-950 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isChecking ? 'animate-spin' : ''}`} />
          <span>{isChecking ? 'Pinging...' : 'Test Connection'}</span>
        </button>
      </div>

      {/* Status Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800 space-y-1">
          <span className="text-[10px] font-mono text-neutral-500 uppercase">Supabase Endpoint</span>
          <div className="font-mono text-neutral-200 truncate">
            {url || 'Not set in .env yet'}
          </div>
        </div>

        <div className="bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800 space-y-1">
          <span className="text-[10px] font-mono text-neutral-500 uppercase">Architecture Mode</span>
          <div className="font-mono text-amber-400 font-semibold">
            {isConnected ? 'Live Supabase Cloud' : 'Isolated Service Layer'}
          </div>
        </div>

        <div className="bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800 space-y-1">
          <span className="text-[10px] font-mono text-neutral-500 uppercase">Response Latency</span>
          <div className="font-mono text-emerald-400 font-semibold">
            {latencyMs !== undefined ? `${latencyMs} ms` : '—'}
          </div>
        </div>
      </div>

      {/* Message Output */}
      <div className={`p-3.5 rounded-xl text-xs flex items-start space-x-2.5 ${
        isConnected
          ? 'bg-emerald-950/40 border border-emerald-800 text-emerald-300'
          : 'bg-neutral-950 border border-neutral-800 text-neutral-300'
      }`}>
        {isConnected ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <Server className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        )}
        <div className="flex-1 leading-relaxed">
          {message}
        </div>
      </div>

      {/* Environment Config Quick-Snippet */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-400">
            Environment Variables (.env)
          </span>
          <button
            onClick={handleCopyEnv}
            className="text-amber-400 hover:text-amber-300 flex items-center space-x-1"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedEnv ? 'Copied!' : 'Copy Variables'}</span>
          </button>
        </div>
        <pre className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 font-mono text-xs text-amber-300 overflow-x-auto">
          {envSample}
        </pre>
      </div>

      {/* Ready-made SQL Migrations Info */}
      <div className="bg-neutral-950/70 p-4 rounded-xl border border-neutral-800 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-neutral-200 flex items-center space-x-1.5">
            <Terminal className="w-4 h-4 text-amber-400" />
            <span>Pre-built Migration Scripts Available</span>
          </span>
          <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
            supabase/schema.sql & supabase/seed.sql
          </span>
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed">
          Your project includes complete Postgres DDL with Row Level Security (RLS) policies for members, articles, discussion chat channels, advertisements, and inbound leads. Run them directly in the Supabase SQL Editor.
        </p>
      </div>
    </div>
  );
};
