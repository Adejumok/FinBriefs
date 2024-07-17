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
    <div>
      {error && <p>{error}</p>}
      {profile ? (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            {profile.logo && <img src={profile.logo} alt={`${profile.name} logo`} style={{ width: '50px', height: 'auto', marginRight: '10px' }} />}
            <h2>{profile.name} ({profile.ticker})</h2>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CompanyProfile;
