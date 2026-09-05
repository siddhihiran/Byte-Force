import React from 'react';
import { Zap, ShieldCheck, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      padding: '24px 20px',
      background: 'rgba(7, 10, 15, 0.95)',
      marginTop: 'auto',
      zIndex: 10
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }}>
        {/* Top Row: Brand & Interaction Statement */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: 'linear-gradient(135deg, #0284c7 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 10px rgba(56, 189, 248, 0.25)'
            }}>
              <Zap size={14} color="#ffffff" fill="#ffffff" />
            </div>
            <div>
              <div style={{ fontSize: '0.825rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.01em' }}>
                BYTEFORCE <span style={{ color: 'var(--brand-cyan)', fontWeight: 600 }}>• SIH26154</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                Gen AI Platform for Automated Content Transformation
              </div>
            </div>
          </div>

          {/* Central Architecture Formula */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.725rem',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '5px 12px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)'
          }}>
            <span style={{ color: 'var(--brand-cyan)', fontWeight: 700 }}>ONE SOURCE</span>
            <ArrowRight size={11} color="var(--text-dim)" />
            <span style={{ color: '#818cf8', fontWeight: 700 }}>CHOOSE PURPOSE</span>
            <ArrowRight size={11} color="var(--text-dim)" />
            <span style={{ color: '#34d399', fontWeight: 700 }}>MANY ASSETS</span>
            <ArrowRight size={11} color="var(--text-dim)" />
            <span style={{ color: '#ffffff', fontWeight: 700 }}>ONE WORKSPACE</span>
          </div>

          {/* Right Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.725rem',
            color: 'var(--text-muted)'
          }}>
            <ShieldCheck size={14} color="#10b981" />
            <span>Failsafe Architecture • Competition Grade</span>
          </div>
        </div>

        {/* Bottom Row: Official Attribution */}
        <div style={{
          paddingTop: 12,
          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
          fontSize: '0.675rem',
          color: 'var(--text-dim)'
        }}>
          <div>
            <span>Team: </span>
            <strong style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
              Siddhi Hiran • Shubham Chaudhary • Nisha Chavan • Vansh Jain • Dhyan Patel • Devesh Kumar Singh
            </strong>
          </div>
          <div>
            <span>SIH 2026 • Ministry / Organization Challenge</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
