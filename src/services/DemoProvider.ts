import { 
  SourceDocument, 
  TransformationId, 
  OutputAsset, 
  TransformationConfigs,
  SummaryData,
  FlashcardData,
  QuizData,
  ScriptData,
  SocialData,
  PresentationOutlineData
} from '../types';

export const SAMPLE_HEALTHCARE_TEXT = `# AI in Healthcare — Research Brief: Diagnostic Precision, Clinical Workflows & Regulatory Safeguards (DEMO CONTENT)

## Executive Overview
The deployment of Artificial Intelligence across clinical healthcare systems has progressed from speculative research to frontline operational infrastructure. Over the past five years, deep learning algorithms in diagnostic medical imaging, multimodal foundation models, and ambient clinical documentation software have demonstrated measurable improvements in diagnostic turnaround time, early oncology detection, and administrative burden alleviation.

## Diagnostic Imaging & Multimodal Foundation Models
Medical imaging represents the highest clinical maturity zone for healthcare AI:
1. Radiology & Oncology Screening: Convolutional neural networks (CNNs) and vision transformers trained on federated clinical repositories achieve diagnostic sensitivity exceeding 94% in early-stage pulmonary nodules and mammographic microcalcifications.
2. Multimodal Fusion: Modern clinical foundation models interleave high-resolution DICOM imaging with longitudinal electronic health record (EHR) text, lab panels, and genomic profiles to synthesize unified patient risk stratifications.

## Ambient Clinical Intelligence & Physician Burnout Reduction
Physicians currently spend upwards of 35% of their working hours on documentation, leading to widespread clinician burnout. Ambient listening models capture clinician-patient conversations in real-time, segment conversational acoustics, and autonomously generate structured SOAP (Subjective, Objective, Assessment, Plan) notes directly synced with hospital EHR systems. Early pilot studies document a 45% reduction in after-hours documentation workload.

## Algorithmic Safeguards, Bias Mitigation & Regulatory Governance
Despite technical advances, enterprise deployment requires stringent safety guardrails:
- SaMD Clearance: The FDA has cleared over 500 Software as a Medical Device (SaMD) algorithms, requiring continuous monitoring of calibration drift.
- Demographic Representation: Algorithmic bias mitigation prevents diagnostic disparities across disparate socioeconomic and demographic cohorts.
- Data Privacy & HIPAA: Ensuring strict zero-data-retention sandboxing and encryption during clinical inference.

## Conclusion & Health-System Roadmap
Integrating generative AI into modern medicine demands an augmented intelligence paradigm—keeping the clinician firmly in the decision-making loop while automating high-friction cognitive overhead across diagnostics, documentation, and care coordination.`;

export const SAMPLE_RENEWABLE_ENERGY_TEXT = `# Introduction to Renewable Energy: Grid Parity, Intermittency & Storage (DEMO CONTENT)

## Executive Overview
The global energy transition is accelerating as utility-scale solar photovoltaic (PV) and onshore wind reach unprecedented cost competitiveness. Over the past decade, levelized cost of energy (LCOE) for solar has dropped by over 88%, while wind energy has plummeted by 68%. In over two-thirds of the world, building new renewable capacity is now cheaper than operating existing coal or natural gas facilities.

## The Dual Challenge: Intermittency and Curtailment
While generation economics have reached grid parity, renewable energy sources remain inherently intermittent. Solar output peaks during midday, creating the well-documented 'duck curve' phenomenon where net load drops dramatically before surging in the evening as residential consumption rises. 

When renewable generation exceeds instantaneous grid transmission capacity, system operators must order curtailment—intentionally wasting clean electrons to prevent transmission line overload and frequency instability. In regions like California and South Australia, annual curtailment now exceeds 5% of total renewable generation.

## Energy Storage Architecture: The Keystone of Decarbonization
Bridging the gap between variable generation and rigid load demand requires a multi-tiered energy storage hierarchy:
1. Short-Duration Storage (2 to 4 hours): Lithium-iron-phosphate (LFP) utility battery systems dominate frequency regulation and diurnal peak shaving.
2. Medium-Duration Storage (8 to 24 hours): Flow batteries (vanadium redox) and compressed air energy storage provide dispatchable reserves.
3. Long-Duration & Seasonal Storage (weeks to months): Green hydrogen produced via water electrolysis during peak curtailment hours.

## Grid Modernization and High-Voltage DC (HVDC) Transmission
Modernizing the grid with ultra-high-voltage direct current (UHVDC) transmission lines allows long-distance power transfer across thousands of miles with less than 3% transmission loss per 1,000 kilometers, connecting desert solar and wind corridors to coastal load centers.

## Conclusion and Capital Allocation Strategy
Decarbonizing the electrical grid by 2035 is technically feasible through a balanced triad: aggressive renewable deployment, distributed multi-hour battery storage, and interconnected continental transmission corridors.`;

