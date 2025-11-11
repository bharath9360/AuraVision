
import React, { useState, useRef, useEffect } from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';
import { Toggle } from '../components/Toggle';

interface PairingScreenProps {
  setPage: (page: Page) => void;
}

export const PairingScreen: React.FC<PairingScreenProps> = ({ setPage }) => {
    const [step1Done, setStep1Done] = useState(true);
    const [step2Done, setStep2Done] = useState(false);
    const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
    const [isScanning, setIsScanning] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        const startScan = async () => {
            if (isScanning) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                    // Simulate scanning
                    setTimeout(() => {
                        setStep2Done(true);
                        setIsScanning(false); 
                    }, 3000);
                } catch (err) {
                    console.error("Error accessing camera:", err);
                    alert("Could not access the camera. Please check permissions.");
                    setIsScanning(false);
                }
            }
        };
        startScan();

        return () => {
            // Cleanup: stop camera when component unmounts or isScanning becomes false
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
    }, [isScanning]);

    const handleScanClick = () => {
        setIsScanning(true);
    };

    const handleCancelScan = () => {
        setIsScanning(false);
    };
    
    if (isScanning) {
        return (
            <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
                <video ref={videoRef} autoPlay playsInline className="absolute top-0 left-0 w-full h-full object-cover"></video>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 flex flex-col items-center text-white">
                    <p className="text-lg font-semibold mb-4">Scan QR Code</p>
                    <div className="w-64 h-64 border-2 border-white/50 rounded-lg relative">
                        <div className="absolute -top-1 -left-1 w-10 h-10 border-t-4 border-l-4 border-iris-primary-cyan rounded-tl-lg"></div>
                        <div className="absolute -top-1 -right-1 w-10 h-10 border-t-4 border-r-4 border-iris-primary-cyan rounded-tr-lg"></div>
                        <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-4 border-l-4 border-iris-primary-cyan rounded-bl-lg"></div>
                        <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-4 border-r-4 border-iris-primary-cyan rounded-br-lg"></div>
                    </div>
                     <p className="mt-4 text-center px-8">Point your camera at the QR code displayed on your IRIS Glass.</p>
                </div>
                <button 
                    onClick={handleCancelScan} 
                    className="absolute bottom-10 bg-white/20 backdrop-blur-md text-white font-bold py-3 px-8 rounded-full z-10"
                >
                    Cancel
                </button>
            </div>
        );
    }

  return (
    <div className="min-h-screen bg-iris-bg flex flex-col p-4 md:p-6 text-iris-text-primary">
      <header className="relative flex items-center justify-center py-4">
        <button onClick={() => setPage(Page.IMPAIRED_LOGIN)} className="absolute left-0 top-1/2 -translate-y-1/2">
            <Icon name="arrowLeft" className="w-6 h-6" />
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-center">Pair Your IRIS Glass</h1>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center">
        <div className="flex items-center justify-center space-x-4 text-iris-accent-yellow my-8 md:my-12">
            <div className="w-20 h-20 bg-iris-surface-light rounded-2xl flex items-center justify-center">
                <Icon name="glasses" className="w-10 h-10"/>
            </div>
            <div className="text-2xl font-mono">...</div>
            <div className="w-20 h-20 bg-iris-surface-light rounded-2xl flex items-center justify-center">
                <span className="text-4xl">📱</span>
            </div>
        </div>

        <div className="w-full max-w-sm space-y-4">
            <div className="bg-iris-surface rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-iris-accent-yellow rounded-full flex items-center justify-center text-black font-bold text-lg mr-4">1</div>
                    <div>
                        <h2 className="font-semibold">Turn on your Glass</h2>
                        <p className="text-sm text-iris-text-secondary">Press and hold the power button.</p>
                    </div>
                </div>
                {step1Done && <Icon name="checkCircle" className="w-8 h-8 text-green-500"/>}
            </div>
             <div className="bg-iris-surface rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-iris-accent-yellow rounded-full flex items-center justify-center text-black font-bold text-lg mr-4">2</div>
                    <div>
                        <h2 className="font-semibold">Scan QR Code</h2>
                        <p className="text-sm text-iris-text-secondary">Point your phone's camera at the glass.</p>
                    </div>
                </div>
                {step2Done ? (
                     <Icon name="checkCircle" className="w-8 h-8 text-green-500"/>
                ) : (
                    <button onClick={handleScanClick} className="bg-iris-primary-cyan text-black font-semibold px-6 py-2 rounded-full">Scan</button>
                )}
            </div>
             <div className="bg-iris-surface rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-iris-accent-yellow rounded-full flex items-center justify-center text-black font-bold text-lg mr-4">3</div>
                    <div>
                        <h2 className="font-semibold">Enable Bluetooth</h2>
                        <p className="text-sm text-iris-text-secondary">Make sure Bluetooth is active.</p>
                    </div>
                </div>
                <Toggle checked={bluetoothEnabled} onChange={setBluetoothEnabled} />
            </div>
        </div>
      </div>
      
      <div className="w-full max-w-sm mx-auto space-y-4 pt-8 pb-4">
        <button onClick={() => setPage(Page.IMPAIRED_MAIN)} className="w-full bg-iris-primary-cyan text-black font-bold py-4 rounded-full transition-transform transform hover:scale-105">
            Find and Pair Device
        </button>
        <button onClick={() => setPage(Page.HELP)} className="w-full bg-iris-surface font-bold py-4 rounded-full">
            Need Help?
        </button>
      </div>
    </div>
  );
};
