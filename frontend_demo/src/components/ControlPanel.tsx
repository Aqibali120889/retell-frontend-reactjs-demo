import { motion } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Volume2, 
  VolumeX,
  Settings,
  Zap
} from 'lucide-react'
import { cn } from '../lib/utils'
import { useState } from 'react'

interface ControlPanelProps {
  isCalling: boolean
  isListening: boolean
  isSpeaking: boolean
  onToggleCall: () => void
  onToggleMute?: () => void
  className?: string
}

export default function ControlPanel({
  isCalling,
  isListening,
  isSpeaking,
  onToggleCall,
  onToggleMute,
  className
}: ControlPanelProps) {
  const [isMuted, setIsMuted] = useState(false)

  const handleMuteToggle = () => {
    setIsMuted(!isMuted)
    onToggleMute?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("glass-card p-6 space-y-6", className)}
    >
      {/* Main Call Button */}
      <div className="flex flex-col items-center space-y-4">
        <motion.button
          onClick={onToggleCall}
          className={cn(
            "relative w-20 h-20 rounded-full flex items-center justify-center text-white font-semibold transition-all duration-300",
            isCalling
              ? "bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 neon-glow"
              : "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 neon-glow"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isCalling ? {
            boxShadow: [
              "0 0 20px rgba(239, 68, 68, 0.4)",
              "0 0 40px rgba(239, 68, 68, 0.6)",
              "0 0 20px rgba(239, 68, 68, 0.4)"
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isCalling ? (
            <PhoneOff className="w-8 h-8" />
          ) : (
            <Phone className="w-8 h-8" />
          )}
          
          {/* Pulse Ring */}
          {isCalling && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-400"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          )}
        </motion.button>

        <motion.p 
          className={cn(
            "text-lg font-medium",
            isCalling ? "text-red-400" : "text-green-400"
          )}
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isCalling ? "End Call" : "Start Call"}
        </motion.p>
      </div>

      {/* Status Indicators */}
      {isCalling && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          {/* Listening Status */}
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
            isListening 
              ? "bg-blue-500/20 border border-blue-400/30" 
              : "bg-gray-500/10 border border-gray-600/20"
          )}>
            <motion.div
              animate={isListening ? { 
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0]
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Mic className={cn(
                "w-5 h-5",
                isListening ? "text-blue-400" : "text-gray-500"
              )} />
            </motion.div>
            <span className={cn(
              "text-sm font-medium",
              isListening ? "text-blue-300" : "text-gray-400"
            )}>
              {isListening ? "Listening" : "Idle"}
            </span>
          </div>

          {/* Speaking Status */}
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-all duration-300",
            isSpeaking 
              ? "bg-green-500/20 border border-green-400/30" 
              : "bg-gray-500/10 border border-gray-600/20"
          )}>
            <motion.div
              animate={isSpeaking ? { 
                scale: [1, 1.1, 1],
              } : {}}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              <Zap className={cn(
                "w-5 h-5",
                isSpeaking ? "text-green-400" : "text-gray-500"
              )} />
            </motion.div>
            <span className={cn(
              "text-sm font-medium",
              isSpeaking ? "text-green-300" : "text-gray-400"
            )}>
              {isSpeaking ? "Speaking" : "Quiet"}
            </span>
          </div>
        </motion.div>
      )}

      {/* Additional Controls */}
      {isCalling && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4"
        >
          {/* Mute Button */}
          <motion.button
            onClick={handleMuteToggle}
            className={cn(
              "p-3 rounded-full transition-all duration-200",
              isMuted 
                ? "bg-red-500/20 text-red-400 border border-red-400/30"
                : "bg-gray-500/10 text-gray-400 border border-gray-600/20 hover:bg-gray-500/20"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </motion.button>

          {/* Settings Button */}
          <motion.button
            className="p-3 rounded-full bg-gray-500/10 text-gray-400 border border-gray-600/20 hover:bg-gray-500/20 transition-all duration-200"
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}

      {/* Connection Quality Indicator */}
      {isCalling && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-sm text-gray-400"
        >
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((bar) => (
              <motion.div
                key={bar}
                className="w-1 bg-green-500 rounded-full"
                style={{ height: `${bar * 3 + 2}px` }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: bar * 0.1,
                }}
              />
            ))}
          </div>
          <span>Excellent Connection</span>
        </motion.div>
      )}
    </motion.div>
  )
}