import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/AddBirthday.css'; 
import '../CSS/Styles.css';

const AddBirthday = () => {
  const API_BASE = process.env.REACT_APP_API_BASE;
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [birthdays, setBirthdays] = useState([]);
  const [message, setMessage] = useState('');


  // Fetch all birthdays from backend
  const fetchBirthdays = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/birthdays/getAllBirthdays`);
      console.log('Fetched birthdays:', res.data);
      setBirthdays(res.data);
    } catch (error) {
      console.error('Error fetching birthdays:', error);
    }
  };

  useEffect(() => {
    fetchBirthdays();
  }, []);

  // Add new birthday
 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!name || !dob) return alert('Please fill out both fields.');

  try {
    const res = await axios.post(`${API_BASE}/api/birthdays`, {
      name,
      dateOfBirth: dob,
      // userId: '12345',
    });

    console.log('Added birthday:', res.data);
    setMessage(res.data.message || '🎉 Birthday added successfully!');
    setName('');
    setDob('');
    fetchBirthdays();

    setTimeout(() => setMessage(''), 1000);
  } catch (error) {
    console.error('Error adding birthday:', error);
    setMessage(error.response?.data?.message || '❌ Failed to add birthday');
  }
 };

 


  return (
    
 <div className="add-birthday-page">
  <div className="form-section text-center p-4">
    <div className="title mb-4">Add Birthday</div>
    <form onSubmit={handleSubmit} className="birthday-form d-flex flex-column gap-3">
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-control"
      />
      <input
        type="date"
        placeholder="Enter Date of Birth"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="form-control"
      />
      <button type="submit" className="btn btn-dark">
        Add Birthday
      </button>
      {message && <p className="message mt-2">{message}</p>}
    </form>
  </div>
</div>


  );
};

export default AddBirthday;
