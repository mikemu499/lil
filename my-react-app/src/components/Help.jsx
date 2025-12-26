import React from 'react';
import './Help.css';

const Help = () => {
  return (
    <div className="help-page">
      <h1>Help & Support</h1>
      <div className="help-content">
        <div className="help-section">
          <h2>Getting Started</h2>
          <div className="help-item">
            <h3>Creating Your First Class</h3>
            <p>Navigate to the Teachers section and click "Add New Class" to create your first class. You can add students and customize settings.</p>
          </div>
          <div className="help-item">
            <h3>Adding Students</h3>
            <p>After creating a class, click "Add / Edit Students" to enter student names and details.</p>
          </div>
          <div className="help-item">
            <h3>Awarding Badges</h3>
            <p>Use the badge system to reward students for achievements and positive behavior.</p>
          </div>
        </div>
        
        <div className="help-section">
          <h2>Account Management</h2>
          <div className="help-item">
            <h3>Updating Profile</h3>
            <p>Visit the Account section to update your personal information and preferences.</p>
          </div>
          <div className="help-item">
            <h3>Changing Password</h3>
            <p>Go to Account settings and select the "Change Password" section to update your password.</p>
          </div>
        </div>
        
        <div className="help-section">
          <h2>Frequently Asked Questions</h2>
          <div className="help-item">
            <h3>How do I export reports?</h3>
            <p>Navigate to the Reports section and click "Generate Report" to create and download reports for your classes.</p>
          </div>
          <div className="help-item">
            <h3>Can I access the app on mobile devices?</h3>
            <p>Yes, the app is fully responsive and works on all devices including smartphones and tablets.</p>
          </div>
          <div className="help-item">
            <h3>How do I contact support?</h3>
            <p>You can reach our support team through the contact form at the bottom of this page.</p>
          </div>
        </div>
        
        <div className="contact-section">
          <h2>Need More Help?</h2>
          <p>If you can't find the answer to your question, please contact our support team.</p>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Describe your issue"></textarea>
            </div>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Help;