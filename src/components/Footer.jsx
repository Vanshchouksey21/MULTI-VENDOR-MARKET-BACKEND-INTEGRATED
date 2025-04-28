import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2025 MultiVendor. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

const styles = {
  footer: {
    backgroundColor: '#333333',
    color: '#ffffff',
    padding: '20px 0',
    textAlign: 'center',
    marginTop: '40px',
  },
  text: {
    fontSize: '16px',
  },
};
