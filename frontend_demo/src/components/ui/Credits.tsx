import React from 'react';
import { motion } from 'framer-motion';

const Credits: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        padding: '12px 16px',
        fontSize: '12px',
        color: 'var(--text-secondary)',
      }}
    >
      <p style={{ margin: 0, marginBottom: '4px' }}>
        <strong>3D Robot Model:</strong> by YarikLegendary
      </p>
      <p style={{ margin: 0, marginBottom: '4px' }}>
        <strong>License:</strong> CC-BY-4.0
      </p>
      <p style={{ margin: 0 }}>
        <strong>Powered by:</strong> Retell AI SDK
      </p>
    </motion.div>
  );
};

export default Credits;