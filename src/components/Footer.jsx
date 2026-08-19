import React from 'react';
import { ArrowUp, Download } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';

export default function Footer() {
  const { personal } = resumeData;

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#060911] text-slate-400 font-sans text-xs py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-extrabold font-heading text-white text-base flex items-center gap-2">
              <span>{personal.name}</span>
              <span className="text-cyan-400 text-xs font-mono font-normal">| Senior Data Engineer</span>
            </div>
            <div className="text-slate-400 text-xs mt-0.5">
              {personal.location} ({personal.relocation}) • {personal.phone}
            </div>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs">
            <a
              href="/Resume.pdf"
              download="Ceryl_Tejas_Chukka_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume PDF</span>
            </a>
            <span className="text-slate-700">|</span>
            <a href={`mailto:${personal.email}`} className="text-slate-400 hover:text-slate-200">
              {personal.email}
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={() => sound.playHover()}
              className="btn-3d p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-300 transition-colors flex items-center gap-2 font-mono text-xs ml-2 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
