import React from 'react';
import { ResetPassword as ResetPasswordComponent } from '../../components/auth/ResetPassword';
import { FounderGridLogo } from '../../components/common/FounderGridLogo';

export const ResetPassword = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <FounderGridLogo variant="mark" size="lg" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-zinc-950 dark:text-white">
            Set New Password
          </h1>
        </div>

        <ResetPasswordComponent />
      </div>
    </div>
  );
};

export default ResetPassword;
