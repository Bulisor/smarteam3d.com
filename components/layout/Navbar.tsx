'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#service' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contact', href: '#contact' },
]

const sectionIds = links.map((l) => l.href.slice(1))

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { theme, toggle } = useTheme()
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    if (!isHome) return
    const onScroll = () => {
      setScrolled(window.scrollY > 1)
      const offset = 80
      let current = sectionIds[0]
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.offsetTop - offset <= window.scrollY) {
          current = id
        }
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    if (!isHome) {
      const onScroll = () => setScrolled(window.scrollY > 1)
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      return () => window.removeEventListener('scroll', onScroll)
    }
  }, [isHome])

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return
    if (!isHome) return // let the href="/#..." handle navigation
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const isTransparent = !scrolled && !open
  const isDarkBar = isTransparent || theme === 'dark'

  const navBg = isTransparent
    ? 'bg-transparent'
    : theme === 'dark'
    ? 'bg-[#0d0f18]/95 backdrop-blur-md shadow-lg'
    : 'bg-white/95 backdrop-blur-md shadow-md'

  const logo = isDarkBar ? '/img/logo_white2.png' : '/img/logo_black2.png'

  const getLinkClass = (href: string) => {
    const isActive = active === href.slice(1)
    if (isDarkBar) {
      return isActive
        ? 'text-primary'
        : 'text-white/70 hover:text-white'
    }
    return isActive
      ? 'text-primary'
      : 'text-gray-600 hover:text-gray-900'
  }

  const iconClass = isDarkBar
    ? 'text-white/70 hover:text-white hover:bg-white/10'
    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/">
          <Image
            src={logo}
            alt="SmarTeam3D"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-7 items-center">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => scrollTo(e, l.href)}
                className={`${getLinkClass(l.href)} text-sm font-medium tracking-wide transition-colors duration-200`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={toggle}
              className={`ml-1 p-2 rounded-full ${iconClass} transition-all duration-200 cursor-pointer`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </li>
        </ul>

        {/* Mobile right side */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={toggle}
            className={`p-2 rounded-full ${iconClass} transition-all cursor-pointer`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className={`p-2 ${isDarkBar ? 'text-white' : 'text-gray-700'}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className={`md:hidden border-t px-4 pb-4 pt-2 ${
            theme === 'dark'
              ? 'bg-[#0d0f18]/95 backdrop-blur-md border-white/10'
              : 'bg-white/95 backdrop-blur-md border-gray-100'
          }`}
        >
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.