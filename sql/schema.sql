-- Conversation history storage for Rhythm pharmaceutical content generator
-- IMCIVREE Creative Hub - Full Schema

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_type TEXT NOT NULL CHECK (content_type IN ('hcp-email', 'social-media', 'patient-email', 'video', 'imcivree-email', 'imcivree-banner')),
    product_name TEXT,
    brand_info JSONB,
    state_data JSONB,
    generated_content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

-- Create generated_content table to store final outputs
CREATE TABLE IF NOT EXISTS generated_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    image_url TEXT,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_conversations_content_type ON conversations(content_type);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_generated_content_conversation_id ON generated_content(conversation_id);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_conversations_updated_at
    BEFORE UPDATE ON conversations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_content ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (adjust based on your auth requirements)
CREATE POLICY "Allow all operations on conversations" ON conversations FOR ALL USING (true);
CREATE POLICY "Allow all operations on messages" ON messages FOR ALL USING (true);
CREATE POLICY "Allow all operations on generated_content" ON generated_content FOR ALL USING (true);

-- Ziflow feedback table (persistent webhook storage)
CREATE TABLE IF NOT EXISTS ziflow_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    proof_id TEXT UNIQUE NOT NULL,
    proof_name TEXT,
    status TEXT,
    decision TEXT CHECK (decision IN ('approved', 'rejected', 'changes_requested', NULL)),
    comments JSONB DEFAULT '[]'::jsonb,
    conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
    received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ziflow_feedback_proof_id ON ziflow_feedback(proof_id);
CREATE INDEX IF NOT EXISTS idx_ziflow_feedback_status ON ziflow_feedback(status);
CREATE INDEX IF NOT EXISTS idx_ziflow_feedback_decision ON ziflow_feedback(decision);

ALTER TABLE ziflow_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on ziflow_feedback" ON ziflow_feedback FOR ALL USING (true);

CREATE TRIGGER update_ziflow_feedback_updated_at
    BEFORE UPDATE ON ziflow_feedback
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
