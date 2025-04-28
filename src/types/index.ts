export interface Dhikr {
  id: string;
  title: {
    en: string;
    id: string;
  };
  arabic: string;
  transliteration: string;
  translation: {
    en: string;
    id: string;
  };
  source: string;
  narrator?: string; // Added narrator property
  repetition: number;
  faedah: {
    en: string;
    id: string;
  };
  note: string;
  time: 'morning' | 'evening' | 'both';
}

export interface UserPreferences {
  darkMode: boolean;
  showTransliteration: boolean;
  showTranslation: boolean;
  fontSize: 'small' | 'medium' | 'large';
  language: 'en' | 'id';
}
