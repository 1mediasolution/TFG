import React, { useState } from 'react';
import { FileCheck, CheckCircle2, XCircle, Clock, Eye, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { formatDate } from '../../utils/formatters';

export const ArticleReview = ({ articles = [], onUpdateStatus }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleApprove = (id) => {
    if (onUpdateStatus) onUpdateStatus(id, 'approved', 'Meets editorial standards.');
    setSelectedArticle(null);
    setFeedback('');
  };

  const handleReject = (id) => {
    if (onUpdateStatus) onUpdateStatus(id, 'rejected', feedback || 'Revision requested.');
    setSelectedArticle(null);
    setFeedback('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Pending Editorial Review Queue
          </h3>
          <p className="text-xs text-zinc-500">
            Articles submitted by members for syndication and subdomain publication.
          </p>
        </div>
        <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600">
          {articles.length} in Queue
        </span>
      </div>

      {articles.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 text-xs text-zinc-500">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          Queue cleared! All member submissions have been reviewed and published.
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 font-bold text-zinc-600 dark:text-zinc-300">
                    {article.category}
                  </span>
                  <span className="text-zinc-400">•</span>
                  <span className="font-medium text-amber-600">
                    By {typeof article.author === 'object' && article.author ? article.author.name : (article.author || article.authorSubdomain || 'Syndicate Member')}
                  </span>
                  <span className="text-zinc-400">•</span>
                  <span className="text-zinc-400 font-mono">{formatDate(article.date)}</span>
                </div>
                <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
                  {article.title}
                </h4>
                <p className="text-xs text-zinc-500 line-clamp-2">
                  {article.summary || article.content}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedArticle(article)}
                >
                  Inspect
                </Button>
                <Button
                  size="sm"
                  variant="gold"
                  icon={CheckCircle2}
                  onClick={() => handleApprove(article.id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  icon={XCircle}
                  onClick={() => handleReject(article.id)}
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Inspect Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {selectedArticle.title}
            </h3>
            <div className="text-xs text-zinc-500 flex items-center gap-2">
              <span>Author: {typeof selectedArticle.author === 'object' && selectedArticle.author ? selectedArticle.author.name : (selectedArticle.author || selectedArticle.authorSubdomain || 'Syndicate Member')}</span>
              <span>• Subdomain: {selectedArticle.authorSubdomain}.thefoundergrid.com</span>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 text-xs text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
              {selectedArticle.content}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Editorial Feedback / Rejection Reason (Optional)
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Notes for the author..."
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 text-xs text-zinc-900 dark:text-zinc-100"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button size="sm" variant="ghost" onClick={() => setSelectedArticle(null)}>
                Close
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => handleReject(selectedArticle.id)}
              >
                Reject with Notes
              </Button>
              <Button
                size="sm"
                variant="gold"
                onClick={() => handleApprove(selectedArticle.id)}
              >
                Approve & Syndicate
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleReview;
