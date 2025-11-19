# Deploy Rhythm to Netlify

## Quick Deploy Steps

### 1. Connect GitHub Repository

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Authorize Netlify if needed
5. Select **InnovareAI/rhythm** repository

### 2. Configure Build Settings

The site should auto-detect Next.js settings, but verify:

- **Framework preset:** Next.js
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Functions directory:** (leave empty - Next.js handles this)

### 3. Add Environment Variables

Before deploying, click **"Add environment variables"**:

```
OPENROUTER_API_KEY = [YOUR_OPENROUTER_API_KEY_HERE]
OPENROUTER_MODEL = openai/gpt-4-turbo-preview
```

**Important:** Make sure to select **"Same value for all deploy contexts"** or just add to Production.

### 4. Deploy

1. Click **"Deploy InnovareAI/rhythm"**
2. Wait for build to complete (usually 2-3 minutes)
3. Netlify will provide a URL like: `https://rhythm-content-hub.netlify.app`

### 5. Configure Custom Domain (Optional)

If you want a custom domain:
1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow Netlify's DNS configuration instructions

## After First Deploy

Once connected via GitHub, every `git push` to main will automatically trigger a new deployment!

## Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Check build logs for specific errors
- Ensure `.env.local` is NOT committed (it's in .gitignore)

### API Doesn't Work
- Verify `OPENROUTER_API_KEY` is set in Netlify dashboard
- Check the Functions tab in Netlify dashboard for errors
- OpenRouter API calls should work automatically via Next.js API routes

### Site is Blank
- Check if `.next` is the correct publish directory
- Look at deploy logs for any errors during build

## Testing the Live Site

Once deployed, test:
1. Visit the site URL
2. Click "HCP Email" or "Social Media"
3. Go through the chat flow
4. Verify content generates correctly
5. Check preview displays properly

## Site URLs

- **GitHub Repo:** https://github.com/InnovareAI/rhythm
- **Local Dev:** http://localhost:3000
- **Netlify (after deploy):** Will be provided after first deployment
