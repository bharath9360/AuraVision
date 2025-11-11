import React, { useEffect, useState } from 'react';
import { Page } from '../types';

interface EmergencyAlertProps {
  setPage: (page: Page) => void;
}

export const EmergencyAlert: React.FC<EmergencyAlertProps> = ({ setPage }) => {
  const [connecting, setConnecting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setConnecting(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-iris-accent-red flex flex-col items-center p-8 text-white">
      <h1 className="text-4xl font-bold mt-16 text-center">EMERGENCY ALERT</h1>
      
      <div className="flex flex-col items-center my-auto text-center">
        <img src="https://picsum.photos/seed/johndoe/80/80" alt="John Doe" className="w-20 h-20 rounded-full border-4 border-white mb-4" />
        <h2 className="text-2xl font-bold">John Doe has triggered an alert</h2>
        <p className="text-lg opacity-80 mt-1">📍 123 Main St, Anytown</p>
        
        <div className="w-full max-w-xs aspect-square bg-white/20 rounded-3xl mt-8 flex flex-col items-center justify-center">
          {connecting ? (
            <>
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4">Connecting to John's camera...</p>
            </>
          ) : (
             <video className="w-full h-full object-cover rounded-3xl" autoPlay loop muted>
                <source src="https://storage.googleapis.com/static.aiforge.studio/stock/pexels-kelly-2943184-1280x720-30fps.mp4" type="video/mp4" />
                Your browser does not support the video tag.
             </video>
          )}
        </div>
      </div>
      
      <div className="w-full max-w-sm space-y-4">
        <button className="w-full bg-white text-iris-accent-red font-bold py-4 rounded-full text-lg mt-8">
          📞 Call John
        </button>
        <button onClick={() => setPage(Page.WELCOME)} className="w-full bg-transparent border-2 border-white text-white font-bold py-4 rounded-full text-lg">
          Dismiss
        </button>
      </div>
    </div>
  );
};