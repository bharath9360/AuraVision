// screens/ForgotPasswordScreen/ForgotPasswordScreen.tsx

import React, { useState } from 'react';
import { Page } from '../../types';
import { Icon } from '../../components/Icon';
import './ForgotPasswordScreen.css'; // <-- Intha CSS file-a adutha step-la create pannuvom

interface ForgotPasswordScreenProps {
  setPage: (page: Page) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendLink = () => {
    setError(null);
    setSuccess(null);

    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }

    setIsLoading(true);
    
    // Inga neenga real-a email anuppanum
    // Namma ippo summa simulate panrom
    setTimeout(() => {
        setSuccess('If an account exists for ' + email + ', you will receive a password reset link.');
        setIsLoading(false);
        setEmail('');
    }, 1500);
  };

  return (
    <div className="fp-container">
      <header className="fp-header">
        <button onClick={() => setPage(Page.GUIDE_LOGIN)} className="fp-back-button">
            <Icon name="arrowLeft" className="fp-back-button-icon" />
        </button>
        <h1 className="fp-title">Forgot Password</h1>
      </header>
      
      <p className="fp-subtitle">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <div className="fp-form">
        <div className="fp-input-group">
          <label className="fp-label">Email Address</label>
          <input 
            type="email" 
            placeholder="you@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            disabled={isLoading} 
            className="fp-input-field" 
          />
        </div>

        {error && <p className="fp-error-message">{error}</p>}
        {success && <p className="fp-success-message">{success}</p>}

        <button
          onClick={handleSendLink}
          disabled={isLoading}
          className="fp-submit-button"
        >
          {isLoading ? 'Sending Link...' : 'Send Reset Link'}
        </button>
      </div>
    </div>
  );
};