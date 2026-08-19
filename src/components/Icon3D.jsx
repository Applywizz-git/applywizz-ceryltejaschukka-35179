import React, { useState } from 'react';

export default function Icon3D({ 
  icon: Icon, 
  color = 'cyan', 
  size = 'md', 
  className = '',
  glowing = true 
}) {
  const [isHovered, setIsHovered] = useState(false);

  const colorThemes = {
    cyan: {
      bg: 'bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-transparent',
      border: 'border-cyan-500/40',
      text: 'text-cyan-400',
      shadow: '0 8px 24px -4px rgba(6, 182, 212, 0.45)',
      glow: 'shadow-[0_0_15px_rgba(6,182,212,0.6)]'
    },
    indigo: {
      bg: 'bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-transparent',
      border: 'border-indigo-500/40',
      text: 'text-indigo-400',
      shadow: '0 8px 24px -4px rgba(99, 102, 241, 0.45)',
      glow: 'shadow-[0_0_15px_rgba(99,102,241,0.6)]'
    },
    emerald: {
      bg: 'bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-transparent',
      border: 'border-emerald-500/40',
      text: 'text-emerald-400',
      shadow: '0 8px 24px -4px rgba(16, 185, 129, 0.45)',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.6)]'
    },
    amber: {
      bg: 'bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-transparent',
      border: 'border-amber-500/40',
      text: 'text-amber-400',
      shadow: '0 8px 24px -4px rgba(245, 158, 11, 0.45)',
      glow: 'shadow-[0_0_15px_rgba(245,158,11,0.6)]'
    },
    rose: {
      bg: 'bg-gradient-to-br from-rose-500/20 via-rose-500/10 to-transparent',
      border: 'border-rose-500/40',
      text: 'text-rose-400',
      shadow: '0 8px 24px -4px rgba(244, 63, 94, 0.45)',
      glow: 'shadow-[0_0_15px_rgba(244,63,94,0.6)]'
    },
    sky: {
      bg: 'bg-gradient-to-br from-sky-500/20 via-sky-500/10 to-transparent',
      border: 'border-sky-500/40',
      text: 'text-sky-400',
      shadow: '0 8px 24px -4px rgba(14, 165, 233, 0.45)',
      glow: 'shadow-[0_0_15px_rgba(14,165,233,0.6)]'
    },
    violet: {
      bg: 'bg-gradient-to-br from-violet-500/20 via-violet-500/10 to-transparent',
      border: 'border-violet-500/40',
      text: 'text-violet-400',
      shadow: '0 8px 24px -4px rgba(139, 92, 246, 0.45)',
      glow: 'shadow-[0_0_15px_rgba(139,92,246,0.6)]'
    }
  };

  const sizes = {
    sm: { container: 'w-8 h-8 p-1.5 rounded-lg', icon: 'w-4 h-4' },
    md: { container: 'w-10 h-10 p-2.5 rounded-xl', icon: 'w-5 h-5' },
    lg: { container: 'w-12 h-12 p-3 rounded-2xl', icon: 'w-6 h-6' },
    xl: { container: 'w-14 h-14 p-3.5 rounded-2xl', icon: 'w-7 h-7' }
  };

  const theme = colorThemes[color] || colorThemes.cyan;
  const sizeConfig = sizes[size] || sizes.md;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        perspective: '600px',
        transformStyle: 'preserve-3d'
      }}
      className={`inline-flex items-center justify-center relative cursor-pointer select-none ${className}`}
    >
      {/* 3D Prism Slab */}
      <div
        style={{
          transform: isHovered 
            ? 'translateZ(20px) rotateX(12deg) rotateY(-12deg) scale(1.12)' 
            : 'translateZ(0px) rotateX(0deg) rotateY(0deg) scale(1)',
          transformStyle: 'preserve-3d',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: isHovered ? theme.shadow : '0 4px 12px rgba(0,0,0,0.4)',
          borderTop: '1px solid rgba(255, 255, 255, 0.25)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.15)'
        }}
        className={`flex items-center justify-center border ${theme.border} ${theme.bg} ${sizeConfig.container} backdrop-blur-md relative`}
      >
        {/* Ambient Backglow */}
        {glowing && (
          <div
            className={`absolute inset-0 rounded-inherit opacity-40 transition-opacity duration-300 pointer-events-none ${
              isHovered ? 'opacity-80' : ''
            }`}
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2), transparent 70%)`
            }}
          />
        )}

        {/* Icon Component */}
        <div style={{ transform: 'translateZ(14px)' }} className={`${theme.text} transition-transform duration-300`}>
          {Icon && <Icon className={sizeConfig.icon} />}
        </div>
      </div>
    </div>
  );
}
