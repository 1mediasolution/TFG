import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Sparkles, Send, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { ARTICLE_CATEGORIES } from '../../utils/constants';
import { requestAIGenerateArticle } from '../../services/aiArticleService';
import { useAuth } from '../../hooks/useAuth';

export const CreateArticle = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Business');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [published, setPublished] = useState(false);

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const res = await requestAIGenerateArticle({
        topic: aiPrompt,
        category,
        authorName: auth.user?.name || 'Executive Author',
        authorCompany: auth.user?.company || 'Enterprise Venture',
      });
      if (res) {
        if (res.title) setTitle(res.title);
        if (res.content) setContent(res.content);
        if (res.summary) setSummary(res.summary);
      }
    } catch (err) {
      console.warn('AI generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setIsSubmitting(true);

    const newArticle = {
      id: 'art_' + Date.now(),
      title,
      category,
      content,
      summary: summary || content.slice(0, 150) + '...',
      author: auth.user?.name,
      authorSubdomain: auth.user?.subdomain,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      views: 1,
    };

    const updatedUser = {
      ...auth.user,
      publishedArticlesCount: (auth.user.publishedArticlesCount || 0) + 1,
      quotaUsed: (auth.user.quotaUsed || 0) + 1,
      articles: [newArticle, ...(auth.user.articles || [])],
    };

    auth.updateUser(updatedUser);
    setIsSubmitting(false);
    setPublished(true);
    setTimeout(() => {
      navigate('/founder/articles');
    }, 1200);
  };

  return (
    <DashboardLayout
      title="Editorial Composer & AI Co-Author"
      subtitle={`Authoring for ${auth.user?.subdomain || 'founder'}.thefoundergrid.com`}
    >
      <div className="max-w-4xl space-y-6">
        {published && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Dispatch published successfully to your subdomain and syndicated to The Founder Grid!
          </div>
        )}

        {/* AI Co-Author Box */}
        <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>AI Executive Ghostwriter</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Enter a key hypothesis, deal memo, or market observation. Our Gemini AI engine crafts a publish-ready draft with citations and macro-theses.
          </p>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. How high-throughput inference silicon is disrupting enterprise SaaS economics..."
              className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Button
              variant="gold"
              size="sm"
              icon={Sparkles}
              loading={isGenerating}
              disabled={!aiPrompt.trim()}
              onClick={handleAiGenerate}
            >
              Draft Article with AI
            </Button>
          </div>
        </div>

        {/* Manual Editorial Form */}
        <form onSubmit={handlePublish} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Article Headline"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="The Next Liquidity Window: Venture Trends 2025"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm text-zinc-900 dark:text-zinc-100"
              >
                {ARTICLE_CATEGORIES.filter((c) => c !== 'All').map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Executive Summary (Appears in Syndicated Feed)"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="A two-sentence distillation for the front-page editorial wire..."
          />

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 block">
              Full Article Body (Markdown / Rich Text)
            </label>
            <textarea
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-4 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 font-serif leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="Write or refine your full thought leadership piece..."
              required
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="text-xs text-zinc-500 font-mono">
              Monthly Syndicate Quota Remaining:{' '}
              <span className="font-bold text-amber-600">
                {(auth.user?.monthlyQuota || 5) - (auth.user?.quotaUsed || 0)} / {auth.user?.monthlyQuota || 5}
              </span>
            </div>

            <Button
              type="submit"
              variant="gold"
              size="md"
              icon={Send}
              loading={isSubmitting}
            >
              Publish to Subdomain
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateArticle;
