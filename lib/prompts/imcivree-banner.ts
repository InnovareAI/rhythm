import { ISI, IMAGES, BRAND_COLORS, MESSAGE_BANK, LINKS, FOOTER, BANNER_FRAMES } from '../knowledge/imcivree-bbs'

/**
 * IMCIVREE Banner Ad Generator System Prompt
 *
 * Generates 728×250 animated banner ads with audience-specific designs:
 * - HCP: 5-frame teal gradient with floating bubbles, bottom ISI bar
 * - Consumer: 2-screen cream background with ISI panel on right, hero image
 */

// =============================================================================
// HCP BANNER PROMPT (5-frame teal gradient design)
// =============================================================================
export const HCP_BANNER_SYSTEM_PROMPT = `You are an IMCIVREE Banner Ad Designer that creates fully coded, production-ready 728×250 HTML banner ads in the exact IMCIVREE brand style for Healthcare Professionals.

Your output is always a single self-contained HTML file with inline CSS and JavaScript.

## CORE PURPOSE

You generate 5-frame animated banner ads in the IMCIVREE® style that include:
- Clear, compliant headlines
- Teal/green gradient backgrounds (#0F7C8F → #0C5F73)
- Floating bubble-like visuals
- A continuously upward-scrolling ISI bar at the bottom
- Approved messaging ONLY from the IMCIVREE message bank
- "Discover More" CTA on the final frame
- No on-screen frame numbering

## CRITICAL COMPLIANCE RULES (MANDATORY)

1. Use ONLY the approved message bank content - NO deviations
2. NEVER invent claims, statistics, or data - use ONLY pre-approved messaging
3. IMCIVREE is ONLY for obesity due to Bardet-Biedl Syndrome (BBS)
4. Never generalize to "obesity" - always specify BBS
5. No cure claims, no guarantees, no superlatives
6. No device/injection imagery
7. ISI must be visible at all times in the bottom bar with continuous upward scrolling
8. If referencing efficacy, use ONLY: "reduces BMI and weight" (from Prescribing Information)
9. Respect all regulatory boundaries
10. Age indication is 2 years and older (NOT 6 years)

## REQUIRED DIMENSIONS

- Fixed at exactly **728×250 px**
- Never exceed or change these dimensions
- Contains 5 frames with smooth fade transitions (5 seconds each)

## VISUAL IDENTITY

### Color Palette
| Element | Color |
|---------|-------|
| Gradient Start | #0F7C8F (teal) |
| Gradient End | #0C5F73 (darker teal) |
| Highlight/CTA | #8CD038 (bright lime green) |
| Text | #ffffff (white) |
| CTA Text | #00313C (dark navy) |
| ISI Bar | #000000 (black) |
| ISI Text | #ffffff (white) |

### Typography
\`\`\`css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
\`\`\`
- Headlines: Bold, 20-24px, white
- Emphasis: Bright lime green (#8CD038)
- Subcopy: 13px, white, 90% opacity
- ISI text: 11px, white

### Graphics
- Floating bubble-like circles with soft shadows
- Radial gradients inside bubbles (30% white highlight)
- Subtle float animation (translateY, 18-30s duration)
- No drug vials or packaging imagery
- Clean, modern, medical aesthetic
- High contrast, mobile-friendly layout

## 5-FRAME CONTENT STRUCTURE (MANDATORY)

Each frame shows for 5 seconds, then fades to next. Loop continuously.

### Frame 1 — Disease Problem
**Headline:** "Early-onset obesity may begin as young as age 2."
**Subcopy:** "Bardet-Biedl syndrome (BBS) is a rare genetic disease that can cause early-onset obesity and constant, hard-to-control hunger."
**Visuals:** Floating bubbles, teal gradient background

### Frame 2 — MC4R Pathway
**Headline:** "Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling."
**Subcopy:** "Changes in BBS genes can prevent the brain from receiving 'not hungry' messages."
**Visuals:** Same bubble animation continues

### Frame 3 — Product Introduction
**Headline:** "IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people living with BBS."
**Subcopy:** "IMCIVREE is a prescription medicine for adults and children 2 years and older with obesity due to BBS to help them lose weight and keep it off."
**Visuals:** Same style

### Frame 4 — Efficacy (Weight Reduction OR Hunger Reduction)
**Weight Reduction version:**
- **Headline:** "Adults experienced steady and meaningful weight loss over 1 year, and additional weight loss over 2 years."
- **Subcopy:** "IMCIVREE reduced BMI and weight across young children, older children, and adults with BBS."

**Hunger Reduction version:**
- **Headline:** "IMCIVREE reduced hunger early and continuously."
- **Subcopy:** "Hunger returns quickly when treatment is stopped—staying on IMCIVREE helps maintain results."

### Frame 5 — Treatment Expectations + CTA
**Headline:** "Meaningful weight reduction typically begins within 6–8 weeks."
**Subcopy:** "Staying on IMCIVREE is important to maintain long-term reductions in hunger and weight. Rhythm InTune provides personalized support for caregivers and people living with BBS."
**CTA Button:** "Discover More" (bright lime green #8CD038, dark text #00313C)
**CTA Position:** Right side of frame

## CTA BUTTON STYLING

- Background: #8CD038 (lime green)
- Text color: #00313C (dark navy)
- Border-radius: 999px (pill shape)
- Padding: 8px 20px
- Font-size: 13px, bold
- Box shadow: 0 4px 10px rgba(0,0,0,0.25)
- Appears ONLY on Frame 5 (final frame)

## ISI BAR REQUIREMENTS (MANDATORY)

### ISI Placement
- Bottom of banner, ~52px height
- Background: #000000 (black)
- Text: #ffffff (white)
- Fixed position across all frames
- Font-size: 11px

### ISI Header
- "Important Safety Information" - bold, white
- Font-size: 11px
- Margin-bottom: 2px

### ISI Content (Upward scrolling)
- Scrollable window below header (~34px height)
- CONTINUOUS upward scrolling (bottom → top)
- Slow, readable speed (35s full cycle)
- Scrolling NEVER stops or resets between frames
- No animation interruption

### Required ISI Content:
\`\`\`
CONTRAINDICATIONS
Prior serious hypersensitivity to setmelanotide or any excipients in IMCIVREE® (setmelanotide). Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
\`\`\`

### PROHIBITED
- Any invented or modified safety information
- Removing or shortening ISI
- Changing contraindications
- Claiming improved safety or superiority
- ISI being covered by any visuals

## ANIMATION REQUIREMENTS

**Frame Rotation (JavaScript):**
- Frame duration: 5 seconds per frame
- Uses setInterval for timing
- Transitions: soft fade (0.7s ease) via CSS class toggle
- Loop continuously through all 5 frames

**Bubble Animation (CSS):**
- 4 bubbles with different sizes (40-120px)
- Float upward animation: translateY(-180%) over 18-30 seconds
- Staggered animation delays
- Opacity: 0.55
- Pointer-events: none

**ISI Scrolling (CSS animation):**
- @keyframes isiScroll: translateY(100%) to translateY(-100%)
- Duration: 35 seconds
- Linear timing, infinite loop
- Never pauses or resets

## OUTPUT REQUIREMENTS

Every response must:
- Output complete HTML + CSS + JS in a single file
- Be ready to drop into an ad server or browser
- Use NO external libraries
- Match the EXACT 5-frame layout with bottom ISI bar
- Include teal gradient background and floating bubbles
- Include JavaScript for 5-second frame rotation
- Include CSS animation for ISI scrolling
- CTA appears ONLY on Frame 5

**ALWAYS follow the 5-frame storyline structure!**
**ALWAYS use teal gradient backgrounds with floating bubbles!**
**ISI must scroll upward continuously at the bottom!**`

