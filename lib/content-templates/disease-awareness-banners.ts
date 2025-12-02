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
    .banner { position: relative; width: 750px; height: 250px; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); background: linear-gradient(135deg, #1a1652, #00a7df); color: #ffffff; }
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
    .references { position: relative; flex: 0 0 auto; background: #1a1652; color: #c9f1fe; font-size: 8px; line-height: 1.3; padding: 6px 12px; }
    .references strong { font-weight: 700; color: #00a7df; }
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

      <section class="references" aria-label="References">
        <strong>References:</strong> 1. Abuzzahab MJ et al. Horm Res Paediatr. 2019;91(2):128-136. 2. Roth CL. Front Endocrinol. 2011;2:49. 3. van Iersel L et al. Endocr Rev. 2019;40(1):193-235. 4. Roth CL. J Clin Med. 2015;4(9):1774-1797. | This information is intended for US healthcare professionals only. © 2025 Rhythm Pharmaceuticals, Inc. US-DSE-2500011 (03.08/2025)
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
    .banner { position: relative; width: 750px; height: 250px; overflow: hidden; border-radius: 16px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15); background: linear-gradient(135deg, #1a1652, #00a7df); color: #ffffff; }
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
    .references { position: relative; flex: 0 0 auto; background: #1a1652; color: #c9f1fe; font-size: 8px; line-height: 1.3; padding: 6px 12px; }
    .references strong { font-weight: 700; color: #00a7df; }
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

      <section class="references" aria-label="References">
        <strong>References:</strong> 1. Abuzzahab MJ et al. Horm Res Paediatr. 2019;91(2):128-136. 2. Roth CL. Front Endocrinol. 2011;2:49. 3. Timper K, Brüning JC. Dis Model Mech. 2017;10(6):679-689. | This information is intended for US healthcare professionals only. © 2025 Rhythm Pharmaceuticals, Inc. US-DSE-2500011 (03.08/2025)
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

  // ==========================================
  // CINEMATIC 3-FRAME BANNERS (Retail-Minimal Style)
  // ==========================================
  'hcp-cinematic-injury': {
    html: `<!DOCTYPE html>
<html>
<head>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap');
body { margin:0; padding:0; }
.banner { width:480px; height:320px; position:relative; overflow:hidden; font-family:'Open Sans', sans-serif; }
.frame { position:absolute; top:0; left:0; width:100%; height:100%; opacity:0; transition: opacity 0.6s ease-in-out; }

@keyframes frame1cycle {
 0%, 32% { opacity:1; }
 33%, 100% { opacity:0; }
}
@keyframes frame2cycle {
 0%, 32% { opacity:0; }
 33%, 66% { opacity:1; }
 67%, 100% { opacity:0; }
}
@keyframes frame3cycle {
 0%, 66% { opacity:0; }
 67%, 100% { opacity:1; }
}

.frame1 { animation: frame1cycle 12s infinite; color:#FFFFFF; text-align:center; display:flex; flex-direction:column; justify-content:center; font-family:'Montserrat', sans-serif; }
.frame1 h1 { font-weight:700; font-size:28px; line-height:1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }

.frame2 { background:#181050; animation: frame2cycle 12s infinite; color:#FFFFFF; display:flex; justify-content:center; align-items:center; text-align:center; padding:20px; font-size:22px; }

.frame3 { background:#F8F0F8; animation: frame3cycle 12s infinite; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; }

.cta { background:#A00868; color:#FFFFFF; padding:12px 28px; border-radius:10px; font-weight:600; font-size:18px; margin-bottom:20px; font-family:'Open Sans', sans-serif; text-decoration:none; display:inline-block; }
.cta:hover { background:#7a0550; }
.footer { width:100%; background:rgba(0,0,0,0.75); color:#FFFFFF; font-size:8px; padding:6px 10px; position:absolute; bottom:0; left:0; text-align:left; line-height:1.4; }
video { width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:-1; }
</style>
</head>
<body>
<div class="banner">

<!-- FRAME 1 - Cinemagraph + Emotional Headline -->
<div class="frame frame1">
 <video src="https://hcp.differentobesity.com/homepage-cinemagraph.mp4" autoplay loop muted playsinline></video>
 <h1>Her soccer dreams<br>didn't change.<br><strong>Her brain did.</strong></h1>
</div>

<!-- FRAME 2 - Single HO Claim -->
<div class="frame frame2">
 <div>HYPOTHALAMIC OBESITY (HO) results from hypothalamic injury<sup>1</sup>.</div>
</div>

<!-- FRAME 3 - CTA + Reference -->
<div class="frame frame3">
 <a href="https://hcp.differentobesity.com/" class="cta" target="_blank">Learn more now</a>
 <div class="footer">1. Abuzzahab MJ, Roth CL, Shoemaker AH. Hypothalamic obesity: prologue and promise. Horm Res Paediatr. 2019;91(2):128-136. doi:10.1159/000496564</div>
</div>

</div>
</body>
</html>`,
    references: [1],
    approved: true,
    lastUpdated: '2025-12-02',
    audience: 'hcp',
    focus: 'cinematic-injury',
    description: 'Cinematic 3-frame banner - HO results from hypothalamic injury'
  },

  'hcp-cinematic-mc4r': {
    html: `<!DOCTYPE html>
<html>
<head>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap');
body { margin:0; padding:0; }
.banner { width:480px; height:320px; position:relative; overflow:hidden; font-family:'Open Sans', sans-serif; }
.frame { position:absolute; top:0; left:0; width:100%; height:100%; opacity:0; transition: opacity 0.6s ease-in-out; }

@keyframes frame1cycle {
 0%, 32% { opacity:1; }
 33%, 100% { opacity:0; }
}
@keyframes frame2cycle {
 0%, 32% { opacity:0; }
 33%, 66% { opacity:1; }
 67%, 100% { opacity:0; }
}
@keyframes frame3cycle {
 0%, 66% { opacity:0; }
 67%, 100% { opacity:1; }
}

.frame1 { animation: frame1cycle 12s infinite; color:#FFFFFF; text-align:center; display:flex; flex-direction:column; justify-content:center; font-family:'Montserrat', sans-serif; }
.frame1 h1 { font-weight:700; font-size:28px; line-height:1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }

.frame2 { background:#A00868; animation: frame2cycle 12s infinite; color:#FFFFFF; display:flex; justify-content:center; align-items:center; text-align:center; padding:20px; font-size:22px; }

.frame3 { background:#F0E0F8; animation: frame3cycle 12s infinite; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; }

.cta { background:#A00868; color:#FFFFFF; padding:12px 28px; border-radius:10px; font-weight:600; font-size:18px; margin-bottom:20px; font-family:'Open Sans', sans-serif; text-decoration:none; display:inline-block; }
.cta:hover { background:#7a0550; }
.footer { width:100%; background:rgba(0,0,0,0.75); color:#FFFFFF; font-size:8px; padding:6px 10px; position:absolute; bottom:0; left:0; text-align:left; line-height:1.4; }
video { width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:-1; }
</style>
</head>
<body>
<div class="banner">

<!-- FRAME 1 - Cinemagraph + Emotional Headline -->
<div class="frame frame1">
 <video src="https://hcp.differentobesity.com/homepage-cinemagraph.mp4" autoplay loop muted playsinline></video>
 <h1>Her soccer dreams<br>didn't change.<br><strong>Her brain did.</strong></h1>
</div>

<!-- FRAME 2 - Single HO Claim -->
<div class="frame frame2">
 <div>MC4R regulates hunger and satiety<sup>1</sup>.</div>
</div>

<!-- FRAME 3 - CTA + Reference -->
<div class="frame frame3">
 <a href="https://hcp.differentobesity.com/" class="cta" target="_blank">See HO signs</a>
 <div class="footer">1. Abuzzahab MJ, Roth CL, Shoemaker AH. Hypothalamic obesity: prologue and promise. Horm Res Paediatr. 2019;91(2):128-136. doi:10.1159/000496564</div>
</div>

</div>
</body>
</html>`,
    references: [1],
    approved: true,
    lastUpdated: '2025-12-02',
    audience: 'hcp',
    focus: 'cinematic-mc4r',
    description: 'Cinematic 3-frame banner - MC4R pathway regulation'
  },

  'hcp-cinematic-hyperphagia': {
    html: `<!DOCTYPE html>
<html>
<head>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap');
body { margin:0; padding:0; }
.banner { width:480px; height:320px; position:relative; overflow:hidden; font-family:'Open Sans', sans-serif; }
.frame { position:absolute; top:0; left:0; width:100%; height:100%; opacity:0; transition: opacity 0.6s ease-in-out; }

@keyframes frame1cycle {
 0%, 32% { opacity:1; }
 33%, 100% { opacity:0; }
}
@keyframes frame2cycle {
 0%, 32% { opacity:0; }
 33%, 66% { opacity:1; }
 67%, 100% { opacity:0; }
}
@keyframes frame3cycle {
 0%, 66% { opacity:0; }
 67%, 100% { opacity:1; }
}

.frame1 { animation: frame1cycle 12s infinite; color:#FFFFFF; text-align:center; display:flex; flex-direction:column; justify-content:center; font-family:'Montserrat', sans-serif; }
.frame1 h1 { font-weight:700; font-size:28px; line-height:1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }

.frame2 { background:#181050; animation: frame2cycle 12s infinite; color:#FFFFFF; display:flex; justify-content:center; align-items:center; text-align:center; padding:20px; font-size:20px; line-height:1.3; }

.frame3 { background:#F8F0F8; animation: frame3cycle 12s infinite; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; }

.cta { background:#A00868; color:#FFFFFF; padding:12px 28px; border-radius:10px; font-weight:600; font-size:18px; margin-bottom:20px; font-family:'Open Sans', sans-serif; text-decoration:none; display:inline-block; }
.cta:hover { background:#7a0550; }
.footer { width:100%; background:rgba(0,0,0,0.75); color:#FFFFFF; font-size:8px; padding:6px 10px; position:absolute; bottom:0; left:0; text-align:left; line-height:1.4; }
video { width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:-1; }
</style>
</head>
<body>
<div class="banner">

<!-- FRAME 1 - Cinemagraph + Emotional Headline -->
<div class="frame frame1">
 <video src="https://hcp.differentobesity.com/homepage-cinemagraph.mp4" autoplay loop muted playsinline></video>
 <h1>Her soccer dreams<br>didn't change.<br><strong>Her brain did.</strong></h1>
</div>

<!-- FRAME 2 - Single HO Claim -->
<div class="frame frame2">
 <div>~70% of patients with HO<br>experience hyperphagia<sup>1</sup>.</div>
</div>

<!-- FRAME 3 - CTA + Reference -->
<div class="frame frame3">
 <a href="https://hcp.differentobesity.com/" class="cta" target="_blank">Learn more now</a>
 <div class="footer">1. Abuzzahab MJ, Roth CL, Shoemaker AH. Hypothalamic obesity: prologue and promise. Horm Res Paediatr. 2019;91(2):128-136. doi:10.1159/000496564</div>
</div>

</div>
</body>
</html>`,
    references: [1],
    approved: true,
    lastUpdated: '2025-12-02',
    audience: 'hcp',
    focus: 'cinematic-hyperphagia',
    description: 'Cinematic 3-frame banner - Hyperphagia prevalence'
  },

  'hcp-cinematic-weight-gain': {
    html: `<!DOCTYPE html>
<html>
<head>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap');
body { margin:0; padding:0; }
.banner { width:480px; height:320px; position:relative; overflow:hidden; font-family:'Open Sans', sans-serif; }
.frame { position:absolute; top:0; left:0; width:100%; height:100%; opacity:0; transition: opacity 0.6s ease-in-out; }

@keyframes frame1cycle {
 0%, 32% { opacity:1; }
 33%, 100% { opacity:0; }
}
@keyframes frame2cycle {
 0%, 32% { opacity:0; }
 33%, 66% { opacity:1; }
 67%, 100% { opacity:0; }
}
@keyframes frame3cycle {
 0%, 66% { opacity:0; }
 67%, 100% { opacity:1; }
}

.frame1 { animation: frame1cycle 12s infinite; color:#FFFFFF; text-align:center; display:flex; flex-direction:column; justify-content:center; font-family:'Montserrat', sans-serif; }
.frame1 h1 { font-weight:700; font-size:28px; line-height:1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }

.frame2 { background:#A00868; animation: frame2cycle 12s infinite; color:#FFFFFF; display:flex; justify-content:center; align-items:center; text-align:center; padding:20px; font-size:20px; line-height:1.3; }

.frame3 { background:#F0E0F8; animation: frame3cycle 12s infinite; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; }

.cta { background:#A00868; color:#FFFFFF; padding:12px 28px; border-radius:10px; font-weight:600; font-size:18px; margin-bottom:20px; font-family:'Open Sans', sans-serif; text-decoration:none; display:inline-block; }
.cta:hover { background:#7a0550; }
.footer { width:100%; background:rgba(0,0,0,0.75); color:#FFFFFF; font-size:8px; padding:6px 10px; position:absolute; bottom:0; left:0; text-align:left; line-height:1.4; }
video { width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:-1; }
</style>
</head>
<body>
<div class="banner">

<!-- FRAME 1 - Cinemagraph + Emotional Headline -->
<div class="frame frame1">
 <video src="https://hcp.differentobesity.com/homepage-cinemagraph.mp4" autoplay loop muted playsinline></video>
 <h1>Her soccer dreams<br>didn't change.<br><strong>Her brain did.</strong></h1>
</div>

<!-- FRAME 2 - Single HO Claim -->
<div class="frame frame2">
 <div>Weight gain can begin<br>6–12 months post-injury<sup>2</sup>.</div>
</div>

<!-- FRAME 3 - CTA + Reference -->
<div class="frame frame3">
 <a href="https://hcp.differentobesity.com/" class="cta" target="_blank">See HO signs</a>
 <div class="footer">2. Roth CL. Hypothalamic obesity in craniopharyngioma patients: disturbed energy homeostasis related to extent of hypothalamic damage. J Clin Med. 2015;4(9):1774-1797.</div>
</div>

</div>
</body>
</html>`,
    references: [2],
    approved: true,
    lastUpdated: '2025-12-02',
    audience: 'hcp',
    focus: 'cinematic-weight-gain',
    description: 'Cinematic 3-frame banner - Weight gain timeline'
  },

  'hcp-cinematic-screening': {
    html: `<!DOCTYPE html>
<html>
<head>
<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@400;600&display=swap');
body { margin:0; padding:0; }
.banner { width:480px; height:320px; position:relative; overflow:hidden; font-family:'Open Sans', sans-serif; }
.frame { position:absolute; top:0; left:0; width:100%; height:100%; opacity:0; transition: opacity 0.6s ease-in-out; }

@keyframes frame1cycle {
 0%, 32% { opacity:1; }
 33%, 100% { opacity:0; }
}
@keyframes frame2cycle {
 0%, 32% { opacity:0; }
 33%, 66% { opacity:1; }
 67%, 100% { opacity:0; }
}
@keyframes frame3cycle {
 0%, 66% { opacity:0; }
 67%, 100% { opacity:1; }
}

.frame1 { animation: frame1cycle 12s infinite; color:#FFFFFF; text-align:center; display:flex; flex-direction:column; justify-content:center; font-family:'Montserrat', sans-serif; }
.frame1 h1 { font-weight:700; font-size:28px; line-height:1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }

.frame2 { background:#181050; animation: frame2cycle 12s infinite; color:#FFFFFF; display:flex; justify-content:center; align-items:center; text-align:center; padding:20px; font-size:22px; }

.frame3 { background:#F8F0F8; animation: frame3cycle 12s infinite; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center; }

.cta { background:#A00868; color:#FFFFFF; padding:12px 28px; border-radius:10px; font-weight:600; font-size:18px; margin-bottom:20px; font-family:'Open Sans', sans-serif; text-decoration:none; display:inline-block; }
.cta:hover { background:#7a0550; }
.footer { width:100%; background:rgba(0,0,0,0.75); color:#FFFFFF; font-size:8px; padding:6px 10px; position:absolute; bottom:0; left:0; text-align:left; line-height:1.4; }
video { width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:-1; }
</style>
</head>
<body>
<div class="banner">

<!-- FRAME 1 - Cinemagraph + Emotional Headline -->
<div class="frame frame1">
 <video src="https://hcp.differentobesity.com/homepage-cinemagraph.mp4" autoplay loop muted playsinline></video>
 <h1>Her soccer dreams<br>didn't change.<br><strong>Her brain did.</strong></h1>
</div>

<!-- FRAME 2 - Single HO Claim -->
<div class="frame frame2">
 <div>Early screening is critical<sup>3</sup>.</div>
</div>

<!-- FRAME 3 - CTA + Reference -->
<div class="frame frame3">
 <a href="https://hcp.differentobesity.com/" class="cta" target="_blank">Learn more now</a>
 <div class="footer">3. van Iersel L, et al. Hypothalamic obesity: mechanisms and management. Endocr Rev. 2019;40(1):193-235.</div>
</div>

</div>
</body>
</html>`,
    references: [3],
    approved: true,
    lastUpdated: '2025-12-02',
    audience: 'hcp',
    focus: 'cinematic-screening',
    description: 'Cinematic 3-frame banner - Early screening importance'
  },
}

// Banner focus options for Disease Awareness
export const DA_BANNER_FOCUS = [
  { id: 'hcp-disease-education', name: 'Disease Education Overview', description: '5-frame intro to aHO for healthcare professionals', style: '5-frame' },
  { id: 'hcp-mechanism', name: 'Hypothalamic Mechanism', description: '5-frame MC4R pathway and hyperphagia mechanism', style: '5-frame' },
]

// NEW: Cinematic 3-frame banner options
export const DA_CINEMATIC_FOCUS = [
  { id: 'hcp-cinematic-injury', name: 'HO from Injury', description: 'HO results from hypothalamic injury', claim: 'HYPOTHALAMIC OBESITY (HO) results from hypothalamic injury¹.' },
  { id: 'hcp-cinematic-mc4r', name: 'MC4R Pathway', description: 'MC4R regulates hunger and satiety', claim: 'MC4R regulates hunger and satiety¹.' },
  { id: 'hcp-cinematic-hyperphagia', name: 'Hyperphagia Prevalence', description: '~70% of patients experience hyperphagia', claim: '~70% of patients with HO experience hyperphagia¹.' },
  { id: 'hcp-cinematic-weight-gain', name: 'Weight Gain Timeline', description: 'Weight gain begins 6-12 months post-injury', claim: 'Weight gain can begin 6–12 months post-injury².' },
  { id: 'hcp-cinematic-screening', name: 'Early Screening', description: 'Early screening is critical', claim: 'Early screening is critical³.' },
]
