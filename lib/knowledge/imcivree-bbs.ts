/**
 * IMCIVREE Knowledge Base for BBS (Bardet-Biedl Syndrome)
 *
 * This file contains all approved messaging, brand assets, and compliance content
 * for generating IMCIVREE marketing materials.
 */

// =============================================================================
// BRAND COLORS
// =============================================================================

export const BRAND_COLORS = {
  // Primary
  primaryGreen: '#97D700',  // Logo, data visualizations, primary accent

  // Secondary
  gray: '#4B4F54',          // Text, secondary elements
  gold: '#FFD100',          // Secondary accent
  spruce: '#007A8A',        // Teal, secondary

  // Email/Banner specific
  headerTeal: '#1c7b80',    // Top bars, headers
  primaryTeal: '#007a80',   // CTAs, headlines
  lightBg: '#f6fbfb',       // Light backgrounds
  isiBg: '#fafafa',         // ISI block background
  textGray: '#4a4f55',      // Body text

  // Banner gradient
  bannerGradientStart: '#0F7C8F',
  bannerGradientEnd: '#0C5F73',
  ctaGreen: '#8CD038',      // Banner CTA button
}

// =============================================================================
// TYPOGRAPHY
// =============================================================================

export const TYPOGRAPHY = {
  // Brand fonts
  primary: 'Jost',
  fallback: 'Verdana, Arial, sans-serif',

  // Email fonts (for compatibility)
  email: 'Arial, Helvetica, sans-serif',

  // Sizes (relative to 26pt headline base)
  headline: { size: '26pt', weight: 'bold', transform: 'uppercase' },
  subhead: { size: '14pt', weight: '600', transform: 'none' },
  body: { size: '10pt', weight: 'normal', transform: 'none' },
  footnotes: { size: '8pt', weight: 'normal', transform: 'none' },
}

// =============================================================================
// BRAND ASSETS - IMAGE URLs
// =============================================================================

export const IMAGES = {
  // Logos
  imcivreeLogo: 'https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png',

  // Hero images by email type
  heroImages: {
    moa: 'https://www.imcivree.com/static/hcp-bbs-functional-mc4r-3e490b24a8f4f9bcc4ede22918fb38da.png',
    summary: 'https://www.imcivree.com/static/dosing-box-953935ca5e56951d5e90c73760348f8e.png',
    dosing: 'https://www.imcivree.com/static/hcp-bbs-dosing-chart-young-children-0287c959c1242bd92cc8832f0b0f0c42.png',
    gettingStarted: 'https://www.imcivree.com/static/dosing-box-953935ca5e56951d5e90c73760348f8e.png',
  },

  // Icons
  icons: {
    learning: 'https://www.imcivree.com/static/learning-16a302a10874bd1676177c6ebe63cf9a.svg',
    deciding: 'https://www.imcivree.com/static/deciding-7d8ad39aafa2238baac466e8d01b8e67.svg',
    dosing: 'https://www.imcivree.com/static/dosing-box-953935ca5e56951d5e90c73760348f8e.png',
  },
}

// =============================================================================
// IMPORTANT SAFETY INFORMATION (ISI) - EXACT TEXT, DO NOT MODIFY
// =============================================================================

