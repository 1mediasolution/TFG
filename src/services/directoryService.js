import { INITIAL_MEMBERS } from '../data/mockData';
import { founderService } from './founderService';

export const directoryService = {
  async searchMembers({ query = '', role = 'All', tier = 'All', verified = 'All', industry = 'All' } = {}) {
    const all = await founderService.getAllFounders();
    return all.filter((member) => {
      // Query filter
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchesName = member.name.toLowerCase().includes(q);
        const matchesCompany = member.company.toLowerCase().includes(q);
        const matchesSubdomain = member.subdomain.toLowerCase().includes(q);
        const matchesBio = (member.bio || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCompany && !matchesSubdomain && !matchesBio) return false;
      }

      // Role filter
      if (role !== 'All' && member.role !== role) {
        return false;
      }

      // Tier filter
      if (tier !== 'All' && member.tier !== tier) {
        return false;
      }

      // Verification filter
      if (verified === 'Verified' && !member.verified) return false;
      if (verified === 'Unverified' && member.verified) return false;

      // Industry filter
      if (industry !== 'All' && member.industry && member.industry !== industry) {
        return false;
      }

      return true;
    });
  },

  async getInvestors() {
    const all = await founderService.getAllFounders();
    return all.filter((m) => m.role === 'Investor');
  },

  async getFounders() {
    const all = await founderService.getAllFounders();
    return all.filter((m) => m.role === 'Founder');
  },
};

export default directoryService;
