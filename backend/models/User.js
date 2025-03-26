const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,  // Ensuring that the 'name' field is required
    trim: true,  // Automatically trims any leading/trailing whitespaces
  },
  age: {
    type: Number,
    required: true,  // Ensuring that the 'age' field is required
    min: 13,  // Minimum age of 13 (if required)
  },
  snap: {
    type: String,
    required: true,  // Ensuring that the 'snap' field is required
    trim: true,  // Automatically trims any leading/trailing whitespaces
  },
  bio: {
    type: String,
    required: true,  // Ensuring that the 'bio' field is required
    trim: true,  // Automatically trims any leading/trailing whitespaces
  },
  img: {
    type: String,
    required: true,  // Ensuring that the 'img' field is required
    // The 'img' will store the file path that multer will generate
  },
});

// Optionally, you could add more complex validation for fields like snap to ensure it's a valid Snapchat username

module.exports = mongoose.model('User', userSchema);
