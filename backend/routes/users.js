const multer = require('multer');
const path = require('path');

// Setup multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save image to 'uploads' folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage: storage });

router.post('/signup', upload.single('img'), async (req, res) => {
  const { name, age, snap, bio } = req.body;
  const img = req.file ? `/uploads/${req.file.filename}` : null; // Save file path
  
  const newUser = new User({
    name,
    age,
    snap,
    bio,
    img,
  });

  try {
    await newUser.save();
    res.status(200).json(newUser); // Return the new user with the image URL
  } catch (error) {
    res.status(500).json({ message: 'Error saving user' });
  }
});
