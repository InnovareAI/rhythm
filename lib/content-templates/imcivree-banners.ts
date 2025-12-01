/**
 * Pre-approved IMCIVREE Banner Templates (728x250 animated HTML)
 *
 * These templates provide instant, pixel-perfect banners:
 * - HCP: 5-frame teal gradient design with bottom ISI bar
 * - Patient: 2-screen mint background design with ISI footer
 *
 * Template Key Format: {audience}-{focus}
 */

export interface BannerTemplate {
  html: string
  references: number[]
  approved: boolean
  mlrId?: string
  lastUpdated: string
  audience: 'hcp' | 'patient'
  focus: string
  description: string
}

// Helper to generate template key
export function getBannerTemplateKey(audience: string, focus: string): string {
  return `${audience}-${focus}`
}

// Check if a banner template exists
export function hasBannerTemplate(audience: string, focus: string): boolean {
  const key = getBannerTemplateKey(audience, focus)
  return key in BANNER_TEMPLATES
}

// Get banner template by parameters
export function getBannerTemplate(audience: string, focus: string): BannerTemplate | null {
  const key = getBannerTemplateKey(audience, focus)
  return BANNER_TEMPLATES[key] || null
}

// Get all available banner templates for an audience
export function getAvailableBannerTemplates(audience: 'hcp' | 'patient'): BannerTemplate[] {
  return Object.values(BANNER_TEMPLATES).filter(t => t.audience === audience)
}

// Image URLs
const IMAGES = {
  logo: 'https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png?t=1764372572',
  patientHero: 'https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/6577b351-bb95-474c-a386-838150b5846a/kidiso.png?t=1764372724',
}

// Product URLs
const PRODUCT_URLS = {
  hcp: 'https://www.imcivree.com/hcp/bbs/',
  patient: 'https://www.imcivree.com/bbs/',
}

/**
 * Pre-approved Banner Templates
 */
