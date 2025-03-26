import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Troy</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/admin" style={styles.link}>Admin</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    background: '#222',
    color: '#fff',
  },
  logo: {
    margin: 0,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '20px',
    fontSize: '16px',
  }
};

export default Navbar;
