import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdateProducts = () => {
  const [products, setProducts] = useState([]);
  const sellerId = localStorage.getItem('sellerId');

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products/seller/${sellerId}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to load products", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts(); // reload after deletion
    }
  };

  const handleEdit = (id) => {
    alert("Implement edit modal here for product ID: " + id);
    // Optionally, you can show a modal or navigate to an edit page
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Update Your Products</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id}>
              <td>{prod.title}</td>
              <td>₹{prod.price}</td>
              <td>{prod.category}</td>
              <td>
                <button style={styles.edit} onClick={() => handleEdit(prod._id)}>Edit</button>
                <button style={styles.delete} onClick={() => handleDelete(prod._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateProducts;

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  edit: {
    marginRight: '10px',
    backgroundColor: '#4A6CF7',
    color: '#fff',
    padding: '6px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  delete: {
    backgroundColor: '#FF4D4D',
    color: '#fff',
    padding: '6px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
    