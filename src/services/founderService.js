import { INITIAL_MEMBERS, INITIAL_INQUIRIES } from '../data/mockData';
import { membersService } from './supabase/membersService';
import { inquiriesService } from './supabase/inquiriesService';

export const founderService = {
  async getAllFounders() {
    try {
      const live = await membersService.getAllMembers();
      if (live && live.length > 0) return live;
    } catch (e) {
      console.warn('Live members fetch fallback:', e);
    }
    return INITIAL_MEMBERS;
  },

  async getFounderBySubdomain(subdomain) {
    const list = await this.getAllFounders();
    return list.find((m) => m.subdomain.toLowerCase() === subdomain.toLowerCase()) || null;
  },

  async getFounderById(id) {
    const list = await this.getAllFounders();
    return list.find((m) => m.id === id) || null;
  },

  async updateProfile(id, updates) {
    try {
      await membersService.updateMember(id, updates);
    } catch (e) {
      console.warn('Live update fallback:', e);
    }
    return { success: true, ...updates };
  },

  async getInquiriesForFounder(founderId) {
    try {
      const live = await inquiriesService.getInquiries();
      if (live) return live.filter((inq) => inq.targetMemberId === founderId);
    } catch (e) {
      console.warn('Live inquiries fallback:', e);
    }
    return INITIAL_INQUIRIES.filter((inq) => inq.targetMemberId === founderId);
  },

  async submitInquiry(inquiryData) {
    try {
      await inquiriesService.createInquiry(inquiryData);
    } catch (e) {
      console.warn('Live inquiry submit fallback:', e);
    }
    return { success: true, id: 'inq_' + Date.now(), ...inquiryData };
  },
};

export default founderService;
