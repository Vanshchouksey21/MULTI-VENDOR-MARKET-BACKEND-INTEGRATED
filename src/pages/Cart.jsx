import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../pages/cartSlice'; // Assuming removeItem action exists
import Navbar from '../components/Navbar'; // Import Navbar component

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
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
                    src={item.image === 'noimage.jpg' ? 'https://via.placeholder.com/150x100.png?text=No+Image' : `http://localhost:5000/uploads/${item.image}`}
                    alt={item.title}
                    style={{ width: '100px', height: 'auto', objectFit: 'contain' }}
                  />
                  <div className="ms-3">
                    <h5>{item.title}</h5>
                    <p>₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button className="btn btn-danger" onClick={() => handleRemoveItem(item._id)}>
                  Remove
                </button>
              </div>
            ))}
            <div className="mt-4">
              <h4>Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h4>
              <button className="btn btn-success">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
