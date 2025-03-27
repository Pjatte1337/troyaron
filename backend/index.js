const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const User = require('./models/User');
require('dotenv').config();

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware for parsing form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure the 'uploads' folder exists, if not create it
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });  // Ensure the 'uploads' folder exists
}

// Configure multer to handle file uploads and store them in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);  // Save files to 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;  // Ensure unique filenames
    cb(null, uniqueSuffix);  // Create unique filenames for each upload
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Route for handling user signup and image upload to Render's persistent disk
app.post('/api/users/signup', upload.single('img'), async (req, res) => {
  if (!req.file) {
    console.log('No image file uploaded');  // Log error when no file is uploaded
    return res.status(400).json({ success: false, message: 'No image file uploaded' });
  }

  // Log the file details to ensure multer is processing correctly
  console.log('File details:', req.file);

  // Store the file path in the database (no need to use S3)
  const imgUrl = `/uploads/${req.file.filename}`;  // Relative URL to the uploaded image

  const { name, age, snap, bio } = req.body;
  const newUser = new User({
    name,
    age,
    snap,
    bio,
    img: imgUrl, // Save the file path (from Render's disk) to the database
  });

  try {
    // Save the user and return a response with the image URL
    await newUser.save();
    res.json({ success: true, message: 'Signup successful!', imgUrl });
  } catch (error) {
    console.error('Error saving user data:', error);  // Log detailed error
    res.status(500).json({ success: false, message: 'Error saving user data', error: error.message });
  }
});

// Route to fetch all users for the admin panel
app.get('/api/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ success: false, message: 'Error fetching users', error: err.message }));
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
