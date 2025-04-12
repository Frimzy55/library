import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { 
  Snackbar,
  Alert,
  // ... other existing Material-UI imports
} from '@mui/material';
//import logo from "./image/logo.jpeg";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: '', password: '', form: '' });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('info');

  const navigate = useNavigate();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateInputs = () => {
    let isValid = true;
    const newErrors = { username: '', password: '', form: '' };

    if (!username.trim()) {
      newErrors.username = 'Username is required.';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5002/login',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('role', response.data.role);

        // Navigate based on user role
        if (response.data.role === 'admin') {
          navigate('/admin');
        } else if (response.data.role === 'user2') {
          navigate('/main2'); 
        } else if (response.data.role==='user3'){
          navigate('/main3')

        } else if (response.data.role==='Hr'){
          navigate('/hr')
        } else {
          navigate('/main'); // Default route for other roles
        }
      }
    } catch (error) {
      setErrors({ ...errors, form: 'Invalid username or password.' });
      setSnackbarMessage('Login failed. Please check your credentials.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };


  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "hsl(40, 42.90%, 98.60%)",
      }}
    >
      <div 
        style={{ 
          width: '100%',
          maxWidth: '400px',
          backgroundColor: "hsla(134, 95.90%, 19.00%, 0.88)",
          padding: '2.5rem',
          borderRadius: '16px',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className="text-center mb-5">
          <h2 style={{ 
            color: 'white',
            fontSize: '1.75rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>
            Library Access
          </h2>
          <p style={{ color: '#e2e8f0' }}>Please authenticate to continue</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" style={{
              display: 'block',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <FontAwesomeIcon 
                icon={faUser} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  zIndex: 10
                }}
              />
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 2.5rem',
                  border: errors.username ? '1px solid red' : '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }}
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {errors.username && (
              <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {errors.username}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" style={{
              display: 'block',
              color: 'white',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <FontAwesomeIcon 
                icon={faLock} 
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'white',
                  zIndex: 10
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                style={{
                  width: '100%',
                  padding: '0.875rem 1rem 0.875rem 2.5rem',
                  border: errors.password ? '1px solid red' : '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white'
                }}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'white',
                  padding: '0.25rem'
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {errors.password && (
              <p style={{ color: 'red', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                {errors.password}
              </p>
            )}
          </div>

          {errors.form && (
            <p style={{ color: 'red', fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem' }}>
              {errors.form}
            </p>
          )}
          <button 
            type="submit" 
            style={{
              width: '100%',
              padding: '0.875rem',
              backgroundColor: "hsl(29, 92.90%, 55.90%)",
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginTop: '1.5rem',
            }}
            onMouseOver={(e) => e.target.style.opacity = '0.9'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          >
            Sign In
          </button>

          <div className="text-center mt-4">
            <a 
              href="#forgot-password" 
              style={{
                color: 'hsl(29, 92.90%, 55.90%)',
                fontSize: '0.875rem',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              Forgot Password?
            </a>
          </div>
        </form>

        <div className="text-center mt-6" style={{ color: '#e2e8f0', fontSize: '0.875rem' }}>
          Need access?{' '}
          <a 
            href="#signup" 
            style={{ 
              color: 'hsl(29, 92.90%, 55.90%)',
              fontWeight: '500',
              textDecoration: 'none'
            }}
          >
            Request account
          </a>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default LoginPage;