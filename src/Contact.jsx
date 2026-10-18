import { useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { supabase } from './supabase.js'





const fadeUp = {

  hidden: { opacity: 0, y: 28 },

  visible: { opacity: 1, y: 0 },

}



const transition = {

  duration: 0.65,

  ease: 'easeOut',

}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cityState: '',
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



    if (loading) return



    setStatus('')

    setStatusType('')



    const name = formData.name.trim()

    const email = formData.email.trim()

    const phone = formData.phone.trim()

    const message = formData.message.trim()



    const cityState = formData.cityState.trim()



if (!phone) {

  setStatus('Please enter your phone / WhatsApp number.')

  setStatusType('error')

  return

}



if (!cityState) {

  setStatus('Please enter your city and state.')

  setStatusType('error')

  return

}







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

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/



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





      // Save enquiry in Supabase*

      const enquiryMessage = [

        `City / State: ${cityState}`,

        message ? `Message: ${message}` : '',

      ]

        .filter(Boolean)

        .join('\n')



      const { error: insertError } = await supabase

        .from('customers')

        .insert([

          {

            name,

            email,

            phone,

            message: enquiryMessage,

            status: 'new',

          },

        ])



      if (insertError) {

        console.error('Supabase Customer Error:', insertError)

        setStatus(

          'We could not save your enquiry. Please try again in a moment.'

        )

        setStatusType('error')

        return

      }



      // Send notification using the existing Supabase Edge Function*

      const { data: emailData, error: emailError } =

        await supabase.functions.invoke('send-contact-email', {

          body: {

            name,

            email,

            phone,

            cityState,

            message: enquiryMessage,

          },

        })



      // The enquiry is already saved, so do not tell the visitor it failed.*

      if (emailError || emailData?.success === false) {

        console.error(

          'Email Notification Error:',

          emailError || emailData

        )

      }



      setStatus(

        'Your enquiry has been received successfully. We will contact you soon.'

      )

      setStatusType('success')



      setFormData({

        name: '',

        email: '',

        phone: '',

        cityState: '',

        message: '',

      })

    } catch (error) {

      console.error('Contact Form Unexpected Error:', error)

      setStatus('Something went wrong. Please try again.')

      setStatusType('error')

    } finally {

      setLoading(false)

    }

  }



  const inputClass =

    'w-full rounded-xl border border-white/10 bg-[#070d1a]/80 px-4 py-3.5 text-sm text-white outline-none transition duration-300 placeholder:text-slate-600 focus:border-cyan-400/70 focus:bg-cyan-400/[0.04] focus:ring-4 focus:ring-cyan-400/[0.06]'





  return (

    <section className="relative isolate min-h-screen overflow-hidden bg-slate-950 px-4 py-16 text-white sm:px-6 sm:py-24">

      {/* Animated background */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

        <motion.div

          animate={{

            x: [0, 55, 0],

            y: [0, 35, 0],

            scale: [1, 1.12, 1],

          }}

          transition={{

            duration: 14,

            repeat: Infinity,

            ease: 'easeInOut',

          }}

          className="absolute -left-36 top-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]"

        />



        <motion.div

          animate={{

            x: [0, -45, 0],

            y: [0, -40, 0],

            scale: [1.1, 1, 1.1],

          }}

          transition={{

            duration: 16,

            repeat: Infinity,

            ease: 'easeInOut',

          }}

          className="absolute -right-36 top-1/3 h-[440px] w-[440px] rounded-full bg-violet-600/10 blur-[110px]"

        />



        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />



        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      </div>



      {/* Hero */}

      <motion.header

        variants={fadeUp}

        initial="hidden"

        animate="visible"

        transition={transition}

        className="mx-auto max-w-5xl text-center"

      >

        <motion.div

          initial={{ opacity: 0, scale: 0.9 }}

          animate={{ opacity: 1, scale: 1 }}

          transition={{ duration: 0.7 }}

          className="mx-auto inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300"

        >

          <motion.span

            animate={{ opacity: [1, 0.35, 1] }}

            transition={{ duration: 1.8, repeat: Infinity }}

            className="h-2 w-2 rounded-full bg-cyan-400"

          />

          Your next big idea starts here

        </motion.div>



        <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl">

          Let’s build

          <br />

          something{' '}

          <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">

            extraordinary.

          </span>

        </h1>



        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">

          Have an idea, a challenge or a project in mind? Tell us about it.

          We’ll explore how technology can turn your vision into reality.

        </p>



        <motion.div

          initial={{ width: 0, opacity: 0 }}

          animate={{ width: 100, opacity: 1 }}

          transition={{ duration: 0.9, delay: 0.35 }}

          className="mx-auto mt-8 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"

        />

      </motion.header>



      {/* Main contact layout */}

      <div className="mx-auto mt-14 grid max-w-7xl items-start gap-7 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">

        {/* Left panel */}

        <motion.aside

          initial={{ opacity: 0, x: -35 }}

          animate={{ opacity: 1, x: 0 }}

          transition={{ ...transition, delay: 0.15 }}

          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl sm:p-8 lg:p-9"

        >

          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/[0.07] blur-3xl" />



          <div className="relative">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">

              Let’s connect

            </p>



            <h2 className="mt-4 text-3xl font-bold leading-tight">

              Every great project begins with a conversation.

            </h2>



            <p className="mt-4 leading-7 text-slate-400">

              Whether you need a website, an application or a smarter digital

              workflow, let’s start by understanding your goals.

            </p>



            {/* Animated connection visual */}

            <div className="relative my-10 flex h-48 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.07] bg-slate-950/60">

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),transparent_65%)]" />



              {[1, 2, 3].map((ring) => (

                <motion.div

                  key={ring}

                  animate={{

                    scale: [0.7, 1.45],

                    opacity: [0.55, 0],

                  }}

                  transition={{

                    duration: 3,

                    delay: ring * 0.8,

                    repeat: Infinity,

                    ease: 'easeOut',

                  }}

                  className="absolute h-20 w-20 rounded-full border border-cyan-400/40"

                />

              ))}



              <svg

                viewBox="0 0 300 170"

                className="absolute h-full w-full"

                aria-hidden="true"

              >

                <defs>

                  <linearGradient id="contactLineGradient">

                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.1" />

                    <stop offset="50%" stopColor="#22d3ee" />

                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.3" />

                  </linearGradient>

                </defs>



                <path

                  d="M25 35 L90 85 L150 85 L210 35 L275 85 L210 135 L150 85 L90 135 L25 85"

                  fill="none"

                  stroke="url(#contactLineGradient)"

                  strokeWidth="1.2"

                  strokeDasharray="5 5"

                />



                {[

                  [25, 35],

                  [90, 85],

                  [150, 85],

                  [210, 35],

                  [275, 85],

                  [210, 135],

                  [90, 135],

                ].map(([cx, cy], index) => (

                  <motion.circle

                    key={`${cx}-${cy}`}

                    cx={cx}

                    cy={cy}

                    r={index === 2 ? 5 : 3}

                    fill={index === 2 ? '#22d3ee' : '#a78bfa'}

                    animate={{

                      opacity: [0.35, 1, 0.35],

                      r: index === 2 ? [4, 6, 4] : [2, 4, 2],

                    }}

                    transition={{

                      duration: 2.2,

                      delay: index * 0.18,

                      repeat: Infinity,

                    }}

                  />

                ))}

              </svg>



              <motion.div

                animate={{

                  boxShadow: [

                    '0 0 15px rgba(34,211,238,0.1)',

                    '0 0 35px rgba(34,211,238,0.3)',

                    '0 0 15px rgba(34,211,238,0.1)',

                  ],

                }}

                transition={{ duration: 3, repeat: Infinity }}

                className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-300/50 bg-slate-900 text-lg font-bold tracking-tight text-cyan-300"

              >

                SI

              </motion.div>



              <span className="absolute bottom-3 left-4 text-[9px] uppercase tracking-[0.22em] text-slate-500">

                Ideas into digital experiences

              </span>



              <span className="absolute right-4 top-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-cyan-400">

                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                Connected

              </span>

            </div>



            {/* Email contact */}

            <motion.a

              whileHover={{ x: 5 }}

              href="mailto:shahinnovationsgroup@gmail.com"

              className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-slate-950/50 p-4 transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/[0.04]"

            >

              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-xl text-cyan-300">

                ✉

              </span>



              <span className="min-w-0 flex-1">

                <span className="block text-xs uppercase tracking-wider text-slate-500">

                  Email us

                </span>

                <span className="mt-1 block break-all text-sm font-medium text-slate-200 transition group-hover:text-cyan-300">

                  shahinnovationsgroup@gmail.com

                </span>

              </span>



              <span className="text-lg text-slate-500 transition group-hover:text-cyan-300">

                ↗

              </span>

            </motion.a>



            {/* WhatsApp contact */}

            <motion.a

              whileHover={{ x: 5 }}

              href="https://wa.me/919130704919?text=Hello%20ShahInnovations%2C%20I%20would%20like%20to%20discuss%20a%20project."

              target="_blank"

              rel="noopener noreferrer"

              className="group mt-3 flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-slate-950/50 p-4 transition duration-300 hover:border-emerald-400/40 hover:bg-emerald-400/[0.04]"

            >

              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-xl text-emerald-300">

                ◉

              </span>



              <span className="min-w-0 flex-1">

                <span className="block text-xs uppercase tracking-wider text-slate-500">

                  Chat on WhatsApp

                </span>

                <span className="mt-1 block text-sm font-medium text-slate-200 transition group-hover:text-emerald-300">

                  +91 9130704919

                </span>

              </span>



              <span className="text-lg text-slate-500 transition group-hover:text-emerald-300">

                ↗

              </span>

            </motion.a>



            <div className="mt-7 flex items-start gap-3 border-t border-white/[0.08] pt-6">

              <span className="mt-0.5 text-cyan-400">✦</span>

              <p className="text-sm leading-6 text-slate-500">

                Share your idea with us. We’ll take it from there, one step at

                a time.

              </p>

            </div>

          </div>

        </motion.aside>



        {/* Right panel: enquiry form */}

        <motion.div

          initial={{ opacity: 0, x: 35 }}

          animate={{ opacity: 1, x: 0 }}

          transition={{ ...transition, delay: 0.25 }}

          className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/10 backdrop-blur-2xl sm:p-9 lg:p-10"

        >

          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />



          <div className="flex items-start justify-between gap-4">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">

                Project enquiry

              </p>

              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">

                Tell us about your idea.

              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">

                Fill in the details below and let’s get the conversation

                started.

              </p>

            </div>



            <motion.div

              animate={{ rotate: [0, 8, -8, 0] }}

              transition={{ duration: 5, repeat: Infinity }}

              className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-2xl text-violet-300 sm:flex"

            >

              ↗

            </motion.div>

          </div>



          <div className="mt-7 flex items-center gap-2">

            <span className="h-1.5 w-8 rounded-full bg-cyan-400" />

            <span className="h-1.5 w-4 rounded-full bg-violet-400/60" />

            <span className="h-1.5 w-2 rounded-full bg-white/20" />

            <span className="ml-auto text-[10px] uppercase tracking-[0.16em] text-slate-500">

              Let’s get started

            </span>

          </div>



          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* Name and email */}

            <div className="grid gap-5 sm:grid-cols-2">

              <div>

                <label

                  htmlFor="contact-name"

                  className="mb-2 block text-sm font-medium text-slate-300"

                >

                  Your name <span className="text-cyan-400">*</span>

                </label>



                <input

                  id="contact-name"

                  name="name"

                  type="text"

                  value={formData.name}

                  onChange={handleChange}

                  placeholder="What should we call you?"

                  maxLength={100}

                  autoComplete="name"

                  required

                  className={inputClass}

                />

              </div>



              <div>

                <label

                  htmlFor="contact-email"

                  className="mb-2 block text-sm font-medium text-slate-300"

                >

                  Email address

                </label>



                <input

                  id="contact-email"

                  name="email"

                  type="email"

                  value={formData.email}

                  onChange={handleChange}

                  placeholder="you@example.com"

                  maxLength={254}

                  autoComplete="email"

                  className={inputClass}

                />

              </div>

            </div>





              {/* Phone / WhatsApp */}

              <div>

                <label

                  htmlFor="contact-phone"

                  className="mb-2 block text-sm font-medium text-slate-300"

                >

                  Phone / WhatsApp <span className="text-cyan-400">*</span>

                </label>



                <input

                  id="contact-phone"

                  name="phone"

                  type="tel"

                  value={formData.phone}

                  onChange={handleChange}

                  placeholder="+91 XXXXX XXXXX"

                  maxLength={30}

                  autoComplete="tel"

                  required

                  className={inputClass}

                />

              </div>

