import React from 'react';
import './Account.css';

const Account = () => {
  return (
    <div className="account-page">
      <h1>Account Settings</h1>
      <div className="account-content">
        <div className="profile-section">
          <h2>Profile Information</h2>
          <form className="profile-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Enter your username" />
            </div>
            <div className="form-group">
              <label htmlFor="grade">Grade Level</label>
              <select id="grade">
                <option value="">Select grade level</option>
                <option value="kindergarten">Kindergarten</option>
                <option value="1st">1st Grade</option>
                <option value="2nd">2nd Grade</option>
                <option value="3rd">3rd Grade</option>
                <option value="4th">4th Grade</option>
                <option value="5th">5th Grade</option>
                <option value="6th">6th Grade</option>
                <option value="7th">7th Grade</option>
                <option value="8th">8th Grade</option>
                <option value="9th">9th Grade</option>
                <option value="10th">10th Grade</option>
                <option value="11th">11th Grade</option>
                <option value="12th">12th Grade</option>
              </select>
            </div>
            <button type="submit" className="save-btn">Save Changes</button>
          </form>
        </div>
        
        <div className="password-section">
          <h2>Change Password</h2>
          <form className="password-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input type="password" id="currentPassword" placeholder="Enter current password" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input type="password" id="newPassword" placeholder="Enter new password" />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input type="password" id="confirmPassword" placeholder="Confirm new password" />
            </div>
            <button type="submit" className="save-btn">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;