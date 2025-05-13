// src/pages/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUsers, FaProductHunt, FaBox, FaDollarSign } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <Container className="my-5 py-5">
      <h2 className="text-center mb-5 text-primary fw-bold">Admin Dashboard</h2>

      <Row className="justify-content-center">
        {/* Users Stats Card */}
        <Col md={4} className="mb-4">
          <Card className="shadow-lg border-0 h-100 hover-effect">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-4 bg-info text-white">
              <FaUsers size={60} className="mb-3" />
              <Card.Title className="fs-4 fw-bold">Total Users</Card.Title>
              <Card.Text className="text-light mb-4">
                View all registered users in the system.
              </Card.Text>
              <h3>1200 Users</h3>
              <Link to="/users">
                <Button variant="light" size="lg" className="px-4 py-2 mt-3">
                  See Users
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Products Stats Card */}
        <Col md={4} className="mb-4">
          <Card className="shadow-lg border-0 h-100 hover-effect">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-4 bg-success text-white">
              <FaProductHunt size={60} className="mb-3" />
              <Card.Title className="fs-4 fw-bold">Total Products</Card.Title>
              <Card.Text className="text-light mb-4">
                View all the products listed by sellers.
              </Card.Text>
              <h3>850 Products</h3>
              <Link to="/products">
                <Button variant="light" size="lg" className="px-4 py-2 mt-3">
                  See Products
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        {/* Orders Stats Card */}
        <Col md={4} className="mb-4">
          <Card className="shadow-lg border-0 h-100 hover-effect">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-4 bg-warning text-white">
              <FaBox size={60} className="mb-3" />
              <Card.Title className="fs-4 fw-bold">Total Orders</Card.Title>
              <Card.Text className="text-light mb-4">
                Manage and track all the orders placed by users.
              </Card.Text>
              <h3>320 Orders</h3>
              <Link to="/orders">
                
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Earnings Section */}
      <Row className="justify-content-center mt-5">
        <Col md={12}>
          <Card className="shadow-lg border-0 h-100">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center p-5 bg-dark text-white">
              <FaDollarSign size={60} className="mb-3" />
              <Card.Title className="fs-3 fw-bold">Total Earnings</Card.Title>
              <Card.Text className="text-light mb-4">
                Total earnings from all sales on the platform.
              </Card.Text>
              <h2>$45,000</h2>
              <Link to="/earnings">
                
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
