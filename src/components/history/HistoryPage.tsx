import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  ArrowRight, 
  FileText, 
  Clock, 
  Layers, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
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
    <div style={{ maxWidth: 1140, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
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
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'var(--brand-cyan-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <History size={16} color="var(--brand-cyan)" />
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              Transformation History
            </h1>
            <span className="badge badge-cyan">
              {historyEntries.length} Saved Run{historyEntries.length !== 1 ? 's' : ''}
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
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
              style={{ color: 'var(--brand-rose)' }}
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
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: 12 }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search history by document title or purpose (e.g. 'Renewable', 'Quiz', 'Flashcards')..."
            className="input-control"
            style={{ paddingLeft: 40, height: 42, fontSize: '0.875rem' }}
          />
        </div>
      )}

      {/* History Grid */}
      {filteredEntries.length === 0 ? (
        <div className="glass-panel" style={{
          padding: '60px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16
        }}>
          <div style={{
            width: 54,
            height: 54,
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.03)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <History size={26} color="var(--text-muted)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 6 }}>
              {searchTerm ? 'No Matching Transformations Found' : 'No Transformation History Yet'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: 420 }}>
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
              className="glass-card"
              style={{
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 14,
                position: 'relative'
              }}
            >
              {/* Header */}
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FileText size={16} color="var(--brand-cyan)" />
                    <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>
                      {entry.sourceType.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      {entry.timestamp}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteEntry(entry.id);
                      }}
                      className="btn btn-ghost btn-sm"
                      style={{ padding: '2px 4px', color: 'var(--brand-rose)' }}
                      title="Delete entry"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginBottom: 4 }}>
                  {entry.sourceTitle}
                </h3>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span>{entry.wordCount} words</span>
                  <span>•</span>
                  <span>{entry.assets.length} Generated Output Asset{entry.assets.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Purpose Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {entry.purposes.map((p, i) => (
                    <span key={i} className="badge badge-muted" style={{ fontSize: '0.65rem' }}>
                      {p.replace('_', ' ').toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reopen Action Footer */}
              <button
                onClick={() => onReopenEntry(entry)}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'space-between', marginTop: 4 }}
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
