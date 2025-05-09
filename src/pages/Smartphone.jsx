import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../pages/cartSlice';
import { FaShoppingCart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import vdo from '../images/13600721_1920_1080_30fps.mp4'; // Adjust the path as necessary

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'; // for navigation

const Electronics = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate(); // To handle navigation

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products/all');
        const electronicsProducts = res.data.filter((product) =>
          product.category.toLowerCase().includes('electronics')
        );
        setProducts(electronicsProducts);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage (assuming user is logged in if there's a userId)
    
    if (!userId) {
      // If user is not logged in
      toast.warning('Please log in to add items to your cart.');
      navigate('/login'); // Redirect to login page
      return;
    }

    // If user is logged in, proceed with adding to the cart
    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
      toast.error(`${product.title} is already in the cart!`);
    } else {
      dispatch(addItem(product));
      toast.success(`${product.title} added to cart!`);
    }
  };

  const handleBuyNow = (product) => {
    const userId = localStorage.getItem('userId'); // Check if user is logged in

    if (!userId) {
      // If not logged in, redirect to login
      toast.warning('Please log in to proceed with the purchase.');
      navigate('/login');
      return;
    }

    // If logged in, proceed with adding to cart and navigating to checkout
    const exists = cartItems.find((item) => item._id === product._id);
    if (!exists) {
      dispatch(addItem(product));
      toast.success(`${product.title} added to cart!`);
    }

    navigate('/checkout'); // Redirect to checkout page
  };

  return (
    <>
      <Navbar />

       {/* Hero Video Section */}
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

      {/* Product Grid for Electronics */}
      <section style={styles.container}>
        <h2 style={styles.heading}>💻 Explore Our Electronics</h2>
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

export default Electronics;

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
};
