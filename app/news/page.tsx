import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News | SmarTeam3D',
}

export default function NewsPage() {
  return (
    <main className="pt-16">
      <div className="py-10 bg-grey">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-headings" style={{ fontFamily: 'var(--font-heading)' }}>
            News section
          </h2>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-body">Coming soon...</p>
        </div>
      </section>
    </main>
  )
}
