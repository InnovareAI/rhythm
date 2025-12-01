/**
 * Disease Awareness Email Templates - Acquired Hypothalamic Obesity (aHO)
 * Unbranded HCP education content
 *
 * Template structure:
 * - Purple/teal header (NOT green)
 * - Hero block with brain imagery
 * - Educational content
 * - References block (NO ISI - this is disease education, not drug promotion)
 */

export interface DAEmailTemplate {
  html: string
  references: number[]
  approved: boolean
  lastUpdated: string
  audience: 'hcp'
  emailType: string
}

// Helper to generate template key
export function getDATemplateKey(emailType: string): string {
  return `hcp-${emailType}`
}

// Check if a template exists
export function hasDATemplate(emailType: string): boolean {
  const key = getDATemplateKey(emailType)
  return key in DA_EMAIL_TEMPLATES
}

// Get template by parameters
export function getDATemplate(emailType: string): DAEmailTemplate | null {
  const key = getDATemplateKey(emailType)
  return DA_EMAIL_TEMPLATES[key] || null
}

// CSS Styles - Purple/Teal theme
const CSS_STYLES = `<style>
  body { font-family: Arial, Helvetica, sans-serif; margin:0; padding:0; background:#ffffff; color:#4a4f55; }
  .brand-bar { background:#1a1652; padding:16px 20px; display:flex; justify-content:space-between; align-items:center; }
  .brand-bar .logo { display:flex; align-items:center; gap:10px; }
  .brand-bar .brain-icon { width:32px; height:32px; }
  .brand-bar .brand-text { color:#ffffff; font-size:16px; font-weight:bold; }
  .brand-bar span { color:#c9f1fe; font-size:13px; font-weight:500; }
  .brand-rule { height:4px; background:linear-gradient(to right, #1a1652, #00a7df); margin:0; }
  .hero { background:linear-gradient(135deg, #f9f2f8 0%, #c9f1fe 100%); padding:30px 20px; }
  .hero-card { background:#ffffff; border-radius:12px; padding:25px; max-width:600px; margin:0 auto; box-shadow:0 2px 6px rgba(26,22,82,0.12); }
  h1, h2 { color:#1a1652; }
  h1 { font-size:28px; margin-bottom:16px; }
  h2 { font-size:22px; margin-top:30px; }
  .cta { display:inline-block; background:linear-gradient(135deg, #1a1652, #00a7df); color:#ffffff; padding:12px 22px; border-radius:999px; text-decoration:none; font-size:15px; }
  .cta:hover { opacity:0.9; }
  ul { padding-left:20px; line-height:1.8; }
  li { margin-bottom:8px; }
  .refs { max-width:700px; margin:40px auto 0; padding:20px; font-size:12px; border-top:2px solid #00a7df; }
  .refs h3 { color:#1a1652; font-size:14px; margin-bottom:12px; }
  .disclaimer { max-width:700px; margin:20px auto; padding:20px; font-size:11px; color:#666; text-align:center; }
  .footer { background:#1a1652; color:#c9f1fe; padding:20px; text-align:center; font-size:12px; }
  sup { font-size:10px; }
</style>`

// References block (NOT ISI - this is disease education)
const REFERENCES_BLOCK = `<!-- References -->
<div class="refs">
  <h3>References</h3>
  <p style="line-height:1.6;">
    1. Lustig RH, et al. Hypothalamic obesity: causes, consequences, treatment. <em>Pediatr Endocrinol Rev.</em> 2008;6(2):220-227.<br>
    2. van Iersel L, et al. Hypothalamic obesity in children. <em>Endocr Rev.</em> 2019;40(2):531-556.<br>
    3. Müller HL, et al. Craniopharyngioma. <em>Nat Rev Dis Primers.</em> 2019;5(1):75.<br>
    4. Roth CL, et al. Hypothalamic obesity in craniopharyngioma patients. <em>J Clin Endocrinol Metab.</em> 2011;96(9):2854-2862.<br>
    5. Haqq AM, et al. Molecular and clinical aspects of hypothalamic obesity. <em>Obesity Reviews.</em> 2022;23(9):e13459.
  </p>
</div>
<div class="disclaimer">
  This information is intended for US healthcare professionals only and is provided for educational purposes.
</div>`

/**
 * Disease Awareness Email Templates
 */
