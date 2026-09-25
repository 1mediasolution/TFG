import React, { useEffect } from 'react';
import { Community } from './Community';
import { useCommunity } from '../../context/CommunityContext';

export const Announcements = () => {
  const { selectChannel } = useCommunity();

  useEffect(() => {
    selectChannel('announcements');
  }, [selectChannel]);

  return <Community />;
};

export default Announcements;
