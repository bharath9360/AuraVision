// screens/SettingsScreen.tsx

import React, { useState } from 'react';
import { Page } from '../../types';
import { Icon } from '../../components/Icon';
import { Toggle } from '../../components/Toggle';
import './SettingsScreen.css'; // <-- PUDHU CSS FILE-A INGA IMPORT PANNIRUKKOM

interface SettingsScreenProps {
  setPage: (page: Page) => void;
}

// SettingsItem component-a ingaye update pannidalam
const SettingsItem: React.FC<{ icon: string, label: string, children: React.ReactNode, isNav?: boolean }> = ({ icon, label, children, isNav }) => (
  <div className="ss-setting-item">
    <div className="ss-setting-item-label">
      <div className="ss-setting-item-icon-wrapper">
        <Icon name={icon} className="ss-setting-item-icon"/>
      </div>
      <span className="ss-setting-item-text">{label}</span>
    </div>
    <div className="ss-setting-item-action">
      {children}
      {isNav && (
        <div className="ss-setting-item-nav-icon-wrapper">
          <Icon name="arrowRight" className="ss-setting-item-nav-icon"/>
        </div>
      )}
    </div>
  </div>
);

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ setPage }) => {
    const [darkMode, setDarkMode] = useState(true);
    const [haptic, setHaptic] = useState(true);
    const [narrationSpeed, setNarrationSpeed] = useState(50);
    const [lowBatteryAlerts, setLowBatteryAlerts] = useState(true);
    const [connectionStatus, setConnectionStatus] = useState(false);
    const [guideMessages, setGuideMessages] = useState(true);

  return (
    <div className="ss-container">
      <header className="ss-header">
        <button onClick={() => setPage(Page.IMPAIRED_MAIN)} className="ss-back-button">
            <Icon name="arrowLeft" className="ss-back-button-icon" />
        </button>
        <h1 className="ss-title">Settings & Profile</h1>
      </header>

      <main className="ss-main">
        {/* Profile Section */}
        <div className="ss-profile-section">
            <Icon name="userCircle" className="ss-profile-avatar"/>
            <div className="ss-profile-info">
                <h2>Alex Ray</h2>
                <p>alex.ray@email.com</p>
            </div>
            <button className="ss-profile-edit-button">Edit</button>
        </div>
        
        {/* Change Password (indha item-a mattum thaniya vekkiren, unga design madhiriye) */}
        <SettingsItem icon="lock" label="Change Password" isNav>
          <div></div>
        </SettingsItem>

        {/* Device Management */}
        <div>
            <h3 className="ss-section-heading">Device Management</h3>
            {/* Idhu SettingsItem madhiri illa, custom-ah irukku */}
            <div className="ss-setting-item">
                <div className="ss-setting-item-label">
                    <div className="ss-setting-item-icon-wrapper">
                      <Icon name="glasses" className="ss-setting-item-icon"/>
                    </div>
                    <span className="ss-setting-item-text">IRIS Glass Connected</span>
                </div>
                <button className="ss-unpair-button">Unpair</button>
            </div>
        </div>

        {/* Preferences */}
        <div>
            <h3 className="ss-section-heading">Preferences</h3>
            <div className="ss-section-items-group">
                <SettingsItem icon="moon" label="Dark Mode">
                    <Toggle checked={darkMode} onChange={setDarkMode} />
                </SettingsItem>
                <SettingsItem icon="haptic" label="Haptic Feedback">
                    <Toggle checked={haptic} onChange={setHaptic} />
                </SettingsItem>
                
                {/* Voice Narration Speed Slider */}
                <div className="ss-slider-container">
                    <div className="ss-slider-header">
                        <div className="ss-setting-item-label"> {/* Re-using class from SettingsItem */}
                            <div className="ss-setting-item-icon-wrapper">
                              <Icon name="speaker" className="ss-setting-item-icon"/>
                            </div>
                            <span className="ss-setting-item-text">Voice Narration Speed</span>
                        </div>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={narrationSpeed}
                        onChange={(e) => setNarrationSpeed(Number(e.target.value))}
                        className="ss-slider"
                    />
                </div>
            </div>
        </div>

         {/* Notifications */}
        <div>
            <h3 className="ss-section-heading">Notifications</h3>
            <div className="ss-section-items-group">
                <SettingsItem icon="bell" label="Low Battery Alerts">
                    <Toggle checked={lowBatteryAlerts} onChange={setLowBatteryAlerts} />
                </SettingsItem>
                <SettingsItem icon="bell" label="Connection Status">
                    <Toggle checked={connectionStatus} onChange={setConnectionStatus} />
                </SettingsItem>
                <SettingsItem icon="bell" label="Guide Messages">
                    <Toggle checked={guideMessages} onChange={setGuideMessages} />
                </SettingsItem>
            </div>
        </div>

        {/* Support & Legal */}
        <div>
            <h3 className="ss-section-heading">Support & Legal</h3>
            <div className="ss-section-items-group">
                <SettingsItem icon="question" label="Help Center" isNav><div></div></SettingsItem>
                <SettingsItem icon="document" label="Terms of Service" isNav><div></div></SettingsItem>
                <SettingsItem icon="shield" label="Privacy Policy" isNav><div></div></SettingsItem>
            </div>
        </div>
        
        <div className="ss-logout-button-container">
             <button onClick={() => setPage(Page.WELCOME)} className="ss-logout-button">
                Logout
            </button>
        </div>

      </main>
    </div>
  );
};