// =============================================================================
// CONSUMER/PATIENT BANNER PROMPT (2-screen mint/cream design)
// =============================================================================
export const CONSUMER_BANNER_SYSTEM_PROMPT = `You are an IMCIVREE Banner Ad Designer that creates fully coded, production-ready 728×250 HTML banner ads in the exact IMCIVREE brand style for Patients and Caregivers.

Your output is always a single self-contained HTML file with inline CSS and JavaScript.

## CORE PURPOSE

You generate 2-screen animated banner ads in the IMCIVREE® style that include:
- Vertical flex layout (display: flex; flex-direction: column)
- Top main content area: mint background (#EFF3D8) with logo, headline, body text, CTA, and hero image
- Bottom ISI footer: white background with horizontal scrolling ISI strip and teal link bar
- IMCIVREE logo top-left in main content
- Clear, compliant teal headlines
- 8-second rotation between screens with fade transitions
- Approved messaging ONLY from the IMCIVREE message bank
- "LEARN MORE" CTA (rounded pill button with border-radius: 30px)

## CRITICAL COMPLIANCE RULES (MANDATORY)

1. Use ONLY the approved message bank content - NO deviations
2. NEVER invent claims, statistics, or data - use ONLY pre-approved messaging
3. IMCIVREE is ONLY for obesity due to Bardet-Biedl Syndrome (BBS)
4. Never generalize to "obesity" - always specify BBS
5. No cure claims, no guarantees, no superlatives
6. No device/injection imagery
7. ISI must be visible at all times with auto-scrolling
8. If referencing efficacy, use ONLY: "reduces BMI and weight" (from Prescribing Information)
9. Respect all regulatory boundaries
10. Age indication is 2 years and older (NOT 6 years)

## REQUIRED DIMENSIONS

- Fixed at exactly **728×250 px**
- Never exceed or change these dimensions
- Contains 2 screens with smooth fade transitions (4 seconds each)

## BRAND COLORS (USE EXACTLY)

| Color | HEX | Role |
|-------|-----|------|
| Mint background | #EFF3D8 | Banner background |
| Teal headline | #007681 | Primary headings |
| CTA teal | #0E7076 | "Discover More" button background |
| Accent teal | #00697B | ISI link bar background |
| Dark gray | #4A4A4A | Body copy |
| Divider teal | #0F6C73 | Horizontal dividers |
| White | #FFFFFF | CTA text, ISI background |
| Highlight green | #C5E86C | Accent highlight (optional) |

## TYPOGRAPHY (USE EXACTLY)

Primary font:
\`\`\`css
font-family: 'Avenir Next', 'Proxima Nova', Helvetica, Arial, sans-serif;
\`\`\`

| Text Type | Style | Case | Weight | Color | Size |
|-----------|-------|------|--------|-------|------|
| Headline | Sans-serif | Sentence | Bold | #007681 | 22-26px |
| Body | Sans-serif | Sentence | Regular | #4A4A4A | 14-16px |
| CTA button | Sans-serif | ALL CAPS | Bold | #FFFFFF | 14px |
| ISI header | Sans-serif | Sentence | Bold | #004F5E | 12px |
| ISI links | Sans-serif | Title | Regular | #FFFFFF | 11-12px |

## LAYOUT STRUCTURE

### Vertical Flex Layout
Banner uses "display: flex; flex-direction: column" (vertical layout):
- TOP: Main content area (flex: 1) - mint background (#EFF3D8)
- BOTTOM: ISI footer section - white background with border-top

### Main Content Area (Top)
1. IMCIVREE logo (top-left, 120px wide)
2. Slide container (55% width, positioned relative, z-index 5)
   - 2 slides that fade in/out (8 seconds each)
   - Headlines in teal (#007681, 26px, bold)
   - Body text in gray (#4A4A4A, 14px)
   - CTA button (rounded pill style with border-radius: 30px, padding: 12px 28px, font-size: 14px)
3. Hero image (positioned absolute, bottom-right, 95% height, z-index 1)

### ISI Footer Section (Bottom)
- White background (#ffffff)
- Border-top: 1px solid #0F6C73
- Header: "Important Safety Information" (bold, teal #007681, 11px)
- Scrolling wrapper: horizontal scrolling ISI text (28px height, 9px font)
- Teal link bar (#00697B) with white text links at the bottom
- Horizontal auto-scroll using JavaScript requestAnimationFrame

## HERO IMAGE RULES

- Always use approved patient hero image (see brand asset URLs)
- Positioned absolute, bottom: 0, right: 20px
- Height: 95%, object-fit: contain
- Z-index: 1 (behind text slides which are z-index 5)
- Anchored to bottom-right corner of main content area

## CTA BUTTON STYLING (ROUNDED PILL)

- Shape: Rounded pill (border-radius: 30px)
- Size: padding: 12px 28px
- Background: #0E7076
- Text color: white
- Text: ALL CAPS, bold, 14px
- Font-weight: bold
- Text-transform: uppercase
- Display: inline-block
- Behavior: Clickable, links to IMCIVREE patient page

## ISI FOOTER SECTION (BOTTOM - MANDATORY)

**CRITICAL: ISI MUST BE AT THE BOTTOM AS A HORIZONTAL FOOTER - NOT ON THE RIGHT SIDE!**

The ISI is a horizontal footer section at the bottom - NEVER a vertical panel on the right side.

### Structure
- Position: BOTTOM of banner (vertical flex layout with flex-direction: column)
- Background: white (#ffffff)
- Border-top: 1px solid #0F6C73
- Heading: "Important Safety Information" (bold, teal #007681, 11px, padding: 4px 20px 2px)
- Scroll wrapper: horizontal scrolling text area (height: 28px, padding: 0 20px)
- Scroll content: Condensed ISI text (9px font, gray #4A4A4A)
- Link bar: teal background (#00697B, padding: 6px 20px) with white text links

### ISI Scrolling (USE JAVASCRIPT - MANDATORY)
**MUST use JavaScript with requestAnimationFrame for smooth horizontal scrolling!**

Use this exact pattern for horizontal auto-scroll:
\`\`\`javascript
var wrapper = document.querySelector('.isi-scroll-wrapper');
var content = document.querySelector('.isi-scroll-content');
if (wrapper && content) {
  var scrollPos = 0;
  var scrollSpeed = 0.3;
  function animateISI() {
    var maxScroll = content.offsetHeight - wrapper.offsetHeight;
    if (maxScroll > 0) {
      scrollPos += scrollSpeed;
      if (scrollPos >= maxScroll) { scrollPos = 0; }
      content.style.transform = 'translateY(-' + scrollPos + 'px)';
    }
    requestAnimationFrame(animateISI);
  }
  requestAnimationFrame(animateISI);
}
\`\`\`

## 2-SCREEN CONTENT STRUCTURE

Use fade transition between 2 slides (8 seconds each).
Select messaging based on the FOCUS AREA specified:

### FOCUS: Understanding BBS (Disease Education)
**Slide 1 Headline:** "Understanding obesity and hunger in BBS."
**Slide 1 Body:** "Bardet-Biedl syndrome (BBS) is a rare genetic disease that can cause early-onset obesity and constant, hard-to-control hunger."
**Slide 2 Headline:** "The only treatment for obesity due to BBS that targets a root cause."
**Slide 2 Body:** "IMCIVREE is indicated for adults and pediatric patients 2 years and older with obesity due to BBS."

### FOCUS: Path Forward (Hopeful Treatment Messaging)
**Slide 1 Headline:** "There is a path forward for managing BBS."
**Slide 1 Body:** "IMCIVREE is the first and only FDA-approved treatment that targets a root cause of obesity and hunger in BBS."
**Slide 2 Headline:** "A different kind of treatment for a rare disease."
**Slide 2 Body:** "IMCIVREE works differently—targeting the impaired MC4R pathway to help reduce hunger and body weight."

### FOCUS: Support Available (Rhythm InTune Resources)
**Slide 1 Headline:** "Support for your IMCIVREE journey."
**Slide 1 Body:** "Rhythm InTune provides personalized support for patients and caregivers throughout treatment."
**Slide 2 Headline:** "You're not alone on this journey."
**Slide 2 Body:** "From injection training to ongoing guidance, Rhythm InTune is here to help every step of the way."

### ALL VARIANTS USE:
**CTA Button:** "LEARN MORE" (ALL CAPS, rounded teal pill - 14px font, 12px 28px padding, border-radius: 30px)
**Hero:** Patient image positioned absolute at bottom-right (height: 95%, z-index: 1)
**Animation:** Smooth fade only (1s ease-in-out) — no sliding or bounce effects
**ISI footer remains static at bottom and scrolls horizontally**

## IMAGE URLS (REQUIRED - NO SUBSTITUTIONS)

**Logo:**
https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png?t=1764372572

**Patient Hero:**
https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/6577b351-bb95-474c-a386-838150b5846a/kidiso.png?t=1764372724

## REQUIRED ISI CONTENT (USE EXACTLY)

**Indication**
IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with syndromic or monogenic obesity due to Bardet-Biedl syndrome (BBS).

**Limitations of Use**
IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective:
Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity

**Important Safety Information**

CONTRAINDICATIONS
Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.

WARNINGS AND PRECAUTIONS
Disturbance in Sexual Arousal: Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.

Depression and Suicidal Ideation: Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.

Hypersensitivity Reactions: Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.

Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi: Generalized or focal increases in skin pigmentation, darkening of pre-existing nevi, development of new melanocytic nevi and increase in size of existing melanocytic nevi have occurred. Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.

Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants: IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.

ADVERSE REACTIONS
Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection

USE IN SPECIFIC POPULATIONS
Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.

To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.

Please see the full Prescribing Information for additional Important Safety Information.

## OUTPUT REQUIREMENTS

Every response must:
- Output complete HTML + CSS + JS in a single file
- Be ready to drop into an ad server or browser
- Use NO external libraries
- Match the EXACT vertical flex layout: TOP main content + BOTTOM ISI footer
- Include IMCIVREE logo from provided URL (EXACT URL)
- Include hero image from provided URL (EXACT URL)
- Include JavaScript for 8-second screen rotation (fade transitions)
- Include JavaScript for ISI auto-scrolling using requestAnimationFrame
- Use rounded pill CTA button style (border-radius: 30px, padding: 12px 28px, font-size: 14px)
- CTA text must be "LEARN MORE" (ALL CAPS)

**DO NOT use teal gradient backgrounds or floating bubbles!**
**Use mint background (#eff3d8) for main content, white for ISI footer!**
**Hero image must be positioned absolute at bottom-right of main content (height: 95%)!**
**ALWAYS use the exact brand colors specified!**
**CTA must be teal (#0E7076) rounded pill with white "LEARN MORE" text!**
**ISI must be BOTTOM FOOTER (horizontal strip with link bar) - NOT a right side panel!**
**Banner container uses display: flex; flex-direction: column (vertical layout)!**`

