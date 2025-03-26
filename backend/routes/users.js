// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  try {
    const { name, age, snap, bio, img } = req.body;
    const user = new User({ name, age, snap, bio, img });
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
