// screens/GuideAiChatScreen.tsx

import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Page, Message } from '../../types';
import { Icon } from '../../components/Icon';
import './GuideAiChatScreen.css'; // <-- PUDHU CSS FILE-A INGA IMPORT PANNIRUKKOM

// === INTHA LINE-A MAATHIRUKKEN ===
// Mothalla API Key-a check panrom
const apiKey = process.env.API_KEY;
// ================================

interface GuideAiChatScreenProps {
  setPage: (page: Page) => void;
}

export const GuideAiChatScreen: React.FC<GuideAiChatScreenProps> = ({ setPage }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'AI Assistant', text: "Hello! I'm your guide assistant. How can I help you support your user today?", timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // === INTHA LINE-GALA MAATHIRUKKEN ===
  // API Key irundha mattum 'ai'-a create pannu, illana null aakidu
  const ai = apiKey ? new GoogleGenAI({ apiKey: apiKey }) : null;
  // ===================================

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    // === INTHA CODE-A PUTHUSA SERTHURUKKEN ===
    // Page load aanathum, API key illana error message kaatrom
    if (!ai) {
      // Message munnadiye illana mattum serkkanum
      if (messages.length < 2) {
          setMessages(prev => [
            ...prev,
            { 
              sender: 'AI Assistant', 
              text: "Error: GEMINI_API_KEY missing. I cannot connect to the AI. Please ask your app developer to fix this.", 
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
            }
          ]);
      }
    }
    // ==========================================

  }, [messages, ai]); // 'ai'-a inga serthukonga

  const handleSendMessage = async () => {
    // === INTHA CHECK-A PUTHUSA SERTHURUKKEN ===
    // 'ai' variable sariya create aagalana, function-a stop pannidrom
    if (!inputText.trim() || isLoading || !ai) {
      if (!ai) {
        console.error("AI is not initialized. Check API Key.");
      }
      return;
    }
    // ==========================================

    const userMessage: Message = {
      sender: 'You',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsLoading(true);

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are an AI assistant for a guide helping a visually impaired person. The guide's question is: "${currentInput}". Provide a helpful, empathetic, and concise response.`,
        });
        const responseText = response.text;
        
        const aiResponse: Message = {
            sender: 'AI Assistant',
            text: responseText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, aiResponse]);

    } catch (error) {
      console.error("Error generating content:", error);
      const errorMessage: Message = {
        sender: 'AI Assistant',
        text: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="gac-container">
      <header className="gac-header">
        <button onClick={() => setPage(Page.GUIDE_MAIN)} className="gac-back-button">
            <Icon name="arrowLeft" className="gac-back-button-icon" />
        </button>
        <div>
          <h1 className="gac-title">AI Assistant</h1>
        </div>
      </header>

      <main className="gac-chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message-row ${msg.sender === 'You' ? 'chat-message-row-user' : ''}`}>
             {msg.sender === 'AI Assistant' && (
                <div className="gac-avatar-ai">
                    <Icon name="sparkles" className="gac-avatar-ai-icon"/>
                </div>
             )}
             <div className={`chat-message-content ${msg.sender === 'You' ? 'chat-message-content-user' : ''}`}>
                <div className={`chat-message-header ${msg.sender === 'You' ? 'chat-message-header-user' : ''}`}>
                    <p className="chat-sender-name">{msg.sender}</p>
                    <p className="chat-timestamp">{msg.timestamp}</p>
                </div>
                 <p className={`chat-bubble ${msg.sender === 'You' ? 'chat-bubble-user' : 'chat-bubble-ai'}`}>{msg.text}</p>
             </div>
             {msg.sender === 'You' && (
                 <img src="https://picsum.photos/seed/guide/40/40" alt="User avatar" className="chat-avatar-user"/>
             )}
          </div>
        ))}
        {isLoading && (
            <div className="chat-message-row">
                <div className="gac-avatar-ai">
                    <Icon name="sparkles" className="gac-avatar-ai-icon"/>
                </div>
                <div className="loading-bubble">
                    <div className="loading-dots">
                        <div className="loading-dot loading-dot-1"></div>
                        <div className="loading-dot loading-dot-2"></div>
                        <div className="loading-dot loading-dot-3"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </main>

      <footer className="gac-footer">
        <div className="gac-input-container">
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask for assistance..."
                rows={1}
                className="gac-textarea"
                disabled={isLoading || !ai} // <-- Key illanalum disable pannidrom
            />
            <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim() || !ai} // <-- Key illanalum disable pannidrom
                className="gac-send-button"
            >
                <Icon name="paperAirplane" className="gac-send-button-icon"/>
            </button>
        </div>
      </footer>
    </div>
  );
};