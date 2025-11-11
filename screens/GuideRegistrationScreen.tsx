
import React, { useState } from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';

interface GuideRegistrationScreenProps {
  setPage: (page: Page) => void;
}

export const GuideRegistrationScreen: React.FC<GuideRegistrationScreenProps> = ({ setPage }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deviceId, setDeviceId] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    setError(null);

    if (!fullName || !email || !password || !confirmPassword || !deviceId) {
        setError('Please fill in all fields.');
        return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to register the guide
    setTimeout(() => {
        const guideData = { fullName, email, password, deviceId };
        // In a real app, you would send this to your backend.
        // Here, we store it in localStorage for the login simulation.
        localStorage.setItem('registeredGuide', JSON.stringify(guideData));
        
        setIsLoading(false);
        alert('Registration successful! Please log in.');
        setPage(Page.GUIDE_LOGIN);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-iris-bg flex flex-col items-center p-4 sm:p-6">
      <header className="w-full max-w-sm relative flex items-center justify-center py-4 mt-4">
        <button onClick={() => setPage(Page.GUIDE_LOGIN)} className="absolute left-0 top-1/2 -translate-y-1/2">
            <Icon name="arrowLeft" className="w-6 h-6" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-iris-text-primary text-center">Guide Registration</h1>
      </header>
      
      <p className="w-full max-w-sm text-iris-text-secondary mt-1 mb-8 text-center">
        Create an account to assist a visually impaired user.
      </p>

      <div className="w-full max-w-sm">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-iris-text-secondary">Full Name</label>
            <input type="text" placeholder="John Doe" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full bg-iris-surface p-4 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-iris-primary-blue" />
          </div>
          <div>
            <label className="text-sm font-medium text-iris-text-secondary">Email Address</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-iris-surface p-4 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-iris-primary-blue" />
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
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-iris-text-secondary">
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
              />
               <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-iris-text-secondary">
                <Icon name={showConfirmPassword ? 'eyeSlash' : 'eye'} className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-iris-text-secondary">Blind Person's Device ID</label>
            <input type="text" placeholder="Enter the user's IRIS Glass ID" value={deviceId} onChange={e => setDeviceId(e.target.value)} className="w-full bg-iris-surface p-4 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-iris-primary-blue" />
          </div>
        </div>

        {error && <p className="text-iris-accent-red text-sm text-center mt-4">{error}</p>}

        <button
          onClick={handleRegister}
          disabled={isLoading}
          className="w-full bg-iris-accent-yellow text-black font-bold py-4 rounded-full mt-8 transition-transform transform hover:scale-105 disabled:opacity-70 disabled:scale-100"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>

        <div className="text-center mt-8">
          <p className="text-iris-text-secondary">
            Already have an account?{' '}
            <button
              onClick={() => setPage(Page.GUIDE_LOGIN)}
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
