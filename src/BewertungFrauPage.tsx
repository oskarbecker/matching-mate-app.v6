import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import { questionsFrau } from './data/questions';
import { questionsHeteroFrauEn } from './data/questionsEn';

type Props = {
  answers: Record<string, boolean>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

export default function BewertungFrauPage({ answers, setAnswers }: Props) {
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const questions = language === 'de' ? questionsFrau : questionsHeteroFrauEn;
  const hotnessCore = questions.slice(0, 7);
  const hotnessRest = questions.slice(7, 12);
  const others = questions.slice(12);

  const toggle = (id: string) => {
    setAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '600px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        paddingTop: '2rem',
      }}
    >
      <div
        style={{
          background: '#ffb6c1',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>👩</div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: '#333' }}>
          {t('evaluation.woman')}
        </h1>
        <p style={{ fontSize: '1rem', color: '#555' }}>
          {t('evaluation.description')}
        </p>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: '15px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem',
        }}
      >
        <h3 style={{ 
          fontSize: '1.3rem', 
          marginBottom: '1rem', 
          color: '#ff69b4',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🔥 {t('evaluation.hotness.core')}
        </h3>
        {hotnessCore.map((q) => (
          <label
            key={q.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.8rem',
              margin: '0.5rem 0',
              background: answers[q.id] ? '#ffe6f2' : '#f9f9f9',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: answers[q.id] ? '2px solid #ff69b4' : '2px solid transparent',
            }}
          >
            <input
              type="checkbox"
              checked={!!answers[q.id]}
              onChange={() => toggle(q.id)}
              style={{
                marginRight: '0.8rem',
                transform: 'scale(1.2)',
                accentColor: '#ff69b4',
              }}
            />
            <span style={{ flex: 1, fontSize: '0.95rem' }}>{q.text}</span>
            <span
              style={{
                background: '#ff69b4',
                color: 'white',
                padding: '0.2rem 0.6rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
              }}
            >
              {q.points}P
            </span>
          </label>
        ))}
      </div>

      {hotnessRest.length > 0 && (
        <div
          style={{
            background: '#fff',
            borderRadius: '15px',
            padding: '1.5rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            marginBottom: '1.5rem',
          }}
        >
          <h3 style={{ 
            fontSize: '1.3rem', 
            marginBottom: '1rem', 
            color: '#ff8c00',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ✨ {t('evaluation.hotness.additional')}
          </h3>
          {hotnessRest.map((q) => (
            <label
              key={q.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.8rem',
                margin: '0.5rem 0',
                background: answers[q.id] ? '#fff4e6' : '#f9f9f9',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: answers[q.id] ? '2px solid #ff8c00' : '2px solid transparent',
              }}
            >
              <input
                type="checkbox"
                checked={!!answers[q.id]}
                onChange={() => toggle(q.id)}
                style={{
                  marginRight: '0.8rem',
                  transform: 'scale(1.2)',
                  accentColor: '#ff8c00',
                }}
              />
              <span style={{ flex: 1, fontSize: '0.95rem' }}>{q.text}</span>
              <span
                style={{
                  background: '#ff8c00',
                  color: 'white',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                }}
              >
                {q.points}P
              </span>
            </label>
          ))}
        </div>
      )}

      <div
        style={{
          background: '#fff',
          borderRadius: '15px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
        }}
      >
        <h3 style={{ 
          fontSize: '1.3rem', 
          marginBottom: '1rem', 
          color: '#4169e1',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          💎 {t('evaluation.other.values')}
        </h3>
        {others.map((q) => (
          <label
            key={q.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.8rem',
              margin: '0.5rem 0',
              background: answers[q.id] ? '#e6f0ff' : '#f9f9f9',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: answers[q.id] ? '2px solid #4169e1' : '2px solid transparent',
            }}
          >
            <input
              type="checkbox"
              checked={!!answers[q.id]}
              onChange={() => toggle(q.id)}
              style={{
                marginRight: '0.8rem',
                transform: 'scale(1.2)',
                accentColor: '#4169e1',
              }}
            />
            <span style={{ flex: 1, fontSize: '0.95rem' }}>{q.text}</span>
            <span
              style={{
                background: '#4169e1',
                color: 'white',
                padding: '0.2rem 0.6rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
              }}
            >
              {q.points}P
            </span>
          </label>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => navigate('/ergebnis')}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.2rem',
            background: '#ff69b4',
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            fontWeight: 'bold',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#ff1493';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#ff69b4';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          🎯 {t('evaluation.button.result')}
        </button>
      </div>
    </div>
  );
}