import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FounderMember,
  NewsArticle,
  ChatMessage,
  Advertisement,
  VisitorInquiry,
  AutomatedEmailNotification
} from '../types';
import {
  INITIAL_MEMBERS,
  NEWS_ARTICLES,
  INITIAL_CHAT_MESSAGES,
  INITIAL_ADS,
  INITIAL_INQUIRIES,
  INITIAL_EMAIL_NOTIFICATIONS
} from '../data/mockData';
import { isSupabaseConfigured } from '../lib/supabase/client';
import {
  membersService,
  articlesService,
  chatService,
  adsService,
  inquiriesService,
  notificationsService
} from '../services/supabase';

interface DataContextType {
  isSupabaseLive: boolean;
  isLoading: boolean;
  members: FounderMember[];
  newsArticles: NewsArticle[];
  chatMessages: ChatMessage[];
  ads: Advertisement[];
  inquiries: VisitorInquiry[];
  emailNotifications: AutomatedEmailNotification[];
  setMembers: React.Dispatch<React.SetStateAction<FounderMember[]>>;
  setNewsArticles: React.Dispatch<React.SetStateAction<NewsArticle[]>>;
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setAds: React.Dispatch<React.SetStateAction<Advertisement[]>>;
  setInquiries: React.Dispatch<React.SetStateAction<VisitorInquiry[]>>;
  setEmailNotifications: React.Dispatch<React.SetStateAction<AutomatedEmailNotification[]>>;
  refreshAllFromSupabase: () => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSupabaseLive, setIsSupabaseLive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [members, setMembers] = useState<FounderMember[]>(INITIAL_MEMBERS);
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(NEWS_ARTICLES);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [ads, setAds] = useState<Advertisement[]>(INITIAL_ADS);
  const [inquiries, setInquiries] = useState<VisitorInquiry[]>(INITIAL_INQUIRIES);
  const [emailNotifications, setEmailNotifications] = useState<AutomatedEmailNotification[]>(INITIAL_EMAIL_NOTIFICATIONS);

  const refreshAllFromSupabase = async () => {
    if (!isSupabaseConfigured()) return;
    setIsLoading(true);
    try {
      const [remoteMembers, remoteNews, remoteChat, remoteAds, remoteInquiries, remoteNotifs] =
        await Promise.all([
          membersService.getAllMembers(),
          articlesService.getNewsArticles(),
          chatService.getMessages(),
          adsService.getAds(),
          inquiriesService.getInquiries(),
          notificationsService.getNotifications()
        ]);

      if (remoteMembers && remoteMembers.length > 0) setMembers(remoteMembers);
      if (remoteNews && remoteNews.length > 0) setNewsArticles(remoteNews);
      if (remoteChat && remoteChat.length > 0) setChatMessages(remoteChat);
      if (remoteAds && remoteAds.length > 0) setAds(remoteAds);
      if (remoteInquiries && remoteInquiries.length > 0) setInquiries(remoteInquiries);
      if (remoteNotifs && remoteNotifs.length > 0) setEmailNotifications(remoteNotifs);

      setIsSupabaseLive(true);
    } catch (err) {
      console.warn('Could not sync with Supabase backend, falling back to local dataset:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSupabaseConfigured()) {
      refreshAllFromSupabase();
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        isSupabaseLive,
        isLoading,
        members,
        newsArticles,
        chatMessages,
        ads,
        inquiries,
        emailNotifications,
        setMembers,
        setNewsArticles,
        setChatMessages,
        setAds,
        setInquiries,
        setEmailNotifications,
        refreshAllFromSupabase
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
