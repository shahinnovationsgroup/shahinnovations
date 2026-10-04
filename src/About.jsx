import { motion } from 'framer-motion'

function About() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24">

      {/* Page Header */}
      <div className="text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400"
        >
          Who We Are
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-3 text-4xl font-bold md:text-5xl"
        >
          About ShahInnovations
        </motion.h1>

        {/* Animated Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-5 h-1 w-16 origin-center rounded-full bg-cyan-400"
        />

      </div>

      {/* Main About Content */}
      <div className="mt-14 grid gap-6 md:grid-cols-2">

        {/* Our Mission */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-400/10"
        >
          <h2 className="text-2xl font-bold">
            Our Mission
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            ShahInnovations is focused on turning ideas into useful,
            modern and reliable digital experiences.
          </p>
        </motion.div>

        {/* What We Do */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-400/10"
        >
          <h2 className="text-2xl font-bold">
            What We Do
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            We build modern websites, applications and technology
            solutions designed to help businesses grow in the digital world.
          </p>
        </motion.div>

      </div>

      {/* Vision */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition duration-300 hover:border-cyan-400/50 hover:bg-white/10"
      >
        <h2 className="text-2xl font-bold">
          Our Vision
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-400">
          To create simple, powerful and innovative digital solutions
          that make technology more useful for businesses and people.
        </p>
      </motion.div>

    </section>
  )
}

export default About