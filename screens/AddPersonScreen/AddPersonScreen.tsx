// screens/AddPersonScreen.tsx

import React, { useState } from 'react';
import { Page } from '../../types';
import { Icon } from '../../components/Icon';
import './AddPersonScreen.css'; // <-- PUDHU CSS FILE-A INGA IMPORT PANNIRUKKOM

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
    <div className="ap-container">
      <header className="ap-header">
        <button onClick={() => setPage(Page.GUIDE_MAIN)} className="ap-back-button">
          <Icon name="arrowLeft" className="ap-back-button-icon" />
        </button>
        <h1 className="ap-title">Add New Person</h1>
      </header>

      <div className="ap-body">
        <div className="ap-upload-box">
            {/* Design (8.png) la irukura Camera icon-ku badhilaga emoji use panrom */}
            <span className="ap-upload-icon">📸</span> 
            <p className="ap-upload-title">Tap to Upload Photo</p>
            <p className="ap-upload-subtitle">Choose a clear photo of the person's face.</p>
            <button className="ap-upload-button">Upload Photo</button>
        </div>

        <div className="ap-input-group">
          <label className="ap-label">Name</label>
          <input 
            type="text" 
            placeholder="Enter the individual's name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="ap-input-field" 
          />
        </div>
      </div>
      
      <div className="ap-footer">
        <button 
          onClick={handleSave}
          className="ap-save-button"
          disabled={!name}
        >
            Save to Database
        </button>
        {showSuccess && (
            <div className="ap-success-message">
                {name} added successfully
            </div>
        )}
      </div>
    </div>
  );
};