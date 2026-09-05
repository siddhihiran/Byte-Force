import { HistoryEntry, TemplatePack } from '../types';

const HISTORY_KEY = 'byteforce_history_v1';
const SETTINGS_KEY = 'byteforce_settings_v1';

export interface AppSettings {
  useDemoMode: boolean;
  apiKey: string;
  provider: 'gemini' | 'openai';
  model: string;
}

export const DEFAULT_SETTINGS: AppSettings = {
  useDemoMode: true,
  apiKey: '',
  provider: 'gemini',
  model: 'gemini-1.5-flash'
};

export const TEMPLATE_PACKS: TemplatePack[] = [
  {
    id: 'study-pack',
    name: 'Study Pack',
    category: 'Study',
    description: 'Transform complex study materials into active recall flashcards, diagnostic quiz tests, and structured concept notes.',
    icon: 'GraduationCap',
    recommendedPurposes: ['summary', 'flashcards', 'quiz'],
    badge: 'Popular',
    suggestedSourceTitle: 'Introduction to Renewable Energy'
  },
  {
    id: 'exam-prep',
    name: 'Exam Prep',
    category: 'Exam',
    description: 'Prepare for exams with test-focused multiple choice questions, high-yield concept lexicons, and chapter summaries.',
    icon: 'BookOpen',
    recommendedPurposes: ['quiz', 'summary', 'key_concepts'],
    badge: 'High Yield',
    suggestedSourceTitle: 'Introduction to Renewable Energy'
  },
  {
    id: 'presentation-pack',
    name: 'Presentation',
    category: 'Presentation',
    description: 'Convert research documents and reports into a structured slide-by-slide deck outline and spoken keynote script with teleprompter.',
    icon: 'Presentation',
    recommendedPurposes: ['presentation_outline', 'speaking_script', 'executive_brief'],
    badge: 'Executive',
    suggestedSourceTitle: 'Introduction to Renewable Energy'
  },
  {
    id: 'social-pack',
    name: 'Social Pack',
    category: 'Social',
    description: 'Repurpose one source document into high-impact LinkedIn thought leadership posts and punchy X / Twitter insight threads.',
    icon: 'Share2',
    recommendedPurposes: ['linkedin_post', 'x_post', 'summary'],
    badge: 'Distribution',
    suggestedSourceTitle: 'Autonomous AI Agents: Tool Calling'
  },
  {
    id: 'executive-brief-pack',
    name: 'Executive Brief',
    category: 'Executive',
    description: 'Turn lengthy proposals and technical docs into a 1-page leadership decision brief, presentation outline, and speaking script.',
    icon: 'Briefcase',
    recommendedPurposes: ['executive_brief', 'presentation_outline', 'speaking_script'],
    badge: 'Strategic',
    suggestedSourceTitle: 'Introduction to Renewable Energy'
  }
];

export class StorageService {
  static getHistory(): HistoryEntry[] {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveHistoryEntry(entry: HistoryEntry): void {
    try {
      const existing = this.getHistory();
      const updated = [entry, ...existing.filter(e => e.id !== entry.id)].slice(0, 30);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }

  static deleteHistoryEntry(id: string): void {
    try {
      const existing = this.getHistory();
      const updated = existing.filter(e => e.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to delete history entry:', e);
    }
  }

  static clearHistory(): void {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.warn('Failed to clear history:', e);
    }
  }

  static getSettings(): AppSettings {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  static saveSettings(settings: AppSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  }
}
