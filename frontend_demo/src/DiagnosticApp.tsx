import React, { useEffect } from 'react';

function DiagnosticApp() {
  useEffect(() => {
    console.log('DiagnosticApp mounted successfully!');
    console.log('React version:', React.version);
    console.log('Window object:', window);
    console.log('Document ready:', document.readyState);
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#1a1a2e',
      color: '#00d4ff',
      minHeight: '100vh',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      fontSize: '18px'
    }}>
      <h1 style={{ 
        fontSize: '48px',
        textAlign: 'center',
        marginBottom: '30px',
        background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        🧠 Diagnostic Mode
      </h1>
      
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          ✅ <strong>React App Loaded Successfully</strong>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          ✅ <strong>CSS Styles Applied</strong>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          ✅ <strong>JavaScript Execution Working</strong>
        </div>
        
        <div style={{ marginBottom: '30px' }}>
          📊 <strong>Current Status:</strong>
          <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <li>React Version: {React.version}</li>
            <li>Environment: {process.env.NODE_ENV}</li>
            <li>Timestamp: {new Date().toISOString()}</li>
          </ul>
        </div>
        
        <div style={{ 
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          border: '2px solid rgba(0, 212, 255, 0.3)',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3>🔍 Debug Information</h3>
          <p>If you can see this page, React is working correctly!</p>
          <p>Check the browser console (F12) for any error messages.</p>
        </div>

        <button 
          onClick={() => {
            console.log('Button clicked!');
            alert('Button test successful! 🎉');
          }}
          style={{
            backgroundColor: 'rgba(0, 212, 255, 0.2)',
            border: '2px solid #00d4ff',
            borderRadius: '25px',
            color: '#00d4ff',
            padding: '15px 30px',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'block',
            margin: '20px auto'
          }}
        >
          🧪 Test Interaction
        </button>

        <div style={{ 
          textAlign: 'center',
          marginTop: '30px',
          opacity: 0.7,
          fontSize: '14px'
        }}>
          Neural AI Diagnostic Interface • React {React.version}
        </div>
      </div>
    </div>
  );
}

export default DiagnosticApp;