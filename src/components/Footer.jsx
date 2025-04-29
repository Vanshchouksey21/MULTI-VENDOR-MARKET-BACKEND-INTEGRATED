import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.section}>
          <h4 style={styles.heading}>About Us</h4>
          <p style={styles.text}>
            MultiVendor is your go-to platform for discovering top-notch products from multiple vendors.
          </p>
        </div>
        <div style={styles.section}>
          <h4 style={styles.heading}>Quick Links</h4>
          <ul style={styles.links}>
            <li><Link to="/products" style={styles.link}>Products</Link></li>
            <li><Link to="/about" style={styles.link}>About Us</Link></li>
            <li><Link to="/contact" style={styles.link}>Contact</Link></li>
            <li><Link to="/privacy" style={styles.link}>Privacy Policy</Link></li>
          </ul>
        </div>
        <div style={styles.section}>
          <h4 style={styles.heading}>Follow Us</h4>
          <div style={styles.socialIcons}>
            <FaFacebook style={styles.icon} />
            <FaTwitter style={styles.icon} />
            <FaInstagram style={styles.icon} />
            <FaLinkedin style={styles.icon} />
          </div>
        </div>
      </div>
      <div style={styles.bottomText}>
        <p style={styles.text}>© 2025 MultiVendor. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

const styles = {
  footer: {
    backgroundColor: '#333333',
    color: '#ffffff',
    padding: '40px 20px',
    textAlign: 'center',
    marginTop: '40px',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    flexWrap: 'wrap',
  },
  section: {
    flex: 1,
    minWidth: '250px',
    maxWidth: '300px',
  },
  heading: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#4A6CF7',
    marginBottom: '15px',
  },
  text: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#D5E6FB',
  },
  links: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#D5E6FB',
    fontSize: '16px',
    display: 'block',
    marginBottom: '8px',
  },
  socialIcons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '10px',
  },
  icon: {
    fontSize: '24px',
    color: '#FF7F50',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
  },
  iconHover: {
    color: '#4A6CF7',
  },
  bottomText: {
    marginTop: '30px',
    fontSize: '14px',
    color: '#D5E6FB',
  },
};
