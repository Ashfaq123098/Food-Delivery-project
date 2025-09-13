import React, { useState } from 'react';
import './LoginFeature.css';

function LoginFeature({ setShowLogin = () => {}, setShowSignUp = () => {}, onSuccess = () => {} }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return alert('Invalid email.Please Enter A Valid Email');
    if (password.length < 8) return alert('Password must be at least 8 characters');

    try {
      setLoading(true);

      const res = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Save token in localStorage (optional)
        localStorage.setItem('token', data.token);
        onSuccess({ email, name: email.split('@')[0] });
        setShowLogin(false);
      } else {
        alert(data.message || 'Login failed.Please Try Again');
      }
    } catch (error) {
      console.log(error);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Welcome Back!</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p>
          Don't have an account?{" "}
          <span onClick={() => { setShowLogin(false); setShowSignUp(true); }}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default LoginFeature;
