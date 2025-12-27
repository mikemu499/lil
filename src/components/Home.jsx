import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
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
    // For now, redirect to teachers page using React Router
    navigate('/teachers');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Celebrate learning — tiny wins, big smiles.</h1>
              <p className="hero-subtitle">
                Lil Fairy helps teachers reward progress with colorful badges, playful celebrations, and printable reports — designed for joyful classrooms.
              </p>
              <div className="hero-cta">
                <button 
                  className="btn btn-primary btn-large"
                  onClick={() => setShowSignupModal(true)}
                >
                  Get Started — it's free
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore features
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-illustration" aria-hidden="true">
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
          </div>
        </div>

        <section className="features-section" id="features">
          <div className="section-header">
            <h2 className="section-title">For Teachers & Students</h2>
            <p className="section-subtitle">Designed with educators and learners in mind</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Easy Badge Creation</h3>
              <p>Create custom badges in minutes and reward student achievements with just a click.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Monitor student progress with detailed reports and visual dashboards.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎮</div>
              <h3>Engaging Games</h3>
              <p>Interactive games that make learning fun and motivate students to achieve more.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🖨️</div>
              <h3>Printable Rewards</h3>
              <p>Generate beautiful certificates and printable rewards for special achievements.</p>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="section-header">
            <h2 className="section-title">What Teachers Say</h2>
            <p className="section-subtitle">Real feedback from real educators</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"My students light up when they earn a badge — it's a game changer."</p>
              </div>
              <div className="testimonial-author">
                <span className="author-name">Maria P.</span>
                <span className="author-title">2nd Grade Teacher</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"Setup was quick and the printable reports are beautiful for parent nights."</p>
              </div>
              <div className="testimonial-author">
                <span className="author-name">Keisha R.</span>
                <span className="author-title">Elementary Coordinator</span>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <p>"The small celebrations made my classroom more joyful and focused."</p>
              </div>
              <div className="testimonial-author">
                <span className="author-name">James L.</span>
                <span className="author-title">5th Grade Teacher</span>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to transform your classroom?</h2>
            <p className="cta-subtitle">Join thousands of teachers already using Lil Fairy Award</p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => setShowSignupModal(true)}
            >
              Start Free Trial
            </button>
          </div>
        </section>
      </div>

      {/* Auth Modals */}
      {showSignupModal && (
        <div className="auth-backdrop" onClick={() => setShowSignupModal(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="auth-close-x" onClick={() => setShowSignupModal(false)}>×</button>
            <h3>Create Account</h3>
            <p className="sub">Join Lil Fairy Award to start rewarding your students</p>
            <form onSubmit={handleSignupSubmit}>
              <div className="auth-row">
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={signupData.name}
                  onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                  required
                />
              </div>
              <div className="auth-row">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={signupData.email}
                  onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                  required
                />
              </div>
              <div className="auth-row">
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={signupData.username}
                  onChange={(e) => setSignupData({...signupData, username: e.target.value})}
                  required
                />
              </div>
              <div className="auth-row">
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={signupData.password}
                  onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                  required
                />
              </div>
              <div className="auth-row">
                <input 
                  type="password" 
                  placeholder="Repeat Password" 
                  value={signupData.repeatPassword}
                  onChange={(e) => setSignupData({...signupData, repeatPassword: e.target.value})}
                  required
                />
              </div>
              <div className="auth-row">
                <select 
                  value={signupData.grade}
                  onChange={(e) => setSignupData({...signupData, grade: e.target.value})}
                  required
                >
                  <option value="">Select Grade Level</option>
                  <option value="k">Kindergarten</option>
                  <option value="1">1st Grade</option>
                  <option value="2">2nd Grade</option>
                  <option value="3">3rd Grade</option>
                  <option value="4">4th Grade</option>
                  <option value="5">5th Grade</option>
                  <option value="6">6th Grade</option>
                  <option value="7">7th Grade</option>
                  <option value="8">8th Grade</option>
                </select>
              </div>
              <div className="auth-actions">
                <button type="submit" className="nav-cta">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="auth-backdrop" onClick={() => setShowLoginModal(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <button className="auth-close-x" onClick={() => setShowLoginModal(false)}>×</button>
            <h3>Log In</h3>
            <p className="sub">Welcome back to Lil Fairy Award</p>
            <form onSubmit={handleLoginSubmit}>
              <div className="auth-row">
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={loginData.email}
                  onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                  required
                />
              </div>
              <div className="auth-row">
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  required
                />
              </div>
              <div className="auth-row">
                <label>
                  <input 
                    type="checkbox" 
                    checked={loginData.remember}
                    onChange={(e) => setLoginData({...loginData, remember: e.target.checked})}
                  />
                  Remember me
                </label>
              </div>
              <div className="auth-actions">
                <button type="submit" className="nav-cta">Log In</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;