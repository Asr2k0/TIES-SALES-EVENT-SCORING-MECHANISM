import React from 'react';
import './App.css'; // Assuming you have some CSS for styling
import Logo from './logo';
import WelcomeMessage from './welcomemessage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RoomPage from './roompage';
import Box from './box'; // Import the Box component

import StudentDetailsPage from './studentpagedetails'; // Import the StudentDetailsPage component

function App() {
  return (
    <Router>
      <div className="container">
        <div className="left-panel">
          <Logo />
          <WelcomeMessage />
        </div>
        <div className="right-panel">
          <Routes>
            <Route path="/" element={<Box />} />
            <Route path="/rooms/:roomId" element={<RoomPage />} />
            <Route path="/student/:studentName" element={<StudentDetailsPage />} /> {/* Add route for student details page */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;