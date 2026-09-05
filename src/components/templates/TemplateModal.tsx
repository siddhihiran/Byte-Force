import React from 'react';
import { 
  X, 
  Sparkles, 
  GraduationCap, 
  Briefcase, 
  Share2, 
  BookOpen, 
  Presentation, 
  ArrowRight 
} from 'lucide-react';
import { TemplatePack } from '../../types';
import { TEMPLATE_PACKS } from '../../services/StorageService';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyTemplate: (template: TemplatePack) => void;
}

const ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  GraduationCap,
  Briefcase,
  Share2,
  BookOpen,
  Presentation
};

export const TemplateModal: React.FC<TemplateModalProps> = ({
  isOpen,
  onClose,
  onApplyTemplate
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 760, padding: '28px', border: '1px solid rgba(56, 189, 248, 0.25)' }}
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
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-cyan)'
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                Curated Transformation Presets
              </h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                1-Click presets for Study, Exam Prep, Presentation, Social, and Executive Briefs
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            style={{ padding: 6 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Template Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
          {TEMPLATE_PACKS.map((pack) => {
            const IconComponent = ICON_MAP[pack.icon] || Sparkles;

            return (
              <div
                key={pack.id}
                className="bf-card"
                style={{
                  padding: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 14,
                  background: 'var(--bg-canvas)'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 10
                  }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--brand-cyan)'
                    }}>
                      <IconComponent size={18} />
                    </div>
                    {pack.badge && (
                      <span className="badge badge-cyan" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                        {pack.badge}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginBottom: 6 }}>
                    {pack.name}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: 12, margin: 0 }}>
                    {pack.description}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 10 }}>
                    {pack.recommendedPurposes.map((p, i) => (
                      <span key={i} className="badge badge-muted" style={{ fontSize: '0.65rem' }}>
                        {p.replace('_', ' ').toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onApplyTemplate(pack);
                    onClose();
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'space-between', marginTop: 4 }}
                >
                  <span>Apply {pack.name}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
