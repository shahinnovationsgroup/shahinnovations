import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Home() {
  const services = [
    {
      title: 'Web Development',
      description:
        'Modern, responsive and high-performance websites built for businesses.',
      icon: '🌐',
    },
    {
      title: 'App Development',
      description:
        'Scalable applications designed to deliver smooth digital experiences.',
      icon: '📱',
    },
    {
      title: 'Digital Solutions',
      description:
        'Smart technology solutions that help businesses work better and grow faster.',
      icon: '⚡',
    },
  ]

  const technologies = [
    'React',
    'Vite',
    'Tailwind CSS',
    'JavaScript',
    'Supabase',
    'GitHub',
  ]

  return (
    <div className="overflow-hidden">

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[calc(100vh-80px)] items-center px-6 py-24">

        {/* Background Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400"
            >
              Technology • Innovation • Digital Solutions
            </motion.p>

            <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              Building the
              <span className="block text-cyan-400">
                Digital Future
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 md:text-xl">
              ShahInnovations creates modern websites, applications and
              digital solutions that help businesses turn ideas into
              powerful digital experiences.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <Link
                to="/services"
                className="rounded-xl bg-cyan-400 px-7 py-3.5 text-center font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:-translate-y-1 hover:bg-cyan-300"
              >
                Explore Services
              </Link>

              <Link
                to="/contact"
                className="rounded-xl border border-white/10 bg-white/5 px-7 py-3.5 text-center font-semibold text-white transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10"
              >
                Start a Project
              </Link>

            </div>

            {/* Trust Points */}
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500">
              <span>✓ Modern Technology</span>
              <span>✓ Responsive Design</span>
              <span>✓ Business Focused</span>
            </div>

          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >

            <div className="relative mx-auto max-w-lg">

              {/* Outer Glow */}
              <div className="absolute inset-0 rounded-[2rem] bg-cyan-400/10 blur-3xl" />

              {/* Main Card */}
              <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-xl">

                {/* Browser Header */}
                <div className="flex items-center gap-2 border-b border-white/10 pb-5">
                  <span className="h-3 w-3 rounded-full bg-red-400/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                  <span className="h-3 w-3 rounded-full bg-green-400/70" />

                  <div className="ml-3 h-7 flex-1 rounded-lg bg-white/5" />
                </div>

                {/* Screen */}
                <div className="py-10 text-center">

                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10 text-4xl shadow-lg shadow-cyan-400/10"
                  >
                    ⚡
                  </motion.div>

                  <h2 className="mt-7 text-2xl font-bold">
                    Shah<span className="text-cyan-400">Innovations</span>
                  </h2>

                  <p className="mt-3 text-sm text-slate-500">
                    Innovation starts with an idea.
                  </p>

                  {/* Fake UI Lines */}
                  <div className="mx-auto mt-8 max-w-xs space-y-3">
                    <div className="h-3 rounded-full bg-white/10" />
                    <div className="h-3 w-4/5 rounded-full bg-white/10" />
                    <div className="h-3 w-3/5 rounded-full bg-cyan-400/30" />
                  </div>

                </div>

              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-5 -left-5 rounded-2xl border border-white/10 bg-slate-900/90 px-5 py-4 shadow-xl backdrop-blur"
              >
                <p className="text-xs text-slate-500">
                  Focus
                </p>
                <p className="mt-1 font-semibold text-cyan-400">
                  Digital Innovation
                </p>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -right-5 -top-5 rounded-2xl border border-white/10 bg-slate-900/90 px-5 py-4 shadow-xl backdrop-blur"
              >
                <p className="text-xs text-slate-500">
                  Approach
                </p>
                <p className="mt-1 font-semibold text-white">
                  Smart & Modern
                </p>
              </motion.div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="border-t border-white/10 px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              What We Do
            </p>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Our Core Services
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
              Technology solutions designed to help businesses build,
              improve and grow their digital presence.
            </p>

          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">

            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                whileHover={{ y: -8 }}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 transition hover:border-cyan-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-cyan-400/5"
              >

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
                  {service.icon}
                </div>

                <h3 className="mt-6 text-2xl font-bold">
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-400">
                  {service.description}
                </p>

              </motion.div>
            ))}

          </div>

          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              View All Services →
            </Link>
          </div>

        </div>

      </section>

      {/* ================= WHY US ================= */}
      <section className="border-t border-white/10 px-6 py-24">

        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Why ShahInnovations
            </p>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Technology With Purpose
            </h2>

            <p className="mt-6 leading-8 text-slate-400">
              We believe technology should be simple, useful and
              powerful. Our goal is to transform ideas into digital
              experiences that deliver real value.
            </p>

            <div className="mt-8 space-y-5">

              {[
                'Modern and responsive experiences',
                'Clean and scalable development',
                'Business-focused solutions',
                'Continuous innovation',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-400">
                    ✓
                  </div>

                  <span className="text-slate-300">
                    {item}
                  </span>
                </div>
              ))}

            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-4"
          >

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <div className="text-3xl font-bold text-cyan-400">
                100%
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Digital Focus
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <div className="text-3xl font-bold text-cyan-400">
                24/7
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Digital Presence
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <div className="text-3xl font-bold text-cyan-400">
                Modern
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Technology Stack
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <div className="text-3xl font-bold text-cyan-400">
                Smart
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Solutions
              </p>
            </div>

          </motion.div>

        </div>

      </section>

      {/* ================= TECHNOLOGY ================= */}
      <section className="border-t border-white/10 px-6 py-24">

        <div className="mx-auto max-w-7xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Technology
          </p>

          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Built With Modern Tools
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
            We use modern technologies to build fast, scalable and
            maintainable digital products.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">

            {technologies.map((technology, index) => (
              <motion.div
                key={technology}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
              >
                {technology}
              </motion.div>
            ))}

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}
      <section className="border-t border-white/10 px-6 py-24">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl rounded-[2rem] border border-cyan-400/20 bg-cyan-400/[0.06] p-10 text-center shadow-2xl shadow-cyan-400/5 md:p-16"
        >

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Let's Work Together
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Have an Idea?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-400">
            Let's turn your idea into a modern digital experience
            with ShahInnovations.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <Link
              to="/contact"
              className="rounded-xl bg-cyan-400 px-8 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-300"
            >
              Start a Conversation
            </Link>

            <a
              href="https://wa.me/919130704919?text=Hello%20ShahInnovations%2C%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 px-8 py-3.5 font-semibold transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10"
            >
              WhatsApp Us
            </a>

          </div>

        </motion.div>

      </section>

    </div>
  )
}

export default Home