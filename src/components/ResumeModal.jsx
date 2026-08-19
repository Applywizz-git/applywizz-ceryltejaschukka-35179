import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const { personal, technicalSkills, professionalExperience, projects, education, certifications, leadership } = resumeData;

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  const handleCopyText = () => {
    sound.playClick();
    const resumeText = `CERYL TEJAS CHUKKA
${personal.location} (${personal.relocation}) | ${personal.phone} | ${personal.email} | Portfolio

PROFESSIONAL SUMMARY
${personal.summary}

TECHNICAL SKILLS
${technicalSkills.map(cat => `${cat.category}: ${cat.skills.join(', ')}`).join('\n')}

PROFESSIONAL EXPERIENCE
${professionalExperience.map(exp => `${exp.role} ${exp.period}\n${exp.company}${exp.client ? ` | Client: ${exp.client}` : ''} | ${exp.location}\n${exp.bullets.map(b => `• ${b}`).join('\n')}`).join('\n\n')}

PROJECTS
${projects.map(proj => `${proj.title}\n${proj.bullets.map(b => `• ${b}`).join('\n')}`).join('\n\n')}

EDUCATION
${education.map(ed => `${ed.degree} ${ed.institution} | ${ed.location} (${ed.period})`).join('\n')}

CERTIFICATIONS
${certifications.map(c => `• ${c.title} - ${c.issuer}`).join('\n')}

LEADERSHIP & COMMUNITY INVOLVEMENT
${leadership.map(l => `${l.role} | ${l.period}\n${l.event}\n• ${l.description}`).join('\n\n')}`;

    navigator.clipboard.writeText(resumeText).then(() => {
      setCopied(true);
      sound.playSuccess();
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      } catch {}
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c1220] border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-200">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#080c16] border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-cyan-400 font-semibold">
            <FileText className="w-4 h-4" />
            <span>Resume Document Preview • {personal.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono hover:text-cyan-300 transition-colors"
              title="Copy Complete Text"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-xs font-mono font-bold text-white shadow-md hover:opacity-90 transition-opacity"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Resume Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm font-sans leading-relaxed">
          {/* Header */}
          <div className="text-center border-b border-slate-800 pb-5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading uppercase mb-1">
              {personal.name}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-cyan-300">
              <span>{personal.location} ({personal.relocation})</span>
              <span>|</span>
              <a href={`tel:${personal.phone}`} className="hover:underline">{personal.phone}</a>
              <span>|</span>
              <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2 border-b border-slate-800 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed text-justify">
              {personal.summary}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2 border-b border-slate-800 pb-1">
              Technical Skills
            </h2>
            <div className="text-xs space-y-1.5 text-slate-300">
              {technicalSkills.map((cat, idx) => (
                <div key={idx}>
                  <strong className="text-white font-semibold">{cat.category}:</strong> {cat.skills.join(', ')}
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3 border-b border-slate-800 pb-1">
              Professional Experience
            </h2>
            <div className="space-y-4">
              {professionalExperience.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between text-xs font-semibold text-white">
                    <span>{exp.role} — <span className="text-cyan-300">{exp.company}</span> {exp.client && `| ${exp.client}`}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{exp.period} | {exp.location}</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3 border-b border-slate-800 pb-1">
              Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="text-xs font-semibold text-white">
                    {proj.title}
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                    {proj.bullets.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2 border-b border-slate-800 pb-1">
              Education
            </h2>
            <div className="space-y-1.5 text-xs">
              {education.map((ed, i) => (
                <div key={i} className="flex flex-wrap justify-between">
                  <div>
                    <strong className="text-white">{ed.degree}</strong> — <span className="text-slate-300">{ed.institution} | {ed.location}</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">{ed.period}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2 border-b border-slate-800 pb-1">
              Certifications
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-300">
              {certifications.map((c, i) => (
                <li key={i}>• {c.title} - {c.issuer}</li>
              ))}
            </ul>
          </div>

          {/* Leadership & Community Involvement */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2 border-b border-slate-800 pb-1">
              Leadership & Community Involvement
            </h2>
            <div className="space-y-2 text-xs text-slate-300">
              {leadership.map((lead, i) => (
                <div key={i}>
                  <div className="text-white font-semibold">{lead.role} | {lead.period} — {lead.event}</div>
                  <div>• {lead.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
