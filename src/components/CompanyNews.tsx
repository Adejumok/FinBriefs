import React, { useEffect, useState } from 'react';
import { fetchCompanyNews, ICompanyNews } from '../services/finnhubService';

interface CompanyNewsProps {
  symbol: string;
}

const CompanyNews: React.FC<CompanyNewsProps> = ({ symbol }) => {
  const [news, setNews] = useState<ICompanyNews[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching company news for ${symbol}:`, error);
        setError(`Error fetching company news for ${symbol}`);
        setLoading(false);
      }
    };

    getNews();
  }, [symbol]);

  return (
    <div className="company-news-container">
      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p className="loading-message">Loading news...</p>
      ) : (
        <div>
          <h2 className="news-heading">News for {symbol}</h2>
          {news.map((article, index) => (
            <article className="news-article" key={index}>
              <h3 className="article-headline">{article.headline}</h3>
              <p className="article-date">{new Date(article.datetime * 1000).toLocaleString()}</p>
              <p className="article-summary">{article.summary} <a className="read-more-btn" href={article.url} target="_blank" rel="noopener noreferrer">Read more</a></p>
              {article.image && (
                <img
                  className="article-image"
                  src={article.image}
                  alt={article.headline}
                />
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanyNews;
