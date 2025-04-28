import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ProductDetails = () => {
  const { id } = useParams(); // URL se product id milegi

  return (
    <>
      <Navbar />

      <section style={styles.container}>
        {/* Product Image */}
        <div style={styles.imageSection}>
          <img
            src="https://via.placeholder.com/400"
            alt="Product"
            style={styles.image}
          />
        </div>

        {/* Product Info */}
        <div style={styles.infoSection}>
          <h1 style={styles.title}>Product Name</h1>
          <p style={styles.price}>$99.99</p>
          <p style={styles.description}>
            This is a detailed description of the product. It explains the features, specifications, and benefits.
          </p>
          <button style={styles.button}>Add to Cart</button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductDetails;

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '50px 20px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
    minHeight: '80vh',
  },
  imageSection: {
    flex: '1',
    minWidth: '300px',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  infoSection: {
    flex: '1',
    minWidth: '300px',
    padding: '20px',
  },
  title: {
    fontSize: '36px',
    color: '#333333',
    marginBottom: '15px',
  },
  price: {
    fontSize: '28px',
    color: '#4A6CF7',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#FF7F50',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '6px',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
  },
};
