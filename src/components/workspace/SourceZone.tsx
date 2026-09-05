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
  AlertCircle
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
      {/* Zone Header & SOURCE READY state indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: 'var(--brand-cyan-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileText size={13} color="var(--brand-cyan)" />
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.02em' }}>
            01 • SOURCE CONTENT
          </span>
        </div>

        {/* Phase 3: Content Status Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {isProcessing ? (
            <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
              PROCESSING...
            </span>
          ) : source.wordCount > 0 ? (
            <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
              <CheckCircle2 size={11} /> SOURCE READY ✓
            </span>
          ) : (
            <span className="badge badge-muted" style={{ fontSize: '0.65rem' }}>
              EMPTY
            </span>
          )}
        </div>
      </div>

      {/* Ingestion Mode Switcher */}
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
          Upload File
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'sample' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
            Select verified sample document (Clearly labeled DEMO CONTENT):
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {/* FEATURED DEMO SOURCE: AI in Healthcare */}
            <button
              onClick={() => handleSampleClick('healthcare')}
              className={`glass-card ${source.title.includes('Healthcare') ? 'active' : ''}`}
              style={{
                padding: '10px 12px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff' }}>
                  AI in Healthcare — Research Brief.pdf
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Diagnostic Precision • Ambient Workflows • FDA SaMD
                </div>
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Primary Demo</span>
            </button>

            {/* Alternate Demo: Renewable Energy */}
            <button
              onClick={() => handleSampleClick('renewable-energy')}
              className={`glass-card ${source.title.includes('Renewable') ? 'active' : ''}`}
              style={{
                padding: '10px 12px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff' }}>
                  Renewable Energy: Grid Parity.pdf
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  LCOE • Intermittency • Battery Storage
                </div>
              </div>
              <span className="badge badge-muted" style={{ fontSize: '0.65rem' }}>Alternate</span>
            </button>

            {/* Deep Tech: Autonomous AI Agents */}
            <button
              onClick={() => handleSampleClick('ai-agents')}
              className={`glass-card ${source.title.includes('Agent') ? 'active' : ''}`}
              style={{
                padding: '10px 12px',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#ffffff' }}>
                  Autonomous AI Agents.docx
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  Tool Calling • ReAct • Memory Loops
                </div>
              </div>
              <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>Deep Tech</span>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'paste' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste your source document, article, notes, or transcript here..."
            className="input-control input-textarea"
            style={{ height: 110, fontSize: '0.8rem', fontFamily: 'inherit' }}
          />
          <button
            onClick={handleApplyPasted}
            disabled={isProcessing || !pastedText.trim()}
            className="btn btn-primary btn-sm"
            style={{ alignSelf: 'flex-end' }}
          >
            <RefreshCw size={13} />
            {isProcessing ? 'Analyzing...' : 'Ingest & Analyze Source'}
          </button>
        </div>
      )}

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
          background: 'rgba(255, 255, 255, 0.02)',
          transition: 'border-color 0.2s ease'
        }}>
          <Upload size={24} color="var(--brand-cyan)" />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>Drop source file here</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
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

      {/* Ingested Source Overview Card (Phase 3) */}
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '12px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 8
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#ffffff' }}>
                {source.title}
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.6rem' }}>
                {source.type.toUpperCase()}
              </span>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginTop: 4,
              fontSize: '0.725rem',
              color: 'var(--text-muted)'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <BookOpen size={12} /> {source.wordCount} words
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={12} /> {source.readingTime}
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowFullSource(!showFullSource)}
            className="btn btn-ghost btn-sm"
            style={{ padding: '3px 6px', fontSize: '0.7rem' }}
            title="Inspect source text"
          >
            <Eye size={12} />
            {showFullSource ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>

        {/* Collapsible clean source preview */}
        {showFullSource && (
          <div style={{
            background: 'var(--bg-canvas)',
            borderRadius: 'var(--radius-xs)',
            padding: '10px',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            maxHeight: 160,
            overflowY: 'auto',
            border: '1px solid var(--border-subtle)',
            whiteSpace: 'pre-wrap',
            marginTop: 8
          }}>
            {source.content}
          </div>
        )}
      </div>

      {/* CONTENT INTELLIGENCE & EXTRACTED SECTIONS PANEL */}
      <div style={{
        background: 'rgba(14, 18, 26, 0.7)',
        border: '1px solid rgba(56, 189, 248, 0.15)',
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
            <FileCheck size={14} color="#38bdf8" />
            <span style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--brand-cyan)' }}>
              CONTENT INTELLIGENCE
            </span>
          </div>
          <span style={{ fontSize: '0.675rem', color: '#10b981', fontWeight: 600 }}>
            Source Ready ✓
          </span>
        </div>

        {/* Extracted Sections List (Phase 3 Requirement) */}
        <div>
          <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', marginBottom: 4, fontWeight: 600 }}>
            EXTRACTED SECTIONS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {source.detectedStructure.sections.map((section, i) => (
              <span key={i} className="badge badge-muted" style={{ fontSize: '0.65rem' }}>
                § {section}
              </span>
            ))}
          </div>
        </div>

        {/* Core Concepts */}
        <div>
          <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', marginBottom: 4, fontWeight: 600 }}>
            KEY TOPICS & CONCEPTS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {source.detectedStructure.keyConcepts.map((concept, i) => (
              <span key={i} className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
                {concept}
              </span>
            ))}
          </div>
        </div>

        {/* Technical Entities / Terms */}
        <div>
          <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', marginBottom: 4, fontWeight: 600 }}>
            ENTITIES & TERMINOLOGY
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {source.detectedStructure.technicalTerms.map((term, i) => (
              <span key={i} style={{
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--brand-cyan)',
                background: 'rgba(56, 189, 248, 0.08)',
                padding: '1px 5px',
                borderRadius: 4
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
