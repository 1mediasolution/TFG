import React from 'react';
import { SearchBar } from './SearchBar';
import { FilterDropdown } from './FilterDropdown';
import { DIRECTORY_ROLES, VERIFICATION_STATUSES } from '../../utils/constants';

export const DirectoryFilters = ({
  searchQuery,
  onSearchChange,
  roleFilter,
  onRoleChange,
  tierFilter,
  onTierChange,
  verificationFilter,
  onVerificationChange,
  totalResults = 0,
}) => {
  const tierOptions = [
    { value: 'All', label: 'All Tiers' },
    { value: 'executive_fellow', label: 'Executive Fellow' },
    { value: 'founder_pro', label: 'Founder Pro' },
    { value: 'free', label: 'Member' },
  ];

  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="w-full md:flex-1">
          <SearchBar value={searchQuery} onChange={onSearchChange} />
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <FilterDropdown
            label="Role"
            value={roleFilter}
            options={DIRECTORY_ROLES}
            onChange={onRoleChange}
          />

          <FilterDropdown
            label="Syndicate Tier"
            value={tierFilter}
            options={tierOptions}
            onChange={onTierChange}
          />

          <FilterDropdown
            label="Verification"
            value={verificationFilter}
            options={VERIFICATION_STATUSES}
            onChange={onVerificationChange}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <span className="font-mono">
          Showing <span className="font-bold text-zinc-900 dark:text-zinc-100">{totalResults}</span> certified members
        </span>
        <span className="hidden sm:inline text-zinc-400">
          Tip: Filter by "Executive Fellow" to access institutional deal leads
        </span>
      </div>
    </div>
  );
};

export default DirectoryFilters;
