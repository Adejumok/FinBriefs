import React from 'react';
import CompanyProfile from './components/CompanyProfile';
import CompanyNews from './components/CompanyNews';
import { companyMapping } from './companyMapping';

const App: React.FC = () => {
  const companies = Object.keys(companyMapping);

  return (
    <div>
      <main>
        {companies.map((company) => (
          <div key={company}>
            <CompanyProfile symbol={companyMapping[company]} />
            <CompanyNews symbol={companyMapping[company]}/>
          </div>
        ))}
      </main>
    </div>
  );
};

export default App;

