import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Home.css'; 
import '../CSS/Styles.css'; // Keep your custom styles if needed
import bgImage from '../assets/5.avif';
import img1 from '../assets/4.avif';
import img2 from '../assets/20.jpg';
import img3 from '../assets/17.png';
import img4 from '../assets/12.avif';
import logo from '../assets/logo1.png';

const images = [bgImage, img2, img3, img4, img1];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="home-container d-flex justify-content-center align-items-center text-center"
      style={{
        backgroundImage: `url(${images[currentIndex]})`,
      }}
    >
      <div className="overlay container">
        <h1 className="app-name">
          <img src={logo} alt="BirthdayPal Logo" className="logo-img img-fluid" />
        </h1>
        <p className="tagline">Never miss a special day again.</p>

        <div className="button-group d-flex gap-3 justify-content-center">
          <Link to="/register" className="btn btn-dark px-4 py-2 rounded-pill fw-bold">
            Register
          </Link>
          <Link to="/login" className="btn btn-dark px-4 py-2 rounded-pill fw-bold">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
