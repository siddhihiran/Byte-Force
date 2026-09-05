import React, { useState } from 'react';
import { X, Settings, ShieldCheck, Key, Zap, Check } from 'lucide-react';
import { AppSettings } from '../../services/StorageService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onSaveSettings: (settings: AppSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings
}) => {
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings(formData);
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content animate-fade-in" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: 540, padding: '28px', border: '1px solid rgba(56, 189, 248, 0.25)' }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 16,
          marginBottom: 20
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-cyan)'
            }}>
              <Settings size={18} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                Transformation Engine Settings
              </h2>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Demo reliability & LLM provider configuration
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            style={{ padding: 6 }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* DEMO MODE TOGGLE CARD */}
          <div style={{
            background: 'rgba(56, 189, 248, 0.05)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '18px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16
          }}>
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#38bdf8',
                flexShrink: 0
              }}>
                <Zap size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff' }}>
                  Deterministic Demo Engine
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 4 }}>
                  Guarantees 100% fail-proof execution during live judge pitches. Uses pre-computed, internally consistent sample transformations without external API latency.
                </div>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginTop: 4 }}>
              <input
                type="checkbox"
                checked={formData.useDemoMode}
                onChange={(e) => setFormData({ ...formData, useDemoMode: e.target.checked })}
                className="checkbox-custom"
                style={{ width: 20, height: 20 }}
              />
            </label>
          </div>

          {/* REAL API KEY CONFIGURATION */}
          <div style={{
            background: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            opacity: formData.useDemoMode ? 0.6 : 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Key size={16} color="var(--brand-indigo)" />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff' }}>
                Live LLM Provider (Optional)
              </span>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              {(['gemini', 'openai'] as const).map(prov => (
                <button
                  key={prov}
                  type="button"
                  onClick={() => setFormData({ ...formData, provider: prov })}
                  className={`btn btn-sm ${formData.provider === prov ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ flex: 1, textTransform: 'capitalize' }}
                >
                  {prov === 'gemini' ? 'Google Gemini' : 'OpenAI'}
                </button>
              ))}
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>
                Client-Side API Key (Stored securely in local browser storage only)
              </label>
              <input
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                placeholder="AIzaSy... or sk-proj-..."
                className="input-control"
                style={{ fontSize: '0.85rem' }}
                disabled={formData.useDemoMode}
              />
            </div>
          </div>

          {/* Hackathon Pitch Reliability Notice */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: '0.75rem',
            color: '#10b981',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)'
          }}>
            <ShieldCheck size={16} style={{ flexShrink: 0 }} />
            <span>ByteForce architecture automatically falls back to Demo mode if offline or network drops.</span>
          </div>

          {/* Action Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 10,
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 18
          }}>
            <button
              onClick={onClose}
              className="btn btn-ghost btn-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn btn-primary btn-sm"
              style={{ minWidth: 120 }}
            >
              {savedToast ? <Check size={14} /> : null}
              <span>{savedToast ? 'Saved!' : 'Save Settings'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
