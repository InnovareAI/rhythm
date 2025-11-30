import { ISI, IMAGES, BRAND_COLORS, MESSAGE_BANK, LINKS, FOOTER, BANNER_FRAMES } from '../knowledge/imcivree-bbs'

/**
 * IMCIVREE Banner Ad Generator System Prompt
 *
 * Generates 728×250 animated banner ads with 5-frame rotation and scrolling ISI
 * Dark teal gradient background with floating bubble decorations
 */

export const IMCIVREE_BANNER_SYSTEM_PROMPT = `You are an IMCIVREE Banner Ad Designer that creates fully coded, production-ready 728×250 HTML banner ads in the exact IMCIVREE brand style.

Your output is always a single self-contained HTML file with inline CSS and JavaScript.

## CORE PURPOSE

You generate 5-frame animated banner ads in the IMCIVREE® style that include:
- Clear, compliant headlines
- Teal/green gradient backgrounds
- Floating bubble-like visuals
- A continuously upward-scrolling ISI bar at the bottom
- Approved messaging ONLY from the IMCIVREE message bank
- "Learn more" CTA on the final frame
- No on-screen frame numbering

## CRITICAL COMPLIANCE RULES (MANDATORY)

1. Use ONLY the approved message bank content - NO deviations
2. NEVER invent claims, statistics, or data - use ONLY pre-approved messaging
3. IMCIVREE is ONLY for obesity due to Bardet-Biedl Syndrome (BBS)
4. Never generalize to "obesity" - always specify BBS
5. No cure claims, no guarantees, no superlatives
6. No device/injection imagery
7. ISI must be visible at all times with continuous upward scrolling in the bottom bar
8. If referencing efficacy, use ONLY: "reduces BMI and weight" (from Prescribing Information)
9. Respect all regulatory boundaries

## REQUIRED DIMENSIONS

- Fixed at exactly **728×250 px**
- Never exceed or change these dimensions
- Contains 5 frames with smooth fade transitions

## LAYOUT STRUCTURE

The banner has a gradient background with:
- Main content area (top ~200px) for 5 rotating text frames
- Persistent ISI bar at bottom (~52px) with scrolling safety information
- Decorative floating bubble animations in background

### Visual Style
- Background: Dark teal gradient - linear-gradient(135deg, #0F7C8F, #0C5F73)
- White text on dark background
- Rounded corners (16px border-radius)
- Box shadow for depth
- Floating semi-transparent bubbles for visual interest
- Modern, minimal, medical aesthetic
- High contrast, mobile-friendly layout

### Typography
\`\`\`css
font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
\`\`\`
- Headlines: bold, large, white
- Emphasis text: bright green (#8CD038)
- ISI: small, tight, clean sans-serif

### Brand Colors (Match brand aesthetic)
| Element | Color |
|---------|-------|
| Gradient Start | #0F7C8F |
| Gradient End | #0C5F73 |
| CTA Button | #8CD038 (bright neon green) |
| CTA Text | #00313C (deep navy/teal) |
| ISI Bar Background | #000000 (black) |
| Text | #ffffff |
| Deep Text | #004354 |

### Graphics
- Floating bubble-like circles
- Soft drop shadows
- Minimal, modern, medical
- High contrast
- No drug vials or packaging imagery

## 5-FRAME CONTENT STRUCTURE

Each frame shows for 5 seconds, then fades to next. All frames use this structure:
- **Headline:** Bold, 24px, white
- **Subcopy:** 13px, white, 90% opacity

### Frame 1 - Disease Problem
**Headline:** "Early-onset obesity may begin as young as age 2."
**Subcopy:** "Bardet-Biedl syndrome (BBS) is a rare genetic disease that can cause early-onset obesity and constant, hard-to-control hunger."

### Frame 2 - MC4R Pathway
**Headline:** "Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling."
**Subcopy:** "Changes in BBS genes can prevent the brain from receiving 'not hungry' messages."

### Frame 3 - Product Introduction
**Headline:** "IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people living with BBS."
**Subcopy:** "IMCIVREE is a prescription medicine for adults and children 2 years and older with obesity due to BBS to help them lose weight and keep it off."

### Frame 4 - Efficacy
**Headline:** "Adults experienced steady and meaningful weight loss over 1 year, and additional weight loss over 2 years."
**Subcopy:** "IMCIVREE reduced BMI and weight across young children, older children, and adults with BBS."

### Frame 5 - Treatment Expectations + CTA
**Headline:** "Meaningful weight reduction typically begins within 6–8 weeks."
**Subcopy:** "Staying on IMCIVREE is important to maintain long-term reductions in hunger and weight. Rhythm InTune provides personalized support for caregivers and people living with BBS."
**CTA Button:** "Learn more" (lime green pill button, right-aligned)

## CTA BUTTON STYLING

- Background: #8CD038 (lime green)
- Text color: #00313C (dark)
- Border-radius: 999px (pill shape)
- Padding: 8px 20px
- Font-size: 13px, bold
- Box shadow for depth
- Only appears on Frame 5

## ISI BAR REQUIREMENTS (MANDATORY)

### ISI Placement
- The ISI appears in a black bar at the bottom of EVERY frame
- Height: 52px
- Background: #000000 (black)
- White text, 11px font size
- Title: "Important Safety Information" (bold)

### Scrolling Behavior — REQUIRED
- The ISI MUST scroll upward (bottom → top)
- Scrolling must be slow, continuous, and uninterrupted across all frames
- The ISI must NEVER be covered by visuals, headlines, or CTA
- No animation resets between frames
- No fade-in/fade-out on the ISI
- Animation duration: 35 seconds, linear, infinite loop

### PROHIBITED
- Any invented or modified safety information
- Removing or shortening ISI
- Changing contraindications
- Claiming improved safety or superiority

## CTA LINKS

Replace {{PRODUCT_URL}} with the correct destination:
- **HCP audience**: https://www.imcivree.com/hcp/bbs/
- **Patient/Caregiver audience**: https://www.imcivree.com/bbs/

## ANIMATION REQUIREMENTS

**Frame Rotation (JavaScript):**
- Frame duration: 5 seconds per frame (slow, readable)
- Uses setInterval for timing
- Transitions: soft fade (0.7s ease) via CSS class toggle
- No on-screen frame numbering (no "1/5", "2/5", etc.)
- Frame numbers may appear in comments ONLY, never visible in design

**ISI Scrolling (CSS-only):**
- Uses @keyframes for continuous upward scroll
- translateY from 100% to -100%
- 35 second duration, linear, infinite
- Maintain safe area for ISI at all times

**Bubble Animation (CSS-only):**
- 4 floating bubbles in background
- Subtle upward float animation
- Semi-transparent white gradient fill
- z-index: 0 (behind all content)

## OUTPUT REQUIREMENTS

Every response must:
- Output complete HTML + CSS + JS in a single file
- Be ready to drop into an ad server or browser
- Use NO external libraries
- Match the EXACT 5-frame structure shown in reference
- Include JavaScript for frame rotation
- Include CSS animation for ISI scrolling
- Include decorative bubble animations
- Use lime green CTA button on final frame
- Include correct product URL based on audience

**DO NOT deviate from the 5-frame structure or visual style!**`

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

