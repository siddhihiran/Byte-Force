import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  RotateCw, 
  Share2, 
  Check, 
  PanelLeftClose, 
  PanelLeft, 
  ThumbsUp, 
  ThumbsDown, 
  FileText, 
  Layers, 
  HelpCircle, 
  Presentation, 
  Mic, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { OutputAsset, SourceDocument } from '../types';
import { ValidationBadge } from '../components/outputs/ValidationBadge';
import { SummaryCard } from '../components/outputs/SummaryCard';
import { FlashcardViewer } from '../components/outputs/FlashcardViewer';
import { QuizRunner } from '../components/outputs/QuizRunner';
import { PresentationOutlineCard } from '../components/outputs/PresentationOutlineCard';
import { ScriptViewer } from '../components/outputs/ScriptViewer';
import { SocialPreview } from '../components/outputs/SocialPreview';

interface ResultsPageProps {
  assets: OutputAsset[];
  source: SourceDocument;
  onBackToWorkflow: () => void;
  onRegenerateAsset: (assetId: string) => void;
  onDeleteAsset: (assetId: string) => void;
  onToggleSaveAsset: (assetId: string) => void;
}

const PURPOSE_ICONS: Record<string, React.FC<{ size?: number; color?: string }>> = {
  summary: FileText,
  flashcards: Layers,
  quiz: HelpCircle,
  presentation_outline: Presentation,
  speaking_script: Mic,
  linkedin_post: Share2,
  social: Share2
};

const PURPOSE_LABELS: Record<string, string> = {
  summary: 'Summary',
  flashcards: 'Study Cards',
  quiz: 'Quiz',
  presentation_outline: 'PPT Deck',
  speaking_script: 'PPT Script',
  linkedin_post: 'Social Article',
  social: 'Social'
};

