import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login'; // Assuming you have a Login component
import Dashboard from './Pages/Dashboard'; // Assuming you have a Dashboard component
import AddBirthday from './Pages/AddBirthday'; // Assuming you have an AddBirthday component
import AllBirthdays from './Pages/AllBirthdays'; // Assuming you have an AllBirthdays component
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-birthday" element={<AddBirthday />} />
        <Route path="/all-birthdays" element={<AllBirthdays />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
