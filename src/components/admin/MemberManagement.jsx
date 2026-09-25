import React, { useState } from 'react';
import { Users, ShieldCheck, ShieldAlert, Award, Search, MoreHorizontal, ExternalLink } from 'lucide-react';
import { Button } from '../common/Button';

export const MemberManagement = ({ members = [], onUpdateMember }) => {
  const [search, setSearch] = useState('');

  const filtered = members.filter((m) => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(s) ||
      m.company.toLowerCase().includes(s) ||
      m.subdomain.toLowerCase().includes(s)
    );
  });

  const toggleVerification = (member) => {
    if (onUpdateMember) {
      onUpdateMember(member.id, { verified: !member.verified });
    }
  };

  const changeTier = (member, newTier) => {
    if (onUpdateMember) {
      onUpdateMember(member.id, {
        tier: newTier,
        monthlyQuota: newTier === 'executive_fellow' ? 20 : newTier === 'founder_pro' ? 5 : 0,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Syndicate Member Directory & Tier Control
          </h3>
          <p className="text-xs text-zinc-500">
            Manage membership tiers, verification checkmarks, and custom publication subdomains.
          </p>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pl-8 pr-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500 w-56"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 dark:bg-zinc-800/50 text-[10px] uppercase font-mono text-zinc-500 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Syndicate Tier</th>
                <th className="py-3 px-4">Subdomain</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
              {filtered.map((member) => (
                <tr key={member.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <div className="font-semibold text-zinc-900 dark:text-zinc-100">{member.name}</div>
                        <div className="text-[11px] text-zinc-400">{member.company}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono">{member.role}</td>
                  <td className="py-3 px-4">
                    <select
                      value={member.tier}
                      onChange={(e) => changeTier(member, e.target.value)}
                      className="rounded border border-zinc-200 dark:border-zinc-700 bg-transparent px-2 py-1 text-xs"
                    >
                      <option value="free">Member (Free)</option>
                      <option value="founder_pro">Founder Pro</option>
                      <option value="executive_fellow">Executive Fellow</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 font-mono text-amber-600">
                    {member.subdomain}.thefoundergrid.com
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => toggleVerification(member)}
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold cursor-pointer ${
                        member.verified
                          ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                          : 'bg-zinc-100 text-zinc-400 border border-zinc-200'
                      }`}
                    >
                      <ShieldCheck className="w-3 h-3" />
                      {member.verified ? 'Verified' : 'Unverified'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleVerification(member)}
                    >
                      {member.verified ? 'Revoke Check' : 'Verify Check'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MemberManagement;
