import React from 'react';
import { Hash, Lock, Volume2, Shield, Users, Handshake, Heart } from 'lucide-react';

export const ChannelList = ({
  channels = [],
  activeChannelId,
  onSelectChannel,
}) => {
  const getChannelIcon = (id) => {
    switch (id) {
      case 'announcements':
        return Volume2;
      case 'deals':
      case 'deals_partnerships':
        return Handshake;
      case 'fundraising':
      case 'executive_lounge':
        return Shield;
      case 'networking':
      case 'business_networking':
        return Users;
      default:
        return Hash;
    }
  };

  return (
    <div className="space-y-1">
      <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
        Syndicate Channels
      </div>
      {channels.map((channel) => {
        const Icon = getChannelIcon(channel.id);
        const isActive = activeChannelId === channel.id;

        return (
          <button
            key={channel.id}
            onClick={() => onSelectChannel(channel.id)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left cursor-pointer ${
              isActive
                ? 'bg-zinc-900 text-white dark:bg-zinc-800 dark:text-white font-bold'
                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{channel.name}</span>
            </div>
            {channel.isExecutiveOnly && (
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded-sm bg-amber-500/20 text-amber-600 dark:text-amber-400">
                Exec
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ChannelList;
