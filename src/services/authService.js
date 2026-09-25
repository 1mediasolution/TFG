import { INITIAL_MEMBERS } from '../data/mockData';

const AUTH_STORAGE_KEY = 'tfg_current_user';

export const authService = {
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse stored user:', e);
    }
    // Default to the first premier founder (Elena Vance) as default logged in executive
    return INITIAL_MEMBERS[0];
  },

  setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } else {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }
  },

  async login(email, password) {
    await new Promise((r) => setTimeout(r, 400));
    // Find matching member or create a guest session
    const existing = INITIAL_MEMBERS.find((m) => m.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      this.setCurrentUser(existing);
      return { success: true, user: existing };
    }

    // Default founder credentials if not found
    const newUser = {
      ...INITIAL_MEMBERS[0],
      email,
      name: email.split('@')[0].replace(/[._]/g, ' '),
    };
    this.setCurrentUser(newUser);
    return { success: true, user: newUser };
  },

  async register({ name, email, password, company, role = 'Founder', tier = 'founder_pro' }) {
    await new Promise((r) => setTimeout(r, 500));
    const subdomain = name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'newfounder';
    const newUser = {
      id: 'usr_' + Date.now(),
      name,
      email,
      role,
      tier,
      company: company || `${name} Ventures`,
      title: 'Founder & CEO',
      subdomain,
      bio: `Building high-growth ventures at the intersection of business and innovation.`,
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80`,
      verified: tier !== 'free',
      publishedArticlesCount: 0,
      monthlyQuota: tier === 'executive_fellow' ? 20 : 5,
      quotaUsed: 0,
      stats: { valuation: '$10M', revenue: '$1.2M', totalRaised: '$2.5M', employees: '12' },
      articles: [],
      caseStudies: [],
    };
    this.setCurrentUser(newUser);
    return { success: true, user: newUser };
  },

  async resetPassword(email) {
    await new Promise((r) => setTimeout(r, 400));
    return { success: true, message: `Password reset instructions sent to ${email}` };
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },
};

export default authService;
