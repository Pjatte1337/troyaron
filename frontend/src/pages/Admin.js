import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [users, setUsers] = useState([]);

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://troyaron-backend.onrender.com/api/auth/login', loginForm);
      if (res.data.success) {
        setLoggedIn(true);
      }
    } catch (err) {
      alert('Unauthorized ❌');
    }
  };
  

  useEffect(() => {
    if (loggedIn) {
      axios
        .get('https://troyaron-backend.onrender.com/api/users')
        .then((res) => setUsers(res.data))
        .catch((err) => console.error('Failed to fetch users', err));
    }
  }, [loggedIn]);

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  if (!loggedIn) {
    return (
      <div style={{ padding: '40px' }}>
        <h2>Admin Login</h2>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={inputStyle}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>All Signups</h2>
      {users.length === 0 ? (
        <p>No users yet</p>
      ) : (
        <div style={cardContainer}>
          {users.map((user, index) => (
            <div key={index} style={card}>
              <img
                src={user.img}
                alt={user.name}
                style={{ width: '100%', borderRadius: '10px' }}
              />
              <h3>{user.name}</h3>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Snap:</strong> {user.snap}</p>
              <p>{user.bio}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Simple styles
const inputStyle = {
  display: 'block',
  margin: '10px 0',
  padding: '8px',
  width: '250px',
};

const cardContainer = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
};

const card = {
  border: '1px solid #ccc',
  padding: '15px',
  borderRadius: '10px',
  width: '220px',
  background: '#f9f9f9',
};

export default Admin;
