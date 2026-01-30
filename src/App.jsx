import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobListingsPage from './pages/JobListingsPage';
import ApplicationTracker from './pages/ApplicationTracker';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<JobListingsPage />} />
          <Route path="/tracker" element={<ApplicationTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
