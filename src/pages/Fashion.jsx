import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../pages/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import vdo from "../images/853800-hd_1920_1080_25fps.mp4";

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Fashion = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const productSectionRef = useRef(null);
  const navigate = useNavigate();

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

    if (!userId) {
      toast.warning("Please log in to add items to your cart.");
      window.location.href = "/login";
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
    const userId = localStorage.getItem("userId");

    if (!userId) {
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

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />

      {/* Hero Section with Video Background */}
      <section style={styles.videoHeroSection}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={styles.videoBackground}
        >
          <source src={vdo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        
      </section>

      {/* Product Grid */}
      <section ref={productSectionRef} style={styles.container}>
        <h1 style={styles.heroTitle}>Step into Styles</h1>
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={6} lg={4}>
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
  videoHeroSection: {
    position: 'relative',
    width: '100%',
    height: '550px',

    overflow: 'hidden',
  },
  videoBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
  },
  videoOverlay: {
    position: 'relative',
    zIndex: 2,
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '0 1rem',
  },
  heroHeading: {
    fontSize: '3rem',
    fontWeight: '800',
    marginBottom: '1rem',
    color: '#fff',
  },
  accent: {
    color: '#FF7F50',
  },
  heroTagline: {
    fontSize: '1.2rem',
    maxWidth: '700px',
    color: '#f0f0f0',
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
