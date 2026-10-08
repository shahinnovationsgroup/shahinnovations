import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from './supabase.js'
import logo from './assets/shahinnovations-logo.png'

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error('Login Error:', error)
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    setLoading(false)

    if (data.user) {
      onLogin()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
      >

        {/* Logo */}

        <div className="text-center">

          <img
            src={logo}
            alt="ShahInnovations"
            className="mx-auto h-16 w-auto"
          />

          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Secure Access
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Admin Login
          </h1>

          <p className="mt-3 text-sm text-slate-400">
            Login to access the ShahInnovations Admin Dashboard.
          </p>

        </div>

        {/* Login Form */}

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          {/* Email */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Admin Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />

          </div>

          {/* Error */}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}

          {/* Login Button */}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Login to Dashboard'}
          </motion.button>

        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          ShahInnovations • Secure Admin Area
        </p>

      </motion.div>

    </div>
  )
}

export default AdminLogin