// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  snap: String,
  bio: String,
  img: String,
});

module.exports = mongoose.model('User', userSchema);
