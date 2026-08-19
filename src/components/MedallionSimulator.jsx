import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Play, 
  Pause, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Filter, 
  RefreshCw,
  Code2,
  Table,
  ArrowRight,
  Zap,
  HardDrive
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function MedallionSimulator() {
  const [activeLayer, setActiveLayer] = useState('silver');
  const [isPlaying, setIsPlaying] = useState(true);
  const [pipelineMode, setPipelineMode] = useState('streaming'); // 'streaming' | 'batch'
  const [aiValidationEnabled, setAiValidationEnabled] = useState(true);
  const [processedPackets, setProcessedPackets] = useState(14820);
  const [anomaliesCaught, setAnomaliesCaught] = useState(42);

  // Periodic simulated packet flow updates
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setProcessedPackets(prev => prev + Math.floor(Math.random() * 24 + 10));
      if (Math.random() > 0.65) {
        setAnomaliesCaught(prev => prev + 1);
      }
    }, 1800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const layers = [
    {
      id: 'bronze',
      name: 'Bronze Layer',
      title: 'Raw Data Ingestion',
      subtitle: 'Kafka Topics & S3 Landing Zone',
      badge: 'Raw / Immutable',
      color: 'amber',
      accentBorder: 'border-amber-500/40',
      accentBg: 'bg-amber-500/10',
      accentText: 'text-amber-400',
      icon: HardDrive,
      description: 'Ingests raw semi-structured JSON telemetry, banking logs, and recruitment feeds with zero schema rejection for forensic traceability.',
      metrics: {
        throughput: '240 MB/s',
        format: 'Delta / Parquet (Raw)',
        latency: '< 100ms'
      },
      codeSnippet: `# PySpark Structured Streaming Ingestion to Bronze
raw_stream = spark.readStream \\
  .format("kafka") \\
  .option("kafka.bootstrap.servers", "broker:9092") \\
  .option("subscribe", "network.telemetry.events") \\
  .load()

# Append raw payloads directly to Bronze Delta Table
raw_stream.writeStream \\
  .format("delta") \\
  .outputMode("append") \\
  .option("checkpointLocation", "/lakehouse/checkpoints/bronze") \\
  .toTable("lakehouse.bronze_telemetry_events")`,
      sampleRecord: {
        raw_id: "evt_998124",
        timestamp: "2026-08-18T14:32:01.482Z",
        device_ip: "10.142.88.19",
        latency_ms: 18.4,
        status_code: "200_OK",
        payload: '{"region":"us-central1","sla_tier":"gold","drop_rate":0.001}'
      }
    },
    {
      id: 'silver',
      name: 'Silver Layer',
      title: 'Cleansed & Enriched',
      subtitle: 'PySpark Deduplication & AI Schema Validation',
      badge: 'Cleansed / Validated',
      color: 'cyan',
      accentBorder: 'border-cyan-500/40',
      accentBg: 'bg-cyan-500/10',
      accentText: 'text-cyan-400',
      icon: Cpu,
      description: 'Performs schema validation, duplicate removal via watermarks, timezone alignment, and AI-assisted SQL rule checks.',
      metrics: {
        cleanRate: '99.98%',
        qualityChecks: '8 Automated Rules',
        dedupWindow: '15 min Watermark'
      },
      codeSnippet: `-- Silver Transformation with Window Functions & Dedup
WITH validated_records AS (
  SELECT
    raw_id,
    device_ip,
    CAST(latency_ms AS DOUBLE) AS latency_ms,
    from_utc_timestamp(timestamp, 'America/Denver') AS event_timestamp_denver,
    ROW_NUMBER() OVER(
      PARTITION BY device_ip, timestamp 
      ORDER BY raw_id DESC
    ) AS row_num
  FROM lakehouse.bronze_telemetry_events
  WHERE raw_id IS NOT NULL 
    AND latency_ms >= 0
)
SELECT * EXCEPT(row_num) 
FROM validated_records 
WHERE row_num = 1;`,
      sampleRecord: {
        clean_id: "evt_998124",
        event_time: "2026-08-18 08:32:01 MST",
        device_ip: "10.142.88.19",
        region: "us-central1",
        latency_ms: 18.40,
        is_sla_compliant: true,
        ai_validation_status: "PASSED"
      }
    },
    {
      id: 'gold',
      name: 'Gold Layer',
      title: 'Curated & Business Aggregated',
      subtitle: 'BigQuery / Redshift Star Schema & BI Datasets',
      badge: 'Business Ready',
      color: 'emerald',
      accentBorder: 'border-emerald-500/40',
      accentBg: 'bg-emerald-500/10',
      accentText: 'text-emerald-400',
      icon: Database,
      description: 'Aggregates SLA metrics, availability trends, and revenue fact tables optimized for sub-second executive queries in Power BI & BigQuery.',
      metrics: {
        queryBoost: '+25% Tuned',
        scanReduction: '-18% S3 Scans',
        refreshSpeed: '+22% Faster'
      },
      codeSnippet: `-- Gold Star Schema: Fact SLA Daily Network Aggregates
CREATE OR REPLACE TABLE lakehouse.gold_fact_network_sla
PARTITION BY DATE(metric_date)
CLUSTER BY region, service_tier AS
SELECT
  DATE(event_time) AS metric_date,
  region,
  COUNT(clean_id) AS total_events,
  ROUND(AVG(latency_ms), 2) AS avg_latency_ms,
  PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY latency_ms) AS p99_latency_ms,
  ROUND((COUNTIF(is_sla_compliant) / COUNT(*)) * 100, 3) AS sla_adherence_pct
FROM lakehouse.silver_telemetry_clean
GROUP BY 1, 2;`,
      sampleRecord: {
        metric_date: "2026-08-18",
        region: "us-central1",
        total_events: 1845000,
        avg_latency_ms: 14.8,
        p99_latency_ms: 28.2,
        sla_adherence_pct: "99.992%"
      }
    }
  ];

  const currentLayerData = layers.find(l => l.id === activeLayer) || layers[1];

  const handleLayerSelect = (id) => {
    sound.playClick();
    setActiveLayer(id);
  };

  const triggerBurst = () => {
    sound.playDataPacket();
    setProcessedPackets(prev => prev + 1500);
    setAnomaliesCaught(prev => prev + 3);
  };

  return (
    <section id="medallion" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>INTERACTIVE ARCHITECTURE SIMULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight mb-4 text-white">
            The <span className="gradient-text-cyber">Medallion Lakehouse</span> Engine
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Experience how I design robust multi-hop lakehouse pipelines—moving from raw high-volume streaming ingest 
            to clean schema validation and aggregated business datasets.
          </p>
        </div>

        {/* Simulator Control Dashboard */}
        <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-slate-800 mb-8 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-slate-800">
            {/* Play/Pause & Burst Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.playClick();
                  setIsPlaying(!isPlaying);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isPlaying ? 'PAUSE PIPELINE' : 'RESUME PIPELINE'}</span>
              </button>

              <button
                onClick={triggerBurst}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-xs font-mono font-bold text-white shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                <Zap className="w-3.5 h-3.5 text-yellow-300" />
                <span>TRIGGER DATA BURST (+1,500 pkts)</span>
              </button>
            </div>

            {/* Mode & AI Toggles */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
              <div className="flex items-center gap-1 bg-[#090d16] p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => {
                    sound.playClick();
                    setPipelineMode('streaming');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    pipelineMode === 'streaming'
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ Streaming (Kafka/Spark)
                </button>
                <button
                  onClick={() => {
                    sound.playClick();
                    setPipelineMode('batch');
                  }}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    pipelineMode === 'batch'
                      ? 'bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  📦 Batch (AWS Glue/dbt)
                </button>
              </div>

              <button
                onClick={() => {
                  sound.playClick();
                  setAiValidationEnabled(!aiValidationEnabled);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
                  aiValidationEnabled
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-900 border-slate-800 text-slate-500'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI SQL Guard: {aiValidationEnabled ? 'ENABLED' : 'OFF'}</span>
              </button>
            </div>
          </div>

          {/* Medallion Pipeline Flow 3-Tier Visualizer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {layers.map((layer, index) => {
              const isSelected = activeLayer === layer.id;
              const Icon = layer.icon;
              return (
                <div
                  key={layer.id}
                  onClick={() => handleLayerSelect(layer.id)}
                  onMouseEnter={() => sound.playHover()}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-300 relative overflow-hidden ${
                    isSelected
                      ? `${layer.accentBorder} ${layer.accentBg} shadow-xl shadow-cyan-500/10 scale-[1.02]`
                      : 'bg-[#0a0f1d]/70 border-slate-800/80 hover:border-slate-700 hover:bg-[#0e1424]'
                  }`}
                >
                  {/* Active Indicator Top Bar */}
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400" />
                  )}

                  {/* Stage Number & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                      STAGE 0{index + 1}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${layer.accentBorder} ${layer.accentText}`}>
                      {layer.badge}
                    </span>
                  </div>

                  {/* Title & Icon */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2.5 rounded-xl ${layer.accentBg} border ${layer.accentBorder} ${layer.accentText}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-white">
                        {layer.name}
                      </h3>
                      <div className="text-xs text-slate-400">
                        {layer.title}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 mb-4 line-clamp-2">
                    {layer.description}
                  </p>

                  {/* Animated Data Stream Bar */}
                  <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-3">
                    {isPlaying && (
                      <div
                        className={`absolute top-0 bottom-0 w-1/3 rounded-full ${
                          layer.id === 'bronze'
                            ? 'bg-amber-400 animate-stream'
                            : layer.id === 'silver'
                            ? 'bg-cyan-400 animate-stream'
                            : 'bg-emerald-400 animate-stream'
                        }`}
                        style={{ animationDuration: `${2.8 - index * 0.4}s` }}
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
                    <span>Click to inspect</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-1 text-cyan-300' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Inspection Panel for Selected Layer */}
          <div className="bg-[#070b14] rounded-2xl p-5 border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${currentLayerData.accentBg} ${currentLayerData.accentText}`}>
                  <currentLayerData.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-white font-heading text-base flex items-center gap-2">
                    <span>{currentLayerData.name} Deep Inspection</span>
                    <span className="text-xs font-normal text-slate-400 font-mono">({currentLayerData.subtitle})</span>
                  </div>
                </div>
              </div>

              {/* Layer Telemetry Stats */}
              <div className="flex items-center gap-4 text-xs font-mono">
                {Object.entries(currentLayerData.metrics).map(([key, val]) => (
                  <div key={key} className="bg-slate-900/80 px-3 py-1 rounded-lg border border-slate-800">
                    <span className="text-slate-400 uppercase text-[10px] mr-1.5">{key}:</span>
                    <strong className="text-cyan-300">{val}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Code & Live Data Schema Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Transformation Code Engine */}
              <div>
                <div className="flex items-center justify-between mb-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Production Transformation Logic</span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {activeLayer === 'bronze' ? 'Python / PySpark' : 'SQL DDL & Queries'}
                  </span>
                </div>
                <pre className="p-4 rounded-xl bg-[#090d18] border border-slate-800 text-xs font-mono text-cyan-200/90 overflow-x-auto leading-relaxed max-h-64">
                  <code>{currentLayerData.codeSnippet}</code>
                </pre>
              </div>

              {/* Live Record Payload / Schema Output */}
              <div>
                <div className="flex items-center justify-between mb-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Table className="w-3.5 h-3.5" />
                    <span>Verified Output Payload / Schema</span>
                  </div>
                  <span className="text-[10px] text-emerald-400/80 font-mono">Status: Verified</span>
                </div>
                <div className="p-4 rounded-xl bg-[#090d18] border border-slate-800 font-mono text-xs text-slate-300 max-h-64 overflow-y-auto">
                  <div className="space-y-2">
                    {Object.entries(currentLayerData.sampleRecord).map(([k, v]) => (
                      <div key={k} className="flex items-start justify-between gap-4 py-1 border-b border-slate-800/50 text-[11px]">
                        <span className="text-slate-400 font-medium">{k}:</span>
                        <span className="text-cyan-300 font-mono text-right break-all">
                          {typeof v === 'boolean' ? (v ? 'TRUE' : 'FALSE') : String(v)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Total Ingestion Metrics Counter Bar */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Total Validated Stream Packets: <strong className="text-white font-bold">{processedPackets.toLocaleString()}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-amber-300">
                <Filter className="w-3.5 h-3.5" />
                <span>Anomalies / Corrupted Records Prevented: <strong className="font-bold">{anomaliesCaught}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
