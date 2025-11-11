
import React, { useState } from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';

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

    // Simulate checking for existing user and creating account
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
    <div className="min-h-screen bg-iris-bg flex flex-col items-center p-4 sm:p-6">
      <header className="w-full max-w-sm relative flex items-center justify-center py-4 mt-4">
        <button onClick={() => setPage(Page.IMPAIRED_LOGIN)} className="absolute left-0 top-1/2 -translate-y-1/2">
            <Icon name="arrowLeft" className="w-6 h-6" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-iris-text-primary">Create Account</h1>
      </header>
      
      <p className="w-full max-w-sm text-iris-text-secondary mt-1 mb-8 text-center">
        Enter your details to start your journey with IRIS.
      </p>

      <div className="w-full max-w-sm">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-iris-text-secondary">Full Name</label>
            <input type="text" placeholder="Alex Ray" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={isLoading} className="w-full bg-iris-surface p-4 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-iris-primary-blue" />
          </div>
          <div>
            <label className="text-sm font-medium text-iris-text-secondary">Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} className="w-full bg-iris-surface p-4 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-iris-primary-blue" />
          </div>
          <div>
            <label className="text-sm font-medium text-iris-text-secondary">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                placeholder="Minimum 8 characters" 
                className="w-full bg-iris-surface p-4 pr-12 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-iris-primary-blue" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-iris-text-secondary"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showPassword ? 'eyeSlash' : 'eye'} className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-iris-text-secondary">Confirm Password</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Re-enter your password" 
                className="w-full bg-iris-surface p-4 pr-12 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-iris-primary-blue" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
               <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-iris-text-secondary"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                <Icon name={showConfirmPassword ? 'eyeSlash' : 'eye'} className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-iris-text-secondary">Device ID</label>
            <input type="text" placeholder="Enter your IRIS Glass Device ID" value={deviceId} onChange={(e) => setDeviceId(e.target.value)} disabled={isLoading} className="w-full bg-iris-surface p-4 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-iris-primary-blue" />
          </div>
        </div>

        {error && <p className="text-iris-accent-red text-sm text-center mt-4">{error}</p>}

        <button
          onClick={handleCreateAccount}
          disabled={isLoading}
          className="w-full bg-iris-accent-yellow text-black font-bold py-4 rounded-full mt-8 transition-transform transform hover:scale-105 disabled:opacity-70 disabled:scale-100"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="text-center mt-8">
          <p className="text-iris-text-secondary">
            Already have an account?{' '}
            <button
              onClick={() => setPage(Page.IMPAIRED_LOGIN)}
              className="font-semibold text-iris-primary-blue hover:underline"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
