import { ISI, IMAGES, BRAND_COLORS, MESSAGE_BANK, LINKS, FOOTER, BANNER_FRAMES } from '../knowledge/imcivree-bbs'

/**
 * IMCIVREE Banner Ad Generator System Prompt
 *
 * Generates 728×250 animated banner ads with scrolling ISI
 * Two-screen rotation with IMCIVREE brand styling
 */

export const IMCIVREE_BANNER_SYSTEM_PROMPT = `You are an IMCIVREE Banner Ad Designer that creates fully coded, production-ready 728×250 HTML banner ads in the exact IMCIVREE brand style.

Your output is always a single self-contained HTML file with inline CSS and JavaScript.

## CRITICAL COMPLIANCE RULES

1. Use ONLY the approved message bank content - NO deviations
2. IMCIVREE is ONLY for obesity due to Bardet-Biedl Syndrome (BBS)
3. Never generalize to "obesity" - always specify BBS
4. No cure claims, no guarantees, no superlatives
5. No device/injection imagery
6. ISI must be visible at all times with continuous upward scrolling

## REQUIRED DIMENSIONS

- Fixed at exactly **728×250 px**
- Never exceed or change these dimensions
- Contains two screens that auto-rotate every 8 seconds

## LAYOUT STRUCTURE

The banner has two main zones using flex-direction: row-reverse:

### A) Right Column - ISI Panel (Always Visible)
- Width: **230px**
- White background with left border
- Always visible on ALL screens
- Contains:
  - "Important Safety Information" header (teal, bold)
  - Scrollable wrapper with full ISI text
  - Auto-scrolling upward at 0.3px per frame using requestAnimationFrame
  - Pauses on hover
  - Allows manual scroll via native scrollbar
  - Restarts from top when reaching end

### B) Left Panel - Main Creative Area
- Flex: 1 (fills remaining width ~498px)
- Background: #eff3d8
- Holds the two rotating screens with fade transitions
- Position: relative, overflow: hidden

## BRAND TYPOGRAPHY

Use this exact font stack:
\`\`\`css
font-family: 'Avenir', 'Proxima Nova', 'Proxima', Arial, Helvetica, sans-serif;
\`\`\`

## BRAND COLORS (Use ONLY these)

| Element | Color |
|---------|-------|
| Background | #eff3d8 |
| Teal Text / Headlines | #0f6c73 |
| Dark Teal Highlight | #00697b |
| CTA Button Background | #0e7076 |
| Body Text Gray | #4a4a4a |
| ISI Background | #ffffff |
| Border | #0f6c73 |

## REQUIRED ASSETS

### Kid Image (Bottom-anchored)
\`\`\`
https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/6577b351-bb95-474c-a386-838150b5846a/kidiso.png
\`\`\`
- Must sit flush against the bottom of the banner
- Position: absolute, bottom: 0
- height: 100%; width: auto; object-fit: contain

### IMCIVREE Logo
\`\`\`
https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png
\`\`\`
- Position top-left within each screen
- Width: 150px

## SCREEN 1 CONTENT

**Headline (three lines):**
IMCIVREE is a
different kind
of treatment

**Age Strip:** Teal pill (#0e7076 background, white text) that reads "For people 2 years and up"

**Kid Placement:** Right side (40% width), bottom-anchored

## SCREEN 2 CONTENT

**Four-line Claim (styled with highlights):**
- "The only treatment" (highlight: #00697b, bold)
- "for obesity due to BBS" (regular with "obesity" and "BBS" highlighted)
- "that targets a root cause" (regular with "root cause" highlighted)
- "of obesity & hunger" (body text: #4a4a4a)

**CTA Row:** "Learn more" with arrow icon (teal text)

**CTA Button:** Pill shape, #0e7076 background, white text "SEE MORE" with arrow, positioned bottom-left

## ANIMATION REQUIREMENTS

**Two-screen rotation:**
- Screen1 → Screen2 → Screen1 (continuous)
- Fade transition (opacity 0.5s ease-in-out)
- Timer: 8 seconds per screen using setInterval

**ISI Auto-scroll:**
- Uses requestAnimationFrame for smooth scrolling
- scrollTop += 0.3 per frame
- Pauses on mouseenter, resumes on mouseleave
- Restarts from top when reaching bottom

## OUTPUT REQUIREMENTS

Every response must:
- Output complete HTML + CSS + JS in a single file
- Be ready to drop into an ad server or browser
- Use NO external libraries
- Match the exact structure shown in the reference template
- Use ONLY brand colors listed above
- Maintain bottom-anchored kid across ALL screens
- Include the ISI column exactly as structured`

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

