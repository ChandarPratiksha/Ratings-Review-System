// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); 
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'Pratiksha' && password === '12345') {
    // session
    req.session.user = { username, role: 'admin', user_id: 0 };
    return res.json({ success: true, user: req.session.user });
  }

  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length > 0) {
      const user = results[0];
      req.session.user = { username: user.username, role: 'user', user_id: user.user_id };
      return res.json({ success: true, user: req.session.user });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});

//session persistence
router.get('/session', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });
    res.clearCookie('connect.sid');
    res.json({ success: true });
  });
});

module.exports = router;
