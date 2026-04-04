import type { Metadata } from 'next'
import CVHero from '@/components/cv/CVHero'
import CVWork from '@/components/cv/CVWork'
import CVAbout from '@/components/cv/CVAbout'

export const metadata: Metadata = {
  title: 'CV | Marian Gaje | SmarTeam3D',
  description:
    '3D advertisement, 3D model viewer, 3D product configurators, 3D industrial configurators, virtual tours, virtual reality, augmented reality, WEBXR',
}

export default function CVPage() {
  return (
    <main className="pt-16">
      <CVHero />
      <CVWork />
      <CVAbout />
    </main>
  )
}
