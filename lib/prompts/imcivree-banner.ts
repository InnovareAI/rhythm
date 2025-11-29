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
2. NEVER invent claims, statistics, or data - use ONLY pre-approved messaging
3. IMCIVREE is ONLY for obesity due to Bardet-Biedl Syndrome (BBS)
4. Never generalize to "obesity" - always specify BBS
5. No cure claims, no guarantees, no superlatives
6. No device/injection imagery
7. ISI must be visible at all times with continuous upward scrolling
8. If referencing efficacy, use ONLY: "reduces BMI and weight" (from Prescribing Information)

## REQUIRED DIMENSIONS

- Fixed at exactly **728×250 px**
- Never exceed or change these dimensions
- Contains two screens with CSS-only animation (fade in/out)

## LAYOUT STRUCTURE

The banner has two main zones using flexbox:

### A) Left Panel - Main Creative Area (65% width)
- Width: **65%**
- Background: #eff3d8 (pale yellow/cream)
- Contains logo, headline text, CTA button, and hero image
- Position: relative, overflow: hidden
- Hero image positioned absolute, bottom: 0, right: 10px

### B) Right Column - ISI Panel (35% width)
- Width: **35%**
- White background (#ffffff) with left border (#0f6c73)
- Always visible on ALL screens
- Contains:
  - "Important Safety Information" header (11px, teal, bold, uppercase)
  - Scrollable wrapper with full ISI text
  - Auto-scrolling upward at **0.2px per frame** using CSS transform translateY()
  - Pauses on hover
  - Restarts from top when reaching end

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

### Hero Image (Bottom-anchored)
\`\`\`
https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/6577b351-bb95-474c-a386-838150b5846a/kidiso.png
\`\`\`
- Position: absolute, bottom: 0, right: 10px
- height: 90%; object-fit: contain
- z-index: 1 (behind text)

### IMCIVREE Logo
\`\`\`
https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png
\`\`\`
- Position top-left
- Width: 120px

## SCREEN 1 CONTENT

**Headline:** "IMCIVREE is a different kind of treatment"
- Color: #0f6c73
- Font-size: 22px

**CTA Button:** Compact teal pill
- Text: "For people 6 years and up"
- Padding: 6px 12px
- Font-size: 10px
- Background: #0e7076
- Border-radius: 3px

## SCREEN 2 CONTENT

**Headline:** "The only treatment for obesity due to BBS that targets a root cause of obesity & hunger"
- Font-size: 16px (smaller for longer text)
- Color: #0f6c73

**CTA Button:** Compact teal pill
- Text: "SEE MORE >"
- Same styling as Screen 1

## ANIMATION REQUIREMENTS

**Two-screen rotation (CSS-only):**
- Screen 1 starts visible (opacity: 1)
- After 4 seconds, Screen 1 fades out (0.5s animation)
- After 4.5 seconds, Screen 2 fades in (0.5s animation)
- Uses @keyframes fadeIn/fadeOut with animation-delay
- NO JavaScript setInterval needed for screen rotation

**ISI Auto-scroll (JavaScript):**
- Uses requestAnimationFrame for smooth scrolling
- Uses CSS transform translateY() - NOT scrollTop
- scrollSpeed = 0.2 pixels per frame
- Pauses on mouseenter, resumes on mouseleave
- Restarts from top when reaching bottom

## CTA LINKS (Required)

Replace {{PRODUCT_URL}} with the correct destination:
- **HCP audience**: https://www.imcivree.com/hcp/bbs/
- **Patient/Caregiver audience**: https://www.imcivree.com/bbs/

All CTA buttons must include target="_blank" to open in new tab.

## OUTPUT REQUIREMENTS

Every response must:
- Output complete HTML + CSS + JS in a single file
- Be ready to drop into an ad server or browser
- Use NO external libraries
- Match the EXACT structure shown in the reference template
- Use CSS-only animation for slide transitions
- Use CSS transform for ISI scrolling (0.2px/frame)
- Compact CTA buttons (6px 12px padding, 10px font)
- Use ONLY brand colors listed above
- Include correct product URL based on audience`

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

// Reference HTML template - use this EXACT structure (matches video replica)
export const BANNER_REFERENCE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>IMCIVREE 728x250 Banner</title>
<style>
    /* --- RESET & BASIC SETUP --- */
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
        height: 100vh;
    }

    /* --- BANNER CONTAINER --- */
    .banner-container {
        width: 728px;
        height: 250px;
        background-color: #eff3d8; /* Pale yellow/cream - IMCIVREE brand */
        border: 1px solid #0f6c73;
        position: relative;
        overflow: hidden;
        display: flex; /* Flexbox used for layout */
    }

    /* --- LEFT CONTENT AREA (65%) --- */
    .content-area {
        width: 65%;
        height: 100%;
        position: relative;
        padding: 20px;
        display: flex;
        flex-direction: column;
    }

    /* --- LOGO --- */
    .logo {
        width: 120px; /* Adjust based on actual logo size */
        height: auto;
        margin-bottom: 10px;
        z-index: 10;
    }

    /* --- HERO IMAGE --- */
    .hero-image {
        position: absolute;
        bottom: 0;
        right: 10px;
        align-self: flex-end;
        height: 90%;
        object-fit: contain;
        z-index: 1;
    }

    /* --- TEXT SLIDES ANIMATION --- */
    .slide-container {
        position: relative;
        z-index: 5;
        width: 60%;
        margin-top: 20px;
    }

    .slide {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transition: opacity 1s ease-in-out;
    }

    /* Text Styles - IMCIVREE Brand Colors */
    h1 {
        color: #0f6c73; /* IMCIVREE Teal */
        font-size: 22px;
        line-height: 1.2;
        margin-bottom: 15px;
    }

    .headline-highlight {
        color: #00697b; /* Dark Teal Highlight */
        font-weight: 700;
    }

    .small-h1 {
        font-size: 16px;
        font-weight: bold;
    }

    /* Button Styles - IMCIVREE Brand (compact pill) */
    .cta-button {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background-color: #0e7076; /* IMCIVREE CTA Button */
        color: white;
        text-decoration: none;
        padding: 6px 12px;
        border-radius: 3px;
        font-size: 10px;
        font-weight: bold;
        text-transform: uppercase;
        cursor: pointer;
    }

    .cta-button .arrow {
        font-size: 10px;
    }

    /* --- ANIMATION LOGIC (CSS ONLY) --- */
    /* Slide 1 visible initially, then fades out */
    #slide1 {
        animation: fadeOut 0.5s forwards;
        animation-delay: 4s;
        opacity: 1;
    }

    /* Slide 2 invisible initially, then fades in */
    #slide2 {
        opacity: 0;
        animation: fadeIn 0.5s forwards;
        animation-delay: 4.5s;
    }

    @keyframes fadeOut {
        to { opacity: 0; pointer-events: none; }
    }

    @keyframes fadeIn {
        to { opacity: 1; pointer-events: auto; }
    }

    /* --- RIGHT ISI SCROLL AREA (35%) --- */
    .isi-panel {
        width: 35%;
        height: 100%;
        background-color: #ffffff;
        border-left: 1px solid #0f6c73;
        padding: 10px;
        position: relative;
        overflow: hidden;
        font-size: 10px;
        color: #4a4a4a; /* IMCIVREE Body Text Gray */
        line-height: 1.4;
    }

    .isi-header {
        font-size: 11px;
        color: #0f6c73; /* IMCIVREE Teal */
        margin-bottom: 5px;
        text-transform: uppercase;
        font-weight: bold;
    }

    .isi-scroll-wrapper {
        position: absolute;
        top: 30px;
        left: 10px;
        right: 6px;
        bottom: 10px;
        overflow: hidden;
    }

    .isi-content {
        position: relative;
    }

    .isi-content h3 {
        font-size: 10px;
        font-weight: bold;
        margin-top: 8px;
        margin-bottom: 2px;
        color: #0f6c73; /* IMCIVREE Teal */
    }

    .isi-content ul {
        padding-left: 15px;
        margin-bottom: 5px;
    }

    .isi-content p {
        margin-bottom: 5px;
    }

