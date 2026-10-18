
import { motion } from 'framer-motion'

const reveal = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
}

const cardTransition = {
  duration: 0.7,
  ease: 'easeOut',
}

function About() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden px-6 py-24">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 35, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -45, 0], y: [0, -35, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-32 top-72 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      {/* Header */}
      <motion.div
        variants={reveal}
        initial="hidden"
        animate="visible"
        transition={cardTransition}
        className="mx-auto max-w-5xl text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Who We Are
        </p>

        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          About <span className="text-cyan-400">ShahInnovations</span>
        </h1>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 90, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mx-auto mt-6 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
        />

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-400">
          We turn ideas into modern digital experiences through technology,
          creativity and smart solutions designed around real business needs.
        </p>
      </motion.div>

      {/* Mission and approach */}
      <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2">
        <motion.article
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ ...cardTransition, delay: 0.1 }}
          whileHover={{ y: -8 }}
          className="group relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-white/[0.04] p-8 backdrop-blur-xl transition-colors duration-300 hover:border-cyan-400/60 hover:bg-cyan-400/[0.06]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-2xl text-cyan-300"
          >
            ◈
          </motion.div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Our Purpose
          </p>
          <h2 className="mt-3 text-2xl font-bold">Our Mission</h2>
          <p className="mt-4 leading-8 text-slate-400">
            ShahInnovations focuses on turning ideas into useful, modern and
            reliable digital experiences that help businesses move forward.
          </p>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-cyan-400/60 to-transparent" />
        </motion.article>

        <motion.article
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          transition={{ ...cardTransition, delay: 0.25 }}
          whileHover={{ y: -8 }}
          className="group relative overflow-hidden rounded-3xl border border-violet-400/20 bg-white/[0.04] p-8 backdrop-blur-xl transition-colors duration-300 hover:border-violet-400/60 hover:bg-violet-400/[0.06]"
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-400/10 text-2xl text-violet-300"
          >
            ✳
          </motion.div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-violet-400">
            Our Approach
          </p>
          <h2 className="mt-3 text-2xl font-bold">What We Do</h2>
          <p className="mt-4 leading-8 text-slate-400">
            We build websites, applications, automations and connected digital
            solutions to help businesses improve their online presence.
          </p>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-violet-400/60 to-transparent" />
        </motion.article>
      </div>

      {/* Vision */}
      <motion.article
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        transition={cardTransition}
        className="mx-auto mt-6 max-w-5xl rounded-3xl border border-white/10 bg-slate-900/60 p-8 text-center backdrop-blur-xl md:p-12"
      >
        <motion.div
          animate={{ boxShadow: ['0 0 0px #22d3ee00', '0 0 28px #22d3ee30', '0 0 0px #22d3ee00'] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/40 text-2xl text-cyan-300"
        >
          ◎
        </motion.div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Looking Ahead
        </p>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">Our Vision</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-400">
          To create simple, powerful and innovative digital solutions that make
          technology more useful for businesses and people.
        </p>
      </motion.article>
    </section>
  )
}

export default About
