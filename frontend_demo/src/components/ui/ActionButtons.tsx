import React from 'react';
import { motion } from 'framer-motion';

interface ActionButtonsProps {
  isCalling: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  onToggleCall: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  isCalling,
  isListening,
  isSpeaking,
  onToggleCall,
}) => {
  const getButtonText = () => {
    if (!isCalling) return 'Start Conversation';
    if (isSpeaking) return 'AI Speaking...';
    if (isListening) return 'Listening...';
    return 'End Conversation';
  };

  const getButtonColor = () => {
    if (!isCalling) return 'var(--accent-blue)';
    if (isSpeaking) return 'var(--accent-purple)';
    if (isListening) return 'var(--accent-pink)';
    return '#ff4444';
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
      }}
    >
      <motion.button
        onClick={onToggleCall}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isCalling
            ? `0 0 30px ${getButtonColor()}40`
            : '0 0 20px rgba(0, 217, 255, 0.3)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          padding: '16px 32px',
          fontSize: '18px',
          fontWeight: '600',
          color: '#ffffff',
          background: `linear-gradient(135deg, ${getButtonColor()}80, ${getButtonColor()}40)`,
          border: `2px solid ${getButtonColor()}`,
          borderRadius: '50px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          minWidth: '200px',
          textAlign: 'center' as const,
        }}
      >
        {getButtonText()}
      </motion.button>

      {isCalling && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            top: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-secondary)',
            fontSize: '14px',
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: getButtonColor(),
            }}
          />
          Status: {isSpeaking ? 'AI is speaking' : 'Listening for your voice'}
        </motion.div>
      )}
    </div>
  );
};

export default ActionButtons;