export const ResultsPage: React.FC<ResultsPageProps> = ({
  assets,
  source,
  onBackToWorkflow,
  onRegenerateAsset
}) => {
  const [activeAssetId, setActiveAssetId] = useState<string>(assets[0]?.id || '');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [shared, setShared] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const activeAsset = assets.find(a => a.id === activeAssetId) || assets[0];

  // If no assets generated yet
  if (!activeAsset || assets.length === 0) {
    return (
      <div className="bf-card animate-fade-in" style={{
        padding: '60px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        maxWidth: 580,
        margin: '40px auto'
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: '#F3F1FC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--brand-primary)'
        }}>
          <Sparkles size={28} />
        </div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          No Transformed Assets Yet
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0, maxWidth: 380, lineHeight: 1.5 }}>
          Run your first transformation from the New Document workspace to view multi-format outputs here.
        </p>
        <button onClick={onBackToWorkflow} className="btn btn-primary btn-sm">
          <span>Go to New Document Workflow</span>
        </button>
      </div>
    );
  }

  // Handle Copy Active Asset
  const handleCopy = () => {
    let contentToCopy = '';
    if (activeAsset.payload.type === 'summary') {
      contentToCopy = activeAsset.payload.data.overview;
    } else if (activeAsset.payload.type === 'speaking_script') {
      contentToCopy = activeAsset.payload.data.sections.map(s => `${s.heading}:\n${s.content}`).join('\n\n');
    } else if (activeAsset.payload.type === 'social') {
      contentToCopy = `${activeAsset.payload.data.hook}\n\n${activeAsset.payload.data.body}\n\n${activeAsset.payload.data.callToAction}`;
    } else {
      contentToCopy = JSON.stringify(activeAsset.payload.data, null, 2);
    }

    navigator.clipboard.writeText(contentToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handle Download Active Asset
  const handleDownload = () => {
    let content = '';
    let filename = `${activeAsset.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.md`;

    if (activeAsset.payload.type === 'summary') {
      content = `# ${activeAsset.title}\n\n## Overview\n${activeAsset.payload.data.overview}\n\n## Key Insights\n` +
        activeAsset.payload.data.keyInsights.map(k => `* ${k}`).join('\n') +
        `\n\n## Action Takeaways\n` + activeAsset.payload.data.takeaways.map(a => `* ${a}`).join('\n');
    } else {
      content = `# ${activeAsset.title}\n\n` + JSON.stringify(activeAsset.payload.data, null, 2);
    }

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Handle Share Active Asset
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Top Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        paddingBottom: 16,
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        {/* Left Back Button & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button
            onClick={onBackToWorkflow}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 12px' }}
          >
            <ArrowLeft size={14} />
            <span>New Document</span>
          </button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Transformation Results
              </h1>
              <span className="badge" style={{
                background: '#EBFBF7',
                color: '#1F7C67',
                border: '1px solid #BFEFDE',
                fontWeight: 700,
                fontSize: '0.65rem'
              }}>
                {assets.length} Generated Assets
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Source: <strong style={{ color: 'var(--text-primary)' }}>{source.title}</strong> ({source.wordCount} words)
            </div>
          </div>
        </div>

        {/* Right Action Icons: Download, Copy, Regenerate, Share, Sidebar Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={handleCopy}
            className="btn btn-secondary btn-sm"
            title="Copy Content"
          >
            {copied ? <Check size={14} color="#1F7C67" /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="btn btn-secondary btn-sm"
            title="Download Markdown"
          >
            <Download size={14} />
            <span>Download</span>
          </button>

          <button
            onClick={() => onRegenerateAsset(activeAsset.id)}
            className="btn btn-secondary btn-sm"
            title="Regenerate Active Asset"
          >
            <RotateCw size={14} />
            <span>Regenerate</span>
          </button>

          <button
            onClick={handleShare}
            className="btn btn-secondary btn-sm"
            title="Share Asset"
          >
            {shared ? <Check size={14} color="#1F7C67" /> : <Share2 size={14} />}
            <span>{shared ? 'Link Copied' : 'Share'}</span>
          </button>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`btn btn-sm ${isSidebarOpen ? 'btn-primary' : 'btn-secondary'}`}
            title={isSidebarOpen ? 'Collapse Source Sidebar' : 'Show Source Sidebar'}
            style={{ padding: '6px 10px' }}
          >
            {isSidebarOpen ? <PanelLeftClose size={15} /> : <PanelLeft size={15} />}
            <span>Source Reference</span>
          </button>
        </div>
      </div>

      {/* Main Layout: Collapsible Sidebar + Content Area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isSidebarOpen ? '280px 1fr' : '1fr',
        gap: 24,
        alignItems: 'start',
        transition: 'grid-template-columns 0.25s ease'
      }}>
        {/* COLLAPSIBLE SOURCE SIDEBAR */}
        {isSidebarOpen && (
          <aside className="bf-card animate-fade-in" style={{
            padding: '20px',
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            position: 'sticky',
            top: 84
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 10 }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Source Document
              </span>
              <span className="badge" style={{ fontSize: '0.65rem', background: '#F3F1FC', color: 'var(--brand-primary)' }}>
                {source.type.toUpperCase()}
              </span>
            </div>

            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 6px', lineHeight: 1.35 }}>
                {source.title}
              </h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: 8 }}>
                <span>{source.wordCount} words</span>
                <span>•</span>
                <span>{source.readingTime}</span>
              </div>
            </div>

            {/* Extracted Section List for reference */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Detected Sections & Topics
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 320, overflowY: 'auto' }}>
                {source.detectedStructure.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-primary)',
                      padding: '6px 10px',
                      background: '#FAFAFB',
                      borderRadius: 6,
                      border: '1px solid var(--border-subtle)',
                      lineHeight: 1.4
                    }}
                  >
                    <span style={{ color: 'var(--brand-primary)', fontWeight: 700, marginRight: 6 }}>
                      0{idx + 1}.
                    </span>
                    {sec}
                  </div>
                ))}
              </div>
            </div>

            {/* Core Entities */}
            {source.detectedStructure.entities.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Extracted Entities
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {source.detectedStructure.entities.slice(0, 6).map((ent, i) => (
                    <span key={i} className="badge" style={{ fontSize: '0.65rem', background: '#F3F1FC', color: 'var(--text-secondary)' }}>
                      {ent}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>
        )}

        {/* MAIN RESULTS CONTENT VIEWPORT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
          {/* Top Tabs Bar: Summary | PPT Script | Study Cards | Quiz | Presentation Outline | Social */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            overflowX: 'auto',
            paddingBottom: 4,
            borderBottom: '1px solid var(--border-subtle)'
          }}>
            {assets.map((asset) => {
              const IconComponent = PURPOSE_ICONS[asset.purposeId] || FileText;
              const label = PURPOSE_LABELS[asset.purposeId] || asset.title;
              const isActive = asset.id === activeAsset.id;

              return (
                <button
                  key={asset.id}
                  onClick={() => setActiveAssetId(asset.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 16px',
                    borderRadius: '10px 10px 0 0',
                    border: 'none',
                    borderBottom: isActive ? '2px solid var(--brand-primary)' : '2px solid transparent',
                    background: isActive ? '#F3F1FC' : 'transparent',
                    color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <IconComponent size={15} color={isActive ? 'var(--brand-primary)' : 'var(--text-secondary)'} />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Validation Audit Strip */}
          <ValidationBadge signals={activeAsset.validationSignals} sourceTitle={activeAsset.sourceTitle} />

          {/* Render Active Component */}
          <div style={{ minHeight: 400 }}>
            {activeAsset.payload.type === 'summary' && (
              <SummaryCard
                asset={activeAsset}
                onRegenerate={() => onRegenerateAsset(activeAsset.id)}
              />
            )}

            {activeAsset.payload.type === 'flashcards' && (
              <FlashcardViewer
                asset={activeAsset}
                onRegenerate={() => onRegenerateAsset(activeAsset.id)}
              />
            )}

            {activeAsset.payload.type === 'quiz' && (
              <QuizRunner
                asset={activeAsset}
                onRegenerate={() => onRegenerateAsset(activeAsset.id)}
              />
            )}

            {activeAsset.payload.type === 'presentation_outline' && (
              <PresentationOutlineCard
                asset={activeAsset}
                onRegenerate={() => onRegenerateAsset(activeAsset.id)}
              />
            )}

            {activeAsset.payload.type === 'speaking_script' && (
              <ScriptViewer
                asset={activeAsset}
                onRegenerate={() => onRegenerateAsset(activeAsset.id)}
              />
            )}

            {activeAsset.payload.type === 'social' && (
              <SocialPreview
                asset={activeAsset}
                onRegenerate={() => onRegenerateAsset(activeAsset.id)}
              />
            )}
          </div>

          {/* Subtle "Was this helpful?" Quick Feedback Widget at the bottom */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 18,
            marginTop: 12,
            flexWrap: 'wrap',
            gap: 12
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                Was this output helpful?
              </span>

              {feedback ? (
                <span className="badge" style={{ background: '#EBFBF7', color: '#1F7C67', fontWeight: 600, fontSize: '0.75rem' }}>
                  ✨ Thank you for your feedback!
                </span>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button
                    onClick={() => setFeedback('up')}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 10px', borderRadius: 8 }}
                    title="Yes, helpful"
                  >
                    <ThumbsUp size={13} color="var(--text-secondary)" />
                    <span>Yes</span>
                  </button>
                  <button
                    onClick={() => setFeedback('down')}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '4px 10px', borderRadius: 8 }}
                    title="Could be better"
                  >
                    <ThumbsDown size={13} color="var(--text-secondary)" />
                    <span>No</span>
                  </button>
                </div>
              )}
            </div>

            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Deterministic Failsafe Verified • Heuristic Accuracy Grounded
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
