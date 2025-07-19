import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/AllBirthdays.css'; 

const AllBirthdays = () => {
  const [birthdaysFromDB, setBirthdaysFromDB] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', dateOfBirth: '' });

  // Fetch all birthdays from backend
  
    const fetchBirthdays = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/birthdays');
        setBirthdaysFromDB(res.data);
      } catch (error) {
        console.error('Error fetching birthdays:', error);
      }
    };

  useEffect(() => { 
    fetchBirthdays();
  }, []);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    return new Date(ageDiff).getUTCFullYear() - 1970;
  };
  
  const handleEditClick = (b) => {
    setEditId(b._id);
    setEditForm({ name: b.name, dateOfBirth: b.dateOfBirth.slice(0, 10) }); // Format for input[type="date"]
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/birthdays/${id}`, editForm);
      await fetchBirthdays();
      setEditId(null);
    } catch (error) {
      console.error('Error updating birthday:', error);
    }
  };

  const filteredBirthdays = birthdaysFromDB.filter((b) => {
    const month = new Date(b.dateOfBirth).getMonth() + 1;
    return (
      b.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim()) &&
      (selectedMonth === "all" || month === parseInt(selectedMonth))
    );
  });

  return (
    <div className="all-birthdays-container">
      <h2>All Birthdays</h2>

      {/* Search and Filter */}
      <div className="search-filter">
        <label>
          🔍 Search by name:{' '}
          <input
            type="text"
            placeholder="Type name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        <label>
          ⬇️ Filter by month:{' '}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="all">All Months</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Table */}
      <div className="birthday-table-container">
              <aside className="sidebar">
        <h2>🎂 BirthdayPal</h2>
        <ul>
          <li><Link to="/dashboard">📊 Dashboard</Link></li>
          <li><Link to="/add-birthday">➕ Add Birthday</Link></li>
          <li><Link to="/all-birthdays">📋 All Birthdays</Link></li>
        </ul>
      </aside>
      <table className="birthday-table">
        <thead>
          <tr>
            <th>🧑 Name</th>
            <th>🎈 Date of Birth</th>
            <th>🎂 Turns</th>
            <th>⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBirthdays.length > 0 ? (
            filteredBirthdays.map((b) => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>
                  📅{' '}
                  {new Date(b.dateOfBirth).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </td>
                <td>{calculateAge(b.dateOfBirth)} yrs</td>
                <td>
                  <button className="edit-btn">✏️</button>
                  <button className="delete-btn">🗑️</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No birthdays found for this month.</td>
            </tr>
          )}
        </tbody>
      </table>

      <footer className="footer">
        © 2025 BirthdayPal — Built with ❤️
      </footer>
    </div>

  </div>
  );
};

export default AllBirthdays;
