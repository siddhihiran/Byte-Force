import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  ArrowRight, 
  FileText, 
  Layers, 
  Search 
} from 'lucide-react';
import { HistoryEntry } from '../../types';

interface HistoryPageProps {
  historyEntries: HistoryEntry[];
  onReopenEntry: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
  onDeleteEntry: (id: string) => void;
  onGoToWorkspace: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  historyEntries,
  onReopenEntry,
  onClearHistory,
  onDeleteEntry,
  onGoToWorkspace
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = historyEntries.filter(e => 
    e.sourceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.purposes.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 20,
        flexWrap: 'wrap',
        gap: 16
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: '#F3F1FC',
              border: '1px solid #E9E8F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-primary)'
            }}>
              <History size={18} />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
              Transformation History
            </h1>
            <span className="badge" style={{
              fontSize: '0.72rem',
              padding: '3px 9px',
              background: '#EBFBF7',
              color: '#1F7C67',
              border: '1px solid #BFEFDE',
              fontWeight: 700
            }}>
              {historyEntries.length} Saved Run{historyEntries.length !== 1 ? 's' : ''}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
            Inspect past source documents, transformed assets, and reload any previous session.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={onGoToWorkspace}
            className="btn btn-primary btn-sm"
          >
            <Layers size={14} />
            <span>New Transformation</span>
          </button>

          {historyEntries.length > 0 && (
            <button
              onClick={onClearHistory}
              className="btn btn-secondary btn-sm"
              style={{ color: '#E11D48' }}
            >
              <Trash2 size={14} />
              <span>Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {historyEntries.length > 0 && (
        <div style={{ position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: 13 }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search history by document title or purpose (e.g. 'Renewable', 'Quiz', 'Flashcards')..."
            className="input-control"
            style={{ paddingLeft: 42, height: 42, fontSize: '0.875rem' }}
          />
        </div>
      )}

      {/* History Grid */}
      {filteredEntries.length === 0 ? (
        <div className="bf-card" style={{
          padding: '60px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          background: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: '16px'
        }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: '#FAFAFB',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <History size={26} color="var(--text-muted)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
              {searchTerm ? 'No Matching Transformations Found' : 'No Transformation History Yet'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: 420, margin: 0, lineHeight: 1.5 }}>
              {searchTerm ? 'Try a different search term or clear the filter.' : 'When you ingest a source and transform it into assets, it will be automatically saved here for instant re-opening.'}
            </p>
          </div>
          <button onClick={onGoToWorkspace} className="btn btn-primary">
            Launch Transformation Workspace
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 16 }}>
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bf-card"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 14,
                position: 'relative',
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                boxShadow: 'var(--shadow-resting)'
              }}
            >
              {/* Header */}
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FileText size={16} color="var(--brand-primary)" />
                    <span className="badge" style={{
                      fontSize: '0.65rem',
                      background: '#F3F1FC',
                      color: 'var(--brand-primary)',
                      border: '1px solid #E9E8F5',
                      fontWeight: 700
                    }}>
                      {entry.sourceType.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {entry.timestamp}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteEntry(entry.id);
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '2px 6px', color: '#E11D48' }}
                      title="Delete entry"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.3 }}>
                  {entry.sourceTitle}
                </h3>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span>{entry.wordCount} words</span>
                  <span>•</span>
                  <span>{entry.assets.length} Generated Output Asset{entry.assets.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Purpose Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                  {entry.purposes.map((p, i) => (
                    <span key={i} className="badge" style={{
                      fontSize: '0.65rem',
                      background: '#F3F1FC',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      {p.replace('_', ' ').toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reopen Action Footer */}
              <button
                onClick={() => onReopenEntry(entry)}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'space-between', marginTop: 6 }}
              >
                <span>Reopen Assets in Workspace</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
