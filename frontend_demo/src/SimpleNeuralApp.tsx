import React, { useState } from 'react';
import { motion } from 'framer-motion';

function SimpleNeuralApp() {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
    if (!isConnected) {
      setIsListening(true);
      setTimeout(() => setIsListening(false), 3000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 animate-pulse"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto px-6"
        >
          {/* Header */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-7xl font-thin mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
          >
            Neural AI
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-2xl text-cyan-300/70 font-light mb-12"
          >
            Advanced Voice Intelligence Interface
          </motion.p>

          {/* Robot Avatar Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="relative mx-auto mb-12 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center backdrop-blur-sm"
          >
            <motion.div
              animate={isListening ? { 
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 20px rgba(6, 182, 212, 0.3)',
                  '0 0 40px rgba(6, 182, 212, 0.6)',
                  '0 0 20px rgba(6, 182, 212, 0.3)'
                ]
              } : {}}
              transition={{ duration: 2, repeat: isListening ? Infinity : 0 }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-6xl"
            >
              🤖
            </motion.div>
            
            {/* Pulse rings when listening */}
            {isListening && (
              <>
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5 + ring * 0.2, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: ring * 0.3 }}
                  />
                ))}
              </>
            )}
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mb-8"
          >
            <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full backdrop-blur-sm border ${
              isConnected 
                ? 'bg-green-500/20 border-green-400/50 text-green-300' 
                : 'bg-gray-500/20 border-gray-400/50 text-gray-300'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                isConnected ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
              }`}></div>
              <span className="font-light">
                {isListening ? 'Listening...' : isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </motion.div>

          {/* Control Button */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleConnection}
            className={`px-8 py-4 rounded-full text-xl font-light backdrop-blur-sm border-2 transition-all duration-300 ${
              isConnected
                ? 'bg-red-500/20 border-red-400/50 text-red-300 hover:bg-red-500/30'
                : 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 hover:bg-cyan-500/30'
            }`}
          >
            {isConnected ? 'Disconnect' : 'Start Neural Interface'}
          </motion.button>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-12 text-cyan-400/40 text-sm"
          >
            Neural interface powered by advanced AI • Built with React & Framer Motion
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default SimpleNeuralApp;