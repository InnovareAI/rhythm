import OpenAI from 'openai'

let _openrouter: OpenAI | null = null

export function getOpenRouter() {
  if (!_openrouter) {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error('OPENROUTER_API_KEY environment variable is required')
    }

    _openrouter = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
      defaultHeaders: {
        'HTTP-Referer': 'https://rhythm.com',
        'X-Title': 'Rhythm Content Hub',
      },
    })
  }
  return _openrouter
}

export const defaultModel = process.env.OPENROUTER_MODEL || 'anthropic/claude-opus-4-5-20251101'
