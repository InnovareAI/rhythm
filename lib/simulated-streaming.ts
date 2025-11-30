/**
 * Simulated Streaming Utility
 *
 * Creates a streaming response that mimics real LLM streaming
 * by progressively sending pre-generated content in chunks.
 *
 * This maintains the UX of "AI is working" while serving
 * pre-approved content instantly from RAG.
 */

/**
 * Create a simulated streaming response for SSE
 *
 * @param html - The complete HTML content to stream
 * @param totalDuration - Total time to stream (ms), default 3000ms
 * @param chunkSize - Approximate characters per chunk, default 50
 */
export function createSimulatedStream(
  html: string,
  totalDuration: number = 3000,
  chunkSize: number = 50
): ReadableStream {
  const encoder = new TextEncoder()

  // Break HTML into chunks
  const chunks: string[] = []
  for (let i = 0; i < html.length; i += chunkSize) {
    chunks.push(html.slice(i, i + chunkSize))
  }

  // Calculate delay between chunks
  const delayBetweenChunks = totalDuration / chunks.length

  return new ReadableStream({
    async start(controller) {
      let sentContent = ''

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i]
        sentContent += chunk

        // Send chunk as SSE data
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`)
        )

        // Wait before sending next chunk (simulate processing time)
        if (i < chunks.length - 1) {
          await sleep(delayBetweenChunks)
        }
      }

      // Send completion message
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            done: true,
            message: 'Your content has been generated.',
            generatedContent: html
          })}\n\n`
        )
      )

      controller.close()
    }
  })
}

/**
 * Create a simulated streaming response with more realistic timing
 *
 * Uses variable delays to make streaming feel more natural:
 * - Slow start (like model "thinking")
 * - Faster middle section
 * - Slight slowdown at end
 */
export function createRealisticStream(
  html: string,
  totalDuration: number = 3500
): ReadableStream {
  const encoder = new TextEncoder()

  // Break into variable-sized chunks (more natural)
  const chunks: string[] = []
  let i = 0
  while (i < html.length) {
    // Vary chunk size between 30-80 chars
    const size = 30 + Math.floor(Math.random() * 50)
    chunks.push(html.slice(i, i + size))
    i += size
  }

  return new ReadableStream({
    async start(controller) {
      const totalChunks = chunks.length

      for (let i = 0; i < totalChunks; i++) {
        const chunk = chunks[i]
        const progress = i / totalChunks

        // Send chunk
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ chunk })}\n\n`)
        )

        // Variable delay based on position
        let delay: number
        if (progress < 0.1) {
          // Slow start (thinking)
          delay = (totalDuration / totalChunks) * 2
        } else if (progress > 0.9) {
          // Slow end (finishing up)
          delay = (totalDuration / totalChunks) * 1.5
        } else {
          // Normal speed with slight randomness
          delay = (totalDuration / totalChunks) * (0.8 + Math.random() * 0.4)
        }

        if (i < totalChunks - 1) {
          await sleep(delay)
        }
      }

      // Send completion
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            done: true,
            message: 'Your content has been generated.',
            generatedContent: html
          })}\n\n`
        )
      )

      controller.close()
    }
  })
}

/**
 * Stream with conversation ID for proper tracking
 */
export function createSimulatedStreamWithId(
  html: string,
  conversationId: string | undefined,
  totalDuration: number = 3000,
  messageOverride?: string
): ReadableStream {
  const encoder = new TextEncoder()

  // Break into chunks
  const chunkSize = 50
  const chunks: string[] = []
  for (let i = 0; i < html.length; i += chunkSize) {
    chunks.push(html.slice(i, i + chunkSize))
  }

  const delayBetweenChunks = totalDuration / chunks.length

  return new ReadableStream({
    async start(controller) {
      for (let i = 0; i < chunks.length; i++) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify({ chunk: chunks[i] })}\n\n`)
        )

        if (i < chunks.length - 1) {
          await sleep(delayBetweenChunks)
        }
      }

      // Final message with full content
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({
            done: true,
            message: messageOverride || 'Your IMCIVREE email has been generated.',
            generatedContent: html,
            conversationId,
            source: 'pre-approved' // Flag that this came from templates
          })}\n\n`
        )
      )

      controller.close()
    }
  })
}

// Helper function
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
