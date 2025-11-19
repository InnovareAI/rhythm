# Rhythm - Pharma Content Hub Requirements

## Project Overview
A content generation hub for rare disease pharmaceutical companies to create:
- Social media posts (Facebook, Instagram, X/Twitter)
- HCP (Healthcare Professional) emails
- Patient emails
- Banner ads
- Short video clips/reels

**Target Client:** Rhythm Pharmaceuticals (IMCIVREE® - Bardet-Biedl Syndrome treatment)

**Timeline:** Demo/prototype by Friday for client meeting next Monday

**Priority:** Speed of build + Quality content output

---

## Key Business Requirements

### From Phone Script Context

1. **Data Privacy & Firewall Requirements**
   - Cannot use public AI platforms (Jasper, etc.) without enterprise firewall
   - Must have privacy overlays for proprietary client data
   - All content generation must be behind secure infrastructure

2. **Content Types Needed**
   - HCP emails with proper AMA-style references
   - Patient social media posts
   - Banner ads (visual + text combination)
   - Short video clips (future - Remotion or similar)

3. **Compliance Requirements**
   - Must pull ONLY from approved sources (no hallucinations)
   - Proper AMA-style referencing for MLR approval
   - Cannot reinterpret MLR-approved content
   - Headlines must be exactly as approved or requires new MLR review
   - All clinical claims must have superscripted references

4. **Segmentation Support**
   - HCP segments: Loyalist, Champion, Non-loyalist, etc.
   - Variable fields: Doctor name, practice info, etc.
   - Customized messaging per segment

5. **Content Review Workflow**
   - Client review portal
   - MLR review integration (potential Veeva Vault integration)
   - Zyflow integration for content routing
   - Smart comment filtering (deprioritize "I hate this" type comments)

6. **Knowledge Base Requirements**
   - Website scraping (e.g., rhythmtx.com)
   - "What good looks like" templates for each content type
   - Reference documents for proper citation
   - Brand guidelines

---

## Social Media Requirements

### Platform-Specific Rules

#### Global Rules (All Platforms)
- Avoid product names unless full ISI and indication provided
- Avoid clinical claims unless references provided
- Use accessible, uplifting, human-centered language
- Maintain compliance - never imply unapproved benefits
- Scannable structure (short lines, spacing, emojis sparingly)
- 6th-8th grade reading level unless otherwise specified

#### Facebook Rules
**Character Count:**
- Post Copy: 125-280 characters (ideal)
- Headline: 40-60 characters
- Link Description: 30-50 characters

**Tone:**
- Uplifting, enlightening, warm
- Approachable but informed
- Empathetic, healing-focused, reassuring

**Structure:**
- Headline - attention-grabbing question or bold statement
- Engaging Hook - emotional, reflective, curiosity-driven
- CTA - encourage clicking, learning, joining
- Optional Visual Prompt

**Forbidden:**
- NO unapproved product benefits
- NO fear-based language
- NO medical claims without references
- NO exceeding character limits

#### X/Twitter Rules
**Character Count:** 50-280 characters

**Tone:**
- Curiosity-driven
- Thought-provoking and reflective
- Scientific but accessible
- Safe, ethical, trustworthy

**Required Elements:**
- Engaging Hook
- Brevity with impact
- Hashtags: 1-3 maximum
- Emojis: optional, sparse (✨🌿)
- CTA

**Forbidden:**
- NO exceeding 280 characters
- NO product names without ISI
- NO overuse of hashtags/emojis

#### Instagram Rules
**Character Count:**
- Ideal: 125-150 characters
- Maximum: 2,200 characters (only if requested)

**Tone:**
- Inspiring, mindful, emotional
- Visual and experiential
- Story-driven, transformation-oriented

**Required Elements:**
- Strong First Line (before "read more" cut)
- Emotional or reflective messaging
- CTA (ask question, invite sharing, tagging, exploring)
- Hashtags: 10-15 relevant tags
- Emojis to break text and enhance tone
- Mentions/Location tags (optional)

**Forbidden:**
- NO regulated product info without ISI
- NO misleading/unapproved health claims
- NO overstuffed hashtags/emojis

### Social Media Writer Persona

