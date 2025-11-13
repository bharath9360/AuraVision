// screens/SettingsScreen/tsx (PREFERENCES CLICK-A SARI PANNIRUKKOM)

import React, { useState, useEffect } from 'react';
import { Page } from '../../types';
import { Icon } from '../../components/Icon';
import { Toggle } from '../../components/Toggle';
import './SettingsScreen.css';

interface SettingsScreenProps {
  setPage: (page: Page, props?: any) => void;
}

// Settings Item-a button-a maathirukkom
const SettingsItem: React.FC<{ 
  icon: string, 
  label: string, 
  children: React.ReactNode, 
  isNav?: boolean,
  onClick?: () => void 
}> = ({ icon, label, children, isNav, onClick }) => {
  
  const content = (
    <>
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
    </>
  );

  // onClick irundha, atha 'button'-a maathidrom
  if (onClick) {
    return (
      <button onClick={onClick} className="ss-setting-item ss-setting-button">
        {content}
      </button>
    );
  }

  // onClick illana, 'div'-a vechirom (Slider-ku)
  return (
    <div className="ss-setting-item">
      {content}
    </div>
  );
};

// Ithuthaan unga settings-a browser-la save panni vekkum
const useStickyState = (defaultValue: any, key: string) => {
  const [value, setValue] = useState(() => {
    const stickyValue = localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ setPage }) => {
    
    // === PROFILE EDIT LOGIC ===
    const [isEditing, setIsEditing] = useState(false);
    const [profileName, setProfileName] = useStickyState('Alex Ray', 'userProfileName');
    const [profileEmail, setProfileEmail] = useStickyState('alex.ray@email.com', 'userProfileEmail');
    const [tempName, setTempName] = useState(profileName);
    const [tempEmail, setTempEmail] = useState(profileEmail);

    const handleEditSave = () => {
      if (isEditing) {
        setProfileName(tempName);
        setProfileEmail(tempEmail);
      } else {
        setTempName(profileName);
        setTempEmail(profileEmail);
      }
      setIsEditing(!isEditing);
    };

    // === DEVICE MANAGEMENT LOGIC ===
    const [isDeviceConnected, setIsDeviceConnected] = useStickyState(true, 'isDeviceConnected');
    
    const handleToggleConnection = () => {
      if (isDeviceConnected) {
        if (window.confirm('Are you sure you want to unpair your IRIS Glass?')) {
          setIsDeviceConnected(false);
        }
      } else {
        setPage(Page.PAIRING);
      }
    };

    // === PREFERENCES & NOTIFICATIONS LOGIC ===
    const [settings, setSettings] = useStickyState({
      darkMode: true,
      haptic: true,
      narrationSpeed: 50,
      lowBatteryAlerts: true,
      connectionStatus: false,
      guideMessages: true,
    }, 'userAppSettings');

    // Toggle-ku mattum
    const handleToggleSetting = (key: string) => {
      setSettings((prev: any) => ({
        ...prev,
        [key]: !prev[key],
      }));
    };

    // Slider-ku mattum
    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSettings((prev: any) => ({
        ...prev,
        narrationSpeed: Number(e.target.value),
      }));
    };

    // === SUPPORT & LEGAL NAVIGATION LOGIC ===
    const openLegalPage = (type: 'help' | 'terms' | 'privacy') => {
      let props: any = { 
        title: '',
        content: '',
        returnPage: Page.SETTINGS
      };

      if (type === 'help') {
        props.title = 'Help Center';
        props.content = `Welcome to the IRIS Help Center.\n\nFor questions about your IRIS Glass, including setup, charging, and troubleshooting, please refer to the "Help & Support" section available from the main login screen.\n\nIf you are a Guide, you can use the AI Assistant in your app to get quick answers about supporting your user.\n\nFor immediate assistance or safety concerns, please contact our support team at:\nEmail: support@projectiris.ai\nPhone: +1 (800) 555-IRIS`;
      } 
      else if (type === 'terms') {
        props.title = 'Terms of Service';
        props.content = `Last Updated: [Date]\n\nPlease read these Terms of Service ("Terms") carefully before using the Project IRIS application (the "Service") operated by AuraVision.\n\n1. Acceptance of Terms: By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.\n\n2. The Service: Project IRIS provides AI-powered visual assistance for visually impaired users and a companion app for their guides. You agree not to misuse the Service or use it for any illegal activities.\n\n3. Privacy: Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal data.\n\n4. Limitation of Liability: The Service is provided "as is." AuraVision and its suppliers will not be liable for any damages that arise from the use of or inability to use the Service. Use with caution and always be aware of your physical surroundings.`;
      } 
      else if (type === 'privacy') {
        props.title = 'Privacy Policy';
        props.content = `Last Updated: [Date]\n\nYour privacy is critical to us. This policy explains what data Project IRIS collects and how it's used.\n\n1. Data We Collect: We collect information you provide during registration (Name, Email, Device ID). When in use, the Service processes video and audio data from the IRIS Glass to provide descriptions and assistance. Location data is shared with your Guide when the app is active.\n\n2. How We Use Data: Data is used solely to provide and improve the Service. Video/audio streams are processed by our AI and are not stored long-term, except for short snippets for troubleshooting if you opt-in. Location data is only shared with your designated Guide.\n\n3. Data Sharing: We do not sell your personal data. We only share data with your explicit consent (e.g., sharing your location with your Guide).\n\n4. Security: We use industry-standard measures to protect your data.`;
      }

      setPage(Page.LEGAL_TEXT, props);
    };


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
            
            {isEditing ? (
              <div className="ss-profile-info-edit">
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)}
                  className="ss-profile-input-name"
                />
                <input 
                  type="email" 
                  value={tempEmail} 
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="ss-profile-input-email"
                />
              </div>
            ) : (
              <div className="ss-profile-info">
                <h2>{profileName}</h2>
                <p>{profileEmail}</p>
              </div>
            )}
            
            <button onClick={handleEditSave} className="ss-profile-edit-button">
              {isEditing ? 'Save' : 'Edit'}
            </button>
        </div>
        
        {/* Change Password */}
        <SettingsItem 
          icon="lock" 
          label="Change Password" 
          isNav
          onClick={() => setPage(Page.CHANGE_PASSWORD)}
        >
          <div></div>
        </SettingsItem>

        {/* Device Management */}
        <div>
            <h3 className="ss-section-heading">Device Management</h3>
            <div className="ss-setting-item">
                <div className="ss-setting-item-label">
                    <div className="ss-setting-item-icon-wrapper">
                      <Icon name="glasses" className="ss-setting-item-icon"/>
                    </div>
                    <span className="ss-setting-item-text">
                      {isDeviceConnected ? 'IRIS Glass Connected' : 'No Device Paired'}
                    </span>
                </div>
                <button 
                  onClick={handleToggleConnection} 
                  className={isDeviceConnected ? "ss-unpair-button" : "ss-pair-button"}
                >
                  {isDeviceConnected ? 'Unpair' : 'Pair Device'}
                </button>
            </div>
        </div>

        {/* === PREFERENCES (IPPO ROW-A CLICK PANNALAM) === */}
        <div>
            <h3 className="ss-section-heading">Preferences</h3>
            <div className="ss-section-items-group">
                <SettingsItem 
                  icon="moon" 
                  label="Dark Mode"
                  onClick={() => handleToggleSetting('darkMode')} 
                >
                    <Toggle checked={settings.darkMode} onChange={() => handleToggleSetting('darkMode')} />
                </SettingsItem>
                <SettingsItem 
                  icon="haptic" 
                  label="Haptic Feedback"
                  onClick={() => handleToggleSetting('haptic')} 
                >
                    <Toggle checked={settings.haptic} onChange={() => handleToggleSetting('haptic')} />
                </SettingsItem>
                
                {/* Voice Narration Speed Slider (Ithukku onClick theva illa) */}
                <div className="ss-slider-container">
                    <div className="ss-slider-header">
                        <div className="ss-setting-item-label">
                            <div className="ss-setting-item-icon-wrapper">
                              <Icon name="speaker" className="ss-setting-item-icon"/>
                            </div>
                            <span className="ss-setting-item-text">Voice Narration Speed</span>
                        </div>
                        <span className="ss-slider-value">{settings.narrationSpeed}%</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={settings.narrationSpeed}
                        onChange={handleSliderChange}
                        className="ss-slider"
                    />
                </div>
            </div>
        </div>

         {/* === NOTIFICATIONS (IPPO ROW-A CLICK PANNALAM) === */}
        <div>
            <h3 className="ss-section-heading">Notifications</h3>
            <div className="ss-section-items-group">
                <SettingsItem 
                  icon="bell" 
                  label="Low Battery Alerts"
                  onClick={() => handleToggleSetting('lowBatteryAlerts')} 
                >
                    <Toggle checked={settings.lowBatteryAlerts} onChange={() => handleToggleSetting('lowBatteryAlerts')} />
                </SettingsItem>
                <SettingsItem 
                  icon="bell" 
                  label="Connection Status"
                  onClick={() => handleToggleSetting('connectionStatus')} 
                >
                    <Toggle checked={settings.connectionStatus} onChange={() => handleToggleSetting('connectionStatus')} />
                </SettingsItem>
                <SettingsItem 
                  icon="bell" 
                  label="Guide Messages"
                  onClick={() => handleToggleSetting('guideMessages')} 
                >
                    <Toggle checked={settings.guideMessages} onChange={() => handleToggleSetting('guideMessages')} />
                </SettingsItem>
            </div>
        </div>

        {/* Support & Legal */}
        <div>
            <h3 className="ss-section-heading">Support & Legal</h3>
            <div className="ss-section-items-group">
                <SettingsItem icon="question" label="Help Center" isNav onClick={() => openLegalPage('help')}><div></div></SettingsItem>
                <SettingsItem icon="document" label="Terms of Service" isNav onClick={() => openLegalPage('terms')}><div></div></SettingsItem>
                <SettingsItem icon="shield" label="Privacy Policy" isNav onClick={() => openLegalPage('privacy')}><div></div></SettingsItem>
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