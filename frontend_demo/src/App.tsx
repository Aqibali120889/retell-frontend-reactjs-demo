import React, { useEffect, useState } from "react";
import "./App.css";
import { RetellWebClient } from "retell-client-js-sdk";

const agentId = "ENTER_YOUR_AGENT_ID";

interface RegisterCallResponse {
  access_token: string;
}

const retellWebClient = new RetellWebClient();

// Robot Avatar Component
const RobotAvatar: React.FC<{ isActive?: boolean }> = ({ isActive = false }) => {
  return (
    <div className="robot-avatar">
      <div className="robot-icon">
        🤖
      </div>
    </div>
  );
};

// Particle Field Component
const ParticleField: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const particleCount = 50;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="particle-field">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// Transcript Component
const Transcript: React.FC<{ transcript?: string; isListening?: boolean }> = ({ 
  transcript = "", 
  isListening = false 
}) => {
  return (
    <div className="transcript-panel">
      <div className="transcript-title">
        🎤 Neural Conversation Transcript
      </div>
      <div className="transcript-content">
        {transcript || (
          isListening 
            ? "Listening... Speak now to interact with the AI" 
            : "Press the microphone button to start your neural conversation"
        )}
        {isListening && (
          <span style={{ 
            animation: 'blink 1s infinite',
            marginLeft: '5px',
            color: '#00ffff'
          }}>
            ▋
          </span>
        )}
      </div>
    </div>
  );
};

// Mic Button Component
const MicButton: React.FC<{ isActive: boolean; onClick: () => void }> = ({ isActive, onClick }) => {
  return (
    <button 
      className={`mic-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
      title={isActive ? "Stop Recording" : "Start Recording"}
    >
      {isActive ? '⏹️' : '🎤'}
    </button>
  );
};

// Status Indicators Component
const StatusIndicators: React.FC<{ 
  isConnected: boolean; 
  isCalling: boolean; 
  isListening: boolean 
}> = ({ isConnected, isCalling, isListening }) => {
  return (
    <div className="status-indicators">
      <div className="status-indicator">
        <div className={`status-dot ${isConnected ? '' : 'inactive'}`}></div>
        <span>Neural Link</span>
      </div>
      <div className="status-indicator">
        <div className={`status-dot ${isCalling ? '' : 'inactive'}`}></div>
        <span>AI Active</span>
      </div>
      <div className="status-indicator">
        <div className={`status-dot ${isListening ? '' : 'inactive'}`}></div>
        <span>Voice Input</span>
      </div>
    </div>
  );
};

const App = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  // Initialize the SDK
  useEffect(() => {
    retellWebClient.on("call_started", () => {
      console.log("call started");
      setIsListening(true);
    });
    
    retellWebClient.on("call_ended", () => {
      console.log("call ended");
      setIsCalling(false);
      setIsListening(false);
    });
    
    // When agent starts talking for the utterance
    // useful for animation
    retellWebClient.on("agent_start_talking", () => {
      console.log("agent_start_talking");
    });
    
    // When agent is done talking for the utterance
    // useful for animation
    retellWebClient.on("agent_stop_talking", () => {
      console.log("agent_stop_talking");
    });
    
    // Real time pcm audio bytes being played back, in format of Float32Array
    // only available when emitRawAudioSamples is true
    retellWebClient.on("audio", (audio) => {
      // console.log(audio);
    });
    
    // Update message such as transcript
    // You can get transcrit with update.transcript
    // Please note that transcript only contains last 5 sentences to avoid the payload being too large
    retellWebClient.on("update", (update) => {
      // console.log(update);
      if (update.transcript) {
        setTranscript(update.transcript);
      }
    });
    
    retellWebClient.on("metadata", (metadata) => {
      // console.log(metadata);
    });
    
    retellWebClient.on("error", (error) => {
      console.error("An error occurred:", error);
      // Stop the call
      retellWebClient.stopCall();
      setIsConnected(false);
    });
  }, []);

  const toggleConversation = async () => {
    if (isCalling) {
      retellWebClient.stopCall();
    } else {
      const registerCallResponse = await registerCall(agentId);
      if (registerCallResponse.access_token) {
        retellWebClient
          .startCall({
            accessToken: registerCallResponse.access_token,
          })
          .catch(console.error);
        setIsCalling(true); // Update button to "Stop" when conversation starts
      }
    }
  };

  async function registerCall(agentId: string): Promise<RegisterCallResponse> {
    try {
      // Update the URL to match the new backend endpoint you created
      const response = await fetch("http://localhost:8080/create-web-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: agentId, // Pass the agentId as agent_id
          // You can optionally add metadata and retell_llm_dynamic_variables here if needed
          // metadata: { your_key: "your_value" },
          // retell_llm_dynamic_variables: { variable_key: "variable_value" }
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data: RegisterCallResponse = await response.json();
      return data;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }

  return (
    <div className="App">
      <ParticleField />
      
      <header className="neural-header">
        <h1 className="neural-title">NEURAL AI INTERFACE</h1>
      </header>

      <div className="neural-interface">
        <RobotAvatar isActive={isCalling} />
        
        <Transcript 
          transcript={transcript}
          isListening={isListening}
        />
        
        <MicButton 
          isActive={isCalling}
          onClick={toggleConversation}
        />
        
        <StatusIndicators 
          isConnected={isConnected}
          isCalling={isCalling}
          isListening={isListening}
        />
      </div>
    </div>
  );
};

export default App;
