
import { motion } from 'framer-motion'

const services = [
  {
    number: '01',
    icon: '⌘',
    title: 'Web Development',
    description:
      'Modern, responsive and high-performance websites designed for your business.',
    color: 'cyan',
  },
  {
    number: '02',
    icon: '✳',
    title: 'App Development',
    description:
      'Scalable web applications with smooth user experiences and modern technology.',
    color: 'violet',
  },
  {
    number: '03',
    icon: '↔',
    title: 'Digital Solutions',
    description:
      'Smart digital systems designed to simplify workflows and business processes.',
    color: 'blue',
  },
  {
    number: '04',
    icon: '◎',
    title: 'Business Automation',
    description:
      'Connect repetitive tasks, messages and business processes with automation.',
    color: 'fuchsia',
  },
  {
    number: '05',
    icon: '⌘',
    title: 'System Integration',
    description:
      'Connect websites, databases, APIs and business tools into a unified workflow.',
    color: 'cyan',
  },
  {
    number: '06',
    icon: '◈',
    title: 'Technical Consulting',
    description:
      'Practical guidance to help plan, improve and scale your digital projects.',
    color: 'violet',
  },
]

const colorStyles = {
  cyan: 'border-cyan-400/20 hover:border-cyan-400/60 hover:shadow-cyan-400/10 text-cyan-300',
  violet: 'border-violet-400/20 hover:border-violet-400/60 hover:shadow-violet-400/10 text-violet-300',
  blue: 'border-blue-400/20 hover:border-blue-400/60 hover:shadow-blue-400/10 text-blue-300',
  fuchsia: 'border-fuchsia-400/20 hover:border-fuchsia-400/60 hover:shadow-fuchsia-400/10 text-fuchsia-300',
}

function Services() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden px-6 py-24">
      {/* Moving background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ x: [0, 70, 0], y: [0, 40, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -55, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-28 bottom-20 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.035)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      {/* Heading */}
      <motion.header
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          What We Do
        </p>
        <h1 className="mt-4 text-4xl font-bold md:text-6xl">
          Our Core <span className="text-cyan-400">Services</span>
        </h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 h-1 w-24 origin-center rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
        />
        <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-400">
          Technology solutions designed to help businesses build, improve and
          grow their digital presence.
        </p>
      </motion.header>

      {/* Service cards */}
      <div className="mx-auto mt-16 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.article
            key={service.number}
            initial={{ opacity: 0, y: 35, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.65,
              delay: (index % 3) * 0.12,
              ease: 'easeOut',
            }}
            whileHover={{ y: -8 }}
            className={`group relative overflow-hidden rounded-3xl border bg-slate-900/60 p-7 shadow-xl backdrop-blur-xl transition-colors duration-300 ${colorStyles[service.color]}`}
          >
            <motion.div
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-current blur-3xl"
            />

            <div className="relative flex items-center justify-between">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.08 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl border border-current/20 bg-white/[0.04] text-3xl"
              >
                {service.icon}
              </motion.div>
              <span className="font-mono text-sm tracking-widest text-slate-500">
                {service.number}
              </span>
            </div>

            <h2 className="relative mt-8 text-xl font-bold text-white">
              {service.title}
            </h2>
            <p className="relative mt-3 min-h-20 leading-7 text-slate-400">
              {service.description}
            </p>

            <div className="relative mt-7 h-px overflow-hidden bg-white/10">
              <motion.div
                initial={{ x: '-100%' }}
                whileInView={{ x: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="h-full w-full bg-gradient-to-r from-cyan-400 to-violet-500"
              />
            </div>
            <p className="relative mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition-colors group-hover:text-cyan-300">
              Technology · Innovation
            </p>
          </motion.article>
        ))}
      </div>

      {/* Closing panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7 }}
        className="mx-auto mt-12 max-w-7xl rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/[0.07] to-violet-500/[0.07] p-8 text-center md:p-12"
      >
        <h2 className="text-2xl font-bold md:text-3xl">
          Have an idea in mind?
        </h2>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-400">
          Let’s discuss your project and explore the right digital solution for
          your needs.
        </p>
        <a
          href="/contact"
          className="mt-6 inline-flex rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/20"
        >
          Discuss Your Project ↗
        </a>
      </motion.div>
    </section>
  )
}

export default Services
