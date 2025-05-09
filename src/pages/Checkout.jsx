import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../pages/cartSlice';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar'; // ✅ Make sure the path is correct

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/payment/orders', {
        amount: totalAmount,
      });

      const { id, amount, currency } = data.order;

      const options = {
        key: "rzp_test_m2OHIKOzjgb5LI",
        amount,
        currency,
        name: 'MultiVendor Store',
        description: 'Order Payment',
        order_id: id,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post('http://localhost:5000/api/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyResponse.data.message === 'Payment verified successfully') {
              Swal.fire('Success', 'Payment Successful!', 'success');
              dispatch(clearCart());
            } else {
              Swal.fire('Verification Failed', 'Invalid payment signature.', 'error');
            }
          } catch (err) {
            console.error('Verification error:', err);
            Swal.fire('Error', 'Failed to verify payment.', 'error');
          }
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#4A6CF7',
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error('Payment error:', error.response?.data || error.message);
      Swal.fire('Error', 'Payment failed. Please try again.', 'error');
    }
  };

  return (
    <>
      <Navbar /> {/* ✅ Navbar added here */}
      <div style={styles.container}>
        <h2 style={styles.title}>Checkout</h2>
        <div style={styles.summary}>
          <h3 style={styles.sectionTitle}>Order Summary</h3>
          {cartItems.length === 0 ? (
            <p style={styles.empty}>Your cart is empty.</p>
          ) : (
            <>
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
              <button onClick={handlePayment} style={styles.button}>
                Pay Now
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;

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
