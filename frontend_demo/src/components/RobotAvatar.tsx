import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sphere, Cylinder, Box } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface RobotAvatarProps {
  isListening: boolean;
  isSpeaking: boolean;
  isConnected?: boolean;
}

const RobotMesh: React.FC<RobotAvatarProps> = ({ isListening, isSpeaking, isConnected = false }) => {
  const meshRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (meshRef.current) {
      // Idle floating animation
      if (!isConnected) {
        meshRef.current.position.y = Math.sin(time * 0.8) * 0.1;
        meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.05;
      }
      
      // Listening pulse animation
      if (isListening) {
        meshRef.current.scale.setScalar(1 + Math.sin(time * 4) * 0.05);
        meshRef.current.position.y = Math.sin(time * 2) * 0.2;
      }
      
      // Speaking animation
      if (isSpeaking) {
        meshRef.current.rotation.z = Math.sin(time * 10) * 0.02;
      }
    }

    // Eye animations
    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeIntensity = isListening ? 2 + Math.sin(time * 6) * 0.5 : 1;
      (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyeIntensity;
      (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = eyeIntensity;
      
      if (isSpeaking) {
        (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0x00ff88);
        (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0x00ff88);
      } else if (isListening) {
        (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0x0088ff);
        (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0x0088ff);
      } else {
        (leftEyeRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0x00ffff);
        (rightEyeRef.current.material as THREE.MeshStandardMaterial).emissive.setHex(0x00ffff);
      }
    }

    // Mouth animation
    if (mouthRef.current && isSpeaking) {
      mouthRef.current.scale.y = 1 + Math.sin(time * 15) * 0.3;
      mouthRef.current.scale.x = 1 + Math.sin(time * 12) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef}>
        {/* Main Head */}
        <Sphere args={[1.5]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.9}
            roughness={0.1}
            emissive="#0f172a"
            emissiveIntensity={0.2}
          />
        </Sphere>

        {/* Face Panel */}
        <Cylinder args={[1.3, 1.3, 0.1]} position={[0, 0.2, 1.4]} rotation={[0, 0, 0]}>
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.8}
            roughness={0.2}
            emissive="#1e40af"
            emissiveIntensity={0.3}
          />
        </Cylinder>

        {/* Eyes */}
        <Sphere ref={leftEyeRef} args={[0.25]} position={[-0.4, 0.3, 1.35]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00ffff"
            emissiveIntensity={1}
            transparent
            opacity={0.9}
          />
        </Sphere>
        <Sphere ref={rightEyeRef} args={[0.25]} position={[0.4, 0.3, 1.35]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00ffff"
            emissiveIntensity={1}
            transparent
            opacity={0.9}
          />
        </Sphere>

        {/* Eye Pupils */}
        <Sphere args={[0.1]} position={[-0.4, 0.3, 1.4]}>
          <meshStandardMaterial color="#000000" />
        </Sphere>
        <Sphere args={[0.1]} position={[0.4, 0.3, 1.4]}>
          <meshStandardMaterial color="#000000" />
        </Sphere>

        {/* Mouth */}
        <Box ref={mouthRef} args={[0.6, 0.15, 0.05]} position={[0, -0.2, 1.42]}>
          <meshStandardMaterial
            color="#000000"
            emissive={isSpeaking ? "#00ff88" : "#0088ff"}
            emissiveIntensity={isSpeaking ? 0.8 : 0.2}
          />
        </Box>

        {/* Body */}
        <Cylinder args={[1.2, 1.4, 2]} position={[0, -2.5, 0]}>
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.8}
            roughness={0.2}
            emissive="#1e40af"
            emissiveIntensity={0.1}
          />
        </Cylinder>

        {/* Chest Panel */}
        <Cylinder args={[0.8, 0.8, 0.1]} position={[0, -1.8, 1.1]}>
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.9}
            roughness={0.1}
            emissive="#0ea5e9"
            emissiveIntensity={0.4}
          />
        </Cylinder>

        {/* Arms */}
        <Cylinder args={[0.3, 0.25, 1.5]} position={[-1.8, -2, 0]} rotation={[0, 0, Math.PI / 6]}>
          <meshStandardMaterial
            color="#334155"
            metalness={0.7}
            roughness={0.3}
          />
        </Cylinder>
        <Cylinder args={[0.3, 0.25, 1.5]} position={[1.8, -2, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <meshStandardMaterial
            color="#334155"
            metalness={0.7}
            roughness={0.3}
          />
        </Cylinder>
      </group>
    </Float>
  );
};

export const RobotAvatar: React.FC<RobotAvatarProps> = ({ isListening, isSpeaking, isConnected = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
      className="relative w-full h-96 lg:h-[500px]"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 rounded-full blur-3xl transition-all duration-1000 ${
        isListening ? 'bg-blue-500/30' : isSpeaking ? 'bg-green-500/30' : 'bg-cyan-500/20'
      }`} />
      
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0088ff" />
        <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" />
        
        <Environment preset="night" />
        
        <RobotMesh isListening={isListening} isSpeaking={isSpeaking} isConnected={isConnected} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={!isConnected}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </motion.div>
  );
};