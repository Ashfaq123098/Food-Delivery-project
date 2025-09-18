import React, { useState } from 'react';
import './LoginFeature.css';

function LoginFeature({ setShowLogin = () => {}, setShowSignUp = () => {}, onSuccess = () => {} }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleBlur = (field) => {
    if (field === "email" && !email) setErrors(prev => ({ ...prev, email: "Please enter your Email" }));
    if (field === "password" && !password) setErrors(prev => ({ ...prev, password: "Please enter your Password" }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) return setErrors(prev => ({ ...prev, email: "Invalid Email" }));
    if (password.length < 8) return setErrors(prev => ({ ...prev, password: "Password must be at least 8 characters" }));

    try {
      setLoading(true);

      const res = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.token);

        // ✅ Add default avatar
        onSuccess({
          email,
          name: email.split('@')[0],
          avatar: '/assets/courage-get-5-user-login-flashed-prints-user-profile-home-page-login-avatar-user.png'
        });

        setShowLogin(false);
      } else {
        alert(data.message || 'Login failed. Please Try Again');
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

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: "" })); }}
          onBlur={() => handleBlur("email")}
          required
        />
        {errors.email && <p className="error-msg">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: "" })); }}
          onBlur={() => handleBlur("password")}
          required
        />
        {errors.password && <p className="error-msg">{errors.password}</p>}

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
