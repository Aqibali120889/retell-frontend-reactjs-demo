import { useCallback } from "react";
import { Engine, Container } from "@tsparticles/engine";

// Simple fallback component if particles fail to load
const SimpleFallback = () => (
  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
);

export const ParticleBackground = () => {
  // For now, return a simple gradient background to avoid dependency issues
  return <SimpleFallback />;
};

export default ParticleBackground;