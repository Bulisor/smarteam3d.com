'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Twitter, Youtube, FileText } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

const socials = [
  { icon: Facebook, href: 'https://www.facebook.com/SmarTeam3D', label: 'Facebook', external: true },
  { icon: Twitter, href: 'https://twitter.com/SmarTeam3D', label: 'Twitter', external: true },
  { icon: Youtube, href: 'https://www.youtube.com/channel/UC99BoLYeomoBYe_x4QhLNnw', label: 'YouTube', external: true },
  { icon: FileText, href: '/cv', label: 'CV', external: false },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const iconStyle = {
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
    color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
  }

  return (
    <footer
      className="border-t transition-colors duration-300"
      style={{
        backgroundColor: isDark ? '#0d0f14' : '#f0f2f5',
        borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <a href="/">
          <Image
            src={isDark ? '/img/logo_white2.png' : '/img/logo_black2.png'}
            alt="SmarTeam3D"
            width={100}
            height={32}
            className="h-7 w-auto opacity-80 hover:opacity-100 transition-opacity"
          />
        </a>

        <p className="text-xs order-last sm:order-none" style={{ color: isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)' }}>
          &copy; SmarTeam3D {year}
        </p>

        <ul className="flex gap-2">
          {socials.map((s) => (
            <li key={s.label}>
              {s.external ? (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary"
                  style={iconStyle}
                >
                  <s.icon size={14} />
                </a>
              ) : (
                <Link
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-primary"
                  style={iconStyle}
                >
                  <s.icon size={14} />
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
