# IMCIVREE Reference RAG System

## Overview

The Reference RAG (Retrieval-Augmented Generation) system ensures pharmaceutical compliance by dynamically mapping content claims to CVA 2025-approved references. It uses a template-first architecture with RAG fallback for LLM-generated content.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Content Request                           │
│  (emailType, audience, keyMessage, customInstructions)      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Template Exists? │
                    └─────────────────┘
                    /                 \
                 YES                   NO
                  │                     │
                  ▼                     ▼
     ┌────────────────────┐    ┌────────────────────┐
     │   Return Template   │    │  Build RAG Context │
     │  (hardcoded refs)   │    │   (claim mapping)  │
     └────────────────────┘    └────────────────────┘
                                        │
                                        ▼
                               ┌────────────────────┐
                               │   LLM Generates    │
                               │   with RAG context │
                               └────────────────────┘
                                        │
                                        ▼
                               ┌────────────────────┐
                               │  Post-Process Refs │
                               │   (validate/fix)   │
                               └────────────────────┘
                                        │
                                        ▼
                               ┌────────────────────┐
                               │ Return Compliant   │
                               │      HTML          │
                               └────────────────────┘
```

---

## CVA 2025 Reference Mapping

### Core References Used

| Ref # | Source | Use For |
|-------|--------|---------|
| 1 | IMCIVREE Prescribing Information (PI) | Indication, dosing, mechanism, safety |
| 47 | Haqq AM et al. 2022 (BBS trial) | Clinical efficacy data (ages 6+) |
| 48 | Argente J et al. 2025 (VENTURE) | VENTURE trial data (ages 2-5) |
| 50 | Rhythm Data on File | Rhythm InTune support program |

### Template Reference Assignments

**HCP Templates:** Refs 1, 47, 48
- moa, summary, efficacy, dosing templates

**Patient Templates:** Refs 1, 50
- getting-started, what-to-expect, support templates

---

## Implementation

### File: `/lib/reference-rag.ts`

Core RAG system with claim pattern matching.

#### Claim Patterns

20+ regex patterns that detect claims and map to references:

```typescript
const CLAIM_PATTERNS: Array<{
  pattern: RegExp
  refs: number[]
  priority: number      // 40-100, higher = more specific
  description: string
}> = [
  // Age-specific efficacy (highest priority)
  {
    pattern: /(?:children|pediatric|patients?)\s*(?:aged?\s*)?(?:2|two)\s*(?:years?\s*)?(?:and\s*older|to\s*<?5|to\s*<?6|\+)/i,
    refs: [1, 48],
    priority: 100,
    description: 'Young children 2-5 years efficacy'
  },
  {
    pattern: /VENTURE\s*trial/i,
    refs: [48],
    priority: 100,
    description: 'VENTURE trial data'
  },
  // ... 18+ more patterns
]
```

#### Key Functions

```typescript
// Extract references from HTML content
extractReferencesFromContent(htmlContent: string): number[]

// Get full reference citation by number
getReference(refNumber: number): ReferenceInfo | null

// Format references as HTML block
formatReferencesBlock(refNumbers: number[]): string

// Validate superscript citations match References block
validateReferences(htmlContent: string): {
  valid: boolean
  cited: number[]
  inBlock: number[]
  missing: number[]
  extra: number[]
}

// Get recommended references for email type and audience
getRecommendedReferences(emailType: string, audience: 'hcp' | 'patient'): number[]

// Build context for LLM prompt with relevant references
buildReferenceContext(
  emailType: string,
  audience: 'hcp' | 'patient',
  keyMessage?: string
): string

// Post-process LLM output to ensure reference compliance
postProcessReferences(htmlContent: string): {
  html: string
  references: number[]
  wasModified: boolean
}
```

---

## Chat API Integration

### File: `/app/api/chat/route.ts`

#### Import (Line 13)

```typescript
import {
  buildReferenceContext,
  postProcessReferences,
  extractReferencesFromContent
} from '@/lib/reference-rag'
```

#### RAG Context Building (Lines 596-610)

When no template exists, RAG context is built and injected into the LLM prompt:

```typescript
// Build RAG reference context for the LLM
const referenceContext = buildReferenceContext(
  data.emailType,
  data.audience as 'hcp' | 'patient',
  data.keyMessage
)
console.log('[IMCIVREE RAG] Reference context built for:', data.emailType, data.audience)

