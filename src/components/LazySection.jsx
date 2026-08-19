import React, { useState, useEffect, useRef } from 'react';

export default function LazySection({ children, fallbackHeight = "350px", id = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '250px 0px', // Pre-load 250px before entering viewport
        threshold: 0.01
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} id={id} className="min-h-[100px]">
      {isVisible ? (
        <div className="animate-fadeIn transition-opacity duration-700">
          {children}
        </div>
      ) : (
        <div 
          style={{ minHeight: fallbackHeight }}
          className="flex items-center justify-center p-8 rounded-3xl bg-[#090d18]/40 border border-slate-800/40 my-8 mx-auto max-w-6xl"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-cyan-500/30 border-t-cyan-400 animate-spin" />
            <div className="text-xs font-mono text-slate-500 animate-pulse">
              Loading Data Architecture...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
