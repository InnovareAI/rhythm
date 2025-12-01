# IMCIVREE Creative Hub - Technical Handover Document

**Project:** IMCIVREE Creative Hub
**Client:** Rhythm Pharmaceuticals / 3cubed
**Last Updated:** December 2, 2025 (Session 8)
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
12. [Recent Changes (Session 2)](#recent-changes-november-29-2025---session-2)
13. [Recent Changes (Session 3)](#recent-changes-november-30-2025---session-3)
14. [Recent Changes (Session 4)](#recent-changes-november-30-2025---session-4)
15. [Recent Changes (Session 5)](#recent-changes-december-1-2025---session-5)
16. [Recent Changes (Session 6)](#recent-changes-december-1-2025---session-6)
17. [Recent Changes (Session 7)](#recent-changes-december-1-2025---session-7)
18. [Recent Changes (Session 8)](#recent-changes-december-2-2025---session-8)
19. [Known Issues & Future Work](#known-issues--future-work)

---

## Project Overview

The IMCIVREE Creative Hub is a pharmaceutical marketing content generation platform that creates compliant HTML emails and banner ads for IMCIVREE (setmelanotide), a treatment for obesity due to Bardet-Biedl Syndrome (BBS).

### Key Features

| Feature | Route | Description |
|---------|-------|-------------|
| HCP + Patient Email Generator | `/chat` | AI-powered HTML email creation with ISI and references |
| HCP + Patient Banner Ads | `/banner-generator` | 728x250 animated 5-frame banners with scrolling ISI |
| Content Review & Feedback | `/reviews` | View feedback, address comments, resubmit content |
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
- **Animation:** 5-frame rotation (5s per frame) with fade transitions
- **ISI Bar:** 52px black bar at bottom with CSS-only upward scroll
- **Fonts:** System UI, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif

**Layout Structure:**
```
┌─────────────────────────────────────────────────────────┐
│  Teal Gradient Background with Floating Bubbles         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  HEADLINE (fade in/out per frame)               │    │
│  │  Subcopy text                                   │    │
│  │                            [Learn more] (frame5)│    │
│  └─────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────┤
│  BLACK ISI BAR (52px) - Scrolling upward                │
│  Important Safety Information...                         │
└─────────────────────────────────────────────────────────┘
```

**5-Frame Narrative Structure:**

| Frame | Topic | Key Message |
|-------|-------|-------------|
| 1 | Disease Problem | BBS causes early-onset obesity and hard-to-control hunger |
| 2 | MC4R Pathway | Hunger comes from the brain due to impaired signaling |
| 3 | Product Introduction | IMCIVREE is first and only FDA-approved treatment |
| 4 | Efficacy | Weight reduction across children and adults |
| 5 | Treatment Expectations + CTA | 6-8 weeks timeline, "Learn more" button |

**Focus Options:**

| Audience | Focus Areas |
|----------|-------------|
| HCP | MOA, Weight Reduction, Hunger Reduction, Treatment Journey |
| Patient | Understanding BBS, Path Forward, Support Available |

**Technical Details:**
- Complete HTML template in `lib/prompts/imcivree-banner.ts`
- Dark teal gradient background (`#0F7C8F` → `#0C5F73`)
- JavaScript `setInterval` for 5-second frame rotation with fade transitions
- 4 floating bubble animations using `@keyframes floatUp`
- CSS-only ISI scroll animation (35s duration, upward direction)
- Lime green CTA button (`#8CD038`) on final frame only
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
| Light Background | #f6fbfb | Page backgrounds |
| ISI Background | #fafafa | ISI blocks in emails |
| Text Gray | #4a4f55 | Body text |
| Lime Green | #97D700 | Email header rule, primary accent |
| Banner Gradient Start | #0F7C8F | Banner teal gradient (top) |
| Banner Gradient End | #0C5F73 | Banner teal gradient (bottom) |
| Banner ISI Bar | #000000 | Black ISI bar at bottom |
| Banner CTA | #8CD038 | Lime green CTA button |

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
- **Banners:** 52px black bar at bottom with CSS-only upward scroll (35s animation)
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

## Recent Changes (November 29, 2025 - Session 2)

### 1. Ziflow Review Feedback Workflow

**New Feature:** `/reviews` page now shows MLR feedback from Ziflow

**Flow:**
1. Content with `status: pending_review` appears on Reviews page
2. Clicking opens chat with loaded content + reviewer comments
3. AI summarizes feedback and suggests action items
4. User can address feedback and resubmit

**Key Files:**
- `app/reviews/page.tsx` - Reviews list page
- `app/api/ziflow-feedback/[proofId]/route.ts` - Fetches Ziflow comments
- `app/api/ziflow-proofs/route.ts` - Lists all Ziflow proofs (NEW)

**API Fix:** Ziflow API returns comments in `comment` field (not `text`) and author in `reviewer.email` (not `author.email`). Fixed in ziflow-feedback route.

### 2. Dynamic Email/Banner Labels

**Issue Fixed:** Preview panel and header showed "Email" even when viewing banners

**Changes:**
- Added `contentType` state variable to `app/chat/page.tsx`
- Header now shows "HCP Banner" / "Patient Banner" for banners
- Preview panel shows "Banner Preview" for banners, "Email Preview" for emails
- Download filename is dynamic (e.g., `imcivree-hcp-moa-banner.html`)

### 3. Age Indication Fix

**Issue:** Banner prompts incorrectly said "6 years and older" - should be "2 years and older"

**Fixed in:** `lib/prompts/imcivree-banner.ts`
- CTA text: "For people 2 years and up"
- ISI indication: "aged 2 years and older with syndromic or monogenic obesity"

**Note:** Email prompts already had correct "2 years" text.

### 4. Retry Logic & Error Handling

**Issue:** Users getting "Error in input stream" when AI service is busy

**Improvements:**
- Added retry mechanism with exponential backoff (up to 3 attempts)
- User-friendly error messages:
  - "The AI service is temporarily busy. Please try again in a moment."
  - "Rate limit reached. Please wait a moment and try again."
  - "Connection timed out. Please try again."
- Added console logging for debugging stream errors

**File:** `app/api/chat/route.ts` - Banner and email generation sections

### 5. Brand Color Consistency

**Changes:**
- MLR Review Feedback box in chat page: Blue → Brand green (#007a80)
- Reviews page: All elements updated to brand green
- Ziflow Reviews card on home page: Updated to brand green

### Recent Commits (Nov 29, Session 2)

```
565f5d5 Add retry logic and better error messages for banner/email generation
f04f3b4 Fix IMCIVREE age indication from 6 to 2 years
f45cc96 Fix header label to show Banner vs Email dynamically
3a76c04 Fix preview panel label to be dynamic based on content type
```

---

## Recent Changes (November 30, 2025 - Session 3)

### 1. Content Type Mislabeling Fix

**Issue:** Banners were being labeled as "imcivree-email" in Ziflow and content history, causing incorrect categorization.

**Root Cause:** Hardcoded `contentType: 'imcivree-email'` in multiple places in `app/chat/page.tsx`

**Fix:** Changed to use the dynamic `contentType` state variable:
- Line 244: `saveContentToDatabase()` call
- Line 340: `generateEmail()` function
- Line 461: `sendMessage()` function
- Line 599: `submit-for-approval` API call

### 2. Email Header Logo Update

**Issue:** Email templates used a teal header background with white/knocked-out logo. Brand guidelines require full-color logo on white background with lime-green rule.

**Changes in `lib/prompts/imcivree-email.ts`:**
- Header background: `#1c7b80` (teal) → `#ffffff` (white)
- Logo: White version → Full-color version (`imcivree-logo-big.png`)
- Added 4px lime-green rule (`#97D700`) below header

**New Header Structure:**
```html
<table width="100%" style="background:#ffffff;border-bottom:4px solid #97D700;">
  <tr>
    <td><img src="https://rhythmtx.com/.../imcivree-logo-big.png" /></td>
    <td style="color:#4a4f55;">[FOR U.S. HEALTHCARE PROFESSIONALS...]</td>
  </tr>
</table>
```

### 3. Landing Page Label Rename

**Change:** Renamed "MLR Feedback" / "Ziflow Reviews" to "Content Review & Feedback"

**Rationale:** Reviews happen before AND after MLR approval, so "MLR Feedback" was misleading.

**File:** `app/page.tsx`
- Card title: "Content Review & Feedback"
- Description: "View feedback and address reviewer comments"

### 4. Content History Preview Fix

**Issue:** Banner animations weren't playing in preview iframes because `allow-scripts` was missing from sandbox attribute.

**Fix in `app/content-history/page.tsx`:**
```tsx
// Before
sandbox="allow-same-origin"

// After
sandbox="allow-same-origin allow-scripts"
```

### 5. Banner CTA Consistency Fix

**Issue:** Banner prompt instructions said "Learn more" but template output showed "SEE MORE >"

**Fix in `lib/prompts/imcivree-banner.ts`:**
- Changed CTA button text from "SEE MORE >" to "Learn more"
- Ensures consistency between prompt instructions and generated output

### 6. Complete Banner Template Redesign

**Major Change:** Completely rewrote the banner template from a 2-screen design to a 5-frame narrative structure based on user-provided reference HTML.

**Old Design (2-screen):**
- Pale yellow/cream background (#eff3d8)
- 2 alternating screens with fade animation
- ISI in right panel (35% width)
- Static layout with hero image

**New Design (5-frame):**
- Dark teal gradient background (`#0F7C8F` → `#0C5F73`)
- 5 frames with 5-second rotation
- Full-width content with ISI bar at bottom
- Floating bubble animations
- Lime green CTA button on final frame

**5-Frame Narrative Structure:**

| Frame | Topic | Content |
|-------|-------|---------|
| 1 | Disease Problem | BBS causes early-onset obesity and hard-to-control hunger |
| 2 | MC4R Pathway | Hunger comes from the brain due to impaired signaling |
| 3 | Product Introduction | IMCIVREE is first and only FDA-approved treatment |
| 4 | Efficacy | Weight reduction across children and adults |
| 5 | Treatment Expectations + CTA | 6-8 weeks timeline, "Learn more" button |

**Technical Changes:**
- **Dimensions:** 728×250 (unchanged)
- **Frame Rotation:** JavaScript `setInterval` with 5-second duration
- **ISI Bar:** 52px black bar at bottom with CSS-only upward scroll
- **Bubbles:** 4 floating circles with `@keyframes floatUp` animation
- **CTA Button:** Lime green (`#8CD038`) on frame 5 only

**Layout Structure:**
```
┌─────────────────────────────────────────────────────────┐
│  Teal Gradient Background with Floating Bubbles         │
│  ┌─────────────────────────────────────────────────┐    │
│  │  HEADLINE (fade in/out per frame)               │    │
│  │  Subcopy text                                   │    │
│  │                            [Learn more] (frame5)│    │
│  └─────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────┤
│  BLACK ISI BAR (52px) - Scrolling upward                │
│  Important Safety Information...                         │
└─────────────────────────────────────────────────────────┘
```

### Recent Commits (Nov 30, Session 3)

```
b62b040 Update HANDOVER.md with Session 2 changes
```

---

## Recent Changes (November 30, 2025 - Session 4)

### Summary: 18 Key Updates

#### Email Templates

1. **Email Header Logo Update** - Changed header background from teal (#1c7b80) to white (#ffffff) with full-color logo per brand guidelines

2. **Lime-Green Rule Added** - Added 4px lime-green rule (#97D700) below email header for brand consistency

3. **Email Reference Mapping** - Reference RAG system now maps correct references to each email type:
   - MOA emails → References 1, 2, 45, 46
   - Efficacy emails → References 1, 47, 48
   - Safety emails → References 1, 48, 54
   - Support emails → References 1, 50

#### Banner Templates & ISI

4. **ISI Scrolling Fix (patient-support)** - Fixed ISI not scrolling in `patient-support` banner template by removing `position: absolute` from `.isi-scroll-content`

5. **ISI Height Adjustment** - Increased `.isi-scroll-wrapper` height from 60px to 65px across all patient banner templates for better visibility

6. **DOM Rendering Fix** - Added `setTimeout(100ms)` wrapper to ISI scroll JavaScript to ensure DOM is rendered before calculating heights

7. **Height Calculation Fix** - Changed from `offsetHeight` to `scrollHeight`/`clientHeight` for accurate scroll bounds calculation

8. **Full ISI Content** - All patient banner templates now include complete ISI with all required sections (Indication, Limitations, Contraindications, Warnings, Adverse Reactions, etc.)

#### Reference RAG System (CVA 2025 Compliance)

9. **Complete Claim Pattern Expansion** - Expanded `CLAIM_PATTERNS` from ~20 to 35+ regex patterns for comprehensive claim coverage

10. **Reference 48 Added (VENTURE Trial)** - Added Argente 2025 reference for young children (ages 2-<6) efficacy claims

11. **Reference 2 Added (Eneli 2019)** - Added for "first and only" and "precision medicine" claims

12. **MC4R Impairment References** - Added References 5, 8, 9 for detailed MC4R pathway impairment claims

13. **Re-establish Pathway References** - Added References 45, 46 for "re-establish MC4R pathway" claims

14. **Safety References Updated** - Added Reference 54 (safety poster) for safety profile claims alongside 1 and 48

#### Reference Recommendation Functions

15. **getRecommendedReferences() Expanded** - Updated function with content-type-specific reference mappings for both emails and banners

16. **buildReferenceContext() Enhanced** - Added comprehensive claim-reference table in LLM prompt context for accurate citation guidance

#### Knowledge Base

17. **Complete Reference Database** - Verified 60 references from CVA 2025 (US-SET-2200068 - 08.01/2025) exist in `lib/knowledge/imcivree-bbs.ts`

18. **Claim-to-Reference Mapping** - Full mapping object in knowledge base aligns with RAG system patterns for emails and banners

### Technical Details

#### ISI Scrolling Implementation (Final Working Solution)

**CSS (lib/content-templates/imcivree-banners.ts):**
```css
.isi-scroll-wrapper {
  height: 65px;
  overflow: hidden;
  position: relative;
  padding: 0 15px;
}

.isi-scroll-content {
  font-size: 8px;
  color: #4A4A4A;
  line-height: 1.4;
  /* NO position: absolute - breaks scrollHeight */
}
```

**JavaScript:**
```javascript
setTimeout(function() {
  var wrapper = document.querySelector('.isi-scroll-wrapper');
  var content = document.querySelector('.isi-scroll-content');
  if (wrapper && content) {
    var scrollPos = 0;
    var scrollSpeed = 0.3;
    function animateISI() {
      var maxScroll = content.scrollHeight - wrapper.clientHeight;
      if (maxScroll > 0) {
        scrollPos += scrollSpeed;
        if (scrollPos >= maxScroll) { scrollPos = 0; }
        content.style.transform = 'translateY(-' + scrollPos + 'px)';
      }
      requestAnimationFrame(animateISI);
    }
    requestAnimationFrame(animateISI);
  }
}, 100);
```

#### Reference RAG Claim Mapping (lib/reference-rag.ts)

| Claim Type | References |
|------------|------------|
| FDA-approved | 1 |
| First and only | 1, 2 |
| MC4R pathway | 1, 2 |
| MC4R impairment | 2, 5, 8, 9 |
| Re-establish pathway | 1, 45, 46 |
| Weight/BMI reduction | 1, 47, 48 |
| Hunger reduction | 1, 47 |
| Ages 2-<6 efficacy | 1, 48 |
| Ages 6-17 efficacy | 1, 47 |
| Adult efficacy | 1, 47 |
| Early-onset obesity | 2, 5 |
| Hyperphagia | 1, 2 |
| Safety profile | 1, 48, 54 |
| Rhythm InTune | 50 |
| Clinical trial | 47, 48 |
| VENTURE trial | 48 |

### Files Modified

| File | Changes |
|------|---------|
| `lib/prompts/imcivree-email.ts` | Updated header to white background with full-color logo and lime-green rule |
| `lib/content-templates/imcivree-banners.ts` | Fixed ISI CSS/JS in patient-support template |
| `lib/reference-rag.ts` | Expanded CLAIM_PATTERNS, updated reference functions for emails and banners |

### Recent Commits (Nov 30, Session 4)

```
35bab3e Expand RAG reference system with complete CVA 2025 mappings
```

---

## Recent Changes (December 1, 2025 - Session 5)

### ISI Scroll Speed Adjustments

Based on user feedback, the ISI (Important Safety Information) scroll speeds were adjusted for both HCP and Patient banner templates.

#### Changes Made

| Audience | Before | After | Effect |
|----------|--------|-------|--------|
| **HCP Banners** | 35s CSS animation | 20s CSS animation | ~43% faster scroll |
| **Patient Banners** | 0.3 scrollSpeed (JS) | 0.15 scrollSpeed (JS) | 50% slower scroll |

#### Technical Details

**HCP Banners (CSS Animation):**
```css
/* Before */
.isi-scroll { animation: isiScroll 35s linear infinite; }

/* After */
.isi-scroll { animation: isiScroll 20s linear infinite; }
```

**Patient Banners (JavaScript):**
```javascript
// Before
var scrollSpeed = 0.3;

// After
var scrollSpeed = 0.15;
```

#### Files Modified

| File | Changes |
|------|---------|
| `lib/content-templates/imcivree-banners.ts` | Updated ISI scroll speeds for all 4 HCP templates (35s→20s) and all 3 patient templates (0.3→0.15) |
| `lib/prompts/imcivree-banner.ts` | Updated reference templates and prompt documentation to reflect new scroll speeds |

---

## Recent Changes (December 1, 2025 - Session 6)

### Summary: Simplified Reference System + Banner UX Improvements

#### 1. Simplified 5-Reference Demo System

**Problem:** The 60-reference CVA 2025 system was too complex for the demo, causing reference mismatches (e.g., showing `<sup>1,47</sup>` instead of `<sup>1,2</sup>`).

**Solution:** Implemented Brian's simplified 5-reference system for all emails and banners.

**New Reference Mapping:**

| Ref # | Citation | Used For |
|-------|----------|----------|
| **1** | IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc. | Indication, MOA, Safety |
| **2** | Gulati AK et al. Pediatrics. 2012. | Hunger reduction |
| **3** | Forsythe E et al. Front Pediatr. 2018. | Disease/BBS, MC4R pathway |
| **4** | Argente J et al. Endocrine Society Annual Meeting Poster. 2022. | Weight reduction, skin darkening |
| **5** | Grossman DC et al. JAMA. 2017. | Rhythm InTune support |

**Claim-to-Reference Mapping:**

| Claim Type | Reference |
|------------|-----------|
| BBS is a rare genetic condition | 3 |
| MC4R pathway, impaired signaling | 3 |
| FDA-approved, indication, ages 2+ | 1 |
| First and only treatment | 1 |
| Hunger reduction, reduction within weeks | 2 |
| Weight reduction, BMI reduction, 6-8 weeks | 4 |
| Side effects, adverse reactions | 1 |
| Skin darkening | 4 |
| Rhythm InTune, patient support | 5 |

**Files Updated:**
- `lib/prompts/imcivree-email.ts` - LLM prompt with 5-ref claim mapping
- `lib/content-templates/imcivree-emails.ts` - Hardcoded templates (1,47→1,3 etc.)
- `lib/content-templates/imcivree-banners.ts` - Banner templates with refs
- `lib/knowledge/imcivree-bbs.ts` - Master reference list simplified
- `lib/reference-rag.ts` - RAG patterns updated to only use refs 1-5

#### 2. Banner Cutoff Fix

**Problem:** HCP banner headline text was getting cut off on the right side ("Hunger and obesity in BBS come from the brain d..." truncated).

**Solution:** Reduced headline font size for better fit.

```css
/* Before */
.headline { font-size: 24px; }
.subcopy { font-size: 13px; max-width: 90%; }

/* After */
.headline { font-size: 20px; }
.subcopy { font-size: 12px; max-width: 95%; }
```

#### 3. References Added to Banners Below ISI

**Change:** All banner templates now include references on a separate line after the ISI content.

**HCP Banners:** Added as separate `<div class="isi-heading">References</div>` section at end of scrolling ISI.

**Patient Banners:** Added with `<br><br><strong>References:</strong>` after "Please see full Prescribing Information."

#### 4. Patient Banner ISI 3-Second Pause

**Problem:** Patient banner ISI scroll immediately restarted after reaching the end, not allowing time to read references.

**Solution:** Added 3-second pause at end of scroll before restarting.

```javascript
// Before
if (scrollPos >= maxScroll) { scrollPos = 0; }

// After
if (scrollPos >= maxScroll) {
  isPaused = true;
  setTimeout(function() {
    scrollPos = 0;
    isPaused = false;
  }, 3000);  // 3 second pause
}
```

#### 5. Smooth Code Generation Animation

**Problem:** Banner code generation scroll had jerky/stuttery animation with visible pauses between lines.

**Solution:** Replaced `setInterval` with `requestAnimationFrame` for smooth 60fps animation.

```javascript
// Before (jerky)
const interval = setInterval(() => {
  currentIndex += chunkSize;
  setStreamingContent(htmlContent.substring(0, currentIndex));
}, chunkDelay);

// After (smooth)
const animate = (currentTime) => {
  const progress = Math.min((currentTime - startTime) / totalDuration, 1);
  const easedProgress = 1 - (1 - progress) * (1 - progress); // easeOutQuad
  const currentIndex = Math.floor(easedProgress * totalChars);
  setStreamingContent(htmlContent.substring(0, currentIndex));
  if (progress < 1) requestAnimationFrame(animate);
};
requestAnimationFrame(animate);
```

**Additional changes:**
- Reduced animation duration from 60s to 45s
- Added easeOutQuad easing for natural slowdown at end

#### 6. Dynamic Banner Specifications Info Box

**Problem:** Banner specs info box always showed "5 frames" even for Patient banners (which use 2 screens).

**Solution:** Made specs dynamic based on audience selection.

**HCP displays:**
- 5 frames with smooth fade transitions
- Continuous scrolling ISI at bottom

**Patient displays:**
- 2 screens with fade transitions
- Scrolling ISI with 3-second pause at end

### Files Modified

| File | Changes |
|------|---------|
| `lib/prompts/imcivree-email.ts` | Replaced 3-ref system with 5-ref demo system |
| `lib/content-templates/imcivree-emails.ts` | Updated all superscripts and reference blocks |
| `lib/content-templates/imcivree-banners.ts` | Added refs below ISI, fixed cutoff, added 3s pause |
| `lib/knowledge/imcivree-bbs.ts` | Simplified to 5 demo references |
| `lib/reference-rag.ts` | Updated all patterns to use only refs 1-5 |
| `app/banner-generator/page.tsx` | Smooth animation + dynamic specs info box |

### Recent Commits (Dec 1, Session 6)

```
a7163b4 Update banner specs info box to be audience-specific
a1d76b1 Smooth code generation animation using requestAnimationFrame
8ca8c1c Fix consumer banner ISI scroll - add 3s pause + refs on separate line
78cc8fc Simplify reference system to 5 demo refs + fix banner cutoff
```

---

## Recent Changes (December 1, 2025 - Session 7)

### Summary: Disease Education Hub + Panel Layout Swap

This session focused on the Disease Education (unbranded) hub, adding generation speed alignment and swapping the panel layout for consistency with user expectations.

#### 1. Disease Education Hub Creation

The Disease Education hub is an **unbranded** content generation system for disease awareness (aHO - Acquired Hypothalamic Obesity) targeting HCPs. It mirrors the IMCIVREE (branded) hub structure but uses purple/teal theming instead of green.

**Hub Location:** `/disease-awareness`

**Content Types:**
| Type | Route | Description |
|------|-------|-------------|
| HCP Education Emails | `/disease-awareness/chat` | Disease awareness emails about aHO |
| HCP Education Banners | `/disease-awareness/banner-generator` | Educational banners about aHO |

**Email Types Available:**
| ID | Name | Description |
|----|------|-------------|
| `hcp-what-is-aho` | What is aHO | Introduction to acquired hypothalamic obesity |
| `hcp-mechanism` | The Hypothalamic Pathway | Understanding the MC4R pathway and hyperphagia |
| `hcp-recognition` | Recognizing aHO | Clinical signs and patient identification |

**Banner Focus Options:**
| ID | Name | Description |
|----|------|-------------|
| `hcp-disease-education` | Disease Education Overview | Introduction to aHO for healthcare professionals |
| `hcp-mechanism` | Hypothalamic Mechanism | MC4R pathway and hyperphagia mechanism |

#### 2. Generation Speed Alignment

**Problem:** Disease Education email generation was too fast (3 seconds) compared to the branded experience (45 seconds).

**Solution:** Aligned animation duration to 45 seconds for consistent demo pacing.

```typescript
// Before
const totalDuration = 3000 // 3 seconds

// After
const totalDuration = 45000 // 45 seconds
```

#### 3. Renamed to "Disease Education"

**Change:** Changed header text from "Disease Awareness" to "Disease Education" throughout the disease awareness hub.

**Files Updated:**
- `app/disease-awareness/chat/page.tsx` - Header shows "Disease Education"
- `app/disease-awareness/banner-generator/page.tsx` - Header shows "Disease Education"

#### 4. Panel Layout Swap (Preview Left, Chat Right)

**Problem:** User requested the preview panel on the LEFT side and chat/code generation on the RIGHT side.

**Solution:** Swapped the panel order in both email and banner generators.

**Before:**
```
┌──────────────────┬──────────────────┐
│   Chat/Code      │   Preview        │
│   (Left)         │   (Right)        │
└──────────────────┴──────────────────┘
```

**After:**
```
┌──────────────────┬──────────────────┐
│   Preview        │   Chat/Code      │
│   (Left)         │   (Right)        │
└──────────────────┴──────────────────┘
```

**CSS Changes:**
```tsx
// Preview Panel - Now on LEFT
<div className="w-1/2 border-r border-[#1a1652]/10 bg-white p-6 overflow-y-auto">

// Chat Area - Now on RIGHT
<div className="flex flex-1 flex-col">
```

#### 5. Download Filename Update

**Change:** Updated download filenames from "disease-awareness" to "disease-education" for consistency with the new naming.

```typescript
// Before
a.download = `disease-awareness-${emailType}.html`

// After
a.download = `disease-education-${emailType}.html`
```

### Technical Details

**Theme Colors (Disease Education):**
| Element | Hex Code | Usage |
|---------|----------|-------|
| Primary Purple | #1a1652 | Headlines, buttons, branding |
| Accent Teal | #00a7df | Secondary color, highlights |
| Background | #f9f2f8 | Page background gradient |

**Animation Configuration:**
```typescript
const totalDuration = 45000 // 45 seconds for code generation animation
const simulateTyping = () => {
  return new Promise<void>((resolve) => {
    const startTime = performance.now()
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / totalDuration, 1)
      const easedProgress = 1 - (1 - progress) * (1 - progress) // easeOutQuad
      const currentIndex = Math.floor(easedProgress * totalChars)
      setStreamingContent(htmlContent.substring(0, currentIndex))
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        resolve()
      }
    }
    requestAnimationFrame(animate)
  })
}
```

### Files Modified

| File | Changes |
|------|---------|
| `app/disease-awareness/chat/page.tsx` | Renamed to "Disease Education", swapped panels, 45s animation |
| `app/disease-awareness/banner-generator/page.tsx` | Renamed to "Disease Education", swapped panels, updated download filename |

### Recent Commits (Dec 1, Session 7)

```
8d04ac5 Rename to Disease Education and swap panel layout (preview left, chat right)
0c5fb2c Align DA email generation speed with branded banner (45 seconds)
```

---

## Recent Changes (December 2, 2025 - Session 8)

### Summary: Email Generator Panel Layout Swap

This session completed the panel layout swap for the Disease Education email generator to match the user's requested layout: preview on the RIGHT, code generation on the LEFT.

#### Panel Layout Swap (Email Generator)

**Problem:** User requested the email generator to match the banner generator layout with code generation on the LEFT and preview on the RIGHT (opposite of Session 7).

**Solution:** Swapped the panel order in the Disease Education email generator.

**Before (Session 7):**
```
┌──────────────────┬──────────────────┐
│   Preview        │   Chat/Code      │
│   (Left)         │   (Right)        │
└──────────────────┴──────────────────┘
```

**After (Session 8):**
```
┌──────────────────┬──────────────────┐
│   Chat/Code      │   Preview        │
│   (Left)         │   (Right)        │
└──────────────────┴──────────────────┘
```

**Technical Changes:**

```tsx
// Chat Area - Now on LEFT
<div className="flex flex-1 flex-col border-r border-[#1a1652]/10">
  {/* Messages, streaming content, input */}
</div>

// Preview Panel - Now on RIGHT
<div className="w-1/2 bg-white p-6 overflow-y-auto">
  {/* Email preview iframe */}
</div>
```

**Additional Cleanup:**
- Removed duplicate Chat Area section (lines 548-639)
- Removed `handleSend` function references (not needed for demo mode)
- Input field remains disabled with placeholder "Request changes or ask questions..."

### Files Modified

| File | Changes |
|------|---------|
| `app/disease-awareness/chat/page.tsx` | Swapped panel layout, removed duplicate Chat Area, removed handleSend references |

### Recent Commits (Dec 2, Session 8)

```
2355db9 Swap email generator panel layout (preview right, chat left)
```

---

## Known Issues & Future Work

### Completed Features (Previously Limitations)

1. **Content Persistence** - DONE
   - Emails and banners auto-save to `imcivree_content` table after generation
   - Content History page shows all saved content

2. **Content History** - DONE
   - View all previous generations in Content History
   - Resume/edit past content with "Edit / Create Revision" button

3. **Content Versioning** - DONE
   - `content_versions` table tracks all revisions
   - Version history viewable in Content History modal

4. **Ziflow Feedback Persistence** - DONE
   - `ziflow_feedback` and `ziflow_comments` tables in Supabase
   - Feedback persists across deploys/restarts

5. **Ziflow File Hosting** - DONE
   - Uses `video-images` Supabase Storage bucket
   - HTML files uploaded for Ziflow proof submissions

6. **Content Library** - DONE
   - Search by focus area or key message
   - Filter by content type, audience, status
   - Version history and edit functionality

### Remaining Limitations

1. **Banner Dimensions**
   - Only 728×250 (IAB Leaderboard) implemented
   - Other sizes may be requested: 300×250, 160×600, 320×50

### Potential Enhancements

| Priority | Enhancement |
|----------|-------------|
| Medium | Additional banner sizes (300×250, 160×600, 320×50) |
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
| Content Review & Feedback | Teal | `/reviews` | View and address reviewer feedback |
| Content History | Teal | `/content-history` | View past content |

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

*Document generated: December 2, 2025 (Session 8)*
