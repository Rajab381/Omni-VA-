"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

function VisualAgentCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <Sphere
        ref={meshRef}
        args={[1.3, 64, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.15 : 1}
      >
        <MeshDistortMaterial
          color={hovered ? "#06b6d4" : "#8b5cf6"}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export function AgentScene() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-purple-500/20 bg-gradient-to-b from-purple-950/20 via-black to-black/80 backdrop-blur-md shadow-2xl shadow-purple-900/20">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-xs font-mono tracking-wider uppercase text-purple-300">
          WebGL 3D Core Active
        </span>
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#38bdf8" />
        <VisualAgentCore />
      </Canvas>
    </div>
  );
}
