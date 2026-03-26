import { useState } from 'react'

const INTERESTS = [
  'Self-Assessment ($149)',
  'Guided Assessment ($2,500)',
  'Enterprise / Validated Audit',
  'Licensing the HCCS\u2122 Standard',
  'Partnership or integration',
  'Speaking or advisory',
  'General question',
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', org: '', interest: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [err, setErr] = useState('')

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { setErr('Please fill in name, email, and message.'); return }
    setSending(true); setErr('')
    try {
      const res = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) setSent(true)
      else setErr('Something went wrong. Try emailing diane.malefyt@gmail.com directly.')
    } catch (e) { setErr('Network error. Try emailing diane.malefyt@gmail.com directly.') }
    finally { setSending(false) }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>Get in touch</h1>
          <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.6 }}>
            Questions about the HCCS™ Standard, assessment options, enterprise pricing, or partnerships? We'll get back to you within one business day.
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>

          {/* Form */}
          <div>
            {!sent ? (
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 32 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 24px' }}>Send us a message</h2>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>Name <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>Email <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>Organization</label>
                  <input type="text" value={form.org} onChange={e => set('org', e.target.value)} placeholder="Your company (optional)"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>What are you interested in?</label>
                  <select value={form.interest} onChange={e => set('interest', e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box', background: '#fff', appearance: 'auto' }}>
                    <option value="">Select an option</option>
                    {INTERESTS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>Message <span style={{ color: '#dc2626' }}>*</span></label>
                  <textarea value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us about your organization, what you're looking for, and any questions you have."
                    rows={5} style={{ width: '100%', padding: '12px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', resize: 'vertical', lineHeight: 1.5 }} />
                </div>

                {err && <div style={{ fontSize: 13, color: '#dc2626', marginBottom: 12 }}>{err}</div>}

                <button onClick={handleSubmit} disabled={sending}
                  style={{ width: '100%', padding: '14px', borderRadius: 8, border: 'none', background: sending ? '#94a3b8' : '#2563eb', color: '#fff', fontSize: 15, fontWeight: 600, cursor: sending ? 'default' : 'pointer' }}>
                  {sending ? 'Sending...' : 'Send message'}
                </button>
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 10, textAlign: 'center' }}>We respond within one business day.</div>
              </div>
            ) : (
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 14, padding: 40, textAlign: 'center' }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#166534', margin: '0 0 8px' }}>Message sent</h2>
                <p style={{ fontSize: 15, color: '#15803d', margin: '0 0 12px', lineHeight: 1.5 }}>
                  We've received your inquiry and sent a confirmation to {form.email}. We'll get back to you within one business day.
                </p>
                <a href="/assess" style={{ fontSize: 14, color: '#2563eb', fontWeight: 500 }}>Take the quick assessment while you wait →</a>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div>
            {/* Quick links */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 28, marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>Not sure where to start?</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a href="/assess" style={{ display: 'block', padding: '14px 16px', borderRadius: 8, border: '1px solid #e2e8f0', textDecoration: 'none', transition: 'border-color 0.2s' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Quick Assessment</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Free, 10 questions, 3 minutes. See where you stand.</div>
                </a>
                <a href="/controls" style={{ display: 'block', padding: '14px 16px', borderRadius: 8, border: '1px solid #e2e8f0', textDecoration: 'none' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Browse Controls</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>See all 67 controls with definitions and examples.</div>
                </a>
                <a href="/documents" style={{ display: 'block', padding: '14px 16px', borderRadius: 8, border: '1px solid #e2e8f0', textDecoration: 'none' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Read the Standard</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Download or read the full standard online.</div>
                </a>
                <a href="/assess/full" style={{ display: 'block', padding: '14px 16px', borderRadius: 8, border: '1px solid #e2e8f0', textDecoration: 'none' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>View Pricing</div>
                  <div style={{ fontSize: 13, color: '#64748b' }}>Self-Assessment, Guided, and Enterprise options.</div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
