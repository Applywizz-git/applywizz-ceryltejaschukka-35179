import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Briefcase,
  ArrowRight,
  Database,
  Sparkles,
  FileText,
  Zap,
  TrendingUp,
  Server,
  Layers,
  Cpu
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';
import Card3D from './Card3D';
import Icon3D from './Icon3D';

export default function Hero() {
  const { personal, keyMetrics } = resumeData;

  const scrollTo = (id) => {
    sound.playClick();
    const elem = document.querySelector(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const metricIcons = [TrendingUp, Zap, Server, Layers, Cpu];
  const metricColors = ['cyan', 'indigo', 'emerald', 'amber', 'sky'];

  return (
    <section id="hero" className="pt-32 pb-16 relative perspective-1600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top 3D Holographic Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-mono shadow-[0_0_25px_rgba(6,182,212,0.35)] backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 -ml-4.5" />
            <span className="font-semibold">Data Engineer @ Star Tech Networks Inc. (Client: Google)</span>
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-heading text-white mb-3">
            <span className="inline-block hover:scale-[1.02] transition-transform duration-300">
              {personal.name}
            </span>
          </h1>
          <div className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-cyan-200 font-sans flex items-center gap-3 mb-6">
            <span>Data Engineer</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-normal text-lg">M.S. Information Systems (UC Denver)</span>
          </div>

          {/* 3D Glassmorphic Contact Hub Bar */}
          <div
            style={{ transformStyle: 'preserve-3d' }}
            className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono text-slate-300 bg-[#0d1424]/90 p-4 rounded-2xl border border-slate-800/90 mb-8 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
          >
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-2.5 text-slate-300 hover:text-cyan-300 transition-colors group cursor-pointer"
            >
              <Icon3D icon={Mail} color="cyan" size="sm" />
              <span className="group-hover:underline">{personal.email}</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <a
              href={`tel:${personal.phone}`}
              className="flex items-center gap-2.5 text-slate-300 hover:text-indigo-300 transition-colors group cursor-pointer"
            >
              <Icon3D icon={Phone} color="indigo" size="sm" />
              <span className="group-hover:underline">{personal.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="flex items-center gap-2.5 text-slate-400">
              <Icon3D icon={MapPin} color="rose" size="sm" />
              <span>{personal.location} ({personal.relocation})</span>
            </span>
          </div>

          {/* 3D Professional Summary Card */}
          <Card3D intensity={8} depth={20} className="mb-8">
            <div
              style={{ transformStyle: 'preserve-3d' }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0e1628] to-[#0a0f1d] border border-slate-800 shadow-2xl hover:border-cyan-500/50 transition-all"
            >
              <div
                style={{ transform: 'translateZ(24px)' }}
                className="flex items-center justify-between mb-3.5 pb-3 border-b border-slate-800/80"
              >
                <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>Professional Summary</span>
                </h2>
                <span className="text-[11px] font-mono text-slate-500">Resume Verbatim</span>
              </div>
              <p
                style={{ transform: 'translateZ(14px)' }}
                className="text-slate-200 text-sm sm:text-base leading-relaxed text-justify"
              >
                {personal.summary}
              </p>
            </div>
          </Card3D>

          {/* 3D Tactile CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo('#experience')}
              onMouseEnter={() => sound.playHover()}
              className="btn-3d px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              <Briefcase className="w-4 h-4" />
              <span>View Professional Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo('#projects')}
              onMouseEnter={() => sound.playHover()}
              className="btn-3d-indigo px-5 py-3.5 rounded-2xl bg-[#0e1628] border border-indigo-500/40 text-indigo-200 font-bold text-xs sm:text-sm hover:text-white flex items-center gap-2 cursor-pointer"
            >
              <Database className="w-4 h-4 text-indigo-400" />
              <span>View Key Projects</span>
            </button>

            <a
              href="/Resume.pdf"
              download="Ceryl_Tejas_Chukka_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => sound.playHover()}
              onClick={() => sound.playClick()}
              className="btn-3d px-5 py-3.5 rounded-2xl bg-[#090e1a] border border-cyan-500/40 text-cyan-300 font-bold text-xs sm:text-sm hover:border-cyan-400 flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Download Resume PDF</span>
            </a>
          </div>
        </div>

        {/* Quantified Resume Highlights (Interactive 3D Cards with Icon3D) */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-4 flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Production Impact & Benchmarks (From Resume):</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyMetrics.map((item, idx) => {
              const MetricIcon = metricIcons[idx % metricIcons.length];
              const metricColor = metricColors[idx % metricColors.length];

              return (
                <Card3D key={idx} intensity={12} depth={18}>
                  <div
                    style={{ transformStyle: 'preserve-3d' }}
                    className="p-5 rounded-2xl bg-[#0a0f1d] border border-slate-800/90 hover:border-cyan-500/50 transition-all h-full flex flex-col justify-between shadow-xl group"
                  >
                    <div style={{ transform: 'translateZ(18px)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 drop-shadow-[0_0_12px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform">
                          {item.value}
                        </span>
                        <Icon3D icon={MetricIcon} color={metricColor} size="sm" />
                      </div>
                      <div className="text-xs font-bold text-slate-100 font-sans mb-1">
                        {item.label}
                      </div>
                      <p className="text-xs text-slate-400 leading-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Card3D>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
