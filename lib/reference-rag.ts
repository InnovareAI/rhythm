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

// CVA 2025 APPROVED (US-SET-2200068 - 08.01/2025)
// Complete claim-to-reference mappings per official CVA specification
// More specific patterns take precedence (higher priority)
const CLAIM_PATTERNS: Array<{
  pattern: RegExp
  refs: number[]
  priority: number
  description: string
}> = [
  // =============================================================================
  // AGE-SPECIFIC EFFICACY CLAIMS (Highest Priority)
  // =============================================================================
  {
    pattern: /(?:children|pediatric|patients?)\s*(?:aged?\s*)?(?:2|two)\s*(?:years?\s*)?(?:to\s*<?5|to\s*<?6)/i,
    refs: [1, 48],
    priority: 100,
    description: 'Young children 2-<6 years efficacy (VENTURE trial)'
  },
  {
    pattern: /(?:children|pediatric)\s*(?:aged?\s*)?(?:6|six)\s*(?:years?\s*)?(?:to\s*<?12|to\s*<?18)/i,
    refs: [1, 47],
    priority: 98,
    description: 'Children 6-17 years efficacy'
  },
  {
    pattern: /(?:adults?|≥18|18\s*years?\s*and\s*older)/i,
    refs: [1, 47],
    priority: 95,
    description: 'Adult efficacy'
  },
  {
    pattern: /(?:2|two)\s*years?\s*(?:and\s*older|\+|or\s*older)/i,
    refs: [1],
    priority: 92,
    description: 'Ages 2 years and older indication'
  },

  // =============================================================================
  // PRODUCT CLAIMS - FIRST AND ONLY
  // =============================================================================
  {
    pattern: /first\s*and\s*only\s*(?:FDA[-\s]?approved|treatment|precision\s*medicine)/i,
    refs: [1, 2],
    priority: 90,
    description: 'First and only claim'
  },
  {
    pattern: /precision\s*medicine/i,
    refs: [1, 2],
    priority: 88,
    description: 'Precision medicine claim'
  },
  {
    pattern: /FDA[-\s]?approved/i,
    refs: [1],
    priority: 85,
    description: 'FDA approval'
  },

  // =============================================================================
  // MC4R PATHWAY CLAIMS
  // =============================================================================
  {
    pattern: /re[-\s]?establish\s*(?:MC4R|pathway)/i,
    refs: [1, 45, 46],
    priority: 88,
    description: 'Re-establish MC4R pathway'
  },
  {
    pattern: /MC4R\s*pathway\s*impair/i,
    refs: [2, 5, 8, 9],
    priority: 86,
    description: 'MC4R pathway impairment'
  },
  {
    pattern: /MC4R\s*(?:pathway|agonist|neuron)/i,
    refs: [1, 2],
    priority: 84,
    description: 'MC4R pathway general'
  },
  {
    pattern: /hypothalamic/i,
    refs: [1, 2],
    priority: 82,
    description: 'Hypothalamic pathway'
  },
  {
    pattern: /alpha[-\s]?MSH/i,
    refs: [1, 18],
    priority: 80,
    description: 'Alpha-MSH mechanism'
  },
  {
    pattern: /mechanism\s*of\s*action/i,
    refs: [1],
    priority: 78,
    description: 'Mechanism of action'
  },

  // =============================================================================
  // EFFICACY CLAIMS - WEIGHT REDUCTION
  // =============================================================================
  {
    pattern: /(?:meaningful|significant|clinically)\s*(?:weight|BMI)\s*(?:loss|reduction)/i,
    refs: [1, 47, 48],
    priority: 85,
    description: 'Meaningful weight/BMI reduction'
  },
  {
    pattern: /(?:6[-–]8|six\s*to\s*eight)\s*weeks?/i,
    refs: [1],
    priority: 83,
    description: '6-8 weeks timeline'
  },
  {
    pattern: /weight\s*(?:loss|reduction)/i,
    refs: [1, 47],
    priority: 80,
    description: 'Weight loss/reduction'
  },
  {
    pattern: /BMI\s*(?:reduction|decrease|change)/i,
    refs: [1, 47, 48],
    priority: 80,
    description: 'BMI reduction'
  },

  // =============================================================================
  // EFFICACY CLAIMS - HUNGER REDUCTION
  // =============================================================================
  {
    pattern: /(?:reduced?|reduction\s*in)\s*(?:hunger|hyperphagia)/i,
    refs: [1, 47],
    priority: 82,
    description: 'Hunger reduction'
  },

  // =============================================================================
  // CLINICAL TRIAL CLAIMS
  // =============================================================================
  {
    pattern: /VENTURE\s*(?:trial|study)/i,
    refs: [48],
    priority: 88,
    description: 'VENTURE trial'
  },
  {
    pattern: /clinical\s*(?:trial|study|studies|data)/i,
    refs: [47, 48],
    priority: 75,
    description: 'Clinical trial reference'
  },
  {
    pattern: /(?:study|trial)\s*results?/i,
    refs: [47, 48],
    priority: 73,
    description: 'Study results'
  },
  {
    pattern: /patients?\s*in\s*(?:the\s*)?(?:trial|study)/i,
    refs: [47],
    priority: 72,
    description: 'Patients in trial'
  },

  // =============================================================================
  // DISEASE BURDEN / HYPERPHAGIA CLAIMS
  // =============================================================================
  {
    pattern: /hyperphagia\s*(?:is\s*)?(?:chronic|insatiable)/i,
    refs: [1, 2],
    priority: 78,
    description: 'Hyperphagia description'
  },
  {
    pattern: /insatiable\s*hunger/i,
    refs: [2],
    priority: 76,
    description: 'Insatiable hunger'
  },
  {
    pattern: /early[-\s]?onset\s*obesity/i,
    refs: [2, 5],
    priority: 75,
    description: 'Early-onset obesity'
  },
  {
    pattern: /BBS\s*disease\s*burden/i,
    refs: [2, 5, 15, 16],
    priority: 74,
    description: 'BBS disease burden'
  },
  {
    pattern: /BBS\s*(?:causes?|leads?\s*to)/i,
    refs: [1, 2],
    priority: 72,
    description: 'BBS causation'
  },

  // =============================================================================
  // CONTINUOUS/LONG-TERM TREATMENT
  // =============================================================================
  {
    pattern: /(?:continuous|long[-\s]?term)\s*treatment/i,
    refs: [1, 47],
    priority: 72,
    description: 'Continuous/long-term treatment'
  },
  {
    pattern: /foundational\s*treatment/i,
    refs: [1],
    priority: 70,
    description: 'Foundational treatment'
  },
  {
    pattern: /maintain\s*(?:weight\s*)?reduction/i,
    refs: [1],
    priority: 68,
    description: 'Maintain reduction'
  },

  // =============================================================================
  // SAFETY CLAIMS
  // =============================================================================
  {
    pattern: /(?:safety|tolerability)\s*(?:profile|data)/i,
    refs: [1, 48, 54],
    priority: 70,
    description: 'Safety profile'
  },
  {
    pattern: /adverse\s*(?:reactions?|events?)/i,
    refs: [1],
    priority: 68,
    description: 'Adverse reactions'
  },

  // =============================================================================
  // SUPPORT PROGRAM
  // =============================================================================
  {
    pattern: /Rhythm\s*InTune/i,
    refs: [50],
    priority: 90,
    description: 'Rhythm InTune support'
  },
  {
    pattern: /(?:patient|caregiver)\s*support\s*(?:program)?/i,
    refs: [50],
    priority: 85,
    description: 'Patient support'
  },
  {
    pattern: /injection\s*training/i,
    refs: [50],
    priority: 82,
    description: 'Injection training'
  },

  // =============================================================================
  // DATA ON FILE / INTERNAL DATA
  // =============================================================================
  {
    pattern: /(?:internal|real[-\s]?world)\s*data/i,
    refs: [50, 51, 58],
    priority: 65,
    description: 'Internal/real-world data'
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
