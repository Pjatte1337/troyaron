import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="App-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
