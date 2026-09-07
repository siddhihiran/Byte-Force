import React from 'react';
import { 
  CheckCircle2, 
  FileText, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  Layers
} from 'lucide-react';
import { PipelineStage } from '../types';

interface ProcessingPageProps {
  currentStage: PipelineStage;
  currentStageIndex: number;
  sourceTitle: string;
  wordCount: number;
  purposesCount: number;
  selectedPurposesLabel?: string;
}

export const ProcessingPage: React.FC<ProcessingPageProps> = ({
  currentStageIndex,
  sourceTitle,
  wordCount,
  purposesCount,
  selectedPurposesLabel = 'Multi-format Assets'
}) => {
  // 4 Sequential Status Steps matching user specification
  const steps = [
    {
      id: 'read',
      label: 'Reading document & extracting clean text...',
      detail: `${wordCount} words ingested from source`,
      icon: FileText
    },
    {
      id: 'extract',
      label: 'Extracting sections & semantic hierarchy...',
      detail: 'Detecting topics, core entities & technical terms',
      icon: Cpu
    },
    {
      id: 'generate',
      label: `Generating ${selectedPurposesLabel}...`,
      detail: `Architecting ${purposesCount} purpose-built output${purposesCount !== 1 ? 's' : ''}`,
      icon: Sparkles
    },
    {
      id: 'finalize',
      label: 'Finalizing & verifying structural grounding...',
      detail: 'Running completeness audit & typography tokens',
      icon: ShieldCheck
    }
  ];

  // Map 7-stage pipeline index to the 4 user-visible sequential steps
  // (stages 0,1 -> step 0; stages 2 -> step 1; stages 3,4 -> step 2; stages 5,6 -> step 3)
  const mappedStepIndex = Math.min(
    3,
    currentStageIndex <= 1 ? 0 : currentStageIndex === 2 ? 1 : currentStageIndex <= 4 ? 2 : 3
  );

  const progressPercent = Math.min(100, Math.round(((currentStageIndex + 1) / 7) * 100));

  return (
    <div style={{
      position: 'relative',
      minHeight: '75vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px'
    }}>
      {/* Subtle Progress Bar at the very top of the screen in Mint Accent */}
      <div style={{
        position: 'fixed',
        top: 64, // below header
        left: 0,
        right: 0,
        height: 4,
        background: 'var(--border-subtle)',
        zIndex: 100,
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${progressPercent}%`,
          background: 'linear-gradient(90deg, #7C6FE8, #6FD6C0)',
          transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 0 10px rgba(111, 214, 192, 0.6)'
        }} />
      </div>

      {/* Center Stage Card */}
      <div className="bf-card animate-fade-in" style={{
        maxWidth: 580,
        width: '100%',
        padding: '36px 32px',
        background: '#FFFFFF',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        boxShadow: '0 20px 48px rgba(30, 30, 46, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 24
      }}>
        {/* Breathing Icon Badge with soft pastel indigo glow */}
        <div style={{ position: 'relative' }}>
          <div style={{
            position: 'absolute',
            inset: -10,
            borderRadius: '50%',
            background: 'rgba(124, 111, 232, 0.15)',
            filter: 'blur(12px)',
            animation: 'pulseGlow 2.4s ease-in-out infinite'
          }} />
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: 'linear-gradient(135deg, #7C6FE8 0%, #6FD6C0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(124, 111, 232, 0.28)',
            position: 'relative',
            zIndex: 1
          }}>
            <Layers size={30} color="#FFFFFF" />
          </div>
        </div>

        {/* Source Eyebrow & Title */}
        <div>
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: 'var(--brand-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 6
          }}>
            AUTOMATED TRANSFORMATION ENGINE
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
            Transforming Your Content
          </h2>
          <div style={{
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            marginTop: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6
          }}>
            <span>Document:</span>
            <strong style={{ color: 'var(--text-primary)', maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {sourceTitle}
            </strong>
          </div>
        </div>

        {/* 4 Sequential Status Steps lighting up one by one */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginTop: 8
        }}>
          {steps.map((step, idx) => {
            const isPast = idx < mappedStepIndex;
            const isCurrent = idx === mappedStepIndex;

            return (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: isCurrent 
                    ? '#F3F1FC' 
                    : isPast 
                    ? '#FAFAFB' 
                    : 'transparent',
                  border: isCurrent 
                    ? '1px solid rgba(124, 111, 232, 0.35)' 
                    : '1px solid transparent',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Step Circle Indicator */}
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  background: isPast 
                    ? '#EBFBF7' 
                    : isCurrent 
                    ? 'var(--brand-primary)' 
                    : '#FAFAFB',
                  color: isPast 
                    ? '#1F7C67' 
                    : isCurrent 
                    ? '#FFFFFF' 
                    : 'var(--text-muted)',
                  border: isPast 
                    ? '1px solid #BFEFDE' 
                    : isCurrent 
                    ? 'none' 
                    : '1px solid var(--border-subtle)',
                  boxShadow: isCurrent ? '0 0 14px rgba(124, 111, 232, 0.35)' : 'none',
                  flexShrink: 0,
                  transition: 'all 0.3s ease'
                }}>
                  {isPast ? (
                    <CheckCircle2 size={18} color="#1F7C67" />
                  ) : isCurrent ? (
                    <div style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      animation: 'pulseGlow 1.5s ease-in-out infinite'
                    }} />
                  ) : (
                    <span>0{idx + 1}</span>
                  )}
                </div>

                {/* Step Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: isCurrent ? 700 : isPast ? 600 : 500,
                    color: isCurrent 
                      ? 'var(--brand-primary)' 
                      : isPast 
                      ? 'var(--text-primary)' 
                      : 'var(--text-muted)',
                    letterSpacing: '-0.01em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>{step.label}</span>
                    {isCurrent && (
                      <span style={{
                        fontSize: '0.68rem',
                        color: 'var(--brand-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        background: 'rgba(124, 111, 232, 0.12)',
                        padding: '1px 6px',
                        borderRadius: 4
                      }}>
                        In Progress
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: isCurrent ? 'var(--text-secondary)' : 'var(--text-muted)',
                    marginTop: 2
                  }}>
                    {step.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Small estimated time text below */}
        <div style={{
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 16,
          width: '100%',
          justifyContent: 'center'
        }}>
          <span>⏱️ Usually takes 15–30 seconds</span>
          <span>•</span>
          <span style={{ color: '#1F7C67', fontWeight: 600 }}>Deterministic Failsafe Engine Active</span>
        </div>
      </div>
    </div>
  );
};
