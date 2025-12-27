import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reports.css';

const Reports = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reportData, setReportData] = useState(null);

  // Load classroom data from localStorage
  useEffect(() => {
    const currentClassId = localStorage.getItem('currentClassId');
    if (currentClassId) {
      const classData = JSON.parse(localStorage.getItem(`fairy_classroom_${currentClassId}`) || '{}');
      setStudents(classData.students || []);
      setTasks(classData.tasks || []);
    }
  }, []);

  // Generate insights
  const generateInsights = (entries, hist) => {
    const totalPts = entries.reduce((s, e) => s + e.points, 0);
    const totalEvents = hist.length;
    const top = entries.slice().sort((a, b) => b.points - a.points)[0];
    const bottom = entries.slice().sort((a, b) => a.points - b.points)[0];
    const avgPerEvent = totalEvents ? (totalPts / totalEvents).toFixed(2) : 0;
    const sentences = [];
    sentences.push(`This report summarizes ${totalEvents} recorded events totaling ${totalPts} points.`);
    if (top) sentences.push(`Top contributor: "${top.label}" with ${top.points} points.`);
    if (bottom && bottom !== top) sentences.push(`Lowest contributor: "${bottom.label}" with ${bottom.points} points.`);
    sentences.push(`On average each recorded event contributed ${avgPerEvent} points.`);
    return sentences.join(' ');
  };

  // Generate report
  const generateReport = () => {
    if (!selectedStudent) {
      alert('Please select a student');
      return;
    }

    const student = students.find(s => s.id === selectedStudent);
    if (!student) return;

    // Apply date filters
    const fromTs = fromDate ? new Date(fromDate + 'T00:00:00').getTime() : null;
    const toTs = toDate ? new Date(toDate + 'T23:59:59.999').getTime() : null;

    const histRaw = student.history || [];
    const hist = histRaw.filter(h => {
      try {
        if (!h) return false;
        let t = null;
        if (typeof h.ts === 'number') t = Number(h.ts);
        else if (typeof h.ts === 'string') t = (isNaN(h.ts) ? Date.parse(h.ts) : Number(h.ts));
        if (!t) return false;
        if (fromTs && t < fromTs) return false;
        if (toTs && t > toTs) return false;
        return true;
      } catch (e) { return false; }
    });

    if (!hist || hist.length === 0) {
      setReportData({ noHistory: true });
      return;
    }

    // Build report data
    const colors = ['#4CCFF9', '#8FB3FF', '#FFD166', '#8DE7A6', '#C78CFF', '#F86DA0', '#FFB3A7', '#A7FFD1'];
    const map = {};
    tasks.forEach(t => {
      if (t && t.label) map[t.label] = { label: t.label, points: 0, count: 0 };
    });
    
    hist.forEach(h => {
      const key = h.task || h.label || 'unknown';
      if (!map[key]) map[key] = { label: key, points: 0, count: 0 };
      map[key].points += (h.points || 0);
      map[key].count = (map[key].count || 0) + 1;
    });
    
    const entries = Object.keys(map).map(k => ({
      label: map[k].label,
      points: map[k].points,
      count: map[k].count
    }));
    
    const filtered = entries.filter(e => Math.abs(e.points) > 0 || e.count > 0);
    if (!filtered || !filtered.length) {
      setReportData({ noScoredEvents: true });
      return;
    }
    
    filtered.sort((a, b) => Math.abs(b.points) - Math.abs(a.points));
    const total = Math.max(1, filtered.reduce((s, e) => s + Math.abs(e.points), 0));
    
    setReportData({
      student: student,
      history: hist,
      entries: filtered,
      total: total,
      colors: colors,
      insights: generateInsights(filtered, hist)
    });
  };

  // Render donut chart
  const renderDonutChart = () => {
    if (!reportData || !reportData.entries) return null;

    const { entries, total, colors } = reportData;
    const VIEW = 720;
    const cx = VIEW / 2;
    const cy = VIEW / 2;
    const radius = Math.round(VIEW * 0.36);
    const innerR = Math.round(radius * 0.48);

    // Calculate points for positive and negative
    const pos = entries.reduce((s, e) => s + (e.points > 0 ? e.points : 0), 0);
    const neg = entries.reduce((s, e) => s + (e.points < 0 ? Math.abs(e.points) : 0), 0);
    const pctPos = (pos + neg) > 0 ? Math.round(100 * pos / (pos + neg)) : 0;

    let angleAcc = -90;
    const paths = [];

    entries.forEach((e, i) => {
      const v = Math.abs(e.points);
      const angle = (v / total) * 360;
      if (angle <= 0) return;

      const startA = angleAcc;
      const endA = angleAcc + angle;
      
      // Convert polar to cartesian coordinates
      const polarToCartesian = (cx, cy, r, angleDeg) => {
        const rad = angleDeg * Math.PI / 180;
        return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
      };
      
      const start = polarToCartesian(cx, cy, radius, endA);
      const end = polarToCartesian(cx, cy, radius, startA);
      const largeArc = angle > 180 ? 1 : 0;
      
      const d = `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
      
      paths.push(
        <path
          key={i}
          d={d}
          fill={colors[i % colors.length]}
        />
      );

      // Add percentage text if the slice is large enough
      const midA = startA + angle / 2;
      const midRad = midA * Math.PI / 180;
      const labelR = innerR + (radius - innerR) * 0.55;
      const lx = cx + Math.cos(midRad) * labelR;
      const ly = cy + Math.sin(midRad) * labelR;
      const pct = Math.round((v / total) * 100);

      if (angle >= 7) {
        paths.push(
          <text
            key={`text-${i}`}
            x={lx}
            y={ly + 6}
            textAnchor="middle"
            fontWeight="800"
            fontSize={Math.max(12, Math.round(18 * (Math.min(1, angle / 60))))}
            fill="#fff"
          >
            {pct}%
          </text>
        );
      }

      angleAcc += angle;
    });

    return (
      <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start', width: '100%' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', minWidth: '420px' }}>
          <svg
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            style={{ width: '100%', maxWidth: '560px', height: 'auto', display: 'block', borderRadius: '10px', boxShadow: '0 18px 44px rgba(0,0,0,0.10)' }}
          >
            {paths}
            <circle cx={cx} cy={cy} r={innerR - 2} fill="#fff" />
            <text x={cx} y={cy - 8} textAnchor="middle" fontWeight="800" fontSize="48" fill="#222">
              {pctPos}%
            </text>
            <text x={cx} y={cy + 30} textAnchor="middle" fontWeight="700" fontSize="14" fill="#666">
              positive
            </text>
          </svg>
        </div>
        <div style={{ width: '320px', boxSizing: 'border-box', padding: '6px 12px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {entries.map((e, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                className="color-box"
                style={{
                  background: colors[i % colors.length],
                  flex: '0 0 auto',
                  width: '34px',
                  height: '34px',
                  borderRadius: '6px'
                }}
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: '700', color: '#222' }}>
                  {e.label}
                </div>
                <div style={{ color: '#666', fontSize: '12px' }}>
                  {Math.round(100 * Math.abs(e.points) / total)}% · {e.points} pts · {e.count} events
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="reports-page">
      <button 
        className="back-btn" 
        title="Back to Teachers"
        onClick={() => navigate('/teachers')}
      >
        <span className="back-icon">←</span>
        <span className="back-text">Back</span>
      </button>

      <div className="reports-header">
        <h1>Reports</h1>
        <p>Generate and view reports for your classes and students.</p>
      </div>

      <div className="reports-controls">
        <select
          id="repStu"
          className="report-select"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Select student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.name}
            </option>
          ))}
        </select>

        <input
          id="repFrom"
          type="date"
          placeholder="From"
          className="report-input"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          id="repTo"
          type="date"
          placeholder="To"
          className="report-input"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <button
          id="gen"
          className="action-btn small-btn"
          type="button"
          onClick={generateReport}
        >
          Generate
        </button>
      </div>

      <div id="repArea" className="report-area">
        {reportData && reportData.noHistory && (
          <div style={{ color: '#666' }}>No history for selected date range</div>
        )}
        {reportData && reportData.noScoredEvents && (
          <div style={{ color: '#666' }}>No scored events</div>
        )}
        {reportData && !reportData.noHistory && !reportData.noScoredEvents && (
          <>
            {renderDonutChart()}
            <div style={{ marginTop: '12px', color: '#333', fontSize: '14px', lineHeight: '1.5' }}>
              {reportData.insights}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Reports;