export const DA_EMAIL_TEMPLATES: Record<string, DAEmailTemplate> = {
  // ==========================================
  // HCP - What is aHO (Disease Definition)
  // ==========================================
  'hcp-what-is-aho': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Understanding Acquired Hypothalamic Obesity (aHO)</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <div class="logo">
    <svg class="brain-icon" viewBox="0 0 24 24" fill="none" stroke="#00a7df" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
    <span class="brand-text">Different Obesity</span>
  </div>
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#00a7df; font-size:12px; font-weight:bold; letter-spacing:1px;">Disease Education</div>
    <h1>Not All Obesity Is the Same</h1>
    <p style="font-size:18px; color:#1a1652;">Acquired hypothalamic obesity (aHO) is a distinct form of obesity with a specific neurological origin that requires recognition and understanding.</p>
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>What Is Acquired Hypothalamic Obesity?</h2>
  <p>Acquired hypothalamic obesity (aHO) is caused by damage to the hypothalamus, the brain region that regulates hunger and energy balance.<sup>1,2</sup> Unlike common obesity, aHO has a specific neurological origin that distinguishes it from other forms of obesity.</p>

  <h2>Causes of Hypothalamic Damage</h2>
  <p>aHO can result from various forms of hypothalamic injury, including:<sup>2,3</sup></p>
  <ul>
    <li>Brain tumors such as craniopharyngioma</li>
    <li>Surgical removal of tumors affecting the hypothalamus</li>
    <li>Radiation therapy to the brain</li>
    <li>Traumatic brain injury</li>
    <li>Inflammatory conditions affecting the hypothalamus</li>
  </ul>

  <h2>The Hypothalamic Mechanism</h2>
  <p>The hypothalamus regulates hunger and energy balance through complex signaling pathways, including the MC4R pathway.<sup>1,4</sup> When the hypothalamus is damaged, normal hunger and satiety signals are disrupted, leading to:</p>
  <ul>
    <li>Severe, persistent hyperphagia (excessive hunger)</li>
    <li>Rapid weight gain following hypothalamic injury</li>
    <li>Difficulty responding to conventional weight management approaches</li>
  </ul>

  <h2>Recognizing aHO in Your Patients</h2>
  <p>Early recognition of aHO is key to appropriate patient management.<sup>2,5</sup> Consider aHO in patients presenting with:</p>
  <ul>
    <li>Rapid weight gain following hypothalamic injury or surgery</li>
    <li>History of craniopharyngioma or other hypothalamic tumors</li>
    <li>Uncontrollable hunger that does not respond to lifestyle modifications</li>
    <li>Obesity that developed after brain radiation therapy</li>
  </ul>

  <div style="text-align:center; margin-top:40px;">
    <a href="https://hcp.differentobesity.com/" class="cta">Learn More at DifferentObesity.com</a>
  </div>
</div>

${REFERENCES_BLOCK}

<!-- Footer -->
<div class="footer">
  © 2025 Disease Education Initiative
</div>

</body>
</html>`,
    references: [1, 2, 3, 4, 5],
    approved: true,
    lastUpdated: '2025-12-01',
    audience: 'hcp',
    emailType: 'what-is-aho',
  },

  // ==========================================
  // HCP - Mechanism (MC4R Pathway Education)
  // ==========================================
  'hcp-mechanism': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>The Hypothalamic Pathway in aHO</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <div class="logo">
    <svg class="brain-icon" viewBox="0 0 24 24" fill="none" stroke="#00a7df" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
    <span class="brand-text">Different Obesity</span>
  </div>
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#00a7df; font-size:12px; font-weight:bold; letter-spacing:1px;">Disease Education</div>
    <h1>It Starts in the Brain</h1>
    <p style="font-size:18px; color:#1a1652;">Understanding how hypothalamic damage disrupts the MC4R pathway and leads to severe, uncontrollable hunger.</p>
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>The Role of the Hypothalamus</h2>
  <p>The hypothalamus is the master regulator of hunger, satiety, and energy balance.<sup>1</sup> It receives signals about the body's nutritional status and coordinates appropriate responses to maintain energy homeostasis.</p>

  <h2>The MC4R Pathway</h2>
  <p>The melanocortin 4 receptor (MC4R) pathway plays a critical role in regulating hunger and satiety signals.<sup>1,4</sup> When functioning normally, this pathway:</p>
  <ul>
    <li>Responds to leptin signals indicating energy sufficiency</li>
    <li>Promotes feelings of satiety after eating</li>
    <li>Regulates energy expenditure</li>
    <li>Maintains appropriate body weight</li>
  </ul>

  <h2>What Happens When the Pathway Is Disrupted</h2>
  <p>Damage to the hypothalamus impairs MC4R pathway signaling, leading to:<sup>1,2,4</sup></p>
  <ul>
    <li>Loss of normal hunger and satiety regulation</li>
    <li>Persistent, severe hyperphagia that is difficult to control</li>
    <li>Reduced energy expenditure</li>
    <li>Rapid, progressive weight gain</li>
  </ul>

  <h2>Why Traditional Approaches Often Fail</h2>
  <p>Because aHO originates from neurological damage rather than lifestyle factors, patients often do not respond to conventional weight management strategies.<sup>2,5</sup> The impaired signaling means that even with dietary restriction, patients continue to experience intense hunger signals.</p>

  <div style="text-align:center; margin-top:40px;">
    <a href="https://hcp.differentobesity.com/" class="cta">Learn More at DifferentObesity.com</a>
  </div>
</div>

${REFERENCES_BLOCK}

<!-- Footer -->
<div class="footer">
  © 2025 Disease Education Initiative
</div>

</body>
</html>`,
    references: [1, 2, 4, 5],
    approved: true,
    lastUpdated: '2025-12-01',
    audience: 'hcp',
    emailType: 'mechanism',
  },

  // ==========================================
  // HCP - Recognition (Signs & Symptoms)
  // ==========================================
  'hcp-recognition': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Recognizing Acquired Hypothalamic Obesity</title>
