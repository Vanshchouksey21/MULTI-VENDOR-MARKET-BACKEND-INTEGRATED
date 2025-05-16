import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  // Step 1: Find user by email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setUser(res.data.user);
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error occurred');
    }
  };

  // Step 2: Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
        id: user.id, // OR use user._id if that's what your backend sends
        newPassword: newPassword,
      });

      setMessage(res.data.message);
      setStep(3);

      setTimeout(() => {
      navigate('/login');
    }, 2000);

    } catch (err) {
      setMessage(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Forgot Password</h2>

      {step === 1 && (
        <form onSubmit={handleEmailSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Find Account</button>
        </form>
      )}

      {step === 2 && user && (
        <form onSubmit={handleResetPassword} style={styles.form}>
          <p>User Found: <strong>{user.name}</strong> ({user.email})</p>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Reset Password</button>
        </form>
      )}

      {step === 3 && (
        <div style={styles.success}>
          <p>Password updated! You can now log in.</p>
        </div>
        
      )}

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

export default ForgotPassword;

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
  form: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  input: {
    padding: '12px',
    marginBottom: '10px',
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
  },
  message: {
    fontSize: '14px',
    color: 'green',
    textAlign: 'center',
    marginTop: '10px',
  },
  success: {
    backgroundColor: '#e0fce0',
    padding: '20px',
    borderRadius: '8px',
    fontSize: '16px',
  },
};
