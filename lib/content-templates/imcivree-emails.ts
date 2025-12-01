/**
 * Pre-approved IMCIVREE Email Templates (CSS-based format)
 *
 * These templates match the ClientWriter GPT format:
 * - Teal header bar (#1c7b80)
 * - Hero block with image inside white card
 * - Body content with icons in bullet points
 * - Full ISI block
 *
 * Template Key Format: {audience}-{emailType}-{segment}
 */

export interface EmailTemplate {
  html: string
  references: number[]
  approved: boolean
  mlrId?: string
  lastUpdated: string
  audience: 'hcp' | 'patient'
  emailType: string
  segment?: string
}

// Helper to generate template key
export function getTemplateKey(audience: string, emailType: string, segment?: string): string {
  if (audience === 'patient') {
    return `patient-${emailType}`
  }
  return `hcp-${emailType}-${segment || 'aware'}`
}

// Check if a template exists
export function hasTemplate(audience: string, emailType: string, segment?: string): boolean {
  const key = getTemplateKey(audience, emailType, segment)
  return key in EMAIL_TEMPLATES
}

// Get template by parameters
export function getTemplate(audience: string, emailType: string, segment?: string): EmailTemplate | null {
  const key = getTemplateKey(audience, emailType, segment)
  return EMAIL_TEMPLATES[key] || null
}

// Hero images by email type
const HERO_IMAGES = {
  moa: 'https://www.imcivree.com/static/hcp-bbs-functional-mc4r-3e490b24a8f4f9bcc4ede22918fb38da.png',
  summary: 'https://www.imcivree.com/static/dosing-box-953935ca5e56951d5e90c73760348f8e.png',
  dosing: 'https://www.imcivree.com/static/hcp-bbs-dosing-chart-young-children-0287c959c1242bd92cc8832f0b0f0c42.png',
  efficacy: 'https://www.imcivree.com/static/hcp-bbs-functional-mc4r-3e490b24a8f4f9bcc4ede22918fb38da.png',
  patient: 'https://www.imcivree.com/static/dosing-box-953935ca5e56951d5e90c73760348f8e.png',
}

// Icons for bullet points
const ICONS = {
  learning: 'https://www.imcivree.com/static/learning-16a302a10874bd1676177c6ebe63cf9a.svg',
  deciding: 'https://www.imcivree.com/static/deciding-7d8ad39aafa2238baac466e8d01b8e67.svg',
}

// CSS Styles shared across all templates
// Updated to match official email template: white header, full-color logo, lime-green rule
const CSS_STYLES = `<style>
  body { font-family: Arial, Helvetica, sans-serif; margin:0; padding:0; background:#ffffff; color:#4a4f55; }
  .brand-bar { background:#ffffff; padding:16px 20px; display:flex; justify-content:space-between; align-items:center; }
  .brand-bar img { height:40px; }
  .brand-bar span { color:#007a80; font-size:13px; font-weight:600; letter-spacing:0.3px; }
  .brand-rule { height:4px; background:#84bd00; margin:0; }
  .hero { background:#f6fbfb; padding:30px 20px; }
  .hero-card { background:#ffffff; border-radius:12px; padding:25px; max-width:600px; margin:0 auto; box-shadow:0 2px 6px rgba(0,0,0,0.08); }
  h1, h2 { color:#007a80; }
  .cta { display:inline-block; background:#007a80; color:#ffffff; padding:12px 22px; border-radius:999px; text-decoration:none; font-size:15px; }
  .cta:hover { background:#00686d; }
  ul { padding-left:20px; }
  .refs, .isi { max-width:700px; margin:0 auto; padding:20px; font-size:13px; }
  .isi { background:#fafafa; border-top:4px solid #84bd00; margin-top:40px; }
  .isi h2 { font-size:18px; font-weight:bold; color:#007a80; margin-top:0; }
</style>`

