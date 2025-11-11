import React, { useState } from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';

interface AddPersonScreenProps {
  setPage: (page: Page) => void;
}

export const AddPersonScreen: React.FC<AddPersonScreenProps> = ({ setPage }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [name, setName] = useState('');

  const handleSave = () => {
    if (!name) return;
    setShowSuccess(true);
    setTimeout(() => {
        setShowSuccess(false);
        setPage(Page.GUIDE_MAIN);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-iris-bg flex flex-col p-4 md:p-6 text-iris-text-primary">
      <header className="relative flex items-center justify-center py-4">
        <button onClick={() => setPage(Page.GUIDE_MAIN)} className="absolute left-0 top-1/2 -translate-y-1/2">
          <Icon name="arrowLeft" className="w-6 h-6" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-center">Add New Person</h1>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center space-y-8">
        <div className="w-full max-w-sm border-2 border-dashed border-iris-surface-light rounded-2xl p-8 text-center">
            <span className="text-5xl">📸</span>
            <p className="font-semibold mt-4">Tap to Upload Photo</p>
            <p className="text-sm text-iris-text-secondary mt-1">Choose a clear photo of the person's face.</p>
            <button className="bg-iris-surface mt-6 px-6 py-2 rounded-full font-semibold">Upload Photo</button>
        </div>

        <div className="w-full max-w-sm">
          <label className="text-sm font-medium text-iris-text-secondary">Name</label>
          <input 
            type="text" 
            placeholder="Enter the individual's name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-iris-surface p-4 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-iris-primary-blue" 
          />
        </div>
      </div>
      
      <div className="w-full max-w-sm mx-auto space-y-4 pb-4">
        <button 
          onClick={handleSave}
          className="w-full bg-iris-primary-blue text-white font-bold py-4 rounded-full transition-transform transform hover:scale-105 disabled:opacity-50"
          disabled={!name}
        >
            Save to Database
        </button>
        {showSuccess && (
            <div className="w-full bg-green-500/20 text-green-300 font-semibold py-3 text-center rounded-full">
                Jane Doe added successfully
            </div>
        )}
      </div>
    </div>
  );
};