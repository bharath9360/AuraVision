// screens/RegistrationScreen.tsx

import React, { useState } from 'react';
import { Page } from '../../types';
import { Icon } from '../../components/Icon';
import './RegistrationScreen.css'; // <-- PUDHU CSS FILE-A INGA IMPORT PANNIRUKKOM

interface RegistrationScreenProps {
  setPage: (page: Page) => void;
}

export const RegistrationScreen: React.FC<RegistrationScreenProps> = ({ setPage }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deviceId, setDeviceId] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCreateAccount = () => {
    setError(null);
    if (!fullName || !email || !password || !confirmPassword || !deviceId) {
      setError('Please fill in all required fields.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }
    if (password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }
    
    setIsLoading(true);

    setTimeout(() => {
        const existingUser = localStorage.getItem('registeredUser');
        if (existingUser) {
            const userData = JSON.parse(existingUser);
            if (userData.email === email) {
                setError('An account with this email already exists. Please log in.');
                setIsLoading(false);
                return;
            }
        }

        const userData = { fullName, email, password, deviceId };
        localStorage.setItem('registeredUser', JSON.stringify(userData));
        
        setIsLoading(false);
        alert('Registration successful! You can now log in.');
        setPage(Page.IMPAIRED_LOGIN);
    }, 1500);
  };

  return (
    <div className="reg-container">
      <header className="reg-header">
        <button onClick={() => setPage(Page.IMPAIRED_LOGIN)} className="reg-back-button">
            <Icon name="arrowLeft" className="reg-back-button-icon" />
        </button>
        <h1 className="reg-title">Create Account</h1>
      </header>
      
      <p className="reg-subtitle">
        Enter your details to start your journey with IRIS.
      </p>

      <div className="reg-form">
        <div className="reg-input-fields-group">
          
          <div className="reg-input-group">
            <label className="reg-label">Full Name</label>
            <input type="text" placeholder="Alex Ray" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={isLoading} className="reg-input-field" />
          </div>
          
          <div className="reg-input-group">
            <label className="reg-label">Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} className="reg-input-field" />
          </div>
          
          <div className="reg-input-group">
            <label className="reg-label">Password</label>
            <div className="reg-password-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 8 characters" 
                className="reg-input-field" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="reg-password-toggle"
              >
                <Icon name={showPassword ? 'eyeSlash' : 'eye'} className="reg-password-toggle-icon" />
              </button>
            </div>
          </div>
          
          <div className="reg-input-group">
            <label className="reg-label">Confirm Password</label>
            <div className="reg-password-wrapper">
              <input 
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your password" 
                className="reg-input-field" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
               <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="reg-password-toggle"
              >
                <Icon name={showConfirmPassword ? 'eyeSlash' : 'eye'} className="reg-password-toggle-icon" />
              </button>
            </div>
          </div>
          
          <div className="reg-input-group">
            <label className="reg-label">Device ID</label>
            <input type="text" placeholder="Enter your IRIS Glass Device ID" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} disabled={isLoading} className="reg-input-field" />
          </div>
        </div>

        {error && <p className="reg-error-message">{error}</p>}

        <button
          onClick={handleCreateAccount}
          disabled={isLoading}
          className="reg-submit-button"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="reg-login-text">
          <p>
            Already have an account?{' '}
            <button
              onClick={() => setPage(Page.IMPAIRED_LOGIN)}
              className="reg-login-link"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};