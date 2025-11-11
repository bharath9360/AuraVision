
import React, { useState } from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';

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
          // In a real app, the server would return a JWT token.
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
    <div className="min-h-screen bg-iris-bg flex flex-col items-center justify-center p-4 md:p-8 text-iris-text-primary">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Project IRIS</h1>
      <h2 className="text-xl md:text-2xl text-iris-text-secondary mb-12">Guide Login</h2>

      <div className="w-full max-w-sm space-y-6">
        <div>
          <label className="text-sm font-medium text-iris-text-secondary">Email Address</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-iris-text-secondary">
              <Icon name="userCircle" className="w-5 h-5" />
            </span>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-iris-surface p-4 pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-iris-primary-blue"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-iris-text-secondary">Password</label>
          <div className="relative mt-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-iris-text-secondary">
              <Icon name="lock" className="w-5 h-5" />
            </span>
            <input 
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password" 
              className="w-full bg-iris-surface p-4 pl-12 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-iris-primary-blue" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-iris-text-secondary"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <Icon name={showPassword ? 'eyeSlash' : 'eye'} className="w-6 h-6" />
            </button>
          </div>
          <a href="#" className="text-sm text-iris-text-secondary float-right mt-2 hover:underline">Forgot Password?</a>
        </div>
        
        {error && <p className="text-sm text-iris-accent-red text-center pt-2">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-iris-primary-blue text-white font-bold py-4 rounded-full mt-8 transition-transform transform hover:scale-105 disabled:opacity-70 disabled:scale-100"
        >
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </div>

      <p className="mt-12 text-iris-text-secondary">
        Don't have an account?{' '}
        <button onClick={() => setPage(Page.GUIDE_REGISTER)} className="font-semibold text-iris-primary-blue hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
};
