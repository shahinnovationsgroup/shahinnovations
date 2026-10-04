import { motion } from 'framer-motion'

function Services() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      {/* Page Heading */}
      <div className="mb-12 text-center">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          What We Do
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-3 text-4xl font-bold md:text-5xl"
        >
          Our Services
        </motion.h1>

        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Modern technology solutions designed to help businesses
          grow, connect and succeed in the digital world.
        </p>

      </div>

      {/* Service Cards */}
      <div className="grid gap-6 md:grid-cols-3">

        {/* Web Development */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-400/10"
        >
          <h2 className="text-xl font-bold">
            Web Development
          </h2>

          <p className="mt-3 text-slate-400">
            Modern, responsive and high-performance websites.
          </p>
        </motion.div>

        {/* App Development */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-400/10"
        >
          <h2 className="text-xl font-bold">
            App Development
          </h2>

          <p className="mt-3 text-slate-400">
            Scalable web applications built with modern technology.
          </p>
        </motion.div>

        {/* Digital Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-400/10"
        >
          <h2 className="text-xl font-bold">
            Digital Solutions
          </h2>

          <p className="mt-3 text-slate-400">
            Smart technology solutions designed for growing businesses.
          </p>
        </motion.div>

      </div>

    </section>
  )
}

export default Services