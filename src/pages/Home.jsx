import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero" style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Welcome to MultiVendor Store!</h1>
          <p style={styles.heroSubtitle}>Shop from multiple vendors at the best prices!</p>
          <button style={styles.heroButton}>Shop Now</button>
        </div>
      </section>

      {/* Categories Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Shop by Categories</h2>
        <div style={styles.categoryContainer}>
          <div style={styles.categoryBox}>Watches</div>
          <div style={styles.categoryBox}>Computers</div>
          <div style={styles.categoryBox}>Footwear</div>
          <div style={styles.categoryBox}>Accessories</div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Featured Products</h2>
        <div style={styles.productsGrid}>

          
          {/* Dummy Products */}
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;

// Inline Styles
const styles = {
  heroSection: {
    backgroundColor: '#4A6CF7',
    color: '#ffffff',
    padding: '80px 20px',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  heroTitle: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  heroSubtitle: {
    fontSize: '20px',
    marginBottom: '30px',
  },
  heroButton: {
    backgroundColor: '#FF7F50',
    color: '#fff',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '18px',
    cursor: 'pointer',
  },
  section: {
    padding: '60px 20px',
    backgroundColor: '#F8F9FC',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '32px',
    marginBottom: '40px',
    color: '#333333',
  },
  categoryContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  categoryBox: {
    backgroundColor: '#D5E6FB',
    padding: '20px 40px',
    borderRadius: '8px',
    fontSize: '20px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: '0.3s',
  },
  productsGrid: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '30px',
  },
};
