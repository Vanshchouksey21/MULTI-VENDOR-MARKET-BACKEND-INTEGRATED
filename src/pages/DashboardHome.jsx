// src/pages/DashboardHome.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardHome = () => {
  const [stats, setStats] = useState({ products: 0, earnings: 0, sold: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      axios.get(`http://localhost:5000/products/seller/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          const products = res.data;

          const soldCount = products.reduce((count, product) => {
            return count + (product.stock < product.initialStock ? 1 : 0);
          }, 0);

          const totalEarnings = products.reduce((sum, p) => sum + (p.earnings || 0), 0);

          setStats({
            products: products.length,
            earnings: totalEarnings,
            sold: soldCount
          });
        })
        .catch(err => console.error('Error fetching products:', err));
    } else {
      console.error('User not authenticated');
    }
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to Your Seller Dashboard!</h2>
      <div style={styles.statsContainer}>
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Total Products</h4>
          <p style={styles.cardValue}>{stats.products}</p>
        </div>
        
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>Earnings</h4>
          <p style={styles.cardValue}>₹{stats.earnings}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '40px 50px',
    borderRadius: '10px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
    maxWidth: '900px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '30px',
    marginTop: '30px',
  },
  card: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '10px',
  },
  cardValue: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#4A6CF7',
  },
};
