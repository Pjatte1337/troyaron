import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', age: '', snap: '', bio: '', img: '' });
  const [confirmation, setConfirmation] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await axios.post('https://your-backend.onrender.com/api/users/signup', form);
    setShowModal(false);
    setConfirmation(true);
  };

  return (
    <div className="container">
      <h1>Troy</h1>
      <p>Info about the project Troy...</p>
      <button onClick={() => setShowModal(true)}>Vis intresse</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="age" placeholder="Age" onChange={handleChange} />
            <input name="snap" placeholder="Snapchat" onChange={handleChange} />
            <textarea name="bio" placeholder="Bio" onChange={handleChange}></textarea>
            <input name="img" placeholder="Image URL" onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}

      {confirmation && <p>Tack! Vi har fått din info.</p>}
    </div>
  );
}

export default App;
