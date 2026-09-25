import { getSupabase } from '../../lib/supabase/client';
import { Advertisement, AdSlotId } from '../../types';

export const adsService = {
  async getAds(): Promise<Advertisement[] | null> {
    const supabase = getSupabase();
    if (!supabase) return null;

    try {
      const { data, error } = await supabase.from('advertisements').select('*').order('created_at', { ascending: true });
      if (error || !data) return null;

      return data.map((row: any): Advertisement => ({
        id: row.id,
        slot: row.slot as AdSlotId,
        title: row.title,
        sponsor: row.sponsor,
        description: row.description,
        ctaText: row.cta_text,
        ctaUrl: row.cta_url,
        badge: row.badge,
        bannerImageUrl: row.banner_image_url || undefined,
        impressions: row.impressions || 0,
        clicks: row.clicks || 0,
        active: row.active
      }));
    } catch (err) {
      console.error('Error fetching ads from Supabase:', err);
      return null;
    }
  },

  async recordAdClick(adId: string): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      // Fetch current clicks
      const { data } = await supabase.from('advertisements').select('clicks').eq('id', adId).single();
      const currentClicks = data?.clicks || 0;

      const { error } = await supabase
        .from('advertisements')
        .update({ clicks: currentClicks + 1 })
        .eq('id', adId);

      return !error;
    } catch (err) {
      console.error('Error recording ad click in Supabase:', err);
      return false;
    }
  },

  async updateAd(ad: Advertisement): Promise<boolean> {
    const supabase = getSupabase();
    if (!supabase) return false;

    try {
      const { error } = await supabase
        .from('advertisements')
        .update({
          title: ad.title,
          sponsor: ad.sponsor,
          description: ad.description,
          cta_text: ad.ctaText,
          cta_url: ad.ctaUrl,
          badge: ad.badge,
          banner_image_url: ad.bannerImageUrl || null,
          active: ad.active
        })
        .eq('id', ad.id);

      return !error;
    } catch (err) {
      console.error('Error updating ad in Supabase:', err);
      return false;
    }
  }
};
