import React from 'react';
import { Newspaper, Eye, ArrowUpRight, Clock } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const FounderArticles = ({ articles = [], onSelectArticle }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-amber-600" />
          <h3 className="font-serif text-lg font-bold text-zinc-950 dark:text-white">
            Published Subdomain Dispatches
          </h3>
        </div>
        <span className="text-xs font-mono text-zinc-400">{articles.length} Published</span>
      </div>

      {articles.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/40 text-xs text-zinc-500">
          No published dispatches yet. Use the Founder Studio to author your first syndicated article.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle && onSelectArticle(article)}
              className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:border-amber-500/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                    {article.category || 'Executive Analysis'}
                  </span>
                  <span>{formatDate(article.date)}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                  {article.summary || article.content?.slice(0, 140)}...
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {article.views || 140} reads
                </span>
                <span className="text-amber-600 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Read Dispatch <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FounderArticles;
