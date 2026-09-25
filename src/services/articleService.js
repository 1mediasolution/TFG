import { NEWS_ARTICLES, INITIAL_MEMBERS } from '../data/mockData';
import { articlesService as supabaseArticlesService } from './supabase/articlesService';
import { requestAIGenerateArticle } from './aiArticleService';

export const articleService = {
  async getNewsArticles(category = 'All') {
    try {
      const live = await supabaseArticlesService.getNewsArticles();
      if (live && live.length > 0) {
        if (category === 'All') return live;
        return live.filter((a) => a.category === category);
      }
    } catch (e) {
      console.warn('Live news fetch fallback:', e);
    }
    if (category === 'All') return NEWS_ARTICLES;
    return NEWS_ARTICLES.filter((a) => a.category === category);
  },

  async getArticleById(id) {
    const list = await this.getNewsArticles('All');
    return list.find((a) => a.id === id) || null;
  },

  async getAllMemberArticles() {
    try {
      const live = await supabaseArticlesService.getMemberArticles();
      if (live && live.length > 0) return live;
    } catch (e) {
      console.warn('Live member articles fallback:', e);
    }
    // Collect from members
    return INITIAL_MEMBERS.flatMap((m) => m.articles || []);
  },

  async getArticlesByMember(subdomain) {
    const all = await this.getAllMemberArticles();
    return all.filter((a) => a.authorSubdomain === subdomain);
  },

  async createArticle(articleData) {
    const newArticle = {
      id: 'art_' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      views: 1,
      status: 'published',
      ...articleData,
    };
    try {
      await supabaseArticlesService.createMemberArticle(newArticle);
    } catch (e) {
      console.warn('Article create fallback:', e);
    }
    return newArticle;
  },

  async updateArticleStatus(id, status, feedback = '') {
    try {
      await supabaseArticlesService.updateArticleReviewStatus(id, status, feedback);
    } catch (e) {
      console.warn('Article review status update fallback:', e);
    }
    return { success: true, id, status, feedback };
  },

  async generateWithAI(promptParams) {
    return await requestAIGenerateArticle(promptParams);
  },
};

export default articleService;