export const SAMPLE_AI_AGENTS_TEXT = `# Autonomous AI Agents: Tool Calling, Memory Systems & Orchestration (DEMO CONTENT)

## The Shift from Static LLMs to Agentic Workflows
The artificial intelligence paradigm has shifted from single-turn autocomplete prompts to multi-step autonomous agent architectures. Real-world utility requires agents to form goals, decompose tasks, query external knowledge, inspect environmental feedback, and self-correct across execution cycles.

## Core Architectural Pillars
Modern production agent systems rely on four foundational components:
1. Cognitive Planning & Task Decomposition: Breaking down complex objectives into sequential DAGs leveraging ReAct and Reflexion.
2. Tool Calling & Function Execution: Providing deterministic JSON schemas for external APIs (databases, terminals, browser sandboxes).
3. Memory Subsystems: Working memory context, episodic vector retrieval, and procedural schemas.
4. Evaluation and Guardrails: Real-time schema validation and human-in-the-loop triggers.

## Engineering Challenges: Latency, Cost, and Error Cascades
If each discrete step in an 8-step agentic loop has a 95% success rate, the overall workflow success drops to (0.95)^8 = 66.3%. Robust production systems employ deterministic fallbacks, retry policies with backoff, and state rollback mechanisms.`;

export const SAMPLE_DOCUMENTS: Record<string, { title: string; type: 'sample'; content: string }> = {
  'healthcare': {
    title: 'AI in Healthcare — Research Brief.pdf',
    type: 'sample',
    content: SAMPLE_HEALTHCARE_TEXT
  },
  'renewable-energy': {
    title: 'Introduction to Renewable Energy: Grid Parity.pdf',
    type: 'sample',
    content: SAMPLE_RENEWABLE_ENERGY_TEXT
  },
  'ai-agents': {
    title: 'Autonomous AI Agents: Tool Calling.docx',
    type: 'sample',
    content: SAMPLE_AI_AGENTS_TEXT
  }
};

export class DemoProvider {
  static getSampleDocument(key: 'healthcare' | 'renewable-energy' | 'ai-agents' = 'healthcare') {
    return SAMPLE_DOCUMENTS[key] || SAMPLE_DOCUMENTS['healthcare'];
  }

  static generateOutputs(source: SourceDocument, purposes: TransformationId[], configs: TransformationConfigs): OutputAsset[] {
    const isHealthcare = source.content.toLowerCase().includes('healthcare') || source.content.toLowerCase().includes('clinical') || source.title.toLowerCase().includes('healthcare');
    const isRenewable = source.content.toLowerCase().includes('renewable') || source.content.toLowerCase().includes('energy') || source.title.toLowerCase().includes('renewable');
    const isAgent = source.content.toLowerCase().includes('agent') || source.content.toLowerCase().includes('llm') || source.title.toLowerCase().includes('agent');

    return purposes.map(purposeId => {
      switch (purposeId) {
        case 'summary':
        case 'executive_brief':
          return this.createSummaryAsset(source, configs.summary, isHealthcare, isRenewable, isAgent);
        case 'flashcards':
        case 'key_concepts':
          return this.createFlashcardAsset(source, configs.flashcards, isHealthcare, isRenewable, isAgent);
        case 'quiz':
          return this.createQuizAsset(source, configs.quiz, isHealthcare, isRenewable, isAgent);
        case 'presentation_outline':
          return this.createOutlineAsset(source, configs.outline, isHealthcare, isRenewable, isAgent);
        case 'speaking_script':
          return this.createScriptAsset(source, configs.script, isHealthcare, isRenewable, isAgent);
        case 'linkedin_post':
        case 'x_post':
        case 'instagram_caption':
          return this.createSocialAsset(source, configs.social, purposeId, isHealthcare, isRenewable, isAgent);
        default:
          return this.createSummaryAsset(source, configs.summary, isHealthcare, isRenewable, isAgent);
      }
    });
  }

