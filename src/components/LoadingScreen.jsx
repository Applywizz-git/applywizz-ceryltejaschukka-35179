import React, { useState, useEffect } from 'react';
import { Sparkles, Database, Cpu, Layers } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [telemetryText, setTelemetryText] = useState('Initializing Data Pipeline Architecture...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const duration = 3000; // 3 seconds total
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentProgress < 25) {
        setTelemetryText('Initializing Distributed Data Pipelines...');
      } else if (currentProgress < 50) {
        setTelemetryText('Connecting Lakehouse & Apache Spark Clusters...');
      } else if (currentProgress < 75) {
        setTelemetryText('Calibrating Cloud Warehouses & DataOps Models...');
      } else if (currentProgress < 95) {
        setTelemetryText('Finalizing Senior Data Engineer Telemetry...');
      } else {
        setTelemetryText('Welcome to Ceryl Tejas Chukka Portfolio');
      }

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsFading(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 500); // 500ms fade transition
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isFading ? 0 : 1,
        transform: isFading ? 'scale(1.04)' : 'scale(1)',
        pointerEvents: isFading ? 'none' : 'auto'
      }}
      className="fixed inset-0 z-[9999] bg-[#060911] flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Background Ambient Glow Orbs */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none -top-20 -left-20 animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -bottom-20 -right-20 animate-pulse" />

      {/* Cyber Grid Lines */}
      <div className="absolute inset-0 cyber-grid-bg opacity-25 pointer-events-none" />

      {/* Central 3D Revolving Core Container */}
      <div className="relative mb-10 flex items-center justify-center" style={{ perspective: '1000px' }}>
        {/* Outer Orbiting 3D Ring 1 */}
        <div 
          className="absolute w-44 h-44 rounded-full border border-cyan-500/30 border-dashed animate-spin pointer-events-none" 
          style={{ 
            animationDuration: '10s',
            transform: 'rotateX(65deg) rotateY(15deg)'
          }} 
        />
        
        {/* Outer Orbiting 3D Ring 2 */}
        <div 
          className="absolute w-52 h-52 rounded-full border border-indigo-500/25 animate-spin pointer-events-none" 
          style={{ 
            animationDuration: '14s',
            animationDirection: 'reverse',
            transform: 'rotateX(55deg) rotateY(-25deg)'
          }} 
        />

        {/* 3D Holographic Center Cube Prism */}
        <div 
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'rotateX(15deg) rotateY(25deg)'
          }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-cyan-400 p-[2px] shadow-[0_0_50px_rgba(6,182,212,0.5)] animate-float-3d"
        >
          <div className="w-full h-full bg-[#080d1a] rounded-[22px] flex flex-col items-center justify-center p-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent" />
            <span className="font-mono font-black text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-white tracking-widest">
              CTC
            </span>
            <span className="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider mt-0.5">
              Data Core
            </span>
          </div>
        </div>
      </div>

      {/* Candidate Name & Title */}
      <div className="text-center mb-8 relative z-10 px-4">
        <h1 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight mb-1 flex items-center justify-center gap-2">
          <span>Ceryl Tejas Chukka</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        </h1>
        <p className="text-xs sm:text-sm font-mono text-cyan-400 font-medium tracking-wide">
          Senior Data Engineer • M.S. Information Systems
        </p>
      </div>

      {/* Futuristic 3D Progress Bar */}
      <div className="w-72 sm:w-96 max-w-[85vw] relative z-10">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
          <span className="text-cyan-300 font-bold flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
            <span>SYSTEM BOOT</span>
          </span>
          <span className="text-cyan-400 font-bold font-mono text-sm">
            {progress}%
          </span>
        </div>

        {/* Outer Glow Progress Track */}
        <div className="h-3 w-full bg-[#0e1628] rounded-full overflow-hidden p-[2px] border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
          <div
            style={{
              width: `${progress}%`,
              transition: 'width 0.05s linear'
            }}
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-300 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)] relative"
          >
            {/* Shimmer Light Bar */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Dynamic Telemetry Sequence Text */}
        <div className="h-6 mt-3 text-center">
          <p className="text-[11px] font-mono text-slate-400 animate-fadeIn">
            {telemetryText}
          </p>
        </div>
      </div>

      {/* Bottom Production Spec Tags */}
      <div className="absolute bottom-6 flex items-center gap-3 text-[10px] font-mono text-slate-600">
        <span>Lakehouse V4</span>
        <span>•</span>
        <span>Distributed Spark</span>
        <span>•</span>
        <span>Cloud DataOps</span>
      </div>
    </div>
  );
}
