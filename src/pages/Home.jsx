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
          <div style={{ maxWidth: 620 }}>
            <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 20, fontWeight: 500 }}>Human Capital Control Standard™ (HCCS™)</div>
            <h1 className='hero-title' style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.18, margin: '0 0 24px', color: '#fff' }}>
              A governance and assurance standard for consequential human decisions.
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#cbd5e1', margin: '0 0 16px', maxWidth: 560 }}>
              HCCS™ is a governance and assurance framework for consequential human decisions made by, with, or through technology-assisted systems. Its purpose is to ensure that trust is warranted, human oversight is meaningful, and accountability remains visible when algorithmic influence shapes outcomes.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#94a3b8', margin: '0 0 16px', maxWidth: 560 }}>
              Wherever a human-in-the-loop requirement exists, or should exist, HCCS™ provides the governance architecture: structured controls, documented evidence, and auditable accountability. Employment decisions are the first domain. The framework extends to any context where technology shapes decisions about people.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#94a3b8', margin: '0 0 40px', maxWidth: 560 }}>
              Technology does not remove the need for governance. It makes governance the only defensible position.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', maxWidth: 540 }}>
              <Link to="/assess" style={{ background: '#2563eb', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textAlign: 'center', textDecoration: 'none' }}>
                Assess your governance
              </Link>
              <Link to="/documents" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '14px 24px', borderRadius: 8, fontSize: 15, fontWeight: 500, textAlign: 'center', textDecoration: 'none' }}>
                Read the documents
              </Link>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
              <Link to="/research" style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'none' }}>Research findings →</Link>
              <Link to="/about" style={{ fontSize: 13, color: '#94a3b8', textDecoration: 'none' }}>About HCCS™ →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '40px 24px' }}>
        <div className='grid-4' style={{ ...S.wrap, textAlign: 'center' }}>
          {[['74', 'Auditable controls'], ['7', 'Governance domains'], ['5', 'Maturity levels'], ['3', 'Document system']].map(([n, l]) => (
            <div key={l}>
              <div className='stat-number' style={{ fontSize: 40, fontWeight: 700, color: '#1e3a5f' }}>{n}</div>
              <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Governing Principle — most-seen sentence on the site */}
      <section style={{ background: '#0f172a', padding: '56px 24px' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 24, fontWeight: 600, color: '#fff', lineHeight: 1.5, margin: '0 0 16px', fontStyle: 'italic' }}>
            "If an organization cannot reconstruct how a decision was made, what evidence it relied on, and whether standards were applied consistently, the process must be treated as unreliable."
          </p>
          <p style={{ fontSize: 13, color: '#5b9bd5', fontWeight: 600, letterSpacing: '0.08em', margin: 0 }}>— HCCS™ GOVERNING PRINCIPLE 1: RECONSTRUCTABILITY</p>
        </div>
      </section>

      {/* What HCCS governs */}
      <section style={{ padding: '72px 24px', background: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 12, fontWeight: 600 }}>Seven governance domains</div>
            <h2 className='section-title' style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', lineHeight: 1.25, margin: 0 }}>
              What HCCS™ governs
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { code: 'RG', name: 'Role & Scope Governance', desc: 'How roles are defined', color: '#185FA5' },
              { code: 'EI', name: 'Evaluation Integrity', desc: 'How candidates are evaluated', color: '#0F6E56' },
              { code: 'DG', name: 'Decision Governance', desc: 'How decisions are made and documented', color: '#534AB7' },
              { code: 'AG', name: 'AI & Technology Governance', desc: 'How AI tools are governed throughout', color: '#993C1D' },
              { code: 'PI', name: 'Process Integrity', desc: 'How processes maintain consistency and fairness', color: '#854F0B' },
              { code: 'CG', name: 'Resource & Outcome Governance', desc: 'How compensation aligns to scope', color: '#3B6D11' },
              { code: 'ER', name: 'Evidence & Records', desc: 'How evidence is created, classified, and retained', color: '#993556' },
            ].map((d, i) => (
              <div key={d.code} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: i < 6 ? '1px solid #f1f5f9' : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: d.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{d.code}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600, color: '#0f172a', fontSize: 15 }}>{d.name}</span>
                  <span style={{ color: '#94a3b8', fontSize: 15 }}> — {d.desc}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/controls" style={{ fontSize: 14, color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Browse all 74 controls →</Link>
          </div>
        </div>
      </section>

      {/* SOX / NIST / ISO positioning */}
      <section style={{ padding: '64px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#64748b', marginBottom: 12, fontWeight: 600 }}>Structural analogs</div>
            <h2 className='section-title' style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', lineHeight: 1.25, margin: '0 0 8px' }}>
              HCCS™ sits across three established governance frameworks.
            </h2>
          </div>
          <div className='grid-3' style={{ gap: 16 }}>
            {[
              ['SOX', 'Financial decision controls', 'Like SOX governs financial reporting integrity, HCCS™ governs decision integrity for consequential outcomes about people.'],
              ['NIST AI RMF', 'System risk governance', 'Like NIST governs AI system risk, HCCS™ governs the decisions those systems produce — including non-AI processes.'],
              ['ISO Standards', 'Operational consistency', 'Like ISO ensures repeatable quality systems, HCCS™ ensures repeatable, auditable decision processes at every level.'],
            ].map(([name, cat, desc]) => (
              <div key={name} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 24, textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#1e3a5f', marginBottom: 4 }}>{name}</div>
                <div style={{ fontSize: 13, color: '#2563eb', fontWeight: 500, marginBottom: 10 }}>{cat}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section style={{ ...S.section, background: '#f8fafc' }}>
        <div style={S.wrap}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 16, fontWeight: 600 }}>The problem</div>
            <h2 className='section-title' style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', lineHeight: 1.25, marginBottom: 24 }}>
              There is no governance layer for decisions shaped by technology.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 20 }}>
              Organizations maintain financial controls, data governance standards, and information security frameworks. But the decisions that most directly affect people, who is eligible, how they are evaluated, what outcomes they receive, operate without equivalent governance, auditability, or accountability structures.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 16 }}>
              In most domains where technology influences decisions about people, organizations operate without:
            </p>
            <div style={{ paddingLeft: 20, marginBottom: 20, borderLeft: '3px solid #2563eb' }}>
              {['Consistent standards for how decisions are defined and scoped', 'Governed evaluation criteria applied uniformly', 'Documented decision frameworks with audit trails', 'Alignment between decision scope and resource allocation', 'Auditability across technology-assisted decision processes', 'Distinction between substantive and nominal human oversight'].map(item => (
                <div key={item} style={{ fontSize: 16, color: '#334155', marginBottom: 8, lineHeight: 1.5 }}>{item}</div>
              ))}
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 16 }}>
              The introduction of technology into these decisions increases speed and scale, but does not correct underlying control deficiencies. It amplifies them. And it introduces a new risk: the erosion of meaningful human judgment through unchecked algorithmic deference.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#0f172a', fontWeight: 600, marginBottom: 16 }}>
              Consequential decisions shaped by technology represent a material, ungoverned risk surface within the enterprise.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569' }}>
              HCCS™ exists because there is a missing layer in how modern institutions make decisions. Organizations govern their finances, their data, and their information security. They do not govern the decisions that most directly affect people. This gap creates exposure that is often unmeasured, inconsistently managed, and difficult to defend under audit or legal scrutiny.
            </p>
          </div>
        </div>
      </section>

      {/* Where governance is required */}
      <section style={{ ...S.section, background: '#fff', borderTop: '1px solid #e2e8f0' }}>
        <div style={S.wrap}>
          <div style={{ maxWidth: 720, margin: '0 auto', marginBottom: 32 }}>
            <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#993C1D', marginBottom: 16, fontWeight: 600 }}>Scope of application</div>
            <h2 className='section-title' style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', lineHeight: 1.25, marginBottom: 16 }}>
              Anywhere human judgment is shaped by algorithmic systems, governance is required.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569' }}>
              HCCS™ defines the governance architecture for consequential decisions where technology influences outcomes that affect people. The standard applies wherever a human-in-the-loop requirement exists, or should exist, but meaningful oversight has not been verified.
            </p>
          </div>
          <div className='grid-cards'>
            {[
              { domain: 'Employment & Workforce', status: 'Active', color: '#185FA5', items: 'Hiring, evaluation, compensation, promotion, termination, workforce planning', desc: 'The origin domain. 74 controls, 7 governance domains, full assessment and tooling available.' },
              { domain: 'Healthcare', status: 'Planned', color: '#0F6E56', items: 'Diagnosis support, treatment recommendations, triage, prior authorization, clinical decision support', desc: 'AI-assisted clinical decisions where algorithmic recommendations shape patient outcomes and provider judgment.' },
              { domain: 'Financial Services', status: 'Planned', color: '#534AB7', items: 'Credit decisions, lending, underwriting, fraud detection, claims adjudication, algorithmic trading oversight', desc: 'Automated decisioning in regulated financial environments where human review is legally required but often nominal.' },
              { domain: 'Criminal Justice', status: 'Planned', color: '#993C1D', items: 'Risk assessment, sentencing recommendations, parole decisions, predictive policing, surveillance', desc: 'The highest-stakes domain. Algorithmic influence on liberty decisions with documented disparate impact.' },
              { domain: 'Education', status: 'Planned', color: '#854F0B', items: 'Admissions, grading, accommodations, disciplinary actions, learning pathway recommendations', desc: 'AI-shaped decisions that determine access to opportunity, with compounding effects across a lifetime.' },
              { domain: 'Insurance', status: 'Planned', color: '#3B6D11', items: 'Coverage determinations, claims decisions, pricing models, risk classification, eligibility', desc: 'Algorithmic pricing and eligibility decisions with direct financial impact on individuals and families.' },
              { domain: 'Social Services', status: 'Planned', color: '#993556', items: 'Benefits eligibility, child welfare risk scoring, housing allocation, disability determinations', desc: 'Government and institutional decisions affecting the most vulnerable populations, often with the least transparency.' },
            ].map(d => (
              <div key={d.domain} style={{ background: d.status === 'Active' ? '#fff' : '#fafbfc', border: `1px solid ${d.status === 'Active' ? d.color : '#e2e8f0'}`, borderRadius: 12, padding: 24, borderLeft: `4px solid ${d.color}`, opacity: d.status === 'Active' ? 1 : 0.85 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#0f172a' }}>{d.domain}</div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 12, background: d.status === 'Active' ? `${d.color}15` : '#f1f5f9', color: d.status === 'Active' ? d.color : '#94a3b8' }}>{d.status}</span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b', margin: '0 0 8px' }}>{d.desc}</p>
                <p style={{ fontSize: 13, color: '#94a3b8', margin: 0 }}>{d.items}</p>
              </div>
            ))}
          </div>
          <div style={{ maxWidth: 720, margin: '32px auto 0', textAlign: 'center' }}>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7 }}>
              The governance architecture is domain-agnostic. The control framework (role definition, evaluation integrity, decision governance, AI governance, process integrity, resource alignment, evidence and records) applies identically. What changes is the vocabulary, not the structure.
            </p>
          </div>
        </div>
      </section>

      {/* Control domains */}
      <section style={S.section}>
        <div style={S.wrap}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 16, fontWeight: 600 }}>7 control domains</div>
            <h2 className='section-title' style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>One governance architecture. Any domain.</h2>
            <p style={{ fontSize: 16, color: '#64748b', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>HCCS™ defines seven control domains that collectively govern the full lifecycle of consequential decisions shaped by technology. The architecture is domain-agnostic. What changes across verticals is the vocabulary, not the structure.</p>
          </div>
          <div className='grid-cards' style={{ marginTop: 32 }}>
            {[
              { code: 'RG', name: 'Role & Scope Governance', desc: 'Every consequential decision begins with a defined scope: what is being decided, by whom, under what authority, and within what boundaries. Without this, evaluation criteria are arbitrary and accountability is impossible.', color: '#185FA5' },
              { code: 'EI', name: 'Evaluation Integrity', desc: 'Structured, criteria-based assessment with validated constructs, calibration standards, and controls for cognitive bias. Ensures that the method of evaluation is defensible, not just the outcome.', color: '#0F6E56' },
              { code: 'DG', name: 'Decision Governance', desc: 'Every consequential decision documented with criteria, evidence, rationale, and named accountability. For technology-assisted decisions, records must show what the system recommended and what the human changed.', color: '#534AB7' },
              { code: 'AG', name: 'AI & Technology Governance', desc: 'Inventory of every algorithmic tool in the decision pipeline. Substantive human oversight verified, not assumed. Trust profiles assessed. Deference risk monitored. Explainability required.', color: '#993C1D' },
              { code: 'PI', name: 'Process Integrity', desc: 'Processes applied consistently regardless of who executes them. Procedural justice standards enforced. Classification controls documented. Affected parties informed of how decisions are made.', color: '#854F0B' },
              { code: 'CG', name: 'Resource & Outcome Governance', desc: 'Resources, compensation, and outcomes aligned to defined scope through structured factor analysis. Documented rationale required. Equity monitored across demographic groups.', color: '#3B6D11' },
              { code: 'ER', name: 'Evidence & Records', desc: 'Contemporaneous records for every consequential decision. Substantive review distinguished from pass-through approval. Defined retention, classification, access controls, and audit reproducibility.', color: '#993556' },
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
            <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.6 }}>HCCS™ defines five levels of control maturity. Level 3 represents the minimum standard for external credibility and is required for organizations making claims of governed, accountable, or technology-assisted decision practices.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { l: 5, n: 'Optimizing', d: 'All controls implemented, continuously improved, independently audited.', c: '74 controls', t: 'Audited', col: '#993C1D' },
              { l: 4, n: 'Managed', d: 'Controls consistently applied, measured, and subject to internal audit.', c: '63 controls', t: 'Audited', col: '#534AB7' },
              { l: 3, n: 'Defined', d: 'Controls formally established, documented, and validated. Minimum threshold for external credibility.', c: '51 controls', t: 'Validated', col: '#0F6E56', threshold: true },
              { l: 2, n: 'Developing', d: 'Controls partially implemented, inconsistently applied, self-attested.', c: '26 controls', t: 'Self-Attest', col: '#185FA5' },
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
              HCCS™ is not opinion-based. It is grounded in replicated research demonstrating that structured, actuarial methods consistently outperform unstructured judgment in consequential decisions: personnel selection, risk assessment, clinical prediction, and classification decisions across domains.
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
            We studied how people actually form trust in AI decision tools. 319 participants. Three experimental conditions.
          </p>
          <div style={{ background: '#0f172a', borderRadius: 12, padding: '28px 32px', marginBottom: 24 }}>
            <p style={{ fontSize: 20, lineHeight: 1.5, color: '#fff', margin: 0, fontWeight: 600 }}>
              The finding: giving people more transparency, more control, or better design did not change how much they trusted the tool. <span style={{ color: '#f59e0b' }}>Not even a little.</span>
            </p>
          </div>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 24 }}>
            What predicted trust was who the person already was: how often they use AI, how connected they felt to the decision, and how confident they were in their own judgment. Trust is something people bring with them. It is not something an interface creates. That means governance cannot be delegated to better UX. It requires structured controls, documented evidence, and verified human oversight.
          </p>
          <div className='grid-science' style={{ marginBottom: 32 }}>
            {[
              ['Your most experienced AI users may be your highest risk', 'Daily AI users trusted the tool significantly more. Familiarity breeds confidence, and unchecked confidence in a consequential decision tool is a liability.'],
              ['A human in the loop is not governance', 'If the reviewer approves 100% of AI recommendations without critical engagement, that is a rubber stamp, not oversight. The research makes this measurable.'],
              ['Better design changes behavior, not trust', 'Agency-supportive design led to more moderate decisions, but did not change trust scores. Design is worth doing, but not for the reason most organizations think.'],
              ['Accountability attaches to the deployment decision', 'If design cannot create warranted trust, then the organization that deployed the AI owns the outcomes. Governance is the only durable defense.'],
            ].map(([title, desc]) => (
              <div key={title} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
          <Link to="/research" style={{ display: 'inline-block', background: '#0f172a', color: '#fff', padding: '13px 28px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            See the full research findings →
          </Link>
        </div>
      </section>

      {/* Pull quote */}
      <section style={{ background: '#0f172a', padding: '48px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 22, fontWeight: 600, color: '#fff', lineHeight: 1.5, margin: '0 0 12px', fontStyle: 'italic' }}>
            "A human clicking reject inside a black box is still a black box."
          </p>
          <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>Diane Malefyt, HCCS™ Standard</p>
        </div>
      </section>

      {/* Governing principles */}
      <section style={{ background: '#0f172a', padding: '72px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 12, fontWeight: 600 }}>Governing principles</div>
          </div>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#5b9bd5', marginBottom: 8 }}>Principle 1: Reconstructability</div>
            <p className='quote-text' style={{ fontSize: 22, color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
              "If an organization cannot reconstruct how a decision was made, what evidence was used, and whether standards were applied consistently, the process must be treated as unreliable."
            </p>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#993C1D', marginBottom: 8 }}>Principle 2: Accountability</div>
            <p className='quote-text' style={{ fontSize: 22, color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6, margin: 0 }}>
              "Accountability for an AI-assisted decision attaches to the organization that deployed the system, not to the presence of a human reviewer. Nominal oversight does not constitute governance."
            </p>
          </div>
          <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 32, textAlign: 'center', fontWeight: 600 }}>HCCS™ Governing Principles, v2.0</p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...S.section, textAlign: 'center' }}>
        <div style={S.wrap}>
          <h2 className='section-title' style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Is your organization's decision governance audit-ready?</h2>
          <p style={{ fontSize: 17, color: '#64748b', marginBottom: 32, maxWidth: 520, margin: '0 auto 32px' }}>
            HCCS™ provides 74 auditable controls across 7 governance domains. Start with your domain, identify governance gaps, and build a remediation roadmap.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/domains/employment" style={{ background: '#2563eb', color: '#fff', padding: '16px 32px', borderRadius: 8, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
              Employment & Workforce
            </Link>
            <Link to="/contact" style={{ background: '#0f172a', color: '#fff', padding: '16px 32px', borderRadius: 8, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
              Other domains: get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
