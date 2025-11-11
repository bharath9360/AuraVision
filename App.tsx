
import React, { useState } from 'react';
import { Page, UserType } from './types';
import { WelcomeScreen } from './screens/WelcomeScreen/WelcomeScreen';
import { LoginScreen } from './screens/LoginScreen/LoginScreen';
import { GuideLoginScreen } from './screens/GuideLoginScreen/GuideLoginScreen';
import { PairingScreen } from './screens/PairingScreen/PairingScreen';
import { VisuallyImpairedMain } from './screens/VisuallyImpairedMain/VisuallyImpairedMain';
import { EmergencyAlert } from './screens/EmergencyAlert/EmergencyAlert';
import { GuideMain } from './screens/GuideMain/GuideMain';
import { AddPersonScreen } from './screens/AddPersonScreen/AddPersonScreen';
import { SettingsScreen } from './screens/SettingsScreen/SettingsScreen';
import { RegistrationScreen } from './screens/RegistrationScreen/RegistrationScreen';
import { HelpScreen } from './screens/HelpScreen/HelpScreen';
import { GuideRegistrationScreen } from './screens/RegistrationScreen/GuideRegistrationScreen';
import { GuideAiChatScreen } from './screens/GuideAiChatScreen/GuideAiChatScreen';
import { HistoryScreen } from './screens/HistoryScreen/HistoryScreen';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.WELCOME);
  const [userType, setUserType] = useState<UserType | null>(null);

  const renderPage = () => {
    switch (page) {
      case Page.WELCOME:
        return <WelcomeScreen setPage={setPage} setUserType={setUserType} />;
      case Page.IMPAIRED_LOGIN:
        return <LoginScreen setPage={setPage} />;
       case Page.ACCESSIBILITY_OPTIONS: // For now, just route to login
        return <LoginScreen setPage={setPage} />;
      case Page.GUIDE_LOGIN:
        return <GuideLoginScreen setPage={setPage} />;
      case Page.PAIRING:
        return <PairingScreen setPage={setPage} />;
      case Page.IMPAIRED_MAIN:
        return <VisuallyImpairedMain setPage={setPage} />;
      case Page.GUIDE_MAIN:
        return <GuideMain setPage={setPage} />;
      case Page.EMERGENCY_ALERT:
        return <EmergencyAlert setPage={setPage} />;
      case Page.ADD_PERSON:
        return <AddPersonScreen setPage={setPage} />;
      case Page.SETTINGS:
        return <SettingsScreen setPage={setPage} />;
      case Page.REGISTER:
        return <RegistrationScreen setPage={setPage} />;
      case Page.GUIDE_REGISTER:
        return <GuideRegistrationScreen setPage={setPage} />;
      case Page.HELP:
        return <HelpScreen setPage={setPage} />;
      case Page.GUIDE_AI_CHAT:
        return <GuideAiChatScreen setPage={setPage} />;
      case Page.HISTORY:
        return <HistoryScreen setPage={setPage} />;
      default:
        return <WelcomeScreen setPage={setPage} setUserType={setUserType} />;
    }
  };

  return <div className="font-sans max-w-2xl mx-auto bg-iris-bg min-h-screen shadow-2xl shadow-iris-primary-blue/10">{renderPage()}</div>;
};

export default App;