// Full ISI block HTML
const ISI_BLOCK = `<!-- ISI -->
<div class="isi">
  <h2>Important Safety Information</h2>
  <p><strong>Indication</strong><br>
  IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).</p>

  <p><strong>Limitations of Use</strong><br>
  IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective:<br>
  Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity</p>

  <p><strong>Important Safety Information</strong><br>
  <strong>CONTRAINDICATIONS</strong><br>
  Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.</p>

  <p><strong>WARNINGS AND PRECAUTIONS</strong><br>
  Disturbance in Sexual Arousal: Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.<br>
  Depression and Suicidal Ideation: Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.<br>
  Hypersensitivity Reactions: Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.<br>
  Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi: Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.<br>
  Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants: IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.</p>

  <p><strong>ADVERSE REACTIONS</strong><br>
  Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection</p>

  <p><strong>USE IN SPECIFIC POPULATIONS</strong><br>
  Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.</p>

  <p>To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.<br>
  Please see the full Prescribing Information for additional Important Safety Information.</p>

  <p style="margin-top:20px; font-size:12px;">© 2025, Rhythm Pharmaceuticals, Inc. All rights reserved. Rhythm, IMCIVREE, and their logos are trademarks of Rhythm Pharmaceuticals, Inc.</p>
</div>`

/**
 * Pre-approved Email Templates
 */
