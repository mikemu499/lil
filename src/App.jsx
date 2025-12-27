import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import './App.css';

// Import components
import Home from './components/Home';
import Teachers from './components/Teachers';
import Games from './components/Games';
import Reports from './components/Reports';
import Account from './components/Account';
import Help from './components/Help';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check authentication status on app load
  useEffect(() => {
    // In a real app, you would check auth status here
    // For now, we'll just set loading to false
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="app-loading">Loading...</div>;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app">
      <nav className="nav-container">
        <div className="nav-content">
          <Link to="/" className="nav-logo">
            <span role="img" aria-label="fairy">🧚‍♀️</span>
            Lil Fairy Award
          </Link>
          
          <div className="nav-links">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/teachers" className={`nav-link ${isActive('/teachers') ? 'active' : ''}`}>
              Teachers
            </Link>
            <Link to="/games" className={`nav-link ${isActive('/games') ? 'active' : ''}`}>
              Games
            </Link>
            <Link to="/reports" className={`nav-link ${isActive('/reports') ? 'active' : ''}`}>
              Reports
            </Link>
          </div>
          
          <div className="nav-buttons">
            <Link to="/help" className={`nav-link ${isActive('/help') ? 'active' : ''}`}>
              Help
            </Link>
            <Link to="/account" className={`nav-link ${isActive('/account') ? 'active' : ''}`}>
              Account
            </Link>
            <Link to="/teachers" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/games" element={<Games />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/account" element={<Account />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;