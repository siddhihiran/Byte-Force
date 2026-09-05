import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  SourceDocument, 
  TransformationId, 
  OutputAsset, 
  TransformationConfigs, 
  PipelineStage,
  TemplatePack,
  HistoryEntry,
  OutlineConfig
} from './types';
import { DemoProvider, SAMPLE_RENEWABLE_ENERGY_TEXT, SAMPLE_DOCUMENTS } from './services/DemoProvider';
import { analyzeContent } from './services/ContentAnalyzer';
import { TransformationService } from './services/TransformationService';
import { StorageService, AppSettings, DEFAULT_SETTINGS } from './services/StorageService';

// Layout & View Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { SourceZone } from './components/workspace/SourceZone';
import { PurposeZone } from './components/workspace/PurposeZone';
import { ConfigPanel } from './components/workspace/ConfigPanel';
import { PipelineModal } from './components/workspace/PipelineModal';
import { OutputWorkspace } from './components/outputs/OutputWorkspace';
import { TemplateModal } from './components/templates/TemplateModal';
import { HistoryDrawer } from './components/history/HistoryDrawer';
import { HistoryPage } from './components/history/HistoryPage';
import { SettingsModal } from './components/settings/SettingsModal';
import { GuidedDemoModal } from './components/demo/GuidedDemoModal';

// Initial Source Document Creation
const createInitialSource = (): SourceDocument => {
  const sample = SAMPLE_DOCUMENTS['healthcare'] || SAMPLE_DOCUMENTS['renewable-energy'];
  const analysis = analyzeContent(sample.content);
  return {
    id: 'src-default-healthcare',
    title: sample.title,
    type: 'sample',
    content: sample.content,
    wordCount: analysis.wordCount,
    readingTime: analysis.readingTime,
    detectedStructure: analysis.detectedStructure,
    updatedAt: new Date().toLocaleTimeString()
  };
};

