import React, {useEffect, useState}from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Home.css';
import bgImage from '../assets/5.avif'; // adjust path if needed
import img1 from '../assets/4.avif';
import img2 from '../assets/20.jpg';
import img3 from '../assets/17.png';
import img4 from '../assets/12.avif';
import logo from '../assets/logo1.png'; // adjust path if needed


const images = [bgImage,img2, img3, img4, img1]; 

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % images.length);
      }, 4000); // 5 seconds
  
      return () => clearInterval(interval);
    }, []);  

  return (
    <div className="home-container" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
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
