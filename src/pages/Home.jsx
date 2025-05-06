import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../pages/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import logo from '../images/ChatGPT Image May 5, 2025, 08_11_37 PM.png';

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const isLoggedIn = localStorage.getItem('token'); // Auth check

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products/all');
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      toast.error('Please log in to add items to your cart');
      navigate('/login');
      return;
    }

    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
      toast.error(`${product.title} is already in the cart!`);
    } else {
      dispatch(addItem(product));
      toast.success(`${product.title} added to cart!`);
    }
  };

  const handleBuyNow = (product) => {
    if (!isLoggedIn) {
      toast.error('Please log in to buy items');
      navigate('/login');
      return;
    }

    const exists = cartItems.find((item) => item._id === product._id);
    if (!exists) {
      dispatch(addItem(product));
      toast.success(`${product.title} added to cart!`);
    }
    navigate('/checkout');
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section style={styles.introSection} className="text-white text-center d-flex flex-column align-items-center justify-content-center">
        <img 
          src={logo}
          alt="Shopping Hero"
          style={styles.heroImage}
          className="mb-4 rounded shadow"
        />
        <h1 className="display-4 fw-bold">Welcome to MultiVendor</h1>
        <p className="lead mt-2 mb-4">India’s Most Trusted Marketplace</p>
        <p className="fs-5 text-light mb-4">Explore exclusive deals, top-rated sellers, and seamless shopping—all in one place.</p>
        <a href="#products" className="btn btn-warning fw-semibold px-5 py-2 rounded-pill fs-5">Explore Now</a>
      </section>

      {/* Features Section */}
      <section style={styles.featuresSection} className="text-center py-5">
        <Row className="g-4">
          <Col md={4}>
            <div className="p-4 shadow-sm bg-white rounded">
              <img src="https://img.icons8.com/ios-filled/50/4A6CF7/shipped.png" alt="Shipping" />
              <h5 className="mt-3 fw-bold">Free Shipping</h5>
              <p className="text-muted">On all orders over ₹500</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 shadow-sm bg-white rounded">
              <img src="https://img.icons8.com/ios-filled/50/4A6CF7/return.png" alt="Returns" />
              <h5 className="mt-3 fw-bold">Easy Returns</h5>
              <p className="text-muted">30-day return policy</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="p-4 shadow-sm bg-white rounded">
              <img src="https://img.icons8.com/ios-filled/50/4A6CF7/security-checked.png" alt="Secure" />
              <h5 className="mt-3 fw-bold">Secure Payment</h5>
              <p className="text-muted">Protected by industry leaders</p>
            </div>
          </Col>
        </Row>
      </section>

      {/* Product Grid */}
      <section id="products" style={styles.container}>
        <h2 style={styles.heading}>🛍️ Explore Our Products</h2>
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product._id} md={6} lg={4}>
              <Card className="shadow-lg border-0 h-100" style={styles.card}>
                <Card.Img
                  variant="top"
                  src={
                    product.image === 'noimage.jpg'
                      ? 'https://via.placeholder.com/300x200.png?text=No+Image'
                      : `http://localhost:5000/uploads/${product.image}`
                  }
                  alt={product.title}
                  style={styles.cardImage}
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

export default Home;

const styles = {
  container: {
    padding: '60px 20px',
    backgroundColor: '#F8F9FC',
    minHeight: '80vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '40px',
    color: '#333',
    fontWeight: '600',
  },
  heroImage: {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '10px',
    maxHeight: '400px',
    objectFit: 'cover',
  },
  introSection: {
    background: 'linear-gradient(to right, #4A6CF7, #6D9EFF)',
    padding: '120px 20px',
    textShadow: '1px 1px 5px rgba(0,0,0,0.2)',
  },
  featuresSection: {
    backgroundColor: '#F8F9FC',
  },
  card: {
    borderRadius: '10px',
    backgroundColor: '#fff',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  cardImage: {
    height: '250px',
    objectFit: 'contain',
    padding: '1rem',
    borderRadius: '10px',
  },
};
