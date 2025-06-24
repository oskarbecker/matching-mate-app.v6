import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';
import type { RelationshipType } from './types';

type Props = {
  setRelationshipType: (type: RelationshipType) => void;
};

export default function RelationshipTypePage({ setRelationshipType }: Props) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleTypeSelection = (type: RelationshipType) => {
    setRelationshipType(type);
    
    switch (type) {
      case 'hetero':
        navigate('/bewertung-mann');
        break;
      case 'gay':
        navigate('/bewertung-gay-1');
        break;
      case 'lesbian':
        navigate('/bewertung-lesbian-1');
        break;
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: '2rem',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
        🏳️‍🌈 {t('relationship.title')}
      </h1>

      <div
        style={{
          background: '#f0f8ff',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
        }}
      >
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6', marginBottom: '2rem' }}>
          {t('relationship.description')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            onClick={() => handleTypeSelection('hetero')}
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
            👫 {t('relationship.hetero')}
          </button>

          <button
            onClick={() => handleTypeSelection('gay')}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              background: '#4169e1',
              color: '#fff',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              fontWeight: 'bold',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#1e3a8a';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#4169e1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            👬 {t('relationship.gay')}
          </button>

          <button
            onClick={() => handleTypeSelection('lesbian')}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              background: '#9932cc',
              color: '#fff',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              fontWeight: 'bold',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#7b2d8e';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#9932cc';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            👭 {t('relationship.lesbian')}
          </button>
        </div>
      </div>
    </div>
  );
}