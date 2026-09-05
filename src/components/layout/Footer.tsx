import React from 'react';
import { Zap, ShieldCheck, Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      padding: '24px',
      background: 'rgba(7, 9, 13, 0.95)',
      marginTop: 'auto',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: 1240,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        {/* Left: Brand & Problem Statement */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: 'var(--brand-cyan-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Zap size={14} color="var(--brand-cyan)" />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>
              BYTEFORCE ⚡ • SIH26154
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              Gen AI Platform for Automated Content Transformation
            </div>
          </div>
        </div>

        {/* Center: Interaction Model Statement */}
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}>
          <span style={{ color: 'var(--brand-cyan)' }}>ONE SOURCE</span>
          <span>→</span>
          <span style={{ color: '#818cf8' }}>CHOOSE PURPOSE</span>
          <span>→</span>
          <span style={{ color: '#34d399' }}>PURPOSE-BUILT ASSETS</span>
        </div>

        {/* Right: Pitch Ready Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.725rem', color: 'var(--text-muted)' }}>
          <ShieldCheck size={14} color="#10b981" />
          <span>Failsafe Architecture • Pitch Ready</span>
        </div>
      </div>

      {/* Phase 18: Team Attribution */}
      <div style={{
        maxWidth: 1240,
        margin: '14px auto 0',
        paddingTop: 12,
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 8,
        fontSize: '0.7rem',
        color: 'var(--text-dim)'
      }}>
        <div>
          <span>Team: </span>
          <strong style={{ color: 'var(--text-secondary)' }}>
            Siddhi Hiran • Shubham Chaudhary • Nisha Chavan • Vansh Jain • Dhyan Patel • Devesh Kumar Singh
          </strong>
        </div>
        <div>
          <span>SIH26154 • Ministry / Organization Challenge</span>
        </div>
      </div>
    </footer>
  );
};
