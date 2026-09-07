import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  SourceDocument, 
  TransformationId, 
  OutputAsset, 
  TransformationConfigs, 
  PipelineStage,
  TemplatePack,
  HistoryEntry
} from './types';
import { DemoProvider, SAMPLE_RENEWABLE_ENERGY_TEXT, SAMPLE_DOCUMENTS } from './services/DemoProvider';
import { analyzeContent } from './services/ContentAnalyzer';
import { TransformationService } from './services/TransformationService';
import { StorageService, AppSettings } from './services/StorageService';

import { AppPage, Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { WorkflowPage } from './pages/WorkflowPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { ResultsPage } from './pages/ResultsPage';
import { HistoryDashboardPage } from './pages/HistoryDashboardPage';
import { SettingsProfilePage } from './pages/SettingsProfilePage';

// Modals
import { TemplateModal } from './components/templates/TemplateModal';
import { HistoryDrawer } from './components/history/HistoryDrawer';
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
  // Navigation: Multi-page product routing
  const [activeView, setActiveView] = useState<AppPage>('home');
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
  const [settings, setSettings] = useState<AppSettings>(() => StorageService.getSettings());
  const [historyEntries, setHistoryEntries] = useState<HistoryEntry[]>(() => StorageService.getHistory());

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
    setActiveView('processing');
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
      setActiveView('results');
      refreshHistory();

      // Confetti celebration
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.35 }
      });
    } catch (err) {
      console.error('Transformation error:', err);
      setActiveView('workspace');
    } finally {
      setIsTransforming(false);
    }
  };

  // Quick 1-Click Demo Launcher for Hackathon Judges (Phase 12: Zero-friction Healthcare sample demo)
  const handleQuickDemo = () => {
    handleSelectSample('healthcare');
    handleSelectAllRecommended();
    setTimeout(() => {
      handleStartTransform();
    }, 100);
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

  // Restore History Entry into active workspace and open Results
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
      setActiveView('results');
    } else {
      setHasResults(false);
      setActiveView('workspace');
    }
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
        onOpenSettings={() => setActiveView('settings')}
        onOpenGuidedDemo={() => setIsGuidedDemoOpen(true)}
        onQuickDemo={handleQuickDemo}
        historyCount={historyEntries.length}
        hasResults={hasResults}
        settings={settings}
        activeView={activeView}
        onNavigate={(view) => setActiveView(view)}
      />

      {/* Main Viewport */}
      <main style={{ flex: 1, position: 'relative', zIndex: 1, padding: '32px' }}>
        {activeView === 'home' && (
          <LandingPage
            onGetStarted={() => setActiveView('workspace')}
            onTryDemo={handleQuickDemo}
          />
        )}

        {activeView === 'workspace' && (
          <WorkflowPage
            source={source}
            onUpdateSource={(newSrc) => setSource(newSrc)}
            onSelectSample={handleSelectSample}
            selectedPurposes={selectedPurposes}
            onTogglePurpose={handleTogglePurpose}
            onSelectAllRecommended={handleSelectAllRecommended}
            onGenerateCompletePack={handleGenerateCompletePack}
            activeConfigPurpose={activeConfigPurpose}
            onSetActiveConfigPurpose={(id) => setActiveConfigPurpose(id)}
            configs={configs}
            onUpdateConfigs={setConfigs}
            onStartTransform={handleStartTransform}
            isTransforming={isTransforming}
          />
        )}

        {activeView === 'processing' && (
          <ProcessingPage
            currentStage={currentPipelineStage}
            currentStageIndex={currentPipelineIndex}
            sourceTitle={source.title}
            wordCount={source.wordCount}
            purposesCount={selectedPurposes.length}
          />
        )}

        {activeView === 'results' && (
          <ResultsPage
            assets={generatedAssets}
            source={source}
            onBackToWorkflow={() => setActiveView('workspace')}
            onRegenerateAsset={handleRegenerateSingleAsset}
            onDeleteAsset={handleDeleteSingleAsset}
            onToggleSaveAsset={handleToggleSaveAsset}
          />
        )}

        {activeView === 'history' && (
          <HistoryDashboardPage
            historyEntries={historyEntries}
            onViewEntry={handleRestoreHistory}
            onClearHistory={() => {
              StorageService.clearHistory();
              refreshHistory();
            }}
            onDeleteEntry={handleDeleteHistoryEntry}
            onGoToWorkflow={() => setActiveView('workspace')}
          />
        )}

        {activeView === 'settings' && (
          <SettingsProfilePage
            settings={settings}
            onUpdateSettings={(newSettings) => {
              StorageService.saveSettings(newSettings);
              setSettings(newSettings);
            }}
            onClearHistory={() => {
              StorageService.clearHistory();
              refreshHistory();
            }}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

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
