import React, { useState } from 'react';
import SignupModal from '../components/SignupModal';

function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <h1>Troy</h1>
      <p>Lite info om projektet Troy...</p>
      <button onClick={() => setShowModal(true)}>Vis intresse</button>

      {showModal && <SignupModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Home;
