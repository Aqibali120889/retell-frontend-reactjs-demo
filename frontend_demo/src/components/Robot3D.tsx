import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Float, Sphere, Box, Cylinder } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface Robot3DProps {
  isListening: boolean;
  isSpeaking: boolean;
}

const RobotMesh: React.FC<Robot3DProps> = ({ isListening, isSpeaking }) => {
  const headRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Idle breathing animation
    if (bodyRef.current && !isSpeaking && !isListening) {
      bodyRef.current.scale.y = 1 + Math.sin(time * 2) * 0.02;
    }
    
    // Head movement when listening
    if (headRef.current && isListening) {
      headRef.current.rotation.x = Math.sin(time * 3) * 0.1;
      headRef.current.rotation.y = Math.sin(time * 2) * 0.05;
    }
    
    // Speaking animation - mouth pulsing
    if (mouthRef.current && isSpeaking) {
      mouthRef.current.scale.setScalar(1 + Math.sin(time * 8) * 0.3);
    }
    
    // Eye glow when listening
    if (eyeLeftRef.current && eyeRightRef.current) {
      const intensity = isListening ? 1 + Math.sin(time * 4) * 0.5 : 1;
      (eyeLeftRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
      (eyeRightRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.5}>
      <group ref={bodyRef}>
        {/* Body */}
        <Cylinder args={[1.2, 1.5, 2, 8]} position={[0, -1, 0]}>
          <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
        </Cylinder>
        
        {/* Head */}
        <group ref={headRef} position={[0, 1.5, 0]}>
          <Sphere args={[1]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.1} />
          </Sphere>
          
          {/* Eyes */}
          <Sphere ref={eyeLeftRef} args={[0.15]} position={[-0.3, 0.2, 0.8]}>
            <meshStandardMaterial 
              color="#60a5fa" 
              emissive="#60a5fa" 
              emissiveIntensity={1}
            />
          </Sphere>
          <Sphere ref={eyeRightRef} args={[0.15]} position={[0.3, 0.2, 0.8]}>
            <meshStandardMaterial 
              color="#60a5fa" 
              emissive="#60a5fa" 
              emissiveIntensity={1}
            />
          </Sphere>
          
          {/* Mouth */}
          <Box ref={mouthRef} args={[0.4, 0.1, 0.1]} position={[0, -0.2, 0.9]}>
            <meshStandardMaterial 
              color="#ef4444" 
              emissive="#ef4444" 
              emissiveIntensity={isSpeaking ? 0.5 : 0.1}
            />
          </Box>
        </group>
        
        {/* Arms */}
        <Cylinder args={[0.2, 0.2, 1.5]} position={[-1.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#1d4ed8" metalness={0.7} roughness={0.3} />
        </Cylinder>
        <Cylinder args={[0.2, 0.2, 1.5]} position={[1.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <meshStandardMaterial color="#1d4ed8" metalness={0.7} roughness={0.3} />
        </Cylinder>
      </group>
    </Float>
  );
};

export const Robot3D: React.FC<Robot3DProps> = ({ isListening, isSpeaking }) => {
  return (
    <motion.div
      className="w-full h-96 relative"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 6]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} />
        <Environment preset="city" />
        
        <RobotMesh isListening={isListening} isSpeaking={isSpeaking} />
        
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </motion.div>
  );
};
