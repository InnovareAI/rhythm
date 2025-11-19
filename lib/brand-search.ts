import { getOpenRouter, defaultModel } from './openrouter'

export type BrandInfo = {
  productName: string
  indication?: string
  mechanism?: string
  manufacturer?: string
  keyFacts?: string[]
  targetPopulation?: string
  approvalStatus?: string
  rawSearchResults?: string
}

export async function searchBrandInfo(productName: string): Promise<BrandInfo> {
  console.log('[BRAND SEARCH] Starting search for:', productName)

  try {
    // Use LLM with web search to gather brand information
    const openrouter = getOpenRouter()

    const searchPrompt = `Search for comprehensive information about the pharmaceutical product "${productName}".

Please provide:
1. Product indication (what condition it treats)
2. Mechanism of action (how it works)
3. Manufacturer/company
4. Target population (who it's for)
5. FDA approval status
6. Key facts and differentiators

Format your response as a structured summary. Be concise but thorough.`

    console.log('[BRAND SEARCH] Querying LLM with web search capabilities...')

    const completion = await openrouter.chat.completions.create({
      model: defaultModel,
      messages: [
        {
          role: 'system',
          content: 'You are a pharmaceutical research assistant. Search the web for accurate, up-to-date information about pharmaceutical products. Focus on FDA-approved information, manufacturer websites, and credible medical sources.'
        },
        { role: 'user', content: searchPrompt }
      ],
      temperature: 0.3, // Lower temperature for factual information
      max_tokens: 1500,
    })

    const searchResults = completion.choices[0]?.message?.content || ''
    console.log('[BRAND SEARCH] Raw search results:', searchResults.substring(0, 200) + '...')

    // Parse the results using the LLM
    const parsePrompt = `Extract structured information from this pharmaceutical product research:

${searchResults}

Return a JSON object with these fields (use null if information not found):
{
  "indication": "brief description of what condition it treats",
  "mechanism": "brief mechanism of action",
  "manufacturer": "company name",
  "targetPopulation": "who it's indicated for",
  "approvalStatus": "FDA approval status",
  "keyFacts": ["fact1", "fact2", "fact3"]
}

Return ONLY the JSON object, no other text.`

    const parseCompletion = await openrouter.chat.completions.create({
      model: defaultModel,
      messages: [
        { role: 'system', content: 'You are a data extraction assistant. Return only valid JSON.' },
        { role: 'user', content: parsePrompt }
      ],
      temperature: 0.1,
      max_tokens: 1000,
    })

    const parsedResponse = parseCompletion.choices[0]?.message?.content || '{}'
    console.log('[BRAND SEARCH] Parsed response:', parsedResponse.substring(0, 200) + '...')

    // Extract JSON from the response (it might have markdown code blocks)
    let jsonStr = parsedResponse.trim()
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.replace(/```json\n?/, '').replace(/```$/, '').trim()
    } else if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/```\n?/, '').replace(/```$/, '').trim()
    }

    let parsedData
    try {
      parsedData = JSON.parse(jsonStr)
    } catch (e) {
      console.error('[BRAND SEARCH] Failed to parse JSON:', e)
      parsedData = {}
    }

    const brandInfo: BrandInfo = {
      productName,
      indication: parsedData.indication || null,
      mechanism: parsedData.mechanism || null,
      manufacturer: parsedData.manufacturer || null,
      targetPopulation: parsedData.targetPopulation || null,
      approvalStatus: parsedData.approvalStatus || null,
      keyFacts: parsedData.keyFacts || [],
      rawSearchResults: searchResults
    }

    console.log('[BRAND SEARCH] Final brand info:', JSON.stringify(brandInfo, null, 2))
    return brandInfo

  } catch (error) {
    console.error('[BRAND SEARCH] Error searching for brand info:', error)

    // Return minimal info on error
    return {
      productName,
      rawSearchResults: 'Search failed'
    }
  }
}
