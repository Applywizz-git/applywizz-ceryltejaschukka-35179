import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  Building2,
  Sparkles
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import Card3D from './Card3D';
import Icon3D from './Icon3D';
import { sound } from '../utils/audio';

export default function Experience() {
  const { professionalExperience } = resumeData;
  const [selectedId, setSelectedId] = useState(professionalExperience[0].id);
  const [expandedRoles, setExpandedRoles] = useState({});

  const scrollToRole = (id) => {
    sound.playClick();
    setSelectedId(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const toggleExpand = (id) => {
    sound.playClick();
    setExpandedRoles((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const roleColors = ['cyan', 'indigo', 'emerald'];

  return (
    <section id="experience" className="py-16 relative border-t border-slate-800/80 perspective-1600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>WORK HISTORY & TIMELINE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-white tracking-tight">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Chronological work history and documented production deliverables across Google, Truist Bank, and Augur Talentcare.
          </p>
        </div>

        {/* 3D Quick Company Stepper Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-10">
          {professionalExperience.map((exp, idx) => {
            const isSelected = selectedId === exp.id;
            return (
              <button
                key={exp.id}
                type="button"
                onClick={() => scrollToRole(exp.id)}
                onMouseEnter={() => sound.playHover()}
                className={`p-4 rounded-2xl text-left border transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? 'btn-3d bg-gradient-to-r from-cyan-950/90 to-indigo-950/90 border-cyan-500/60 shadow-xl'
                    : 'bg-[#0c1220] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon3D icon={Building2} color={roleColors[idx % roleColors.length]} size="sm" />
                  <div>
                    <div className="text-xs font-bold font-heading text-white line-clamp-1">
                      {exp.company}
                    </div>
                    <div className="text-[10px] font-mono text-cyan-400">
                      {exp.period}
                    </div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-cyan-400' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Experience Timeline with 3D Isometric Conduit */}
        <div className="relative pl-6 sm:pl-10 border-l-2 border-cyan-500/30 space-y-12">
          {professionalExperience.map((exp, idx) => {
            const isExpanded = !!expandedRoles[exp.id];
            const hasMoreBullets = exp.bullets.length > 3;
            const visibleBullets = isExpanded ? exp.bullets : exp.bullets.slice(0, 3);
            const hiddenCount = exp.bullets.length - 3;
            const iconColor = roleColors[idx % roleColors.length];

            return (
              <div key={exp.id} id={exp.id} className="relative">
                {/* 3D Conduit Node Orb */}
                <div className="absolute -left-[33px] sm:-left-[49px] top-6 w-6 h-6 rounded-full bg-[#080b11] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_16px_rgba(6,182,212,0.9)] animate-pulse-3d">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,1)]" />
                </div>

                <Card3D intensity={10} depth={20}>
                  <div 
                    style={{ transformStyle: 'preserve-3d' }}
                    className="p-6 sm:p-8 rounded-3xl bg-[#0c1220] border border-slate-800 hover:border-cyan-500/60 transition-all shadow-2xl"
                  >
                    {/* Role Header */}
                    <div 
                      style={{ transform: 'translateZ(24px)', transformStyle: 'preserve-3d' }}
                      className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 mb-5 border-b border-slate-800"
                    >
                      <div className="flex items-start gap-3.5">
                        <Icon3D icon={Briefcase} color={iconColor} size="md" />
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                              {exp.role}
                            </h3>
                            <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                              {exp.company}
                            </span>
                            {exp.client && (
                              <span className="px-3 py-1 rounded-xl text-xs font-mono bg-indigo-950/70 border border-indigo-500/30 text-indigo-300">
                                {exp.client.startsWith('Domain') ? exp.client : `Client: ${exp.client}`}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                              <Calendar className="w-3.5 h-3.5" />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-rose-400" />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Key Metric Badges */}
                      <div 
                        style={{ transform: 'translateZ(28px)' }}
                        className="flex flex-wrap items-center gap-2"
                      >
                        {exp.metrics.map((m, mIdx) => (
                          <div key={mIdx} className="bg-[#11192d] px-3.5 py-1.5 rounded-xl border border-slate-700/80 text-right shadow-lg">
                            <span className="text-[10px] font-mono text-slate-400 mr-1.5">{m.label}:</span>
                            <strong className="text-xs font-mono text-cyan-300">{m.value}</strong>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="relative">
                      <ul 
                        style={{ transform: 'translateZ(14px)' }}
                        className="space-y-3 transition-all duration-300"
                      >
                        {visibleBullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3 text-sm text-slate-200 leading-relaxed animate-fadeIn">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Read More / Show Less Toggle Button */}
                      {hasMoreBullets && (
                        <div 
                          style={{ transform: 'translateZ(24px)' }}
                          className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between relative z-30"
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleExpand(exp.id);
                            }}
                            onMouseEnter={() => sound.playHover()}
                            className="btn-3d inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#11192d] border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold hover:text-white cursor-pointer"
                          >
                            {isExpanded ? (
                              <>
                                <span>Show Less</span>
                                <ChevronUp className="w-4 h-4 text-cyan-400" />
                              </>
                            ) : (
                              <>
                                <span>Read More (+{hiddenCount} Achievements)</span>
                                <ChevronDown className="w-4 h-4 text-cyan-400" />
                              </>
                            )}
                          </button>

                          <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                            {isExpanded ? 'Displaying all achievements' : `Showing top 3 of ${exp.bullets.length} achievements`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card3D>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
