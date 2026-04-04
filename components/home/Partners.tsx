import Image from 'next/image'

const partners = [
  {
    href: 'https://the3dfactory.nl/',
    logo: '/img/logo_3dfactory.png',
    name: 'The 3D Factory',
    desc: 'Our partner for 3D visualization and video rendering services',
    logoWidth: 80,
  },
  {
    href: 'https://curiosityai.nl/',
    logo: '/img/logo_curiosity.jpg',
    name: 'Curiosity AI',
    desc: 'Our partner for Software development and AI Solutions',
    logoWidth: 200,
  },
]

export default function Partners() {
  return (
    <section id="partners" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-headings" style={{ fontFamily: 'var(--font-heading)' }}>
            Partners
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-6 p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0">
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={p.logoWidth}
                  height={60}
                  className="object-contain h-12 w-auto"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-headings" style={{ fontFamily: 'var(--font-heading)' }}>
                  {p.name}
                </h4>
                <p className="text-body text-sm mt-1">{p.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
