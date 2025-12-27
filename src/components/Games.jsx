import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Games.css';

const Games = () => {
  const navigate = useNavigate();
  const games = [
    { id: 'wheel', name: 'Wheel of Fortune', icon: '🎡' },
    { id: 'multi', name: 'Multi-Choice', icon: '❓' },
    { id: 'tictactoe', name: 'Tic-Tac-Toe', icon: '❌' },
    { id: 'memory', name: 'Memory Match', icon: '🃏' }
  ];

  const [activeGame, setActiveGame] = useState('wheel');
  const [words, setWords] = useState('');
  const [images, setImages] = useState([]);
  const [gameData, setGameData] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [spinAngle, setSpinAngle] = useState(0);
  
  // Multi-Choice states
  const [questions, setQuestions] = useState([{ q: '', a: '', choices: ['', '', '', ''] }]);
  const [gameStarted, setGameStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [finished, setFinished] = useState(false);
  
  // Tic-Tac-Toe states
  const [player1, setPlayer1] = useState('Player 1');
  const [player2, setPlayer2] = useState('Player 2');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  // Handle images for wheel game
  const handleImages = (e) => {
    const files = Array.from(e.target.files || []);
    const readers = files.map(f => {
      return new Promise(res => {
        const r = new FileReader();
        r.onload = ev => res(ev.target.result);
        r.readAsDataURL(f);
      });
    });
    Promise.all(readers).then(imgs => setImages(imgs));
  };

  // Handle wheel game creation
  const handleSubmitWheel = (e) => {
    e.preventDefault();
    const wordList = words.split('\n').map(w => w.trim()).filter(Boolean);
    const segments = [
      ...wordList.map(w => ({ type: 'word', value: w })),
      ...images.map(img => ({ type: 'image', value: img }))
    ];
    if (segments.length < 2) {
      alert('Add at least 2 words or images.');
      return;
    }
    setGameData({ segments });
    setResult(null);
  };

  // Spin the wheel
  const spinWheel = () => {
    if (spinning) return;
    const segCount = gameData.segments.length;
    const anglePerSeg = 360 / segCount;
    const extraSpins = 5; // Extra spins for animation
    const randomSegment = Math.floor(Math.random() * segCount);
    const targetAngle = extraSpins * 360 + (randomSegment * anglePerSeg);
    
    setSpinning(true);
    setSpinAngle(targetAngle);
    setTimeout(() => {
      setSpinning(false);
      setResult(randomSegment);
    }, 2200); // Match CSS transition time
  };

  // Render wheel segments
  const renderWheel = (segments) => {
    const segCount = segments.length;
    const anglePerSeg = 360 / segCount;
    
    return (
      <svg viewBox="0 0 300 300" style={{ width: '100%', height: 'auto', borderRadius: '50%' }}>
        {segments.map((seg, i) => {
          const startAngle = i * anglePerSeg;
          const endAngle = (i + 1) * anglePerSeg;
          const largeArcFlag = anglePerSeg > 180 ? 1 : 0;
          
          const x1 = 150 + 140 * Math.cos((startAngle - 90) * Math.PI / 180);
          const y1 = 150 + 140 * Math.sin((startAngle - 90) * Math.PI / 180);
          const x2 = 150 + 140 * Math.cos((endAngle - 90) * Math.PI / 180);
          const y2 = 150 + 140 * Math.sin((endAngle - 90) * Math.PI / 180);
          
          const pathData = [
            `M 150 150`,
            `L ${x1} ${y1}`,
            `A 140 140 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          const textAngle = startAngle + anglePerSeg / 2;
          const textX = 150 + 80 * Math.cos((textAngle - 90) * Math.PI / 180);
          const textY = 150 + 80 * Math.sin((textAngle - 90) * Math.PI / 180);
          
          return (
            <g key={i}>
              <path 
                d={pathData} 
                fill={`hsl(${(i * 360 / segCount) % 360}, 70%, 80%)`} 
                stroke="#fff" 
                strokeWidth="2"
              />
              <text
                x={textX}
                y={textY}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#333"
                fontSize="12"
                fontWeight="600"
                transform={`rotate(${textAngle}, ${textX}, ${textY})`}
              >
                {seg.type === 'word' ? seg.value.substring(0, 8) + (seg.value.length > 8 ? '...' : '') : 'IMG'}
              </text>
            </g>
          );
        })}
        <circle cx="150" cy="150" r="15" fill="#fff" stroke="#7b4cff" strokeWidth="3"/>
      </svg>
    );
  };

  // Multi-Choice functions
  const handleQChange = (i, field, value) => {
    const newQs = questions.slice();
    if (field === 'q' || field === 'a') newQs[i][field] = value;
    else newQs[i].choices[field] = value;
    setQuestions(newQs);
  };

  const addQuestion = () => {
    setQuestions([...questions, { q: '', a: '', choices: ['', '', '', ''] }]);
  };

  const handleSubmitMulti = (e) => {
    e.preventDefault();
    // Validate
    if (!questions.every(q => q.q && q.a && q.choices.filter(Boolean).length >= 2)) {
      alert('Each question needs a question, a correct answer, and at least 2 choices.');
      return;
    }
    setGameStarted(true);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowAnswer(false);
    setFinished(false);
  };

  const handleChoice = (idx) => {
    if (showAnswer) return;
    setSelected(idx);
    setShowAnswer(true);
    if (questions[current].choices[idx] === questions[current].a) {
      setScore(s => s + 1);
    }
  };

  const nextQ = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setFinished(true);
    }
  };

  const restartMulti = () => {
    setGameStarted(false);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowAnswer(false);
    setFinished(false);
  };

  // Tic-Tac-Toe functions
  const checkWinner = (b) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6] // diags
    ];
    for (let [a,b1,c] of lines) {
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) return b[a];
    }
    return null;
  };

  const handleCell = (idx) => {
    if (winner || board[idx]) return;
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? 'X' : 'O';
    const win = checkWinner(newBoard);
    setBoard(newBoard);
    setWinner(win);
    setDraw(!win && newBoard.every(cell => cell));
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setDraw(false);
  };

  const handleSubmitTic = (e) => {
    e.preventDefault();
    setGameStarted(true);
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setDraw(false);
  };

  // Game creators
  const WheelGameCreator = () => {
    if (gameData) {
      const segCount = gameData.segments.length;
      const anglePerSeg = 360 / segCount;
      // If spinning, use spinAngle, else if result, rotate so winner is at top
      let wheelStyle = {
        position: 'relative',
        maxWidth: '340px',
        margin: '0 auto 18px auto',
        cursor: 'pointer',
        transition: 'transform 2.2s cubic-bezier(.22,1.2,.36,1)',
        transform: spinning ? `rotate(${spinAngle}deg)` : result !== null ? `rotate(${360 - result * anglePerSeg - anglePerSeg / 2}deg)` : 'rotate(0deg)'
      };

      return (
        <div className="game-section">
          <h2>🎡 Wheel of Fortune</h2>
          <p>Click the wheel to spin!</p>
          <div style={wheelStyle}>
            {renderWheel(gameData.segments)}
            <div 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                zIndex: 2 
              }}
              onClick={spinWheel}
            />
          </div>
          {result !== null && (
            <div style={{ 
              margin: '18px 0', 
              fontSize: '1.25em', 
              fontWeight: '800', 
              color: '#7b4cff', 
              textAlign: 'center', 
              letterSpacing: '0.01em' 
            }}>
              Result: {gameData.segments[result].type === 'word' ? gameData.segments[result].value : <img src={gameData.segments[result].value} style={{ width: '48px', height: '48px', verticalAlign: 'middle', borderRadius: '10px', boxShadow: '0 2px 8px #7b4cff22', marginLeft: '8px' }} alt="result" />}
            </div>
          )}
          <button 
            className="action-btn" 
            style={{ marginTop: '24px' }} 
            onClick={() => { 
              setGameData(null); 
              setResult(null); 
              setSpinAngle(0); 
            }}
          >
            Create Another Wheel
          </button>
        </div>
      );
    }

    return (
      <div className="game-section">
        <h2>🎡 Wheel of Fortune Game Creator</h2>
        <p>Add words (one per line) and/or upload images to create your custom wheel.</p>
        <form onSubmit={handleSubmitWheel}>
          <textarea 
            placeholder="Enter words, one per line"
            value={words}
            onChange={e => setWords(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginBottom: '10px' }}
          />
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleImages}
          />
          {images.length > 0 && (
            <div className="image-preview" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
              {images.map((img, i) => <img key={i} src={img} alt={`preview ${i}`} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />)}
            </div>
          )}
          <button type="submit" className="action-btn">Create Wheel Game</button>
        </form>
      </div>
    );
  };

  const MultiChoiceCreator = () => {
    if (gameStarted) {
      if (finished) {
        return (
          <div className="game-section">
            <h2>📝 Multi-Choice Quiz</h2>
            <div style={{ fontSize: '1.2em', fontWeight: '800', color: '#7b4cff', marginBottom: '10px', textAlign: 'center' }}>
              Score: {score} / {questions.length}
            </div>
            <button className="action-btn" onClick={restartMulti}>Play Again</button>
            <button className="secondary-btn" onClick={() => setGameStarted(false)} style={{ marginLeft: '10px' }}>Create New Quiz</button>
          </div>
        );
      }
      const q = questions[current];
      return (
        <div className="game-section">
          <h2>📝 Multi-Choice Quiz</h2>
          <div style={{ fontSize: '1.1em', fontWeight: '700', marginBottom: '12px', color: '#3b1f7a' }}>Q{current + 1}: {q.q}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
            {q.choices.filter(Boolean).map((c, i) => (
              <button
                key={i}
                className="mcq-choice"
                style={{
                  padding: '14px 18px',
                  borderRadius: '12px',
                  fontSize: '1.08em',
                  fontWeight: '600',
                  background: selected === i ? (c === q.a ? '#a0ffb4' : '#ffd6d6') : 'rgba(255,255,255,0.7)',
                  border: '2px solid #e0e7ff',
                  boxShadow: '0 2px 8px #7b4cff11',
                  cursor: showAnswer ? 'not-allowed' : 'pointer',
                  transition: 'background 0.15s, border 0.15s'
                }}
                onClick={() => handleChoice(i)}
                disabled={showAnswer}
              >
                {c}
              </button>
            ))}
          </div>
          {showAnswer && (
            <div style={{ 
              fontSize: '1.08em', 
              fontWeight: '700', 
              marginBottom: '10px', 
              color: q.choices[selected] === q.a ? '#1aaf5d' : '#ff4b4b' 
            }}>
              {q.choices[selected] === q.a ? 'Correct!' : `Wrong! Correct: ${q.a}`}
            </div>
          )}
          <button 
            className="action-btn" 
            onClick={nextQ} 
            disabled={!showAnswer}
          >
            {current + 1 < questions.length ? 'Next' : 'Finish'}
          </button>
        </div>
      );
    }

    return (
      <div className="game-section">
        <h2>📝 Multi-Choice Game Creator</h2>
        <form onSubmit={handleSubmitMulti}>
          {questions.map((q, i) => (
            <div key={i} className="mcq-block" style={{ marginBottom: '15px', padding: '10px', border: '1px solid #e0e7ff', borderRadius: '8px' }}>
              <input
                placeholder={`Question ${i + 1}`}
                value={q.q}
                onChange={e => handleQChange(i, 'q', e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <input
                placeholder="Correct Answer"
                value={q.a}
                onChange={e => handleQChange(i, 'a', e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              {q.choices.map((c, j) => (
                <input
                  key={j}
                  placeholder={`Choice ${j + 1}`}
                  value={c}
                  onChange={e => handleQChange(i, j, e.target.value)}
                  style={{ width: '100%', padding: '8px', marginBottom: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              ))}
            </div>
          ))}
          <button type="button" className="secondary-btn" onClick={addQuestion} style={{ marginBottom: '10px' }}>Add Question</button>
          <button type="submit" className="action-btn">Create Game</button>
        </form>
      </div>
    );
  };

  const TicTacToeCreator = () => {
    if (gameStarted) {
      return (
        <div className="game-section">
          <h2>❌⭕ Tic-Tac-Toe</h2>
          <div className="ttt-players" style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '12px' }}>
            <span style={{ fontWeight: xIsNext && !winner && !draw ? '700' : 'normal', color: xIsNext && !winner && !draw ? '#7b4cff' : 'inherit' }}>{player1} (X)</span>
            <span style={{ fontWeight: !xIsNext && !winner && !draw ? '700' : 'normal', color: !xIsNext && !winner && !draw ? '#a084ff' : 'inherit' }}>{player2} (O)</span>
          </div>
          <div className="ttt-board" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 64px)', gap: '10px', justifyContent: 'center', marginBottom: '18px' }}>
            {board.map((cell, i) => (
              <button
                key={i}
                className="ttt-cell"
                style={{
                  width: '64px',
                  height: '64px',
                  fontSize: '2.2em',
                  fontWeight: '900',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.7)',
                  border: '2px solid #e0e7ff',
                  boxShadow: '0 2px 8px #7b4cff11',
                  cursor: (cell || winner) ? 'not-allowed' : 'pointer',
                  transition: 'background 0.15s, border 0.15s'
                }}
                onClick={() => handleCell(i)}
                disabled={!!cell || !!winner}
              >
                {cell}
              </button>
            ))}
          </div>
          {winner && (
            <div style={{ fontSize: '1.2em', fontWeight: '800', color: '#7b4cff', marginBottom: '10px', textAlign: 'center' }}>
              {(winner === 'X' ? player1 : player2)} wins! 🎉
            </div>
          )}
          {draw && !winner && (
            <div style={{ fontSize: '1.2em', fontWeight: '800', color: '#a084ff', marginBottom: '10px', textAlign: 'center' }}>
              It's a draw!
            </div>
          )}
          <button className="action-btn" onClick={resetGame} style={{ marginRight: '10px' }}>Restart</button>
          <button className="secondary-btn" onClick={() => setGameStarted(false)}>Create New Game</button>
        </div>
      );
    }

    return (
      <div className="game-section">
        <h2>❌⭕ Tic-Tac-Toe Game Creator</h2>
        <form onSubmit={handleSubmitTic}>
          <div className="input-block" style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Player 1 Name</label>
            <input
              value={player1}
              onChange={e => setPlayer1(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div className="input-block" style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Player 2 Name</label>
            <input
              value={player2}
              onChange={e => setPlayer2(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" className="action-btn">Create Game</button>
        </form>
      </div>
    );
  };

  const MemoryMatchCreator = () => {
    const [cards, setCards] = useState([]);
    const [input, setInput] = useState('');
    
    const addCard = () => {
      if (input.trim()) setCards(cs => [...cs, { type: 'word', value: input.trim() }]);
      setInput('');
    };
    
    const handleImages = (e) => {
      const files = Array.from(e.target.files || []);
      const readers = files.map(f => {
        return new Promise(res => {
          const r = new FileReader();
          r.onload = ev => res(ev.target.result);
          r.readAsDataURL(f);
        });
      });
      Promise.all(readers).then(imgs => {
        setCards(cs => [...cs, ...imgs.map(img => ({ type: 'image', value: img }))]);
        setImages(imgs);
      });
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // TODO: Create memory match game logic
      alert('Memory Match game created!');
    };
    
    return (
      <div className="game-section">
        <h2>🃏 Memory Match Creator</h2>
        <p>Add vocab words or upload images for the memory match game.</p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Enter word or vocab"
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            <button type="button" className="action-btn" onClick={addCard}>Add Card</button>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImages}
          />
          {cards.length > 0 && (
            <div className="image-preview" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '10px 0' }}>
              {cards.map((c, i) => 
                c.type === 'image' ? (
                  <img key={i} src={c.value} alt={`card ${i}`} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                ) : (
                  <div key={i} style={{ background: '#f7f8fa', borderRadius: '10px', padding: '10px 18px', fontWeight: '700', fontSize: '1.1em', boxShadow: '0 1px 4px rgba(123,76,255,0.04)', border: '1.5px solid #e0e7ff', display: 'inline-block' }}>
                    {c.value}
                  </div>
                )
              )}
            </div>
          )}
          <button type="submit" className="action-btn">Create Memory Match Game</button>
        </form>
      </div>
    );
  };

  const renderActiveGame = () => {
    switch (activeGame) {
      case 'wheel':
        return <WheelGameCreator />;
      case 'multi':
        return <MultiChoiceCreator />;
      case 'tictactoe':
        return <TicTacToeCreator />;
      case 'memory':
        return <MemoryMatchCreator />;
      default:
        return <WheelGameCreator />;
    }
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
        {games.map(game => (
          <button
            key={game.id}
            className={`menu-btn ${activeGame === game.id ? 'selected' : ''}`}
            onClick={() => setActiveGame(game.id)}
          >
            {game.icon} {game.name}
          </button>
        ))}
      </div>

      <div className="game-container">
        {renderActiveGame()}
      </div>
    </div>
  );
};

export default Games;