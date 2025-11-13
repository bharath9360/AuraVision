// screens/ChangePasswordScreen/ChangePasswordScreen.tsx

import React, { useState } from 'react';
import { Page } from '../../types';
import { Icon } from '../../components/Icon';
import './ChangePasswordScreen.css'; // <-- Intha CSS file-a adutha step-la create pannuvom

interface ChangePasswordScreenProps {
  setPage: (page: Page) => void;
}

export const ChangePasswordScreen: React.FC<ChangePasswordScreenProps> = ({ setPage }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // === INTHA PUTHU LINES-A SERTHURUKKEN ===
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // ======================================
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePassword = () => {
    setError(null);
    setSuccess(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    setIsLoading(true);
    
    // Inga neenga real-a password-a check pannanum
    // Ippo summa simulate panrom
    setTimeout(() => {
      // Dummy check
      if (currentPassword === '12345678') {
        setSuccess('Password updated successfully!');
        setIsLoading(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError('Your current password is incorrect.');
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="cp-container">
      <header className="cp-header">
        <button onClick={() => setPage(Page.SETTINGS)} className="cp-back-button">
            <Icon name="arrowLeft" className="cp-back-button-icon" />
        </button>
        <h1 className="cp-title">Change Password</h1>
      </header>
      
      <div className="cp-form">
        <div className="cp-input-fields-group">
          
          {/* === CURRENT PASSWORD-A MAATHIRUKKEN === */}
          <div className="cp-input-group">
            <label className="cp-label">Current Password</label>
            <div className="cp-password-wrapper">
              <input 
                type={showCurrentPassword ? 'text' : 'password'} 
                placeholder="Enter your current password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
                disabled={isLoading} 
                className="cp-input-field" 
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="cp-password-toggle"
              >
                <Icon name={showCurrentPassword ? 'eyeSlash' : 'eye'} className="cp-password-toggle-icon" />
              </button>
            </div>
          </div>
          
          {/* === NEW PASSWORD-A MAATHIRUKKEN === */}
          <div className="cp-input-group">
            <label className="cp-label">New Password</label>
             <div className="cp-password-wrapper">
              <input 
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Minimum 8 characters" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                disabled={isLoading} 
                className="cp-input-field" 
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="cp-password-toggle"
              >
                <Icon name={showNewPassword ? 'eyeSlash' : 'eye'} className="cp-password-toggle-icon" />
              </button>
            </div>
          </div>
          
          {/* === CONFIRM PASSWORD-A MAATHIRUKKEN === */}
          <div className="cp-input-group">
            <label className="cp-label">Confirm New Password</label>
            <div className="cp-password-wrapper">
              <input 
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter new password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                disabled={isLoading} 
                className="cp-input-field" 
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="cp-password-toggle"
              >
                <Icon name={showConfirmPassword ? 'eyeSlash' : 'eye'} className="cp-password-toggle-icon" />
              </button>
            </div>
          </div>

        </div>

        {error && <p className="cp-error-message">{error}</p>}
        {success && <p className="cp-success-message">{success}</p>}

        <button
          onClick={handleChangePassword}
          disabled={isLoading}
          className="cp-submit-button"
        >
          {isLoading ? 'Saving...' : 'Save Password'}
        </button>
      </div>
    </div>
  );
};