import React, { useState } from 'react';
import './Home.css';

const Home = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
    grade: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log('Signup data:', signupData);
    setShowSignupModal(false);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login data:', loginData);
    // For now, redirect to teachers page
    window.location.href = '/teachers';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="home-page">
      <div className="wrap">
        <header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              id="mobileNavBtn" 
              className="hamburger" 
              aria-label="Open menu" 
              aria-expanded={mobileMenuOpen}
              aria-controls="miniMenu"
              style={{ display: 'none' }}
              onClick={toggleMobileMenu}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
                <rect width="18" height="2" rx="1" fill="currentColor"/>
                <rect y="6" width="18" height="2" rx="1" fill="currentColor"/>
                <rect y="12" width="18" height="2" rx="1" fill="currentColor"/>
              </svg>
            </button>
            <div className="brand">
              <div className="logo" aria-hidden="true">
                {/* Inline SVG mark: stylized fairy badge */}
                <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lil fairy logo">
                  <defs>
                    <linearGradient id="lgMark" x1="0" x2="1">
                      <stop offset="0" stop-color="#9b6bff" />
                      <stop offset="1" stop-color="#7dd7ff" />
                    </linearGradient>
                    <filter id="f" x="-30%" y="-30%" width="160%" height="160%">
                      <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#6b46ff" floodOpacity="0.12" />
                    </filter>
                  </defs>
                  <g filter="url(#f)">
                    <circle cx="32" cy="32" r="28" fill="url(#lgMark)" />
                  </g>
                  <g transform="translate(12,12)">
                    <path d="M8 18c4-6 18-6 20 0" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95"/>
                    <g transform="translate(20,6) rotate(-18)">
                      <ellipse rx="6" ry="10" fill="#fff" opacity="0.92"/>
                    </g>
                    <g transform="translate(6,6) rotate(18)">
                      <ellipse rx="4" ry="8" fill="#fff" opacity="0.9"/>
                    </g>
                    <circle cx="8" cy="10" r="2" fill="#fff"/>
                  </g>
                  <g>
                    <circle cx="50" cy="14" r="3" fill="#ffd36b" opacity="0.95"/>
                  </g>
                </svg>
              </div>
              <div>
                <div className="brand-text">Lil fairy award</div>
                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>Celebrate learning with magic</div>
              </div>
            </div>
          </div>
          <nav id="mainNav">
            <a className="nav-link" href="#features">Features</a>
            <a className="nav-link" href="#how">How it works</a>
            <a className="nav-link" href="#about">About</a>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button 
                id="openSignup" 
                className="nav-cta" 
                style={{ background: 'linear-gradient(135deg,#7b46ff,#b86bff)', border: 0 }}
                onClick={() => setShowSignupModal(true)}
              >
                Sign Up
              </button>
              <button 
                id="openLogin" 
                className="nav-btn" 
                style={{ border: '1px solid rgba(11,18,32,0.06)' }}
                onClick={() => setShowLoginModal(true)}
              >
                Log In
              </button>
            </div>
          </nav>
          <div id="miniMenu" className={`mini-menu ${mobileMenuOpen ? 'open' : ''}`} aria-hidden={!mobileMenuOpen}>
            <a className="mini-link" href="#features">Features</a>
            <a className="mini-link" href="#how">How it works</a>
            <a className="mini-link" href="#about">About</a>
            <div className="mini-actions">
              <button 
                id="miniSignup" 
                className="nav-cta" 
                style={{ background: 'linear-gradient(135deg,#7b46ff,#b86bff)', border: 0 }}
                onClick={() => {
                  setShowSignupModal(true);
                  setMobileMenuOpen(false);
                }}
              >
                Sign Up
              </button>
              <button 
                id="miniLogin" 
                className="nav-btn" 
                style={{ border: '1px solid rgba(11,18,32,0.06)' }}
                onClick={() => {
                  setShowLoginModal(true);
                  setMobileMenuOpen(false);
                }}
              >
                Log In
              </button>
            </div>
          </div>
        </header>

        <section className="hero">
          <div className="hero-left">
            <h1 className="reveal delay-1">Celebrate learning — tiny wins, big smiles.</h1>
            <div className="lead reveal delay-2">
              Lil Fairy helps teachers reward progress with colorful badges, playful celebrations, and printable reports — designed for joyful classrooms.
            </div>
            <div className="cta-row">
              <button 
                id="btnGetStarted" 
                type="button" 
                className="btn-primary reveal delay-3"
                onClick={() => setShowSignupModal(true)}
              >
                Get Started — it's free
              </button>
              <button 
                className="btn-ghost" 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore features
              </button>
            </div>

            <div style={{ marginTop: '22px', display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="feature" style={{ display: 'flex', gap: '12px', alignItems: 'center', minWidth: '220px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg,#ffdede,#fff6e6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                  🏅
                </div>
                <div>
                  <div style={{ fontWeight: '800' }}>For teachers</div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px' }}>Quick setup, class management, and reports</div>
                </div>
              </div>

              <div className="feature" style={{ display: 'flex', gap: '12px', alignItems: 'center', minWidth: '220px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'linear-gradient(135deg,#e6f8ff,#eaf8ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                  ✨
                </div>
                <div>
                  <div style={{ fontWeight: '800' }}>For students</div>
                  <div style={{ color: 'var(--muted)', fontSize: '13px' }}>Playful animations and stickers that encourage growth</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-illustration reveal delay-4" aria-hidden="true">
              {/* Decorative fairy scene: stylized vector */}
              <svg width="460" height="340" viewBox="0 0 460 340" xmlns="http://www.w3.org/2000/svg" aria-label="Floating cartoon fairy with magical trail" role="img">
                <defs>
                  {/* Gradients */}
                  <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffd1e6"/>
                    <stop offset="100%" stopColor="#ffb3d9"/>
                  </linearGradient>
                  <linearGradient id="dressGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff8ce2"/>
                    <stop offset="100%" stopColor="#ff60c3"/>
                  </linearGradient>
                  <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a0eaff" stopOpacity="0.8"/>
                    <stop offset="1%" stopColor="#ffd36b" stopOpacity="0.6"/>
                  </linearGradient>
                  <radialGradient id="sparkleGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="1"/>
                    <stop offset="100%" stopColor="#ffd36b" stopOpacity="0"/>
                  </radialGradient>
                </defs>

                {/* Floating fairy group */}
                <g id="fairy" transform="translate(230,200)">
                  <animateTransform attributeName="transform" type="translate" values="230,200;230,192;230,200" dur="2.5s" repeatCount="indefinite"/>

                  {/* Wings */}
                  <g>
                    <ellipse cx="-28" cy="-20" rx="40" ry="60" fill="url(#wingGrad)">
                      <animateTransform attributeName="transform" type="rotate" values="-15; -5; -15" dur="1.5s" repeatCount="indefinite" additive="sum" origin="-28 -20"/>
                    </ellipse>
                    <ellipse cx="28" cy="-20" rx="40" ry="60" fill="url(#wingGrad)">
                      <animateTransform attributeName="transform" type="rotate" values="15; 5; 15" dur="1.5s" repeatCount="indefinite" additive="sum" origin="28 -20"/>
                    </ellipse>
                  </g>

                  {/* Body & dress */}
                  <ellipse cx="0" cy="0" rx="16" ry="36" fill="url(#bodyGrad)"/>
                  <path d="M-16,10 Q0,80 16,10 Z" fill="url(#dressGrad)"/>

                  {/* Head */}
                  <circle cx="0" cy="-44" r="14" fill="#ffd1b3"/>
                  <circle cx="-5" cy="-46" r="2" fill="#2d3142"/>
                  <circle cx="5" cy="-46" r="2" fill="#2d3142"/>
                  <path d="M-4,-40 Q0,-38 4,-40" stroke="#2d3142" strokeWidth="1" fill="transparent" strokeLinecap="round"/>

                  {/* Hair */}
                  <path d="M-12,-50 Q0,-64 12,-50" fill="#ff9ee6"/>
                  <path d="M-10,-54 Q0,-70 10,-54" fill="#ffb3d9" opacity="0.6"/>

                  {/* Wand */}
                  <g transform="translate(0,-10)">
                    <rect x="12" y="-18" width="4" height="40" rx="2" fill="#ffd36b"/>
                    <circle cx="14" cy="-20" r="6" fill="url(#sparkleGrad)">
                      <animateTransform attributeName="transform" type="scale" values="1;1.3;1" dur="1s" repeatCount="indefinite"/>
                    </circle>
                  </g>
                </g>

                {/* Magical trail */}
                <g id="trail">
                  {/* Generate 6 trail sparkles */}
                  <circle cx="230" cy="200" r="3" fill="url(#sparkleGrad)">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path="M0,0 C-10,-5 -15,-30 -20,-50"/>
                    <animate attributeName="opacity" values="1;0" dur="2.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="230" cy="200" r="2.5" fill="url(#sparkleGrad)">
                    <animateMotion dur="2.7s" repeatCount="indefinite" path="M0,0 C10,-5 15,-30 20,-50"/>
                    <animate attributeName="opacity" values="1;0" dur="2.7s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="230" cy="200" r="2" fill="url(#sparkleGrad)">
                    <animateMotion dur="2.3s" repeatCount="indefinite" path="M0,0 C5,-10 10,-40 15,-60"/>
                    <animate attributeName="opacity" values="1;0" dur="2.3s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx="230" cy="200" r="2.5" fill="url(#sparkleGrad)">
                    <animateMotion dur="2.6s" repeatCount="indefinite" path="M0,0 C-5,-10 -10,-40 -15,-60"/>
                    <animate attributeName="opacity" values="1;0" dur="2.6s" repeatCount="indefinite"/>
                  </circle>
                </g>
              </svg>
            </div>
          </div>
        </section>

        <section className="testimonials" aria-label="Teacher testimonials">
          <h3 style={{ margin: '0 0 12px 0' }}>What teachers say</h3>
          <div className="test-cards">
            <div className="test-card">
              <div style={{ fontWeight: '800' }}>"My students light up when they earn a badge — it's a game changer."</div>
              <p>— Maria P., 2nd Grade Teacher</p>
            </div>
            <div className="test-card">
              <div style={{ fontWeight: '800' }}>"Setup was quick and the printable reports are beautiful for parent nights."</div>
              <p>— Keisha R., Elementary Coordinator</p>
            </div>
            <div className="test-card">
              <div style={{ fontWeight: '800' }}>"The small celebrations made my classroom more joyful and focused."</div>
              <p>— James L., 5th Grade</p>
            </div>
          </div>

          <div className="trust-logos" aria-hidden="true">
            {/* Simple inline trust marks (SVG placeholders) */}
            <svg width="84" height="28" viewBox="0 0 84 28" xmlns="http://www.w3.org/2000/svg">
              <rect rx="6" width="84" height="28" fill="#fff" stroke="#eee"/>
              <text x="12" y="18" fontSize="12" fill="#6b46ff" fontWeight="700">Trusted by teachers</text>
            </svg>
            <svg width="84" height="28" viewBox="0 0 84 28" xmlns="http://www.w3.org/2000/svg">
              <rect rx="6" width="84" height="28" fill="#fff" stroke="#eee"/>
              <text x="12" y="18" fontSize="12" fill="#2563eb" fontWeight="700">Used in schools</text>
            </svg>
            <svg width="84" height="28" viewBox="0 0 84 28" xmlns="http://www.w3.org/2000/svg">
              <rect rx="6" width="84" height="28" fill="#fff" stroke="#eee"/>
              <text x="12" y="18" fontSize="12" fill="#f59e0b" fontWeight="700">Parent-approved</text>
            </svg>
          </div>
        </section>

        <section id="how" style={{ marginTop: '28px' }}>
          <h3 style={{ margin: '0 0 12px 0' }}>How it works</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '14px' }}>
            <div className="feature">
              <div style={{ fontSize: '22px' }}>1 — Create a class</div>
              <h4>Set up in minutes</h4>
              <p>Add students, pick badges, and organize groups — then invite co-teachers if needed.</p>
            </div>
            <div className="feature">
              <div style={{ fontSize: '22px' }}>2 — Award & celebrate</div>
              <h4>Quick praise, big impact</h4>
              <p>Tap to award a badge; students see playful animations and collect recognitions over time.</p>
            </div>
            <div className="feature">
              <div style={{ fontSize: '22px' }}>3 — Print & share</div>
              <h4>Reports for parents</h4>
              <p>Generate colorful printable summaries and export student progress for conferences.</p>
            </div>
          </div>
        </section>

        <section id="features" style={{ marginTop: '26px' }}>
          <h3 style={{ margin: '0 0 12px 0' }}>Features</h3>
          <div className="features">
            <div className="feature">
              <div style={{ fontSize: '22px' }}>Classrooms & Badges</div>
              <h4>Simple class setup</h4>
              <p>Organize students, create tasks and award badges quickly from the teacher portal.</p>
            </div>
            <div className="feature">
              <div style={{ fontSize: '22px' }}>Playful rewards</div>
              <h4>Stickers & celebrations</h4>
              <p>Every award is a small celebration — animations and character reactions make wins feel special.</p>
            </div>
            <div className="feature">
              <div style={{ fontSize: '22px' }}>Reports & prints</div>
              <h4>Printable summaries</h4>
              <p>Download colorful reports for parents and classroom notes with one click.</p>
            </div>
          </div>
        </section>

        <footer>
          <div>© <strong>Lil fairy award</strong> — made with care for teachers and learners.</div>
          <div style={{ marginTop: '8px', color: 'var(--muted)' }}>
            Not affiliated with any other product — an original, friendly classroom rewards experience.
          </div>
        </footer>
      </div>

      {/* Auth modals */}
      {showSignupModal && (
        <div id="signupBackdrop" className="auth-backdrop" style={{ display: 'flex' }}>
          <div className="auth-modal">
            <button 
              className="auth-close-x" 
              aria-label="Close" 
              onClick={() => setShowSignupModal(false)}
            >
              ✕
            </button>
            <h3>Create a teacher account</h3>
            <p className="sub">Create an account to access the Teacher Portal.</p>
            <form onSubmit={handleSignupSubmit}>
              <div className="auth-row">
                <input 
                  id="suName" 
                  placeholder="Full name" 
                  value={signupData.name}
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                />
              </div>
              <div className="auth-row">
                <input 
                  id="suEmail" 
                  placeholder="Email" 
                  type="email"
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                />
              </div>
              <div className="auth-row">
                <input 
                  id="suUsername" 
                  placeholder="Username"
                  value={signupData.username}
                  onChange={(e) => setSignupData({...signupData, username: e.target.value})}
                />
              </div>
              <div className="auth-row">
                <input 
                  id="suPassword" 
                  placeholder="Password" 
                  type="password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                />
              </div>
              <div className="auth-row">
                <input 
                  id="suRepeat" 
                  placeholder="Repeat password" 
                  type="password"
                  value={signupData.repeatPassword}
                  onChange={(e) => setSignupData({...signupData, repeatPassword: e.target.value})}
                />
              </div>
              <div className="auth-row">
                <select 
                  id="suGrade"
                  value={signupData.grade}
                  onChange={(e) => setSignupData({...signupData, grade: e.target.value})}
                >
                  <option value="">Select grade (optional)</option>
                  <option>Kindergarten</option>
                  <option>1st</option>
                  <option>2nd</option>
                  <option>3rd</option>
                  <option>4th</option>
                  <option>5th</option>
                  <option>6th</option>
                  <option>7th</option>
                  <option>8th</option>
                  <option>9th</option>
                  <option>10th</option>
                  <option>11th</option>
                  <option>12th</option>
                </select>
              </div>
              <div className="auth-actions">
                <button 
                  id="suCancel" 
                  className="nav-btn" 
                  type="button"
                  onClick={() => setShowSignupModal(false)}
                >
                  Cancel
                </button>
                <button 
                  id="suSubmit" 
                  className="nav-cta" 
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div id="loginBackdrop" className="auth-backdrop" style={{ display: 'flex' }}>
          <div className="auth-modal">
            <button 
              className="auth-close-x" 
              aria-label="Close" 
              onClick={() => setShowLoginModal(false)}
            >
              ✕
            </button>
            <h3>Log in</h3>
            <p className="sub">Log in with your email and password.</p>
            <form onSubmit={handleLoginSubmit}>
              <div className="auth-row">
                <input 
                  id="liEmail" 
                  placeholder="Email" 
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                />
              </div>
              <div className="auth-row">
                <input 
                  id="liPassword" 
                  placeholder="Password" 
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', color: 'var(--muted)' }}>
                  <input 
                    id="liRemember" 
                    type="checkbox" 
                    style={{ marginRight: '8px' }}
                    checked={loginData.remember}
                    onChange={(e) => setLoginData({...loginData, remember: e.target.checked})}
                  />
                  Remember me on this device
                </label>
              </div>
              <div id="liError" style={{ color: '#a33', marginTop: '6px', minHeight: '18px' }}></div>
              <div className="auth-actions">
                <button 
                  id="liCancel" 
                  className="nav-btn" 
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                >
                  Cancel
                </button>
                <button 
                  id="liSubmit" 
                  className="nav-cta" 
                  type="submit"
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;