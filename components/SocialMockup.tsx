'use client'

import { useRef } from 'react'
import html2canvas from 'html2canvas'

type Platform = 'instagram' | 'facebook' | 'twitter'

interface SocialMockupProps {
  platform: Platform
  imageUrl: string
  caption: string
  profileName?: string
  username?: string
}

export default function SocialMockup({
  platform,
  imageUrl,
  caption,
  profileName = 'Brand Name',
  username = 'brandname'
}: SocialMockupProps) {
  const mockupRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!mockupRef.current) return

    try {
      const canvas = await html2canvas(mockupRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      })

      const link = document.createElement('a')
      link.download = `${platform}-mockup-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error generating mockup image:', error)
      alert('Failed to download mockup. Please try again.')
    }
  }

  // Clean caption for display
  const cleanCaption = (text: string) => {
    let cleaned = text.replace(/###\s*\d+\.\s*CAPTION\s*/i, '').trim()
    // Take first 200 characters for preview
    if (cleaned.length > 200) {
      cleaned = cleaned.substring(0, 200) + '...'
    }
    return cleaned
  }

  const displayCaption = cleanCaption(caption)

  if (platform === 'instagram') {
    return (
      <div className="space-y-4">
        <div ref={mockupRef} className="mx-auto w-full max-w-[540px] bg-white">
          {/* Instagram Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5">
                <div className="h-full w-full rounded-full bg-white"></div>
              </div>
              <span className="text-sm font-semibold">{username}</span>
            </div>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </div>

          {/* Instagram Image */}
          <div className="relative aspect-square w-full bg-gray-100">
            <img
              src={imageUrl}
              alt="Post"
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
          </div>

          {/* Instagram Actions */}
          <div className="border-b border-gray-200 p-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex gap-4">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </div>
            <p className="mb-1 text-sm font-semibold">2,847 likes</p>
            <p className="text-sm">
              <span className="font-semibold">{username}</span> {displayCaption}
            </p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="w-full rounded-lg bg-[#FF6B35] px-4 py-2 text-sm font-medium text-white hover:bg-[#E65A2B]"
        >
          Download Instagram Mockup
        </button>
      </div>
    )
  }

  if (platform === 'facebook') {
    return (
      <div className="space-y-4">
        <div ref={mockupRef} className="mx-auto w-full max-w-[600px] rounded-lg bg-white shadow-sm">
          {/* Facebook Header */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-blue-500"></div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{profileName}</p>
                <p className="text-xs text-gray-500">Just now · 🌐</p>
              </div>
            </div>
            <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </div>

          {/* Facebook Caption */}
          <div className="px-4 pb-3">
            <p className="text-sm text-gray-900">{displayCaption}</p>
          </div>

          {/* Facebook Image */}
          <div className="w-full bg-gray-100">
            <img
              src={imageUrl}
              alt="Post"
              className="w-full object-cover"
              style={{ maxHeight: '600px' }}
              crossOrigin="anonymous"
            />
          </div>

          {/* Facebook Stats */}
          <div className="border-b border-gray-200 px-4 py-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>👍 ❤️ 🎉 3.2K</span>
              <span>487 Comments · 129 Shares</span>
            </div>
          </div>

          {/* Facebook Actions */}
          <div className="flex items-center justify-around p-2">
            <button className="flex items-center gap-2 rounded px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              Like
            </button>
            <button className="flex items-center gap-2 rounded px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Comment
            </button>
            <button className="flex items-center gap-2 rounded px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="w-full rounded-lg bg-[#FF6B35] px-4 py-2 text-sm font-medium text-white hover:bg-[#E65A2B]"
        >
          Download Facebook Mockup
        </button>
      </div>
    )
  }

  // Twitter/X
  return (
    <div className="space-y-4">
      <div ref={mockupRef} className="mx-auto w-full max-w-[600px] rounded-lg border border-gray-200 bg-white">
        {/* Twitter Header */}
        <div className="flex gap-3 p-4">
          <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-300"></div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900">{profileName}</span>
              <span className="text-gray-500">@{username} · 2m</span>
            </div>

            {/* Twitter Caption */}
            <p className="mt-2 text-sm text-gray-900 whitespace-pre-wrap">{displayCaption}</p>

            {/* Twitter Image */}
            <div className="mt-3 overflow-hidden rounded-2xl border border-gray-200">
              <img
                src={imageUrl}
                alt="Post"
                className="w-full object-cover"
                style={{ maxHeight: '450px' }}
                crossOrigin="anonymous"
              />
            </div>

            {/* Twitter Stats */}
            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
              <span>1.2K Retweets</span>
              <span>3.4K Likes</span>
              <span>98 Bookmarks</span>
            </div>

            {/* Twitter Actions */}
            <div className="mt-3 flex items-center justify-around border-t border-gray-200 pt-2">
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-green-500">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-pink-500">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="w-full rounded-lg bg-[#FF6B35] px-4 py-2 text-sm font-medium text-white hover:bg-[#E65A2B]"
      >
        Download Twitter Mockup
      </button>
    </div>
  )
}
