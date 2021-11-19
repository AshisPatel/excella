import './App.css';
import Home from './pages/Home';
import EisenHowerMatrix from './pages/EisenhowerMatrix';

import JobCRM from './pages/JobCRM';
import PomodoroTimer from './pages/PomodoroTimer';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
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
