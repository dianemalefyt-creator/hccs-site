import { useState } from 'react'
import { DOMAINS } from '../data/controls'

const DOMAIN_META = {
  RG: { icon: '◈', purpose: 'Ensures roles are defined by outcomes, not tasks, with clear decision rights and scope before any candidate is evaluated.' },
  EI: { icon: '◉', purpose: 'Ensures every candidate is assessed with the same structured, capability-based methods grounded in construct validity.' },
  DG: { icon: '⬡', purpose: 'Ensures every hiring decision is documented, criteria-referenced, contemporaneous, and free from detectable bias patterns.' },
  AG: { icon: '⬢', purpose: 'Ensures every automated tool in the hiring pipeline is inventoried, explainable, bias-tested, and human-supervised.' },
  PI: { icon: '◇', purpose: 'Ensures hiring processes are genuinely open, consistently applied, and transparent to candidates regardless of source.' },
  CG: { icon: '⊞', purpose: 'Ensures compensation is derived from compensable factors tied to role scope, not titles, history, or negotiation leverage.' },
  ER: { icon: '▣', purpose: 'Ensures every control-relevant decision produces contemporaneous, classified, retrievable, and tamper-resistant evidence.' },
}

const LEVEL_COLORS = { MUST: '#dc2626', SHOULD: '#d97706', MAY: '#059669' }
const LEVEL_BG = { MUST: '#fef2f2', SHOULD: '#fefce8', MAY: '#f0fdf4' }
const LEVEL_BORDER = { MUST: '#fecaca', SHOULD: '#fde68a', MAY: '#bbf7d0' }
const TIER_DESC = { 1: 'L1+ (Foundation)', 2: 'L2+ (Developing)', 3: 'L3+ (Defined)', 4: 'L4+ (Managed)', 5: 'L5 (Optimizing)' }

