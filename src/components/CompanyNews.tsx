import React, { useEffect, useState } from 'react';
import { fetchCompanyNews, ICompanyNews } from '../services/finnhubService';

interface CompanyNewsProps {
  symbol: string;
}

const CompanyNews: React.FC<CompanyNewsProps> = ({symbol}) => {
  const [news, setNews] = useState<ICompanyNews[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getNews = async () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0'); 
        const day = String(now.getDate()).padStart(2, '0');
  
        // Format from date (12 AM today)
        const from = `${year}-${month}-${day}`;
  
        // Format to date (current time)
        const to = `${year}-${month}-${day}`;
      try {
        const newsData = await fetchCompanyNews(symbol, from, to);
        console.log("Fetched company news for", symbol, ":", newsData);
        setNews(newsData.slice(0, 5)); 
      } catch (error) {
        console.error(`Error fetching company news for ${symbol}:`, error);
        setError(`Error fetching company news for ${symbol}`);
      }
    };

    getNews();
  }, [symbol]);

  return (
    <div>
      {error && <p>{error}</p>}
      {news.length > 0 ? (
        <div>
          <h2>News for {symbol}</h2>
          {news.map((article, index) => (
            <div key={index}>
              <h3>{article.headline}</h3>
              <p>{new Date(article.datetime * 1000).toLocaleString()}</p>
              <p>{article.summary}<a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
              {article.image && (
                <img
                  src={article.image}
                  alt={article.headline}
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginTop: '10px'
                  }}
                />
              )}            
              </div>
          ))}
        </div>
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
};

export default CompanyNews;
