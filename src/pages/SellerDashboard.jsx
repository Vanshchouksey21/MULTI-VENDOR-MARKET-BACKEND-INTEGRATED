import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import AddProduct from './AddProduct';
import Myp from './Myp';
import DashboardHome from './DashboardHome';
import UpdateProducts from './UpdateProducts';
import { Navbar } from 'react-bootstrap';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate(); // initialize navigate

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userrole');
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'add':
        return <AddProduct />;
      case 'my':
        return <Myp />;
      case 'update':
        return <UpdateProducts />;
      case 'dashboard':
      default:
        return <DashboardHome />;
    }
  };

  return (
    <>
      <div style={styles.wrapper}>
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <h2 style={styles.sidebarTitle}>Seller Panel</h2>
          <ul style={styles.navList}>
            <li
              onClick={() => setActiveTab('dashboard')}
              style={activeTab === 'dashboard' ? styles.activeItem : styles.navItem}
            >
              🏠 Dashboard
            </li>
            <li
              onClick={() => setActiveTab('add')}
              style={activeTab === 'add' ? styles.activeItem : styles.navItem}
            >
              ➕ Add Product
            </li>
            <li
              onClick={() => setActiveTab('my')}
              style={activeTab === 'my' ? styles.activeItem : styles.navItem}
            >
              📦 My Products
            </li>
            <li
              onClick={() => setActiveTab('update')}
              style={activeTab === 'update' ? styles.activeItem : styles.navItem}
            >
              ✏️ Update Products
            </li>
          </ul>

          {/* Logout Button */}
          <button onClick={handleLogout} style={styles.logoutButton}>
            🚪 Logout
          </button>
        </div>

        {/* Main Content */}
        <div style={styles.content}>{renderContent()}</div>
      </div>
    </>
  );
};

export default SellerDashboard;

const styles = {
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8f9fc',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#4A6CF7',
    color: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  sidebarTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    flexGrow: 1,
  },
  navItem: {
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '6px',
    marginBottom: '10px',
  },
  activeItem: {
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '6px',
    backgroundColor: '#FF7F50',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  logoutButton: {
    backgroundColor: '#FF7F50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  content: {
    flex: 1,
    padding: '30px',
  },
};
