import { motion } from 'framer-motion'
import { useState } from 'react'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="sticky top-0 z-50 relative border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <motion.h1
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
  className="text-2xl font-bold tracking-tight"
>
  Shah<span className="text-cyan-400">Innovations</span>
</motion.h1>

          <div className="flex items-center gap-4">

  {/* Desktop Menu */}
  <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
    <a
  href="#home"
  className="relative transition hover:text-cyan-400 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
>
  Home
</a>

    <a href="#services" className="transition hover:text-cyan-400">
      Services
    </a>

    <a href="#about" className="transition hover:text-cyan-400">
      About
    </a>

    <a href="#contact" className="transition hover:text-cyan-400">
      Contact
    </a>
  </nav>

  {/* Mobile Menu Button */}
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="text-2xl text-slate-300 md:hidden"
    aria-label="Toggle menu"
  >
    {menuOpen ? '✕' : '☰'}
    {menuOpen && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="absolute left-0 top-full w-full border-t border-white/10 bg-slate-950 px-6 py-5 md:hidden"
  >
    <div className="flex flex-col gap-5 text-sm text-slate-300">
      <a
        href="#home"
        onClick={() => setMenuOpen(false)}
        className="transition hover:text-cyan-400"
      >
        Home
      </a>

    <a
  href="#services"
  className="relative transition hover:text-cyan-400 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
>
  Services
</a>

      <a
  href="#about"
  className="relative transition hover:text-cyan-400 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
>
  About
</a>

      <a
  href="#contact"
  className="relative transition hover:text-cyan-400 after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
>
  Contact
</a>
    </div>
  </motion.div>
)}
  </button>

</div>
        </div>
      </header>

      {/* Hero */}
      <main id="home">
        <section className="relative mx-auto max-w-7xl overflow-hidden px-6 py-24 text-center md:py-32">

<motion.div
  animate={{
    scale: [1, 1.15, 1],
    opacity: [0.5, 0.8, 0.5],
  }}
  transition={{
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="pointer-events-none absolute inset-0 -z-0"
>
  <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
</motion.div>

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Technology • Innovation • Digital Solutions
          </p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-5xl font-bold tracking-tight md:text-7xl"
          >
            Building the
            <span className="block text-cyan-400">
              Digital Future
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400"
          >
            Welcome to ShahInnovations — creating modern websites,
            applications and technology solutions for the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
          >
            <motion.a
  href="#services"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  className="rounded-xl bg-cyan-400 px-7 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300"
>
  Explore Services
</motion.a>

            <motion.a
  href="#contact"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
  className="rounded-xl border border-white/20 px-7 py-3 font-semibold transition hover:border-cyan-400 hover:bg-white/10 hover:text-cyan-400"
>
  Contact Us
</motion.a>
          </motion.div>

        </section>

        {/* Services */}
        <section
  id="services"
  className="mx-auto max-w-7xl px-6 py-20"
>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="mb-12 text-center"
  >
    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
      What We Do
    </p>

    <h2 className="mt-3 text-3xl font-bold md:text-4xl">
      Our Services
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-slate-400">
      Modern technology solutions designed to help businesses grow,
      connect and succeed in the digital world.
    </p>
  </motion.div>

  <div className="grid gap-6 md:grid-cols-3">

            {/* Web Development */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-400/10"
            >
              <h3 className="text-xl font-bold">
                Web Development
              </h3>

              <p className="mt-3 text-slate-400">
                Modern, responsive and high-performance websites.
              </p>
            </motion.div>

            {/* App Development */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-400/10"
            >
              <h3 className="text-xl font-bold">
                App Development
              </h3>

              <p className="mt-3 text-slate-400">
                Scalable web applications built with modern technology.
              </p>
            </motion.div>

            {/* Digital Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-400/10"
            >
              <h3 className="text-xl font-bold">
                Digital Solutions
              </h3>

              <p className="mt-3 text-slate-400">
                Smart technology solutions designed for growing businesses.
              </p>
            </motion.div>

          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="mx-auto max-w-4xl px-6 py-20 text-center"
        >
          <motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="text-3xl font-bold md:text-4xl"
>
  Innovation starts with an idea.
</motion.h2>
<motion.div
  initial={{ opacity: 0, scaleX: 0 }}
  whileInView={{ opacity: 1, scaleX: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="mx-auto mt-5 h-1 w-16 origin-center rounded-full bg-cyan-400"
/>

          <motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.2 }}
  className="mt-5 leading-8 text-slate-400"
>
  ShahInnovations is focused on turning ideas into useful,
  modern and reliable digital experiences.
</motion.p>
        </section>

        {/* Contact */}
        <section
  id="contact"
  className="mx-auto max-w-5xl px-6 py-20"
>
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="rounded-3xl border border-white/10 bg-white/5 px-6 py-16 text-center shadow-2xl shadow-cyan-400/5 backdrop-blur md:px-12"
  >
          <motion.h2
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="text-3xl font-bold"
>
  Let's Build Something Great
</motion.h2>

          <motion.p
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.2 }}
  className="mx-auto mt-4 max-w-xl text-slate-400"
>
  Have an idea or project? ShahInnovations is ready to build it.
</motion.p>

          <motion.a
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, delay: 0.4 }}
  href="mailto:contact@shahinnovations.com"
  className="mt-8 inline-block rounded-xl bg-cyan-400 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
>
  Get In Touch
</motion.a>
</motion.div>
        </section>

      </main>

      {/* Footer */}
      <motion.footer
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
  className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500"
>
  © 2026 ShahInnovations. All rights reserved.
</motion.footer>

    </div>
  )
}

export default App