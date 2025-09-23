import React from 'react';

function SimpleApp() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: '#fff', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexDirection: 'column'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Neural AI</h1>
      <p style={{ fontSize: '1.2rem', opacity: 0.7 }}>Voice Intelligence Interface</p>
      <div style={{
        width: '100px',
        height: '100px',
        backgroundColor: '#00bcd4',
        borderRadius: '50%',
        margin: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem'
      }}>
        🤖
      </div>
    </div>
  );
}

export default SimpleApp;