import React from 'react';
import { 
  SourceDocument, 
  TransformationId, 
  TransformationConfigs 
} from '../types';
import { WorkflowStepper } from '../components/workspace/WorkflowStepper';
import { SourceZone } from '../components/workspace/SourceZone';
import { PurposeZone } from '../components/workspace/PurposeZone';
import { ConfigPanel } from '../components/workspace/ConfigPanel';

interface WorkflowPageProps {
  source: SourceDocument;
  onUpdateSource: (source: SourceDocument) => void;
  onSelectSample: (sampleKey: 'healthcare' | 'renewable-energy' | 'ai-agents') => void;
  selectedPurposes: TransformationId[];
  onTogglePurpose: (id: TransformationId) => void;
  onSelectAllRecommended: () => void;
  onGenerateCompletePack: () => void;
  activeConfigPurpose: TransformationId;
  onSetActiveConfigPurpose: (id: TransformationId) => void;
  configs: TransformationConfigs;
  onUpdateConfigs: (updater: (prev: TransformationConfigs) => TransformationConfigs) => void;
  onStartTransform: () => void;
  isTransforming: boolean;
}

export const WorkflowPage: React.FC<WorkflowPageProps> = ({
  source,
  onUpdateSource,
  onSelectSample,
  selectedPurposes,
  onTogglePurpose,
  onSelectAllRecommended,
  onGenerateCompletePack,
  activeConfigPurpose,
  onSetActiveConfigPurpose,
  configs,
  onUpdateConfigs,
  onStartTransform,
  isTransforming
}) => {
  return (
    <div className="animate-fade-in" style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Horizontal Progress Stepper: ① Source → ② Purpose → ③ Tune */}
      <WorkflowStepper
        sourceReady={source.wordCount > 0}
        purposeCount={selectedPurposes.length}
      />

      {/* 3-Column Transformation Workspace (24px gutter) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24,
        alignItems: 'start'
      }}>
        {/* COLUMN 1: SOURCE INTAKE & CONTENT INTELLIGENCE */}
        <SourceZone
          source={source}
          onUpdateSource={onUpdateSource}
          onSelectSample={onSelectSample}
        />

        {/* COLUMN 2: CHOOSE TARGET PURPOSES */}
        <PurposeZone
          selectedPurposes={selectedPurposes}
          onTogglePurpose={onTogglePurpose}
          onSelectAllRecommended={onSelectAllRecommended}
          onGenerateCompletePack={onGenerateCompletePack}
          activeConfigPurpose={activeConfigPurpose}
          onSetActiveConfigPurpose={onSetActiveConfigPurpose}
          onStartTransform={onStartTransform}
          isTransforming={isTransforming}
        />

        {/* COLUMN 3: TUNING & CONTROLS */}
        <ConfigPanel
          activePurpose={activeConfigPurpose}
          configs={configs}
          onUpdateSummaryConfig={(c) => onUpdateConfigs(prev => ({ ...prev, summary: { ...prev.summary, ...c } }))}
          onUpdateQuizConfig={(c) => onUpdateConfigs(prev => ({ ...prev, quiz: { ...prev.quiz, ...c } }))}
          onUpdateSocialConfig={(c) => onUpdateConfigs(prev => ({ ...prev, social: { ...prev.social, ...c } }))}
          onUpdateScriptConfig={(c) => onUpdateConfigs(prev => ({ ...prev, script: { ...prev.script, ...c } }))}
          onUpdateFlashcardsConfig={(c) => onUpdateConfigs(prev => ({ ...prev, flashcards: { ...prev.flashcards, ...c } }))}
          onUpdateOutlineConfig={(c) => onUpdateConfigs(prev => ({ ...prev, outline: { ...prev.outline, ...c } }))}
          onStartTransform={onStartTransform}
          isTransforming={isTransforming}
          selectedCount={selectedPurposes.length}
        />
      </div>
    </div>
  );
};
