
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from './supabase.js'
import logo from './assets/shahinnovations-logo.png'
import aiBackground from './assets/admin-ai-background.png'

const services = [
  { icon: '</>', title: 'Website Building', color: '#38bdf8', x: '-310px', y: '-170px' },
  { icon: 'WA', title: 'WhatsApp Automation', color: '#34d399', x: '310px', y: '-155px' },
  { icon: 'AI', title: 'Agentic AI', color: '#a78bfa', x: '-330px', y: '120px' },
  { icon: 'APP', title: 'App Building', color: '#22d3ee', x: '320px', y: '130px' },
  { icon: 'VOX', title: 'Voice Automation', color: '#f0abfc', x: '0px', y: '-260px' },
  { icon: 'MKT', title: 'WhatsApp Marketing', color: '#60a5fa', x: '0px', y: '255px' },
]

const particles = Array.from({ length: 42 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  delay: (i % 9) * 0.3,
  duration: 5 + (i % 6),
  size: i % 5 === 0 ? 4 : 2,
}))

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    document.title = 'Admin Secure Access | ShahInnovations'
    return () => {
      document.title = 'ShahInnovations'
    }
  }, [])

  async function handleLogin(e) {
    e.preventDefault()
    if (loading) return

    setLoading(true)
    setError('')

    try {
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })

      if (loginError) {
        setError('Login unsuccessful. Check your email and password.')
        return
      }

      if (data.user) {
        onLogin()
      } else {
        setError('Unable to verify your account. Please try again.')
      }
    } catch (err) {
      console.error('Admin login error:', err)
      setError('Connection issue. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="si-admin relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#030611] px-4 py-6 text-white sm:px-6">
      <div className="si-ambient si-ambient-one" />
      <div className="si-ambient si-ambient-two" />
      <div className="si-grid" />

      {/* Animated particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="si-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -35, 12, 0],
              x: [0, 15, -12, 0],
              opacity: [0.12, 0.8, 0.25, 0.12],
              scale: [1, 1.5, 0.8, 1],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Large 3D-inspired technology scene */}

<div className="si-cinematic-bg" aria-hidden="true">
  <motion.div
    className="si-cinematic-image"
    style={{ backgroundImage: `url(${aiBackground})` }}
    animate={{
      scale: [1, 1.06, 1],
      x: [0, -8, 0],
      y: [0, 4, 0],
    }}
    transition={{
      duration: 22,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />

  <div className="si-cinematic-shade" />

  <motion.div
    className="si-cinematic-scan"
    animate={{ y: ['-100%', '100vh'] }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    }}
  />

  <div className="si-cinematic-glow" />
</div>


      {/* Login card */}
      <motion.section
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="si-login-card relative z-10 w-full max-w-md rounded-[28px] p-5 sm:p-6"
      >
        <div className="si-card-topline" />

        <div className="relative z-10 text-center">
          <motion.div
            className="si-logo-stage mx-auto"
            initial={{ opacity: 0, rotateY: -22, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <img
              src={logo}
              alt="ShahInnovations"
              className="si-logo mx-auto block h-20 w-auto max-w-[280px] object-contain sm:h-24 sm:max-w-[300px]"
            />
          </motion.div>

          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="si-live-dot" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">
              Secure Access
            </p>
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Admin <span className="si-gradient-text">Portal</span>
          </h1>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-400">
            Your command centre for digital operations, enquiries and automation.
          </p>
        </div>

        <div className="si-status mt-4 flex items-center justify-between rounded-xl px-3 py-3">
          <div className="flex items-center gap-2">
            <span className="si-status-dot" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300">
              Secure Gateway
            </span>
          </div>
          <span className="text-[10px] font-semibold tracking-wider text-cyan-300">
            AUTH ENABLED
          </span>
        </div>

        <form onSubmit={handleLogin} className="relative z-10 mt-4 space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Admin Email
            </label>

            <div className="si-input-wrap">
              <span className="si-input-icon" aria-hidden="true">@</span>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                required
                disabled={loading}
                className="si-input"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Password
            </label>

            <div className="si-input-wrap">
              <span className="si-input-icon" aria-hidden="true">◆</span>
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                disabled={loading}
                className="si-input si-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="si-show-password"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                role="alert"
                initial={{ opacity: 0, height: 0, y: -5 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border border-rose-400/20 bg-rose-400/[0.08] p-3 text-sm text-rose-300">
                  <span className="mr-2">!</span>
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.012 }}
            whileTap={{ scale: loading ? 1 : 0.985 }}
            className="si-login-button group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-5 py-4 font-semibold text-[#031018] disabled:cursor-not-allowed disabled:opacity-65"
          >
            <span className="si-button-shine" />
            {loading ? (
              <>
                <span className="si-spinner" />
                Verifying credentials...
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <motion.span
                  aria-hidden="true"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </>
            )}
          </motion.button>
        </form>

        <div className="relative z-10 mt-4 border-t border-white/[0.08] pt-4 text-center">
          <p className="text-xs text-slate-400">
            ShahInnovations <span className="mx-1 text-cyan-400">•</span>
            Secure Admin Area
          </p>
          <p className="mt-2 text-[10px] tracking-wider text-slate-600">
            TECHNOLOGY · INNOVATION · DIGITAL SOLUTIONS
          </p>
        </div>
      </motion.section>

      <div className="pointer-events-none absolute bottom-2 left-0 right-0 z-10 text-center">
        <p className="text-[9px] tracking-[0.2em] text-slate-600">
          SHAHINNOVATIONS SECURITY SYSTEM
        </p>
      </div>

      <style>{`
        .si-admin {
          isolation: isolate;
          perspective: 1200px;
          min-height: 100svh;
          background:
            radial-gradient(ellipse at 50% 45%, rgba(8, 36, 66, .42), transparent 56%),
            #030611;
        }

        .si-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .24;
          background-image:
            linear-gradient(rgba(70,190,255,.065) 1px, transparent 1px),
            linear-gradient(90deg, rgba(70,190,255,.065) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse at center, black 5%, transparent 82%);
        }

        .si-ambient {
          position: absolute;
          width: min(70vw, 650px);
          aspect-ratio: 1;
          border-radius: 50%;
          filter: blur(85px);
          opacity: .15;
          pointer-events: none;
          animation: siAmbient 16s ease-in-out infinite alternate;
        }

        .si-ambient-one {
          top: -35%;
          left: -25%;
          background: #00c7ef;
        }

        .si-ambient-two {
          right: -25%;
          bottom: -35%;
          background: #7546ed;
          animation-delay: -8s;
        }

        @keyframes siAmbient {
          from { transform: translate3d(-2%,-1%,0) scale(.92); }
          to { transform: translate3d(4%,3%,0) scale(1.08); }
        }

        .si-particle {
          position: absolute;
          display: block;
          border-radius: 50%;
          background: #67e8f9;
          box-shadow: 0 0 10px rgba(34,211,238,.8);
        }

        .si-scene {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          perspective: 1000px;
          opacity: .82;
        }

        .si-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px solid rgba(34,211,238,.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 35px rgba(34,211,238,.035), inset 0 0 30px rgba(34,211,238,.025);
        }

        .si-ring-one {
          width: min(76vw, 760px);
          height: min(76vw, 760px);
          animation: siRing 42s linear infinite;
        }

        .si-ring-two {
          width: min(90vw, 950px);
          height: min(46vw, 490px);
          border-color: rgba(139,92,246,.2);
          transform: translate(-50%, -50%) rotate(-28deg);
          animation: siRingReverse 52s linear infinite;
        }

        .si-ring-three {
          width: min(98vw, 1100px);
          height: min(56vw, 620px);
          border-style: dashed;
          border-color: rgba(56,189,248,.12);
          animation: siRing 65s linear infinite;
        }

        @keyframes siRing {
          to { rotate: 360deg; }
        }

        @keyframes siRingReverse {
          to { rotate: -360deg; }
        }

        .si-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 145px;
          height: 145px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(103,232,249,.4);
          border-radius: 34px;
          background: linear-gradient(145deg, rgba(10,48,76,.72), rgba(12,17,42,.65));
          box-shadow: 0 0 45px rgba(34,211,238,.12), inset 0 0 25px rgba(34,211,238,.1);
          transform: translate(-50%, -50%);
          transform-style: preserve-3d;
          opacity: .5;
        }

        .si-core-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          transform: translateZ(18px);
        }

        .si-core-mark {
          font-size: 38px;
          font-weight: 900;
          letter-spacing: -.08em;
          color: #67e8f9;
          text-shadow: 0 0 25px rgba(34,211,238,.8);
        }

        .si-core-caption {
          font-size: 7px;
          letter-spacing: .18em;
          color: #a5f3fc;
          white-space: nowrap;
        }

        .si-service-node {
          position: absolute;
          left: calc(50% + var(--node-x));
          top: calc(50% + var(--node-y));
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          min-width: 108px;
          padding: 13px 15px;
          border: 1px solid color-mix(in srgb, var(--node-color) 38%, transparent);
          border-radius: 16px;
          background: linear-gradient(145deg, rgba(14,28,49,.72), rgba(3,9,24,.55));
          box-shadow: 0 12px 40px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.06);
          transform: translate(-50%, -50%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          opacity: .58;
        }

        .si-node-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border: 1px solid color-mix(in srgb, var(--node-color) 55%, transparent);
          border-radius: 12px;
          background: color-mix(in srgb, var(--node-color) 12%, transparent);
          color: var(--node-color);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: -.04em;
          box-shadow: 0 0 20px color-mix(in srgb, var(--node-color) 14%, transparent);
        }

        .si-node-title {
          color: #dbeafe;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: .03em;
          text-align: center;
          white-space: nowrap;
        }

        .si-node-light {
          position: absolute;
          bottom: -1px;
          left: 20%;
          width: 60%;
          height: 1px;
          background: var(--node-color);
          box-shadow: 0 0 12px var(--node-color);
        }

        .si-scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 1px;
          opacity: .18;
          background: linear-gradient(90deg, transparent, #22d3ee, transparent);
          animation: siScan 12s ease-in-out infinite alternate;
        }

        @keyframes siScan {
          from { transform: translateY(15vh); }
          to { transform: translateY(85vh); }
        }

        .si-login-card {
          overflow: hidden;
          border: 1px solid rgba(148,163,184,.2);
          background: linear-gradient(145deg, rgba(17,25,45,.96), rgba(5,12,27,.96));
          box-shadow: 0 30px 100px rgba(0,0,0,.52), 0 0 55px rgba(8,145,178,.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .si-card-topline {
          position: absolute;
          top: 0;
          left: 12%;
          width: 76%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #22d3ee, #a78bfa, transparent);
          box-shadow: 0 0 12px rgba(34,211,238,.45);
        }

        .si-logo-stage {
          position: relative;
          display: flex;
          min-height: 88px;
          align-items: center;
          justify-content: center;
          perspective: 900px;
        }

        .si-logo {
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 7px 12px rgba(0,0,0,.18));
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .si-gradient-text {
          color: transparent;
          background: linear-gradient(100deg, #67e8f9, #38bdf8 50%, #a78bfa);
          background-clip: text;
          -webkit-background-clip: text;
        }

        .si-live-dot, .si-status-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 9px rgba(52,211,153,.55);
        }

        .si-live-dot {
          animation: siPulse 2s ease-in-out infinite;
        }

        @keyframes siPulse {
          0%,100% { opacity: 1; }
          50% { opacity: .4; }
        }

        .si-status {
          border: 1px solid rgba(148,163,184,.12);
          background: rgba(3,9,23,.55);
        }

        .si-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(148,163,184,.17);
          border-radius: 12px;
          background: rgba(2,8,23,.72);
          padding: 0 14px;
          transition: border-color .25s ease, box-shadow .25s ease, background .25s ease;
        }

        .si-input-wrap:focus-within {
          border-color: rgba(34,211,238,.75);
          background: rgba(4,17,34,.95);
          box-shadow: 0 0 0 3px rgba(34,211,238,.08), 0 0 20px rgba(34,211,238,.07);
        }

        .si-input-icon {
          width: 18px;
          color: #67e8f9;
          font-size: 14px;
          text-align: center;
          flex-shrink: 0;
        }

        .si-input {
          width: 100%;
          min-width: 0;
          padding: 13px 0;
          color: #f8fafc;
          background: transparent;
          outline: none;
          font-size: 14px;
        }

        .si-input::placeholder {
          color: #64748b;
        }

        .si-password {
          padding-right: 2px;
        }

        .si-show-password {
          flex-shrink: 0;
          padding: 6px 0 6px 6px;
          color: #67e8f9;
          font-size: 12px;
          font-weight: 600;
        }

        .si-show-password:hover {
          color: white;
        }

        .si-login-button {
          background: linear-gradient(100deg, #67e8f9, #38bdf8 55%, #a5f3fc);
          box-shadow: 0 8px 28px rgba(6,182,212,.17);
          transition: box-shadow .25s ease, filter .25s ease;
        }

        .si-login-button:hover {
          box-shadow: 0 10px 34px rgba(6,182,212,.27);
          filter: brightness(1.04);
        }

        .si-button-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 55%;
          height: 100%;
          background: linear-gradient(100deg, transparent, rgba(255,255,255,.38), transparent);
          transform: skewX(-20deg);
          transition: left .7s ease;
          pointer-events: none;
        }

        .si-login-button:hover .si-button-shine {
          left: 150%;
        }

        .si-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(3,16,24,.25);
          border-top-color: #031018;
          border-radius: 50%;
          animation: siSpin .7s linear infinite;
        }

        @keyframes siSpin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1100px) {
          .si-service-node {
            opacity: .25;
          }
          .si-core {
            opacity: .22;
          }
          .si-scene {
            opacity: .7;
          }
        }

        @media (max-width: 700px) {
          .si-service-node {
            display: none;
          }
          .si-ring-one {
            width: 115vw;
            height: 115vw;
          }
          .si-ring-two {
            width: 125vw;
            height: 70vw;
          }
          .si-ring-three {
            width: 140vw;
            height: 85vw;
          }
          .si-core {
            width: 110px;
            height: 110px;
            opacity: .13;
          }
          .si-core-mark {
            font-size: 30px;
          }
        }

        @media (max-height: 760px) {
          .si-login-card {
            padding-top: 16px;
            padding-bottom: 16px;
          }
          .si-logo-stage {
            min-height: 72px;
          }
          .si-logo {
            height: 70px;
          }
          .si-input {
            padding-top: 11px;
            padding-bottom: 11px;
          }
          .si-login-button {
            padding-top: 12px;
            padding-bottom: 12px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .si-ambient,
          .si-ring,
          .si-live-dot,
          .si-scan-line {
            animation: none !important;
          }
        }
        .si-cinematic-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  background: #030611;
}

.si-cinematic-image {
  position: absolute;
  inset: -3%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.9;
  animation: siBackgroundMotion 20s ease-in-out infinite alternate;
}

@keyframes siBackgroundMotion {
  from { transform: scale(1) translateX(0); }
  to { transform: scale(1.08) translateX(-1%); }
}

.si-cinematic-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(3, 6, 17, 0.1),
    rgba(3, 6, 17, 0.25) 40%,
    rgba(3, 6, 17, 0.65)
  );
}

.si-cinematic-scan {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(34, 211, 238, 0.12),
    transparent
  );
}

.si-cinematic-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 75% 40%,
    rgba(0, 153, 255, 0.15),
    transparent 45%
  );
}
      `}
      </style>
    </main>
  )
}
