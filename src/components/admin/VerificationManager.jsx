import React, { useState } from 'react';
import { CheckCircle2, XCircle, ShieldCheck, FileText, ExternalLink } from 'lucide-react';
import { Button } from '../common/Button';

export const VerificationManager = () => {
  const [requests, setRequests] = useState([
    {
      id: 'req-1',
      memberName: 'Julian Thorne',
      company: 'Aether Dynamics',
      subdomain: 'julianthorne',
      docs: ['Delaware C-Corp Filing', 'Lead Investor Term Sheet'],
      submittedDate: '2 hours ago',
      status: 'pending',
    },
    {
      id: 'req-2',
      memberName: 'Darius Thorne',
      company: 'Apex Horizon Ventures',
      subdomain: 'darius',
      docs: ['Form D SEC Filing', 'Accredited Investor Attestation'],
      submittedDate: '1 day ago',
      status: 'pending',
    },
  ]);

  const handleApprove = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
          Syndicate Verification Protocol Requests
        </h3>
        <p className="text-xs text-zinc-500">
          Review legal filings, institutional capitalization documents, and credentials for verified badges.
        </p>
      </div>

      {requests.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 text-xs text-zinc-500">
          <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          No pending verification applications.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {req.memberName}
                  </h4>
                  <span className="text-xs text-zinc-400">•</span>
                  <span className="text-xs font-semibold text-amber-600">{req.company}</span>
                </div>
                <div className="text-xs text-zinc-500 font-mono">
                  Subdomain: {req.subdomain}.thefoundergrid.com • Submitted {req.submittedDate}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  {req.docs.map((doc, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-[11px] bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-zinc-600 dark:text-zinc-300 font-mono"
                    >
                      <FileText className="w-3 h-3 text-amber-500" />
                      {doc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" variant="gold" icon={CheckCircle2} onClick={() => handleApprove(req.id)}>
                  Approve Verification
                </Button>
                <Button size="sm" variant="outline">
                  Request Info
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerificationManager;
