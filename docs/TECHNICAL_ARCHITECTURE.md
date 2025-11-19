# Rhythm - Technical Architecture

## Overview
A chat-based web application where users input product/service information and an LLM generates compliant pharmaceutical marketing content.

---

## Tech Stack

### Frontend
- **Next.js 15** (App Router) - Already installed
- **React 19** - UI components
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

### Backend / API
- **Next.js API Routes** - Server-side logic
- **OpenRouter API** - LLM gateway (flexible model switching)
- **Default Model:** GPT-4, Claude Sonnet, or others
- **Streaming responses** - Real-time chat experience

### Data Storage (Phase 1 - Demo)
- **In-memory** - Session-based (no database yet)
- **Local state** - React useState/useContext
- **Knowledge base** - Static markdown files loaded into prompts

### Future (Phase 2)
- **Supabase** - User accounts, content history, templates
- **Zyflow** - Content review workflow
- **Veeva Vault** - MLR integration

---

## Application Architecture

```
┌─────────────────────────────────────────────────────┐
│                     User Interface                   │
│  ┌────────────────────────────────────────────────┐ │
│  │  Content Type Selector                         │ │
│  │  (HCP Email / Social Media / Patient Email)    │ │
│  └────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────┐ │
│  │           Chat Interface                        │ │
│  │  • User inputs product info                    │ │
│  │  • LLM asks clarifying questions               │ │
│  │  • Conversational data collection              │ │
│  └────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────┐ │
│  │         Content Preview                         │ │
│  │  • HTML Email Preview                          │ │
│  │  • Social Media Post Preview                   │ │
│  │  • Export/Download options                     │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│               Next.js API Layer                      │
│  ┌────────────────────────────────────────────────┐ │
│  │  /api/chat                                     │ │
│  │  • Receives user messages                      │ │
│  │  • Manages conversation context                │ │
│  │  • Routes to OpenAI                            │ │
│  └────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────┐ │
│  │  /api/generate                                 │ │
│  │  • Generates final content                     │ │
│  │  • Applies compliance rules                    │ │
│  │  • Returns formatted output                    │ │
│  └────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────┐
│              OpenRouter API                          │
│  • Routes to: GPT-4, Claude, Gemini, etc.          │
│  • System prompts (compliance rules)                │
│  • Knowledge base (Rhythm data)                     │
│  • Content generation logic                         │
└─────────────────────────────────────────────────────┘
```

---

## User Flow

### 1. Landing Page
- User sees clean interface
- Options: "Create HCP Email", "Create Social Post", "Create Patient Email"

### 2. Content Type Selection
User selects what they want to create:
- **HCP Email** (MOA, Summary, Dosing)
- **Social Media Post** (Facebook, Instagram, X)
- **Patient Email**
- **Banner Ad** (future)

### 3. Chat-Based Information Collection

**Example for HCP Email:**

```
AI: Hi! I'll help you create an HCP email for IMCIVREE. Let's start with a few questions.

AI: What type of HCP email would you like to create?
    1. Mechanism of Action (MOA)
    2. Clinical Summary
    3. Dosing Information

User: MOA

AI: Great! Who is your target audience?
    • Endocrinologists
    • Pediatricians
    • General practitioners
    • Other (please specify)

User: Endocrinologists

AI: What segment are they in?
    • Loyalists (already prescribe IMCIVREE)
    • Champions (advocates for the product)
    • Open to learning
    • Skeptics

User: Open to learning

AI: What's the key message you want to convey?

User: How IMCIVREE works through the MC4R pathway to address genetic obesity in BBS patients.

AI: Perfect! Do you want to emphasize any specific data points?
    • Clinical efficacy (weight reduction)
    • Mechanism of action
    • Safety profile
    • Patient outcomes

User: Mechanism of action and clinical efficacy

AI: Generating your HCP email now...
```

### 4. Content Generation

AI generates:
- 3 subject lines
- 3 preheaders
- Full email body with:
  - Hero section with appropriate image
  - Key messages with proper structure
  - Superscripted references
  - Full ISI block
  - Legal footer

### 5. Preview & Refinement

- Display HTML preview of email
- User can ask for changes:
  - "Make the subject line more engaging"
  - "Add more information about dosing"
  - "Shorten the body copy"
- AI refines and regenerates

### 6. Export

- Download HTML file
- Copy to clipboard
- Email to self (future)

