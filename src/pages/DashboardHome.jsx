import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardHome = () => {
  const [stats, setStats] = useState({ products: 0, earnings: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');  // Get the token from local storage
    const userId = localStorage.getItem('userId');  // Get the user ID from local storage

    if (token && userId) {
      axios.get(`http://localhost:5000/products/seller/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Send token in headers for authentication
        },
      })
        .then(res => {
          const products = res.data;
          setStats({
            products: products.length,
            earnings: products.reduce((sum, p) => sum + p.price, 0),
          });
        })
        .catch(err => console.error('Error fetching products:', err));
    } else {
      console.error('User not authenticated');
    }
  }, []);

  return (
    <div style={styles.container}>
      <h2>Welcome to Your Seller Dashboard!</h2>
      <div style={styles.statsContainer}>
        <div style={styles.card}><h4>Total Products</h4><p>{stats.products}</p></div>
        <div style={styles.card}><h4>Earnings</h4><p>₹{stats.earnings}</p></div>
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
