import React, { useState } from "react";
import axios from "axios";
import "./SignupModal.css";

function SignupModal({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    snap: "",
    bio: "",
    img: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "https://troyaron-backend.onrender.com/api/users/signup",
        form
      );
      setSubmitted(true);
    } catch (error) {
      alert("Something went wrong! 😬");
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {submitted ? (
          <div>
            <h2>
              Tack!{" "}
              <span role="img" aria-label="high five">
                🙌
              </span>
            </h2>

            <p>Vi har fått din info.</p>
            <button onClick={onClose}>Stäng</button>
          </div>
        ) : (
          <div>
            <h2>Vis Intresse</h2>
            <input name="name" placeholder="Namn" onChange={handleChange} />
            <input name="age" placeholder="Ålder" onChange={handleChange} />
            <input name="snap" placeholder="Snapchat" onChange={handleChange} />
            <textarea
              name="bio"
              placeholder="Bio"
              onChange={handleChange}
            ></textarea>
            <input name="img" placeholder="Bild-URL" onChange={handleChange} />
            <button onClick={handleSubmit}>Skicka</button>
            <button onClick={onClose}>Avbryt</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupModal;
