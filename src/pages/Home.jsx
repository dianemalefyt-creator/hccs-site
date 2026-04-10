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
      <section className='page-hero' style={S.hero}>
        <div style={S.wrap}>
          <div style={{ maxWidth: 600 }}>
            <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 20, fontWeight: 500 }}>Human Capital Control Standard™ (HCCS™)</div>
            <h1 className='hero-title' style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.18, margin: '0 0 24px', color: '#fff' }}>
              A governance and audit standard for human capital decisions.
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#cbd5e1', margin: '0 0 16px', maxWidth: 540 }}>
              HCCS™ establishes the control framework for how organizations define roles, evaluate candidates, make hiring decisions, and align compensation to the actual scope of work.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#94a3b8', margin: '0 0 16px', maxWidth: 540 }}>
              Human capital decisions directly impact financial performance, legal exposure, operational consistency, and organizational trust. Despite this, most organizations operate without consistent controls, documentation standards, or auditability across hiring processes.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#94a3b8', margin: '0 0 40px', maxWidth: 540 }}>
              The introduction of AI into hiring workflows increases both scale and risk, making governance requirements more critical, not less.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', maxWidth: 540 }}>
              <Link to="/assess" style={{ background: '#2563eb', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textAlign: 'center', textDecoration: 'none' }}>
                Assess your organization
              </Link>
              <Link to="/documents" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '14px 24px', borderRadius: 8, fontSize: 15, fontWeight: 500, textAlign: 'center', textDecoration: 'none' }}>
                Read the standard
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
              <Link to="/rights" style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'none' }}>Applicant's Bill of Rights →</Link>
              <Link to="/org-rights" style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'none' }}>Organization's Bill of Rights →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '40px 24px' }}>
        <div className='grid-4' style={{ ...S.wrap, textAlign: 'center' }}>
          {[['67', 'Auditable controls'], ['7', 'Governance domains'], ['5', 'Maturity levels'], ['3', 'Document system']].map(([n, l]) => (
            <div key={l}>
              <div className='stat-number' style={{ fontSize: 40, fontWeight: 700, color: '#1e3a5f' }}>{n}</div>
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
            <h2 className='section-title' style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', lineHeight: 1.25, marginBottom: 24 }}>
              Organizations maintain financial controls. Equivalent controls do not exist for human capital decisions.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 20 }}>
              Human capital decisions determine who enters the organization, how they are evaluated, how they are selected, and how they are compensated. These decisions directly impact financial performance, legal exposure, operational consistency, and organizational trust.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 16 }}>
              Despite this, most organizations operate without:
            </p>
            <div style={{ paddingLeft: 20, marginBottom: 20, borderLeft: '3px solid #2563eb' }}>
              {['Consistent role definition standards', 'Governed evaluation criteria', 'Documented decision frameworks', 'Alignment between role scope and compensation', 'Auditability across hiring processes'].map(item => (
                <div key={item} style={{ fontSize: 16, color: '#334155', marginBottom: 8, lineHeight: 1.5 }}>{item}</div>
              ))}
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 16 }}>
              Hiring is commonly treated as a workflow rather than a controlled decision system. As a result, subjective judgment, inconsistent criteria, and weak proxies drive outcomes.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 16 }}>
              The introduction of AI into these workflows increases speed and scale, but does not correct underlying control deficiencies.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#0f172a', fontWeight: 600, marginBottom: 16 }}>
              Human capital decisions represent a material, ungoverned risk surface within the enterprise.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569' }}>
              These decisions function as a unified system governing workforce composition, evaluation, selection, and compensation, yet operate without formal governance, enforceable controls, or audit standards. This gap creates exposure that is often unmeasured, inconsistently managed, and difficult to defend under audit or legal scrutiny.
            </p>
          </div>
        </div>
      </section>

            {/* Domains */}
      <section style={S.section}>
        <div style={S.wrap}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 16, fontWeight: 600 }}>7 control domains</div>
            <h2 className='section-title' style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Complete coverage. No control gaps.</h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>HCCS™ defines seven control domains that collectively govern the full lifecycle of human capital decisions.</p>
          </div>
          <div className='grid-cards' style={{ marginTop: 32 }}>
            {[
              { code: 'RG', name: 'Role Governance', desc: 'Outcome-based role definitions with defined decision rights, scope boundaries, and capability requirements.', color: '#185FA5' },
              { code: 'EI', name: 'Evaluation Integrity', desc: 'Structured, capability-based assessment with validated constructs, calibration standards, and cognitive load controls.', color: '#0F6E56' },
              { code: 'DG', name: 'Decision Governance', desc: 'Documented, criteria-referenced decisions with bias detection, approval controls, and post-decision review requirements.', color: '#534AB7' },
              { code: 'AG', name: 'AI Governance', desc: 'Inventory and classification of AI decision tools, human-in-the-loop authority, explainability requirements, and disparate impact monitoring.', color: '#993C1D' },
              { code: 'PI', name: 'Process Integrity', desc: 'Transparent, consistently applied processes with procedural justice standards, internal preference controls, and candidate communication requirements.', color: '#854F0B' },
              { code: 'CG', name: 'Compensation Governance', desc: 'Compensation aligned to defined role scope using structured factor analysis, documented rationale, and pay equity controls.', color: '#3B6D11' },
              { code: 'ER', name: 'Evidence & Records', desc: 'Contemporaneous records, defined retention periods, classification standards, access controls, and audit reproducibility.', color: '#993556' },
            ].map(d => (
              <div key={d.code} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, borderLeft: `4px solid ${d.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: d.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>{d.code}</div>
                  <div style={{ fontSize: 17, fontWeight: 600, color: '#0f172a' }}>{d.name}</div>
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
            <h2 className='section-title' style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 16 }}>Five levels. One credibility threshold.</h2>
            <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.6 }}>HCCS™ defines five levels of control maturity. Level 3 represents the minimum standard for external credibility and is required for organizations making claims of fair, unbiased, or AI-governed hiring practices.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { l: 5, n: 'Optimizing', d: 'All controls implemented, continuously improved, independently audited.', c: '67 controls', t: 'Audited', col: '#993C1D' },
              { l: 4, n: 'Managed', d: 'Controls consistently applied, measured, and subject to internal audit.', c: '60 controls', t: 'Audited', col: '#534AB7' },
              { l: 3, n: 'Defined', d: 'Controls formally established, documented, and validated. Minimum threshold for external credibility.', c: '48 controls', t: 'Validated', col: '#0F6E56', threshold: true },
              { l: 2, n: 'Developing', d: 'Controls partially implemented, inconsistently applied, self-attested.', c: '25 controls', t: 'Self-Attest', col: '#185FA5' },
              { l: 1, n: 'Initial', d: 'Ad hoc practices, limited controls, no formal governance structure.', c: '12 controls', t: 'Self-Attest', col: '#888780' },
            ].map(lv => (
              <div key={lv.l} className='maturity-row' style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 24px', borderRadius: 10, background: `${lv.col}15`, border: lv.threshold ? `2px solid ${lv.col}` : '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: lv.col, minWidth: 40 }}>L{lv.l}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{lv.n}</div>
                  <div style={{ fontSize: 13, color: '#94a3b8' }}>{lv.d}</div>
                </div>
                <div className='maturity-meta' style={{ fontSize: 12, color: '#94a3b8', textAlign: 'right', minWidth: 80 }}>{lv.c}<br/><span style={{ color: '#94a3b8' }}>{lv.t}</span></div>
                {lv.threshold && <div style={{ fontSize: 12, fontWeight: 600, color: '#22c55e', background: '#22c55e15', padding: '4px 12px', borderRadius: 12, whiteSpace: 'nowrap' }}>Credibility threshold</div>}
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
            <h2 className='section-title' style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', lineHeight: 1.25, marginBottom: 24 }}>
              Grounded in decades of forensic and organizational psychology
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 24 }}>
              HCCS™ is not opinion-based. It is grounded in replicated research demonstrating that structured, actuarial methods consistently outperform unstructured judgment in personnel selection, risk assessment, and classification decisions.
            </p>
            <div className='grid-science'>
              {[
                ['Actuarial > Clinical', 'Structured methods outperform intuitive judgment across decades of meta-analytic research (Meehl, Grove, Kuncel, and others).'],
                ['Cognitive Bias Taxonomy', 'Controls address known bias patterns, including anchoring, confirmation bias, halo/horn effects, affinity bias, contrast effects, and recency/primacy distortions.'],
                ['Procedural Justice', 'Process integrity controls align with established fairness frameworks, ensuring consistency, transparency, and defensibility.'],
                ['Signal Detection', 'Evaluation is structured as a classification problem: maximizing correct selections while minimizing false rejections and false advancements.'],
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

      {/* Research finding */}
      <section style={{ background: '#fff', padding: '72px 24px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#993C1D', marginBottom: 16, fontWeight: 600 }}>Original research</div>
          <h2 className='section-title' style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', lineHeight: 1.25, marginBottom: 24 }}>
            You cannot fix trust with a design change.
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 20 }}>
            HCCS™ is backed by original empirical research on how humans form trust in AI decision systems. A 2026 study with 95 participants across three experimental conditions found that recommendation framing, including agency-supportive design, produced no statistically significant change in trust in an AI tool, F(2, 92) = 0.50, p = .610. Pre-existing individual characteristics explained 68.5% of the variance. The experimental manipulation explained essentially nothing.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 24 }}>
            The deeper finding: trust in AI is not a single score. It is a profile. Four profiles emerged (blind trusters, conflicted, ambivalent, and skeptical) and they carry completely different implications for decision quality and organizational risk. A composite trust score of 48 looks identical whether someone is genuinely calibrated or deferring entirely.
          </p>
          <div className='grid-science' style={{ marginBottom: 32 }}>
            {[
              ['Blind trust is measurable', 'Organizations can identify workforce trust profiles before deployment, and before a liability event.'],
              ['Nominal oversight is documentable', 'The research distinguishes substantive from nominal human review. Courts will too.'],
              ['Design cannot manufacture trust', 'Warranted trust is built through demonstrated accuracy and accountable governance. Not UX.'],
              ['Accountability attaches to deployment', 'The organization that deployed the AI owns the outcomes. Governance is the only durable defense.'],
            ].map(([title, desc]) => (
              <div key={title} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
          <Link to="/research" style={{ display: 'inline-block', background: '#0f172a', color: '#fff', padding: '13px 28px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            Read the research findings →
          </Link>
        </div>
      </section>

      {/* Governing principle */}
      <section style={{ background: '#0f172a', padding: '60px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <p className='quote-text' style={{ fontSize: 22, color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
            "If an organization cannot reconstruct how a decision was made, what evidence was used, and whether standards were applied consistently, the process must be treated as unreliable."
          </p>
          <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 16, fontWeight: 600 }}>HCCS™ Governing Principle 1.0</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...S.section, textAlign: 'center' }}>
        <div style={S.wrap}>
          <h2 className='section-title' style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Is your hiring process audit-ready?</h2>
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