export const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  // ==========================================
  // HCP MOA EMAILS
  // ==========================================
  'hcp-moa-champion': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Mechanism of Action</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Mechanism of Action</div>
    <h1>Understanding the MC4R Pathway in BBS</h1>
    <p>As a champion of IMCIVREE, you understand how critical it is to address the root cause of obesity in patients with Bardet-Biedl syndrome (BBS). Hunger and obesity in BBS originate in the brain due to impaired MC4R pathway signaling.<sup>1</sup></p>
    <img src="${HERO_IMAGES.moa}" alt="MC4R Pathway" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>IMCIVREE Targets a Root Cause</h2>
  <p>IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people with BBS.<sup>1</sup> The MC4R pathway plays a critical role in regulating hunger, satiety, and energy expenditure.<sup>1</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Hyperphagia in BBS is chronic, insatiable, and not a matter of willpower<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">BBS can cause early-onset obesity and constant, hard-to-control hunger from infancy<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">IMCIVREE helps address a root cause of obesity and hunger in BBS by activating the MC4R pathway<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Understanding the mechanism helps set appropriate expectations for patients and caregivers<sup>1</sup></li>
  </ul>

  <p>Share these key talking points with colleagues who may benefit from understanding this mechanism and how it impacts treatment decisions for patients with BBS.</p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/hcp/bbs/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  3. Forsythe E et al. Front Pediatr. 2018.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 3],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'moa',
    segment: 'champion'
  },

  'hcp-moa-aware': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Mechanism of Action</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Mechanism of Action</div>
    <h1>Target the Root Cause of Obesity in BBS</h1>
    <p>For patients with Bardet-Biedl syndrome (BBS), hunger and obesity come from the brain due to impaired MC4R pathway signaling.<sup>1</sup> Understanding this mechanism is essential to helping your patients achieve meaningful outcomes.</p>
    <img src="${HERO_IMAGES.moa}" alt="MC4R Pathway" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>How IMCIVREE Works</h2>
  <p>IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people with BBS.<sup>1</sup> The MC4R pathway regulates hunger, satiety, and energy expenditure—key factors in managing weight in BBS patients.<sup>1</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Hyperphagia in BBS is chronic and insatiable, not a behavioral issue<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">By targeting the MC4R pathway, IMCIVREE helps address a root cause of hunger and obesity<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Rhythm InTune provides personalized patient support throughout the treatment journey<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Understanding the mechanism can help improve conversations with patients and caregivers<sup>1</sup></li>
  </ul>

  <p>Ready to learn more about how IMCIVREE works and how our patient support program, Rhythm InTune, can help guide you and your patients through the treatment journey?</p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/hcp/bbs/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  3. Forsythe E et al. Front Pediatr. 2018.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 3],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'moa',
    segment: 'aware'
  },

  'hcp-moa-unaware': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Mechanism of Action</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Mechanism of Action</div>
    <h1>A New Approach to Treating Obesity in BBS</h1>
    <p>For patients with Bardet-Biedl syndrome (BBS), the root cause of obesity may not be what you think. Hunger and obesity in BBS originate in the brain due to impaired MC4R pathway signaling—not from lack of willpower or behavioral factors.<sup>1</sup></p>
    <img src="${HERO_IMAGES.moa}" alt="MC4R Pathway" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>Understanding the MC4R Pathway</h2>
  <p>The MC4R pathway plays a central role in regulating hunger, satiety, and energy expenditure.<sup>1</sup> In patients with BBS, this pathway is impaired, leading to hyperphagia—constant, insatiable hunger that traditional approaches cannot adequately address.<sup>1</sup></p>

  <p>IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people with BBS.<sup>1</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">BBS affects approximately 1 in 140,000 to 1 in 160,000 newborns in North America<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Hyperphagia in BBS typically begins in early childhood and persists throughout life<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">IMCIVREE works by activating the MC4R pathway to help reduce hunger and body weight<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Early intervention may help patients achieve better long-term outcomes<sup>1</sup></li>
  </ul>

  <p>Discover how targeting the MC4R pathway with IMCIVREE can make a meaningful difference for your patients with BBS.</p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/hcp/bbs/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  3. Forsythe E et al. Front Pediatr. 2018.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 3],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'moa',
    segment: 'unaware'
  },

  // ==========================================
  // HCP SUMMARY EMAILS
  // ==========================================
  'hcp-summary-champion': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Treatment Summary</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Treatment Summary</div>
    <h1>IMCIVREE: The First Targeted Treatment for BBS</h1>
    <p>As a champion of IMCIVREE, you know the difference a targeted treatment can make. IMCIVREE is the first and only FDA-approved treatment specifically designed to address the root cause of obesity in patients with Bardet-Biedl syndrome (BBS).<sup>1</sup></p>
    <img src="${HERO_IMAGES.summary}" alt="IMCIVREE Treatment" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>Key Points to Share</h2>
  <p>IMCIVREE targets the impaired MC4R pathway—the root cause of hyperphagia and obesity in BBS.<sup>1</sup> This mechanism-based approach offers patients a meaningful treatment option that addresses more than just symptoms.</p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">IMCIVREE is indicated for adults and pediatric patients aged 2 years and older with BBS<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Once-daily subcutaneous injection administered at home<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Rhythm InTune provides comprehensive patient support from enrollment through ongoing treatment<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Clinical studies showed significant reductions in body weight and hunger in patients with BBS<sup>1</sup></li>
  </ul>

  <p>Help spread the word about IMCIVREE to colleagues who may have patients with BBS who could benefit from a targeted treatment approach.</p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/hcp/bbs/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  3. Forsythe E et al. Front Pediatr. 2018.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 3],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'summary',
    segment: 'champion'
  },

  'hcp-summary-aware': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Treatment Summary</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Treatment Summary</div>
    <h1>A Targeted Approach to BBS Obesity</h1>
    <p>For your patients with Bardet-Biedl syndrome (BBS), there is now a treatment option that targets the root cause. IMCIVREE is the first and only FDA-approved treatment designed to address the impaired MC4R pathway in BBS.<sup>1</sup></p>
    <img src="${HERO_IMAGES.summary}" alt="IMCIVREE Treatment" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>IMCIVREE at a Glance</h2>
  <p>Unlike traditional approaches that focus on diet and exercise alone, IMCIVREE works by activating the MC4R pathway to help reduce hunger and body weight in patients with BBS.<sup>1</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Indicated for adults and pediatric patients aged 2 years and older with BBS<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Once-daily subcutaneous injection that can be administered at home<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Targets the impaired MC4R pathway—the root cause of hyperphagia in BBS<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Rhythm InTune provides personalized support for patients and caregivers<sup>1</sup></li>
  </ul>

  <p>Learn how IMCIVREE can help your patients with BBS achieve meaningful reductions in hunger and body weight.</p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/hcp/bbs/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  3. Forsythe E et al. Front Pediatr. 2018.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 3],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'summary',
    segment: 'aware'
  },

  'hcp-summary-unaware': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Treatment Summary</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Treatment Summary</div>
    <h1>Introducing IMCIVREE for BBS</h1>
    <p>Bardet-Biedl syndrome (BBS) is a rare genetic disorder that causes severe obesity and insatiable hunger. IMCIVREE is the first and only FDA-approved treatment specifically designed to target the root cause of obesity in BBS.<sup>1</sup></p>
    <img src="${HERO_IMAGES.summary}" alt="IMCIVREE Treatment" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>What You Need to Know</h2>
  <p>BBS affects approximately 1 in 140,000 to 1 in 160,000 newborns in North America.<sup>1</sup> For these patients, obesity is not a lifestyle issue—it's driven by an impaired MC4R pathway in the brain that causes chronic, insatiable hunger.<sup>1</sup></p>

  <p>IMCIVREE offers a targeted approach by activating the MC4R pathway to help reduce hunger and body weight.<sup>1</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">First and only FDA-approved treatment targeting MC4R pathway in BBS<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Indicated for adults and pediatric patients aged 2 years and older<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Once-daily subcutaneous injection administered at home<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Comprehensive patient support through Rhythm InTune<sup>1</sup></li>
  </ul>

  <p>Discover how IMCIVREE can provide a new treatment option for patients with BBS in your practice.</p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/hcp/bbs/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  3. Forsythe E et al. Front Pediatr. 2018.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 3],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'summary',
    segment: 'unaware'
  },

  // ==========================================
  // HCP DOSING EMAILS
  // ==========================================
  'hcp-dosing-champion': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Dosing Information</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Dosing Information</div>
    <h1>Dosing IMCIVREE: A Practical Guide</h1>
    <p>As an experienced prescriber of IMCIVREE, you understand the importance of proper dosing. This guide provides key information to share with colleagues and to support optimal patient outcomes.<sup>1</sup></p>
    <img src="${HERO_IMAGES.dosing}" alt="Dosing Chart" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>Dosing Recommendations</h2>
  <p>IMCIVREE is administered as a once-daily subcutaneous injection. The recommended starting and maintenance doses depend on patient age and weight.<sup>1</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;"><strong>Adults (≥18 years):</strong> Starting dose of 2 mg once daily; may increase to 3 mg if additional weight loss is needed<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;"><strong>Pediatric (12-17 years, ≥50 kg):</strong> Same as adult dosing<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;"><strong>Pediatric (6-11 years or &lt;50 kg):</strong> Weight-based dosing starting at 1 mg once daily<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;"><strong>Young Children (2-5 years):</strong> Weight-based dosing with careful titration<sup>1,4</sup></li>
  </ul>

  <h2>Administration Tips</h2>
  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Inject subcutaneously into the abdomen; rotate injection sites<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Administer at approximately the same time each day<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Rhythm InTune provides injection training and ongoing support<sup>1</sup></li>
  </ul>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/hcp/bbs/dosing/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  4. Argente J et al. Endocrine Society Annual Meeting Poster. 2022.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 4],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'dosing',
    segment: 'champion'
  },

  'hcp-dosing-aware': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Dosing Information</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Dosing Information</div>
    <h1>How to Dose IMCIVREE</h1>
    <p>Getting started with IMCIVREE is straightforward with age-appropriate dosing guidelines. This overview provides the key information you need to initiate treatment for patients with BBS.<sup>1</sup></p>
    <img src="${HERO_IMAGES.dosing}" alt="Dosing Chart" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>Dosing Overview</h2>
  <p>IMCIVREE is a once-daily subcutaneous injection with weight-based and age-based dosing recommendations designed to optimize efficacy while managing tolerability.<sup>1</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;"><strong>Adults:</strong> Start at 2 mg once daily; may titrate to 3 mg based on response<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;"><strong>Adolescents ≥50 kg:</strong> Follow adult dosing recommendations<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;"><strong>Pediatric &lt;50 kg:</strong> Weight-based dosing starting at 1 mg daily<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;"><strong>Ages 2-5:</strong> Lower starting doses with careful titration<sup>1,4</sup></li>
  </ul>

  <h2>Patient Support</h2>
  <p>Rhythm InTune provides comprehensive support including injection training, titration guidance, and ongoing patient education to help ensure treatment success.<sup>1</sup></p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/hcp/bbs/dosing/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  4. Argente J et al. Endocrine Society Annual Meeting Poster. 2022.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 4],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'dosing',
    segment: 'aware'
  },

  'hcp-dosing-unaware': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Dosing Information</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Dosing Information</div>
    <h1>IMCIVREE Dosing Made Simple</h1>
    <p>IMCIVREE offers a straightforward once-daily dosing regimen that can be administered at home. Learn how to get your patients with BBS started on treatment.<sup>1</sup></p>
    <img src="${HERO_IMAGES.dosing}" alt="Dosing Chart" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>Simple, Flexible Dosing</h2>
  <p>IMCIVREE is available in a multi-dose vial for subcutaneous injection. Dosing is based on age and weight, with clear titration guidelines to help optimize treatment.<sup>1</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Once-daily subcutaneous injection<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Can be self-administered at home after training<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Age-appropriate dosing for patients 2 years and older<sup>1,4</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Rhythm InTune provides injection training and ongoing support<sup>1</sup></li>
  </ul>

  <h2>Getting Started</h2>
  <p>The Rhythm InTune patient support program helps with enrollment, insurance navigation, and injection training to ensure a smooth start to treatment.<sup>1</sup></p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/hcp/bbs/dosing/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  4. Argente J et al. Endocrine Society Annual Meeting Poster. 2022.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 4],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'dosing',
    segment: 'unaware'
  },

  // ==========================================
  // HCP EFFICACY EMAILS
  // ==========================================
  'hcp-efficacy-champion': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Efficacy Data</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Clinical Efficacy</div>
    <h1>Proven Results in BBS Clinical Trials</h1>
    <p>The clinical data on IMCIVREE demonstrates meaningful weight loss and hunger reduction in patients with BBS. Share these results with colleagues to help expand treatment access.<sup>1</sup></p>
    <img src="${HERO_IMAGES.efficacy}" alt="Efficacy Data" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>Clinical Trial Results</h2>
  <p>In clinical studies, patients with BBS treated with IMCIVREE experienced significant reductions in body weight and improvements in hunger scores.<sup>1</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Patients achieved clinically meaningful weight loss with continued treatment<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Hunger scores improved, reflecting reduced hyperphagia<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Benefits were observed in both pediatric and adult patients<sup>1,4</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Long-term data shows sustained weight management with ongoing treatment<sup>1</sup></li>
  </ul>

  <h2>Real-World Impact</h2>
  <p>Beyond the clinical trial data, patients and caregivers report improvements in quality of life, including reduced food-seeking behaviors and improved relationships with food.<sup>1</sup></p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/hcp/bbs/efficacy/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  2. Gulati AK et al. Pediatrics. 2012.<br>
  4. Argente J et al. Endocrine Society Annual Meeting Poster. 2022.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 2, 4],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'efficacy',
    segment: 'champion'
  },

  'hcp-efficacy-aware': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Efficacy Data</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Clinical Efficacy</div>
    <h1>IMCIVREE Clinical Results in BBS</h1>
    <p>See how IMCIVREE performed in clinical trials for patients with Bardet-Biedl syndrome. The data demonstrates meaningful benefits in weight and hunger management.<sup>1</sup></p>
    <img src="${HERO_IMAGES.efficacy}" alt="Efficacy Data" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>What the Data Shows</h2>
  <p>Clinical trials evaluated IMCIVREE in patients with BBS, measuring changes in body weight and hunger using validated assessment tools.<sup>1</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Significant weight reduction observed in treated patients<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Improvements in hunger scores reflecting reduced hyperphagia<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Efficacy demonstrated across age groups from 2 years and older<sup>1,4</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Continued treatment associated with sustained benefits<sup>1</sup></li>
  </ul>

  <p>Understanding these results can help you set appropriate expectations with patients and caregivers about what IMCIVREE can achieve.</p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/hcp/bbs/efficacy/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  2. Gulati AK et al. Pediatrics. 2012.<br>
  4. Argente J et al. Endocrine Society Annual Meeting Poster. 2022.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 2, 4],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'efficacy',
    segment: 'aware'
  },

  'hcp-efficacy-unaware': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Efficacy Data</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Clinical Efficacy</div>
    <h1>Clinical Evidence for IMCIVREE</h1>
    <p>IMCIVREE has been studied in clinical trials specifically in patients with Bardet-Biedl syndrome. Learn about the evidence supporting its use in this rare condition.<sup>1</sup></p>
    <img src="${HERO_IMAGES.efficacy}" alt="Efficacy Data" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>Study Results</h2>
  <p>In clinical studies, patients with BBS who received IMCIVREE showed improvements in both weight and hunger—two key challenges faced by this patient population.<sup>1</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">IMCIVREE demonstrated weight reduction in patients with BBS<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Hunger scores improved during treatment<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Results observed in both children (≥2 years) and adults<sup>1,4</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">The first and only FDA-approved treatment targeting MC4R pathway in BBS<sup>1</sup></li>
  </ul>

  <p>For patients with BBS who have struggled with traditional weight management approaches, IMCIVREE offers a targeted treatment option backed by clinical evidence.</p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/hcp/bbs/efficacy/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  2. Gulati AK et al. Pediatrics. 2012.<br>
  4. Argente J et al. Endocrine Society Annual Meeting Poster. 2022.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 2, 4],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'efficacy',
    segment: 'unaware'
  },

  // ==========================================
  // PATIENT EMAILS
  // ==========================================
  'patient-getting-started': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Getting Started</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Patients and Caregivers</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Getting Started</div>
    <h1>Support for Beginning IMCIVREE Treatment</h1>
    <p>Starting a new treatment can feel overwhelming. Rhythm InTune is here to help you and your family every step of the way—from understanding your insurance to learning how to give injections at home.<sup>5</sup></p>
    <img src="${HERO_IMAGES.patient}" alt="Getting Started" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>What to Expect When Starting IMCIVREE</h2>
  <p>People starting IMCIVREE often work with their care team and Rhythm InTune to begin treatment with confidence. Injection training is offered, and caregivers or patients can learn step-by-step how to administer IMCIVREE at home.<sup>1,5</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Personalized support from Rhythm InTune to understand insurance and delivery logistics<sup>5</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Training resources to help patients and caregivers feel confident giving injections<sup>5</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Guidance on maintaining a consistent daily injection routine at home<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Ongoing support available by phone whenever you have questions<sup>5</sup></li>
  </ul>

  <p>The Rhythm InTune team is ready to help you get started on your IMCIVREE journey with personalized support tailored to your needs.</p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/bbs/getting-started/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  5. Grossman DC et al. JAMA. 2017.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 5],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'patient',
    emailType: 'getting-started'
  },

  'patient-what-to-expect': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – What to Expect</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Patients and Caregivers</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">What to Expect</div>
    <h1>Your IMCIVREE Treatment Journey</h1>
    <p>Understanding what happens during treatment can help you feel more prepared and confident. Here's what you and your family can expect as you start and continue with IMCIVREE.<sup>1</sup></p>
    <img src="${HERO_IMAGES.patient}" alt="What to Expect" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>During Treatment</h2>
  <p>IMCIVREE is a once-daily injection that you or a caregiver can give at home after training. Most people develop a routine and find it becomes a normal part of their day.<sup>1</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">You may start to notice changes in hunger after a few weeks of treatment<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Weight changes typically happen gradually over time<sup>1</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Some side effects like skin darkening or injection site reactions are common<sup>1</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Your care team will monitor your progress and adjust your dose as needed<sup>1</sup></li>
  </ul>

  <h2>Support Along the Way</h2>
  <p>Rhythm InTune is available to answer questions, provide resources, and help you stay on track with treatment. Don't hesitate to reach out when you need support.<sup>5</sup></p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/bbs/what-to-expect/" class="cta">Learn more</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  5. Grossman DC et al. JAMA. 2017.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 5],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'patient',
    emailType: 'what-to-expect'
  },

  'patient-support': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>IMCIVREE – Patient Support</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <img src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png" alt="IMCIVREE logo" />
  <span>For U.S. Patients and Caregivers</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#007a80; font-size:12px; font-weight:bold;">Patient Support</div>
    <h1>Rhythm InTune: Here for You</h1>
    <p>Living with BBS comes with unique challenges. Rhythm InTune provides personalized support to help you and your family navigate treatment and connect with resources.<sup>5</sup></p>
    <img src="${HERO_IMAGES.patient}" alt="Patient Support" style="width:100%; margin-top:20px; border-radius:8px;" />
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>What Rhythm InTune Offers</h2>
  <p>From the moment you're prescribed IMCIVREE, a dedicated team is ready to help with the practical and emotional aspects of treatment.<sup>5</sup></p>

  <ul>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Help understanding your insurance coverage and accessing IMCIVREE<sup>5</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Financial assistance programs for eligible patients<sup>5</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Injection training and educational resources<sup>5</sup></li>
    <li><img src="${ICONS.deciding}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Ongoing support and check-ins throughout treatment<sup>5</sup></li>
    <li><img src="${ICONS.learning}" width="18" alt="" style="vertical-align:middle;margin-right:6px;">Connection to the BBS community and patient resources<sup>5</sup></li>
  </ul>

  <h2>Get in Touch</h2>
  <p>Rhythm InTune support specialists are available to answer your questions and provide guidance. Whether you're just getting started or have been on treatment for a while, help is just a phone call away.<sup>5</sup></p>

  <p style="margin-top:30px;"><a href="https://www.imcivree.com/bbs/rhythm-intune/" class="cta">Contact Rhythm InTune</a></p>
</div>

<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>1. IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.<br>
  5. Grossman DC et al. JAMA. 2017.</p>
</div>

${ISI_BLOCK}

</body>
</html>`,
    references: [1, 5],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'patient',
    emailType: 'support'
  }
}
