import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Paperclip, Shield, Globe, Users, Hash } from 'lucide-react';
import { Message } from './Message';
import { Button } from '../common/Button';
import { useAuth } from '../../hooks/useAuth';

export const ChatWindow = ({
  channel,
  messages = [],
  onSendMessage,
  activeDmUser,
  onOpenMemberPopup,
}) => {
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const auth = useAuth();
  const currentUserId = auth?.user?.id;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    setSending(true);
    try {
      await onSendMessage(inputText);
      setInputText('');
    } finally {
      setSending(false);
    }
  };

  const title = activeDmUser
    ? `Direct Exchange: ${activeDmUser.name}`
    : `# ${channel?.name || 'general'}`;

  const subtitle = activeDmUser
    ? `${activeDmUser.company} • ${activeDmUser.subdomain}.thefoundergrid.com`
    : channel?.description || 'Private founder discussions, deal syndication, and venture intelligence.';

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-50/50 dark:bg-zinc-950/30">
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-base font-bold text-zinc-900 dark:text-zinc-100">
              {title}
            </h2>
            {channel?.isExecutiveOnly && (
              <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full font-bold">
                Executive Only
              </span>
            )}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-zinc-400 space-y-2">
            <Users className="w-8 h-8 text-zinc-300 dark:text-zinc-700" />
            <p className="text-xs">No messages yet in this syndicate channel. Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <Message
              key={msg.id}
              message={msg}
              isOwn={msg.senderId === currentUserId || msg.senderSubdomain === auth?.user?.subdomain}
              onOpenMemberPopup={onOpenMemberPopup}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Composer */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              activeDmUser
                ? `Send encrypted exchange to ${activeDmUser.name}...`
                : `Share intelligence or deal proposal in ${channel?.name || 'channel'}...`
            }
            className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <Button
            type="submit"
            variant="gold"
            size="md"
            icon={Send}
            disabled={!inputText.trim()}
            loading={sending}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
