// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/admin/products')
      .then(res => {
        setProducts(res.data);
        setError(null);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      });
  }, []);

  const handleDelete = (productId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/admin/products/${productId}`)
          .then(res => {
            setProducts(products.filter(product => product._id !== productId));
            Swal.fire('Deleted!', 'The product has been deleted.', 'success');
          })
          .catch(err => {
            Swal.fire('Error!', 'Something went wrong. Please try again later.', 'error');
          });
      }
    });
  };

  return (
    <Container>
      <h2 className="text-center my-4">Products List</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {products.map(product => (
          <Col key={product._id} md={4} className="mb-4">
            <Card>
              <Card.Header className="text-center">
                <h5>{product.title}</h5>
                <p>{product.category}</p>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Price:</strong> ${product.price}
                </Card.Text>
                <Card.Text>
                  <strong>Stock:</strong> {product.stock} in stock
                </Card.Text>
                <Card.Text>
                  <strong>Seller:</strong> {product.seller.name}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button
                  variant="danger"
                  size="sm"
                  className="ml-2"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsPage;
