/**
 * Ziflow API Integration
 *
 * Submits generated content (emails, banners) to Ziflow for MLR approval
 * API Docs: https://api-docs.ziflow.com/
 */

const ZIFLOW_API_BASE = 'https://api.ziflow.io/v1'

interface ZiflowProofInput {
  url: string
  name?: string
}

interface CreateProofRequest {
  name: string
  inputs: ZiflowProofInput[]  // Ziflow uses "inputs" not "files"
  folder_id?: string
  workflow_id?: string
  due_date?: string
  message?: string
}

interface ZiflowProofResponse {
  id: string
  name: string
  status: string
  proof_url?: string
  created_at: string
}

export class ZiflowClient {
  private apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${ZIFLOW_API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Ziflow API error: ${response.status} - ${error}`)
    }

    return response.json()
  }

  /**
   * Create a new proof for review
   */
  async createProof(params: CreateProofRequest): Promise<ZiflowProofResponse> {
    return this.request<ZiflowProofResponse>('/proofs', {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }

  /**
   * Get proof status
   */
  async getProof(proofId: string): Promise<ZiflowProofResponse> {
    return this.request<ZiflowProofResponse>(`/proofs/${proofId}`)
  }

  /**
   * List all proofs
   */
  async listProofs(params?: { folder_id?: string; status?: string }): Promise<ZiflowProofResponse[]> {
    const query = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : ''
    return this.request<ZiflowProofResponse[]>(`/proofs${query}`)
  }

  /**
   * Get folders (for organizing proofs)
   */
  async listFolders(): Promise<{ id: string; name: string }[]> {
    return this.request<{ id: string; name: string }[]>('/folders')
  }

  /**
   * Get workflows (for assigning review workflows)
   */
  async listWorkflows(): Promise<{ id: string; name: string }[]> {
    return this.request<{ id: string; name: string }[]>('/workflows')
  }
}

/**
 * Get Ziflow client instance
 */
export function getZiflowClient(): ZiflowClient {
  const apiKey = process.env.ZIFLOW_API_KEY
  if (!apiKey) {
    throw new Error('ZIFLOW_API_KEY environment variable is not set')
  }
  return new ZiflowClient(apiKey)
}

/**
 * Submit content for Ziflow approval
 *
 * @param contentType - 'email' or 'banner'
 * @param name - Name for the proof
 * @param fileUrl - Public URL to the HTML file
 * @param options - Additional options (folder, workflow, due date)
 */
export async function submitForApproval(
  contentType: 'email' | 'banner',
  name: string,
  fileUrl: string,
  options?: {
    folderId?: string
    workflowId?: string
    dueDate?: string
    message?: string
  }
): Promise<ZiflowProofResponse> {
  const client = getZiflowClient()

  const proofName = `[${contentType.toUpperCase()}] ${name} - ${new Date().toISOString().split('T')[0]}`

  return client.createProof({
    name: proofName,
    inputs: [{
      url: fileUrl,
      name: `${name}.html`,
    }],
    folder_id: options?.folderId,
    workflow_id: options?.workflowId,
    due_date: options?.dueDate,
    message: options?.message,
  })
}
