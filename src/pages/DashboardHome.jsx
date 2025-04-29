import React from 'react';

const DashboardHome = () => {
  return (
    <div style={styles.container}>
      <h2>Welcome to Your Seller Dashboard!</h2>
      <p>Use the sidebar to add products or manage your listings.</p>
      <div style={styles.statsContainer}>
        <div style={styles.card}>
          <h4>Total Products</h4>
          <p>12</p>
        </div>
        <div style={styles.card}>
          <h4>Pending Orders</h4>
          <p>4</p>
        </div>
        <div style={styles.card}>
          <h4>Earnings</h4>
          <p>₹18,500</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  statsContainer: {
    display: 'flex',
    gap: '20px',
    marginTop: '30px',
  },
  card: {
    flex: 1,
    backgroundColor: '#f1f4ff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
  },
};