const systemPrompt = getImcivreeEmailPrompt({
  audience: data.audience,
  emailType: data.emailType,
  keyMessage: data.keyMessage
}) + '\n\n' + referenceContext
```

#### Post-Processing (Lines 657-671)

After LLM generation, references are validated and fixed if needed:

```typescript
// Post-process to validate and fix references (RAG compliance check)
const { html: processedHtml, references, wasModified } = postProcessReferences(htmlContent)
if (wasModified) {
  console.log('[IMCIVREE RAG] References post-processed. Final refs:', references)
}
htmlContent = processedHtml

// Send final done message with references array
controller.enqueue(encoder.encode(`data: ${JSON.stringify({
  done: true,
  message: 'Your IMCIVREE email has been generated.',
  generatedContent: htmlContent,
  conversationId: providedConversationId,
  references: references
})}\n\n`))
```

---

## Reference Context Output

When `buildReferenceContext()` is called, it generates context like:

```
## AVAILABLE REFERENCES FOR THIS EMAIL

Use ONLY these references. Cite as superscripts (e.g., <sup>1</sup>, <sup>1,47</sup>).

Reference 1: IMCIVREE (setmelanotide) prescribing information. Rhythm Pharmaceuticals, Inc.
Reference 47: Haqq AM, et al. Lancet Diabetes Endocrinol. 2022;10(12):859-868.
Reference 48: Argente J, et al. Lancet Diabetes Endocrinol. 2025;13(1):35-45.

## REFERENCE USAGE RULES

1. Reference 1 (PI): Use for indication, dosing, mechanism, safety claims
2. Reference 47 (Haqq 2022): Use for BBS clinical trial efficacy data (ages 6+)
3. Reference 48 (Argente 2025): Use for VENTURE trial data (ages 2-5)
4. Reference 50 (Data on file): Use for Rhythm InTune support program claims

**Only cite references that support specific claims in your content.**
**Only include cited references in the References block.**
```

---

## Claim Pattern Priority System

Patterns are prioritized to ensure more specific claims take precedence:

| Priority | Category | Example Pattern |
|----------|----------|-----------------|
| 100 | Age-specific efficacy | "children aged 2 years and older" |
| 95-100 | Clinical trials | "VENTURE trial" |
| 85-90 | Product claims | "first and only FDA-approved" |
| 80 | Efficacy claims | "meaningful weight reduction" |
| 70-75 | Mechanism/timeline | "MC4R pathway", "6-8 weeks" |
| 60 | Safety | "safety profile" |
| 40-50 | Base indication | "BBS", "indicated for" |

---

## Validation & Post-Processing

### What Gets Validated

1. **Superscript citations** - `<sup>1</sup>`, `<sup>1,47</sup>`
2. **References block** - Must contain all cited references
3. **No orphan references** - Block shouldn't have uncited refs

### Auto-Fix Behavior

If validation fails:
1. Remove existing References block
2. Rebuild based on cited superscripts
3. Insert before ISI block (or before `</body>`)

---

## Logging

RAG operations are logged with `[IMCIVREE RAG]` prefix:

```
[IMCIVREE RAG] Reference context built for: moa hcp
[IMCIVREE RAG] References post-processed. Final refs: [1, 47]
```

---

## Files Reference

| File | Purpose |
|------|---------|
| `/lib/reference-rag.ts` | Core RAG system |
| `/lib/knowledge/imcivree-bbs.ts` | CVA 2025 references (60 total) |
| `/lib/content-templates/imcivree-emails.ts` | 15 pre-approved email templates |
| `/app/api/chat/route.ts` | Chat API with RAG integration |

---

## When RAG Is Used

| Scenario | Template Used | RAG Used |
|----------|---------------|----------|
| Standard email type (e.g., "moa") | ✓ | ✗ |
| Email with customInstructions | ✗ | ✓ |
| Unknown email type | ✗ | ✓ |
| Template + keyMessage | ✓ (partially) | ✓ (for claims) |

---

## Compliance Notes

- **Reference 1 (PI)** is ALWAYS included as a fallback
- Only CVA 2025 approved references are used (Refs 1-60)
- Age claims are strictly mapped (2-5 → Ref 48, 6+ → Ref 47)
- Rhythm InTune claims MUST use Ref 50
- Post-processing ensures references never drift from cited claims

---

## Future Enhancements

- [ ] Vector embedding search for semantic claim matching
- [ ] Real-time reference updates via admin panel
- [ ] Multi-product reference isolation
- [ ] Audit log for reference decisions
