import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate(); // Navigate hook
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, password, role };

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      setMessage(response.data.message);

      // Success hone ke baad 1 sec baad navigate kare login page pe
      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Server error');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <div style={styles.radioGroup}>
          <label>
            <input
              type="radio"
              value="buyer"
              checked={role === 'buyer'}
              onChange={() => setRole('buyer')}
            />
            Buyer
          </label>
          <label>
            <input
              type="radio"
              value="seller"
              checked={role === 'seller'}
              onChange={() => setRole('seller')}
            />
            Seller
          </label>
        </div>
        <button type="submit" style={styles.button}>Register</button>
      </form>

      {/* Success/Error Message */}
      {message && <p style={styles.message}>{message}</p>}

      {/* Already have an account? Login */}
      <p style={styles.loginLink}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;

// CSS Styles
const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FC',
    padding: '40px 20px',
  },
  heading: {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#333333',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#4A6CF7',
    color: '#fff',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '18px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  radioGroup: {
    marginBottom: '15px',
  },
  message: {
    fontSize: '14px',
    color: 'green',
    textAlign: 'center',
  },
  loginLink: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#333',
  },
};
