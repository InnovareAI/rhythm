#!/usr/bin/env node

/**
 * Test script to verify fal.ai Sora API endpoint and parameters
 * Run with: node scripts/test-video-api.js
 */

const fal = require('@fal-ai/serverless-client');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const FAL_KEY = process.env.FAL_KEY;

if (!FAL_KEY) {
  console.error('Error: FAL_KEY not found in environment variables');
  process.exit(1);
}

// Configure fal client
fal.config({
  credentials: FAL_KEY
});

async function testSoraAPI() {
  console.log('Testing fal.ai Sora API...\n');

  // Use a sample image URL for testing
  const testImageUrl = 'https://storage.googleapis.com/falai-public/model_tests/sora/input.jpg';
  const testPrompt = 'slow zoom in, professional atmosphere';

  console.log('Test parameters:');
  console.log('Image URL:', testImageUrl);
  console.log('Prompt:', testPrompt);
  console.log('');

  try {
    console.log('Attempting with model: fal-ai/sora\n');

    const result = await fal.subscribe('fal-ai/sora', {
      input: {
        image_url: testImageUrl,
        prompt: testPrompt,
        duration: 5,
        aspect_ratio: '16:9',
        loop: false
      },
      logs: true,
      onQueueUpdate: (update) => {
        console.log('Queue update:', update.status);
      },
    });

    console.log('\n✅ Success! Full result:');
    console.log(JSON.stringify(result, null, 2));

    const videoUrl = result.data?.video?.url;
    if (videoUrl) {
      console.log('\n✅ Video URL:', videoUrl);
    } else {
      console.log('\n⚠️  No video URL found in result');
    }

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error('\nFull error:');
    console.error(error);

    // Try alternate model names
    const alternateModels = [
      'fal-ai/sora-video',
      'fal-ai/sora-2',
      'fal-ai/sora/v2',
      'fal-ai/minimax/video-01',
      'fal-ai/luma-dream-machine',
      'fal-ai/runway-gen3/turbo/image-to-video'
    ];

    for (const modelName of alternateModels) {
      console.log(`\n\nTrying alternate model: ${modelName}...\n`);
      try {
        const result2 = await fal.subscribe(modelName, {
          input: {
            image_url: testImageUrl,
            prompt: testPrompt,
          },
          logs: false,
        });
        console.log(`\n✅ SUCCESS with ${modelName}!`);
        console.log(JSON.stringify(result2, null, 2));
        break; // Exit loop on first success
      } catch (error2) {
        console.error(`❌ Failed with ${modelName}:`, error2.message);
      }
    }
  }
}

testSoraAPI();
