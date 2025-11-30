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

// DEMO SIMPLIFIED: Only 3 core references for demo
// Reference 1 (PI), Reference 47 (Haqq 2022), Reference 50 (Rhythm InTune)
// Claim patterns with their associated reference numbers
// More specific patterns take precedence
const CLAIM_PATTERNS: Array<{
  pattern: RegExp
  refs: number[]
  priority: number
  description: string
}> = [
  // Age-specific efficacy - simplified to use Ref 1 and 47
  {
    pattern: /(?:children|pediatric|patients?)\s*(?:aged?\s*)?(?:2|two)\s*(?:years?\s*)?(?:and\s*older|to\s*<?5|to\s*<?6|\+)/i,
    refs: [1],
    priority: 100,
    description: 'Young children efficacy'
  },
  {
    pattern: /(?:children|pediatric)\s*(?:aged?\s*)?(?:6|six)\s*(?:years?\s*)?(?:and\s*older|to\s*<?18)/i,
    refs: [1, 47],
    priority: 95,
    description: 'Children 6-17 years efficacy'
  },
  {
    pattern: /(?:adults?|≥18|18\s*years?\s*and\s*older)/i,
    refs: [1, 47],
    priority: 90,
    description: 'Adult efficacy'
  },

  // Efficacy claims - simplified
  {
    pattern: /(?:meaningful|significant|clinically)\s*(?:weight|BMI)\s*(?:loss|reduction)/i,
    refs: [1, 47],
    priority: 80,
    description: 'Meaningful weight/BMI reduction'
  },
  {
    pattern: /(?:reduced?|reduction\s*in)\s*(?:hunger|hyperphagia)/i,
    refs: [1, 47],
    priority: 80,
    description: 'Hunger reduction'
  },
  {
    pattern: /(?:6[-–]8|six\s*to\s*eight)\s*weeks?/i,
    refs: [1],
    priority: 75,
    description: 'Timeline claim'
  },
  {
    pattern: /clinical\s*(?:trial|study|studies|data)/i,
    refs: [1, 47],
    priority: 70,
    description: 'Clinical trial reference'
  },

  // Product claims
  {
    pattern: /first\s*and\s*only\s*(?:FDA[-\s]?approved|treatment)/i,
    refs: [1, 47],
    priority: 85,
    description: 'First and only claim'
  },
  {
    pattern: /FDA[-\s]?approved/i,
    refs: [1],
    priority: 80,
    description: 'FDA approval'
  },
  {
    pattern: /MC4R\s*pathway/i,
    refs: [1],
    priority: 75,
    description: 'MC4R pathway'
  },

  // Disease claims
  {
    pattern: /hyperphagia\s*(?:is\s*)?(?:chronic|insatiable)/i,
    refs: [1],
    priority: 70,
    description: 'Hyperphagia description'
  },
  {
    pattern: /early[-\s]?onset\s*obesity/i,
    refs: [1],
    priority: 70,
    description: 'Early-onset obesity'
  },
  {
    pattern: /BBS\s*(?:causes?|leads?\s*to)/i,
    refs: [1],
    priority: 65,
    description: 'BBS causation'
  },

  // Support program
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
    priority: 80,
    description: 'Injection training'
  },

  // Long-term treatment
  {
    pattern: /(?:long[-\s]?term|continuous|ongoing)\s*treatment/i,
    refs: [1],
    priority: 70,
    description: 'Long-term treatment'
  },
  {
    pattern: /maintain\s*(?:weight\s*)?reduction/i,
    refs: [1],
    priority: 70,
    description: 'Maintain reduction'
  },

  // Safety
  {
    pattern: /(?:safety|tolerability)\s*(?:profile|data)?/i,
    refs: [1],
    priority: 60,
    description: 'Safety profile'
  },

  // Indication (base level)
  {
    pattern: /(?:indicated|approved)\s*(?:for|to)\s*(?:reduce|treat)/i,
    refs: [1],
    priority: 50,
    description: 'Indication statement'
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
 * DEMO SIMPLIFIED: Only 3 core refs (1, 47, 50)
 */
export function getRecommendedReferences(
  emailType: string,
  audience: 'hcp' | 'patient'
): number[] {
  // Simplified for demo: HCP gets [1, 47], Patient gets [1, 50]
  if (audience === 'patient') {
    return [1, 50]
  }

  // HCP content
  const efficacyTypes = ['efficacy', 'moa', 'summary', 'dosing']
  if (efficacyTypes.includes(emailType)) {
    return [1, 47]
  }

  return [1]
}

/**
 * Build context for LLM prompt with relevant references
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

## REFERENCE USAGE RULES (SIMPLIFIED FOR DEMO)

Only 3 core references:
1. **Reference 1 (PI)**: Use for ALL indication, dosing, mechanism, safety claims
2. **Reference 47 (Haqq 2022)**: Use for clinical efficacy data (HCP content only)
3. **Reference 50 (Data on file)**: Use for Rhythm InTune support program (Patient content only)

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
