import React, { useState } from 'react';
import './LoginFeature.css';

function LoginFeature({ setShowLogin, setShowSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('❌ Invalid email format');
      return;
    }

    if (password.length < 6) {
      alert('❌ Password must be at least 6 characters');
      return;
    }

    alert("Login Successful!\nEmail: " + email + "\nPassword: " + password);
    setShowLogin(false);
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Please login to continue</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="login-input"
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="login-input"
          required
        />

        <button type="submit" className="login-btn">Login</button>

        <p className="signup-text">
          Don’t have an account?{' '}
          <span
            onClick={() => {
              setShowLogin(false);
              setShowSignUp(true);
            }}
            className="signup-link"
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginFeature;