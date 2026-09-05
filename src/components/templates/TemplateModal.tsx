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
        style={{ maxWidth: 720, padding: '24px' }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'var(--brand-cyan-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={16} color="var(--brand-cyan)" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>
                Curated Transformation Template Packs
              </h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                1-Click presets for Study, Exam Prep, Presentation, Social, and Executive Briefs
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            style={{ padding: 4 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Template Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
          {TEMPLATE_PACKS.map((pack) => {
            const IconComponent = ICON_MAP[pack.icon] || Sparkles;

            return (
              <div
                key={pack.id}
                className="glass-card"
                style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 12
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 8
                  }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--brand-cyan)'
                    }}>
                      <IconComponent size={16} />
                    </div>
                    {pack.badge && (
                      <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                        {pack.badge}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 4 }}>
                    {pack.name}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 10 }}>
                    {pack.description}
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
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
                  style={{ width: '100%', justifyContent: 'space-between', marginTop: 8 }}
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
