import React, { useState } from 'react';
import { 
  FileText, 
  Layers, 
  HelpCircle, 
  Mic, 
  Share2, 
  Presentation,
  TrendingUp, 
  Bookmark, 
  Sparkles,
  CheckSquare,
  Square,
  PackageCheck
} from 'lucide-react';
import { TransformationId, PurposeCategory } from '../../types';
import { PURPOSE_CATEGORIES, PURPOSES } from '../../constants/purposes';

interface PurposeZoneProps {
  selectedPurposes: TransformationId[];
  onTogglePurpose: (id: TransformationId) => void;
  onSelectAllRecommended: () => void;
  onGenerateCompletePack: () => void;
  activeConfigPurpose: TransformationId;
  onSetActiveConfigPurpose: (id: TransformationId) => void;
  onStartTransform: () => void;
  isTransforming: boolean;
}

const ICON_MAP: Record<string, React.FC<{ size?: number; color?: string }>> = {
  FileText,
  Layers,
  HelpCircle,
  Mic,
  Share2,
  Presentation,
  TrendingUp,
  Bookmark
};

export const PurposeZone: React.FC<PurposeZoneProps> = ({
  selectedPurposes,
  onTogglePurpose,
  onSelectAllRecommended,
  onGenerateCompletePack,
  activeConfigPurpose,
  onSetActiveConfigPurpose,
  onStartTransform,
  isTransforming
}) => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | PurposeCategory>('all');

  const filteredCategories = activeCategoryFilter === 'all' 
    ? PURPOSE_CATEGORIES 
    : PURPOSE_CATEGORIES.filter(c => c.id === activeCategoryFilter);

  const handleSelectModeCategory = (catId: PurposeCategory) => {
    setActiveCategoryFilter(catId);
    const first = PURPOSES.find(p => p.category === catId);
    if (first) {
      onSetActiveConfigPurpose(first.id);
      if (!selectedPurposes.includes(first.id)) {
        onTogglePurpose(first.id);
      }
    }
  };

  return (
    <div className="glass-panel" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      padding: '20px',
      height: '100%'
    }}>
      {/* Header (Phase 4: Visually strong WHAT DO YOU WANT TO DO WITH THIS CONTENT?) */}
      <div style={{
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 12
      }}>
        <div style={{
          fontSize: '0.9rem',
          fontWeight: 800,
          letterSpacing: '0.02em',
          color: '#ffffff',
          marginBottom: 4
        }}>
          WHAT DO YOU WANT TO DO WITH THIS CONTENT?
        </div>
        <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
          Choose your intended outcome, not the prompt
        </div>
      </div>

      {/* 5 PURPOSE MODE SELECTORS (Phase 4) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', fontWeight: 700 }}>
          SELECT OPERATIONAL PURPOSE:
        </div>
        <div style={{
          display: 'flex',
          gap: 4,
          background: 'rgba(0, 0, 0, 0.35)',
          padding: 3,
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className={`tab-btn ${activeCategoryFilter === 'all' ? 'active' : ''}`}
            style={{ fontSize: '0.725rem', padding: '4px 8px', flexShrink: 0 }}
          >
            All Purposes
          </button>
          {PURPOSE_CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => handleSelectModeCategory(c.id)}
              className={`tab-btn ${activeCategoryFilter === c.id ? 'active' : ''}`}
              style={{
                fontSize: '0.725rem',
                padding: '4px 8px',
                flexShrink: 0,
                textTransform: 'capitalize'
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categorized Intent Sections */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 430px)',
        paddingRight: 4
      }}>
        {filteredCategories.map(category => {
          const categoryPurposes = PURPOSES.filter(p => p.category === category.id);
          if (categoryPurposes.length === 0) return null;

          return (
            <div key={category.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {/* Category Label with purpose description */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '2px 4px'
              }}>
                <span style={{
                  fontSize: '0.725rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: category.id === 'summarize' ? 'var(--brand-cyan)' :
                         category.id === 'learn' ? '#a78bfa' :
                         category.id === 'assess' ? '#f59e0b' :
                         category.id === 'present' ? '#f472b6' : '#34d399'
                }}>
                  {category.label}
                </span>
                <span style={{ fontSize: '0.675rem', color: 'var(--text-dim)' }}>
                  {category.tagline}
                </span>
              </div>

              {/* Purpose Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 6 }}>
                {categoryPurposes.map(purpose => {
                  const isSelected = selectedPurposes.includes(purpose.id);
                  const isConfigActive = activeConfigPurpose === purpose.id;
                  const IconComponent = ICON_MAP[purpose.iconName] || FileText;

                  return (
                    <div
                      key={purpose.id}
                      onClick={() => onSetActiveConfigPurpose(purpose.id)}
                      className={`glass-card ${isSelected ? 'active' : ''}`}
                      style={{
                        padding: '10px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        borderColor: isConfigActive ? 'var(--brand-cyan)' : isSelected ? 'rgba(56, 189, 248, 0.35)' : 'var(--border-subtle)',
                        background: isConfigActive ? 'var(--bg-surface-elevated)' : undefined
                      }}
                    >
                      {/* Left: Checkbox + Icon + Title */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onTogglePurpose(purpose.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex',
                            alignItems: 'center',
                            color: isSelected ? 'var(--brand-cyan)' : 'var(--text-dim)'
                          }}
                        >
                          {isSelected ? <CheckSquare size={17} /> : <Square size={17} />}
                        </button>

                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          background: isSelected ? 'var(--brand-cyan-glow)' : 'rgba(255, 255, 255, 0.03)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isSelected ? 'var(--brand-cyan)' : 'var(--text-muted)'
                        }}>
                          <IconComponent size={15} />
                        </div>

                        <div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                          }}>
                            <span style={{
                              fontSize: '0.825rem',
                              fontWeight: 600,
                              color: isSelected ? '#ffffff' : 'var(--text-secondary)'
                            }}>
                              {purpose.title}
                            </span>
                            {purpose.badge && (
                              <span className="badge badge-muted" style={{ fontSize: '0.6rem', padding: '1px 5px' }}>
                                {purpose.badge}
                              </span>
                            )}
                          </div>
                          <div style={{
                            fontSize: '0.675rem',
                            color: 'var(--text-muted)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: 230
                          }}>
                            {purpose.tagline}
                          </div>
                        </div>
                      </div>

                      {/* Tuning Indicator */}
                      <div style={{
                        fontSize: '0.675rem',
                        color: isConfigActive ? 'var(--brand-cyan)' : 'var(--text-dim)',
                        fontWeight: 600,
                        marginLeft: 8
                      }}>
                        {isConfigActive ? 'Tuning' : 'Configure'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Sticky Action: Complete Pack + Transform Selected */}
      <div style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}>
        {/* Phase 11: High-Impact Action: GENERATE COMPLETE PACK */}
        <button
          onClick={onGenerateCompletePack}
          disabled={isTransforming}
          className="btn btn-secondary btn-sm"
          style={{
            width: '100%',
            padding: '8px 12px',
            fontSize: '0.8rem',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            background: 'rgba(56, 189, 248, 0.06)'
          }}
          title="Transform this source into all supported outputs in one click"
        >
          <PackageCheck size={14} color="var(--brand-cyan)" />
          <span style={{ color: 'var(--brand-cyan)', fontWeight: 700 }}>
            GENERATE COMPLETE PACK (All Outputs)
          </span>
        </button>

        {/* Primary CTA */}
        <button
          onClick={onStartTransform}
          disabled={selectedPurposes.length === 0 || isTransforming}
          className="btn btn-accent-glow"
          style={{ width: '100%', padding: '11px 16px', fontSize: '0.875rem' }}
        >
          <span>Transform Selected ({selectedPurposes.length}) →</span>
        </button>
      </div>
    </div>
  );
};
