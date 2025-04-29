import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Myp = () => {
  const [products, setProducts] = useState([]);

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products/all'); // Filter by seller if needed
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch products.');
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div>
      <h3 style={{ marginBottom: '20px', color: '#333' }}>My Products</h3>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product._id} style={styles.card}>
            <img
              src={
                product.image === 'noimage.jpg'
                  ? 'https://via.placeholder.com/300x200.png?text=No+Image'
                  : `http://localhost:5000/uploads/${product.image}`
              }
              alt={product.title}
              style={styles.image}
            />
            <h5>{product.title}</h5>
            <p>₹{product.price}</p>
            <p style={{ fontSize: '14px', color: '#777' }}>{product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myp;

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '15px',
    textAlign: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginBottom: '10px',
  },
};
