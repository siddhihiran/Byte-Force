import React, { useState } from 'react';
import { 
  X, 
  Zap, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  Sliders, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';

interface GuidedDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchFullDemo: () => void;
}

export const GuidedDemoModal: React.FC<GuidedDemoModalProps> = ({
  isOpen,
  onClose,
  onLaunchFullDemo
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      badge: 'STEP 1 OF 6 • SOURCE INGESTION',
      title: 'ONE SOURCE: No Prompt Engineering Required',
      icon: FileText,
      color: '#7C6FE8',
      summary: 'Users provide one authoritative document instead of repeatedly pasting snippets into chat prompt boxes.',
      details: [
        'Document: "Introduction to Renewable Energy: Grid Parity, Intermittency & Storage.pdf"',
        'Extracts clean text, calculates real word count (1,240 words) and reading time.',
        'Supports PDF, DOCX, TXT, and raw pasted content directly in the browser.'
      ]
    },
    {
      badge: 'STEP 2 OF 6 • CONTENT INTELLIGENCE',
      title: 'UNDERSTAND: Automated Structural Extraction',
      icon: Cpu,
      color: '#1F7C67',
      summary: 'ByteForce analyzes the semantic architecture of the source before running generative models.',
      details: [
        'Detected Topics: Levelized Cost of Energy (LCOE), Intermittency, Duck Curve, Storage Hierarchy.',
        'Extracted Technical Entities: Lazard Capital, BloombergNEF, Lithium-LFP, UHVDC Transmission.',
        'Ensures that downstream transformations remain anchored to factual source realities.'
      ]
    },
    {
      badge: 'STEP 3 OF 6 • PURPOSE & INTENT',
      title: 'CHOOSE PURPOSE: What do you want to create?',
      icon: Sliders,
      color: '#B27B1A',
      summary: 'Replace prompt writing with intended outcomes organized across 5 purpose modes.',
      details: [
        'Modes: Summarize, Learn, Assess, Present, and Publish.',
        'Select multiple purposes simultaneously: Summary + Flashcards + Quiz + Keynote Script.',
        'Context-aware parameter tuning dynamically reveals options per selected purpose.'
      ]
    },
    {
      badge: 'STEP 4 OF 6 • TRANSFORMATION ENGINE',
      title: 'TRANSFORM: 7-Stage Orchestration Pipeline',
      icon: Zap,
      color: '#7C6FE8',
      summary: 'Structured pipeline replaces generic loading spinners with explicit architecture.',
      details: [
        '01 Ingest → 02 Understand → 03 Intent → 04 Transform → 05 Validate → 06 Format → 07 Deliver.',
        'Reliability Architecture: Deterministic Demo Provider guarantees 100% fail-proof execution for pitch defense.',
        'Optional Live API Mode connects directly to client-side Gemini or OpenAI keys.'
      ]
    },
    {
      badge: 'STEP 5 OF 6 • QUALITY SIGNALS',
      title: 'VALIDATE: Structural & Factual Verification',
      icon: ShieldCheck,
      color: '#1F7C67',
      summary: 'Outputs undergo real heuristic checks rather than fabricated AI confidence scores.',
      details: [
        'Structure Validated: Verified presence of overview, key insights, concepts, and takeaways.',
        'Source Relevance: Terminology and question answers match original source statements.',
        'Format Compliance: Ready-to-edit outputs formatted with typography tokens.'
      ]
    },
    {
      badge: 'STEP 6 OF 6 • ASSET WORKSPACE',
      title: 'MULTIPLE OUTPUTS: One Source → Ready-to-Use Assets',
      icon: Layers,
      color: '#7C6FE8',
      summary: 'Deliver interactive, editable assets in a unified tabbed and grid comparison workspace.',
      details: [
        'Interactive 3D Flashcards with card flipping and mastery tracking.',
        'Playable Diagnostic Quiz with instant rationale and score reports.',
        'Keynote Speaking Script with ~130 wpm pacing and Fullscreen Teleprompter.',
        'Slide-by-slide Presentation Outline with speaker talking points.'
      ]
    }
  ];

  const active = steps[currentStep];
  const IconComponent = active.icon;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onLaunchFullDemo();
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 640,
          padding: '28px',
          background: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px',
          boxShadow: '0 20px 48px rgba(30, 30, 46, 0.12)'
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 16,
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #7C6FE8 0%, #6FD6C0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(124, 111, 232, 0.25)'
            }}>
              <Zap size={18} color="#FFFFFF" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', margin: 0 }}>
                Architecture Walkthrough
              </h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                SIH26154: Content Transformation Operating Layer
              </div>
            </div>
          </div>

          <button onClick={onClose} className="btn btn-ghost btn-sm" style={{ padding: 6 }}>
            <X size={18} />
          </button>
        </div>

        {/* Step Progress Pills */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
          {steps.map((_s, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentStep(idx)}
              style={{
                flex: 1,
                height: 5,
                borderRadius: 3,
                background: idx === currentStep 
                  ? active.color 
                  : idx < currentStep 
                  ? 'var(--brand-primary)' 
                  : 'var(--border-subtle)',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
            />
          ))}
        </div>

        {/* Step Content Card */}
        <div style={{
          background: 'var(--bg-canvas)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.725rem', fontWeight: 700, color: active.color, letterSpacing: '0.04em' }}>
              {active.badge}
            </span>
            <div style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: active.color,
              boxShadow: 'var(--shadow-resting)'
            }}>
              <IconComponent size={18} />
            </div>
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.35, letterSpacing: '-0.01em', margin: 0 }}>
            {active.title}
          </h3>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            {active.summary}
          </p>

          <div style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-sm)',
            padding: '16px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            boxShadow: 'var(--shadow-resting)'
          }}>
            {active.details.map((detail, dIdx) => (
              <div key={dIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '0.825rem', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                <CheckCircle2 size={15} color={active.color} style={{ marginTop: 2, flexShrink: 0 }} />
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 18,
          marginTop: 20
        }}>
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="btn btn-secondary btn-sm"
          >
            <ArrowLeft size={14} />
            <span>Previous</span>
          </button>

          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Step {currentStep + 1} of {steps.length}
          </span>

          <button
            onClick={handleNext}
            className="btn btn-primary btn-sm"
            style={{
              background: currentStep === steps.length - 1 
                ? 'linear-gradient(135deg, #7C6FE8 0%, #6FD6C0 100%)' 
                : undefined,
              boxShadow: currentStep === steps.length - 1 ? '0 2px 8px rgba(124, 111, 232, 0.25)' : undefined
            }}
          >
            <span>{currentStep === steps.length - 1 ? 'Execute Transformation Now →' : 'Next Step'}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
