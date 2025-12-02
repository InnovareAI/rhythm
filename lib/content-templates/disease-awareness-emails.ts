/**
 * Disease Awareness Email Templates - Acquired Hypothalamic Obesity (HO)
 * Unbranded HCP education content matching ChatGPT GPT specifications
 *
 * CRITICAL REQUIREMENTS:
 * 1. Brand Bar: HO Navy #181050 background with LOGO_PLACEHOLDER
 * 2. Hero Section: #F8F0F8 background with white card
 * 3. Montserrat font for all headings
 * 4. CTA Button: Magenta #A00868 with rounded corners
 * 5. References: Full 26-reference master list (only cited refs)
 * 6. Unsubscribe link: MANDATORY after References
 * 7. Footer: MANDATORY with copyright and US-DSE-2500011 (03.08/2025)
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
  return emailType.startsWith('hcp-') ? emailType : `hcp-${emailType}`
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

// Base CSS Styles matching ChatGPT GPT specifications
const BASE_STYLES = `
  body { font-family: Arial, sans-serif; margin:0; padding:0; }
  .brand-bar { background:#181050; color:white; padding:12px 20px; display:flex; justify-content:space-between; align-items:center; }
  .hero { background:#F8F0F8; padding:40px 20px; display:flex; justify-content:center; }
  .hero-card { background:white; max-width:600px; width:100%; padding:30px; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center; }
  .hero-card h1 { font-family: Montserrat, sans-serif; font-weight:700; text-transform:uppercase; font-size:24px; margin-bottom:16px; color:#181050; }
  .content { max-width:700px; margin:40px auto; padding:0 20px; }
  h2, h3 { font-family: Montserrat, sans-serif; font-weight:600; color:#181050; }
  h2 { font-size:22px; margin-top:30px; }
  h3 { font-size:18px; margin-top:24px; }
  p { line-height:1.6; color:#4a4f55; }
  ul { padding-left:20px; line-height:1.8; }
  li { margin-bottom:8px; }
  .cta { text-align:center; margin:40px 0; }
  .cta a { background:#A00868; color:white; padding:14px 28px; border-radius:10px; text-decoration:none; font-weight:bold; display:inline-block; }
  .cta a:hover { background:#7a0550; }
  .refs { background:#f4f4f4; padding:30px 20px; margin-top:40px; }
  .refs h3 { color:#181050; font-size:16px; margin-bottom:16px; }
  .refs ol { font-size:12px; line-height:1.6; color:#4a4f55; }
  .unsubscribe { text-align:center; padding:20px; }
  .unsubscribe a { color:#A00868; text-decoration:none; font-size:14px; }
  .footer { background:#f4f4f4; text-align:center; padding:30px 20px; font-size:11px; color:#666; }
`

/**
 * Disease Awareness Email Templates
 */
