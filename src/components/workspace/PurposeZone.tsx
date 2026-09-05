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
  PackageCheck,
  Zap,
  ArrowRight
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
  Bookmark,
  Linkedin: Share2,
  Twitter: Share2
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
      {/* Zone Header Strip */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 12
      }}>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.02em', color: '#ffffff' }}>
            02 • CHOOSE PURPOSE
          </div>
          <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
            What do you want to do with this content?
          </div>
        </div>

        <button
          onClick={onSelectAllRecommended}
          className="btn btn-ghost btn-sm"
          style={{ fontSize: '0.7rem', padding: '3px 8px' }}
          title="Select all recommended learning and presentation outputs"
        >
          <span>Select Recommended</span>
        </button>
      </div>

      {/* Category Pills Filter */}
      <div style={{
        display: 'flex',
        gap: 3,
        background: 'rgba(0, 0, 0, 0.4)',
        padding: 3,
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-subtle)',
        overflowX: 'auto'
      }}>
        <button
          onClick={() => setActiveCategoryFilter('all')}
          className={`tab-btn ${activeCategoryFilter === 'all' ? 'active' : ''}`}
          style={{ fontSize: '0.725rem', padding: '4px 9px', flexShrink: 0 }}
        >
          All
        </button>
        {PURPOSE_CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => handleSelectModeCategory(c.id)}
            className={`tab-btn ${activeCategoryFilter === c.id ? 'active' : ''}`}
            style={{
              fontSize: '0.725rem',
              padding: '4px 9px',
              flexShrink: 0,
              textTransform: 'capitalize'
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Categorized Purposes List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 430px)',
        paddingRight: 3
      }}>
        {filteredCategories.map(category => {
          const categoryPurposes = PURPOSES.filter(p => p.category === category.id);
          if (categoryPurposes.length === 0) return null;

          return (
            <div key={category.id} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {/* Category Subhead */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2px'
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  color: category.id === 'summarize' ? 'var(--brand-cyan)' :
                         category.id === 'learn' ? '#34d399' :
                         category.id === 'assess' ? '#fbbf24' :
                         category.id === 'present' ? '#a5b4fc' : '#f43f5e'
                }}>
                  {category.label.toUpperCase()}
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>
                  {category.tagline}
                </span>
              </div>

              {/* Purpose Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {categoryPurposes.map(purpose => {
                  const isSelected = selectedPurposes.includes(purpose.id);
                  const isConfigActive = activeConfigPurpose === purpose.id;
                  const Icon = ICON_MAP[purpose.iconName] || FileText;

                  return (
                    <div
                      key={purpose.id}
                      onClick={() => {
                        onSetActiveConfigPurpose(purpose.id);
                        onTogglePurpose(purpose.id);
                      }}
                      className={`bf-card interactive ${isSelected ? 'active' : ''}`}
                      style={{
                        padding: '10px 12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: isSelected ? 'rgba(56, 189, 248, 0.07)' : 'var(--bg-surface)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
                        {/* Checkbox Icon */}
                        <div style={{
                          color: isSelected ? 'var(--brand-cyan)' : 'var(--text-dim)',
                          display: 'flex',
                          alignItems: 'center'
                        }}>
                          {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                        </div>

                        {/* Icon */}
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: 6,
                          background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Icon size={14} color={isSelected ? 'var(--brand-cyan)' : 'var(--text-muted)'} />
                        </div>

                        {/* Text */}
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{
                            fontSize: '0.825rem',
                            fontWeight: 700,
                            color: isSelected ? '#ffffff' : 'var(--text-secondary)'
                          }}>
                            {purpose.title}
                          </div>
                          <div style={{
                            fontSize: '0.675rem',
                            color: 'var(--text-muted)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {purpose.tagline}
                          </div>
                        </div>
                      </div>

                      {/* Tuning indicator */}
                      <span style={{
                        fontSize: '0.65rem',
                        color: isConfigActive ? 'var(--brand-cyan)' : 'var(--text-dim)',
                        fontWeight: 600,
                        marginLeft: 8,
                        flexShrink: 0
                      }}>
                        {isConfigActive ? 'Tuning' : 'Configure'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Bottom Actions: Complete Pack + Primary Transform CTA */}
      <div style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 9
      }}>
        {/* GENERATE COMPLETE PACK Superpower Action */}
        <button
          onClick={onGenerateCompletePack}
          disabled={isTransforming}
          className="btn btn-secondary btn-sm"
          style={{
            width: '100%',
            padding: '9px 12px',
            fontSize: '0.785rem',
            border: '1px solid rgba(56, 189, 248, 0.35)',
            background: 'rgba(56, 189, 248, 0.07)',
            justifyContent: 'center'
          }}
          title="Transform this source into all supported outputs in one click"
        >
          <PackageCheck size={14} color="var(--brand-cyan)" />
          <span style={{ color: 'var(--brand-cyan)', fontWeight: 700 }}>
            GENERATE COMPLETE PACK (All 6 Outputs)
          </span>
        </button>

        {/* Primary Transform Button */}
        <button
          onClick={onStartTransform}
          disabled={selectedPurposes.length === 0 || isTransforming}
          className="btn btn-accent-glow"
          style={{ width: '100%', padding: '12px 16px', fontSize: '0.875rem' }}
        >
          <Zap size={15} />
          <span>Transform Selected ({selectedPurposes.length}) →</span>
        </button>
      </div>
    </div>
  );
};
