import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './up-in.css';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    console.log("Google sign-in clicked");
  };

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email: email,
        password: password
      });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/');
      } else {
        setError(response.data.message || 'Something went wrong');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="signup-container">
      <strong style={{ fontSize: '40px' }}>Login</strong>

      <p style={{ marginRight: '230px' }}>Dosn't have an account you ? <span className="login-link" onClick={() => navigate('/sign-up')}>SignUp</span></p>


      <br /><br />
      <form className="signup-form">
        <div>{error}</div>
        <label htmlFor="email">Email</label>
        <input type='email' id="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password</label>
        <input type='password' id="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />


        <button type="button" className="create-account-btn" onClick={login}>LOGIN</button><br />

        <div className="or-divider">
          <span className="divider-line"></span>
          <span className="divider-text">or</span>
          <span className="divider-line"></span>
        </div>
        <button onClick={handleGoogleSignIn} className="google-signin-btn">
          <img src="https://c.clc2l.com/t/g/o/google-A7roaL.jpg" alt="Google Logo" className="google-logo" />
          Sign in with Google
        </button>
      </form>

    </div>
  );
}