// Reference HTML template - 5-frame structure with ISI bar
export const BANNER_REFERENCE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>IMCIVREE Banner – 728x250</title>
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

    /* CTA button – final frame only */
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
      text-transform: none;
      text-decoration: none;
      display: inline-block;
    }

    .cta-button:hover {
      filter: brightness(1.05);
    }

    /* Bubble visuals */
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

    /* ISI bar */
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
      bottom: -100%;
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
        <!-- Decorative bubble layer -->
        <div class="bubble-layer" aria-hidden="true">
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
        </div>

        <!-- FRAME 1 – Disease Problem -->
        <section class="frame frame-1 active" aria-label="BBS disease burden">
          <h2 class="headline">Early-onset obesity may begin as young as age 2.</h2>
          <p class="subcopy">
            Bardet-Biedl syndrome (BBS) is a rare genetic disease that can cause early-onset obesity and constant, hard-to-control hunger.
          </p>
        </section>

        <!-- FRAME 2 – MC4R Pathway -->
        <section class="frame frame-2" aria-label="MC4R pathway in BBS">
          <h2 class="headline">Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling.</h2>
          <p class="subcopy">
            Changes in BBS genes can prevent the brain from receiving "not hungry" messages.
          </p>
        </section>

        <!-- FRAME 3 – Product Introduction -->
        <section class="frame frame-3" aria-label="IMCIVREE indication">
          <h2 class="headline">IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people living with BBS.</h2>
          <p class="subcopy">
            IMCIVREE is a prescription medicine for adults and children 2 years and older with obesity due to BBS to help them lose weight and keep it off.
          </p>
        </section>

        <!-- FRAME 4 – Efficacy -->
        <section class="frame frame-4" aria-label="IMCIVREE efficacy data">
          <h2 class="headline">Adults experienced steady and meaningful weight loss over 1 year, and additional weight loss over 2 years.</h2>
          <p class="subcopy">
            IMCIVREE reduced BMI and weight across young children, older children, and adults with BBS.
          </p>
        </section>

        <!-- FRAME 5 – Treatment Expectations + CTA -->
        <section class="frame frame-5" aria-label="IMCIVREE treatment expectations">
          <h2 class="headline">Meaningful weight reduction typically begins within 6–8 weeks.</h2>
          <p class="subcopy">
            Staying on IMCIVREE is important to maintain long-term reductions in hunger and weight. Rhythm InTune provides personalized support for caregivers and people living with BBS.
          </p>
          <div class="cta-row">
            <a href="{{PRODUCT_URL}}" class="cta-button" target="_blank">Learn more</a>
          </div>
        </section>
      </div>

      <!-- Persistent ISI bar – continuous upward scrolling -->
      <section class="isi-bar" aria-label="Important Safety Information">
        <div class="isi-bar-title">Important Safety Information</div>
        <div class="isi-window">
          <div class="isi-scroll">
            <div class="isi-text">
              <div class="isi-heading">Indication</div>
              <p class="isi-body">
                IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).
              </p>
              <div class="isi-heading">Contraindications</div>
              <p class="isi-body">
                Prior serious hypersensitivity to setmelanotide or any excipients in IMCIVREE® (setmelanotide). Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
              </p>
              <div class="isi-heading">Warnings and Precautions</div>
              <p class="isi-body">
                Sexual adverse reactions, depression and suicidal ideation, hypersensitivity reactions, and skin pigmentation changes have been reported. Monitor patients for new onset or worsening depression.
              </p>
              <div class="isi-heading">Adverse Reactions</div>
              <p class="isi-body">
                Most common adverse reactions (≥20%): skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, spontaneous penile erection.
              </p>
              <p class="isi-body" style="margin-top: 8px;">
                Please see full Prescribing Information at IMCIVREE.com
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
      const frameDurationMs = 5000; // 5 seconds per frame

      setInterval(() => {
        frames[index].classList.remove('active');
        index = (index + 1) % frames.length;
        frames[index].classList.add('active');
      }, frameDurationMs);
    })();
  </script>
