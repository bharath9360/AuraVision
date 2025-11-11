
export enum UserType {
  VISUALLY_IMPAIRED = 'VISUALLY_IMPAIRED',
  GUIDE = 'GUIDE',
}

export enum Page {
  WELCOME,
  IMPAIRED_LOGIN,
  GUIDE_LOGIN,
  PAIRING,
  IMPAIRED_MAIN,
  GUIDE_MAIN,
  EMERGENCY_ALERT,
  ADD_PERSON,
  SETTINGS,
  ACCESSIBILITY_OPTIONS,
  REGISTER,
  HELP,
  GUIDE_REGISTER,
  GUIDE_AI_CHAT,
  HISTORY,
}

export interface Message {
  sender: 'You' | 'IRIS' | 'AI Assistant';
  text: string;
  timestamp: string;
}