</style>
</head>
<body>

    <div class="banner-container">
        <div class="content-area">
            <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE Logo" class="logo">

            <img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/6577b351-bb95-474c-a386-838150b5846a/kidiso.png" alt="Person" class="hero-image">

            <div class="slide-container">

                <div class="slide" id="slide1">
                    <h1>IMCIVREE is a different kind of treatment</h1>
                    <a href="{{PRODUCT_URL}}" class="cta-button" target="_blank">For people 6 years and up</a>
                </div>

                <div class="slide" id="slide2">
                    <h1 class="small-h1">The only treatment for obesity due to BBS that targets a root cause of obesity & hunger</h1>
                    <a href="{{PRODUCT_URL}}" class="cta-button" target="_blank">SEE MORE &gt;</a>
                </div>

            </div>
        </div>

        <div class="isi-panel">
            <div class="isi-header">Important Safety Information</div>
            <div class="isi-scroll-wrapper">
                <div class="isi-content">
                    <h3>Indication</h3>
                    <p>IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 6 years and older with obesity due to Bardet-Biedl syndrome (BBS).</p>

                    <h3>Limitations of Use</h3>
                    <p>IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective:</p>
                    <ul>
                        <li>Other types of obesity not related to BBS or other FDA-approved indications.</li>
                        <li>Obesity associated with other genetic syndromes and general (polygenic) obesity.</li>
                    </ul>

                    <h3>Contraindications</h3>
                    <p>Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.</p>

                    <h3>Warnings and Precautions</h3>
                    <ul>
                        <li><strong>Disturbance in sexual arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred.</li>
                        <li><strong>Depression and suicidal ideation:</strong> Depression, suicidal ideation, and depressed mood have been reported.</li>
                        <li><strong>Hypersensitivity reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.</li>
                        <li><strong>Skin pigmentation:</strong> Darkening of pre-existing nevi, and development of new skin pigmentation.</li>
                        <li><strong>Risk of serious adverse reactions due to benzyl alcohol preservative:</strong> Risk of serious adverse reactions in neonates and infants.</li>
                    </ul>

                    <h3>Adverse Reactions</h3>
                    <p>Most common adverse reactions (incidence ≥20%): skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, spontaneous penile erection.</p>

                    <h3>Use in Specific Populations</h3>
                    <p>Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.</p>

                    <h3>Adverse Event Reporting</h3>
                    <p>To report suspected adverse reactions, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088.</p>

                    <p style="margin-top: 20px;"><em>Please see full Prescribing Information.</em></p>
                </div>
            </div>
        </div>
    </div>

    <script>
    // ISI auto-scroll using CSS transform (smoother animation)
    (function () {
        var wrapper = document.querySelector('.isi-scroll-wrapper');
        var content = document.querySelector('.isi-content');
        if (!wrapper || !content) return;

        var isHovering = false;
        var scrollPos = 0;
        var scrollSpeed = 0.2; // pixels per frame (slower)

        wrapper.addEventListener('mouseenter', function () { isHovering = true; });
        wrapper.addEventListener('mouseleave', function () { isHovering = false; });

        function animate() {
            if (!isHovering) {
                var maxScroll = content.offsetHeight - wrapper.offsetHeight;

                if (maxScroll > 0) {
                    scrollPos += scrollSpeed;

                    if (scrollPos >= maxScroll) {
                        scrollPos = 0; // Reset to top
                    }

                    content.style.transform = 'translateY(-' + scrollPos + 'px)';
                }
            }
            requestAnimationFrame(animate);
        }

        // Start animation
        requestAnimationFrame(animate);
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

Generate a complete 728×250 IMCIVREE banner ad following the EXACT structure and styling shown in this reference template. Modify only the headline copy and claims based on the focus area while keeping all other elements identical. Use the product URL provided above for all CTA links:

${templateWithUrl}`
}