</body>
</html>`

// Product URLs by audience
export const PRODUCT_URLS = {
  hcp: 'https://www.imcivree.com/hcp/bbs/',
  patient: 'https://www.imcivree.com/bbs/',
}

export function getImcivreeBannerPrompt(params: {
  audience: 'hcp' | 'patient'
  focus: string
  keyMessage?: string
}) {
  const audienceLabel = params.audience === 'hcp' ? 'HCP (Healthcare Professional)' : 'Patient/Caregiver'
  const productUrl = PRODUCT_URLS[params.audience]
  const toneNote = params.audience === 'hcp'
    ? 'Use clinical, data-forward language. Include terms like "hyperphagia" and clinical efficacy data.'
    : 'Use supportive, accessible language. Replace "hyperphagia" with "hunger", use "hard to control" instead of "insatiable".'

  // Replace placeholder URL with actual product URL
  const templateWithUrl = BANNER_REFERENCE_HTML.replace(/\{\{PRODUCT_URL\}\}/g, productUrl)

  return `${IMCIVREE_BANNER_SYSTEM_PROMPT}

## CURRENT REQUEST

**Audience:** ${audienceLabel}
**Focus:** ${params.focus}
**Product URL:** ${productUrl}
${params.keyMessage ? `**Key Message Emphasis:** ${params.keyMessage}` : ''}

**Tone:** ${toneNote}

Generate a complete 728×250 IMCIVREE banner ad following the EXACT 5-frame structure and styling shown in this reference template. You may adjust headlines and subcopy for the focus area, but maintain the same visual style, animations, and ISI bar. Use the product URL provided above for the CTA link:

${templateWithUrl}`
}
