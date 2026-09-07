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
  ShieldCheck,
  Clock
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
      snippet: 'Q: By approximately what percentage does ambient clinical documentation reduce after-hours clinician paperwork?\n✓ Around 45% (Verified directly against source research brief)',
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
      padding: '40px 20px 80px',
      position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          boxShadow: '0 0 20px rgba(56, 189, 248, 0.1)'
        }} className="animate-fade-in">
          <div style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--brand-cyan)',
            boxShadow: '0 0 8px var(--brand-cyan)'
          }} />
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'var(--brand-cyan)'
          }}>
            SIH26154 • GEN AI PLATFORM FOR AUTOMATED CONTENT TRANSFORMATION
          </span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.25fr 0.75fr',
        gap: 24,
        alignItems: 'center',
        margin: '0 auto 32px',
        maxWidth: 1200
      }}>
        <div>
          <div className="impact-badge" style={{ marginBottom: 20 }}>
            <Sparkles size={14} />
            Built for hackathon judging, research teams, and rapid content operations
          </div>

          <h1 style={{
            fontSize: 'clamp(2.75rem, 5vw, 4.8rem)',
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.05em',
            marginBottom: 18
          }}>
            Turn one source into a full content engine.
          </h1>

          <p style={{
            fontSize: 'clamp(1.06rem, 1.8vw, 1.28rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 680,
            marginBottom: 28
          }}>
            ByteForce transforms research, notes, and reports into executive summaries, flashcards, quizzes, presentation outlines, scripts, and social content in a single workflow.
          </p>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            flexWrap: 'wrap',
            marginBottom: 22
          }}>
            <button
              onClick={onStartTransforming}
              className="btn btn-accent-glow btn-lg"
              style={{ padding: '14px 28px' }}
            >
              <span>TRANSFORM MY CONTENT</span>
              <ArrowRight size={17} />
            </button>

            <button
              onClick={onExploreDemo}
              className="btn btn-secondary btn-lg"
              style={{ padding: '14px 24px' }}
            >
              <Zap size={16} color="var(--brand-cyan)" />
              <span>TRY DEMO</span>
            </button>
          </div>

          <div className="tag-row">
            <span>Research-to-output</span>
            <span>Multi-format content</span>
            <span>Judge-friendly demo</span>
          </div>
        </div>

        <div className="glass-panel state-panel">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 14,
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: 18
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
              PRODUCT SNAPSHOT
            </div>
            <span className="badge badge-emerald" style={{ fontSize: '0.6rem' }}>LIVE</span>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            <div className="mini-stat-card">
              <div className="mini-stat-label"><FileText size={12} /> Source intake</div>
              <strong>1 document</strong>
              <span>PDF, TXT, DOCX, pasted notes</span>
            </div>
            <div className="mini-stat-card">
              <div className="mini-stat-label"><Layers size={12} /> Purpose engine</div>
              <strong>6 output modes</strong>
              <span>Summary, quiz, script, cards, outline, social</span>
            </div>
            <div className="mini-stat-card accent">
              <div className="mini-stat-label"><Clock size={12} /> Active workflow</div>
              <strong>2-minute turnaround</strong>
              <span>Fast enough for demos and live judging</span>
            </div>
          </div>
        </div>
      </div>

      <div className="metrics-strip" style={{ marginBottom: 28 }}>
        <div className="metric-card">
          <strong>6x</strong>
          <span>content formats from one source</span>
        </div>
        <div className="metric-card">
          <strong>90%</strong>
          <span>faster ideation for content teams</span>
        </div>
        <div className="metric-card">
          <strong>7-stage</strong>
          <span>internal transformation engine</span>
        </div>
        <div className="metric-card">
          <strong>SIH-ready</strong>
          <span>clear evaluator story and product demo</span>
        </div>
      </div>

      <div className="glass-panel" style={{
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '24px',
        boxShadow: 'var(--shadow-lg), 0 0 50px -10px rgba(56, 189, 248, 0.12)',
        borderRadius: 'var(--radius-xl)'
      }}>
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
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
              ORCHESTRATION PIPELINE: ONE SOURCE → UNDERSTAND → CHOOSE PURPOSE → MULTIPLE ASSETS
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
              Deterministic Fallback Ready
            </span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 1fr) auto minmax(320px, 1.45fr)',
          gap: 20,
          alignItems: 'center'
        }}>
          <div className="bf-card" style={{ padding: '20px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: 'var(--brand-cyan-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={15} color="var(--brand-cyan)" />
                </div>
                <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--brand-cyan)', letterSpacing: '0.04em' }}>
                  SOURCE DOCUMENT
                </span>
              </div>
              <span className="badge badge-emerald" style={{ fontSize: '0.625rem' }}>READY ✓</span>
            </div>

            <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#ffffff', marginBottom: 6 }}>
              AI in Healthcare — Research Brief.pdf
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span>1,180 Words</span>
              <span>•</span>
              <span>5 Sections</span>
              <span>•</span>
              <span>Clinical AI & Diagnostics</span>
            </div>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span className="badge badge-muted" style={{ fontSize: '0.65rem' }}>Multimodal Fusion</span>
              <span className="badge badge-muted" style={{ fontSize: '0.65rem' }}>Ambient Scribing</span>
              <span className="badge badge-muted" style={{ fontSize: '0.65rem' }}>FDA SaMD</span>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            padding: '0 8px'
          }}>
            <div style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(56, 189, 248, 0.45)',
              border: '2px solid rgba(255, 255, 255, 0.3)'
            }} className="animate-pulse-glow">
              <Cpu size={24} color="#ffffff" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 800, color: '#ffffff' }}>BYTEFORCE</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>7-Stage Engine</div>
            </div>
          </div>

          <div className="bf-card" style={{ padding: '20px', background: 'var(--bg-surface-elevated)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#a5b4fc', letterSpacing: '0.04em' }}>
                PURPOSE-BUILT ASSETS (LIVE PREVIEW)
              </span>
              <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                Click tab to switch output
              </span>
            </div>

            <div style={{
              display: 'flex',
              gap: 4,
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
                      padding: '5px 9px',
                      fontSize: '0.75rem',
                      fontWeight: active ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 5,
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

            <div style={{
              background: 'var(--bg-canvas)',
              borderRadius: 'var(--radius-sm)',
              padding: '14px',
              border: '1px solid var(--border-subtle)',
              minHeight: 110
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--brand-cyan)' }}>
                  {teaserData[activeTeaserOutput].badge}
                </span>
                <span style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
                  {teaserData[activeTeaserOutput].meta}
                </span>
              </div>
              <p style={{
                fontSize: '0.825rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                whiteSpace: 'pre-line'
              }}>
                {teaserData[activeTeaserOutput].snippet}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 16,
          marginTop: 24,
          paddingTop: 20,
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Prompt-Free Transformation</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Choose intent-based outcomes rather than wrestling with prompt templates.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Multi-Asset Generation</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Produce summaries, flashcards, diagnostic quizzes, and keynote scripts in one pass.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <ShieldCheck size={16} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Verifiable Grounding</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Truthful structural validation tests completeness without fake AI scores.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
