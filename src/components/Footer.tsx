import React from 'react';
import logo from '../assets/FinBriefsLogoB.png';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className='footer'>
            <div className='footer-container'>
                <img className='footer-logo' src={logo} alt="Company Logo" />
                <p className='footer-text'>FinBriefs is a technology blog, we sharing marketing, news and gadget articles.</p>
            </div>
            <div className='social'>
                <a href="#" className="fa fa-facebook"></a>
                <a href="#" className="fa fa-twitter"></a>
                <a href="#" className="fa fa-instagram"></a>
                <a href="#" className="fa fa-linkedin"></a>
            </div>
            <div className="newsletter-widget text-left">
                <form className="form-inline">
                    <input type="text" className="form-control" placeholder="Enter your email address" />
                    <button type="submit" className="btn">SUBMIT</button>
                </form>
            </div>
            </div>
            
        </footer>
    );
};

export default Footer;
