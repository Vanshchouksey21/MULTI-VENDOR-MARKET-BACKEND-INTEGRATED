import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Button, Modal, Form, Container } from 'react-bootstrap';

const Myp = () => {
  const [products, setProducts] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    stock: '',
  });

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/products/all');
      const sellerId = localStorage.getItem('userId');
      const myProducts = res.data.filter(product => product.seller === sellerId);
      setProducts(myProducts);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch products.');
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete product.');
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
      stock: product.stock || '',
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${selectedProduct._id}`, formData);
      setShowEditModal(false);
      fetchMyProducts();
    } catch (err) {
      console.error(err);
      alert('Failed to update product.');
    }
  };

  return (
    <Container className="py-4">
      <h3 className="mb-4 text-center text-primary fw-bold">My Products</h3>
      <Row className="g-4">
        {products.map((product) => (
          <Col xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={
                  product.image === 'noimage.jpg'
                    ? 'https://via.placeholder.com/300x200.png?text=No+Image'
                    : `http://localhost:5000/uploads/${product.image}`
                }
                alt={product.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="text-dark fw-semibold">{product.title}</Card.Title>
                  <Card.Text className="text-success fw-bold">₹{product.price}</Card.Text>
                  <Card.Text className="text-muted">Category: {product.category}</Card.Text>
                  <Card.Text className="text-muted">Stock: {product.stock ?? 'N/A'}</Card.Text>
                </div>
                <div className="mt-3 d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    className="w-50"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="w-50"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={formData.title}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                name="category"
                value={formData.category}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Myp;
