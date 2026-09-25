import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { MemberManagement } from '../../components/admin/MemberManagement';
import { INITIAL_MEMBERS } from '../../data/mockData';

export const Members = () => {
  const [members, setMembers] = useState(INITIAL_MEMBERS);

  const handleUpdateMember = (id, updates) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  return (
    <div className="flex-1 flex max-w-7xl w-full mx-auto py-6">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-6 sm:p-8 space-y-6">
        <MemberManagement
          members={members}
          onUpdateMember={handleUpdateMember}
        />
      </main>
    </div>
  );
};

export default Members;
