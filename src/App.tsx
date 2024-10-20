import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import JobPosting from './components/JobPosting';
import Dashboard from './components/Dashboard';
import Candidates from './components/Candidates';
import Psychometrics from './components/Psychometrics';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar - Persistent on all pages */}
        <Sidebar />
        <div className="flex-grow">
          {/* Navbar - Persistent on all pages */}
          <Navbar />

          {/* Main content */}
          <div className="p-6 bg-gray-100 min-h-screen">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/jobs" element={<JobPosting />} />
              <Route path="/psychometrics" element={<Psychometrics />} />
              
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
