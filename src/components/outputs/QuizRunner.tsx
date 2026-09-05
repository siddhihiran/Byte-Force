import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Download 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OutputAsset, QuizData } from '../../types';
import { ValidationBadge } from './ValidationBadge';

interface QuizRunnerProps {
  asset: OutputAsset;
  onRegenerate: () => void;
}

export const QuizRunner: React.FC<QuizRunnerProps> = ({ asset, onRegenerate }) => {
  const quizData = (asset.payload as { type: 'quiz'; data: QuizData }).data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = quizData.questions;
  const currentQ = questions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: selectedOption }));
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setAnswers({});
    setQuizFinished(false);
  };

  // Calculate score
  const score = Object.entries(answers).reduce((acc, [qIdx, userAns]) => {
    const q = questions[parseInt(qIdx)];
    return q && userAns === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  return (
    <div className="glass-card animate-fade-in" style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 16,
        flexWrap: 'wrap',
        gap: 12
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span className="badge badge-purple" style={{
              background: 'rgba(168, 85, 247, 0.15)',
              color: '#c084fc',
              border: '1px solid rgba(168, 85, 247, 0.3)'
            }}>
              TEST • DIAGNOSTIC ASSESSMENT
            </span>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              {asset.format}
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
            {asset.title}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={handleRestart}
            className="btn btn-secondary btn-sm"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
          <button
            onClick={onRegenerate}
            className="btn btn-ghost btn-sm"
            title="Regenerate questions"
          >
            <Sparkles size={13} />
          </button>
        </div>
      </div>

      <ValidationBadge signals={asset.validationSignals} />

      {!quizFinished ? (
        <>
          {/* Progress Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <span>Question <strong style={{ color: '#ffffff' }}>{currentQuestionIndex + 1}</strong> of {questions.length}</span>
            <span style={{ color: 'var(--brand-cyan)' }}>
              Target: {currentQ?.concept}
            </span>
          </div>

          <div style={{
            height: 4,
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              background: 'linear-gradient(90deg, #a855f7, #38bdf8)',
              transition: 'width 0.2s ease'
            }} />
          </div>

          {/* Question Box */}
          <div style={{
            background: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '20px'
          }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              lineHeight: 1.5,
              color: '#f8fafc'
            }}>
              {currentQ?.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {currentQ?.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let optionStyle: React.CSSProperties = {
                padding: '14px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-surface)',
                cursor: isAnswerSubmitted ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s ease',
                textAlign: 'left'
              };

              if (!isAnswerSubmitted) {
                if (isSelected) {
                  optionStyle.borderColor = 'var(--brand-cyan)';
                  optionStyle.background = 'rgba(56, 189, 248, 0.08)';
                  optionStyle.boxShadow = '0 0 15px rgba(56, 189, 248, 0.15)';
                }
              } else {
                if (isCorrect) {
                  optionStyle.borderColor = '#10b981';
                  optionStyle.background = 'rgba(16, 185, 129, 0.12)';
                } else if (isSelected && !isCorrect) {
                  optionStyle.borderColor = '#f43f5e';
                  optionStyle.background = 'rgba(244, 63, 94, 0.12)';
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  style={optionStyle}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: isSelected ? 'var(--brand-cyan)' : 'rgba(255, 255, 255, 0.05)',
                      color: isSelected ? '#000000' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span style={{ fontSize: '0.875rem', color: '#ffffff' }}>
                      {option}
                    </span>
                  </div>

                  {isAnswerSubmitted && (
                    <div>
                      {isCorrect && <CheckCircle2 size={18} color="#10b981" />}
                      {isSelected && !isCorrect && <XCircle size={18} color="#f43f5e" />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Rationale / Explanation Box (reveals after submission) */}
          {isAnswerSubmitted && (
            <div className="animate-fade-in" style={{
              background: 'rgba(15, 23, 42, 0.8)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              borderRadius: 'var(--radius-sm)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 6
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: '0.75rem',
                fontWeight: 700,
                color: selectedOption === currentQ.correctIndex ? '#34d399' : '#fb7185'
              }}>
                <HelpCircle size={14} />
                <span>
                  {selectedOption === currentQ.correctIndex 
                    ? 'CORRECT • FACTUAL VERIFICATION' 
                    : 'INCORRECT • SOURCE RATIONALE'}
                </span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 12,
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 16
          }}>
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="btn btn-primary"
                style={{ minWidth: 140 }}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn btn-accent-glow"
                style={{ minWidth: 140 }}
              >
                <span>{currentQuestionIndex + 1 === questions.length ? 'View Results' : 'Next Question'}</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </>
      ) : (
        /* QUIZ RESULTS SCREEN */
        <div className="animate-fade-in" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          padding: '24px 16px',
          textAlign: 'center'
        }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0284c7 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 35px rgba(56, 189, 248, 0.4)'
          }}>
            <Award size={36} color="#ffffff" />
          </div>

          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: 4 }}>
              Diagnostic Assessment Complete
            </h3>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Evaluated against source document facts
            </div>
          </div>

          {/* Score Badge */}
          <div style={{
            background: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 36px',
            display: 'flex',
            alignItems: 'baseline',
            gap: 8
          }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10b981' }}>
              {score}
            </span>
            <span style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
              / {questions.length}
            </span>
            <span style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--brand-cyan)',
              marginLeft: 12
            }}>
              ({percentage}%)
            </span>
          </div>

          {/* Concepts to Revise (Required by Spec #20) */}
          <div style={{
            width: '100%',
            maxWidth: 480,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            textAlign: 'left'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#f59e0b',
              marginBottom: 10
            }}>
              <BookOpen size={15} />
              <span>RECOMMENDED CONCEPTS TO REVISE</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {quizData.conceptsToRevise.map((c, i) => (
                <div key={i} style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                  • {c}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button
              onClick={handleRestart}
              className="btn btn-primary"
              style={{ minWidth: 140 }}
            >
              <RotateCcw size={14} />
              <span>Retry Quiz</span>
            </button>
            <button
              onClick={onRegenerate}
              className="btn btn-secondary"
            >
              <Sparkles size={14} />
              <span>New Questions</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
