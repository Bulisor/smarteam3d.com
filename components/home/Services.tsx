import { Diamond, Rocket, FlaskConical, Settings, Pencil, Gem } from 'lucide-react'

const services = [
  {
    icon: Diamond,
    title: 'Interactive Web Experiences',
    desc: 'Develop cross-platform 3D apps in browser',
  },
  {
    icon: Rocket,
    title: '3D Design & Animations for Media',
    desc: 'Create 3D modeling & animations for digital media content',
  },
  {
    icon: Gem,
    title: 'VR & AR Marketing Solutions',
    desc: 'AR & VR solutions like enhanced catalogs, interactive ads',
  },
  {
    icon: FlaskConical,
    title: '3D Visualization Tools',
    desc: 'Create bespoke 3D tools for varying visualizations',
  },
  {
    icon: Settings,
    title: 'Creative Idea',
    desc: 'Create a proof of concept based on your wishes',
  },
  {
    icon: Pencil,
    title: 'Awesome Support',
    desc: "Ask any questions, we'll try to give the answer you need asap",
  },
]

export default function Services() {
  return (
    <section id="service" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-headings" style={{ fontFamily: 'var(--font-heading)' }}>
            What we offer
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="text-center p-6 group">
              <div className="flex justify-center mb-4">
                <s.icon
                  size={36}
                  className="text-primary group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="text-lg font-bold text-headings mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {s.title}
              </h3>
              <p className="text-body text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
