import React from 'react';

function DebugApp() {
  console.log('DebugApp rendering...');
  
  return (
    <div style={{ 
      backgroundColor: '#1a1a1a', 
      color: '#00bcd4', 
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🔧 Debug Mode - React is Working!</h1>
      <p>If you see this, React is rendering correctly.</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
      
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'rgba(0,188,212,0.1)', borderRadius: '10px' }}>
        <h2>Next: Loading Main Components</h2>
        <p>✅ React: Working</p>
        <p>✅ CSS: Applied</p>
        <p>⏳ 3D Components: Loading...</p>
      </div>
    </div>
  );
}

export default DebugApp;