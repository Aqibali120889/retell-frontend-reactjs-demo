import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera, useProgress, Html } from '@react-three/drei';
import * as THREE from 'three';
import { MiniRobot } from './MiniRobot';

interface SceneProps {
  isListening: boolean;
  isSpeaking: boolean;
}

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{
        color: '#00d9ff',
        fontSize: '14px',
        fontWeight: '500',
        textAlign: 'center',
      }}>
        Loading AI Companion... {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

// Cinematic lighting setup
function Lights() {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  
  useFrame((state) => {
    if (spotLightRef.current) {
      spotLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 2;
      spotLightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.2) * 2;
    }
  });

  return (
    <>
      {/* Key light */}
      <spotLight
        ref={spotLightRef}
        position={[3, 4, 2]}
        angle={0.3}
        penumbra={0.5}
        intensity={1.2}
        color="#00d9ff"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light */}
      <spotLight
        position={[-2, 3, -1]}
        angle={0.4}
        penumbra={0.7}
        intensity={0.6}
        color="#8b5cf6"
        castShadow
      />
      
      {/* Rim light */}
      <directionalLight
        position={[0, 2, -3]}
        intensity={0.4}
        color="#ec4899"
      />
      
      {/* Ambient light */}
      <ambientLight intensity={0.2} color="#ffffff" />
      
      {/* Environment lighting */}
      <Environment preset="night" />
    </>
  );
}

const Scene: React.FC<SceneProps> = ({ isListening, isSpeaking }) => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      zIndex: 1,
    }}>
      <Canvas
        shadows
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          background: 'transparent',
        }}
      >
        {/* Camera setup */}
        <PerspectiveCamera
          makeDefault
          position={[0, 1, 4]}
          fov={50}
          near={0.1}
          far={100}
        />
        
        {/* Lighting */}
        <Lights />
        
        {/* 3D Robot */}
        <Suspense fallback={<Loader />}>
          <MiniRobot
            position={[0, -1, 0]}
            scale={[1.2, 1.2, 1.2]}
            isListening={isListening}
            isSpeaking={isSpeaking}
          />
          
          {/* Ground shadows */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.5}
            scale={3}
            blur={2}
            far={2}
            color="#000000"
          />
        </Suspense>
        
        {/* Interactive controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Scene;