import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isPro, canUse, getRemainingUses, incrementUsage, getSubscription, setSubscription, FREE_LIMITS } from '../lib/subscription'

// Stripe subscription checkout links - Di creates these in Stripe Dashboard
// Products → Add product → Recurring → Get payment link
const STRIPE_LINKS = {
  monthly: 'https://buy.stripe.com/9B64gAg4pgrB5Vs54McIE02',
  annual: 'https://buy.stripe.com/bJeaEY7xTdfperY68QcIE03',
}

export function ProBadge() {
  if (!isPro()) return null
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 12, background: 'linear-gradient(135deg, #059669, #0d9488)', color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>
      PRO
    </span>
  )
}

export function UsageBadge({ toolId }) {
  if (isPro()) return <ProBadge />
  const remaining = getRemainingUses(toolId)
  const limit = FREE_LIMITS[toolId] || 1
  if (limit >= 999) return <span style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>Free</span>
  return (
    <span style={{ fontSize: 11, color: remaining > 0 ? '#d97706' : '#dc2626', fontWeight: 600 }}>
      {remaining > 0 ? `${remaining} free use${remaining > 1 ? 's' : ''} left` : 'Pro required'}
    </span>
  )
}

export function ToolGate({ toolId, children, onUse }) {
  const [pro, setPro] = useState(isPro())
  const [allowed, setAllowed] = useState(canUse(toolId))

  if (pro || allowed) {
    return typeof children === 'function' ? children(() => {
      incrementUsage(toolId)
      setAllowed(canUse(toolId))
      if (onUse) onUse()
    }) : children
  }

  return <UpgradePrompt toolId={toolId} />
}

