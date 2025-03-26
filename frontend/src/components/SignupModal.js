import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SignupModal.css';

const SignupModal = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    snap: '',
    bio: '',
    img: null, // Store the file here
  });
  const [preview, setPreview] = useState(null); // For image preview

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, img: file });
      setPreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('age', form.age);
    formData.append('snap', form.snap);
    formData.append('bio', form.bio);
    formData.append('img', form.img); // Attach the image file
  
    try {
      const res = await axios.post('https://troyaron-backend.onrender.com/api/users/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res.data.success) {
        alert('Signup successful!');
        onClose(); // Close the modal after submission
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">Vis Intresse</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="snap"
            placeholder="Snapchat"
            value={form.snap}
            onChange={handleChange}
            required
          />
          <textarea
            name="bio"
            placeholder="Bio"
            value={form.bio}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {preview && <img src={preview} alt="preview" style={{ width: '100px', height: '100px' }} />}
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
