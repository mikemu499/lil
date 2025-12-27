import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Games.css';

const Games = () => {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState('wheel');

  const games = {
    wheel: 'Wheel Game',
    mm: 'Memory Match',
    multi: 'Multi Quiz Game',
    hangman: 'Hangman Game'
  };

  return (
    <div className="games-page">
      <button 
        className="back-btn" 
        title="Back to Teachers"
        onClick={() => navigate('/teachers')}
      >
        <span className="back-icon">←</span>
        <span className="back-text">Back</span>
      </button>

      <div className="header-menu">
        {Object.entries(games).map(([key, label]) => (
          <button
            key={key}
            className={`menu-btn ${activeGame === key ? 'selected' : ''}`}
            onClick={() => setActiveGame(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="game-container">
        <h2>{games[activeGame]}</h2>
        <p>Game content will be displayed here.</p>
        <p>This is a placeholder for the {games[activeGame]} game.</p>
      </div>
    </div>
  );
};

export default Games;