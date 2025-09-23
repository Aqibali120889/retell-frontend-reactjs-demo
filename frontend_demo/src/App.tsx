import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RetellWebClient } from 'retell-client-js-sdk';
import { RobotAvatar, Transcript, MicButton, ParticleField, StatusIndicators } from './components';
import './App.css';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface RegisterCallResponse {
  call_id: string;
  sample_rate: number;
}

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [callDuration, setCallDuration] = useState(0);
  const [networkQuality, setNetworkQuality] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');
  
  const retellWebClient = useRef<RetellWebClient>();
  const callStartTime = useRef<number>();
  
  const agentId = "agent_690083bddb0a6f8326653b107c"; // Update with your agent ID

  // Initialize Retell client
  useEffect(() => {
    retellWebClient.current = new RetellWebClient();
    
    // Event listeners
    retellWebClient.current.on("call_started", () => {
      console.log("Call started");
      setIsConnected(true);
      callStartTime.current = Date.now();
    });
    
    retellWebClient.current.on("call_ended", () => {
      console.log("Call ended");
      setIsConnected(false);
      setIsListening(false);
      setIsSpeaking(false);
      setCallDuration(0);
      callStartTime.current = undefined;
    });
    
    retellWebClient.current.on("agent_start_talking", () => {
      console.log("Agent started talking");
      setIsSpeaking(true);
      setIsListening(false);
    });
    
    retellWebClient.current.on("agent_stop_talking", () => {
      console.log("Agent stopped talking");
      setIsSpeaking(false);
    });
    
    retellWebClient.current.on("user_start_talking", () => {
      console.log("User started talking");
      setIsListening(true);
      setIsSpeaking(false);
    });
    
    retellWebClient.current.on("user_stop_talking", () => {
      console.log("User stopped talking");
      setIsListening(false);
    });
    
    retellWebClient.current.on("update", (update) => {
      // Handle transcript updates
      if (update.transcript && update.transcript.length > 0) {
        const latestTranscript = update.transcript[update.transcript.length - 1];
        
        setMessages(prev => {
          const existingMessage = prev.find(
            msg => msg.content === latestTranscript.content && 
                  msg.sender === (latestTranscript.role === 'agent' ? 'assistant' : 'user')
          );
          
          if (!existingMessage) {
            return [...prev, {
              id: Date.now().toString(),
              content: latestTranscript.content,
              sender: latestTranscript.role === 'agent' ? 'assistant' : 'user',
              timestamp: new Date()
            }];
          }
          
          return prev;
        });
      }
    });
    
    retellWebClient.current.on("error", (error) => {
      console.error("Retell error:", error);
      setIsConnected(false);
      setIsListening(false);
      setIsSpeaking(false);
    });
    
    return () => {
      if (retellWebClient.current) {
        retellWebClient.current.stopCall();
      }
    };
  }, []);
  
  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isConnected && callStartTime.current) {
      interval = setInterval(() => {
        const duration = Math.floor((Date.now() - callStartTime.current!) / 1000);
        setCallDuration(duration);
      }, 1000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isConnected]);
  
  // Register call with backend
  async function registerCall(agentId: string): Promise<RegisterCallResponse> {
    try {
      const response = await fetch("http://localhost:8080/create-web-call", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: agentId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: RegisterCallResponse = await response.json();
      return data;
    } catch (err) {
      console.error("Error registering call:", err);
      throw new Error("Failed to register call");
    }
  }
  
  // Toggle conversation
  const toggleConversation = async () => {
    if (!retellWebClient.current) return;
    
    if (isConnected) {
      retellWebClient.current.stopCall();
    } else {
      try {
        const registerCallResponse = await registerCall(agentId);
        
        if (registerCallResponse.call_id) {
          await retellWebClient.current.startCall({
            accessToken: registerCallResponse.call_id,
            sampleRate: registerCallResponse.sample_rate,
          } as any);
        }
      } catch (error) {
        console.error("Failed to start call:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Particle Background */}
      <ParticleField isListening={isListening} />
      
      {/* Status Indicators */}
      <StatusIndicators
        isConnected={isConnected}
        isListening={isListening}
        isSpeaking={isSpeaking}
        callDuration={callDuration}
        networkQuality={networkQuality}
      />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-7xl mx-auto px-6 py-12"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-6xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4">
              Neural AI
            </h1>
            <p className="text-xl text-cyan-300/70 font-light">
              Advanced Voice Intelligence Interface
            </p>
          </motion.div>
          
          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left Panel - Future placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="glass-card p-6 h-96 flex items-center justify-center">
                <div className="text-center text-cyan-400/40">
                  <div className="text-4xl mb-4">🧠</div>
                  <p className="font-light">Neural Analytics</p>
                  <p className="text-sm mt-2">Coming Soon</p>
                </div>
              </div>
            </motion.div>
            
            {/* Center - Robot Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 100 }}
              className="flex justify-center"
            >
              <RobotAvatar
                isListening={isListening}
                isSpeaking={isSpeaking}
                isConnected={isConnected}
              />
            </motion.div>
            
            {/* Right Panel - Transcript */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="glass-card p-6 h-96">
                <Transcript messages={messages} isListening={isListening} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Floating Mic Button */}
      <MicButton
        isListening={isListening}
        isConnected={isConnected}
        onClick={toggleConversation}
        disabled={false}
      />
    </div>
  );
}

export default App;