import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  Clock, 
  BookOpen, 
  Eye, 
  RefreshCw, 
  FileCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SourceDocument } from '../../types';
import { analyzeContent } from '../../services/ContentAnalyzer';

interface SourceZoneProps {
  source: SourceDocument;
  onUpdateSource: (newSource: SourceDocument) => void;
  onSelectSample: (sampleKey: 'healthcare' | 'renewable-energy' | 'ai-agents') => void;
}

export const SourceZone: React.FC<SourceZoneProps> = ({
  source,
  onUpdateSource,
  onSelectSample
}) => {
  const [activeTab, setActiveTab] = useState<'sample' | 'paste' | 'upload'>('sample');
  const [pastedText, setPastedText] = useState(source.content);
  const [showFullSource, setShowFullSource] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyPasted = () => {
    if (!pastedText.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const analysis = analyzeContent(pastedText);
      const title = pastedText.trim().split('\n')[0].replace(/^[#\s]+/, '').slice(0, 50) || 'Custom Pasted Document.txt';
      onUpdateSource({
        id: `src-${Date.now()}`,
        title,
        type: 'paste',
        content: pastedText,
        wordCount: analysis.wordCount,
        readingTime: analysis.readingTime,
        detectedStructure: analysis.detectedStructure,
        updatedAt: new Date().toLocaleTimeString()
      });
      setIsProcessing(false);
    }, 250);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      if (text) {
        const analysis = analyzeContent(text);
        const ext = file.name.split('.').pop()?.toLowerCase();
        const type = ext === 'pdf' ? 'pdf' : ext === 'docx' ? 'docx' : 'txt';
        setTimeout(() => {
          onUpdateSource({
            id: `file-${Date.now()}`,
            title: file.name,
            type,
            content: text,
            wordCount: analysis.wordCount,
            readingTime: analysis.readingTime,
            detectedStructure: analysis.detectedStructure,
            updatedAt: new Date().toLocaleTimeString()
          });
          setPastedText(text);
          setIsProcessing(false);
        }, 300);
      } else {
        setIsProcessing(false);
      }
    };
    reader.readAsText(file);
  };

  const handleSampleClick = (key: 'healthcare' | 'renewable-energy' | 'ai-agents') => {
    setIsProcessing(true);
    setTimeout(() => {
      onSelectSample(key);
      setIsProcessing(false);
    }, 200);
  };

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      padding: '20px',
      height: '100%'
    }}>
      {/* Zone Header Strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: 'var(--brand-cyan-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(56, 189, 248, 0.25)'
          }}>
            <FileText size={13} color="var(--brand-cyan)" />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.02em', color: '#ffffff' }}>
              01 • SOURCE INTAKE
            </div>
            <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
              Authoritative input document
            </div>
          </div>
        </div>

        {/* Live Content Status Badge */}
        <div>
          {isProcessing ? (
            <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
              ANALYZING...
            </span>
          ) : source.wordCount > 0 ? (
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
              <CheckCircle2 size={11} /> READY ✓
            </span>
          ) : (
            <span className="badge badge-muted" style={{ fontSize: '0.65rem' }}>
              EMPTY
            </span>
          )}
        </div>
      </div>

      {/* Intake Method Tabs */}
      <div className="tab-list">
        <button
          onClick={() => setActiveTab('sample')}
          className={`tab-btn ${activeTab === 'sample' ? 'active' : ''}`}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <Sparkles size={13} />
          Demo Sources
        </button>
        <button
          onClick={() => setActiveTab('paste')}
          className={`tab-btn ${activeTab === 'paste' ? 'active' : ''}`}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <FileText size={13} />
          Paste Text
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <Upload size={13} />
          Upload
        </button>
      </div>

      {/* Tab 1: Curated Verified Samples */}
      {activeTab === 'sample' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            Select verified sample document:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* Primary Demo: AI in Healthcare */}
            <div
              onClick={() => handleSampleClick('healthcare')}
              className={`bf-card interactive ${source.title.includes('Healthcare') ? 'active' : ''}`}
              style={{ padding: '10px 12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#ffffff' }}>
                  AI in Healthcare — Research Brief.pdf
                </span>
                <span className="badge badge-cyan" style={{ fontSize: '0.6rem' }}>Primary</span>
              </div>
              <div style={{ fontSize: '0.685rem', color: 'var(--text-muted)' }}>
                1,180 Words • Diagnostic Sensitivity & Ambient Workflows
              </div>
            </div>

            {/* Alternate 1: Renewable Energy */}
            <div
              onClick={() => handleSampleClick('renewable-energy')}
              className={`bf-card interactive ${source.title.includes('Renewable') ? 'active' : ''}`}
              style={{ padding: '10px 12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#ffffff' }}>
                  Renewable Energy: Grid Parity.pdf
                </span>
                <span className="badge badge-muted" style={{ fontSize: '0.6rem' }}>Alternate</span>
              </div>
              <div style={{ fontSize: '0.685rem', color: 'var(--text-muted)' }}>
                1,240 Words • Levelized Cost, Intermittency & Storage
              </div>
            </div>

            {/* Alternate 2: AI Agents */}
            <div
              onClick={() => handleSampleClick('ai-agents')}
              className={`bf-card interactive ${source.title.includes('Agent') ? 'active' : ''}`}
              style={{ padding: '10px 12px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#ffffff' }}>
                  Autonomous AI Agents.docx
                </span>
                <span className="badge badge-indigo" style={{ fontSize: '0.6rem' }}>Deep Tech</span>
              </div>
              <div style={{ fontSize: '0.685rem', color: 'var(--text-muted)' }}>
                1,090 Words • Tool Calling, ReAct & Reflection Loops
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Raw Text Ingestion */}
      {activeTab === 'paste' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste raw notes, research summaries, conference papers, or articles..."
            className="input-control input-textarea"
            style={{ height: 115, fontSize: '0.8rem', lineHeight: 1.5 }}
          />
          <button
            onClick={handleApplyPasted}
            disabled={isProcessing || !pastedText.trim()}
            className="btn btn-primary btn-sm"
            style={{ alignSelf: 'flex-end' }}
          >
            <RefreshCw size={12} />
            <span>{isProcessing ? 'Ingesting...' : 'Ingest & Analyze Source'}</span>
          </button>
        </div>
      )}

      {/* Tab 3: File Upload */}
      {activeTab === 'upload' && (
        <label style={{
          border: '1.5px dashed var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: 'pointer',
          background: 'rgba(255, 255, 255, 0.015)',
          transition: 'all 0.2s ease'
        }}>
          <Upload size={22} color="var(--brand-cyan)" />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.825rem', fontWeight: 700, color: '#ffffff' }}>Upload Source Document</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 2 }}>
              Supports PDF, DOCX, TXT, MD
            </div>
          </div>
          <input
            type="file"
            accept=".txt,.md,.pdf,.docx,.json"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </label>
      )}

      {/* Active Source Metadata Summary */}
      <div className="bf-card" style={{ padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
              <span style={{
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#ffffff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {source.title}
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.6rem', padding: '1px 5px' }}>
                {source.type.toUpperCase()}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <BookOpen size={12} color="var(--text-dim)" /> {source.wordCount} words
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={12} color="var(--text-dim)" /> {source.readingTime}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowFullSource(!showFullSource)}
            className="btn btn-ghost btn-sm"
            style={{ padding: '3px 8px', fontSize: '0.7rem', flexShrink: 0 }}
            title="Inspect source text"
          >
            <Eye size={12} />
            <span>{showFullSource ? 'Hide' : 'Inspect'}</span>
          </button>
        </div>

        {/* Collapsible raw content inspector */}
        {showFullSource && (
          <div style={{
            background: 'var(--bg-canvas)',
            borderRadius: 'var(--radius-xs)',
            padding: '10px 12px',
            fontSize: '0.725rem',
            color: 'var(--text-secondary)',
            maxHeight: 160,
            overflowY: 'auto',
            border: '1px solid var(--border-subtle)',
            whiteSpace: 'pre-wrap',
            marginTop: 10,
            lineHeight: 1.55
          }}>
            {source.content}
          </div>
        )}
      </div>

      {/* Content Intelligence & Structural Extraction */}
      <div style={{
        background: 'rgba(10, 14, 22, 0.85)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 6
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <FileCheck size={13} color="var(--brand-cyan)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--brand-cyan)', letterSpacing: '0.04em' }}>
              CONTENT INTELLIGENCE
            </span>
          </div>
          <span style={{ fontSize: '0.675rem', color: '#10b981', fontWeight: 700 }}>
            Source Ready ✓
          </span>
        </div>

        {/* Detected Structure / Sections */}
        <div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em', marginBottom: 4 }}>
            EXTRACTED SECTIONS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {source.detectedStructure.sections.map((sec, i) => (
              <span key={i} className="badge badge-muted" style={{ fontSize: '0.625rem' }}>
                § {sec}
              </span>
            ))}
          </div>
        </div>

        {/* Core Concepts */}
        <div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em', marginBottom: 4 }}>
            KEY TOPICS & CONCEPTS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {source.detectedStructure.keyConcepts.map((concept, i) => (
              <span key={i} className="badge badge-indigo" style={{ fontSize: '0.625rem' }}>
                {concept}
              </span>
            ))}
          </div>
        </div>

        {/* Technical Terminology */}
        <div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em', marginBottom: 4 }}>
            TERMINOLOGY & ENTITIES
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {source.detectedStructure.technicalTerms.map((term, i) => (
              <span key={i} style={{
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--brand-cyan)',
                background: 'rgba(56, 189, 248, 0.08)',
                padding: '2px 6px',
                borderRadius: 4,
                border: '1px solid rgba(56, 189, 248, 0.15)'
              }}>
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
