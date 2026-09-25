import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { founderService } from '../services/founderService';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const auth = useContext(AuthContext);
  const [profile, setProfile] = useState(auth?.user || null);
  const [customDomain, setCustomDomain] = useState('thefoundergrid.com');

  useEffect(() => {
    if (auth?.user) {
      setProfile(auth.user);
    }
  }, [auth?.user]);

  const updateProfile = async (updates) => {
    if (!profile?.id) return;
    const res = await founderService.updateProfile(profile.id, updates);
    const updated = { ...profile, ...updates };
    setProfile(updated);
    if (auth?.updateUser) {
      auth.updateUser(updates);
    }
    return res;
  };

  const updateCustomDomain = (newDomain) => {
    setCustomDomain(newDomain);
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        setProfile,
        updateProfile,
        customDomain,
        updateCustomDomain,
        tier: profile?.tier || 'free',
        isExecutive: profile?.tier === 'executive_fellow',
        isPro: profile?.tier === 'founder_pro' || profile?.tier === 'executive_fellow',
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
