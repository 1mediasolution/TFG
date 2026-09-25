import React from 'react';
import { MarketTickerBar } from '../layout/MarketTickerBar';
import { MARKET_TICKERS } from '../../data/mockData';

export const StockTicker = () => {
  return <MarketTickerBar tickers={MARKET_TICKERS} />;
};

export default StockTicker;
