import React, { useState } from 'react';
import { 
  ArrowRight, 
  FileText, 
  HelpCircle, 
  Layers, 
  Mic, 
  Share2, 
  Presentation,
  Zap, 
  CheckCircle2, 
  Cpu, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface HeroSectionProps {
  onStartTransforming: () => void;
  onExploreDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartTransforming,
  onExploreDemo
}) => {
  const [activeTeaserOutput, setActiveTeaserOutput] = useState<'summary' | 'flashcards' | 'quiz' | 'outline' | 'script' | 'social'>('summary');

  const teaserData = {
    summary: {
      badge: 'SUMMARIZE / EXECUTIVE SYNTHESIS',
      title: 'Executive Summary',
      snippet: 'Key Takeaway: AI in healthcare has progressed to frontline infrastructure. Vision models achieve >94% diagnostic sensitivity in pulmonary and oncology screening, while ambient documentation cuts clinician after-hours paperwork by 45%.',
      meta: '4 Insights • 4 Core Concepts • Actionable'
    },
    flashcards: {
      badge: 'LEARN / ACTIVE RECALL',
      title: 'Interactive Flashcards',
      snippet: 'Q: How does Ambient Clinical Intelligence reduce physician burnout?\nA: By capturing doctor-patient conversations in real-time and autonomously drafting structured SOAP notes, reducing documentation workload by ~45%.',
      meta: 'Card 2 of 5 • 3D Flip • Spaced Repetition'
    },
    quiz: {
      badge: 'ASSESS / DIAGNOSTIC MCQ',
      title: 'Diagnostic Assessment Quiz',
      snippet: 'Q: By approximately what percentage does ambient clinical documentation reduce after-hours clinician paperwork?\n✓ Around 45% (Correct: Verified directly against source research brief)',
      meta: '4 Questions • Instant Rationale • Score 100%'
    },
    outline: {
      badge: 'PRESENT / SLIDE DECK',
      title: 'Presentation Slide Outline',
      snippet: 'Slide 1: Augmented Intelligence Horizon in Medicine\nSlide 2: Medical Imaging & Multimodal Fusion\nSlide 3: Ambient Clinical Intelligence & SOAP Automation\nSlide 4: FDA SaMD Governance & Safeguards',
      meta: '5 Keynote Slides • Talking Points per Slide'
    },
    script: {
      badge: 'PRESENT / SPOKEN KEYNOTE',
      title: 'Executive Speaking Script',
      snippet: '"Good morning colleagues. The goal of healthcare AI is not to replace the clinician. The goal is to give the clinician back to the patient. By automating cognitive overhead, we restore human empathy to care..."',
      meta: '3.0 Min Delivery • 130 WPM Pacing'
    },
    social: {
      badge: 'PUBLISH / THOUGHT LEADERSHIP',
      title: 'LinkedIn Article Post',
      snippet: '"Doctors spend 35%+ of clinic hours typing into EHRs. Here is how clinical AI is cutting administrative burnout by 45% while driving diagnostic sensitivity past 94% across 500+ FDA-cleared SaMD tools:"',
      meta: 'High Retention Hook • CTA • 6 Hashtags'
    }
  };

  return (
    <section style={{
      maxWidth: 1240,
      margin: '0 auto',
      padding: '40px 24px 64px',
      position: 'relative'
    }}>
      {/* Top Badge: Positioning */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <div className="badge badge-cyan animate-fade-in" style={{
          padding: '6px 14px',
          fontSize: '0.78rem',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.3)'
        }}>
          <Sparkles size={13} color="#38bdf8" />
          <span>SIH26154 • GEN AI PLATFORM FOR AUTOMATED CONTENT TRANSFORMATION</span>
        </div>
      </div>

      {/* Main Hero Typography */}
      <div style={{ textAlign: 'center', maxWidth: 880, margin: '0 auto 32px' }}>
        <div style={{
          fontSize: '1rem',
          fontWeight: 800,
          color: 'var(--brand-cyan)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          marginBottom: 8
        }}>
          BYTEFORCE
        </div>

        <h1 style={{
          fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1.1,
          marginBottom: 16,
          letterSpacing: '-0.035em'
        }}>
          Transform Once.{' '}
          <span className="text-gradient-cyan">Create Everywhere.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: 680,
          margin: '0 auto'
        }}>
          Turn one source into purpose-specific content without repeatedly rewriting prompts.
        </p>

        {/* Hero CTAs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          marginTop: 28,
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onStartTransforming}
            className="btn btn-accent-glow btn-lg"
            style={{ padding: '14px 28px', fontSize: '1rem' }}
          >
            <span>TRANSFORM MY CONTENT</span>
            <ArrowRight size={18} />
          </button>
          <button
            onClick={onExploreDemo}
            className="btn btn-secondary btn-lg"
            style={{
              padding: '14px 24px',
              fontSize: '1rem',
              background: 'rgba(255, 255, 255, 0.04)'
            }}
          >
            <Zap size={18} color="#38bdf8" />
            <span>TRY DEMO</span>
          </button>
        </div>
      </div>

      {/* SIGNATURE VISUAL MOTIF: ONE SOURCE → BYTEFORCE → 5 PURPOSES → MULTIPLE OUTPUTS */}
      <div className="glass-panel" style={{
        marginTop: 40,
        padding: '28px',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        boxShadow: '0 20px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px -10px rgba(56, 189, 248, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Header line for signature visual */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 14,
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 10px #10b981'
            }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
              CORE ENGINE: ONE SOURCE → BYTEFORCE → LEARN | ASSESS | PRESENT | PUBLISH | SUMMARIZE → MULTIPLE OUTPUTS
            </span>
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--brand-cyan)', fontWeight: 600 }}>
            Orchestration, not Chat
          </div>
        </div>

        {/* 3-Part Pipeline Visual Flow */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 1fr) auto minmax(280px, 1.4fr)',
          gap: 20,
          alignItems: 'center'
        }}>
          {/* Node 1: Source Document */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '18px',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <FileText size={17} color="#38bdf8" />
              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--brand-cyan)' }}>
                ONE SOURCE DOCUMENT
              </span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.925rem', marginBottom: 4, color: '#ffffff' }}>
              AI in Healthcare — Research Brief.pdf
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', marginBottom: 10 }}>
              1,180 Words • 5 Sections • Diagnostic Precision & Workflows
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span className="badge badge-muted" style={{ fontSize: '0.625rem' }}>Multimodal Fusion</span>
              <span className="badge badge-muted" style={{ fontSize: '0.625rem' }}>Ambient Scribing</span>
              <span className="badge badge-muted" style={{ fontSize: '0.625rem' }}>FDA SaMD</span>
            </div>
          </div>

          {/* Central Connecting Node: ByteForce Engine */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: '0 8px'
          }}>
            <div className="animate-pulse-glow" style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.5)'
            }}>
              <Cpu size={26} color="#ffffff" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 800, letterSpacing: '0.05em' }}>
                BYTEFORCE
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                Transformation Engine
              </div>
            </div>
          </div>

          {/* Node 3: Purpose-driven Outputs Selector & Live Teaser */}
          <div style={{
            background: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '18px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10
            }}>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--brand-indigo)' }}>
                PURPOSE-BUILT READY ASSETS
              </span>
              <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                Click to preview output
              </span>
            </div>

            {/* Purpose switch tabs */}
            <div style={{
              display: 'flex',
              gap: 5,
              marginBottom: 12,
              overflowX: 'auto',
              paddingBottom: 4
            }}>
              {[
                { id: 'summary', label: 'Summary', icon: FileText },
                { id: 'flashcards', label: 'Flashcards', icon: Layers },
                { id: 'quiz', label: 'Quiz', icon: HelpCircle },
                { id: 'outline', label: 'Slide Deck', icon: Presentation },
                { id: 'script', label: 'Script', icon: Mic },
                { id: 'social', label: 'Social', icon: Share2 }
              ].map(item => {
                const Icon = item.icon;
                const active = activeTeaserOutput === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTeaserOutput(item.id as any)}
                    style={{
                      background: active ? 'var(--brand-cyan-glow)' : 'rgba(255, 255, 255, 0.04)',
                      color: active ? 'var(--brand-cyan)' : 'var(--text-muted)',
                      border: active ? '1px solid var(--brand-cyan)' : '1px solid var(--border-subtle)',
                      borderRadius: 6,
                      padding: '4px 8px',
                      fontSize: '0.725rem',
                      fontWeight: active ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={12} />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Live Teaser Content Box */}
            <div style={{
              background: 'var(--bg-canvas)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px',
              border: '1px solid var(--border-subtle)',
              minHeight: 105
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 6
              }}>
                <span style={{ fontSize: '0.675rem', fontWeight: 700, color: 'var(--brand-cyan)' }}>
                  {teaserData[activeTeaserOutput].badge}
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {teaserData[activeTeaserOutput].meta}
                </span>
              </div>
              <p style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
                whiteSpace: 'pre-line'
              }}>
                {teaserData[activeTeaserOutput].snippet}
              </p>
            </div>
          </div>
        </div>

        {/* Value Prop Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
          marginTop: 24,
          paddingTop: 18,
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>Decoupled from Prompts</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Select intended outcomes instead of crafting prompt templates.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>Multi-Purpose Generation</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Create Summary, Quiz, Flashcards & Script simultaneously.
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <ShieldCheck size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '0.825rem', fontWeight: 600 }}>Zero-Failure Architecture</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Deterministic fallback engine ensures live pitch demo reliability.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
