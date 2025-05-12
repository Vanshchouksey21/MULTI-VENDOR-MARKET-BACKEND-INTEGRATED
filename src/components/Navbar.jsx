import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import '../css/Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/ChatGPT Image May 8, 2025, 01_41_06 PM.png';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userrole');
  const cartItems = useSelector((state) => state.cart.items);
  const dashboardRoute = role === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard';

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userrole');
    localStorage.removeItem('user');
localStorage.removeItem('token');

    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} alt="logo" className="nav-logo me-2" />
          MultiVendor
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-3 align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            {/* 🔽 Hover Dropdown */}
            <li className="nav-item dropdown hover-dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button">
                Products
              </Link>
              <ul className="dropdown-menu animate-slide">
                <li><Link className="dropdown-item" to="/products/Electronics">Electronics</Link></li>
                <li><Link className="dropdown-item" to="/products/fashion">Fashion</Link></li>
                <li><Link className="dropdown-item" to="/products/Beauty">Health & Beauty</Link></li>
                <li><Link className="dropdown-item" to="/products/food">Food & Beverages</Link></li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <FaShoppingCart size={22} className="icon-btn" />
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </Link>
            </li>

            {/* 🔍 Search Field */}
            <li className="nav-item">
              <form className="d-flex" onSubmit={handleSearch}>
                <input
                  className="form-control form-control-sm me-2"
                  type="search"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-warning btn-sm fw-semibold" type="submit">Search</button>
              </form>
            </li>

            {/* 🔐 Auth Options */}
            {token ? (
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  role="button"
                  data-bs-toggle="dropdown"
                  style={{ cursor: 'pointer' }}
                >
                  <FaUserCircle size={24} className="me-2" />
                  My Profile
                </span>
                <ul className="dropdown-menu dropdown-menu-end animate-slide">
                  {role === 'buyer' ? (
                    <>
                      <li><Link className="dropdown-item" to="/OrderHistory">Order History</Link></li>
                      <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                    </>
                  ) : (
                    <>
                      <li><Link className="dropdown-item" to={dashboardRoute}>Dashboard</Link></li>
                      <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                    </>
                  )}
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-warning text-white fw-semibold" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
