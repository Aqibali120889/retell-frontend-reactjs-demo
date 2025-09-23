import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StatusIndicatorsProps {
  isConnected: boolean;
  isListening: boolean;
  isSpeaking: boolean;
  callDuration?: number;
  networkQuality?: 'excellent' | 'good' | 'fair' | 'poor';
}

const StatusBadge: React.FC<{ 
  icon: string; 
  label: string; 
  active: boolean; 
  color: string;
  pulse?: boolean;
}> = ({ icon, label, active, color, pulse = false }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className={`
      flex items-center space-x-2 px-3 py-2 rounded-full border backdrop-blur-sm
      transition-all duration-300 ${active 
        ? `bg-${color}-500/20 border-${color}-400/50 text-${color}-300` 
        : 'bg-gray-600/20 border-gray-500/30 text-gray-400'
      }
    `}
  >
    <motion.span
      className="text-sm"
      animate={pulse && active ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 1, repeat: pulse && active ? Infinity : 0 }}
    >
      {icon}
    </motion.span>
    <span className="text-xs font-light">{label}</span>
    {active && (
      <motion.div
        className={`w-2 h-2 bg-${color}-400 rounded-full`}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    )}
  </motion.div>
);

const NetworkIndicator: React.FC<{ quality?: string }> = ({ quality = 'good' }) => {
  const getQualityColor = () => {
    switch (quality) {
      case 'excellent': return 'green';
      case 'good': return 'cyan';
      case 'fair': return 'yellow';
      case 'poor': return 'red';
      default: return 'gray';
    }
  };
  
  const getBars = () => {
    switch (quality) {
      case 'excellent': return 4;
      case 'good': return 3;
      case 'fair': return 2;
      case 'poor': return 1;
      default: return 0;
    }
  };
  
  const color = getQualityColor();
  const activeBars = getBars();
  
  return (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        {[1, 2, 3, 4].map((bar) => (
          <motion.div
            key={bar}
            initial={{ height: 4 }}
            animate={{ 
              height: bar <= activeBars ? 4 + (bar * 2) : 4,
              opacity: bar <= activeBars ? 1 : 0.3 
            }}
            className={`w-1 rounded-sm ${
              bar <= activeBars 
                ? `bg-${color}-400` 
                : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
      <span className={`text-xs font-light text-${color}-400`}>
        {quality}
      </span>
    </div>
  );
};

const CallTimer: React.FC<{ duration: number }> = ({ duration }) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center space-x-2 px-3 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm"
    >
      <motion.div
        className="w-2 h-2 bg-red-400 rounded-full"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <span className="text-xs font-mono text-cyan-300">
        {formatTime(duration)}
      </span>
    </motion.div>
  );
};

export const StatusIndicators: React.FC<StatusIndicatorsProps> = ({
  isConnected,
  isListening,
  isSpeaking,
  callDuration = 0,
  networkQuality = 'good'
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="fixed top-6 right-6 z-40"
    >
      <div className="flex flex-col space-y-3">
        {/* Connection Status */}
        <StatusBadge
          icon="🔗"
          label="Connection"
          active={isConnected}
          color="green"
          pulse={!isConnected}
        />
        
        {/* Listening Status */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <StatusBadge
                icon="👂"
                label="Listening"
                active={isListening}
                color="blue"
                pulse={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Speaking Status */}
        <AnimatePresence>
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <StatusBadge
                icon="🎤"
                label="Speaking"
                active={isSpeaking}
                color="purple"
                pulse={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Network Quality */}
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-3 py-2 rounded-full border border-gray-500/30 bg-gray-600/20 backdrop-blur-sm"
          >
            <NetworkIndicator quality={networkQuality} />
          </motion.div>
        )}
        
        {/* Call Timer */}
        <AnimatePresence>
          {callDuration > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
            >
              <CallTimer duration={callDuration} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* System Health Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 text-center"
      >
        <div className="flex items-center justify-center space-x-2">
          <motion.div
            className="w-1 h-1 bg-green-400 rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs text-green-400/60">Neural Core Active</span>
        </div>
      </motion.div>
    </motion.div>
  );
};