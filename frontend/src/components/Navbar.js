import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';  // Importing the CSS file

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">Troy</Link>
      <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="active">Home</Link>
        <Link to="/admin">Admin</Link>
      </div>
      <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
        ☰
      </div>
    </nav>
  );
};

export default Navbar;