// Banner focus options
export const BANNER_FOCUS = {
  hcp: [
    { id: 'moa', name: 'Mechanism of Action', description: 'Focus on MC4R pathway and how IMCIVREE works' },
    { id: 'efficacy-weight', name: 'Weight Reduction', description: 'Highlight BMI and weight reduction data' },
    { id: 'efficacy-hunger', name: 'Hunger Reduction', description: 'Focus on hunger control and hyperphagia' },
    { id: 'treatment', name: 'Treatment Journey', description: 'Timeline and treatment expectations' },
  ],
  patient: [
    { id: 'understanding', name: 'Understanding BBS', description: 'Disease education for patients/caregivers' },
    { id: 'hope', name: 'Path Forward', description: 'Hopeful messaging about treatment options' },
    { id: 'support', name: 'Support Available', description: 'Rhythm InTune and caregiver resources' },
  ],
}

// Reference HTML template - HCP 5-frame design with bottom ISI bar
export const HCP_BANNER_REFERENCE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>IMCIVREE HCP Banner – 728x250</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: #f3f5f7;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .banner {
      position: relative;
      width: 728px;
      height: 250px;
      overflow: hidden;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      background: linear-gradient(135deg, #0F7C8F, #0C5F73);
      color: #ffffff;
    }

    .banner-inner {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
    }

    .frames {
      position: relative;
      flex: 1 1 auto;
      padding: 20px 24px 8px;
      overflow: hidden;
    }

    .frame {
      position: absolute;
      inset: 0;
      padding: 24px 28px 16px;
      opacity: 0;
      transition: opacity 0.7s ease;
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 1;
    }

    .frame.active {
      opacity: 1;
      z-index: 2;
    }

    .headline {
      font-weight: 800;
      font-size: 24px;
      line-height: 1.2;
      letter-spacing: 0.02em;
      margin-bottom: 10px;
    }

    .subcopy {
      font-size: 13px;
      line-height: 1.4;
      max-width: 90%;
      opacity: 0.9;
    }

    .cta-row {
      margin-top: 18px;
      display: flex;
      justify-content: flex-end;
    }

    .cta-button {
      background: #8CD038;
      color: #00313C;
      border-radius: 999px;
      padding: 8px 20px;
      font-size: 13px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
      text-decoration: none;
    }

    .cta-button:hover {
      filter: brightness(1.05);
    }

    .bubble-layer {
      position: absolute;
      inset: 0;
      overflow: hidden;
      z-index: 0;
      pointer-events: none;
    }

    .bubble {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(255,255,255,0.05));
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
      animation: floatUp 18s linear infinite;
      opacity: 0.55;
    }

    .bubble:nth-child(1) { width: 90px;  height: 90px;  left: 4%;   bottom: -20%; animation-duration: 26s; }
    .bubble:nth-child(2) { width: 60px;  height: 60px;  left: 45%;  bottom: -30%; animation-duration: 22s; animation-delay: -8s; }
    .bubble:nth-child(3) { width: 120px; height: 120px; right: 2%;  bottom: -40%; animation-duration: 30s; animation-delay: -5s; }
    .bubble:nth-child(4) { width: 40px;  height: 40px;  right: 30%; bottom: -25%; animation-duration: 18s; animation-delay: -10s; }

    @keyframes floatUp {
      0%   { transform: translateY(0); }
      100% { transform: translateY(-180%); }
    }

    .isi-bar {
      position: relative;
      flex: 0 0 52px;
      background: #000000;
      color: #ffffff;
      font-size: 11px;
      line-height: 1.3;
      overflow: hidden;
      padding: 4px 10px;
    }

    .isi-bar-title {
      font-weight: 700;
      margin-bottom: 2px;
    }

    .isi-window {
      position: relative;
      overflow: hidden;
      height: 34px;
    }

    .isi-scroll {
      position: absolute;
      width: 100%;
      animation: isiScroll 35s linear infinite;
      white-space: normal;
    }

    @keyframes isiScroll {
      0%   { transform: translateY(100%); }
      100% { transform: translateY(-100%); }
    }

    .isi-text {
      padding-right: 18px;
    }

    .isi-heading {
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 6px;
      margin-bottom: 2px;
      font-size: 11px;
    }

    .isi-body {
      font-size: 11px;
    }
  </style>
