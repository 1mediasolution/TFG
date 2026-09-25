import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, Eye, TrendingUp, ArrowRight, ShieldCheck, Bookmark } from 'lucide-react';
import { NEWS_ARTICLES } from '../../data/mockData';
import { ARTICLE_CATEGORIES } from '../../utils/constants';

export const NewsSection = ({ onSelectArticle }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = NEWS_ARTICLES.filter((a) => {
    if (selectedCategory === 'All') return true;
    return a.category === selectedCategory;
  });

  const featured = filteredArticles[0] || NEWS_ARTICLES[0];
  const sideArticles = filteredArticles.slice(1, 5);

  return (
    <section className="py-8">
      {/* Category Tabs */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-6 overflow-x-auto gap-2">
        <div className="flex items-center gap-1.5 min-w-max">
          {ARTICLE_CATEGORIES.slice(0, 7).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white dark:bg-amber-500 dark:text-zinc-950 font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="hidden sm:block text-[11px] font-mono text-zinc-400">
          DAILY EDITORIAL DESK
        </span>
      </div>

      {/* Featured Lead Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Main Lead Story */}
        {featured && (
          <div
            onClick={() => onSelectArticle && onSelectArticle(featured)}
            className="lg:col-span-8 group cursor-pointer rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:border-amber-500/50 transition-all"
          >
            <div className="relative aspect-16/9 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <img
                src={featured.coverImage || featured.imageUrl || 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop'}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-black/80 text-amber-400 backdrop-blur-xs rounded-md">
                  {featured.category}
                </span>
                {(featured.trending || featured.isTrending) && (
                  <span className="px-2 py-1 text-[11px] font-semibold bg-rose-600 text-white rounded-md flex items-center gap-1">
                    <Flame className="w-3 h-3" /> Breaking
                  </span>
                )}
              </div>
            </div>

            <div className="p-6">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-950 dark:text-zinc-100 group-hover:text-amber-600 transition-colors leading-snug">
                {featured.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-2 line-clamp-2">
                {featured.summary || featured.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                    {typeof featured.author === 'object' && featured.author ? featured.author.name : (featured.author || 'Editorial Board')}
                  </span>
                  <span>•</span>
                  <span>{featured.readTime || '4 min read'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {featured.views || 1200}</span>
                  <span className="text-amber-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Read Story <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Column */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 pb-2 border-b border-zinc-200 dark:border-zinc-800">
            Top Executive Intelligence
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {sideArticles.map((art) => {
              const authorName = typeof art.author === 'object' && art.author ? art.author.name : (art.author || 'Staff Writer');
              const publishDate = art.publishedAt || art.date || 'Recent';

              return (
                <div
                  key={art.id}
                  onClick={() => onSelectArticle && onSelectArticle(art)}
                  className="py-3.5 first:pt-0 last:pb-0 group cursor-pointer"
                >
                  <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-amber-600 dark:text-amber-400 mb-1">
                    <span>{art.category}</span>
                    <span>•</span>
                    <span>{art.readTime || '3 min read'}</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-zinc-500">
                    <span>{authorName}</span>
                    <span>•</span>
                    <span>{publishDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
