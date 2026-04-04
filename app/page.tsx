import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import Portfolio from '@/components/home/Portfolio'
import Services from '@/components/home/Services'
import Features from '@/components/home/Features'
import Partners from '@/components/home/Partners'
import Contact from '@/components/home/Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Features />
      <Partners />
      <Contact />
    </main>
  )
}
