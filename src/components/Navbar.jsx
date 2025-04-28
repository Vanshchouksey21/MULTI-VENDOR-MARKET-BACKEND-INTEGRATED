import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoText}>MultiVendor</Link>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/products" style={styles.link}>Products</Link></li>
        <li><Link to="/cart" style={styles.link}>Cart</Link></li>
       
        <li><Link to="/login" style={styles.button}>Login</Link></li>
        

      </ul>
    </nav>
  );
};

export default Navbar;

const styles = {
  navbar: {
    backgroundColor: '#4A6CF7',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  logoText: {
    color: '#ffffff',
    textDecoration: 'none',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '25px',
    alignItems: 'center',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '18px',
  },
  button: {
    backgroundColor: '#FF7F50',
    padding: '8px 16px',
    borderRadius: '6px',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
  },
};
