import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const WELCOME = "Hi! I'm the HCCS\u2122 assistant. I can help you understand the standard, its 70 controls, the assessment process, or pricing. What can I help with?"

const QUICK_ACTIONS = [
  { label: 'What is HCCS?', msg: 'What is the HCCS Standard and why does it matter?' },
  { label: 'How do I start?', msg: 'How do I get started with an HCCS assessment?' },
  { label: 'Pricing', msg: 'What are the pricing options for the assessment?' },
  { label: 'Talk to a human', msg: 'I would like to speak with someone directly.' },
]

function renderText(text, navigate) {
  // Convert [text](/path) links to clickable elements
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return parts.map((part, i) => {
    const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
    if (match) {
      const [, label, href] = match
      if (href.startsWith('/')) {
        return <a key={i} href={href} onClick={e => { e.preventDefault(); navigate(href) }} style={{ color: '#5b9bd5', fontWeight: 500, textDecoration: 'underline' }}>{label}</a>
      }
      return <a key={i} href={href} target="_blank" rel="noopener" style={{ color: '#5b9bd5', fontWeight: 500 }}>{label}</a>
    }
    return <span key={i}>{part}</span>
  })
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open && !hasOpened) setHasOpened(true)
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  const send = async (text) => {
    if (!text.trim()) return
    const userMsg = { role: 'user', content: text.trim() }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      // Only send user/assistant pairs to API (skip the welcome message for API context)
      const apiMessages = updated.filter((m, i) => i > 0).map(m => ({ role: m.role, content: m.content }))

      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting. Try the [contact form](/contact) to reach us directly." }])
    } finally {
      setLoading(false)
    }
  }

  const unread = !hasOpened ? 1 : 0

  return (
    <>
      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 88, right: 24, width: 380, maxHeight: 520,
          background: '#fff', borderRadius: 16, boxShadow: '0 16px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.08)',
          display: 'flex', flexDirection: 'column', zIndex: 1000, border: '1px solid #e2e8f0',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0a1628, #1a2d4a)', padding: '16px 20px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>HCCS™ Assistant</div>
              <div style={{ fontSize: 12, color: '#5b9bd5' }}>Ask about the standard, controls, or pricing</div>
            </div>
            <button aria-label="Close chat" onClick={() => setOpen(false)} style={{
              background: 'none', border: 'none', color: '#94a3b8', fontSize: 20, cursor: 'pointer', padding: 4,
            }}>&times;</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflow: 'auto', padding: '16px 16px 8px', minHeight: 240 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: 10,
              }}>
                <div style={{
                  maxWidth: '85%', padding: '10px 14px', borderRadius: 12, fontSize: 14, lineHeight: 1.55,
                  ...(m.role === 'user'
                    ? { background: '#2563eb', color: '#fff', borderBottomRightRadius: 4 }
                    : { background: '#f1f5f9', color: '#334155', borderBottomLeftRadius: 4 }),
                }}>
                  {m.role === 'assistant' ? renderText(m.content, navigate) : m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 10 }}>
                <div style={{ background: '#f1f5f9', padding: '10px 14px', borderRadius: 12, fontSize: 14, color: '#94a3b8' }}>
                  <span style={{ animation: 'pulse 1.2s ease-in-out infinite' }}>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick actions (only show at start) */}
          {messages.length <= 1 && (
            <div style={{ padding: '0 16px 8px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {QUICK_ACTIONS.map(qa => (
                <button key={qa.label} onClick={() => send(qa.msg)} style={{
                  padding: '6px 12px', borderRadius: 16, border: '1px solid #e2e8f0', background: '#fff',
                  fontSize: 12, color: '#475569', cursor: 'pointer', fontWeight: 500,
                }}>{qa.label}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '8px 12px 12px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 8 }}>
            <input ref={inputRef} type="text" aria-label="Type your question" value={input} onChange={e => setInput(e.target.value)}
              placeholder="Ask about HCCS..."
              onKeyDown={e => { if (e.key === 'Enter' && !loading) send(input) }}
              style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
            <button aria-label="Send message" onClick={() => send(input)} disabled={loading || !input.trim()}
              style={{
                padding: '10px 16px', borderRadius: 8, border: 'none',
                background: loading || !input.trim() ? '#e2e8f0' : '#2563eb',
                color: loading || !input.trim() ? '#94a3b8' : '#fff',
                fontSize: 14, fontWeight: 600, cursor: loading ? 'default' : 'pointer', whiteSpace: 'nowrap',
              }}>Send</button>
          </div>
          <div style={{ padding: '0 12px 8px', fontSize: 10, color: '#64748b', textAlign: 'center', lineHeight: 1.4 }}>AI-powered. Responses may be incomplete or imperfect. Not a substitute for professional advice.</div>
        </div>
      )}

      {/* Floating button */}
      <button aria-label="Open chat assistant" onClick={() => setOpen(!open)} style={{
        position: 'fixed', bottom: 24, right: 24, width: 56, height: 56,
        borderRadius: '50%', background: '#2563eb', border: 'none', cursor: 'pointer',
        boxShadow: '0 6px 20px rgba(37,99,235,0.4)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.2s, background 0.2s',
      }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        )}
        {unread > 0 && !open && (
          <div style={{
            position: 'absolute', top: -2, right: -2, width: 18, height: 18, borderRadius: '50%',
            background: '#dc2626', color: '#fff', fontSize: 11, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>1</div>
        )}
      </button>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
      `}</style>
    </>
  )
}
