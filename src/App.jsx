import React, { useState, useEffect, Suspense, lazy } from 'react';
import TwoDBackground from './components/TwoDBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import LazySection from './components/LazySection';
import LoadingScreen from './components/LoadingScreen';

// Dynamic Code-Splitting Lazy Loading for all sections below the fold
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const EducationCertifications = lazy(() => import('./components/EducationCertifications'));
const Contact = lazy(() => import('./components/Contact'));

// Sleek Cyber Skeleton Fallback Loader
function SectionSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="p-8 rounded-3xl bg-[#0a0f1d]/60 border border-slate-800/80 animate-pulse flex flex-col gap-6">
        <div className="h-6 w-48 bg-cyan-950/60 rounded-xl" />
        <div className="h-10 w-80 bg-slate-800/60 rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="h-44 bg-slate-900/60 rounded-2xl" />
          <div className="h-44 bg-slate-900/60 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'skills', 'experience', 'projects', 'education', 'contact'];
    
    const handleScroll = () => {
      // 1. If user is at or near the bottom of the page, activate contact
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollY + windowHeight >= documentHeight - 120) {
        setActiveSection('contact');
        return;
      }

      // 2. Check each section's position relative to viewport center
      const viewportCenter = scrollY + windowHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const elem = document.getElementById(sections[i]);
        if (elem && elem.offsetTop <= viewportCenter) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080b11] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* 3-Second 3D Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 2D Animated Background */}
      <TwoDBackground />

      {/* Cyber Grid Subtle Pattern */}
      <div className="fixed inset-0 cyber-grid-bg pointer-events-none z-0 opacity-30" />

      {/* Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections with Progressive Lazy Loading */}
      <main className="relative z-10">
        {/* Hero Section (Instant load for optimal First Contentful Paint) */}
        <Hero />

        {/* Lazy Loaded Section: Technical Skills */}
        <Suspense fallback={<SectionSkeleton />}>
          <LazySection fallbackHeight="420px">
            <Skills />
          </LazySection>
        </Suspense>

        {/* Lazy Loaded Section: Professional Experience */}
        <Suspense fallback={<SectionSkeleton />}>
          <LazySection fallbackHeight="500px">
            <Experience />
          </LazySection>
        </Suspense>

        {/* Lazy Loaded Section: Key Engineering Projects */}
        <Suspense fallback={<SectionSkeleton />}>
          <LazySection fallbackHeight="520px">
            <Projects />
          </LazySection>
        </Suspense>

        {/* Lazy Loaded Section: Education & Certifications */}
        <Suspense fallback={<SectionSkeleton />}>
          <LazySection fallbackHeight="480px">
            <EducationCertifications />
          </LazySection>
        </Suspense>

        {/* Lazy Loaded Section: Contact & Reach Out */}
        <Suspense fallback={<SectionSkeleton />}>
          <LazySection fallbackHeight="380px">
            <Contact />
          </LazySection>
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
