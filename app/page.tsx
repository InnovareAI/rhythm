import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#FF6B35]">3cubed</h1>
            <p className="text-sm text-gray-400">Pharma Content Hub</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Create Compliant Pharma Content
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Generate FDA-compliant marketing materials for rare disease pharmaceuticals.
            From HCP emails to social media posts, all with proper ISI and references.
          </p>
        </div>

        {/* Content Type Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* HCP Email Card */}
          <Link
            href="/chat?type=hcp-email"
            className="group relative rounded-2xl border border-[#FF6B35] bg-[#FF6B35] p-8 shadow-sm transition-all hover:shadow-lg hover:bg-[#E65A2B]"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">HCP Email</h3>
              <p className="mt-2 text-sm text-white/90">
                Create professional emails for healthcare providers with proper structure, references, and ISI.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-white">
                Start creating
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Social Media Card */}
          <Link
            href="/chat?type=social-media"
            className="group relative rounded-2xl border border-[#FF6B35] bg-[#FF6B35] p-8 shadow-sm transition-all hover:shadow-lg hover:bg-[#E65A2B]"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Social Media</h3>
              <p className="mt-2 text-sm text-white/90">
                Generate compliant social media posts for Facebook, Instagram, and X with hashtags and visual prompts.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-white">
                Start creating
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Short Video Card */}
          <Link
            href="/chat?type=video"
            className="group relative rounded-2xl border border-[#FF6B35] bg-[#FF6B35] p-8 shadow-sm transition-all hover:shadow-lg hover:bg-[#E65A2B]"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">Short Video</h3>
              <p className="mt-2 text-sm text-white/90">
                Generate scripts and concepts for short video clips and reels for social media.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-white">
                Start creating
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h3 className="text-center text-2xl font-bold text-white">Built for Compliance</h3>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#007a80]/10">
                <svg className="h-6 w-6 text-[#007a80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="mt-4 font-semibold text-white">FDA Compliant</h4>
              <p className="mt-2 text-sm text-gray-400">All content includes proper ISI and follows regulations</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE5DC]">
                <svg className="h-6 w-6 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="mt-4 font-semibold text-white">AMA References</h4>
              <p className="mt-2 text-sm text-gray-400">Proper citation formatting for all claims</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE5DC]">
                <svg className="h-6 w-6 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h4 className="mt-4 font-semibold text-white">Brand Consistent</h4>
              <p className="mt-2 text-sm text-gray-400">Maintains visual identity and tone guidelines</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE5DC]">
                <svg className="h-6 w-6 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="mt-4 font-semibold text-white">Fast Generation</h4>
              <p className="mt-2 text-sm text-gray-400">Create content in minutes, not weeks</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-gray-800 bg-black">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 3cubed Content Hub. Built for pharmaceutical content generation.
          </p>
        </div>
      </footer>
    </div>
  )
}
