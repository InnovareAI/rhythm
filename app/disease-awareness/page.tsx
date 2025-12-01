import Link from 'next/link'

export default function DiseaseAwarenessHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9f2f8] via-white to-[#f9f2f8]">
      {/* Header */}
      <header className="border-b border-[#1a1652]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="text-2xl font-bold text-[#1a1652] hover:text-[#00a7df] transition-colors">
                3cubed
              </Link>
            </div>
            <p className="text-sm font-medium text-[#1a1652]">Disease Awareness Hub</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Brain Icon */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1a1652] to-[#00a7df]">
              <svg className="h-9 w-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-[#1a1652] sm:text-5xl">
            DISEASE AWARENESS HUB
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-[#4a4f55]">
            Acquired Hypothalamic Obesity (aHO) Education
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#4a4f55]">
            Unbranded disease education content for healthcare professionals
          </p>
        </div>

        {/* Content Type Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
          {/* Emails Card */}
          <Link
            href="/disease-awareness/chat"
            className="group relative rounded-2xl border-2 border-[#1a1652] bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:border-[#00a7df] hover:bg-[#f9f2f8]"
          >
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a1652] to-[#00a7df]">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-[#1a1652]">HCP Education Emails</h3>
              <p className="mt-3 text-[#4a4f55]">
                Create disease education emails for healthcare providers about acquired hypothalamic obesity.
              </p>
              <div className="mt-6 inline-flex items-center rounded-full bg-gradient-to-r from-[#1a1652] to-[#00a7df] px-6 py-3 text-sm font-semibold text-white transition-opacity group-hover:opacity-90">
                Create email
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Banner Ads Card */}
          <Link
            href="/disease-awareness/banner-generator"
            className="group relative rounded-2xl border-2 border-[#1a1652] bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:border-[#00a7df] hover:bg-[#f9f2f8]"
          >
            <div className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a1652] to-[#00a7df]">
                <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-[#1a1652]">HCP Education Banners</h3>
              <p className="mt-3 text-[#4a4f55]">
                Generate animated disease awareness banner ads with educational references.
              </p>
              <div className="mt-6 inline-flex items-center rounded-full bg-gradient-to-r from-[#1a1652] to-[#00a7df] px-6 py-3 text-sm font-semibold text-white transition-opacity group-hover:opacity-90">
                Create banner
                <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Target Audience Info */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-[#1a1652]">Target HCP Segments</h3>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <span className="inline-block rounded-full bg-[#1a1652]/10 px-4 py-2 text-sm font-medium text-[#1a1652]">
              Endocrinologists
            </span>
            <span className="inline-block rounded-full bg-[#1a1652]/10 px-4 py-2 text-sm font-medium text-[#1a1652]">
              Pediatricians
            </span>
            <span className="inline-block rounded-full bg-[#1a1652]/10 px-4 py-2 text-sm font-medium text-[#1a1652]">
              Obesity & Nutrition Specialists
            </span>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h3 className="text-center text-2xl font-bold text-[#1a1652]">Disease Education Focus:</h3>
          <div className="mt-12 grid gap-8 sm:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1a1652]/10">
                <svg className="h-7 w-7 text-[#1a1652]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="mt-4 text-lg font-bold text-[#1a1652]">Hypothalamic Origin</h4>
              <p className="mt-2 text-sm text-[#4a4f55]">Understanding the brain's role in obesity</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1a1652]/10">
                <svg className="h-7 w-7 text-[#1a1652]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="mt-4 text-lg font-bold text-[#1a1652]">Recognize the Signs</h4>
              <p className="mt-2 text-sm text-[#4a4f55]">Early identification and diagnosis</p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1a1652]/10">
                <svg className="h-7 w-7 text-[#1a1652]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="mt-4 text-lg font-bold text-[#1a1652]">Evidence-Based</h4>
              <p className="mt-2 text-sm text-[#4a4f55]">Referenced educational content</p>
            </div>
          </div>
        </div>

        {/* Back to Hub Selection */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-[#00a7df] hover:text-[#1a1652] transition-colors"
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Hub Selection
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-[#1a1652]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-[#4a4f55]">
            ©2025 Brought to you by <span className="font-semibold">3cubed</span> x <span className="font-semibold">K+M Creative Intelligence Labs</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