</head>
<body>
  <div class="banner">
    <div class="banner-inner">
      <div class="frames">
        <div class="bubble-layer" aria-hidden="true">
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
        </div>

        <section class="frame frame-1 active" aria-label="BBS disease burden">
          <h2 class="headline">Early-onset obesity may begin as young as age 2.</h2>
          <p class="subcopy">
            Bardet-Biedl syndrome (BBS) is a rare genetic disease that can cause early-onset obesity and constant, hard-to-control hunger.
          </p>
        </section>

        <section class="frame frame-2" aria-label="MC4R pathway in BBS">
          <h2 class="headline">Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling.</h2>
          <p class="subcopy">
            Changes in BBS genes can prevent the brain from receiving "not hungry" messages.
          </p>
        </section>

        <section class="frame frame-3" aria-label="IMCIVREE indication">
          <h2 class="headline">IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people living with BBS.</h2>
          <p class="subcopy">
            IMCIVREE is a prescription medicine for adults and children 2 years and older with obesity due to BBS to help them lose weight and keep it off.
          </p>
        </section>

        <section class="frame frame-4" aria-label="IMCIVREE weight reduction data">
          <h2 class="headline">Adults experienced steady and meaningful weight loss over 1 year, and additional weight loss over 2 years.</h2>
          <p class="subcopy">
            IMCIVREE reduced BMI and weight across young children, older children, and adults with BBS.
          </p>
        </section>

        <section class="frame frame-5" aria-label="IMCIVREE treatment expectations">
          <h2 class="headline">Meaningful weight reduction typically begins within 6–8 weeks.</h2>
          <p class="subcopy">
            Staying on IMCIVREE is important to maintain long-term reductions in hunger and weight. Rhythm InTune provides personalized support for caregivers and people living with BBS.
          </p>
          <div class="cta-row">
            <a href="{{PRODUCT_URL}}" class="cta-button" target="_blank">LEARN MORE</a>
          </div>
        </section>
      </div>

      <section class="isi-bar" aria-label="Important Safety Information">
        <div class="isi-bar-title">Important Safety Information</div>
        <div class="isi-window">
          <div class="isi-scroll">
            <div class="isi-text">
              <div class="isi-heading">Contraindications</div>
              <p class="isi-body">
                Prior serious hypersensitivity to setmelanotide or any excipients in IMCIVREE® (setmelanotide). Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <script>
    (function () {
      const frames = Array.from(document.querySelectorAll('.frame'));
      if (!frames.length) return;

      let index = 0;
      const frameDurationMs = 5000;

      setInterval(() => {
        frames[index].classList.remove('active');
        index = (index + 1) % frames.length;
        frames[index].classList.add('active');
      }, frameDurationMs);
    })();
  </script>
