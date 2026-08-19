import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';
import Icon3D from './Icon3D';

export default function Contact() {
  const { personal } = resumeData;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const copyToClipboard = async (text, type, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      sound.playClick();
    } catch {}

    let success = false;

    // Method 1: Modern navigator.clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch (err) {
        success = false;
      }
    }

    // Method 2: Synchronous input execCommand fallback
    if (!success) {
      try {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = text;
        input.style.position = 'fixed';
        input.style.left = '-9999px';
        input.style.top = '-9999px';
        document.body.appendChild(input);
        input.focus();
        input.select();
        success = document.execCommand('copy');
        document.body.removeChild(input);
      } catch (err) {
        success = false;
      }
    }

    try {
      sound.playSuccess();
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.85 } });
    } catch {}

    if (type === 'email') {
      setCopiedEmail(true);
      showToast(`✓ Copied email: ${text}`);
      setTimeout(() => setCopiedEmail(false), 3000);
    } else {
      setCopiedPhone(true);
      showToast(`✓ Copied phone: ${text}`);
      setTimeout(() => setCopiedPhone(false), 3000);
    }
  };

  const handleSendEmail = (e) => {
    copyToClipboard(personal.email, 'email', e);
    // Open email in standard handler or Gmail
    const mailtoUrl = `mailto:${personal.email}?subject=Data%20Engineering%20Opportunity&body=Hi%20Ceryl,%0D%0A%0D%0AI%20came%20across%20your%20portfolio...`;
    window.location.href = mailtoUrl;
  };

  const handleCallPhone = (e) => {
    copyToClipboard(personal.phone, 'phone', e);
    window.location.href = `tel:${personal.phone}`;
  };

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personal.email)}&su=${encodeURIComponent('Data Engineering Opportunity')}&body=${encodeURIComponent('Hi Ceryl,\n\nI reviewed your portfolio and would love to connect regarding...')}`;

  return (
    <section id="contact" className="py-16 relative border-t border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Floating Confirmation Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-fadeIn pointer-events-none">
            <div className="px-5 py-3 rounded-2xl bg-cyan-500 text-slate-950 font-mono text-xs font-bold shadow-2xl flex items-center gap-2.5 border border-cyan-300">
              <Check className="w-4 h-4 text-slate-950" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Send className="w-3.5 h-3.5" />
            <span>CONTACT & REACH OUT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-white tracking-tight">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Available for Senior Data Engineering opportunities. Connect directly via email or phone.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Email Card */}
          <div className="p-6 rounded-3xl bg-[#0c1220] border border-slate-800 hover:border-cyan-500/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group shadow-xl hover:shadow-[0_15px_35px_rgba(6,182,212,0.15)] relative z-20">
            <div>
              <div className="mb-4">
                <Icon3D icon={Mail} color="cyan" size="md" />
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">
                Email Address
              </div>
              <button
                type="button"
                onClick={(e) => copyToClipboard(personal.email, 'email', e)}
                className="text-left text-sm font-mono text-white hover:text-cyan-300 transition-colors break-all block mb-4 font-semibold cursor-pointer w-full"
                title="Click to copy email address"
              >
                {personal.email}
              </button>
            </div>

            <div className="pt-3.5 border-t border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSendEmail}
                  className="btn-3d flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-mono font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
                >
                  <span>Send Email</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => copyToClipboard(personal.email, 'email', e)}
                  className={`btn-3d p-2.5 rounded-xl border text-xs transition-colors cursor-pointer active:scale-95 ${
                    copiedEmail
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-cyan-300'
                  }`}
                  title="Copy Email to Clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Instant Webmail Option */}
              <a
                href={gmailComposeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => showToast('Opening in Gmail...')}
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline flex items-center justify-center gap-1 pt-1"
              >
                <span>Or open compose in Gmail</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="p-6 rounded-3xl bg-[#0c1220] border border-slate-800 hover:border-indigo-500/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group shadow-xl hover:shadow-[0_15px_35px_rgba(99,102,241,0.15)] relative z-20">
            <div>
              <div className="mb-4">
                <Icon3D icon={Phone} color="indigo" size="md" />
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">
                Phone Number
              </div>
              <button
                type="button"
                onClick={(e) => copyToClipboard(personal.phone, 'phone', e)}
                className="text-left text-sm font-mono text-white hover:text-indigo-300 transition-colors block mb-4 font-semibold cursor-pointer w-full"
                title="Click to copy phone number"
              >
                {personal.phone}
              </button>
            </div>

            <div className="pt-3.5 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCallPhone}
                  className="btn-3d-indigo flex-1 py-2.5 px-3 rounded-xl bg-[#0e1628] border border-indigo-500/40 text-indigo-300 text-xs font-mono font-bold hover:text-white transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-lg active:scale-95"
                >
                  <span>Call Directly</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => copyToClipboard(personal.phone, 'phone', e)}
                  className={`btn-3d p-2.5 rounded-xl border text-xs transition-colors cursor-pointer active:scale-95 ${
                    copiedPhone
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-indigo-300'
                  }`}
                  title="Copy Phone to Clipboard"
                >
                  {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-[10px] font-mono text-slate-500 text-center mt-2.5">
                US Direct Line
              </div>
            </div>
          </div>

          {/* Location Card */}
          <div className="p-6 rounded-3xl bg-[#0c1220] border border-slate-800 hover:border-rose-500/60 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full group shadow-xl hover:shadow-[0_15px_35px_rgba(244,63,94,0.15)] relative z-20">
            <div>
              <div className="mb-4">
                <Icon3D icon={MapPin} color="rose" size="md" />
              </div>
              <div className="text-[11px] font-mono text-slate-400 uppercase mb-1">
                Location & Relocation
              </div>
              <div className="text-sm font-mono text-white mb-2 font-semibold">
                {personal.location}
              </div>
              <div className="inline-block px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold shadow-sm">
                {personal.relocation}
              </div>
            </div>

            <div className="pt-3.5 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>United States Work Authorization</span>
            </div>
          </div>
        </div>

        {/* Availability Banner */}
        <div className="p-5 rounded-3xl bg-[#0c1220] border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-300 shadow-xl relative z-20">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 -ml-5.5" />
            <span>Candidate Status: <strong className="text-emerald-300 font-bold">Available for Senior Data Engineering Roles</strong></span>
          </div>
          <button
            type="button"
            onClick={handleSendEmail}
            className="text-cyan-400 hover:underline flex items-center gap-1.5 font-bold cursor-pointer"
          >
            <span>Reach out via {personal.email}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
