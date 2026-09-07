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
  Minimize2, 
  Sparkles,
  Volume2,
  Gauge
} from 'lucide-react';
import { OutputAsset, ScriptData } from '../../types';

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
    <div className="bf-card animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header & Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 16,
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge" style={{
              background: 'rgba(124, 111, 232, 0.1)',
              color: 'var(--brand-primary)',
              border: '1px solid rgba(124, 111, 232, 0.25)',
              fontWeight: 700
            }}>
              PRESENT • KEYNOTE SCRIPT
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {data.wordCount} words • {data.estimatedSpeakingTime}
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.015em' }}>
            {data.title}
          </h2>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setIsTeleprompterOpen(true)}
            className="btn btn-primary btn-sm"
            style={{
              background: 'linear-gradient(135deg, #7C6FE8 0%, #6FD6C0 100%)',
              border: 'none',
              boxShadow: '0 2px 8px rgba(124, 111, 232, 0.25)'
            }}
          >
            <Mic size={13} />
            <span>Teleprompter Studio</span>
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`btn btn-sm ${isEditing ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Edit3 size={13} />
            <span>{isEditing ? 'Done Editing' : 'Edit'}</span>
          </button>
          <button
            onClick={handleCopy}
            className="btn btn-secondary btn-sm"
          >
            {copied ? <Check size={13} color="#1F7C67" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="btn btn-secondary btn-sm"
            title="Download Script Markdown"
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

      {/* Speaking Metrics Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12
      }}>
        <div style={{
          background: 'var(--bg-canvas)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'rgba(124, 111, 232, 0.1)',
            border: '1px solid rgba(124, 111, 232, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--brand-primary)'
          }}>
            <Clock size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Delivery Duration
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {data.estimatedSpeakingTime}
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-canvas)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'rgba(245, 199, 126, 0.2)',
            border: '1px solid rgba(245, 199, 126, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#B27B1A'
          }}>
            <Gauge size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Speaking Cadence
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              ~130 Words / Minute
            </div>
          </div>
        </div>

        <div style={{
          background: 'var(--bg-canvas)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'rgba(111, 214, 192, 0.2)',
            border: '1px solid rgba(111, 214, 192, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1F7C67'
          }}>
            <Volume2 size={16} />
          </div>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Structure Modules
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {data.sections.length} Act Sequence
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
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderLeft: '3px solid var(--brand-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '18px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              boxShadow: 'var(--shadow-resting)'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 8
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--brand-primary)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}>
                  {section.heading}
                </span>
              </div>
              <span style={{
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)',
                background: '#F3F1FC',
                padding: '2px 8px',
                borderRadius: 4,
                border: '1px solid var(--border-subtle)'
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
                style={{ minHeight: 90, fontSize: '0.875rem' }}
              />
            ) : (
              <p style={{
                fontSize: '0.925rem',
                color: 'var(--text-primary)',
                lineHeight: 1.65,
                margin: 0
              }}>
                "{section.content}"
              </p>
            )}
          </div>
        ))}
      </div>

      {/* TELEPROMPTER FULLSCREEN STUDIO OVERLAY */}
      {isTeleprompterOpen && (
        <div className="modal-overlay" style={{ background: 'rgba(30, 30, 46, 0.88)', backdropFilter: 'blur(8px)', padding: 0 }}>
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 1000,
            margin: '0 auto',
            padding: '24px'
          }}>
            {/* Top Control Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
              paddingBottom: 16,
              marginBottom: 16,
              flexWrap: 'wrap',
              gap: 12
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span className="badge" style={{
                  background: 'rgba(111, 214, 192, 0.2)',
                  color: '#6FD6C0',
                  border: '1px solid rgba(111, 214, 192, 0.35)',
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  fontWeight: 700
                }}>
                  STUDIO TELEPROMPTER
                </span>
                <span style={{ fontSize: '0.8rem', color: '#B6B6C9' }}>
                  Pacing Target: ~130 WPM
                </span>
              </div>

              {/* Scroll controls */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  onClick={() => setIsScrolling(!isScrolling)}
                  className={`btn ${isScrolling ? 'btn-secondary' : 'btn-primary'}`}
                  style={{ minWidth: 120 }}
                >
                  {isScrolling ? <Pause size={15} /> : <Play size={15} />}
                  <span>{isScrolling ? 'Pause Scroll' : 'Auto-Scroll'}</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#E9E8F5' }}>
                  <span>Speed:</span>
                  {[1, 2, 3].map(spd => (
                    <button
                      key={spd}
                      onClick={() => setScrollSpeed(spd)}
                      className={`btn btn-sm ${scrollSpeed === spd ? 'btn-primary' : 'btn-ghost'}`}
                      style={{ padding: '3px 9px', color: scrollSpeed === spd ? '#FFFFFF' : '#B6B6C9' }}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsTeleprompterOpen(false)}
                  className="btn btn-secondary btn-sm"
                  style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.2)' }}
                >
                  <Minimize2 size={14} />
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
                gap: 40
              }}
            >
              {data.sections.map((sec, idx) => (
                <div key={idx} style={{ maxWidth: 840, margin: '0 auto', width: '100%' }}>
                  <div style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#6FD6C0',
                    marginBottom: 12,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase'
                  }}>
                    [{sec.heading} • {sec.timestamp}]
                  </div>
                  <p style={{
                    fontSize: '1.65rem',
                    lineHeight: 1.65,
                    color: '#FFFFFF',
                    fontWeight: 500,
                    margin: 0
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
