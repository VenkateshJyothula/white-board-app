import React, { useEffect } from 'react';
import { Form, useActionData, useNavigate, Link } from 'react-router-dom';
import classes from './Login.module.css';

const Login = () => {
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.success) {
      navigate('/profile');  // Redirect on successful login
    }
  }, [actionData, navigate]);

  return (
    <div className={classes.pageContainer}>
      <div className={classes.formContainer}>
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {actionData && (
          <p
            className={`${classes.message} ${
              actionData.success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {actionData.message}
          </p>
        )}
        <Form method="post">
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
          <button type="submit" className={classes.submitButton}>Login</button>
        </Form>
        <div className="text-center mt-4">
          <Link to="/register" className="text-blue-600 hover:underline">Don't have an account? Register here.</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
