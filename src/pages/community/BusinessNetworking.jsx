import React, { useEffect } from 'react';
import { Community } from './Community';
import { useCommunity } from '../../context/CommunityContext';

export const BusinessNetworking = () => {
  const { selectChannel } = useCommunity();

  useEffect(() => {
    selectChannel('networking');
  }, [selectChannel]);

  return <Community />;
};

export default BusinessNetworking;
