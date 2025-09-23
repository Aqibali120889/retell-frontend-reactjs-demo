import React from 'react';
import { motion } from 'framer-motion';

interface MicButtonProps {
  isListening: boolean;
  isConnected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const MicButton: React.FC<MicButtonProps> = ({ 
  isListening, 
  isConnected, 
  onClick, 
  disabled = false 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1, 
        delay: 0.8,
        type: "spring",
        stiffness: 100
      }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
    >
      {/* Outer Glow Rings */}
      <div className="relative">
        {isListening && (
          <>
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                style={{
                  width: `${80 + ring * 20}px`,
                  height: `${80 + ring * 20}px`,
                  left: `${-ring * 10}px`,
                  top: `${-ring * 10}px`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: ring * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}
        
        {/* Main Button */}
        <motion.button
          onClick={onClick}
          disabled={disabled}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          className={`
            relative w-20 h-20 rounded-full border-2 backdrop-blur-md
            flex items-center justify-center text-2xl
            transition-all duration-300 ease-out
            ${disabled 
              ? 'bg-gray-600/20 border-gray-500/30 text-gray-400 cursor-not-allowed' 
              : isListening
                ? 'bg-gradient-to-r from-red-500/30 to-pink-500/30 border-red-400/50 text-red-300 shadow-lg shadow-red-500/25'
                : isConnected
                  ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-cyan-400/50 text-cyan-300 shadow-lg shadow-cyan-500/25'
                  : 'bg-gradient-to-r from-gray-500/30 to-gray-600/30 border-gray-400/50 text-gray-300 shadow-lg shadow-gray-500/25'
            }
          `}
        >
          {/* Glow Effect */}
          <div className={`
            absolute inset-0 rounded-full blur-md transition-all duration-300
            ${disabled 
              ? 'bg-gray-600/10' 
              : isListening
                ? 'bg-gradient-to-r from-red-500/40 to-pink-500/40'
                : isConnected
                  ? 'bg-gradient-to-r from-cyan-500/40 to-blue-500/40'
                  : 'bg-gradient-to-r from-gray-500/40 to-gray-600/40'
            }
          `} />
          
          {/* Icon */}
          <motion.div
            className="relative z-10"
            animate={isListening ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.8, repeat: isListening ? Infinity : 0 }}
          >
            {isListening ? '🔴' : '🎤'}
          </motion.div>
          
          {/* Pulse Animation */}
          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500/20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.button>
        
        {/* Status Indicator */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs"
          animate={{
            scale: isConnected ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: isConnected ? Infinity : 0,
          }}
        >
          <div className={`
            w-full h-full rounded-full border-2 backdrop-blur-sm
            ${isConnected 
              ? 'bg-green-500/30 border-green-400/50 text-green-300' 
              : 'bg-red-500/30 border-red-400/50 text-red-300'
            }
          `}>
            {isConnected ? '✓' : '✕'}
          </div>
        </motion.div>
      </div>
      
      {/* Status Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center mt-4"
      >
        <p className={`text-sm font-light ${
          disabled 
            ? 'text-gray-400' 
            : isListening
              ? 'text-red-300'
              : isConnected
                ? 'text-cyan-300'
                : 'text-gray-300'
        }`}>
          {disabled 
            ? 'Initializing...' 
            : isListening
              ? 'Listening...'
              : isConnected
                ? 'Tap to speak'
                : 'Connecting...'
          }
        </p>
        
        {isConnected && !isListening && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-cyan-400/60 mt-1"
          >
            Neural interface ready
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};