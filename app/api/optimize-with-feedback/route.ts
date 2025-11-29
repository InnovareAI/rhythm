import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/optimize-with-feedback
 *
 * Takes original content + Ziflow reviewer feedback and generates an optimized version
 *
 * Body:
 * - originalContent: string (the original HTML)
 * - contentType: 'email' | 'banner'
 * - feedback: Array<{ author: string, content: string }>
 * - audience: 'hcp' | 'patient'
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { originalContent, contentType, feedback, audience } = body

    if (!originalContent || !feedback || feedback.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: originalContent, feedback' },
        { status: 400 }
      )
    }

    // Format feedback for the LLM
    const formattedFeedback = feedback
      .map((f: { author: string; content: string }, i: number) =>
        `${i + 1}. [${f.author}]: ${f.content}`
      )
      .join('\n')

    // Build the optimization prompt
    const optimizationPrompt = `You are a pharmaceutical marketing content optimizer. You have received reviewer feedback on an IMCIVREE ${contentType} for ${audience === 'hcp' ? 'Healthcare Professionals' : 'Patients/Caregivers'}.

## ORIGINAL CONTENT
\`\`\`html
${originalContent}
\`\`\`

## REVIEWER FEEDBACK
${formattedFeedback}

## YOUR TASK
Optimize the content based on the feedback while:
1. Maintaining all IMCIVREE brand guidelines and colors
2. Keeping the ISI (Important Safety Information) unchanged
3. Preserving the overall structure and layout
4. Only modifying elements specifically mentioned in the feedback
5. Ensuring all claims remain compliant and referenced

## IMPORTANT RULES
- Do NOT change any safety information
- Do NOT add new unsubstantiated claims
- Do NOT remove required disclaimers
- Maintain the exact same HTML structure

Generate the optimized HTML content:`

    // Call the LLM (using existing chat API structure)
    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY not configured')
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'https://rhythm-creative.netlify.app',
        'X-Title': 'IMCIVREE Creative Hub',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4',
        messages: [
          {
            role: 'user',
            content: optimizationPrompt,
          },
        ],
        max_tokens: 8000,
        temperature: 0.3, // Lower temperature for more consistent output
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`LLM API error: ${error}`)
    }

    const data = await response.json()
    const optimizedContent = data.choices?.[0]?.message?.content || ''

    // Extract HTML from response (might be wrapped in markdown code blocks)
    let htmlContent = optimizedContent
    const htmlMatch = optimizedContent.match(/```html\s*([\s\S]*?)\s*```/i)
    if (htmlMatch && htmlMatch[1]) {
      htmlContent = htmlMatch[1].trim()
    }

    // Track what was changed
    const changesSummary = extractChangesSummary(originalContent, htmlContent)

    return NextResponse.json({
      success: true,
      optimizedContent: htmlContent,
      feedbackAddressed: feedback.length,
      changesSummary,
      // Include metadata for audit trail
      metadata: {
        originalLength: originalContent.length,
        optimizedLength: htmlContent.length,
        feedbackCount: feedback.length,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error: any) {
    console.error('Optimization error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to optimize content' },
      { status: 500 }
    )
  }
}

/**
 * Extract a simple summary of what changed
 */
function extractChangesSummary(original: string, optimized: string): string[] {
  const changes: string[] = []

  // Check for headline changes
  const origHeadlines = original.match(/<h1[^>]*>(.*?)<\/h1>/gi) || []
  const optHeadlines = optimized.match(/<h1[^>]*>(.*?)<\/h1>/gi) || []
  if (JSON.stringify(origHeadlines) !== JSON.stringify(optHeadlines)) {
    changes.push('Headlines modified')
  }

  // Check for CTA changes
  const origCta = original.match(/cta-button[^>]*>(.*?)</gi) || []
  const optCta = optimized.match(/cta-button[^>]*>(.*?)</gi) || []
  if (JSON.stringify(origCta) !== JSON.stringify(optCta)) {
    changes.push('CTA text modified')
  }

  // Check for color changes
  const origColors = original.match(/#[0-9a-fA-F]{6}/g) || []
  const optColors = optimized.match(/#[0-9a-fA-F]{6}/g) || []
  if (JSON.stringify(origColors) !== JSON.stringify(optColors)) {
    changes.push('Colors adjusted')
  }

  // Check length difference
  const lengthDiff = optimized.length - original.length
  if (Math.abs(lengthDiff) > 100) {
    changes.push(lengthDiff > 0 ? 'Content expanded' : 'Content condensed')
  }

  if (changes.length === 0) {
    changes.push('Minor text adjustments')
  }

  return changes
}
