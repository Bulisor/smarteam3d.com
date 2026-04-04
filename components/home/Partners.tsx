import { ExternalLink } from 'lucide-react'

const partners = [
  {
    href: 'https://the3dfactory.nl/',
    name: 'The 3D Factory',
    desc: 'Our partner for 3D visualization and video rendering services',
  },
  {
    href: 'https://curiosityai.nl/',
    name: 'Curiosity AI',
    desc: 'Our partner for Software development and AI Solutions',
  },
  {
    href: 'https://prosim3d.com/',
    name: 'ProSim3D',
    desc: 'Our partner for professional 3D simulation solutions',
  },
  {
    href: 'https://brightspaces.ai/',
    name: 'BrightSpaces AI',
    desc: 'Our partner for AI-powered space planning and visualization',
  },
]

export default function Partners() {
  return (
    <section id="partners" className="py-24" style={{ backgroundColor: 'var(--surface-alt)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Our Partners
          </h2>
          <div className="w-10 h-0.5 bg-primary mx-auto" />
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-card group flex items-center gap-5 p-7 rounded-2xl hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
              }}
            >
              {/* Initial badge */}
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(158,7,7,0.08)' }}
              >
                <span
                  className="text-primary font-bold text-lg"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {p.name.charAt(0)}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4
                    className="font-bold text-sm"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }}
                  >
                    {p.name}
                  </h4>
                  <ExternalLink
                    size={12}
                    className="text-primary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  />
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-color)' }}>
                  {p.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
