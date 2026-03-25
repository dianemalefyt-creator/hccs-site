import { Link } from 'react-router-dom'

const S = {
  hero: { minHeight: '85vh', background: 'linear-gradient(165deg, #0a1628 0%, #1a2d4a 40%, #0f3460 100%)', color: '#e2e8f0', display: 'flex', alignItems: 'center' },
  wrap: { maxWidth: 1100, margin: '0 auto', padding: '0 24px', width: '100%' },
  section: { padding: '80px 24px' },
  sectionDark: { padding: '80px 24px', background: '#0f172a', color: '#e2e8f0' },
}

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section style={S.hero}>
        <div style={S.wrap}>
          <div style={{ maxWidth: 640 }}>
            <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 20, fontWeight: 500 }}>Human Capital Control Standard™</div>
            <h1 style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.12, margin: '0 0 24px', color: '#fff' }}>
              Human capital decisions are not discretionary activities.
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.65, color: '#94a3b8', margin: '0 0 16px' }}>
              They are controlled processes subject to audit.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: '#64748b', margin: '0 0 40px', maxWidth: 520 }}>
              HCCS™ is the first governance and audit standard for how companies define roles, evaluate candidates, make hiring decisions, and align compensation to the actual scope of work.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 520 }}>
              <Link to="/assess" style={{ background: '#2563eb', color: '#fff', padding: '14px 24px', borderRadius: 8, fontSize: 15, fontWeight: 600, textAlign: 'center', textDecoration: 'none' }}>
                Assess your organization
              </Link>
              <Link to="/documents" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '14px 24px', borderRadius: 8, fontSize: 15, fontWeight: 500, textAlign: 'center', textDecoration: 'none' }}>
                Read the standard
              </Link>
              <Link to="/rights" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '14px 24px', borderRadius: 8, fontSize: 15, fontWeight: 500, textAlign: 'center', textDecoration: 'none' }}>
                Applicant's Bill of Rights
              </Link>
              <Link to="/org-rights" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '14px 24px', borderRadius: 8, fontSize: 15, fontWeight: 500, textAlign: 'center', textDecoration: 'none' }}>
                Organization's Bill of Rights
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '40px 24px' }}>
        <div style={{ ...S.wrap, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
          {[['67', 'Auditable controls'], ['7', 'Governance domains'], ['5', 'Maturity levels'], ['3', 'Document system']].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontSize: 40, fontWeight: 700, color: '#1e3a5f' }}>{n}</div>
              <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section style={{ ...S.section, background: '#f8fafc' }}>
        <div style={S.wrap}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 16, fontWeight: 600 }}>The problem</div>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', lineHeight: 1.25, marginBottom: 24 }}>
              Organizations have financial controls. They do not have equivalent controls for human capital decisions.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 16 }}>
              Most companies treat hiring as a workflow rather than a decision system. Roles are poorly defined. Candidates are filtered through weak proxies. Hiring managers apply subjective judgment shaped by bias. AI is being layered onto these flawed processes, increasing speed without improving integrity.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 16 }}>
              These decisions represent one of the largest ungoverned risk surfaces in the enterprise.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569' }}>
              The result is not simply inefficiency. It is a unified decision system, one that governs who enters the organization, how they are evaluated, how they are selected, and how they are paid, operating without formal governance, auditability, or enforceable controls.
            </p>
          </div>
        </div>
      </section>

      {/* Domains */}
      <section style={S.section}>
        <div style={S.wrap}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 16, fontWeight: 600 }}>7 control domains</div>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0f172a' }}>Complete coverage. No gaps.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {[
              { code: 'RG', name: 'Role Governance', desc: 'Outcome-based role definitions with decision rights, scope indicators, and capability distinctions.', color: '#185FA5' },
              { code: 'EI', name: 'Evaluation Integrity', desc: 'Structured, capability-based assessment with construct validity, calibration, and cognitive load controls.', color: '#0F6E56' },
              { code: 'DG', name: 'Decision Governance', desc: 'Documented, criteria-referenced decisions with bias detection and post-decision rationalization controls.', color: '#534AB7' },
              { code: 'AG', name: 'AI Governance', desc: 'ADT inventory, human-in-the-loop with override authority, explainability, and disparate impact testing.', color: '#993C1D' },
              { code: 'PI', name: 'Process Integrity', desc: 'Genuinely open processes, internal-preference transparency, procedural justice, and candidate communication.', color: '#854F0B' },
              { code: 'CG', name: 'Compensation Governance', desc: 'Compensable factor analysis replacing title-based pay. Five factors, documented rationale, pay equity.', color: '#3B6D11' },
              { code: 'ER', name: 'Evidence & Records', desc: 'Contemporaneous records, 3-year retention, classification, access controls, and audit producibility.', color: '#993556' },
            ].map(d => (
              <div key={d.code} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, borderLeft: `4px solid ${d.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 6, background: d.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13 }}>{d.code}</div>
                  <span style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>{d.name}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b', margin: 0 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Maturity model */}
      <section style={S.sectionDark}>
        <div style={S.wrap}>
          <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center', marginBottom: 48 }}>
            <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 600 }}>Maturity model</div>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Five levels. One credibility threshold.</h2>
            <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.6 }}>Level 3 is the minimum for external credibility and the minimum required for organizations making public claims of fair, unbiased, or AI-governed hiring practices.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { l: 5, n: 'Optimizing', c: '67 controls', t: 'Audited', col: '#993C1D' },
              { l: 4, n: 'Managed', c: '60 controls', t: 'Audited', col: '#534AB7' },
              { l: 3, n: 'Defined', c: '48 controls', t: 'Validated', col: '#0F6E56', threshold: true },
              { l: 2, n: 'Developing', c: '25 controls', t: 'Self-Attest', col: '#185FA5' },
              { l: 1, n: 'Initial', c: '12 controls', t: 'Self-Attest', col: '#888780' },
            ].map(lv => (
              <div key={lv.l} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', borderRadius: 10, background: `${lv.col}15`, border: lv.threshold ? `2px solid ${lv.col}` : '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: lv.col, minWidth: 40 }}>L{lv.l}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{lv.n}</div>
                  <div style={{ fontSize: 13, color: '#94a3b8' }}>{lv.c} (cumulative)</div>
                </div>
                <div style={{ fontSize: 13, color: '#64748b' }}>{lv.t}</div>
                {lv.threshold && <div style={{ fontSize: 12, fontWeight: 600, color: '#22c55e', background: '#22c55e15', padding: '4px 12px', borderRadius: 12 }}>Credibility threshold</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Science */}
      <section style={{ ...S.section, background: '#f8fafc' }}>
        <div style={S.wrap}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 16, fontWeight: 600 }}>Empirical foundation</div>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', lineHeight: 1.25, marginBottom: 24 }}>
              Grounded in 60+ years of forensic and organizational psychology
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 24 }}>
              HCCS™ is not opinion-based. It is grounded in replicated research demonstrating that structured, actuarial methods consistently outperform clinical judgment in personnel selection, risk assessment, and classification decisions.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                ['Actuarial > Clinical', 'Structured methods outperform intuitive judgment in every meta-analysis conducted (Meehl, 1954; Grove et al., 2000; Kuncel et al., 2013).'],
                ['Cognitive Bias Taxonomy', 'Named biases monitored: anchoring, confirmation, halo/horn, affinity, contrast, primacy/recency.'],
                ['Procedural Justice', 'Process Integrity controls operationalize Leventhal\'s six criteria for fair processes.'],
                ['Signal Detection', 'Evaluation framed as classification: maximize correct selections, minimize false rejections and false advances.'],
              ].map(([title, desc]) => (
                <div key={title} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>{title}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b', margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Governing principle */}
      <section style={{ background: '#0f172a', padding: '60px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 22, color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
            "If the organization cannot reconstruct how a decision was made, what evidence it relied on, and whether standards were applied consistently, the process must be treated as unreliable."
          </p>
          <p style={{ fontSize: 14, color: '#475569', marginTop: 16 }}>HCCS-1.0, Governing Principle</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...S.section, textAlign: 'center' }}>
        <div style={S.wrap}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Is your hiring process audit-ready?</h2>
          <p style={{ fontSize: 17, color: '#64748b', marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
            The HCCS™ Maturity Assessment scores your organization across all 67 controls, identifies gaps, and generates a remediation roadmap. Takes 10-15 minutes.
          </p>
          <Link to="/assess" style={{ background: '#2563eb', color: '#fff', padding: '16px 40px', borderRadius: 8, fontSize: 16, fontWeight: 600, display: 'inline-block' }}>
            Start your assessment
          </Link>
          <div style={{ marginTop: 16, display: 'flex', gap: 20, justifyContent: 'center' }}>
            <Link to="/rights" style={{ fontSize: 14, color: '#2563eb', fontWeight: 500 }}>Applicant's Bill of Rights →</Link>
            <Link to="/org-rights" style={{ fontSize: 14, color: '#2563eb', fontWeight: 500 }}>Organization's Bill of Rights →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
