import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity } from '../pages/cartSlice';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize the navigate function

  // Handle Proceed to Checkout
  const handleProceedToCheckout = () => {
    navigate('/checkout'); // Redirect to the checkout page
  };

  return (
    <>
      <Navbar /> {/* Include Navbar here */}
      <div className="container py-5">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className="d-flex justify-content-between align-items-center border-bottom py-3">
                <div className="d-flex align-items-center">
                  <img
                    src={item.image === 'noimage.jpg'
                      ? 'https://via.placeholder.com/150x100.png?text=No+Image'
                      : `http://localhost:5000/uploads/${item.image}`}
                    alt={item.title}
                    style={{ width: '100px', height: 'auto', objectFit: 'contain' }}
                  />
                  <div className="ms-3">
                    <h5>{item.title}</h5>
                    <p>₹{item.price}</p>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={() => dispatch(decreaseQuantity(item._id))}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm ms-2"
                        onClick={() => dispatch(increaseQuantity(item._id))}
                        disabled={item.quantity === item.stock}
                      >
                        +
                      </button>
                    </div>
                    <small className="text-muted">Available: {item.stock}</small>
                  </div>
                </div>
                <button className="btn btn-danger" onClick={() => dispatch(removeItem(item._id))}>
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4">
              <h4>
                Total: ₹
                {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
              </h4>
              <button className="btn btn-success" onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
