/**
 * Disease Awareness Banner Templates - Acquired Hypothalamic Obesity (aHO)
 * 728x250 animated HTML banners for HCP education
 *
 * Design:
 * - Purple/teal gradient (NOT green)
 * - 5-frame narrative structure
 * - Bottom bar with scrolling REFERENCES (NOT ISI - this is disease education)
 * - Brain-focused visuals
 */

export interface DABannerTemplate {
  html: string
  references: number[]
  approved: boolean
  lastUpdated: string
  audience: 'hcp'
  focus: string
  description: string
}

// Helper to generate template key
export function getDABannerTemplateKey(focus: string): string {
  return `hcp-${focus}`
}

// Check if a banner template exists
export function hasDABannerTemplate(focus: string): boolean {
  const key = getDABannerTemplateKey(focus)
  return key in DA_BANNER_TEMPLATES
}

// Get banner template by parameters
export function getDABannerTemplate(focus: string): DABannerTemplate | null {
  const key = getDABannerTemplateKey(focus)
  return DA_BANNER_TEMPLATES[key] || null
}

// CTA URL
const CTA_URL = 'https://hcp.differentobesity.com/'

/**
 * Disease Awareness Banner Templates
 */
export const DA_BANNER_TEMPLATES: Record<string, DABannerTemplate> = {
  // ==========================================
  // HCP - Disease Education (5-frame purple/teal design)
  // ==========================================
  'hcp-disease-education': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>aHO Disease Awareness Banner</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #f3f5f7; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .banner { position: relative; width: 728px; height: 250px; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); background: linear-gradient(135deg, #1a1652, #00a7df); color: #ffffff; }
    .banner-inner { position: absolute; inset: 0; display: flex; flex-direction: column; }
    .frames { position: relative; flex: 1 1 auto; padding: 20px 24px 8px; overflow: hidden; }
    .frame { position: absolute; inset: 0; padding: 24px 28px 16px; opacity: 0; transition: opacity 0.7s ease; display: flex; flex-direction: column; justify-content: center; z-index: 1; }
    .frame.active { opacity: 1; z-index: 2; }
    .headline { font-weight: 800; font-size: 22px; line-height: 1.2; letter-spacing: 0.02em; margin-bottom: 10px; }
    .subcopy { font-size: 13px; line-height: 1.4; max-width: 95%; opacity: 0.9; }
    .cta-row { margin-top: 18px; display: flex; justify-content: flex-end; }
    .cta-button { background: #c9f1fe; color: #1a1652; border-radius: 999px; padding: 10px 24px; font-size: 13px; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25); text-decoration: none; }
    .cta-button:hover { filter: brightness(1.05); }
    .brain-icon { position: absolute; top: 20px; right: 24px; width: 50px; height: 50px; opacity: 0.15; }
    .bubble-layer { position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }
    .bubble { position: absolute; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(201,241,254,0.35), rgba(201,241,254,0.05)); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); animation: floatUp 18s linear infinite; opacity: 0.55; }
    .bubble:nth-child(1) { width: 90px; height: 90px; left: 4%; bottom: -20%; animation-duration: 26s; }
    .bubble:nth-child(2) { width: 60px; height: 60px; left: 45%; bottom: -30%; animation-duration: 22s; animation-delay: -8s; }
    .bubble:nth-child(3) { width: 120px; height: 120px; right: 2%; bottom: -40%; animation-duration: 30s; animation-delay: -5s; }
    .bubble:nth-child(4) { width: 40px; height: 40px; right: 30%; bottom: -25%; animation-duration: 18s; animation-delay: -10s; }
    @keyframes floatUp { 0% { transform: translateY(0); } 100% { transform: translateY(-180%); } }
    .refs-bar { position: relative; flex: 0 0 52px; background: #1a1652; color: #c9f1fe; font-size: 10px; line-height: 1.3; overflow: hidden; padding: 4px 10px; }
    .refs-bar-title { font-weight: 700; margin-bottom: 2px; color: #00a7df; }
    .refs-window { position: relative; overflow: hidden; height: 34px; }
    .refs-scroll { position: absolute; width: 100%; animation: refsScroll 25s linear infinite; white-space: normal; }
    @keyframes refsScroll { 0% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
    .refs-text { padding-right: 18px; }
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

        <!-- Brain Icon Watermark -->
        <svg class="brain-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>

        <section class="frame frame-1 active" aria-label="Disease problem">
          <h2 class="headline">Not all obesity is the same.</h2>
          <p class="subcopy">Acquired hypothalamic obesity (aHO) is a distinct form of obesity with a specific neurological origin that requires recognition and understanding.</p>
        </section>

        <section class="frame frame-2" aria-label="Hypothalamic mechanism">
          <h2 class="headline">It starts in the brain.</h2>
          <p class="subcopy">aHO is caused by damage to the hypothalamus—the brain region that regulates hunger and energy balance—from tumors, surgery, or radiation.</p>
        </section>

        <section class="frame frame-3" aria-label="Patient burden">
          <h2 class="headline">Insatiable hunger and rapid weight gain.</h2>
          <p class="subcopy">When the hypothalamus is damaged, normal hunger and satiety signals are disrupted, leading to severe, persistent hyperphagia that is difficult to control.</p>
        </section>

        <section class="frame frame-4" aria-label="Recognition">
          <h2 class="headline">Recognize the signs.</h2>
          <p class="subcopy">Consider aHO in patients with rapid weight gain following hypothalamic injury, history of craniopharyngioma, or uncontrollable hunger unresponsive to lifestyle changes.</p>
        </section>

        <section class="frame frame-5" aria-label="CTA">
          <h2 class="headline">Learn more about acquired hypothalamic obesity.</h2>
          <p class="subcopy">Early recognition of aHO is key to appropriate patient management and improved outcomes.</p>
          <div class="cta-row">
            <a href="${CTA_URL}" class="cta-button" target="_blank">LEARN MORE</a>
          </div>
        </section>
      </div>

      <section class="refs-bar" aria-label="References">
        <div class="refs-bar-title">References</div>
        <div class="refs-window">
          <div class="refs-scroll">
            <div class="refs-text">
              1. Lustig RH, et al. Pediatr Endocrinol Rev. 2008;6(2):220-227.
              2. van Iersel L, et al. Endocr Rev. 2019;40(2):531-556.
              3. Müller HL, et al. Nat Rev Dis Primers. 2019;5(1):75.
              4. Roth CL, et al. J Clin Endocrinol Metab. 2011;96(9):2854-2862.
              5. Haqq AM, et al. Obesity Reviews. 2022;23(9):e13459.
              <br><br>
              This information is intended for US healthcare professionals only and is provided for educational purposes.
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
    references: [1, 2, 3, 4, 5],
    approved: true,
    lastUpdated: '2025-12-01',
    audience: 'hcp',
    focus: 'disease-education',
    description: 'Disease Education - Overview of aHO for healthcare professionals'
  },

  // ==========================================
  // HCP - Mechanism Focus
  // ==========================================
  'hcp-mechanism': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>aHO Mechanism Banner</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #f3f5f7; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    .banner { position: relative; width: 728px; height: 250px; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); background: linear-gradient(135deg, #1a1652, #00a7df); color: #ffffff; }
    .banner-inner { position: absolute; inset: 0; display: flex; flex-direction: column; }
    .frames { position: relative; flex: 1 1 auto; padding: 20px 24px 8px; overflow: hidden; }
    .frame { position: absolute; inset: 0; padding: 24px 28px 16px; opacity: 0; transition: opacity 0.7s ease; display: flex; flex-direction: column; justify-content: center; z-index: 1; }
    .frame.active { opacity: 1; z-index: 2; }
    .headline { font-weight: 800; font-size: 22px; line-height: 1.2; letter-spacing: 0.02em; margin-bottom: 10px; }
    .subcopy { font-size: 13px; line-height: 1.4; max-width: 95%; opacity: 0.9; }
    .cta-row { margin-top: 18px; display: flex; justify-content: flex-end; }
    .cta-button { background: #c9f1fe; color: #1a1652; border-radius: 999px; padding: 10px 24px; font-size: 13px; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25); text-decoration: none; }
    .cta-button:hover { filter: brightness(1.05); }
    .brain-icon { position: absolute; top: 20px; right: 24px; width: 50px; height: 50px; opacity: 0.15; }
    .bubble-layer { position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }
    .bubble { position: absolute; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(201,241,254,0.35), rgba(201,241,254,0.05)); box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15); animation: floatUp 18s linear infinite; opacity: 0.55; }
    .bubble:nth-child(1) { width: 90px; height: 90px; left: 4%; bottom: -20%; animation-duration: 26s; }
    .bubble:nth-child(2) { width: 60px; height: 60px; left: 45%; bottom: -30%; animation-duration: 22s; animation-delay: -8s; }
    .bubble:nth-child(3) { width: 120px; height: 120px; right: 2%; bottom: -40%; animation-duration: 30s; animation-delay: -5s; }
    .bubble:nth-child(4) { width: 40px; height: 40px; right: 30%; bottom: -25%; animation-duration: 18s; animation-delay: -10s; }
    @keyframes floatUp { 0% { transform: translateY(0); } 100% { transform: translateY(-180%); } }
    .refs-bar { position: relative; flex: 0 0 52px; background: #1a1652; color: #c9f1fe; font-size: 10px; line-height: 1.3; overflow: hidden; padding: 4px 10px; }
    .refs-bar-title { font-weight: 700; margin-bottom: 2px; color: #00a7df; }
    .refs-window { position: relative; overflow: hidden; height: 34px; }
    .refs-scroll { position: absolute; width: 100%; animation: refsScroll 25s linear infinite; white-space: normal; }
    @keyframes refsScroll { 0% { transform: translateY(100%); } 100% { transform: translateY(-100%); } }
    .refs-text { padding-right: 18px; }
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

        <!-- Brain Icon Watermark -->
        <svg class="brain-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>

        <section class="frame frame-1 active" aria-label="The hypothalamus">
          <h2 class="headline">The hypothalamus: master regulator of hunger.</h2>
          <p class="subcopy">This critical brain region controls hunger, satiety, and energy balance through complex signaling pathways.</p>
        </section>

        <section class="frame frame-2" aria-label="MC4R pathway">
          <h2 class="headline">The MC4R pathway plays a critical role.</h2>
          <p class="subcopy">The melanocortin 4 receptor (MC4R) pathway responds to leptin signals and promotes feelings of satiety after eating.</p>
        </section>

        <section class="frame frame-3" aria-label="Pathway disruption">
          <h2 class="headline">Damage disrupts normal signaling.</h2>
          <p class="subcopy">When the hypothalamus is injured, MC4R pathway signaling is impaired, leading to loss of normal hunger and satiety regulation.</p>
        </section>

        <section class="frame frame-4" aria-label="Consequences">
          <h2 class="headline">Persistent, uncontrollable hunger results.</h2>
          <p class="subcopy">Patients experience severe hyperphagia, reduced energy expenditure, and rapid, progressive weight gain that is difficult to manage.</p>
        </section>

        <section class="frame frame-5" aria-label="CTA">
          <h2 class="headline">Understanding the mechanism matters.</h2>
          <p class="subcopy">Learn more about how hypothalamic damage affects the MC4R pathway and leads to acquired hypothalamic obesity.</p>
          <div class="cta-row">
            <a href="${CTA_URL}" class="cta-button" target="_blank">LEARN MORE</a>
          </div>
        </section>
      </div>

      <section class="refs-bar" aria-label="References">
        <div class="refs-bar-title">References</div>
        <div class="refs-window">
          <div class="refs-scroll">
            <div class="refs-text">
              1. Lustig RH, et al. Pediatr Endocrinol Rev. 2008;6(2):220-227.
              2. van Iersel L, et al. Endocr Rev. 2019;40(2):531-556.
              4. Roth CL, et al. J Clin Endocrinol Metab. 2011;96(9):2854-2862.
              5. Haqq AM, et al. Obesity Reviews. 2022;23(9):e13459.
              <br><br>
              This information is intended for US healthcare professionals only and is provided for educational purposes.
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
    references: [1, 2, 4, 5],
    approved: true,
    lastUpdated: '2025-12-01',
    audience: 'hcp',
    focus: 'mechanism',
    description: 'Mechanism Focus - The hypothalamic pathway and MC4R signaling'
  },
}

// Banner focus options for Disease Awareness
export const DA_BANNER_FOCUS = [
  { id: 'disease-education', name: 'Disease Education Overview' },
  { id: 'mechanism', name: 'Hypothalamic Mechanism' },
]