**Work Ethic:**
- Detail-oriented (meticulous about every word)
- Creative problem-solver (complex → accessible)
- Adaptable and curious (stays current on trends)
- Collaborative communicator (works with marketing, medical, legal)

**Content Approach:**
- Data-driven (uses analytics)
- Customer-centric (understands pain points)
- Professional yet approachable tone
- Balanced visual use

**Platform Expertise:**
- LinkedIn: Insightful, educational, value-driven
- X: Timely, concise, shareable
- Instagram: Visually engaging, emotional, discoverable

**Process:**
1. Audience research
2. Clear and compliant copy
3. Helpful, non-aggressive CTAs
4. Engagement strategy (respond to comments)
5. Continuous testing and improvement

**Success Metrics:**
- Engagement rate
- Follower growth
- Conversions
- Content performance analytics

---

## IMCIVREE® Social Media Specifications

### Output Sequence (MANDATORY)

1. **CAPTION** (first)
   - Eyebrow, headline, intro
   - Bullet points
   - CTA
   - References with superscripts
   - Full ISI block

2. **HASHTAGS** (second)
   - 10-15 compliant, non-stigmatizing
   - Examples: #IMCIVREE #BardetBiedlSyndrome #BBSCommunity #RareDisease #PrescriptionMedication #PatientSupport #HealthyTogether #GeneticObesity #PatientEducation #KnowYourOptions

3. **WHO TO TAG** (third)
   - @rhythmpharma
   - Patient advocacy groups
   - Rare disease organizations
   - NEVER tag individuals

