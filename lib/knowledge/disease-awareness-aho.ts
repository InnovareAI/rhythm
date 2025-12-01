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

  // Educational references - HO Master Reference List (26 references)
  // Source: US-DSE-2500011 (03.08/2025)
  references: [
    {
      id: 1,
      citation: 'Abuzzahab MJ, Roth CL, Shoemaker AH. Hypothalamic obesity: prologue and promise. Horm Res Paediatr. 2019;91(2):128-136. doi:10.1159/000496564',
      usedFor: ['C1', 'C2', 'C3', 'P2', 'S1'],
    },
    {
      id: 2,
      citation: 'Roth CL. Hypothalamic obesity in patients with craniopharyngioma: profound changes of several weight regulatory circuits. Front Endocrinol (Lausanne). 2011;2:49. doi:10.3389/fendo.2011.00049',
      usedFor: ['C1', 'C2', 'C3', 'P2'],
    },
    {
      id: 3,
      citation: 'Roth CL, Enriori PJ, Gebhardt U, et al. Changes of peripheral alpha-melanocyte–stimulating hormone in childhood obesity. Metabolism. 2010;59(2):186-194. doi:10.1016/j.metabol.2009.06.031',
      usedFor: ['C1', 'C2', 'C3', 'P2'],
    },
    {
      id: 4,
      citation: 'Roth CL, Gebhardt U, Müller HL. Appetite-regulating hormone changes in patients with craniopharyngioma. Obesity (Silver Spring). 2011;19(1):36-42. doi:10.1038/oby.2010.80',
      usedFor: ['C1', 'C2', 'C3', 'P2'],
    },
    {
      id: 5,
      citation: 'van Santen HM, van Schaik J, van Roessel IMAA, Beckhuas J, Boehnke F, Müller HL. Diagnostic criteria for the hypothalamic syndrome in childhood. Eur J Endocrinol. 2023;188(2):ivad009. doi:10.1093/ejendo/ivad009',
      usedFor: ['P3', 'S1'],
    },
    {
      id: 6,
      citation: 'van Iersel L, Brokke KE, Adan RAH, Bulthuis LCM, van den Akker ELT, van Santen HM. Pathophysiology and individualized treatment of hypothalamic obesity following craniopharyngioma and other suprasellar tumors: a systematic review. Endocr Rev. 2019;40(1):193-235. doi:10.1210/er.2018-00017',
      usedFor: ['P3', 'M2', 'T1', 'T2', 'S3'],
    },
    {
      id: 7,
      citation: 'Roth CL. Hypothalamic obesity in craniopharyngioma patients: disturbed energy homeostasis related to extent of hypothalamic damage and its implication for obesity intervention. J Clin Med. 2015;4(9):1774-1797. doi:10.3390/jcm4091774',
      usedFor: ['P3', 'B2', 'S1', 'T1', 'S3'],
    },
    {
      id: 8,
      citation: 'Rose SR, Horne VE, Bingham N, Jenkins T, Black J, Inge T. Hypothalamic obesity: 4 years of the International Registry of Hypothalamic Obesity Disorders. Obesity (Silver Spring). 2018;26(11):1727-1732. doi:10.1002/oby.22315',
      usedFor: ['C4', 'T3'],
    },
    {
      id: 9,
      citation: 'Lustig RH. Hypothalamic obesity after craniopharyngioma: mechanisms, diagnosis, and treatment. Front Endocrinol (Lausanne). 2011;2:60. doi:10.3389/fendo.2011.00060',
      usedFor: ['C5', 'T1', 'S3'],
    },
    {
      id: 10,
      citation: 'Timper K, Brünjng JC. Hypothalamic circuits regulating appetite and energy homeostasis: pathways to obesity. Dis Model Mech. 2017;10(6):679-689. doi:10.1242/dmm.026609',
      usedFor: ['P1'],
    },
    {
      id: 11,
      citation: 'Vlaardingerbroek H, van den Akker ELT, Hokken-Koelega ACS. Appetite- and weight-inducing neuroendocrine factors in Prader-Willi syndrome, Bardet-Biedl syndrome and craniopharyngioma versus anorexia nervosa. Endocr Connect. 2021;10(5):R175-R188. doi:10.1530/EC-21-0111',
      usedFor: ['P1'],
    },
    {
      id: 12,
      citation: 'Haliloglu B, Bereket A. Hypothalamic obesity in children: pathophysiology to clinical management. J Pediatr Endocrinol Metab. 2015;28(5-6):503-513. doi:10.1515/jpem-2014-0512',
      usedFor: ['P1', 'S1'],
    },
    {
      id: 13,
      citation: 'Kayadjanian N, Hsu EA, Wood AM, Carson DS. Caregiver burden… J Clin Endocrinol Metab. 2023;109(1):e76-e87. doi:10.1210/clinem/dgad488',
      usedFor: ['P2', 'B2', 'B3', 'E1', 'S1'],
    },
    {
      id: 14,
      citation: 'Craven M, Crowley JH, Chiang L, et al. Patient-relevant outcomes… Front Endocrinol. 2022;13:876770. doi:10.3389/fendo.2022.876770',
      usedFor: ['P2', 'B1', 'E1'],
    },
    {
      id: 15,
      citation: 'Bereket A. Postoperative and long-term endocrinologic complications of craniopharyngioma. Horm Res Paediatr. 2020;93(9-10):497-509. doi:10.1159/000515347',
      usedFor: ['B1', 'M2', 'E1'],
    },
    {
      id: 16,
      citation: 'Dogra P, Bedatsova L, Van Gompel JJ, et al. Long-term outcomes… Endocrine. 2022;78(1):123-134. doi:10.1007/s12020-022-03134-4',
      usedFor: ['M1', 'T3'],
    },
    {
      id: 17,
      citation: 'Crowley RK, Woods C, Fleming M, et al. Somnolence in adult craniopharyngioma patients… Clin Endocrinol (Oxf). 2017;74(6):750–755. doi:10.1111/cen.13365',
      usedFor: ['M1'],
    },
    {
      id: 18,
      citation: 'Pereira AM, Schmid EM, Schutte PJ, et al. High prevalence of… Clin Endocrinol (Oxf). 2005;62(2):197–204. doi:10.1111/j.1365-2265.2004.02196.x',
      usedFor: ['M1'],
    },
    {
      id: 19,
      citation: 'Demirtas M, Hahn-Pedersen HJ, Jørgensen HL. Comparison between burden… Neurol Ther. 2023;12(4):1051–1068. doi:10.1007/s40120-023-00493-6',
      usedFor: [],
    },
    {
      id: 20,
      citation: 'Rosenfeld A, Arrington D, Miller J, et al. Review of craniopharyngiomas… Pediatr Neurol. 2014;50(1):4-10. doi:10.1016/j.pediatrneurol.2013.09.003',
      usedFor: ['T1', 'S3'],
    },
    {
      id: 21,
      citation: 'Van Roessel IMAA, Van Den Brink M, Dekker J, et al. Feasibility, safety, and efficacy… Clin Nutr. 2024;43(8):1798-1811. doi:10.1016/j.clnu.2024.05.028',
      usedFor: ['T1', 'S3'],
    },
    {
      id: 22,
      citation: 'Müller HL. Craniopharyngioma and hypothalamic injury… Curr Opin Endocrinol Diabetes Obes. 2016;23(1):81-89. doi:10.1097/MED.0000000000000214',
      usedFor: [],
    },
    {
      id: 23,
      citation: 'Kim RJ, Shah R, Tershakovec AM, et al. Energy expenditure in obesity associated with craniopharyngioma. Childs Nerv Syst. 2010;26(7):913-917. doi:10.1007/s00381-009-1078-1',
      usedFor: ['S1'],
    },
    {
      id: 24,
      citation: 'Dimitri P. Treatment of acquired hypothalamic obesity: now and the future. Front Endocrinol (Lausanne). 2022;13:848680. doi:10.3389/fendo.2022.848680',
      usedFor: ['T1'],
    },
    {
      id: 25,
      citation: 'Shoemaker AH, Tamhardt J. Approach to the patient with hypothalamic obesity. J Clin Endocrinol Metab. 2023;108(5):1236-1242. doi:10.1210/clinem/dgac678',
      usedFor: ['T2'],
    },
    {
      id: 26,
      citation: 'Roth CL, Zenno A. Treatment of hypothalamic obesity: new drugs on the horizon. Front Endocrinol (Lausanne). 2023;14:1256514. doi:10.3389/fendo.2023.1256514',
      usedFor: ['T2'],
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
