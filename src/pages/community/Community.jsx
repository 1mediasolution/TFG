import React, { useState } from 'react';
import { CommunitySidebar } from '../../components/community/CommunitySidebar';
import { ChatWindow } from '../../components/community/ChatWindow';
import { MemberPopup } from '../../components/community/MemberPopup';
import { CustomPortfolioModal } from '../../components/features/community/CustomPortfolioModal';
import { useCommunity } from '../../context/CommunityContext';

export const Community = () => {
  const {
    channels,
    activeChannelId,
    activeChannel,
    selectChannel,
    messages,
    sendMessage,
    activeDmUser,
    openDmWithMember,
  } = useCommunity();

  const [popupMember, setPopupMember] = useState(null);
  const [portfolioMember, setPortfolioMember] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="h-[78vh] rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md flex overflow-hidden">
        {/* Sidebar */}
        <CommunitySidebar
          channels={channels}
          activeChannelId={activeChannelId}
          onSelectChannel={selectChannel}
          activeDmUser={activeDmUser}
          onSelectDmUser={openDmWithMember}
          onOpenMemberPopup={(m) => setPopupMember(m)}
        />

        {/* Chat Window */}
        <ChatWindow
          channel={activeChannel}
          messages={messages}
          onSendMessage={sendMessage}
          activeDmUser={activeDmUser}
          onOpenMemberPopup={(m) => setPopupMember(m)}
        />
      </div>

      {/* Member Mini Dossier Popup */}
      {popupMember && (
        <MemberPopup
          member={popupMember}
          isOpen={!!popupMember}
          onClose={() => setPopupMember(null)}
          onStartDm={(m) => openDmWithMember(m)}
          onOpenPortfolio={(m) => setPortfolioMember(m)}
        />
      )}

      {/* Full Portfolio Modal */}
      {portfolioMember && (
        <CustomPortfolioModal
          member={portfolioMember}
          isOpen={!!portfolioMember}
          onClose={() => setPortfolioMember(null)}
        />
      )}
    </div>
  );
};

export default Community;
