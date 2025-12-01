/**
 * IMCIVREE Reference RAG System
 *
 * Provides dynamic reference lookup for LLM-generated content.
 * Uses claim-to-reference mapping to ensure compliance.
 *
 * Architecture:
 * 1. Template-first: Pre-approved templates have hardcoded references
 * 2. LLM fallback: This RAG system provides references for custom content
 */

import { REFERENCES } from './knowledge/imcivree-bbs'

// DEMO SIMPLIFIED REFERENCES - Only 5 references
// 1: IMCIVREE [prescribing information]. Rhythm Pharmaceuticals, Inc.
// 2: Gulati AK et al. Pediatrics. 2012. (Hunger reduction)
// 3: Forsythe E et al. Front Pediatr. 2018. (Disease/BBS/MC4R)
// 4: Argente J et al. Endocrine Society Annual Meeting Poster. 2022. (Weight reduction)
// 5: Grossman DC et al. JAMA. 2017. (Rhythm InTune support)
const CLAIM_PATTERNS: Array<{
  pattern: RegExp
  refs: number[]
  priority: number
  description: string
}> = [
  // =============================================================================
  // DISEASE / CONDITION CLAIMS → Reference 3
  // =============================================================================
  {
    pattern: /BBS\s*is\s*a\s*rare\s*genetic\s*condition/i,
    refs: [3],
    priority: 100,
    description: 'BBS is a rare genetic condition'
  },
  {
    pattern: /early[-\s]?onset\s*obesity/i,
    refs: [3],
    priority: 95,
    description: 'Early-onset obesity'
  },
  {
    pattern: /excessive\s*hunger|insatiable\s*hunger|hyperphagia/i,
    refs: [3],
    priority: 95,
    description: 'Excessive/insatiable hunger'
  },
  {
    pattern: /impaired\s*MC4R\s*pathway\s*signaling/i,
    refs: [3],
    priority: 95,
    description: 'Impaired MC4R pathway signaling'
  },
  {
    pattern: /MC4R\s*pathway/i,
    refs: [3],
    priority: 90,
    description: 'MC4R pathway'
  },

  // =============================================================================
  // PRODUCT / INDICATION CLAIMS → Reference 1
  // =============================================================================
  {
    pattern: /first\s*and\s*only\s*(?:FDA[-\s]?approved|treatment)/i,
    refs: [1],
    priority: 90,
    description: 'First and only claim'
  },
  {
    pattern: /FDA[-\s]?approved/i,
    refs: [1],
    priority: 85,
    description: 'FDA approval'
  },
  {
    pattern: /(?:2|two)\s*years?\s*(?:and\s*older|\+|or\s*older)/i,
    refs: [1],
    priority: 85,
    description: 'Ages 2 years and older indication'
  },
  {
    pattern: /targeting\s*(?:impaired\s*)?MC4R/i,
    refs: [1],
    priority: 85,
    description: 'Targeting MC4R'
  },
  {
    pattern: /not\s*approved\s*for\s*general\s*obesity/i,
    refs: [1],
    priority: 85,
    description: 'Not for general obesity'
  },
  // =============================================================================
  // HUNGER / WEIGHT CLAIMS → References 2, 4
  // =============================================================================
  {
    pattern: /(?:reduced?|reduction\s*in)\s*(?:hunger|hyperphagia)/i,
    refs: [2],
    priority: 85,
    description: 'Hunger reduction'
  },
  {
    pattern: /hunger\s*reduction\s*within\s*weeks/i,
    refs: [2],
    priority: 85,
    description: 'Hunger reduction within weeks'
  },
  {
    pattern: /(?:meaningful|significant|clinically)\s*(?:weight|BMI)\s*(?:loss|reduction)/i,
    refs: [4],
    priority: 85,
    description: 'Meaningful weight/BMI reduction'
  },
  {
    pattern: /(?:6[-–]8|six\s*to\s*eight)\s*weeks?/i,
    refs: [4],
    priority: 83,
    description: '6-8 weeks timeline'
  },
  {
    pattern: /weight\s*(?:loss|reduction)/i,
    refs: [4],
    priority: 80,
    description: 'Weight loss/reduction'
  },
  {
    pattern: /BMI\s*(?:reduction|decrease|change)/i,
    refs: [4],
    priority: 80,
    description: 'BMI reduction'
  },
  {
    pattern: /clinical\s*(?:trial|study|studies|data)/i,
    refs: [4],
    priority: 75,
    description: 'Clinical trial reference'
  },

  // =============================================================================
  // SAFETY CLAIMS → References 1, 4
  // =============================================================================
  {
    pattern: /(?:safety|tolerability)\s*(?:profile|data)/i,
    refs: [1],
    priority: 70,
    description: 'Safety profile'
  },
  {
    pattern: /skin\s*darkening/i,
    refs: [4],
    priority: 70,
    description: 'Skin darkening'
  },
  {
    pattern: /injection[-\s]?site\s*reactions?/i,
    refs: [1],
    priority: 70,
    description: 'Injection site reactions'
  },
  {
    pattern: /adverse\s*(?:reactions?|events?)/i,
    refs: [1],
    priority: 68,
    description: 'Adverse reactions'
  },

  // =============================================================================
  // SUPPORT PROGRAM CLAIMS → Reference 5
  // =============================================================================
  {
    pattern: /Rhythm\s*InTune/i,
    refs: [5],
    priority: 90,
    description: 'Rhythm InTune support'
  },
  {
    pattern: /(?:patient|caregiver)\s*support\s*(?:program)?/i,
    refs: [5],
    priority: 85,
    description: 'Patient support'
  },
  {
    pattern: /personalized\s*support/i,
    refs: [5],
    priority: 85,
    description: 'Personalized support'
  },
  {
    pattern: /injection\s*training/i,
    refs: [5],
    priority: 82,
    description: 'Injection training'
  },
  {
    pattern: /insurance|onboarding/i,
    refs: [5],
    priority: 80,
    description: 'Insurance/onboarding support'
  },

  // =============================================================================
  // BASE INDICATION CLAIMS (Lower Priority - Catch-all)
  // =============================================================================
  {
    pattern: /(?:indicated|approved)\s*(?:for|to)\s*(?:reduce|treat)/i,
    refs: [1],
    priority: 55,
    description: 'Indication statement'
  },
  {
    pattern: /reduce\s*excess\s*body\s*weight/i,
    refs: [1],
    priority: 53,
    description: 'Reduce excess body weight'
  },
  {
    pattern: /Bardet[-\s]?Biedl\s*syndrome|BBS/i,
    refs: [1],
    priority: 40,
    description: 'BBS mention'
  },
]

