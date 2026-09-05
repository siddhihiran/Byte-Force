import React from 'react';
import { Sparkles, FileText, ArrowRight, Zap, Layers } from 'lucide-react';

interface EmptyStateProps {
  onLoadSample: () => void;
  onExploreTemplates: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onLoadSample,
  onExploreTemplates
}) => {
  return (
    <div className="glass-panel animate-fade-in" style={{
      padding: '48px 32px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
      maxWidth: 640,
      margin: '40px auto'
    }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Layers size={30} color="var(--brand-cyan)" />
      </div>

      <div>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 8, color: '#ffffff' }}>
          Your Next High-Yield Asset Starts with One Source
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 460, margin: '0 auto' }}>
          Select an outcome instead of writing prompt templates. Ingest a document or try our verified renewable energy sample to experience multi-purpose transformation.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={onLoadSample}
          className="btn btn-accent-glow"
          style={{ padding: '10px 20px' }}
        >
          <Zap size={16} />
          <span>Load Verified Sample Source</span>
        </button>

        <button
          onClick={onExploreTemplates}
          className="btn btn-secondary"
          style={{ padding: '10px 18px' }}
        >
          <Sparkles size={15} color="var(--brand-cyan)" />
          <span>Browse Template Packs</span>
        </button>
      </div>
    </div>
  );
};
