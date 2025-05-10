import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../pages/cartSlice';
import { Card, Container, Button } from 'react-bootstrap';
import { FaArrowLeft, FaPlus, FaMinus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error('Error fetching product details', error);
        toast.error('Failed to load product details.', { position: 'top-right' });
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    
    if (existingItem) {
      // Show toast if item is already in the cart
      toast.warning('This product is already in your cart!', { position: 'top-right' });
    } else {
      const totalDesired = (existingItem?.quantity || 0) + quantity;

      if (totalDesired > product.stock) {
        toast.error(`Only ${product.stock} items in stock.`, { position: 'top-right' });
      } else {
        dispatch(addItem({ ...product, quantity }));
        toast.success(`${quantity} item(s) added to cart!`, { position: 'top-right' });
      }
    }
  };

  return (
    <>
      <FaArrowLeft
        onClick={() => navigate('/')}
        style={{
          cursor: 'pointer',
          fontSize: '2.5rem',
          color: '#4A6CF7',
          marginLeft: '20px',
          marginTop: '20px',
        }}
      />

      {/* ToastContainer for displaying toasts */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Embedded CSS */}
      <style>
        {`
          .details-container {
            max-width: 700px;
          }
          .product-card {
            border-radius: 15px;
            overflow: hidden;
            transition: transform 0.3s ease;
          }
          .product-card:hover {
            transform: scale(1.02);
          }
          .product-image {
            object-fit: cover;
            height: 400px;
            width: 100%;
          }
          .quantity-box {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-top: 15px;
          }
          .quantity-display {
            font-size: 1.2rem;
            font-weight: 500;
            min-width: 40px;
            text-align: center;
          }
        `}
      </style>

      <Container className="mt-4 details-container">
        <Card className="shadow-lg border-0 product-card">
          <Card.Img
            variant="top"
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.title}
            className="product-image"
          />
          <Card.Body>
            <Card.Title className="fw-bold fs-3">{product.title}</Card.Title>
            <Card.Text className="text-muted">Category: {product.category}</Card.Text>
            <Card.Text className="text-primary fw-semibold">Price: ₹{product.price}</Card.Text>
            <Card.Text><strong>Stock:</strong> {product.stock}</Card.Text>

            <div className="quantity-box">
              <Button variant="outline-secondary" onClick={decreaseQty}><FaMinus /></Button>
              <span className="quantity-display">{quantity}</span>
              <Button variant="outline-secondary" onClick={increaseQty}><FaPlus /></Button>
            </div>

            <button className="btn btn-outline-success mt-4" onClick={handleAddToCart}>
              Add {quantity} to Cart
            </button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Details;
