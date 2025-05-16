import React from 'react';
import './Footer.css';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { colorTheme } = useTheme();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact</h3>
          <p>
            <a href="mailto:goncalo_c_ferreira@hotmail.com">
            goncalo_c_ferreira@hotmail.com
            </a>
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Social</h3>
          <div className="social-links">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} Gonçalo Ferreira. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 