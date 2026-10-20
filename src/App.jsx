import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Home from './Home'
import Services from './Services'
import About from './About'
import Contact from './Contact'
import Admin from './Admin'
import AdminLogin from './AdminLogin'
import Footer from './Footer.jsx'
import { supabase } from './supabase.js'

import logo from './assets/shahinnovations-logo.png'

function App() {
  const { pathname: path } = useLocation()

  const [scrollHintStage, setScrollHintStage] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [session, setSession] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // Reset scroll and close mobile menu when changing pages
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })

    setMenuOpen(false)
  }, [path])

  // Homepage scroll hint
  useEffect(() => {
    setScrollHintStage(0)

    if (path !== '/') return

    const timer1 = window.setTimeout(() => {
      setScrollHintStage(1)
    }, 3000)

    const timer2 = window.setTimeout(() => {
      setScrollHintStage(2)
    }, 5000)

    return () => {
      window.clearTimeout(timer1)
      window.clearTimeout(timer2)
    }
  }, [path])

  // Supabase authentication
  useEffect(() => {
    let mounted = true

    async function checkSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (!mounted) return

      if (error) {
        console.error('Unable to check admin session:', error.message)
      }

      setSession(session)
      setCheckingAuth(false)
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  // Admin route
  if (path === '/admin') {
    if (checkingAuth) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
          <p className="text-cyan-400">
            Checking admin access...
          </p>
        </div>
      )
    }

    if (!session) {
      return (
        <AdminLogin
          onLogin={() => {
            window.location.href = '/admin'
          }}
        />
      )
    }

    return <Admin />
  }

  // Select the page for the current route
  let Page = Home

  if (path === '/services') {
    Page = Services
  } else if (path === '/about') {
    Page = About
  } else if (path === '/contact') {
    Page = Contact
  }

  
const navLinkClass =
  'inline-flex items-center justify-center rounded-xl ' +
  'border border-white/10 bg-slate-950/30 px-4 py-2.5 ' +
  'font-semibold text-white transition-all duration-300 ' +
  'hover:border-cyan-300/60 hover:bg-cyan-400/10 ' +
  'hover:shadow-[0_0_18px_rgba(34,211,238,0.16)]'

const whatsappUrl = 'https://wa.me/919130704919'


  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
<header className="sticky top-0 z-50 isolate border-b border-cyan-300/20 bg-slate-950/95 shadow-[0_8px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
  <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:min-h-[76px] sm:px-6 lg:px-8">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            aria-label="ShahInnovations Home"
            className="flex min-w-0 shrink-0 items-center"
          >
            <motion.img
              src={logo}
              alt="ShahInnovations"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="block h-12 w-auto max-w-[190px] object-contain object-left sm:h-14 sm:max-w-[230px] lg:h-16 lg:max-w-[260px]"
            />
          </Link>

          



{/* Desktop Navigation */}
<nav
  aria-label="Main navigation"
  className="hidden items-center gap-2 rounded-2xl border border-cyan-400/25 bg-slate-950/90 p-2 shadow-[0_0_24px_rgba(14,165,233,0.10)] backdrop-blur-xl md:flex"
>
  {[
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ].map(({ label, path }) => {
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
    const isActive =
      path === '/'
        ? currentPath === '/'
        : currentPath === path || currentPath.startsWith(`${path}/`)

    return (
      <Link
        key={path}
        to={path}
        onClick={() => setMenuOpen(false)}
        aria-current={isActive ? 'page' : undefined}
        className={[
          'inline-flex h-12 items-center justify-center rounded-xl border px-5 text-sm font-semibold whitespace-nowrap transition-all duration-200',
          isActive
            ? 'border-cyan-400 bg-gradient-to-br from-blue-500/35 via-cyan-400/20 to-blue-900/35 text-white shadow-[0_0_16px_rgba(6,182,212,0.22)]'
            : 'border-white/10 bg-slate-900/60 text-slate-100 hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-white',
        ].join(' ')}
      >
        {label}
      </Link>
    )
  })}

  <span
    aria-hidden="true"
    className="mx-1 h-8 w-px shrink-0 bg-cyan-300/20"
  />

  <a
    href={whatsappUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-emerald-400/60 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 px-5 text-sm font-bold whitespace-nowrap text-white transition-all duration-200 hover:border-emerald-300 hover:shadow-[0_0_18px_rgba(16,185,129,0.18)]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      <path
        fill="#25D366"
        d="M16 3C8.83 3 3 8.78 3 15.9c0 2.27.6 4.49 1.73 6.45L3 29l6.85-1.78a13.1 13.1 0 0 0 6.17 1.55C23.2 28.77 29 23 29 15.9 29 8.78 23.17 3 16 3Z"
      />
      <path
        fill="#fff"
        d="M22.2 19.1c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.72.16-.21.31-.83 1.04-1.02 1.25-.19.21-.37.23-.69.08-.32-.16-1.36-.5-2.6-1.58-.96-.85-1.6-1.9-1.79-2.22-.19-.31-.02-.48.14-.64.14-.14.32-.37.48-.55.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.55-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.53-.72-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61s1.12 3.03 1.28 3.24c.16.21 2.2 3.35 5.32 4.7.74.32 1.41.2 1.94.12.59-.09 1.9-.77 2.17-1.51.27-.73.27-1.36.19-1.49-.08-.13-.29-.21-.61-.37Z"
      />
    </svg>
    WhatsApp
    <span aria-hidden="true" className="text-lg">↗</span>
  </a>
</nav>




          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-2xl text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-400 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-white/10 bg-slate-950 px-6 py-5 md:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col gap-5 text-sm text-slate-300"
            >
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-cyan-400"
              >
                Home
              </Link>

              <Link
                to="/services"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-cyan-400"
              >
                Services
              </Link>

              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-cyan-400"
              >
                About
              </Link>

              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-cyan-400"
              >
                Contact
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 font-semibold text-emerald-300 transition hover:bg-emerald-400/15"
              >
                WhatsApp ↗
              </a>
            </nav>
          </motion.div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <main className="relative">
        <Page />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with ShahInnovations on WhatsApp"
        title="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-[10000] flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#25D366] text-white shadow-xl shadow-emerald-500/25 transition duration-300 hover:scale-110 hover:shadow-emerald-500/40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="h-8 w-8"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M16 3C8.83 3 3 8.78 3 15.9c0 2.27.6 4.49 1.73 6.45L3 29l6.85-1.78a13.1 13.1 0 0 0 6.17 1.55C23.2 28.77 29 23 29 15.9 29 8.78 23.17 3 16 3Z"
          />
          <path
            fill="#fff"
            d="M22.2 19.1c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.51-.16-.72.16-.21.31-.83 1.04-1.02 1.25-.19.21-.37.23-.69.08-.32-.16-1.36-.5-2.6-1.58-.96-.85-1.6-1.9-1.79-2.22-.19-.31-.02-.48.14-.64.14-.14.32-.37.48-.55.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.55-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.53-.72-.54h-.61c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.61s1.12 3.03 1.28 3.24c.16.21 2.2 3.35 5.32 4.7.74.32 1.32.51 1.77.65.74.23 1.41.2 1.94.12.59-.09 1.9-.77 2.17-1.51.27-.73.27-1.36.19-1.49-.08-.13-.29-.21-.61-.37Z"
          />
        </svg>
      </a>
    </div>
  )
}

export default App