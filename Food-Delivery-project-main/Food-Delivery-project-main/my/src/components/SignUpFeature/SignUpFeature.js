import React, { useState } from "react";
import "./SignUpFeature.css";

function SignUpFeature({ setShowSignUp, setShowLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    // validations

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('❌ Invalid email');
      return;
    }

    if (password.length < 6) {
      alert('❌ Password must be at least 6 characters');
      return;
    }

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      alert('❌ Mobile number must be 10 digits');
      return;
    }

    if (!dob) {
      alert('❌ Date of Birth is required');
      return;
    }

    alert("✅ Signup Successful!\n" + "Email: " + email + "\n" + "Password: " + password + "\n" + "Mobile: " + mobile + "\n" + "DOB: " + dob);
    setShowSignUp(false);
    setShowLogin(true);
  };

  return (
    <div className="signup-wrapper">
      <form className="signup-box" onSubmit={handleSignUp}>
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join us and get started!</p>

        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="tel" placeholder="Mobile Number" value={mobile} onChange={e => setMobile(e.target.value)} required />
        <input type="date" value={dob} onChange={e => setDob(e.target.value)} required />

        <button type="submit" className="btn-signup">Sign Up</button>

        <p className="login-text">
          Already have an account?{" "}
          <span className="signup-link" onClick={() => { setShowSignUp(false); setShowLogin(true); }}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUpFeature;