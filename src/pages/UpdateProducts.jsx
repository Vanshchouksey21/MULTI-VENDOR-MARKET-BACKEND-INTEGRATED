import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${id}`);
        const product = res.data;
        setTitle(product.title);
        setPrice(product.price);
        setCategory(product.category);
        setExistingImage(product.image);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch product details.');
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title || !price || !category) {
      alert('Please fill all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
      await axios.put(`http://localhost:5000/products/${id}`, formData);
      alert('✅ Product updated successfully!');
      navigate('/dashboard/my-products');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update product.');
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Update Product</h3>
      <form onSubmit={handleUpdate} style={styles.form}>
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={styles.input}
        />
        {existingImage && (
          <img
            src={`http://localhost:5000/uploads/${existingImage}`}
            alt="Current"
            style={{ width: '150px', marginTop: '10px', borderRadius: '8px' }}
          />
        )}
        <button type="submit" style={styles.button}>Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;

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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
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
