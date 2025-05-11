import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity, clearCart } from '../pages/cartSlice'; 
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2'; 

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle Proceed to Checkout
  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  // Handle Clear Cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Handle Item Removal with confirmation
  const handleRemoveItem = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to remove this item from the cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeItem(id));
        Swal.fire('Removed!', 'The item has been removed from your cart.', 'success');
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="mb-3">
          <FaArrowLeft
            onClick={() => navigate('/')}
            className="text-primary"
            style={{ fontSize: '1.8rem', cursor: 'pointer' }}
          />
        </div>
        <h2 className="text-center mb-4 text-dark">Your Cart</h2>
        
        {cartItems.length === 0 ? (
          <div className="alert alert-warning text-center">
            Your cart is empty.
          </div>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item._id} className="card mb-4 shadow-sm border-0">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={item.image === 'noimage.jpg' 
                        ? 'https://via.placeholder.com/150x100.png?text=No+Image'
                        : `http://localhost:5000/uploads/${item.image}`}
                      alt={item.title}
                      className="img-fluid rounded-start"
                      style={{ height: '150px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text text-muted">₹{item.price * item.quantity}</p>

                      <div className="d-flex align-items-center mb-3">
                        <button
                          className="btn btn-outline-secondary btn-sm me-2"
                          onClick={() => dispatch(decreaseQuantity(item._id))}
                          disabled={item.quantity === 1}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
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
                  <div className="col-md-12 d-flex justify-content-end align-items-center p-3">
                    <button className="btn btn-danger" onClick={() => handleRemoveItem(item._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="d-flex justify-content-between align-items-center mt-4">
              <h4>Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h4>
              <div>
                <button className="btn btn-success me-2" onClick={handleProceedToCheckout}>
                  Proceed to Checkout
                </button>
                <button className="btn btn-danger" onClick={handleClearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
