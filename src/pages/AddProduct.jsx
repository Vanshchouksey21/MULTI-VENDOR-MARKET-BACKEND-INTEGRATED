import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {  FaArrowLeft } from 'react-icons/fa';

import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !category || !image || !stock) {
      toast.error('⚠️ Please fill all fields.');
      return;
    }

    const sellerId = localStorage.getItem('userId');
    if (!sellerId) {
      toast.error('❌ User not authenticated. Please log in.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);
    formData.append('stock', stock);
    formData.append('seller', sellerId);

    try {
      await axios.post('http://localhost:5000/products/create', formData);
      toast.success('✅ Product added successfully!');
      setTitle('');
      setPrice('');
      setCategory('');
      setImage(null);
      setStock(1);
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to upload product.');
    }
  };

  return (
    <div style={styles.container}>
           <FaArrowLeft
                                              onClick={() => navigate('/')}
                                              style={{
                                                cursor: 'pointer',
                                                fontSize: '2.5rem',
                                                color: '#4A6CF7',
                                                
                                              }}
                                              />  
      <h3 style={styles.heading}>Add New Product</h3>
      <form onSubmit={handleSubmit} style={styles.form}>

        <div style={styles.formGroup}>
          <label style={styles.label}>Product Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            style={styles.input}
            min="1"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Product Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={styles.input}
            accept="image/*"
          />
        </div>

        <button type="submit" style={styles.button}>Add Product</button>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default AddProduct;

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    margin: 'auto',
    marginTop: '40px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '6px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#4A6CF7',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
