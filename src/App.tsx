import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import StartPage from './StartPage';
import RelationshipTypePage from './RelationshipTypePage';
import BewertungMannPage from './BewertungMannPage';
import BewertungFrauPage from './BewertungFrauPage';
import BewertungGay1Page from './BewertungGay1Page';
import BewertungGay2Page from './BewertungGay2Page';
import BewertungLesbian1Page from './BewertungLesbian1Page';
import BewertungLesbian2Page from './BewertungLesbian2Page';
import ErgebnisPage from './ErgebnisPage';
import type { RelationshipType } from './types';

export default function App() {
  const [relationshipType, setRelationshipType] = useState<RelationshipType>('hetero');
  const [person1Answers, setPerson1Answers] = useState<Record<string, boolean>>({});
  const [person2Answers, setPerson2Answers] = useState<Record<string, boolean>>({});

  const reset = () => {
    setPerson1Answers({});
    setPerson2Answers({});
    setRelationshipType('hetero');
  };

  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route 
          path="/relationship-type" 
          element={
            <RelationshipTypePage 
              setRelationshipType={setRelationshipType}
            />
          } 
        />
        
        {/* Hetero routes */}
        <Route
          path="/bewertung-mann"
          element={
            <BewertungMannPage
              answers={person1Answers}
              setAnswers={setPerson1Answers}
            />
          }
        />
        <Route
          path="/bewertung-frau"
          element={
            <BewertungFrauPage
              answers={person2Answers}
              setAnswers={setPerson2Answers}
            />
          }
        />
        
        {/* Gay routes */}
        <Route
          path="/bewertung-gay-1"
          element={
            <BewertungGay1Page
              answers={person1Answers}
              setAnswers={setPerson1Answers}
            />
          }
        />
        <Route
          path="/bewertung-gay-2"
          element={
            <BewertungGay2Page
              answers={person2Answers}
              setAnswers={setPerson2Answers}
            />
          }
        />
        
        {/* Lesbian routes */}
        <Route
          path="/bewertung-lesbian-1"
          element={
            <BewertungLesbian1Page
              answers={person1Answers}
              setAnswers={setPerson1Answers}
            />
          }
        />
        <Route
          path="/bewertung-lesbian-2"
          element={
            <BewertungLesbian2Page
              answers={person2Answers}
              setAnswers={setPerson2Answers}
            />
          }
        />
        
        <Route
          path="/ergebnis"
          element={
            <ErgebnisPage
              relationshipType={relationshipType}
              person1Answers={person1Answers}
              person2Answers={person2Answers}
              reset={reset}
            />
          }
        />
      </Routes>
    </LanguageProvider>
  );
}