export default function Controls() {
  const [activeDomain, setActiveDomain] = useState(null)
  const [expandedControl, setExpandedControl] = useState(null)

  const totalControls = DOMAINS.reduce((s, d) => s + d.controls.length, 0)
  const mustCount = DOMAINS.reduce((s, d) => s + d.controls.filter(c => c.level === 'MUST').length, 0)
  const shouldCount = DOMAINS.reduce((s, d) => s + d.controls.filter(c => c.level === 'SHOULD').length, 0)
  const mayCount = DOMAINS.reduce((s, d) => s + d.controls.filter(c => c.level === 'MAY').length, 0)

  const filtered = activeDomain ? DOMAINS.filter(d => d.code === activeDomain) : DOMAINS

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(165deg, #0a1628 0%, #1a2d4a 40%, #0f3460 100%)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 500 }}>Control Library</div>
          <h1 style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>What HCCS™ Tests For</h1>
          <p style={{ fontSize: 17, color: '#94a3b8', maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.6 }}>
            {totalControls} auditable controls across 7 governance domains. Each control defines a specific requirement, what "in place" looks like, and how to remediate if it's not.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 8 }}>
            {[
              [mustCount, 'MUST', '#dc2626', 'Required for any maturity claim'],
              [shouldCount, 'SHOULD', '#d97706', 'Required at Level 3+'],
              [mayCount, 'MAY', '#059669', 'Required at Level 4-5'],
            ].map(([n, label, color, desc]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, fontWeight: 700, color }}>{n}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color, letterSpacing: '0.05em' }}>{label}</div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Domain filter */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', position: 'sticky', top: 64, zIndex: 10 }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => setActiveDomain(null)}
            style={{ padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
              background: !activeDomain ? '#0f172a' : '#f8fafc', color: !activeDomain ? '#fff' : '#64748b',
              border: !activeDomain ? '1px solid #0f172a' : '1px solid #e2e8f0' }}>
            All {totalControls}
          </button>
          {DOMAINS.map(d => (
            <button key={d.code} onClick={() => setActiveDomain(activeDomain === d.code ? null : d.code)}
              style={{ padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                background: activeDomain === d.code ? d.color : '#f8fafc', color: activeDomain === d.code ? '#fff' : '#64748b',
                border: activeDomain === d.code ? `1px solid ${d.color}` : '1px solid #e2e8f0' }}>
              {d.code} ({d.controls.length})
            </button>
          ))}
        </div>
      </section>

      {/* Controls */}
      <section style={{ padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          {filtered.map(d => {
            const meta = DOMAIN_META[d.code]
            return (
              <div key={d.code} style={{ marginBottom: 48 }}>
                {/* Domain header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: d.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 24, flexShrink: 0 }}>{meta.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: d.color, letterSpacing: '0.05em' }}>{d.code}</span>
                      <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>{d.name}</h2>
                    </div>
                    <p style={{ fontSize: 15, color: '#64748b', margin: 0, lineHeight: 1.5 }}>{meta.purpose}</p>
                    <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                      {['MUST', 'SHOULD', 'MAY'].map(lv => {
                        const count = d.controls.filter(c => c.level === lv).length
                        if (!count) return null
                        return <span key={lv} style={{ fontSize: 12, fontWeight: 600, color: LEVEL_COLORS[lv] }}>{count} {lv}</span>
                      })}
                    </div>
                  </div>
                </div>

                {/* Controls grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(460px, 1fr))', gap: 12, alignItems: 'start' }}>
                  {d.controls.map(c => {
                    const isExpanded = expandedControl === c.id
                    return (
                      <div key={c.id}
                        style={{ background: '#fff', border: `1px solid ${isExpanded ? d.color : '#e2e8f0'}`, borderRadius: 10, padding: '16px 20px', cursor: 'pointer', transition: 'all 0.2s',
                          borderLeft: `4px solid ${LEVEL_COLORS[c.level]}` }}
                        onClick={() => setExpandedControl(isExpanded ? null : c.id)}>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, color: '#94a3b8' }}>{c.id}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 3, background: LEVEL_BG[c.level], color: LEVEL_COLORS[c.level], border: `1px solid ${LEVEL_BORDER[c.level]}` }}>{c.level}</span>
                          <span style={{ fontSize: 10, color: '#94a3b8' }}>{TIER_DESC[c.tier]}</span>
                        </div>

                        <div style={{ fontSize: 14, fontWeight: 600, color: '#1e293b', lineHeight: 1.45, marginBottom: isExpanded ? 12 : 0 }}>{c.text}</div>

                        {isExpanded && (
                          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 12, marginTop: 4 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>What this tests</div>
                            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: '0 0 12px' }}>{c.definition}</p>

                            <div style={{ fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>What "in place" looks like</div>
                            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: '0 0 12px' }}>{c.example}</p>

                            <div style={{ fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>How to remediate</div>
                            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, margin: 0 }}>{c.remediation}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Visual summary */}
      <section style={{ background: '#0f172a', padding: '60px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 32 }}>Control Distribution</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12 }}>
            {DOMAINS.map(d => {
              const must = d.controls.filter(c => c.level === 'MUST').length
              const should = d.controls.filter(c => c.level === 'SHOULD').length
              const may = d.controls.filter(c => c.level === 'MAY').length
              const total = d.controls.length
              const maxH = 180
              return (
                <div key={d.code} style={{ textAlign: 'center' }}>
                  <div style={{ height: maxH, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', gap: 2, marginBottom: 8 }}>
                    {may > 0 && <div style={{ width: '100%', height: (may / total) * maxH, background: '#059669', borderRadius: '4px 4px 0 0', opacity: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 600 }}>{may}</div>}
                    {should > 0 && <div style={{ width: '100%', height: (should / total) * maxH, background: '#d97706', opacity: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 600 }}>{should}</div>}
                    {must > 0 && <div style={{ width: '100%', height: (must / total) * maxH, background: '#dc2626', borderRadius: '0 0 4px 4px', opacity: 0.8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff', fontWeight: 600 }}>{must}</div>}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: d.color }}>{d.code}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{total} controls</div>
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 24 }}>
            {[['MUST', '#dc2626'], ['SHOULD', '#d97706'], ['MAY', '#059669']].map(([label, color]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 12, height: 12, borderRadius: 2, background: color, opacity: 0.8 }} />
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Ready to see where you stand?</h2>
          <p style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.6 }}>The HCCS™ Quick Assessment tests the 10 most critical controls in 3 minutes. Free, no login required.</p>
          <a href="/assess" style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '14px 32px', borderRadius: 8, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>Take the quick assessment</a>
        </div>
      </section>
    </div>
  )
}
