import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'de' | 'en';

interface TranslationKeys {
  // Start Page
  'app.title': string;
  'start.title': string;
  'start.description': string;
  'start.button': string;
  
  // Language Switch
  'language.german': string;
  'language.english': string;
  
  // Relationship Type Page
  'relationship.title': string;
  'relationship.description': string;
  'relationship.hetero': string;
  'relationship.gay': string;
  'relationship.lesbian': string;
  
  // Evaluation Pages
  'evaluation.man': string;
  'evaluation.woman': string;
  'evaluation.man1': string;
  'evaluation.man2': string;
  'evaluation.woman1': string;
  'evaluation.woman2': string;
  'evaluation.description': string;
  'evaluation.hotness.core': string;
  'evaluation.hotness.additional': string;
  'evaluation.other.values': string;
  'evaluation.button.next': string;
  'evaluation.button.evaluate.man2': string;
  'evaluation.button.evaluate.woman2': string;
  'evaluation.button.result': string;
  
  // Result Page
  'result.title': string;
  'result.perfect': string;
  'result.potential': string;
  'result.nomatch': string;
  'result.button.restart': string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationKeys) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');

  const t = (key: keyof TranslationKeys): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, TranslationKeys> = {
  de: {
    // Start Page
    'app.title': 'Matching-Mate-App',
    'start.title': 'Seid ihr ein Match?',
    'start.description': 'Findet heraus, wie gut ihr zusammenpasst! Bewertet euch gegenseitig und erhaltet euer persönliches Matching-Ergebnis.',
    'start.button': 'Jetzt starten',
    
    // Language Switch
    'language.german': 'Deutsch',
    'language.english': 'English',
    
    // Relationship Type Page
    'relationship.title': 'Beziehungstyp wählen',
    'relationship.description': 'Wählt euren Beziehungstyp aus, um die passenden Bewertungskriterien zu erhalten.',
    'relationship.hetero': 'Hetero',
    'relationship.gay': 'Schwul',
    'relationship.lesbian': 'Lesbisch',
    
    // Evaluation Pages
    'evaluation.man': 'Bewertung des Mannes',
    'evaluation.woman': 'Bewertung der Frau',
    'evaluation.man1': 'Bewertung von Mann 1',
    'evaluation.man2': 'Bewertung von Mann 2',
    'evaluation.woman1': 'Bewertung von Frau 1',
    'evaluation.woman2': 'Bewertung von Frau 2',
    'evaluation.description': 'Wähle die zutreffenden Eigenschaften aus',
    'evaluation.hotness.core': 'Hotness-Faktor (Kern)',
    'evaluation.hotness.additional': 'Hotness-Faktor (Zusatz)',
    'evaluation.other.values': 'Sonstige Werte',
    'evaluation.button.next': 'Weiter',
    'evaluation.button.evaluate.man2': 'Mann 2 bewerten',
    'evaluation.button.evaluate.woman2': 'Frau 2 bewerten',
    'evaluation.button.result': 'Ergebnis anzeigen',
    
    // Result Page
    'result.title': 'Matching-Übereinstimmung',
    'result.perfect': 'Ihr passt perfekt zusammen!',
    'result.potential': 'Es gibt Potenzial mit etwas Feinschliff.',
    'result.nomatch': 'Ihr seid leider kein Match!',
    'result.button.restart': 'Zurück zur Startseite',
  },
  en: {
    // Start Page
    'app.title': 'Matching-Mate-App',
    'start.title': 'Are you a match?',
    'start.description': 'Find out how well you match! Rate each other and get your personal matching result.',
    'start.button': 'Start now',
    
    // Language Switch
    'language.german': 'Deutsch',
    'language.english': 'English',
    
    // Relationship Type Page
    'relationship.title': 'Choose relationship type',
    'relationship.description': 'Select your relationship type to get the appropriate evaluation criteria.',
    'relationship.hetero': 'Hetero',
    'relationship.gay': 'Gay',
    'relationship.lesbian': 'Lesbian',
    
    // Evaluation Pages
    'evaluation.man': 'Evaluation of the man',
    'evaluation.woman': 'Evaluation of the woman',
    'evaluation.man1': 'Evaluation of man 1',
    'evaluation.man2': 'Evaluation of man 2',
    'evaluation.woman1': 'Evaluation of woman 1',
    'evaluation.woman2': 'Evaluation of woman 2',
    'evaluation.description': 'Select the applicable characteristics',
    'evaluation.hotness.core': 'Hotness factor (core)',
    'evaluation.hotness.additional': 'Hotness factor (additional)',
    'evaluation.other.values': 'Other values',
    'evaluation.button.next': 'Next',
    'evaluation.button.evaluate.man2': 'Evaluate man 2',
    'evaluation.button.evaluate.woman2': 'Evaluate woman 2',
    'evaluation.button.result': 'Show result',
    
    // Result Page
    'result.title': 'Matching compatibility',
    'result.perfect': 'You are a perfect match!',
    'result.potential': 'There is potential with some fine-tuning.',
    'result.nomatch': 'Unfortunately, you are not a match!',
    'result.button.restart': 'Back to start page',
  }
};