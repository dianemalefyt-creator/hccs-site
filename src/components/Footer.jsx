import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [subEmail, setSubEmail] = useState('')
  const [subDone, setSubDone] = useState(false)
  const subscribe = async () => {
    if (!subEmail || !subEmail.includes('@')) return
    try {
      await fetch('/.netlify/functions/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Subscriber', email: subEmail, org: '', interest: 'Subscribe: All updates', message: 'Footer subscribe' }),
      })
    } catch {}
    setSubDone(true)
  }
  return (
    <footer aria-label="Site footer" style={{ background: '#0a1628', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '48px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 12 }}><span style={{ color: '#fff' }}>HCCS</span> <span style={{ color: '#5b9bd5' }}>Standard</span><span style={{ fontSize: 10, position: 'relative', top: -8, color: '#5b9bd5' }}>™</span></div>
          <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6, maxWidth: 320 }}>
            The Human Capital Control Standard™. A governance and assurance framework for consequential decisions shaped by technology.
          </p>
          <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 16 }}>
            Aligned to SOX, NIST AI RMF, and ISO governance standards.
          </p>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#5b9bd5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Standard</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/documents" style={{ fontSize: 14, color: '#94a3b8' }}>Documents</Link>
            <Link to="/controls" style={{ fontSize: 14, color: '#94a3b8' }}>Controls Library</Link>
            <Link to="/templates" style={{ fontSize: 14, color: '#94a3b8' }}>Templates</Link>
            <Link to="/assess" style={{ fontSize: 14, color: '#94a3b8' }}>Assessment</Link>
            <Link to="/tools" style={{ fontSize: 14, color: '#94a3b8' }}>Tools</Link>
            <Link to="/pricing" style={{ fontSize: 14, color: '#94a3b8' }}>Pricing</Link>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#5b9bd5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Domains</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/domains/employment" style={{ fontSize: 14, color: '#94a3b8' }}>Employment</Link>
            <Link to="/domains/healthcare" style={{ fontSize: 14, color: '#94a3b8' }}>Healthcare</Link>
            <Link to="/domains/financial-services" style={{ fontSize: 14, color: '#94a3b8' }}>Financial Services</Link>
            <Link to="/domains/criminal-justice" style={{ fontSize: 14, color: '#94a3b8' }}>Criminal Justice</Link>
            <Link to="/domains/education" style={{ fontSize: 14, color: '#94a3b8' }}>Education</Link>
            <Link to="/domains/insurance" style={{ fontSize: 14, color: '#94a3b8' }}>Insurance</Link>
            <Link to="/domains/social-services" style={{ fontSize: 14, color: '#94a3b8' }}>Social Services</Link>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#5b9bd5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Connect</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/about" style={{ fontSize: 14, color: '#94a3b8' }}>About HCCS™</Link>
            <Link to="/research" style={{ fontSize: 14, color: '#94a3b8' }}>Research</Link>
            <Link to="/contact" style={{ fontSize: 14, color: '#94a3b8' }}>Contact</Link>
            <Link to="/rights" style={{ fontSize: 14, color: '#94a3b8' }}>Applicant's Bill of Rights</Link>
            <Link to="/org-rights" style={{ fontSize: 14, color: '#94a3b8' }}>Organization's Bill of Rights</Link>
            <Link to="/blog" style={{ fontSize: 14, color: '#94a3b8' }}>Blog</Link>
            <a href="mailto:info@hccsstandard.com" style={{ fontSize: 14, color: '#94a3b8' }}>info@hccsstandard.com</a>
            <a href="https://www.linkedin.com/in/dianemalefyt/" target="_blank" rel="noopener" style={{ fontSize: 14, color: '#94a3b8' }}>LinkedIn</a>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: '32px auto 0', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 4 }}>Stay informed</div>
            <div style={{ fontSize: 13, color: '#94a3b8' }}>Research updates, new domains, and governance insights. No spam.</div>
          </div>
          {subDone ? (
            <div style={{ fontSize: 14, color: '#059669', fontWeight: 600 }}>Subscribed!</div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="email" value={subEmail} onChange={e => setSubEmail(e.target.value)} placeholder="your@email.com" aria-label="Subscribe email"
                onKeyDown={e => e.key === 'Enter' && subscribe()}
                style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 14, outline: 'none', minWidth: 220 }} />
              <button onClick={subscribe}
                style={{ background: '#2563eb', color: '#fff', padding: '10px 20px', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>
      <div className='footer-bottom' style={{ maxWidth: 1100, margin: '24px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/ingenuityco-logo.jpg" alt="IngenuityCo" style={{ height: 28, borderRadius: 4 }} />
          <span style={{ fontSize: 13, color: '#475569' }}>&copy; 2026 IngenuityCo LLC. All rights reserved.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/privacy" style={{ fontSize: 13, color: '#94a3b8' }}>Privacy Policy</Link>
          <Link to="/terms" style={{ fontSize: 13, color: '#94a3b8' }}>Terms of Use</Link>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>HCCS-2.0</span>
        </div>
      </div>
    </footer>
  )
}
