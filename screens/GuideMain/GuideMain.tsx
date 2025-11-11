// screens/GuideMain.tsx

import React, { useEffect, useRef, useState } from 'react';
import { Page } from '../../types';
import { Icon } from '../../components/Icon';
import './GuideMain.css'; // <-- PUDHU CSS FILE-A INGA IMPORT PANNIRUKKOM

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

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

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

  useEffect(() => {
    if (location) {
      const fetchAddress = async () => {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lon}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          if (data && data.address) {
            setAddress({
              street: data.address.road || data.address.suburb || 'Market Street', // Fallback for design
              city: data.address.city || data.address.town || data.address.state || 'San Francisco, CA', // Fallback for design
            });
          } else {
            setAddress({ street: 'Market Street', city: 'San Francisco, CA' }); // Fallback for design
          }
        } catch (error) {
          console.error("Failed to fetch address:", error);
          setAddress({ street: 'Market Street', city: 'San Francisco, CA' }); // Fallback for design
        }
      };
      fetchAddress();
    }
  }, [location]);

  const renderLocationContent = () => {
    if (!location) {
      return (
        <div className="gm-location-loading">
          <div className="gm-spinner"></div>
          <p>Acquiring location...</p>
        </div>
      );
    }

    return (
      <>
        <iframe
          title="Real-time Location Map"
          className="gm-iframe"
          src={`https://maps.google.com/maps?q=${location.lat},${location.lon}&z=15&output=embed&t=k`} // Using Google Maps embed
          allowFullScreen
          loading="lazy"
        ></iframe>
        
        {address && !locationError && (
          <div className="gm-address-overlay">
            <h3>{address.street}</h3>
            <p>{address.city}</p>
          </div>
        )}

        {locationError && !hasEverHadLocation.current && (
           <div className="gm-location-error-overlay">
                <p>{locationError}</p>
            </div>
        )}
      </>
    );
  };

  return (
    <div className="gm-container">
      <header className="gm-header">
        <button onClick={() => setPage(Page.GUIDE_LOGIN)}>
          <Icon name="arrowLeft" className="gm-back-button-icon" />
        </button>
        <div>
          <h1 className="gm-header-title">Assisting: Alex Chen</h1>
        </div>
        <div className="gm-online-indicator-container">
          <div className="gm-online-dot"></div>
        </div>
      </header>

      <main className="gm-main">
        <div>
          <h2 className="gm-section-title">Live Feed</h2>
          <div className="gm-card">
             {streamError ? (
                <div className="gm-card-error">
                    <p>{streamError}</p>
                </div>
            ) : (
                <video ref={videoRef} className="gm-video" autoPlay playsInline muted />
            )}
            
            {!streamError && (
                <div className="gm-video-overlay">
                    <p>AI Analysis: "Crosswalk ahead, 2 people waiting. Green light for traffic."</p>
                </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="gm-section-title">Real-time Location</h2>
          <div className="gm-card">
            {renderLocationContent()}
          </div>
        </div>
      </main>

      <footer className="gm-footer">
        <button className="gm-footer-button">
          <Icon name="microphone" className="gm-footer-icon" />
          <span>Speak</span>
        </button>
        {/* Unga code-la idhu AI Chat-ku pogudhu, design-la 'Text' nu irukku */}
        <button onClick={() => setPage(Page.GUIDE_AI_CHAT)} className="gm-footer-button">
          <Icon name="sparkles" className="gm-footer-icon" />
          <span>AI Assistant</span>
        </button>
        <button onClick={() => setPage(Page.ADD_PERSON)} className="gm-footer-button">
          <Icon name="userPlus" className="gm-footer-icon" />
          <span>Add Face</span>
        </button>
        <button onClick={() => setPage(Page.HISTORY)} className="gm-footer-button">
          <Icon name="clock" className="gm-footer-icon" />
          <span>History</span>
        </button>
      </footer>
    </div>
  );
};