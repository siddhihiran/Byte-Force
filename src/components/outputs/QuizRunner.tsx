import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { OutputAsset, QuizData } from '../../types';

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
    <div className="bf-card animate-fade-in" style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      background: '#FFFFFF'
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
            <span className="badge badge-primary">
              ASSESS • DIAGNOSTIC ASSESSMENT
            </span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {asset.format}
            </span>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
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

      {!quizFinished ? (
        <>
          {/* Progress Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: 'var(--text-secondary)'
          }}>
            <span>Question <strong style={{ color: 'var(--text-primary)' }}>{currentQuestionIndex + 1}</strong> of {questions.length}</span>
            <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>
              Target: {currentQ?.concept}
            </span>
          </div>

          <div style={{
            height: 6,
            background: 'var(--bg-surface-subtle)',
            borderRadius: 3,
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              background: 'linear-gradient(90deg, var(--brand-primary), var(--brand-mint))',
              transition: 'width 0.2s ease'
            }} />
          </div>

          {/* Question Box */}
          <div style={{
            background: 'var(--bg-surface-subtle)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '14px',
            padding: '20px'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: 1.5,
              color: 'var(--text-primary)',
              margin: 0
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
                padding: '14px 18px',
                borderRadius: '10px',
                border: '1px solid var(--border-subtle)',
                background: '#FFFFFF',
                cursor: isAnswerSubmitted ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all var(--transition-fast)',
                textAlign: 'left',
                boxShadow: 'var(--shadow-resting)'
              };

              if (!isAnswerSubmitted) {
                if (isSelected) {
                  optionStyle.borderColor = 'var(--brand-primary)';
                  optionStyle.background = 'var(--brand-primary-subtle)';
                  optionStyle.boxShadow = 'var(--shadow-selected)';
                }
              } else {
                if (isCorrect) {
                  optionStyle.borderColor = 'var(--brand-mint)';
                  optionStyle.background = 'var(--brand-mint-subtle)';
                } else if (isSelected && !isCorrect) {
                  optionStyle.borderColor = 'var(--brand-rose)';
                  optionStyle.background = '#FDF2F8';
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  style={optionStyle}
                  className={!isAnswerSubmitted ? "bf-card interactive" : ""}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: isSelected ? 'var(--brand-primary)' : 'var(--bg-surface-subtle)',
                      color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700,
                      flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {option}
                    </span>
                  </div>

                  {isAnswerSubmitted && (
                    <div>
                      {isCorrect && <CheckCircle2 size={18} color="#1F7C67" />}
                      {isSelected && !isCorrect && <XCircle size={18} color="#E11D48" />}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Rationale / Explanation Box */}
          {isAnswerSubmitted && (
            <div className="animate-fade-in callout-lavender" style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: '12px', color: 'var(--brand-primary)' }}>
                <HelpCircle size={14} />
                <span>EXPLANATION & SOURCE GROUNDING</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5, margin: 0 }}>
                {currentQ?.explanation}
              </p>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontStyle: 'italic', marginTop: 4 }}>
                Source Grounded: Verified against ingested research facts.
              </div>
            </div>
          )}

          {/* Bottom Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, marginTop: 4 }}>
            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="btn btn-primary"
                style={{ minWidth: 140 }}
              >
                <span>Confirm Answer</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="btn btn-primary"
                style={{ minWidth: 140 }}
              >
                <span>{currentQuestionIndex + 1 === questions.length ? 'View Diagnostic Report' : 'Next Question'}</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        </>
      ) : (
        /* QUIZ REPORT / SCORE CARD */
        <div className="animate-fade-in" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          padding: '24px 0'
        }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: percentage >= 70 ? 'var(--brand-mint-subtle)' : 'var(--brand-primary-subtle)',
            border: `2px solid ${percentage >= 70 ? 'var(--brand-mint)' : 'var(--brand-primary)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: percentage >= 70 ? '#1F7C67' : 'var(--brand-primary)'
          }}>
            <Award size={40} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
              Diagnostic Assessment Complete
            </h3>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              You scored <strong style={{ color: 'var(--text-primary)' }}>{score}</strong> out of <strong style={{ color: 'var(--text-primary)' }}>{questions.length}</strong> ({percentage}%)
            </div>
          </div>

          {/* Concepts to Revise */}
          {quizData.conceptsToRevise && quizData.conceptsToRevise.length > 0 && (
            <div style={{
              width: '100%',
              maxWidth: 500,
              background: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', fontWeight: 700, color: 'var(--brand-primary)', marginBottom: 8 }}>
                <BookOpen size={14} />
                <span>RECOMMENDED TOPICS FOR REVISION</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {quizData.conceptsToRevise.map((c, i) => (
                  <span key={i} className="badge badge-primary">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={handleRestart}
              className="btn btn-secondary"
            >
              <RotateCcw size={14} />
              <span>Retry Diagnostic Quiz</span>
            </button>
            <button
              onClick={onRegenerate}
              className="btn btn-primary"
            >
              <Sparkles size={14} />
              <span>Generate New Questions</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
