import { motion } from 'framer-motion'
import { useState } from 'react'
import { supabase } from './supabase.js'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!formData.name.trim()) {
      setStatus('Please enter your name.')
      return
    }

    setLoading(true)
    setStatus('')

    const { error } = await supabase
      .from('customers')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
      ])

    setLoading(false)

    if (error) {
      console.error('Supabase Error:', {
  message: error?.message,
  details: error?.details,
  hint: error?.hint,
  code: error?.code,
})
      setStatus('Something went wrong. Please try again.')
      return
    }

    setStatus('✅ Thank you! Your message has been sent successfully.')

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    })
  }

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
          transition={{ duration: 0.7 }}
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

        <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-400">
          Have an idea or project? Let's discuss how ShahInnovations
          can turn your idea into a modern digital solution.
        </p>

      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mx-auto mt-14 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:p-10"
      >

        <h2 className="text-2xl font-bold">
          Send Us a Message
        </h2>

        <p className="mt-2 text-slate-400">
          Fill in the details below and our team will get back to you.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Name *
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Phone
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Message
            </label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project..."
              rows="5"
              className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </motion.button>

          {/* Status */}
          {status && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-sm text-cyan-400"
            >
              {status}
            </motion.p>
          )}

        </form>
      </motion.div>

      {/* WhatsApp / Email */}
      <div className="mx-auto mt-8 grid max-w-3xl gap-6 md:grid-cols-2">

        <a
          href="mailto:shahinnovationsgroup@gmail.com"
          className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10"
        >
          <div className="text-2xl">✉️</div>

          <h3 className="mt-3 font-bold">
            Email Us
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            shahinnovationsgroup@gmail.com
          </p>
        </a>

        <a
          href="https://wa.me/919130704919?text=Hello%20ShahInnovations%2C%20I%20would%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center transition hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-white/10"
        >
          <div className="text-2xl">💬</div>

          <h3 className="mt-3 font-bold">
            WhatsApp
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Chat with ShahInnovations
          </p>
        </a>

      </div>

    </section>
  )
}

export default Contact