"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Sparkles,
  Cpu,
  Mic,
  Dumbbell,
  Stethoscope,
  Terminal,
  Layers,
  ExternalLink,
} from "lucide-react";
import { FaceTracker } from "@/components/vision/face-tracker";

// Dynamically import 3D Canvas to prevent SSR issues
const AgentScene = dynamic(
  () => import("@/components/3d/scene").then((mod) => mod.AgentScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] md:h-[500px] rounded-2xl border border-purple-500/20 bg-purple-950/10 animate-pulse flex items-center justify-center text-purple-400 font-mono text-sm">
        Initializing 3D WebGL Engine...
      </div>
    ),
  }
);

export default function Home() {
  const agents = [
    {
      title: "AI Gym Trainer",
      category: "Pose & Rep Analysis",
      icon: Dumbbell,
      description:
        "Real-time posture correction, form validation, and rep counting using client-side body landmarks.",
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
    {
      title: "AI Dermatologist",
      category: "Visual Triage",
      icon: Stethoscope,
      description:
        "High-definition skin feature detection & texture reasoning powered by free multimodal vision models.",
      color: "from-rose-500 to-pink-600",
      accent: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    },
    {
      title: "3D Lip-Sync Avatar",
      category: "Conversational Agent",
      icon: Mic,
      description:
        "Real-time voice streaming with morph target lip-synchronization using browser-native Web Speech API.",
      color: "from-purple-500 to-indigo-600",
      accent: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    },
    {
      title: "Vision Code Tutor",
      category: "Screen & Whiteboard OCR",
      icon: Terminal,
      description:
        "Real-time architecture and code diagram breakdown with contextual voice synthesis.",
      color: "from-cyan-500 to-blue-600",
      accent: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    },
  ];

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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-purple-600/15 via-cyan-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[800px] left-1/4 w-[600px] h-[400px] bg-gradient-to-tr from-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header */}
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
                v0.1.0-alpha
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
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
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>100% Free & Open-Source Multi-Agent Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none mb-6"
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
            className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8"
          >
            High-fidelity 3D avatars with real-time lip synchronization, zero-latency
            browser vision tracking via MediaPipe, native Web Speech audio, and free
            multimodal intelligence.
          </motion.p>
        </div>

        {/* Live 3D & Vision Demo Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AgentScene />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FaceTracker />
          </motion.div>
        </div>
      </section>

      {/* Agents Scaffolding Showcase */}
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
          {agents.map((agent, index) => {
            const IconComponent = agent.icon;
            return (
              <motion.div
                key={agent.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group relative p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
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
                <p className="text-slate-400 text-xs leading-relaxed">
                  {agent.description}
                </p>
              </motion.div>
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
        <p>Omni-VA Phase 1 Setup & Scaffolding Completed Successfully.</p>
      </footer>
    </main>
  );
}
