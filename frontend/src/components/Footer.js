import React from 'react';
import '../styles/Footer.css';  // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">© {new Date().getFullYear()} Troy by <a href="https://github.com/Pjatte1337" target="_blank" rel="noopener noreferrer">Pjatte1337</a></p>
    </footer>
  );
};

export default Footer;
