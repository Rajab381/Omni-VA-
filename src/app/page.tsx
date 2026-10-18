"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Cpu,
  Mic,
  Volume2,
  VolumeX,
  Dumbbell,
  Stethoscope,
  Terminal,
  Layers,
  ExternalLink,
  Activity,
  CheckCircle2,
  Flame,
} from "lucide-react";
import { FaceTracker } from "@/components/vision/face-tracker";
import { speechController } from "@/lib/speech";
import type { AvatarType } from "@/components/3d/scene";

// Dynamically import 3D Canvas to prevent SSR issues
const AgentScene = dynamic(
  () => import("@/components/3d/scene").then((mod) => mod.AgentScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[450px] md:h-[550px] rounded-2xl border border-purple-500/20 bg-purple-950/10 animate-pulse flex items-center justify-center text-purple-400 font-mono text-sm">
        Initializing 3D WebGL Avatar Engine...
      </div>
    ),
  }
);

type AgentId = "trainer" | "dermatologist" | "concierge" | "tutor";

interface AgentConfig {
  id: AgentId;
  title: string;
  category: string;
  avatarType: AvatarType;
  icon: typeof Dumbbell;
  color: string;
  accent: string;
  activeBorder: string;
  activeBg: string;
  description: string;
  sampleSpeech: string;
  badge: string;
}

const AGENTS: AgentConfig[] = [
  {
    id: "trainer",
    title: "AI Gym Trainer",
    category: "Kinematics & Rep Counter",
    avatarType: "male",
    icon: Dumbbell,
    color: "from-amber-500 to-orange-600",
    accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    activeBorder: "border-amber-400",
    activeBg: "bg-amber-500/20 shadow-amber-500/20",
    description:
      "Real-time posture correction, form validation, and rep counting using client-side body landmarks.",
    sampleSpeech:
      "Welcome to your workout. Keep your back straight, chest up, and maintain steady breathing through every repetition.",
    badge: "Male Avatar (Avaturn GLB)",
  },
  {
    id: "dermatologist",
    title: "AI Dermatologist",
    category: "Skin & Texture Triage",
    avatarType: "female",
    icon: Stethoscope,
    color: "from-rose-500 to-pink-600",
    accent: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    activeBorder: "border-rose-400",
    activeBg: "bg-rose-500/20 shadow-rose-500/20",
    description:
      "High-definition skin feature detection & texture reasoning powered by MediaPipe and multimodal vision.",
    sampleSpeech:
      "I am analyzing your facial scan for texture regularity, hydration markers, and erythema distribution.",
    badge: "Female Avatar (RPM GLB)",
  },
  {
    id: "concierge",
    title: "3D Voice Concierge",
    category: "Conversational Agent",
    avatarType: "female",
    icon: Mic,
    color: "from-purple-500 to-indigo-600",
    accent: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    activeBorder: "border-purple-400",
    activeBg: "bg-purple-500/20 shadow-purple-500/20",
    description:
      "Real-time voice streaming with morph target viseme lip-synchronization using browser-native Web Speech API.",
    sampleSpeech:
      "Greetings! I am Omni-VA, your zero-cost autonomous visual agent. How may I assist your workflow today?",
    badge: "Viseme Lip-Sync",
  },
  {
    id: "tutor",
    title: "Vision Code Tutor",
    category: "Screen & Whiteboard OCR",
    avatarType: "male",
    icon: Terminal,
    color: "from-cyan-500 to-blue-600",
    accent: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    activeBorder: "border-cyan-400",
    activeBg: "bg-cyan-500/20 shadow-cyan-500/20",
    description:
      "Real-time architecture and code diagram breakdown with contextual voice synthesis.",
    sampleSpeech:
      "I can inspect your code architecture diagrams and guide you through full-stack implementation step by step.",
    badge: "Code Reasoning",
  },
];

