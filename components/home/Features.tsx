import EmblaCarousel from '@/components/ui/EmblaCarousel'

const slides = [
  '/img/industrial_config.png',
  '/img/furniture_config.png',
  '/img/realEstate_config.png',
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-grey">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-headings" style={{ fontFamily: 'var(--font-heading)' }}>
            Why Choose Us
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-justify leading-relaxed space-y-4">
            <h5 className="font-bold text-headings" style={{ fontFamily: 'var(--font-heading)' }}>
              Embrace the Future with Effortless 3D Technology
            </h5>
            <p>
              Have you ever been excited about the potential of future technologies, only to be
              held back by the limitations of your device? Bulky downloads, large storage
              requirements, and the need for high-end specs can be frustrating roadblocks. But
              what if you could leap over these barriers effortlessly?
            </p>

            <h5 className="font-bold text-headings" style={{ fontFamily: 'var(--font-heading)' }}>
              Introducing Streamlined 3D Experiences Right in Your Browser
            </h5>
            <p>
              With our cutting-edge 3D configurator, you can dive into immersive 3D scenes
              directly in your browser &ndash; no plugins, no hefty app installations, just
              seamless integration at your fingertips. Whether you&apos;re on a desktop, tablet,
              or mobile, our technology adapts to your needs, ensuring a smooth and engaging
              experience.
            </p>

            <h5 className="font-bold text-headings" style={{ fontFamily: 'var(--font-heading)' }}>
              Your Imagination, Our Technology
            </h5>
            <p>
              Curious about how it all works? We&apos;re not just providers; we&apos;re your tech
              partners in exploration. Share your vision with us, and watch as we bring it to life
              with our state-of-the-art 3D configurator. Our promise is simple: your wish, coupled
              with our expertise, equals endless possibilities.
            </p>

            <h5 className="font-bold text-headings" style={{ fontFamily: 'var(--font-heading)' }}>
              Step into the Future Today
            </h5>
            <p>
              Let&apos;s redefine what&apos;s possible together. Contact us now and see how easy
              and accessible the future can be!
            </p>
          </div>

          <div>
            <EmblaCarousel slides={slides} autoplay showNav showDots={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
