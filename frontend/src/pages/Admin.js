import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Admin.css';  // Import the CSS file

const Admin = () => {
  // Check localStorage for previous session
  const [loggedIn, setLoggedIn] = useState(() => {
    const stored = localStorage.getItem('admin_login');
    if (!stored) return false;

    const data = JSON.parse(stored);
    const now = Date.now();

    if (now - data.time > 300000) { // 5-minute session expiry
      localStorage.removeItem('admin_login');
      return false;
    }

    return true;
  });

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [users, setUsers] = useState([]);

  // Handle login form
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        'https://troyaron-backend.onrender.com/api/auth/login',
        loginForm
      );
      if (res.data.success) {
        setLoggedIn(true);
        localStorage.setItem(
          'admin_login',
          JSON.stringify({ time: Date.now() })
        );
      }
    } catch (err) {
      alert('Unauthorized ❌');
    }
  };

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  // Auto-logout after 5 minutes
  useEffect(() => {
    let timeout;

    if (loggedIn) {
      timeout = setTimeout(() => {
        setLoggedIn(false);
        localStorage.removeItem('admin_login');
        alert('Session expired. You’ve been logged out ⏱️');
      }, 300000); // 5 minutes
    }

    return () => clearTimeout(timeout);
  }, [loggedIn]);

  // Fetch users from backend
  useEffect(() => {
    if (loggedIn) {
      axios
        .get('https://troyaron-backend.onrender.com/api/users')
        .then((res) => setUsers(res.data))
        .catch((err) => console.error('Failed to fetch users', err));
    }
  }, [loggedIn]);

  // Login screen
  if (!loggedIn) {
    return (
      <div className="admin-container">
        <h2>Admin Login</h2>
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="input-field"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="input-field"
        />
        <button onClick={handleLogin} className="button">Login</button>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="admin-container">
      <h2>All Signups</h2>
      <button
        onClick={() => {
          setLoggedIn(false);
          localStorage.removeItem('admin_login');
        }}
        className="button"
        style={{ marginBottom: '20px' }}
      >
        Logout
      </button>

      {users.length === 0 ? (
        <p>No users yet</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {users.map((user, index) => (
            <div key={index} className="card">
              <img
                src={`https://troyaron-backend.onrender.com${user.img}`} // Fix image URL
                alt={user.name}
                className="card-img"
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
export default Admin;
