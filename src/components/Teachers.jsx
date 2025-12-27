import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Teachers.css';

const Teachers = () => {
  const navigate = useNavigate();
  const [currentClass, setCurrentClass] = useState(null);
  const [classList, setClassList] = useState([]);
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [activeTab, setActiveTab] = useState('students'); // students, tasks
  const [showTaskGiveModal, setShowTaskGiveModal] = useState(false);
  const [selectedTaskForGive, setSelectedTaskForGive] = useState(null);
  const [selectedStudentForTask, setSelectedStudentForTask] = useState('');
  const [showClassTasksEditor, setShowClassTasksEditor] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [selectedStudentForReport, setSelectedStudentForReport] = useState('');
  const [reportFromDate, setReportFromDate] = useState('');
  const [reportToDate, setReportToDate] = useState('');
  const [showStudentManager, setShowStudentManager] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [avatarType, setAvatarType] = useState('emoji');
  const [avatarEmoji, setAvatarEmoji] = useState('🦄');
  const [avatarColor, setAvatarColor] = useState('#fff2fb');
  const [selectedGender, setSelectedGender] = useState('other');
  const [doorTheme, setDoorTheme] = useState('#ffd1f0');
  const [previewAvatar, setPreviewAvatar] = useState('');
  const [filePreview, setFilePreview] = useState('');
  const [file, setFile] = useState(null);

  // Refs
  const fileInputRef = useRef(null);

  // Mock user data for now
  useEffect(() => {
    setUser({
      name: 'Teacher Name',
      email: 'teacher@example.com',
      avatar: 'https://via.placeholder.com/150'
    });
  }, []);

  // Load class list from localStorage
  useEffect(() => {
    const savedClasses = JSON.parse(localStorage.getItem('fairy_classes') || '[]');
    setClassList(savedClasses);
  }, []);

  // Load current class data when selected
  useEffect(() => {
    if (currentClass) {
      const savedClassData = JSON.parse(localStorage.getItem(`fairy_classroom_${currentClass.id}`) || '{}');
      setStudents(savedClassData.students || []);
      setTasks(savedClassData.tasks || []);
    }
  }, [currentClass]);

  // Handle class creation
  const handleCreateClass = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const className = formData.get('className');
    const subject = formData.get('subject');
    
    const newClass = {
      id: `class-${Date.now()}`,
      name: className,
      subject: subject || '',
      students: 0,
      tasks: 0
    };
    
    const updatedClasses = [...classList, newClass];
    setClassList(updatedClasses);
    localStorage.setItem('fairy_classes', JSON.stringify(updatedClasses));
    setShowCreateClassModal(false);
    setCurrentClass(newClass);
  };

  // Handle add student
  const handleAddStudent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const details = formData.get('details');
    
    const newStudent = {
      id: `student-${Date.now()}`,
      name: name,
      gender: selectedGender,
      doorTheme: doorTheme,
      photo: previewAvatar || filePreview || null,
      total: 0,
      history: []
    };
    
    const updatedStudents = [...students, newStudent];
    setStudents(updatedStudents);
    
    // Update class data in localStorage
    const classData = {
      __classroomName: currentClass.name,
      students: updatedStudents,
      tasks: tasks
    };
    localStorage.setItem(`fairy_classroom_${currentClass.id}`, JSON.stringify(classData));
    
    setShowAddStudentModal(false);
    setPreviewAvatar('');
    setFilePreview('');
    setFile(null);
  };

  // Handle add task
  const handleAddTask = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const label = formData.get('label');
    const description = formData.get('description');
    const points = parseInt(formData.get('points')) || 0;
    const category = formData.get('category') || 'positive';
    
    const taskPoints = category === 'needs' ? -Math.abs(points) : Math.abs(points);
    
    const newTask = {
      id: `task-${Date.now()}`,
      label: label,
      points: taskPoints,
      description: description || ''
    };
    
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    
    // Update class data in localStorage
    const classData = {
      __classroomName: currentClass.name,
      students: students,
      tasks: updatedTasks
    };
    localStorage.setItem(`fairy_classroom_${currentClass.id}`, JSON.stringify(classData));
    
    setShowAddTaskModal(false);
  };

  // Handle class selection
  const handleClassSelect = (cls) => {
    setCurrentClass(cls);
  };

  // Handle student deletion
  const handleDeleteStudent = (studentId) => {
    const updatedStudents = students.filter(s => s.id !== studentId);
    setStudents(updatedStudents);
    
    // Update class data in localStorage
    const classData = {
      __classroomName: currentClass.name,
      students: updatedStudents,
      tasks: tasks
    };
    localStorage.setItem(`fairy_classroom_${currentClass.id}`, JSON.stringify(classData));
  };

  // Handle task deletion
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updatedTasks);
    
    // Update class data in localStorage
    const classData = {
      __classroomName: currentClass.name,
      students: students,
      tasks: updatedTasks
    };
    localStorage.setItem(`fairy_classroom_${currentClass.id}`, JSON.stringify(classData));
  };

  // Handle giving a task to a student
  const handleGiveTask = (task) => {
    setSelectedTaskForGive(task);
    setShowTaskGiveModal(true);
  };

  // Handle confirming task assignment
  const confirmTaskAssignment = () => {
    if (!selectedStudentForTask || !selectedTaskForGive) return;
    
    const student = students.find(s => s.id === selectedStudentForTask);
    if (!student) return;
    
    // Update student points and history
    const updatedPoints = student.total + (selectedTaskForGive.points || 0);
    const updatedHistory = [
      ...student.history || [],
      {
        task: selectedTaskForGive.label,
        points: selectedTaskForGive.points || 0,
        ts: Date.now()
      }
    ];
    
    const updatedStudents = students.map(s => 
      s.id === selectedStudentForTask 
        ? { ...s, total: updatedPoints, history: updatedHistory }
        : s
    );
    
    setStudents(updatedStudents);
    
    // Update class data in localStorage
    const classData = {
      __classroomName: currentClass.name,
      students: updatedStudents,
      tasks: tasks
    };
    localStorage.setItem(`fairy_classroom_${currentClass.id}`, JSON.stringify(classData));
    
    setShowTaskGiveModal(false);
    setSelectedStudentForTask('');
    setSelectedTaskForGive(null);
  };

  // Handle resetting student points
  const handleResetStudentPoints = (studentId) => {
    const updatedStudents = students.map(s => 
      s.id === studentId ? { ...s, total: 0, history: [] } : s
    );
    
    setStudents(updatedStudents);
    
    // Update class data in localStorage
    const classData = {
      __classroomName: currentClass.name,
      students: updatedStudents,
      tasks: tasks
    };
    localStorage.setItem(`fairy_classroom_${currentClass.id}`, JSON.stringify(classData));
  };

  // Handle class deletion
  const handleDeleteClass = (classId) => {
    if (window.confirm('Are you sure you want to delete this class? This cannot be undone.')) {
      const updatedClasses = classList.filter(c => c.id !== classId);
      setClassList(updatedClasses);
      localStorage.setItem('fairy_classes', JSON.stringify(updatedClasses));
      
      if (currentClass?.id === classId) {
        setCurrentClass(null);
      }
      
      // Remove class data from localStorage
      localStorage.removeItem(`fairy_classroom_${classId}`);
    }
  };

  // Handle avatar preview
  const handleAvatarChange = (type, value) => {
    setAvatarType(type);
    if (type === 'emoji') {
      setAvatarEmoji(value);
      setPreviewAvatar(createEmojiAvatar(value, avatarColor));
    } else if (type === 'color') {
      setAvatarColor(value);
      setPreviewAvatar(createEmojiAvatar(avatarEmoji, value));
    }
  };

  // Create emoji avatar
  const createEmojiAvatar = (emoji, bgColor) => {
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    
    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw emoji
    ctx.font = '100px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#333';
    ctx.fillText(emoji, canvas.width / 2, canvas.height / 2);
    
    return canvas.toDataURL();
  };

  // Handle file upload for avatar
  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilePreview(event.target.result);
        setPreviewAvatar(event.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              {currentClass ? `${students.length} students · ${tasks.length} tasks` : 'No class selected'}
            </div>
          </div>
        </div>
        <a href="/reports" id="btnReportsTopline" className="action-btn"
          style={{ background: 'linear-gradient(135deg,#88dd88,#66cc66)', transition: 'background 0.18s' }}
          onClick={(e) => {
            e.preventDefault();
            navigate('/reports');
          }}>
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
                  navigate('/');
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
                onClick={() => setShowAddStudentModal(true)} disabled={!currentClass}>
                ➕ <span className="btn-label">Add / Edit students</span>
              </button>
              <button id="btnAddTasks" className="action-btn"
                style={{ background: 'linear-gradient(135deg,#7dd7ff,#5bbfff)', color: '#00334a' }}
                onClick={() => setShowAddTaskModal(true)} disabled={!currentClass}>
                🛠 <span className="btn-label">Add Tasks</span>
              </button>
              <button id="btnReports" className="action-btn" 
                style={{ background: 'linear-gradient(135deg,#88dd88,#66cc66)' }}
                onClick={() => navigate('/reports')} disabled={!currentClass}>
                📊 <span className="btn-label">Generate Reports</span>
              </button>
              <button id="btnRemoveClass" className="small-btn"
                style={{ background: 'linear-gradient(135deg,#ff6b6b,#ff4b4b)', color: '#fff' }}
                onClick={() => currentClass && handleDeleteClass(currentClass.id)} disabled={!currentClass}>
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
                    style={{ width: '100%', background: 'linear-gradient(135deg,#ff6b6b,#ff4b4b)' }}
                    onClick={() => currentClass && handleDeleteClass(currentClass.id)}>
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
                onClick={() => navigate('/games')}>
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
              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <button 
                  className={activeTab === 'students' ? 'tab-active' : 'tab-inactive'}
                  onClick={() => setActiveTab('students')}
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    backgroundColor: activeTab === 'students' ? '#7b4cff' : '#e2e8f0',
                    color: activeTab === 'students' ? 'white' : '#4a5568',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Students ({students.length})
                </button>
                <button 
                  className={activeTab === 'tasks' ? 'tab-active' : 'tab-inactive'}
                  onClick={() => setActiveTab('tasks')}
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    backgroundColor: activeTab === 'tasks' ? '#7b4cff' : '#e2e8f0',
                    color: activeTab === 'tasks' ? 'white' : '#4a5568',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Tasks ({tasks.length})
                </button>
              </div>

              {activeTab === 'students' ? (
                <div id="childList" className="child-list" style={{ marginTop: '18px', display: 'block' }}>
                  <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Students in {currentClass.name}</h2>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                          padding: '8px 12px',
                          border: '1px solid #cbd5e0',
                          borderRadius: '8px',
                          fontSize: '14px'
                        }}
                      />
                      <button 
                        onClick={() => setShowStudentManager(true)}
                        style={{
                          padding: '8px 12px',
                          backgroundColor: '#7b4cff',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer'
                        }}
                      >
                        Manage Students
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {filteredStudents.map((student) => (
                      <div 
                        key={student.id}
                        style={{
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '16px',
                          backgroundColor: '#ffffff',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                        }}
                      >
                        {student.photo ? (
                          <img 
                            src={student.photo} 
                            alt={student.name} 
                            style={{ 
                              width: '80px', 
                              height: '80px', 
                              borderRadius: '50%', 
                              objectFit: 'cover',
                              marginBottom: '12px'
                            }} 
                          />
                        ) : (
                          <div 
                            style={{ 
                              width: '80px', 
                              height: '80px', 
                              borderRadius: '50%', 
                              backgroundColor: student.doorTheme || '#ffd1f0',
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              fontSize: '24px',
                              marginBottom: '12px'
                            }}
                          >
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{student.name}</h3>
                        <p style={{ margin: '0 0 8px 0', color: '#4a5568' }}>Points: <strong>{student.total}</strong></p>
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                          <button 
                            onClick={() => {
                              setSelectedStudentForTask(student.id);
                              setShowTaskGiveModal(true);
                            }}
                            style={{
                              padding: '6px 10px',
                              backgroundColor: '#48bb78',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Give Task
                          </button>
                          <button 
                            onClick={() => handleResetStudentPoints(student.id)}
                            style={{
                              padding: '6px 10px',
                              backgroundColor: '#ecc94b',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Reset Points
                          </button>
                          <button 
                            onClick={() => handleDeleteStudent(student.id)}
                            style={{
                              padding: '6px 10px',
                              backgroundColor: '#f56565',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div id="taskList" className="task-list" style={{ marginTop: '18px', display: 'block' }}>
                  <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>Tasks for {currentClass.name}</h2>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {tasks.map((task) => (
                      <div 
                        key={task.id}
                        style={{
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          padding: '16px',
                          backgroundColor: '#ffffff',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                        }}
                      >
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{task.label}</h3>
                        <p style={{ margin: '0 0 8px 0', color: '#4a5568' }}>
                          Points: <strong>{task.points > 0 ? `+${task.points}` : task.points}</strong>
                        </p>
                        {task.description && (
                          <p style={{ margin: '0 0 12px 0', color: '#718096', fontSize: '14px' }}>
                            {task.description}
                          </p>
                        )}
                        <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                          <button 
                            onClick={() => handleGiveTask(task)}
                            style={{
                              padding: '6px 10px',
                              backgroundColor: '#4299e1',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Give to Student
                          </button>
                          <button 
                            onClick={() => handleDeleteTask(task.id)}
                            style={{
                              padding: '6px 10px',
                              backgroundColor: '#f56565',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
              <div className="form-group">
                <label htmlFor="className">Class Name</label>
                <input 
                  type="text" 
                  id="className" 
                  name="className" 
                  placeholder="Enter class name" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject (Optional)</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  placeholder="Enter subject" 
                />
              </div>
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
          <div className="modal" style={{ maxWidth: '800px' }}>
            <h3>Add New Student</h3>
            <form onSubmit={handleAddStudent}>
              <div className="form-group">
                <label htmlFor="name">Student Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Enter student name" 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>Avatar</label>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Emoji</label>
                    <select 
                      value={avatarEmoji} 
                      onChange={(e) => handleAvatarChange('emoji', e.target.value)}
                      style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                    >
                      <option value="🦄">🦄 Unicorn</option>
                      <option value="🐶">🐶 Dog</option>
                      <option value="🐱">🐱 Cat</option>
                      <option value="🦁">🦁 Lion</option>
                      <option value="🐯">🐯 Tiger</option>
                      <option value="🦊">🦊 Fox</option>
                      <option value="🐻">🐻 Bear</option>
                      <option value="🐼">🐼 Panda</option>
                      <option value="🐨">🐨 Koala</option>
                      <option value="🐵">🐵 Monkey</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Background Color</label>
                    <input 
                      type="color" 
                      value={avatarColor} 
                      onChange={(e) => handleAvatarChange('color', e.target.value)}
                      style={{ width: '50px', height: '30px', border: 'none', borderRadius: '4px' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Or Upload Photo</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                      style={{ padding: '5px' }}
                    />
                  </div>
                </div>
                
                {previewAvatar && (
                  <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                    <img 
                      src={previewAvatar} 
                      alt="Preview" 
                      style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover' }} 
                    />
                  </div>
                )}
              </div>
              
              <div className="form-group">
                <label>Gender</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {['male', 'female', 'other'].map(gender => (
                    <button
                      key={gender}
                      type="button"
                      className={`gender-btn ${selectedGender === gender ? 'selected' : ''}`}
                      onClick={() => setSelectedGender(gender)}
                      style={{
                        padding: '8px 15px',
                        border: selectedGender === gender ? '2px solid #7b4cff' : '1px solid #ccc',
                        backgroundColor: selectedGender === gender ? '#f0e6ff' : 'white',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontWeight: selectedGender === gender ? 'bold' : 'normal'
                      }}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="form-group">
                <label>Door Theme Color</label>
                <input 
                  type="color" 
                  value={doorTheme} 
                  onChange={(e) => setDoorTheme(e.target.value)}
                  style={{ width: '50px', height: '30px', border: 'none', borderRadius: '4px' }}
                />
              </div>
              
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddStudentModal(false)}>Cancel</button>
                <button type="submit">Add Student</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add New Task</h3>
            <form onSubmit={handleAddTask}>
              <div className="form-group">
                <label htmlFor="label">Task Name</label>
                <input 
                  type="text" 
                  id="label" 
                  name="label" 
                  placeholder="Enter task name" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="points">Points</label>
                <input 
                  type="number" 
                  id="points" 
                  name="points" 
                  placeholder="Enter points value" 
                  defaultValue="1"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select 
                  id="category" 
                  name="category" 
                  defaultValue="positive"
                  style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                >
                  <option value="positive">Positive (Reward)</option>
                  <option value="needs">Needs Work (Penalty)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description (Optional)</label>
                <textarea 
                  id="description" 
                  name="description" 
                  placeholder="Enter task description" 
                  rows="3"
                  style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddTaskModal(false)}>Cancel</button>
                <button type="submit">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Give Modal */}
      {showTaskGiveModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Give Task to Student</h3>
            <div className="form-group">
              <label>Select Student</label>
              <select 
                value={selectedStudentForTask} 
                onChange={(e) => setSelectedStudentForTask(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
              >
                <option value="">Select a student</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} ({student.total} points)
                  </option>
                ))}
              </select>
            </div>
            {selectedTaskForGive && (
              <div className="form-group">
                <p><strong>Task:</strong> {selectedTaskForGive.label}</p>
                <p><strong>Points:</strong> {selectedTaskForGive.points > 0 ? `+${selectedTaskForGive.points}` : selectedTaskForGive.points}</p>
              </div>
            )}
            <div className="modal-actions">
              <button type="button" onClick={() => {
                setShowTaskGiveModal(false);
                setSelectedStudentForTask('');
                setSelectedTaskForGive(null);
              }}>Cancel</button>
              <button 
                type="button" 
                onClick={confirmTaskAssignment}
                disabled={!selectedStudentForTask}
              >
                Give Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Manager Modal */}
      {showStudentManager && (
        <div className="modal-backdrop">
          <div className="modal" style={{ maxWidth: '900px' }}>
            <h3>Student Manager</h3>
            <div className="student-manager-content">
              <div style={{ marginBottom: '15px' }}>
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #cbd5e0',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {filteredStudents.map((student) => (
                  <div 
                    key={student.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                  >
                    {student.photo ? (
                      <img 
                        src={student.photo} 
                        alt={student.name} 
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          borderRadius: '50%', 
                          objectFit: 'cover',
                          marginRight: '12px'
                        }} 
                      />
                    ) : (
                      <div 
                        style={{ 
                          width: '50px', 
                          height: '50px', 
                          borderRadius: '50%', 
                          backgroundColor: student.doorTheme || '#ffd1f0',
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '18px',
                          marginRight: '12px'
                        }}
                      >
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold' }}>{student.name}</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>Points: {student.total}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleResetStudentPoints(student.id)}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: '#ecc94b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Reset
                      </button>
                      <button 
                        onClick={() => handleDeleteStudent(student.id)}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: '#f56565',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="modal-actions" style={{ marginTop: '20px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowStudentManager(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teachers;