// Reference metadata for formatting
export interface ReferenceInfo {
  number: number
  citation: string
  shortCitation: string
}

/**
 * Extract claims from HTML content and return required references
 */
export function extractReferencesFromContent(htmlContent: string): number[] {
  const refSet = new Set<number>()

  // Strip HTML tags for text analysis
  const textContent = htmlContent
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  // Check each pattern
  CLAIM_PATTERNS.forEach(({ pattern, refs }) => {
    if (pattern.test(textContent)) {
      refs.forEach(ref => refSet.add(ref))
    }
  })

  // Always include Reference 1 (PI) for any IMCIVREE content
  refSet.add(1)

  return Array.from(refSet).sort((a, b) => a - b)
}

/**
 * Get full reference citation by number
 */
export function getReference(refNumber: number): ReferenceInfo | null {
  const citation = REFERENCES.all[refNumber as keyof typeof REFERENCES.all]
  if (!citation) return null

  // Create short citation (author et al. year)
  let shortCitation = citation
  const authorMatch = citation.match(/^([^.]+?)(?:\s*et\s*al)?\./)
  const yearMatch = citation.match(/(\d{4})/)
  if (authorMatch && yearMatch) {
    shortCitation = `${authorMatch[1]} et al. ${yearMatch[1]}`
  }

  return {
    number: refNumber,
    citation,
    shortCitation
  }
}

/**
 * Format references as HTML block
 */
export function formatReferencesBlock(refNumbers: number[]): string {
  const refs = refNumbers
    .map(n => getReference(n))
    .filter((r): r is ReferenceInfo => r !== null)

  if (refs.length === 0) return ''

  const refLines = refs.map(r => `${r.number}. ${r.citation}`).join('<br>\n  ')

  return `<!-- References -->
<div class="refs">
  <strong>References:</strong>
  <p>${refLines}</p>
</div>`
}

/**
 * Validate that superscript citations in HTML match the references block
 */
export function validateReferences(htmlContent: string): {
  valid: boolean
  cited: number[]
  inBlock: number[]
  missing: number[]
  extra: number[]
} {
  // Find all superscript citations like <sup>1</sup> or <sup>1,47</sup>
  const supMatches = htmlContent.matchAll(/<sup>([^<]+)<\/sup>/g)
  const citedRefs = new Set<number>()

  for (const match of supMatches) {
    const nums = match[1].split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))
    nums.forEach(n => citedRefs.add(n))
  }

  // Find references in the References block
  const refsBlockMatch = htmlContent.match(/References:[\s\S]*?<\/div>/i)
  const blockRefs = new Set<number>()

  if (refsBlockMatch) {
    const refNums = refsBlockMatch[0].matchAll(/(\d+)\./g)
    for (const match of refNums) {
      blockRefs.add(parseInt(match[1]))
    }
  }

  const cited = Array.from(citedRefs).sort((a, b) => a - b)
  const inBlock = Array.from(blockRefs).sort((a, b) => a - b)

  // Find discrepancies
  const missing = cited.filter(r => !blockRefs.has(r))
  const extra = inBlock.filter(r => !citedRefs.has(r))

  return {
    valid: missing.length === 0 && extra.length === 0,
    cited,
    inBlock,
    missing,
    extra
  }
}

/**
 * Get recommended references for an email type and audience
 * CVA 2025 APPROVED - Complete reference mapping
 */
