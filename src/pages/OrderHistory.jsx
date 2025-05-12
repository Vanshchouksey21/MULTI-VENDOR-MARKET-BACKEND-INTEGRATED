import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user')); // assumes user info is stored in localStorage
  const token = localStorage.getItem('token'); // JWT token

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/user/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    if (user && token) {
      fetchOrders();
    } else {
      setError('Please log in to view order history.');
      setLoading(false);
    }
  }, [user, token]);

  if (loading) return <div className="text-center mt-4">Loading orders...</div>;
  if (error) return <div className="text-danger text-center mt-4">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Order History</h2>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-3">
            <div className="card-body">
              <h5>Order ID: {order._id}</h5>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p><strong>Shipping:</strong> {order.shippingAddress}</p>
              <hr />
              <h6>Products:</h6>
              <ul>
                {order.products.map((item, index) => (
                  <li key={index}>
                    {item.title} - ₹{item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
