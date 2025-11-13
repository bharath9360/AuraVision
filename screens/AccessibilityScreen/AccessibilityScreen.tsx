// screens/AccessibilityScreen/AccessibilityScreen.tsx

import React, { useState } from 'react';
import { Page } from '../../types';
import { Icon } from '../../components/Icon';
import { Toggle } from '../../components/Toggle';
import './AccessibilityScreen.css'; // <-- Intha CSS file-a adutha step-la create pannuvom

interface AccessibilityScreenProps {
  setPage: (page: Page) => void;
}

export const AccessibilityScreen: React.FC<AccessibilityScreenProps> = ({ setPage }) => {
  // Antha Login page-la irundha state-a inga kondu vanthutom
  const [voiceNarration, setVoiceNarration] = useState(true);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="as-container">
      <header className="as-header">
        <button onClick={() => setPage(Page.WELCOME)} className="as-back-button">
          <Icon name="arrowLeft" className="as-back-button-icon" />
        </button>
        <h1 className="as-title">Accessibility Options</h1>
      </header>

      <main className="as-main">
        {/* Login page-la irundha 'accessibility-box'-a inga move pannitom */}
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
        
        <p className="as-info-text">
          You can change these settings at any time from the login screen or in-app settings.
        </p>

        <button onClick={() => setPage(Page.WELCOME)} className="as-done-button">
            Done
        </button>
      </main>
    </div>
  );
};