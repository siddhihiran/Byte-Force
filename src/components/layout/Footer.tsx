import React from 'react';
import { Zap, ShieldCheck, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      padding: '24px 20px',
      background: '#FFFFFF',
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
              background: 'linear-gradient(135deg, #7C6FE8 0%, #6FD6C0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(124, 111, 232, 0.25)'
            }}>
              <Zap size={14} color="#FFFFFF" fill="#FFFFFF" />
            </div>
            <div>
              <div style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                BYTEFORCE <span style={{ color: 'var(--brand-primary)', fontWeight: 600 }}>• SIH26154</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
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
            background: '#F3F1FC',
            padding: '5px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)'
          }}>
            <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>ONE SOURCE</span>
            <ArrowRight size={11} color="var(--text-muted)" />
            <span style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>CHOOSE PURPOSE</span>
            <ArrowRight size={11} color="var(--text-muted)" />
            <span style={{ color: '#1F7C67', fontWeight: 700 }}>MANY ASSETS</span>
            <ArrowRight size={11} color="var(--text-muted)" />
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>ONE WORKSPACE</span>
          </div>

          {/* Right Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.725rem',
            color: 'var(--text-secondary)'
          }}>
            <ShieldCheck size={14} color="#1F7C67" />
            <span>Failsafe Architecture • Competition Grade</span>
          </div>
        </div>

        {/* Bottom Row: Official Attribution */}
        <div style={{
          paddingTop: 12,
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 8,
          fontSize: '0.72rem',
          color: 'var(--text-secondary)'
        }}>
          <div>
            <span>Team: </span>
            <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
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
