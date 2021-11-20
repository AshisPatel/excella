import React , { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EisenHowerMatrix from './pages/EisenhowerMatrix';
import JobCRM from './pages/JobCRM';
import PomodoroTimer from './pages/PomodoroTimer';
import Nav from './components/Nav';
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";


function App() {

  // initialize visibility of signup/login modal
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false); 

  return (
    <div className="App">
      {showSignup && <SignupModal setShowSignup={setShowSignup} setShowLogin={setShowLogin}/>}
      {showLogin && <LoginModal setShowSignup={setShowSignup} setShowLogin={setShowLogin} />}
      <Nav 
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup} 
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/EisenhowerMatrix" element={<EisenHowerMatrix />} />
        <Route path="/JobCRM" element={<JobCRM />} />
        <Route path="/PomodoroTimer" element={<PomodoroTimer />} />
      </Routes>
    </div>
  );
}

export default App;
