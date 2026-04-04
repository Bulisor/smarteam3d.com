'use client'

export default function Hero() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      id="home"
      className="relative min-h-screen flex items-center justify-center"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/back.jpg')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
          Be smart. Be a step ahead
        </h1>
        <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
          Increase your product sales, reveal your services, raise your brand by replacing boring
          static images with interactive realistic 3D applications.
        </p>
        <button
          onClick={scrollToContact}
          className="bg-primary hover:bg-red-800 text-white px-8 py-3 font-semibold transition-colors cursor-pointer"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Contact Us
        </button>
      </div>
    </header>
  )
}
