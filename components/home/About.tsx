import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="py-24" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
            Who Are We
          </h2>
          <div className="w-10 h-0.5 bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div className="text-justify leading-relaxed space-y-5" style={{ color: 'var(--text-color)' }}>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;Welcome to{' '}
              <strong>
                <span className="text-primary">SmarTeam3D</span>
              </strong>
              , where we bring the future of digital interaction to your browser. Our 3D
              applications are not just smart and simple, they&apos;re transformative. From
              intricate furniture configurations to immersive real estate walkthroughs and complex
              industrial system designs, we&apos;ve done it all.
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;Each 3D scene we create allows for complete customization,
              offers views from every angle, and even includes a VR mode for an unprecedented
              immersive experience, all without the need to download any apps or plugins, and
              compatible with any device that supports WebGL.
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;Why settle for static images when you can showcase your
              product in full 3D glory? With our technology, your offerings aren&apos;t just
              visible; they&apos;re virtually alive. Increase your sales and enhance your
              brand&apos;s visibility by giving your customers a unique, hands-on virtual
              experience.
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;At{' '}
              <strong>
                <span className="text-primary">SmarTeam3D</span>
              </strong>
              , we don&apos;t just make apps; we bring your brand&apos;s vision to life in the
              digital world.
            </p>
          </div>

          <div className="flex justify-center">
            <Image
              src="/img/who_nobg.png"
              alt="SmarTeam3D"
              width={500}
              height={400}
              className="w-full max-w-md drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
