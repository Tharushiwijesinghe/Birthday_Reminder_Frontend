// src/Components/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../CSS/Layout.css'; // (Optional: Create if needed for layout styling)

const Layout = () =>{
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  return (
    <div className="layout-container">
      <Sidebar handleBack={handleBack} handleLogout={handleLogout} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
