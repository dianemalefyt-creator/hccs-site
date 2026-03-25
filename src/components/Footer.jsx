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
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#5b9bd5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Tools</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/assess" style={{ fontSize: 14, color: '#94a3b8' }}>Maturity Assessment</Link>
            <Link to="/documents" style={{ fontSize: 14, color: '#94a3b8' }}>Gap Analysis</Link>
            <Link to="/documents" style={{ fontSize: 14, color: '#94a3b8' }}>Remediation Roadmap</Link>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#5b9bd5', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Connect</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Link to="/about" style={{ fontSize: 14, color: '#94a3b8' }}>About HCCS™</Link>
            <a href="https://www.linkedin.com/in/dianemalefyt/" target="_blank" rel="noopener" style={{ fontSize: 14, color: '#94a3b8' }}>LinkedIn</a>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: '40px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: '#475569' }}>&copy; 2026 Diane Malefyt. All rights reserved.</span>
        <span style={{ fontSize: 13, color: '#475569' }}>HCCS-1.0 | hccsstandard.com</span>
      </div>
    </footer>
  )
}
