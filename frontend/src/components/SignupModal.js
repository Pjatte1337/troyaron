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
  const [successMessage, setSuccessMessage] = useState(''); // For success message
  const [errorMessage, setErrorMessage] = useState(''); // For error message
  const [isSuccess, setIsSuccess] = useState(false); // To control the modal animation

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

    // Clear previous messages
    setSuccessMessage('');
    setErrorMessage('');

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
        setSuccessMessage('Signup successful! 🎉'); // Show success message
        setIsSuccess(true); // Trigger the animation
        setForm({
          name: '',
          age: '',
          snap: '',
          bio: '',
          img: null,
        }); // Reset the form after successful submission
        setPreview(null); // Clear image preview

        // Close modal after 4 seconds
        setTimeout(() => {
          onClose();
        }, 4000); // 4-second timeout
      }
    } catch (error) {
      setErrorMessage('Something went wrong! Please try again.'); // Show error message
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={`modal-overlay ${isSuccess ? 'fade-out' : ''}`}>
      <div className={`modal-box ${isSuccess ? 'fade-out' : ''}`}>
        {/* Close button in the top right corner */}
        <button className="close-button" onClick={onClose}>X</button>

        <h2 className="modal-title">Vis Intresse</h2>

        {/* Show success or error message */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

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
