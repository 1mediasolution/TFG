import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Pause, Play, RefreshCw } from 'lucide-react';
import { MarketTickerItem } from '../types';

interface MarketTickerBarProps {
  tickers: MarketTickerItem[];
}

export const MarketTickerBar: React.FC<MarketTickerBarProps> = ({ tickers }) => {
  const [tickerList, setTickerList] = useState<MarketTickerItem[]>(tickers);
  const [isPaused, setIsPaused] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Live (1s)');

  // Micro fluctuation effect simulating real-time stock ticks
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setTickerList((prev) =>
        prev.map((ticker) => {
          // Occasionally tick a stock slightly
          if (Math.random() > 0.6) {
            const rawNumeric = parseFloat(ticker.price.replace(/[^\d.-]/g, ''));
            if (!isNaN(rawNumeric) && rawNumeric > 0) {
              const delta = (Math.random() - 0.48) * (rawNumeric * 0.0008);
              const newPriceVal = (rawNumeric + delta).toFixed(2);
              const formattedPrice = ticker.price.startsWith('₹')
                ? `₹${Number(newPriceVal).toLocaleString('en-IN')}`
                : ticker.price.startsWith('$')
                ? `$${Number(newPriceVal).toLocaleString('en-US')}`
                : Number(newPriceVal).toLocaleString('en-IN');

              return {
                ...ticker,
                price: formattedPrice
              };
            }
          }
          return ticker;
        })
      );
      setLastUpdated('Updated just now');
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      id="market-ticker-bar"
      className="w-full bg-neutral-950/95 border-b border-neutral-800 text-xs py-2 px-3 sm:px-6 select-none sticky top-0 z-30 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Market Label Badge */}
        <div className="flex items-center space-x-2 shrink-0 border-r border-neutral-800 pr-3 mr-3 sm:pr-4 sm:mr-4">
          <div className="flex items-center space-x-1.5 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-700/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span className="text-[11px] font-bold text-neutral-200 tracking-wide">
              NSE / BSE
            </span>
          </div>
          <span className="text-[10px] text-amber-400 font-mono hidden lg:inline uppercase tracking-wider">
            Live Ticker
          </span>
        </div>

        {/* Scrolling / Running Ticker Row */}
        <div
          className="flex-1 overflow-x-auto no-scrollbar flex items-center space-x-5 text-neutral-300"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {tickerList.map((ticker) => {
            const isIndian = ticker.isIndianIndex || ['NIFTY 50', 'SENSEX', 'BANK NIFTY', 'RELIANCE', 'TCS', 'HDFC BANK', 'INFY'].includes(ticker.symbol);

            return (
              <div
                key={ticker.symbol}
                className={`flex items-center space-x-2 shrink-0 px-2 py-1 rounded transition-colors ${
                  isIndian ? 'bg-neutral-900/60 border border-neutral-800/80 hover:border-amber-500/40' : ''
                }`}
              >
                <div className="flex items-center space-x-1">
                  {isIndian && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" title="Indian Market constituent" />
                  )}
                  <span className="font-bold text-[11px] text-neutral-200">{ticker.symbol}</span>
                </div>
                <span className="font-mono font-semibold text-xs text-neutral-100">{ticker.price}</span>
                <span
                  className={`flex items-center text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    ticker.isPositive
                      ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/50'
                      : 'text-rose-400 bg-rose-950/60 border border-rose-800/50'
                  }`}
                >
                  {ticker.isPositive ? (
                    <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                  )}
                  {ticker.change}
                </span>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2 shrink-0 pl-3 ml-3 border-l border-neutral-800 text-[11px] text-neutral-400">
          <button
            onClick={() => setIsPaused((p) => !p)}
            className="p-1 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors"
            title={isPaused ? 'Resume ticker' : 'Pause ticker'}
          >
            {isPaused ? <Play className="w-3 h-3 text-amber-400" /> : <Pause className="w-3 h-3" />}
          </button>
          <span className="font-mono text-[10px] hidden sm:inline text-neutral-500">
            {lastUpdated}
          </span>
        </div>
      </div>
    </div>
  );
};
