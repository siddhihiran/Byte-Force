import React from 'react';
import { 
  Sparkles, 
  Layers, 
  History, 
  Settings, 
  Zap, 
  Compass, 
  BookOpen, 
  HelpCircle 
} from 'lucide-react';
import { AppSettings } from '../../services/StorageService';

interface HeaderProps {
  onOpenTemplates: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenGuidedDemo: () => void;
  onQuickDemo: () => void;
  historyCount: number;
  settings: AppSettings;
  activeView: 'workspace' | 'history' | 'landing';
  onNavigate: (view: 'workspace' | 'history' | 'landing') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTemplates,
  onOpenHistory,
  onOpenSettings,
  onOpenGuidedDemo,
  onQuickDemo,
  historyCount,
  settings,
  activeView,
  onNavigate
}) => {
  return (
    <header className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderRadius: 0,
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(8, 10, 15, 0.9)',
      backdropFilter: 'blur(20px)'
    }}>
      {/* Brand & Main App Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button 
          onClick={() => onNavigate('workspace')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 10, 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            textAlign: 'left'
          }}
          aria-label="ByteForce Home"
        >
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.25)'
          }}>
            <Zap size={19} color="#ffffff" fill="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ 
                fontSize: '1.15rem', 
                fontWeight: 800, 
                letterSpacing: '-0.03em', 
                color: '#ffffff' 
              }}>
                BYTEFORCE
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
                SIH26154
              </span>
            </div>
            <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Transform Once. Create Everywhere.
            </div>
          </div>
        </button>

        {/* Primary View Navigation Pills */}
        <div style={{ display: 'flex', gap: 4, marginLeft: 16 }}>
          <button
            onClick={() => onNavigate('workspace')}
            className={`btn btn-sm ${activeView === 'workspace' ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ fontSize: '0.8rem' }}
          >
            <Layers size={14} color={activeView === 'workspace' ? 'var(--brand-cyan)' : undefined} />
            <span>Workspace</span>
          </button>
          <button
            onClick={() => onNavigate('history')}
            className={`btn btn-sm ${activeView === 'history' ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ fontSize: '0.8rem' }}
          >
            <History size={14} />
            <span>History</span>
            {historyCount > 0 && (
              <span style={{
                background: 'var(--brand-cyan)',
                color: '#000000',
                fontWeight: 700,
                fontSize: '0.65rem',
                padding: '1px 5px',
                borderRadius: 8
              }}>
                {historyCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate('landing')}
            className={`btn btn-sm ${activeView === 'landing' ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ fontSize: '0.8rem' }}
          >
            <Compass size={14} />
            <span>Product Overview</span>
          </button>
        </div>
      </div>

      {/* Action Controls & Demo Launcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Guided Demo Tour for Judges */}
        <button
          onClick={onOpenGuidedDemo}
          className="btn btn-secondary btn-sm"
          title="Step-by-Step Guided Architecture Tour"
        >
          <HelpCircle size={14} color="#818cf8" />
          <span>Guided Tour</span>
        </button>

        {/* Template Packs */}
        <button
          onClick={onOpenTemplates}
          className="btn btn-secondary btn-sm"
          title="Curated Transformation Packs"
        >
          <Sparkles size={14} color="#38bdf8" />
          <span>Templates</span>
        </button>

        {/* 1-Click Fast Live Demo for Judges */}
        <button
          onClick={onQuickDemo}
          className="btn btn-primary btn-sm"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #4f46e5 100%)',
            boxShadow: '0 0 16px rgba(56, 189, 248, 0.3)'
          }}
        >
          <Zap size={14} />
          <span>Live Demo (1-Click)</span>
        </button>

        {/* Engine Status / Mode Pill */}
        <button
          onClick={onOpenSettings}
          className="btn btn-ghost btn-sm"
          style={{
            border: '1px solid var(--border-subtle)',
            fontSize: '0.75rem',
            padding: '5px 8px'
          }}
          title="Engine Configuration & API Settings"
        >
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: settings.useDemoMode ? '#10b981' : '#38bdf8',
            boxShadow: settings.useDemoMode ? '0 0 8px #10b981' : '0 0 8px #38bdf8'
          }} />
          <span style={{ color: 'var(--text-secondary)' }}>
            {settings.useDemoMode ? 'Demo Engine' : 'Live API'}
          </span>
          <Settings size={13} color="var(--text-muted)" />
        </button>
      </div>
    </header>
  );
};
