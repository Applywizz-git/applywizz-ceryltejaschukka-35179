import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  Sparkles, 
  HelpCircle, 
  FileText, 
  Cpu, 
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { sound } from '../utils/audio';

export default function TerminalPlayground({ onOpenResume }) {
  const [inputVal, setInputVal] = useState('');
  const [matrixMode, setMatrixMode] = useState(false);
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: `⚡ Ceryl Tejas Chukka Lakehouse CLI [Version 4.2.0-LTS]
Type 'help' to view available commands, or click any preset chip below.`
    }
  ]);

  const terminalEndRef = useRef(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    sound.playClick();

    if (!trimmed) return;

    const newHistory = [...history, { type: 'user', text: `$ ${cmd}` }];

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (trimmed === 'help') {
      newHistory.push({
        type: 'output',
        text: `Available Commands:
  • help               - Display this help manual
  • experience         - Query professional roles (Google/Star Tech, Truist, Augur)
  • skills             - List core Lakehouse, Spark, SQL, & Cloud competencies
  • projects           - View architecture highlights (Kafka Streaming, Redshift, IoT)
  • certs              - View 6 verified cloud & data certifications
  • education          - View MSIS UC Denver & BE Andhra University degrees
  • metrics            - Show overall performance benchmarks (+25% speedup, etc.)
  • contact            - Display email, phone, and relocation availability
  • download_resume    - Open the full formatted resume preview
  • matrix             - Toggle Cyber Matrix visual mode
  • clear              - Clear the terminal screen`
      });
    } else if (trimmed === 'experience' || trimmed === 'exp') {
      newHistory.push({
        type: 'output',
        text: `💼 PROFESSIONAL EXPERIENCE RECORD:

1. Data Engineer (Jul 2026 - Present)
   Company: Star Tech Networks Inc. | Client: Google | USA
   Impact: +25% Query Speedup on high-volume logs, 8 automated KPI feeds with OpenAI API validation, curated Google BigQuery datasets.

2. Cloud Data Engineer (May 2025 - May 2026)
   Company: Truist Bank | Charlotte, NC / Remote
   Impact: +22% Dashboard Refresh Speed, -18% S3 query scans, 6 banking operational pipelines (AWS Glue, Lambda, Bedrock embeddings).

3. Data Engineering Associate (May 2021 - Jun 2024)
   Company: Augur Talentcare Pvt Ltd | India / Remote
   Impact: +18% Reporting Accuracy, +15% handoff time reduction, MySQL/Postgres staging & Apache Airflow orchestration.`
      });
    } else if (trimmed === 'skills') {
      newHistory.push({
        type: 'output',
        text: `⚡ TECHNICAL SKILL MATRIX:
• Languages: Python, SQL, PySpark, Spark SQL
• Big Data & Lakehouse: Apache Spark, Databricks, Delta Lake, Kafka, Spark Structured Streaming
• Cloud Platforms: AWS S3, AWS Glue, AWS Lambda, AWS CloudWatch, Redshift, Google BigQuery
• Data Modeling: Dimensional Modeling, Star Schema, Fact/Dim Tables, PostgreSQL, MySQL
• Workflow & DataOps: Apache Airflow, dbt, Git/GitHub, Metadata Documentation
• AI Integration: Amazon Bedrock, OpenAI API, Vector Embeddings, AI-Assisted SQL Validation`
      });
    } else if (trimmed === 'projects') {
      newHistory.push({
        type: 'output',
        text: `🚀 FEATURED DATA ARCHITECTURES:
1. Real-Time Network KPI Streaming Pipeline:
   Kafka -> PySpark Structured Streaming -> Delta Lake Bronze/Silver/Gold -> BigQuery
2. Cloud Data Warehouse and BI Reporting Model:
   AWS S3 -> AWS Glue -> Amazon Redshift (Star Schema) -> dbt -> Power BI / Tableau
3. Healthcare IoT Data Pipeline for Smart Pill Box Monitoring:
   IoT Sensors -> Python Timestamp Alignment -> MySQL Relational Model -> Adherence Analytics`
      });
    } else if (trimmed === 'certs' || trimmed === 'certifications') {
      newHistory.push({
        type: 'output',
        text: `📜 VERIFIED CERTIFICATIONS:
• IBM Data Engineering Professional Certificate (Coursera)
• IBM Data Warehouse Engineer Professional Certificate (Coursera)
• Data Engineering, Big Data, and Machine Learning on GCP (Coursera)
• Introduction to Data Engineering on Google Cloud (Coursera)
• Data Engineering Foundations (LinkedIn Learning)
• Apache Spark Essential Training: Big Data Engineering (LinkedIn Learning)`
      });
    } else if (trimmed === 'education' || trimmed === 'edu') {
      newHistory.push({
        type: 'output',
        text: `🎓 EDUCATION CREDENTIALS:
• Master of Science in Information Systems (MSIS)
  University of Colorado Denver (Aug 2024 - May 2026) | Denver, CO
• Bachelor of Engineering in Instrumentation Engineering (BE)
  Andhra University, College of Engineering (Aug 2019 - May 2023) | Vizag, India`
      });
    } else if (trimmed === 'metrics' || trimmed === 'stats') {
      newHistory.push({
        type: 'output',
        text: `📊 BENCHMARK METRICS:
[✓] Query Optimization: +25% performance boost using CTEs & window functions
[✓] Dashboard Refresh: +22% latency reduction in banking reporting
[✓] Storage Optimization: -18% S3 scans via partition strategy
[✓] Production Uptime: 99.99% target SLA adherence`
      });
    } else if (trimmed === 'contact') {
      newHistory.push({
        type: 'output',
        text: `📫 CONTACT INFORMATION:
• Candidate: Ceryl Tejas Chukka
• Location: Denver, CO (Open to Relocate across USA)
• Email: ceryl.chukka@applywizard.ai
• Phone: +1 (983) 218-2852
• Availability: Senior / Lead Data Engineer Roles`
      });
    } else if (trimmed === 'download_resume' || trimmed === 'resume') {
      newHistory.push({
        type: 'output',
        text: `[✓] Opening Resume Viewer Modal...`
      });
      onOpenResume();
    } else if (trimmed === 'matrix') {
      setMatrixMode(!matrixMode);
      newHistory.push({
        type: 'output',
        text: `[!] Matrix display mode: ${!matrixMode ? 'ACTIVE' : 'DEFAULT'}`
      });
    } else {
      newHistory.push({
        type: 'error',
        text: `bash: command not found: ${trimmed}. Type 'help' for valid commands.`
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const executePreset = (cmd) => {
    handleCommand(cmd);
  };

  return (
    <section id="terminal" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Terminal className="w-3.5 h-3.5" />
            <span>INTERACTIVE QUERY CLI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-4 text-white">
            DataOps <span className="gradient-text-cyber">Terminal Console</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Query Ceryl's background, architectures, and benchmarks directly through this interactive shell.
          </p>
        </div>

        {/* Quick Command Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {['help', 'experience', 'skills', 'projects', 'metrics', 'certs', 'education', 'contact', 'download_resume'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executePreset(cmd)}
              className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs font-mono transition-all flex items-center gap-1.5"
            >
              <span className="text-cyan-500">$</span>
              <span>{cmd}</span>
            </button>
          ))}
        </div>

        {/* Terminal Window Box */}
        <div
          className={`rounded-2xl border shadow-2xl overflow-hidden transition-colors ${
            matrixMode
              ? 'bg-[#021107] border-emerald-500/60 text-emerald-400'
              : 'bg-[#060912] border-slate-800 text-slate-200'
          }`}
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0a0f1d] border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2">ceryl@lakehouse-node-01:~</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
              <span>bash (zsh)</span>
              <button
                onClick={() => handleCommand('clear')}
                className="hover:text-slate-300 flex items-center gap-1"
                title="Clear Terminal"
              >
                <RotateCcw className="w-3 h-3" />
                <span>clear</span>
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 font-mono text-xs max-h-96 overflow-y-auto space-y-3 leading-relaxed">
            {history.map((item, index) => (
              <div key={index}>
                {item.type === 'user' && (
                  <div className="text-cyan-400 font-bold">{item.text}</div>
                )}
                {item.type === 'system' && (
                  <div className="text-slate-400 whitespace-pre-wrap">{item.text}</div>
                )}
                {item.type === 'output' && (
                  <div className={`whitespace-pre-wrap ${matrixMode ? 'text-emerald-300' : 'text-slate-300'}`}>
                    {item.text}
                  </div>
                )}
                {item.type === 'error' && (
                  <div className="text-rose-400 whitespace-pre-wrap">{item.text}</div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Line */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputVal);
            }}
            className="flex items-center gap-2 px-4 py-3 bg-[#0a0f1d]/90 border-t border-slate-800 font-mono text-xs"
          >
            <span className="text-cyan-400 font-bold">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type command here (e.g. 'experience', 'projects', 'help')..."
              className="w-full bg-transparent text-white focus:outline-none placeholder-slate-600 font-mono"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs font-mono"
            >
              RUN
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
