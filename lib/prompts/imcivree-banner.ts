import { ISI, IMAGES, BRAND_COLORS, MESSAGE_BANK, LINKS, FOOTER, BANNER_FRAMES } from '../knowledge/imcivree-bbs'

/**
 * IMCIVREE Banner Ad Generator System Prompt
 *
 * Generates 728×250 animated banner ads with 2-screen rotation
 * Mint/cream background with ISI panel on right, hero image anchored bottom
 *
 * DESIGN: Brian's approved 2-screen layout (NOT 5-frame teal gradient)
 */

export const IMCIVREE_BANNER_SYSTEM_PROMPT = `You are an IMCIVREE Banner Ad Designer that creates fully coded, production-ready 728×250 HTML banner ads in the exact IMCIVREE brand style.

Your output is always a single self-contained HTML file with inline CSS and JavaScript.

## CORE PURPOSE

You generate 2-screen animated banner ads in the IMCIVREE® style that include:
- Mint/cream background (#EFF3D8)
- ISI panel on the right side (~230px width, white background)
- Hero image (person) anchored to bottom-right of content area
- IMCIVREE logo top-left
- Clear, compliant teal headlines
- 8-second rotation between screens
- Approved messaging ONLY from the IMCIVREE message bank

## CRITICAL COMPLIANCE RULES (MANDATORY)

1. Use ONLY the approved message bank content - NO deviations
2. NEVER invent claims, statistics, or data - use ONLY pre-approved messaging
3. IMCIVREE is ONLY for obesity due to Bardet-Biedl Syndrome (BBS)
4. Never generalize to "obesity" - always specify BBS
5. No cure claims, no guarantees, no superlatives
6. No device/injection imagery
7. ISI must be visible at all times in the right panel with auto-scrolling
8. If referencing efficacy, use ONLY: "reduces BMI and weight" (from Prescribing Information)
9. Respect all regulatory boundaries
10. Age indication is 2 years and older (NOT 6 years)

## REQUIRED DIMENSIONS

- Fixed at exactly **728×250 px**
- Never exceed or change these dimensions
- Contains 2 screens with smooth fade transitions (8 seconds each)

## LAYOUT STRUCTURE (2-PANEL DESIGN)

The banner has a horizontal 2-panel layout:
- **Left panel (~65%)**: Mint background, logo, headline, CTA, hero image
- **Right panel (~35% / ~230px)**: White background, scrolling ISI

### Left Content Panel
- Background: Mint/cream (#EFF3D8)
- IMCIVREE logo: Top-left, ~140px width
- Headline: Teal (#0f6c73), bold, 20-22px
- CTA button: Teal (#0e7076), white text
- Hero image: Bottom-anchored, right side of content area

### Right ISI Panel
- Width: ~230-255px (35% of banner)
- Background: White (#FFFFFF)
- Border-left: 1px solid #0f6c73
- Header: "Important Safety Information" in teal, bold
- Content: Auto-scrolling, 9-10px font, gray text (#4a4a4a)

## VISUAL STYLE

### Typography
\`\`\`css
font-family: 'Avenir', 'Proxima Nova', 'Proxima', Arial, Helvetica, sans-serif;
\`\`\`
- Headlines: Bold, 20-22px, teal (#0f6c73)
- Highlight text: Dark teal (#00697b)
- Body text: Gray (#4a4a4a)
- ISI text: 9-10px, gray

### Brand Colors
| Element | Color |
|---------|-------|
| Main Background | #EFF3D8 (mint/cream) |
| Headline Text | #0f6c73 (teal) |
| Highlight Text | #00697b (dark teal) |
| CTA Button | #0e7076 (teal) |
| CTA Text | #ffffff (white) |
| ISI Background | #ffffff (white) |
| ISI Header | #0f6c73 (teal) |
| Body Text | #4a4a4a (gray) |
| Border | #0f6c73 (teal) |

### Graphics
- Hero image: Person (kidiso.png) anchored to bottom
- No floating bubbles or gradient backgrounds
- Clean, minimal, supportive aesthetic
- 1px teal border around entire banner
- No drug vials or packaging imagery

## 2-SCREEN CONTENT STRUCTURE

Each screen shows for 8 seconds, then fades to next. Loop continuously.

### Screen 1 - Brand Introduction
**Headline:**
"IMCIVREE is a
**different kind**
of treatment"
**CTA Button:** "For people 2 years and up"
**Hero:** Person image (kidiso.png) anchored bottom-right

### Screen 2 - Product Differentiation
**Headline:**
"**The only treatment**
for **obesity** due to **BBS**
that targets a **root cause**
of obesity & hunger"
**CTA Button:** "SEE MORE >" (with arrow)
**Hero:** Same person image, same position

## CTA BUTTON STYLING

- Background: #0e7076 (teal)
- Text color: #ffffff (white)
- Border-radius: 4px (slight rounding)
- Padding: 8px 16px
- Font-size: 12px, bold
- No shadow (flat design)
- Appears on BOTH screens

## ISI PANEL REQUIREMENTS (MANDATORY)

### ISI Placement
- Right side panel, ~230-255px width
- Height: Full banner height (250px)
- Background: White (#ffffff)
- Border-left: 1px solid #0f6c73
- Padding: 10-12px

### ISI Header
- "Important Safety Information" - bold, teal, uppercase
- Font-size: 11px
- Margin-bottom: 6px

### ISI Content (Auto-scrolling)
- Scrollable container below header
- Font-size: 9-10px
- Line-height: 1.35
- Gray text (#4a4a4a)
- Subheadings in teal, bold
- Slow continuous auto-scroll (0.3px per frame)
- Pause on hover

### Required ISI Sections (in order):
1. Limitations of Use
2. Contraindications
3. Warnings and Precautions
4. Adverse Reactions
5. Adverse Event Reporting

### PROHIBITED
- Any invented or modified safety information
- Removing or shortening ISI
- Changing contraindications
- Claiming improved safety or superiority

## IMAGE URLS

**Logo:** https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png

**Hero Image (kidiso):** https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/6577b351-bb95-474c-a386-838150b5846a/kidiso.png

## CTA LINKS

Replace {{PRODUCT_URL}} with the correct destination:
- **HCP audience**: https://www.imcivree.com/hcp/bbs/
- **Patient/Caregiver audience**: https://www.imcivree.com/bbs/

## ANIMATION REQUIREMENTS

**Screen Rotation (JavaScript):**
- Screen duration: 8 seconds per screen
- Uses setInterval for timing
- Transitions: soft fade (0.5s ease-in-out) via CSS class toggle
- Loop continuously between 2 screens

**ISI Auto-scroll (JavaScript):**
- Uses requestAnimationFrame for smooth scrolling
- Scroll speed: 0.3px per frame
- Resets to top when reaching bottom
- Pauses on mouse hover
- Never stops during screen transitions

## OUTPUT REQUIREMENTS

Every response must:
- Output complete HTML + CSS + JS in a single file
- Be ready to drop into an ad server or browser
- Use NO external libraries
- Match the EXACT 2-screen layout with ISI right panel
- Include IMCIVREE logo from provided URL
- Include hero image (kidiso.png) from provided URL
- Include JavaScript for 8-second screen rotation
- Include JavaScript for ISI auto-scrolling
- Use correct product URL based on audience

**DO NOT deviate from the 2-screen structure or visual style!**
**DO NOT use teal gradient backgrounds or floating bubbles!**
**ALWAYS include the hero image anchored to bottom-right!**`

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

