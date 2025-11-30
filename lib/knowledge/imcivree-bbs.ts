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
  imcivreeLogoWhite: '/images/imcivree-logo-white.png', // For teal/dark backgrounds

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
// OFFICIAL VERIFIED REFERENCES - CVA 2025 APPROVED (US-SET-2200068 - 08.01/2025)
// =============================================================================

export const REFERENCES = {
  // Master list of ALL 60 approved references from CVA 2025
  all: {
    1: 'IMCIVREE [prescribing information]. Boston, MA. Rhythm Pharmaceuticals, Inc.',
    2: 'Eneli I et al. Appl Clin Genet. 2019;12:87-93. doi:10.2147/TACG.S199092',
    3: 'Hampl SE et al. Pediatrics. 2023;151(2):e2022060640. doi:10.1542/peds.2022-060640',
    4: 'Manara E et al. Ital J Pediatr. 2019;45(1):72. doi:10.1186/s13052-019-0659-1',
    5: 'Huvenne H et al. Obes Facts. 2016;9(3):158-173. doi:10.1159/000445061',
    6: 'Tondt J et al. Obesity Algorithm. 2023. https://obesitymedicine.org/obesity-algorithm',
    7: 'Kalinderi K et al. Children. 2024;11(2):153. doi:10.3390/children11020153',
    8: 'Blaess S et al. J Clin Invest. 2021;131(8):e148903. doi:10.1172/JCI148903',
    9: 'Seo S et al. Hum Mol Genet. 2009;18(7):1323-1331. doi:10.1093/hmg/ddp031',
    10: 'Haqq AM et al. Child Obes. 2021;17(4):229-240. doi:10.1089/chi.2021.0003',
    11: 'Espel-Huynh HM et al. Obes Sci Pract. 2018;4(3):238-249. doi:10.1002/osp4.161',
    12: 'Tanajewski et al. Food Qual Prefer. 2023;109:104889. doi:0.1016/j.foodqual.2023.104889',
    13: 'NIH. Symptoms and Causes of Binge Eating Disorder. https://www.niddk.nih.gov',
    14: 'Summerfield SB et al. Obesity (Silver Spring). 2014;22(suppl 1):S1-S17. doi:10.1002/oby.20646',
    15: 'Forsythe E et al. Orphanet J Rare Dis. 2023;18(1):12. doi:10.1186/s13023-023-02723-4',
    16: 'Ervin C et al. Adv Ther. 2023;40(5):2394-2411. doi:10.1007/s12325-023-02443-y',
    17: 'Sherafat-Kazemzadeh R et al. Pediatr Obes. 2013;8(5):e64-e67. doi:10.1111/j.2047-6310.2013.00182.x',
    18: 'Forsythe E et al. Front Pediatr. 2018;6:23. doi:10.3389/fped.2018.00023',
    19: 'Pala R et al. Int J Mol Sci. 2017;18(11):2272. doi:10.3390/ijms18112272',
    20: 'Beales PL et al. J Med Genet. 1999;36(6):437-446.',
    21: 'Forsyth R et al. Bardet-Biedl syndrome overview. In: Adam MP et al, eds. GeneReviews. University of Washington; 2003. Updated July 23, 2020.',
    22: 'Florea L et al. Genes (Basel). 2021;12(9):1353. doi:10.3390/genes12091353',
    23: 'Forsythe E et al. Eur J Hum Genet. 2023;21(1):8-13. doi:10.1038/ejhg.2012.115',
    24: 'Majumdar U et al. BMJ Case Rep. 2012;2012:bcr1220115320. doi:10.1136/bcr.12.2011.5320',
    25: 'Styne DM et al. J Clin Endocrinol Metab. 2017;102(3):709-757. doi:10.1210/jc.2016-2573',
    26: 'Growth Charts - Data file for CDC Extended BMI-for-Age Growth Charts. www.cdc.gov',
    27: 'Obesity and overweight. World Health Organization. Published June 9, 2021.',
    28: 'Developmental Screening. Ages & Stages Questionnaire. https://agesandstages.com',
    29: 'The Language Development Survey (LDS). Achenbach System of Empirically Based Assessment. www.aseba.org',
    30: 'The MacArthur-Bates Communicative Development Inventories (MB-CDIs). www.mb-cdi.stanford.edu',
    31: 'Meng X et al. Front Cell Dev Biol. 2021;9:635216. doi:10.3389/fcell.2021.635216',
    32: 'Putoux A et al. Pediatr Nephrol. 2012;27(1):7-15. doi:10.1007/s00467-010-1751-3',
    33: 'Panny A et al. J Dent Res. 2017;96(12):1361-1369.',
    34: 'Sandilands EA et al. Br J Clin Pharmacol. 2013;76(4):504-515. doi:10.1111/bcp.12198',
    35: 'Dollfus H et al. Eur J Hum Genet. 2024;32(11):1347-1360. doi:10.1038/s41431-024-01634-7',
    36: 'Uncovering Rare Obesity Program. https://uncoveringrrareobesity.com',
    37: 'Khan OA et al. Cureus. 2019;11(2):e4114. doi:10.7759/cureus.4114',
    38: 'Agrawal H et al. Pediatr Rev. 2018;39(5):e21-e23. doi:10.1542/pir.2017-0136',
    39: 'Vlahovic AM et al. Pediatric and Adolescent Plastic Surgery for the Clinician. Springer; 2017:89-105.',
    40: 'Pomeroy J et al. Pediatr Obes. 2021;16(2):e12703. doi:10.1111/ijpo.12703',
    41: 'Katsanis N et al. Hum Mol Genet. 2001;10(20):2293-2299. doi:10.1093/hmg/10.20.2293',
    42: 'Weihbrecht K et al. Med Res Arch. 2017;5(9):10.18103/mra.v5i9.1526',
    43: 'Roy NV et al. Endocrinol Diabetes Metab Case Rep. 2023;2023(4):23-0055. doi:10.1530/EDM-23-0055',
    44: 'Suspitsin EN et al. Mol Syndromol. 2016;7(2):62-71.',
    45: 'Trapp CM et al. Curr Opin Endocrinol Diabetes Obes. 2023;30(2):136-140. doi:10.1097/MED.0000000000000798',
    46: 'Haws R et al. Diabetes Obes Metab. 2020;22(11):2133-2140. doi:10.1111/dom.14133',
    47: 'Haqq AM et al. Lancet Diabetes Endocrinol. 2022;10(12):859-868. doi:10.1016/S2213-8587(22)00277-7',
    48: 'Argente J et al. Lancet Diabetes Endocrinol. 2025;13(1):29-37. doi:10.1016/S2213-8587(24)00273-0',
    49: 'Centers for Disease Control and Prevention. 2000 CDC Growth Charts for the United States. https://www.cdc.gov/nchs/data/series/sr_11/sr11_246.pdf',
    50: 'Data on file. Rhythm Pharmaceuticals, Inc. Boston, MA.',
    51: 'Data on file. Rhythm Pharmaceuticals, Inc. Boston, MA.',
    52: 'Turkkahraman D et al. J Endocrinol Invest. 2022;45(5):1031-1037. doi:10.1007/s40618-021-01737-8',
    53: 'Grossman DC et al; US Preventive Services Task Force. JAMA. 2017;317(23):2417-2426. doi:10.1001/jama.2017.6803',
    54: 'Argente J et al. Endocrine Society Annual Meeting. Poster ODP606. June 11-14, 2022.',
    55: 'Gulati AK et al. Pediatrics. 2012;130(6):1136-1140. doi:10.1542/peds.2012-0596',
    56: 'Varni JW et al. PedsQL. Version 20. Mapi Research Trust. https://www.pedsql.org/PedsQL-Scoring.pdf',
    57: 'Crosby RD et al. J Clin Epidemiol. 2004;57(11):1153-60. doi:10.1016/j.jclinepi.2004.04.004',
    58: 'Data on file. Rhythm Pharmaceuticals, Inc. Boston, MA.',
    59: 'Clément K et al. Lancet Diabetes Endocrinol. [Supplementary appendix] 2020;8(12):960-970. doi:10.1016/S2213-8587(20)30364-8',
    60: 'Haqq AM et al. Lancet Diabetes Endocrinol. 2022;10(12):859-868.',
  },

  // Which claims map to which references - STRICT MAPPING (from CVA 2025)
  claimToReference: {
    // Indication claims → Reference 1 (PI)
    'FDA-approved': '1',
    'first and only': '1,2',
    'ages 2 years and older': '1',
    'pediatric patients': '1',
    'adults': '1',
    'BBS indication': '1',
    'reduce excess body weight': '1',
    'maintain weight reduction': '1',
    'precision medicine': '1,2',

    // MC4R pathway claims → References from CVA page 3
    'MC4R pathway': '1,2',
    'MC4R pathway impairment': '2,5,8,9',
    'mechanism of action': '1',
    'hypothalamic': '1,2',
    'MC4R agonist': '1',
    're-establish MC4R pathway': '1,45,46',
    'MC4R neuron': '1,2',
    'alpha-MSH': '1,18',

    // Disease burden / hyperphagia
    'hyperphagia': '1,2',
    'insatiable hunger': '2',
    'early-onset obesity': '2,5',
    'BBS disease burden': '2,5,15,16',

    // Efficacy claims → References 1,47,48
    'weight loss': '1,47',
    'weight reduction': '1,47,48',
    'BMI reduction': '1,47,48',
    'meaningful weight reduction': '1,47',
    '6-8 weeks': '1',
    'hunger reduction': '1,47',
    'clinically meaningful': '1,47,48',

    // Age-specific efficacy
    'efficacy aged 2 to <6': '1,48',
    'efficacy aged 6 to <18': '1,47',
    'efficacy aged ≥18': '1,47',
    'young children efficacy': '1,48',

    // Clinical trial data
    'clinical trial': '47',
    'study results': '47,48',
    'patients in trial': '47',
    'VENTURE trial': '48',

    // Continuous treatment
    'continuous treatment': '1,47',
    'long-term treatment': '1,47',
    'foundational treatment': '1',

    // Safety
    'safety profile': '1,48,54',
    'tolerability': '1,48',
    'adverse reactions': '1',

    // Support program
    'Rhythm InTune': '50',
    'patient support': '50',

    // Data on file
    'internal data': '50,51,58',
    'real-world': '50',
  },

  // Helper function to get references for a set of claims
  getReferencesForClaims: (claims: string[]): number[] => {
    const refSet = new Set<number>();
    const mapping = REFERENCES.claimToReference;

    claims.forEach(claim => {
      const claimLower = claim.toLowerCase();
      Object.entries(mapping).forEach(([key, refs]) => {
        if (claimLower.includes(key.toLowerCase())) {
          refs.split(',').forEach(r => refSet.add(parseInt(r.trim())));
        }
      });
    });

    return Array.from(refSet).sort((a, b) => a - b);
  },

  // Format references for output (max 3 for banners)
  formatReferences: (refNumbers: number[], maxRefs: number = 3): string => {
    const refs = refNumbers.slice(0, maxRefs);
    return refs.map(n => `${n}. ${REFERENCES.all[n as keyof typeof REFERENCES.all]}`).join('<br>');
  },

  // Legacy formatted block (for backwards compatibility)
  formattedBlock: `<strong>References:</strong><br>
1. IMCIVREE [prescribing information]. Boston, MA. Rhythm Pharmaceuticals, Inc.<br>
47. Haqq AM et al. Lancet Diabetes Endocrinol. 2022;10(12):859-868.<br>
50. Data on file. Rhythm Pharmaceuticals, Inc. Boston, MA.`,
}
