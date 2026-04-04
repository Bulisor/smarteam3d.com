import { Diamond, Rocket, FlaskConical, Settings, Pencil, Gem } from 'lucide-react'

const services = [
  {
    icon: Diamond,
    title: 'Interactive Web Experiences',
    desc: 'Develop cross-platform 3D apps that run directly in the browser — no installs, no plugins.',
  },
  {
    icon: Rocket,
    title: '3D Design & Animations for Media',
    desc: 'Create stunning 3D modeling & animations for digital media content and campaigns.',
  },
  {
    icon: Gem,
    title: 'VR & AR Marketing Solutions',
    desc: 'AR & VR solutions like enhanced catalogs, interactive ads, and immersive brand experiences.',
  },
  {
    icon: FlaskConical,
    title: '3D Visualization Tools',
    desc: 'Create bespoke 3D tools tailored to your unique visualization requirements.',
  },
  {
    icon: Settings,
    title: 'Creative Idea',
    desc: 'Share your vision and we will build a proof of concept that brings your ideas to life.',
  },
  {
    icon: Pencil,
    title: 'Awesome Support',
    desc: "Ask any questions, we'll try to give the answer you need as fast as possible.",
  },
]

export default function Services() {
  return (
    <section id="service" className="py-24" style={{ backgroundColor: 'var(--surface-alt)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            What We Offer
          </h2>
          <div className="w-10 h-0.5 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="hover-card group p-8 rounded-2xl hover:-translate-y-1"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-primary/20"
                style={{ backgroundColor: 'rgba(158,7,7,0.08)' }}
              >
                <s.icon size={22} className="text-primary" />
              </div>
              <h3
                className="text-base font-bold mb-2"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-color)' }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
