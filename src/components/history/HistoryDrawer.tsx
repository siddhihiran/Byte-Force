import React from 'react';
import { X, History, Trash2, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { HistoryEntry } from '../../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  historyEntries: HistoryEntry[];
  onRestoreEntry: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  historyEntries,
  onRestoreEntry,
  onClearHistory
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          maxWidth: 440,
          width: '100%',
          height: '100%',
          borderRadius: 0,
          borderRight: 'none',
          borderTop: 'none',
          borderBottom: 'none',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 16,
          marginBottom: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <History size={18} color="var(--brand-cyan)" />
            <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              Transformation History
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {historyEntries.length > 0 && (
              <button
                onClick={onClearHistory}
                className="btn btn-ghost btn-sm"
                title="Clear History"
                style={{ color: 'var(--brand-rose)' }}
              >
                <Trash2 size={14} />
              </button>
            )}
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm"
              style={{ padding: 4 }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* History List or Empty State */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {historyEntries.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--text-muted)'
            }}>
              <History size={32} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>No Transformations Yet</div>
              <div style={{ fontSize: '0.75rem', marginTop: 4 }}>
                Your completed transformation runs will automatically save here for fast retrieval.
              </div>
            </div>
          ) : (
            historyEntries.map((entry) => (
              <div
                key={entry.id}
                className="glass-card"
                style={{
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  cursor: 'pointer'
                }}
                onClick={() => {
                  onRestoreEntry(entry);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FileText size={15} color="var(--brand-cyan)" />
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, color: '#ffffff' }}>
                      {entry.sourceTitle}
                    </span>
                  </div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.6rem' }}>
                    Completed
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {entry.purposes.map((p, i) => (
                    <span key={i} className="badge badge-muted" style={{ fontSize: '0.65rem' }}>
                      {p.replace('_', ' ')}
                    </span>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  paddingTop: 6,
                  fontSize: '0.7rem',
                  color: 'var(--text-dim)'
                }}>
                  <span>{entry.timestamp}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: 'var(--brand-cyan)', fontWeight: 600 }}>
                    Restore <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
