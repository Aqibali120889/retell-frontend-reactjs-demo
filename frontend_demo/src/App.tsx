import React from "react";
import "./App.css";
import CosmicBackground from "./components/CosmicBackground.tsx";

const App = () => {
  return (
    <div className="App">
      <CosmicBackground />
      <h1 style={{ color: 'white', textAlign: 'center', marginTop: '40vh', position: 'relative', zIndex: 10 }}>
        Cinematic AI Companion Loading...
      </h1>
    </div>
  );
};

export default App;
