const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const AWS = require('aws-sdk'); 
const User = require('./models/User'); 
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/users/signup', upload.single('img'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file uploaded' });
  }

  const { name, age, snap, bio } = req.body;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: Date.now() + '-' + req.file.originalname, 
    Body: req.file.buffer,
    ContentType: req.file.mimetype, 
    ACL: 'public-read', 
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error uploading to S3', error: err.message });
    }

    const imgUrl = data.Location; 
    const newUser = new User({
      name,
      age,
      snap,
      bio,
      img: imgUrl, 
    });

    newUser.save()
      .then(() => res.json({ success: true, message: 'Signup successful', user: newUser }))
      .catch((err) => res.status(500).json({ success: false, message: 'Error saving user', error: err.message }));
  });
});

app.get('/api/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(500).json({ success: false, message: 'Error fetching users', error: err.message }));
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'Unauthorized' });
});

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
