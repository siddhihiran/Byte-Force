import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Shuffle, 
  CheckCircle, 
  Copy, 
  Check, 
  Layers 
} from 'lucide-react';
import { OutputAsset, FlashcardData, FlashcardItem } from '../../types';

interface FlashcardViewerProps {
  asset: OutputAsset;
  onRegenerate: () => void;
}

export const FlashcardViewer: React.FC<FlashcardViewerProps> = ({ asset, onRegenerate }) => {
  const payloadData = (asset.payload as { type: 'flashcards'; data: FlashcardData }).data;
  const [cards, setCards] = useState<FlashcardItem[]>(payloadData.cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const currentCard = cards[currentIndex] || cards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 140);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 140);
  };

  const toggleMastered = (id: string) => {
    setMasteredIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
  };

  const handleCopyDeck = () => {
    const text = cards.map((c, i) => `Card ${i + 1}: ${c.question}\nAnswer: ${c.answer}\n`).join('\n---\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bf-card animate-fade-in" style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }}>
      {/* Header & Controls Toolbar */}
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
            <span className="badge badge-indigo">ACTIVE RECALL • 3D FLASHCARDS</span>
            <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
              Card {currentIndex + 1} of {cards.length}
            </span>
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
            {asset.title}
          </h2>
        </div>

        {/* Toolbar buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={handleShuffle}
            className="btn btn-secondary btn-sm"
            title="Shuffle deck"
          >
            <Shuffle size={13} />
            <span>Shuffle</span>
          </button>
          <button
            onClick={handleCopyDeck}
            className="btn btn-secondary btn-sm"
          >
            {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
            <span>Copy Deck</span>
          </button>
          <button
            onClick={onRegenerate}
            className="btn btn-ghost btn-sm"
            title="Regenerate flashcards"
          >
            <RotateCw size={13} />
          </button>
        </div>
      </div>

      {/* Progress & Mastery Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.775rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>Deck Progress:</span>
          <strong style={{ color: '#ffffff' }}>{currentIndex + 1} / {cards.length}</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>Mastered:</span>
          <strong style={{ color: '#10b981' }}>{masteredIds.length} / {cards.length}</strong>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        height: 4,
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${((currentIndex + 1) / cards.length) * 100}%`,
          background: 'linear-gradient(90deg, #6366f1, #38bdf8)',
          transition: 'width 0.25s ease'
        }} />
      </div>

      {/* 3D INTERACTIVE FLIP CARD */}
      <div
        className="perspective-1000"
        style={{
          width: '100%',
          minHeight: 280,
          cursor: 'pointer',
          position: 'relative'
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`preserve-3d ${isFlipped ? 'flipped' : ''}`}
          style={{
            width: '100%',
            height: '100%',
            minHeight: 280,
            position: 'relative',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          {/* FRONT FACE (QUESTION) */}
          <div
            className="backface-hidden"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(145deg, #131926 0%, #0c1018 100%)',
              border: '1.5px solid rgba(99, 102, 241, 0.35)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-md)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-indigo" style={{ fontSize: '0.675rem' }}>
                {currentCard?.category || 'CONCEPT TEST'}
              </span>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                Click card to reveal answer ⮐
              </span>
            </div>

            <div style={{ textAlign: 'center', padding: '16px 8px' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--brand-cyan)', fontWeight: 800, letterSpacing: '0.04em', marginBottom: 8 }}>
                QUESTION {currentIndex + 1}
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                lineHeight: 1.45,
                color: '#ffffff'
              }}>
                {currentCard?.question}
              </h3>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontSize: '0.75rem',
              color: 'var(--text-dim)'
            }}>
              <RotateCw size={12} />
              <span>Click to flip</span>
            </div>
          </div>

          {/* BACK FACE (ANSWER) */}
          <div
            className="backface-hidden rotate-y-180"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(145deg, #0e1a28 0%, #0a111b 100%)',
              border: '1.5px solid rgba(56, 189, 248, 0.45)',
              borderRadius: 'var(--radius-lg)',
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 0 35px rgba(56, 189, 248, 0.15)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.675rem' }}>
                VERIFIED ANSWER
              </span>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                Click to return to question
              </span>
            </div>

            <div style={{ padding: '16px 8px' }}>
              <p style={{
                fontSize: '1.05rem',
                color: '#f8fafc',
                lineHeight: 1.6,
                fontWeight: 500
              }}>
                {currentCard?.answer}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: 12
            }}>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-dim)' }}>
                Mastery Status
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(currentCard?.id);
                }}
                className={`btn btn-sm ${masteredIds.includes(currentCard?.id) ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              >
                <CheckCircle size={13} />
                <span>{masteredIds.includes(currentCard?.id) ? 'Mastered ✓' : 'Mark as Mastered'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4
      }}>
        <button
          onClick={handlePrev}
          className="btn btn-secondary"
          style={{ minWidth: 120 }}
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="btn btn-ghost btn-sm"
          style={{ color: 'var(--brand-cyan)' }}
        >
          <RotateCw size={13} />
          <span>Flip Card</span>
        </button>

        <button
          onClick={handleNext}
          className="btn btn-primary"
          style={{ minWidth: 120 }}
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
