import { PurposeItem, PurposeCategory } from '../types';

export const PURPOSE_CATEGORIES: { id: PurposeCategory; label: string; tagline: string; icon: string }[] = [
  { id: 'summarize', label: 'SUMMARIZE', tagline: 'Distill essence, executive takeaways, and briefs', icon: 'FileText' },
  { id: 'learn', label: 'LEARN', tagline: 'Study notes, active recall flashcards, and concept maps', icon: 'BookOpen' },
  { id: 'assess', label: 'ASSESS', tagline: 'Diagnostic quizzes, mastery checks, and practice questions', icon: 'HelpCircle' },
  { id: 'present', label: 'PRESENT', tagline: 'Presentation slide outlines and spoken keynote scripts', icon: 'Presentation' },
  { id: 'publish', label: 'PUBLISH', tagline: 'Platform-optimized thought leadership and social posts', icon: 'Share2' }
];

export const PURPOSES: PurposeItem[] = [
  // SUMMARIZE
  {
    id: 'summary',
    category: 'summarize',
    title: 'Structured Summary',
    tagline: 'Multi-tiered synthesis with insights & core takeaways',
    iconName: 'FileText',
    description: 'Generates Overview, Key Insights, Concepts, and Actionable Takeaways without fluff.',
    badge: 'Core'
  },
  {
    id: 'executive_brief',
    category: 'summarize',
    title: 'Executive Decision Brief',
    tagline: 'High-signal 1-page briefing for leadership decisions',
    iconName: 'TrendingUp',
    description: 'Distills bottom-line impacts, operational trade-offs, and critical decision points.'
  },

  // LEARN
  {
    id: 'flashcards',
    category: 'learn',
    title: 'Interactive Flashcards',
    tagline: 'Active recall cards with 3D flip & mastery tracking',
    iconName: 'Layers',
    description: 'Generates progressive flashcard deck designed for spaced repetition and rapid revision.',
    badge: 'Interactive'
  },
  {
    id: 'key_concepts',
    category: 'learn',
    title: 'Concept Lexicon',
    tagline: 'Technical glossaries and conceptual hierarchy',
    iconName: 'Bookmark',
    description: 'Extracts deep definitions and contextual explanations of core domain terminology.'
  },

  // ASSESS
  {
    id: 'quiz',
    category: 'assess',
    title: 'Diagnostic Quiz',
    tagline: 'Playable MCQ assessment with rationale explanations',
    iconName: 'HelpCircle',
    description: 'Generates realistic exam questions with immediate feedback, score reports, and revision recommendations.',
    badge: 'Playable'
  },

  // PRESENT
  {
    id: 'presentation_outline',
    category: 'present',
    title: 'Presentation Outline',
    tagline: 'Structured slide-by-slide deck with speaker notes',
    iconName: 'Presentation',
    description: 'Generates title slides, agenda, problem-solution breakdowns, and talking points per slide.',
    badge: 'Slide Deck'
  },
  {
    id: 'speaking_script',
    category: 'present',
    title: 'Speaking Keynote Script',
    tagline: 'Spoken script with pacing timer & teleprompter mode',
    iconName: 'Mic',
    description: 'Formats content into spoken delivery with timed sections, oral transitions, and pacing metrics.',
    badge: 'Teleprompter'
  },

  // PUBLISH
  {
    id: 'linkedin_post',
    category: 'publish',
    title: 'LinkedIn Thought Leadership',
    tagline: 'High-engagement industry post with live feed preview',
    iconName: 'Linkedin',
    description: 'Formats high-retention hook, structural body points, engagement CTA, and hashtags with live feed mock.',
    badge: 'Social'
  },
  {
    id: 'x_post',
    category: 'publish',
    title: 'X / Twitter Post',
    tagline: 'Punchy insight post optimized for tech virality',
    iconName: 'Twitter',
    description: 'Creates concise hooks and impactful bullets tailored for fast-scanning tech audiences.'
  }
];
