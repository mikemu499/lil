import React from 'react';
import './Reports.css';

const Reports = () => {
  return (
    <div className="reports-page">
      <h1>Reports</h1>
      <p>Generate and view reports for your classes and students.</p>
      <div className="reports-content">
        <div className="report-card">
          <h3>Student Progress Reports</h3>
          <p>Track individual student progress over time.</p>
          <button className="generate-btn">Generate Report</button>
        </div>
        <div className="report-card">
          <h3>Class Summary</h3>
          <p>Get an overview of class performance and achievements.</p>
          <button className="generate-btn">Generate Report</button>
        </div>
        <div className="report-card">
          <h3>Badge Distribution</h3>
          <p>See which badges are being earned most frequently.</p>
          <button className="generate-btn">Generate Report</button>
        </div>
      </div>
    </div>
  );
};

export default Reports;