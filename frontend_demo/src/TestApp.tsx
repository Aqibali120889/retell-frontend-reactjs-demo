import React from 'react';

function TestApp() {
  return (
    <div style={{
      backgroundColor: 'blue',
      color: 'white',
      padding: '50px',
      fontSize: '24px',
      textAlign: 'center',
      minHeight: '100vh'
    }}>
      <h1>🎉 REACT APP IS WORKING! 🎉</h1>
      <p>If you can see this, React is running correctly!</p>
      <button 
        onClick={() => alert('Button clicked!')}
        style={{
          padding: '20px 40px',
          fontSize: '18px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Click Me to Test!
      </button>
    </div>
  );
}

export default TestApp;