export const DA_EMAIL_TEMPLATES: Record<string, DAEmailTemplate> = {
  // ==========================================
  // HCP - What is HO (Disease Definition)
  // ==========================================
  'hcp-what-is-aho': {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
${BASE_STYLES}
</style>
</head>
<body>
<div class="brand-bar">
 <div style="font-family:Montserrat,sans-serif;font-weight:700;font-size:16px;color:white;">DifferentObesity<span style="color:#A00868;">.com</span></div>
 <div style="font-size:12px;">FOR U.S. HEALTHCARE PROFESSIONALS</div>
</div>

<div class="hero">
 <div class="hero-card">
   <div style="font-size:12px; letter-spacing:1px; text-transform:uppercase; color:#A00868; font-weight:600;">Understanding HO</div>
   <h1>ACQUIRED HYPOTHALAMIC OBESITY</h1>
   <p>Hypothalamic obesity (HO) results from hypothalamic injury¹ and is distinct from general obesity². Early recognition may help clinicians respond proactively³.</p>
   <img src="https://ho.differentobesity.com/static/abf3feb55c2097b1dbeb8bf58c2c8469/79277/learn-about-ho.jpg" style="width:100%; margin-top:20px; border-radius:8px;" alt="Learn about HO" />
 </div>
</div>

<div class="content">
 <h2>Why HO Develops</h2>
 <p>Hypothalamic damage can impair MC4R pathway signaling¹, contributing to disrupted hunger and energy balance. MC4R helps regulate appetite⁴.</p>
 <img src="https://ho.differentobesity.com/static/85e77f1e48d9987556918b1bb42ccc0a/ae416/more-food-now.jpg" style="width:100%; border-radius:8px; margin:20px 0;" alt="Brain mechanism" />

 <h3>Clinical Features</h3>
 <p>HO often presents with hyperphagia and reduced energy expenditure⁵. Approximately 70% of individuals experience hyperphagia⁶.</p>

 <h2>Who to Screen</h2>
 <p>Screening is critical⁷, especially in patients with a history of tumor treatment, TBI, inflammation, or stroke⁷.</p>

 <h2>Burden on Patients & Families</h2>
 <p>HO contributes to long-term burden⁸, and hyperphagia can increase caregiver challenges⁹. Families may benefit from structured education and support¹⁰.</p>

 <div class="cta">
   <a href="https://hcp.differentobesity.com/">Learn more about HO</a>
 </div>
</div>

<div class="refs">
 <h3>References</h3>
 <ol>
   <li>Abuzzahab MJ, Roth CL, Shoemaker AH. Hypothalamic obesity: prologue and promise. Horm Res Paediatr. 2019;91(2):128-136. doi:10.1159/000496564</li>
   <li>Roth CL. Hypothalamic obesity in patients with craniopharyngioma: profound changes of several weight regulatory circuits. Front Endocrinol (Lausanne). 2011;2:49. doi:10.3389/fendo.2011.00049</li>
   <li>Rose SR, Horne VE, Bingham N, Jenkins T, Black J, Inge T. Hypothalamic obesity: 4 years of the International Registry of Hypothalamic Obesity Disorders. Obesity (Silver Spring). 2018;26(11):1727-1732. doi:10.1002/oby.22315</li>
   <li>Timper K, Brünjng JC. Hypothalamic circuits regulating appetite and energy homeostasis: pathways to obesity. Dis Model Mech. 2017;10(6):679-689. doi:10.1242/dmm.026609</li>
   <li>van Santen HM, van Schaik J, van Roessel IMAA, Beckhuas J, Boehnke F, Müller HL. Diagnostic criteria for the hypothalamic syndrome in childhood. Eur J Endocrinol. 2023;188(2):ivad009. doi:10.1093/ejendo/ivad009</li>
   <li>van Iersel L, Brokke KE, Adan RAH, Bulthuis LCM, van den Akker ELT, van Santen HM. Pathophysiology and individualized treatment of hypothalamic obesity following craniopharyngioma and other suprasellar tumors: a systematic review. Endocr Rev. 2019;40(1):193-235. doi:10.1210/er.2018-00017</li>
   <li>Roth CL. Hypothalamic obesity in craniopharyngioma patients: disturbed energy homeostasis related to extent of hypothalamic damage and its implication for obesity intervention. J Clin Med. 2015;4(9):1774-1797. doi:10.3390/jcm4091774</li>
   <li>Craven M, Crowley JH, Chiang L, et al. Patient-relevant outcomes and health-related quality of life in patients with craniopharyngioma: a systematic review. Front Endocrinol. 2022;13:876770. doi:10.3389/fendo.2022.876770</li>
   <li>Kayadjanian N, Hsu EA, Wood AM, Carson DS. Caregiver burden associated with hyperphagia in hypothalamic obesity: a systematic review. J Clin Endocrinol Metab. 2023;109(1):e76-e87. doi:10.1210/clinem/dgad488</li>
   <li>Müller HL. Childhood craniopharyngioma: current controversies on management in diagnostics, treatment and follow-up. Expert Rev Neurother. 2010;10(4):515-524. doi:10.1586/ern.10.15</li>
 </ol>
</div>

<div class="unsubscribe">
  <a href="#">Unsubscribe from email</a>
</div>

<div class="footer">
  © 2025. Rhythm Pharmaceuticals, Inc. All rights reserved.<br>
  Rhythm and its logo are trademarks of Rhythm Pharmaceuticals, Inc.<br>
  US-DSE-2500011 (03.08/2025)
</div>

</body>
</html>`,
    references: [1, 2, 8, 10, 5, 6, 7, 14, 13],
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
<style>
${BASE_STYLES}
</style>
</head>
<body>
<div class="brand-bar">
 <div style="font-family:Montserrat,sans-serif;font-weight:700;font-size:16px;color:white;">DifferentObesity<span style="color:#A00868;">.com</span></div>
 <div style="font-size:12px;">FOR U.S. HEALTHCARE PROFESSIONALS</div>
</div>

<div class="hero">
 <div class="hero-card">
   <div style="font-size:12px; letter-spacing:1px; text-transform:uppercase; color:#A00868; font-weight:600;">Understanding the Pathway</div>
   <h1>THE HYPOTHALAMIC MC4R PATHWAY</h1>
   <p>Understanding how hypothalamic damage disrupts MC4R pathway signaling¹ and leads to severe, uncontrollable hyperphagia² in HO patients.</p>
   <img src="https://ho.differentobesity.com/static/abf3feb55c2097b1dbeb8bf58c2c8469/79277/learn-about-ho.jpg" style="width:100%; margin-top:20px; border-radius:8px;" alt="Understanding HO" />
 </div>
</div>

<div class="content">
 <h2>The Role of the Hypothalamus</h2>
 <p>The hypothalamus is the master regulator of hunger, satiety, and energy balance³. It receives signals about the body's nutritional status and coordinates appropriate responses to maintain energy homeostasis.</p>

 <img src="https://ho.differentobesity.com/static/85e77f1e48d9987556918b1bb42ccc0a/ae416/more-food-now.jpg" style="width:100%; border-radius:8px; margin:20px 0;" alt="MC4R pathway in brain" />

 <h2>The MC4R Pathway</h2>
 <p>The melanocortin 4 receptor (MC4R) pathway plays a critical role in regulating hunger and satiety signals³. When functioning normally, this pathway helps regulate appetite and energy expenditure.</p>

 <h3>What Happens When the Pathway Is Disrupted</h3>
 <p>Damage to the hypothalamus impairs MC4R pathway signaling¹, leading to:</p>
 <ul>
   <li>Loss of normal hunger and satiety regulation</li>
   <li>Persistent, severe hyperphagia that is difficult to control²</li>
   <li>Reduced energy expenditure⁴</li>
   <li>Rapid, progressive weight gain⁴</li>
 </ul>

 <h2>Why Traditional Approaches Often Fail</h2>
 <p>Because HO originates from neurological damage rather than lifestyle factors, patients often do not respond to conventional weight management strategies⁵. The impaired signaling means that even with dietary restriction, patients continue to experience intense hunger signals.</p>

 <div class="cta">
   <a href="https://hcp.differentobesity.com/">Learn more about HO</a>
 </div>
</div>

<div class="refs">
 <h3>References</h3>
 <ol>
   <li>Abuzzahab MJ, Roth CL, Shoemaker AH. Hypothalamic obesity: prologue and promise. Horm Res Paediatr. 2019;91(2):128-136. doi:10.1159/000496564</li>
   <li>Roth CL. Hypothalamic obesity in patients with craniopharyngioma: profound changes of several weight regulatory circuits. Front Endocrinol (Lausanne). 2011;2:49. doi:10.3389/fendo.2011.00049</li>
   <li>Timper K, Brünjng JC. Hypothalamic circuits regulating appetite and energy homeostasis: pathways to obesity. Dis Model Mech. 2017;10(6):679-689. doi:10.1242/dmm.026609</li>
   <li>van Santen HM, van Schaik J, van Roessel IMAA, Beckhuas J, Boehnke F, Müller HL. Diagnostic criteria for the hypothalamic syndrome in childhood. Eur J Endocrinol. 2023;188(2):ivad009. doi:10.1093/ejendo/ivad009</li>
   <li>van Iersel L, Brokke KE, Adan RAH, Bulthuis LCM, van den Akker ELT, van Santen HM. Pathophysiology and individualized treatment of hypothalamic obesity following craniopharyngioma and other suprasellar tumors: a systematic review. Endocr Rev. 2019;40(1):193-235. doi:10.1210/er.2018-00017</li>
 </ol>
</div>

<div class="unsubscribe">
  <a href="#">Unsubscribe from email</a>
</div>

<div class="footer">
  © 2025. Rhythm Pharmaceuticals, Inc. All rights reserved.<br>
  Rhythm and its logo are trademarks of Rhythm Pharmaceuticals, Inc.<br>
  US-DSE-2500011 (03.08/2025)
</div>

</body>
</html>`,
    references: [1, 2, 10, 5, 6],
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
<style>
${BASE_STYLES}
</style>
</head>
<body>
<div class="brand-bar">
 <div style="font-family:Montserrat,sans-serif;font-weight:700;font-size:16px;color:white;">DifferentObesity<span style="color:#A00868;">.com</span></div>
 <div style="font-size:12px;">FOR U.S. HEALTHCARE PROFESSIONALS</div>
</div>

<div class="hero">
 <div class="hero-card">
   <div style="font-size:12px; letter-spacing:1px; text-transform:uppercase; color:#A00868; font-weight:600;">Clinical Recognition</div>
   <h1>RECOGNIZING HYPOTHALAMIC OBESITY</h1>
   <p>Early identification of hypothalamic obesity is critical for appropriate patient management¹. Screening is essential in at-risk populations².</p>
   <img src="https://ho.differentobesity.com/static/abf3feb55c2097b1dbeb8bf58c2c8469/79277/learn-about-ho.jpg" style="width:100%; margin-top:20px; border-radius:8px;" alt="Recognizing HO" />
 </div>
</div>

<div class="content">
 <h2>Key Clinical Indicators</h2>
 <p>Consider HO when evaluating patients who present with the following characteristics:</p>
 <ul>
   <li><strong>Rapid weight gain</strong> following hypothalamic injury, surgery, or radiation³</li>
   <li><strong>Severe, persistent hyperphagia</strong> that is disproportionate to energy needs⁴</li>
   <li><strong>History of craniopharyngioma</strong> or other hypothalamic tumors⁵</li>
   <li><strong>Failure to respond</strong> to lifestyle modification and dietary interventions⁶</li>
   <li><strong>Onset of obesity</strong> following brain radiation therapy or TBI¹</li>
 </ul>

 <img src="https://ho.differentobesity.com/static/85e77f1e48d9987556918b1bb42ccc0a/ae416/more-food-now.jpg" style="width:100%; border-radius:8px; margin:20px 0;" alt="Clinical recognition" />

 <h2>Patient History Red Flags</h2>
 <p>A thorough patient history can reveal important clues:</p>
 <ul>
   <li>Prior neurosurgery, especially involving the hypothalamic region</li>
   <li>Childhood brain tumor treatment</li>
   <li>Cranial radiation therapy</li>
   <li>Traumatic brain injury affecting the hypothalamus</li>
   <li>Sudden change in appetite and eating behavior following neurological event</li>
 </ul>

 <h2>Differentiating HO from Common Obesity</h2>
 <p>Key distinguishing features of HO include¹:</p>
 <ul>
   <li>Clear temporal relationship between hypothalamic injury and weight gain³</li>
   <li>Hyperphagia that patients describe as uncontrollable⁴</li>
   <li>Lack of response to interventions that typically work for common obesity⁶</li>
   <li>Associated hypothalamic-pituitary hormone deficiencies</li>
 </ul>

 <div class="cta">
   <a href="https://hcp.differentobesity.com/">Learn more about HO</a>
 </div>
</div>

<div class="refs">
 <h3>References</h3>
 <ol>
   <li>Abuzzahab MJ, Roth CL, Shoemaker AH. Hypothalamic obesity: prologue and promise. Horm Res Paediatr. 2019;91(2):128-136. doi:10.1159/000496564</li>
   <li>Roth CL. Hypothalamic obesity in craniopharyngioma patients: disturbed energy homeostasis related to extent of hypothalamic damage and its implication for obesity intervention. J Clin Med. 2015;4(9):1774-1797. doi:10.3390/jcm4091774</li>
   <li>Rose SR, Horne VE, Bingham N, Jenkins T, Black J, Inge T. Hypothalamic obesity: 4 years of the International Registry of Hypothalamic Obesity Disorders. Obesity (Silver Spring). 2018;26(11):1727-1732. doi:10.1002/oby.22315</li>
   <li>Roth CL. Hypothalamic obesity in patients with craniopharyngioma: profound changes of several weight regulatory circuits. Front Endocrinol (Lausanne). 2011;2:49. doi:10.3389/fendo.2011.00049</li>
   <li>Lustig RH. Hypothalamic obesity after craniopharyngioma: mechanisms, diagnosis, and treatment. Front Endocrinol (Lausanne). 2011;2:60. doi:10.3389/fendo.2011.00060</li>
   <li>van Iersel L, Brokke KE, Adan RAH, Bulthuis LCM, van den Akker ELT, van Santen HM. Pathophysiology and individualized treatment of hypothalamic obesity following craniopharyngioma and other suprasellar tumors: a systematic review. Endocr Rev. 2019;40(1):193-235. doi:10.1210/er.2018-00017</li>
 </ol>
</div>

<div class="unsubscribe">
  <a href="#">Unsubscribe from email</a>
</div>

<div class="footer">
  © 2025. Rhythm Pharmaceuticals, Inc. All rights reserved.<br>
  Rhythm and its logo are trademarks of Rhythm Pharmaceuticals, Inc.<br>
  US-DSE-2500011 (03.08/2025)
</div>

</body>
</html>`,
    references: [1, 7, 8, 2, 9, 6],
    approved: true,
    lastUpdated: '2025-12-01',
    audience: 'hcp',
    emailType: 'recognition',
  },
}

// Email type options for Disease Awareness
export const DA_EMAIL_TYPES = [
  { id: 'hcp-what-is-aho', name: 'What is HO', description: 'Introduction to acquired hypothalamic obesity' },
  { id: 'hcp-mechanism', name: 'The Hypothalamic Pathway', description: 'Understanding the MC4R pathway and hyperphagia' },
  { id: 'hcp-recognition', name: 'Recognizing HO', description: 'Clinical signs and patient identification' },
]
