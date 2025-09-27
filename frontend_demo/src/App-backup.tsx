import React from "react";
import "./App.css";
import { useRetell } from "./hooks/useRetell";
import Scene from "./components/canvas/Scene";
import CosmicBackground from "./components/CosmicBackground";
import Transcript from "./components/ui/Transcript";
import ActionButtons from "./components/ui/ActionButtons";
import Credits from "./components/ui/Credits";

const App = () => {
  const { isCalling, isListening, isSpeaking, transcript, toggleCall } = useRetell();

  return (
    <div className="App">
      {/* Cosmic particle background */}
      <CosmicBackground />
      
      {/* 3D Scene with robot */}
      <Scene isListening={isListening} isSpeaking={isSpeaking} />
      
      {/* UI Components */}
      <Transcript 
        transcript={transcript} 
        isVisible={isCalling && transcript.length > 0} 
      />
      
      <ActionButtons
        isCalling={isCalling}
        isListening={isListening}
        isSpeaking={isSpeaking}
        onToggleCall={toggleCall}
      />
      
      <Credits />
      
      {/* Cinematic vignette overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.4) 100%)',
          pointerEvents: 'none',
          zIndex: 500,
        }}
      />
    </div>
  );
};

export default App;