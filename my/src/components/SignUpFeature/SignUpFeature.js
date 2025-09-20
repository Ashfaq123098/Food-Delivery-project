import React, { useState } from 'react';
import './SignUpFeature.css';

function SignUpFeature({ onSuccess = () => {} }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch('http://localhost:4000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        onSuccess({ name, email });
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
          onChange={e => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        <p>
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}

export default SignUpFeature;
