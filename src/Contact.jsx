import { motion } from 'framer-motion'

function Contact() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">

      {/* Header */}
      <div className="text-center">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400"
        >
          Get In Touch
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-3 text-4xl font-bold md:text-5xl"
        >
          Let's Build Something Great
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-5 h-1 w-16 origin-center rounded-full bg-cyan-400"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl leading-8 text-slate-400"
        >
          Have an idea or project? Let's discuss how ShahInnovations
          can turn your idea into a modern digital solution.
        </motion.p>

      </div>

      {/* Contact Cards */}
      <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">

        {/* Email Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-400/10"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
            ✉
          </div>

          <h2 className="mt-5 text-2xl font-bold">
            Email Us
          </h2>

          <p className="mt-3 text-slate-400">
            Send us your project requirements or questions.
          </p>

          <a
            href="mailto:shahinnovationsgroup@gmail.com"
            className="mt-6 inline-block font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            shahinnovationsgroup@gmail.com
          </a>
        </motion.div>

        {/* WhatsApp Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-400/10"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
            💬
          </div>

          <h2 className="mt-5 text-2xl font-bold">
            Let's Talk
          </h2>

          <p className="mt-3 text-slate-400">
            Have a project idea? Let's discuss it and build something great.
          </p>

          <a
            href="https://wa.me/919130704919?text=Hello%20ShahInnovations%2C%20I%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-xl bg-cyan-400 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Chat With Us
          </a>
        </motion.div>

      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mx-auto mt-8 max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur md:p-10"
      >
        <h2 className="text-2xl font-bold md:text-3xl">
          Ready to Start Your Project?
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-slate-400">
          Tell us what you have in mind and let's turn your idea
          into a powerful digital experience.
        </p>

        <motion.a
          href="mailto:shahinnovationsgroup@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-7 inline-block rounded-xl bg-cyan-400 px-8 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300"
        >
          Start a Conversation
        </motion.a>
      </motion.div>

    </section>
  )
}

export default Contact