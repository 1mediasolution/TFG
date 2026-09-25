import React from 'react';
import { Modal } from '../common/Modal';
import { ShieldCheck, Globe, Mail, ArrowUpRight, Award } from 'lucide-react';
import { Button } from '../common/Button';

export const MemberPopup = ({
  member,
  isOpen,
  onClose,
  onStartDm,
  onOpenPortfolio,
}) => {
  if (!member) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Syndicate Member Dossier"
      subtitle={`Verified Profile • ${member.subdomain || 'member'}.thefoundergrid.com`}
      maxWidth="max-w-md"
    >
      <div className="space-y-5">
        <div className="flex items-center gap-4">
          <img
            src={member.avatar || member.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
            alt={member.name || member.senderName}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-zinc-200 dark:border-zinc-700"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-serif text-lg font-bold text-zinc-900 dark:text-zinc-100">
                {member.name || member.senderName}
              </h4>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-xs text-zinc-500">
              {member.company || 'Enterprise Venture'}
            </p>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-mono text-amber-600">
              <Globe className="w-3 h-3" />
              <span>{(member.subdomain || member.senderSubdomain || 'member')}.thefoundergrid.com</span>
            </div>
          </div>
        </div>

        {member.bio && (
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl">
            {member.bio}
          </p>
        )}

        <div className="flex items-center gap-2 pt-2">
          {onStartDm && (
            <Button
              variant="gold"
              size="sm"
              icon={Mail}
              className="flex-1"
              onClick={() => {
                onStartDm(member);
                onClose();
              }}
            >
              Start Direct Exchange
            </Button>
          )}

          {onOpenPortfolio && (
            <Button
              variant="outline"
              size="sm"
              icon={ArrowUpRight}
              onClick={() => {
                onOpenPortfolio(member);
                onClose();
              }}
            >
              Full Portfolio
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MemberPopup;
