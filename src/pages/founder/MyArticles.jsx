import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/common/Button';
import { PlusCircle, Newspaper, Eye, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/formatters';

export const MyArticles = () => {
  const auth = useAuth();
  const articles = auth.user?.articles || [];

  return (
    <DashboardLayout
      title="My Published Dispatches"
      subtitle="Articles syndicated across The Founder Grid and your custom publication subdomain."
      actions={
        <Link to="/founder/create-article">
          <Button variant="gold" size="sm" icon={PlusCircle}>
            Author New Dispatch
          </Button>
        </Link>
      }
    >
      <div className="space-y-4">
        {articles.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 space-y-3">
            <Newspaper className="w-10 h-10 text-zinc-400 mx-auto" />
            <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              No articles published yet
            </h4>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Draft and publish your first business analysis or market breakdown to syndicate to the network.
            </p>
            <Link to="/founder/create-article">
              <Button variant="gold" size="sm" icon={PlusCircle}>
                Open Editorial Composer
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((art) => (
              <div
                key={art.id}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                    <span className="font-mono uppercase font-bold text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                      {art.category || 'Analysis'}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Published
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100 line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-2 line-clamp-2 leading-relaxed">
                    {art.summary || art.content?.slice(0, 140)}...
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{formatDate(art.date)}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{art.views || 45} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyArticles;
