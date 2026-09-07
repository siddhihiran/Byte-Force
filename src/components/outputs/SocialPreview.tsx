import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ThumbsUp, 
  MessageSquare, 
  Repeat2, 
  Send, 
  Heart, 
  Bookmark, 
  RotateCw,
  MoreHorizontal
} from 'lucide-react';
import { OutputAsset, SocialData } from '../../types';

interface SocialPreviewProps {
  asset: OutputAsset;
  onRegenerate: () => void;
}

export const SocialPreview: React.FC<SocialPreviewProps> = ({ asset, onRegenerate }) => {
  const socialData = (asset.payload as { type: 'social'; data: SocialData }).data;
  const [data] = useState<SocialData>(socialData);
  const [activePlatform, setActivePlatform] = useState<'linkedin' | 'x' | 'instagram'>(data.platform);
  const [copied, setCopied] = useState(false);

  const getFullFormattedText = () => {
    return `${data.hook}\n\n${data.body}\n\n${data.callToAction}\n\n${data.hashtags.join(' ')}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullFormattedText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bf-card animate-fade-in" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
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
            <span className="badge" style={{
              background: '#EBFBF7',
              color: '#1F7C67',
              border: '1px solid #BFEFDE',
              fontWeight: 700
            }}>
              PUBLISH • {activePlatform.toUpperCase()}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Optimized for high-retention distribution
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.015em' }}>
            {asset.title}
          </h2>
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Platform preview switcher */}
          <div className="tab-list" style={{ padding: 2 }}>
            {(['linkedin', 'x', 'instagram'] as const).map(plt => (
              <button
                key={plt}
                onClick={() => setActivePlatform(plt)}
                className={`tab-btn ${activePlatform === plt ? 'active' : ''}`}
                style={{ fontSize: '0.75rem', padding: '4px 12px', textTransform: 'capitalize' }}
              >
                {plt === 'x' ? 'X (Twitter)' : plt}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="btn btn-secondary btn-sm"
          >
            {copied ? <Check size={13} color="#1F7C67" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy Post'}</span>
          </button>

          <button
            onClick={onRegenerate}
            className="btn btn-ghost btn-sm"
            title="Regenerate"
          >
            <RotateCw size={13} />
          </button>
        </div>
      </div>

      {/* Structural Breakdown & Live Simulation */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 20,
        alignItems: 'start'
      }}>
        {/* Left Column: Structured Elements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Hook */}
          <div style={{
            background: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: 'var(--brand-primary)',
              marginBottom: 6,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              01 • Engagement Hook
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.5, margin: 0 }}>
              {data.hook}
            </p>
          </div>

          {/* CTA */}
          <div style={{
            background: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: '#1F7C67',
              marginBottom: 6,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              02 • Conversation Driver (CTA)
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
              {data.callToAction}
            </p>
          </div>

          {/* Hashtags */}
          <div style={{
            background: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              color: 'var(--brand-primary)',
              marginBottom: 8,
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}>
              03 • High-Intent Hashtag Index
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {data.hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--brand-primary)',
                    background: '#F3F1FC',
                    border: '1px solid #E9E8F5',
                    padding: '3px 9px',
                    borderRadius: 4
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Realistic Platform Simulation */}
        <div>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            marginBottom: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            Live Distribution Preview
          </div>

          {/* LINKEDIN POST CARD MOCK */}
          {activePlatform === 'linkedin' && (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: 'var(--shadow-resting)'
            }}>
              {/* Profile Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0a66c2 0%, #7C6FE8 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#FFFFFF'
                  }}>
                    BF
                  </div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {data.authorName || 'ByteForce Content Engine'}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      Automated Content Transformation Specialist • 1h • 🌐
                    </div>
                  </div>
                </div>
                <MoreHorizontal size={16} color="var(--text-secondary)" />
              </div>

              {/* Post Content */}
              <div style={{
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
                  {data.hook}
                </div>
                {data.body}
                <div style={{ marginTop: 10, color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                  {data.callToAction}
                </div>
                <div style={{ color: '#0a66c2', marginTop: 10, fontWeight: 600 }}>
                  {data.hashtags.join(' ')}
                </div>
              </div>

              {/* Reaction Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: 12,
                color: 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontWeight: 500
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <ThumbsUp size={15} color="var(--text-secondary)" /> Like
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <MessageSquare size={15} color="var(--text-secondary)" /> Comment
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <Repeat2 size={15} color="var(--text-secondary)" /> Repost
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                  <Send size={15} color="var(--text-secondary)" /> Send
                </span>
              </div>
            </div>
          )}

          {/* X / TWITTER POST CARD MOCK */}
          {activePlatform === 'x' && (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: 'var(--shadow-resting)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: '#1E1E2E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: '#FFFFFF'
                  }}>
                    𝕏
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {data.authorName || 'ByteForce'}
                      </span>
                      <span style={{ color: '#1d9bf0', fontSize: '0.85rem' }}>✓</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        {data.authorHandle || '@byteforce_tech'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      Just now
                    </div>
                  </div>
                </div>
                <MoreHorizontal size={16} color="var(--text-secondary)" />
              </div>

              <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
                {data.hook}
                {'\n\n'}
                {data.body}
                {'\n\n'}
                <span style={{ color: '#1d9bf0', fontWeight: 500 }}>{data.hashtags.join(' ')}</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: 12,
                color: 'var(--text-secondary)',
                fontSize: '0.78rem'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><MessageSquare size={14} /> 24</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Repeat2 size={14} /> 118</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Heart size={14} /> 542</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Bookmark size={14} /> 94</span>
              </div>
            </div>
          )}

          {/* INSTAGRAM POST CARD MOCK */}
          {activePlatform === 'instagram' && (
            <div style={{
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: 'var(--shadow-resting)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    padding: 2
                  }}>
                    <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#bc1888' }}>
                      BF
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      byteforce.app
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                      Transformation Engine • Original Audio
                    </div>
                  </div>
                </div>
                <MoreHorizontal size={16} color="var(--text-secondary)" />
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)', marginRight: 6 }}>byteforce.app</span>
                {data.hook}
                {'\n\n'}
                {data.body}
                {'\n\n'}
                <span style={{ color: 'var(--brand-primary)', fontWeight: 500 }}>{data.hashtags.join(' ')}</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: 12,
                color: 'var(--text-secondary)',
                fontSize: '0.78rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <Heart size={16} color="var(--text-secondary)" />
                  <MessageSquare size={16} color="var(--text-secondary)" />
                  <Send size={16} color="var(--text-secondary)" />
                </div>
                <Bookmark size={16} color="var(--text-secondary)" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
