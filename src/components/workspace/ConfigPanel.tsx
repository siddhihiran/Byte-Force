import React from 'react';
import { 
  Sliders, 
  CheckCircle, 
  Info,
  Presentation,
  Mic,
  Zap
} from 'lucide-react';
import { 
  TransformationId, 
  TransformationConfigs, 
  SummaryConfig, 
  QuizConfig, 
  SocialConfig, 
  ScriptConfig, 
  FlashcardsConfig,
  OutlineConfig
} from '../../types';

interface ConfigPanelProps {
  activePurpose: TransformationId;
  configs: TransformationConfigs;
  onUpdateSummaryConfig: (c: Partial<SummaryConfig>) => void;
  onUpdateQuizConfig: (c: Partial<QuizConfig>) => void;
  onUpdateSocialConfig: (c: Partial<SocialConfig>) => void;
  onUpdateScriptConfig: (c: Partial<ScriptConfig>) => void;
  onUpdateFlashcardsConfig: (c: Partial<FlashcardsConfig>) => void;
  onUpdateOutlineConfig: (c: Partial<OutlineConfig>) => void;
  onStartTransform: () => void;
  isTransforming: boolean;
  selectedCount: number;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  activePurpose,
  configs,
  onUpdateSummaryConfig,
  onUpdateQuizConfig,
  onUpdateSocialConfig,
  onUpdateScriptConfig,
  onUpdateFlashcardsConfig,
  onUpdateOutlineConfig,
  onStartTransform,
  isTransforming,
  selectedCount
}) => {
  return (
    <div className="bf-card" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      padding: '24px',
      height: '100%'
    }}>
      {/* 03 · TUNING & CONTROLS Header */}
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
              03 · TUNING & CONTROLS
            </h2>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: 2 }}>
              Parameters for active purpose
            </div>
          </div>
        </div>

        <span className="badge badge-primary" style={{ fontSize: '11px', textTransform: 'capitalize' }}>
          {activePurpose.replace('_', ' ')}
        </span>
      </div>

      {/* Dynamic Controls based on selected active purpose */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 380px)',
        paddingRight: 4
      }}>
        {/* SUMMARY / EXECUTIVE BRIEF CONFIG */}
        {(activePurpose === 'summary' || activePurpose === 'executive_brief') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Synthesis Depth Segmented Group */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
                Synthesis Depth & Format
              </label>
              <div className="segmented-group">
                {[
                  { id: 'quick', label: 'Quick' },
                  { id: 'detailed', label: 'Deep Technical' },
                  { id: 'exam', label: 'High-Yield' },
                  { id: 'executive', label: 'Decision Brief' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onUpdateSummaryConfig({ format: opt.id as any })}
                    className={`segmented-item ${configs.summary.format === opt.id ? 'active' : ''}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Profile Segmented Group */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
                Tone Profile
              </label>
              <div className="segmented-group">
                {(['simple', 'professional', 'academic'] as const).map(tone => (
                  <button
                    key={tone}
                    type="button"
                    onClick={() => onUpdateSummaryConfig({ tone })}
                    className={`segmented-item ${configs.summary.tone === tone ? 'active' : ''}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            {/* Structural Guarantee: Soft Mint-Tinted Callout Card */}
            <div className="callout-mint">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1F7C67', fontWeight: 600, fontSize: '12px', marginBottom: 4 }}>
                <Info size={14} />
                <span>Structural Guarantee</span>
              </div>
              <div style={{ fontSize: '12px', color: '#1E1E2E', lineHeight: 1.5 }}>
                Generates 4 structured blocks: Overview, Key Insights, Concept Dictionary, and Actionable Takeaways.
              </div>
            </div>
          </div>
        )}

        {/* PRESENTATION OUTLINE CONFIG */}
        {activePurpose === 'presentation_outline' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
                Slide Deck Length
              </label>
              <div className="segmented-group">
                {[4, 6, 8].map(cnt => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => onUpdateOutlineConfig({ slideCount: cnt as any })}
                    className={`segmented-item ${configs.outline?.slideCount === cnt ? 'active' : ''}`}
                  >
                    {cnt} Slides
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
                Presentation Archetype
              </label>
              <div className="segmented-group">
                {(['pitch', 'technical', 'executive'] as const).map(fmt => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => onUpdateOutlineConfig({ format: fmt })}
                    className={`segmented-item ${configs.outline?.format === fmt ? 'active' : ''}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div className="callout-mint">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1F7C67', fontWeight: 600, fontSize: '12px', marginBottom: 4 }}>
                <Presentation size={14} />
                <span>Deck Visualizer</span>
              </div>
              <div style={{ fontSize: '12px', color: '#1E1E2E', lineHeight: 1.5 }}>
                Generates slide titles, structured bullet points, and speaker talking notes for each slide.
              </div>
            </div>
          </div>
        )}

        {/* QUIZ CONFIG */}
        {activePurpose === 'quiz' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
                Diagnostic Questions
              </label>
              <div className="segmented-group">
                {[5, 10].map(count => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => onUpdateQuizConfig({ questionCount: count as any })}
                    className={`segmented-item ${configs.quiz.questionCount === count ? 'active' : ''}`}
                  >
                    {count} Questions
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
                Cognitive Difficulty
              </label>
              <div className="segmented-group">
                {(['easy', 'medium', 'hard'] as const).map(diff => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => onUpdateQuizConfig({ difficulty: diff })}
                    className={`segmented-item ${configs.quiz.difficulty === diff ? 'active' : ''}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div className="callout-mint">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#1F7C67', fontWeight: 600, fontSize: '12px', marginBottom: 4 }}>
                <CheckCircle size={14} />
                <span>Playable Test Engine</span>
              </div>
              <div style={{ fontSize: '12px', color: '#1E1E2E', lineHeight: 1.5 }}>
                Real interactive MCQ quiz with instant answer validation, detailed rationale, and scorecard.
              </div>
            </div>
          </div>
        )}

        {/* FLASHCARDS CONFIG */}
        {(activePurpose === 'flashcards' || activePurpose === 'key_concepts') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
                Deck Size
              </label>
              <div className="segmented-group">
                {[6, 10].map(cnt => (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => onUpdateFlashcardsConfig({ cardCount: cnt })}
                    className={`segmented-item ${configs.flashcards.cardCount === cnt ? 'active' : ''}`}
                  >
                    {cnt} Cards
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
                Recall Focus
              </label>
              <div className="segmented-group">
                {(['definitions', 'applications'] as const).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => onUpdateFlashcardsConfig({ mode })}
                    className={`segmented-item ${configs.flashcards.mode === mode ? 'active' : ''}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {mode === 'definitions' ? 'Key Terms' : 'Scenarios'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCRIPT CONFIG */}
        {activePurpose === 'speaking_script' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
                Spoken Duration
              </label>
              <div className="segmented-group">
                {[2, 3, 5].map(min => (
                  <button
                    key={min}
                    type="button"
                    onClick={() => onUpdateScriptConfig({ estimatedMinutes: min })}
                    className={`segmented-item ${configs.script.estimatedMinutes === min ? 'active' : ''}`}
                  >
                    {min} Mins
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
                Delivery Style
              </label>
              <div className="segmented-group">
                {(['keynote', 'briefing', 'walkthrough'] as const).map(st => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => onUpdateScriptConfig({ style: st })}
                    className={`segmented-item ${configs.script.style === st ? 'active' : ''}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="callout-lavender">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--brand-primary)', fontWeight: 600, fontSize: '12px', marginBottom: 4 }}>
                <Mic size={14} />
                <span>Teleprompter Studio</span>
              </div>
              <div style={{ fontSize: '12px', color: '#1E1E2E', lineHeight: 1.5 }}>
                Pacing metric (~130 wpm) with spoken oral transitions and fullscreen studio prompter mode.
              </div>
            </div>
          </div>
        )}

        {/* SOCIAL CONFIG */}
        {(activePurpose === 'linkedin_post' || activePurpose === 'x_post' || activePurpose === 'instagram_caption') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
                Platform
              </label>
              <div className="segmented-group">
                {(['linkedin', 'x', 'instagram'] as const).map(plt => (
                  <button
                    key={plt}
                    type="button"
                    onClick={() => onUpdateSocialConfig({ platform: plt })}
                    className={`segmented-item ${configs.social.platform === plt ? 'active' : ''}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {plt === 'x' ? 'X (Twitter)' : plt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: 8 }}>
                Tone of Voice
              </label>
              <div className="segmented-group">
                {(['professional', 'conversational', 'bold'] as const).map(voice => (
                  <button
                    key={voice}
                    type="button"
                    onClick={() => onUpdateSocialConfig({ tone: voice })}
                    className={`segmented-item ${configs.social.tone === voice ? 'active' : ''}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {voice}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Execution Callout Card at Bottom */}
      <div style={{
        marginTop: 'auto',
        background: 'var(--bg-surface-subtle)',
        borderRadius: '14px',
        padding: '16px',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Pipeline Status:</span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1F7C67' }}>7 Stages Configured</span>
        </div>
        <button
          onClick={onStartTransform}
          disabled={selectedCount === 0 || isTransforming}
          className="btn btn-primary"
          style={{ width: '100%', fontSize: '14px', fontWeight: 600, padding: '12px 16px' }}
        >
          <Zap size={15} />
          <span>Execute Transformations →</span>
        </button>
      </div>
    </div>
  );
};
