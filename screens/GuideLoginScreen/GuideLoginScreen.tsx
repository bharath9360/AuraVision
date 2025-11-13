// screens/GuideLoginScreen.tsx

import React, { useState } from 'react';
import { Page } from '../../types';
import { Icon } from '../../components/Icon';
import './GuideLoginScreen.css'; // <-- PUDHU CSS FILE-A INGA IMPORT PANNIRUKKOM

interface GuideLoginScreenProps {
  setPage: (page: Page) => void;
}

export const GuideLoginScreen: React.FC<GuideLoginScreenProps> = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
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

    setIsLoading(true);

    // Simulate API call and JWT authentication
    setTimeout(() => {
      const registeredGuide = localStorage.getItem('registeredGuide');
      if (registeredGuide) {
        const guideData = JSON.parse(registeredGuide);
        if (guideData.email === email && guideData.password === password) {
          const mockJwtToken = 'mock-jwt-token-for-guide-' + Date.now();
          localStorage.setItem('guideAuthToken', mockJwtToken);
          setPage(Page.GUIDE_MAIN);
        } else {
          setError('Invalid email or password.');
        }
      } else {
        setError('No guide is registered with this email. Please sign up.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="gl-container">
      <h1 className="gl-title">Project IRIS</h1>
      <h2 className="gl-subtitle">Guide Login</h2>

      <div className="gl-form">
        <div className="gl-input-group">
          {/* Design-la "Email or Phone Number" nu irukku, aana code-la "Email Address" nu thaan handle panreenga. Naan label-a mattum maathuren. */}
          <label className="gl-label">Email or Phone Number</label>
          <div className="gl-input-wrapper">
            <span className="gl-input-icon">
              <Icon name="userCircle" className="w-5 h-5" />
            </span>
            <input 
              type="email" 
              placeholder="Enter your email or phone" 
              className="gl-input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="gl-input-group">
          <label className="gl-label">Password</label>
          <div className="gl-input-wrapper">
            <span className="gl-input-icon">
              <Icon name="lock" className="w-5 h-5" />
            </span>
            <input 
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password" 
              className="gl-input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="gl-password-toggle"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon name={showPassword ? 'eyeSlash' : 'eye'} className="gl-password-toggle-icon" />
            </button>
          </div>
          
          {/* === INTHA LINK-A BUTTON-A MAATHIRUKKEN === */}
          <button 
            onClick={() => setPage(Page.FORGOT_PASSWORD)} 
            className="gl-forgot-link"
          >
            Forgot Password?
          </button>
          {/* =========================================== */}

        </div>
        
        {error && <p className="gl-error-message">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="gl-login-button"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </div>

      <p className="gl-signup-text">
        Don't have an account?{' '}
        <button onClick={() => setPage(Page.GUIDE_REGISTER)} className="gl-signup-link">
          Sign Up
        </button>
      </p>
    </div>
  );
};