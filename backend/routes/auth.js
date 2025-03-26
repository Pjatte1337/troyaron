// backend/routes/auth.js
const express = require('express');
const router = express.Router();

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'secret'; // Store in env later

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
});

module.exports = router;
