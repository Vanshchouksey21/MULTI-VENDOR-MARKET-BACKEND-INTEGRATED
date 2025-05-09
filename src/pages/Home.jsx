import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../pages/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import logo from '../images/ChatGPT Image May 5, 2025, 08_11_37 PM.png';
import fashion from "../images/ChatGPT Image May 6, 2025, 10_32_02 PM.png"
import electronics from "../images/ChatGPT Image May 6, 2025, 10_32_05 PM.png"
import beauty from "../images/ChatGPT Image May 6, 2025, 10_32_00 PM.png"
import food from "../images/ChatGPT Image May 6, 2025, 10_31_58 PM.png"
import vdo from "../images/2675511-hd_1920_1080_24fps.mp4"

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const isLoggedIn = localStorage.getItem('token');

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
    AOS.init({ duration: 1000 });
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
      <motion.section
        style={styles.introSection}
        className="text-white text-center d-flex flex-column align-items-center justify-content-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.video
          src={vdo}
          autoPlay
          loop
          muted
          style={styles.heroVideo}
          className="mb-4 rounded shadow"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />
      </motion.section>

      {/* Features Section */}
      <section style={styles.featuresSection} className="text-center py-5">
        <Row className="g-4">
          <Col md={4} data-aos="zoom-in">
            <div className="p-4 shadow-sm bg-white rounded">
              <img src="https://img.icons8.com/ios-filled/50/4A6CF7/shipped.png" alt="Shipping" />
              <h5 className="mt-3 fw-bold">Free Shipping</h5>
              <p className="text-muted">On all orders over ₹500</p>
            </div>
          </Col>
          <Col md={4} data-aos="zoom-in" data-aos-delay="100">
            <div className="p-4 shadow-sm bg-white rounded">
              <img src="https://img.icons8.com/ios-filled/50/4A6CF7/return.png" alt="Returns" />
              <h5 className="mt-3 fw-bold">Easy Returns</h5>
              <p className="text-muted">30-day return policy</p>
            </div>
          </Col>
          <Col md={4} data-aos="zoom-in" data-aos-delay="200">
            <div className="p-4 shadow-sm bg-white rounded">
              <img src="https://img.icons8.com/ios-filled/50/4A6CF7/security-checked.png" alt="Secure" />
              <h5 className="mt-3 fw-bold">Secure Payment</h5>
              <p className="text-muted">Protected by industry leaders</p>
            </div>
          </Col>
        </Row>
      </section>

      {/* Shop by Category */}
      <section>
        <h2 className="text-center mt-5" data-aos="fade-up">Shop by Category</h2>
        <Container className="my-4">
          <Row className="justify-content-center text-center">
            <Col xs={6} sm={4} md={3} className="mb-4" data-aos="zoom-in">
              <div onClick={() => navigate("/products/Fashion")} style={{ cursor: "pointer" }}>
                <img src={fashion} alt="Fashion" className="rounded-circle mb-2" style={styles.categoryImg} />
                <h3>Fashion</h3>
              </div>
            </Col>
            <Col xs={6} sm={4} md={3} className="mb-4" data-aos="zoom-in" data-aos-delay="100">
              <div onClick={() => navigate("/products/Electronics")} style={{ cursor: "pointer" }}>
                <img src={electronics} alt="Electronics" className="rounded-circle mb-2" style={styles.categoryImg} />
                <h3>Electronics</h3>
              </div>
            </Col>
            <Col xs={6} sm={4} md={3} className="mb-4" data-aos="zoom-in" data-aos-delay="200">
              <div onClick={() => navigate("/products/food")} style={{ cursor: "pointer" }}>
                <img src={food} alt="Food & Beverages" className="rounded-circle mb-2" style={styles.categoryImg} />
                <h3>Food & Beverages</h3>
              </div>
            </Col>
            <Col xs={6} sm={4} md={3} className="mb-4" data-aos="zoom-in" data-aos-delay="300">
              <div onClick={() => navigate("products/Beauty")} style={{ cursor: "pointer" }}>
                <img src={beauty} alt="Health & Beauty" className="rounded-circle mb-2" style={styles.categoryImg} />
                <h3>Health & Beauty</h3>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Product Grid */}
      <section id="products" style={styles.container}>
        <h2 style={styles.heading}>🛍️ Explore Our Products</h2>
        <Row className="g-4">
          {products.map((product, index) => (
            <Col key={product._id} md={6} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
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
              </motion.div>
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
  heroVideo: {
    width: '100%',
    height: 'auto',
    maxHeight: '580px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  introSection: {
    background: 'linear-gradient(to right, #4A6CF7, #6D9EFF)',
    padding: '25px 20px',
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
  categoryImg: {
    width: '180px',
    height: '180px',
    objectFit: 'cover',
  },
};
