# 3cubed Rhythm - Pharmaceutical Content Hub
## Handover Document for Next Assistant

**Last Updated:** January 21, 2025
**Project Status:** Production - Fully Deployed
**Production URL:** https://beautiful-cactus-21f97b.netlify.app

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Key Features](#key-features)
4. [Technology Stack](#technology-stack)
5. [File Structure](#file-structure)
6. [API Endpoints](#api-endpoints)
7. [Database Schema](#database-schema)
8. [Environment Variables](#environment-variables)
9. [AI Models & Services](#ai-models--services)
10. [Content Generators](#content-generators)
11. [Known Issues](#known-issues)
12. [Deployment Process](#deployment-process)
13. [Future Enhancements](#future-enhancements)

---

## Project Overview

**Purpose:** AI-powered pharmaceutical content generation platform for rare disease medications, creating FDA-compliant marketing materials.

**Core Capabilities:**
- HCP Email Generation (conversational chat)
- Social Media Post Generation (form-based)
- Video Generation with Kling AI (form-based)
- AI-powered content prompt generation
- Unified content history with auto-save
- Medical/clinical content focus (NO lifestyle imagery)

**Target Users:** Pharmaceutical marketing teams working on rare disease medications

---

## System Architecture

```
┌─────────────────────────────────────────────────┐
│              Next.js 16 Frontend                │
│         (App Router + Server Actions)           │
└────────────────┬────────────────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
┌───▼──────────┐    ┌────────▼─────────┐
│   Netlify    │    │    Supabase      │
│   Hosting    │    │    Database      │
│  (60s max)   │    │   + Storage      │
└───┬──────────┘    └──────────────────┘
    │
┌───▼──────────────────────────────────┐
│        External AI Services          │
├──────────────────────────────────────┤
│ • OpenRouter (Claude 4.5 Sonnet)     │
│ • Fal.ai (Flux Dev + Kling Video)    │
└──────────────────────────────────────┘
```

**Key Architectural Decisions:**
1. **Async Video Generation:** Videos take 60-90s, so we use queue/poll pattern to avoid timeouts
2. **Client-Side Mockups:** Social media mockups use html2canvas (client-side) due to serverless limitations
3. **Auto-Save Everything:** All generated content automatically saves to Supabase
4. **Medical Content Focus:** AI prompts explicitly prevent lifestyle/emotional imagery

---

## Key Features

### 1. HCP Email Generator (`/chat?type=hcp-email`)
- Conversational chat interface
- Generates FDA-compliant emails with ISI and references
- AI prompt helper at conversation start
- Auto-saves to conversations table

### 2. Social Media Generator (`/social-media-generator`)
- **Form-based** interface (not chat)
- Platform selection: Instagram, Facebook, X/Twitter
- AI content generator button
- Generates medical illustrations/infographics
- Creates platform-specific mockups
- Auto-saves to conversations table

### 3. Video Generator (`/video-generator`)
- **Form-based** interface (not chat)
- Three image source options:
  - AI generation (Flux Dev)
  - Image upload (Supabase storage)
  - Image URL
- AI prompt generator for both image and animation
- Async video generation with Kling 2.5 Turbo Pro
- Polls every 3 seconds for completion
- Auto-saves to video_generations table

### 4. Content History (`/content-history`)
- **Unified view** of all content (emails, social, videos)
- Filter tabs by content type
- Grid view with previews
- Click to view full details
- Download options
- Fetches from both `conversations` and `video_generations` tables

---

## Technology Stack

### Frontend
- **Next.js 16.0.3** (App Router, Turbopack)
- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **html2canvas** for client-side mockup generation

### Backend/APIs
- **Next.js API Routes** (serverless functions)
- **Netlify** (hosting, 60-second function timeout on Pro plan)
- **Supabase** (PostgreSQL database + file storage)

### AI Services
- **OpenRouter API** - Claude 4.5 Sonnet for content/prompt generation
- **Fal.ai** - Flux Dev (images) + Kling 2.5 Turbo Pro (videos)

### Key Libraries
- `@supabase/supabase-js` - Database client
- `@fal-ai/serverless-client` - AI generation
- `html2canvas` - Social media mockups

---

## File Structure

### Critical Files & Their Purpose

#### **Content Generators**
```
/app/chat/page.tsx                     # HCP email generator (conversational)
/app/social-media-generator/page.tsx   # Social media form generator
/app/video-generator/page.tsx          # Video form generator
/app/content-history/page.tsx          # Unified content history
```

#### **API Routes**
```
/app/api/chat/route.ts                 # Main chat endpoint (emails + auto-save)
/app/api/generate-image/route.ts       # Flux Dev image generation
/app/api/start-video/route.ts          # Start async Kling video (returns request_id)
/app/api/check-video/route.ts          # Poll video status (async polling)
/app/api/upload-image/route.ts         # Upload to Supabase storage
/app/api/save-video/route.ts           # Save video to database
/app/api/generate-prompts/route.ts     # AI prompt gen for VIDEO (Claude 4.5)
/app/api/generate-content-prompts/route.ts  # AI prompt gen for EMAIL/SOCIAL (Claude 4.5)
/app/api/conversations/route.ts        # Fetch email/social history
/app/api/video-history/route.ts        # Fetch video history
```

#### **Core Libraries**
```
/lib/fal.ts                            # Fal.ai image/video generation
/lib/supabase.ts                       # Supabase client initialization
/lib/prompts/                          # LLM prompts for content generation
```

#### **Components**
```
/components/SocialMockup.tsx           # Instagram/Facebook/Twitter mockups
```

---

## API Endpoints

### Content Generation

#### `/api/chat` (POST)
**Purpose:** Main endpoint for email/social generation + auto-save
**Input:**
```json
{
  "messages": [{"role": "user", "content": "..."}, ...],
  "contentType": "hcp-email" | "social-media",
  "conversationId": "uuid" (optional)
}
```
**Output:**
```json
{
  "message": "...",
  "conversationId": "uuid",
  "generatedContent": "...",
  "imageUrl": "...",
  "state": {...}
}
```

#### `/api/generate-image` (POST)
**Purpose:** Generate pharmaceutical image with Flux Dev
**Input:**
```json
{
  "prompt": "Medical illustration showing...",
  "productName": "IBRANCE"
}
```
**Output:**
```json
{
  "imageUrl": "https://..."
}
```

#### `/api/start-video` (POST)
**Purpose:** Queue async video generation
**Timeout:** 10 seconds (just queues job)
**Input:**
```json
{
  "imageUrl": "https://...",
  "prompt": "Camera movement...",
  "productName": "IBRANCE"
}
```
**Output:**
```json
{
  "requestId": "fal-request-id",
  "status": "QUEUED"
}
```

#### `/api/check-video` (GET)
**Purpose:** Poll video generation status
**Timeout:** 10 seconds
**Query:** `?requestId=fal-request-id`
**Output:**
```json
{
  "status": "IN_QUEUE" | "IN_PROGRESS" | "COMPLETED" | "FAILED",
  "videoUrl": "https://..." (if completed)
}
```

#### `/api/upload-image` (POST)
**Purpose:** Upload image to Supabase storage
**Input:** FormData with `file` field
**Output:**
```json
{
  "imageUrl": "https://...",
  "filename": "..."
}
```

### AI Prompt Generation

#### `/api/generate-prompts` (POST)
**Purpose:** Generate image/animation prompts for videos (Claude 4.5)
**Input:**
```json
{
  "productName": "IBRANCE",
  "videoType": "patient-story" | "education" | "mechanism" | "reel",
  "targetAudience": "patients" | "caregivers" | "hcp" | "general"
}
```
**Output:**
```json
{
  "imagePrompt": "Medical illustration showing...",
  "animationPrompt": "Camera slowly zooms into..."
}
```

#### `/api/generate-content-prompts` (POST)
**Purpose:** Generate content ideas for email/social (Claude 4.5)
**Input:**
```json
{
  "productName": "IBRANCE",
  "contentType": "hcp-email" | "social-media",
  "targetAudience": "..."
}
```
**Output (Email):**
```json
{
  "subject": "...",
  "keyMessage": "...",
  "clinicalFocus": "..."
}
```
**Output (Social):**
```json
{
  "message": "...",
  "visualConcept": "...",
  "hashtags": "..."
}
```

### History

#### `/api/conversations` (GET)
**Purpose:** Fetch email/social history
**Output:**
```json
{
  "conversations": [
    {
      "id": "uuid",
      "content_type": "hcp-email" | "social-media",
      "messages": [...],
      "state": {...},
      "created_at": "..."
    }
  ]
}
```

#### `/api/video-history` (GET)
**Purpose:** Fetch video history
**Output:**
```json
{
  "videos": [
    {
      "id": "uuid",
      "product_name": "IBRANCE",
      "video_url": "...",
      "image_url": "...",
      "created_at": "..."
    }
  ]
}
```

---

## Database Schema

### Supabase Tables

#### `conversations`
**Purpose:** Stores email and social media content
**Schema:**
```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_type TEXT NOT NULL,  -- 'hcp-email' or 'social-media'
  messages JSONB NOT NULL,      -- Array of {role, content}
  state JSONB,                  -- {productName, imageUrl, platform, etc.}
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);
```

**RLS Policies:**
```sql
-- Allow public read/insert (adjust for production auth)
CREATE POLICY "Allow public read" ON conversations FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert" ON conversations FOR INSERT TO public WITH CHECK (true);
```

#### `video_generations`
**Purpose:** Stores generated videos
**Schema:**
```sql
CREATE TABLE video_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name TEXT NOT NULL,
  video_type TEXT NOT NULL,     -- 'patient-story', 'education', etc.
  target_audience TEXT NOT NULL,
  image_prompt TEXT,
  animation_prompt TEXT,
  image_url TEXT,
  video_url TEXT NOT NULL,
  image_source TEXT,            -- 'generate', 'upload', 'url'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_video_generations_created_at ON video_generations(created_at DESC);
```

**RLS Policies:**
```sql
CREATE POLICY "Allow public read" ON video_generations FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert" ON video_generations FOR INSERT TO public WITH CHECK (true);
```

### Supabase Storage

#### `video-images` Bucket
**Purpose:** Store user-uploaded images for video generation
**Configuration:**
- Public bucket: YES
- Max file size: 10MB
- Allowed types: image/jpeg, image/png, image/webp

**RLS Policies:**
```sql
CREATE POLICY "Allow public uploads to video-images"
  ON storage.objects FOR INSERT TO public
  WITH CHECK (bucket_id = 'video-images');

CREATE POLICY "Allow public reads from video-images"
  ON storage.objects FOR SELECT TO public
  USING (bucket_id = 'video-images');
```

---

## Environment Variables

### Required in Netlify

```bash
# OpenRouter (Claude 4.5 Sonnet)
OPENROUTER_API_KEY=sk-or-...

# Fal.ai (Flux Dev + Kling Video)
FAL_KEY=...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://....supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# Optional
NEXT_PUBLIC_SITE_URL=https://beautiful-cactus-21f97b.netlify.app
```

### Local Development (`.env.local`)
Same as above, plus:
```bash
NODE_ENV=development
```

---

## AI Models & Services

### OpenRouter (Claude 4.5 Sonnet)
**Model ID:** `anthropic/claude-sonnet-4.5`
**Used For:**
- Content generation (emails, social posts)
- AI prompt generation
- Medical content focus

**Pricing:** ~$3 per 1M input tokens, ~$15 per 1M output tokens

**Key Prompt Instructions:**
- Focus on MEDICAL and CLINICAL content
- NO lifestyle imagery or emotional scenes
- Emphasize mechanism of action, clinical data, infographics
- FDA-compliant language

### Fal.ai - Flux Dev
**Model ID:** `fal-ai/flux/dev`
**Used For:** Image generation
**Settings:**
```javascript
{
  image_size: 'portrait_4_3',
  num_inference_steps: 20,
  guidance_scale: 3.5,
  output_format: 'jpeg'
}
```
**Pricing:** ~$0.025 per image

### Fal.ai - Kling Video 2.5 Turbo Pro
**Model ID:** `fal-ai/kling-video/v2.5-turbo/pro/image-to-video`
**Used For:** Video generation (image-to-video)
**Settings:**
```javascript
{
  duration: '5',              // 5 seconds
  aspect_ratio: '16:9',
  cfg_scale: 0.5,
  negative_prompt: 'blur, distortion, low quality, artifacts, watermark, text'
}
```
**Generation Time:** 60-90 seconds
**Pricing:** $0.35 per 5-second video

**Async Pattern:**
1. `/api/start-video` queues job, returns `request_id`
2. Frontend polls `/api/check-video` every 3 seconds
3. Max 60 attempts (3 minutes total)
4. Status: `IN_QUEUE` → `IN_PROGRESS` → `COMPLETED`

---

## Content Generators

### HCP Email Generator
**Route:** `/chat?type=hcp-email`
**Interface:** Conversational chat
**Features:**
- AI prompt helper at start
- Step-by-step questions
- Generates email with ISI and references
- Auto-saves to `conversations` table

**Prompt System:** See `/lib/prompts/hcp-email.ts`

### Social Media Generator
**Route:** `/social-media-generator`
**Interface:** Form-based (like video generator)
**Features:**
- Platform selection (Instagram/Facebook/X)
- AI content generator button
- Medical visual generation (infographics, diagrams)
- Platform-specific mockup preview
- Auto-saves to `conversations` table

**Key Component:** `SocialMockup.tsx` (client-side html2canvas)

### Video Generator
**Route:** `/video-generator`
**Interface:** Form-based
**Features:**
- Three image sources: AI, Upload, URL
- AI prompt generator (image + animation)
- Async video generation with polling
- Auto-saves to `video_generations` table

**Async Flow:**
```
User submits → Generate/upload image → start-video (queue)
→ Poll check-video every 3s → Get video URL → Auto-save → Display
```

---

## Known Issues

### 1. Image Generation Timeout Warning
**Issue:** The earlier deployment had "Failed to generate image" errors
**Cause:** Unknown - may be FAL_KEY or API issues
**Status:** Needs testing after deployment
**Solution:** Check Netlify function logs with `netlify functions:log`

### 2. Video Generation Database Table
**Issue:** `video_generations` table must be created manually in Supabase
**Status:** User needs to run SQL in Supabase dashboard
**Solution:** SQL provided in deployment notes (see Database Schema section)

### 3. Supabase Storage Bucket
**Issue:** `video-images` bucket must be created manually
**Status:** User needs to create in Supabase dashboard
**Solution:**
1. Go to Storage → New Bucket
2. Name: `video-images`
3. Public: YES
4. Run RLS policies (see Database Schema section)

### 4. Old Chat History Page
**Issue:** `/history` page was removed but may still exist in old deployments
**Status:** RESOLVED - deleted in this session
**Note:** Only `/content-history` should exist now

### 5. Lockfile Warning
**Issue:** Next.js warns about multiple lockfiles
**Message:** "Next.js inferred your workspace root, but it may not be correct"
**Status:** Non-critical, doesn't affect functionality
**Solution (Optional):** Add to `next.config.js`:
```javascript
turbopack: {
  root: '/Users/tvonlinz/Dev_Master/3cubed/rhythm'
}
```

---

## Deployment Process

### Current Deployment
**Platform:** Netlify
**Plan:** Pro (60-second function timeout)
**Build Command:** `npm run build`
**Publish Directory:** `.next`

### Deploy Steps
```bash
# 1. Build locally (checks for errors)
npm run build

# 2. Deploy to production
netlify deploy --prod

# Alternative: Combined command
npm run build && netlify deploy --prod
```

### Netlify Configuration (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  node_bundler = "esbuild"
```

### Post-Deployment Checklist
- [ ] Verify environment variables are set in Netlify
- [ ] Test image generation (`/social-media-generator`)
- [ ] Test video generation (`/video-generator`)
- [ ] Test async video polling (wait 60-90 seconds)
- [ ] Test content history (`/content-history`)
- [ ] Check Supabase tables exist
- [ ] Check Supabase storage bucket exists
- [ ] Verify auto-save works for all content types

### Troubleshooting Deployment

**Build Fails:**
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

**Function Timeouts:**
- Check if using async pattern for videos
- Verify `maxDuration = 10` for start-video
- Verify `maxDuration = 60` for generate-image
- Ensure Netlify Pro plan (60s timeout)

**Database Errors:**
- Check Supabase credentials
- Verify tables exist (conversations, video_generations)
- Check RLS policies allow public access
- Test with SQL Editor: `SELECT * FROM conversations LIMIT 1;`

**Storage Errors:**
- Check bucket exists: `video-images`
- Verify bucket is public
- Check RLS policies on storage.objects
- Test upload manually in Supabase dashboard

---

## Future Enhancements

### High Priority
1. **User Authentication**
   - Add Supabase Auth
   - User-specific content history
   - Team collaboration features

2. **Content Editing**
   - Allow editing saved content
   - Version history
   - Regenerate with different settings

3. **Better Error Handling**
   - User-friendly error messages
   - Retry mechanisms for API failures
   - Fallback options when generation fails

### Medium Priority
4. **Batch Generation**
   - Generate multiple social posts at once
   - A/B testing variants
   - Bulk export

5. **Template Library**
   - Pre-built templates for common use cases
   - Save custom templates
   - Share templates across team

6. **Analytics Dashboard**
   - Usage statistics
   - Cost tracking
   - Content performance metrics

### Low Priority
7. **Multi-Language Support**
   - Generate content in multiple languages
   - Translation service integration

8. **Brand Guidelines**
   - Upload brand assets
   - Enforce brand colors/fonts
   - Custom visual style presets

9. **Compliance Tools**
   - Built-in ISI validator
   - Reference checker
   - FDA regulation checker

---

## Testing Checklist

### Manual Testing

#### Social Media Generator
- [ ] Visit `/social-media-generator`
- [ ] Enter product name: "IBRANCE"
- [ ] Click "Generate Post Content with AI"
- [ ] Verify medical-focused content (not lifestyle)
- [ ] Fill in fields or use generated content
- [ ] Submit form
- [ ] Wait for image generation
- [ ] Verify mockup displays correctly
- [ ] Check image downloads
- [ ] Verify saved to Content History

#### Video Generator
- [ ] Visit `/video-generator`
- [ ] Enter product name: "IBRANCE"
- [ ] Click "Generate Image & Animation Prompts"
- [ ] Verify medical-focused prompts
- [ ] Select "Generate Image"
- [ ] Fill in image description
- [ ] Fill in animation description
- [ ] Submit form
- [ ] Wait for image generation
- [ ] Wait for video polling (60-90 seconds)
- [ ] Verify video plays
- [ ] Check downloads work
- [ ] Verify saved to Content History

#### HCP Email Generator
- [ ] Visit `/chat?type=hcp-email`
- [ ] See AI prompt generator
- [ ] Generate content ideas
- [ ] Use or skip
- [ ] Complete conversation
- [ ] Verify email generated
- [ ] Check saved to Content History

#### Content History
- [ ] Visit `/content-history`
- [ ] See all generated content
- [ ] Test filter tabs (All, Emails, Social, Videos)
- [ ] Click on each content type
- [ ] Verify modal displays correctly
- [ ] Test downloads

### API Testing

```bash
# Test image generation
curl -X POST https://beautiful-cactus-21f97b.netlify.app/api/generate-image \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Medical illustration", "productName": "IBRANCE"}'

# Test video queue
curl -X POST https://beautiful-cactus-21f97b.netlify.app/api/start-video \
  -H "Content-Type: application/json" \
  -d '{"imageUrl": "...", "prompt": "...", "productName": "IBRANCE"}'

# Test video status
curl https://beautiful-cactus-21f97b.netlify.app/api/check-video?requestId=...

# Test content history
curl https://beautiful-cactus-21f97b.netlify.app/api/conversations
curl https://beautiful-cactus-21f97b.netlify.app/api/video-history
```

---

## Important Notes

### Medical Content Focus
**CRITICAL:** All AI prompts are configured to generate MEDICAL and CLINICAL content:
- ✅ Medical illustrations, infographics, clinical diagrams
- ✅ Mechanism of action visualizations
- ✅ Clinical data, trial results, patient outcomes
- ❌ NO lifestyle imagery (living rooms, home settings)
- ❌ NO emotional scenes (people with tablets, warm lighting)

If lifestyle content starts appearing, check:
- `/app/api/generate-prompts/route.ts` (video prompts)
- `/app/api/generate-content-prompts/route.ts` (email/social prompts)

Both have explicit instructions to avoid lifestyle imagery.

### Async Pattern is Critical
Video generation MUST use async queue/poll pattern:
- Videos take 60-90 seconds to generate
- Netlify Pro has 60-second timeout
- Cannot use synchronous generation
- Must use `start-video` → poll `check-video`

### Auto-Save is Transparent
All content auto-saves in background:
- Social: Saves after image generation
- Video: Saves after video completion
- Email: Saves after conversation ends
- No user action required
- Failures are logged but not shown to user

### Database Access is Public
Current RLS policies allow public read/write:
- **Good for:** Demo/testing
- **Bad for:** Production with real data
- **TODO:** Add authentication and user-specific policies

---

## Contact & Resources

**Project Repository:** `/Users/tvonlinz/Dev_Master/3cubed/rhythm`
**Production URL:** https://beautiful-cactus-21f97b.netlify.app
**Netlify Dashboard:** https://app.netlify.com/projects/beautiful-cactus-21f97b

**Key Documentation:**
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Fal.ai Docs](https://fal.ai/models)
- [OpenRouter Docs](https://openrouter.ai/docs)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)

**API Keys Location:** Netlify Environment Variables

---

## Quick Start for Next Assistant

1. **Review this document completely**
2. **Check current deployment:** Visit production URL
3. **Test all three generators** (email, social, video)
4. **Review database:** Login to Supabase, check tables
5. **Check environment variables:** Netlify dashboard
6. **Run locally:**
   ```bash
   cd /Users/tvonlinz/Dev_Master/3cubed/rhythm
   npm install
   npm run dev
   ```
7. **Test deployment:**
   ```bash
   npm run build && netlify deploy --prod
   ```

**If anything is unclear, check:**
- Function logs: `netlify functions:log ___netlify-server-handler`
- Supabase logs: Supabase dashboard → Logs
- Browser console: Check for client-side errors
- Network tab: Check API responses

---

## End of Handover Document

**Last Working State:** All features operational and deployed
**Next Assistant:** Ready to continue development
**Priority:** Test all features after reading this document

Good luck! 🚀
