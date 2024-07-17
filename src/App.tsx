import React from 'react';
import Header from './components/Header';
import CompanyProfile from './components/CompanyProfile';
import CompanyNews from './components/CompanyNews';
import StockData from './components/StockData';
import { companyMapping } from './companyMapping';
import Footer from './components/Footer';
import './index.css';

const App: React.FC = () => {
  const companies = Object.keys(companyMapping);

  return (
    <div>
      <Header />
      <main>
        {companies.map((company) => (
          <div key={company}>
            <CompanyProfile symbol={companyMapping[company]} />
            <StockData symbol={companyMapping[company]} />
            <CompanyNews symbol={companyMapping[company]}/>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default App;

