import React, { useState } from 'react';
import { X, Settings, ShieldCheck, Key, Zap, Check, AlertCircle } from 'lucide-react';
import { AppSettings, StorageService } from '../../services/StorageService';

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
        style={{ maxWidth: 520, padding: '24px' }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Settings size={18} color="var(--brand-cyan)" />
            <div>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
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
            style={{ padding: 4 }}
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
            padding: '16px',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16
          }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <Zap size={22} color="#38bdf8" style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: '#ffffff' }}>
                  Deterministic Demo Engine
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 2 }}>
                  Guarantees 100% fail-proof execution during live judge pitches. Uses pre-computed, internally consistent sample transformations without external API latency.
                </div>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.useDemoMode}
                onChange={(e) => setFormData({ ...formData, useDemoMode: e.target.checked })}
                className="checkbox-custom"
              />
            </label>
          </div>

          {/* REAL API KEY CONFIGURATION */}
          <div style={{
            background: 'var(--bg-canvas)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            opacity: formData.useDemoMode ? 0.6 : 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Key size={15} color="var(--brand-indigo)" />
              <span style={{ fontSize: '0.825rem', fontWeight: 700 }}>
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
              <label style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                Client-Side API Key (Stored securely in your local browser only)
              </label>
              <input
                type="password"
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                placeholder="AIzaSy... or sk-proj-..."
                className="input-control"
                style={{ fontSize: '0.8rem' }}
                disabled={formData.useDemoMode}
              />
            </div>
          </div>

          {/* Hackathon Pitch Reliability Notice */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.725rem',
            color: '#10b981'
          }}>
            <ShieldCheck size={14} />
            <span>ByteForce architecture automatically falls back to Demo mode if network drops.</span>
          </div>

          {/* Action Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 10,
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 16
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
              style={{ minWidth: 100 }}
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
