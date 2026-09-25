import React from 'react';

export const Loader = ({ message = 'Loading...', size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 space-y-3">
      <div
        className={`${sizeMap[size] || sizeMap.md} border-2 border-zinc-200 dark:border-zinc-700 border-t-amber-600 rounded-full animate-spin`}
      />
      {message && (
        <p className="text-xs font-medium tracking-wide uppercase text-zinc-500 dark:text-zinc-400">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;