${CSS_STYLES}
</head>
<body>

<!-- Brand Bar -->
<div class="brand-bar">
  <div class="logo">
    <svg class="brain-icon" viewBox="0 0 24 24" fill="none" stroke="#00a7df" stroke-width="1.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
    <span class="brand-text">Different Obesity</span>
  </div>
  <span>For U.S. Healthcare Professionals</span>
</div>
<div class="brand-rule"></div>

<!-- Hero -->
<div class="hero">
  <div class="hero-card">
    <div style="text-transform:uppercase; color:#00a7df; font-size:12px; font-weight:bold; letter-spacing:1px;">Disease Education</div>
    <h1>Recognize the Signs</h1>
    <p style="font-size:18px; color:#1a1652;">Early identification of acquired hypothalamic obesity is key to appropriate patient management and improved outcomes.</p>
  </div>
</div>

<!-- Main Content -->
<div style="max-width:700px; margin:40px auto; padding:0 20px;">
  <h2>Key Clinical Indicators</h2>
  <p>Consider aHO when evaluating patients who present with the following characteristics:<sup>2,3</sup></p>
  <ul>
    <li><strong>Rapid weight gain</strong> following hypothalamic injury, surgery, or radiation</li>
    <li><strong>Severe, persistent hyperphagia</strong> that is disproportionate to energy needs</li>
    <li><strong>History of craniopharyngioma</strong> or other hypothalamic tumors</li>
    <li><strong>Failure to respond</strong> to lifestyle modification and dietary interventions</li>
    <li><strong>Onset of obesity</strong> following brain radiation therapy</li>
  </ul>

  <h2>Patient History Red Flags</h2>
  <p>A thorough patient history can reveal important clues:<sup>2,5</sup></p>
  <ul>
    <li>Prior neurosurgery, especially involving the hypothalamic region</li>
    <li>Childhood brain tumor treatment</li>
    <li>Cranial radiation therapy</li>
    <li>Traumatic brain injury affecting the hypothalamus</li>
    <li>Sudden change in appetite and eating behavior following neurological event</li>
  </ul>

  <h2>Differentiating aHO from Common Obesity</h2>
  <p>Key distinguishing features of aHO include:<sup>1,5</sup></p>
  <ul>
    <li>Clear temporal relationship between hypothalamic injury and weight gain</li>
    <li>Hyperphagia that patients describe as uncontrollable</li>
    <li>Lack of response to interventions that typically work for common obesity</li>
    <li>Associated hypothalamic-pituitary hormone deficiencies</li>
  </ul>

  <div style="text-align:center; margin-top:40px;">
    <a href="https://hcp.differentobesity.com/" class="cta">Learn More at DifferentObesity.com</a>
  </div>
</div>

${REFERENCES_BLOCK}

<!-- Footer -->
<div class="footer">
  © 2025 Disease Education Initiative
</div>

</body>
</html>`,
    references: [1, 2, 3, 5],
    approved: true,
    lastUpdated: '2025-12-01',
    audience: 'hcp',
    emailType: 'recognition',
  },
}

// Email type options for Disease Awareness
export const DA_EMAIL_TYPES = [
  { id: 'what-is-aho', name: 'What is aHO' },
  { id: 'mechanism', name: 'The Hypothalamic Pathway' },
  { id: 'recognition', name: 'Recognizing aHO' },
]
