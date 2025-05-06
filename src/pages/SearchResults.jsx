import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './cartSlice';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [results, setResults] = useState([]);

  const query = new URLSearchParams(location.search).get('query')?.toLowerCase() || '';

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get('http://localhost:5000/products/all');
        const filtered = res.data.filter((item) =>
          item.title.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.price.toString().includes(query)
        );
        setResults(filtered);
      } catch (error) {
        console.error('Search error', error);
      }
    };
    fetchResults();
  }, [query]);

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
      <section style={{ padding: '50px 20px', background: '#F8F9FC', minHeight: '80vh' }}>
        <h3 className="text-center mb-4">Search Results for "{query}"</h3>
        <Row className="g-4">
          {results.length > 0 ? results.map((product) => (
            <Col key={product._id} md={6} lg={4}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Img
                  variant="top"
                  src={
                    product.image === 'noimage.jpg'
                      ? 'https://via.placeholder.com/300x200.png?text=No+Image'
                      : `http://localhost:5000/uploads/${product.image}`
                  }
                  style={{ height: '250px', objectFit: 'contain', padding: '1rem' }}
                />
                <Card.Body className="text-center d-flex flex-column">
                  <Card.Title className="text-dark fw-bold fs-5">{product.title}</Card.Title>
                  <Card.Text className="text-primary fw-semibold fs-6">₹{product.price}</Card.Text>
                  <Card.Text className="text-muted small">Category: {product.category}</Card.Text>
                  <button className="btn btn-outline-success mt-auto" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </Card.Body>
              </Card>
            </Col>
          )) : (
            <p className="text-center">No products found.</p>
          )}
        </Row>
      </section>
      <Footer />
      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </>
  );
};

export default SearchResults;
