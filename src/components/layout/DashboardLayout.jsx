import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Sidebar } from './Sidebar';

export const DashboardLayout = ({
  children,
  sidebarItems,
  sidebarTitle = 'Founder Studio',
  title,
  subtitle,
  actions,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar items={sidebarItems} title={sidebarTitle} />

        <main className="flex-1 min-w-0 p-6 sm:p-8">
          {(title || actions) && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 mb-6 border-b border-zinc-200 dark:border-zinc-800 gap-4">
              <div>
                {title && (
                  <h1 className="font-serif text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
              {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>
          )}

          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default DashboardLayout;
