import type { Metadata } from 'next'
import { Montserrat, Varela_Round } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
})

const varelaRound = Varela_Round({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'SmarTeam3D | 3D advertisement, 3D model viewer, 3D product configurators, virtual tours, VR, AR, WEBXR',
  description:
    '3D advertisement, 3D model viewer, 3D product configurators, 3D industrial configurators, virtual tours, virtual reality, augmented reality, WEBXR',
  icons: {
    icon: [
      { url: '/fav/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/fav/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/fav/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/fav/apple-icon-180x180.png',
  },
  manifest: '/fav/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${varelaRound.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
