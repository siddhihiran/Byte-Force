export type SourceType = 'pdf' | 'docx' | 'txt' | 'paste' | 'sample';

export interface DetectedStructure {
  topics: string[];
  keyConcepts: string[];
  sections: string[];
  entities: string[];
  technicalTerms: string[];
}

export interface SourceDocument {
  id: string;
  title: string;
  type: SourceType;
  content: string;
  wordCount: number;
  readingTime: string;
  detectedStructure: DetectedStructure;
  updatedAt: string;
}

export type PurposeCategory = 'summarize' | 'learn' | 'assess' | 'present' | 'publish';

export type TransformationId = 
  | 'summary'
  | 'study_notes'
  | 'flashcards'
  | 'quiz'
  | 'key_concepts'
  | 'presentation_outline'
  | 'speaking_script'
  | 'executive_brief'
  | 'linkedin_post'
  | 'x_post'
  | 'instagram_caption';

export interface PurposeItem {
  id: TransformationId;
  category: PurposeCategory;
  title: string;
  tagline: string;
  iconName: string;
  description: string;
  badge?: string;
}

export interface SummaryConfig {
  format: 'quick' | 'detailed' | 'exam' | 'executive';
  tone: 'simple' | 'professional' | 'academic';
}

export interface QuizConfig {
  questionCount: 5 | 10;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'mcq' | 'mixed';
}

export interface SocialConfig {
  platform: 'linkedin' | 'x' | 'instagram';
  tone: 'professional' | 'conversational' | 'bold';
  length: 'short' | 'medium' | 'long';
}

export interface ScriptConfig {
  estimatedMinutes: number;
  style: 'keynote' | 'briefing' | 'walkthrough';
}

export interface FlashcardsConfig {
  cardCount: number;
  mode: 'definitions' | 'applications';
}

export interface OutlineConfig {
  slideCount: 4 | 6 | 8;
  format: 'pitch' | 'technical' | 'executive';
}

export interface TransformationConfigs {
  summary: SummaryConfig;
  quiz: QuizConfig;
  social: SocialConfig;
  script: ScriptConfig;
  flashcards: FlashcardsConfig;
  outline: OutlineConfig;
}

export interface ValidationSignals {
  sourceContext: boolean;
  structure: boolean;
  requestedFormat: boolean;
  missingSections: number;
  sourceGrounded: boolean;
}

/* Structured Output Payloads */

export interface ImportantConcept {
  term: string;
  explanation: string;
}

export interface SummaryData {
  overview: string;
  keyInsights: string[];
  importantConcepts: ImportantConcept[];
  takeaways: string[];
}

export interface FlashcardItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface FlashcardData {
  cards: FlashcardItem[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  concept: string;
}

export interface QuizData {
  questions: QuizQuestion[];
  conceptsToRevise: string[];
}

export interface ScriptSection {
  heading: string;
  timestamp: string;
  content: string;
}

export interface ScriptData {
  title: string;
  estimatedSpeakingTime: string;
  wordCount: number;
  sections: ScriptSection[];
}

export interface SlideItem {
  slideNumber: number;
  title: string;
  bullets: string[];
  speakerNotes: string;
}

export interface PresentationOutlineData {
  title: string;
  theme: string;
  targetAudience: string;
  slides: SlideItem[];
}

export interface SocialData {
  platform: 'linkedin' | 'x' | 'instagram';
  hook: string;
  body: string;
  callToAction: string;
  hashtags: string[];
  authorHandle?: string;
  authorName?: string;
}

export type AssetPayload = 
  | { type: 'summary'; data: SummaryData }
  | { type: 'flashcards'; data: FlashcardData }
  | { type: 'quiz'; data: QuizData }
  | { type: 'presentation_outline'; data: PresentationOutlineData }
  | { type: 'speaking_script'; data: ScriptData }
  | { type: 'social'; data: SocialData }
  | { type: 'generic'; data: string };

export interface OutputAsset {
  id: string;
  sourceId: string;
  sourceTitle: string;
  purposeId: TransformationId;
  title: string;
  category: PurposeCategory;
  format: string;
  createdAt: string;
  payload: AssetPayload;
  validationSignals: ValidationSignals;
  isSaved?: boolean;
}

export interface TemplatePack {
  id: string;
  name: string;
  category: 'Study' | 'Exam' | 'Presentation' | 'Social' | 'Executive';
  description: string;
  icon: string;
  recommendedPurposes: TransformationId[];
  badge?: string;
  suggestedSourceTitle: string;
}

export interface HistoryEntry {
  id: string;
  sourceTitle: string;
  sourceType: SourceType;
  wordCount: number;
  timestamp: string;
  purposes: TransformationId[];
  assets: OutputAsset[];
}

export type PipelineStage = 
  | 'ingest'
  | 'understand'
  | 'intent'
  | 'transform'
  | 'validate'
  | 'format'
  | 'deliver';

export interface PipelineStageInfo {
  id: PipelineStage;
  number: string;
  name: string;
  description: string;
  status: 'idle' | 'running' | 'completed';
}
