import React from 'react';
import { Page, UserType } from '../types';
import { Icon } from '../components/Icon';

interface WelcomeScreenProps {
  setPage: (page: Page) => void;
  setUserType: (userType: UserType) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setPage, setUserType }) => {
  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    if (type === UserType.VISUALLY_IMPAIRED) {
      setPage(Page.IMPAIRED_LOGIN);
    } else {
      setPage(Page.GUIDE_LOGIN);
    }
  };

  return (
    <div className="min-h-screen bg-iris-bg flex flex-col items-center justify-center p-4 md:p-8 text-center text-iris-text-primary">
      <div className="w-24 h-24 bg-iris-surface rounded-3xl flex items-center justify-center text-iris-accent-yellow mb-6">
        <Icon name="logo" className="w-12 h-12" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold">Project IRIS</h1>
      <p className="text-iris-text-secondary mt-2 mb-12">See the world, together.</p>

      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => handleUserTypeSelect(UserType.VISUALLY_IMPAIRED)}
          className="w-full bg-iris-primary-blue rounded-3xl p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105"
        >
          <Icon name="glasses" className="w-10 h-10 mb-2 text-white" />
          <span className="text-xl font-semibold text-white">I am a Visually Impaired User</span>
        </button>

        <button
          onClick={() => handleUserTypeSelect(UserType.GUIDE)}
          className="w-full bg-iris-surface rounded-3xl p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105"
        >
          <Icon name="guide" className="w-10 h-10 mb-2 text-iris-primary-cyan" />
          <span className="text-xl font-semibold">I am a Guide</span>
        </button>
      </div>

      <button onClick={() => setPage(Page.ACCESSIBILITY_OPTIONS)} className="mt-12 text-iris-text-secondary underline">
        Accessibility Options
      </button>
    </div>
  );
};
