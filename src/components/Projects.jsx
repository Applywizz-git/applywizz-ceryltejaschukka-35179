import React, { useState, useEffect, useRef } from 'react';
import { 
  FolderGit2, 
  ChevronLeft, 
  ChevronRight, 
  Database, 
  HeartPulse,
  Radio
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';
import Card3D from './Card3D';
import Icon3D from './Icon3D';

export default function Projects() {
  const { projects } = resumeData;
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);

  const nextProject = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sound.playClick();
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sound.playClick();
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const selectProject = (idx, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sound.playClick();
    setActiveIndex(idx);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevProject();
      if (e.key === 'ArrowRight') nextProject();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mobile touch swipe handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 45) {
      nextProject();
    } else if (diff < -45) {
      prevProject();
    }
    touchStartX.current = null;
  };

  const projectIcons = [Radio, Database, HeartPulse];
  const projectColors = ['cyan', 'indigo', 'rose'];

  return (
    <section id="projects" className="py-16 relative border-t border-slate-800/80 overflow-hidden perspective-2000">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>KEY ENGINEERING PROJECTS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-white tracking-tight">
            Key Engineering Projects
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Production-grade data pipelines, distributed systems, and real-time processing architectures from the resume.
          </p>
        </div>

        {/* Quick Project Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {projects.map((proj, idx) => {
            const Icon = projectIcons[idx] || FolderGit2;
            const isSelected = activeIndex === idx;
            return (
              <button
                key={proj.id}
                type="button"
                onClick={(e) => selectProject(idx, e)}
                onMouseEnter={() => sound.playHover()}
                className={`pill-3d flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs font-mono transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'btn-3d bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold shadow-lg shadow-cyan-500/40 scale-105'
                    : 'bg-[#0c1220] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-semibold whitespace-nowrap">0{idx + 1}. {proj.title.split(' ')[0]} {proj.title.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Carousel Stage Container with Mobile Touch Swipe */}
        <div 
          className="relative w-full max-w-4xl mx-auto my-2 flex items-center justify-center select-none"
          style={{ perspective: '1600px' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel Cards */}
          <div className="relative w-full flex items-center justify-center">
            {projects.map((proj, idx) => {
              const count = projects.length;
              let offset = (idx - activeIndex + count) % count;
              if (offset === 2) offset = -1; // -1 (left), 0 (center), 1 (right)

              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const Icon = projectIcons[idx] || FolderGit2;
              const color = projectColors[idx] || 'cyan';

              let transform = '';
              let zIndex = 10;
              let opacity = 0.4;
              let cursor = 'default';

              if (isCenter) {
                transform = 'translateX(0%) translateZ(0px) rotateY(0deg) scale(1)';
                zIndex = 25;
                opacity = 1;
                cursor = 'default';
              } else if (isLeft) {
                transform = 'translateX(-32%) translateZ(-140px) rotateY(24deg) scale(0.85)';
                zIndex = 15;
                opacity = 0.6;
                cursor = 'pointer';
              } else if (isRight) {
                transform = 'translateX(32%) translateZ(-140px) rotateY(-24deg) scale(0.85)';
                zIndex = 15;
                opacity = 0.6;
                cursor = 'pointer';
              }

              return (
                <div
                  key={proj.id}
                  onClick={(e) => !isCenter && selectProject(idx, e)}
                  style={{
                    transform,
                    zIndex,
                    opacity: isCenter ? 1 : opacity,
                    cursor,
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                    transformStyle: 'preserve-3d'
                  }}
                  className={`w-full max-w-3xl ${
                    isCenter 
                      ? 'relative z-20 block mx-auto' 
                      : 'hidden md:block absolute top-0 inset-x-0 mx-auto hover:opacity-85 hover:scale-[0.88] transition-all'
                  }`}
                  title={!isCenter ? `Click to view ${proj.title}` : ''}
                >
                  <Card3D intensity={isCenter ? 10 : 0} depth={20} glare={isCenter}>
                    <div 
                      style={{ transformStyle: 'preserve-3d' }}
                      className={`p-5 sm:p-8 rounded-3xl bg-[#0c1220] border transition-all duration-300 shadow-2xl ${
                        isCenter 
                          ? 'border-cyan-500/60 shadow-[0_20px_60px_-15px_rgba(6,182,212,0.35)] bg-gradient-to-b from-[#0e1628] to-[#0c1220]' 
                          : 'border-slate-800 shadow-xl'
                      }`}
                    >
                      {/* Project Header with Icon */}
                      <div 
                        style={{ transform: 'translateZ(24px)', transformStyle: 'preserve-3d' }}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 mb-4 border-b border-slate-800"
                      >
                        <div className="flex items-start sm:items-center gap-3 sm:gap-3.5">
                          <Icon3D icon={Icon} color={color} size="md" />
                          <div className="min-w-0 flex-1">
                            <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider mb-0.5">
                              Architecture 0{idx + 1}
                            </div>
                            <h3 className="text-lg sm:text-2xl font-bold font-heading text-white leading-tight">
                              {proj.title}
                            </h3>
                          </div>
                        </div>

                        {/* Top Tech Stack Tags */}
                        <div 
                          style={{ transform: 'translateZ(28px)' }}
                          className="flex flex-wrap gap-1 sm:gap-1.5"
                        >
                          {proj.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="pill-3d px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-xl bg-[#11192d] border border-slate-700/70 text-cyan-300 text-[11px] sm:text-xs font-mono shadow-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bullet Points */}
                      <ul 
                        style={{ transform: 'translateZ(14px)' }}
                        className="space-y-2.5 sm:space-y-3"
                      >
                        {proj.bullets.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 sm:mt-2 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* All Tags Footer */}
                      <div 
                        style={{ transform: 'translateZ(20px)' }}
                        className="mt-4 sm:mt-5 pt-3 sm:pt-3.5 border-t border-slate-800/80 flex flex-wrap gap-1 sm:gap-1.5"
                      >
                        <span className="text-[10px] font-mono text-slate-400 uppercase mr-1 flex items-center shrink-0">
                          Tech:
                        </span>
                        {proj.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-lg bg-[#080d18] border border-slate-800 text-slate-300 text-[10px] font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card3D>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile & Desktop Ergonomic Controls Bar */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 mt-8 pt-4 border-t border-slate-800/80 max-w-4xl mx-auto relative z-30">
          {/* Previous Button */}
          <button
            type="button"
            onClick={prevProject}
            onMouseEnter={() => sound.playHover()}
            className="btn-3d flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-5 py-2.5 rounded-2xl bg-[#0e1628] border border-cyan-500/40 text-cyan-300 hover:text-white font-mono text-xs font-bold cursor-pointer active:scale-95 transition-all shadow-lg shrink-0"
          >
            <ChevronLeft className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="hidden sm:inline">Previous Architecture</span>
            <span className="sm:hidden">Prev</span>
          </button>

          {/* Project Indicator Dots & Counter */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => selectProject(idx, e)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    activeIndex === idx
                      ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-gradient-to-r from-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-slate-800 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to project ${idx + 1}`}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400 ml-1 sm:ml-2 whitespace-nowrap">
              <strong className="text-cyan-300">0{activeIndex + 1}</strong> / 0{projects.length}
            </span>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={nextProject}
            onMouseEnter={() => sound.playHover()}
            className="btn-3d flex items-center justify-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-5 py-2.5 rounded-2xl bg-[#0e1628] border border-cyan-500/40 text-cyan-300 hover:text-white font-mono text-xs font-bold cursor-pointer active:scale-95 transition-all shadow-lg shrink-0"
          >
            <span className="hidden sm:inline">Next Architecture</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
}