export function getRecommendedReferences(
  emailType: string,
  audience: 'hcp' | 'patient'
): number[] {
  // Patient content - always includes PI and support references
  if (audience === 'patient') {
    const patientBase = [1, 50] // PI + Rhythm InTune

    if (emailType === 'getting-started' || emailType === 'support') {
      return [1, 50]
    }
    if (emailType === 'what-to-expect') {
      return [1, 47, 50] // Add efficacy reference
    }
    return patientBase
  }

  // HCP content - more specific reference requirements
  switch (emailType) {
    case 'moa':
      return [1, 2, 45, 46] // PI, Eneli, mechanism refs
    case 'efficacy':
    case 'efficacy-weight':
    case 'efficacy-hunger':
      return [1, 47, 48] // PI, Haqq 2022, VENTURE trial
    case 'summary':
      return [1, 2, 47] // PI, Eneli, Haqq
    case 'dosing':
      return [1] // PI only for dosing
    case 'treatment':
      return [1, 47, 50] // PI, efficacy, support
    case 'safety':
      return [1, 48, 54] // PI, VENTURE, safety poster
    default:
      return [1, 47] // Default: PI + main efficacy
  }
}

/**
 * Build context for LLM prompt with relevant references
 * CVA 2025 APPROVED - Complete reference guidance
 */
export function buildReferenceContext(
  emailType: string,
  audience: 'hcp' | 'patient',
  keyMessage?: string
): string {
  const recommendedRefs = getRecommendedReferences(emailType, audience)

  // Get additional refs if key message contains specific claims
  let additionalRefs: number[] = []
  if (keyMessage) {
    additionalRefs = extractReferencesFromContent(keyMessage)
  }

  const allRefs = [...new Set([...recommendedRefs, ...additionalRefs])].sort((a, b) => a - b)

  const refDetails = allRefs
    .map(n => getReference(n))
    .filter((r): r is ReferenceInfo => r !== null)
    .map(r => `Reference ${r.number}: ${r.citation}`)
    .join('\n')

  return `## AVAILABLE REFERENCES FOR THIS EMAIL

Use ONLY these references. Cite as superscripts (e.g., <sup>1</sup>, <sup>1,47</sup>).

${refDetails}

## REFERENCE USAGE RULES (CVA 2025 APPROVED)

### Core References:
- **Reference 1 (PI)**: ALL indication, dosing, mechanism, safety claims - REQUIRED for any IMCIVREE content
- **Reference 2 (Eneli 2019)**: "First and only" claims, precision medicine, MC4R pathway
- **Reference 47 (Haqq 2022)**: Clinical efficacy data for ages 6+ and adults
- **Reference 48 (Argente 2025/VENTURE)**: Efficacy data for young children (ages 2-<6)
- **Reference 50 (Data on file)**: Rhythm InTune support program

### Claim-Specific References:
| Claim Type | Required References |
|------------|---------------------|
| FDA-approved | 1 |
| First and only | 1, 2 |
| MC4R pathway | 1, 2 |
| MC4R impairment | 2, 5, 8, 9 |
| Re-establish pathway | 1, 45, 46 |
| Weight/BMI reduction | 1, 47, 48 |
| Hunger reduction | 1, 47 |
| Ages 2-<6 efficacy | 1, 48 |
| Ages 6-17 efficacy | 1, 47 |
| Adult efficacy | 1, 47 |
| Early-onset obesity | 2, 5 |
| Hyperphagia | 1, 2 |
| Safety profile | 1, 48, 54 |
| Rhythm InTune | 50 |

**IMPORTANT: Only cite references that appear in your AVAILABLE REFERENCES list above.**
**Only include cited references in the References block.**`
}

/**
 * Post-process LLM output to ensure reference compliance
 */
export function postProcessReferences(htmlContent: string): {
  html: string
  references: number[]
  wasModified: boolean
} {
  // Extract what references should be based on content
  const shouldHave = extractReferencesFromContent(htmlContent)

  // Validate current state
  const validation = validateReferences(htmlContent)

  if (validation.valid) {
    return {
      html: htmlContent,
      references: validation.cited,
      wasModified: false
    }
  }

  // If there are missing references in the block, rebuild it
  let modifiedHtml = htmlContent

  if (validation.missing.length > 0 || validation.extra.length > 0) {
    // Remove existing references block
    modifiedHtml = modifiedHtml.replace(/<!-- References -->[\s\S]*?<\/div>\s*(?=<!--|\n\n|$)/i, '')

    // Find the right place to insert (before ISI block)
    const isiIndex = modifiedHtml.indexOf('<!-- ISI -->')
    const newRefsBlock = formatReferencesBlock(validation.cited)

    if (isiIndex > 0) {
      modifiedHtml = modifiedHtml.slice(0, isiIndex) + newRefsBlock + '\n\n' + modifiedHtml.slice(isiIndex)
    } else {
      // Append before closing body
      modifiedHtml = modifiedHtml.replace('</body>', newRefsBlock + '\n\n</body>')
    }
  }

  return {
    html: modifiedHtml,
    references: validation.cited,
    wasModified: true
  }
}
