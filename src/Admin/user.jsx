import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert
import { toast } from 'react-toastify'; // Import Toastify

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/admin/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  // Delete user function
  const handleDelete = (userId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This user will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/admin/users/${userId}`)
          .then(() => {
            setUsers(users.filter(user => user._id !== userId)); // Update UI after delete
            Swal.fire('Deleted!', 'The user has been deleted.', 'success');
            toast.success('User deleted successfully!');
          })
          .catch(err => {
            console.error('Error deleting user:', err);
            toast.error('Error deleting user. Please try again.');
          });
      }
    });
  };

  return (
    <Container>
      <h2 className="text-center my-4">Users List</h2>
      <Row>
        {users.map(user => (
          <Col key={user._id} md={4} className="mb-4">
            <Card>
              <Card.Header className="text-center">
                <h5>{user.name}</h5>
                <p>{user.email}</p>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Role:</strong> {user.role}
                </Card.Text>
                <Card.Text>
                  <strong>User ID:</strong> {user._id}
                </Card.Text>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button variant="danger" size="sm" onClick={() => handleDelete(user._id)}>Delete</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UsersPage;
