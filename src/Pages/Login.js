import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Login.css'; // Create or adjust path if needed

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo login logic
    if (form.email === 'demo@example.com' && form.password === 'password') {
      setMessage('✅ Login successful!');
      // Simulate redirect
      setTimeout(() => navigate('/dashboard'), 1500);
    } else {
      setMessage('❌ Invalid email or password');
    }
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {/* <button type="submit">Login</button> */}
        <Link to="/dashboard" className="login-button">Login</Link>
        {message && <p className="message">{message}</p>}
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