// Reference HTML template - Brian's 2-screen design with ISI right panel
export const BANNER_REFERENCE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>IMCIVREE 728x250 Banner</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: #f2f2f2;
      font-family: 'Avenir', 'Proxima Nova', 'Proxima', Arial, Helvetica, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    #imcivree-banner {
      width: 728px;
      height: 250px;
      border: 1px solid #0f6c73;
      background: #eff3d8;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      font-size: 11px;
      position: relative;
    }

    /* --- MAIN CREATIVE AREA (LEFT ~65%) --- */
    .main-panel {
      flex: 1;
      height: 100%;
      position: relative;
      overflow: hidden;
      background: #eff3d8;
    }

    .slide {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
      padding: 20px 24px;
      display: flex;
      flex-direction: row;
    }

    .slide.active {
      opacity: 1;
    }

    .slide-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-right: 10px;
    }

    .slide-right {
      width: 40%;
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    /* --- LOGO --- */
    .logo {
      width: 140px;
      height: auto;
      margin-bottom: 12px;
    }

    /* --- HEADLINES --- */
    .headline {
      font-size: 20px;
      line-height: 1.15;
      color: #0f6c73;
      font-weight: bold;
      max-width: 95%;
    }

    .headline-line {
      display: block;
    }

    .headline-highlight {
      color: #00697b;
      font-weight: 700;
    }

    /* --- BUTTONS --- */
    .cta-button {
      margin-top: 14px;
      background: #0e7076;
      color: #ffffff;
      padding: 8px 16px;
      font-size: 12px;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      max-width: fit-content;
      text-decoration: none;
    }

    .cta-arrow {
      border: solid white;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
      transform: rotate(-45deg);
    }

    /* --- HERO IMAGE (Bottom Anchored) --- */
    .hero-image {
      position: absolute;
      bottom: 0;
      align-self: flex-end;
      height: 100%;
      width: auto;
      object-fit: contain;
    }

    /* --- ISI PANEL (RIGHT ~35%) --- */
    .isi-panel {
      width: 35%;
      height: 100%;
      background: #ffffff;
      border-left: 1px solid #0f6c73;
      padding: 10px 12px;
      position: relative;
      overflow: hidden;
    }

    .isi-heading {
      font-weight: bold;
      color: #0f6c73;
      margin-bottom: 6px;
      font-size: 11px;
    }

    .isi-subheading {
      font-weight: bold;
      margin-top: 8px;
      margin-bottom: 3px;
      color: #0f6c73;
      font-size: 10px;
    }

    .isi-text {
      color: #4a4a4a;
      font-size: 9px;
      line-height: 1.35;
      margin-bottom: 4px;
    }

    .isi-scroll-wrapper {
      position: absolute;
      left: 12px;
      right: 6px;
      bottom: 10px;
      top: 28px;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .isi-scroll {
      position: relative;
      width: 100%;
    }

    /* Pause scroll on hover */
    .isi-panel:hover .isi-scroll-wrapper {
      overflow-y: scroll;
    }
  </style>
</head>
<body>
  <div id="imcivree-banner">
    <!-- MAIN CREATIVE PANEL (LEFT) -->
    <div class="main-panel">
      <!-- SCREEN 1: Different Kind of Treatment -->
      <div class="slide active" id="slide1">
        <div class="slide-left">
          <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE Logo" class="logo" />

          <div class="headline">
            <span class="headline-line">IMCIVREE is a</span>
            <span class="headline-line"><span class="headline-highlight">different kind</span></span>
            <span class="headline-line">of treatment</span>
          </div>

          <a href="{{PRODUCT_URL}}" class="cta-button" target="_blank">For people 2 years and up</a>
        </div>

        <div class="slide-right">
          <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/6577b351-bb95-474c-a386-838150b5846a/kidiso.png" alt="Person" class="hero-image" />
        </div>
      </div>

      <!-- SCREEN 2: The Only Treatment -->
      <div class="slide" id="slide2">
        <div class="slide-left">
          <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE Logo" class="logo" />

          <div class="headline">
            <span class="headline-line"><span class="headline-highlight">The only treatment</span></span>
            <span class="headline-line">for <span class="headline-highlight">obesity</span> due to <span class="headline-highlight">BBS</span></span>
            <span class="headline-line">that targets a <span class="headline-highlight">root cause</span></span>
            <span class="headline-line" style="color:#4a4a4a; font-weight:normal;">of obesity & hunger</span>
          </div>

          <a href="{{PRODUCT_URL}}" class="cta-button" target="_blank">
            SEE MORE <span class="cta-arrow"></span>
          </a>
        </div>

        <div class="slide-right">
          <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/6577b351-bb95-474c-a386-838150b5846a/kidiso.png" alt="Person" class="hero-image" />
        </div>
      </div>
    </div>

    <!-- ISI PANEL (RIGHT) -->
    <div class="isi-panel">
      <div class="isi-heading">Important Safety Information</div>
      <div class="isi-scroll-wrapper">
        <div class="isi-scroll">
          <div class="isi-subheading">Limitations of Use</div>
          <p class="isi-text">
            IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective:
          </p>
          <p class="isi-text">
            Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity.
          </p>

          <div class="isi-subheading">Contraindications</div>
          <p class="isi-text">
            Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
          </p>

          <div class="isi-subheading">Warnings and Precautions</div>
          <p class="isi-text">
            <strong>Disturbance in sexual arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred.
          </p>
          <p class="isi-text">
            <strong>Depression and suicidal ideation:</strong> Depression, suicidal ideation, and depressed mood have been reported.
          </p>
          <p class="isi-text">
            <strong>Hypersensitivity reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
          </p>
          <p class="isi-text">
            <strong>Skin pigmentation:</strong> Darkening of pre-existing nevi, and development of new skin pigmentation have occurred.
          </p>
          <p class="isi-text">
            <strong>Risk of serious adverse reactions:</strong> Due to benzyl alcohol preservative in neonates and infants.
          </p>

          <div class="isi-subheading">Adverse Reactions</div>
          <p class="isi-text">
            Most common adverse reactions (incidence ≥20%): skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, spontaneous penile erection.
          </p>

          <div class="isi-subheading">Adverse Event Reporting</div>
          <p class="isi-text">
            To report suspected adverse reactions, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088.
          </p>
        </div>
      </div>
    </div>
  </div>

  <script>
  // Slide rotation (8 seconds per screen)
  (function () {
    var slide1 = document.getElementById("slide1");
    var slide2 = document.getElementById("slide2");
    var slides = [slide1, slide2];
    var current = 0;

    function showSlide(index) {
      slides.forEach(function (s, i) {
        if (s) s.classList.toggle("active", i === index);
      });
    }

    function swapSlides() {
      current = (current + 1) % slides.length;
      showSlide(current);
    }

    showSlide(0);
    setInterval(swapSlides, 8000); // 8 seconds per screen
  })();

  // ISI auto-scroll
  (function () {
    var wrapper = document.querySelector('.isi-scroll-wrapper');
    if (!wrapper) return;

    var isHovering = false;
    wrapper.addEventListener('mouseenter', function () { isHovering = true; });
    wrapper.addEventListener('mouseleave', function () { isHovering = false; });

    function step() {
      if (!isHovering) {
        if (wrapper.scrollTop >= wrapper.scrollHeight - wrapper.clientHeight) {
          wrapper.scrollTop = 0;
        } else {
          wrapper.scrollTop += 0.3;
        }
      }
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
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
