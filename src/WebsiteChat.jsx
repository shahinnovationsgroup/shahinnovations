
import { useEffect, useRef, useState } from 'react'

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/website-chat`
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const SESSION_KEY = 'shahinnovations_website_chat'

export default function WebsiteChat() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [session, setSession] = useState(null)
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const bottomRef = useRef(null)

  async function request(action, extra = {}) {
    const response = await fetch(FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: ANON_KEY,
        Authorization: `Bearer ${ANON_KEY}`,
      },
      body: JSON.stringify({
        action,
        ...(session || {}),
        ...extra,
      }),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Chat request failed')
    return data
  }

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY)
      if (saved) setSession(JSON.parse(saved))
    } catch {
      localStorage.removeItem(SESSION_KEY)
    }
  }, [])

  useEffect(() => {
    if (!open || !session) return

    let active = true

    const poll = async () => {
      try {
        const data = await request('poll')
        if (active) setMessages(data.messages || [])
      } catch (err) {
        if (active) setError(err.message)
      }
    }

    poll()
    const timer = setInterval(poll, 5000)

    return () => {
      active = false
      clearInterval(timer)
    }
  }, [open, session?.conversation_id, session?.token])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function startChat(event) {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const data = await request('start', { name, email })
      const nextSession = {
        conversation_id: data.conversation_id,
        token: data.token,
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(nextSession))
      setSession(nextSession)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function sendMessage(event) {
    event.preventDefault()
    if (!message.trim() || loading) return

    setLoading(true)
    setError('')

    try {
      await request('send', { message: message.trim() })
      setMessage('')
      const data = await request('poll')
      setMessages(data.messages || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      {open && (
        <section className="mb-3 flex h-[min(520px,75vh)] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-cyan-400/30 bg-slate-950 text-white shadow-2xl">
          <header className="flex items-center justify-between bg-slate-900 p-4">
            <div>
              <h2 className="font-semibold">Chat with ShahInnovations</h2>
              <p className="text-xs text-slate-400">We’re here to help</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="px-2 text-xl">×</button>
          </header>

          {!session ? (
            <form onSubmit={startChat} className="flex flex-1 flex-col gap-3 p-4">
              <p className="text-sm text-slate-300">Start a conversation with our team.</p>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" maxLength={100} className="rounded-lg border border-slate-700 bg-slate-900 p-3" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email (optional)" maxLength={254} className="rounded-lg border border-slate-700 bg-slate-900 p-3" />
              <button disabled={loading || !name.trim()} className="rounded-lg bg-cyan-500 p-3 font-semibold text-slate-950 disabled:opacity-50">
                {loading ? 'Starting…' : 'Start chat'}
              </button>
              {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
            </form>
          ) : (
            <>
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.length === 0 && <p className="text-sm text-slate-400">Send us a message to get started.</p>}
                {messages.map(item => (
                  <div key={item.id} className={`max-w-[90%] whitespace-pre-wrap break-words rounded-xl p-3 text-sm ${item.sender_type === 'visitor' ? 'ml-auto bg-cyan-600 text-white' : 'bg-slate-800 text-slate-100'}`}>
                    <p>{item.body}</p>
                    <p className="mt-1 text-[10px] opacity-60">{item.sender_type === 'bot' ? 'Automated reply' : item.sender_type === 'admin' ? 'Support team' : 'You'}</p>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <form onSubmit={sendMessage} className="flex gap-2 border-t border-slate-800 p-3">
                <input value={message} onChange={e => setMessage(e.target.value)} maxLength={2000} placeholder="Type a message…" className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm" />
                <button disabled={loading || !message.trim()} className="rounded-lg bg-cyan-500 px-4 font-semibold text-slate-950 disabled:opacity-50">Send</button>
              </form>
              {error && <p role="alert" className="px-3 pb-2 text-xs text-red-400">{error}</p>}
            </>
          )}
        </section>
      )}

      <button onClick={() => setOpen(value => !value)} className="ml-auto flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 shadow-lg transition hover:bg-cyan-400">
        <span aria-hidden="true">●</span>
        {open ? 'Close chat' : 'Live Chat'}
      </button>
    </div>
  )
}
