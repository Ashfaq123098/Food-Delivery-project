import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import LoginFeature from './components/LoginFeature/LoginFeature';
import SignUpFeature from './components/SignUpFeature/SignUpFeature';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <>
      {showLogin && <LoginFeature setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />}
      {showSignUp && <SignUpFeature setShowSignUp={setShowSignUp} setShowLogin={setShowLogin} />}

      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
};

export default App;


