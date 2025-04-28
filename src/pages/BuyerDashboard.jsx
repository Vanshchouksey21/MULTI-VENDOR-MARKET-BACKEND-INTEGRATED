import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BuyerDashboard = () => {
  return (
    <>
      <Navbar />

      <section style={styles.container}>
        <div style={styles.sidebar}>
          <h3 style={styles.sidebarHeading}>Buyer Dashboard</h3>
          <ul style={styles.navList}>
            <li><a href="/orders" style={styles.navLink}>My Orders</a></li>
            <li><a href="/wishlist" style={styles.navLink}>My Wishlist</a></li>
            <li><a href="/profile" style={styles.navLink}>Profile</a></li>
          </ul>
        </div>

        <div style={styles.content}>
          <h2 style={styles.contentHeading}>Welcome to your Dashboard!</h2>
          <div style={styles.stats}>
            <div style={styles.statBox}>
              <p style={styles.statTitle}>Total Orders</p>
              <p style={styles.statValue}>5</p>
            </div>
            <div style={styles.statBox}>
              <p style={styles.statTitle}>Items in Wishlist</p>
              <p style={styles.statValue}>3</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default BuyerDashboard;

const styles = {
  container: {
    display: 'flex',
    minHeight: '80vh',
    backgroundColor: '#F8F9FC',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#333333',
    color: '#fff',
    padding: '20px',
  },
  sidebarHeading: {
    color: '#FF7F50',
    fontSize: '24px',
    marginBottom: '20px',
  },
  navList: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 0',
    display: 'block',
    fontSize: '18px',
  },
  content: {
    flex: '1',
    padding: '30px',
  },
  contentHeading: {
    fontSize: '30px',
    color: '#333333',
    marginBottom: '20px',
  },
  stats: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  statBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    width: '48%',
  },
  statTitle: {
    fontSize: '18px',
    color: '#555',
  },
  statValue: {
    fontSize: '24px',
    color: '#4A6CF7',
    fontWeight: 'bold',
  },
};
