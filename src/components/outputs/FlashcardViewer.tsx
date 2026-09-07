import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Shuffle, 
  CheckCircle, 
  Copy, 
  Check 
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
      gap: 20,
      background: '#FFFFFF'
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
            <span className="badge badge-primary">ACTIVE RECALL • 3D FLASHCARDS</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Card {currentIndex + 1} of {cards.length}
            </span>
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
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
            {copied ? <Check size={13} color="var(--brand-mint)" /> : <Copy size={13} />}
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
        fontSize: '12px',
        color: 'var(--text-secondary)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>Deck Progress:</span>
          <strong style={{ color: 'var(--text-primary)' }}>{currentIndex + 1} / {cards.length}</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>Mastered:</span>
          <strong style={{ color: '#1F7C67' }}>{masteredIds.length} / {cards.length}</strong>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        height: 6,
        background: 'var(--bg-surface-subtle)',
        borderRadius: 3,
        overflow: 'hidden'
      }}>
        <div style={{
          height: '100%',
          width: `${((currentIndex + 1) / cards.length) * 100}%`,
          background: 'linear-gradient(90deg, var(--brand-primary), var(--brand-mint))',
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
            borderRadius: '14px'
          }}
        >
          {/* FRONT FACE (QUESTION) */}
          <div
            className="backface-hidden"
            style={{
              position: 'absolute',
              inset: 0,
              background: '#FFFFFF',
              border: '1px solid var(--border-subtle)',
              borderRadius: '14px',
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-resting)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-primary">
                {currentCard?.category || 'CONCEPT TEST'}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Click card to reveal answer ⮐
              </span>
            </div>

            <div style={{ textAlign: 'center', padding: '16px 8px' }}>
              <div style={{ fontSize: '11px', color: 'var(--brand-primary)', fontWeight: 700, letterSpacing: '0.04em', marginBottom: 8, textTransform: 'uppercase' }}>
                QUESTION {currentIndex + 1}
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                lineHeight: 1.45,
                color: 'var(--text-primary)',
                margin: 0
              }}>
                {currentCard?.question}
              </h3>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontSize: '12px',
              color: 'var(--text-muted)'
            }}>
              <RotateCw size={13} />
              <span>Click to flip</span>
            </div>
          </div>

          {/* BACK FACE (ANSWER) */}
          <div
            className="backface-hidden rotate-y-180"
            style={{
              position: 'absolute',
              inset: 0,
              background: '#FBFBFE',
              border: '1.5px solid var(--brand-primary)',
              borderRadius: '14px',
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-selected)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-mint">
                VERIFIED ANSWER
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Click to return to question
              </span>
            </div>

            <div style={{ padding: '16px 8px' }}>
              <p style={{
                fontSize: '15px',
                color: 'var(--text-primary)',
                lineHeight: 1.6,
                fontWeight: 500,
                margin: 0
              }}>
                {currentCard?.answer}
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: 12
            }}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Mastery Status
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(currentCard?.id);
                }}
                className={`btn btn-sm ${masteredIds.includes(currentCard?.id) ? 'btn-mint' : 'btn-secondary'}`}
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
          style={{ color: 'var(--brand-primary)' }}
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