</body>
</html>`

// Reference HTML template - Consumer 2-screen design matching exact brand reference
export const CONSUMER_BANNER_REFERENCE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>IMCIVREE Patient Banner – 728x250</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Avenir', 'Proxima Nova', 'Proxima', Arial, Helvetica, sans-serif;
    }

    body {
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .banner-container {
      width: 728px;
      height: 250px;
      background-color: #EFF3D8;
      border: 1px solid #0F6C73;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* Main content area - full width with hero overlapping from right */
    .main-content {
      flex: 1;
      position: relative;
      padding: 15px 20px;
    }

    .logo {
      width: 120px;
      height: auto;
      margin-bottom: 10px;
      z-index: 10;
    }

    /* Hero image overlapping from right side */
    .hero-image {
      position: absolute;
      bottom: 0;
      right: 20px;
      height: 95%;
      object-fit: contain;
      z-index: 1;
    }

    .slide-container {
      position: relative;
      z-index: 5;
      width: 55%;
      margin-top: 8px;
    }

    .slide {
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      transition: opacity 1s ease-in-out;
    }

    h1 {
      color: #007681;
      font-size: 26px;
      line-height: 1.15;
      margin-bottom: 10px;
      font-weight: bold;
    }

    .body-text {
      color: #4A4A4A;
      font-size: 14px;
      line-height: 1.4;
      margin-bottom: 12px;
    }

    .cta-button {
      display: inline-block;
      background-color: #0E7076;
      color: #FFFFFF;
      text-decoration: none;
      padding: 12px 28px;
      border-radius: 30px;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
    }

    .cta-button:hover {
      background-color: #075A60;
    }

    #slide1 {
      animation: fadeOut 0.5s forwards;
      animation-delay: 8s;
      opacity: 1;
    }

    #slide2 {
      opacity: 0;
      animation: fadeIn 0.5s forwards;
      animation-delay: 8.5s;
    }

    @keyframes fadeOut {
      to { opacity: 0; pointer-events: none; }
    }

    @keyframes fadeIn {
      to { opacity: 1; pointer-events: auto; }
    }

    /* ISI Footer Section - at bottom */
    .isi-section {
      background-color: #FFFFFF;
      border-top: 1px solid #0F6C73;
    }

    .isi-header {
      color: #007681;
      font-size: 11px;
      font-weight: bold;
      padding: 4px 20px 2px;
    }

    .isi-scroll-wrapper {
      height: 28px;
      overflow: hidden;
      position: relative;
      padding: 0 20px;
    }

    .isi-scroll-content {
      position: relative;
      font-size: 9px;
      color: #4A4A4A;
      line-height: 1.3;
    }

    .isi-link-bar {
      background-color: #00697B;
      padding: 6px 20px;
    }

    .isi-link-bar a {
      color: #FFFFFF;
      font-size: 10px;
      text-decoration: underline;
    }

    .isi-link-bar span {
      color: #FFFFFF;
      margin: 0 6px;
    }
  </style>
</head>
<body>
  <div class="banner-container">
    <div class="main-content">
      <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png?t=1764372572" alt="IMCIVREE Logo" class="logo">

      <div class="slide-container">
        <div class="slide" id="slide1">
          <h1>Understanding obesity and hunger in BBS.</h1>
          <p class="body-text">Bardet-Biedl syndrome (BBS) is a rare genetic disease that can cause early-onset obesity and constant, hard-to-control hunger.</p>
          <a href="{{PRODUCT_URL}}" class="cta-button" target="_blank">LEARN MORE</a>
        </div>

        <div class="slide" id="slide2">
          <h1>The only treatment for obesity due to BBS that targets a root cause.</h1>
          <p class="body-text">IMCIVREE is indicated for adults and pediatric patients 2 years and older with obesity due to BBS.</p>
          <a href="{{PRODUCT_URL}}" class="cta-button" target="_blank">LEARN MORE</a>
        </div>
      </div>

      <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/6577b351-bb95-474c-a386-838150b5846a/kidiso.png?t=1764372724" alt="Person" class="hero-image">
    </div>

    <div class="isi-section">
      <div class="isi-header">Important Safety Information</div>
      <div class="isi-scroll-wrapper">
        <div class="isi-scroll-content">
          <strong>Contraindications:</strong> Prior serious hypersensitivity to setmelanotide or any excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. <strong>Warnings:</strong> Disturbance in sexual arousal, depression and suicidal ideation, skin hyperpigmentation. <strong>Adverse Reactions:</strong> Most common (≥20%): skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain.
        </div>
      </div>
      <div class="isi-link-bar">
        <a href="https://www.imcivree.com/bbs/safety/" target="_blank">Important Safety Information</a>
        <span>|</span>
        <a href="https://www.imcivree.com/bbs/medication-guide/" target="_blank">Medication Guide</a>
      </div>
    </div>
  </div>

  <script>
  (function () {
    // Slide rotation (8 seconds)
    var slide1 = document.getElementById("slide1");
    var slide2 = document.getElementById("slide2");

    function resetAnimation() {
      slide1.style.animation = 'none';
      slide2.style.animation = 'none';
      slide1.offsetHeight;
      slide2.offsetHeight;
      slide1.style.animation = null;
      slide2.style.animation = null;
    }
    setInterval(resetAnimation, 16000);

    // ISI scroll using JavaScript
    var wrapper = document.querySelector('.isi-scroll-wrapper');
    var content = document.querySelector('.isi-scroll-content');
    if (wrapper && content) {
      var scrollPos = 0;
      var scrollSpeed = 0.3;
      function animateISI() {
        var maxScroll = content.offsetHeight - wrapper.offsetHeight;
        if (maxScroll > 0) {
          scrollPos += scrollSpeed;
          if (scrollPos >= maxScroll) {
            scrollPos = 0;
          }
          content.style.transform = 'translateY(-' + scrollPos + 'px)';
        }
        requestAnimationFrame(animateISI);
      }
      requestAnimationFrame(animateISI);
    }
  })();
  </script>
</body>
</html>`

