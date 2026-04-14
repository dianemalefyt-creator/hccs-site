import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getStaticDocs, fetchDocs } from '../lib/docs'
import { EmailGate } from './Research'

export default function Documents() {
  const [docs, setDocs] = useState(getStaticDocs())
  const [gated, setGated] = useState({}) // track which docs have been unlocked

  useEffect(() => {
    fetchDocs().then(d => { if (d.length > 0) setDocs(d) }).catch(() => {})
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 500 }}>Document system</div>
          <h1 className='hero-title' style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>Three documents. One standard.</h1>
          <p style={{ fontSize: 17, color: '#94a3b8', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            Persistent control IDs thread across all three documents. An auditor can trace from a template back to the implementation guidance back to the normative requirement.
          </p>
        </div>
      </section>

      {/* Document cards */}
      <section style={{ padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {docs.map((d, i) => (
            <div key={d.docId || d.id || i} className='card-padding' style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 32, marginBottom: 24, borderLeft: `5px solid ${d.color}` }}>
              <div className='doc-card-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: d.color, letterSpacing: '0.05em', marginBottom: 4 }}>{d.subtitle}</div>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>{d.title}</h2>
                </div>
                <div className='doc-card-buttons' style={{ display: 'flex', gap: 8 }}>
                  {d.format === 'pdf' && (
                    <a href={d.file} target="_blank" rel="noopener" style={{ background: '#fff', color: d.color, border: `2px solid ${d.color}`, padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', textDecoration: 'none' }}>
                      Read online
                    </a>
                  )}
                  {(d.docId === 'HCCS-RD-Template' || d.docId === 'HCCS-RD-Template') ? (
                    <a href={d.file} download style={{ background: d.color, color: '#fff', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', textDecoration: 'none' }}>
                      Download free
                    </a>
                  ) : null}
                </div>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#475569', marginBottom: 20 }}>{d.desc}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 8 }}>
                {(Array.isArray(d.details) ? d.details : []).map(det => (
                  <div key={det} style={{ fontSize: 13, color: '#64748b', padding: '6px 0', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: d.color, fontWeight: 700, marginTop: 1 }}>&rarr;</span>
                    <span>{det}</span>
                  </div>
                ))}
              </div>
              {d.docId !== 'HCCS-RD-Template' && (
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: 13, color: '#64748b', marginBottom: 10 }}>Enter your email to download this document:</div>
                  <EmailGate docName={d.title} docUrl={d.file} color={d.color} />
                </div>
              )}
            </div>
          ))}

          {/* How they connect */}
          <div style={{ background: '#0f172a', borderRadius: 14, padding: 32, marginTop: 40, textAlign: 'center' }}>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 12 }}>How they connect</h3>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              {['Core Standard', '→', 'Implementation Guide', '→', 'Template Library'].map((t, i) => (
                i % 2 === 1
                  ? <span key={i} style={{ color: '#5b9bd5', fontSize: 20 }}>{t}</span>
                  : <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '12px 24px' }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#cbd5e1' }}>{t}</span>
                    </div>
              ))}
            </div>
            <p style={{ fontSize: 14, color: '#64748b', marginTop: 16 }}>
              Control ID HCCS-RG-001 appears in the standard (requirement), the guide (how to implement and audit), and the template (the form you fill in).
            </p>
            <Link to="/templates" style={{ display: 'inline-block', marginTop: 20, background: '#2563eb', color: '#fff', padding: '12px 28px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Fill templates online →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
