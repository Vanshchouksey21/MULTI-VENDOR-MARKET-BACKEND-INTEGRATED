import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Myp = () => {
  const [products, setProducts] = useState([]);

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products/all');
      const sellerId = localStorage.getItem('userId');
      const myProducts = res.data.filter(product => product.seller === sellerId);
      setProducts(myProducts);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to fetch products.');
    }
  };

  const confirmDeleteToast = (productId) => {
    const toastId = toast.info(
      ({ closeToast }) => (
        <div>
          <p style={{ marginBottom: '10px' }}>Are you sure you want to delete this product?</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <Button variant="secondary" size="sm" onClick={closeToast}>
              No
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                handleDelete(productId);
                toast.dismiss(toastId);
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        position: 'top-center',
      }
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
      toast.success('✅ Product deleted successfully.');
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to delete product.');
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>My Products</h3>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map((product) => (
          <Col key={product._id}>
            <Card style={styles.card}>
              <Card.Img
                variant="top"
                src={product.image === 'noimage.jpg'
                  ? 'https://via.placeholder.com/300x200.png?text=No+Image'
                  : `http://localhost:5000/uploads/${product.image}`}
                alt={product.title}
                style={styles.image}
              />
              <Card.Body>
                <Card.Title style={styles.title}>{product.title}</Card.Title>
                <Card.Text style={styles.price}>₹{product.price}</Card.Text>
                <Card.Text style={styles.category}>{product.category}</Card.Text>
                <Button variant="danger" onClick={() => confirmDeleteToast(product._id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Myp;

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f8f9fc',
  },
  heading: {
    marginBottom: '30px',
    color: '#333',
    fontSize: '28px',
    fontWeight: '600',
  },
  card: {
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  image: {
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  title: {
    fontSize: '18px',
    fontWeight: '500',
    color: '#333',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#4A6CF7',
  },
  category: {
    fontSize: '14px',
    color: '#777',
  },
};
