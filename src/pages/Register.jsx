import React, { useEffect } from 'react';
import { Form, Link, useActionData, useNavigate } from 'react-router-dom';
import classes from './Login.module.css';
import { useState } from 'react';

const Register = () => {
  const actionData = useActionData();
  const navigate = useNavigate();
  const [message,setmessage]=useState({});
  const [submit,setsubmit]=useState(false);
  useEffect(() => {
    if (actionData?.success) {
      navigate('/');  
    }
  }, [actionData, navigate]);

  async function handleRegister(event) {
    setmessage({})
    event.preventDefault();
    setsubmit(true);
    const formData = new FormData(event.target);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch('https://backend-li1v.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        setmessage({
          success:true,
          message:"Successfully registered"
        })
        setsubmit(false);
        await setTimeout(()=>{

        },1000)
        navigate('/');
      }
      else{
        setmessage({
          success:false,
          message:"failed to register the user"
        })
        setsubmit(false);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      setmessage({
          success:false,
          message:"user Registration Failed"
        })
        setsubmit(false);
    }
  }

  return (
    <div className={classes.pageContainer}>
      <div className={classes.formContainer}>
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        {message!={} && (
          <p className={`${classes.message} ${message.success ? 'text-green-600' : 'text-red-600'}`}>{message.message}</p>
        )}
        {submit && (
          <p className={`${classes.message}`}>Validating Credentials..</p>
        )}
        <form onSubmit={handleRegister}>
          <div>
            <label className={classes.textLabel}>Name</label>
            <input type="text" name="name" placeholder="Enter your name" required className={classes.inputField} />
          </div>
          <div>
            <label className={classes.textLabel}>Email</label>
            <input type="email" name="email" placeholder="Enter your email" required className={classes.inputField} />
          </div>
          <div>
            <label className={classes.textLabel}>Password</label>
            <input type="password" name="password" placeholder="Enter your password" required className={classes.inputField} />
          </div>
          <button type="submit" className={classes.submitButton}>Register</button>
        </form>
        <div className="text-center mt-4">
          <Link to="/" className="text-blue-600 hover:underline">Already have an account? Login here.</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
