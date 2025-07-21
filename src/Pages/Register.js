import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Register.css'; 
import '../CSS/Styles.css';// Keep your custom styles if needed

const Register = () => {
  const API_BASE = process.env.REACT_APP_API_BASE;
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Registered successfully! You can now log in.');
        setForm({ username: '', email: '', password: '' });
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error('Registration error:', err);
      setMessage('Registration failed');
    }
  };

  return (
    <div className="register-container d-flex justify-content-center align-items-center vh-100 ">
      <form className=" p-5 rounded shadow w-100 bg-light" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
        <h2 className="mb-4 text-center">Register</h2>
        <input
          className="form-control mb-3"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button className="btn btn-dark w-100" type="submit">Sign Up</button>
        {message && <p className="text-danger mt-3">{message}</p>}
        <p className="mt-3">Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  );
};

export default Register;
