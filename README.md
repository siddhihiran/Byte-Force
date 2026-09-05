# BYTEFORCE 💻⚡

> **Transform Once. Create Everywhere.**  
> *Gen AI Platform for Automated Content Transformation*  
> **Problem Statement ID**: SIH26154  
> **Theme**: Smart Automation / Generative AI

---

## 👥 Team Details
- **Siddhi Hiran**
- **Shubham Chaudhary**
- **Nisha Chavan**
- **Vansh Jain**
- **Dhyan Patel**
- **Devesh Kumar Singh**

---

## 🎯 Core Product Proposition

> *"Existing AI tools generate responses. ByteForce orchestrates content transformation."*

Traditional AI chat interfaces force users into repetitive, manual cycles of prompting, copy-pasting, and reformatting for every single desired output. **ByteForce** introduces a purpose-driven orchestration layer that ingests a single source document and transforms it into multiple domain-specific, production-ready assets within one unified workspace:

```
      ONE SOURCE (PDF / DOCX / TXT / Paste)
                        ↓
                   UNDERSTAND
         (Concept Extraction & Intelligence)
                        ↓
                 CHOOSE PURPOSE
         (Learn | Assess | Present | Publish | Summarize)
                        ↓
                   TRANSFORM
         (7-Stage Orchestration Pipeline)
                        ↓
                   VALIDATE
        (Truthful Quality Check Heuristics)
                        ↓
              MANY USEFUL OUTPUTS
                        ↓
                 ONE WORKSPACE
```

---

### ✨ Key Capabilities

### 1. Source Intelligence (`SourceZone`)
- **Multi-Format Ingestion**: Upload PDF, DOCX, TXT, or paste raw notes/reports.
- **Pre-loaded Verification Sample**: *"AI in Healthcare — Research Brief.pdf (DEMO CONTENT)"* ready for instant 1-click evaluation.
- **Content Intelligence**: Real-time word count calculation, reading time estimates, and automatic structural breakdown (detected core concepts, terminology, and topic hierarchy).
- **Clear State Machine**: `EMPTY` → `SELECT SOURCE` → `PROCESSING` → `SOURCE READY ✓`.

### 2. Purpose Engine (`PurposeZone`)
Instead of prompt engineering, users select their intended outcome:
- 🎓 **LEARN**: Active-recall 3D interactive flashcards with flip animation, mastery tracking, and concept lexicons.
- 📝 **ASSESS**: Playable diagnostic multiple-choice quizzes with source-verified answer rationales, scoring, and retry functionality.
- 📊 **PRESENT**: Slide-by-slide presentation deck outline (bullets + speaker notes) and keynote speaking scripts with an integrated **Fullscreen Teleprompter Mode** (speed controls 1x/2x/3x).
- 🚀 **PUBLISH**: Platform-tailored social copy for LinkedIn, X (Twitter), and Instagram with hooks and hashtags.
- 📑 **SUMMARIZE**: Executive summaries, key insights, and actionable decision points.
- ⚡ **GENERATE COMPLETE PACK**: 1-click high-impact action generating all 6 supported assets in a single pass.

### 3. Truthful Quality Check (`ValidationBadge`)
ByteForce verifies structural compliance without synthetic, fake confidence percentages:
- **Source Context**: Verified ✓
- **Structure**: Compliant ✓
- **Requested Format**: Valid ✓
- **Missing Sections**: 0
- **Source-grounded**: Verified from source document

### 4. Human Control & Continuous Workflow
- **Edit & Regenerate**: Modify any generated text, question, or slide notes inline.
- **Export Bundle**: Download all generated assets into a unified Markdown bundle (`.md`).
- **Save & Library**: Save key assets to local persistent storage.
- **Continuous Golden Journey**: High-visibility *"Switch Purpose / Generate Another Output"* keeps the current source active for rapid multi-purpose iteration.
- **Transformation History**: Searchable history with 1-click reopen to restore past transformation runs.

---

## 🚀 Quickstart & Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm / pnpm / yarn

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/byteforce.git
cd byteforce

# Install dependencies
npm install

# Start development server
npm run dev -- --host 0.0.0.0 --port 5173
```

### Production Build
```bash
# Run TypeScript compilation and Vite production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Live URLs

- **Local Machine**: [http://localhost:5173/](http://localhost:5173/) or [http://127.0.0.1:5173/](http://127.0.0.1:5173/)
- **Local Network / Mobile / Wi-Fi**: [http://10.131.101.200:5173/](http://10.131.101.200:5173/)
- **Public Tunnel**: [https://byteforce-sih.loca.lt](https://byteforce-sih.loca.lt)

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build Tooling** | Vite 8 (HMR, sub-200ms builds) |
| **Styling** | Modern CSS Design System (Tailored dark palette `#07090d`, Glassmorphism, CSS Variables) |
| **Icons & Micro-UI** | Lucide React |
| **Interactive FX** | Canvas Confetti, 3D CSS Card Flips, Teleprompter Animation Engine |
| **Storage** | LocalStorage state persistence with graceful fallbacks |

---

## ⏱️ 60-Second Hackathon Judge Demo Script

1. **0:00 - 0:10**: Open [http://localhost:5173/](http://localhost:5173/). Observe the clear differentiator: *"Existing AI tools generate responses. ByteForce orchestrates content transformation."* Click **`TRY DEMO`**.
2. **0:10 - 0:20**: Observe the loaded source: *"AI in Healthcare — Research Brief.pdf"*. Notice the instant word count and extracted concept tags.
3. **0:20 - 0:35**: Click **`GENERATE COMPLETE PACK (All Outputs)`**. Watch the 7-stage architectural pipeline finish in ~1.3 seconds.
4. **0:35 - 0:50**: Explore the output workspace:
   - Click **Flashcards** → flip cards and mark as mastered.
   - Click **Quiz** → answer a question, view rationale and score.
   - Click **Slide Outline** → inspect slides and speaker notes.
   - Click **Speaking Script** → toggle **Teleprompter Mode** and test speed.
   - Inspect the **QUALITY CHECK** bar: `Source Context: Verified ✓ • Structure: Compliant ✓ • Missing Sections: 0 • Source-grounded ✓`.
5. **0:50 - 1:00**: Click **`Switch Purpose / Generate Another Output`** at the bottom to demonstrate the continuous workflow from the same source!

---

*Built with passion for Smart India Hackathon (SIH26154).*
