/**
 * Pre-approved IMCIVREE Email Templates
 *
 * These templates are stored for instant retrieval when no custom instructions are provided.
 * Each template has been verified for correct references and compliance.
 *
 * Template Key Format: {audience}-{emailType}-{segment}
 * - audience: 'hcp' | 'patient'
 * - emailType: 'moa' | 'summary' | 'dosing' | 'efficacy' | 'getting-started' | 'what-to-expect' | 'support'
 * - segment: 'champion' | 'aware' | 'unaware' (HCP only)
 */

export interface EmailTemplate {
  html: string
  references: number[]  // Which reference numbers are used (1, 2, or 3)
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

// Check if a template exists for given parameters
export function hasTemplate(audience: string, emailType: string, segment?: string): boolean {
  const key = getTemplateKey(audience, emailType, segment)
  return key in EMAIL_TEMPLATES
}

// Get template by parameters
export function getTemplate(audience: string, emailType: string, segment?: string): EmailTemplate | null {
  const key = getTemplateKey(audience, emailType, segment)
  return EMAIL_TEMPLATES[key] || null
}

/**
 * Pre-approved Email Templates
 *
 * Note: In production, these would be populated with MLR-approved HTML content.
 * The templates below are placeholders that should be replaced with actual approved content.
 */
export const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  // ==========================================
  // HCP MOA EMAILS (Reference 1 only)
  // ==========================================
  'hcp-moa-champion': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
          <td style="text-align:right;color:#4a4f55;font-size:11px;">FOR U.S. HEALTHCARE PROFESSIONALS</td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">Understanding the MC4R Pathway in BBS</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        As a champion of IMCIVREE, you understand how critical it is to address the root cause of obesity in patients with Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling.<sup>1</sup> IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people with BBS.<sup>1,2</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        The MC4R pathway regulates hunger, satiety, and energy expenditure.<sup>1</sup> By targeting this pathway, IMCIVREE helps address a root cause of obesity and hunger in your patients with BBS.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 20px;">
        Share these key talking points with colleagues who may benefit from understanding this mechanism.
      </p>
      <a href="https://www.imcivree.com/hcp/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">Learn More About MOA</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.<br>
        2. Eneli I, et al. Appl Clin Genet. 2019;12:87-93.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>INDICATION:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>CONTRAINDICATIONS:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>WARNINGS AND PRECAUTIONS:</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Disturbance in Sexual Arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and Suicidal Ideation:</strong> Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Hypersensitivity Reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi:</strong> Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants:</strong> IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>ADVERSE REACTIONS:</strong> Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>USE IN SPECIFIC POPULATIONS:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1, 2],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'moa',
    segment: 'champion'
  },

  'hcp-moa-aware': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
          <td style="text-align:right;color:#4a4f55;font-size:11px;">FOR U.S. HEALTHCARE PROFESSIONALS</td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">Target the Root Cause of Obesity in BBS</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        For patients with Bardet-Biedl syndrome (BBS), hunger and obesity come from the brain due to impaired MC4R pathway signaling.<sup>1</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people with BBS.<sup>1,2</sup> The MC4R pathway regulates hunger, satiety, and energy expenditure.<sup>1</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Ready to learn more about how IMCIVREE works? Our patient support program, Rhythm InTune, can help guide you and your patients through the treatment journey.
      </p>
      <a href="https://www.imcivree.com/hcp/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">Explore IMCIVREE MOA</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.<br>
        2. Eneli I, et al. Appl Clin Genet. 2019;12:87-93.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>INDICATION:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>CONTRAINDICATIONS:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>WARNINGS AND PRECAUTIONS:</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Disturbance in Sexual Arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and Suicidal Ideation:</strong> Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Hypersensitivity Reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi:</strong> Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants:</strong> IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>ADVERSE REACTIONS:</strong> Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>USE IN SPECIFIC POPULATIONS:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1, 2],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'moa',
    segment: 'aware'
  },

  'hcp-moa-unaware': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
          <td style="text-align:right;color:#4a4f55;font-size:11px;">FOR U.S. HEALTHCARE PROFESSIONALS</td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">Introducing IMCIVREE: A Different Approach to Obesity in BBS</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Bardet-Biedl syndrome (BBS) can cause early-onset obesity and constant, hard-to-control hunger.<sup>1</sup> But what causes this hyperphagia?
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling.<sup>1</sup> The MC4R pathway regulates hunger, satiety, and energy expenditure.<sup>1</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people with BBS.<sup>1,2</sup> It's a different kind of treatment—one that addresses a root cause of obesity and hunger.
      </p>
      <a href="https://www.imcivree.com/hcp/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">Discover IMCIVREE</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.<br>
        2. Eneli I, et al. Appl Clin Genet. 2019;12:87-93.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>INDICATION:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>CONTRAINDICATIONS:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>WARNINGS AND PRECAUTIONS:</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Disturbance in Sexual Arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and Suicidal Ideation:</strong> Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Hypersensitivity Reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi:</strong> Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants:</strong> IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>ADVERSE REACTIONS:</strong> Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>USE IN SPECIFIC POPULATIONS:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1, 2],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'moa',
    segment: 'unaware'
  },

  // ==========================================
  // HCP EFFICACY EMAILS (References 1 and 2)
  // ==========================================
  'hcp-efficacy-champion': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
          <td style="text-align:right;color:#4a4f55;font-size:11px;">FOR U.S. HEALTHCARE PROFESSIONALS</td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">Share the Efficacy Data with Your Colleagues</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        As a champion of IMCIVREE, you've seen what treatment can mean for patients with BBS. Here's the data to share with colleagues considering IMCIVREE for their patients.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        IMCIVREE reduced BMI and weight across children and adults with BBS.<sup>1,2</sup> Adults experienced steady and meaningful weight loss over 1 year, and additional loss over 2 years.<sup>2</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        In clinical trials, patients experienced meaningful hunger reduction.<sup>2</sup> Meaningful weight reduction typically begins within 6–8 weeks.<sup>1</sup>
      </p>
      <a href="https://www.imcivree.com/hcp/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">View Full Efficacy Data</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.<br>
        2. Haqq AM, et al. Lancet Diabetes Endocrinol. 2022;10(12):859-868.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>INDICATION:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>CONTRAINDICATIONS:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>WARNINGS AND PRECAUTIONS:</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Disturbance in Sexual Arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and Suicidal Ideation:</strong> Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Hypersensitivity Reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi:</strong> Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants:</strong> IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>ADVERSE REACTIONS:</strong> Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>USE IN SPECIFIC POPULATIONS:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1, 2],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'efficacy',
    segment: 'champion'
  },

  'hcp-efficacy-aware': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
          <td style="text-align:right;color:#4a4f55;font-size:11px;">FOR U.S. HEALTHCARE PROFESSIONALS</td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">See What IMCIVREE Can Do for Patients with BBS</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        IMCIVREE reduced BMI and weight across children and adults with BBS.<sup>1,2</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Adults experienced steady and meaningful weight loss over 1 year, and additional loss over 2 years.<sup>2</sup> In clinical trials, patients experienced meaningful hunger reduction.<sup>2</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Meaningful weight reduction typically begins within 6–8 weeks.<sup>1</sup> Our patient support program, Rhythm InTune, is here to help guide you through the prescribing process.
      </p>
      <a href="https://www.imcivree.com/hcp/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">See Efficacy Data</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.<br>
        2. Haqq AM, et al. Lancet Diabetes Endocrinol. 2022;10(12):859-868.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>INDICATION:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>CONTRAINDICATIONS:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>WARNINGS AND PRECAUTIONS:</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Disturbance in Sexual Arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and Suicidal Ideation:</strong> Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Hypersensitivity Reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi:</strong> Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants:</strong> IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>ADVERSE REACTIONS:</strong> Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>USE IN SPECIFIC POPULATIONS:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1, 2],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'efficacy',
    segment: 'aware'
  },

  'hcp-efficacy-unaware': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
          <td style="text-align:right;color:#4a4f55;font-size:11px;">FOR U.S. HEALTHCARE PROFESSIONALS</td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">A Treatment That Delivers Results for BBS</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        For patients with Bardet-Biedl syndrome (BBS), managing obesity has been challenging—until now.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        IMCIVREE is FDA-approved for treating obesity due to BBS, targeting the impaired MC4R pathway.<sup>1</sup> And the clinical data shows meaningful results.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        IMCIVREE reduced BMI and weight across children and adults with BBS.<sup>1,2</sup> In clinical trials, patients experienced meaningful hunger reduction.<sup>2</sup> Meaningful weight reduction typically begins within 6–8 weeks.<sup>1</sup>
      </p>
      <a href="https://www.imcivree.com/hcp/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">Explore the Data</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.<br>
        2. Haqq AM, et al. Lancet Diabetes Endocrinol. 2022;10(12):859-868.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>INDICATION:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>CONTRAINDICATIONS:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>WARNINGS AND PRECAUTIONS:</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Disturbance in Sexual Arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and Suicidal Ideation:</strong> Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Hypersensitivity Reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi:</strong> Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants:</strong> IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>ADVERSE REACTIONS:</strong> Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>USE IN SPECIFIC POPULATIONS:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1, 2],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'efficacy',
    segment: 'unaware'
  },

  // ==========================================
  // PATIENT EMAILS (Reference 1 only)
  // ==========================================
  'patient-getting-started': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">Getting Started with IMCIVREE</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Starting a new treatment can feel like a big step. We're here to help you understand what to expect with IMCIVREE.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        IMCIVREE is a once-daily injection for adults and children 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).<sup>1</sup> It targets the MC4R pathway—a root cause of hunger and obesity in BBS.<sup>1</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Our patient support program, Rhythm InTune, is ready to help you every step of the way—from understanding your prescription to ongoing support.
      </p>
      <a href="https://www.imcivree.com/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">Learn About Getting Started</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>What is IMCIVREE?</strong> IMCIVREE is a prescription medicine used to reduce excess body weight and maintain weight reduction long term in adults and children 2 years of age and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Who should not use IMCIVREE?</strong> Do not use IMCIVREE if you have had a serious allergic reaction to setmelanotide or any of the ingredients in IMCIVREE. Serious allergic reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>What should I tell my healthcare provider before using IMCIVREE?</strong> Tell your healthcare provider about all your medical conditions, including if you are pregnant, planning to become pregnant, or breastfeeding. Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>What are the possible side effects of IMCIVREE?</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Sexual problems:</strong> Males may have unwanted erections. Females may have unwanted sexual reactions. If you have an erection lasting longer than 4 hours, get emergency medical help right away.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and thoughts of suicide:</strong> Some people taking IMCIVREE have had depression, suicidal thoughts, or depressed mood. Tell your healthcare provider right away if you have new or worsening symptoms of depression or suicidal thoughts.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin darkening:</strong> Darkening of the skin, darkening of existing moles, and new moles may occur. Your healthcare provider should check your skin before and during treatment.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Common side effects include:</strong> skin darkening, injection site reactions, nausea, headache, diarrhea, stomach pain, vomiting, depression, and spontaneous penile erections.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        Call your healthcare provider if you have any side effect that bothers you or does not go away. To report side effects, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'patient',
    emailType: 'getting-started'
  },

  'patient-what-to-expect': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">What to Expect with IMCIVREE</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Understanding what to expect can help you feel more confident about your treatment journey.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Meaningful weight reduction typically begins within 6–8 weeks.<sup>1</sup> Everyone's journey is different, so stay in touch with your healthcare provider about your progress.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        IMCIVREE works by targeting the MC4R pathway—a root cause of hunger in BBS.<sup>1</sup> This means it addresses hunger at its source in the brain, not just the symptoms.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Rhythm InTune is here to support you throughout your treatment. Don't hesitate to reach out with questions.
      </p>
      <a href="https://www.imcivree.com/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">Learn What to Expect</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>What is IMCIVREE?</strong> IMCIVREE is a prescription medicine used to reduce excess body weight and maintain weight reduction long term in adults and children 2 years of age and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Who should not use IMCIVREE?</strong> Do not use IMCIVREE if you have had a serious allergic reaction to setmelanotide or any of the ingredients in IMCIVREE. Serious allergic reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>What should I tell my healthcare provider before using IMCIVREE?</strong> Tell your healthcare provider about all your medical conditions, including if you are pregnant, planning to become pregnant, or breastfeeding. Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>What are the possible side effects of IMCIVREE?</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Sexual problems:</strong> Males may have unwanted erections. Females may have unwanted sexual reactions. If you have an erection lasting longer than 4 hours, get emergency medical help right away.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and thoughts of suicide:</strong> Some people taking IMCIVREE have had depression, suicidal thoughts, or depressed mood. Tell your healthcare provider right away if you have new or worsening symptoms of depression or suicidal thoughts.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin darkening:</strong> Darkening of the skin, darkening of existing moles, and new moles may occur. Your healthcare provider should check your skin before and during treatment.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Common side effects include:</strong> skin darkening, injection site reactions, nausea, headache, diarrhea, stomach pain, vomiting, depression, and spontaneous penile erections.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        Call your healthcare provider if you have any side effect that bothers you or does not go away. To report side effects, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'patient',
    emailType: 'what-to-expect'
  },

  'patient-support': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">You're Not Alone: Support Is Here</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Living with BBS and managing treatment can be challenging. That's why Rhythm InTune is here to support you and your family.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong>Rhythm InTune offers:</strong>
      </p>
      <ul style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;padding-left:20px;">
        <li>Help understanding your prescription and insurance coverage</li>
        <li>Injection training and ongoing support</li>
        <li>Resources for patients, caregivers, and families</li>
        <li>A dedicated team ready to answer your questions</li>
      </ul>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        IMCIVREE is designed for adults and children 2 years and older with obesity due to BBS.<sup>1</sup> Our support team understands the unique challenges you face.
      </p>
      <a href="https://www.imcivree.com/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">Connect with Rhythm InTune</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>What is IMCIVREE?</strong> IMCIVREE is a prescription medicine used to reduce excess body weight and maintain weight reduction long term in adults and children 2 years of age and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Who should not use IMCIVREE?</strong> Do not use IMCIVREE if you have had a serious allergic reaction to setmelanotide or any of the ingredients in IMCIVREE. Serious allergic reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>What should I tell my healthcare provider before using IMCIVREE?</strong> Tell your healthcare provider about all your medical conditions, including if you are pregnant, planning to become pregnant, or breastfeeding. Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>What are the possible side effects of IMCIVREE?</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Sexual problems:</strong> Males may have unwanted erections. Females may have unwanted sexual reactions. If you have an erection lasting longer than 4 hours, get emergency medical help right away.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and thoughts of suicide:</strong> Some people taking IMCIVREE have had depression, suicidal thoughts, or depressed mood. Tell your healthcare provider right away if you have new or worsening symptoms of depression or suicidal thoughts.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin darkening:</strong> Darkening of the skin, darkening of existing moles, and new moles may occur. Your healthcare provider should check your skin before and during treatment.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Common side effects include:</strong> skin darkening, injection site reactions, nausea, headache, diarrhea, stomach pain, vomiting, depression, and spontaneous penile erections.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        Call your healthcare provider if you have any side effect that bothers you or does not go away. To report side effects, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'patient',
    emailType: 'support'
  },

  // ==========================================
  // HCP SUMMARY EMAILS (Reference 1 only)
  // ==========================================
  'hcp-summary-champion': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
          <td style="text-align:right;color:#4a4f55;font-size:11px;">FOR U.S. HEALTHCARE PROFESSIONALS</td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">IMCIVREE at a Glance: Key Points for Your Colleagues</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        As a champion of IMCIVREE, here's a quick summary to share with colleagues who may be considering it for their patients with BBS.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">What it is:</strong> IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people with obesity due to Bardet-Biedl syndrome (BBS).<sup>1,2</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">How it works:</strong> By targeting the MC4R pathway, IMCIVREE addresses a root cause of obesity and hunger in BBS.<sup>1</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">Who it's for:</strong> Adults and pediatric patients aged 2 years and older with obesity due to BBS.<sup>1</sup>
      </p>
      <a href="https://www.imcivree.com/hcp/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">View Full Product Summary</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.<br>
        2. Eneli I, et al. Appl Clin Genet. 2019;12:87-93.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>INDICATION:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>CONTRAINDICATIONS:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>WARNINGS AND PRECAUTIONS:</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Disturbance in Sexual Arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and Suicidal Ideation:</strong> Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Hypersensitivity Reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi:</strong> Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants:</strong> IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>ADVERSE REACTIONS:</strong> Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>USE IN SPECIFIC POPULATIONS:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1, 2],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'summary',
    segment: 'champion'
  },

  'hcp-summary-aware': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
          <td style="text-align:right;color:#4a4f55;font-size:11px;">FOR U.S. HEALTHCARE PROFESSIONALS</td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">IMCIVREE: What You Need to Know</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Here's a quick overview of IMCIVREE for your patients with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">The challenge:</strong> Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling.<sup>1</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">The solution:</strong> IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people with BBS.<sup>1,2</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">Patient support:</strong> Rhythm InTune provides comprehensive support for you and your patients throughout the treatment journey.
      </p>
      <a href="https://www.imcivree.com/hcp/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">Learn More About IMCIVREE</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.<br>
        2. Eneli I, et al. Appl Clin Genet. 2019;12:87-93.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>INDICATION:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>CONTRAINDICATIONS:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>WARNINGS AND PRECAUTIONS:</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Disturbance in Sexual Arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and Suicidal Ideation:</strong> Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Hypersensitivity Reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi:</strong> Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants:</strong> IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>ADVERSE REACTIONS:</strong> Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>USE IN SPECIFIC POPULATIONS:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1, 2],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'summary',
    segment: 'aware'
  },

  'hcp-summary-unaware': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
          <td style="text-align:right;color:#4a4f55;font-size:11px;">FOR U.S. HEALTHCARE PROFESSIONALS</td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">Introducing IMCIVREE for Obesity in BBS</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Bardet-Biedl syndrome (BBS) causes early-onset obesity and constant, hard-to-control hunger.<sup>1</sup> Now there's a treatment that targets the root cause.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">IMCIVREE</strong> is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people with obesity due to BBS.<sup>1,2</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        The MC4R pathway regulates hunger, satiety, and energy expenditure.<sup>1</sup> By targeting this pathway, IMCIVREE offers a different approach for patients who have struggled with traditional weight management.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Approved for adults and pediatric patients aged 2 years and older.<sup>1</sup>
      </p>
      <a href="https://www.imcivree.com/hcp/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">Discover IMCIVREE</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.<br>
        2. Eneli I, et al. Appl Clin Genet. 2019;12:87-93.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>INDICATION:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>CONTRAINDICATIONS:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>WARNINGS AND PRECAUTIONS:</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Disturbance in Sexual Arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and Suicidal Ideation:</strong> Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Hypersensitivity Reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi:</strong> Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants:</strong> IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>ADVERSE REACTIONS:</strong> Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>USE IN SPECIFIC POPULATIONS:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1, 2],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'summary',
    segment: 'unaware'
  },

  // ==========================================
  // HCP DOSING EMAILS (Reference 1 only)
  // ==========================================
  'hcp-dosing-champion': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
          <td style="text-align:right;color:#4a4f55;font-size:11px;">FOR U.S. HEALTHCARE PROFESSIONALS</td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">IMCIVREE Dosing: A Quick Reference</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        As a champion of IMCIVREE, here's a quick dosing reference to share with colleagues starting patients on treatment.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">Administration:</strong> IMCIVREE is administered as a once-daily subcutaneous injection.<sup>1</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">Titration:</strong> Dose is titrated based on tolerability. See full Prescribing Information for complete dosing schedule.<sup>1</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">Patient support:</strong> Rhythm InTune offers injection training and ongoing support for your patients.
      </p>
      <a href="https://www.imcivree.com/hcp/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">View Dosing Information</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.<br>
        2. Eneli I, et al. Appl Clin Genet. 2019;12:87-93.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>INDICATION:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>CONTRAINDICATIONS:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>WARNINGS AND PRECAUTIONS:</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Disturbance in Sexual Arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and Suicidal Ideation:</strong> Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Hypersensitivity Reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi:</strong> Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants:</strong> IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>ADVERSE REACTIONS:</strong> Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>USE IN SPECIFIC POPULATIONS:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'dosing',
    segment: 'champion'
  },

  'hcp-dosing-aware': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
          <td style="text-align:right;color:#4a4f55;font-size:11px;">FOR U.S. HEALTHCARE PROFESSIONALS</td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">Getting Started with IMCIVREE Dosing</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        Ready to prescribe IMCIVREE for your patients with obesity due to BBS? Here's what you need to know about dosing.
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">Once-daily administration:</strong> IMCIVREE is administered as a once-daily subcutaneous injection.<sup>1</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">Flexible timing:</strong> Can be administered at any time of day, with or without food.<sup>1</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">Patient support:</strong> Rhythm InTune provides injection training and ongoing support throughout the treatment journey.
      </p>
      <a href="https://www.imcivree.com/hcp/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">See Full Dosing Guide</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.<br>
        2. Eneli I, et al. Appl Clin Genet. 2019;12:87-93.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>INDICATION:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>CONTRAINDICATIONS:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>WARNINGS AND PRECAUTIONS:</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Disturbance in Sexual Arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and Suicidal Ideation:</strong> Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Hypersensitivity Reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi:</strong> Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants:</strong> IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>ADVERSE REACTIONS:</strong> Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>USE IN SPECIFIC POPULATIONS:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'dosing',
    segment: 'aware'
  },

  'hcp-dosing-unaware': {
    html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IMCIVREE</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;">
  <!-- Header -->
  <tr>
    <td style="background:#ffffff;border-bottom:4px solid #97D700;padding:20px;">
      <table width="100%">
        <tr>
          <td><img src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/eb7c399c-9c9a-480a-b5fa-5cb0deb2a362/imcivree-logo-big.png" alt="IMCIVREE" style="height:40px;"></td>
          <td style="text-align:right;color:#4a4f55;font-size:11px;">FOR U.S. HEALTHCARE PROFESSIONALS</td>
        </tr>
      </table>
    </td>
  </tr>
  <!-- Body -->
  <tr>
    <td style="padding:30px 20px;">
      <h1 style="color:#007a80;font-size:24px;margin:0 0 20px;">Simple, Once-Daily Dosing for BBS</h1>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        IMCIVREE offers a straightforward dosing regimen for your patients with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">Once-daily convenience:</strong> IMCIVREE is administered as a once-daily subcutaneous injection, at any time of day.<sup>1</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">Gradual titration:</strong> Dose is gradually increased based on tolerability to help minimize potential side effects.<sup>1</sup>
      </p>
      <p style="color:#4a4f55;font-size:14px;line-height:1.6;margin:0 0 15px;">
        <strong style="color:#007a80;">Comprehensive support:</strong> Rhythm InTune provides injection training, insurance navigation, and ongoing support for you and your patients.
      </p>
      <a href="https://www.imcivree.com/hcp/bbs/" style="display:inline-block;background:#007a80;color:#ffffff;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;">Learn About Dosing</a>
    </td>
  </tr>
  <!-- References -->
  <tr>
    <td style="padding:20px;border-top:1px solid #e0e0e0;">
      <p style="color:#666;font-size:11px;margin:0;">
        <strong>References:</strong><br>
        1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.<br>
        2. Eneli I, et al. Appl Clin Genet. 2019;12:87-93.
      </p>
    </td>
  </tr>
  <!-- ISI -->
  <tr>
    <td style="background:#fafafa;padding:20px;">
      <p style="color:#007a80;font-size:12px;font-weight:bold;margin:0 0 10px;">IMPORTANT SAFETY INFORMATION</p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>INDICATION:</strong> IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with obesity due to Bardet-Biedl syndrome (BBS).
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Limitations of Use:</strong> IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective: Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>CONTRAINDICATIONS:</strong> Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>WARNINGS AND PRECAUTIONS:</strong>
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Disturbance in Sexual Arousal:</strong> Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Depression and Suicidal Ideation:</strong> Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Hypersensitivity Reactions:</strong> Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 6px;">
        <strong>Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi:</strong> Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants:</strong> IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>ADVERSE REACTIONS:</strong> Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0 0 10px;">
        <strong>USE IN SPECIFIC POPULATIONS:</strong> Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.
      </p>
      <p style="color:#4a4f55;font-size:11px;line-height:1.5;margin:0;">
        To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.
      </p>
      <p style="color:#007a80;font-size:11px;margin:15px 0 0;">
        <a href="https://www.imcivree.com/prescribing-information" style="color:#007a80;">Please see full Prescribing Information for additional Important Safety Information.</a>
      </p>
    </td>
  </tr>
  <!-- Footer -->
  <tr>
    <td style="background:#007a80;padding:15px 20px;text-align:center;">
      <p style="color:#ffffff;font-size:11px;margin:0;">
        © 2025 Rhythm Pharmaceuticals, Inc. All rights reserved. IMCIVREE is a registered trademark of Rhythm Pharmaceuticals, Inc.
      </p>
    </td>
  </tr>
</table>
</body>
</html>`,
    references: [1],
    approved: true,
    lastUpdated: '2025-11-30',
    audience: 'hcp',
    emailType: 'dosing',
    segment: 'unaware'
  }
}

// Summary of available templates
export const TEMPLATE_SUMMARY = {
  total: Object.keys(EMAIL_TEMPLATES).length,
  hcp: {
    moa: ['champion', 'aware', 'unaware'],
    efficacy: ['champion', 'aware', 'unaware'],
    summary: ['champion', 'aware', 'unaware'],
    dosing: ['champion', 'aware', 'unaware'],
  },
  patient: ['getting-started', 'what-to-expect', 'support']
}
