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
      gap: 24,
      background: '#FFFFFF'
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
            <span className="badge badge-primary">LEARN • EXECUTIVE SYNTHESIS</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {asset.format}
            </span>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            {asset.title}
          </h2>
        </div>

        {/* Actions Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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
            {copied ? <Check size={13} color="var(--brand-mint)" /> : <Copy size={13} />}
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
        background: 'var(--bg-surface-subtle)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '14px',
        padding: '18px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          marginBottom: 8,
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--brand-primary)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase'
        }}>
          <FileText size={14} />
          <span>Executive Overview</span>
        </div>
        {isEditing ? (
          <textarea
            value={data.overview}
            onChange={(e) => setData({ ...data, overview: e.target.value })}
            className="input-control"
            style={{ minHeight: 90 }}
          />
        ) : (
          <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.6, margin: 0 }}>
            {data.overview}
          </p>
        )}
      </div>

      {/* SECTION 2: KEY INSIGHTS */}
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          marginBottom: 12,
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase'
        }}>
          <Sparkles size={14} color="var(--brand-primary)" />
          <span>Key Strategic Insights</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {data.keyInsights.map((insight, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '12px 16px',
                boxShadow: 'var(--shadow-resting)'
              }}
            >
              <div style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: 'var(--brand-primary-subtle)',
                color: 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 700,
                flexShrink: 0,
                marginTop: 1
              }}>
                {idx + 1}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
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
          gap: 7,
          marginBottom: 12,
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase'
        }}>
          <BookMarked size={14} color="var(--brand-primary)" />
          <span>Core Concept Lexicon</span>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 12
        }}>
          {data.importantConcepts.map((concept, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '14px 16px'
              }}
            >
              <div style={{
                fontWeight: 600,
                fontSize: '13px',
                color: 'var(--text-primary)',
                marginBottom: 4
              }}>
                {concept.term}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
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
          gap: 7,
          marginBottom: 12,
          fontSize: '11px',
          fontWeight: 700,
          color: 'var(--text-secondary)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase'
        }}>
          <ListChecks size={14} color="#1F7C67" />
          <span>Actionable Takeaways</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {data.takeaways.map((takeaway, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                fontSize: '13px',
                color: 'var(--text-primary)',
                lineHeight: 1.5
              }}
            >
              <span style={{ color: '#1F7C67', fontWeight: 700 }}>→</span>
              <span>{takeaway}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
