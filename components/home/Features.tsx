import EmblaCarousel from '@/components/ui/EmblaCarousel'

const slides = [
  '/img/industrial_config.png',
  '/img/furniture_config.png',
  '/img/realEstate_config.png',
]

const points = [
  {
    title: 'Embrace the Future with Effortless 3D Technology',
    body: 'Have you ever been excited about the potential of future technologies, only to be held back by the limitations of your device? Bulky downloads, large storage requirements, and the need for high-end specs can be frustrating roadblocks. But what if you could leap over these barriers effortlessly?',
  },
  {
    title: 'Streamlined 3D Experiences Right in Your Browser',
    body: 'With our cutting-edge 3D configurator, you can dive into immersive 3D scenes directly in your browser — no plugins, no hefty app installations, just seamless integration at your fingertips. Whether you\'re on a desktop, tablet, or mobile, our technology adapts to your needs.',
  },
  {
    title: 'Your Imagination, Our Technology',
    body: 'We\'re not just providers; we\'re your tech partners in exploration. Share your vision with us, and watch as we bring it to life with our state-of-the-art 3D configurator. Your wish, coupled with our expertise, equals endless possibilities.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24" style={{ backgroundColor: 'var(--surface-alt)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Why Choose Us
          </h2>
          <div className="w-10 h-0.5 bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="space-y-8">
            {points.map((p, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                </div>
                <div>
                  <h5
                    className="font-bold mb-2 text-sm"
                    style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }}
                  >
                    {p.title}
                  </h5>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-color)' }}>
                    {p.body}
                  </p>
                </div>
              </div>
            ))}

            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
              </div>
              <div>
                <h5
                  className="font-bold mb-2 text-sm"
                  style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }}
                >
                  Step into the Future Today
                </h5>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-color)' }}>
                  Let&apos;s redefine what&apos;s possible together. Contact us now and see how
                  easy and accessible the future can be!
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-md)' }}>
            <EmblaCarousel slides={slides} autoplay showNav showDots={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
