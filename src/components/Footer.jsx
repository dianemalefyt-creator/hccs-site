import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#0a1628', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '48px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 12 }}><span style={{ color: '#fff' }}>HCCS</span> <span style={{ color: '#5b9bd5' }}>Standard</span><span style={{ fontSize: 10, position: 'relative', top: -8, color: '#5b9bd5' }}>™</span></div>
          <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, maxWidth: 320 }}>
            The Human Capital Control Standard™. A governance and audit framework for human capital decisions.
          </p>
          <p style={{ fontSize: 13, color: '#475569', marginTop: 16 }}>
            Aligned to SOX, NIST AI RMF, and ISO governance standards.
          </p>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#5b9bd5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Standard</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/documents" style={{ fontSize: 14, color: '#94a3b8' }}>Core Standard</Link>
            <Link to="/documents" style={{ fontSize: 14, color: '#94a3b8' }}>Implementation Guide</Link>
            <Link to="/documents" style={{ fontSize: 14, color: '#94a3b8' }}>Template Library</Link>
            <Link to="/templates" style={{ fontSize: 14, color: '#94a3b8' }}>Fillable Templates</Link>
            <Link to="/controls" style={{ fontSize: 14, color: '#94a3b8' }}>Controls Library</Link>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#5b9bd5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Tools</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/assess" style={{ fontSize: 14, color: '#94a3b8' }}>Quick Assessment</Link>
            <Link to="/assess/full" style={{ fontSize: 14, color: '#94a3b8' }}>Full Assessment</Link>
            <Link to="/tools" style={{ fontSize: 14, color: '#94a3b8' }}>Tools</Link>
            <Link to="/workflow" style={{ fontSize: 14, color: '#94a3b8' }}>Guided Workflow</Link>
            <Link to="/business-case" style={{ fontSize: 14, color: '#94a3b8' }}>Business Case &amp; ROI</Link>
            <Link to="/pricing" style={{ fontSize: 14, color: '#94a3b8' }}>Pricing</Link>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#5b9bd5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Connect</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/about" style={{ fontSize: 14, color: '#94a3b8' }}>About HCCS™</Link>
            <Link to="/contact" style={{ fontSize: 14, color: '#94a3b8' }}>Contact</Link>
            <Link to="/rights" style={{ fontSize: 14, color: '#94a3b8' }}>Applicant's Bill of Rights</Link>
            <Link to="/org-rights" style={{ fontSize: 14, color: '#94a3b8' }}>Organization's Bill of Rights</Link>
            <Link to="/blog" style={{ fontSize: 14, color: '#94a3b8' }}>Blog</Link>
            <a href="https://www.linkedin.com/in/dianemalefyt/" target="_blank" rel="noopener" style={{ fontSize: 14, color: '#94a3b8' }}>LinkedIn</a>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: '40px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/ingenuityco-logo.jpg" alt="IngenuityCo" style={{ height: 28, borderRadius: 4 }} />
          <span style={{ fontSize: 13, color: '#475569' }}>&copy; 2026 IngenuityCo LLC. All rights reserved.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link to="/privacy" style={{ fontSize: 13, color: '#475569' }}>Privacy Policy</Link>
          <Link to="/terms" style={{ fontSize: 13, color: '#475569' }}>Terms of Use</Link>
          <span style={{ fontSize: 13, color: '#475569' }}>HCCS-1.0</span>
        </div>
      </div>
    </footer>
  )
}
