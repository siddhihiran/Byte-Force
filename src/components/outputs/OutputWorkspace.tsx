import React, { useState } from 'react';
import { 
  FileText, 
  Layers, 
  HelpCircle, 
  Mic, 
  Share2, 
  Presentation,
  Grid, 
  Plus, 
  Download, 
  CheckCircle2,
  Trash2,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { OutputAsset, TransformationId } from '../../types';
import { SummaryCard } from './SummaryCard';
import { FlashcardViewer } from './FlashcardViewer';
import { QuizRunner } from './QuizRunner';
import { ScriptViewer } from './ScriptViewer';
import { SocialPreview } from './SocialPreview';
import { PresentationOutlineCard } from './PresentationOutlineCard';
import { ValidationBadge } from './ValidationBadge';

interface OutputWorkspaceProps {
  assets: OutputAsset[];
  sourceTitle: string;
  onBackToConfig: () => void;
  onRegenerateAsset: (assetId: string) => void;
  onDeleteAsset: (assetId: string) => void;
  onToggleSaveAsset: (assetId: string) => void;
}

export const OutputWorkspace: React.FC<OutputWorkspaceProps> = ({
  assets,
  sourceTitle,
  onBackToConfig,
  onRegenerateAsset,
  onDeleteAsset,
  onToggleSaveAsset
}) => {
  const [activeAssetId, setActiveAssetId] = useState<string>(assets[0]?.id || '');
  const [viewMode, setViewMode] = useState<'tabs' | 'grid'>('tabs');

  if (assets.length === 0) {
    return (
      <div className="glass-panel" style={{ padding: '48px', textAlign: 'center', maxWidth: 600, margin: '40px auto' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 8, color: '#ffffff' }}>
          No Active Assets
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 20 }}>
          All outputs from this session have been cleared. Return to configure new transformations.
        </p>
        <button onClick={onBackToConfig} className="btn btn-primary">
          Back to Transformation Workspace
        </button>
      </div>
    );
  }

  // Ensure active asset exists
  const activeAsset = assets.find(a => a.id === activeAssetId) || assets[0];

  const getPurposeIcon = (purposeId: TransformationId) => {
    switch (purposeId) {
      case 'summary': 
      case 'executive_brief': return FileText;
      case 'flashcards': 
      case 'key_concepts': return Layers;
      case 'quiz': return HelpCircle;
      case 'presentation_outline': return Presentation;
      case 'speaking_script': return Mic;
      case 'linkedin_post':
      case 'x_post':
      case 'instagram_caption': return Share2;
      default: return FileText;
    }
  };

  const handleExportAll = () => {
    let combined = `# BYTEFORCE TRANSFORMATION BUNDLE\nSource: ${sourceTitle}\nGenerated: ${new Date().toLocaleString()}\n\n========================================\n\n`;
    
    assets.forEach((asset, idx) => {
      combined += `\n\n### ASSET ${idx + 1}: ${asset.title} [${asset.category.toUpperCase()}]\n\n`;
      if (asset.payload.type === 'summary') {
        combined += `${asset.payload.data.overview}\n\nKey Insights:\n${asset.payload.data.keyInsights.join('\n')}\n`;
      } else if (asset.payload.type === 'speaking_script') {
        combined += `${asset.payload.data.title}\n${asset.payload.data.sections.map(s => s.content).join('\n\n')}\n`;
      } else if (asset.payload.type === 'presentation_outline') {
        combined += `# ${asset.payload.data.title}\n${asset.payload.data.slides.map(s => `Slide ${s.slideNumber}: ${s.title}\n${s.bullets.join('\n')}\nNotes: ${s.speakerNotes}`).join('\n\n')}\n`;
      } else if (asset.payload.type === 'social') {
        combined += `${asset.payload.data.hook}\n\n${asset.payload.data.body}\n\n${asset.payload.data.hashtags.join(' ')}\n`;
      } else if (asset.payload.type === 'flashcards') {
        combined += asset.payload.data.cards.map((c, i) => `Q${i + 1}: ${c.question}\nA: ${c.answer}`).join('\n\n');
      } else if (asset.payload.type === 'quiz') {
        combined += asset.payload.data.questions.map((q, i) => `Q${i + 1}: ${q.question}\nOptions: ${q.options.join(', ')}\nAnswer: ${q.options[q.correctIndex]}`).join('\n\n');
      }
      combined += `\n----------------------------------------\n`;
    });

    const blob = new Blob([combined], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `byteforce-assets-bundle-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderAssetRenderer = (asset: OutputAsset) => {
    switch (asset.payload.type) {
      case 'summary':
        return <SummaryCard key={asset.id} asset={asset} onRegenerate={() => onRegenerateAsset(asset.id)} />;
      case 'flashcards':
        return <FlashcardViewer key={asset.id} asset={asset} onRegenerate={() => onRegenerateAsset(asset.id)} />;
      case 'quiz':
        return <QuizRunner key={asset.id} asset={asset} onRegenerate={() => onRegenerateAsset(asset.id)} />;
      case 'presentation_outline':
        return <PresentationOutlineCard key={asset.id} asset={asset} onRegenerate={() => onRegenerateAsset(asset.id)} />;
      case 'speaking_script':
        return <ScriptViewer key={asset.id} asset={asset} onRegenerate={() => onRegenerateAsset(asset.id)} />;
      case 'social':
        return <SocialPreview key={asset.id} asset={asset} onRegenerate={() => onRegenerateAsset(asset.id)} />;
      default:
        return null;
    }
  };

  return (
    <div style={{
      maxWidth: 1280,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }}>
      {/* Workspace Provenance Banner */}
      <div className="glass-panel animate-fade-in" style={{
        padding: '14px 20px',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        background: 'linear-gradient(135deg, rgba(15, 20, 32, 0.95) 0%, rgba(10, 14, 24, 0.95) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 14
      }}>
        {/* Left: Provenance Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #10b981 0%, #38bdf8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(16, 185, 129, 0.35)',
            flexShrink: 0
          }}>
            <CheckCircle2 size={18} color="#06080c" />
          </div>
          <div>
            <div style={{
              fontSize: '0.9rem',
              fontWeight: 800,
              letterSpacing: '0.01em',
              color: '#ffffff'
            }}>
              ONE SOURCE. {assets.length} PURPOSE-BUILT ASSETS. ONE WORKSPACE.
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-secondary)' }}>
              Source Origin: <strong style={{ color: 'var(--brand-cyan)' }}>{sourceTitle}</strong>
            </div>
          </div>
        </div>

        {/* Right Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {/* View mode switcher */}
          <div className="tab-list" style={{ padding: 2 }}>
            <button
              onClick={() => setViewMode('tabs')}
              className={`tab-btn ${viewMode === 'tabs' ? 'active' : ''}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              Tabs
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`tab-btn ${viewMode === 'grid' ? 'active' : ''}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              <Grid size={12} /> Grid
            </button>
          </div>

          <button
            onClick={onBackToConfig}
            className="btn btn-secondary btn-sm"
            title="Switch purpose or configure more transformations"
          >
            <ArrowLeft size={13} />
            <span>Switch Purpose</span>
          </button>

          <button
            onClick={handleExportAll}
            className="btn btn-secondary btn-sm"
          >
            <Download size={13} />
            <span>Export Bundle</span>
          </button>

          <button
            onClick={onBackToConfig}
            className="btn btn-accent-glow btn-sm"
          >
            <Plus size={13} />
            <span>Add Output</span>
          </button>
        </div>
      </div>

      {/* TABS VIEW */}
      {viewMode === 'tabs' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Output Selector Tabs Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: 4,
            gap: 12,
            overflowX: 'auto'
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {assets.map((asset) => {
                const Icon = getPurposeIcon(asset.purposeId);
                const isActive = asset.id === activeAsset.id;

                return (
                  <button
                    key={asset.id}
                    onClick={() => setActiveAssetId(asset.id)}
                    style={{
                      background: isActive ? 'var(--bg-surface-elevated)' : 'transparent',
                      border: isActive ? '1px solid var(--brand-cyan)' : '1px solid var(--border-subtle)',
                      borderBottom: isActive ? '2px solid var(--brand-cyan)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '7px 14px',
                      color: isActive ? '#ffffff' : 'var(--text-muted)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 7,
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.825rem',
                      transition: 'all var(--transition-fast)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Icon size={14} color={isActive ? 'var(--brand-cyan)' : 'var(--text-dim)'} />
                    <span>{asset.title}</span>
                    <span className="badge badge-muted" style={{ fontSize: '0.625rem', padding: '1px 5px' }}>
                      {asset.category.toUpperCase()}
                    </span>
                    {asset.isSaved && (
                      <BookmarkCheck size={12} color="#10b981" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Asset Operations */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <button
                onClick={() => onToggleSaveAsset(activeAsset.id)}
                className={`btn btn-sm ${activeAsset.isSaved ? 'btn-primary' : 'btn-secondary'}`}
                title="Save this asset to Saved Library"
              >
                {activeAsset.isSaved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
                <span>{activeAsset.isSaved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={() => onDeleteAsset(activeAsset.id)}
                className="btn btn-ghost btn-sm"
                title="Delete this asset from workspace"
                style={{ color: 'var(--brand-rose)' }}
              >
                <Trash2 size={13} />
                <span>Delete</span>
              </button>
            </div>
          </div>

          {/* Truthful Quality Audit Badge */}
          <ValidationBadge
            signals={activeAsset.validationSignals}
            sourceTitle={sourceTitle}
          />

          {/* Active Asset Card Renderer */}
          <div>
            {renderAssetRenderer(activeAsset)}
          </div>
        </div>
      ) : (
        /* GRID COMPARISON VIEW */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: 18
        }}>
          {assets.map((asset) => (
            <div key={asset.id} style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 10,
                display: 'flex',
                gap: 6
              }}>
                <button
                  onClick={() => onToggleSaveAsset(asset.id)}
                  className={`btn btn-sm ${asset.isSaved ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '3px 8px' }}
                >
                  <Bookmark size={12} />
                </button>
                <button
                  onClick={() => onDeleteAsset(asset.id)}
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '3px 8px', color: 'var(--brand-rose)' }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
              {renderAssetRenderer(asset)}
            </div>
          ))}
        </div>
      )}

      {/* Golden Journey Continuous Loop Bar */}
      <div className="glass-panel" style={{
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
        border: '1px solid var(--border-subtle)',
        background: 'rgba(10, 14, 22, 0.9)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Workflow Continuity:</span>
          <span style={{
            fontSize: '0.725rem',
            color: '#34d399',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            <CheckCircle2 size={12} color="#10b981" />
            Source Grounded in "{sourceTitle}"
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={onBackToConfig}
            className="btn btn-secondary btn-sm"
          >
            <ArrowLeft size={13} />
            <span>Switch Purpose / Generate Another Output</span>
          </button>

          <button
            onClick={handleExportAll}
            className="btn btn-primary btn-sm"
          >
            <Download size={13} />
            <span>Export All ({assets.length}) Assets</span>
          </button>
        </div>
      </div>
    </div>
  );
};
