// src/pages/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const AdminDashboard = () => {
  return (
    <Container className="my-5 py-5">
      <h2 className="text-center mb-5 text-primary fw-bold">Welcome to Admin Dashboard</h2>

      <Row className="justify-content-center">
        <Col md={5} className="mb-4">
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-4">
              <Card.Title className="fs-4 fw-bold text-dark">See Users</Card.Title>
              <Card.Text className="text-muted mb-4">
                View all registered users in the system.
              </Card.Text>
              <Link to="/users">
                <Button variant="warning" size="lg" className="px-4 py-2">
                  See Users
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-4">
              <Card.Title className="fs-4 fw-bold text-dark">See Products</Card.Title>
              <Card.Text className="text-muted mb-4">
                View all the products listed by sellers.
              </Card.Text>
              <Link to="/products">
                <Button variant="warning" size="lg" className="px-4 py-2">
                  See Products
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
