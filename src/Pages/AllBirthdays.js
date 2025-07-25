import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/AllBirthdays.css'; 

const AllBirthdays = () => {
  const API_BASE = process.env.REACT_APP_API_BASE;
  const [birthdaysFromDB, setBirthdaysFromDB] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', dateOfBirth: '' });

  // Fetch all birthdays from backend
  
    const fetchBirthdays = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/birthdays`);
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
      await axios.put(`${API_BASE}/api/birthdays/${id}`, editForm);
      await fetchBirthdays();
      console.log("Saving...", editForm);
      setEditId(null);
    } catch (error) {
      console.error('Error updating birthday:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this birthday?')) {
      try {
        await axios.delete(`${API_BASE}/api/birthdays/${id}`);
        await fetchBirthdays();
      } catch (error) {
        console.error('Error deleting birthday:', error);
      }
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
    <div className="container all-birthdays-container">
  <h2 className="text-center mb-4">All Birthdays</h2>

  {/* Search and Filter */}
  <div className="row justify-content-center mb-4 search-filter p-3">
    <div className="col-md-5 mb-2">
      <label className="w-100">
        🔍 Search by name:
        <input
          type="text"
          className="form-control mt-1"
          placeholder="Type name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
    </div>
    <div className="col-md-5 mb-2">
      <label className="w-100">
        ⬇️ Filter by month:
        <select
          className="form-select mt-1"
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
  </div>

  {/* Table */}
  <div className="birthday-table-container">
    <table className="table birthday-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Turns</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredBirthdays.length > 0 ? (
          filteredBirthdays.map((b) => (
            <tr key={b._id}>
              {editId === b._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={editForm.dateOfBirth}
                      onChange={handleEditChange}
                      className="form-control"
                    />
                  </td>
                  <td>{calculateAge(editForm.dateOfBirth)} yrs</td>
                  <td>
                    <button className="save-btn me-2" onClick={() => handleEditSave(b._id)}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditId(null)}>Close</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{b.name}</td>
                  <td>
                    {new Date(b.dateOfBirth).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                  <td>{calculateAge(b.dateOfBirth)} yrs</td>
                  <td>
                    <button className="edit-btn me-2" onClick={() => handleEditClick(b)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDeleteClick(b._id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No birthdays found for this month.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default AllBirthdays;
