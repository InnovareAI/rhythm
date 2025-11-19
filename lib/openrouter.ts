import OpenAI from 'openai'

export const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://rhythm.com', // Optional: for rankings
    'X-Title': 'Rhythm Content Hub', // Optional: for rankings
  },
})

export const defaultModel = process.env.OPENROUTER_MODEL || 'openai/gpt-4-turbo-preview'
