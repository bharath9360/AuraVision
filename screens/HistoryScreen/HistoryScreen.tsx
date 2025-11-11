// screens/HistoryScreen.tsx

import React from 'react';
import { Page } from '../../types';
import { Icon } from '../../components/Icon';
import './HistoryScreen.css'; // <-- PUDHU CSS FILE-A INGA IMPORT PANNIRUKKOM

interface HistoryScreenProps {
  setPage: (page: Page) => void;
}

const detectedPeople = [
    { name: 'Jane Doe', category: 'Known', location: 'Central Park Entrance', time: '11:45 AM', avatar: 'https://picsum.photos/seed/jane/80/80' },
    { name: 'Unknown Person', category: 'Unknown', location: '5th Ave & E 60th St', time: '11:42 AM', avatar: 'https://picsum.photos/seed/unknown1/80/80' },
    { name: 'John Smith', category: 'Known', location: 'Coffee Shop on Madison', time: '11:20 AM', avatar: 'https://picsum.photos/seed/john/80/80' },
];

const voiceHistory = [
    { text: "What's the weather like?", time: '11:50 AM' },
    { text: "Describe what's in front of me.", time: '11:41 AM' },
    { text: "Is this crosswalk safe to cross?", time: '11:40 AM' },
    { text: "Call my guide.", time: '11:15 AM' },
];

const lastLocation = {
    address: 'Central Park, New York, NY',
    time: '11:52 AM',
    lat: 40.785091,
    lon: -73.968285,
};


export const HistoryScreen: React.FC<HistoryScreenProps> = ({ setPage }) => {
  return (
    <div className="hs-container">
      <header className="hs-header">
        <button onClick={() => setPage(Page.GUIDE_MAIN)} className="hs-back-button">
            <Icon name="arrowLeft" className="hs-back-button-icon" />
        </button>
        <h1 className="hs-title">Alex's Activity History</h1>
      </header>

      <main className="hs-main">
        {/* Detected People Section */}
        <div>
            <h2 className="hs-section-title">Detected People</h2>
            <div className="hs-section-content">
                {detectedPeople.map((person, index) => (
                    <div key={index} className="hs-people-item">
                        <img src={person.avatar} alt={person.name} className="hs-people-avatar"/>
                        <div className="hs-people-info">
                            <div className="hs-people-info-header">
                                <h3 className="hs-people-name">{person.name}</h3>
                                <p className="hs-time">{person.time}</p>
                            </div>
                            <div className="hs-people-info-footer">
                                <p className="hs-location">{person.location}</p>
                                <span className={`hs-category-tag ${
                                    person.category === 'Known' ? 'hs-category-known' : 'hs-category-unknown'
                                }`}>
                                    {person.category}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Voice Command History */}
        <div>
            <h2 className="hs-section-title">Voice Commands</h2>
            <div className="hs-section-content">
                {voiceHistory.map((command, index) => (
                     <div key={index} className="hs-voice-item">
                        <div className="hs-voice-info">
                            <Icon name="microphone" className="hs-voice-icon"/>
                            <p className="hs-voice-text">"{command.text}"</p>
                        </div>
                        <p className="hs-time">{command.time}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Last Location */}
        <div>
            <h2 className="hs-section-title">Last Known Location</h2>
            <div className="hs-location-card">
                <div className="hs-location-header">
                    <p className="hs-location-address">{lastLocation.address}</p>
                    <p className="hs-time">{lastLocation.time}</p>
                </div>
                 <div className="hs-location-map-container">
                     <iframe
                        title="Last Known Location Map"
                        className="hs-map-iframe"
                        src={`https://maps.google.com/maps?q=$${lastLocation.lat},${lastLocation.lon}&z=15&output=embed&t=k`}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                 </div>
            </div>
        </div>
      </main>
    </div>
  );
};