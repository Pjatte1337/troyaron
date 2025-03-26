import React, { useState } from 'react';
import SignupModal from '../components/SignupModal';
import '../styles/aurora.css';

function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="aurora-wrapper">
      <div className="aurora-bg" />

      <div className="aurora-content">
        <h1>Projekt Troy</h1>
        <p>
        En eksklusiv plattform der du kan vise interesse og bli del av noe unikt. Kun for utvalda.
        </p>
        <p>
        En eksklusiv plattform der du kan vise interesse og bli del av noe unikt. Kun for utvalda.
        </p>
        <p>
        En eksklusiv plattform der du kan vise interesse og bli del av noe unikt. Kun for utvalda.
        </p>
        <p>
        En eksklusiv plattform der du kan vise interesse og bli del av noe unikt. Kun for utvalda.
        </p>

        <button onClick={() => setShowModal(true)}>Vis intresse</button>
      </div>

      {showModal && <SignupModal onClose={() => setShowModal(false)} />}
    </main>
  );
}

export default Home;
