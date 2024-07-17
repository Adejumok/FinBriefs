import React, { useEffect, useState } from 'react';
import { fetchStockData, IStockData } from '../services/finnhubService';

interface StockDataProps {
  symbol: string;
}

const StockData: React.FC<StockDataProps> = ({ symbol }) => {
  const [stockData, setStockData] = useState<IStockData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchStockData(symbol);
        setStockData(data);
      } catch (error) {
        console.error(`Error fetching stock data for ${symbol}:`, error);
        setError(`Error fetching stock data for ${symbol}`);
      }
    };

    getData();
  }, [symbol]);

  return (
    <div className="stock-data">
      {error && <p>{error}</p>}
      {stockData ? (
        <div>
          <h2>Stock Data for {symbol}</h2>
          <p>Current Price: ${stockData.currentPrice.toFixed(2)}</p>
          <p>High: ${stockData.high.toFixed(2)}</p>
          <p>Low: ${stockData.low.toFixed(2)}</p>
          <p>Open: ${stockData.open.toFixed(2)}</p>
        </div>
      ) : (
        <p>Loading stock data...</p>
      )}
    </div>
  );
};

export default StockData;
