import React, { useState, useEffect } from 'react';
import './Teachers.css';

const Teachers = () => {
  const [currentClass, setCurrentClass] = useState(null);
  const [classList, setClassList] = useState([]);
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [user, setUser] = useState(null);

  // Mock user data for now
  useEffect(() => {
    setUser({
      name: 'Teacher Name',
      email: 'teacher@example.com',
      avatar: 'https://via.placeholder.com/150'
    });
  }, []);

  const handleCreateClass = (e) => {
    e.preventDefault();
    // Handle class creation logic here
    setShowCreateClassModal(false);
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    // Handle add student logic here
    setShowAddStudentModal(false);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    // Handle add task logic here
    setShowAddTaskModal(false);
  };

  const handleClassSelect = (cls) => {
    setCurrentClass(cls);
  };

  return (
    <div className="teachers-page">
      {/* Topline */}
      <div className="app-topline force-top-topline"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '12px 24px 0 24px',
          boxSizing: 'border-box',
          zIndex: 2000,
          position: 'relative',
          background: 'transparent'
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: 1, minWidth: 0 }}>
          <button id="mobileMenuBtn" aria-label="Open menu" title="Menu"
            style={{ display: 'none', border: 0, background: 'transparent', fontSize: '20px', padding: '6px' }}>
            ☰
          </button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
            <div id="currentMeta"
              style={{
                color: '#3b1f7a',
                fontWeight: '800',
                fontFamily: 'Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif',
                background: 'rgba(123,76,255,0.08)',
                padding: '6px 10px',
                borderRadius: '8px',
                display: 'inline-block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '56ch',
                marginRight: '18px'
              }}>
              {currentClass ? currentClass.name : 'Select a class'}
            </div>
            <div className="counts" id="classCounts" style={{ color: 'var(--muted)', fontSize: '13px', marginRight: '18px' }}>
              {currentClass ? `${currentClass.students?.length || 0} students · ${currentClass.tasks?.length || 0} tasks` : 'No class selected'}
            </div>
          </div>
        </div>
        <a href="/reports" id="btnReportsTopline" className="action-btn"
          style={{ background: 'linear-gradient(135deg,#88dd88,#66cc66)', transition: 'background 0.18s' }}>
          📊 <span className="btn-label">Reports</span>
        </a>
        <div id="accountMenu" style={{ position: 'relative', marginLeft: '18px' }}>
          <button id="accountBtn" className="small-btn" aria-haspopup="true" aria-expanded={showAccountMenu}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px', borderRadius: '999px' }}
            onClick={() => setShowAccountMenu(!showAccountMenu)}>
            <img id="accountAvatar" src={user?.avatar || 'https://via.placeholder.com/150'} alt="Account"
              style={{ width: '28px', height: '28px', borderRadius: '999px', objectFit: 'cover', background: '#fff' }} />
            <span style={{ fontWeight: '800' }}>▾</span>
          </button>
          {showAccountMenu && (
            <div id="accountDropdown" style={{ 
              position: 'absolute', 
              right: 0, 
              top: '42px', 
              display: 'block',
              minWidth: '270px', 
              background: 'rgba(255,255,255,0.22)', 
              borderRadius: '22px', 
              boxShadow: '0 12px 36px 0 rgba(20,30,80,0.16), 0 1.5px 8px 0 rgba(123,76,255,0.10)', 
              padding: '18px 18px 12px 18px', 
              zIndex: 1400, 
              backdropFilter: 'blur(18px) saturate(1.4)', 
              border: '1.5px solid rgba(180,180,255,0.18)' 
            }}>
              <div id="accountOverview" style={{ 
                padding: '0 0 18px 0', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '18px', 
                borderBottom: '1.5px solid rgba(200,200,255,0.13)', 
                marginBottom: '16px' 
              }}>
                <img id="accountAvatarDropdown" src={user?.avatar || 'https://via.placeholder.com/150'} alt="Account" 
                  style={{ 
                    width: '54px', 
                    height: '54px', 
                    borderRadius: '50%', 
                    objectFit: 'cover', 
                    background: 'rgba(246,250,255,0.7)', 
                    border: '2.5px solid #e0f3ff', 
                    boxShadow: '0 2px 12px rgba(123,76,255,0.10)' 
                  }} />
                <div style={{ minWidth: 0 }}>
                  <div id="acctName" style={{ 
                    fontWeight: '900', 
                    fontSize: '1.18em', 
                    color: '#2a1a4d', 
                    letterSpacing: '0.01em', 
                    marginBottom: '2px', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                  }}>
                    {user?.name || 'User Name'}
                  </div>
                  <div id="acctEmail" style={{ 
                    color: '#6a6a8a', 
                    fontSize: '13.5px', 
                    fontWeight: '600', 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis' 
                  }}>
                    {user?.email || 'user@example.com'}
                  </div>
                </div>
              </div>
              <div className="account-actions" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px', 
                marginTop: '10px' 
              }}>
                <a href="/account" id="profileBtn" className="account-action-link" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '1.08em',
                  fontWeight: '700',
                  color: '#3b1f7a',
                  background: 'rgba(255,255,255,0.38)',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  textDecoration: 'none',
                  transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
                  boxShadow: '0 1.5px 8px 0 rgba(123,76,255,0.06)'
                }}>
                  <span>👤</span> Profile
                </a>
                <a href="/help" id="helpBtn" className="account-action-link" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '1.08em',
                  fontWeight: '700',
                  color: '#3b1f7a',
                  background: 'rgba(255,255,255,0.38)',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  textDecoration: 'none',
                  transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
                  boxShadow: '0 1.5px 8px 0 rgba(123,76,255,0.06)'
                }}>
                  <span>❓</span> Help
                </a>
                <button id="signOutBtn" className="account-action-link logout" type="button" style={{
                  color: '#fff',
                  background: 'linear-gradient(135deg, #ff6b6b 60%, #ff4b4b 100%)',
                  fontWeight: '900',
                  boxShadow: '0 2px 12px 0 rgba(255,76,76,0.13)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '1.08em',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  textDecoration: 'none',
                  transition: 'background 0.18s, color 0.18s, box-shadow 0.18s',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  // Handle sign out logic
                  window.location.href = '/';
                }}>
                  <span>🚪</span> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="app">
        <aside id="sidebar" className="sidebar" style={{ overflow: 'auto', height: '100vh', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <div className="brand">
              <div className="logo">TD</div>
              <div className="brand-text">Teacher</div>
            </div>
            <div>
              <button id="collapseBtn" className="toggle-btn" title="Toggle panel">☰</button>
            </div>
          </div>

          <div className="side-actions">
            <div id="classesHeader" style={{ fontSize: '14px', color: 'var(--muted)', fontWeight: '700', cursor: 'pointer' }}>
              Your Classes
            </div>
            <div id="classList" className="class-list" role="list" aria-hidden="true" style={{ display: 'none' }}>
              {classList.map((cls, index) => (
                <div 
                  key={index} 
                  className={`class-item ${currentClass?.id === cls.id ? 'active' : ''}`}
                  onClick={() => handleClassSelect(cls)}
                  style={{
                    padding: '10px',
                    margin: '5px 0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: currentClass?.id === cls.id ? 'rgba(123,76,255,0.1)' : 'transparent',
                    color: currentClass?.id === cls.id ? '#7b4cff' : 'inherit'
                  }}
                >
                  {cls.name}
                </div>
              ))}
            </div>
            <div className="new-class" style={{ margin: '18px 0 0 0' }}>
              <button id="openCreateClassBtn" className="action-btn" 
                onClick={() => setShowCreateClassModal(true)}>
                <span className="btn-icon">＋</span>
                <span className="btn-label">Add New class</span>
              </button>
            </div>
            <div className="side-actions-buttons" style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button id="btnAddStudent" className="action-btn" 
                onClick={() => setShowAddStudentModal(true)}>
                ➕ <span className="btn-label">Add / Edit students</span>
              </button>
              <button id="btnAddTasks" className="action-btn"
                style={{ background: 'linear-gradient(135deg,#7dd7ff,#5bbfff)', color: '#00334a' }}
                onClick={() => setShowAddTaskModal(true)}>
                🛠 <span className="btn-label">Add Tasks</span>
              </button>
              <button id="btnReports" className="action-btn" 
                style={{ background: 'linear-gradient(135deg,#88dd88,#66cc66)' }}
                onClick={() => window.location.href = '/reports'}>
                📊 <span className="btn-label">Generate Reports</span>
              </button>
              <button id="btnRemoveClass" className="small-btn"
                style={{ background: 'linear-gradient(135deg,#ff6b6b,#ff4b4b)', color: '#fff' }}>
                🗑 <span className="btn-label">Remove Class</span>
              </button>
              <div id="optionsWrap" style={{ position: 'relative' }}>
                <button id="optionsToggleBtn" className="small-btn" aria-expanded="false" title="Options">
                  Options
                </button>
                <div id="optionsMenu"
                  style={{ 
                    position: 'absolute', 
                    left: 0, 
                    top: '40px', 
                    minWidth: '160px', 
                    background: '#fff', 
                    borderRadius: '10px', 
                    boxShadow: '0 12px 36px rgba(20,30,80,0.08)', 
                    padding: '8px', 
                    display: 'none', 
                    zIndex: 60 
                  }}>
                  <button id="archiveClassBtn" className="small-btn"
                    style={{ width: '100%', marginBottom: '8px', background: 'linear-gradient(135deg,#ffb86b,#ff9a44)', color: '#3a1f00' }}>
                    Archive
                  </button>
                  <button id="deleteClassBtn" className="small-btn"
                    style={{ width: '100%', background: 'linear-gradient(135deg,#ff6b6b,#ff4b4b)' }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
            
            {/* Games section */}
            <div className="games-section" style={{ marginTop: '36px', paddingTop: '18px', borderTop: '2px solid #ecebfa' }}>
              <div style={{ fontSize: '14px', color: '#7b4cff', fontWeight: '900', marginBottom: '10px', letterSpacing: '0.01em' }}>
                Games
              </div>
              <button id="btnGames" className="action-btn" 
                style={{ 
                  background: 'linear-gradient(135deg,#ffe066,#ffb347)', 
                  color: '#7b4c00', 
                  fontWeight: '800', 
                  boxShadow: '0 2px 12px rgba(255,176,71,0.10)' 
                }}
                onClick={() => window.location.href = '/games'}>
                🎮 <span className="btn-label">Play / Create Games</span>
              </button>
            </div>
          </div>

          <div className="sidebar-footer">
            Tip: Click a class to open its page
          </div>
        </aside>

        <main className="main">
          {currentClass ? (
            <section id="classArea" style={{ display: 'block' }}>
              <div id="childList" className="child-list" style={{ marginTop: '18px', display: 'block' }}>
                <h2>{currentClass.name}</h2>
                <p>Students: {currentClass.students?.length || 0}</p>
                <p>Tasks: {currentClass.tasks?.length || 0}</p>
              </div>
            </section>
          ) : (
            <section id="welcome" className="grid">
              <div className="card">
                <h3>Welcome</h3>
                <p>Select a class from the left to view or manage it.</p>
              </div>
              <div className="card">
                <h3>Create a class</h3>
                <p>Use the left panel to add a new class quickly.</p>
              </div>
              <div className="card">
                <h3>Modern UI</h3>
                <p>Large central actions will appear when a class is open.</p>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Create Class Modal */}
      {showCreateClassModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Create New Class</h3>
            <form onSubmit={handleCreateClass}>
              <input type="text" placeholder="Class name" required />
              <input type="text" placeholder="Subject (optional)" />
              <div className="modal-actions">
              <button type="button" onClick={() => setShowCreateClassModal(false)}>Cancel</button>
              <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddStudentModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add Students</h3>
            <form onSubmit={handleAddStudent}>
              <input type="text" placeholder="Student name" required />
              <input type="text" placeholder="Additional details (optional)" />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddStudentModal(false)}>Cancel</button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add Task</h3>
            <form onSubmit={handleAddTask}>
              <input type="text" placeholder="Task name" required />
              <input type="text" placeholder="Description (optional)" />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddTaskModal(false)}>Cancel</button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;