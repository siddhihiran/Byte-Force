import React from 'react';
import { 
  Sliders, 
  CheckCircle, 
  Info,
  Presentation,
  Mic,
  TrendingUp,
  Zap,
  Sparkles
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: 'var(--brand-indigo-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(99, 102, 241, 0.25)'
          }}>
            <Sliders size={13} color="#818cf8" />
          </div>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.02em', color: '#ffffff' }}>
              03 • TUNING & CONTROLS
            </div>
            <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)' }}>
              Parameters for active purpose
            </div>
          </div>
        </div>

        <span className="badge badge-indigo" style={{ fontSize: '0.625rem' }}>
          {activePurpose.toUpperCase().replace('_', ' ')}
        </span>
      </div>

      {/* Dynamic Controls based on selected active purpose */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 380px)',
        paddingRight: 3
      }}>
        {/* SUMMARY / EXECUTIVE BRIEF CONFIG */}
        {(activePurpose === 'summary' || activePurpose === 'executive_brief') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Synthesis Depth & Format
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {[
                  { id: 'quick', label: 'Quick Executive' },
                  { id: 'detailed', label: 'Deep Technical' },
                  { id: 'exam', label: 'High-Yield' },
                  { id: 'executive', label: 'Decision Brief' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => onUpdateSummaryConfig({ format: opt.id as any })}
                    className={`btn btn-sm ${configs.summary.format === opt.id ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ justifyContent: 'center', fontSize: '0.75rem' }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Tone Profile
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['simple', 'professional', 'academic'] as const).map(tone => (
                  <button
                    key={tone}
                    onClick={() => onUpdateSummaryConfig({ tone })}
                    className={`btn btn-sm ${configs.summary.tone === tone ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center', fontSize: '0.75rem' }}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(56, 189, 248, 0.05)',
              border: '1px solid rgba(56, 189, 248, 0.18)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              fontSize: '0.725rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--brand-cyan)', fontWeight: 700, marginBottom: 3 }}>
                <Info size={13} />
                <span>Structural Guarantee</span>
              </div>
              Generates 4 structured blocks: Overview, Key Insights, Concept Dictionary, and Actionable Takeaways.
            </div>
          </div>
        )}

        {/* PRESENTATION OUTLINE CONFIG */}
        {activePurpose === 'presentation_outline' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Slide Deck Length
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[4, 6, 8].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => onUpdateOutlineConfig({ slideCount: cnt as any })}
                    className={`btn btn-sm ${configs.outline?.slideCount === cnt ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem' }}
                  >
                    {cnt} Slides
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Presentation Archetype
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['pitch', 'technical', 'executive'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => onUpdateOutlineConfig({ format: fmt })}
                    className={`btn btn-sm ${configs.outline?.format === fmt ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center', fontSize: '0.75rem' }}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(56, 189, 248, 0.05)',
              border: '1px solid rgba(56, 189, 248, 0.18)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              fontSize: '0.725rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--brand-cyan)', fontWeight: 700, marginBottom: 3 }}>
                <Presentation size={13} />
                <span>Deck Visualizer</span>
              </div>
              Generates slide titles, structured bullet points, and speaking notes for each slide.
            </div>
          </div>
        )}

        {/* QUIZ CONFIG */}
        {activePurpose === 'quiz' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Diagnostic Questions
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[5, 10].map(count => (
                  <button
                    key={count}
                    onClick={() => onUpdateQuizConfig({ questionCount: count as any })}
                    className={`btn btn-sm ${configs.quiz.questionCount === count ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem' }}
                  >
                    {count} Questions
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Cognitive Difficulty
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['easy', 'medium', 'hard'] as const).map(diff => (
                  <button
                    key={diff}
                    onClick={() => onUpdateQuizConfig({ difficulty: diff })}
                    className={`btn btn-sm ${configs.quiz.difficulty === diff ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center', fontSize: '0.75rem' }}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(168, 85, 247, 0.05)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              fontSize: '0.725rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#a855f7', fontWeight: 700, marginBottom: 3 }}>
                <CheckCircle size={13} />
                <span>Playable Test Engine</span>
              </div>
              Real interactive MCQ quiz with instant answer validation, detailed rationale, and scorecard.
            </div>
          </div>
        )}

        {/* FLASHCARDS CONFIG */}
        {(activePurpose === 'flashcards' || activePurpose === 'key_concepts') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Deck Size
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[6, 10].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => onUpdateFlashcardsConfig({ cardCount: cnt })}
                    className={`btn btn-sm ${configs.flashcards.cardCount === cnt ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem' }}
                  >
                    {cnt} Cards
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Recall Focus
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['definitions', 'applications'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => onUpdateFlashcardsConfig({ mode })}
                    className={`btn btn-sm ${configs.flashcards.mode === mode ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center', fontSize: '0.75rem' }}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Spoken Duration
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[2, 3, 5].map(min => (
                  <button
                    key={min}
                    onClick={() => onUpdateScriptConfig({ estimatedMinutes: min })}
                    className={`btn btn-sm ${configs.script.estimatedMinutes === min ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, justifyContent: 'center', fontSize: '0.75rem' }}
                  >
                    {min} Mins
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Delivery Style
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['keynote', 'briefing', 'walkthrough'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => onUpdateScriptConfig({ style: st })}
                    className={`btn btn-sm ${configs.script.style === st ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center', fontSize: '0.75rem' }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(244, 114, 182, 0.05)',
              border: '1px solid rgba(244, 114, 182, 0.2)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 12px',
              fontSize: '0.725rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#f472b6', fontWeight: 700, marginBottom: 3 }}>
                <Mic size={13} />
                <span>Teleprompter Ready</span>
              </div>
              Calculates pacing (~130 wpm) with spoken oral transitions and fullscreen prompter mode.
            </div>
          </div>
        )}

        {/* SOCIAL CONFIG */}
        {(activePurpose === 'linkedin_post' || activePurpose === 'x_post' || activePurpose === 'instagram_caption') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Platform
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['linkedin', 'x', 'instagram'] as const).map(plt => (
                  <button
                    key={plt}
                    onClick={() => onUpdateSocialConfig({ platform: plt })}
                    className={`btn btn-sm ${configs.social.platform === plt ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center', fontSize: '0.75rem' }}
                  >
                    {plt === 'x' ? 'X / Twitter' : plt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Tone of Voice
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['professional', 'conversational', 'bold'] as const).map(voice => (
                  <button
                    key={voice}
                    onClick={() => onUpdateSocialConfig({ tone: voice })}
                    className={`btn btn-sm ${configs.social.tone === voice ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center', fontSize: '0.75rem' }}
                  >
                    {voice}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Execution Callout Card */}
      <div style={{
        marginTop: 'auto',
        background: 'var(--bg-canvas)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 14px',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Pipeline Status:</span>
          <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#10b981' }}>7 Stages Configured</span>
        </div>
        <button
          onClick={onStartTransform}
          disabled={selectedCount === 0 || isTransforming}
          className="btn btn-primary"
          style={{ width: '100%', fontSize: '0.85rem' }}
        >
          <Zap size={14} />
          <span>Execute Transformations →</span>
        </button>
      </div>
    </div>
  );
};
