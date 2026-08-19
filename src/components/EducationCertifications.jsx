import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Users, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  BookOpen, 
  RotateCw, 
  Calendar, 
  Sparkles,
  Globe,
  Trophy,
  Megaphone
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import Card3D from './Card3D';
import Icon3D from './Icon3D';
import { sound } from '../utils/audio';

export default function EducationCertifications() {
  const { education, certifications, leadership } = resumeData;
  const [activeProvider, setActiveProvider] = useState('ALL');

  // Academic timeline details enriched from resume.md
  const educationTimeline = [
    {
      ...education[0],
      id: "graduate-degree",
      shortName: "UC Denver",
      level: "Graduate Degree (Master of Science)",
      iconColor: "cyan",
      curriculum: [
        "Database Management Systems",
        "Enterprise Data Warehousing",
        "Business Intelligence & Analytics",
        "Systems Analysis & Design",
        "Cloud Data Architectures"
      ],
      highlights: "Master's specialization in distributed database design, cloud data warehousing models, and scalable business intelligence architectures."
    },
    {
      ...education[1],
      id: "undergraduate-degree",
      shortName: "Andhra University",
      level: "Undergraduate Degree (Bachelor of Engineering)",
      iconColor: "indigo",
      curriculum: [
        "Sensor Networks & Telemetry",
        "Microcontroller Architecture",
        "Industrial Automation & Control",
        "Real-Time Signal Processing",
        "Applied Computational Engineering"
      ],
      highlights: "Four-year engineering foundation in real-time sensor streams, hardware telemetry processing, and industrial automated control systems."
    }
  ];

  const providers = [
    { id: 'ALL', label: 'All Credentials (6)' },
    { id: 'IBM', label: 'IBM (2)' },
    { id: 'Google Cloud', label: 'Google Cloud (2)' },
    { id: 'LinkedIn Learning', label: 'LinkedIn Learning (2)' }
  ];

  const certDetails = [
    {
      ...certifications[0],
      id: 0,
      provider: "IBM",
      providerBg: "bg-blue-950/80 border-blue-500/40 text-blue-300",
      iconColor: "cyan",
      focus: "End-to-End Data Pipelines & PySpark",
      credentialId: "IBM-DE-PRO-2024",
      skillsVerified: ["PySpark", "ETL Pipelines", "Data Warehousing", "Spark SQL", "Python"],
      tag: "Professional Certificate"
    },
    {
      ...certifications[1],
      id: 1,
      provider: "IBM",
      providerBg: "bg-blue-950/80 border-blue-500/40 text-blue-300",
      iconColor: "indigo",
      focus: "Star Schemas, Data Modeling & ETL",
      credentialId: "IBM-DWE-PRO-2024",
      skillsVerified: ["Dimensional Modeling", "Star Schema", "ETL/ELT", "Data Marts", "SQL Optimization"],
      tag: "Professional Certificate"
    },
    {
      ...certifications[2],
      id: 2,
      provider: "Google Cloud",
      providerBg: "bg-amber-950/80 border-amber-500/40 text-amber-300",
      iconColor: "amber",
      focus: "BigQuery, Big Data & GCP Pipelines",
      credentialId: "GCP-DE-BDML-2024",
      skillsVerified: ["Google BigQuery", "GCP Dataflow", "Cloud Storage", "Batch & Streaming", "Vertex AI"],
      tag: "Cloud Specialization"
    },
    {
      ...certifications[3],
      id: 3,
      provider: "Google Cloud",
      providerBg: "bg-amber-950/80 border-amber-500/40 text-amber-300",
      iconColor: "sky",
      focus: "GCP Storage, Compute & ETL Architecture",
      credentialId: "GCP-DE-INTRO-2024",
      skillsVerified: ["Cloud SQL", "Dataproc", "Pub/Sub", "Data Lakehouse", "IAM Security"],
      tag: "Cloud Specialization"
    },
    {
      ...certifications[4],
      id: 4,
      provider: "LinkedIn Learning",
      providerBg: "bg-cyan-950/80 border-cyan-500/40 text-cyan-300",
      iconColor: "emerald",
      focus: "Data Infrastructure & Architecture",
      tag: "Industry Accreditation",
      credentialId: "LIL-DEF-FOUND-2023",
      skillsVerified: ["Data Lifecycle", "Warehouse Architecture", "Distributed Data", "Data Quality", "Governance"]
    },
    {
      ...certifications[5],
      id: 5,
      provider: "LinkedIn Learning",
      providerBg: "bg-rose-950/80 border-rose-500/40 text-rose-300",
      iconColor: "rose",
      focus: "Distributed Compute & Spark Core",
      tag: "Big Data Training",
      credentialId: "LIL-SPARK-ET-2023",
      skillsVerified: ["Apache Spark", "RDDs & DataFrames", "Cluster Tuning", "Memory Partitioning", "PySpark Core"]
    }
  ];

  // Enriched Leadership metadata faithfully preserved from resume.md
  const leadershipDetails = [
    {
      ...leadership[0], // International Coastal Cleanup
      icon: Globe,
      color: "emerald",
      badgeColor: "bg-emerald-950/80 border-emerald-500/40 text-emerald-300",
      hoverBorder: "hover:border-emerald-500/70",
      glowColor: "from-emerald-500/20",
      impactTags: ["Environmental Conservation", "Community Outreach", "Volunteer Operations"],
      category: "Environmental Stewardship"
    },
    {
      ...leadership[1], // Vibrationz Technical Symposium
      icon: Trophy,
      color: "indigo",
      badgeColor: "bg-indigo-950/80 border-indigo-500/40 text-indigo-300",
      hoverBorder: "hover:border-indigo-500/70",
      glowColor: "from-indigo-500/20",
      impactTags: ["Technical Events", "Hands-on Workshops", "Cross-Functional Teams"],
      category: "Academic & Tech Leadership"
    },
    {
      ...leadership[2], // NSS Public Relations
      icon: Megaphone,
      color: "amber",
      badgeColor: "bg-amber-950/80 border-amber-500/40 text-amber-300",
      hoverBorder: "hover:border-amber-500/70",
      glowColor: "from-amber-500/20",
      impactTags: ["Strategic Communications", "Social Awareness", "Campaign Outreach"],
      category: "Community Engagement"
    }
  ];

  const filteredCerts = certDetails.filter(cert => {
    if (activeProvider === 'ALL') return true;
    return cert.provider === activeProvider;
  });

  return (
    <section id="education" className="py-16 relative border-t border-slate-800/80 perspective-1600 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACCREDITATIONS & CREDENTIALS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-white tracking-tight">
            Education & Certifications
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Academic degrees in Information Systems, verified industry certifications, and community leadership from the resume.
          </p>
        </div>

        {/* 1. Academic Background - 3D Alternating Timeline Effect (Left & Right) */}
        <div className="mb-16">
          <div className="flex items-center justify-between gap-3 mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center gap-2.5">
              <Icon3D icon={GraduationCap} color="cyan" size="sm" />
              <span>Academic Background (Chronological Timeline)</span>
            </h3>
          </div>

          {/* Alternating 3D Timeline Container */}
          <div className="relative">
            {/* Center Conduit Rail on Desktop (Left on Mobile) */}
            <div className="absolute top-0 bottom-0 left-3 sm:left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500/80 via-indigo-500/60 to-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.5)]" />

            <div className="space-y-10 md:space-y-16">
              {educationTimeline.map((edu, idx) => {
                const isLeft = idx % 2 === 0;

                return (
                  <div key={edu.id} className="relative flex flex-col md:flex-row items-center">
                    {/* 3D Pulsing Center Conduit Node */}
                    <div className="absolute left-3 sm:left-4 md:left-1/2 -translate-x-1/2 top-6 md:top-8 w-6 h-6 md:w-7 md:h-7 rounded-full bg-[#080b11] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.95)] z-20 animate-pulse-3d">
                      <span className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(6,182,212,1)]" />
                    </div>

                    {/* Timeline Card Container (Alternating Left / Right on Desktop) */}
                    <div className={`w-full pl-8 sm:pl-10 md:pl-0 ${
                      isLeft 
                        ? 'md:w-[calc(50%-2.5rem)] md:mr-auto' 
                        : 'md:w-[calc(50%-2.5rem)] md:ml-auto'
                    }`}>
                      <Card3D intensity={10} depth={20}>
                        <div 
                          style={{ transformStyle: 'preserve-3d' }}
                          className="p-5 sm:p-7 rounded-3xl bg-[#0c1220] border border-slate-800 hover:border-cyan-500/60 transition-all shadow-2xl group relative overflow-hidden"
                        >
                          {/* Holographic Subtle Corner Flare */}
                          <div className={`absolute top-0 w-28 h-28 pointer-events-none rounded-full blur-2xl ${
                            isLeft ? 'right-0 bg-cyan-500/10' : 'left-0 bg-indigo-500/10'
                          }`} />

                          {/* Header Row */}
                          <div 
                            style={{ transform: 'translateZ(22px)', transformStyle: 'preserve-3d' }}
                            className="pb-4 mb-4 border-b border-slate-800"
                          >
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]">
                                {edu.period}
                              </span>
                              <span className="text-[11px] font-mono text-slate-400 font-semibold bg-slate-900/80 border border-slate-700/60 px-2.5 py-0.5 rounded-lg">
                                {edu.shortName}
                              </span>
                            </div>

                            <div className="flex items-start gap-3.5">
                              <Icon3D icon={BookOpen} color={edu.iconColor} size="md" />
                              <div className="min-w-0 flex-1">
                                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-semibold mb-0.5">
                                  {edu.level}
                                </div>
                                <h4 className="text-base sm:text-lg md:text-xl font-bold font-heading text-white leading-snug group-hover:text-cyan-300 transition-colors">
                                  {edu.degree}
                                </h4>
                                <div className="text-sm font-semibold text-cyan-300 mt-1">
                                  {edu.institution}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-3 pt-2 border-t border-slate-800/60">
                              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                              <span>{edu.location}</span>
                            </div>
                          </div>

                          {/* Core Curriculum Competencies */}
                          <div style={{ transform: 'translateZ(14px)' }}>
                            <div className="text-xs font-mono text-slate-400 mb-2 font-semibold flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span>Core Academic Competencies:</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-3.5">
                              {edu.curriculum.map((course, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="pill-3d px-2.5 py-1 rounded-lg bg-[#11192d] border border-slate-700/70 text-cyan-200 text-[10px] sm:text-[11px] font-mono font-medium shadow-sm hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-cyan-500/40 pl-3 py-1 bg-cyan-950/20 rounded-r-lg">
                              "{edu.highlights}"
                            </p>
                          </div>
                        </div>
                      </Card3D>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. Verified Industry Certifications - Advanced 3D Hover-Flippable Holographic Grid */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center gap-2.5">
                <Icon3D icon={Award} color="indigo" size="sm" />
                <span>Verified Industry Certifications (6 Credentials)</span>
              </h3>
              <p className="text-xs font-mono text-cyan-400 mt-1 flex items-center gap-1.5">
                <span>✨ Hover over any certificate to flip and inspect verified competencies & curriculum details.</span>
              </p>
            </div>

            {/* 3D Provider Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-[#090d18] p-1.5 rounded-2xl border border-slate-800/90 shadow-xl">
              {providers.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setActiveProvider(p.id);
                  }}
                  onMouseEnter={() => sound.playHover()}
                  className={`pill-3d px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    activeProvider === p.id
                      ? 'btn-3d bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Hover Flip Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                onMouseEnter={() => sound.playHover()}
                className="cert-card-wrap min-h-[300px] cursor-pointer group select-none"
              >
                <div className="cert-3d-card">
                  {/* ===== FRONT SIDE: Executive Holographic Plaque ===== */}
                  <div className="cert-side-front rounded-3xl p-6 bg-gradient-to-b from-[#0e1628] to-[#0a0f1d] border border-slate-800 group-hover:border-cyan-500/70 transition-all duration-300 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/15 via-indigo-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:from-cyan-500/30 transition-all duration-500" />

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className={`text-[11px] font-mono font-bold px-3 py-1 rounded-xl border shadow-sm ${cert.providerBg}`}>
                          {cert.provider}
                        </span>
                        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full shadow-sm">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>Verified</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3.5 mb-3">
                        <Icon3D icon={ShieldCheck} color={cert.iconColor} size="sm" />
                        <h4 className="text-sm sm:text-base font-bold font-heading text-white leading-snug group-hover:text-cyan-300 transition-colors">
                          {cert.title}
                        </h4>
                      </div>

                      <div className="mt-3">
                        <span className="text-[11px] font-mono text-slate-300 bg-[#11192c] border border-slate-700/60 px-3 py-1 rounded-xl inline-block shadow-inner">
                          🎯 {cert.focus}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-3 text-xs font-mono">
                      <span className="text-slate-400 text-[11px]">
                        Platform: <strong className="text-cyan-300 font-semibold">{cert.issuer}</strong>
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] text-cyan-400 group-hover:text-white font-bold bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-lg transition-all">
                        <RotateCw className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                        <span>Hover to Inspect</span>
                      </span>
                    </div>
                  </div>

                  {/* ===== BACK SIDE: Verified Competencies Breakdown ===== */}
                  <div className="cert-side-back rounded-3xl p-6 bg-gradient-to-b from-[#091122] to-[#070c18] border-2 border-cyan-500/70 transition-all duration-300 flex flex-col justify-between shadow-[0_0_40px_rgba(6,182,212,0.35)] relative overflow-hidden">
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-800">
                        <span className="text-[10px] font-mono text-cyan-300 uppercase font-bold tracking-wider flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Accreditation Details</span>
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {cert.credentialId}
                        </span>
                      </div>

                      <div className="mb-3">
                        <div className="text-[11px] font-mono text-slate-400 mb-2 font-semibold">
                          Verified Production Competencies:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {cert.skillsVerified.map((sk, skIdx) => (
                            <span
                              key={skIdx}
                              className="pill-3d px-2.5 py-1 rounded-lg bg-[#0e172a] border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-medium shadow-sm"
                            >
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Industry Standard</span>
                      </span>

                      <span className="text-[10px] font-mono text-cyan-300/80 bg-cyan-950/40 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                        Verified Credential
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Leadership & Community Involvement - Enhanced 3D Executive Glass Showcases */}
        <div>
          <div className="mb-8">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white flex items-center gap-2.5">
              <Icon3D icon={Users} color="emerald" size="sm" />
              <span>Leadership & Community Engagement</span>
            </h3>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Documented extracurricular leadership, technical workshop organization, and volunteer stewardship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadershipDetails.map((lead, lIdx) => (
              <Card3D key={lIdx} intensity={14} depth={24}>
                <div 
                  style={{ transformStyle: 'preserve-3d' }}
                  className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#0e1628] to-[#0a0f1d] border border-slate-800 ${lead.hoverBorder} transition-all duration-300 h-full shadow-2xl flex flex-col justify-between group relative overflow-hidden`}
                >
                  {/* Holographic Ambient Glow Flare */}
                  <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${lead.glowColor} to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500`} />

                  <div style={{ transform: 'translateZ(22px)', transformStyle: 'preserve-3d' }}>
                    {/* Top Row: Category Tag & Period */}
                    <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800/80">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                        {lead.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400 font-bold bg-[#11192e] border border-slate-700/60 px-2.5 py-0.5 rounded-lg">
                        {lead.period}
                      </span>
                    </div>

                    {/* Role Header with 3D Icon Prism */}
                    <div className="flex items-start gap-3.5 sm:gap-4 mb-4">
                      <Icon3D icon={lead.icon} color={lead.color} size="md" />
                      <div className="min-w-0 flex-1">
                        <span className={`inline-block text-[11px] font-mono font-bold px-3 py-1 rounded-xl border shadow-sm mb-1.5 ${lead.badgeColor}`}>
                          {lead.role}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold font-heading text-white leading-snug group-hover:text-cyan-300 transition-colors">
                          {lead.event}
                        </h4>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-300 leading-relaxed mb-5">
                      {lead.description}
                    </p>
                  </div>

                  {/* Impact Tags Matrix */}
                  <div 
                    style={{ transform: 'translateZ(16px)' }}
                    className="pt-4 border-t border-slate-800/80"
                  >
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>Key Leadership Pillars:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {lead.impactTags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="pill-3d px-2.5 py-1 rounded-lg bg-[#0e1628] border border-slate-700/60 text-cyan-200 text-[10px] font-mono font-medium shadow-sm hover:border-cyan-500/40 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
