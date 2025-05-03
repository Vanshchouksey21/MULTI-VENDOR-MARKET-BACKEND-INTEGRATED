import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import '../css/Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/ChatGPT Image May 2, 2025, 07_12_49 PM.png';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userrole'); // ✅ Fixed: Use the correct key

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userrole');
    navigate('/login');
  };

  // ✅ Dynamic dashboard link based on role
  const dashboardRoute = role === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#4A6CF7', padding: '12px 30px' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" style={{ color: '#fff', fontSize: '24px' }}>
          <img src={logo} alt="logo" style={{ width: '40px', marginRight: '10px' }} />
          MultiVendor
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav gap-3 align-items-center">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white d-flex align-items-center" to="/cart">
                <FaShoppingCart size={20} className="me-1" />
              </Link>
            </li>
            {token ? (
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle text-white d-flex align-items-center"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ cursor: 'pointer' }}
                >
                  <FaUserCircle size={24} className="me-2" />
                  My Profile
                </span>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to={dashboardRoute}>Dashboard</Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-warning text-white fw-semibold" to="/login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
