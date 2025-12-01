/**
 * Disease Awareness Knowledge Base - Acquired Hypothalamic Obesity (aHO)
 * Unbranded disease education content for HCP audiences
 */

export const ahoKnowledge = {
  // Brand colors (from differentobesity.com)
  colors: {
    primary: '#1a1652',      // Dark navy/purple
    accent: '#00a7df',       // Teal
    accentLight: '#12d8ee',  // Light teal
    light: '#c9f1fe',        // Very light teal
    background: '#f9f2f8',   // Off-white/pink
    secondary: '#aa096f',    // Purple accent
    text: '#4a4f55',         // Body text
  },

  // Disease information
  disease: {
    name: 'Acquired Hypothalamic Obesity',
    abbreviation: 'aHO',
    definition: 'Acquired hypothalamic obesity (aHO) is a form of obesity caused by damage to the hypothalamus, the brain region that regulates hunger and energy balance.',
    causes: [
      'Brain tumors (such as craniopharyngioma)',
      'Surgical removal of tumors affecting the hypothalamus',
      'Radiation therapy to the brain',
      'Traumatic brain injury',
      'Inflammatory conditions affecting the hypothalamus',
    ],
  },

  // Approved message bank (disease education, NOT drug promotion)
  messageBank: {
    diseaseDefinition: [
      'Acquired hypothalamic obesity (aHO) is caused by damage to the hypothalamus',
      'aHO can result from tumors, surgery, or radiation affecting the hypothalamus',
      'The hypothalamus is the brain region that regulates hunger, satiety, and energy balance',
      'Unlike common obesity, aHO has a specific neurological origin',
    ],
    mechanism: [
      'The hypothalamus regulates hunger and energy balance through complex signaling pathways',
      'Damage to this region impairs the MC4R pathway signaling',
      'When the hypothalamus is damaged, normal hunger and satiety signals are disrupted',
      'This leads to severe, persistent hyperphagia (excessive hunger) that is difficult to control',
    ],
    burden: [
      'Patients with aHO experience severe, insatiable hunger',
      'Traditional weight management approaches often fail in aHO patients',
      'Rapid weight gain frequently occurs following hypothalamic injury',
      'Quality of life is significantly impacted by uncontrollable hunger',
      'Metabolic complications can develop due to obesity',
    ],
    recognition: [
      'Early recognition of aHO is key to appropriate patient management',
      'Consider aHO in patients with rapid weight gain following hypothalamic injury',
      'History of craniopharyngioma or hypothalamic surgery is a key risk factor',
      'Uncontrollable hunger that does not respond to lifestyle modifications may indicate aHO',
    ],
    differential: [
      'Not all obesity is the same - aHO has distinct characteristics',
      'aHO differs from common obesity in its hypothalamic origin',
      'Patients with aHO may not respond to conventional weight loss interventions',
      'The underlying neurological damage distinguishes aHO from other forms of obesity',
    ],
  },

  // Educational references (disease education sources, NOT drug studies)
  references: [
    {
      id: 1,
      citation: 'Lustig RH, et al. Hypothalamic obesity: causes, consequences, treatment. Pediatr Endocrinol Rev. 2008;6(2):220-227.',
      shortCitation: 'Lustig RH, et al. Pediatr Endocrinol Rev. 2008.',
      usedFor: ['disease definition', 'mechanism', 'burden'],
    },
    {
      id: 2,
      citation: 'van Iersel L, et al. Hypothalamic obesity in children. Endocr Rev. 2019;40(2):531-556.',
      shortCitation: 'van Iersel L, et al. Endocr Rev. 2019.',
      usedFor: ['disease definition', 'recognition', 'burden'],
    },
    {
      id: 3,
      citation: 'Müller HL, et al. Craniopharyngioma. Nat Rev Dis Primers. 2019;5(1):75.',
      shortCitation: 'Müller HL, et al. Nat Rev Dis Primers. 2019.',
      usedFor: ['causes', 'mechanism', 'recognition'],
    },
    {
      id: 4,
      citation: 'Roth CL, et al. Hypothalamic obesity in craniopharyngioma patients: disturbed energy homeostasis related to extent of hypothalamic damage. J Clin Endocrinol Metab. 2011;96(9):2854-2862.',
      shortCitation: 'Roth CL, et al. J Clin Endocrinol Metab. 2011.',
      usedFor: ['mechanism', 'burden'],
    },
    {
      id: 5,
      citation: 'Haqq AM, et al. Molecular and clinical aspects of hypothalamic obesity. Obesity Reviews. 2022;23(9):e13459.',
      shortCitation: 'Haqq AM, et al. Obesity Reviews. 2022.',
      usedFor: ['disease definition', 'mechanism', 'differential'],
    },
  ],

  // Target HCP segments
  targetAudiences: [
    { id: 'endocrinologist', name: 'Endocrinologists' },
    { id: 'pediatrician', name: 'Pediatricians' },
    { id: 'obesity-nutrition', name: 'Obesity & Nutrition Specialists' },
  ],

  // CTA information
  cta: {
    url: 'https://hcp.differentobesity.com/',
    text: 'Learn more at differentobesity.com',
    buttonText: 'Learn More',
  },

  // Educational disclaimer (not drug ISI)
  disclaimer: 'This information is intended for US healthcare professionals only and is provided for educational purposes.',

  // Assets
  assets: {
    brainIcon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%231a1652"%3E%3Cpath stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/%3E%3C/svg%3E',
  },
}

// Helper function to get references by topic
export function getAhoReferences(topics: string[]): typeof ahoKnowledge.references {
  return ahoKnowledge.references.filter(ref =>
    ref.usedFor.some(use => topics.some(topic => use.toLowerCase().includes(topic.toLowerCase())))
  )
}

// Helper function to format references block
export function formatAhoReferencesBlock(): string {
  return ahoKnowledge.references
    .map((ref, index) => `${index + 1}. ${ref.citation}`)
    .join('\n')
}

// Get full references HTML for emails/banners
export function getAhoReferencesHtml(): string {
  return `
    <div style="font-size: 10px; color: #4a4f55; line-height: 1.4;">
      <strong>References:</strong><br>
      ${ahoKnowledge.references.map((ref, i) => `${i + 1}. ${ref.citation}`).join('<br>')}
    </div>
  `
}