export default function Home() {
  const [activeAgentId, setActiveAgentId] = useState<AgentId>("trainer");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const activeAgent = AGENTS.find((a) => a.id === activeAgentId) || AGENTS[0];

  const handleTestVoice = (text: string) => {
    if (isSpeaking) {
      speechController.stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    speechController.speak(
      text,
      undefined,
      () => {
        setIsSpeaking(false);
      }
    );
  };

  const techStack = [
    { name: "Next.js 14 App Router", role: "SSR & Edge Routing" },
    { name: "Three.js / React Three Fiber", role: "3D Avatar Engine" },
    { name: "MediaPipe Tasks Vision", role: "Client-side Landmark Wasm" },
    { name: "Framer Motion + Lenis", role: "Physics & Smooth Scrolling" },
    { name: "OpenRouter Free Tier", role: "Zero-Cost Multimodal LLM" },
    { name: "Web Speech API", role: "Zero-Cost Native TTS & STT" },
  ];

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 relative overflow-hidden selection:bg-purple-600 selection:text-white">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-purple-600/15 via-cyan-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[800px] left-1/4 w-[600px] h-[400px] bg-gradient-to-tr from-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-950/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center font-bold text-black shadow-lg shadow-purple-500/20">
              Ω
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Omni-VA
              </span>
              <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
                v0.2.0-mesh
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Rajab381/Omni-VA-"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20"
            >
              <span>GitHub Repo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Interactive 3D Avatars • Dynamic GLB Mesh Switching</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4"
          >
            Omni Visual Agent{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Platform
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg leading-relaxed"
          >
            Real-time multi-agent visual hub with high-definition 3D avatars,
            morph-target lip synchronization, and client-side computer vision.
          </motion.p>
        </div>

        {/* Agent Switcher Control Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            const isActive = activeAgentId === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => {
                  if (isSpeaking) {
                    speechController.stopSpeaking();
                    setIsSpeaking(false);
                  }
                  setActiveAgentId(agent.id);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 shadow-md ${
                  isActive
                    ? `${agent.activeBorder} ${agent.activeBg} text-white shadow-lg`
                    : "border-white/10 bg-gray-900/40 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{agent.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {agent.avatarType === "male" ? "Male" : "Female"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Stage Grid: 3D Avatar Stage + Vision Scanner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: 3D Scene + Live Controls */}
          <div className="flex flex-col gap-4">
            <AgentScene
              avatarType={activeAgent.avatarType}
              isSpeaking={isSpeaking}
            />

            {/* Voice Lip-Sync Controller Panel */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border ${activeAgent.accent}`}
                >
                  {isSpeaking ? (
                    <Volume2 className="w-5 h-5 animate-bounce text-purple-300" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    <span>{activeAgent.title}</span>
                    <span className="text-[11px] font-mono text-purple-300 bg-purple-950/40 px-2 py-0.5 rounded-md border border-purple-500/30">
                      {activeAgent.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 max-w-sm truncate">
                    &quot;{activeAgent.sampleSpeech}&quot;
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleTestVoice(activeAgent.sampleSpeech)}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                  isSpeaking
                    ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30"
                    : "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30"
                }`}
              >
                <Mic className="w-4 h-4" />
                {isSpeaking ? "Stop Voice Stream" : "Speak & Lip-Sync"}
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Agent Panel */}
          <div className="flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {activeAgentId === "dermatologist" ? (
                <motion.div
                  key="dermatologist-panel"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <FaceTracker />
                  <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-200 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>
                      AI Dermatologist active: MediaPipe Landmark overlay tracks skin zones in real time.
                    </span>
                  </div>
                </motion.div>
              ) : activeAgentId === "trainer" ? (
                <motion.div
                  key="trainer-panel"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <div className="p-6 rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-950/20 via-black to-black/80 backdrop-blur-md shadow-2xl shadow-amber-950/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-amber-400" />
                        <h3 className="font-semibold text-white tracking-wide">
                          Gym Kinematics & Rep Telemetry
                        </h3>
                      </div>
                      <span className="text-xs font-mono text-amber-400 bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-500/30">
                        Live Tracking Ready
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-center">
                        <div className="text-2xl font-bold text-amber-400 font-mono">
                          12
                        </div>
                        <div className="text-[11px] text-slate-400">Target Reps</div>
                      </div>
                      <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-center">
                        <div className="text-2xl font-bold text-emerald-400 font-mono">
                          98%
                        </div>
                        <div className="text-[11px] text-slate-400">Form Score</div>
                      </div>
                      <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-center">
                        <div className="text-2xl font-bold text-cyan-400 font-mono">
                          Squat
                        </div>
                        <div className="text-[11px] text-slate-400">Exercise</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-slate-300">
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Knee flexion angle aligned (92°)</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Thoracic spine neutrality validated</span>
                      </div>
                    </div>
                  </div>

                  <FaceTracker />
                </motion.div>
              ) : (
                <motion.div
                  key="default-panel"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaceTracker />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Agents Overview Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Autonomous Vision Agents
            </h2>
            <p className="text-slate-400 text-sm">
              Modular specialized agent nodes orchestrated across 3D and vision pipelines.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Layers className="w-4 h-4" />
            <span>Extensible Architecture</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {AGENTS.map((agent) => {
            const IconComponent = agent.icon;
            const isCurrent = activeAgentId === agent.id;
            return (
              <div
                key={agent.title}
                onClick={() => {
                  if (isSpeaking) {
                    speechController.stopSpeaking();
                    setIsSpeaking(false);
                  }
                  setActiveAgentId(agent.id);
                }}
                className={`cursor-pointer group relative p-6 rounded-2xl bg-white/[0.02] border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  isCurrent
                    ? `${agent.activeBorder} ${agent.activeBg}`
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${agent.accent}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                  {agent.category}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {agent.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">
                  {agent.description}
                </p>
                <div className="text-[10px] font-mono text-purple-300 bg-black/40 px-2 py-1 rounded-md border border-white/5 inline-block">
                  Avatar: {agent.avatarType === "male" ? "Male GLB" : "Female GLB"}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Tech Stack Specs */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="p-8 rounded-3xl bg-gradient-to-b from-purple-950/20 to-black border border-purple-500/20">
          <div className="flex items-center gap-2 mb-6">
            <Cpu className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-white">
              Zero-Cost Open Ecosystem Stack
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="p-4 rounded-xl bg-black/40 border border-white/5"
              >
                <div className="text-xs font-semibold text-slate-200 mb-1">
                  {tech.name}
                </div>
                <div className="text-[10px] font-mono text-purple-400">
                  {tech.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-slate-500 font-mono">
        <p>Omni-VA Multi-Agent Dynamic 3D Avatar System Active.</p>
      </footer>
    </main>
  );
}