export const App: React.FC = () => {
  // Navigation: Workspace-first product experience!
  const [activeView, setActiveView] = useState<'workspace' | 'history' | 'landing'>('workspace');
  const [hasResults, setHasResults] = useState<boolean>(false);

  // Source & Purpose State
  const [source, setSource] = useState<SourceDocument>(createInitialSource);
  const [selectedPurposes, setSelectedPurposes] = useState<TransformationId[]>([
    'summary',
    'flashcards',
    'quiz',
    'presentation_outline',
    'speaking_script'
  ]);
  const [activeConfigPurpose, setActiveConfigPurpose] = useState<TransformationId>('summary');

  // Transformation Tuning Configurations
  const [configs, setConfigs] = useState<TransformationConfigs>({
    summary: { format: 'detailed', tone: 'professional' },
    quiz: { questionCount: 5, difficulty: 'medium', type: 'mcq' },
    social: { platform: 'linkedin', tone: 'professional', length: 'medium' },
    script: { estimatedMinutes: 3, style: 'keynote' },
    flashcards: { cardCount: 6, mode: 'definitions' },
    outline: { slideCount: 6, format: 'pitch' }
  });

  // Generated Assets & Pipeline Execution State
  const [generatedAssets, setGeneratedAssets] = useState<OutputAsset[]>([]);
  const [isTransforming, setIsTransforming] = useState<boolean>(false);
  const [currentPipelineStage, setCurrentPipelineStage] = useState<PipelineStage>('ingest');
  const [currentPipelineIndex, setCurrentPipelineIndex] = useState<number>(0);

  // Modals & Drawers
  const [isTemplatesOpen, setIsTemplatesOpen] = useState<boolean>(false);
  const [isHistoryDrawerOpen, setIsHistoryDrawerOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isGuidedDemoOpen, setIsGuidedDemoOpen] = useState<boolean>(false);

  // Storage Persistence
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setSettings(StorageService.getSettings());
    setHistoryEntries(StorageService.getHistory());
  }, []);

  const refreshHistory = () => {
    setHistoryEntries(StorageService.getHistory());
  };

  // Toggle purpose selection
  const handleTogglePurpose = (id: TransformationId) => {
    setSelectedPurposes(prev => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter(p => p !== id) : [...prev, id];
      if (!exists) {
        setActiveConfigPurpose(id);
      }
      return updated;
    });
  };

  const handleSelectAllRecommended = () => {
    setSelectedPurposes(['summary', 'flashcards', 'quiz', 'presentation_outline', 'speaking_script']);
    setActiveConfigPurpose('summary');
  };

  // Sample Switcher
  const handleSelectSample = (sampleKey: 'healthcare' | 'renewable-energy' | 'ai-agents') => {
    const doc = SAMPLE_DOCUMENTS[sampleKey] || SAMPLE_DOCUMENTS['healthcare'];
    const analysis = analyzeContent(doc.content);
    setSource({
      id: `src-${sampleKey}-${Date.now()}`,
      title: doc.title,
      type: 'sample',
      content: doc.content,
      wordCount: analysis.wordCount,
      readingTime: analysis.readingTime,
      detectedStructure: analysis.detectedStructure,
      updatedAt: new Date().toLocaleTimeString()
    });
  };

  // Phase 11: High-Impact Action: Generate Complete Pack across all 6 supported outputs
  const handleGenerateCompletePack = () => {
    const allPurposes: TransformationId[] = [
      'summary',
      'flashcards',
      'quiz',
      'presentation_outline',
      'speaking_script',
      'linkedin_post'
    ];
    setSelectedPurposes(allPurposes);
    setActiveConfigPurpose('summary');
    setTimeout(() => {
      handleStartTransform();
    }, 50);
  };

  // Execute Transformation Pipeline
  const handleStartTransform = async () => {
    if (selectedPurposes.length === 0) return;

    setIsTransforming(true);
    setCurrentPipelineStage('ingest');
    setCurrentPipelineIndex(0);

    try {
      const assets = await TransformationService.transform(
        source,
        selectedPurposes,
        configs,
        (stage, idx) => {
          setCurrentPipelineStage(stage);
          setCurrentPipelineIndex(idx);
        }
      );

      setGeneratedAssets(assets);
      setHasResults(true);
      setActiveView('workspace');
      refreshHistory();

      // Confetti celebration
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.35 }
      });
    } catch (err) {
      console.error('Transformation error:', err);
    } finally {
      setIsTransforming(false);
    }
  };

  // Quick 1-Click Demo Launcher for Hackathon Judges (Phase 12: Zero-friction Healthcare sample demo)
  const handleQuickDemo = () => {
    handleSelectSample('healthcare');
    handleSelectAllRecommended();
    setActiveView('workspace');
    setTimeout(() => {
      handleStartTransform();
    }, 150);
  };

  // Apply Template Pack
  const handleApplyTemplate = (pack: TemplatePack) => {
    setSelectedPurposes(pack.recommendedPurposes);
    if (pack.recommendedPurposes[0]) {
      setActiveConfigPurpose(pack.recommendedPurposes[0]);
    }
    setHasResults(false);
    setActiveView('workspace');
  };

  // Restore History Entry into active workspace
  const handleRestoreHistory = (entry: HistoryEntry) => {
    setSource({
      id: `restored-${entry.id}`,
      title: entry.sourceTitle,
      type: entry.sourceType,
      content: SAMPLE_RENEWABLE_ENERGY_TEXT,
      wordCount: entry.wordCount,
      readingTime: `${Math.max(1, Math.round(entry.wordCount / 200))} min read`,
      detectedStructure: analyzeContent(SAMPLE_RENEWABLE_ENERGY_TEXT).detectedStructure,
      updatedAt: entry.timestamp
    });
    setSelectedPurposes(entry.purposes);
    if (entry.assets && entry.assets.length > 0) {
      setGeneratedAssets(entry.assets);
      setHasResults(true);
    } else {
      setHasResults(false);
    }
    setActiveView('workspace');
  };

  const handleRegenerateSingleAsset = (assetId: string) => {
    const target = generatedAssets.find(a => a.id === assetId);
    if (!target) return;
    const newAssets = DemoProvider.generateOutputs(source, [target.purposeId], configs);
    if (newAssets[0]) {
      setGeneratedAssets(prev => prev.map(a => a.id === assetId ? newAssets[0] : a));
    }
  };

  const handleDeleteSingleAsset = (assetId: string) => {
    setGeneratedAssets(prev => prev.filter(a => a.id !== assetId));
  };

  const handleToggleSaveAsset = (assetId: string) => {
    setGeneratedAssets(prev => prev.map(a => a.id === assetId ? { ...a, isSaved: !a.isSaved } : a));
  };

  const handleDeleteHistoryEntry = (id: string) => {
    StorageService.deleteHistoryEntry(id);
    refreshHistory();
  };

  return (
    <div className="app-container">
      {/* Ambient background glows and grid */}
      <div className="ambient-bg">
        <div className="ambient-grid" />
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />
      </div>

      {/* Global Header */}
      <Header
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onOpenHistory={() => setActiveView('history')}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenGuidedDemo={() => setIsGuidedDemoOpen(true)}
        onQuickDemo={handleQuickDemo}
        historyCount={historyEntries.length}
        settings={settings}
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
      />

      {/* Main Viewport */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1, padding: '24px 16px' }}>
        {activeView === 'landing' ? (
          /* PRODUCT OVERVIEW & SIGNATURE VISUAL */
          <HeroSection
            onStartTransforming={() => setActiveView('workspace')}
            onExploreDemo={handleQuickDemo}
          />
        ) : activeView === 'history' ? (
          /* FULL WORKING TRANSFORMATION HISTORY PAGE */
          <HistoryPage
            historyEntries={historyEntries}
            onReopenEntry={handleRestoreHistory}
            onClearHistory={() => {
              StorageService.clearHistory();
              refreshHistory();
            }}
            onDeleteEntry={handleDeleteHistoryEntry}
            onGoToWorkspace={() => setActiveView('workspace')}
          />
        ) : (
          /* PRIMARY WORKING WORKSPACE (SIH PROTOTYPE) */
          <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {hasResults ? (
              /* RESULTS MODE: MULTI-ASSET OUTPUT WORKSPACE */
              <OutputWorkspace
                assets={generatedAssets}
                sourceTitle={source.title}
                onBackToConfig={() => setHasResults(false)}
                onRegenerateAsset={handleRegenerateSingleAsset}
                onDeleteAsset={handleDeleteSingleAsset}
                onToggleSaveAsset={handleToggleSaveAsset}
              />
            ) : (
              /* CONFIGURATION MODE: 3-ZONE TRANSFORMATION WORKSPACE */
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(300px, 1fr) minmax(360px, 1.25fr) minmax(280px, 1fr)',
                gap: 18,
                alignItems: 'start'
              }}>
                {/* ZONE 1: SOURCE CONTENT & CONTENT INTELLIGENCE */}
                <SourceZone
                  source={source}
                  onUpdateSource={(newSrc) => setSource(newSrc)}
                  onSelectSample={handleSelectSample}
                />

                {/* ZONE 2: 5 SELECTABLE PURPOSE MODES & MULTI-TRANSFORMATION */}
                <PurposeZone
                  selectedPurposes={selectedPurposes}
                  onTogglePurpose={handleTogglePurpose}
                  onSelectAllRecommended={handleSelectAllRecommended}
                  onGenerateCompletePack={handleGenerateCompletePack}
                  activeConfigPurpose={activeConfigPurpose}
                  onSetActiveConfigPurpose={(id) => setActiveConfigPurpose(id)}
                  onStartTransform={handleStartTransform}
                  isTransforming={isTransforming}
                />

                {/* ZONE 3: DYNAMIC CONFIGURATION & TUNING */}
                <ConfigPanel
                  activePurpose={activeConfigPurpose}
                  configs={configs}
                  onUpdateSummaryConfig={(c) => setConfigs({ ...configs, summary: { ...configs.summary, ...c } })}
                  onUpdateQuizConfig={(c) => setConfigs({ ...configs, quiz: { ...configs.quiz, ...c } })}
                  onUpdateSocialConfig={(c) => setConfigs({ ...configs, social: { ...configs.social, ...c } })}
                  onUpdateScriptConfig={(c) => setConfigs({ ...configs, script: { ...configs.script, ...c } })}
                  onUpdateFlashcardsConfig={(c) => setConfigs({ ...configs, flashcards: { ...configs.flashcards, ...c } })}
                  onUpdateOutlineConfig={(c) => setConfigs({ ...configs, outline: { ...configs.outline, ...c } })}
                  onStartTransform={handleStartTransform}
                  isTransforming={isTransforming}
                  selectedCount={selectedPurposes.length}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* 7-Stage Pipeline Modal */}
      <PipelineModal
        currentStage={currentPipelineStage}
        currentStageIndex={currentPipelineIndex}
        isOpen={isTransforming}
        sourceTitle={source.title}
        purposesCount={selectedPurposes.length}
      />

      {/* Guided Architecture Walkthrough Modal */}
      <GuidedDemoModal
        isOpen={isGuidedDemoOpen}
        onClose={() => setIsGuidedDemoOpen(false)}
        onLaunchFullDemo={handleQuickDemo}
      />

      {/* Curated Templates Modal */}
      <TemplateModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onApplyTemplate={handleApplyTemplate}
      />

      {/* History Drawer Quick Access */}
      <HistoryDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        historyEntries={historyEntries}
        onRestoreEntry={handleRestoreHistory}
        onClearHistory={() => {
          StorageService.clearHistory();
          refreshHistory();
        }}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSaveSettings={(newSettings) => {
          StorageService.saveSettings(newSettings);
          setSettings(newSettings);
        }}
      />
    </div>
  );
};

export default App;
