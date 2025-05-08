import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../pages/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Fashion = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const productSectionRef = useRef(null); // Ref for scrolling
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products/all');
        const fashionProducts = res.data.filter((product) =>
          product.category.toLowerCase().includes('fashion')
        );
        setProducts(fashionProducts);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const userId = localStorage.getItem("userId");

    // Check if the user is logged in
    if (!userId) {
      // Redirect to login page if not logged in
      toast.warning("Please log in to add items to your cart.");
      window.location.href = "/login"; // Assuming '/login' is your login route
      return;
    }

    // Proceed with adding to the cart if the user is logged in
    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
      toast.error(`${product.title} is already in the cart!`);
    } else {
      dispatch(addItem(product));
      toast.success(`${product.title} added to cart!`);
    }
  };

  const handleBuyNow = (product) => {
    const userId = localStorage.getItem("userId");

    // Check if the user is logged in
    if (!userId) {
      toast.error('Please log in to buy items');
      navigate('/login'); // Navigate to the login page
      return;
    }

    const exists = cartItems.find((item) => item._id === product._id);
    if (!exists) {
      dispatch(addItem(product));
      toast.success(`${product.title} added to cart!`);
    }

    // After adding the product, navigate to the checkout page
    navigate('/checkout');
  };

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />

      {/* Hero Section with Image and Text */}
      <section style={styles.heroSection}>
  <div style={styles.heroContent}>
    <h2 style={styles.heroHeading}>
      <span style={styles.accent}>Unleash Your Style </span>
    </h2>
    <p style={styles.heroTagline}>
      Fashion is the armor to survive everyday life. Whether you're dressing for comfort or couture, let your outfit tell your story.
    </p>
    <button className="btn btn-primary mt-3 px-4 py-2 fs-6 fw-semibold" onClick={scrollToProducts}>
  Explore Collection
</button>

  </div>
</section>


      {/* Product Grid */}
      <section ref={productSectionRef} style={styles.container}>  
        <h1 style={styles.heroTitle}>Step into Styles </h1>
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product._id} md={6} lg={4}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Img
                  variant="top"
                  src={
                    product.image === 'noimage.jpg'
                      ? 'https://via.placeholder.com/300x200.png?text=No+Image'
                      : `http://localhost:5000/uploads/${product.image}`
                  }
                  alt={product.title}
                  style={{ height: '250px', objectFit: 'contain', padding: '1rem' }}
                />
                <Card.Body className="text-center d-flex flex-column">
                  <Card.Title className="text-dark fw-bold fs-5">{product.title}</Card.Title>
                  <Card.Text className="text-primary fw-semibold fs-6">₹{product.price}</Card.Text>
                  <Card.Text className="text-muted small">Category: {product.category}</Card.Text>
                  <div className="d-flex justify-content-center mt-auto gap-3">
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleBuyNow(product)}>
                      Buy Now
                    </button>
                    <button className="btn btn-outline-primary btn-sm" onClick={() => handleAddToCart(product)}>
                      <FaShoppingCart />
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <Footer />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
};

export default Fashion;

// ----------------------
// CSS-in-JS Styles
// ----------------------

const styles = {
  heroSection: {
    padding: '100px 20px',
    backgroundColor: '#ffffff',
    color: '#333333',
    textAlign: 'center',
    borderBottom: '1px solid #e0e0e0',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  },
  heroHeading: {
    fontSize: '3rem',
    fontWeight: '800',
    letterSpacing: '-0.5px',
    lineHeight: '1.2',
    color: '#4A6CF7',
  },
  heroTagline: {
    fontSize: '1.2rem',
    color: '#555555',
    maxWidth: '600px',
    lineHeight: '1.6',
  },
  container: {
    padding: '50px 20px',
    backgroundColor: '#F8F9FC',
    minHeight: '80vh',
  },
  heroTitle: {
    fontSize: '2.5rem',
    color: '#4A6CF7',
    textAlign: 'center',
    fontWeight: '700',
    marginBottom: '30px',
  },
};
