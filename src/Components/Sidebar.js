import React from 'react';
import { FaHome, FaPlus, FaList, FaArrowLeft, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.png'; // Ensure the path to your logo is correct
import '../CSS/Sidebar.css'; // same styles from Dashboard.css

const Sidebar = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <img src={logo} alt="BirthdayPal Logo" className="logo" />
        <h2 className="dashboard-title">Dashboard</h2>
      </div>

      <ul className="sidebar-middle">
        <li className="dashboard-item"><Link to="/">Home</Link></li>
        <li className="dashboard-item"><Link to="/dashboard">UpComing Birthdays</Link></li>
        <li className="dashboard-item"><Link to="/add-birthday">Add Birthday</Link></li>
        <li className="dashboard-item"><Link to="/all-birthdays">All Birthdays</Link></li>
      </ul>

      <div className="sidebar-bottom">
        <button className="dashboard-btn" onClick={handleBack}>
          <FaArrowLeft  /> Back
        </button>
        <button className="dashboard-btn logout" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
