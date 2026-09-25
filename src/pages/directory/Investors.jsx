import React, { useState, useEffect } from 'react';
import { MemberCard } from '../../components/directory/MemberCard';
import { CustomPortfolioModal } from '../../components/features/community/CustomPortfolioModal';
import { directoryService } from '../../services/directoryService';

export const Investors = () => {
  const [investors, setInvestors] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    directoryService.getInvestors().then((res) => setInvestors(res));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
          Accredited Institutional Investors & GPs
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Venture capital partners, family office principals, and angel syndicates actively deploying capital.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investors.map((member) => (
          <MemberCard
            key={member.id}
            member={member}
            onSelect={(m) => setSelectedMember(m)}
            onOpenPortfolio={(m) => setSelectedMember(m)}
          />
        ))}
      </div>

      {selectedMember && (
        <CustomPortfolioModal
          member={selectedMember}
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
};

export default Investors;
