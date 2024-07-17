import React from 'react';
import logo from '../assets/FinBriefsLogoB.png';

const Header: React.FC = () => {
  return (
    <header>
      <img src={logo} alt="Company Logo" />
      <h1>Top Companies Financial Info</h1>
    </header>
  );
};

export default Header;
