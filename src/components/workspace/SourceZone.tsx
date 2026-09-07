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
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SourceDocument } from '../../types';
import { analyzeContent } from '../../services/ContentAnalyzer';

interface SourceZoneProps {
  source: SourceDocument;
  onUpdateSource: (source: SourceDocument) => void;
  onSelectSample: (sampleKey: 'healthcare' | 'renewable-energy' | 'ai-agents') => void;
}

export const SourceZone: React.FC<SourceZoneProps> = ({
  source,
  onUpdateSource,
  onSelectSample
}) => {
  const [activeTab, setActiveTab] = useState<'sample' | 'paste' | 'upload'>('sample');
  const [pastedText, setPastedText] = useState('');
  const [showFullSource, setShowFullSource] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAllSections, setShowAllSections] = useState(false);

  const handleApplyPasted = () => {
    if (!pastedText.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const analysis = analyzeContent(pastedText);
      onUpdateSource({
        id: `pasted-${Date.now()}`,
        title: pastedText.slice(0, 42).trim() + '...',
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

  const sampleList = [
    {
      key: 'healthcare' as const,
      title: 'AI in Healthcare — Research Brief.pdf',
      tag: 'PRIMARY',
      tagClass: 'doc-tag-primary',
      description: '1,180 Words • Diagnostic Sensitivity & Ambient Workflows',
      isSelected: source.title.includes('Healthcare')
    },
    {
      key: 'renewable-energy' as const,
      title: 'Renewable Energy: Grid Parity.pdf',
      tag: 'ALTERNATE',
      tagClass: 'doc-tag-alternate',
      description: '1,240 Words • Levelized Cost, Intermittency & Storage',
      isSelected: source.title.includes('Renewable')
    },
    {
      key: 'ai-agents' as const,
      title: 'Autonomous AI Agents.docx',
      tag: 'DEEP TECH',
      tagClass: 'doc-tag-deeptech',
      description: '1,090 Words • Tool Calling, ReAct & Reflection Loops',
      isSelected: source.title.includes('Agent')
    }
  ];

  const displayedSections = showAllSections 
    ? source.detectedStructure.sections 
    : source.detectedStructure.sections.slice(0, 3);

  return (
    <div className="bf-card" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      padding: '24px',
      height: '100%'
    }}>
      {/* 01 · SOURCE INTAKE Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: 'var(--brand-primary-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--brand-primary)'
          }}>
            <FileText size={15} />
          </div>
          <div>
            <h2 className="section-header-title">
              01 · SOURCE INTAKE
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: 2 }}>
              Authoritative input document
            </div>
          </div>
        </div>

        {/* Live Content Status Badge (Soft Mint) */}
        <div>
          {isProcessing ? (
            <span className="badge badge-primary">
              ANALYZING...
            </span>
          ) : source.wordCount > 0 ? (
            <span className="badge badge-mint">
              <CheckCircle2 size={12} /> READY ✓
            </span>
          ) : (
            <span className="badge badge-muted">
              EMPTY
            </span>
          )}
        </div>
      </div>

      {/* Intake Method Tabs (Pill style) */}
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

      {/* Tab 1: Curated Verified Samples (Clean Cards with 14px radius, 16px padding, subtle shadow) */}
      {activeTab === 'sample' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>
            Select verified sample document:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sampleList.map((item) => (
              <div
                key={item.key}
                onClick={() => handleSampleClick(item.key)}
                className={`bf-card interactive ${item.isSelected ? 'selected' : ''}`}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  borderLeft: item.isSelected ? '3px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                  background: item.isSelected ? 'var(--bg-surface)' : '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, gap: 8 }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                    {item.title}
                  </span>
                  <span className={`badge ${item.tagClass}`} style={{ fontSize: '10px', padding: '2px 8px' }}>
                    {item.tag}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Raw Text Ingestion */}
      {activeTab === 'paste' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            placeholder="Paste raw notes, research summaries, conference papers, or articles..."
            className="input-control input-textarea"
            style={{ height: 120, fontSize: '13px', lineHeight: 1.5 }}
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
          borderRadius: '14px',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          cursor: 'pointer',
          background: 'var(--bg-surface-subtle)',
          transition: 'all var(--transition-fast)'
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'var(--brand-primary-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--brand-primary)'
          }}>
            <Upload size={18} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Upload Source Document</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: 2 }}>
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

      {/* Active Source Metadata Summary Card */}
      <div style={{
        background: 'var(--bg-surface-subtle)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        padding: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {source.title}
              </span>
              <span className="badge badge-primary" style={{ fontSize: '10px' }}>
                {source.type.toUpperCase()}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '12px', color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <BookOpen size={13} color="var(--text-muted)" /> {source.wordCount} words
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={13} color="var(--text-muted)" /> {source.readingTime}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowFullSource(!showFullSource)}
            className="btn btn-secondary btn-sm"
            style={{ padding: '4px 10px', fontSize: '11px', flexShrink: 0 }}
            title="Inspect source text"
          >
            <Eye size={12} />
            <span>{showFullSource ? 'Hide' : 'Inspect'}</span>
          </button>
        </div>

        {/* Collapsible raw content inspector */}
        {showFullSource && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            maxHeight: 160,
            overflowY: 'auto',
            border: '1px solid var(--border-subtle)',
            whiteSpace: 'pre-wrap',
            marginTop: 12,
            lineHeight: 1.6
          }}>
            {source.content}
          </div>
        )}
      </div>

      {/* Content Intelligence & Extracted Sections (Accordion / Numbered List with 12px spacing) */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        boxShadow: 'var(--shadow-resting)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <FileCheck size={14} color="var(--brand-primary)" />
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand-primary)', letterSpacing: '0.04em' }}>
              CONTENT INTELLIGENCE
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#1F7C67', fontWeight: 600 }}>
            Source Ready ✓
          </span>
        </div>

        {/* Extracted Sections List (Numbered with 12px vertical spacing) */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8
          }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.04em' }}>
              EXTRACTED SECTIONS ({source.detectedStructure.sections.length})
            </span>
            {source.detectedStructure.sections.length > 3 && (
              <button
                onClick={() => setShowAllSections(!showAllSections)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '2px 6px', fontSize: '11px', height: 'auto' }}
              >
                {showAllSections ? (
                  <>Show less <ChevronUp size={12} /></>
                ) : (
                  <>Show all ({source.detectedStructure.sections.length}) <ChevronDown size={12} /></>
                )}
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {displayedSections.map((sec, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 12px',
                  background: 'var(--bg-surface-subtle)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: 'var(--text-primary)',
                  fontWeight: 500
                }}
              >
                <span style={{
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'var(--brand-primary-subtle)',
                  color: 'var(--brand-primary)',
                  fontSize: '10px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {i + 1}
                </span>
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {sec}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Topics & Concepts */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
          <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '0.04em', marginBottom: 6 }}>
            KEY TOPICS & ENTITIES
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {source.detectedStructure.keyConcepts.map((concept, i) => (
              <span key={i} className="badge badge-primary" style={{ fontSize: '11px', padding: '3px 8px' }}>
                {concept}
              </span>
            ))}
            {source.detectedStructure.technicalTerms.slice(0, 3).map((term, i) => (
              <span key={i} style={{
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)',
                background: 'var(--bg-surface-subtle)',
                padding: '3px 7px',
                borderRadius: '6px',
                border: '1px solid var(--border-subtle)'
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
