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
  ArrowLeft
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
      <div className="bf-card" style={{ padding: '48px 32px', textAlign: 'center', maxWidth: 560, margin: '40px auto' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>
          No Active Assets
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: 20 }}>
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
      maxWidth: 1320,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
      {/* Workspace Provenance Banner (Crisp White Card) */}
      <div className="bf-card" style={{
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        {/* Left: Provenance Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'var(--brand-mint-subtle)',
            border: '1px solid rgba(111, 214, 192, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1F7C67',
            flexShrink: 0
          }}>
            <CheckCircle2 size={18} />
          </div>
          <div>
            <div style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.01em'
            }}>
              ONE SOURCE. {assets.length} PURPOSE-BUILT ASSETS. ONE WORKSPACE.
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: 2 }}>
              Source Origin: <strong style={{ color: 'var(--brand-primary)' }}>{sourceTitle}</strong>
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
              style={{ fontSize: '12px', padding: '4px 12px' }}
            >
              Tabs
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`tab-btn ${viewMode === 'grid' ? 'active' : ''}`}
              style={{ fontSize: '12px', padding: '4px 12px' }}
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
            className="btn btn-primary btn-sm"
          >
            <Plus size={13} />
            <span>Add Output</span>
          </button>
        </div>
      </div>

      {/* TABS VIEW */}
      {viewMode === 'tabs' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Output Selector Tabs Strip */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: 6,
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
                      background: isActive ? '#FFFFFF' : 'transparent',
                      border: isActive ? '1px solid var(--border-subtle)' : '1px solid transparent',
                      borderBottom: isActive ? '2px solid var(--brand-primary)' : '1px solid transparent',
                      borderRadius: '8px',
                      padding: '8px 14px',
                      color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                      boxShadow: isActive ? 'var(--shadow-resting)' : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '13px',
                      transition: 'all var(--transition-fast)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Icon size={14} color={isActive ? 'var(--brand-primary)' : 'var(--text-muted)'} />
                    <span>{asset.title}</span>
                    <span className="badge badge-muted" style={{ fontSize: '10px', padding: '1px 6px' }}>
                      {asset.category.toUpperCase()}
                    </span>
                    {asset.isSaved && (
                      <BookmarkCheck size={13} color="var(--brand-mint)" />
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
          gap: 20
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
                  style={{ padding: '4px 8px' }}
                >
                  <Bookmark size={12} />
                </button>
                <button
                  onClick={() => onDeleteAsset(asset.id)}
                  className="btn btn-ghost btn-sm"
                  style={{ padding: '4px 8px', color: 'var(--brand-rose)' }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
              {renderAssetRenderer(asset)}
            </div>
          ))}
        </div>
      )}

      {/* Golden Journey Continuous Loop Bar (Pure White Card) */}
      <div className="bf-card" style={{
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Workflow Continuity:</span>
          <span style={{
            fontSize: '12px',
            color: '#1F7C67',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 5
          }}>
            <CheckCircle2 size={13} color="#278E77" />
            Source Grounded in "{sourceTitle}"
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
