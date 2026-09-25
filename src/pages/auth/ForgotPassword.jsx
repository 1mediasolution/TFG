import React from 'react';
import { ForgotPassword as ForgotPasswordComponent } from '../../components/auth/ForgotPassword';
import { FounderGridLogo } from '../../components/common/FounderGridLogo';

export const ForgotPassword = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <FounderGridLogo variant="mark" size="lg" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-zinc-950 dark:text-white">
            Recover Access
          </h1>
        </div>

        <ForgotPasswordComponent />
      </div>
    </div>
  );
};

export default ForgotPassword;
