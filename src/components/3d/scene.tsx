"use client";

import React, { Component, ReactNode, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Float, Html } from "@react-three/drei";
import * as THREE from "three";

export type AvatarType = "male" | "female";

interface SceneProps {
  avatarType?: AvatarType;
  isSpeaking?: boolean;
}

// Error Boundary for 3D GLTF asset loading failure
interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("GLTF Avatar failed to load, falling back to procedural avatar:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Helper interface for SkinnedMesh with morph targets
type MorphMesh = THREE.SkinnedMesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;

function GLTFAvatar({
  modelUrl,
  isSpeaking,
  avatarType,
}: {
  modelUrl: string;
  isSpeaking: boolean;
  avatarType: AvatarType;
}) {
  const gltf = useGLTF(modelUrl);
  const avatarRef = useRef<THREE.Group>(null);
  const headMeshRef = useRef<MorphMesh[]>([]);

  // Find all meshes that contain morph targets for facial animations
  useEffect(() => {
    const meshes: MorphMesh[] = [];
    gltf.scene.traverse((child) => {
      const mesh = child as MorphMesh;
      if (mesh.isMesh && mesh.morphTargetDictionary && mesh.morphTargetInfluences) {
        meshes.push(mesh);
      }
    });
    headMeshRef.current = meshes;
  }, [gltf]);

  useFrame((state) => {
    const clock = state.clock.getElapsedTime();

    // 1. Idle breathing & natural micro-movements
    if (avatarRef.current) {
      avatarRef.current.position.y = (avatarType === "male" ? -1.35 : -1.25) + Math.sin(clock * 1.5) * 0.015;
      avatarRef.current.rotation.y = Math.sin(clock * 0.6) * 0.05;
      avatarRef.current.rotation.x = Math.sin(clock * 1.1) * 0.02;
    }

    // 2. Lip-Sync & Viseme Modulation
    const mouthOpenVal = isSpeaking
      ? Math.max(0, (Math.sin(clock * 16) * 0.5 + 0.45) * 0.85)
      : 0;

    const visemeAaVal = isSpeaking
      ? Math.max(0, Math.sin(clock * 12 + 1) * 0.6)
      : 0;

    const visemeOVal = isSpeaking
      ? Math.max(0, Math.cos(clock * 14) * 0.5)
      : 0;

    // 3. Eye Blink Cycle (Blink every 3.5 seconds for 120ms)
    const blinkCycle = clock % 3.5;
    const isBlinking = blinkCycle < 0.12;
    const blinkVal = isBlinking ? 1 : 0;

    headMeshRef.current.forEach((mesh) => {
      const dict = mesh.morphTargetDictionary;
      const influences = mesh.morphTargetInfluences;
      if (!dict || !influences) return;

      // Apply Mouth Open
      if (dict["mouthOpen"] !== undefined) {
        influences[dict["mouthOpen"]] = mouthOpenVal;
      }
      if (dict["jawOpen"] !== undefined) {
        influences[dict["jawOpen"]] = mouthOpenVal * 0.7;
      }
      if (dict["viseme_aa"] !== undefined) {
        influences[dict["viseme_aa"]] = visemeAaVal;
      }
      if (dict["viseme_O"] !== undefined) {
        influences[dict["viseme_O"]] = visemeOVal;
      }

      // Apply Eye Blinking
      if (dict["eyeBlinkLeft"] !== undefined) {
        influences[dict["eyeBlinkLeft"]] = blinkVal;
      }
      if (dict["eyeBlinkRight"] !== undefined) {
        influences[dict["eyeBlinkRight"]] = blinkVal;
      }
    });
  });

  return (
    <group
      ref={avatarRef}
      position={[0, avatarType === "male" ? -1.35 : -1.25, 0]}
      scale={avatarType === "male" ? 1.45 : 1.55}
    >
      <primitive object={gltf.scene} />
    </group>
  );
}

// Procedural 3D Head Fallback with animated eyes and mouth morph targets
function ProceduralAvatar({ isSpeaking }: { isSpeaking: boolean }) {
  const headRef = useRef<THREE.Group>(null);
  const jawRef = useRef<THREE.Mesh>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const clock = state.clock.getElapsedTime();

    if (headRef.current) {
      headRef.current.position.y = Math.sin(clock * 2) * 0.05;
      headRef.current.rotation.y = Math.sin(clock * 0.8) * 0.15;
    }

    // Lip sync jaw animation
    if (jawRef.current) {
      const jawDrop = isSpeaking ? (Math.sin(clock * 16) * 0.5 + 0.5) * 0.15 : 0;
      jawRef.current.position.y = -0.35 - jawDrop;
    }

    // Eye blinking
    const blinkCycle = clock % 3.5;
    const eyeScaleY = blinkCycle < 0.12 ? 0.1 : 1;
    if (leftEyeRef.current) leftEyeRef.current.scale.y = eyeScaleY;
    if (rightEyeRef.current) rightEyeRef.current.scale.y = eyeScaleY;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={headRef} position={[0, 0, 0]}>
        {/* Main Cranium */}
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial
            color="#1e1b4b"
            roughness={0.3}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Visor / Faceplate */}
        <mesh position={[0, 0.15, 0.45]}>
          <boxGeometry args={[0.75, 0.35, 0.25]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Cyber Eyes */}
        <mesh ref={leftEyeRef} position={[-0.2, 0.18, 0.6]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.2, 0.18, 0.6]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Animated Jaw / Mouth for Lip-sync */}
        <mesh ref={jawRef} position={[0, -0.35, 0.3]}>
          <boxGeometry args={[0.45, 0.12, 0.3]} />
          <meshStandardMaterial
            color={isSpeaking ? "#ec4899" : "#6366f1"}
            emissive={isSpeaking ? "#be185d" : "#312e81"}
            emissiveIntensity={isSpeaking ? 0.6 : 0.2}
          />
        </mesh>

        {/* Neural Halo Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]} position={[0, 0.8, 0]}>
          <torusGeometry args={[0.85, 0.02, 16, 64]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
      </group>
    </Float>
  );
}

export function AgentScene({ avatarType = "female", isSpeaking = false }: SceneProps) {
  const [modelError, setModelError] = useState(false);

  // Model file paths
  const modelUrl = useMemo(() => {
    return avatarType === "female"
      ? "/models/female-avatar.glb"
      : "/models/male-avatar.glb";
  }, [avatarType]);

  // Reset model error on avatar type toggle
  useEffect(() => {
    setModelError(false);
  }, [avatarType]);

  return (
    <div className="relative w-full h-[450px] md:h-[550px] rounded-2xl overflow-hidden border border-purple-500/30 bg-gradient-to-b from-purple-950/25 via-gray-950 to-black backdrop-blur-md shadow-2xl shadow-purple-950/40">
      {/* Status Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/30">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isSpeaking ? "bg-rose-400 animate-ping" : "bg-emerald-400"
            }`}
          />
          <span className="text-xs font-mono font-semibold tracking-wider uppercase text-purple-200">
            {avatarType === "male" ? "Gym Trainer Avatar (Male)" : "AI Dermatologist (Female)"}
          </span>
        </div>

        {isSpeaking && (
          <div className="flex items-center gap-1.5 bg-rose-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-rose-500/40 text-[11px] font-mono text-rose-300 animate-pulse">
            <span>Lip-Sync Active</span>
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <span className="text-[10px] font-mono text-slate-400 bg-black/50 px-2.5 py-1 rounded-lg border border-white/10">
          Drag to rotate • Scroll to zoom
        </span>
      </div>

      {/* WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0.1, 1.8], fov: 45 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-5, 3, -2]} intensity={0.8} color="#c084fc" />
        <pointLight position={[0, -1, 2]} intensity={0.5} color="#38bdf8" />

        <OrbitControls
          enablePan={false}
          minDistance={1.0}
          maxDistance={3.5}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 4}
          target={[0, 0, 0]}
        />

        <Suspense
          fallback={
            <Html center>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-purple-500/30 text-purple-300 font-mono text-xs">
                <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                <span>Loading 3D Avatar...</span>
              </div>
            </Html>
          }
        >
          {modelError ? (
            <ProceduralAvatar isSpeaking={isSpeaking} />
          ) : (
            <ModelErrorBoundary fallback={<ProceduralAvatar isSpeaking={isSpeaking} />}>
              <GLTFAvatar
                modelUrl={modelUrl}
                isSpeaking={isSpeaking}
                avatarType={avatarType}
              />
            </ModelErrorBoundary>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload avatar assets for instant switching
if (typeof window !== "undefined") {
  useGLTF.preload("/models/female-avatar.glb");
  useGLTF.preload("/models/male-avatar.glb");
}
