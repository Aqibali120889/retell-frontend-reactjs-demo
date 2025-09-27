import React from 'react';
import { motion } from 'framer-motion';

interface TranscriptProps {
  transcript: string;
  isVisible: boolean;
}

const Transcript: React.FC<TranscriptProps> = ({ transcript, isVisible }) => {
  if (!transcript || !isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{
        position: 'fixed',
        bottom: '120px',
        left: '50%',
        transform: 'translateX(-50%)',
        maxWidth: '600px',
        width: '90%',
        padding: '20px 24px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        color: '#ffffff',
        fontSize: '16px',
        lineHeight: '1.5',
        textAlign: 'center',
        zIndex: 1000,
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          0 0 20px rgba(0, 217, 255, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1)
        `,
      }}
    >
      <motion.p
        key={transcript}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          margin: 0,
          fontWeight: 400,
          textShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
        }}
      >
        {transcript}
      </motion.p>
    </motion.div>
  );
};

export default Transcript;