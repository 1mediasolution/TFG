import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { Button } from '../../components/common/Button';
import { Sliders, ShieldAlert, Flag, CheckCircle2, MessageSquare, AlertTriangle } from 'lucide-react';

export const Moderation = () => {
  const [flaggedItems, setFlaggedItems] = useState([
    {
      id: 'flag-1',
      type: 'Direct Exchange Message',
      author: 'Unknown Guest',
      reason: 'Unsolicited mass token promotion in #deals',
      timestamp: '1 hour ago',
      status: 'pending',
    },
    {
      id: 'flag-2',
      type: 'Subdomain Comment',
      author: 'Anonymous',
      reason: 'Suspected trademark infringement in publication slug',
      timestamp: '3 hours ago',
      status: 'pending',
    },
  ]);

  const handleDismiss = (id) => {
    setFlaggedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex-1 flex max-w-7xl w-full mx-auto py-6">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Syndicate Platform Moderation
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Review community incident reports, automated spam triggers, and compliance alerts.
          </p>
        </div>

        {flaggedItems.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 text-xs text-zinc-500">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            Zero active moderation alerts. All syndicate channels and subdomains are compliant.
          </div>
        ) : (
          <div className="space-y-3">
            {flaggedItems.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 font-bold">
                      {item.type}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">{item.timestamp}</span>
                  </div>
                  <h4 className="font-serif text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    Flagged: {item.reason}
                  </h4>
                  <p className="text-xs text-zinc-500">Originator: {item.author}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button size="sm" variant="danger" onClick={() => handleDismiss(item.id)}>
                    Suspend & Mute
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDismiss(item.id)}>
                    Dismiss False Flag
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Moderation;
