import React , { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EisenHowerMatrix from './pages/EisenhowerMatrix';
import JobCRM from './pages/JobCRM';
import PomodoroTimer from './pages/PomodoroTimer';
import Nav from './components/Nav';
import SideNav from "./components/SideNav";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import { useSelector } from "react-redux";



function App() {

  // initialize visibility of signup/login modal
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false); 

  // delete once authentication exists 
  const loggedIn = useSelector(state => state.loggedIn);
  const currentPage = useSelector(state => state.currentPage);

  const pageColor = 
          currentPage === 'Help' ? 'expand-blue' 
          : currentPage === 'Job CRM' ? 'expand-green' 
          : currentPage === 'Pomodoro Timer' ? 'expand-red' 
          : currentPage === 'Eisenhower Matrix' ? 'expand-purple' 
          : '';

  return (
    <div className="content">
      <div className={`color-circle ${pageColor}`} />
      {loggedIn && <SideNav />}
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
