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
  CheckSquare,
  Square,
  PackageCheck,
  Zap,
  Sliders
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
    <div className="bf-card" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      padding: '24px',
      height: '100%'
    }}>
      {/* 02 · CHOOSE PURPOSE Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: 'var(--brand-primary-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--brand-primary)'
          }}>
            <Sliders size={15} />
          </div>
          <div>
            <h2 className="section-header-title">
              02 · CHOOSE PURPOSE
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: 2 }}>
              What do you want to create with this source?
            </div>
          </div>
        </div>

        <button
          onClick={onSelectAllRecommended}
          className="btn btn-secondary btn-sm"
          style={{ fontSize: '11px', padding: '4px 10px' }}
          title="Select all recommended learning and presentation outputs"
        >
          <span>Select Recommended</span>
        </button>
      </div>

      {/* Category Pills Filter: Active tab = solid primary accent bg with white text, inactive = transparent with text-secondary */}
      <div style={{
        display: 'flex',
        gap: 4,
        background: 'var(--bg-surface-subtle)',
        padding: 4,
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border-subtle)',
        overflowX: 'auto'
      }}>
        <button
          onClick={() => setActiveCategoryFilter('all')}
          className={`tab-btn ${activeCategoryFilter === 'all' ? 'active' : ''}`}
          style={{
            fontSize: '12px',
            padding: '5px 12px',
            borderRadius: '9999px',
            flexShrink: 0
          }}
        >
          All
        </button>
        {PURPOSE_CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => handleSelectModeCategory(c.id)}
            className={`tab-btn ${activeCategoryFilter === c.id ? 'active' : ''}`}
            style={{
              fontSize: '12px',
              padding: '5px 12px',
              borderRadius: '9999px',
              flexShrink: 0,
              textTransform: 'capitalize'
            }}
          >
            {c.label.toLowerCase()}
          </button>
        ))}
      </div>

      {/* Categorized Purposes List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 430px)',
        paddingRight: 4
      }}>
        {filteredCategories.map(category => {
          const categoryPurposes = PURPOSES.filter(p => p.category === category.id);
          if (categoryPurposes.length === 0) return null;

          return (
            <div key={category.id} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Category Subhead: Small uppercase eyebrow text in primary accent, not colored blocks */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 2px'
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  color: 'var(--brand-primary)',
                  textTransform: 'uppercase'
                }}>
                  {category.label}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {category.tagline}
                </span>
              </div>

              {/* Purpose Cards: Icon in soft-tinted rounded square, title bold, description text-secondary, Configure as ghost button */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                      className={`bf-card interactive ${isSelected ? 'selected' : ''}`}
                      style={{
                        padding: '14px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: '14px',
                        background: '#FFFFFF',
                        borderLeft: isSelected ? '3px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                        boxShadow: isSelected ? 'var(--shadow-selected)' : 'var(--shadow-resting)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden' }}>
                        {/* Checkbox Icon */}
                        <div style={{
                          color: isSelected ? 'var(--brand-primary)' : 'var(--border-medium)',
                          display: 'flex',
                          alignItems: 'center',
                          flexShrink: 0
                        }}>
                          {isSelected ? <CheckSquare size={18} color="var(--brand-primary)" /> : <Square size={18} />}
                        </div>

                        {/* Icon in soft-tinted rounded square */}
                        <div style={{
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          background: isSelected ? 'var(--brand-primary-subtle)' : 'var(--bg-surface-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isSelected ? 'var(--brand-primary)' : 'var(--text-secondary)',
                          flexShrink: 0,
                          border: isSelected ? '1px solid rgba(124, 111, 232, 0.2)' : '1px solid var(--border-subtle)'
                        }}>
                          <Icon size={16} />
                        </div>

                        {/* Text */}
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            lineHeight: 1.3
                          }}>
                            {purpose.title}
                          </div>
                          <div style={{
                            fontSize: '12px',
                            color: 'var(--text-secondary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            marginTop: 2
                          }}>
                            {purpose.tagline}
                          </div>
                        </div>
                      </div>

                      {/* Right-aligned Configure Button (Ghost Style) */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSetActiveConfigPurpose(purpose.id);
                          if (!isSelected) onTogglePurpose(purpose.id);
                        }}
                        className={`btn btn-sm ${isConfigActive ? 'btn-secondary' : 'btn-ghost'}`}
                        style={{
                          fontSize: '11px',
                          padding: '4px 10px',
                          marginLeft: 8,
                          flexShrink: 0,
                          color: isConfigActive ? 'var(--brand-primary)' : 'var(--text-secondary)'
                        }}
                      >
                        {isConfigActive ? 'Configuring' : 'Configure'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Actions: Complete Pack + Primary Transform CTA */}
      <div style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}>
        {/* GENERATE COMPLETE PACK Superpower Action */}
        <button
          onClick={onGenerateCompletePack}
          disabled={isTransforming}
          className="btn btn-secondary btn-sm"
          style={{
            width: '100%',
            padding: '10px 14px',
            fontSize: '13px',
            background: 'var(--brand-primary-subtle)',
            borderColor: 'rgba(124, 111, 232, 0.25)',
            color: 'var(--brand-primary)',
            justifyContent: 'center',
            fontWeight: 600
          }}
          title="Transform this source into all supported outputs in one click"
        >
          <PackageCheck size={15} color="var(--brand-primary)" />
          <span>GENERATE COMPLETE PACK (All 6 Outputs)</span>
        </button>

        {/* Primary Transform Button */}
        <button
          onClick={onStartTransform}
          disabled={selectedPurposes.length === 0 || isTransforming}
          className="btn btn-primary"
          style={{
            width: '100%',
            padding: '12px 18px',
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          <Zap size={16} />
          <span>Transform Selected ({selectedPurposes.length}) →</span>
        </button>
      </div>
    </div>
  );
};
