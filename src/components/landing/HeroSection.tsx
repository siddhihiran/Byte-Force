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
          background: '#F3F1FC',
          border: '1px solid #E9E8F5',
          boxShadow: 'var(--shadow-resting)'
        }} className="animate-fade-in">
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--brand-primary)'
          }} />
          <span style={{
            fontSize: '0.725rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'var(--brand-primary)'
          }}>
            SIH26154 • GEN AI PLATFORM FOR AUTOMATED CONTENT TRANSFORMATION
          </span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.25fr 0.75fr',
        gap: 28,
        alignItems: 'center',
        margin: '0 auto 36px',
        maxWidth: 1200
      }}>
        <div>
          <div className="badge" style={{
            marginBottom: 18,
            background: '#EBFBF7',
            color: '#1F7C67',
            border: '1px solid #BFEFDE',
            padding: '6px 12px',
            fontSize: '0.75rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6
          }}>
            <Sparkles size={14} color="#1F7C67" />
            Built for hackathon judging, research teams, and rapid content operations
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            color: 'var(--text-primary)',
            marginBottom: 18
          }}>
            Turn one source into a full content engine.
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: 640,
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
              className="btn btn-primary btn-lg"
              style={{ padding: '14px 28px', fontSize: '0.95rem' }}
            >
              <span>TRANSFORM MY CONTENT</span>
              <ArrowRight size={17} />
            </button>

            <button
              onClick={onExploreDemo}
              className="btn btn-secondary btn-lg"
              style={{ padding: '14px 24px', fontSize: '0.95rem' }}
            >
              <Zap size={16} color="var(--brand-primary)" />
              <span>TRY DEMO</span>
            </button>
          </div>

          <div className="tag-row" style={{ display: 'flex', gap: 8 }}>
            <span className="badge" style={{ background: '#F3F1FC', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>Research-to-output</span>
            <span className="badge" style={{ background: '#F3F1FC', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>Multi-format content</span>
            <span className="badge" style={{ background: '#F3F1FC', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>Judge-friendly demo</span>
          </div>
        </div>

        <div className="bf-card" style={{ padding: '24px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 14,
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: 18
          }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              PRODUCT SNAPSHOT
            </div>
            <span className="badge" style={{
              fontSize: '0.625rem',
              background: '#EBFBF7',
              color: '#1F7C67',
              border: '1px solid #BFEFDE',
              fontWeight: 700
            }}>
              LIVE
            </span>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{
              background: '#FAFAFB',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <FileText size={12} color="var(--brand-primary)" /> Source intake
              </div>
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>1 document</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>PDF, TXT, DOCX, pasted notes</span>
            </div>

            <div style={{
              background: '#FAFAFB',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Layers size={12} color="var(--brand-primary)" /> Purpose engine
              </div>
              <strong style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>6 output modes</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Summary, quiz, script, cards, outline, social</span>
            </div>

            <div style={{
              background: '#F3F1FC',
              border: '1px solid #E9E8F5',
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--brand-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Clock size={12} /> Active workflow
              </div>
              <strong style={{ fontSize: '0.95rem', color: 'var(--brand-primary)' }}>2-minute turnaround</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Fast enough for demos and live judging</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 14,
        marginBottom: 32
      }}>
        <div className="bf-card" style={{ padding: '16px 20px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
          <strong style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-primary)', display: 'block', marginBottom: 2 }}>6x</strong>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>content formats from one source</span>
        </div>
        <div className="bf-card" style={{ padding: '16px 20px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
          <strong style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1F7C67', display: 'block', marginBottom: 2 }}>90%</strong>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>faster ideation for content teams</span>
        </div>
        <div className="bf-card" style={{ padding: '16px 20px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
          <strong style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--brand-primary)', display: 'block', marginBottom: 2 }}>7-stage</strong>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>internal transformation engine</span>
        </div>
        <div className="bf-card" style={{ padding: '16px 20px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
          <strong style={{ fontSize: '1.4rem', fontWeight: 800, color: '#B27B1A', display: 'block', marginBottom: 2 }}>SIH-ready</strong>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>clear evaluator story and product demo</span>
        </div>
      </div>

      <div className="bf-card" style={{
        border: '1px solid var(--border-subtle)',
        padding: '24px',
        background: '#FFFFFF',
        boxShadow: 'var(--shadow-resting)',
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
              background: '#1F7C67',
              boxShadow: '0 0 8px rgba(111, 214, 192, 0.6)'
            }} />
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
              ORCHESTRATION PIPELINE: ONE SOURCE → UNDERSTAND → CHOOSE PURPOSE → MULTIPLE ASSETS
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge" style={{
              fontSize: '0.65rem',
              background: '#EBFBF7',
              color: '#1F7C67',
              border: '1px solid #BFEFDE',
              fontWeight: 700
            }}>
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
          <div className="bf-card" style={{ padding: '20px', background: '#FAFAFB', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: '#F3F1FC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={15} color="var(--brand-primary)" />
                </div>
                <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--brand-primary)', letterSpacing: '0.04em' }}>
                  SOURCE DOCUMENT
                </span>
              </div>
              <span className="badge" style={{
                fontSize: '0.625rem',
                background: '#EBFBF7',
                color: '#1F7C67',
                border: '1px solid #BFEFDE',
                fontWeight: 700
              }}>
                READY ✓
              </span>
            </div>

            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: 6 }}>
              AI in Healthcare — Research Brief.pdf
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span>1,180 Words</span>
              <span>•</span>
              <span>5 Sections</span>
              <span>•</span>
              <span>Clinical AI & Diagnostics</span>
            </div>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              <span className="badge" style={{ fontSize: '0.65rem', background: '#F3F1FC', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>Multimodal Fusion</span>
              <span className="badge" style={{ fontSize: '0.65rem', background: '#F3F1FC', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>Ambient Scribing</span>
              <span className="badge" style={{ fontSize: '0.65rem', background: '#F3F1FC', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>FDA SaMD</span>
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
              background: 'linear-gradient(135deg, #7C6FE8 0%, #6FD6C0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(124, 111, 232, 0.3)',
              border: '2px solid #FFFFFF'
            }}>
              <Cpu size={24} color="#FFFFFF" />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-primary)' }}>BYTEFORCE</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>7-Stage Engine</div>
            </div>
          </div>

          <div className="bf-card" style={{ padding: '20px', background: '#FFFFFF', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--brand-primary)', letterSpacing: '0.04em' }}>
                PURPOSE-BUILT ASSETS (LIVE PREVIEW)
              </span>
              <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>
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
                      background: active ? 'var(--brand-primary)' : '#FAFAFB',
                      color: active ? '#FFFFFF' : 'var(--text-secondary)',
                      border: active ? '1px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
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
              background: '#FAFAFB',
              borderRadius: 'var(--radius-sm)',
              padding: '14px',
              border: '1px solid var(--border-subtle)',
              minHeight: 110
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
                  {teaserData[activeTeaserOutput].badge}
                </span>
                <span style={{ fontSize: '0.675rem', color: 'var(--text-secondary)' }}>
                  {teaserData[activeTeaserOutput].meta}
                </span>
              </div>
              <p style={{
                fontSize: '0.825rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
                whiteSpace: 'pre-line',
                margin: 0
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
            <CheckCircle2 size={16} color="#1F7C67" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Prompt-Free Transformation</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Choose intent-based outcomes rather than wrestling with prompt templates.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <CheckCircle2 size={16} color="#1F7C67" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Multi-Asset Generation</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Produce summaries, flashcards, diagnostic quizzes, and keynote scripts in one pass.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <ShieldCheck size={16} color="#1F7C67" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>Verifiable Grounding</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Truthful structural validation tests completeness without fake AI scores.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
