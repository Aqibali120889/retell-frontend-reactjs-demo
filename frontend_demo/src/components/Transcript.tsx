import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface TranscriptProps {
  messages: Message[];
  isListening: boolean;
}

const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = React.useState('');
  
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    let currentIndex = 0;
    
    const typeNext = () => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        currentIndex++;
        timer = setTimeout(typeNext, 30 + Math.random() * 20);
      }
    };
    
    const startTimer = setTimeout(typeNext, delay);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(startTimer);
    };
  }, [text, delay]);
  
  return <span>{displayText}</span>;
};

const ListeningIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl border border-cyan-500/30"
  >
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-cyan-400 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
    <span className="text-cyan-400 text-sm font-light">Neural processing...</span>
  </motion.div>
);

const MessageBubble: React.FC<{ message: Message; index: number }> = ({ message, index }) => {
  const isUser = message.sender === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 50 : -50, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`relative max-w-xs lg:max-w-md ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Glow Effect */}
        <div className={`absolute inset-0 rounded-2xl blur-sm ${
          isUser 
            ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30' 
            : 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30'
        }`} />
        
        {/* Message Content */}
        <div className={`relative px-4 py-3 rounded-2xl border backdrop-blur-sm ${
          isUser
            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-100'
            : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-100'
        }`}>
          {isUser ? (
            <p className="text-sm font-light">{message.content}</p>
          ) : (
            <p className="text-sm font-light">
              <TypewriterText text={message.content} />
            </p>
          )}
          
          {/* Timestamp */}
          <div className="text-xs opacity-60 mt-1">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
        
        {/* Avatar */}
        <div className={`absolute top-2 ${isUser ? '-left-8' : '-right-8'} w-6 h-6 rounded-full flex items-center justify-center text-xs ${
          isUser 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
            : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
        }`}>
          {isUser ? '👤' : '🤖'}
        </div>
      </div>
    </motion.div>
  );
};

export const Transcript: React.FC<TranscriptProps> = ({ messages, isListening }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="h-full max-h-[500px] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="text-xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Neural Transcript
        </h2>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>
      
      {/* Messages Container */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 px-4 scrollbar-thin scrollbar-thumb-cyan-500/30 scrollbar-track-transparent"
        style={{ maxHeight: '400px' }}
      >
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center mb-4">
              <span className="text-2xl">🧠</span>
            </div>
            <p className="text-cyan-400/60 font-light">
              Neural interface ready
            </p>
            <p className="text-cyan-400/40 text-sm mt-1">
              Start a conversation to see transcript
            </p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((message, index) => (
              <MessageBubble key={message.id} message={message} index={index} />
            ))}
          </AnimatePresence>
        )}
        
        {/* Listening Indicator */}
        <AnimatePresence>
          {isListening && (
            <ListeningIndicator />
          )}
        </AnimatePresence>
      </div>
      
      {/* Footer Glow */}
      <div className="h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mt-4" />
    </motion.div>
  );
};