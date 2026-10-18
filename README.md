# Omni-VA (Omni Visual Agent) 🌐🤖

> Multi-agent visual platform featuring interactive 3D avatars with lip-sync, real-time voice, smooth scrolling, and computer-vision-powered agents (Gym Trainer, AI Dermatologist).
> **100% Free & Open-Source Ecosystem** (Zero paid API subscriptions, zero token charges).

---

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript, Tailwind CSS)
- **3D Engine**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Client-Side Computer Vision**: `@mediapipe/tasks-vision` (WebAssembly landmarking)
- **Physics & Motion**: `framer-motion` + `lenis` smooth scroll
- **Zero-Cost LLM & Vision Reasoning**: OpenRouter Free Tier (`llama-3.2-11b-vision-instruct:free`, `gemini-flash-1.5:free`)
- **Real-Time Voice (TTS/STT)**: Native Web Speech API (`SpeechSynthesis` & `webkitSpeechRecognition`)
- **Persistence**: Supabase Free Tier (`@supabase/supabase-js`)

---

## 📂 Architecture & Directory Scaffolding

```text
omni-va/
├── public/
│   ├── models/                # 3D assets (.glb / .gltf files, textures)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── fonts/             # Local font assets
│   │   ├── globals.css        # Tailwind & Lenis smooth scroll configuration
│   │   ├── layout.tsx         # Root layout with SmoothScroll provider
│   │   └── page.tsx           # Interactive multi-agent command center & showcase
│   ├── components/
│   │   ├── 3d/
│   │   │   └── scene.tsx      # R3F WebGL 3D Canvas & animated agent core
│   │   ├── vision/
│   │   │   └── face-tracker.tsx # MediaPipe Tasks Vision client-side node
│   │   └── smooth-scroll.tsx  # Lenis smooth-scroll provider
│   └── lib/
│       ├── openrouter.ts      # OpenRouter free tier client (Llama 3.2 Vision / Gemini Flash)
│       ├── speech.ts          # Zero-cost native TTS & STT controller
│       ├── supabase.ts        # Supabase client initialization
│       └── utils.ts           # Class merging utilities
├── .env.example
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## ⚡ Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

### 3. Local Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the Omni-VA visual dashboard.

---

## 📋 Roadmap

- [x] **Phase 1**: Core Next.js 14 App Router scaffolding, 3D R3F setup, MediaPipe vision integration setup, Lenis smooth scrolling, Web Speech API controller, and zero-cost LLM client.
- [ ] **Phase 2**: 3D Avatar morph targets, phoneme-to-viseme mapping, and real-time lip-sync with Web Speech audio.
- [ ] **Phase 3**: Specialized Vision Agents (Gym Trainer posture & rep detector, AI Dermatologist triage).
- [ ] **Phase 4**: Supabase real-time session sync and multi-agent workflow orchestration.
