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
  const [statusType, setStatusType] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setStatus('')
    setStatusType('')

    const name = formData.name.trim()
    const email = formData.email.trim()
    const phone = formData.phone.trim()
    const message = formData.message.trim()

    // ================= VALIDATION =================

    if (!name) {
      setStatus('Please enter your name.')
      setStatusType('error')
      return
    }

    if (name.length > 100) {
      setStatus('Name must be 100 characters or less.')
      setStatusType('error')
      return
    }

    if (email && email.length > 254) {
      setStatus('Please enter a valid email address.')
      setStatusType('error')
      return
    }

    if (email) {
      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailPattern.test(email)) {
        setStatus('Please enter a valid email address.')
        setStatusType('error')
        return
      }
    }

    if (phone.length > 30) {
      setStatus('Phone number is too long.')
      setStatusType('error')
      return
    }

    if (message.length > 5000) {
      setStatus('Message must be 5000 characters or less.')
      setStatusType('error')
      return
    }

    setLoading(true)

    try {
      // ================= SAVE CUSTOMER =================

      const { error: insertError } = await supabase
        .from('customers')
        .insert([
          {
            name,
            email,
            phone,
            message,
            status: 'new',
          },
        ])

      if (insertError) {
        console.error('Supabase Customer Error:', {
          message: insertError?.message,
          details: insertError?.details,
          hint: insertError?.hint,
          code: insertError?.code,
        })

        setStatus(
          'Something went wrong while sending your enquiry. Please try again.'
        )

        setStatusType('error')
        return
      }

      // ================= SEND EMAIL =================

      const { data: emailData, error: emailError } =
        await supabase.functions.invoke(
          'send-contact-email',
          {
            body: {
              name,
              email,
              phone,
              message,
            },
          }
        )

      if (emailError) {
        console.error(
          'Email Notification Error:',
          emailError
        )

        // The customer enquiry is already safely stored.
        setStatus(
          'Your enquiry was received successfully. We will contact you soon.'
        )

        setStatusType('success')

        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        })

        return
      }

      if (emailData?.success === false) {
        console.error(
          'Email Function Error:',
          emailData
        )

        setStatus(
          'Your enquiry was received successfully. We will contact you soon.'
        )

        setStatusType('success')

        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        })

        return
      }

      // ================= SUCCESS =================

      setStatus(
        '✅ Thank you! Your enquiry has been sent successfully.'
      )

      setStatusType('success')

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      })
    } catch (error) {
      console.error(
        'Contact Form Unexpected Error:',
        error
      )

      setStatus(
        'Something went wrong. Please try again.'
      )

      setStatusType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">

      {/* ================= HEADER ================= */}

      <div className="text-center">

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400"
        >
          Get In Touch
        </motion.p>

        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
          className="mt-3 text-4xl font-bold md:text-5xl"
        >
          Contact ShahInnovations
        </motion.h1>

        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Have a project, idea or business requirement?
          Send us a message and our team will get back to you.
        </p>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="mt-14 grid gap-8 md:grid-cols-2">

        {/* ================= CONTACT INFO ================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: -30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8"
        >

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Let's Talk
          </p>

          <h2 className="mt-3 text-3xl font-bold">
            Start a Conversation
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Tell us what you are looking to build.
            We can discuss websites, applications,
            automation and other digital solutions.
          </p>

          {/* EMAIL */}

          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/50 p-5">

            <p className="text-xs uppercase tracking-wider text-slate-500">
              Email
            </p>

            <a
              href="mailto:shahinnovationsgroup@gmail.com"
              className="mt-2 block break-all text-cyan-400 transition hover:text-cyan-300 hover:underline"
            >
              shahinnovationsgroup@gmail.com
            </a>

          </div>

          {/* WHATSAPP */}

          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/50 p-5">

            <p className="text-xs uppercase tracking-wider text-slate-500">
              WhatsApp
            </p>

            <a
              href="https://wa.me/919130704919?text=Hello%20ShahInnovations%2C%20I%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-cyan-400 transition hover:text-cyan-300 hover:underline"
            >
              +91 9130704919
            </a>

          </div>

        </motion.div>

        {/* ================= FORM ================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
          className="rounded-3xl border border-white/10 bg-white/5 p-8"
        >

          <h2 className="text-2xl font-bold">
            Send Us a Message
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Fields marked with * are required.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* NAME */}

            <div>

              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                maxLength={100}
                autoComplete="name"
                required
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />

            </div>

            {/* EMAIL */}

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                maxLength={254}
                autoComplete="email"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />

            </div>

            {/* PHONE */}

            <div>

              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 XXXXX XXXXX"
                maxLength={30}
                autoComplete="tel"
                className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />

            </div>

            {/* MESSAGE */}

            <div>

              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirement..."
                maxLength={5000}
                rows={6}
                className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />

              <p className="mt-2 text-right text-xs text-slate-600">
                {formData.message.length}/5000
              </p>

            </div>

            {/* STATUS */}

            {status && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className={`rounded-xl border p-4 text-sm ${
                  statusType === 'success'
                    ? 'border-green-500/20 bg-green-500/10 text-green-400'
                    : 'border-red-500/20 bg-red-500/10 text-red-400'
                }`}
              >
                {status}
              </motion.div>

            )}

            {/* SUBMIT */}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{
                scale: loading ? 1 : 1.02,
              }}
              whileTap={{
                scale: loading ? 1 : 0.98,
              }}
              className="w-full rounded-xl bg-cyan-400 px-6 py-3.5 font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? 'Sending...'
                : 'Send Enquiry'}
            </motion.button>

          </form>

        </motion.div>

      </div>

    </section>
  )
}

export default Contact