import React from 'react';

const CosmicBackground: React.FC = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(0, 217, 255, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at center, rgba(20, 20, 50, 0.6) 0%, rgba(10, 10, 10, 1) 100%)
        `,
      }}
    />
  );
};

export default CosmicBackground;