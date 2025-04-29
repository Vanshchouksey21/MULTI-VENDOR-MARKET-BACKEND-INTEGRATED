import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../pages/cartSlice'; // ✅ Correct path dalna
import { FaShoppingCart } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import img from  "../images/ChatGPT Image Apr 29, 2025, 07_11_04 PM.png"
import img2 from  "../images/My ChatGPT image.png"

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products/all');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) {
      toast.error(`${product.title} is already in the cart!`);
    } else {
      dispatch(addItem(product));
      toast.success(`${product.title} added to cart!`);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Bootstrap Carousel */}
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2000" style={{ marginTop: '80px' }}>
        <div className="carousel-inner">
        <div className="carousel-item active">
  <img src={img} className="d-block w-100" alt="Product 1" style={{ height: '400px', objectFit: 'contain' }} />
</div>
<div className="carousel-item active">
  <img src={img2} className="d-block w-100" alt="Product 2" style={{ height: '400px', objectFit: 'contain'   }} />
</div>
<div className="carousel-item">
  <img src="https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/11980ec333f6aa03.jpg?q=20" className="d-block w-100" alt="Product 3" style={{ height: '400px', objectFit: 'cover' }} />
</div>

        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section style={styles.container}>
        <h2 style={styles.heading}>🛍️ Our Products</h2>
        <Row>
          {products.map((product) => (
            <Col key={product._id} md={4} sm={6} xs={12}>
              <Card style={styles.productCard}>
                <Card.Img
                  variant="top"
                  src={
                    product.image === 'noimage.jpg'
                      ? 'https://via.placeholder.com/300x200.png?text=No+Image'
                      : `http://localhost:5000/uploads/${product.image}`
                  }
                  alt={product.title}
                  style={styles.productImage}
                />
                <Card.Body className="text-center">
                  <Card.Title style={styles.productName}>{product.title}</Card.Title>
                  <Card.Text style={styles.productPrice}>₹{product.price}</Card.Text>
                  <Card.Text style={styles.productCategory}>{product.category}</Card.Text>

                  <div className="d-flex justify-content-center gap-3 mt-3">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      Buy Now
                    </button>

                    <FaShoppingCart
                      style={{
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#4A6CF7',
                      }}
                      onClick={() => handleAddToCart(product)}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      
      <Footer />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default Home;

const styles = {
  container: {
    padding: '40px 20px',
    backgroundColor: '#F8F9FC',
    minHeight: '80vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '32px',
    marginBottom: '30px',
    color: '#333',
  },
  productCard: {
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  productImage: {
    width: '100%',
    height: '250px',
    objectFit: 'contain',
    padding: '1rem',
  },
  productName: {
    fontSize: '20px',
    color: '#333',
  },
  productPrice: {
    fontSize: '18px',
    color: '#4A6CF7',
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: '16px',
    color: '#555',
  },
};
