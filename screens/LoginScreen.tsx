
import React, { useState } from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';
import { Toggle } from '../components/Toggle';

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
                // In a real app, the server would return a JWT token.
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
    <div className={`min-h-screen bg-iris-bg flex flex-col items-center p-4 sm:p-6 ${highContrast ? 'contrast-125' : ''}`}>
      <div className="w-16 h-16 bg-iris-surface rounded-2xl flex items-center justify-center text-iris-primary-cyan mt-8 sm:mt-12 mb-4">
        <Icon name="logo" className="w-8 h-8" />
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-iris-text-primary text-center">Welcome to IRIS</h1>
      <p className="text-iris-text-secondary mt-1 mb-8 text-center">Enter your details to sign in or create an account.</p>

      <div className="w-full max-w-sm bg-iris-surface rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-2xl mr-4">🔊</span>
            <span className="text-lg">Voice Narration</span>
          </div>
          <Toggle checked={voiceNarration} onChange={setVoiceNarration} />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl mr-4">◑</span>
            <span className="text-lg">High-Contrast Mode</span>
          </div>
          <Toggle checked={highContrast} onChange={setHighContrast} />
        </div>
      </div>

      <div className="w-full max-w-sm">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-iris-text-secondary">Email Address</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              className="w-full bg-iris-surface p-4 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-iris-primary-blue disabled:opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-iris-text-secondary">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••" 
                className="w-full bg-iris-surface p-4 pr-12 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-iris-primary-blue disabled:opacity-50"
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
          </div>
        </div>

        {error && <p className="text-iris-accent-red text-sm text-center mt-4">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-iris-accent-yellow text-black font-bold py-4 rounded-full mt-8 transition-transform transform hover:scale-105 disabled:opacity-70 disabled:scale-100"
        >
          {isLoading ? 'Signing in...' : 'Continue'}
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-iris-surface-light" />
          <span className="mx-4 text-iris-text-secondary text-sm">OR</span>
          <hr className="flex-grow border-iris-surface-light" />
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => setPage(Page.REGISTER)}
            className="w-full bg-iris-surface py-3 rounded-full flex items-center justify-center font-semibold transition-colors hover:bg-iris-surface-light"
          >
            Register
          </button>
        </div>

        <button onClick={() => setPage(Page.HELP)} className="mt-8 text-iris-primary-cyan w-full text-center">Need Help?</button>
      </div>
    </div>
  );
};
