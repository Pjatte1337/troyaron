const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs'); // To check folder existence
const User = require('./models/User'); // Assuming User model is in models folder

require('dotenv').config();

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());  // This allows requests from any domain. You can configure it more strictly if needed.

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware for parsing form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure the 'uploads' folder exists, if not create it
const uploadsDir = path.join(__dirname, 'uploads');  // Ensure 'uploads' folder is in the root
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });  // Create the folder if it doesn't exist
}

// Configure multer to save uploaded files in the 'uploads' folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Save files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;  // Use timestamp for uniqueness
    cb(null, uniqueSuffix);  // Set file name as timestamp + original name
  },
});

const upload = multer({ storage: storage });

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Route for handling user signup and image upload
app.post('/api/users/signup', upload.single('img'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file uploaded' });
  }

  const { name, age, snap, bio } = req.body;
  const imgUrl = '/uploads/' + req.file.filename;  // Store the relative file path

  const newUser = new User({
    name,
    age,
    snap,
    bio,
    img: imgUrl,  // Save the relative path in the database
  });

  newUser.save()
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json({ success: false, error: err.message }));
});

// Route to fetch all users for admin panel
app.get('/api/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// Login route for admin authentication
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'Unauthorized' });
});

// Basic test route for MongoDB connection
app.get('/api/test-db', async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ success: true, message: 'MongoDB is connected 🎉' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'MongoDB is NOT connected ❌', error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
