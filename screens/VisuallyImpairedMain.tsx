import React, { useState, useEffect, useRef } from 'react';
import { Page, Message } from '../types';
import { Icon } from '../components/Icon';
import { GoogleGenAI } from '@google/genai';

// Mock service for Gemini API
const mockGeminiService = {
  async describeImage(prompt: string): Promise<string> {
    console.log("Mocking Gemini call for prompt:", prompt);
    // This is where you would put the actual Gemini API call.
    // We will just return a mocked response after a delay.
    return new Promise(resolve => {
      setTimeout(() => {
        if (prompt.toLowerCase().includes("what's in front of me")) {
           resolve("You are looking at a wooden desk with a laptop, a coffee mug, and a notebook on it. The laptop is open.");
        } else {
           resolve("I see a standard room interior. Please be more specific if you'd like more details.");
        }
      }, 2000);
    });
  }
};

interface VisuallyImpairedMainProps {
  setPage: (page: Page) => void;
}

export const VisuallyImpairedMain: React.FC<VisuallyImpairedMainProps> = ({ setPage }) => {
  const [messages, setMessages] = useState<Message[]>([
      { sender: 'You', text: "Describe what's in front of me.", timestamp: '10:31 AM' },
      { sender: 'IRIS', text: "You are looking at a wooden desk with a laptop, a coffee mug, and a notebook on it. The laptop is open.", timestamp: '10:31 AM' }
  ]);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSpeak = async () => {
    setIsListening(true);
    const newPrompt = "What's in front of me?"; // In a real app, this would come from speech-to-text
    
    const userMessage: Message = {
      sender: 'You',
      text: newPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Add a loading message for IRIS
    const loadingMessage: Message = {
      sender: 'IRIS',
      text: 'Thinking...',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      const responseText = await mockGeminiService.describeImage(newPrompt);
      const irisResponse: Message = {
        sender: 'IRIS',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
       setMessages(prev => [...prev.slice(0, -1), irisResponse]);
    } catch (error) {
      console.error("Error getting description:", error);
      const errorMessage: Message = {
        sender: 'IRIS',
        text: "I'm sorry, I couldn't process that. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev.slice(0, -1), errorMessage]);
    } finally {
        setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-iris-bg flex flex-col text-iris-text-primary">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">IRIS</h1>
        <div className="flex items-center space-x-4 text-iris-text-secondary">
          <span>🔋</span>
          <button onClick={() => setPage(Page.SETTINGS)}>
            <Icon name="settings" className="w-6 h-6"/>
          </button>
          <span>📶</span>
        </div>
      </header>

      <div className="relative flex-shrink-0 h-64 bg-gray-800 rounded-3xl m-4 overflow-hidden">
        <img src="https://picsum.photos/400/300?blur=2" alt="Blurred background" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center backdrop-blur-sm">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ping"></div>
                <div className="absolute inset-2 border-2 border-white/20 rounded-full animate-ping animation-delay-300"></div>
                <Icon name="eye" className="w-16 h-16 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <p className="mt-4 text-lg font-semibold">AI Vision Active</p>
        </div>
      </div>
      
      <main className="flex-grow overflow-y-auto px-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'You' ? 'justify-end' : ''}`}>
             {msg.sender === 'IRIS' && (
                <div className="w-10 h-10 bg-iris-surface rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="logo" className="w-6 h-6 text-iris-primary-cyan"/>
                </div>
             )}
             <div className={`max-w-xs sm:max-w-sm md:max-w-md ${msg.sender === 'You' ? 'text-right' : ''}`}>
                <div className={`flex items-baseline gap-2 ${msg.sender === 'You' ? 'justify-end' : ''}`}>
                    <p className="font-bold">{msg.sender}</p>
                    <p className="text-xs text-iris-text-secondary">{msg.timestamp}</p>
                </div>
                 <p className={`mt-1 p-3 rounded-2xl ${msg.sender === 'You' ? 'bg-iris-primary-blue' : 'bg-iris-surface'}`}>{msg.text}</p>
             </div>
             {msg.sender === 'You' && (
                 <img src="https://picsum.photos/seed/user/40/40" alt="User avatar" className="w-10 h-10 rounded-full flex-shrink-0"/>
             )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </main>

      <footer className="sticky bottom-0 bg-iris-bg p-4 flex items-center justify-center">
        <div className="relative flex items-center justify-center w-full max-w-sm mx-auto">
            <button
                onClick={handleSpeak}
                disabled={isListening}
                className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${isListening ? 'bg-blue-700 animate-pulse' : 'bg-iris-primary-blue'}`}
            >
                <Icon name="microphone" className="w-10 h-10 text-white" />
            </button>
            <p className="absolute bottom-0 translate-y-8 text-iris-text-secondary">Tap to Speak</p>
            <button onClick={() => setPage(Page.EMERGENCY_ALERT)} className="absolute right-0 w-16 h-16 bg-iris-accent-red rounded-full flex items-center justify-center text-white font-bold">
                SOS
            </button>
        </div>
      </footer>
    </div>
  );
};
