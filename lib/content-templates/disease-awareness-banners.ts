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
  // If focus already starts with 'hcp-', use it directly
  return focus.startsWith('hcp-') ? focus : `hcp-${focus}`
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
    .headline { font-weight: 800; font-size: 18px; line-height: 1.2; letter-spacing: 0.02em; margin-bottom: 10px; }
    .subcopy { font-size: 12px; line-height: 1.4; max-width: 98%; opacity: 0.9; }
    .cta-row { margin-top: 18px; display: flex; justify-content: flex-end; }
    .cta-button { background: #A00868; color: #ffffff; border-radius: 8px; padding: 10px 24px; font-size: 13px; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25); text-decoration: none; }
    .cta-button:hover { background: #7a0550; }
    .brain-icon { position: absolute; top: 20px; right: 24px; width: 50px; height: 50px; opacity: 0.15; }
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
              1. Abuzzahab MJ, Roth CL, Shoemaker AH. Hypothalamic obesity: prologue and promise. Horm Res Paediatr. 2019;91(2):128-136. doi:10.1159/000496564
              2. Roth CL. Hypothalamic obesity in patients with craniopharyngioma: profound changes of several weight regulatory circuits. Front Endocrinol (Lausanne). 2011;2:49. doi:10.3389/fendo.2011.00049
              3. van Iersel L, Brokke KE, Adan RAH, et al. Pathophysiology and individualized treatment of hypothalamic obesity following craniopharyngioma and other suprasellar tumors: a systematic review. Endocr Rev. 2019;40(1):193-235. doi:10.1210/er.2018-00017
              4. Roth CL. Hypothalamic obesity in craniopharyngioma patients: disturbed energy homeostasis related to extent of hypothalamic damage and its implication for obesity intervention. J Clin Med. 2015;4(9):1774-1797. doi:10.3390/jcm4091774
              <br><br>
              This information is intended for US healthcare professionals only and is provided for educational purposes.
              <br><br>
              © 2025. Rhythm Pharmaceuticals, Inc. All rights reserved. Rhythm and its logo are trademarks of Rhythm Pharmaceuticals, Inc. US-DSE-2500011 (03.08/2025)
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
    references: [1, 2, 6, 7],
    approved: true,
    lastUpdated: '2025-12-01',
    audience: 'hcp',
    focus: 'disease-education',
    description: 'Disease Education - Overview of HO for healthcare professionals'
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
    .headline { font-weight: 800; font-size: 18px; line-height: 1.2; letter-spacing: 0.02em; margin-bottom: 10px; }
    .subcopy { font-size: 12px; line-height: 1.4; max-width: 98%; opacity: 0.9; }
    .cta-row { margin-top: 18px; display: flex; justify-content: flex-end; }
    .cta-button { background: #A00868; color: #ffffff; border-radius: 8px; padding: 10px 24px; font-size: 13px; font-weight: 700; border: none; cursor: pointer; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25); text-decoration: none; }
    .cta-button:hover { background: #7a0550; }
    .brain-icon { position: absolute; top: 20px; right: 24px; width: 50px; height: 50px; opacity: 0.15; }
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
              1. Abuzzahab MJ, Roth CL, Shoemaker AH. Hypothalamic obesity: prologue and promise. Horm Res Paediatr. 2019;91(2):128-136. doi:10.1159/000496564
              2. Roth CL. Hypothalamic obesity in patients with craniopharyngioma: profound changes of several weight regulatory circuits. Front Endocrinol (Lausanne). 2011;2:49. doi:10.3389/fendo.2011.00049
              3. Timper K, Brünjng JC. Hypothalamic circuits regulating appetite and energy homeostasis: pathways to obesity. Dis Model Mech. 2017;10(6):679-689. doi:10.1242/dmm.026609
              <br><br>
              This information is intended for US healthcare professionals only and is provided for educational purposes.
              <br><br>
              © 2025. Rhythm Pharmaceuticals, Inc. All rights reserved. Rhythm and its logo are trademarks of Rhythm Pharmaceuticals, Inc. US-DSE-2500011 (03.08/2025)
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
    references: [1, 2, 10],
    approved: true,
    lastUpdated: '2025-12-01',
    audience: 'hcp',
    focus: 'mechanism',
    description: 'Mechanism Focus - The hypothalamic pathway and MC4R signaling'
  },
}

// Banner focus options for Disease Awareness
export const DA_BANNER_FOCUS = [
  { id: 'hcp-disease-education', name: 'Disease Education Overview', description: 'Introduction to aHO for healthcare professionals' },
  { id: 'hcp-mechanism', name: 'Hypothalamic Mechanism', description: 'MC4R pathway and hyperphagia mechanism' },
]