---

## Key Features

### Chat Interface
- Real-time streaming responses
- Message history
- Context retention within session
- Clear conversation flow
- Helpful prompts and suggestions

### Content Generation Engine

**System Prompts by Content Type:**

1. **HCP Email Prompt**
   - Load email copywriting rules
   - Load IMCIVREE knowledge base
   - Apply AMA reference formatting
   - Include ISI block
   - Use approved images

2. **Social Media Prompt**
   - Load platform-specific rules
   - Load social media writer persona
   - Apply character limits
   - Generate hashtags
   - Suggest visuals

3. **Patient Email Prompt**
   - Use 6th-grade reading level
   - Compassionate tone
   - Simplified medical terminology
   - Patient ISI version

### Preview Components

**Email Preview:**
- Renders full HTML
- Shows exactly how email will look
- Responsive design
- Includes all branding (colors, logos, fonts)

**Social Media Preview:**
- Platform-specific mockup
- Character count
- Hashtag display
- Image placeholder
- "Post ready" indicator

### Compliance Enforcement

**Automatic Checks:**
- ✓ ISI included
- ✓ References properly formatted
- ✓ No off-label claims
- ✓ Character limits respected
- ✓ Brand colors used
- ✓ No product name in subject lines
- ✓ Reading level appropriate

---

## File Structure

```
rhythm/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── chat/
│   │   └── page.tsx                # Main chat interface
│   ├── api/
│   │   ├── chat/
│   │   │   └── route.ts            # Chat API endpoint
│   │   └── generate/
│   │       └── route.ts            # Content generation endpoint
│   └── layout.tsx
├── components/
│   ├── chat/
│   │   ├── ChatInterface.tsx       # Main chat component
│   │   ├── MessageList.tsx         # Display messages
│   │   ├── InputBar.tsx            # User input
│   │   └── ContentTypeSelector.tsx # Select content type
│   ├── preview/
│   │   ├── EmailPreview.tsx        # HTML email display
│   │   ├── SocialPreview.tsx       # Social media mockup
│   │   └── ExportButtons.tsx       # Download/copy options
│   └── ui/
│       ├── Button.tsx
│       ├── Card.tsx
│       └── ...                     # Reusable UI components
├── lib/
│   ├── openrouter.ts               # OpenRouter client setup
│   ├── prompts/
│   │   ├── hcp-email.ts            # HCP email system prompt
│   │   ├── social-media.ts         # Social media system prompt
│   │   └── patient-email.ts        # Patient email system prompt
│   └── knowledge-base/
│       ├── imcivree-data.ts        # Load scraped data
│       └── compliance-rules.ts     # ISI blocks, rules
├── docs/
│   ├── PROJECT_REQUIREMENTS.md     # Full requirements
│   ├── IMCIVREE_KNOWLEDGE_BASE.md  # Brand/safety info
│   ├── TECHNICAL_ARCHITECTURE.md   # This file
│   └── rhythm-pharmaceuticals-comprehensive-data.md
├── public/
│   └── images/
│       └── imcivree-logo.png
└── .env.local
    └── OPENAI_API_KEY=...
```

---

## Environment Variables

```bash
# OpenRouter
OPENROUTER_API_KEY=sk-or-v1-...
OPENROUTER_MODEL=openai/gpt-4-turbo  # or anthropic/claude-3.5-sonnet

# Future
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
```

---

## Implementation Plan (by Friday)

### Day 1 (Today - Tuesday)
- [x] Create requirements documentation
- [x] Scrape Rhythm website data
- [ ] Set up OpenAI API integration
- [ ] Create system prompts for each content type
- [ ] Build basic chat interface UI

### Day 2 (Wednesday)
- [ ] Complete chat functionality
- [ ] Implement HCP email generation
- [ ] Build email preview component
- [ ] Test with sample inputs

### Day 3 (Thursday)
- [ ] Implement social media generation
- [ ] Build social media preview
- [ ] Polish UI/UX
- [ ] Add export functionality

### Day 4 (Friday)
- [ ] Final testing
- [ ] Bug fixes
- [ ] Prepare demo script
- [ ] Deploy to Netlify

---

## API Endpoints