{/* City / State */}

<div>

  <label

    htmlFor="contact-city-state"

    className="mb-2 block text-sm font-medium text-slate-300"

  >

    City / State <span className="text-cyan-400">*</span>

  </label>

  <input

    id="contact-city-state"

    name="cityState"

    type="text"

    value={formData.cityState}

    onChange={handleChange}

    placeholder="e.g. Solapur, Maharashtra"

    maxLength={150}

    autoComplete="address-level2"

    required

    className={inputClass}

  />

</div>



{/* Message */}

<div>

              <div className="mb-2 flex items-center justify-between gap-3">

                <label

                  htmlFor="contact-message"

                  className="text-sm font-medium text-slate-300"

                >

                  Tell us about your project

                </label>



                <span

                  className={`text-xs ${

                    formData.message.length > 4500

                      ? 'text-amber-400'

                      : 'text-slate-600'

                  }`}

                >

                  {formData.message.length}/5000

                </span>

              </div>



              <textarea

                id="contact-message"

                name="message"

                value={formData.message}

                onChange={handleChange}

                placeholder="What would you like to build, improve or automate?"

                maxLength={5000}

                rows={5}

                className={`${inputClass} resize-y`}

              />

            </div>



            {/* Status message */}

            <AnimatePresence mode="wait">

              {status && (

                <motion.div

                  key={`${statusType}-${status}`}

                  initial={{ opacity: 0, y: 8, scale: 0.98 }}

                  animate={{ opacity: 1, y: 0, scale: 1 }}

                  exit={{ opacity: 0, y: -5 }}

                  role={statusType === 'error' ? 'alert' : 'status'}

                  aria-live="polite"

                  className={`rounded-xl border p-4 text-sm leading-6 ${

                    statusType === 'success'

                      ? 'border-emerald-400/25 bg-emerald-400/[0.07] text-emerald-300'

                      : 'border-red-400/25 bg-red-400/[0.07] text-red-300'

                  }`}

                >

                  <span className="mr-2">

                    {statusType === 'success' ? '✓' : '⚠'}

                  </span>

                  {status}

                </motion.div>

              )}

            </AnimatePresence>



            {/* Submit */}

            <motion.button

              type="submit"

              disabled={loading}

              whileHover={{ scale: loading ? 1 : 1.01 }}

              whileTap={{ scale: loading ? 1 : 0.985 }}

              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 px-6 py-4 font-bold text-slate-950 shadow-lg shadow-cyan-400/10 transition duration-300 hover:shadow-xl hover:shadow-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60"

            >

              <motion.span

                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent"

                animate={loading ? {} : { x: ['0%', '220%'] }}

                transition={{

                  duration: 2.6,

                  repeat: Infinity,

                  repeatDelay: 1.5,

                  ease: 'easeInOut',

                }}

              />



              {loading ? (

                <>

                  <motion.span

                    animate={{ rotate: 360 }}

                    transition={{

                      duration: 1,

                      repeat: Infinity,

                      ease: 'linear',

                    }}

                    className="relative h-5 w-5 rounded-full border-2 border-slate-950/30 border-t-slate-950"

                  />

                  <span className="relative">Sending your enquiry...</span>

                </>

              ) : (

                <>

                  <span className="relative">Send My Enquiry</span>

                  <motion.span

                    animate={{ x: [0, 4, 0] }}

                    transition={{ duration: 1.6, repeat: Infinity }}

                    className="relative text-lg"

                  >

                    ↗

                  </motion.span>

                </>

              )}

            </motion.button>

          <a

  href={`https://wa.me/919130704919?text=${encodeURIComponent(

    `Hello ShahInnovations!



Name: ${formData.name}

Email: ${formData.email}

Phone / WhatsApp: ${formData.phone}

City / State: ${formData.cityState}

Enquiry: ${formData.message}`

  )}`}

  target="_blank"

  rel="noopener noreferrer"

  className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-500/40 bg-green-500/10 px-6 py-4 font-semibold text-green-400 transition hover:bg-green-500/20"

