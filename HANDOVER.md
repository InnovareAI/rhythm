# IMCIVREE Creative Hub - Technical Handover Document

**Project:** IMCIVREE Creative Hub
**Client:** Rhythm Pharmaceuticals / 3cubed
**Last Updated:** November 29, 2025
**Production URL:** https://beautiful-cactus-21f97b.netlify.app
**Repository:** https://github.com/InnovareAI/rhythm.git

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Environment Setup](#environment-setup)
4. [Project Architecture](#project-architecture)
5. [Feature Documentation](#feature-documentation)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)
8. [External Integrations](#external-integrations)
9. [Brand Guidelines](#brand-guidelines)
10. [Compliance Requirements](#compliance-requirements)
11. [Deployment](#deployment)
12. [Known Issues & Future Work](#known-issues--future-work)

---

## Project Overview

The IMCIVREE Creative Hub is a pharmaceutical marketing content generation platform that creates compliant HTML emails and banner ads for IMCIVREE (setmelanotide), a treatment for obesity due to Bardet-Biedl Syndrome (BBS).

### Key Features

| Feature | Route | Description |
|---------|-------|-------------|
| HCP + Patient Email Generator | `/chat` | AI-powered HTML email creation with ISI and references |
| HCP + Patient Banner Ads | `/banner-generator` | 728x250 animated banners with scrolling ISI |
| Approval Queue | `/approvals` | Ziflow MLR integration for tracking approvals |
| Content History | `/content-history` | View and download previously generated content |

### Target Audiences

- **HCP (Healthcare Professionals)** - Clinical, data-forward messaging with terms like "hyperphagia"
- **Patient/Caregiver** - Accessible, supportive messaging using "hunger" instead of clinical terms

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.0.3 | React framework with App Router |
| React | 19.2.0 | UI components |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Supabase | 2.83.0 | PostgreSQL database & auth |
| OpenRouter API | - | LLM access (Claude Sonnet 4) |
| Fal.ai | 0.15.0 | AI image generation |
| Ziflow API | - | MLR approval workflow |
| Netlify | - | Hosting & deployment |

---

## Environment Setup

### Required Environment Variables

Create a `.env.local` file with:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# AI Services
OPENROUTER_API_KEY=xxx

# Fal.ai Image Generation
FAL_KEY=xxx

# Ziflow MLR Integration
ZIFLOW_API_KEY=xxx
```

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## Project Architecture

### Directory Structure

```
rhythm/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── chat/route.ts         # Email generation streaming
│   │   ├── conversations/route.ts # Content history API
│   │   ├── generate-image/route.ts # Fal.ai image generation
│   │   ├── optimize-with-feedback/route.ts # LLM optimization
│   │   ├── submit-for-approval/route.ts # Ziflow submission
│   │   ├── upload-image/route.ts # Image upload handling
│   │   └── ziflow-webhook/route.ts # Webhook receiver
│   ├── approvals/page.tsx        # Approval queue UI
│   ├── banner-generator/page.tsx # Banner creation UI
│   ├── chat/page.tsx             # Email creation UI
│   ├── content-history/page.tsx  # Content history UI
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page (hub)
│
├── lib/                          # Shared libraries
│   ├── knowledge/
│   │   └── imcivree-bbs.ts       # Brand knowledge base (ISI, colors, messages)
│   ├── prompts/
│   │   ├── imcivree-banner.ts    # Banner generation prompts + HTML template
│   │   └── imcivree-email.ts     # Email generation prompts
│   ├── conversation-storage.ts   # Supabase CRUD operations
│   ├── fal.ts                    # Fal.ai client
│   ├── openrouter.ts             # OpenRouter client
│   ├── supabase.ts               # Supabase client
│   └── ziflow.ts                 # Ziflow API client
│
├── netlify.toml                  # Netlify configuration
├── package.json
└── tsconfig.json
```

### Data Flow

```
User Input → Next.js API → OpenRouter (Claude) → HTML Generation → Supabase Storage
                                                        ↓
                                               Ziflow (Optional)
                                                        ↓
                                               Webhook → Feedback → LLM Optimization
```

---

## Feature Documentation

### 1. Email Generator (`/chat`)

**Location:** `app/chat/page.tsx`

**Flow:**
1. User selects audience (HCP or Patient)
2. User selects email type
3. Optional: Add key message emphasis
4. AI generates HTML email with proper structure, references, and ISI
5. User can submit to Ziflow for approval

**Email Types:**

| Audience | Types |
|----------|-------|
| HCP | MOA, Clinical Summary, Dosing, Efficacy Data |
| Patient | Getting Started, What to Expect, Support Resources |

**Technical Details:**
- Uses streaming response via `app/api/chat/route.ts`
- Prompt defined in `lib/prompts/imcivree-email.ts`
- Saves to Supabase `conversations` table
- Purple "Submit to Ziflow" button after generation

### 2. Banner Generator (`/banner-generator`)

**Location:** `app/banner-generator/page.tsx`

**Specifications:**
- **Dimensions:** 728×250 pixels (IAB Leaderboard format)
- **Animation:** CSS-only two-screen fade (4s per screen)
- **ISI Panel:** 35% width, auto-scrolling at 0.2px/frame using CSS transform
- **Fonts:** Avenir, Proxima Nova, Arial fallback

**Layout Structure:**
```
┌──────────────────────────────┬────────────────┐
│       Content Area (65%)     │  ISI Panel     │
│   ┌──────────────────────┐   │    (35%)       │
│   │ IMCIVREE Logo        │   │                │
│   └──────────────────────┘   │  Important     │
│   ┌──────────────────────┐   │  Safety Info   │
│   │ Headline (animated)  │   │                │
│   │ CTA Button          │   │  [scrolling]   │
│   └──────────────────────┘   │                │
│           [Hero Image]        │                │
└──────────────────────────────┴────────────────┘
```

**Focus Options:**

| Audience | Focus Areas |
|----------|-------------|
| HCP | MOA, Weight Reduction, Hunger Reduction, Treatment Journey |
| Patient | Understanding BBS, Path Forward, Support Available |

**Technical Details:**
- Complete HTML template in `lib/prompts/imcivree-banner.ts` (495 lines)
- Uses CSS `@keyframes` for slide transitions (fadeIn/fadeOut)
- Uses `requestAnimationFrame` + CSS `transform: translateY()` for smooth ISI scroll
- ISI pauses on hover
- Template includes placeholder `{{PRODUCT_URL}}` replaced based on audience

### 3. Approval Queue (`/approvals`)

**Location:** `app/approvals/page.tsx`

**Features:**
- View submissions by status (Pending, Needs Changes, Approved)
- Display reviewer feedback/comments
- Trigger AI optimization based on feedback

**Status Colors:**
- Blue: Pending Review
- Yellow: Needs Changes
- Green: Approved

**Ziflow Webhook Setup:**
Configure in Ziflow: Settings > Integrations > Webhooks
- URL: `https://your-domain.com/api/ziflow-webhook`
- Events: `proof.commented`, `proof.decision`, `proof.stage_changed`

### 4. Content History (`/content-history`)

**Location:** `app/content-history/page.tsx`

**Features:**
- Filter by content type (All, Emails, Banners)
- Preview thumbnails with iframe (banners) or icons (emails)
- Modal with full preview
- Copy HTML to clipboard
- Download as HTML file

**Content Types:**
- `imcivree-email` - HCP/Patient emails
- `imcivree-banner` - 728x250 banner ads

---

## API Endpoints

### Content Generation

#### POST `/api/chat`
Generates HTML email content using streaming response.

**Request:**
```json
{
  "messages": [{ "role": "user", "content": "..." }],
  "audience": "hcp" | "patient",
  "emailType": "moa" | "summary" | "dosing" | "efficacy" | "getting-started" | "what-to-expect" | "support",
  "keyMessage": "optional emphasis"
}
```

### Content History

#### GET `/api/conversations`
Returns all saved conversations/content.

**Response:**
```json
{
  "conversations": [
    {
      "id": "uuid",
      "content_type": "imcivree-email" | "imcivree-banner",
      "state": { "audience": "hcp", "emailType": "moa" },
      "generated_content": "<html>...</html>",
      "created_at": "2025-11-29T..."
    }
  ]
}
```

### Ziflow Integration

#### POST `/api/submit-for-approval`
Submits content to Ziflow for MLR review.

**Request:**
```json
{
  "contentType": "email" | "banner",
  "name": "MOA Email - HCP",
  "htmlContent": "<html>...</html>",
  "audience": "hcp" | "patient",
  "focus": "moa"
}
```

**Note:** Currently returns preparation message. Production needs public URL hosting (S3/Cloudinary) for HTML files.

#### POST `/api/ziflow-webhook`
Receives webhook events from Ziflow.

**Events Handled:**
| Event | Action |
|-------|--------|
| `proof.commented` | Stores new comments |
| `proof.decision` | Updates approval status |
| `proof.stage_changed` | Updates workflow stage |

**Storage:** In-memory Map (use database for production)

#### GET `/api/ziflow-webhook?proofId=xxx`
Retrieves stored feedback for a proof.

#### POST `/api/optimize-with-feedback`
Sends original content + feedback to LLM for optimization.

**Request:**
```json
{
  "originalContent": "<html>...</html>",
  "contentType": "email" | "banner",
  "feedback": [
    { "author": "John", "content": "Change headline to..." }
  ],
  "audience": "hcp" | "patient"
}
```

**Returns:** Optimized HTML with changes summary

---

## Database Schema

### Supabase Tables

```sql
-- Conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type VARCHAR(50) NOT NULL,
  product_name VARCHAR(255),
  brand_info JSONB,
  state_data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Generated content table
CREATE TABLE generated_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  image_url TEXT,
  video_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## External Integrations

### OpenRouter API

**Purpose:** LLM access for content generation

**Model:** `anthropic/claude-sonnet-4` (via OpenRouter)

**Configuration:**
```typescript
const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  headers: {
    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'anthropic/claude-sonnet-4',
    messages: [...],
    stream: true,
    temperature: 0.3,  // Lower for consistency
  }),
})
```

### Ziflow API

**Purpose:** MLR approval workflow

**Base URL:** `https://api.ziflow.io/v1`

**Authentication:** Bearer token

**Key Endpoints:**
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/proofs` | POST | Create new proof for review |
| `/proofs/:id` | GET | Get proof status |
| `/proofs` | GET | List all proofs |
| `/folders` | GET | List folders |
| `/workflows` | GET | List workflows |

**Client:** `lib/ziflow.ts`

### Fal.ai

**Purpose:** AI image generation

**Model:** `fal-ai/flux/dev`

---

## Brand Guidelines

### Colors

| Element | Hex Code | Usage |
|---------|----------|-------|
| Primary Teal | #007a80 | Headlines, CTAs, links |
| Header Teal | #1c7b80 | Top bars, email headers |
| Light Background | #f6fbfb | Page backgrounds |
| ISI Background | #fafafa | ISI blocks in emails |
| Text Gray | #4a4f55 | Body text |
| Banner Background | #eff3d8 | Banner creative area |
| Banner Border | #0f6c73 | Banner ISI panel border |
| Banner CTA | #0e7076 | Banner buttons |

### Typography

```css
/* Primary font stack */
font-family: 'Avenir', 'Proxima Nova', 'Proxima', Arial, Helvetica, sans-serif;

/* Email fallback */
font-family: Arial, Helvetica, sans-serif;
```

### Brand Assets

| Asset | URL |
|-------|-----|
| IMCIVREE Logo | https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png |
| Hero Image (Kid) | https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/6577b351-bb95-474c-a386-838150b5846a/kidiso.png |
| MOA Image | https://www.imcivree.com/static/hcp-bbs-functional-mc4r-3e490b24a8f4f9bcc4ede22918fb38da.png |
| Dosing Box | https://www.imcivree.com/static/dosing-box-953935ca5e56951d5e90c73760348f8e.png |
| Dosing Chart | https://www.imcivree.com/static/hcp-bbs-dosing-chart-young-children-0287c959c1242bd92cc8832f0b0f0c42.png |

### CTA URLs

| Audience | URL |
|----------|-----|
| HCP | https://www.imcivree.com/hcp/bbs/ |
| Patient | https://www.imcivree.com/bbs/ |
| Getting Started | https://www.imcivree.com/bbs/getting-started/ |

---

## Compliance Requirements

### Critical Rules

1. **Use ONLY FDA-approved, on-label information**
2. **NEVER invent or infer data**
3. **NEVER compare IMCIVREE to other therapies**
4. **All claims MUST have superscripted references** (e.g., `<sup>1</sup>`)
5. **ISI must be included in full** - never paraphrase
6. **Subject lines must NEVER include the product name**
7. **IMCIVREE is ONLY for obesity due to BBS** - never generalize to "obesity"
8. **No cure claims, no guarantees, no superlatives**
9. **No device/injection imagery**

### Required References

```
Reference 1: IMCIVREE [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.
Reference 2: Haqq AM, et al. Lancet Diabetes Endocrinol. 2022;10(12):859-868.
Reference 3: Data on file. Rhythm Pharmaceuticals, Inc.
```

### Approved Message Bank

Located in `lib/knowledge/imcivree-bbs.ts`:

**Disease Problem (HCP):**
- "Hyperphagia in BBS is chronic and insatiable"
- "Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling"

**Disease Problem (Patient):**
- "Hunger in BBS is chronic and hard to control"
- Replace "hyperphagia" with "hunger"

**Product Introduction:**
- "IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people with BBS"

**Efficacy:**
- "Meaningful weight reduction typically begins within 6–8 weeks"
- "IMCIVREE reduced BMI and weight across children and adults with BBS"

### ISI Requirements

- **Emails:** Full ISI must appear after References block
- **Banners:** 35% width right panel with scrolling ISI at 0.2px/frame
- **ISI text:** Defined in `lib/knowledge/imcivree-bbs.ts` - **DO NOT MODIFY**

---

## Deployment

### Netlify Configuration

**File:** `netlify.toml`

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  node_bundler = "esbuild"

[[headers]]
  for = "/api/*"
  [headers.values]
    X-Robots-Tag = "noindex"
```

### Deploy Commands

```bash
# Build locally first
npm run build

# Deploy to production
netlify deploy --prod

# Set environment variables
netlify env:set ZIFLOW_API_KEY "xxx"
netlify env:list
```

### Production URLs

- **Site:** https://beautiful-cactus-21f97b.netlify.app
- **Build Logs:** https://app.netlify.com/projects/beautiful-cactus-21f97b/deploys
- **Function Logs:** https://app.netlify.com/projects/beautiful-cactus-21f97b/logs/functions

---

## Known Issues & Future Work

### Current Limitations

1. **No Content Persistence**
   - IMCIVREE emails and banners are NOT saved to Supabase
   - Generated content exists only in browser session
   - Content History page will be empty
   - **Solution:** Add save call after streaming completes in `/api/chat/route.ts`

2. **No Conversation History**
   - Can't view previous generations
   - Can't resume or edit past content
   - **Solution:** Save conversations to Supabase `conversations` table

3. **No Content Versioning**
   - No way to track revisions of content
   - Can't compare versions or rollback
   - **Solution:** Add `version` field and revision history table

4. **Ziflow Feedback Lost on Restart**
   - Webhook feedback stored in-memory Map
   - Resets on every deploy/restart
   - **Solution:** Create `ziflow_feedback` Supabase table

5. **Ziflow File Hosting**
   - Content submission requires publicly accessible URLs
   - Current MVP returns preparation message
   - **Solution:** Need S3/Cloudinary for temporary HTML hosting

6. **No Content Library/Archive**
   - Can't browse approved content
   - No template reuse
   - **Solution:** Add content library with tagging/search

7. **Banner Dimensions**
   - Only 728×250 (IAB Leaderboard) implemented
   - Other sizes may be requested (300×250, 160×600, 320×50)

### Potential Enhancements

| Priority | Enhancement |
|----------|-------------|
| High | Persistent feedback storage in Supabase |
| High | Public URL hosting for Ziflow submissions |
| Medium | Email preview in mobile/desktop frames |
| Medium | Template library for approved content |
| Medium | A/B testing variant generation |
| Low | Analytics dashboard |
| Low | Role-based access control |

### Security Considerations

- API keys should be rotated periodically
- Ziflow webhook should implement signature verification
- Consider rate limiting on generation endpoints
- Add authentication for production use

---

## Quick Reference

### Home Page Cards

| Card | Color | Route | Purpose |
|------|-------|-------|---------|
| HCP + Patient Emails | Teal | `/chat` | Email generation |
| HCP + Patient Banner Ads | Teal | `/banner-generator` | Banner generation |
| Approval Queue | Purple | `/approvals` | Ziflow tracking |
| Content History | Amber | `/content-history` | View past content |

### Key Files

| File | Purpose |
|------|---------|
| `lib/knowledge/imcivree-bbs.ts` | Brand colors, ISI, message bank |
| `lib/prompts/imcivree-banner.ts` | Banner HTML template + prompt |
| `lib/prompts/imcivree-email.ts` | Email structure + prompt |
| `lib/ziflow.ts` | Ziflow API client |

### Testing Checklist

- [ ] Generate HCP email
- [ ] Generate Patient email
- [ ] Generate HCP banner
- [ ] Generate Patient banner
- [ ] Submit to Ziflow (verify preparation message)
- [ ] View Content History
- [ ] Download content as HTML
- [ ] Copy content to clipboard

---

## Contact & Support

**Project maintained by:** 3cubed x K+M Creative Intelligence Labs

**GitHub Repository:** https://github.com/InnovareAI/rhythm.git

---

*Document generated: November 29, 2025*
