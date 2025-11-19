# Database Setup Instructions

This project uses Supabase for conversation history storage.

## Setup Steps

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the database to provision

### 2. Run the Schema Migration

1. Go to the SQL Editor in your Supabase dashboard
2. Copy the contents of `schema.sql` and run it

Alternatively, if you have the Supabase CLI installed:

```bash
supabase db push
```

### 3. Update Environment Variables

Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

You can find these values in:
- Supabase Dashboard → Settings → API

### 4. Test the Connection

Start the dev server and create a conversation. Check the Supabase dashboard to verify that conversations, messages, and generated content are being stored.

## Database Tables

### `conversations`
Stores conversation metadata including:
- `id` - UUID primary key
- `content_type` - Type of content being generated
- `product_name` - Brand/product name
- `brand_info` - Cached brand search results (JSONB)
- `state_data` - Conversation state data (JSONB)
- `created_at` / `updated_at` - Timestamps

### `messages`
Stores individual messages in conversations:
- `id` - UUID primary key
- `conversation_id` - Foreign key to conversations
- `role` - 'user' or 'assistant'
- `content` - Message text
- `created_at` - Timestamp

### `generated_content`
Stores final generated content:
- `id` - UUID primary key
- `conversation_id` - Foreign key to conversations
- `content` - Generated text content
- `image_url` - URL to generated image (if applicable)
- `video_url` - URL to generated video (if applicable)
- `created_at` - Timestamp

## Policies

Row Level Security (RLS) is enabled on all tables with permissive policies for development. For production, you should:

1. Implement proper authentication
2. Update RLS policies to restrict access based on user authentication
3. Consider adding user_id columns to track ownership

## Indexes

The schema includes indexes for:
- Filtering by content type
- Sorting by creation date
- Looking up messages and generated content by conversation ID

These ensure fast queries even with large datasets.
