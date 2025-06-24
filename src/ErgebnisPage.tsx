import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import { 
  questionsHeteroMann, 
  questionsHeteroFrau, 
  questionsGayMann, 
  questionsLesbischFrau, 
  type Question 
} from './data/questions';
import {
  questionsHeteroMannEn,
  questionsHeteroFrauEn,
  questionsGayMannEn,
  questionsLesbischFrauEn
} from './data/questionsEn';
import type { RelationshipType } from './types';

type Props = {
  relationshipType: RelationshipType;
  person1Answers: Record<string, boolean>;
  person2Answers: Record<string, boolean>;
  reset: () => void;
};

const ErgebnisPage: React.FC<Props> = ({
  relationshipType,
  person1Answers,
  person2Answers,
  reset,
}) => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getQuestionsForType = () => {
    if (language === 'de') {
      switch (relationshipType) {
        case 'hetero':
          return { person1: questionsHeteroMann, person2: questionsHeteroFrau };
        case 'gay':
          return { person1: questionsGayMann, person2: questionsGayMann };
        case 'lesbian':
          return { person1: questionsLesbischFrau, person2: questionsLesbischFrau };
        default:
          return { person1: questionsHeteroMann, person2: questionsHeteroFrau };
      }
    } else {
      switch (relationshipType) {
        case 'hetero':
          return { person1: questionsHeteroMannEn, person2: questionsHeteroFrauEn };
        case 'gay':
          return { person1: questionsGayMannEn, person2: questionsGayMannEn };
        case 'lesbian':
          return { person1: questionsLesbischFrauEn, person2: questionsLesbischFrauEn };
        default:
          return { person1: questionsHeteroMannEn, person2: questionsHeteroFrauEn };
      }
    }
  };

  const getScore = (answers: Record<string, boolean>, questions: Question[]) => {
    const core = questions.slice(0, 7);
    const rest = questions.slice(7, 12);
    const others = questions.slice(12);

    const hasAllCore = core.every((q) => answers[q.id]);

    const hotness = hasAllCore
      ? [...core, ...rest].reduce((sum, q) => sum + (answers[q.id] ? q.points : 0), 0)
      : 0;

    const values = others.reduce((sum, q) => sum + (answers[q.id] ? q.points : 0), 0);

    const total = hotness + values;
    return { hotness, values, total };
  };

  const { person1: questions1, person2: questions2 } = getQuestionsForType();
  const result1 = getScore(person1Answers, questions1);
  const result2 = getScore(person2Answers, questions2);

  const maxTotal = Math.max(
    questions1.reduce((s, q) => s + q.points, 0),
    questions2.reduce((s, q) => s + q.points, 0)
  );

  // New matching algorithm: 80%+ only if both have 15+ points
  const bothHaveMinimumPoints = result1.total >= 15 && result2.total >= 15;
  
  let matchPercent: number;
  
  if (!bothHaveMinimumPoints) {
    // If either person has less than 15 points, cap at 79%
    const difference = Math.abs(result1.total - result2.total);
    const basePercent = result1.total === 0 || result2.total === 0 ? 0 : Math.round(100 - (difference / maxTotal) * 100);
    matchPercent = Math.min(basePercent, 79);
  } else {
    // Both have 15+ points, calculate normally
    const difference = Math.abs(result1.total - result2.total);
    matchPercent = result1.total === 0 || result2.total === 0 ? 0 : Math.round(100 - (difference / maxTotal) * 100);
  }

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current >= matchPercent) {
        clearInterval(interval);
        setAnimatedPercent(matchPercent);
      } else {
        setAnimatedPercent(current);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [matchPercent]);

  const getEmotion = () => {
    if (matchPercent >= 80) return { emoji: '💕', message: t('result.perfect'), color: '#ffb6c1' };
    if (matchPercent >= 50) return { emoji: '😐', message: t('result.potential'), color: '#ffe680' };
    return { emoji: '💔', message: t('result.nomatch'), color: '#ffd6d6' };
  };

  const { emoji, message, color } = getEmotion();

  const getRelationshipEmoji = () => {
    switch (relationshipType) {
      case 'hetero': return '👫';
      case 'gay': return '👬';
      case 'lesbian': return '👭';
      default: return '💕';
    }
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        paddingTop: '2rem',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        🎯 {t('result.title')} {getRelationshipEmoji()}
      </h1>

      <div
        style={{
          background: color,
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ fontSize: '4rem' }}>{emoji}</div>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>
          {animatedPercent}%
        </div>
        <div style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{message}</div>

        {/* Progress Bar */}
        <div
          style={{
            height: '20px',
            width: '100%',
            background: '#eee',
            borderRadius: '10px',
            overflow: 'hidden',
            marginBottom: '1rem',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${animatedPercent}%`,
              background: '#ff69b4',
              transition: 'width 0.5s ease-in-out',
            }}
          />
        </div>
      </div>

      <button
        onClick={() => {
          reset();
          navigate('/');
        }}
        style={{
          marginTop: '2rem',
          padding: '0.8rem 1.5rem',
          fontSize: '1rem',
          background: '#ff69b4',
          color: '#fff',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          transition: 'background 0.3s',
        }}
      >
        🔄 {t('result.button.restart')}
      </button>
    </div>
  );
};

export default ErgebnisPage;