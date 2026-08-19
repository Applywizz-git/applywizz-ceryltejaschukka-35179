import React, { useRef, useState } from 'react';
import { sound } from '../utils/audio';

export default function Card3D({ 
  children, 
  className = '', 
  intensity = 10, 
  glare = true,
  depth = 16,
  onClick,
  ...props 
}) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width;
    const yPct = mouseY / height;

    const rotX = ((yPct - 0.5) * -intensity).toFixed(2);
    const rotY = ((xPct - 0.5) * intensity).toFixed(2);

    setCoords({ x: rotX, y: rotY });
    setGlarePos({ x: (xPct * 100).toFixed(1), y: (yPct * 100).toFixed(1) });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: '1400px',
        transformStyle: 'preserve-3d'
      }}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      {...props}
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${coords.x}deg) rotateY(${coords.y}deg) translateZ(${depth}px) scale3d(1.018, 1.018, 1.018)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)',
          transformStyle: 'preserve-3d',
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px -5px rgba(6, 182, 212, 0.25)' 
            : '0 10px 30px -10px rgba(0, 0, 0, 0.5)'
        }}
        className="w-full relative rounded-3xl"
      >
        {/* Holographic Specular Glare & Reflective Perimeter */}
        {glare && isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 rounded-3xl overflow-hidden"
            style={{
              background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(6, 182, 212, 0.22), transparent 75%)`,
              mixBlendMode: 'screen'
            }}
          />
        )}

        {children}
      </div>
    </div>
  );
}
