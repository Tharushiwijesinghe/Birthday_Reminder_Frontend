import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/AddBirthday.css'; // Optional: create this CSS file for styling

const AddBirthday = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [birthdays, setBirthdays] = useState([]);
  const [message, setMessage] = useState('');


  // Fetch all birthdays from backend
  const fetchBirthdays = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/birthdays/getAllBirthdays');
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
    const res = await axios.post('http://localhost:5000/api/birthdays', {
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
      <div className="title">Add Birthday</div>
      <div className="image-section"></div>
      <div className='form-section'>
      
      <form onSubmit={handleSubmit} className="birthday-form">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Enter Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <button type="submit">Add Birthday</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
     
    </div>
  );
};

export default AddBirthday;
