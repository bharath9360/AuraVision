import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Page, Message } from '../types';
import { Icon } from '../components/Icon';

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

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

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
    <div className="min-h-screen bg-iris-bg flex flex-col text-iris-text-primary">
      <header className="relative flex items-center justify-center p-4">
        <button onClick={() => setPage(Page.GUIDE_MAIN)} className="absolute left-4 top-1/2 -translate-y-1/2">
            <Icon name="arrowLeft" className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="text-xl font-bold">AI Assistant</h1>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto px-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'You' ? 'justify-end' : ''}`}>
             {msg.sender === 'AI Assistant' && (
                <div className="w-10 h-10 bg-iris-surface rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="sparkles" className="w-6 h-6 text-iris-primary-cyan"/>
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
                 <img src="https://picsum.photos/seed/guide/40/40" alt="User avatar" className="w-10 h-10 rounded-full flex-shrink-0"/>
             )}
          </div>
        ))}
        {isLoading && (
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-iris-surface rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="sparkles" className="w-6 h-6 text-iris-primary-cyan"/>
                </div>
                <div className="mt-1 p-3 rounded-2xl bg-iris-surface">
                    <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-iris-text-secondary rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-iris-text-secondary rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-iris-text-secondary rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={chatEndRef} />
      </main>

      <footer className="sticky bottom-0 bg-iris-surface-light/80 backdrop-blur-sm p-4">
        <div className="flex items-center space-x-2">
            <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask for assistance..."
                rows={1}
                className="flex-grow bg-iris-surface p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-iris-primary-blue resize-none"
                disabled={isLoading}
            />
            <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputText.trim()}
                className="w-12 h-12 bg-iris-primary-blue rounded-full flex items-center justify-center text-white flex-shrink-0 disabled:opacity-50"
            >
                <Icon name="paperAirplane" className="w-6 h-6"/>
            </button>
        </div>
      </footer>
    </div>
  );
};