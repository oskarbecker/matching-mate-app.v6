import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './contexts/LanguageContext';

export default function StartPage() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [showInfoPopup, setShowInfoPopup] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleInfoPopup = () => {
    setShowInfoPopup(!showInfoPopup);
  };

  const handleClickOutside = (event: React.MouseEvent) => {
    if (!(event.target as Element).closest('.info-container')) {
      setShowInfoPopup(false);
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
      onClick={handleClickOutside}
    >
      {/* Info-Symbol oben links */}
      <div 
        className="info-container"
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          cursor: 'pointer',
        }}
        onClick={toggleInfoPopup}
      >
        <div 
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'white',
            color: 'black',
            border: '2px solid black',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '15px',
            fontWeight: 700,
            fontFamily: 'sans-serif',
            userSelect: 'none',
          }}
        >
          i
        </div>
        {showInfoPopup && (
          <div
            style={{
              position: 'absolute',
              top: '30px',
              left: '0',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              padding: '8px 12px',
              borderRadius: '4px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              whiteSpace: 'nowrap',
            }}
          >
            © <a 
                href="https://oskarbecker.com" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  textDecoration: 'none',
                  color: '#007BFF',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Oskar Becker
              </a>
          </div>
        )}
      </div>

      {/* Language Switcher */}
      <div style={{ 
        position: 'absolute', 
        top: '1rem', 
        right: '1rem',
        display: 'flex',
        gap: '0.5rem'
      }}>
        <button
          onClick={() => setLanguage('de')}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            background: language === 'de' ? '#ff69b4' : '#f0f0f0',
            color: language === 'de' ? '#fff' : '#333',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: language === 'de' ? 'bold' : 'normal',
          }}
        >
          {t('language.german')}
        </button>
        <button
          onClick={() => setLanguage('en')}
          style={{
            padding: '0.5rem 1rem',
            fontSize: '0.9rem',
            background: language === 'en' ? '#ff69b4' : '#f0f0f0',
            color: language === 'en' ? '#fff' : '#333',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: language === 'en' ? 'bold' : 'normal',
          }}
        >
          {t('language.english')}
        </button>
      </div>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#333' }}>
        💕 {t('app.title')}
      </h1>

      <div
        style={{
          background: '#ffb6c1',
          borderRadius: '20px',
          padding: '3rem 2rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          marginBottom: '2rem',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎯</div>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#333' }}>
          {t('start.title')}
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6' }}>
          {t('start.description')}
        </p>
      </div>

      <button
        onClick={() => navigate('/relationship-type')}
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
        🚀 {t('start.button')}
      </button>
    </div>
  );
}