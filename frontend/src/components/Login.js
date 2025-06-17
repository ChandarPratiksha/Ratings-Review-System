//frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/style.css';


function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please fill all fields');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password } ,{ withCredentials: true } );
      
      if (res.data.success) {
  onLogin(res.data.user); // passing full user object

// either 'admin' or 'user'
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Ratings & Review System</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label><br />
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <br />
        <div>
          <label>Password:</label><br />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <br />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

