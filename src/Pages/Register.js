import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Register.css'; // Create this file for styling

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Registering user:', form);
    setMessage('✅ Registered successfully (demo mode)');
    // You can connect to backend API here
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange}/>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}/>
        <button type="submit">Sign Up</button>
          {message && <p className="message">{message}</p>}
          <p>Already have an account? <Link to="/login">Login here</Link></p>
      </form>
    </div>
  );
};

export default Register;
