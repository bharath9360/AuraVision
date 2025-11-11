// screens/VisuallyImpairedMain.tsx

import React, { useState, useEffect, useRef } from 'react';
import { Page, Message } from '../../types';
import { Icon } from '../../components/Icon';
// import { GoogleGenAI } from '@google/genai'; // Original code had this, but mock is used
import './VisuallyImpairedMain.css'; // <-- PUDHU CSS FILE-A INGA IMPORT PANNIRUKKOM

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
    <div className="vim-container">
      <header className="vim-header">
        <h1 className="vim-header-title">IRIS</h1>
        <div className="vim-header-icons">
          <span>🔋</span> {/* Battery Icon */}
          <button onClick={() => setPage(Page.SETTINGS)}>
            <Icon name="settings" className="vim-icon-settings"/>
          </button>
          <span>📶</span> {/* Wifi Icon */}
        </div>
      </header>

      <div className="vision-active-container">
        <img src="https://picsum.photos/400/300?blur=2" alt="Blurred background" className="vision-active-bg-img"/>
        <div className="vision-active-overlay">
            <div className="vision-active-pulse-container">
                <div className="vision-active-pulse-ring vision-active-pulse-ring-1"></div>
                <div className="vision-active-pulse-ring vision-active-pulse-ring-2"></div>
                <Icon name="eye" className="vision-active-eye-icon" />
            </div>
            <p className="vision-active-text">AI Vision Active</p>
        </div>
      </div>
      
      <main className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message-row ${msg.sender === 'You' ? 'chat-message-row-user' : ''}`}>
             {msg.sender === 'IRIS' && (
                <div className="chat-avatar-iris">
                    <Icon name="logo" className="chat-avatar-iris-icon"/>
                </div>
             )}
             <div className={`chat-message-content ${msg.sender === 'You' ? 'chat-message-content-user' : ''}`}>
                <div className={`chat-message-header ${msg.sender === 'You' ? 'chat-message-header-user' : ''}`}>
                    <p className="chat-sender-name">{msg.sender}</p>
                    <p className="chat-timestamp">{msg.timestamp}</p>
                </div>
                 <p className={`chat-bubble ${msg.sender === 'You' ? 'chat-bubble-user' : 'chat-bubble-iris'}`}>{msg.text}</p>
             </div>
             {msg.sender === 'You' && (
                 <img src="https://picsum.photos/seed/user/40/40" alt="User avatar" className="chat-avatar-user"/>
             )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </main>

      <footer className="vim-footer">
        <div className="footer-content">
            <button
                onClick={handleSpeak}
                disabled={isListening}
                className={`speak-button ${isListening ? 'speak-button-listening' : 'speak-button-default'}`}
            >
                <Icon name="microphone" className="speak-button-icon" />
            </button>
            <p className="speak-button-label">Tap to Speak</p>
            <button onClick={() => setPage(Page.EMERGENCY_ALERT)} className="sos-button">
                SOS
            </button>
        </div>
      </footer>
    </div>
  );
};