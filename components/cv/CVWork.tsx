import EmblaCarousel from '@/components/ui/EmblaCarousel'
import { ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'Small Apps I Developed in My Free Time',
    slides: [
      '/img_new/more03/0_1.jpg',
      '/img_new/more03/0_2.jpg',
      '/img_new/more03/0_3.jpg',
      '/img_new/more03/0_4.jpg',
      '/img_new/more03/0_5.jpg',
      '/img_new/more03/0_6.jpg',
      '/img_new/more03/0_7.jpg',
    ],
    imageLeft: false,
    content: (
      <ul className="list-disc list-inside space-y-3 pt-4">
        {[
          { label: 'Car Configurator 1', desc: 'Design your dream car from wheels to paint.', link: '/portfolio/car_config.html' },
          { label: '3D Scatterplot', desc: 'A graph where points move freely in 3D space.', link: '/portfolio/3DScatterPlot.html' },
          { label: '360 Photo Viewer', desc: 'For those wanting to view the world at 360 degrees.', link: '/portfolio/photo_viewer.html' },
          { label: 'Car Configurator 2', desc: 'Design your dream car from wheels to paint.', link: '/portfolio/car_mx5/index.html' },
          { label: 'Cabinet Configurator', desc: 'A tool for customizing and visualizing cabinets.', link: '/portfolio/cabinet/index.html' },
          { label: 'Truck Configurator', desc: 'Design your dream truck from wheels to paint.', link: '/portfolio/truck/index.html' },
          { label: '3D Hat Configurator', desc: 'Customize a hat in 3D.', link: '/the3dfactory/hat/index.html' },
        ].map((item) => (
          <li key={item.label} className="text-sm md:text-base">
            <span className="font-bold" style={{ color: 'var(--heading-color)' }}>{item.label}:</span>{' '}
            <span style={{ color: 'var(--text-color)' }}>{item.desc}</span>{' '}
            {item.link ? (
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-primary font-medium hover:underline">
                <ExternalLink size={12} /> Link
              </a>
            ) : (
              <span className="text-primary/50 font-medium text-xs">no link yet</span>
            )}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: 'Ideeza — when IoT meets 3D  ~1y',
    slides: [
      '/img_new/more03/1_1.jpg',
      '/img_new/more03/1_2.jpg',
      '/img_new/more03/1_3.jpg',
      '/img_new/more03/1_4.jpg',
    ],
    imageLeft: true,
    content: (
      <>
        <h4 className="text-base font-semibold mt-4 mb-2" style={{ color: 'var(--heading-color)', fontFamily: 'var(--font-heading)' }}>Features</h4>
        <ul className="list-disc pl-6 mb-3 space-y-1 text-sm" style={{ color: 'var(--text-color)' }}>
          <li>Ability to set board dimensions, type, and layers</li>
          <li>Addition of various types of holes and cuts</li>
          <li>Create electronic parts as 3D objects from code</li>
          <li>Edit electronic PCB on realtime as 3D objects</li>
          <li>Building the editor for system operation code</li>
          <li>Assembly cover and create construction animations</li>
        </ul>
        <h4 className="text-base font-semibold mb-1" style={{ color: 'var(--heading-color)', fontFamily: 'var(--font-heading)' }}>Tech Stack</h4>
        <p className="text-sm" style={{ color: 'var(--text-color)' }}>Babylon.js (js/ts), Vue.js</p>
      </>
    ),
  },
  {
    title: 'Holzplatte — 2D & 3D Configurator  ~1y',
    slides: [
      '/img_new/more03/2_1.jpg',
      '/img_new/more03/2_2.jpg',
      '/img_new/more03/2_3.jpg',
      '/img_new/more03/2_4.jpg',
    ],
    imageLeft: false,
    content: (
      <>
        <h4 className="text-base font-semibold mt-4 mb-1" style={{ color: 'var(--heading-color)', fontFamily: 'var(--font-heading)' }}>
          2D Configurator{' '}
          <a href="https://holzplatte.de/en/decorative-particle-boards/decorative-laminates/44/sonoma-oak" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-primary text-sm font-medium hover:underline">
            <ExternalLink size={12} /> Link
          </a>
        </h4>
        <ul className="list-disc pl-6 my-2 space-y-1 text-sm" style={{ color: 'var(--text-color)' }}>
          <li>Ability to set board dimensions, type, and shape</li>
          <li>Addition of various types of holes and cuts</li>
          <li>Dynamic pricing based on configuration settings</li>
          <li>Generation of a PDF with board image and details</li>
        </ul>
        <p className="text-sm mb-3" style={{ color: 'var(--text-color)' }}><strong>Tech:</strong> Paper.js (js), Vue.js</p>

        <h4 className="text-base font-semibold mt-4 mb-1" style={{ color: 'var(--heading-color)', fontFamily: 'var(--font-heading)' }}>
          3D Configurator{' '}
          <a href="https://holzplatte.de/en/spiegelschraenke-bad/3d-spiegelschraenke/3d-spiegelschrank-mit-seitenregale/122/3d-side-space" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-primary text-sm font-medium hover:underline">
            <ExternalLink size={12} /> Link
          </a>
        </h4>
        <ul className="list-disc pl-6 my-2 space-y-1 text-sm" style={{ color: 'var(--text-color)' }}>
          <li>Ability to set board dimensions, type, and shape</li>
          <li>Addition of various types of holes and cuts</li>
          <li>Dynamic pricing based on configuration settings</li>
          <li>Generation of a PDF with board image and details</li>
        </ul>
        <p className="text-sm" style={{ color: 'var(--text-color)' }}><strong>Tech:</strong> Babylon.js (js), Vue.js</p>
      </>
    ),
  },
  {
    title: 'Logiqs — 3D Industrial Configurators  ~3.5y',
    titleLink: 'https://www.logiqs.nl/en/icube-as-rs',
    slides: [
      '/img_new/more03/3_1.jpg',
      '/img_new/more03/3_2.jpg',
      '/img_new/more03/3_3.jpg',
      '/img_new/more03/3_4.jpg',
      '/img_new/more03/3_5.jpg',
    ],
    imageLeft: true,
    content: (
      <>
        <h4 className="text-base font-semibold mt-4 mb-2" style={{ color: 'var(--heading-color)', fontFamily: 'var(--font-heading)' }}>Features</h4>
        <ul className="list-disc pl-6 mb-3 space-y-1 text-sm" style={{ color: 'var(--text-color)' }}>
          <li>Three different configurators: warehouse, vertical farm, and greenhouse</li>
          <li>Optimized scene to support large-scale projects</li>
          <li>All scene information computed in real-time based on user input{' '}
            <a href="https://www.youtube.com/watch?v=VEeMh4-PDJU" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-primary hover:underline"><ExternalLink size={11} /> Video</a>
          </li>
          <li>Fully customizable manual items that can be placed, rotated, or multiplied</li>
          <li>Accurate budget quotation for the drawn system in seconds</li>
          <li>Guided tutorial to facilitate user navigation</li>
          <li>Option to download system design in JSON, 3D, or CAD formats</li>
          <li>Real-time simulations of inbound and outbound{' '}
            <a href="https://www.youtube.com/watch?v=er0GiinNM2A" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-primary hover:underline"><ExternalLink size={11} /> Video</a>
          </li>
        </ul>
        <h4 className="text-base font-semibold mb-1" style={{ color: 'var(--heading-color)', fontFamily: 'var(--font-heading)' }}>Tech Stack</h4>
        <p className="text-sm" style={{ color: 'var(--text-color)' }}>Babylon.js (js/ts)</p>
      </>
    ),
  },
  {
    title: 'Brightspaces — Real Estate on the Web  ~3y',
    titleLink: 'https://brightspaces.tech/space-planning',
    slides: [
      '/img_new/more03/4_1.jpg',
      '/img_new/more03/4_2.jpg',
      '/img_new/more03/4_3.jpg',
    ],
    imageLeft: false,
    content: (
      <>
        <h4 className="text-base font-semibold mt-4 mb-2" style={{ color: 'var(--heading-color)', fontFamily: 'var(--font-heading)' }}>Features</h4>
        <ul className="list-disc pl-6 mb-3 space-y-1 text-sm" style={{ color: 'var(--text-color)' }}>
          <li>Load high-fidelity model for a realistic office space</li>
          <li>Interactive multiple views of 3D model</li>
          <li>3D virtual tour feature for immersive navigation</li>
          <li>In-scene 3D interior design customization</li>
          <li>Extensive menu interactions for 3D scene control</li>
          <li>Optimization of the 3D scene for enhanced performance</li>
        </ul>
        <h4 className="text-base font-semibold mb-1" style={{ color: 'var(--heading-color)', fontFamily: 'var(--font-heading)' }}>Tech Stack</h4>
        <p className="text-sm" style={{ color: 'var(--text-color)' }}>Babylon.js (ts), Vue.js, React.js</p>
      </>
    ),
  },
  {
    title: 'Other Part-time Projects',
    slides: [
      '/img_new/more03/5_1.jpg',
      '/img_new/more03/5_2.jpg',
      '/img_new/more03/5_3.jpg',
      '/img_new/more03/5_4.jpg',
      '/img_new/more03/5_5.jpg',
    ],
    imageLeft: true,
    content: (
      <ul className="list-disc list-inside space-y-3 pt-4 text-sm" style={{ color: 'var(--text-color)' }}>
        {[
          { label: 'Sneakers Configurator', desc: 'Design your dream sneakers.' },
          { label: 'Real Estate Configurator', desc: 'Overlay 3D models on a dynamic map using Mapbox.js' },
          { label: 'Spiritual App', desc: 'An innovative way to send messages and thoughts to loved ones' },
          { label: 'Online Market in VR', desc: 'Shopping from the couch, utilizing a VR headset' },
          { label: 'Bathroom Configurator', desc: 'Bathroom designs with a range of fixtures and finishes' },
        ].map((item) => (
          <li key={item.label}>
            <span className="font-bold" style={{ color: 'var(--heading-color)' }}>{item.label}:</span> {item.desc}
          </li>
        ))}
      </ul>
    ),
  },
]

export default function CVWork() {
  return (
    <section id="work" className="py-24" style={{ backgroundColor: 'var(--surface-alt)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }}
          >
            My Journey Through the Years
          </h2>
          <div className="w-10 h-0.5 bg-primary mx-auto" />
        </div>

        <div className="space-y-6">
          {projects.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {p.imageLeft ? (
                  <>
                    <div className="p-4">
                      <EmblaCarousel slides={p.slides} showNav showDots />
                    </div>
                    <div className="p-6">
                      <h3
                        className="font-semibold text-xl mb-2 flex items-start gap-2 flex-wrap"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }}
                      >
                        {p.title}
                        {'titleLink' in p && p.titleLink && (
                          <a href={p.titleLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-primary text-sm font-medium hover:underline mt-0.5">
                            <ExternalLink size={13} /> Link
                          </a>
                        )}
                      </h3>
                      {p.content}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-6">
                      <h3
                        className="font-semibold text-xl mb-2 flex items-start gap-2 flex-wrap"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }}
                      >
                        {p.title}
                        {'titleLink' in p && p.titleLink && (
                          <a href={p.titleLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 text-primary text-sm font-medium hover:underline mt-0.5">
                            <ExternalLink size={13} /> Link
                          </a>
                        )}
                      </h3>
                      {p.content}
                    </div>
                    <div className="p-4">
                      <EmblaCarousel slides={p.slides} showNav showDots />
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
