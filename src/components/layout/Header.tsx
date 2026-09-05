import React from 'react';
import { 
  Sparkles, 
  Layers, 
  History, 
  Settings, 
  Zap, 
  Compass, 
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
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(9, 12, 19, 0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '0 24px',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16
    }}>
      {/* Brand & Main View Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button 
          onClick={() => onNavigate('workspace')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 11, 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            padding: '4px 0',
            textAlign: 'left'
          }}
          aria-label="ByteForce Home"
        >
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: 'linear-gradient(135deg, #0284c7 0%, #4f46e5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Zap size={18} color="#ffffff" fill="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ 
                fontSize: '1.05rem', 
                fontWeight: 800, 
                letterSpacing: '-0.03em', 
                color: '#ffffff' 
              }}>
                BYTEFORCE
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.625rem', padding: '1px 5px' }}>
                SIH26154
              </span>
            </div>
            <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.01em' }}>
              Transform Once. Create Everywhere.
            </div>
          </div>
        </button>

        {/* View Switcher Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(0, 0, 0, 0.35)',
          padding: 3,
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          gap: 2
        }} aria-label="Main Navigation">
          <button
            onClick={() => onNavigate('workspace')}
            className={`tab-btn ${activeView === 'workspace' ? 'active' : ''}`}
            style={{ fontSize: '0.775rem', padding: '5px 12px' }}
          >
            <Layers size={13} color={activeView === 'workspace' ? 'var(--brand-cyan)' : 'var(--text-dim)'} />
            <span>Workspace</span>
          </button>
          
          <button
            onClick={() => onNavigate('history')}
            className={`tab-btn ${activeView === 'history' ? 'active' : ''}`}
            style={{ fontSize: '0.775rem', padding: '5px 12px' }}
          >
            <History size={13} color={activeView === 'history' ? 'var(--brand-cyan)' : 'var(--text-dim)'} />
            <span>History</span>
            {historyCount > 0 && (
              <span style={{
                background: 'var(--brand-cyan)',
                color: '#07090d',
                fontWeight: 700,
                fontSize: '0.625rem',
                padding: '1px 5px',
                borderRadius: 99
              }}>
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('landing')}
            className={`tab-btn ${activeView === 'landing' ? 'active' : ''}`}
            style={{ fontSize: '0.775rem', padding: '5px 12px' }}
          >
            <Compass size={13} color={activeView === 'landing' ? 'var(--brand-cyan)' : 'var(--text-dim)'} />
            <span>Overview</span>
          </button>
        </nav>
      </div>

      {/* Action Controls & Fast Demo Launcher */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Guided Tour Modal Trigger */}
        <button
          onClick={onOpenGuidedDemo}
          className="btn btn-secondary btn-sm"
          title="Step-by-Step Architecture Tour for Evaluators"
          style={{ height: 32 }}
        >
          <HelpCircle size={13} color="#818cf8" />
          <span>Guided Tour</span>
        </button>

        {/* Curated Templates */}
        <button
          onClick={onOpenTemplates}
          className="btn btn-secondary btn-sm"
          title="Curated Purpose Packs"
          style={{ height: 32 }}
        >
          <Sparkles size={13} color="#38bdf8" />
          <span>Templates</span>
        </button>

        {/* 1-Click Zero-Friction Demo */}
        <button
          onClick={onQuickDemo}
          className="btn btn-primary btn-sm"
          style={{ height: 32, padding: '0 14px' }}
          title="Launch Deterministic Demo with AI in Healthcare"
        >
          <Zap size={13} />
          <span>1-Click Demo</span>
        </button>

        {/* Engine Status / Settings */}
        <button
          onClick={onOpenSettings}
          className="btn btn-ghost btn-sm"
          style={{
            height: 32,
            border: '1px solid var(--border-subtle)',
            padding: '0 10px',
            gap: 7
          }}
          title="Configure Engine Provider & API Keys"
        >
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: settings.useDemoMode ? '#10b981' : '#38bdf8',
            boxShadow: settings.useDemoMode ? '0 0 8px #10b981' : '0 0 8px #38bdf8'
          }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {settings.useDemoMode ? 'Demo Engine' : 'Live API'}
          </span>
          <Settings size={12} color="var(--text-dim)" />
        </button>
      </div>
    </header>
  );
};
