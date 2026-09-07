import React, { useState } from 'react';
import { 
  Settings, 
  Key, 
  Trash2, 
  Check, 
  Zap, 
  Edit3, 
  Lock, 
  AlertTriangle,
  GitBranch
} from 'lucide-react';
import { AppSettings, StorageService } from '../services/StorageService';

interface SettingsProfilePageProps {
  settings: AppSettings;
  onUpdateSettings: (newSettings: AppSettings) => void;
  onClearHistory: () => void;
}

export const SettingsProfilePage: React.FC<SettingsProfilePageProps> = ({
  settings,
  onUpdateSettings,
  onClearHistory
}) => {
  const [formData, setFormData] = useState<AppSettings>(settings);
  const [userName, setUserName] = useState('Siddhi Hiran');
  const [userEmail, setUserEmail] = useState('siddhi@byteforce.ai');
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [savedToast, setSavedToast] = useState(false);
  const [historyClearedToast, setHistoryClearedToast] = useState(false);

  // Preference fields
  const [defaultTone, setDefaultTone] = useState<'simple' | 'professional' | 'academic'>('professional');
  const [defaultDepth, setDefaultDepth] = useState<'quick' | 'deep' | 'decision'>('deep');

  const handleSave = () => {
    onUpdateSettings(formData);
    StorageService.saveSettings(formData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all transformation history? This cannot be undone.')) {
      onClearHistory();
      setHistoryClearedToast(true);
      setTimeout(() => setHistoryClearedToast(false), 2000);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: 840, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28, padding: '12px 0 48px' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: '#F3F1FC',
            border: '1px solid #E9E8F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--brand-primary)'
          }}>
            <Settings size={20} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', margin: 0 }}>
              Settings & Profile
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
              Manage your user profile, generation defaults, LLM providers, and account data
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="btn btn-primary btn-sm"
          style={{ minWidth: 120 }}
        >
          {savedToast ? <Check size={14} /> : null}
          <span>{savedToast ? 'Saved!' : 'Save Changes'}</span>
        </button>
      </div>

      {/* 1. USER INFO SECTION */}
      <section className="bf-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 18, background: '#FFFFFF' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: 12 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            01 • USER PROFILE
          </span>
          <button
            onClick={() => setIsEditingUser(!isEditingUser)}
            className="btn btn-ghost btn-sm"
          >
            <Edit3 size={13} />
            <span>{isEditingUser ? 'Done' : 'Edit Profile'}</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Avatar with gradient & initials */}
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7C6FE8 0%, #6FD6C0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.35rem',
            fontWeight: 800,
            color: '#FFFFFF',
            boxShadow: '0 4px 14px rgba(124, 111, 232, 0.25)',
            flexShrink: 0
          }}>
            {userName.slice(0, 2).toUpperCase()}
          </div>

          <div style={{ flex: 1 }}>
            {isEditingUser ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="input-control"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="input-control"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    {userName}
                  </h3>
                  <span className="badge" style={{ background: '#EBFBF7', color: '#1F7C67', fontWeight: 600, fontSize: '0.65rem' }}>
                    SIH Team Lead
                  </span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                  {userEmail} • ByteForce Content Transformation Suite
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. TRANSFORMATION PREFERENCES SECTION */}
      <section className="bf-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, background: '#FFFFFF' }}>
        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 12 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            02 • GENERATION PREFERENCES
          </span>
        </div>

        {/* Default Tone: Simple / Professional / Academic */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Default Output Tone
            </label>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Controls vocabulary level & style
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { id: 'simple', label: 'Simple & Direct', desc: 'Plain language for broad audiences' },
              { id: 'professional', label: 'Professional SaaS', desc: 'Standard business & executive cadence' },
              { id: 'academic', label: 'Academic & Formal', desc: 'Rigorous citations & technical terms' }
            ].map(t => {
              const isActive = defaultTone === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setDefaultTone(t.id as any)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: isActive ? '2px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                    background: isActive ? '#F3F1FC' : '#FAFAFB',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: isActive ? 'var(--brand-primary)' : 'var(--text-primary)' }}>
                    {t.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                    {t.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Default Synthesis Depth: Quick / Deep Technical / Decision Brief */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Default Synthesis Depth
            </label>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Controls analysis granularity & takeaways
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              { id: 'quick', label: 'Quick Brief (~250 words)', desc: 'High-speed reading' },
              { id: 'deep', label: 'Deep Technical (~600 words)', desc: 'Detailed entity coverage' },
              { id: 'decision', label: 'Decision Summary (~400 words)', desc: 'Action items & strategic takeaways' }
            ].map(d => {
              const isActive = defaultDepth === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setDefaultDepth(d.id as any)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    border: isActive ? '2px solid var(--brand-primary)' : '1px solid var(--border-subtle)',
                    background: isActive ? '#F3F1FC' : '#FAFAFB',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ fontSize: '0.825rem', fontWeight: 700, color: isActive ? 'var(--brand-primary)' : 'var(--text-primary)' }}>
                    {d.label}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                    {d.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Deterministic Demo Mode Card */}
        <div style={{
          background: '#F3F1FC',
          border: '1px solid #E9E8F5',
          borderRadius: 12,
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 16
        }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: '#FFFFFF',
              border: '1px solid #E9E8F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--brand-primary)',
              flexShrink: 0
            }}>
              <Zap size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Deterministic Failsafe Demo Mode
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 2 }}>
                Ensures 100% fail-proof execution for live judge pitches using pre-computed, internally consistent sample outputs.
              </div>
            </div>
          </div>

          <input
            type="checkbox"
            checked={formData.useDemoMode}
            onChange={(e) => setFormData({ ...formData, useDemoMode: e.target.checked })}
            className="checkbox-custom"
            style={{ width: 20, height: 20, accentColor: 'var(--brand-primary)', marginTop: 6 }}
          />
        </div>
      </section>

      {/* 3. ACCOUNT & CONNECTED ENGINES SECTION */}
      <section className="bf-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20, background: '#FFFFFF' }}>
        <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: 12 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            03 • ACCOUNT & CONNECTED ENGINES
          </span>
        </div>

        {/* Connected LLM Provider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Key size={16} color="var(--brand-primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Live AI Provider (Optional)
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
                {prov === 'gemini' ? 'Google Gemini 1.5' : 'OpenAI GPT-4o'}
              </button>
            ))}
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
              Client-Side API Key (Stored locally in your browser storage only)
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

        {/* Connected Accounts */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <GitBranch size={18} color="var(--text-primary)" />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                GitHub Repository Link
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Connected to siddhihiran/Byte-Force
              </div>
            </div>
          </div>
          <span className="badge" style={{ background: '#EBFBF7', color: '#1F7C67', fontWeight: 600, fontSize: '0.65rem' }}>
            Connected
          </span>
        </div>

        {/* Security / Password */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Lock size={18} color="var(--text-secondary)" />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                Account Password
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                Last changed 2 days ago
              </div>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm">
            Change Password
          </button>
        </div>
      </section>

      {/* 4. DANGER ZONE (Subtle red-tinted card at bottom, visually separated) */}
      <section style={{
        background: 'rgba(225, 29, 72, 0.03)',
        border: '1px solid rgba(225, 29, 72, 0.2)',
        borderRadius: 14,
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <AlertTriangle size={18} color="#E11D48" />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#E11D48', margin: 0 }}>
            Danger Zone
          </h3>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
          Actions taken here are irreversible. Clearing history will wipe all previously generated assets from your local browser storage.
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(225, 29, 72, 0.12)',
          paddingTop: 14,
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Clear Transformation History
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Remove all saved documents, quizzes, and scripts
            </div>
          </div>

          <button
            onClick={handleClearHistory}
            className="btn btn-secondary btn-sm"
            style={{ color: '#E11D48', borderColor: 'rgba(225, 29, 72, 0.3)' }}
          >
            <Trash2 size={14} />
            <span>{historyClearedToast ? 'History Cleared!' : 'Clear All History'}</span>
          </button>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(225, 29, 72, 0.12)',
          paddingTop: 14,
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
              Delete Account & Local Cache
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              Permanently purge all workspace state and preferences
            </div>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Delete local account and reset ByteForce to clean installation state?')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="btn btn-sm"
            style={{ background: '#E11D48', color: '#FFFFFF', border: 'none' }}
          >
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
};