4. **VISUAL PROMPT** (fourth)
   - Teal-forward calm visuals (#1c7b80, #007a80)
   - Rounded shapes, soft shadows
   - Neutral, patient-supportive tone
   - NO weight imagery, before/after, medical procedures
   - Clean typography
   - 1080×1350 portrait

5. **IMAGE GENERATION** (fifth)
   - Generate Instagram-ready image from prompt

6. **POSTING GUIDANCE** (sixth)
   - Best times to post
   - Context suggestions

### Brand Requirements
- Avoid weight-loss implications/transformation language
- Avoid comparisons with other treatments
- Strictly FDA-compliant
- Neutral, educational tone

### Full ISI Block (PATIENT VERSION - USE EXACTLY)

```
IMPORTANT SAFETY INFORMATION (for Patients)

WHAT IS IMCIVREE?
IMCIVREE is a prescription medicine used in adults and children 2 years of age and older with obesity due to Bardet-Biedl syndrome (BBS) to help them lose weight and keep the weight off.

IMCIVREE is not for use in people with the following conditions because it may not work:
• Other types of obesity not related to BBS or other FDA-approved uses of IMCIVREE, including obesity associated with other genetic conditions and general obesity

It is not known if IMCIVREE is safe and effective in children under 2 years of age.

Do not use IMCIVREE if:
• You have had a serious allergic reaction to it or any of its ingredients. Serious allergic reactions, including anaphylaxis, can happen.

Before using IMCIVREE, tell your healthcare provider if you:
• Have or have had areas of darkened skin
• Have or have had depression or suicidal thoughts
• Have kidney problems
• Are pregnant or planning to become pregnant
• Are breastfeeding or plan to breastfeed

Tell your healthcare provider about all medicines you take, including prescription and over-the-counter medicines, vitamins, and herbal supplements.

See the Instructions for Use that come with IMCIVREE for preparation, injection, and safe syringe disposal instructions.

IMCIVREE may cause serious side effects, including:
• Sexual function problems in males and females
• Depression and suicidal thoughts or actions
• Serious allergic reactions
• Increased skin pigmentation and changes in moles
• Benzyl alcohol toxicity in premature or low-birth-weight infants

Common side effects include darkened skin, injection site reactions, nausea, headache, diarrhea, stomach pain, vomiting, depression, and spontaneous erections in males.

These are not all the possible side effects.
Call your doctor for medical advice. Report negative side effects to FDA: 1-800-FDA-1088 or www.fda.gov/medwatch.

Please see full Prescribing Information, including Patient Information.
```

---

## Email Requirements

### Email Structure (MANDATORY)

#### Subject Lines (Always 3 Options)
NEVER include product name. Must provide:
1. A question (e.g., "Are your patients getting the support they need?")
2. A statement (e.g., "A new perspective on patient care")
3. A curiosity/benefit hook (e.g., "What clinicians are rethinking this year")

#### Preheaders (Always 3 Options)
Each subject line gets complementary preheader:
- Do NOT repeat subject line
- Do NOT include product name
- Expand value or curiosity
- Examples:
  - "Explore insights shaping patient care"
  - "See what's influencing treatment decisions"
  - "A closer look at patient needs"

#### Body Copy Requirements

**Scannability:**
- Bulleted lists
- Short paragraphs (1-2 lines)
- Icons where appropriate
- Clear subheads
- Highlighted data with superscripts

**Reading Level:**
- Patient: 6th-grade level
- HCP: Professional but concise

**Claims & Data:**
- Every claim/data point needs superscript reference number
- AMA-style references in reference block
- Example: "67% of patients reported improvement by week 4.¹"

### Mandatory Compliance Elements (IN ORDER)

1. **Full ISI** (Important Safety Information)
   - Must appear at end
   - NEVER rewrite ISI unless explicitly provided
   - If missing: `[INSERT APPROVED ISI HERE — DO NOT GENERATE]`

2. **AMA-Style Reference Block**
   - Every superscript must appear here
   - Follow AMA citation formatting
   - If missing: `[INSERT APPROVED REFERENCES HERE — DO NOT GENERATE]`

3. **Legal Footer**
   - © Company Name + year
   - Company mailing address
   - Unsubscribe link
   - Privacy policy link
   - Required corporate language
   - Use placeholders if missing: `[COMPANY ADDRESS]`, `[UNSUBSCRIBE LINK]`, etc.

### Tone & Voice

**HCP Emails:**
- Lead with value
- Present data early
- Tight, scannable, respectful of time

**Patient Emails:**
- Simple and supportive
- Focus on relatable benefits
- Avoid jargon

### Forbidden Actions
- Include product name in subject/preheader
- Create or invent safety information
- Alter or paraphrase ISI text
- Create fictional data, references, claims
- Use dense paragraphs or walls of text
- Exceed required reading level

### Output Format (Strict)
1. 3 Subject Lines
2. 3 Preheaders
3. Email Body Content (scannable, benefit-driven, compliant)
4. ISI (placeholder or provided)
5. Reference Block (AMA style)
6. Legal/Footer Information

---

## IMCIVREE® Email Specifications (HCP)

### Canvas-Only Output
- All output in ChatGPT Canvas
- Fully-rendered HTML
- Responsive, production-ready
- Visually consistent

### Anti-Artifact Rule
- NO system tokens (filecite, turn0file0, oaicite)
- Clean HTML only: `<sup>1</sup> <sup>2</sup>`
- No metadata, JSON, or placeholder code

### Email Structure

#### Top Brand Bar
- Background: teal #1c7b80
- Logo: https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png
- Right text: "FOR U.S. HEALTHCARE PROFESSIONALS" (uppercase, white, 12px)

#### Hero Block
- Background: #f6fbfb
- White hero card, subtle shadow, rounded corners
- Eyebrow: uppercase teal #007a80
- Headline: bold teal #007a80
- Short, factual, on-label intro

**Hero Images by Email Type:**
| Email Type | Hero Image |
|------------|------------|
| MOA Email | https://www.imcivree.com/static/hcp-bbs-functional-mc4r-3e490b24a8f4f9bcc4ede22918fb38da.png |
| Summary Email | https://www.imcivree.com/static/dosing-box-953935ca5e56951d5e90c73760348f8e.png |
| Dosing Email | https://www.imcivree.com/static/hcp-bbs-dosing-chart-young-children-0287c959c1242bd92cc8832f0b0f0c42.png |

- Only ONE hero image per email
- Never repeat hero in body

#### Main Content Section
- Subhead
- Body paragraph
- Bullet list with optional inline icons

**Approved Icons:**
- Decision: https://www.imcivree.com/static/deciding-7d8ad39aafa2238baac466e8d01b8e67.svg
- Learning: https://www.imcivree.com/static/learning-16a302a10874bd1676177c6ebe63cf9a.svg
- Dosing: https://www.imcivree.com/static/dosing-box-953935ca5e56951d5e90c73760348f8e.png

**Example bullet HTML:**
```html
<li><img src="ICON_URL" alt="" width="18" style="vertical-align:middle;margin-right:6px;">Neutral, factual bullet text.</li>
```

- All content neutral, factual, on-label
- Use copy from: https://www.imcivree.com/hcp/bbs/

#### CTA Button
- Teal pill #007a80, white text
- Hover: slightly darker teal
- Neutral text (e.g., "Learn more", "See full Prescribing Information")
- Default link: https://www.imcivree.com/hcp/bbs/

#### References Block (MANDATORY)
- Maintain superscripts throughout: `<sup>1</sup>`
- Placeholder before ISI:
```
References:
1. [Reference content matching superscript 1]
2. [Reference content matching superscript 2]
```
- Do NOT fabricate or modify reference text

#### ISI Block (MANDATORY - HCP VERSION)

**Design:**
- Background: #fafafa
- Top border: teal #1c7b80
- Header: "Important Safety Information" (bold teal)

**ISI Content (USE EXACTLY):**

```
Indication
IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with syndromic or monogenic obesity due to Bardet-Biedl syndrome (BBS).

Limitations of Use
IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective:
Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity

Important Safety Information
CONTRAINDICATIONS
Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.

WARNINGS AND PRECAUTIONS
Disturbance in Sexual Arousal: Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.
Depression and Suicidal Ideation: Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.
Hypersensitivity Reactions: Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.
Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi: Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.
Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants: IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.

ADVERSE REACTIONS
Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection

USE IN SPECIFIC POPULATIONS
Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.

To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
Please see the full Prescribing Information for additional Important Safety Information.
```

**Signoff:**
```
© 2025, Rhythm Pharmaceuticals, Inc. All rights reserved. Rhythm, IMCIVREE, and their logos are trademarks of Rhythm Pharmaceuticals, Inc.
```

### Brand Visual Requirements
- Header teal: #1c7b80
- Primary teal: #007a80
- Light background: #f6fbfb
- ISI background: #fafafa
- Text gray: #4a4f55
- Rounded corners, soft shadows
- Responsive layout
- Sans-serif fonts (Arial/Helvetica)
- Exactly ONE hero image per email

### Compliance & Safety Rules

**MUST:**
- Use only FDA-approved, on-label information
- Never invent or infer data
- Never compare IMCIVREE to other therapies
- Never omit or paraphrase ISI
- Always preserve safety language exactly

---

## Reference Websites

### Primary Sources
- **HCP Site:** https://hcp.rhythmtx.com/
- **Patient Site:** https://rhythmtx.com/patients/
- **IMCIVREE HCP BBS:** https://www.imcivree.com/hcp/bbs/

---

## Technical Considerations (TBD)

### Content Generation
- OpenAI GPT-4 API (text)
- DALL-E 3 or Replicate (images)
- Remotion (videos - future)

### Data Storage
- TBD (NOT Supabase yet)

### Content Review
- Zyflow integration (30-day trial available)
- Smart comment filtering
- MLR workflow
- Potential Veeva Vault integration

---

## Demo Priorities (by Friday)

1. **HCP Email Generator**
   - Product info input form
   - Email type selection (MOA, Summary, Dosing)
   - Generated email with proper structure
   - HTML preview

2. **Social Media Post Generator**
   - Platform selection (Instagram, Facebook, X)
   - Content type (patient vs HCP)
   - Generated post with caption, hashtags, tags
   - Visual prompt (image generation optional)

3. **Key Differentiators to Show**
   - Pulls from approved sources only
   - Proper referencing
   - Brand consistency
   - Compliance built-in
   - Visual + text combination (not just text like Jasper)

---

## Notes from Phone Script

- Client wants to see "what the system is capable of"
- They will send content/data once they understand capabilities
- Focus on showing framework, not perfection
- Emphasize: "References will be correct, pulling from approved sources, all framework is there, we'll tighten it up"
- Show process: Input → Generation → Preview
- Don't oversell - caveat that content will be refined

---

## Success Criteria

✅ Demo shows email + social media generation
✅ Output is branded and compliant
✅ Shows proper referencing capability
✅ HTML preview for emails
✅ Clear that it pulls from approved sources only
✅ Fast enough to demo by Friday
