import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  Edit3, 
  RotateCcw, 
  FileText, 
  Sparkles, 
  ListChecks, 
  BookMarked 
} from 'lucide-react';
import { OutputAsset, SummaryData } from '../../types';

interface SummaryCardProps {
  asset: OutputAsset;
  onRegenerate: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ asset, onRegenerate }) => {
  const summary = (asset.payload as { type: 'summary'; data: SummaryData }).data;
  const [data, setData] = useState<SummaryData>(summary);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `# ${asset.title}
## Executive Overview
${data.overview}

## Key Insights
${data.keyInsights.map(i => `• ${i}`).join('\n')}

## Important Concepts
${data.importantConcepts.map(c => `• **${c.term}**: ${c.explanation}`).join('\n')}

## Actionable Takeaways
${data.takeaways.map(t => `1. ${t}`).join('\n')}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = `# ${asset.title}\n\n## Overview\n${data.overview}\n\n## Key Insights\n${data.keyInsights.join('\n')}\n\n## Takeaways\n${data.takeaways.join('\n')}`;
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${asset.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bf-card animate-fade-in" style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
      {/* Asset Header Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 16,
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span className="badge badge-cyan">LEARN • EXECUTIVE SYNTHESIS</span>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              {asset.format}
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {asset.title}
          </h2>
        </div>

        {/* Actions Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`btn btn-sm ${isEditing ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Edit3 size={13} />
            <span>{isEditing ? 'Done' : 'Edit'}</span>
          </button>
          <button
            onClick={handleCopy}
            className="btn btn-secondary btn-sm"
          >
            {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="btn btn-secondary btn-sm"
            title="Export as Markdown"
          >
            <Download size={13} />
            <span>Export</span>
          </button>
          <button
            onClick={onRegenerate}
            className="btn btn-ghost btn-sm"
            title="Regenerate with current settings"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* SECTION 1: OVERVIEW */}
      <div style={{
        background: 'var(--bg-canvas)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '16px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8,
          fontSize: '0.785rem',
          fontWeight: 800,
          color: 'var(--brand-cyan)',
          letterSpacing: '0.04em'
        }}>
          <FileText size={14} />
          <span>EXECUTIVE OVERVIEW</span>
        </div>
        {isEditing ? (
          <textarea
            value={data.overview}
            onChange={(e) => setData({ ...data, overview: e.target.value })}
            className="input-control"
            style={{ minHeight: 90 }}
          />
        ) : (
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
            {data.overview}
          </p>
        )}
      </div>

      {/* SECTION 2: KEY INSIGHTS */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
          fontSize: '0.785rem',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '0.04em'
        }}>
          <Sparkles size={14} color="#38bdf8" />
          <span>KEY STRATEGIC INSIGHTS</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.keyInsights.map((insight, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px'
              }}
            >
              <div style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'rgba(56, 189, 248, 0.1)',
                color: 'var(--brand-cyan)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 800,
                flexShrink: 0,
                marginTop: 1
              }}>
                {idx + 1}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {insight}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: IMPORTANT CONCEPTS */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
          fontSize: '0.785rem',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '0.04em'
        }}>
          <BookMarked size={14} color="#818cf8" />
          <span>CORE CONCEPT LEXICON</span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 10
        }}>
          {data.importantConcepts.map((concept, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(99, 102, 241, 0.04)',
                border: '1px solid rgba(99, 102, 241, 0.18)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 14px'
              }}
            >
              <div style={{
                fontWeight: 700,
                fontSize: '0.85rem',
                color: '#c7d2fe',
                marginBottom: 4
              }}>
                {concept.term}
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {concept.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: ACTIONABLE TAKEAWAYS */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
          fontSize: '0.785rem',
          fontWeight: 800,
          color: '#34d399',
          letterSpacing: '0.04em'
        }}>
          <ListChecks size={14} />
          <span>ACTIONABLE TAKEAWAYS</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {data.takeaways.map((takeaway, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5
              }}
            >
              <span style={{ color: '#10b981', fontWeight: 800 }}>→</span>
              <span>{takeaway}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
