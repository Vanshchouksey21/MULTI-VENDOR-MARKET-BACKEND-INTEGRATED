import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../pages/cartSlice';
import Swal from 'sweetalert2';

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      Swal.fire("Not logged in", "Please log in before placing an order.", "warning");
      return;
    }

    if (cartItems.length === 0) {
      Swal.fire("Empty Cart", "Please add items to your cart first.", "info");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/orders', {
        userId,
        items: cartItems,
      });

      Swal.fire("Success!", "Your order was placed successfully.", "success");
      dispatch(clearCart());
    } catch (error) {
      console.error("Order error:", error);
      Swal.fire("Error", "Something went wrong while placing the order.", "error");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Checkout</h2>
      <div style={styles.summary}>
        <h3 style={styles.sectionTitle}>Order Summary</h3>
        {cartItems.length === 0 ? (
          <p style={styles.empty}>Your cart is empty.</p>
        ) : (
          <ul style={styles.itemList}>
            {cartItems.map((item, index) => (
              <li key={index} style={styles.item}>
                <span>{item.title} × {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
            <hr />
            <li style={styles.total}>
              <strong>Total:</strong>
              <strong>₹{totalAmount}</strong>
            </li>
          </ul>
        )}
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <button type="submit" style={styles.button} disabled={cartItems.length === 0}>
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

// ✅ Simple inline styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  summary: {
    marginTop: '20px',
  },
  sectionTitle: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#4A6CF7',
  },
  itemList: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '20px',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    paddingTop: '10px',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4A6CF7',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  empty: {
    color: '#999',
    textAlign: 'center',
    padding: '20px',
  },
};
