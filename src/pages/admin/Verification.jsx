import React from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { VerificationManager } from '../../components/admin/VerificationManager';

export const Verification = () => {
  return (
    <div className="flex-1 flex max-w-7xl w-full mx-auto py-6">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-6 sm:p-8 space-y-6">
        <VerificationManager />
      </main>
    </div>
  );
};

export default Verification;
