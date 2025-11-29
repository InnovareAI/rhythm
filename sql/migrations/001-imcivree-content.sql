-- IMCIVREE Content Hub - Database Schema
-- Run this in Supabase SQL Editor

-- =============================================================================
-- 1. IMCIVREE CONTENT TABLE
-- Stores all generated emails and banners
-- =============================================================================

CREATE TABLE IF NOT EXISTS imcivree_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Content type and metadata
  content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('imcivree-email', 'imcivree-banner')),
  audience VARCHAR(20) NOT NULL CHECK (audience IN ('hcp', 'patient')),

  -- For emails: email_type (moa, summary, dosing, efficacy, getting-started, what-to-expect, support)
  -- For banners: focus (moa, efficacy-weight, efficacy-hunger, treatment, understanding, hope, support)
  focus VARCHAR(50),

  -- User-provided key message emphasis
  key_message TEXT,

  -- The generated HTML content
  html_content TEXT NOT NULL,

  -- Version tracking
  version INTEGER NOT NULL DEFAULT 1,
  parent_id UUID REFERENCES imcivree_content(id),

  -- Approval status
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'approved', 'rejected', 'needs_changes')),

  -- Ziflow integration
  ziflow_proof_id VARCHAR(100),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_imcivree_content_type ON imcivree_content(content_type);
CREATE INDEX idx_imcivree_content_audience ON imcivree_content(audience);
CREATE INDEX idx_imcivree_content_status ON imcivree_content(status);
CREATE INDEX idx_imcivree_content_created ON imcivree_content(created_at DESC);
CREATE INDEX idx_imcivree_content_parent ON imcivree_content(parent_id);

-- =============================================================================
-- 2. CONTENT VERSIONS TABLE
-- Tracks all revisions of content with change notes
-- =============================================================================

CREATE TABLE IF NOT EXISTS content_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Reference to the content
  content_id UUID NOT NULL REFERENCES imcivree_content(id) ON DELETE CASCADE,

  -- Version number
  version INTEGER NOT NULL,

  -- The HTML content at this version
  html_content TEXT NOT NULL,

  -- Change notes/reason for revision
  change_notes TEXT,

  -- Who/what triggered the change
  change_source VARCHAR(50) DEFAULT 'user' CHECK (change_source IN ('user', 'ai_optimization', 'mlr_feedback')),

  -- Timestamp
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(content_id, version)
);

CREATE INDEX idx_content_versions_content ON content_versions(content_id);
CREATE INDEX idx_content_versions_created ON content_versions(created_at DESC);

-- =============================================================================
-- 3. ZIFLOW FEEDBACK TABLE
-- Persists feedback from Ziflow webhooks
-- =============================================================================

CREATE TABLE IF NOT EXISTS ziflow_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Ziflow proof identifiers
  proof_id VARCHAR(100) NOT NULL,
  proof_name VARCHAR(255),

  -- Link to our content (optional - may receive webhooks before we link)
  content_id UUID REFERENCES imcivree_content(id) ON DELETE SET NULL,

  -- Proof status and decision
  status VARCHAR(50),
  decision VARCHAR(50) CHECK (decision IN ('approved', 'rejected', 'changes_requested', NULL)),
  current_stage VARCHAR(100),

  -- Webhook event tracking
  last_event VARCHAR(50),
  last_event_at TIMESTAMPTZ,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_ziflow_feedback_proof ON ziflow_feedback(proof_id);
CREATE INDEX idx_ziflow_feedback_content ON ziflow_feedback(content_id);
CREATE INDEX idx_ziflow_feedback_decision ON ziflow_feedback(decision);

-- =============================================================================
-- 4. ZIFLOW COMMENTS TABLE
-- Stores individual comments from reviewers
-- =============================================================================

CREATE TABLE IF NOT EXISTS ziflow_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Reference to the feedback entry
  feedback_id UUID NOT NULL REFERENCES ziflow_feedback(id) ON DELETE CASCADE,

  -- Comment details
  ziflow_comment_id VARCHAR(100),
  author_name VARCHAR(255) NOT NULL,
  author_email VARCHAR(255),
  content TEXT NOT NULL,

  -- Annotation details (if comment is on specific location)
  annotation_page INTEGER,
  annotation_x DECIMAL,
  annotation_y DECIMAL,

  -- Timestamps
  comment_created_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ziflow_comments_feedback ON ziflow_comments(feedback_id);
CREATE INDEX idx_ziflow_comments_created ON ziflow_comments(created_at DESC);

-- =============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- Enable public access for now (add auth later)
-- =============================================================================

ALTER TABLE imcivree_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ziflow_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE ziflow_comments ENABLE ROW LEVEL SECURITY;

-- Public read/write policies (replace with auth-based policies in production)
CREATE POLICY "Allow public read imcivree_content" ON imcivree_content FOR SELECT USING (true);
CREATE POLICY "Allow public insert imcivree_content" ON imcivree_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update imcivree_content" ON imcivree_content FOR UPDATE USING (true);

CREATE POLICY "Allow public read content_versions" ON content_versions FOR SELECT USING (true);
CREATE POLICY "Allow public insert content_versions" ON content_versions FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read ziflow_feedback" ON ziflow_feedback FOR SELECT USING (true);
CREATE POLICY "Allow public insert ziflow_feedback" ON ziflow_feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update ziflow_feedback" ON ziflow_feedback FOR UPDATE USING (true);

CREATE POLICY "Allow public read ziflow_comments" ON ziflow_comments FOR SELECT USING (true);
CREATE POLICY "Allow public insert ziflow_comments" ON ziflow_comments FOR INSERT WITH CHECK (true);

-- =============================================================================
-- 6. UPDATED_AT TRIGGER
-- Automatically update updated_at timestamp
-- =============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_imcivree_content_updated_at
  BEFORE UPDATE ON imcivree_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ziflow_feedback_updated_at
  BEFORE UPDATE ON ziflow_feedback
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- 7. STORAGE BUCKET FOR HTML FILES
-- Create bucket for hosting HTML files for Ziflow
-- =============================================================================

-- Run this separately in Supabase Dashboard > Storage > New Bucket
-- Bucket name: content-files
-- Public: Yes
-- File size limit: 5MB
-- Allowed MIME types: text/html, application/octet-stream
