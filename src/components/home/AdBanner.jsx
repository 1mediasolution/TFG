import React from 'react';
import { AdvertisementBanner } from '../layout/AdvertisementBanner';
import { INITIAL_ADS } from '../../data/mockData';

export const AdBanner = ({ slot = 'top_leaderboard', className = '' }) => {
  const ad = INITIAL_ADS.find((a) => a.slot === slot) || INITIAL_ADS[0];

  return (
    <div className={`my-4 ${className}`}>
      <AdvertisementBanner ad={ad} slot={slot} />
    </div>
  );
};

export default AdBanner;
