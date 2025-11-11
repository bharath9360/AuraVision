import React, { useEffect, useRef, useState } from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';

interface GuideMainProps {
  setPage: (page: Page) => void;
}

export const GuideMain: React.FC<GuideMainProps> = ({ setPage }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamError, setStreamError] = useState<string | null>(null);

  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [address, setAddress] = useState<{ street: string; city: string; } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const watchIdRef = useRef<number | null>(null);
  const hasEverHadLocation = useRef(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } // Prefer rear camera
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        // Try without facingMode as a fallback for some browsers/devices
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              setStreamError(null); // Clear error if fallback succeeds
            }
        } catch (fallbackErr) {
            console.error("Fallback camera access error:", fallbackErr);
            setStreamError("Could not access the camera. Please check permissions and try again.");
        }
      }
    };

    startCamera();

    // Cleanup function
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  // Effect for geolocation
  useEffect(() => {
    const getCurrentPositionPromise = (options?: PositionOptions): Promise<GeolocationPosition> => {
      return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    };

    const fetchAndWatchLocation = async () => {
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by your browser.");
        setLocation({ lat: 37.7749, lon: -122.4194 }); // Fallback
        return;
      }

      let position: GeolocationPosition | null = null;
      try {
        position = await getCurrentPositionPromise({ enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
      } catch (highAccError) {
        console.warn(`High accuracy location failed. Trying low accuracy. Error: ${(highAccError as GeolocationPositionError).message}`);
        try {
          position = await getCurrentPositionPromise({ enableHighAccuracy: false, timeout: 20000, maximumAge: 60000 });
        } catch (lowAccError) {
          console.warn(`Low accuracy location also failed. Error: ${(lowAccError as GeolocationPositionError).message}`);
          if (!hasEverHadLocation.current) {
            setLocationError("Unable to get live location. Please check device settings. Showing default map.");
            setLocation({ lat: 37.7749, lon: -122.4194 }); // Fallback
          }
          return;
        }
      }
      
      if (position) {
        hasEverHadLocation.current = true;
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLocationError(null);

        if (watchIdRef.current !== null) {
          navigator.geolocation.clearWatch(watchIdRef.current);
        }
        watchIdRef.current = navigator.geolocation.watchPosition(
          (updatedPosition) => {
            setLocation({
              lat: updatedPosition.coords.latitude,
              lon: updatedPosition.coords.longitude,
            });
            setLocationError(null);
          },
          (watchError) => {
            console.warn(`Could not update live location: ${watchError.message}. Keeping last known position.`);
          },
          { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
        );
      }
    };

    fetchAndWatchLocation();

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);


  // Effect for reverse geocoding
  useEffect(() => {
    if (location) {
      const fetchAddress = async () => {
        try {
          // Using a more privacy-friendly and open reverse geocoder
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lon}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data && data.address) {
            setAddress({
              street: data.address.road || data.address.suburb || 'Unknown Street',
              city: data.address.city || data.address.town || data.address.state || 'Unknown City',
            });
          } else {
            setAddress({ street: 'Address not found', city: '' });
          }
        } catch (error) {
          console.error("Failed to fetch address:", error);
          setAddress({ street: 'Could not fetch address', city: '' });
        }
      };
      fetchAddress();
    }
  }, [location]);

  const renderLocationContent = () => {
    // Default state: loading until we have a location (real or fallback).
    if (!location) {
      return (
        <div className="flex flex-col items-center justify-center text-iris-text-secondary">
          <div className="w-8 h-8 border-4 border-iris-surface-light border-t-iris-primary-cyan rounded-full animate-spin mb-4"></div>
          <p>Acquiring location...</p>
        </div>
      );
    }

    // We have a location, render the map.
    return (
      <>
        <iframe
          title="Real-time Location Map"
          className="w-full h-full border-0"
          src={`https://www.google.com/maps/embed/v1/view?key=${process.env.API_KEY}&center=${location.lat},${location.lon}&zoom=15`}
          allowFullScreen
          loading="lazy"
        ></iframe>
        
        {/* Show address only if we have a real location and no errors */}
        {address && !locationError && (
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm p-3 rounded-lg text-left">
            <h3 className="font-bold">{address.street}</h3>
            <p className="text-sm text-iris-text-secondary">{address.city}</p>
          </div>
        )}

        {/* Show a prominent error overlay if we're on the fallback map */}
        {locationError && !hasEverHadLocation.current && (
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
                <p className="font-semibold text-white">{locationError}</p>
            </div>
        )}
      </>
    );
  };


  return (
    <div className="min-h-screen bg-iris-bg flex flex-col text-iris-text-primary">
      <header className="flex items-center justify-between p-4">
        <button onClick={() => setPage(Page.GUIDE_LOGIN)}>
          <Icon name="arrowLeft" className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="text-lg md:text-xl font-bold">Assisting: Alex Chen</h1>
        </div>
        <div className="w-6 h-6 flex items-center justify-center">
          <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-iris-bg"></div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto px-2 md:px-4 space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-iris-text-secondary mb-2 uppercase px-2">Live Feed</h2>
          <div className="relative aspect-video bg-iris-surface rounded-2xl overflow-hidden flex items-center justify-center">
             {streamError ? (
                <div className="text-center text-iris-text-secondary p-4">
                    <p>{streamError}</p>
                </div>
            ) : (
                <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
            )}
            
            {!streamError && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-sm">AI Analysis: "Crosswalk ahead, 2 people waiting. Green light for traffic."</p>
                </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-iris-text-secondary mb-2 uppercase px-2">Real-time Location</h2>
          <div className="relative aspect-video bg-iris-surface rounded-2xl overflow-hidden flex items-center justify-center text-center">
            {renderLocationContent()}
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-iris-surface-light p-2 grid grid-cols-4 gap-2 text-center text-sm text-iris-text-secondary">
        <button className="flex flex-col items-center p-2 rounded-lg hover:bg-iris-surface focus:bg-iris-surface focus:text-iris-primary-cyan">
          <Icon name="microphone" className="w-6 h-6 mb-1" />
          <span>Speak</span>
        </button>
        <button onClick={() => setPage(Page.GUIDE_AI_CHAT)} className="flex flex-col items-center p-2 rounded-lg hover:bg-iris-surface focus:bg-iris-surface focus:text-iris-primary-cyan">
          <Icon name="sparkles" className="w-6 h-6 mb-1" />
          <span>AI Assistant</span>
        </button>
        <button onClick={() => setPage(Page.ADD_PERSON)} className="flex flex-col items-center p-2 rounded-lg hover:bg-iris-surface focus:bg-iris-surface focus:text-iris-primary-cyan">
          <Icon name="userPlus" className="w-6 h-6 mb-1" />
          <span>Add Face</span>
        </button>
        <button onClick={() => setPage(Page.HISTORY)} className="flex flex-col items-center p-2 rounded-lg hover:bg-iris-surface focus:bg-iris-surface focus:text-iris-primary-cyan">
          <Icon name="clock" className="w-6 h-6 mb-1" />
          <span>History</span>
        </button>
      </footer>
    </div>
  );
};