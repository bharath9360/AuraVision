
import React, { useState } from 'react';
import { Page } from '../../types';
import { Icon } from '../../components/Icon';
import { Toggle } from '../../components/Toggle';

// screens/LoginScreen.tsx
import './LoginScreen.css'; // <-- PUDHU CSS FILE-A INGA IMPORT PANNIRUKKOM
// screens/LoginScreen.tsx
import './LoginScreen.css'; // <-- CSS FILE-A INGA IMPORT PANNIRUKKOM

interface LoginScreenProps {
  setPage: (page: Page) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ setPage }) => {
  const [voiceNarration, setVoiceNarration] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  // State for authentication
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setError(null);

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setIsLoading(true);

    // Simulate API call and JWT authentication
    setTimeout(() => {
        const registeredUser = localStorage.getItem('registeredUser');
        if (registeredUser) {
            const userData = JSON.parse(registeredUser);
            if (userData.email === email && userData.password === password) {
                const mockJwtToken = 'mock-jwt-token-for-user-' + Date.now();
                localStorage.setItem('userAuthToken', mockJwtToken);
                setPage(Page.PAIRING);
            } else {
                setError('Invalid email or password.');
            }
        } else {
            setError('No account found with this email. Please register first.');
        }
        setIsLoading(false);
    }, 1000);
  };


  return (
    <div className={`login-container ${highContrast ? 'contrast-125' : ''}`}>
      <div className="login-logo-container">
        <Icon name="logo" className="login-logo-icon" />
      </div>
      <h1 className="login-title">Welcome to IRIS</h1>
      <p className="login-subtitle">Enter your details to sign in or create an account.</p>

      <div className="accessibility-box">
        <div className="toggle-item">
          <div className="toggle-label">
            <span className="toggle-icon">🔊</span>
            <span>Voice Narration</span>
          </div>
          <Toggle checked={voiceNarration} onChange={setVoiceNarration} />
        </div>
        <div className="toggle-item">
          <div className="toggle-label">
            <span className="toggle-icon">◑</span>
            <span>High-Contrast Mode</span>
          </div>
          <Toggle checked={highContrast} onChange={setHighContrast} />
        </div>
      </div>

      <div className="form-container">
        <div className="input-group">
          <label className="input-label">Email Address</label>
          <input 
            type="email" 
            placeholder="you@example.com" 
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password</label>
          <div className="password-wrapper">
            <input 
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••" 
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-button"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon name={showPassword ? 'eyeSlash' : 'eye'} className="password-toggle-icon" />
            </button>
          </div>
        </div>

        {error && <p style={{color: '#FF453A', fontSize: '0.875rem', textAlign: 'center', marginTop: '1rem'}}>{error}</p>}

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="continue-button"
        >
          {isLoading ? 'Signing in...' : 'Continue'}
        </button>

        <div className="divider-container">
          <hr className="divider-line" />
          <span className="divider-text">OR</span>
          <hr className="divider-line" />
        </div>

        {/* === IDHA THAAN UNGAKKAGA MAATHIRUKKOM === */}
        <div className="register-button-container">
          <button 
            onClick={() => setPage(Page.REGISTER)}
            className="register-button"
          >
            Register
          </button>
        </div>
        {/* ======================================= */}


        <button onClick={() => setPage(Page.HELP)} className="need-help-button">Need Help?</button>
      </div>
    </div>
  );
};