import React, { useEffect } from 'react';
import { Community } from './Community';
import { useCommunity } from '../../context/CommunityContext';

export const DealsPartnerships = () => {
  const { selectChannel } = useCommunity();

  useEffect(() => {
    selectChannel('deals');
  }, [selectChannel]);

  return <Community />;
};

export default DealsPartnerships;