  private static createSummaryAsset(
    source: SourceDocument, 
    config: TransformationConfigs['summary'],
    isHealthcare: boolean,
    isRenewable: boolean,
    isAgent: boolean
  ): OutputAsset {
    let data: SummaryData;

    if (isHealthcare) {
      data = {
        overview: "Artificial Intelligence has transitioned from experimental exploration into clinical frontline deployment across diagnostics, ambient documentation, and patient risk stratification. Frontline applications demonstrate over 94% diagnostic sensitivity in radiology screening and up to 45% reduction in physician administrative burnout, provided rigorous SaMD regulatory safeguards and HIPAA sandboxing remain enforced.",
        keyInsights: [
          "Diagnostic imaging and multimodal fusion (DICOM + EHR + genomics) are achieving clinical-grade screening sensitivity for pulmonary and oncology indications.",
          "Ambient clinical intelligence models autonomously generate structured SOAP documentation, cutting after-hours documentation workload by 45%.",
          "Regulatory adherence is central: The FDA has cleared 500+ Software as a Medical Device (SaMD) algorithms requiring active calibration monitoring.",
          "Augmented intelligence—maintaining the clinician firmly in the loop—is the required paradigm for responsible health-system adoption."
        ],
        importantConcepts: [
          {
            term: "Multimodal Clinical Fusion",
            explanation: "Integrating radiology imaging with longitudinal EHR text, laboratory panels, and genomics into unified patient risk scores."
          },
          {
            term: "Ambient Clinical Intelligence",
            explanation: "Real-time acoustic parsing of doctor-patient dialogue that automatically synthesizes structured SOAP medical notes."
          },
          {
            term: "Software as a Medical Device (SaMD)",
            explanation: "Regulatory classification for standalone algorithms executing clinical diagnostic or triage functions under FDA oversight."
          },
          {
            term: "Calibration Drift",
            explanation: "The gradual degradation of AI accuracy over time due to shifts in hospital demographics, scanner hardware, or clinical protocols."
          }
        ],
        takeaways: [
          "Deploy ambient scribing tools first to capture immediate ROI in physician retention and burnout reduction.",
          "Implement continuous calibration monitoring to prevent clinical model drift.",
          "Ground all clinical decision aids in verifiable multimodal patient records."
        ]
      };
    } else if (isRenewable) {
      data = {
        overview: "Renewable energy has achieved global cost parity, with solar LCOE down 88% and wind down 68%. The primary bottleneck has shifted from generation cost to system flexibility, storage duration hierarchies, and continental HVDC transmission corridors.",
        keyInsights: [
          "Generation is no longer the bottleneck; system flexibility, transmission capacity, and storage duration now dictate transition speed.",
          "The 'Duck Curve' illustrates severe midday overproduction followed by steep evening ramps, driving curtailment rates above 5% in leading regions.",
          "Storage requires a distinct duration hierarchy: Lithium-LFP for 2-4 hr diurnal peaks, Flow/Pumped-Hydro for 8-24 hr margins, and Green Hydrogen for seasonal reserves.",
          "Ultra-High-Voltage DC (UHVDC) transmission reduces inter-regional power loss to <3% per 1,000 km, bridging geographical production mismatches."
        ],
        importantConcepts: [
          {
            term: "Levelized Cost of Energy (LCOE)",
            explanation: "The net present value of the unit-cost of electricity over the entire operational lifetime of a generating plant."
          },
          {
            term: "Grid Parity",
            explanation: "The point where alternative energy generates power at cost equal to or below traditional utility grid electricity."
          },
          {
            term: "Curtailment",
            explanation: "Deliberate reduction of clean energy generation ordered by operators when transmission capacity is overloaded."
          }
        ],
        takeaways: [
          "Deploy firming storage assets in parallel with new generation capacity.",
          "Prioritize high-voltage transmission interconnects to smooth regional weather variances."
        ]
      };
    } else if (isAgent) {
      data = {
        overview: "Autonomous AI agents represent a structural evolution from single-turn autocomplete prompts to goal-driven execution engines. By coupling cognitive decomposition with external API tool execution, multi-tiered memory systems, and runtime guardrails, agents autonomously resolve complex multi-step workflows.",
        keyInsights: [
          "Compound error cascades represent the primary reliability constraint: an 8-step pipeline with 95% step accuracy yields only 66% overall reliability.",
          "Deterministic JSON function schemas bridge probabilistic LLM outputs with reliable enterprise APIs.",
          "Production systems require distinct memory layers: Working Context, Vector Episodic Memory, and Procedural Workflows."
        ],
        importantConcepts: [
          {
            term: "ReAct Framework",
            explanation: "Interleaving Reasoning (thought traces) and Acting (tool invocation) for real-time problem solving."
          },
          {
            term: "Compound Error Rate",
            explanation: "The exponential degradation of end-to-end task completion as the number of sequential probabilistic steps increases."
          }
        ],
        takeaways: [
          "Wrap tool calls in deterministic schema validators and retry boundaries.",
          "Isolate planning agents from execution sandboxes to prevent unhandled side effects."
        ]
      };
    } else {
      // Dynamic parser for arbitrary user uploaded content
      const sentences = source.content.match(/[^.!?]+[.!?]+/g)?.map(s => s.trim()) || [source.content.slice(0, 180)];
      const paragraphs = source.content.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

      data = {
        overview: paragraphs[0]?.slice(0, 320) || `Executive synthesis of ${source.title}.`,
        keyInsights: sentences.slice(1, 5).map(s => s.replace(/^[#\s*-]+/, '')),
        importantConcepts: source.detectedStructure.keyConcepts.slice(0, 4).map(c => ({
          term: c,
          explanation: `Key functional concept extracted directly from '${source.title}'.`
        })),
        takeaways: [
          `Execute structured procedural workflows aligned with ${source.title}.`,
          `Validate operational checkpoints to ensure baseline quality compliance.`,
          `Monitor performance against the extracted domain metrics.`
        ]
      };
    }

    return {
      id: `asset-summary-${Date.now()}`,
      sourceId: source.id,
      sourceTitle: source.title,
      purposeId: 'summary',
      title: `${config.format.toUpperCase()} Synthesis — ${source.title.replace(/\.[^/.]+$/, '')}`,
      category: 'summarize',
      format: `${config.format} / ${config.tone}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      payload: { type: 'summary', data },
      validationSignals: {
        sourceContext: true,
        structure: true,
        requestedFormat: true,
        missingSections: 0,
        sourceGrounded: true
      }
    };
  }

  private static createFlashcardAsset(
    source: SourceDocument,
    config: TransformationConfigs['flashcards'],
    isHealthcare: boolean,
    isRenewable: boolean,
    isAgent: boolean
  ): OutputAsset {
    let cards: FlashcardData['cards'];

    if (isHealthcare) {
      cards = [
        {
          id: 'fc-1',
          question: 'What clinical diagnostic sensitivity has medical imaging AI achieved in early oncology screening?',
          answer: 'Convolutional neural networks and vision transformers have demonstrated diagnostic sensitivity exceeding 94% in pulmonary nodule and mammographic screening.',
          category: 'Diagnostic Imaging'
        },
        {
          id: 'fc-2',
          question: 'How does Ambient Clinical Intelligence reduce physician burnout?',
          answer: 'By capturing clinician-patient conversations in real-time and autonomously generating structured SOAP notes, reducing after-hours documentation workload by ~45%.',
          category: 'Clinical Workflows'
        },
        {
          id: 'fc-3',
          question: 'What is Software as a Medical Device (SaMD)?',
          answer: 'Software intended to be used for one or more medical purposes without being part of a hardware medical device, subject to FDA safety and calibration oversight.',
          category: 'Regulatory Governance'
        },
        {
          id: 'fc-4',
          question: 'What is Multimodal Clinical Fusion?',
          answer: 'Combining high-resolution DICOM imaging with longitudinal EHR text, lab panels, and genomic profiles to synthesize comprehensive patient risk predictions.',
          category: 'AI Architecture'
        },
        {
          id: 'fc-5',
          question: 'Why is Calibration Drift a critical safety risk in healthcare AI?',
          answer: 'Changes in patient demographics, imaging hardware, or hospital protocols over time can degrade model accuracy without proactive monitoring.',
          category: 'Model Governance'
        }
      ];
    } else if (isRenewable) {
      cards = [
        {
          id: 'fc-1',
          question: 'What is Levelized Cost of Energy (LCOE)?',
          answer: 'The net present value of unit-cost electricity over the entire operational lifetime of a generating plant including capital, maintenance, and decommissioning.',
          category: 'Economics'
        },
        {
          id: 'fc-2',
          question: 'Why does the Duck Curve create grid reliability challenges?',
          answer: 'Midday solar output drops net load to near-zero, followed by an aggressive evening ramp as solar drops and residential demand surges.',
          category: 'Grid Dynamics'
        },
        {
          id: 'fc-3',
          question: 'What is renewable curtailment and why is it ordered?',
          answer: 'Deliberate reduction of clean energy generation ordered by operators when localized generation exceeds transmission line capacity.',
          category: 'Grid Dynamics'
        },
        {
          id: 'fc-4',
          question: 'What storage technology dominates short-duration (2-4 hr) peak shaving?',
          answer: 'Lithium-iron-phosphate (LFP) utility batteries due to high round-trip efficiency and rapid discharge response.',
          category: 'Storage Tech'
        }
      ];
    } else {
      const terms = source.detectedStructure.keyConcepts.length > 0 
        ? source.detectedStructure.keyConcepts 
        : source.detectedStructure.topics;

      cards = terms.slice(0, 5).map((term, idx) => ({
        id: `fc-c-${idx}`,
        question: `How does "${term}" function within ${source.title}?`,
        answer: `It serves as a core functional mechanism identified in the source text, driving system outcomes.`,
        category: 'Core Concepts'
      }));
    }

    return {
      id: `asset-flashcards-${Date.now()}`,
      sourceId: source.id,
      sourceTitle: source.title,
      purposeId: 'flashcards',
      title: `Interactive Mastery Flashcards (${cards.length} Cards)`,
      category: 'learn',
      format: `${cards.length} Interactive Cards`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      payload: { type: 'flashcards', data: { cards } },
      validationSignals: {
        sourceContext: true,
        structure: true,
        requestedFormat: true,
        missingSections: 0,
        sourceGrounded: true
      }
    };
  }

  private static createQuizAsset(
    source: SourceDocument,
    config: TransformationConfigs['quiz'],
    isHealthcare: boolean,
    isRenewable: boolean,
    isAgent: boolean
  ): OutputAsset {
    let questions: QuizData['questions'];
    let conceptsToRevise: string[];

    if (isHealthcare) {
      questions = [
        {
          id: 'q-1',
          question: 'By approximately what percentage does ambient documentation software reduce after-hours clinician paperwork?',
          options: ['Around 45%', 'Less than 10%', 'Exactly 95%', 'It increases documentation time'],
          correctIndex: 0,
          explanation: 'As documented in the research brief, ambient clinical intelligence pilots cut after-hours documentation by ~45% via automated SOAP note synthesis.',
          concept: 'Ambient Clinical Workflows'
        },
        {
          id: 'q-2',
          question: 'What diagnostic screening sensitivity have vision transformers and CNNs demonstrated in early radiology screening?',
          options: [
            'Exceeding 94% sensitivity for pulmonary and oncology indications',
            'Under 50% sensitivity requiring manual re-reading of all slices',
            'Approximately 70% with high false-negative ratios',
            'Clinical sensitivity cannot be measured'
          ],
          correctIndex: 0,
          explanation: 'Frontline radiology AI achieves >94% sensitivity on benchmark oncology and pulmonary nodule detection tasks.',
          concept: 'Diagnostic Precision'
        },
        {
          id: 'q-3',
          question: 'How many Software as a Medical Device (SaMD) algorithms has the FDA cleared for clinical use?',
          options: [
            'Over 500 SaMD algorithms',
            'Zero algorithms due to federal prohibitions',
            'Exactly 12 experimental prototypes',
            'Over 50,000 unverified models'
          ],
          correctIndex: 0,
          explanation: 'The FDA regulatory framework has cleared over 500 SaMD algorithms, primarily across radiology, cardiology, and pathology.',
          concept: 'Regulatory Governance'
        },
        {
          id: 'q-4',
          question: 'What is the augmented intelligence paradigm in modern clinical medicine?',
          options: [
            'Keeping the clinician firmly in the loop while automating cognitive overhead',
            'Replacing doctors entirely with autonomous AI hospital directors',
            'Eliminating medical records and clinical notes',
            'Restricting patient data to local analog paper files'
          ],
          correctIndex: 0,
          explanation: 'Clinical augmented intelligence preserves clinician oversight while removing manual documentation and triage friction.',
          concept: 'Augmented Clinical Paradigm'
        }
      ];
      conceptsToRevise = ['SaMD Post-Market Surveillance', 'Ambient EHR Synching'];
    } else if (isRenewable) {
      questions = [
        {
          id: 'q-1',
          question: 'By what percentage has the Levelized Cost of Energy (LCOE) for utility solar dropped over the last decade?',
          options: ['Over 88%', 'Approximately 42%', 'Around 25%', 'It remained unchanged'],
          correctIndex: 0,
          explanation: 'Solar PV LCOE has declined by more than 88%, making it cheaper than operating existing thermal plants.',
          concept: 'LCOE & Grid Parity'
        },
        {
          id: 'q-2',
          question: 'What primary physical condition triggers renewable curtailment by grid operators?',
          options: [
            'Excess generation exceeding transmission capacity or risking frequency overload',
            'Cloud cover reducing solar panel voltage below operating minimums',
            'Routine bi-weekly inverter software reboot cycles',
            'Mandatory government carbon credit quota limits'
          ],
          correctIndex: 0,
          explanation: 'Curtailment is enacted when localized clean power cannot be absorbed by the grid or transmitted out.',
          concept: 'Curtailment & Transmission'
        }
      ];
      conceptsToRevise = ['Storage Hierarchy Allocation', 'Transmission Congestion'];
    } else {
      questions = [
        {
          id: 'q-1',
          question: `What is the central operational premise established in ${source.title}?`,
          options: [
            'Structured execution aligned with core domain principles ensures reliable outcomes',
            'Complete reliance on unverified ad-hoc workflows',
            'Disregard for scalability constraints',
            'Elimination of structured verification checks'
          ],
          correctIndex: 0,
          explanation: 'Verified directly against the source text.',
          concept: 'Core Architecture'
        }
      ];
      conceptsToRevise = ['Operational Protocols'];
    }

    return {
      id: `asset-quiz-${Date.now()}`,
      sourceId: source.id,
      sourceTitle: source.title,
      purposeId: 'quiz',
      title: `Diagnostic Assessment Quiz (${questions.length} Questions)`,
      category: 'assess',
      format: `${questions.length} MCQs / ${config.difficulty.toUpperCase()}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      payload: { type: 'quiz', data: { questions, conceptsToRevise } },
      validationSignals: {
        sourceContext: true,
        structure: true,
        requestedFormat: true,
        missingSections: 0,
        sourceGrounded: true
      }
    };
  }

  private static createOutlineAsset(
    source: SourceDocument,
    config: TransformationConfigs['outline'],
    isHealthcare: boolean,
    isRenewable: boolean,
    isAgent: boolean
  ): OutputAsset {
    let data: PresentationOutlineData;

    if (isHealthcare) {
      data = {
        title: "AI in Healthcare: Diagnostic Precision & Clinical Workflows",
        theme: "Clinical Innovation, Physician Retention & Regulatory Safety",
        targetAudience: "Hospital Chief Medical Officers, Clinical Informatics & Health-System Executives",
        slides: [
          {
            slideNumber: 1,
            title: "The Augmented Intelligence Horizon in Clinical Medicine",
            bullets: [
              "Transition from speculative algorithm research to hospital frontline infrastructure",
              "Primary ROI: Accelerated diagnostic triage and drastic documentation burden relief",
              "Guiding principle: Clinician-in-the-loop augmented intelligence over black-box autonomy"
            ],
            speakerNotes: "Open by emphasizing that AI is not replacing physicians—it is eliminating the cognitive friction and EHR burnout that currently drives doctors away from patient care."
          },
          {
            slideNumber: 2,
            title: "Medical Imaging & Multimodal Foundation Models",
            bullets: [
              "Radiology screening: >94% diagnostic sensitivity in pulmonary nodules and oncology lesions",
              "Multimodal synthesis: Fusing DICOM imaging with longitudinal EHR text and lab panels",
              "Real-time triage: Surfacing acute findings (intracranial hemorrhage, pulmonary embolism) to top of worklists"
            ],
            speakerNotes: "Highlight how multimodal models break clinical silos. Combining image pixels with patient lab history prevents false positives."
          },
          {
            slideNumber: 3,
            title: "Ambient Clinical Intelligence & Documentation Relief",
            bullets: [
              "Physicians currently dedicate 35%+ of clinic hours to administrative EHR entry",
              "Ambient listening captures conversational audio and generates structured SOAP notes",
              "Early health-system deployments document a 45% reduction in after-hours documentation"
            ],
            speakerNotes: "Address physician retention directly. Ambient scribing restores eye contact to doctor-patient relationships and directly reduces clinical turnover."
          },
          {
            slideNumber: 4,
            title: "Regulatory Compliance & Algorithmic Guardrails",
            bullets: [
              "FDA SaMD oversight: 500+ cleared medical algorithms requiring ongoing calibration monitoring",
              "Algorithmic fairness: Active demographic cohort auditing to prevent diagnostic disparities",
              "HIPAA & Sandboxing: Zero-retention inference pipelines preserving strict patient confidentiality"
            ],
            speakerNotes: "Explain the risk mitigation strategy. Health systems must mandate continuous drift monitoring so models don't degrade when patient demographics change."
          },
          {
            slideNumber: 5,
            title: "Strategic 2026 Health-System Implementation Roadmap",
            bullets: [
              "Phase 1: Roll out ambient documentation across high-burnout outpatient clinics",
              "Phase 2: Integrate verified SaMD diagnostic triage in radiology and pathology",
              "Phase 3: Establish clinical governance committees for ongoing algorithmic auditing"
            ],
            speakerNotes: "Conclude with the clear call-to-action for hospital leadership: Begin with ambient documentation for rapid clinician buy-in, then scale into diagnostic support."
          }
        ]
      };
    } else if (isRenewable) {
      data = {
        title: "Renewable Energy: Grid Parity, Intermittency & Storage",
        theme: "Clean Energy Infrastructure & Capital Strategy",
        targetAudience: "Energy Executives, Grid Operators & Institutional Investors",
        slides: [
          {
            slideNumber: 1,
            title: "Executive Thesis: Generation Parity vs Grid Bottlenecks",
            bullets: [
              "Solar PV LCOE dropped 88% and onshore wind 68% over the past decade",
              "Renewable power is cheaper than fossil baselines in >70% of global markets",
              "Bottleneck has shifted entirely from generation cost to grid firming and storage"
            ],
            speakerNotes: "Open by establishing that generation economics are won. Our challenges now reside in system architecture and transmission."
          },
          {
            slideNumber: 2,
            title: "The Physics of Intermittency & The Duck Curve",
            bullets: [
              "Midday solar abundance drops net load to near zero",
              "Evening sunset triggers steep multi-gigawatt ramp requirements",
              "Curtailment exceeds 5% annually in leading markets (California, South Australia)"
            ],
            speakerNotes: "Point out the Duck Curve graph on the slide. Curtailment represents pure economic waste unless captured by storage."
          }
        ]
      };
    } else {
      const sections = source.detectedStructure.sections.slice(0, 4);
      data = {
        title: `Strategic Briefing: ${source.title.replace(/\.[^/.]+$/, '')}`,
        theme: "Executive Strategy & Operational Alignment",
        targetAudience: "Technical Teams & Decision Makers",
        slides: sections.map((sec, idx) => ({
          slideNumber: idx + 1,
          title: sec,
          bullets: [
            `Core operational finding extracted from ${sec}.`,
            `Key procedural dependency and risk mitigation checkpoint.`,
            `Measurable metric for evaluating execution success.`
          ],
          speakerNotes: `Walk through ${sec} focusing on execution and measurable progress.`
        }))
      };
    }

    return {
      id: `asset-outline-${Date.now()}`,
      sourceId: source.id,
      sourceTitle: source.title,
      purposeId: 'presentation_outline',
      title: `Presentation Slide Outline (${data.slides.length} Slides)`,
      category: 'present',
      format: `${data.slides.length} Slides / Speaker Notes`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      payload: { type: 'presentation_outline', data },
      validationSignals: {
        sourceContext: true,
        structure: true,
        requestedFormat: true,
        missingSections: 0,
        sourceGrounded: true
      }
    };
  }

  private static createScriptAsset(
    source: SourceDocument,
    config: TransformationConfigs['script'],
    isHealthcare: boolean,
    isRenewable: boolean,
    isAgent: boolean
  ): OutputAsset {
    let sections: ScriptData['sections'];

    if (isHealthcare) {
      sections = [
        {
          heading: "Opening Hook & The Real Problem",
          timestamp: "00:00 - 00:40",
          content: "Good morning colleagues. If you ask any physician what is truly breaking modern healthcare, they won't tell you it's medical science. They will tell you it's the computer screen. Today, doctors spend more than one-third of their clinic hours entering documentation into electronic health records—driving unprecedented burnout and taking human empathy out of patient exams."
        },
        {
          heading: "The Breakthrough: Ambient & Diagnostic AI",
          timestamp: "00:40 - 01:30",
          content: "Now look at what artificial intelligence can actually deliver when properly engineered. In medical imaging, vision models achieve over 94% diagnostic sensitivity in early-stage oncology screening, flagging critical pulmonary nodules before symptoms appear. And with ambient clinical intelligence, acoustic models listen naturally to patient conversations and draft complete, structured SOAP notes in real-time. Early pilots show a 45% drop in after-hours paperwork."
        },
        {
          heading: "Regulatory Safeguards: Clinician-in-the-Loop",
          timestamp: "01:30 - 02:20",
          content: "Crucially, this is not autonomous medicine. The FDA has cleared over 500 Software as a Medical Device algorithms under a clear standard: augmented intelligence. The physician remains the pilot; the AI is the automated navigational instrument. We pair this with strict calibration monitoring to eliminate demographic bias and enforce zero-data-retention HIPAA sandboxes."
        },
        {
          heading: "Conclusion & Call to Action",
          timestamp: "02:20 - 03:00",
          content: "The goal of healthcare AI is not to replace the doctor. The goal is to give the doctor back to the patient. By automating cognitive overhead, we restore human connection to clinical care. The technology is proven, the regulatory pathways are established, and the time to implement is now. Thank you."
        }
      ];
    } else if (isRenewable) {
      sections = [
        {
          heading: "Opening Hook",
          timestamp: "00:00 - 00:35",
          content: "Good morning everyone. Over the last decade, the cost of solar energy dropped by 88%, and wind by 68%. In two-thirds of the world today, generating renewable electricity is strictly cheaper than simply burning coal or gas in existing plants. Grid parity is no longer a future forecast—it is today's baseline."
        },
        {
          heading: "The Core Dilemma: Intermittency & Curtailment",
          timestamp: "00:35 - 01:20",
          content: "Yet, our grids are choking on clean abundance. Look at California's famous Duck Curve: at midday, solar output peaks, dropping net grid demand to near zero. But when the sun sets, residential demand skyrockets, forcing peaker plants to ramp at breakneck speed. Worse, when transmission lines max out, operators order curtailment—literally discarding clean kilowatt-hours."
        },
        {
          heading: "The Solution Architecture: Storage & HVDC",
          timestamp: "01:20 - 02:15",
          content: "We solve this through an engineered storage hierarchy: 2-4 hour LFP batteries for diurnal peaks, flow batteries for multi-day gaps, and green hydrogen for seasonal storage. Pair this with Ultra-High-Voltage DC transmission that loses under 3% per 1,000 kilometers to bridge regional weather variations."
        },
        {
          heading: "Closing Call to Action",
          timestamp: "02:15 - 03:00",
          content: "The bottleneck is no longer solar panels—it is transmission, firming storage, and grid orchestration software. That is where institutional capital must flow. Thank you."
        }
      ];
    } else {
      const sentences = source.content.match(/[^.!?]+[.!?]+/g)?.map(s => s.trim()) || [];
      sections = [
        {
          heading: "Introduction & Context",
          timestamp: "00:00 - 00:45",
          content: `Welcome team. Today we are walking through '${source.title}'. ${sentences[0] || 'Focusing on high-signal takeaways for immediate practice.'}`
        },
        {
          heading: "Key Operational Findings",
          timestamp: "00:45 - 01:45",
          content: sentences.slice(1, 4).join(' ') || "The central theme is clear: isolated improvements deliver diminishing returns without coherent orchestration."
        },
        {
          heading: "Next Steps & Execution",
          timestamp: "01:45 - 02:30",
          content: sentences.slice(4, 7).join(' ') || "Let's align execution against our baseline KPIs and deliver tangible outcomes."
        }
      ];
    }

    const wordCount = sections.reduce((acc, s) => acc + s.content.split(/\s+/).length, 0);
    const estimatedMinutes = (wordCount / 130).toFixed(1);

    return {
      id: `asset-script-${Date.now()}`,
      sourceId: source.id,
      sourceTitle: source.title,
      purposeId: 'speaking_script',
      title: `Executive Keynote Script (${estimatedMinutes} min pace)`,
      category: 'present',
      format: `${estimatedMinutes} Min Speaking Script`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      payload: {
        type: 'speaking_script',
        data: {
          title: `Keynote: ${source.title.replace(/\.[^/.]+$/, '')}`,
          estimatedSpeakingTime: `${estimatedMinutes} min (@ 130 wpm)`,
          wordCount,
          sections
        }
      },
      validationSignals: {
        sourceContext: true,
        structure: true,
        requestedFormat: true,
        missingSections: 0,
        sourceGrounded: true
      }
    };
  }

  private static createSocialAsset(
    source: SourceDocument,
    config: TransformationConfigs['social'],
    platformId: TransformationId,
    isHealthcare: boolean,
    isRenewable: boolean,
    isAgent: boolean
  ): OutputAsset {
    const platform = config.platform;
    let data: SocialData;

    if (isHealthcare) {
      if (platform === 'linkedin') {
        data = {
          platform: 'linkedin',
          authorName: 'Siddhi Hiran (HealthTech Insights)',
          authorHandle: '@siddhi-healthtech',
          hook: "Physicians spend 35%+ of their clinic hours typing into EHRs instead of looking patients in the eye.\n\nHere is how clinical AI is cutting administrative burnout by 45% while driving diagnostic sensitivity past 94%:",
          body: "The clinical AI conversation has shifted from speculative replacement to operational augmentation:\n\n1️⃣ Diagnostic Precision: Vision transformers and CNNs in radiology achieve >94% sensitivity in early pulmonary and oncology screening.\n2️⃣ Ambient Documentation: Acoustic listening models segment doctor-patient dialogue and generate structured SOAP notes in real-time.\n3️⃣ Regulatory Governance: Over 500 SaMD algorithms cleared by the FDA—requiring active calibration drift monitoring.\n\nAI is not replacing the clinician. It is giving the clinician back to the patient.",
          callToAction: "How is your health system approaching ambient clinical documentation and AI governance this year?",
          hashtags: ['#HealthcareAI', '#HealthTech', '#ClinicalInformatics', '#PhysicianBurnout', '#SaMD', '#MedTech']
        };
      } else {
        data = {
          platform: 'x',
          authorName: 'ByteForce Intelligence',
          authorHandle: '@byteforce_tech',
          hook: "Doctors spend 35%+ of their time on medical paperwork.\n\nAmbient clinical AI just cut after-hours documentation by 45%:",
          body: "• Real-time acoustic capture -> structured SOAP notes\n• >94% sensitivity on early radiology screening\n• 500+ FDA SaMD clearances\n\nAugmented intelligence preserves the human doctor in the loop.",
          callToAction: "The future of clinical medicine is clinician augmentation.",
          hashtags: ['#HealthTech', '#HealthcareAI', '#MedTech']
        };
      }
    } else if (isRenewable) {
      data = {
        platform: 'linkedin',
        authorName: 'Siddhi Hiran (CleanTech Insights)',
        authorHandle: '@siddhi-cleantech',
        hook: "Solar PV is down 88%. Wind is down 68%. Building new clean energy is now cheaper than running existing coal plants in 70% of the world.\n\nSo why are power grids still curtailing gigawatts of clean electrons?",
        body: "Here is the truth about the energy transition:\n\n1️⃣ Generation Parity is solved.\n2️⃣ Flexibility & Storage is the bottleneck.\n\nAt noon, the Duck Curve crashes net load. By 7 PM, demand surges just as solar drops.\n\nWinning requires an engineered storage hierarchy (LFP for 2-4 hr peaks, flow batteries for 12 hrs, green hydrogen for seasonal reserves) and UHVDC corridors.",
        callToAction: "Where do you predict utility storage capital will deliver the highest ROI by 2028?",
        hashtags: ['#CleanEnergy', '#EnergyTransition', '#GridModernization', '#BatteryStorage']
      };
    } else {
      const sentences = source.content.match(/[^.!?]+[.!?]+/g)?.map(s => s.trim()) || [];
      data = {
        platform,
        authorName: 'ByteForce Intelligence',
        authorHandle: '@byteforce',
        hook: `Key takeaways from our latest synthesis: ${source.title}.`,
        body: `${sentences.slice(0, 3).map((s, i) => `${i + 1}. ${s}`).join('\n\n')}`,
        callToAction: "How are you automating your content transformation workflows?",
        hashtags: source.detectedStructure.topics.map(t => `#${t.replace(/\s+/g, '')}`).concat(['#Productivity', '#ByteForce'])
      };
    }

    return {
      id: `asset-social-${Date.now()}`,
      sourceId: source.id,
      sourceTitle: source.title,
      purposeId: platformId,
      title: `${platform.toUpperCase()} Thought Leadership Post`,
      category: 'publish',
      format: `${platform.toUpperCase()} / ${config.tone}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      payload: { type: 'social', data },
      validationSignals: {
        sourceContext: true,
        structure: true,
        requestedFormat: true,
        missingSections: 0,
        sourceGrounded: true
      }
    };
  }
}
