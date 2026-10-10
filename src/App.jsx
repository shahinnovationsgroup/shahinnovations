import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import Home from './Home'
import Services from './Services'
import About from './About'
import Contact from './Contact'
import Admin from './Admin'
import AdminLogin from './AdminLogin'

import { supabase } from './supabase.js'

import logo from './assets/shahinnovations-logo.webp'

function App() {
  const { pathname: path } = useLocation()

  const [menuOpen, setMenuOpen] = useState(false)
  const [session, setSession] = useState(null)
  const [checkingAuth, setCheckingAuth] = useState(true)

  // ================= AUTH CHECK =================

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      setSession(session)
      setCheckingAuth(false)
    }

    checkSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // ================= ADMIN ROUTE =================

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

  // ================= NORMAL PAGES =================

  let Page = Home

  if (path === '/services') {
    Page = Services
  } else if (path === '/about') {
    Page = About
  } else if (path === '/contact') {
    Page = Contact
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

          {/* Logo */}

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            <motion.img
              src={logo}
              alt="ShahInnovations"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">

            <Link
              to="/"
              className="relative transition hover:text-cyan-400 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </Link>

            <Link
              to="/services"
              className="relative transition hover:text-cyan-400 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Services
            </Link>

            <Link
              to="/about"
              className="relative transition hover:text-cyan-400 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="relative transition hover:text-cyan-400 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </Link>

          </nav>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-slate-300 md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>

        </div>

        {/* Mobile Navigation */}

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-white/10 bg-slate-950 px-6 py-5 md:hidden"
          >

            <div className="flex flex-col gap-5 text-sm text-slate-300">

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

            </div>

          </motion.div>
        )}

      </header>

      {/* ================= PAGE ================= */}

      <main>
        <Page />
      </main>

      {/* ================= FOOTER ================= */}

      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500"
      >

        <p>
          © 2026 ShahInnovations. All rights reserved.
        </p>

        <p className="mt-2 text-xs text-slate-600">
          Technology • Innovation • Digital Solutions
        </p>

      </motion.footer>

    </div>
  )
}

export default App