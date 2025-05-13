import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classes from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (success) {
      navigate('/profile');  // Redirect on successful login
    }
  }, [success, navigate]);

  const handleLoginAction = async (e) => {
    e.preventDefault();
    setSubmit(true);
    setMessage(null);

    // Get form data
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch('https://backend-li1v.onrender.com/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('TOKEN', data.token);
        setSuccess(true);
        setMessage('Login successful');
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      setMessage('Network error. Please try again later.');
      console.error('Login error:', error);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className={classes.pageContainer}>
      <div className={classes.formContainer}>
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {message && (
          <p className={`${classes.message} ${success ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        {submit && <p className={classes.message}>Checking Credentials...</p>}

        <form onSubmit={handleLoginAction}>
          <div>
            <label className={classes.textLabel}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className={classes.inputField}
            />
          </div>
          <div>
            <label className={classes.textLabel}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              className={classes.inputField}
            />
          </div>
          <button
            type="submit"
            disabled={submit}
            className={`${classes.submitButton} ${submit ? 'opacity-50' : ''}`}
          >
            {submit ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/register" className="text-blue-600 hover:underline">
            Don't have an account? Register here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
