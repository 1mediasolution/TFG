import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Mail, Building, Clock, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { founderService } from '../../services/founderService';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/formatters';

export const Inquiries = () => {
  const auth = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    founderService.getInquiriesForFounder(auth.user?.id || 'usr-1').then((res) => {
      setInquiries(res);
      setLoading(false);
    });
  }, [auth.user?.id]);

  return (
    <DashboardLayout
      title="Inbound Syndicate & Subdomain Inquiries"
      subtitle="High-intent proposals, investor outreach, and enterprise queries routed through your subdomain."
    >
      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center text-xs text-zinc-400">Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="p-12 text-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 text-xs text-zinc-500">
            <Mail className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
            No inbound inquiries recorded yet. Visitors to your subdomain can submit direct proposals.
          </div>
        ) : (
          <div className="space-y-3">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-zinc-900 dark:text-zinc-100">
                      {inq.senderName}
                    </span>
                    <span className="text-xs text-zinc-400">•</span>
                    <span className="text-xs font-semibold text-amber-600">{inq.senderCompany}</span>
                    <span className="text-xs text-zinc-400 font-mono">({inq.senderEmail})</span>
                  </div>

                  <div className="inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold">
                    Intent: {inq.intentType}
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                    "{inq.message}"
                  </p>

                  <div className="text-[11px] text-zinc-400 pt-1 font-mono">
                    Received {formatDate(inq.createdAt)} via {inq.targetSubdomain || 'founder'}.thefoundergrid.com
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a href={`mailto:${inq.senderEmail}`}>
                    <Button size="sm" variant="gold" icon={Mail}>
                      Reply via Email
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Inquiries;
