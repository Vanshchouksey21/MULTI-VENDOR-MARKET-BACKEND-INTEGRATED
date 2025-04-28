import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SellerDashboard = () => {
  const [products, setProducts] = useState([
    { name: 'Product 1', price: 500 },
    { name: 'Product 2', price: 1000 }
  ]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      setProducts([...products, newProduct]);
      setNewProduct({ name: '', price: '' });
    }
  };

  return (
    <>
      <Navbar />

      <section style={styles.container}>
        <div style={styles.sidebar}>
          <h3 style={styles.sidebarHeading}>Seller Dashboard</h3>
          <ul style={styles.navList}>
            <li><a href="/products" style={styles.navLink}>My Products</a></li>
            <li><a href="/orders" style={styles.navLink}>Orders</a></li>
            <li><a href="/sales" style={styles.navLink}>Sales Reports</a></li>
            <li><a href="/profile" style={styles.navLink}>Profile</a></li>
          </ul>
        </div>

        <div style={styles.content}>
          <h2 style={styles.contentHeading}>Welcome to your Seller Dashboard!</h2>

          {/* Add Product Form */}
          <form onSubmit={handleAddProduct} style={styles.form}>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              style={styles.input}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>Add Product</button>
          </form>

          {/* Product List */}
          <div style={styles.stats}>
            {products.map((product, index) => (
              <div key={index} style={styles.statBox}>
                <p style={styles.statTitle}>{product.name}</p>
                <p style={styles.statValue}>₹ {product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SellerDashboard;

// CSS
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
  form: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    marginBottom: '30px',
  },
  input: {
    padding: '12px',
    marginBottom: '10px',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#4A6CF7',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '18px',
    cursor: 'pointer',
    width: '100%',
  },
  stats: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  statBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    width: '200px',
    textAlign: 'center',
  },
  statTitle: {
    fontSize: '18px',
    color: '#555',
  },
  statValue: {
    fontSize: '22px',
    color: '#4A6CF7',
    fontWeight: 'bold',
  },
};
