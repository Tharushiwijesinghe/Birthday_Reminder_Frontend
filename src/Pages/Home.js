import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Home.css';
import bgImage from '../assets/10.jpg'; // adjust path if needed
import logo from '../assets/logo1.png'; // adjust path if needed

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="overlay">
        <h1 className="app-name">
        <img src={logo} alt="BirthdayPal Logo" className="logo-img" />
        </h1>
        <p className="tagline">Never miss a special day again.</p>
        <div className="button-group">
          <Link to="/register" className="home-button">Register</Link>
          <Link to="/login" className="home-button"> Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
