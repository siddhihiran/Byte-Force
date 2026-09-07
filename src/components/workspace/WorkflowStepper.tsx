import React from 'react';
import { Check } from 'lucide-react';

interface WorkflowStepperProps {
  sourceReady: boolean;
  purposeCount: number;
  activeZone?: number;
}

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({
  sourceReady,
  purposeCount
}) => {
  const steps = [
    {
      num: 1,
      label: 'Source Intake',
      shortLabel: 'Source',
      isCompleted: sourceReady,
      isActive: !sourceReady
    },
    {
      num: 2,
      label: 'Choose Purpose',
      shortLabel: 'Purpose',
      isCompleted: purposeCount > 0 && sourceReady,
      isActive: sourceReady && purposeCount === 0
    },
    {
      num: 3,
      label: 'Tuning & Controls',
      shortLabel: 'Tune',
      isCompleted: false,
      isActive: sourceReady && purposeCount > 0
    }
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
      padding: '8px 16px',
      background: '#FFFFFF',
      border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-full)',
      boxShadow: 'var(--shadow-resting)',
      maxWidth: 540,
      margin: '0 auto 20px',
      fontSize: '12px',
      fontWeight: 500
    }}>
      {steps.map((step, idx) => (
        <React.Fragment key={step.num}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            color: step.isActive 
              ? 'var(--brand-primary)' 
              : step.isCompleted 
              ? 'var(--text-primary)' 
              : 'var(--text-muted)',
            fontWeight: step.isActive ? 600 : 500,
            transition: 'all var(--transition-fast)'
          }}>
            <div style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontWeight: 700,
              background: step.isCompleted
                ? 'var(--brand-mint)'
                : step.isActive
                ? 'var(--brand-primary)'
                : 'var(--bg-surface-subtle)',
              color: step.isCompleted
                ? '#0E4E42'
                : step.isActive
                ? '#FFFFFF'
                : 'var(--text-muted)',
              boxShadow: step.isActive ? '0 1px 4px rgba(124, 111, 232, 0.3)' : 'none',
              transition: 'all var(--transition-fast)'
            }}>
              {step.isCompleted ? <Check size={12} strokeWidth={3} /> : step.num}
            </div>
            <span>
              {step.label}
            </span>
          </div>

          {idx < steps.length - 1 && (
            <span style={{ color: 'var(--border-medium)', fontSize: '12px', userSelect: 'none' }}>
              →
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
