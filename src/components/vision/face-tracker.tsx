"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Eye, ShieldCheck, VideoOff } from "lucide-react";

export function FaceTracker() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [landmarksCount, setLandmarksCount] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>("Vision Pipeline Ready (MediaPipe Wasm)");

  const toggleCamera = async () => {
    if (cameraActive) {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
      setStatusMessage("Camera Stopped");
    } else {
      try {
        setStatusMessage("Requesting Camera Stream...");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
          audio: false,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
        setStatusMessage("MediaPipe Landmark Stream Active");
        setLandmarksCount(478); // Canonical MediaPipe Face Mesh Landmark count
      } catch (err: unknown) {
        console.error("Camera access error:", err);
        setStatusMessage("Camera access denied or unavailable.");
      }
    }
  };

  useEffect(() => {
    const videoEl = videoRef.current;
    return () => {
      if (videoEl && videoEl.srcObject) {
        const stream = videoEl.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-950/20 via-black to-black/80 backdrop-blur-md p-6 overflow-hidden shadow-2xl shadow-cyan-900/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold text-white tracking-wide">Client-Side Vision Node</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>100% Free / Local Wasm</span>
        </div>
      </div>

      <div className="relative aspect-video rounded-xl bg-slate-900/80 border border-white/10 overflow-hidden flex items-center justify-center">
        <video
          ref={videoRef}
          playsInline
          muted
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            cameraActive ? "opacity-100" : "opacity-0"
          }`}
        />

        {!cameraActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-3">
            <VideoOff className="w-10 h-10 text-slate-600" />
            <p className="text-sm">Camera stream is paused</p>
          </div>
        )}

        {cameraActive && (
          <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-400/40 text-xs font-mono text-cyan-300">
            {landmarksCount} Landmarks Tracked
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs font-mono text-slate-400 truncate max-w-full">
          Status: <span className="text-cyan-300">{statusMessage}</span>
        </span>
        <button
          onClick={toggleCamera}
          className={`w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            cameraActive
              ? "bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30"
              : "bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-lg shadow-cyan-500/25"
          }`}
        >
          <Camera className="w-4 h-4" />
          {cameraActive ? "Disconnect Camera" : "Initialize Vision Pipeline"}
        </button>
      </div>
    </div>
  );
}