### POST /api/chat

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "I want to create an HCP email" }
  ],
  "contentType": "hcp-email",
  "context": {}
}
```

**Response (Streaming):**
```
data: {"role": "assistant", "content": "Great! "}
data: {"role": "assistant", "content": "What type of HCP email"}
data: {"role": "assistant", "content": " would you like to create?"}
```

### POST /api/generate

**Request:**
```json
{
  "contentType": "hcp-email",
  "emailType": "moa",
  "targetAudience": "endocrinologists",
  "segment": "open-to-learning",
  "keyMessage": "MC4R pathway mechanism",
  "emphasis": ["moa", "efficacy"]
}
```

**Response:**
```json
{
  "success": true,
  "content": {
    "subjectLines": ["...", "...", "..."],
    "preheaders": ["...", "...", "..."],
    "body": "<html>...</html>",
    "preview": "https://..."
  }
}
```

---

## System Prompts Structure

### Base Prompt (All Content Types)

```
You are a pharmaceutical content generator specialized in creating compliant marketing materials for rare disease medications.

CRITICAL COMPLIANCE RULES:
- Use ONLY FDA-approved, on-label information
- NEVER invent or infer data
- NEVER compare to other therapies
- NEVER omit or paraphrase ISI
- Always preserve safety language exactly
- All claims must have superscripted references

KNOWLEDGE BASE:
[Load IMCIVREE comprehensive data here]

YOUR TASK:
Generate [content type] following the specific rules below...
```

### HCP Email Prompt
```
[Base Prompt]

CONTENT TYPE: HCP Email

STRUCTURE REQUIREMENTS:
1. Create 3 subject lines (NEVER include product name)
2. Create 3 preheaders (complement subjects)
3. Generate body with:
   - Hero section with appropriate image
   - Scannable bullet lists
   - Data with superscripts
   - Full ISI block
   - AMA-style references
   - Legal footer

[Load email rules from PROJECT_REQUIREMENTS.md]

USER INPUT:
- Email Type: {emailType}
- Target Audience: {targetAudience}
- Segment: {segment}
- Key Message: {keyMessage}
```

### Social Media Prompt
```
[Base Prompt]

CONTENT TYPE: Social Media Post

PLATFORM: {platform}

PLATFORM-SPECIFIC RULES:
[Load rules for selected platform]

OUTPUT SEQUENCE (MANDATORY):
1. CAPTION (with ISI)
2. HASHTAGS (10-15)
3. WHO TO TAG
4. VISUAL PROMPT
5. POSTING GUIDANCE

USER INPUT:
- Platform: {platform}
- Target: {target}
- Message: {message}
```

---

## Design System

### Colors (Rhythm/IMCIVREE Brand)
```css
:root {
  --teal-header: #1c7b80;
  --teal-primary: #007a80;
  --bg-light: #f6fbfb;
  --bg-isi: #fafafa;
  --text-gray: #4a4f55;
  --text-dark: #1a1a1a;
}
```

### Typography
```css
font-family: 'Inter', -apple-system, sans-serif;
```

### Components
- Clean, modern interface
- Card-based layout
- Smooth animations
- Responsive design
- Accessible (WCAG 2.1 AA)

---

## Testing Strategy

### Unit Tests (Future)
- Prompt generation
- Compliance validation
- Reference formatting

### Integration Tests
- OpenAI API calls
- Content generation flow
- Preview rendering

### Manual Testing
- Generate HCP email (all types)
- Generate social posts (all platforms)
- Test refinement prompts
- Verify compliance elements
- Check responsive design

---

## Success Metrics (Demo)

✓ User can create HCP email in < 2 minutes
✓ Generated content includes all compliance elements
✓ Preview renders correctly
✓ Content is on-brand and accurate
✓ Chat interface is intuitive
✓ Demo is impressive to client

---

## Future Enhancements (Post-Demo)

### Phase 2
- User authentication
- Content history/library
- Template management
- Supabase integration
- Multi-user support

### Phase 3
- Zyflow integration for review
- MLR workflow
- Veeva Vault connection
- Comment filtering AI
- Approval tracking

### Phase 4
- Image generation (DALL-E)
- Video generation (Remotion)
- Multi-product support
- White-label solution
- Agency portal

---

## Notes

- **Speed is priority** - Focus on core demo features
- **Compliance is non-negotiable** - All rules must be enforced
- **User experience matters** - Make it delightfully simple
- **Show, don't tell** - Demo should speak for itself
- **Be realistic** - Caveat that content will be refined with client data
