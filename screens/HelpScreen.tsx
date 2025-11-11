
import React, { useState } from 'react';
import { Page } from '../types';
import { Icon } from '../components/Icon';

interface HelpScreenProps {
  setPage: (page: Page) => void;
}

const AccordionItem: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-iris-surface rounded-xl overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-4 focus:outline-none focus:bg-iris-surface-light"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
          <Icon name={icon} className="w-6 h-6 mr-4 text-iris-primary-cyan" />
          <span className="font-semibold text-iris-text-primary">{title}</span>
        </div>
        <Icon name="arrowRight" className={`w-5 h-5 text-iris-text-secondary transition-transform duration-300 ${isOpen ? 'transform rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="p-4 border-t border-iris-surface-light text-iris-text-secondary space-y-2">
          {children}
        </div>
      )}
    </div>
  );
};

export const HelpScreen: React.FC<HelpScreenProps> = ({ setPage }) => {
  return (
    <div className="min-h-screen bg-iris-bg flex flex-col p-4 md:p-6 text-iris-text-primary">
      <header className="relative flex items-center justify-center py-4">
        <button onClick={() => setPage(Page.IMPAIRED_LOGIN)} className="absolute left-0 top-1/2 -translate-y-1/2">
          <Icon name="arrowLeft" className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-center">Help & Support</h1>
      </header>

      <main className="flex-grow overflow-y-auto space-y-4 mt-4">
        <AccordionItem title="About Your IRIS Glass" icon="glasses">
          <p><strong>Powering On/Off:</strong> Press and hold the power button on the right arm of the glasses for 3 seconds.</p>
          <p><strong>Charging:</strong> Use the included USB-C cable to charge your device. A full charge takes about 90 minutes.</p>
          <p><strong>Status Light:</strong> A solid white light means the device is on. A blinking blue light means it's in pairing mode.</p>
        </AccordionItem>
        
        <AccordionItem title="About the IRIS App" icon="logo">
          <p><strong>Signing In:</strong> Use the email and password you created during registration. You can also sign in with your phone number.</p>
          <p><strong>Pairing:</strong> To connect your glasses, go to the 'Pair Your IRIS Glass' screen after logging in and follow the on-screen instructions.</p>
          <p><strong>Main Screen:</strong> Tap the microphone button to ask IRIS to describe what your glasses see.</p>
        </AccordionItem>

        <AccordionItem title="Troubleshooting" icon="question">
          <p><strong>Device won't turn on:</strong> Make sure your glasses are charged. If the battery is dead, charge for at least 15 minutes before trying again.</p>
          <p><strong>Can't pair with phone:</strong> Ensure Bluetooth is enabled on your phone. Try restarting both your phone and your IRIS Glass.</p>
          <p><strong>App is not responding:</strong> Close the app completely and reopen it. Check for app updates in your app store.</p>
        </AccordionItem>

        <AccordionItem title="Contact Support" icon="speaker">
           <p>If you need more assistance, our support team is here to help.</p>
           <p><strong>Email:</strong> <a href="mailto:bharathkkbharath3@gmail.com" className="text-iris-primary-cyan underline">bharathkkbharath3@gmail.com</a>, <a href="mailto:jumanaafra301@gamil.com" className="text-iris-primary-cyan underline">jumanaafra301@gamil.com</a></p>
           <p><strong>Phone:</strong> <a href="tel:+919360294463" className="text-iris-primary-cyan underline">+91 9360294463</a>, <a href="tel:+917094978520" className="text-iris-primary-cyan underline">+91 7094978520</a></p>
        </AccordionItem>
      </main>
    </div>
  );
};