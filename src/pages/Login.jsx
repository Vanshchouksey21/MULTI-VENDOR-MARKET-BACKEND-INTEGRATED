import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { role, token, message } = response.data;
      setMessage(message);

      // Save token to localStorage
      localStorage.setItem('token', token);

      // Navigate based on role
      if (role === 'buyer') {
        navigate('/home');
      } else if (role === 'seller') {
        navigate('/seller-dashboard');
      }
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Server error');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
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
        <button type="submit" style={styles.button}>Login</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}

      <p style={styles.registerLink}>
        Don't have an account? <Link to="/register" style={{ color: '#4A6CF7' }}>Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;

// CSS
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
  message: {
    fontSize: '14px',
    color: 'green',
    textAlign: 'center',
  },
  registerLink: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#333',
  },
};