export const BANNER_TEMPLATES: Record<string, BannerTemplate> = {
  // ==========================================
  // HCP BANNERS (5-frame teal gradient design)
  // ==========================================
  'hcp-moa': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>IMCIVREE HCP Banner – MOA</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #f3f5f7; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .banner { position: relative; width: 728px; height: 250px; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); background: linear-gradient(135deg, #0F7C8F, #0C5F73); color: #ffffff; }
    .banner-inner { position: absolute; inset: 0; display: flex; flex-direction: column; }
    .frames { position: relative; flex: 1 1 auto; padding: 20px 24px 8px; overflow: hidden; }
    .frame { position: absolute; inset: 0; padding: 24px 28px 16px; opacity: 0; transition: opacity 0.7s ease; display: flex; flex-direction: column; justify-content: center; z-index: 1; }
    .frame.active { opacity: 1; z-index: 2; }
    .headline { font-weight: 800; font-size: 20px; line-height: 1.2; letter-spacing: 0.02em; margin-bottom: 10px; }
    .subcopy { font-size: 12px; line-height: 1.4; max-width: 95%; opacity: 0.9; }
    .cta-row { margin-top: 18px; display: flex; justify-content: flex-end; }
    .cta-button { background: #8CD038; color: #00313C; border-radius: 999px; padding: 8px 20px; font-size: 13px; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25); text-decoration: none; }
    .cta-button:hover { filter: brightness(1.05); }
    .bubble-layer { position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }
    .bubble { position: absolute; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(255,255,255,0.05)); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25); animation: floatUp 18s linear infinite; opacity: 0.55; }
    .bubble:nth-child(1) { width: 90px; height: 90px; left: 4%; bottom: -20%; animation-duration: 26s; }
    .bubble:nth-child(2) { width: 60px; height: 60px; left: 45%; bottom: -30%; animation-duration: 22s; animation-delay: -8s; }
    .bubble:nth-child(3) { width: 120px; height: 120px; right: 2%; bottom: -40%; animation-duration: 30s; animation-delay: -5s; }
    .bubble:nth-child(4) { width: 40px; height: 40px; right: 30%; bottom: -25%; animation-duration: 18s; animation-delay: -10s; }
    @keyframes floatUp { 0% { transform: translateY(0); } 100% { transform: translateY(-180%); } }
    .isi-bar { position: relative; flex: 0 0 52px; background: #000000; color: #ffffff; font-size: 11px; line-height: 1.3; overflow: hidden; padding: 4px 10px; }
    .isi-bar-title { font-weight: 700; margin-bottom: 2px; }
    .isi-window { position: relative; overflow: hidden; height: 34px; }
    .isi-scroll { position: absolute; width: 100%; animation: isiScroll 20s linear infinite; white-space: normal; }
    @keyframes isiScroll { 0% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
    .isi-text { padding-right: 18px; }
    .isi-heading { font-weight: 700; text-transform: uppercase; margin-top: 6px; margin-bottom: 2px; font-size: 11px; }
    .isi-body { font-size: 11px; }
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
          <p class="subcopy">Bardet-Biedl syndrome (BBS) is a rare genetic disease that can cause early-onset obesity and constant, hard-to-control hunger.</p>
        </section>

        <section class="frame frame-2" aria-label="MC4R pathway in BBS">
          <h2 class="headline">Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling.</h2>
          <p class="subcopy">Changes in BBS genes can prevent the brain from receiving "not hungry" messages.</p>
        </section>

        <section class="frame frame-3" aria-label="IMCIVREE indication">
          <h2 class="headline">IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people living with BBS.</h2>
          <p class="subcopy">IMCIVREE is a prescription medicine for adults and children 2 years and older with obesity due to BBS to help them lose weight and keep it off.</p>
        </section>

        <section class="frame frame-4" aria-label="How IMCIVREE works">
          <h2 class="headline">IMCIVREE activates the MC4R pathway to help reduce hunger and body weight.</h2>
          <p class="subcopy">By targeting a root cause of obesity in BBS, IMCIVREE offers a fundamentally different approach than diet and exercise alone.</p>
        </section>

        <section class="frame frame-5" aria-label="CTA">
          <h2 class="headline">Learn how IMCIVREE targets the MC4R pathway.</h2>
          <p class="subcopy">Discover the mechanism behind the first and only FDA-approved treatment for obesity due to BBS.</p>
          <div class="cta-row">
            <a href="${PRODUCT_URLS.hcp}" class="cta-button" target="_blank">LEARN MORE</a>
          </div>
        </section>
      </div>

      <section class="isi-bar" aria-label="Important Safety Information">
        <div class="isi-bar-title">Important Safety Information</div>
        <div class="isi-window">
          <div class="isi-scroll">
            <div class="isi-text">
              <div class="isi-heading">Contraindications</div>
              <p class="isi-body">Prior serious hypersensitivity to setmelanotide or any excipients in IMCIVREE (setmelanotide). Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.</p>
              <div class="isi-heading" style="margin-top: 8px;">References</div>
              <p class="isi-body">1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc. 3. Forsythe E et al. Front Pediatr. 2018.</p>
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
</html>`,
    references: [1, 3],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    focus: 'moa',
    description: 'Mechanism of Action - Focus on MC4R pathway and how IMCIVREE works'
  },

  'hcp-efficacy-weight': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>IMCIVREE HCP Banner – Weight Reduction</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #f3f5f7; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .banner { position: relative; width: 728px; height: 250px; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); background: linear-gradient(135deg, #0F7C8F, #0C5F73); color: #ffffff; }
    .banner-inner { position: absolute; inset: 0; display: flex; flex-direction: column; }
    .frames { position: relative; flex: 1 1 auto; padding: 20px 24px 8px; overflow: hidden; }
    .frame { position: absolute; inset: 0; padding: 24px 28px 16px; opacity: 0; transition: opacity 0.7s ease; display: flex; flex-direction: column; justify-content: center; z-index: 1; }
    .frame.active { opacity: 1; z-index: 2; }
    .headline { font-weight: 800; font-size: 20px; line-height: 1.2; letter-spacing: 0.02em; margin-bottom: 10px; }
    .subcopy { font-size: 12px; line-height: 1.4; max-width: 95%; opacity: 0.9; }
    .cta-row { margin-top: 18px; display: flex; justify-content: flex-end; }
    .cta-button { background: #8CD038; color: #00313C; border-radius: 999px; padding: 8px 20px; font-size: 13px; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25); text-decoration: none; }
    .cta-button:hover { filter: brightness(1.05); }
    .bubble-layer { position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }
    .bubble { position: absolute; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(255,255,255,0.05)); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25); animation: floatUp 18s linear infinite; opacity: 0.55; }
    .bubble:nth-child(1) { width: 90px; height: 90px; left: 4%; bottom: -20%; animation-duration: 26s; }
    .bubble:nth-child(2) { width: 60px; height: 60px; left: 45%; bottom: -30%; animation-duration: 22s; animation-delay: -8s; }
    .bubble:nth-child(3) { width: 120px; height: 120px; right: 2%; bottom: -40%; animation-duration: 30s; animation-delay: -5s; }
    .bubble:nth-child(4) { width: 40px; height: 40px; right: 30%; bottom: -25%; animation-duration: 18s; animation-delay: -10s; }
    @keyframes floatUp { 0% { transform: translateY(0); } 100% { transform: translateY(-180%); } }
    .isi-bar { position: relative; flex: 0 0 52px; background: #000000; color: #ffffff; font-size: 11px; line-height: 1.3; overflow: hidden; padding: 4px 10px; }
    .isi-bar-title { font-weight: 700; margin-bottom: 2px; }
    .isi-window { position: relative; overflow: hidden; height: 34px; }
    .isi-scroll { position: absolute; width: 100%; animation: isiScroll 20s linear infinite; white-space: normal; }
    @keyframes isiScroll { 0% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
    .isi-text { padding-right: 18px; }
    .isi-heading { font-weight: 700; text-transform: uppercase; margin-top: 6px; margin-bottom: 2px; font-size: 11px; }
    .isi-body { font-size: 11px; }
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
          <p class="subcopy">Bardet-Biedl syndrome (BBS) is a rare genetic disease that can cause early-onset obesity and constant, hard-to-control hunger.</p>
        </section>

        <section class="frame frame-2" aria-label="MC4R pathway in BBS">
          <h2 class="headline">Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling.</h2>
          <p class="subcopy">Changes in BBS genes can prevent the brain from receiving "not hungry" messages.</p>
        </section>

        <section class="frame frame-3" aria-label="IMCIVREE indication">
          <h2 class="headline">IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people living with BBS.</h2>
          <p class="subcopy">IMCIVREE is a prescription medicine for adults and children 2 years and older with obesity due to BBS to help them lose weight and keep it off.</p>
        </section>

        <section class="frame frame-4" aria-label="IMCIVREE weight reduction data">
          <h2 class="headline">Adults experienced steady and meaningful weight loss over 1 year, and additional weight loss over 2 years.</h2>
          <p class="subcopy">IMCIVREE reduced BMI and weight across young children, older children, and adults with BBS.</p>
        </section>

        <section class="frame frame-5" aria-label="IMCIVREE treatment expectations">
          <h2 class="headline">Meaningful weight reduction typically begins within 6-8 weeks.</h2>
          <p class="subcopy">Staying on IMCIVREE is important to maintain long-term reductions in hunger and weight. Rhythm InTune provides personalized support for caregivers and people living with BBS.</p>
          <div class="cta-row">
            <a href="${PRODUCT_URLS.hcp}" class="cta-button" target="_blank">LEARN MORE</a>
          </div>
        </section>
      </div>

      <section class="isi-bar" aria-label="Important Safety Information">
        <div class="isi-bar-title">Important Safety Information</div>
        <div class="isi-window">
          <div class="isi-scroll">
            <div class="isi-text">
              <div class="isi-heading">Contraindications</div>
              <p class="isi-body">Prior serious hypersensitivity to setmelanotide or any excipients in IMCIVREE (setmelanotide). Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.</p>
              <div class="isi-heading" style="margin-top: 8px;">References</div>
              <p class="isi-body">1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc. 3. Forsythe E et al. Front Pediatr. 2018.</p>
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
</html>`,
    references: [1, 3],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    focus: 'efficacy-weight',
    description: 'Weight Reduction - Highlight BMI and weight reduction data'
  },

  'hcp-efficacy-hunger': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>IMCIVREE HCP Banner – Hunger Reduction</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #f3f5f7; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .banner { position: relative; width: 728px; height: 250px; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); background: linear-gradient(135deg, #0F7C8F, #0C5F73); color: #ffffff; }
    .banner-inner { position: absolute; inset: 0; display: flex; flex-direction: column; }
    .frames { position: relative; flex: 1 1 auto; padding: 20px 24px 8px; overflow: hidden; }
    .frame { position: absolute; inset: 0; padding: 24px 28px 16px; opacity: 0; transition: opacity 0.7s ease; display: flex; flex-direction: column; justify-content: center; z-index: 1; }
    .frame.active { opacity: 1; z-index: 2; }
    .headline { font-weight: 800; font-size: 20px; line-height: 1.2; letter-spacing: 0.02em; margin-bottom: 10px; }
    .subcopy { font-size: 12px; line-height: 1.4; max-width: 95%; opacity: 0.9; }
    .cta-row { margin-top: 18px; display: flex; justify-content: flex-end; }
    .cta-button { background: #8CD038; color: #00313C; border-radius: 999px; padding: 8px 20px; font-size: 13px; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25); text-decoration: none; }
    .cta-button:hover { filter: brightness(1.05); }
    .bubble-layer { position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }
    .bubble { position: absolute; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(255,255,255,0.05)); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25); animation: floatUp 18s linear infinite; opacity: 0.55; }
    .bubble:nth-child(1) { width: 90px; height: 90px; left: 4%; bottom: -20%; animation-duration: 26s; }
    .bubble:nth-child(2) { width: 60px; height: 60px; left: 45%; bottom: -30%; animation-duration: 22s; animation-delay: -8s; }
    .bubble:nth-child(3) { width: 120px; height: 120px; right: 2%; bottom: -40%; animation-duration: 30s; animation-delay: -5s; }
    .bubble:nth-child(4) { width: 40px; height: 40px; right: 30%; bottom: -25%; animation-duration: 18s; animation-delay: -10s; }
    @keyframes floatUp { 0% { transform: translateY(0); } 100% { transform: translateY(-180%); } }
    .isi-bar { position: relative; flex: 0 0 52px; background: #000000; color: #ffffff; font-size: 11px; line-height: 1.3; overflow: hidden; padding: 4px 10px; }
    .isi-bar-title { font-weight: 700; margin-bottom: 2px; }
    .isi-window { position: relative; overflow: hidden; height: 34px; }
    .isi-scroll { position: absolute; width: 100%; animation: isiScroll 20s linear infinite; white-space: normal; }
    @keyframes isiScroll { 0% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
    .isi-text { padding-right: 18px; }
    .isi-heading { font-weight: 700; text-transform: uppercase; margin-top: 6px; margin-bottom: 2px; font-size: 11px; }
    .isi-body { font-size: 11px; }
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
          <h2 class="headline">Hyperphagia in BBS is chronic, insatiable, and not a matter of willpower.</h2>
          <p class="subcopy">Bardet-Biedl syndrome (BBS) can cause constant, hard-to-control hunger that traditional approaches cannot adequately address.</p>
        </section>

        <section class="frame frame-2" aria-label="MC4R pathway in BBS">
          <h2 class="headline">Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling.</h2>
          <p class="subcopy">Changes in BBS genes can prevent the brain from receiving "not hungry" messages.</p>
        </section>

        <section class="frame frame-3" aria-label="IMCIVREE indication">
          <h2 class="headline">IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people living with BBS.</h2>
          <p class="subcopy">IMCIVREE is a prescription medicine for adults and children 2 years and older with obesity due to BBS to help them lose weight and keep it off.</p>
        </section>

        <section class="frame frame-4" aria-label="IMCIVREE hunger reduction">
          <h2 class="headline">IMCIVREE reduced hunger early and continuously.</h2>
          <p class="subcopy">Hunger returns quickly when treatment is stopped—staying on IMCIVREE helps maintain results.</p>
        </section>

        <section class="frame frame-5" aria-label="IMCIVREE treatment expectations">
          <h2 class="headline">Patients may experience hunger reduction within the first few weeks.</h2>
          <p class="subcopy">Staying on IMCIVREE is important to maintain long-term reductions in hunger and weight. Rhythm InTune provides personalized support.</p>
          <div class="cta-row">
            <a href="${PRODUCT_URLS.hcp}" class="cta-button" target="_blank">LEARN MORE</a>
          </div>
        </section>
      </div>

      <section class="isi-bar" aria-label="Important Safety Information">
        <div class="isi-bar-title">Important Safety Information</div>
        <div class="isi-window">
          <div class="isi-scroll">
            <div class="isi-text">
              <div class="isi-heading">Contraindications</div>
              <p class="isi-body">Prior serious hypersensitivity to setmelanotide or any excipients in IMCIVREE (setmelanotide). Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.</p>
              <div class="isi-heading" style="margin-top: 8px;">References</div>
              <p class="isi-body">1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc. 3. Forsythe E et al. Front Pediatr. 2018.</p>
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
</html>`,
    references: [1, 3],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    focus: 'efficacy-hunger',
    description: 'Hunger Reduction - Focus on hunger control and hyperphagia'
  },

  'hcp-treatment': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>IMCIVREE HCP Banner – Treatment Journey</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #f3f5f7; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .banner { position: relative; width: 728px; height: 250px; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); background: linear-gradient(135deg, #0F7C8F, #0C5F73); color: #ffffff; }
    .banner-inner { position: absolute; inset: 0; display: flex; flex-direction: column; }
    .frames { position: relative; flex: 1 1 auto; padding: 20px 24px 8px; overflow: hidden; }
    .frame { position: absolute; inset: 0; padding: 24px 28px 16px; opacity: 0; transition: opacity 0.7s ease; display: flex; flex-direction: column; justify-content: center; z-index: 1; }
    .frame.active { opacity: 1; z-index: 2; }
    .headline { font-weight: 800; font-size: 20px; line-height: 1.2; letter-spacing: 0.02em; margin-bottom: 10px; }
    .subcopy { font-size: 12px; line-height: 1.4; max-width: 95%; opacity: 0.9; }
    .cta-row { margin-top: 18px; display: flex; justify-content: flex-end; }
    .cta-button { background: #8CD038; color: #00313C; border-radius: 999px; padding: 8px 20px; font-size: 13px; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25); text-decoration: none; }
    .cta-button:hover { filter: brightness(1.05); }
    .bubble-layer { position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }
    .bubble { position: absolute; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.45), rgba(255,255,255,0.05)); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25); animation: floatUp 18s linear infinite; opacity: 0.55; }
    .bubble:nth-child(1) { width: 90px; height: 90px; left: 4%; bottom: -20%; animation-duration: 26s; }
    .bubble:nth-child(2) { width: 60px; height: 60px; left: 45%; bottom: -30%; animation-duration: 22s; animation-delay: -8s; }
    .bubble:nth-child(3) { width: 120px; height: 120px; right: 2%; bottom: -40%; animation-duration: 30s; animation-delay: -5s; }
    .bubble:nth-child(4) { width: 40px; height: 40px; right: 30%; bottom: -25%; animation-duration: 18s; animation-delay: -10s; }
    @keyframes floatUp { 0% { transform: translateY(0); } 100% { transform: translateY(-180%); } }
    .isi-bar { position: relative; flex: 0 0 52px; background: #000000; color: #ffffff; font-size: 11px; line-height: 1.3; overflow: hidden; padding: 4px 10px; }
    .isi-bar-title { font-weight: 700; margin-bottom: 2px; }
    .isi-window { position: relative; overflow: hidden; height: 34px; }
    .isi-scroll { position: absolute; width: 100%; animation: isiScroll 20s linear infinite; white-space: normal; }
    @keyframes isiScroll { 0% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
    .isi-text { padding-right: 18px; }
    .isi-heading { font-weight: 700; text-transform: uppercase; margin-top: 6px; margin-bottom: 2px; font-size: 11px; }
    .isi-body { font-size: 11px; }
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
          <p class="subcopy">Bardet-Biedl syndrome (BBS) is a rare genetic disease that can cause early-onset obesity and constant, hard-to-control hunger.</p>
        </section>

        <section class="frame frame-2" aria-label="MC4R pathway in BBS">
          <h2 class="headline">Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling.</h2>
          <p class="subcopy">Changes in BBS genes can prevent the brain from receiving "not hungry" messages.</p>
        </section>

        <section class="frame frame-3" aria-label="IMCIVREE indication">
          <h2 class="headline">IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people living with BBS.</h2>
          <p class="subcopy">IMCIVREE is a prescription medicine for adults and children 2 years and older with obesity due to BBS to help them lose weight and keep it off.</p>
        </section>

        <section class="frame frame-4" aria-label="Treatment timeline">
          <h2 class="headline">Meaningful weight reduction typically begins within 6-8 weeks.</h2>
          <p class="subcopy">Patients may experience hunger reduction even earlier. Setting realistic expectations helps patients stay on track.</p>
        </section>

        <section class="frame frame-5" aria-label="Patient support">
          <h2 class="headline">Rhythm InTune provides personalized support throughout the treatment journey.</h2>
          <p class="subcopy">From enrollment and injection training to ongoing support, Rhythm InTune helps patients and caregivers succeed with IMCIVREE.</p>
          <div class="cta-row">
            <a href="${PRODUCT_URLS.hcp}" class="cta-button" target="_blank">LEARN MORE</a>
          </div>
        </section>
      </div>

      <section class="isi-bar" aria-label="Important Safety Information">
        <div class="isi-bar-title">Important Safety Information</div>
        <div class="isi-window">
          <div class="isi-scroll">
            <div class="isi-text">
              <div class="isi-heading">Contraindications</div>
              <p class="isi-body">Prior serious hypersensitivity to setmelanotide or any excipients in IMCIVREE (setmelanotide). Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.</p>
              <div class="isi-heading" style="margin-top: 8px;">References</div>
              <p class="isi-body">1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc. 3. Forsythe E et al. Front Pediatr. 2018.</p>
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
</html>`,
    references: [1, 5],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    focus: 'treatment',
    description: 'Treatment Journey - Timeline and treatment expectations'
  },

  // ==========================================
  // PATIENT BANNERS (2-screen mint design)
  // ==========================================
  'patient-understanding': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>IMCIVREE Patient Banner – Understanding BBS</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Avenir', 'Proxima Nova', 'Proxima', Arial, Helvetica, sans-serif; }
    body { background-color: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; }
    .banner-container { width: 728px; height: 250px; background-color: #eff3d8; border: 1px solid #0f6c73; position: relative; overflow: hidden; display: flex; flex-direction: column; }
    .main-content { height: 165px; position: relative; padding: 10px 20px; overflow: hidden; }
    .logo { width: 90px; height: auto; margin-bottom: 4px; z-index: 10; position: relative; }
    .hero-image { position: absolute; bottom: 0; right: 20px; height: 100%; object-fit: contain; z-index: 1; }
    .slide-container { position: relative; z-index: 5; width: 55%; }
    .slide { position: absolute; top: 0; left: 0; opacity: 0; transition: opacity 1s ease-in-out; }
    h1 { color: #007681; font-size: 18px; line-height: 1.15; margin-bottom: 4px; font-weight: bold; }
    .body-text { color: #4A4A4A; font-size: 11px; line-height: 1.25; margin-bottom: 6px; }
    .cta-button { display: inline-block; background-color: #0E7076; color: white; text-decoration: none; padding: 6px 16px; border-radius: 30px; font-size: 11px; font-weight: bold; text-transform: uppercase; cursor: pointer; }
    #slide1 { animation: fadeOut 0.5s forwards; animation-delay: 8s; opacity: 1; }
    #slide2 { opacity: 0; animation: fadeIn 0.5s forwards; animation-delay: 8.5s; }
    @keyframes fadeOut { to { opacity: 0; pointer-events: none; } }
    @keyframes fadeIn { to { opacity: 1; pointer-events: auto; } }
    .isi-section { height: 85px; background-color: #FFFFFF; border-top: 1px solid #0F6C73; }
    .isi-header { color: #007681; font-size: 10px; font-weight: bold; padding: 4px 15px 3px; }
    .isi-scroll-wrapper { height: 65px; overflow: hidden; position: relative; padding: 0 15px; }
    .isi-scroll-content { font-size: 8px; color: #4A4A4A; line-height: 1.4; }
  </style>
</head>
<body>
  <div class="banner-container">
    <div class="main-content">
      <img src="${IMAGES.logo}" alt="IMCIVREE Logo" class="logo">
      <div class="slide-container">
        <div class="slide" id="slide1">
          <h1>Understanding obesity and hunger in BBS.</h1>
          <p class="body-text">Bardet-Biedl syndrome (BBS) is a rare genetic disease that can cause early-onset obesity and constant, hard-to-control hunger.</p>
          <a href="${PRODUCT_URLS.patient}" class="cta-button" target="_blank">LEARN MORE</a>
        </div>
        <div class="slide" id="slide2">
          <h1>The only treatment for obesity due to BBS that targets a root cause.</h1>
          <p class="body-text">IMCIVREE is indicated for adults and pediatric patients 2 years and older with obesity due to BBS.</p>
          <a href="${PRODUCT_URLS.patient}" class="cta-button" target="_blank">LEARN MORE</a>
        </div>
      </div>
      <img src="${IMAGES.patientHero}" alt="Person" class="hero-image">
    </div>
    <div class="isi-section">
      <div class="isi-header">Important Safety Information</div>
      <div class="isi-scroll-wrapper">
        <div class="isi-scroll-content">
          <strong>Indication:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS). <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications; Obesity associated with other genetic syndromes and general (polygenic) obesity. <strong>Contraindications:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. <strong>Warnings and Precautions:</strong> Disturbance in sexual arousal: Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Depression and suicidal ideation: Depression, suicidal ideation, and depressed mood have been reported. Hypersensitivity reactions: Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. Skin pigmentation: Darkening of pre-existing nevi, and development of new skin pigmentation. Risk of serious adverse reactions due to benzyl alcohol preservative: Risk of serious adverse reactions in neonates and infants. <strong>Adverse Reactions:</strong> Most common adverse reactions (incidence ≥20%): skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, spontaneous penile erection. <strong>Use in Specific Populations:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus. <strong>Adverse Event Reporting:</strong> To report suspected adverse reactions, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088. Please see full Prescribing Information. <strong>References:</strong> 1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc. 3. Forsythe E et al. Front Pediatr. 2018.
        </div>
      </div>
    </div>
  </div>
  <script>
  (function () {
    var slide1 = document.getElementById("slide1");
    var slide2 = document.getElementById("slide2");
    function resetAnimation() {
      slide1.style.animation = 'none';
      slide2.style.animation = 'none';
      slide1.offsetHeight; slide2.offsetHeight;
      slide1.style.animation = null;
      slide2.style.animation = null;
    }
    setInterval(resetAnimation, 16000);
    setTimeout(function() {
      var wrapper = document.querySelector('.isi-scroll-wrapper');
      var content = document.querySelector('.isi-scroll-content');
      if (wrapper && content) {
        var scrollPos = 0;
        var scrollSpeed = 0.15;
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
  })();
  </script>
</body>
</html>`,
    references: [1],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'patient',
    focus: 'understanding',
    description: 'Understanding BBS - Disease education for patients/caregivers'
  },

  'patient-hope': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>IMCIVREE Patient Banner – Path Forward</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Avenir', 'Proxima Nova', 'Proxima', Arial, Helvetica, sans-serif; }
    body { background-color: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; }
    .banner-container { width: 728px; height: 250px; background-color: #eff3d8; border: 1px solid #0f6c73; position: relative; overflow: hidden; display: flex; flex-direction: column; }
    .main-content { height: 165px; position: relative; padding: 10px 20px; overflow: hidden; }
    .logo { width: 90px; height: auto; margin-bottom: 4px; z-index: 10; position: relative; }
    .hero-image { position: absolute; bottom: 0; right: 20px; height: 100%; object-fit: contain; z-index: 1; }
    .slide-container { position: relative; z-index: 5; width: 55%; }
    .slide { position: absolute; top: 0; left: 0; opacity: 0; transition: opacity 1s ease-in-out; }
    h1 { color: #007681; font-size: 18px; line-height: 1.15; margin-bottom: 4px; font-weight: bold; }
    .body-text { color: #4A4A4A; font-size: 11px; line-height: 1.25; margin-bottom: 6px; }
    .cta-button { display: inline-block; background-color: #0E7076; color: white; text-decoration: none; padding: 6px 16px; border-radius: 30px; font-size: 11px; font-weight: bold; text-transform: uppercase; cursor: pointer; }
    #slide1 { animation: fadeOut 0.5s forwards; animation-delay: 8s; opacity: 1; }
    #slide2 { opacity: 0; animation: fadeIn 0.5s forwards; animation-delay: 8.5s; }
    @keyframes fadeOut { to { opacity: 0; pointer-events: none; } }
    @keyframes fadeIn { to { opacity: 1; pointer-events: auto; } }
    .isi-section { height: 85px; background-color: #FFFFFF; border-top: 1px solid #0F6C73; }
    .isi-header { color: #007681; font-size: 10px; font-weight: bold; padding: 4px 15px 3px; }
    .isi-scroll-wrapper { height: 65px; overflow: hidden; position: relative; padding: 0 15px; }
    .isi-scroll-content { font-size: 8px; color: #4A4A4A; line-height: 1.4; }
  </style>
</head>
<body>
  <div class="banner-container">
    <div class="main-content">
      <img src="${IMAGES.logo}" alt="IMCIVREE Logo" class="logo">
      <div class="slide-container">
        <div class="slide" id="slide1">
          <h1>There is a path forward for managing BBS.</h1>
          <p class="body-text">IMCIVREE is the first and only FDA-approved treatment that targets a root cause of obesity and hunger in BBS.</p>
          <a href="${PRODUCT_URLS.patient}" class="cta-button" target="_blank">LEARN MORE</a>
        </div>
        <div class="slide" id="slide2">
          <h1>A different kind of treatment for a rare disease.</h1>
          <p class="body-text">IMCIVREE works differently—targeting the impaired MC4R pathway to help reduce hunger and body weight.</p>
          <a href="${PRODUCT_URLS.patient}" class="cta-button" target="_blank">LEARN MORE</a>
        </div>
      </div>
      <img src="${IMAGES.patientHero}" alt="Person" class="hero-image">
    </div>
    <div class="isi-section">
      <div class="isi-header">Important Safety Information</div>
      <div class="isi-scroll-wrapper">
        <div class="isi-scroll-content">
          <strong>Indication:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS). <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications; Obesity associated with other genetic syndromes and general (polygenic) obesity. <strong>Contraindications:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. <strong>Warnings and Precautions:</strong> Disturbance in sexual arousal: Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Depression and suicidal ideation: Depression, suicidal ideation, and depressed mood have been reported. Hypersensitivity reactions: Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. Skin pigmentation: Darkening of pre-existing nevi, and development of new skin pigmentation. Risk of serious adverse reactions due to benzyl alcohol preservative: Risk of serious adverse reactions in neonates and infants. <strong>Adverse Reactions:</strong> Most common adverse reactions (incidence ≥20%): skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, spontaneous penile erection. <strong>Use in Specific Populations:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus. <strong>Adverse Event Reporting:</strong> To report suspected adverse reactions, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088. Please see full Prescribing Information. <strong>References:</strong> 1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc. 3. Forsythe E et al. Front Pediatr. 2018.
        </div>
      </div>
    </div>
  </div>
  <script>
  (function () {
    var slide1 = document.getElementById("slide1");
    var slide2 = document.getElementById("slide2");
    function resetAnimation() {
      slide1.style.animation = 'none';
      slide2.style.animation = 'none';
      slide1.offsetHeight; slide2.offsetHeight;
      slide1.style.animation = null;
      slide2.style.animation = null;
    }
    setInterval(resetAnimation, 16000);
    setTimeout(function() {
      var wrapper = document.querySelector('.isi-scroll-wrapper');
      var content = document.querySelector('.isi-scroll-content');
      if (wrapper && content) {
        var scrollPos = 0;
        var scrollSpeed = 0.15;
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
  })();
  </script>
</body>
</html>`,
    references: [1],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'patient',
    focus: 'hope',
    description: 'Path Forward - Hopeful messaging about treatment options'
  },

  'patient-support': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>IMCIVREE Patient Banner – Support Available</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Avenir', 'Proxima Nova', 'Proxima', Arial, Helvetica, sans-serif; }
    body { background-color: #f4f4f4; display: flex; justify-content: center; align-items: center; height: 100vh; }
    .banner-container { width: 728px; height: 250px; background-color: #eff3d8; border: 1px solid #0f6c73; position: relative; overflow: hidden; display: flex; flex-direction: column; }
    .main-content { height: 165px; position: relative; padding: 10px 20px; overflow: hidden; }
    .logo { width: 90px; height: auto; margin-bottom: 4px; z-index: 10; position: relative; }
    .hero-image { position: absolute; bottom: 0; right: 20px; height: 100%; object-fit: contain; z-index: 1; }
    .slide-container { position: relative; z-index: 5; width: 55%; }
    .slide { position: absolute; top: 0; left: 0; opacity: 0; transition: opacity 1s ease-in-out; }
    h1 { color: #007681; font-size: 18px; line-height: 1.15; margin-bottom: 4px; font-weight: bold; }
    .body-text { color: #4A4A4A; font-size: 11px; line-height: 1.25; margin-bottom: 6px; }
    .cta-button { display: inline-block; background-color: #0E7076; color: white; text-decoration: none; padding: 6px 16px; border-radius: 30px; font-size: 11px; font-weight: bold; text-transform: uppercase; cursor: pointer; }
    #slide1 { animation: fadeOut 0.5s forwards; animation-delay: 8s; opacity: 1; }
    #slide2 { opacity: 0; animation: fadeIn 0.5s forwards; animation-delay: 8.5s; }
    @keyframes fadeOut { to { opacity: 0; pointer-events: none; } }
    @keyframes fadeIn { to { opacity: 1; pointer-events: auto; } }
    .isi-section { height: 85px; background-color: #FFFFFF; border-top: 1px solid #0F6C73; }
    .isi-header { color: #007681; font-size: 10px; font-weight: bold; padding: 4px 15px 3px; }
    .isi-scroll-wrapper { height: 65px; overflow: hidden; position: relative; padding: 0 15px; }
    .isi-scroll-content { font-size: 8px; color: #4A4A4A; line-height: 1.4; }
  </style>
</head>
<body>
  <div class="banner-container">
    <div class="main-content">
      <img src="${IMAGES.logo}" alt="IMCIVREE Logo" class="logo">
      <div class="slide-container">
        <div class="slide" id="slide1">
          <h1>Support for your IMCIVREE journey.</h1>
          <p class="body-text">Rhythm InTune provides personalized support for patients and caregivers throughout treatment.</p>
          <a href="${PRODUCT_URLS.patient}" class="cta-button" target="_blank">LEARN MORE</a>
        </div>
        <div class="slide" id="slide2">
          <h1>You're not alone on this journey.</h1>
          <p class="body-text">From injection training to ongoing guidance, Rhythm InTune is here to help every step of the way.</p>
          <a href="${PRODUCT_URLS.patient}" class="cta-button" target="_blank">LEARN MORE</a>
        </div>
      </div>
      <img src="${IMAGES.patientHero}" alt="Person" class="hero-image">
    </div>
    <div class="isi-section">
      <div class="isi-header">Important Safety Information</div>
      <div class="isi-scroll-wrapper">
        <div class="isi-scroll-content">
          <strong>Indication:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS). <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications; Obesity associated with other genetic syndromes and general (polygenic) obesity. <strong>Contraindications:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. <strong>Warnings and Precautions:</strong> Disturbance in sexual arousal: Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Depression and suicidal ideation: Depression, suicidal ideation, and depressed mood have been reported. Hypersensitivity reactions: Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. Skin pigmentation: Darkening of pre-existing nevi, and development of new skin pigmentation. Risk of serious adverse reactions due to benzyl alcohol preservative: Risk of serious adverse reactions in neonates and infants. <strong>Adverse Reactions:</strong> Most common adverse reactions (incidence ≥20%): skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, spontaneous penile erection. <strong>Use in Specific Populations:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus. <strong>Adverse Event Reporting:</strong> To report suspected adverse reactions, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088. Please see full Prescribing Information. <strong>References:</strong> 1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc. 3. Forsythe E et al. Front Pediatr. 2018.
        </div>
      </div>
    </div>
  </div>
  <script>
  (function () {
    var slide1 = document.getElementById("slide1");
    var slide2 = document.getElementById("slide2");
    function resetAnimation() {
      slide1.style.animation = 'none';
      slide2.style.animation = 'none';
      slide1.offsetHeight; slide2.offsetHeight;
      slide1.style.animation = null;
      slide2.style.animation = null;
    }
    setInterval(resetAnimation, 16000);
    setTimeout(function() {
      var wrapper = document.querySelector('.isi-scroll-wrapper');
      var content = document.querySelector('.isi-scroll-content');
      if (wrapper && content) {
        var scrollPos = 0;
        var scrollSpeed = 0.15;
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
  })();
  </script>
</body>
</html>`,
    references: [1, 5],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'patient',
    focus: 'support',
    description: 'Support Available - Rhythm InTune and caregiver resources'
  }
}
