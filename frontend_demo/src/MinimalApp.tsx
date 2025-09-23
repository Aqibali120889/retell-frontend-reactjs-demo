import React from 'react';

function MinimalApp() {
  return (
    <div style={{ 
      backgroundColor: 'white', 
      color: 'black', 
      padding: '20px',
      minHeight: '100vh',
      fontSize: '24px',
      fontFamily: 'Arial'
    }}>
      <h1>✅ React App is Working!</h1>
      <p>If you can see this, React is running correctly.</p>
      <div style={{ marginTop: '20px' }}>
        <p>Current time: {new Date().toLocaleTimeString()}</p>
        <button onClick={() => alert('Button works!')}>
          Test Button
        </button>
      </div>
    </div>
  );
}

export default MinimalApp;