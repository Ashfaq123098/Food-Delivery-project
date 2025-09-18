import React, { useState } from 'react';
import './SignUpFeature.css';

function SignUpFeature({ setShowSignUp = () => {}, setShowLogin = () => {}, onSuccess = () => {} }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({ name: "", email: "", password: "" });

  const handleBlur = (field) => {
    if (field === "name" && !name.trim()) {
      setErrors(prev => ({ ...prev, name: "Please enter your Name" }));
    }
    if (field === "email" && !email) {
      setErrors(prev => ({ ...prev, email: "Please enter your Email" }));
    }
    if (field === "password" && !password) {
      setErrors(prev => ({ ...prev, password: "Please enter your Password" }));
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // ✅ Name Validation
    if (!name.trim()) {
      return setErrors(prev => ({ ...prev, name: "❌ Name cannot be empty or spaces only" }));
    }
    

    // ✅ Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return setErrors(prev => ({ ...prev, email: "❌ Invalid email" }));
    }

    // ✅ Password Validation
    if (password.length < 8) {
      return setErrors(prev => ({ ...prev, password: "❌ Password must be at least 8 characters" }));
    }

    try {
      setLoading(true);

      const res = await fetch('http://localhost:4000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email, password }),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess({ name: name.trim(), email });
        setShowSignUp(false);
        setShowLogin(true);
        alert('✅ Signup Successful!');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.log(error);
      alert('Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-box" onSubmit={handleSignUp}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => { setName(e.target.value); setErrors(prev => ({ ...prev, name: "" })); }}
          onBlur={() => handleBlur("name")}
        />
        {errors.name && <p className="error-msg">{errors.name}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: "" })); }}
          onBlur={() => handleBlur("email")}
        />
        {errors.email && <p className="error-msg">{errors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: "" })); }}
          onBlur={() => handleBlur("password")}
        />
        {errors.password && <p className="error-msg">{errors.password}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p>
          Already have an account?{" "}
          <span onClick={() => { setShowSignUp(false); setShowLogin(true); }}>Login</span>
        </p>
      </form>
    </div>
  );
}

export default SignUpFeature;


