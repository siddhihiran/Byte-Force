import React, { useState } from 'react';
import { 
  Share2, 
  Copy, 
  Check, 
  Download, 
  ThumbsUp, 
  MessageSquare, 
  Repeat2, 
  Send, 
  Heart, 
  Bookmark, 
  Sparkles, 
  RotateCw 
} from 'lucide-react';
import { OutputAsset, SocialData } from '../../types';
import { ValidationBadge } from './ValidationBadge';

interface SocialPreviewProps {
  asset: OutputAsset;
  onRegenerate: () => void;
}

export const SocialPreview: React.FC<SocialPreviewProps> = ({ asset, onRegenerate }) => {
  const socialData = (asset.payload as { type: 'social'; data: SocialData }).data;
  const [data, setData] = useState<SocialData>(socialData);
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
            <span className="badge badge-emerald">
              PUBLISH • {activePlatform.toUpperCase()}
            </span>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              Optimized for high-retention distribution
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
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
                style={{ fontSize: '0.75rem', padding: '4px 10px', textTransform: 'capitalize' }}
              >
                {plt === 'x' ? 'X / Twitter' : plt}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="btn btn-secondary btn-sm"
          >
            {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
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

      <ValidationBadge signals={asset.validationSignals} />

      {/* Structural Breakdown (Hook, Body, CTA, Hashtags) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16
      }}>
        {/* Left Column: Structured Elements */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Hook */}
          <div style={{
            background: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--brand-cyan)', marginBottom: 4 }}>
              01 • ENGAGEMENT HOOK
            </div>
            <p style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 600, lineHeight: 1.4 }}>
              {data.hook}
            </p>
          </div>

          {/* CTA */}
          <div style={{
            background: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981', marginBottom: 4 }}>
              02 • CONVERSATION DRIVER (CTA)
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {data.callToAction}
            </p>
          </div>

          {/* Hashtags */}
          <div style={{
            background: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px'
          }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#818cf8', marginBottom: 6 }}>
              03 • HASHTAG INDEX
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {data.hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--brand-cyan)',
                    background: 'rgba(56, 189, 248, 0.08)',
                    padding: '2px 8px',
                    borderRadius: 4
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: REALISTIC LIVE PLATFORM MOCK (Required by Spec #22) */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8 }}>
            LIVE PLATFORM SIMULATION
          </div>

          {/* LINKEDIN POST CARD MOCK */}
          {activePlatform === 'linkedin' && (
            <div style={{
              background: '#0d131f',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}>
              {/* Profile Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0284c7 0%, #38bdf8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  color: '#ffffff'
                }}>
                  BF
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                    {data.authorName || 'ByteForce Content Engine'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Automated Content Transformation Specialist • 1h • 🌐
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap'
              }}>
                <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: 8 }}>
                  {data.hook}
                </div>
                {data.body}
                <div style={{ marginTop: 8, fontStyle: 'italic' }}>
                  {data.callToAction}
                </div>
                <div style={{ color: 'var(--brand-cyan)', marginTop: 8 }}>
                  {data.hashtags.join(' ')}
                </div>
              </div>

              {/* Reaction Bar */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: 10,
                color: 'var(--text-muted)',
                fontSize: '0.75rem'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
                  <ThumbsUp size={14} /> Like
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
                  <MessageSquare size={14} /> Comment
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
                  <Repeat2 size={14} /> Repost
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer' }}>
                  <Send size={14} /> Send
                </span>
              </div>
            </div>
          )}

          {/* X / TWITTER POST CARD MOCK */}
          {activePlatform === 'x' && (
            <div style={{
              background: '#07090d',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1d9bf0 0%, #000000 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '0.85rem'
                }}>
                  𝕏
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                      {data.authorName || 'ByteForce'}
                    </span>
                    <span style={{ color: '#1d9bf0', fontSize: '0.8rem' }}>☑</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {data.authorHandle || '@byteforce_tech'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    Just now
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.875rem', color: '#f8fafc', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                {data.hook}
                {'\n\n'}
                {data.body}
                {'\n\n'}
                <span style={{ color: '#1d9bf0' }}>{data.hashtags.join(' ')}</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: 10,
                color: 'var(--text-muted)',
                fontSize: '0.75rem'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MessageSquare size={13} /> 24</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Repeat2 size={13} /> 118</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Heart size={13} /> 542</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Bookmark size={13} /> 94</span>
              </div>
            </div>
          )}

          {/* INSTAGRAM POST CARD MOCK */}
          {activePlatform === 'instagram' && (
            <div style={{
              background: '#0e1117',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  padding: 2
                }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem' }}>
                    BF
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                    byteforce.app
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Original Audio
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                <span style={{ fontWeight: 700, color: '#fff', marginRight: 6 }}>byteforce.app</span>
                {data.hook}
                {'\n\n'}
                {data.body}
                {'\n\n'}
                <span style={{ color: 'var(--brand-cyan)' }}>{data.hashtags.join(' ')}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
