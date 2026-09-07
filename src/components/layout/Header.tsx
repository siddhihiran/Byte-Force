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
  onOpenHistory: _onOpenHistory,
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
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '0 32px',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16
    }}>
      {/* Brand & Main View Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <button 
          onClick={() => onNavigate('workspace')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12, 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            padding: '4px 0',
            textAlign: 'left'
          }}
          aria-label="ByteForce Home"
        >
          {/* Logo Mark: Soft gradient rounded-square badge (indigo→mint) */}
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: 'var(--grad-badge)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(124, 111, 232, 0.25)'
          }}>
            <Zap size={18} color="#FFFFFF" fill="#FFFFFF" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ 
                fontSize: '1.05rem', 
                fontWeight: 700, 
                letterSpacing: '-0.02em', 
                color: 'var(--text-primary)' 
              }}>
                BYTEFORCE
              </span>
              <span className="badge badge-primary" style={{ fontSize: '0.625rem', padding: '1px 6px' }}>
                SIH26154
              </span>
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 400 }}>
              Transform Once. Create Everywhere.
            </div>
          </div>
        </button>

        {/* View Switcher Tabs: Pill-shaped tabs with active = light indigo fill */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg-surface-subtle)',
          padding: 3,
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
          gap: 2
        }} aria-label="Main Navigation">
          <button
            onClick={() => onNavigate('workspace')}
            className={`nav-pill ${activeView === 'workspace' ? 'active' : ''}`}
          >
            <Layers size={13} />
            <span>Workspace</span>
          </button>
          
          <button
            onClick={() => onNavigate('history')}
            className={`nav-pill ${activeView === 'history' ? 'active' : ''}`}
          >
            <History size={13} />
            <span>History</span>
            {historyCount > 0 && (
              <span style={{
                background: 'var(--brand-primary)',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.625rem',
                padding: '1px 6px',
                borderRadius: 99
              }}>
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onNavigate('landing')}
            className={`nav-pill ${activeView === 'landing' ? 'active' : ''}`}
          >
            <Compass size={13} />
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
          style={{ height: 34 }}
        >
          <HelpCircle size={13} color="var(--brand-primary)" />
          <span>Guided Tour</span>
        </button>

        {/* Curated Templates */}
        <button
          onClick={onOpenTemplates}
          className="btn btn-secondary btn-sm"
          title="Curated Purpose Packs"
          style={{ height: 34 }}
        >
          <Sparkles size={13} color="var(--brand-primary)" />
          <span>Templates</span>
        </button>

        {/* 1-Click Zero-Friction Demo */}
        <button
          onClick={onQuickDemo}
          className="btn btn-primary btn-sm"
          style={{ height: 34, padding: '0 14px' }}
          title="Launch Deterministic Demo with AI in Healthcare"
        >
          <Zap size={13} />
          <span>1-Click Demo</span>
        </button>

        {/* Engine Status / Settings */}
        <button
          onClick={onOpenSettings}
          className="btn btn-secondary btn-sm"
          style={{
            height: 34,
            padding: '0 10px',
            gap: 7
          }}
          title="Configure Engine Provider & API Keys"
        >
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: settings.useDemoMode ? 'var(--brand-mint)' : 'var(--brand-primary)',
            boxShadow: settings.useDemoMode ? '0 0 6px var(--brand-mint)' : '0 0 6px var(--brand-primary)'
          }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {settings.useDemoMode ? 'Demo Engine' : 'Live API'}
          </span>
          <Settings size={12} color="var(--text-muted)" />
        </button>
      </div>
    </header>
  );
};
