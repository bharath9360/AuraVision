import React, { useState } from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';
import { Toggle } from '../components/Toggle';

interface SettingsScreenProps {
  setPage: (page: Page) => void;
}

const SettingsItem: React.FC<{ icon: string, label: string, children: React.ReactNode, isNav?: boolean }> = ({ icon, label, children, isNav }) => (
  <div className="flex items-center justify-between bg-iris-surface rounded-xl p-4">
    <div className="flex items-center">
      <div className="w-8 h-8 flex items-center justify-center mr-4 text-iris-text-secondary"><Icon name={icon} className="w-6 h-6"/></div>
      <span className="font-medium">{label}</span>
    </div>
    <div className="flex items-center">
      {children}
      {isNav && <div className="text-iris-text-tertiary ml-4"><Icon name="arrowRight" className="w-5 h-5"/></div>}
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
    <div className="min-h-screen bg-iris-bg flex flex-col p-4 md:p-6 text-iris-text-primary">
      <header className="relative flex items-center justify-center py-4">
        <button onClick={() => setPage(Page.IMPAIRED_MAIN)} className="absolute left-0 top-1/2 -translate-y-1/2">
            <Icon name="arrowLeft" className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Settings & Profile</h1>
      </header>

      <main className="flex-grow overflow-y-auto space-y-8 mt-4">
        {/* Profile Section */}
        <div className="flex items-center bg-iris-surface rounded-xl p-4">
            <Icon name="userCircle" className="w-16 h-16 text-iris-text-secondary mr-4"/>
            <div>
                <h2 className="text-xl font-semibold">Alex Ray</h2>
                <p className="text-iris-text-secondary">alex.ray@email.com</p>
            </div>
            <button className="ml-auto text-iris-primary-blue font-semibold">Edit</button>
        </div>
        
        <SettingsItem icon="lock" label="Change Password" isNav>
          <div></div>
        </SettingsItem>

        {/* Device Management */}
        <div>
            <h3 className="text-iris-text-secondary font-semibold mb-2 px-2 text-sm uppercase">Device Management</h3>
            <div className="flex items-center justify-between bg-iris-surface rounded-xl p-4">
                <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center mr-4 text-iris-text-secondary"><Icon name="glasses" className="w-6 h-6"/></div>
                    <span className="font-medium">IRIS Glass Connected</span>
                </div>
                <button className="text-iris-primary-blue font-semibold">Unpair</button>
            </div>
        </div>

        {/* Preferences */}
        <div>
            <h3 className="text-iris-text-secondary font-semibold mb-2 px-2 text-sm uppercase">Preferences</h3>
            <div className="space-y-2">
                <SettingsItem icon="moon" label="Dark Mode">
                    <Toggle checked={darkMode} onChange={setDarkMode} />
                </SettingsItem>
                <SettingsItem icon="haptic" label="Haptic Feedback">
                    <Toggle checked={haptic} onChange={setHaptic} />
                </SettingsItem>
                <div className="bg-iris-surface rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-8 h-8 flex items-center justify-center mr-4 text-iris-text-secondary"><Icon name="speaker" className="w-6 h-6"/></div>
                            <span className="font-medium">Voice Narration Speed</span>
                        </div>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={narrationSpeed}
                        onChange={(e) => setNarrationSpeed(Number(e.target.value))}
                        className="w-full h-2 bg-iris-surface-light rounded-lg appearance-none cursor-pointer mt-4"
                    />
                </div>
            </div>
        </div>

         {/* Notifications */}
        <div>
            <h3 className="text-iris-text-secondary font-semibold mb-2 px-2 text-sm uppercase">Notifications</h3>
            <div className="space-y-2">
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
            <h3 className="text-iris-text-secondary font-semibold mb-2 px-2 text-sm uppercase">Support & Legal</h3>
            <div className="space-y-2">
                <SettingsItem icon="question" label="Help Center" isNav><div></div></SettingsItem>
                <SettingsItem icon="document" label="Terms of Service" isNav><div></div></SettingsItem>
                <SettingsItem icon="shield" label="Privacy Policy" isNav><div></div></SettingsItem>
            </div>
        </div>
        
        <div className="py-4">
             <button onClick={() => setPage(Page.WELCOME)} className="w-full bg-iris-surface text-iris-accent-red font-bold py-3 rounded-xl">
                Logout
            </button>
        </div>

      </main>
    </div>
  );
};