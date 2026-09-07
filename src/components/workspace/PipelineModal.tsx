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
  currentStage: _currentStage,
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
        background: '#FFFFFF',
        border: '1px solid var(--border-subtle)',
        borderRadius: '16px',
        boxShadow: '0 20px 48px rgba(30, 30, 46, 0.12)'
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
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #7C6FE8 0%, #6FD6C0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(124, 111, 232, 0.25)'
            }}>
              <Cpu size={20} color="#FFFFFF" />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.01em' }}>
                BYTEFORCE TRANSFORMATION ENGINE
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                Orchestrating {purposesCount} purpose-built asset{purposesCount > 1 ? 's' : ''} from source
              </div>
            </div>
          </div>
          <span className="badge" style={{
            fontSize: '0.72rem',
            padding: '4px 10px',
            background: 'rgba(124, 111, 232, 0.1)',
            color: 'var(--brand-primary)',
            border: '1px solid rgba(124, 111, 232, 0.25)',
            fontWeight: 700
          }}>
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
            Source: <strong style={{ color: 'var(--text-primary)' }}>{sourceTitle}</strong>
          </span>
          <span style={{ color: '#1F7C67', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
                    ? '#F3F1FC' 
                    : isPast 
                    ? '#FAFAFB' 
                    : 'transparent',
                  border: isCurrent 
                    ? '1px solid rgba(124, 111, 232, 0.35)' 
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
                  flexShrink: 0
                }}>
                  {isPast ? (
                    <CheckCircle2 size={16} color="#1F7C67" />
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
                      letterSpacing: '0.01em',
                      color: isCurrent ? 'var(--brand-primary)' : isPast ? 'var(--text-primary)' : 'var(--text-muted)'
                    }}>
                      {stage.name}
                    </span>
                    {isCurrent && (
                      <span style={{
                        fontSize: '0.68rem',
                        color: 'var(--brand-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600
                      }}>
                        Processing...
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontSize: '0.72rem',
                    color: isCurrent ? 'var(--text-secondary)' : 'var(--text-muted)',
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
            background: 'var(--border-subtle)',
            borderRadius: 3,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${((currentStageIndex + 1) / 7) * 100}%`,
              background: 'linear-gradient(90deg, #7C6FE8, #6FD6C0)',
              transition: 'width 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};
