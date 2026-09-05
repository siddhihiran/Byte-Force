import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Clock, 
  Copy, 
  Check, 
  Download, 
  Edit3, 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { OutputAsset, ScriptData } from '../../types';
import { ValidationBadge } from './ValidationBadge';

interface ScriptViewerProps {
  asset: OutputAsset;
  onRegenerate: () => void;
}

export const ScriptViewer: React.FC<ScriptViewerProps> = ({ asset, onRegenerate }) => {
  const scriptData = (asset.payload as { type: 'speaking_script'; data: ScriptData }).data;
  const [data, setData] = useState<ScriptData>(scriptData);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Teleprompter presentation mode
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(2);

  const handleCopy = () => {
    const text = `# ${data.title}\nSpeaking Time: ${data.estimatedSpeakingTime}\n\n` +
      data.sections.map(s => `## ${s.heading} (${s.timestamp})\n${s.content}\n`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = `# ${data.title}\nSpeaking Time: ${data.estimatedSpeakingTime}\n\n` +
      data.sections.map(s => `## ${s.heading} (${s.timestamp})\n${s.content}\n`).join('\n');
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `speaking-script-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Teleprompter scroll effect
  useEffect(() => {
    let interval: any = null;
    if (isTeleprompterOpen && isScrolling) {
      interval = setInterval(() => {
        const container = document.getElementById('teleprompter-content-box');
        if (container) {
          container.scrollTop += scrollSpeed;
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isTeleprompterOpen, isScrolling, scrollSpeed]);

  return (
    <div className="glass-card animate-fade-in" style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
      {/* Header */}
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
            <span className="badge badge-indigo" style={{
              background: 'rgba(244, 114, 182, 0.15)',
              color: '#f472b6',
              border: '1px solid rgba(244, 114, 182, 0.3)'
            }}>
              PRESENT • KEYNOTE SCRIPT
            </span>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              {data.wordCount} words • {data.estimatedSpeakingTime}
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
            {data.title}
          </h2>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setIsTeleprompterOpen(true)}
            className="btn btn-primary btn-sm"
            style={{
              background: 'linear-gradient(135deg, #f43f5e 0%, #a855f7 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Mic size={13} />
            <span>Teleprompter Mode</span>
          </button>
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
            title="Download Script"
          >
            <Download size={13} />
          </button>
          <button
            onClick={onRegenerate}
            className="btn btn-ghost btn-sm"
            title="Regenerate"
          >
            <Sparkles size={13} />
          </button>
        </div>
      </div>

      <ValidationBadge signals={asset.validationSignals} />

      {/* Speaking Metrics Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 12,
        background: 'var(--bg-canvas)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Clock size={16} color="#38bdf8" />
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>DELIVERY DURATION</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
              {data.estimatedSpeakingTime}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Mic size={16} color="#f472b6" />
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CADENCE TARGET</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
              ~130 Words / Minute
            </div>
          </div>
        </div>
      </div>

      {/* Sections of the script */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {data.sections.map((section, idx) => (
          <div
            key={idx}
            style={{
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              paddingBottom: 6
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f472b6' }}>
                {section.heading}
              </span>
              <span style={{
                fontSize: '0.7rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)'
              }}>
                {section.timestamp}
              </span>
            </div>

            {isEditing ? (
              <textarea
                value={section.content}
                onChange={(e) => {
                  const newSections = [...data.sections];
                  newSections[idx].content = e.target.value;
                  setData({ ...data, sections: newSections });
                }}
                className="input-control"
                style={{ minHeight: 90, fontSize: '0.85rem' }}
              />
            ) : (
              <p style={{
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                lineHeight: 1.7,
                fontFamily: 'inherit'
              }}>
                "{section.content}"
              </p>
            )}
          </div>
        ))}
      </div>

      {/* TELEPROMPTER FULLSCREEN MODAL */}
      {isTeleprompterOpen && (
        <div className="modal-overlay" style={{ background: 'rgba(5, 7, 10, 0.96)', padding: 0 }}>
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 960,
            margin: '0 auto',
            padding: '24px'
          }}>
            {/* Top Control Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 16,
              marginBottom: 20
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="badge badge-cyan">TELEPROMPTER MODE</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Pacing: ~130 wpm
                </span>
              </div>

              {/* Scroll controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  onClick={() => setIsScrolling(!isScrolling)}
                  className={`btn ${isScrolling ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ minWidth: 110 }}
                >
                  {isScrolling ? <Pause size={15} /> : <Play size={15} />}
                  <span>{isScrolling ? 'Pause' : 'Auto-Scroll'}</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem' }}>
                  <span>Speed:</span>
                  {[1, 2, 3].map(spd => (
                    <button
                      key={spd}
                      onClick={() => setScrollSpeed(spd)}
                      className={`btn btn-sm ${scrollSpeed === spd ? 'btn-primary' : 'btn-ghost'}`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsTeleprompterOpen(false)}
                  className="btn btn-secondary btn-sm"
                >
                  <Minimize2 size={15} />
                  <span>Exit Teleprompter</span>
                </button>
              </div>
            </div>

            {/* Scrolling Script Text Viewport */}
            <div
              id="teleprompter-content-box"
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '40px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 36
              }}
            >
              {data.sections.map((sec, idx) => (
                <div key={idx} style={{ maxWidth: 800, margin: '0 auto' }}>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: '#f472b6',
                    marginBottom: 10,
                    letterSpacing: '0.05em'
                  }}>
                    [{sec.heading.toUpperCase()} • {sec.timestamp}]
                  </div>
                  <p style={{
                    fontSize: '1.6rem',
                    lineHeight: 1.6,
                    color: '#ffffff',
                    fontWeight: 500
                  }}>
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