>

  <svg

    xmlns="http://www.w3.org/2000/svg"

    viewBox="0 0 24 24"

    fill="currentColor"

    className="h-5 w-5"

    aria-hidden="true"

  >

    <path d="M20.52 3.48A11.8 11.8 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.88c0 2.09.55 4.13 1.6 5.93L.12 24l6.35-1.67a11.88 11.88 0 0 0 5.63 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.17-1.23-6.15-3.47-8.4ZM12.1 21.75a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.83 9.83 0 0 1-1.51-5.22c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.98 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.45-4.44 9.87-9.89 9.87Zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.78-1.66-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.09 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.08-.13-.27-.2-.57-.35Z" />

  </svg>

  Send on WhatsApp

</a>

            <p className="text-center text-xs leading-5 text-slate-500">

              Your details will be used to respond to your enquiry.

            </p>

          </form>

        </motion.div>

      </div>



      {/* Bottom signature */}

      <motion.div

        initial={{ opacity: 0, y: 18 }}

        whileInView={{ opacity: 1, y: 0 }}

        viewport={{ once: true }}

        transition={{ duration: 0.7 }}

        className="mx-auto mt-16 max-w-7xl border-t border-white/[0.08] pt-7 text-center"

      >

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">

          ShahInnovations

        </p>

        <p className="mt-3 text-sm text-slate-600">

          Technology <span className="px-2 text-cyan-400">·</span>

          Innovation <span className="px-2 text-violet-400">·</span>

          Digital Solutions

        </p>

      </motion.div>

    </section>

  )

}



export default Contact