// Reference HTML template - use this exact structure
export const BANNER_REFERENCE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>IMCIVREE 728x250 Banner</title>
  <style>
    /* --- GLOBAL / RESET --- */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background: #f2f2f2;
      font-family: 'Avenir', 'Proxima Nova', 'Proxima', Arial, Helvetica, sans-serif;
    }

    /* --- BANNER CONTAINER --- */
    #imcivree-banner {
      width: 728px;
      height: 250px;
      border: 1px solid #0f6c73;
      background: #eff3d8;
      overflow: hidden;
      display: flex;
      flex-direction: row-reverse; /* main creative on left, ISI on right */
      font-size: 11px;
      position: relative;
    }

    /* Optional small "Advertisement" label */
    #imcivree-banner::before {
      content: "Advertisement";
      position: absolute;
      top: 2px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 9px;
      color: #4a4a4a;
      opacity: 0.7;
    }

    /* --- LEFT ISI COLUMN --- */
    .isi-panel {
      width: 230px; /* fixed column for ISI */
      height: 100%;
      background: #ffffff;
      border-left: 1px solid #0f6c73;
      padding: 8px 10px;
      position: relative;
      overflow: hidden; /* hides scrolling overflow */
    }

    .isi-heading {
      font-weight: bold;
      color: #0f6c73;
      margin-bottom: 4px;
      font-size: 11px;
    }

    .isi-subheading {
      font-weight: bold;
      margin-top: 8px;
      margin-bottom: 2px;
      color: #0f6c73;
    }

    .isi-text {
      color: #4a4a4a;
      line-height: 1.3;
      margin-bottom: 4px;
    }

    .isi-scroll-wrapper {
      position: absolute;
      left: 10px;
      right: 6px; /* leave a little room for the scrollbar */
      bottom: 8px;
      top: 20px;
      overflow-y: auto; /* show scrollbar for manual drag */
      overflow-x: hidden;
    }

    .isi-scroll {
      position: relative;
      width: 100%;
    }

    /* Pause the scroll on hover */
    .isi-panel:hover .isi-scroll {
      animation-play-state: paused;
    }

    @keyframes scroll-isi {
      0% {
        transform: translateY(100%);
      }
      100% {
        transform: translateY(-100%);
      }
    }

    /* --- RIGHT MAIN CREATIVE AREA --- */
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
      padding: 26px 24px 0 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .slide.active {
      opacity: 1;
    }

    /* --- LOGO AREA --- */
    .logo-line {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .logo-wordmark {
      font-size: 22px;
      letter-spacing: 1px;
      font-weight: bold;
      color: #0f6c73;
    }

    .logo-sub {
      font-size: 11px;
      color: #4a4a4a;
    }

    /* --- HEADLINE STYLES --- */
    .headline {
      margin-top: 12px;
      font-size: 22px;
      line-height: 1.1;
      color: #0f6c73;
      font-weight: bold;
      max-width: 60%;
    }

    .headline-line {
      display: block;
    }

    .headline-highlight {
      color: #00697b;
      font-weight: 700;
    }

    /* --- SCREEN 1: KID LAYOUT --- */
    .slide-1 {
      display: flex;
      flex-direction: row;
      padding-right: 12px;
    }

    .slide-1-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .slide-1-right {
      width: 40%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .kid-placeholder {
      width: 100%;
      height: 180px;
      border-radius: 8px;
      background: linear-gradient(135deg, #cccccc, #f5f5f5);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #666666;
    }

    /* --- FOR PEOPLE 2 YEARS AND UP STRIP --- */
    .age-strip {
      margin-top: 10px;
      background: #0e7076;
      color: #ffffff;
      padding: 4px 8px;
      font-size: 11px;
      font-weight: bold;
      max-width: 70%;
      border-radius: 3px;
    }

    /* --- SCREEN 2: THE ONLY TREATMENT CLAIM --- */
    .slide-2 {
      display: flex;
      flex-direction: row;
      padding-right: 12px;
    }

    .slide-2-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
    }

    .slide-2-right {
      width: 40%;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .claim-block {
      margin-top: 12px;
      font-size: 18px;
      line-height: 1.1;
      max-width: 60%;
    }

    .claim-block span {
      display: block;
    }

    .claim-regular {
      color: #0f6c73;
    }

    .claim-highlight {
      color: #00697b;
      font-weight: 700;
    }

    .claim-body {
      color: #4a4a4a;
    }

    .cta-row {
      margin-top: 18px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: #0f6c73;
      font-weight: bold;
    }

    .cta-arrow {
      border: solid #0f6c73;
      border-width: 0 2px 2px 0;
      display: inline-block;
      padding: 3px;
      transform: rotate(-45deg);
      margin-top: 1px;
    }
  </style>
</head>
<body>
  <div id="imcivree-banner">
    <!-- LEFT ISI COLUMN -->
    <div class="isi-panel">
      <div class="isi-heading">Important Safety Information</div>
      <div class="isi-scroll-wrapper">
        <div class="isi-scroll">
          <div class="isi-subheading">Indication</div>
          <p class="isi-text">
            IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and
            pediatric patients aged 2 years and older with syndromic or monogenic obesity due to Bardet-Biedl syndrome (BBS).
          </p>

          <div class="isi-subheading">Limitations of Use</div>
          <p class="isi-text">
            IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be
            expected to be effective:
          </p>
          <p class="isi-text">
            - Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity
            associated with other genetic syndromes and general (polygenic) obesity.
          </p>

          <div class="isi-subheading">Contraindications</div>
          <p class="isi-text">
            Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity
            reactions (e.g., anaphylaxis) have been reported.
          </p>

          <div class="isi-subheading">Warnings and Precautions</div>
          <p class="isi-text">
            - Disturbance in sexual arousal: Spontaneous penile erections in males and sexual adverse reactions in females
            have occurred.
          </p>
          <p class="isi-text">
            - Depression and suicidal ideation: Depression, suicidal ideation, and depressed mood have occurred.
          </p>
          <p class="isi-text">
            - Hypersensitivity reactions: Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
          </p>
          <p class="isi-text">
            - Skin hyperpigmentation, darkening of pre-existing nevi, and development of new melanocytic nevi: Generalized
            or focal increases in skin pigmentation, darkening of pre-existing nevi, development of new melanocytic nevi, and
            increase in size of existing melanocytic nevi have occurred.
          </p>
          <p class="isi-text">
            - Risk of serious adverse reactions due to benzyl alcohol preservative in neonates and low birth weight infants:
            IMCIVREE is not approved for use in neonates or infants.
          </p>

          <div class="isi-subheading">Adverse Reactions</div>
          <p class="isi-text">
            Most common adverse reactions (incidence >=20%) included skin hyperpigmentation, injection site reactions,
            nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection.
          </p>

          <div class="isi-subheading">Use in Specific Populations</div>
          <p class="isi-text">
            Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized
            unless the benefits of therapy outweigh the potential risks to the fetus.
          </p>

          <div class="isi-subheading">Adverse Event Reporting</div>
          <p class="isi-text">
            To report suspected adverse reactions, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at
            1-800-FDA-1088 or visit www.fda.gov/medwatch.
          </p>
        </div>
      </div>
    </div>

    <!-- RIGHT MAIN PANEL WITH TWO SCREENS -->
    <div class="main-panel">
      <!-- SCREEN 1: DIFFERENT KIND OF TREATMENT -->
      <div class="slide slide-1 active" id="slide1">
        <div class="slide-1-left">
          <div class="logo-line" style="margin-top:-10px;">
            <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE Logo" style="width:150px; height:auto;" />
          </div>

          <div class="headline">
            <span class="headline-line">IMCIVREE is a</span>
            <span class="headline-line">different kind</span>
            <span class="headline-line">of treatment</span>
          </div>

          <div class="age-strip">For people 2 years and up</div>
        </div>

        <div class="slide-1-right" style="position:relative; align-items:flex-end;">
          <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/6577b351-bb95-474c-a386-838150b5846a/kidiso.png" alt="Kid" style="height:100%; width:auto; object-fit:contain; align-self:flex-end; position:absolute; bottom:0;" />
        </div>
      </div>

      <!-- SCREEN 2: THE ONLY TREATMENT CLAIM -->
      <div class="slide slide-2" id="slide2">
        <div class="slide-2-left">
          <div class="logo-line" style="margin-top:-10px;">
            <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE Logo" style="width:150px; height:auto;" />
          </div>

          <div class="claim-block" style="max-width:70%; margin-top:8px;">
            <span class="claim-highlight">The only treatment</span>
            <span class="claim-regular">for <span class="claim-highlight">obesity</span> due to <span class="claim-highlight">BBS</span></span>
            <span class="claim-regular">that targets a <span class="claim-highlight">root cause</span></span>
            <span class="claim-body">of obesity &amp; hunger</span>
          </div>

          <div class="cta-row">
            <span>Learn more</span>
            <i class="cta-arrow"></i>
          </div>
        </div>

        <div class="slide-2-right" style="position:relative; display:flex; align-items:flex-end; justify-content:center;">
          <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/6577b351-bb95-474c-a386-838150b5846a/kidiso.png" alt="Kid" style="height:100%; width:auto; object-fit:contain; position:absolute; bottom:0;" />
          <!-- CTA BUTTON -->
          <button style="position:absolute; bottom:12px; left:24px; padding:8px 18px; background:#0e7076; color:white; border:none; border-radius:20px; font-size:14px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:6px;">
            SEE MORE <span style="border: solid white; border-width:0 2px 2px 0; padding:3px; display:inline-block; transform: rotate(-45deg);"></span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <script>
  // Simple slide rotation between Screen 1 and Screen 2
  (function () {
    var slide1 = document.getElementById("slide1");
    var slide2 = document.getElementById("slide2");
    var slides = [slide1, slide2];
    var current = 0; // index in slides array

    function showSlide(index) {
      slides.forEach(function (s, i) {
        if (s) {
          s.classList.toggle("active", i === index);
        }
      });
    }

    function swapSlides() {
      current = (current + 1) % slides.length;
      showSlide(current);
    }

    // ensure first screen is visible
    showSlide(0);

    // Change screens every 8 seconds
    setInterval(swapSlides, 8000);
  })();

  // ISI auto-scroll with visible scrollbar (like movie credits) + manual drag
  (function () {
    var wrapper = document.querySelector('.isi-scroll-wrapper');
    if (!wrapper) return;

    var isHovering = false;
    wrapper.addEventListener('mouseenter', function () {
      isHovering = true; // pause auto-scroll on hover
    });
    wrapper.addEventListener('mouseleave', function () {
      isHovering = false; // resume auto-scroll when mouse leaves
    });

    function step() {
      if (!isHovering) {
        // Slowly move content upward
        if (wrapper.scrollTop >= wrapper.scrollHeight - wrapper.clientHeight) {
          // Restart from top when we reach the end
          wrapper.scrollTop = 0;
        } else {
          wrapper.scrollTop += 0.3; // smaller value = slower scroll
        }
      }
      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  })();
  </script>
</body>
</html>`

export function getImcivreeBannerPrompt(params: {
  audience: 'hcp' | 'patient'
  focus: string
  keyMessage?: string
}) {
  const audienceLabel = params.audience === 'hcp' ? 'HCP (Healthcare Professional)' : 'Patient/Caregiver'
  const toneNote = params.audience === 'hcp'
    ? 'Use clinical, data-forward language. Include terms like "hyperphagia" and clinical efficacy data.'
    : 'Use supportive, accessible language. Replace "hyperphagia" with "hunger", use "hard to control" instead of "insatiable".'

  return `${IMCIVREE_BANNER_SYSTEM_PROMPT}

## CURRENT REQUEST

**Audience:** ${audienceLabel}
**Focus:** ${params.focus}
${params.keyMessage ? `**Key Message Emphasis:** ${params.keyMessage}` : ''}

**Tone:** ${toneNote}

Generate a complete 728×250 IMCIVREE banner ad following the EXACT structure and styling shown in this reference template. Modify only the headline copy and claims based on the focus area while keeping all other elements identical:

${BANNER_REFERENCE_HTML}`
}
