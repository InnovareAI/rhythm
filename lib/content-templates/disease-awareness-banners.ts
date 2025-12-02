/**
 * Disease Awareness Banner Templates - Acquired Hypothalamic Obesity (HO)
 * Cinematic 3-frame banner system for HCP education
 *
 * Design (ChatGPT GPT spec):
 * - Frame 1: Cinemagraph video + emotional headline (Montserrat Bold)
 * - Frame 2: Single HO claim on brand color background (#181050 or #A00868)
 * - Frame 3: CTA button + reference on #F8F0F8 or #F0E0F8
 * - 12-second animation cycle with smooth opacity transitions
 * - Typography: Montserrat Bold headlines, Open Sans body/CTA
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

/**
 * Disease Awareness Banner Templates - Cinematic 3-Frame System
 */
export const DA_BANNER_TEMPLATES: Record<string, DABannerTemplate> = {
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
.frame { position:absolute; inset:0; width:100%; height:100%; opacity:0; transition: opacity 0.6s ease-in-out; display:flex; flex-direction:column; justify-content:center; align-items:center; }

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
.frame1 h1 { font-weight:700; font-size:24px; line-height:1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }

.frame2 { background:#181050; animation: frame2cycle 12s infinite; color:#FFFFFF; text-align:center; font-size:22px; }

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
 <h1>She didn't want to raid the fridge<br>in the middle of the night again.<br><strong>Her brain did.</strong></h1>
</div>

<!-- FRAME 2 - Single HO Claim -->
<div class="frame frame2">
 <div style="text-align:center;">HYPOTHALAMIC OBESITY (HO) results<br>from hypothalamic injury<sup>1</sup>.</div>
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
.frame { position:absolute; inset:0; width:100%; height:100%; opacity:0; transition: opacity 0.6s ease-in-out; display:flex; flex-direction:column; justify-content:center; align-items:center; }

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
.frame1 h1 { font-weight:700; font-size:24px; line-height:1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }

.frame2 { background:#A00868; animation: frame2cycle 12s infinite; color:#FFFFFF; text-align:center; font-size:22px; }

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
 <h1>She didn't want to raid the fridge<br>in the middle of the night again.<br><strong>Her brain did.</strong></h1>
</div>

<!-- FRAME 2 - Single HO Claim -->
<div class="frame frame2">
 <div style="text-align:center;">MC4R regulates<br>hunger and satiety<sup>1</sup>.</div>
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
.frame { position:absolute; inset:0; width:100%; height:100%; opacity:0; transition: opacity 0.6s ease-in-out; display:flex; flex-direction:column; justify-content:center; align-items:center; }

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
.frame1 h1 { font-weight:700; font-size:24px; line-height:1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }

.frame2 { background:#181050; animation: frame2cycle 12s infinite; color:#FFFFFF; text-align:center; font-size:20px; line-height:1.3; }

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
 <h1>She didn't want to raid the fridge<br>in the middle of the night again.<br><strong>Her brain did.</strong></h1>
</div>

<!-- FRAME 2 - Single HO Claim -->
<div class="frame frame2">
 <div style="text-align:center;">~70% of patients with HO<br>experience hyperphagia<sup>1</sup>.</div>
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
.frame { position:absolute; inset:0; width:100%; height:100%; opacity:0; transition: opacity 0.6s ease-in-out; display:flex; flex-direction:column; justify-content:center; align-items:center; }

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
.frame1 h1 { font-weight:700; font-size:24px; line-height:1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }

.frame2 { background:#A00868; animation: frame2cycle 12s infinite; color:#FFFFFF; text-align:center; font-size:20px; line-height:1.3; }

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
 <h1>She didn't want to raid the fridge<br>in the middle of the night again.<br><strong>Her brain did.</strong></h1>
</div>

<!-- FRAME 2 - Single HO Claim -->
<div class="frame frame2">
 <div style="text-align:center;">Weight gain can begin<br>6–12 months post-injury<sup>2</sup>.</div>
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
.frame { position:absolute; inset:0; width:100%; height:100%; opacity:0; transition: opacity 0.6s ease-in-out; display:flex; flex-direction:column; justify-content:center; align-items:center; }

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
.frame1 h1 { font-weight:700; font-size:24px; line-height:1.2; text-shadow: 0 2px 8px rgba(0,0,0,0.5); }

.frame2 { background:#181050; animation: frame2cycle 12s infinite; color:#FFFFFF; text-align:center; font-size:22px; }

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
 <h1>She didn't want to raid the fridge<br>in the middle of the night again.<br><strong>Her brain did.</strong></h1>
</div>

<!-- FRAME 2 - Single HO Claim -->
<div class="frame frame2">
 <div style="text-align:center;">Early screening<br>is critical<sup>3</sup>.</div>
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

// Cinematic 3-frame banner options
export const DA_CINEMATIC_FOCUS = [
  { id: 'hcp-cinematic-injury', name: 'HO from Injury', description: 'HO results from hypothalamic injury', claim: 'HYPOTHALAMIC OBESITY (HO) results from hypothalamic injury¹.' },
  { id: 'hcp-cinematic-mc4r', name: 'MC4R Pathway', description: 'MC4R regulates hunger and satiety', claim: 'MC4R regulates hunger and satiety¹.' },
  { id: 'hcp-cinematic-hyperphagia', name: 'Hyperphagia Prevalence', description: '~70% of patients experience hyperphagia', claim: '~70% of patients with HO experience hyperphagia¹.' },
  { id: 'hcp-cinematic-weight-gain', name: 'Weight Gain Timeline', description: 'Weight gain begins 6-12 months post-injury', claim: 'Weight gain can begin 6–12 months post-injury².' },
  { id: 'hcp-cinematic-screening', name: 'Early Screening', description: 'Early screening is critical', claim: 'Early screening is critical³.' },
]