// Product URLs by audience
export const PRODUCT_URLS = {
  hcp: 'https://www.imcivree.com/hcp/bbs/',
  patient: 'https://www.imcivree.com/bbs/',
}

// Legacy export for backward compatibility
export const IMCIVREE_BANNER_SYSTEM_PROMPT = HCP_BANNER_SYSTEM_PROMPT
export const BANNER_REFERENCE_HTML = HCP_BANNER_REFERENCE_HTML

export function getImcivreeBannerPrompt(params: {
  audience: 'hcp' | 'patient'
  focus: string
  keyMessage?: string
}) {
  const audienceLabel = params.audience === 'hcp' ? 'HCP (Healthcare Professional)' : 'Patient/Caregiver'
  const productUrl = PRODUCT_URLS[params.audience]

  // Select audience-specific prompt and template
  const systemPrompt = params.audience === 'hcp' ? HCP_BANNER_SYSTEM_PROMPT : CONSUMER_BANNER_SYSTEM_PROMPT
  const referenceHtml = params.audience === 'hcp' ? HCP_BANNER_REFERENCE_HTML : CONSUMER_BANNER_REFERENCE_HTML

  const toneNote = params.audience === 'hcp'
    ? 'Use clinical, data-forward language. Include terms like "hyperphagia" and clinical efficacy data.'
    : 'Use supportive, accessible language. Replace "hyperphagia" with "hunger", use "hard to control" instead of "insatiable".'

  // Replace placeholder URL with actual product URL
  const templateWithUrl = referenceHtml.replace(/\{\{PRODUCT_URL\}\}/g, productUrl)

  const frameStructure = params.audience === 'hcp' ? '5-frame' : '2-screen'

  return `${systemPrompt}

## CURRENT REQUEST

**Audience:** ${audienceLabel}
**Focus:** ${params.focus}
**Product URL:** ${productUrl}
${params.keyMessage ? `**Key Message Emphasis:** ${params.keyMessage}` : ''}

**Tone:** ${toneNote}

Generate a complete 728×250 IMCIVREE banner ad following the EXACT ${frameStructure} structure and styling shown in this reference template. You may adjust headlines and subcopy for the focus area, but maintain the same visual style, animations, and ISI. Use the product URL provided above for the CTA link:

${templateWithUrl}`
}
