import React, { useState } from 'react';
import AddProduct from './AddProduct';
import Myp from './Myp';
import DashboardHome from './DashboardHome';
import UpdateProducts from './UpdateProducts'; // import this at top


const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'add':
        return <AddProduct />;
      case 'my':
        return <Myp />;
      case 'update':
        return <UpdateProducts />; // add this
      case 'dashboard':
      default:
        return <DashboardHome />;
    }
  };
  

  return (
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
      </div>

      {/* Main Content */}
      <div style={styles.content}>{renderContent()}</div>
    </div>
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
  },
  sidebarTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
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
  content: {
    flex: 1,
    padding: '30px',
  },
};
