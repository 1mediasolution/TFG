import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { SupabaseStatusCard } from '../../components/features/admin/SupabaseStatusCard';
import { ArticleReview } from '../../components/admin/ArticleReview';
import { MemberManagement } from '../../components/admin/MemberManagement';
import { ShieldCheck, FileCheck, Users, Megaphone, CheckCircle2, TrendingUp } from 'lucide-react';
import { INITIAL_MEMBERS, INITIAL_ARTICLE_REVIEWS } from '../../data/mockData';

export const AdminDashboard = () => {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [reviewArticles, setReviewArticles] = useState(
    INITIAL_ARTICLE_REVIEWS.filter((a) => a.reviewStatus === 'pending')
  );

  const handleUpdateMember = (id, updates) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const handleUpdateArticleStatus = (id, status, feedback) => {
    setReviewArticles((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="flex-1 flex max-w-7xl w-full mx-auto py-6">
      <AdminSidebar />

      <main className="flex-1 min-w-0 p-6 sm:p-8 space-y-8">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Syndicate Governance & Editorial Board
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Supervise editorial submissions, verification standards, and publication subdomains.
          </p>
        </div>

        {/* Summary Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[10px] uppercase font-mono">Members</span>
              <Users className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {members.length}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold mt-1">
              Active Vetted
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[10px] uppercase font-mono">Review Queue</span>
              <FileCheck className="w-4 h-4 text-rose-500" />
            </div>
            <div className="font-serif text-2xl font-bold text-rose-600">
              {reviewArticles.length}
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Pending syndication
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[10px] uppercase font-mono">Subdomains</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              850+
            </div>
            <div className="text-[11px] text-amber-600 font-semibold mt-1">
              Automated SSL Active
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[10px] uppercase font-mono">Verification</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="font-serif text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              100%
            </div>
            <div className="text-[11px] text-zinc-500 mt-1">
              Protocol v2.4 Certified
            </div>
          </div>
        </div>

        {/* Supabase Integration Live Status Card */}
        <SupabaseStatusCard />

        {/* Pending Article Reviews */}
        <ArticleReview
          articles={reviewArticles}
          onUpdateStatus={handleUpdateArticleStatus}
        />

        {/* Member Management Preview */}
        <MemberManagement
          members={members}
          onUpdateMember={handleUpdateMember}
        />
      </main>
    </div>
  );
};

export default AdminDashboard;
