import React from 'react';
import { ShieldCheck, Globe, Check } from 'lucide-react';
import { formatTimeAgo } from '../../utils/formatters';

export const Message = ({
  message,
  isOwn = false,
  onOpenMemberPopup,
}) => {
  if (!message) return null;

  return (
    <div className={`flex gap-3 text-xs ${isOwn ? 'flex-row-reverse' : ''} group`}>
      <img
        src={message.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
        alt={message.senderName}
        onClick={() => onOpenMemberPopup && onOpenMemberPopup(message)}
        className="w-8 h-8 rounded-full object-cover shrink-0 cursor-pointer border border-zinc-200 dark:border-zinc-700"
      />

      <div className={`max-w-[75%] sm:max-w-md ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        {/* Header */}
        <div className="flex items-center gap-1.5 mb-1 text-[11px] text-zinc-500">
          <span
            onClick={() => onOpenMemberPopup && onOpenMemberPopup(message)}
            className="font-bold text-zinc-900 dark:text-zinc-100 hover:text-amber-600 cursor-pointer"
          >
            {message.senderName}
          </span>

          {message.senderVerified && (
            <ShieldCheck className="w-3 h-3 text-emerald-500" title="Verified Member" />
          )}

          {message.senderTier === 'executive_fellow' && (
            <span className="text-[9px] uppercase font-mono px-1 py-0.2 bg-amber-500/10 text-amber-600 rounded">
              Exec
            </span>
          )}

          <span className="text-zinc-400 font-mono">{message.timestamp || 'just now'}</span>
        </div>

        {/* Bubble */}
        <div
          className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
            isOwn
              ? 'bg-amber-600 text-white rounded-tr-xs'
              : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-tl-xs shadow-xs'
          }`}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default Message;
