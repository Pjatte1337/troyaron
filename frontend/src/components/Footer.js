import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Troy by Pjatte1337</p>
    </footer>
  );
};

const styles = {
  footer: {
    marginTop: '80px',
    padding: '20px',
    textAlign: 'center',
    background: '#eee',
    color: '#444',
  }
};

export default Footer;
