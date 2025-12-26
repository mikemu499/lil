import React, { useState } from 'react';
import './Games.css';

const Games = () => {
  const [activeGame, setActiveGame] = useState('wheel');

  const games = {
    wheel: 'Wheel Game',
    mm: 'Memory Match',
    multi: 'Multi Quiz Game',
    hangman: 'Hangman Game'
  };

  return (
    <div className="games-page">
      <a href="/teachers" className="back-btn" title="Back to Teachers">
        <span className="back-icon">←</span>
        <span className="back-text">Back</span>
      </a>

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