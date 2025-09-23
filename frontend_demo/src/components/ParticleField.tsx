import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  isListening?: boolean;
}

const ParticleSystem: React.FC<{ count: number; isListening: boolean }> = ({ 
  count, 
  isListening 
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Distribute particles in 3D space
      positions[i * 3] = (Math.random() - 0.5) * 20;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
      
      // Assign colors (cyan/blue theme)
      colors[i * 3] = 0.2 + Math.random() * 0.3;     // r
      colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // g (cyan)
      colors[i * 3 + 2] = 1.0;                       // b (blue)
    }
    
    return [positions, colors];
  }, [count]);
  
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.1;
      pointsRef.current.rotation.y += delta * 0.05;
      
      if (isListening) {
        pointsRef.current.rotation.x += delta * 0.2;
        pointsRef.current.rotation.y += delta * 0.15;
      }
      
      // Animate individual particles
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.1) * 0.01;
        
        if (isListening) {
          positions[i * 3] += Math.sin(state.clock.elapsedTime * 2 + i * 0.1) * 0.02;
          positions[i * 3 + 2] += Math.cos(state.clock.elapsedTime * 2 + i * 0.1) * 0.02;
        }
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <Points ref={pointsRef} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const AnimatedBackground: React.FC<{ isListening: boolean }> = ({ isListening }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.05;
      
      // Breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.scale.setScalar(scale);
      
      if (isListening) {
        meshRef.current.rotation.z += delta * 0.2;
      }
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, -10]}>
      <sphereGeometry args={[15, 32, 32]} />
      <meshBasicMaterial
        color={isListening ? '#ff4081' : '#00bcd4'}
        transparent
        opacity={0.05}
        wireframe
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

export const ParticleField: React.FC<ParticleFieldProps> = ({ 
  count = 1500, 
  isListening = false 
}) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <color attach="background" args={['#000000']} />
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.2} />
        
        {/* Point lights */}
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#00bcd4" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff4081" />
        
        {/* Particle system */}
        <ParticleSystem count={count} isListening={isListening} />
        
        {/* Animated background mesh */}
        <AnimatedBackground isListening={isListening} />
        
        {/* Additional effects for listening state */}
        {isListening && (
          <>
            <pointLight position={[0, 0, 5]} intensity={0.8} color="#ff4081" />
            <mesh position={[0, 0, -5]}>
              <ringGeometry args={[5, 8, 32]} />
              <meshBasicMaterial
                color="#ff4081"
                transparent
                opacity={0.1}
                side={THREE.DoubleSide}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          </>
        )}
      </Canvas>
      
      {/* CSS Gradient Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(0, 188, 212, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 64, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(63, 81, 181, 0.05) 0%, transparent 50%)
          `,
        }}
      />
      
      {/* Listening State Overlay */}
      {isListening && (
        <div 
          className="fixed inset-0 pointer-events-none animate-pulse"
          style={{
            background: `
              radial-gradient(circle at 50% 50%, rgba(255, 64, 129, 0.1) 0%, transparent 70%)
            `,
          }}
        />
      )}
    </div>
  );
};