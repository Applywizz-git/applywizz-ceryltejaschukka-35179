import React, { useState } from 'react';
import { 
  Code2, 
  Zap, 
  Cpu, 
  Layers, 
  Cloud, 
  Database, 
  Network, 
  Workflow, 
  Sparkles, 
  BarChart3,
  Search
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import Card3D from './Card3D';
import Icon3D from './Icon3D';
import { sound } from '../utils/audio';

export default function Skills() {
  const { technicalSkills } = resumeData;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDomain, setActiveDomain] = useState('ALL');

  const domainFilters = [
    { id: 'ALL', label: 'All Domains' },
    { id: 'LANG', label: 'Languages & SQL', match: ['Programming & Query Languages', 'SQL Development & Optimization'] },
    { id: 'LAKEHOUSE', label: 'Lakehouse & Big Data', match: ['Big Data & Lakehouse Processing', 'Data Engineering & ETL'] },
    { id: 'CLOUD', label: 'Cloud & Warehouses', match: ['Cloud Data Platforms', 'Databases & Data Warehousing', 'Data Modeling & Analytics Engineering'] },
    { id: 'DATAOPS_AI', label: 'DataOps & AI', match: ['Workflow Orchestration & DataOps', 'AI Data Integration'] },
    { id: 'BI', label: 'BI & Reporting', match: ['Reporting & Visualization'] }
  ];

  const categoryConfig = {
    "Programming & Query Languages": { icon: Code2, color: "cyan" },
    "SQL Development & Optimization": { icon: Zap, color: "amber" },
    "Data Engineering & ETL": { icon: Cpu, color: "emerald" },
    "Big Data & Lakehouse Processing": { icon: Layers, color: "indigo" },
    "Cloud Data Platforms": { icon: Cloud, color: "sky" },
    "Databases & Data Warehousing": { icon: Database, color: "cyan" },
    "Data Modeling & Analytics Engineering": { icon: Network, color: "violet" },
    "Workflow Orchestration & DataOps": { icon: Workflow, color: "emerald" },
    "AI Data Integration": { icon: Sparkles, color: "rose" },
    "Reporting & Visualization": { icon: BarChart3, color: "emerald" }
  };

  const filteredCategories = technicalSkills.filter(cat => {
    if (activeDomain !== 'ALL') {
      const currentFilter = domainFilters.find(f => f.id === activeDomain);
      if (currentFilter && !currentFilter.match.includes(cat.category)) {
        return false;
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesCategory = cat.category.toLowerCase().includes(query);
      const matchesSkill = cat.skills.some(s => s.toLowerCase().includes(query));
      return matchesCategory || matchesSkill;
    }

    return true;
  });

  return (
    <section id="skills" className="py-16 relative border-t border-slate-800/80 perspective-1600">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL SKILLS MATRIX</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-white tracking-tight">
            Technical Skill Stack
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Complete technical competencies from the resume across data engineering, lakehouses, cloud platforms, and data analytics.
          </p>
        </div>

        {/* 3D Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          {/* 3D Domain Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#090d18] p-2 rounded-2xl border border-slate-800/90 w-full lg:w-auto shadow-xl">
            {domainFilters.map(filter => (
              <button
                key={filter.id}
                onClick={() => {
                  sound.playClick();
                  setActiveDomain(filter.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`pill-3d px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  activeDomain === filter.id
                    ? 'btn-3d bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Instant Search Bar */}
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills (e.g. Spark, AWS, SQL)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090d18] border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs font-mono cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 10 Categories Grid with Icon3D & 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCategories.map((cat, idx) => {
            const config = categoryConfig[cat.category] || { icon: Cpu, color: "cyan" };
            const Icon = config.icon;

            return (
              <Card3D key={idx} intensity={9} depth={18}>
                <div 
                  style={{ transformStyle: 'preserve-3d' }}
                  className="p-6 rounded-3xl bg-[#0c1220] border border-slate-800 hover:border-cyan-500/50 transition-all h-full flex flex-col justify-between shadow-xl group"
                >
                  <div>
                    {/* Header with 3D Icon Prism */}
                    <div 
                      style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
                      className="flex items-center gap-3.5 mb-4 pb-3.5 border-b border-slate-800/80"
                    >
                      <Icon3D icon={Icon} color={config.color} size="md" />
                      <h3 className="text-base font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                        {cat.category}
                      </h3>
                    </div>

                    {/* 3D Skill Pills */}
                    <div 
                      style={{ transform: 'translateZ(14px)' }}
                      className="flex flex-wrap gap-2"
                    >
                      {cat.skills.map((skill, sIdx) => {
                        const isMatch = searchQuery.trim() && skill.toLowerCase().includes(searchQuery.toLowerCase());
                        return (
                          <span
                            key={sIdx}
                            className={`pill-3d px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                              isMatch
                                ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30 scale-105'
                                : 'bg-[#11192c] border border-slate-700/60 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-200'
                            }`}
                          >
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Card3D>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-[#0c1220] border border-slate-800 font-mono text-xs text-slate-400">
            No matching skills found for "{searchQuery}". Click "Clear" to reset filters.
          </div>
        )}
      </div>
    </section>
  );
}
