import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../pages/cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bannerImage from '../images/ChatGPT Image May 3, 2025, 07_11_34 PM.png'; // Adjust the path as necessary

const Fashion = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

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
    const exists = cartItems.find((item) => item._id === product._id);
    if (exists) {
      toast.error(`${product.title} is already in the cart!`);
    } else {
      dispatch(addItem(product));
      toast.success(`${product.title} added to cart!`);
    }
  };

  return (
    <>
      <Navbar />

   

      {/* Product Grid for Fashion Items */}
      <section style={styles.container}>
        <h2 style={styles.heading}>👗 Explore Our Fashion Collection</h2>
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
                    <button className="btn btn-outline-success btn-sm" onClick={() => handleAddToCart(product)}>
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
};
