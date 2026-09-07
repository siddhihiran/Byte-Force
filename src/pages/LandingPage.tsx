import React from 'react';
import { 
  ArrowRight, 
  Zap, 
  Layers, 
  FileText, 
  Presentation, 
  HelpCircle, 
  UploadCloud, 
  Sliders, 
  CheckCircle2
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onTryDemo
}) => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 64, padding: '24px 0 48px' }}>
      {/* 1. HERO SECTION */}
      <section style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, paddingTop: 24 }}>
        {/* Soft Pill Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 16px',
          borderRadius: 'var(--radius-full)',
          background: '#F3F1FC',
          border: '1px solid #E9E8F5',
          boxShadow: 'var(--shadow-resting)'
        }}>
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: 'var(--brand-primary)'
          }} />
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: 'var(--brand-primary)'
          }}>
            SIH26154 • AUTOMATED GEN AI CONTENT TRANSFORMATION
          </span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: '-0.035em',
          color: 'var(--text-primary)',
          maxWidth: 900,
          margin: 0
        }}>
          Turn any document into <span style={{ color: 'var(--brand-primary)' }}>Summaries, PPTs, Quizzes & Study Cards</span> — instantly
        </h1>

        {/* Subheadline */}
        <p style={{
          fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: 720,
          margin: 0
        }}>
          Stop copy-pasting into chat prompts. ByteForce ingests your reports, notes, or research once and autonomously architects ready-to-use executive briefs, study decks, quizzes, and scripts in seconds.
        </p>

        {/* Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
          <button
            onClick={onGetStarted}
            className="btn btn-primary btn-lg"
            style={{ padding: '16px 36px', fontSize: '1rem', borderRadius: 12 }}
          >
            <span>Get Started Free</span>
            <ArrowRight size={18} />
          </button>

          <button
            onClick={onTryDemo}
            className="btn btn-secondary btn-lg"
            style={{ padding: '16px 28px', fontSize: '1rem', borderRadius: 12 }}
          >
            <Zap size={16} color="var(--brand-primary)" />
            <span>Try 1-Click Demo</span>
          </button>
        </div>

        {/* Social Proof Tags */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginTop: 12 }}>
          <span className="badge" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', padding: '5px 12px' }}>
            ✓ No Prompt Engineering Needed
          </span>
          <span className="badge" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', padding: '5px 12px' }}>
            ✓ 6 Purpose Modes in 1 Pass
          </span>
          <span className="badge" style={{ background: '#FFFFFF', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)', padding: '5px 12px' }}>
            ✓ Verifiable Grounding Heuristics
          </span>
        </div>
      </section>

      {/* 2. FEATURE CARDS */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            CAPABILITIES
          </span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginTop: 4 }}>
            Engineered for Modern Content Operations
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 20
        }}>
          {/* Feature 1 */}
          <div className="bf-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: 'rgba(124, 111, 232, 0.1)',
              border: '1px solid rgba(124, 111, 232, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-primary)'
            }}>
              <Layers size={22} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Multi-Format Output
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
              Transform one source into summaries, quizzes, flashcards, presentation decks, speaking scripts, and social articles in parallel.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bf-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: 'rgba(111, 214, 192, 0.2)',
              border: '1px solid rgba(111, 214, 192, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1F7C67'
            }}>
              <FileText size={22} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              AI-Powered Sectioning
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
              Deep structural parsing extracts topics, key concepts, technical terms, and semantic outlines before generation begins.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bf-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: 'rgba(245, 199, 126, 0.2)',
              border: '1px solid rgba(245, 199, 126, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#B27B1A'
            }}>
              <Presentation size={22} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Instant PPT Scripts
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
              Generate complete keynote speaking scripts timed to ~130 WPM with speaker talking points and fullscreen teleprompter studio.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bf-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: 'rgba(124, 111, 232, 0.1)',
              border: '1px solid rgba(124, 111, 232, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-primary)'
            }}>
              <HelpCircle size={22} />
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Adaptive Quizzes
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
              Diagnostic multiple-choice assessments with immediate rationale explanations, verifiable grounding, and instant score reports.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS 3-STEP VISUAL */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            WORKFLOW
          </span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', marginTop: 4 }}>
            How ByteForce Works in 3 Simple Steps
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          position: 'relative'
        }}>
          {/* Step 1 */}
          <div className="bf-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 14, background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                background: '#F3F1FC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-primary)'
              }}>
                <UploadCloud size={20} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', background: '#F3F1FC', padding: '3px 10px', borderRadius: 99 }}>
                STEP 01
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Upload Source Content
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Drop in your research PDF, meeting notes, curriculum document, or raw pasted notes. Content intelligence immediately calculates word count, reading time, and structural hierarchy.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bf-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 14, background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                background: '#F3F1FC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--brand-primary)'
              }}>
                <Sliders size={20} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-primary)', background: '#F3F1FC', padding: '3px 10px', borderRadius: 99 }}>
                STEP 02
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Choose Target Purpose
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Select what you want to create: Executive Summaries, Study Cards, Diagnostic Quizzes, Keynote Scripts, or Social Posts. Tune audience, tone, and depth with simple segmented pills.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bf-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: 14, background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                background: '#EBFBF7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1F7C67'
              }}>
                <CheckCircle2 size={20} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1F7C67', background: '#EBFBF7', padding: '3px 10px', borderRadius: 99 }}>
                STEP 03
              </span>
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Get Verified Output
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Review your transformed assets in an interactive unified workspace. Flip study cards, run quizzes, practice speaking scripts, and export formatted bundles with 1 click.
            </p>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM CTA BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, rgba(124, 111, 232, 0.08) 0%, rgba(111, 214, 192, 0.08) 100%)',
        border: '1px solid #E9E8F5',
        borderRadius: 'var(--radius-lg)',
        padding: '40px 32px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16
      }}>
        <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
          Ready to transform your first document?
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: 540, margin: 0 }}>
          Experience the automated Gen AI transformation platform built for rapid evaluation and production workflows.
        </p>
        <button
          onClick={onGetStarted}
          className="btn btn-primary btn-lg"
          style={{ padding: '14px 32px', marginTop: 8 }}
        >
          <span>Launch New Document Workflow</span>
          <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
};
