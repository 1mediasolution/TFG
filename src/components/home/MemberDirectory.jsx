import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Users, ArrowRight } from 'lucide-react';
import { INITIAL_MEMBERS } from '../../data/mockData';
import { FounderCard } from './FounderCard';

export const MemberDirectory = ({ onOpenPortfolio }) => {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const members = INITIAL_MEMBERS.filter((m) => {
    if (roleFilter !== 'All' && m.role !== roleFilter) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q) ||
        m.subdomain.toLowerCase().includes(q)
      );
    }
    return true;
  }).slice(0, 6);

  return (
    <section className="py-10 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-zinc-950 dark:text-white">
            Syndicate Member Directory
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Browse verified founders, executives, and accredited investor partners.
          </p>
        </div>

        {/* Quick controls */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by name, company..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pl-8 pr-3 py-2 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500 w-48 sm:w-60"
            />
          </div>

          <div className="flex rounded-lg border border-zinc-200 dark:border-zinc-800 p-0.5 bg-zinc-100 dark:bg-zinc-900 text-xs">
            {['All', 'Founder', 'Investor'].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  roleFilter === role
                    ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <FounderCard
            key={member.id}
            member={member}
            onOpenPortfolio={onOpenPortfolio}
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/directory"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <span>Open Full Interactive Directory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
};

export default MemberDirectory;
