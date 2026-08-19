import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Briefcase, 
  FolderGit2, 
  GraduationCap, 
  Send, 
  Cpu, 
  User, 
  Download 
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#hero', icon: User },
    { name: 'Skills', href: '#skills', icon: Cpu },
    { name: 'Experience', href: '#experience', icon: Briefcase },
    { name: 'Projects', href: '#projects', icon: FolderGit2 },
    { name: 'Education & Certs', href: '#education', icon: GraduationCap },
    { name: 'Contact', href: '#contact', icon: Send }
  ];

  const handleNavClick = (href) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080b11]/90 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* 3D Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          onMouseEnter={() => sound.playHover()}
          style={{ perspective: '800px' }}
          className="flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-cyan-400 p-[2px] flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:shadow-cyan-500/50 group-hover:scale-105 group-hover:rotate-6 transition-all duration-300">
            <div className="w-full h-full bg-[#080c16] rounded-[14px] flex items-center justify-center font-mono font-black text-cyan-400 text-sm tracking-wider group-hover:text-white transition-colors">
              CTC
            </div>
          </div>
          <div>
            <div className="font-extrabold font-heading text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
              <span>Ceryl Tejas Chukka</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div className="text-[11px] font-mono text-cyan-400">
              Data Engineer • 4+ Years Exp
            </div>
          </div>
        </a>

        {/* 3D Segmented Navigation Pill Dock */}
        <nav 
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
          className="hidden lg:flex items-center gap-1 bg-[#0e1424]/85 backdrop-blur-xl px-3 py-1.5 rounded-full border border-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/25 to-indigo-500/25 text-cyan-300 border border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60 hover:scale-105'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
                <span>{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action: 3D Tactile Download Resume Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/Resume.pdf"
            download="Ceryl_Tejas_Chukka_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playClick()}
            className="btn-3d flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold font-sans cursor-pointer"
            title="Download Official Resume PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] bg-[#080b11]/98 backdrop-blur-2xl border-b border-slate-800 p-4 shadow-2xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-medium border transition-colors ${
                    isActive
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 font-bold'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          <a
            href="/Resume.pdf"
            download="Ceryl_Tejas_Chukka_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Download Official Resume PDF</span>
          </a>
        </div>
      )}
    </header>
  );
}
