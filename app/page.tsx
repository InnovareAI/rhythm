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
            <p className="text-sm font-medium text-[#007a80]">Creative Hub</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hub Selection */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-[#4a4f55] sm:text-4xl">
            Select Your Campaign
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#4a4f55]">
            Choose a content hub to get started
          </p>
        </div>

        {/* Hub Cards */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch max-w-5xl mx-auto mb-16">
          {/* IMCIVREE Branded Hub Card */}
          <div className="group relative rounded-2xl border-2 border-[#007a80] bg-white p-8 shadow-lg sm:max-w-md flex-1">
            <div className="relative">
              <div className="mb-4 flex justify-center">
                <img
                  src="https://rhythmtx.com/wp-content/uploads/2024/10/imcivree-logo-big.png"
                  alt="IMCIVREE"
                  className="h-10"
                />
              </div>
              <h3 className="text-center text-xl font-bold text-[#007a80]">IMCIVREE Creative Hub</h3>
              <p className="mt-2 text-center text-sm text-[#4a4f55]">
                Branded promotional content with ISI
              </p>
              <div className="mt-4 text-center">
                <span className="inline-block rounded-full bg-[#007a80]/10 px-3 py-1 text-xs font-medium text-[#007a80]">
                  Branded
                </span>
              </div>
            </div>
          </div>

          {/* Disease Awareness Hub Card */}
          <Link
            href="/disease-awareness"
            className="group relative rounded-2xl border-2 border-[#1a1652] bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:border-[#00a7df] hover:bg-[#f9f2f8] sm:max-w-md flex-1"
          >
            <div className="relative">
              <div className="mb-4 flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1a1652] to-[#00a7df]">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-center text-xl font-bold text-[#1a1652]">Disease Awareness Hub</h3>
              <p className="mt-2 text-center text-sm text-[#4a4f55]">
                Unbranded disease education content
              </p>
              <div className="mt-4 text-center">
                <span className="inline-block rounded-full bg-[#1a1652]/10 px-3 py-1 text-xs font-medium text-[#1a1652]">
                  Unbranded
                </span>
              </div>
              <div className="mt-4 flex justify-center">
                <span className="inline-flex items-center text-sm font-semibold text-[#00a7df] group-hover:text-[#1a1652]">
                  Enter Hub
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-[#007a80]/20 my-12"></div>

        {/* IMCIVREE Section */}
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
        <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-center items-stretch max-w-4xl mx-auto">
          {/* Emails Card */}
          <Link
            href="/chat"
            className="group relative rounded-2xl border-2 border-[#007a80] bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:border-[#1c7b80] hover:bg-[#f6fbfb] sm:max-w-md flex-1"
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
            className="group relative rounded-2xl border-2 border-[#007a80] bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:border-[#1c7b80] hover:bg-[#f6fbfb] sm:max-w-md flex-1"
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

        {/* Ziflow Reviews Card - Centered Below */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/reviews"
            className="group relative rounded-2xl border-2 border-[#007a80] bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:border-[#1c7b80] hover:bg-[#f6fbfb] max-w-md w-full"
          >
            <div className="relative flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#007a80]">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#007a80]">Content Review & Feedback</h3>
                <p className="text-sm text-[#4a4f55]">
                  View feedback and address reviewer comments
                </p>
              </div>
              <svg className="h-5 w-5 text-[#007a80] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
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
