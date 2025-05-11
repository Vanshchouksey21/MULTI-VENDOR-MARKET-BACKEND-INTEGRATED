import React, { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';
import { clearCart } from '../pages/cartSlice';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
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
      <Navbar />
      <div className="container py-5">
        <div className="d-flex justify-content-start mb-4">
          <FaArrowLeft
            onClick={() => navigate('/')}
            className="text-primary"
            style={{ fontSize: '2.5rem', cursor: 'pointer' }}
          />
        </div>
        <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: '600px' }}>
          <div className="card-body">
            <h2 className="text-center text-dark mb-4">Checkout</h2>
            <div>
              <h3 className="text-primary mb-3">Order Summary</h3>
              {cartItems.length === 0 ? (
                <p className="text-center text-muted">Your cart is empty.</p>
              ) : (
                <div>
                  <ul className="list-group mb-3">
                    {cartItems.map((item, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{item.title} × {item.quantity}</span>
                        <span>₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                    <hr />
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <strong>Total:</strong>
                      <strong>₹{totalAmount}</strong>
                    </li>
                  </ul>
                  <button onClick={handlePayment} className="btn btn-primary w-100 py-3">
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
