import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const OrderHistory = ({ buyerId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders1/history/${buyerId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        Swal.fire('Error', 'Failed to fetch order history.', 'error');
      }
    };

    fetchOrders();
  }, [buyerId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders placed yet.</p>
      ) : (
        <ul style={styles.orderList}>
          {orders.map((order, index) => (
            <li key={index} style={styles.orderItem}>
              <div>
                <strong>Order ID:</strong> {order._id}
              </div>
              <div>
                <strong>Status:</strong> {order.status}
              </div>
              <div>
                <strong>Total:</strong> ₹{order.totalAmount}
              </div>
              <div>
                <strong>Products:</strong>
                <ul>
                  {order.products.map((item, index) => (
                    <li key={index}>
                      {item.product.title} × {item.quantity} - ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  orderList: {
    listStyleType: 'none',
    padding: 0,
  },
  orderItem: {
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  },
};

export default OrderHistory;
