import { CHAT_CHANNELS, INITIAL_CHAT_MESSAGES } from '../data/mockData';
import { chatService as supabaseChatService } from './supabase/chatService';

export const communityService = {
  async getChannels() {
    try {
      const live = await supabaseChatService.getChannels();
      if (live && live.length > 0) return live;
    } catch (e) {
      console.warn('Live channels fetch fallback:', e);
    }
    return CHAT_CHANNELS;
  },

  async getMessages(channelId, isDM = false, dmUserId = null) {
    try {
      const live = await supabaseChatService.getMessages(channelId);
      if (live && live.length > 0) {
        if (isDM && dmUserId) {
          return live.filter((m) => m.isDirectMessage && (m.senderId === dmUserId || m.recipientId === dmUserId));
        }
        return live.filter((m) => !m.isDirectMessage && m.channelId === channelId);
      }
    } catch (e) {
      console.warn('Live messages fetch fallback:', e);
    }

    if (isDM && dmUserId) {
      return INITIAL_CHAT_MESSAGES.filter(
        (m) => m.isDirectMessage && (m.senderId === dmUserId || m.recipientId === dmUserId)
      );
    }
    return INITIAL_CHAT_MESSAGES.filter((m) => !m.isDirectMessage && m.channelId === channelId);
  },

  async sendMessage(msgData) {
    const newMsg = {
      id: 'msg_' + Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: [],
      ...msgData,
    };
    try {
      await supabaseChatService.sendMessage(newMsg);
    } catch (e) {
      console.warn('Live send message fallback:', e);
    }
    return newMsg;
  },
};

export default communityService;
