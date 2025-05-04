// src/pages/Home.jsx
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

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

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
    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
      toast.error(`${product.title} is already in the cart!`);
    } else {
      dispatch(addItem(product));
      toast.success(`${product.title} added to cart!`);
    }
  };

  const handleBuyNow = (product) => {
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
      <section className="hero-section text-white text-center d-flex align-items-center justify-content-center flex-column" style={styles.hero}>
        <h1 className="display-6 fw-bold mb-2">Welcome to MultiVendor</h1>
        <p className="lead mb-3">Top deals from multiple trusted sellers</p>
        <a href="#products" className="btn btn-warning fw-semibold px-4 py-2">Shop Now</a>
      </section>

      {/* Product Grid */}
      <section id="products" style={styles.container}>
        <h2 style={styles.heading}>🛍️ Explore Our Products</h2>
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

export default Home;

const styles = {
  container: {
    padding: '50px 20px',
    backgroundColor: '#F8F9FC',
    minHeight: '80vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    marginBottom: '40px',
    color: '#333',
  },
  hero: {
    background: '#4A6CF7',
    padding: '60px 20px',
    minHeight: '250px',
  },
};
