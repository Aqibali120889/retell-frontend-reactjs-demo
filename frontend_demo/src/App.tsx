import React, { useEffect, useState } from "react";
import "./App.css";
import { RetellWebClient } from "retell-client-js-sdk";

const agentId = "ENTER_YOUR_AGENT_ID";

interface RegisterCallResponse {
  access_token: string;
}

const retellWebClient = new RetellWebClient();

const App = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Ready');
  const [error, setError] = useState<string | null>(null);

  // Initialize the SDK
  useEffect(() => {
    retellWebClient.on("call_started", () => {
      console.log("call started");
      setConnectionStatus('Connected');
      setIsLoading(false);
    });
    
    retellWebClient.on("call_ended", () => {
      console.log("call ended");
      setIsCalling(false);
      setConnectionStatus('Call Ended');
      setIsLoading(false);
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
    });
    
    retellWebClient.on("metadata", (metadata) => {
      // console.log(metadata);
    });
    
    retellWebClient.on("error", (error) => {
      console.error("An error occurred:", error);
      setError(`Connection error: ${error.message || 'Unknown error'}`);
      setConnectionStatus('Error');
      setIsLoading(false);
      setIsCalling(false);
      // Stop the call
      retellWebClient.stopCall();
    });
  }, []);

  const toggleConversation = async () => {
    if (isCalling) {
      retellWebClient.stopCall();
      setConnectionStatus('Disconnecting...');
    } else {
      setIsLoading(true);
      setError(null);
      setConnectionStatus('Connecting...');
      
      try {
        const registerCallResponse = await registerCall(agentId);
        if (registerCallResponse.access_token) {
          retellWebClient
            .startCall({
              accessToken: registerCallResponse.access_token,
            })
            .catch((err) => {
              console.error(err);
              setError('Failed to start call');
              setIsLoading(false);
              setConnectionStatus('Error');
            });
          setIsCalling(true); // Update button to "Stop" when conversation starts
        }
      } catch (err) {
        setError('Failed to register call. Please check your configuration.');
        setIsLoading(false);
        setConnectionStatus('Error');
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
      <header className="App-header">
        <h1>Retell AI Voice Demo</h1>
        <p>Click the button below to start a voice conversation with an AI agent</p>
        
        <div className="status-container">
          <div className={`status-indicator ${connectionStatus.toLowerCase().replace(' ', '-')}`}>
            Status: {connectionStatus}
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button 
          onClick={toggleConversation}
          disabled={isLoading}
          className={`call-button ${isCalling ? 'active' : ''} ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? 'Connecting...' : (isCalling ? 'End Call' : 'Start Call')}
        </button>

        <div className="instructions">
          <p><strong>Instructions:</strong></p>
          <ol>
            <li>Make sure your microphone is enabled</li>
            <li>Click "Start Call" to begin the conversation</li>
            <li>Speak naturally to the AI agent</li>
            <li>Click "End Call" when you're done</li>
          </ol>
          
          <div className="setup-note">
            <p><strong>Note:</strong> Make sure you have:</p>
            <ul>
              <li>Replaced "ENTER_YOUR_AGENT_ID" with your actual Agent ID</li>
              <li>Backend server running on localhost:8080</li>
              <li>Valid API key configured in the backend</li>
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default App;
