import Link from 'next/link'

export default function ImcivreeHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6fbfb] via-white to-[#f6fbfb]">
      {/* Header */}
      <header className="border-b border-[#007a80]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-2xl font-bold text-[#007a80] hover:text-[#1c7b80] transition-colors">
                3cubed
              </Link>
            </div>
            <p className="text-sm font-medium text-[#007a80]">IMCIVREE Creative Hub</p>
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
            Branded Promotional Content Generator
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#4a4f55]">
            Create compliant promotional materials with Important Safety Information
          </p>
        </div>

        {/* Content Type Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
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
              <h3 className="mt-5 text-2xl font-bold text-[#007a80]">Promotional Emails</h3>
              <p className="mt-3 text-[#4a4f55]">
                Create branded HCP and consumer emails with full ISI compliance.
              </p>
              <div className="mt-6 inline-flex items-center rounded-full bg-[#007a80] px-6 py-3 text-sm font-semibold text-white transition-opacity group-hover:opacity-90">
                Create email
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
              <h3 className="mt-5 text-2xl font-bold text-[#007a80]">Banner Ads</h3>
              <p className="mt-3 text-[#4a4f55]">
                Generate animated banner ads with scrolling ISI for digital campaigns.
              </p>
              <div className="mt-6 inline-flex items-center rounded-full bg-[#007a80] px-6 py-3 text-sm font-semibold text-white transition-opacity group-hover:opacity-90">
                Create banner
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* MLR Reviews Card */}
          <Link
            href="/reviews"
            className="group relative rounded-2xl border-2 border-[#007a80] bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:border-[#1c7b80] hover:bg-[#f6fbfb]"
          >
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#007a80]">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-[#007a80]">MLR Reviews</h3>
              <p className="mt-3 text-[#4a4f55]">
                Review content for Medical, Legal, and Regulatory compliance.
              </p>
              <div className="mt-6 inline-flex items-center rounded-full bg-[#007a80] px-6 py-3 text-sm font-semibold text-white transition-opacity group-hover:opacity-90">
                Start review
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Target Audience Info */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-[#007a80]">Audience Segments</h3>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <span className="inline-block rounded-full bg-[#007a80]/10 px-4 py-2 text-sm font-medium text-[#007a80]">
              Healthcare Professionals
            </span>
            <span className="inline-block rounded-full bg-[#007a80]/10 px-4 py-2 text-sm font-medium text-[#007a80]">
              Consumers / Patients
            </span>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h3 className="text-center text-2xl font-bold text-[#007a80]">Built-In Compliance:</h3>
          <div className="mt-12 grid gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#007a80]/10">
                <svg className="h-7 w-7 text-[#007a80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="mt-4 text-lg font-bold text-[#007a80]">Full ISI Integration</h4>
              <p className="mt-2 text-sm text-[#4a4f55]">Important Safety Information included automatically</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#007a80]/10">
                <svg className="h-7 w-7 text-[#007a80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="mt-4 text-lg font-bold text-[#007a80]">FDA Guidelines</h4>
              <p className="mt-2 text-sm text-[#4a4f55]">Content follows regulatory requirements</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#007a80]/10">
                <svg className="h-7 w-7 text-[#007a80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="mt-4 text-lg font-bold text-[#007a80]">MLR Ready</h4>
              <p className="mt-2 text-sm text-[#4a4f55]">Streamlined Medical, Legal, Regulatory review</p>
            </div>
          </div>
        </div>

        {/* Back to Hub Selection */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-[#007a80] hover:text-[#1c7b80] transition-colors"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Hub Selection
          </Link>
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
