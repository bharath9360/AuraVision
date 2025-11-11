
import React from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';

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
    <div className="min-h-screen bg-iris-bg flex flex-col p-4 md:p-6 text-iris-text-primary">
      <header className="relative flex items-center justify-center py-4">
        <button onClick={() => setPage(Page.GUIDE_MAIN)} className="absolute left-0 top-1/2 -translate-y-1/2">
            <Icon name="arrowLeft" className="w-6 h-6" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-center">Alex's Activity History</h1>
      </header>

      <main className="flex-grow overflow-y-auto space-y-8 mt-4">
        {/* Detected People Section */}
        <div>
            <h2 className="text-sm font-semibold text-iris-text-secondary mb-2 uppercase px-2">Detected People</h2>
            <div className="space-y-2">
                {detectedPeople.map((person, index) => (
                    <div key={index} className="bg-iris-surface rounded-xl p-4 flex items-center">
                        <img src={person.avatar} alt={person.name} className="w-12 h-12 rounded-full mr-4"/>
                        <div className="flex-grow">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{person.name}</h3>
                                <p className="text-xs text-iris-text-secondary">{person.time}</p>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-sm text-iris-text-secondary">{person.location}</p>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                    person.category === 'Known' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'
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
            <h2 className="text-sm font-semibold text-iris-text-secondary mb-2 uppercase px-2">Voice Commands</h2>
            <div className="space-y-2">
                {voiceHistory.map((command, index) => (
                     <div key={index} className="bg-iris-surface rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center">
                            <Icon name="microphone" className="w-5 h-5 mr-4 text-iris-text-secondary"/>
                            <p className="italic">"{command.text}"</p>
                        </div>
                        <p className="text-xs text-iris-text-secondary">{command.time}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Last Location */}
        <div>
            <h2 className="text-sm font-semibold text-iris-text-secondary mb-2 uppercase px-2">Last Known Location</h2>
            <div className="bg-iris-surface rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold">{lastLocation.address}</p>
                    <p className="text-xs text-iris-text-secondary">{lastLocation.time}</p>
                </div>
                 <div className="aspect-video bg-iris-surface-light rounded-lg overflow-hidden">
                     <iframe
                        title="Last Known Location Map"
                        className="w-full h-full border-0"
                        src={`https://www.google.com/maps/embed/v1/view?key=${process.env.API_KEY}&center=${lastLocation.lat},${lastLocation.lon}&zoom=15&maptype=satellite`}
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