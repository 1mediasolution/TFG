import React, { createContext, useContext, useState, useEffect } from 'react';
import { communityService } from '../services/communityService';
import { AuthContext } from './AuthContext';

export const CommunityContext = createContext(null);

export const CommunityProvider = ({ children }) => {
  const auth = useContext(AuthContext);
  const [channels, setChannels] = useState([]);
  const [activeChannelId, setActiveChannelId] = useState('general');
  const [messages, setMessages] = useState([]);
  const [activeDmUser, setActiveDmUser] = useState(null);
  const [selectedMemberPopup, setSelectedMemberPopup] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load channels
  useEffect(() => {
    let isMounted = true;
    communityService.getChannels().then((res) => {
      if (isMounted && res) {
        setChannels(res);
        if (res.length > 0 && !activeChannelId) {
          setActiveChannelId(res[0].id);
        }
      }
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Load messages whenever activeChannelId or activeDmUser changes
  useEffect(() => {
    let isMounted = true;
    const isDM = !!activeDmUser;
    communityService.getMessages(activeChannelId, isDM, activeDmUser?.id).then((msgs) => {
      if (isMounted) setMessages(msgs);
    });
    return () => {
      isMounted = false;
    };
  }, [activeChannelId, activeDmUser]);

  const sendMessage = async (text, attachment = null) => {
    if (!text.trim() && !attachment) return;
    const sender = auth?.user || {
      id: 'guest',
      name: 'Guest Member',
      subdomain: 'guest',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      tier: 'free',
      verified: false,
    };

    const newMsgData = {
      channelId: activeDmUser ? 'dm' : activeChannelId,
      isDirectMessage: !!activeDmUser,
      recipientId: activeDmUser?.id,
      recipientMemberId: activeDmUser?.id,
      senderId: sender.id,
      senderName: sender.name,
      senderSubdomain: sender.subdomain,
      senderAvatar: sender.avatar,
      senderTier: sender.tier,
      senderVerified: sender.verified,
      content: text,
      attachment,
    };

    const sent = await communityService.sendMessage(newMsgData);
    setMessages((prev) => [...prev, sent]);
    return sent;
  };

  const openDmWithMember = (member) => {
    setActiveDmUser(member);
    setActiveChannelId('dm');
  };

  const selectChannel = (channelId) => {
    setActiveDmUser(null);
    setActiveChannelId(channelId);
  };

  return (
    <CommunityContext.Provider
      value={{
        channels,
        activeChannelId,
        activeChannel: channels.find((c) => c.id === activeChannelId),
        selectChannel,
        messages,
        sendMessage,
        activeDmUser,
        openDmWithMember,
        selectedMemberPopup,
        setSelectedMemberPopup,
        loading,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (!context) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};

export default CommunityContext;
