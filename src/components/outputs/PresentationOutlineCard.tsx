import React, { useState } from 'react';
import { 
  Presentation, 
  Copy, 
  Check, 
  Download, 
  Edit3, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  UserCheck 
} from 'lucide-react';
import { OutputAsset, PresentationOutlineData, SlideItem } from '../../types';
import { ValidationBadge } from './ValidationBadge';

interface PresentationOutlineCardProps {
  asset: OutputAsset;
  onRegenerate: () => void;
}

export const PresentationOutlineCard: React.FC<PresentationOutlineCardProps> = ({
  asset,
  onRegenerate
}) => {
  const outlineData = (asset.payload as { type: 'presentation_outline'; data: PresentationOutlineData }).data;
  const [data, setData] = useState<PresentationOutlineData>(outlineData);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeSlide = data.slides[activeSlideIndex] || data.slides[0];

  const handleCopy = () => {
    let text = `# ${data.title}\nTheme: ${data.theme}\nAudience: ${data.targetAudience}\n\n`;
    data.slides.forEach(s => {
      text += `## Slide ${s.slideNumber}: ${s.title}\n`;
      s.bullets.forEach(b => { text += `* ${b}\n`; });
      text += `> Speaker Notes: ${s.speakerNotes}\n\n`;
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    let text = `# ${data.title}\nTheme: ${data.theme}\nAudience: ${data.targetAudience}\n\n`;
    data.slides.forEach(s => {
      text += `## Slide ${s.slideNumber}: ${s.title}\n`;
      s.bullets.forEach(b => { text += `* ${b}\n`; });
      text += `> Speaker Notes: ${s.speakerNotes}\n\n`;
    });
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `presentation-deck-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="glass-card animate-fade-in" style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
      {/* Header Toolbar */}
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
            <span className="badge badge-cyan">
              PRESENT • SLIDE DECK OUTLINE
            </span>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              {data.slides.length} Keynote Slides • Audience: {data.targetAudience}
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
            {data.title}
          </h2>
        </div>

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
            {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy Deck'}</span>
          </button>
          <button
            onClick={handleDownload}
            className="btn btn-secondary btn-sm"
            title="Download Slide Deck Markdown"
          >
            <Download size={13} />
            <span>Export</span>
          </button>
          <button
            onClick={onRegenerate}
            className="btn btn-ghost btn-sm"
            title="Regenerate Deck"
          >
            <RotateCw size={13} />
          </button>
        </div>
      </div>

      <ValidationBadge signals={asset.validationSignals} />

      {/* Theme & Audience Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 12,
        background: 'var(--bg-canvas)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Presentation size={15} color="var(--brand-cyan)" />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Theme: <strong style={{ color: '#ffffff' }}>{data.theme}</strong>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <UserCheck size={15} color="#818cf8" />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Audience: <strong style={{ color: '#ffffff' }}>{data.targetAudience}</strong>
          </span>
        </div>
      </div>

      {/* Slide Thumbnails / Selector */}
      <div style={{
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 4
      }}>
        {data.slides.map((s, idx) => (
          <button
            key={s.slideNumber}
            onClick={() => setActiveSlideIndex(idx)}
            className={`btn btn-sm ${idx === activeSlideIndex ? 'btn-primary' : 'btn-secondary'}`}
            style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
          >
            Slide {s.slideNumber}: {s.title.slice(0, 18)}...
          </button>
        ))}
      </div>

      {/* ACTIVE SLIDE VIEWER CANVAS */}
      <div style={{
        background: 'linear-gradient(145deg, #0d121c 0%, #080b11 100%)',
        border: '1.5px solid rgba(56, 189, 248, 0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        boxShadow: 'var(--shadow-md)'
      }}>
        {/* Slide Title */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              background: 'var(--brand-cyan)',
              color: '#07090d',
              fontWeight: 800,
              fontSize: '0.75rem',
              padding: '2px 8px',
              borderRadius: 4
            }}>
              SLIDE {activeSlide.slideNumber}
            </span>
            {isEditing ? (
              <input
                type="text"
                value={activeSlide.title}
                onChange={(e) => {
                  const newSlides = [...data.slides];
                  newSlides[activeSlideIndex].title = e.target.value;
                  setData({ ...data, slides: newSlides });
                }}
                className="input-control"
                style={{ fontSize: '1rem', fontWeight: 700 }}
              />
            ) : (
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>
                {activeSlide.title}
              </h3>
            )}
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {activeSlideIndex + 1} of {data.slides.length}
          </span>
        </div>

        {/* Slide Bullet Points */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {activeSlide.bullets.map((bullet, bIdx) => (
            <div
              key={bIdx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                background: 'rgba(255, 255, 255, 0.02)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--brand-cyan)',
                marginTop: 6,
                flexShrink: 0
              }} />
              {isEditing ? (
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => {
                    const newSlides = [...data.slides];
                    newSlides[activeSlideIndex].bullets[bIdx] = e.target.value;
                    setData({ ...data, slides: newSlides });
                  }}
                  className="input-control"
                  style={{ fontSize: '0.85rem' }}
                />
              ) : (
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {bullet}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Speaker Notes */}
        <div style={{
          marginTop: 10,
          background: 'rgba(99, 102, 241, 0.06)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          borderRadius: 'var(--radius-sm)',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6
        }}>
          <div style={{
            fontSize: '0.725rem',
            fontWeight: 700,
            color: '#a5b4fc',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <Sparkles size={13} />
            <span>SPEAKER NOTES / TALKING POINTS</span>
          </div>
          {isEditing ? (
            <textarea
              value={activeSlide.speakerNotes}
              onChange={(e) => {
                const newSlides = [...data.slides];
                newSlides[activeSlideIndex].speakerNotes = e.target.value;
                setData({ ...data, slides: newSlides });
              }}
              className="input-control"
              style={{ minHeight: 70, fontSize: '0.8rem' }}
            />
          ) : (
            <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5, fontStyle: 'italic' }}>
              "{activeSlide.speakerNotes}"
            </p>
          )}
        </div>

        {/* Slide Carousel Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: 12
        }}>
          <button
            onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
            disabled={activeSlideIndex === 0}
            className="btn btn-secondary btn-sm"
          >
            <ChevronLeft size={14} />
            <span>Previous Slide</span>
          </button>

          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Slide {activeSlideIndex + 1} of {data.slides.length}
          </span>

          <button
            onClick={() => setActiveSlideIndex(prev => Math.min(data.slides.length - 1, prev + 1))}
            disabled={activeSlideIndex === data.slides.length - 1}
            className="btn btn-primary btn-sm"
          >
            <span>Next Slide</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
