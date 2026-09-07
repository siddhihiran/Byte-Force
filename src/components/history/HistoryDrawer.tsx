import React from 'react';
import { X, History, Trash2, ArrowRight, FileText } from 'lucide-react';
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
          maxWidth: 460,
          width: '100%',
          height: '100%',
          borderRadius: 0,
          borderRight: 'none',
          borderTop: 'none',
          borderBottom: 'none',
          borderLeft: '1px solid var(--border-subtle)',
          background: '#FFFFFF',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 32px rgba(30, 30, 46, 0.08)'
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
            <div style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#F3F1FC',
              border: '1px solid #E9E8F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-primary)'
            }}>
              <History size={16} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Transformation History
              </h2>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                {historyEntries.length} Saved Run{historyEntries.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {historyEntries.length > 0 && (
              <button
                onClick={onClearHistory}
                className="btn btn-ghost btn-sm"
                title="Clear All History"
                style={{ color: '#E11D48' }}
              >
                <Trash2 size={14} />
              </button>
            )}
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm"
              style={{ padding: 6 }}
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
              padding: '80px 20px',
              color: 'var(--text-secondary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12
            }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: '#FAFAFB',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)'
              }}>
                <History size={24} />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>No Transformations Yet</div>
                <div style={{ fontSize: '0.78rem', marginTop: 4, lineHeight: 1.5, maxWidth: 280, color: 'var(--text-secondary)' }}>
                  Your completed transformation runs will automatically save here for fast retrieval.
                </div>
              </div>
            </div>
          ) : (
            historyEntries.map((entry) => (
              <div
                key={entry.id}
                className="bf-card interactive"
                style={{
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  cursor: 'pointer',
                  background: '#FAFAFB',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '12px'
                }}
                onClick={() => {
                  onRestoreEntry(entry);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FileText size={15} color="var(--brand-primary)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {entry.sourceTitle}
                    </span>
                  </div>
                  <span className="badge" style={{
                    fontSize: '0.62rem',
                    flexShrink: 0,
                    background: '#EBFBF7',
                    color: '#1F7C67',
                    border: '1px solid #BFEFDE',
                    fontWeight: 700
                  }}>
                    Completed
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {entry.purposes.map((p, i) => (
                    <span key={i} className="badge" style={{
                      fontSize: '0.65rem',
                      background: '#F3F1FC',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      {p.replace('_', ' ')}
                    </span>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: 8,
                  fontSize: '0.72rem',
                  color: 'var(--text-secondary)'
                }}>
                  <span>{entry.timestamp}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--brand-primary)', fontWeight: 700 }}>
                    Restore <ArrowRight size={12} />
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