export const ISI = {
  indication: `IMCIVREE is indicated to reduce excess body weight and maintain weight reduction long term in adults and pediatric patients aged 2 years and older with syndromic or monogenic obesity due to Bardet-Biedl syndrome (BBS).`,

  limitationsOfUse: `IMCIVREE is not indicated for the treatment of patients with the following conditions as IMCIVREE would not be expected to be effective:
Other types of obesity not related to BBS or other FDA-approved indications for IMCIVREE, including obesity associated with other genetic syndromes and general (polygenic) obesity`,

  contraindications: `Prior serious hypersensitivity to setmelanotide or any of the excipients in IMCIVREE. Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.`,

  warningsAndPrecautions: {
    sexualArousal: `Disturbance in Sexual Arousal: Spontaneous penile erections in males and sexual adverse reactions in females have occurred. Inform patients that these events may occur and instruct patients who have an erection lasting longer than 4 hours to seek emergency medical attention.`,

    depression: `Depression and Suicidal Ideation: Depression, suicidal ideation, and depressed mood have occurred. Monitor patients for new onset or worsening depression or suicidal thoughts or behaviors. Consider discontinuing IMCIVREE if patients experience suicidal thoughts or behaviors, or clinically significant or persistent depression symptoms occur.`,

    hypersensitivity: `Hypersensitivity Reactions: Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported. If suspected, advise patients to promptly seek medical attention and discontinue IMCIVREE.`,

    skinPigmentation: `Skin Hyperpigmentation, Darkening of Pre-existing Nevi, and Development of New Melanocytic Nevi: Perform a full body skin examination prior to initiation and periodically during treatment to monitor pre-existing and new pigmentary lesions.`,

    benzylAlcohol: `Risk of Serious Adverse Reactions Due to Benzyl Alcohol Preservative in Neonates and Low Birth Weight Infants: IMCIVREE is not approved for use in neonates or infants. Serious and fatal adverse reactions including "gasping syndrome" can occur in neonates and low birth weight infants treated with benzyl alcohol-preserved drugs.`,
  },

  adverseReactions: `Most common adverse reactions (incidence ≥20%) included skin hyperpigmentation, injection site reactions, nausea, headache, diarrhea, abdominal pain, vomiting, depression, and spontaneous penile erection`,

  useInSpecificPopulations: `Treatment with IMCIVREE is not recommended when breastfeeding. Discontinue IMCIVREE when pregnancy is recognized unless the benefits of therapy outweigh the potential risks to the fetus.`,

  reporting: `To report SUSPECTED ADVERSE REACTIONS, contact Rhythm Pharmaceuticals at 833-789-6337 or FDA at 1-800-FDA-1088 or www.fda.gov/medwatch.`,

  seeFullPI: `Please see the full Prescribing Information for additional Important Safety Information.`,

  // Full ISI block for emails/banners
  get fullISI() {
    return `Important Safety Information

Indication
${this.indication}

Limitations of Use
${this.limitationsOfUse}

CONTRAINDICATIONS
${this.contraindications}

WARNINGS AND PRECAUTIONS
${this.warningsAndPrecautions.sexualArousal}
${this.warningsAndPrecautions.depression}
${this.warningsAndPrecautions.hypersensitivity}
${this.warningsAndPrecautions.skinPigmentation}
${this.warningsAndPrecautions.benzylAlcohol}

ADVERSE REACTIONS
${this.adverseReactions}

USE IN SPECIFIC POPULATIONS
${this.useInSpecificPopulations}

${this.reporting}
${this.seeFullPI}`;
  },

  // Short ISI for banners (scrolling)
  shortISI: `Important Safety Information
CONTRAINDICATIONS
Prior serious hypersensitivity to setmelanotide or any excipients in IMCIVREE® (setmelanotide). Serious hypersensitivity reactions (e.g., anaphylaxis) have been reported.`,
}

// =============================================================================
// MESSAGE BANK - APPROVED MESSAGING ONLY
// =============================================================================

export const MESSAGE_BANK = {
  // Disease problem statements
  diseaseProblem: {
    hcp: [
      'Hyperphagia in BBS is chronic and insatiable',
      'Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling',
      'BBS can cause early-onset obesity and constant, hard-to-control hunger',
    ],
    patient: [
      'Hunger in BBS is chronic and hard to control',
      'BBS hunger comes from the brain due to impaired MC4R pathway signaling',
    ],
  },

  // MC4R Pathway
  mc4rPathway: [
    'Hunger and obesity in BBS come from the brain due to impaired MC4R pathway signaling',
    'The MC4R pathway regulates hunger, satiety, and energy expenditure',
    'BBS gene variants can disrupt MC4R pathway signaling',
  ],

  // Product introduction
  productIntro: [
    'IMCIVREE is the first and only FDA-approved treatment targeting the impaired MC4R pathway in people with BBS',
    'IMCIVREE is the first and only PRECISION MEDICINE to target impairment of the hypothalamic MC4R pathway',
  ],

  // Efficacy - Weight
  efficacyWeight: {
    hcp: [
      'Adults experienced steady and meaningful weight loss over 1 year, and additional loss over 2 years',
      'IMCIVREE reduced BMI and weight across young children, older children, and adults with BBS',
      'Meaningful weight reduction typically begins within 6–8 weeks',
    ],
    patient: [
      'IMCIVREE reduced BMI and weight across children and adults with BBS',
      'Meaningful weight reduction typically begins within 6–8 weeks',
    ],
  },

  // Efficacy - Hunger
  efficacyHunger: [
    'IMCIVREE reduced hunger early and continuously',
    'Hunger returns quickly when treatment is stopped',
  ],

  // Treatment expectations
  treatmentExpectations: [
    'Staying on IMCIVREE is important to maintain long-term reductions in hunger and weight',
    'Skin darkening stabilizes after the first month',
    'Meaningful weight reduction typically begins within 6–8 weeks',
  ],

  // Support
  support: [
    'Rhythm InTune provides personalized support for caregivers and people living with BBS',
  ],
}

// =============================================================================
// EMAIL TYPES
// =============================================================================

export const EMAIL_TYPES = {
  hcp: [
    { id: 'moa', name: 'Mechanism of Action', description: 'Explain how IMCIVREE works' },
    { id: 'summary', name: 'Clinical Summary', description: 'Overview of clinical data' },
    { id: 'dosing', name: 'Dosing Information', description: 'Dosing and administration details' },
    { id: 'efficacy', name: 'Efficacy Data', description: 'Weight and hunger reduction results' },
  ],
  patient: [
    { id: 'getting-started', name: 'Getting Started', description: 'Beginning the IMCIVREE journey' },
    { id: 'what-to-expect', name: 'What to Expect', description: 'Treatment expectations and timeline' },
    { id: 'support', name: 'Support Resources', description: 'Rhythm InTune and caregiver support' },
  ],
}

