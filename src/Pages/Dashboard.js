import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../CSS/Dashboard.css';


const Dashboard = () => {

  const [username, setUsername] = useState(' ');
  const [birthdaysFromDB, setBirthdaysFromDB] = useState([]); // for filtering/searching
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]); // for upcoming section
  const navigate = useNavigate();





  // const handleChange = (e) => {
  //   setBirthdays({ ...birthdays, [e.target.name]: e.target.value });
  // };

  useEffect(() => {

    // Get username from localStorage
    // This assumes you have stored the username during registration or login
    // const storedName = localStorage.getItem('username');
    // if (storedName) {
    //   setUsername(storedName);
    // }

    const fetchBirthdays = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/birthdays');
        const today = new Date();

        const upcoming = res.data
          .map(b => {
            const birthday = new Date(b.dateOfBirth);
            birthday.setFullYear(today.getFullYear());

            // If birthday already passed this year, set it to next year
            if (birthday < today) {
              birthday.setFullYear(today.getFullYear() + 1);
            }

            return {
              ...b,
              upcomingDate: birthday
            };
          })
          .sort((a, b) => a.upcomingDate - b.upcomingDate)
          .slice(0, 5);

        setBirthdaysFromDB(res.data);
        setUpcomingBirthdays(upcoming);
      } catch (error) {
        console.error('Error fetching birthdays:', error);
      }
    };

    fetchBirthdays();
  }, []);

  const handleLogout = () => {
    // Optional: clear user data or token from localStorage
    // localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page
  };

  const handleBack = () => {
    navigate("/"); // Go to previous page
  };


  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🎂 BirthdayPal</h2>
        <ul>
          <li><Link to="/dashboard">📊 Dashboard</Link></li>
          <li><Link to="/add-birthday">➕ Add Birthday</Link></li>
          <li><Link to="/all-birthdays">📋 All Birthdays</Link></li>
        </ul>
        <div className="sidebar-bottom">
          <button onClick={handleBack} className="sidebar-button">⬅️ Back</button>
          <button onClick={handleLogout} className="sidebar-button logout">🚪 Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <h3>Welcome, {username}!</h3>
        </header>

        {/* Search and Filter */}
        
        <div className="upcoming-birthdays ">
        <h3>Upcoming Birthdays</h3>
        <ul>
          {upcomingBirthdays.map((b, i) => (
            <li key={i}>
              {b.name} – {new Date(b.dateOfBirth).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </li>
          ))}
        </ul>
        </div>
        {/* Footer */}
        <footer className="footer">
          © 2025 BirthdayPal — Built with ❤️
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
