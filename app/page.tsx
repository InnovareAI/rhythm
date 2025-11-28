import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6fbfb] via-white to-[#f6fbfb]">
      {/* Header */}
      <header className="border-b border-[#007a80]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#007a80]">3cubed</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/content-history"
                className="flex items-center gap-2 text-sm text-[#4a4f55] hover:text-[#007a80]"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Content History
              </Link>
              <p className="text-sm font-medium text-[#007a80]">Creative Hub</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* IMCIVREE Logo */}
          <div className="mb-6 flex justify-center">
            <img
              src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png"
              alt="IMCIVREE"
              className="h-12"
            />
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-[#007a80] sm:text-5xl">
            IMCIVREE CREATIVE HUB
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-[#4a4f55]">
            Let's Create Your Tactics!
          </p>
        </div>

        {/* Content Type Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          {/* Emails Card */}
          <Link
            href="/chat"
            className="group relative rounded-2xl border-2 border-[#007a80] bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:border-[#1c7b80] hover:bg-[#f6fbfb]"
          >
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#007a80]">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-[#007a80]">HCP + Patient Emails</h3>
              <p className="mt-3 text-[#4a4f55]">
                Create professional HTML emails for healthcare providers and patients/caregivers with proper structure, references, and ISI.
              </p>
              <div className="mt-6 inline-flex items-center rounded-full bg-[#007a80] px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-[#1c7b80]">
                Let's create an email
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Banner Ads Card */}
          <Link
            href="/banner-generator"
            className="group relative rounded-2xl border-2 border-[#007a80] bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:border-[#1c7b80] hover:bg-[#f6fbfb]"
          >
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#007a80]">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-[#007a80]">HCP + Patient Banner Ads</h3>
              <p className="mt-3 text-[#4a4f55]">
                Generate animated banner ads with scrolling ISI for healthcare providers and patients/caregivers.
              </p>
              <div className="mt-6 inline-flex items-center rounded-full bg-[#007a80] px-6 py-3 text-sm font-semibold text-white transition-colors group-hover:bg-[#1c7b80]">
                Let's create a banner
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h3 className="text-center text-2xl font-bold text-[#007a80]">Here to Deliver:</h3>
          <div className="mt-12 grid gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#007a80]/10">
                <svg className="h-7 w-7 text-[#007a80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="mt-4 text-lg font-bold text-[#007a80]">Med-Legal Ready</h4>
              <p className="mt-2 text-sm text-[#4a4f55]">Get to approval faster</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#007a80]/10">
                <svg className="h-7 w-7 text-[#007a80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="mt-4 text-lg font-bold text-[#007a80]">Fully Referenced</h4>
              <p className="mt-2 text-sm text-[#4a4f55]">Every claim supported</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#007a80]/10">
                <svg className="h-7 w-7 text-[#007a80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="mt-4 text-lg font-bold text-[#007a80]">Instant Changes</h4>
              <p className="mt-2 text-sm text-[#4a4f55]">No back and forth emails</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-[#007a80]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-[#4a4f55]">
            ©2025 Brought to you by <span className="font-semibold">3cubed</span> x <span className="font-semibold">K+M Creative Intelligence Labs</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
