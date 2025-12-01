import Link from 'next/link'

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

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Hub Selection */}
        <div className="text-center mb-16">
          <p className="text-xl text-[#4a4f55]">
            Choose a content hub to get started
          </p>
        </div>

        {/* Hub Cards */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-stretch max-w-4xl mx-auto">
          {/* IMCIVREE Branded Hub Card */}
          <Link
            href="/imcivree"
            className="group relative rounded-2xl border-2 border-[#007a80] bg-white p-8 shadow-lg transition-all hover:shadow-xl hover:border-[#1c7b80] hover:bg-[#f6fbfb] sm:max-w-md flex-1"
          >
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
              <div className="mt-4 flex justify-center">
                <span className="inline-flex items-center text-sm font-semibold text-[#007a80] group-hover:text-[#1c7b80]">
                  Enter Hub
                  <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>

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
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#007a80]/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-[#4a4f55]">
            ©2025 Brought to you by <span className="font-semibold">3cubed</span> x <span className="font-semibold">K+M Creative Intelligence Labs</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
