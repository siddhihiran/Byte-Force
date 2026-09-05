import React from 'react';
import { 
  Sliders, 
  CheckCircle, 
  Info,
  Presentation,
  Mic,
  TrendingUp
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
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 12
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: 'var(--brand-indigo-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Sliders size={13} color="#818cf8" />
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.02em' }}>
            03 • TRANSFORMATION TUNING
          </span>
        </div>
        <span className="badge badge-indigo" style={{ fontSize: '0.65rem' }}>
          {activePurpose.toUpperCase().replace('_', ' ')}
        </span>
      </div>

      {/* Dynamic Controls based on selected active purpose */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 380px)'
      }}>
        {/* SUMMARY / EXECUTIVE BRIEF CONFIG */}
        {(activePurpose === 'summary' || activePurpose === 'executive_brief') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Synthesis Depth & Format
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                {[
                  { id: 'quick', label: 'Quick Executive' },
                  { id: 'detailed', label: 'Deep Technical' },
                  { id: 'exam', label: 'Exam High-Yield' },
                  { id: 'executive', label: 'Decision Brief' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => onUpdateSummaryConfig({ format: opt.id as any })}
                    className={`btn btn-sm ${configs.summary.format === opt.id ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ justifyContent: 'center' }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Tone Profile
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['simple', 'professional', 'academic'] as const).map(tone => (
                  <button
                    key={tone}
                    onClick={() => onUpdateSummaryConfig({ tone })}
                    className={`btn btn-sm ${configs.summary.tone === tone ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center' }}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(56, 189, 248, 0.05)',
              border: '1px solid rgba(56, 189, 248, 0.15)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px',
              fontSize: '0.725rem',
              color: 'var(--text-secondary)'
            }}>
              <Info size={14} color="#38bdf8" style={{ marginBottom: 4 }} />
              <div>
                Emits 4 structured sections: Executive Overview, Key Insights, Concept Dictionary, and Actionable Takeaways.
              </div>
            </div>
          </div>
        )}

        {/* PRESENTATION OUTLINE CONFIG (Required by Prompt #2 & #3) */}
        {activePurpose === 'presentation_outline' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Slide Deck Length
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[4, 6, 8].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => onUpdateOutlineConfig({ slideCount: cnt as any })}
                    className={`btn btn-sm ${configs.outline?.slideCount === cnt ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    {cnt} Slides
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Presentation Archetype
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['pitch', 'technical', 'executive'] as const).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => onUpdateOutlineConfig({ format: fmt })}
                    className={`btn btn-sm ${configs.outline?.format === fmt ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center' }}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            <div style={{
              background: 'rgba(56, 189, 248, 0.05)',
              border: '1px solid rgba(56, 189, 248, 0.15)',
              borderRadius: 'var(--radius-sm)',
              padding: '10px',
              fontSize: '0.725rem',
              color: 'var(--text-secondary)'
            }}>
              <Presentation size={14} color="#38bdf8" style={{ marginBottom: 4 }} />
              <div>
                Produces title slides, core bullet points, and talking points speaker notes for every slide.
              </div>
            </div>
          </div>
        )}

        {/* QUIZ CONFIG */}
        {activePurpose === 'quiz' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Number of Diagnostic Questions
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[5, 10].map(count => (
                  <button
                    key={count}
                    onClick={() => onUpdateQuizConfig({ questionCount: count as any })}
                    className={`btn btn-sm ${configs.quiz.questionCount === count ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    {count} Questions
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Cognitive Difficulty
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['easy', 'medium', 'hard'] as const).map(diff => (
                  <button
                    key={diff}
                    onClick={() => onUpdateQuizConfig({ difficulty: diff })}
                    className={`btn btn-sm ${configs.quiz.difficulty === diff ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center' }}
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
              padding: '10px',
              fontSize: '0.725rem',
              color: 'var(--text-secondary)'
            }}>
              <CheckCircle size={14} color="#a855f7" style={{ marginBottom: 4 }} />
              <div>
                Functional test engine with instant answer validation, detailed rationale, score reporting, and revision recommendations.
              </div>
            </div>
          </div>
        )}

        {/* FLASHCARDS / KEY CONCEPTS CONFIG */}
        {(activePurpose === 'flashcards' || activePurpose === 'key_concepts') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Deck Size
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[6, 10].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => onUpdateFlashcardsConfig({ cardCount: cnt })}
                    className={`btn btn-sm ${configs.flashcards.cardCount === cnt ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    {cnt} Flashcards
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Recall Mode
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['definitions', 'applications'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => onUpdateFlashcardsConfig({ mode })}
                    className={`btn btn-sm ${configs.flashcards.mode === mode ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center' }}
                  >
                    {mode === 'definitions' ? 'Core Terms' : 'Scenario Practice'}
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
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Target Spoken Duration
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[2, 3, 5].map(min => (
                  <button
                    key={min}
                    onClick={() => onUpdateScriptConfig({ estimatedMinutes: min })}
                    className={`btn btn-sm ${configs.script.estimatedMinutes === min ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    {min} Minutes
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Delivery Style
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['keynote', 'briefing', 'walkthrough'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => onUpdateScriptConfig({ style: st })}
                    className={`btn btn-sm ${configs.script.style === st ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center' }}
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
              padding: '10px',
              fontSize: '0.725rem',
              color: 'var(--text-secondary)'
            }}>
              <Mic size={14} color="#f472b6" style={{ marginBottom: 4 }} />
              <div>
                Calculates speaking pace (~130 words/min) with oral cues and provides full Teleprompter Reader Mode.
              </div>
            </div>
          </div>
        )}

        {/* SOCIAL CONFIG */}
        {(activePurpose === 'linkedin_post' || activePurpose === 'x_post' || activePurpose === 'instagram_caption') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Target Distribution Platform
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['linkedin', 'x', 'instagram'] as const).map(plt => (
                  <button
                    key={plt}
                    onClick={() => onUpdateSocialConfig({ platform: plt })}
                    className={`btn btn-sm ${configs.social.platform === plt ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center' }}
                  >
                    {plt === 'x' ? 'X / Twitter' : plt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                Social Voice
              </label>
              <div style={{ display: 'flex', gap: 6 }}>
                {(['professional', 'conversational', 'bold'] as const).map(voice => (
                  <button
                    key={voice}
                    onClick={() => onUpdateSocialConfig({ tone: voice })}
                    className={`btn btn-sm ${configs.social.tone === voice ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center' }}
                  >
                    {voice}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Execution Callout */}
      <div style={{
        marginTop: 'auto',
        background: 'var(--bg-canvas)',
        borderRadius: 'var(--radius-md)',
        padding: '12px',
        border: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>Engine Pipeline:</span>
          <span style={{ fontSize: '0.725rem', fontWeight: 700, color: '#10b981' }}>7 Stages Ready</span>
        </div>
        <button
          onClick={onStartTransform}
          disabled={selectedCount === 0 || isTransforming}
          className="btn btn-primary"
          style={{ width: '100%', fontSize: '0.85rem' }}
        >
          Execute Transformations →
        </button>
      </div>
    </div>
  );
};