// =============================================================================
// BANNER FRAME STRUCTURE
// =============================================================================

export const BANNER_FRAMES = {
  hcp: {
    frame1: {
      topic: 'Disease Problem',
      headlines: MESSAGE_BANK.diseaseProblem.hcp,
    },
    frame2: {
      topic: 'MC4R Pathway',
      headlines: MESSAGE_BANK.mc4rPathway,
    },
    frame3: {
      topic: 'Product Introduction',
      headlines: MESSAGE_BANK.productIntro,
    },
    frame4: {
      topic: 'Efficacy',
      headlines: [...MESSAGE_BANK.efficacyWeight.hcp, ...MESSAGE_BANK.efficacyHunger],
    },
    frame5: {
      topic: 'Treatment Expectations + CTA',
      headlines: MESSAGE_BANK.treatmentExpectations,
      cta: 'Learn more',
      support: MESSAGE_BANK.support[0],
    },
  },
  patient: {
    frame1: {
      topic: 'Disease Problem',
      headlines: MESSAGE_BANK.diseaseProblem.patient,
    },
    frame2: {
      topic: 'MC4R Pathway',
      headlines: MESSAGE_BANK.mc4rPathway,
    },
    frame3: {
      topic: 'Product Introduction',
      headlines: MESSAGE_BANK.productIntro,
    },
    frame4: {
      topic: 'Efficacy',
      headlines: MESSAGE_BANK.efficacyWeight.patient,
    },
    frame5: {
      topic: 'Treatment Expectations + CTA',
      headlines: MESSAGE_BANK.treatmentExpectations,
      cta: 'Learn more',
      support: MESSAGE_BANK.support[0],
    },
  },
}

// =============================================================================
// BANNER IMAGE PROMPT TEMPLATE
// =============================================================================

export const BANNER_IMAGE_PROMPT_TEMPLATE = (variation: string = '') =>
  `IMCIVREE teal gradient background, floating circular bubbles, soft shadow, modern medical aesthetic, high contrast, mobile-first layout, open space for headline text, no drug vials or packaging${variation ? ', ' + variation : ''}`;

// =============================================================================
// LINKS
// =============================================================================

export const LINKS = {
  hcpSite: 'https://www.imcivree.com/hcp/bbs/',
  patientSite: 'https://www.imcivree.com/bbs/',
  gettingStarted: 'https://www.imcivree.com/bbs/getting-started/',
  prescribingInfo: 'https://www.imcivree.com/prescribing-information/',
  rhythmInTune: 'https://www.imcivree.com/rhythm-intune/',
}

// =============================================================================
// FOOTER / SIGN-OFF
// =============================================================================

export const FOOTER = {
  copyright: '© 2025, Rhythm Pharmaceuticals, Inc. All rights reserved.',
  trademark: 'Rhythm, IMCIVREE, and their logos are trademarks of Rhythm Pharmaceuticals, Inc.',
  full: '© 2025, Rhythm Pharmaceuticals, Inc. All rights reserved. Rhythm, IMCIVREE, and their logos are trademarks of Rhythm Pharmaceuticals, Inc.',
}

// =============================================================================
// OFFICIAL VERIFIED REFERENCES - USE ONLY THESE, NEVER INVENT REFERENCES
// =============================================================================

export const REFERENCES = {
  // Master list of ALL approved references
  all: {
    1: 'IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.',
    2: 'Haqq AM, et al. Lancet Diabetes Endocrinol. 2022;10(12):859-868.',
    3: 'Data on file. Rhythm Pharmaceuticals, Inc.',
  },

  // Which claims map to which references - STRICT MAPPING
  claimToReference: {
    // Indication claims → Reference 1 (PI)
    'FDA-approved': '1',
    'first and only': '1',
    'ages 2 years and older': '1',
    'pediatric patients': '1',
    'adults': '1',
    'BBS indication': '1',
    'reduce excess body weight': '1',
    'maintain weight reduction': '1',

    // Efficacy claims → Reference 1,2
    'weight loss': '1,2',
    'weight reduction': '1,2',
    'BMI reduction': '1,2',
    'meaningful weight reduction': '1,2',
    '6-8 weeks': '1',
    'hunger reduction': '1,2',

    // Clinical trial data → Reference 2
    'clinical trial': '2',
    'study results': '2',
    'patients in trial': '2',

    // MOA claims → Reference 1
    'MC4R pathway': '1',
    'mechanism of action': '1',
    'hypothalamic': '1',

    // Data on file → Reference 3
    'internal data': '3',
    'real-world': '3',
  },

  // Formatted reference block for emails
  formattedBlock: `<strong>References:</strong><br>
1. IMCIVREE (setmelanotide) [prescribing information]. Boston, MA: Rhythm Pharmaceuticals, Inc.<br>
2. Haqq AM, et al. Lancet Diabetes Endocrinol. 2022;10(12):859-868.<br>
3. Data on file. Rhythm Pharmaceuticals, Inc.`,
}
