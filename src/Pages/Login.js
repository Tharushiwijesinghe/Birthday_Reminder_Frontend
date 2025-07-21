import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/Login.css'; 
import '../CSS/Styles.css'; 

const Login = () => {
const API_BASE = process.env.REACT_APP_API_BASE;
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setMessage('✅ Login successful!');
        setForm({ email: '', password: '' });
        window.location.href = '/dashboard';
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      setMessage('Login failed');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#41182c' }}>
      <form className="bg-white p-4 shadow rounded" style={{ width: '100%', maxWidth: '400px' }} onSubmit={handleSubmit}>
        <h2 className="mb-4 text-center">Login</h2>

        <input
          type="email"
          name="email"
          className="form-control mb-3"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-dark w-100 fw-bold">
          Login
        </button>

        {message && <p className="mt-3 text-center fw-semibold text-success">{message}</p>}

        <p className="mt-3 text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
