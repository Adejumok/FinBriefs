import React, { useEffect, useState } from 'react';
import { fetchCompanyProfile, ICompanyProfile } from '../services/finnhubService';

interface CompanyProfileProps {
  symbol: string;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ symbol }) => {
  const [profile, setProfile] = useState<ICompanyProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const companyProfile = await fetchCompanyProfile(symbol);
        console.log("Fetched company profile for", symbol, ":", companyProfile);
        setProfile(companyProfile);
      } catch (error) {
        console.error(`Error fetching company profile for ${symbol}:`, error);
        setError(`Error fetching company profile for ${symbol}`);
      }
    };

    getData();
  }, [symbol]);

  return (
    <div className="company-profile">
      {error && <p className="error-message">{error}</p>}
      {profile ? (
        <div className="company-profile-content">
          <div className='company-profile-container'>
            {profile.logo && <img src={profile.logo} alt={`${profile.name} logo`} className='company-profile-logo' />}
            <h2>{profile.name} ({profile.ticker})</h2>
          </div>
        </div>
      ) : (
        <p className="loading-message">Loading...</p>
      )}
    </div>
  );
};

export default CompanyProfile;