export function UpgradePrompt({ toolId }) {
  return (
    <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', borderRadius: 14, padding: 36, textAlign: 'center', margin: '24px 0' }}>
      <div style={{ fontSize: 13, color: '#5b9bd5', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Free limit reached</div>
      <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Upgrade to HCCS™ Pro</h3>
      <p style={{ fontSize: 15, color: '#94a3b8', maxWidth: 440, margin: '0 auto 24px', lineHeight: 1.6 }}>
        Unlimited access to all tools, templates, blog content, and priority support. Cancel anytime.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
        <Link to="/pricing" style={{ background: '#2563eb', color: '#fff', padding: '12px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>See Pro plans</Link>
      </div>
      <div style={{ fontSize: 12, color: '#64748b' }}>Starting at $29/month or $249/year</div>
    </div>
  )
}

export function PricingPage() {
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const pro = isPro()
  const sub = getSubscription()

  // Check for Stripe redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sessionId = params.get('session_id')
    if (sessionId) {
      setVerifying(true)
      fetch('/.netlify/functions/verify-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
        .then(r => r.json())
        .then(data => {
          if (data.status === 'active') {
            setSubscription(data)
            window.history.replaceState({}, '', '/pricing')
          }
        })
        .catch(() => {})
        .finally(() => setVerifying(false))
    }
  }, [])

  const activateCode = async () => {
    if (!code.trim()) return
    setErr('')
    try {
      const res = await fetch('/.netlify/functions/verify-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      })
      const data = await res.json()
      if (data.status === 'active') {
        setSubscription(data)
        window.location.reload()
      } else {
        setErr('Invalid code')
      }
    } catch { setErr('Error verifying code') }
  }

  if (verifying) return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>Verifying your subscription...</div>
        <div style={{ fontSize: 14, color: '#64748b' }}>This will only take a moment.</div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a, #0f3460)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 500 }}>HCCS™ Plans</div>
          <h1 className='hero-title' style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>
            {pro ? 'You\'re on HCCS™ Pro' : 'Choose your plan'}
          </h1>
          <p style={{ fontSize: 17, color: '#94a3b8', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            {pro ? `Active since ${new Date(sub?.activatedAt).toLocaleDateString()}. You have unlimited access to all tools and content.` : 'Free tools to get started. Pro for unlimited access and the full toolkit.'}
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {pro ? (
            <div style={{ background: '#f0fdf4', border: '2px solid #059669', borderRadius: 14, padding: 32, textAlign: 'center', marginBottom: 32 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>✓</div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#166534', margin: '0 0 8px' }}>HCCS™ Pro Active</h2>
              <p style={{ fontSize: 15, color: '#15803d', marginBottom: 16 }}>You have unlimited access to all tools, templates, and content.</p>
              <Link to="/tools" style={{ display: 'inline-block', background: '#059669', color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Go to tools</Link>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 40 }}>
                {/* Free */}
                <div style={{ background: '#fff', borderRadius: 16, padding: '32px 24px', border: '2px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Free</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>$0</div>
                  <div style={{ fontSize: 14, color: '#64748b', marginBottom: 20 }}>Get started</div>
                  <div style={{ flex: 1 }}>
                    {['Bias language checker (unlimited)', '1 role definition', '1 scorecard', '3 compensation calculations', '1 ADT inventory', 'Quick assessment (10 controls)', '10 fillable templates'].map(f => (
                      <div key={f} style={{ fontSize: 13, color: '#475569', marginBottom: 8, display: 'flex', gap: 8, lineHeight: 1.45 }}>
                        <span style={{ color: '#059669', fontWeight: 700, flexShrink: 0 }}>✓</span><span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', fontStyle: 'italic', marginBottom: 16 }}>No credit card required.</div>
                  <Link to="/tools" style={{ display: 'block', textAlign: 'center', background: '#f8fafc', color: '#475569', padding: '12px 20px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0' }}>Get started free</Link>
                </div>

                {/* Pro Monthly */}
                <div style={{ background: '#fff', borderRadius: 16, padding: '32px 24px', border: '2px solid #2563eb', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#2563eb', color: '#fff', padding: '4px 16px', borderRadius: 12, fontSize: 12, fontWeight: 600 }}>Most popular</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Pro Monthly</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>$29<span style={{ fontSize: 16, fontWeight: 400, color: '#64748b' }}>/mo</span></div>
                  <div style={{ fontSize: 14, color: '#64748b', marginBottom: 20 }}>Cancel anytime</div>
                  <div style={{ flex: 1 }}>
                    {['Everything in Free, plus:', 'Unlimited role definitions', 'Unlimited scorecards', 'Unlimited comp calculations', 'Unlimited ADT inventories', 'Priority email support', 'New tools as they launch'].map((f, i) => (
                      <div key={f} style={{ fontSize: 13, color: i === 0 ? '#0f172a' : '#475569', fontWeight: i === 0 ? 600 : 400, marginBottom: 8, display: 'flex', gap: 8, lineHeight: 1.45 }}>
                        {i > 0 && <span style={{ color: '#2563eb', fontWeight: 700, flexShrink: 0 }}>✓</span>}<span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', fontStyle: 'italic', marginBottom: 16 }}>Best for individual HR/TA leaders.</div>
                  {STRIPE_LINKS.monthly ? (
                    <a href={`${STRIPE_LINKS.monthly}?success_url=${encodeURIComponent('https://hccsstandard.com/pricing?session_id={CHECKOUT_SESSION_ID}')}`} style={{ display: 'block', textAlign: 'center', background: '#2563eb', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Subscribe monthly</a>
                  ) : (
                    <div style={{ textAlign: 'center', background: '#eff6ff', color: '#2563eb', padding: '12px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600 }}>Coming soon</div>
                  )}
                </div>

                {/* Pro Annual */}
                <div style={{ background: '#fff', borderRadius: 16, padding: '32px 24px', border: '2px solid #059669', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Pro Annual</div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>$249<span style={{ fontSize: 16, fontWeight: 400, color: '#64748b' }}>/yr</span></div>
                  <div style={{ fontSize: 14, color: '#059669', fontWeight: 600, marginBottom: 20 }}>Save 28%</div>
                  <div style={{ flex: 1 }}>
                    {['Everything in Pro Monthly, plus:', '$100 off full assessment ($49)', 'Annual compliance review checklist', 'Early access to new tools', 'Exclusive blog content'].map((f, i) => (
                      <div key={f} style={{ fontSize: 13, color: i === 0 ? '#0f172a' : '#475569', fontWeight: i === 0 ? 600 : 400, marginBottom: 8, display: 'flex', gap: 8, lineHeight: 1.45 }}>
                        {i > 0 && <span style={{ color: '#059669', fontWeight: 700, flexShrink: 0 }}>✓</span>}<span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', fontStyle: 'italic', marginBottom: 16 }}>Best value. Best for teams building governance.</div>
                  {STRIPE_LINKS.annual ? (
                    <a href={`${STRIPE_LINKS.annual}?success_url=${encodeURIComponent('https://hccsstandard.com/pricing?session_id={CHECKOUT_SESSION_ID}')}`} style={{ display: 'block', textAlign: 'center', background: '#059669', color: '#fff', padding: '12px 20px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Subscribe annually</a>
                  ) : (
                    <div style={{ textAlign: 'center', background: '#f0fdf4', color: '#059669', padding: '12px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600 }}>Coming soon</div>
                  )}
                </div>
              </div>

              {/* Access code */}
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                {showCode ? (
                  <div style={{ maxWidth: 400, margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 12 }}>Enter access code</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input value={code} onChange={e => { setCode(e.target.value.toUpperCase()); setErr('') }} placeholder="YOUR CODE"
                        style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: `1px solid ${err ? '#fca5a5' : '#e2e8f0'}`, fontSize: 14, textAlign: 'center', letterSpacing: '0.1em', fontWeight: 600, textTransform: 'uppercase', outline: 'none' }}
                        onKeyDown={e => { if (e.key === 'Enter') activateCode() }} />
                      <button onClick={activateCode} style={{ padding: '10px 20px', borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Activate</button>
                    </div>
                    {err && <div style={{ fontSize: 13, color: '#dc2626', marginTop: 8 }}>{err}</div>}
                  </div>
                ) : (
                  <button onClick={() => setShowCode(true)} style={{ background: 'none', border: 'none', fontSize: 14, color: '#2563eb', cursor: 'pointer', fontWeight: 500 }}>Have an access code?</button>
                )}
              </div>
            </>
          )}

          {/* Assessment tiers - unchanged */}
          <div style={{ background: '#0f172a', borderRadius: 14, padding: 32, textAlign: 'center' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Need the full assessment?</h3>
            <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 20 }}>Pro unlocks the tools. The assessment scores all 70 controls.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Link to="/assess" style={{ background: '#2563eb', color: '#fff', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Quick assessment (free)</Link>
              <Link to="/assess/full" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>Full assessment ($149+)</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
