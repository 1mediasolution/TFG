import React from 'react';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { FounderGridLogo } from '../../components/common/FounderGridLogo';

export const Register = () => {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <FounderGridLogo variant="mark" size="lg" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-zinc-950 dark:text-white">
            Syndicate Registration
          </h1>
          <p className="text-xs text-zinc-500">
            Secure your branded publication subdomain and connect with accredited investors.
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
