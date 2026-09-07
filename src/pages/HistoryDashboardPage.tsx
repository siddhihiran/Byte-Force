import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Search, 
  FileText, 
  ArrowRight, 
  Plus
} from 'lucide-react';
import { HistoryEntry } from '../types';

interface HistoryDashboardPageProps {
  historyEntries: HistoryEntry[];
  onViewEntry: (entry: HistoryEntry) => void;
  onClearHistory: () => void;
  onDeleteEntry: (id: string) => void;
  onGoToWorkflow: () => void;
}

type FilterCategory = 'all' | 'summaries' | 'quizzes' | 'ppts' | 'study_cards';

export const HistoryDashboardPage: React.FC<HistoryDashboardPageProps> = ({
  historyEntries,
  onViewEntry,
  onClearHistory,
  onDeleteEntry,
  onGoToWorkflow
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  // Filter entries based on search term and category
  const filteredEntries = historyEntries.filter(entry => {
    const matchesSearch = entry.sourceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.purposes.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'all') return true;
    if (activeFilter === 'summaries') return entry.purposes.includes('summary');
    if (activeFilter === 'quizzes') return entry.purposes.includes('quiz');
    if (activeFilter === 'ppts') return entry.purposes.includes('presentation_outline') || entry.purposes.includes('speaking_script');
    if (activeFilter === 'study_cards') return entry.purposes.includes('flashcards');

    return true;
  });

  return (
    <div className="animate-fade-in" style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Header */}
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
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
              Document Dashboard & History
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
            Inspect previously transformed documents, browse multi-format outputs, and reload results instantly.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={onGoToWorkflow}
            className="btn btn-primary btn-sm"
          >
            <Plus size={14} />
            <span>New Document</span>
          </button>

          {historyEntries.length > 0 && (
            <button
              onClick={onClearHistory}
              className="btn btn-secondary btn-sm"
              style={{ color: '#E11D48' }}
              title="Clear all saved history"
            >
              <Trash2 size={14} />
              <span>Clear History</span>
            </button>
          )}
        </div>
      </div>

      {/* Search Bar & Category Filter Chips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: 14, top: 13 }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents by title or topic (e.g. 'Renewable Energy', 'Healthcare', 'Quiz')..."
            className="input-control"
            style={{ paddingLeft: 42, height: 42, fontSize: '0.875rem' }}
          />
        </div>

        {/* Filter Chips: All / Summaries / Quizzes / PPTs / Study Cards */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginRight: 4 }}>
            Filter by:
          </span>

          {[
            { id: 'all', label: 'All Documents' },
            { id: 'summaries', label: 'Summaries' },
            { id: 'quizzes', label: 'Quizzes' },
            { id: 'ppts', label: 'PPTs & Scripts' },
            { id: 'study_cards', label: 'Study Cards' }
          ].map(chip => {
            const isActive = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setActiveFilter(chip.id as FilterCategory)}
                style={{
                  padding: '5px 14px',
                  borderRadius: 20,
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  border: isActive ? '1px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                  background: isActive ? '#F3F1FC' : '#FFFFFF',
                  color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease'
                }}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* History Grid or Empty State */}
      {filteredEntries.length === 0 ? (
        /* Empty State */
        <div className="bf-card animate-fade-in" style={{
          padding: '64px 24px',
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
            width: 60,
            height: 60,
            borderRadius: 16,
            background: '#F3F1FC',
            border: '1px solid #E9E8F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--brand-primary)'
          }}>
            <History size={30} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
              {searchTerm || activeFilter !== 'all' ? 'No Matching Documents Found' : 'No documents yet — upload your first one'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: 440, margin: 0, lineHeight: 1.5 }}>
              {searchTerm || activeFilter !== 'all'
                ? 'Try resetting the filters or searching for another keyword.'
                : 'Ingest a research paper, notes, or brief to generate multi-format assets saved automatically to your dashboard.'}
            </p>
          </div>
          <button onClick={onGoToWorkflow} className="btn btn-primary" style={{ marginTop: 8 }}>
            <span>Upload First Document</span>
            <ArrowRight size={15} />
          </button>
        </div>
      ) : (
        /* Document Cards Grid */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: 18
        }}>
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="bf-card interactive"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 14,
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: '14px',
                boxShadow: 'var(--shadow-resting)'
              }}
            >
              <div>
                {/* Card Top Row */}
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

                {/* Document Title */}
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.35 }}>
                  {entry.sourceTitle}
                </h3>

                {/* Metadata */}
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span>{entry.wordCount} words</span>
                  <span>•</span>
                  <span>{entry.assets.length} Generated Output{entry.assets.length !== 1 ? 's' : ''}</span>
                </div>

                {/* Small Pastel Output Tags */}
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

              {/* View Action Button -> Opens Document's Results Page */}
              <button
                onClick={() => onViewEntry(entry)}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'space-between', marginTop: 8 }}
              >
                <span>View Results</span>
                <ArrowRight size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
