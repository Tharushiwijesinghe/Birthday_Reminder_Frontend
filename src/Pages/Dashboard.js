import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Outlet, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../CSS/Dashboard.css';
import confettiBg from '../assets/12.avif'; 
import { motion } from 'framer-motion';



const Dashboard = () => {

  const [username, setUsername] = useState(' ');
  const [birthdaysFromDB, setBirthdaysFromDB] = useState([]); // for filtering/searching
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]); // for upcoming section
  const [todaybirthdays, setTodayBirthdays] = useState([]); // for today's section
  const navigate = useNavigate();



  useEffect(() => {
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

      // ✅ Filter today's birthdays
      const todayList = res.data.filter(b => {
        const birthday = new Date(b.dateOfBirth);
        return birthday.getDate() === today.getDate() && birthday.getMonth() === today.getMonth();
      });

        setTodayBirthdays(todayList);

      // ✅ Show popup if there are any
      if (todayList.length > 0) {
        alert(`🎉 It's ${todayList.map(b => b.name).join(', ')}'s Birthday Today! 🎂`);
      }

      } catch (error) {
        console.error('Error fetching birthdays:', error);
      }
    };

    fetchBirthdays();
  }, []);


  return (
  <div className="dashboard-container">
    <main className="main-content container py-4">
      {/* Top Bar */}
      <header className="top-bar d-flex justify-content-end mb-3">
        <h3>Welcome, {username}!</h3>
      </header>

      {/* Upcoming Birthdays Section */}
      <div
        className="upcoming-birthdays-container p-4 rounded"
        style={{ backgroundImage: `url(${confettiBg})`, backgroundRepeat: 'no-repeat' }}
      >
        <motion.h3
          className="mb-3"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Upcoming Birthdays 🎉
        </motion.h3>

        <ul>
          {upcomingBirthdays.map((b, i) => (
            <motion.li
              key={i}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.3 + i * 0.3,
              }}
            >
              {b.name} –{' '}
              {new Date(b.dateOfBirth).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Today's Birthdays Section */}
      {todaybirthdays.length > 0 && (
        <div className="todays-birthday-banner mt-5">
          🎉 <strong>Today’s Birthdays!</strong> 🎉
          <ul>
            {todaybirthdays.map((b, i) => (
              <li key={i}>
                <strong>{b.name}</strong> – Happy Birthday! 🥳
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <footer className="footer mt-4 text-center">
        © 2025 BirthdayPal — Built with ❤️
      </footer>
    </main>
  </div>

  );
};

export default Dashboard;
