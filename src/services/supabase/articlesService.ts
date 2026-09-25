import { getSupabase } from '../../lib/supabase/client';
import { NewsArticle, MemberArticle, ArticleReviewStatus } from '../../types';

export const articlesService = {
  // Global News Articles
  async getNewsArticles(): Promise<NewsArticle[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.warn('Supabase news articles fetch error:', error?.message);
        return null;
      }

      return data.map((row: any): NewsArticle => ({
        id: row.id,
        title: row.title,
        slug: row.slug || undefined,
        category: row.category,
        excerpt: row.excerpt,
        content: row.content,
        author: {
          name: row.author_name,
          role: row.author_role,
          avatar: row.author_avatar,
          subdomain: row.author_subdomain || undefined,
          isVerifiedFounder: row.is_verified_founder,
          isAdmin: row.is_admin
        },
        publishedAt: row.published_at,
        readTime: row.read_time,
        views: row.views || 0,
        imageUrl: row.image_url,
        keyTakeaways: row.key_takeaways || undefined,
        isLeadEditorial: row.is_lead_editorial,
        isFeatured: row.is_featured,
        isTrending: row.is_trending,
        tags: row.tags || []
      }));
    } catch (err) {
      console.error('Error fetching news articles from Supabase:', err);
      return null;
    }
  },

  async createNewsArticle(article: NewsArticle): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const { error } = await supabase.from('news_articles').insert({
        id: article.id,
        title: article.title,
        slug: article.slug || null,
        category: article.category,
        excerpt: article.excerpt,
        content: article.content,
        author_name: article.author.name,
        author_role: article.author.role,
        author_avatar: article.author.avatar,
        author_subdomain: article.author.subdomain || null,
        is_verified_founder: !!article.author.isVerifiedFounder,
        is_admin: !!article.author.isAdmin,
        published_at: article.publishedAt,
        read_time: article.readTime,
        views: article.views,
        image_url: article.imageUrl,
        key_takeaways: article.keyTakeaways || null,
        is_lead_editorial: !!article.isLeadEditorial,
        is_featured: !!article.isFeatured,
        is_trending: !!article.isTrending,
        tags: article.tags || []
      });

      return !error;
    } catch (err) {
      console.error('Error creating news article in Supabase:', err);
      return false;
    }
  },

  // Member Subdomain Articles
  async getMemberArticles(memberId?: string): Promise<MemberArticle[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      let query = supabase.from('member_articles').select('*').order('created_at', { ascending: false });
      if (memberId) {
        query = query.eq('member_id', memberId);
      }
      const { data, error } = await query;
      if (error || !data) return null;

      return data.map((row: any): MemberArticle => ({
        id: row.id,
        memberId: row.member_id,
        subdomain: row.subdomain,
        title: row.title,
        subtitle: row.subtitle,
        category: row.category,
        content: row.content,
        publishedAt: row.published_at,
        readTime: row.read_time,
        views: row.views || 0,
        tags: row.tags || [],
        weekNumber: row.week_number,
        year: row.year,
        status: row.status as ArticleReviewStatus,
        adminFeedback: row.admin_feedback || undefined,
        submittedAt: row.submitted_at
      }));
    } catch (err) {
      console.error('Error fetching member articles from Supabase:', err);
      return null;
    }
  },

  async createMemberArticle(article: MemberArticle): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const { error } = await supabase.from('member_articles').insert({
        id: article.id,
        member_id: article.memberId,
        subdomain: article.subdomain,
        title: article.title,
        subtitle: article.subtitle,
        category: article.category,
        content: article.content,
        published_at: article.publishedAt,
        read_time: article.readTime,
        views: article.views,
        tags: article.tags,
        week_number: article.weekNumber,
        year: article.year,
        status: article.status,
        admin_feedback: article.adminFeedback || null,
        submitted_at: article.submittedAt
      });

      return !error;
    } catch (err) {
      console.error('Error creating member article in Supabase:', err);
      return false;
    }
  },

  async updateArticleStatus(articleId: string, status: ArticleReviewStatus, feedback?: string): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const payload: any = { status };
      if (status === 'approved') payload.published_at = 'Today';
      if (feedback !== undefined) payload.admin_feedback = feedback;

      const { error } = await supabase
        .from('member_articles')
        .update(payload)
        .eq('id', articleId);

      return !error;
    } catch (err) {
      console.error('Error updating article status in Supabase:', err);
      return false;
    }
  },

  async deleteMemberArticle(articleId: string): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const { error } = await supabase
        .from('member_articles')
        .delete()
        .eq('id', articleId);

      return !error;
    } catch (err) {
      console.error('Error deleting member article from Supabase:', err);
      return false;
    }
  }
};
