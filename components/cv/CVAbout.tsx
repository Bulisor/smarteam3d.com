import EmblaCarousel from '@/components/ui/EmblaCarousel'

const cards = [
  {
    title: 'Full-stack developer, ...by mistake',
    period: '07.2013 – 03.2016',
    slides: [
      '/img_new/more02/0_1.jpg',
      '/img_new/more02/0_2.jpg',
      '/img_new/more02/0_3.jpg',
      '/img_new/more02/0_4.jpg',
    ],
    content: (
      <>
        <p className="mb-2 text-justify text-sm">
          So, it all began in 2013 when, with a mathematics degree under my belt and solid logical
          skills, I decided to venture into programming.
        </p>
        <p className="mb-2 text-justify text-sm">
          I kicked things off with HTML and CSS, then sprinkled in some JavaScript to bring my
          pages to life. Before long, my journey took me deeper into the realm of back-end using
          PHP, stitching together a seamless bridge from back to front.
        </p>
        <p className="mb-2 text-justify text-sm">
          Just like that, I found myself as a full-stack developer — not by design, but by simply
          diving deep and ticking off my tasks.
        </p>
      </>
    ),
  },
  {
    title: 'Falling for the 3D World',
    period: '03.2016 – 11.2016',
    slides: [
      '/img_new/more02/1_1.jpg',
      '/img_new/more02/1_2.jpg',
      '/img_new/more02/1_3.jpg',
      '/img_new/more02/1_4.jpg',
    ],
    content: (
      <>
        <p className="mb-2 text-justify text-sm">
          Fortunately, among the usual tasks, I tackled something a bit out of the ordinary. I
          developed features to customize your team&apos;s gear, logo, and even the players&apos;
          faces, all using Three.js.{' '}[
          <a className="text-primary hover:underline" href="https://www.youtube.com/watch?v=MNyBGgwF98Q" target="_blank" rel="noopener noreferrer">Video1</a>
          ,{' '}
          <a className="text-primary hover:underline" href="https://www.youtube.com/watch?v=i-XBH6qlmXA" target="_blank" rel="noopener noreferrer">Video2</a>
          ]
        </p>
        <p className="mb-2 text-justify text-sm">
          That&apos;s where the spark ignited. And it was then that we decided to develop a 3D
          strategy game for browsers.
        </p>
        <p className="mb-2 text-justify text-sm">
          I enthusiastically began game development with WebGL and Babylon.js, but soon we
          realized the tech wasn&apos;t up to our ambitious visions.
        </p>
      </>
    ),
  },
  {
    title: 'Shifting Gears in Game Development',
    period: '11.2016 – 08.2017',
    slides: [
      '/img_new/more02/2_1.jpg',
      '/img_new/more02/2_2.jpg',
      '/img_new/more02/2_3.jpg',
      '/img_new/more02/2_4.jpg',
    ],
    content: (
      <>
        <p className="mb-2 text-justify text-sm">
          Making a strategic shift, we transitioned to desktop development with C# and Unity,
          setting our sights on creating a standalone PC game.{' '}[
          <a className="text-primary hover:underline" href="https://www.youtube.com/watch?v=7MRQ2FPpOhI" target="_blank" rel="noopener noreferrer">Video1</a>
          ,{' '}
          <a className="text-primary hover:underline" href="https://www.youtube.com/watch?v=uAeB3MbYtEU" target="_blank" rel="noopener noreferrer">Video2</a>
          ]
        </p>
        <p className="mb-2 text-justify text-sm">
          I enjoyed it more than I ever imagined, and I can confidently say I learned a ton about
          software development during that time... so much so that I thought I&apos;d never make
          games again.
        </p>
        <p className="mb-2 text-justify text-sm">
          Just kidding, of course! It was a great experience, but somehow not quite what I was
          looking for.
        </p>
      </>
    ),
  },
  {
    title: 'Continuous Self-Rediscovery',
    period: '08.2017 – present',
    slides: [
      '/img_new/more02/3_1.jpg',
      '/img_new/more02/3_2.jpg',
      '/img_new/more02/3_3.jpg',
      '/img_new/more02/3_4.jpg',
      '/img_new/more02/3_5.jpg',
      '/img_new/more02/3_6.jpg',
    ],
    content: (
      <>
        <p className="mb-2 text-justify text-sm">
          By August 2017, one chapter of my professional journey came to a close. Following my
          tenure as an employee, I founded <strong>Smarteam3D</strong>, my solo endeavor.
          Smarteam3D embodies my passion and dedication, and the 3D realm is where I continue to
          push boundaries.
        </p>
        <p className="mb-4 text-justify text-sm">
          Reflecting on these years, with dedication and countless sleepless nights, I can
          proudly say: &ldquo;Looking back, every moment was worth it!&rdquo;
        </p>
      </>
    ),
  },
]

export default function CVAbout() {
  return (
    <section id="about" className="py-24" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }}
          >
            More About Me
          </h2>
          <div className="w-10 h-0.5 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="p-6 rounded-2xl"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h3
                className="font-semibold text-lg mb-0.5"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--heading-color)' }}
              >
                {card.title}
              </h3>
              <p className="text-xs font-medium mb-4 text-primary">{card.period}</p>
              <div style={{ color: 'var(--text-color)' }}>{card.content}</div>
              <div className="mt-4">
                <EmblaCarousel slides={card.slides} showNav showDots />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
