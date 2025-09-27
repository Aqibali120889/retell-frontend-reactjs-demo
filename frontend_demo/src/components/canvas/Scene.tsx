import React from 'react';

interface SceneProps {
  isListening: boolean;
  isSpeaking: boolean;
}

const Scene: React.FC<SceneProps> = ({ isListening, isSpeaking }) => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)',
      zIndex: 1,
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: isListening 
          ? 'radial-gradient(circle, rgba(0,217,255,0.3) 0%, rgba(0,217,255,0.1) 100%)'
          : isSpeaking 
          ? 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(139,92,246,0.1) 100%)'
          : 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        border: isListening 
          ? '2px solid #00d9ff'
          : isSpeaking 
          ? '2px solid #8b5cf6'
          : '2px solid rgba(255,255,255,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: isListening || isSpeaking ? 'pulse 2s infinite' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          fontSize: '60px',
          filter: isListening || isSpeaking ? 'drop-shadow(0 0 10px currentColor)' : 'none'
        }}>
          🤖
        </div>
      </div>
      
      <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
        {isListening && 'Listening...'}
        {isSpeaking && 'AI Speaking...'}
        {!isListening && !isSpeaking && 'AI Companion'}
      </div>
      
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default Scene;