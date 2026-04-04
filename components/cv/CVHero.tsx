import Image from 'next/image'

export default function CVHero() {
  return (
    <section
      id="home"
      className="bg-white min-h-[calc(100vh-64px)] flex flex-col justify-center items-center py-16"
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Image
          src="/img_new/profile.jpg"
          alt="Marian Gaje"
          width={300}
          height={300}
          className="mx-auto w-48 md:w-64 rounded-full my-6 object-cover"
        />
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-headings mb-6"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          From Math to 3D World
        </h1>
        <p className="text-xl text-center mb-4 w-full md:w-2/3 mx-auto leading-relaxed">
          Hey, I&apos;m <span className="font-bold text-headings">Marian Gaje</span> and I have a
          passion for mathematics and the world of 3D. While I don&apos;t usually brand myself
          strictly as a <span className="font-bold text-headings">WebGL developer</span>, I&apos;ve
          certainly enjoyed leaving my creative footprint in that space.
        </p>
        <p className="text-xl font-bold text-center mb-4 w-full md:w-2/3 mx-auto">
          If you have a great project that needs some amazing 3D skills, I&apos;m your guy!{' '}
          <a className="underline text-primary" href="#contact">
            Write me!
          </a>
        </p>
      </div>
    </section>
  )
}
