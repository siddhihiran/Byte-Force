import React from 'react';
import { CheckCircle2, Loader2, Cpu } from 'lucide-react';
import { PipelineStage } from '../../types';
import { PIPELINE_STAGES } from '../../services/TransformationService';

interface PipelineModalProps {
  currentStage: PipelineStage;
  currentStageIndex: number;
  isOpen: boolean;
  sourceTitle: string;
  purposesCount: number;
}

export const PipelineModal: React.FC<PipelineModalProps> = ({
  currentStage,
  currentStageIndex,
  isOpen,
  sourceTitle,
  purposesCount
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in" style={{
        maxWidth: 580,
        padding: '28px',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(56, 189, 248, 0.15)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 18,
          marginBottom: 18
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="animate-pulse-glow" style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.3)'
            }}>
              <Cpu size={20} color="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.02em' }}>
                BYTEFORCE TRANSFORMATION ENGINE
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Orchestrating {purposesCount} purpose-built asset{purposesCount > 1 ? 's' : ''} from source
              </div>
            </div>
          </div>
          <span className="badge badge-cyan" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
            STAGE {currentStageIndex + 1} OF 7
          </span>
        </div>

        {/* Source metadata banner */}
        <div style={{
          background: 'var(--bg-canvas)',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          marginBottom: 18,
          border: '1px solid var(--border-subtle)',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 380 }}>
            Source: <strong style={{ color: '#ffffff' }}>{sourceTitle}</strong>
          </span>
          <span style={{ color: 'var(--brand-cyan)', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Pipeline Active
          </span>
        </div>

        {/* Animated 7-Stage Pipeline List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PIPELINE_STAGES.map((stage, idx) => {
            const isPast = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={stage.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isCurrent 
                    ? 'rgba(56, 189, 248, 0.08)' 
                    : isPast 
                    ? 'rgba(255, 255, 255, 0.02)' 
                    : 'transparent',
                  border: isCurrent 
                    ? '1px solid rgba(56, 189, 248, 0.35)' 
                    : '1px solid transparent',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Stage Number & Status Indicator */}
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  background: isPast 
                    ? 'rgba(16, 185, 129, 0.15)' 
                    : isCurrent 
                    ? 'var(--brand-cyan)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  color: isPast 
                    ? '#10b981' 
                    : isCurrent 
                    ? '#07090d' 
                    : 'var(--text-dim)',
                  border: isPast 
                    ? '1px solid rgba(16, 185, 129, 0.3)' 
                    : 'none',
                  flexShrink: 0
                }}>
                  {isPast ? (
                    <CheckCircle2 size={16} color="#10b981" />
                  ) : isCurrent ? (
                    <Loader2 size={15} className="animate-spin" style={{ animation: 'spinSlow 1s linear infinite' }} />
                  ) : (
                    stage.number
                  )}
                </div>

                {/* Stage Info */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <span style={{
                      fontSize: '0.825rem',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      color: isCurrent ? 'var(--brand-cyan)' : isPast ? '#ffffff' : 'var(--text-dim)'
                    }}>
                      {stage.name}
                    </span>
                    {isCurrent && (
                      <span style={{
                        fontSize: '0.68rem',
                        color: 'var(--brand-cyan)',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600
                      }}>
                        Processing...
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontSize: '0.72rem',
                    color: isCurrent ? 'var(--text-secondary)' : 'var(--text-dim)',
                    marginTop: 2
                  }}>
                    {stage.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Progress Bar */}
        <div style={{ marginTop: 22 }}>
          <div style={{
            height: 5,
            width: '100%',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 3,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${((currentStageIndex + 1) / 7) * 100}%`,
              background: 'linear-gradient(90deg, #38bdf8, #818cf8, #10b981)',
              transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};
