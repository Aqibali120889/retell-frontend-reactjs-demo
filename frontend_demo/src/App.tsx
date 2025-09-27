import React from "react";
import "./App.css";
import CosmicBackground from "./components/CosmicBackground.tsx";
import Credits from "./components/ui/Credits.tsx";
import ActionButtons from "./components/ui/ActionButtons.tsx";
import Transcript from "./components/ui/Transcript.tsx";
import Scene from "./components/canvas/Scene.tsx";
import { useRetell } from "./hooks/useRetell.ts";

const App = () => {
  const { isCalling, isListening, isSpeaking, transcript, toggleCall } = useRetell();

  return (
    <div className="App">
      <CosmicBackground />
      <Credits />
      
      {/* 3D Scene with robot */}
      <Scene isListening={isListening} isSpeaking={isSpeaking} />
      
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
