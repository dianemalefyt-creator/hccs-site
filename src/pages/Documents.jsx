import { Link } from 'react-router-dom'

const docs = [
  {
    id: 'HCCS-1.0',
    title: 'Core Standard',
    subtitle: 'HCCS-1.0',
    desc: 'The normative document. 67 controls across 7 governance domains, 5-level maturity model, tiered compliance framework, and formal references. This is what an auditor holds.',
    details: ['67 auditable controls', '7 governance domains', '5-level maturity model', 'Tiered compliance (self-attest to third-party audit)', 'PCAOB-aligned normative language (MUST/SHOULD/MAY)', 'Grounded in forensic and organizational psychology', '5 appendices including regulatory cross-reference'],
    file: '/docs/HCCS-1.0-Core-Standard.pdf',
    color: '#185FA5',
    pages: '~40',
    format: 'pdf',
  },
  {
    id: 'HCCS-IG-1.0',
    title: 'Implementation Guide',
    subtitle: 'HCCS-IG-1.0',
    desc: 'The operational companion. Translates every control into implementation requirements, scoring rubrics, audit test procedures (Inspect-Verify-Conclude), worked examples across role types, and control failure classifications.',
    details: ['Domain-by-domain implementation guidance', 'Maturity level progression criteria (L1 to L5)', '5-point anchored behavioral scoring rubric', 'Audit test procedures for every control', 'Worked examples: executive, technical, operational, hourly', 'Cognitive bias mitigation guidance', 'Assessor and auditor qualification criteria', 'Level 3 implementation playbook (12-month phased roadmap)'],
    file: '/docs/HCCS-IG-1.0-Implementation-Guide.pdf',
    color: '#0F6E56',
    pages: '~45',
    format: 'pdf',
  },
  {
    id: 'HCCS-T-1.0',
    title: 'Template Library',
    subtitle: 'HCCS-T-1.0',
    desc: '10 fillable templates that produce the evidence required for audit. Every template maps to specific control IDs and threads back through the Implementation Guide to the Core Standard.',
    details: ['T-01: Role Definition Worksheet', 'T-02: Evaluation Criteria Design', 'T-03: Candidate Evaluation Scorecard', 'T-04: Structured Debrief Record', 'T-05: Hiring Decision Rationale', 'T-06: ADT Inventory Entry', 'T-07: ADT Human Review Record', 'T-08: Process Classification Record', 'T-09: Compensable Factor Analysis', 'T-10: Maturity Self-Assessment Instrument'],
    file: '/docs/HCCS-T-1.0-Template-Library.docx',
    color: '#534AB7',
    pages: '~35',
    format: 'docx',
  },
  {
    id: 'HCCS-RD-Template',
    title: 'Role Definition Template',
    subtitle: 'Fillable Worksheet',
    desc: 'Blank v2 Role Definition Worksheet. Download, fill out offline (print or digital), then upload to the Role Design System tool to auto-populate all fields. Includes every section with guidance text.',
    details: ['Current state and role origin', 'Outcomes with baselines and targets', 'Steady state vs transformation milestones', 'Decision rights and accountability', 'Role boundaries (what is NOT owned)', 'Required vs learnable capabilities with evidence prompts', 'Team scope and composition', 'Operating environment', 'Risk and failure modes', 'Reviewer validation section'],
    file: '/docs/HCCS-Role-Definition-Template.pdf',
    color: '#993C1D',
    pages: '3',
    format: 'pdf',
  },
]

export default function Documents() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 500 }}>Document system</div>
          <h1 style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>Three documents. One standard.</h1>
          <p style={{ fontSize: 17, color: '#94a3b8', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            Persistent control IDs thread across all three documents. An auditor can trace from a template back to the implementation guidance back to the normative requirement.
          </p>
        </div>
      </section>

      {/* Document cards */}
      <section style={{ padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {docs.map((d, i) => (
            <div key={d.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 32, marginBottom: 24, borderLeft: `5px solid ${d.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: d.color, letterSpacing: '0.05em', marginBottom: 4 }}>{d.subtitle}</div>
                  <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }}>{d.title}</h2>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {d.format === 'pdf' && (
                    <a href={d.file} target="_blank" rel="noopener" style={{ background: '#fff', color: d.color, border: `2px solid ${d.color}`, padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', textDecoration: 'none' }}>
                      Read online
                    </a>
                  )}
                  <a href={d.file} download style={{ background: d.color, color: '#fff', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', textDecoration: 'none' }}>
                    Download {d.format === 'pdf' ? '.pdf' : '.docx'}
                  </a>
                </div>
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#475569', marginBottom: 20 }}>{d.desc}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 8 }}>
                {d.details.map(det => (
                  <div key={det} style={{ fontSize: 13, color: '#64748b', padding: '6px 0', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: d.color, fontWeight: 700, marginTop: 1 }}>&rarr;</span>
                    <span>{det}</span>
                  </div>
                ))}
              </div>
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
