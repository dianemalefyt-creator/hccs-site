import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h1 className='hero-title' style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>About HCCS™</h1>
          <p style={{ fontSize: 17, color: '#94a3b8', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            The first governance and audit standard for human capital decisions.
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* What HCCS™ is */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>What HCCS is</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', marginBottom: 12 }}>
              HCCS™ is a control and audit standard for human capital decisions. It establishes governance for how organizations define roles, evaluate candidates, make hiring decisions, and align compensation to the actual scope of work.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', marginBottom: 12 }}>
              The standard defines 67 auditable controls across 7 governance domains, a 5-level maturity model, and a tiered compliance framework that scales from self-attestation to third-party audit.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569' }}>
              HCCS™ is designed to exceed the requirements of current employment and AI regulations, including Title VII, the EU AI Act, NYC Local Law 144, and OFCCP compliance requirements. It is built to be future-proof.
            </p>
          </div>

          {/* What it is NOT */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 28, marginBottom: 48 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 16 }}>What HCCS™ is not</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                ['Not an HR framework', 'HCCS™ does not prescribe HR processes. It governs decision integrity.'],
                ['Not a DEI program', 'Bias controls are one domain of seven. HCCS™ is about governance, not advocacy.'],
                ['Not an AI ethics guideline', 'AI governance is one domain. The standard covers all human capital decisions, with or without AI.'],
                ['Not a hiring tool', 'HCCS™ does not prescribe specific tools or technologies. It requires that controls are satisfied.'],
              ].map(([title, desc]) => (
                <div key={title}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{title}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b', margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparable to */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Structural analogs</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', marginBottom: 20 }}>
              HCCS™ sits at the intersection of three established governance frameworks:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              {[
                ['SOX', 'Financial decision controls', 'Like SOX governs financial reporting integrity, HCCS™ governs human capital decision integrity.'],
                ['NIST AI RMF', 'System risk governance', 'Like NIST governs AI system risk, HCCS™ governs AI usage in human capital decisions alongside non-AI processes.'],
                ['ISO Standards', 'Operational consistency', 'Like ISO ensures repeatable quality systems, HCCS™ ensures repeatable, auditable hiring and compensation processes.'],
              ].map(([name, cat, desc]) => (
                <div key={name} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f', marginBottom: 4 }}>{name}</div>
                  <div style={{ fontSize: 13, color: '#2563eb', fontWeight: 500, marginBottom: 8 }}>{cat}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b', margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scientific foundation */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Scientific foundation</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', marginBottom: 16 }}>
              HCCS™ is grounded in over six decades of replicated research in forensic and organizational psychology. The foundational finding: structured, actuarial methods consistently outperform clinical judgment in predictive accuracy across personnel selection, risk assessment, and classification decisions.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', marginBottom: 20 }}>
              Key references include Meehl (1954), Grove et al. (2000), Kuncel et al. (2013), Leventhal (1980), Kahneman, Sibony & Sunstein (2021), and the SIOP Principles for the Validation and Use of Personnel Selection Procedures. A complete reference list is included in the Core Standard (Appendix E).
            </p>

            {/* Original research callout */}
            <div style={{ background: '#0f172a', borderRadius: 14, padding: 28, marginTop: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#5b9bd5', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Original primary research, 2026</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>
                Trust in AI is a trait, not a state. And it is a profile, not a score.
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#94a3b8', marginBottom: 12 }}>
                A 2026 IRB-approved study with 95 participants across three experimental conditions found that recommendation framing, including agency-supportive AI design, produced no statistically significant change in trust. Pre-existing individual characteristics explained 68.5% of trust variance. The experimental manipulation explained essentially nothing.
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#94a3b8', marginBottom: 16 }}>
                More significantly, trust decomposed into four distinct profiles (blind trusters, conflicted, ambivalent, and skeptical) that carry completely different implications for decision quality and governance risk. This is the empirical basis for three new AG domain controls in HCCS™: trust profile assessment (AG-011), substantive vs. nominal oversight (AG-012), and deference risk monitoring (AG-013).
              </p>
              <Link to="/research" style={{ fontSize: 14, color: '#5b9bd5', fontWeight: 600 }}>Read the full research findings →</Link>
            </div>
          </div>

          {/* Author */}
          <div style={{ background: '#0f172a', borderRadius: 14, padding: 32 }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <img src="/di-malefyt.png" alt="Diane Malefyt" style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '3px solid #2563eb' }} />
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#fff', margin: '0 0 12px' }}>About the author</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#94a3b8', marginBottom: 12 }}>
                  HCCS™ was developed by Diane Malefyt, a senior B2B SaaS executive with 15+ years across GTM strategy, revenue operations, pre-sales leadership, and AI governance.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#94a3b8', marginBottom: 12 }}>
                  Diane holds dual B.S. degrees in Psychology and Computer Science, completed Harvard Professional Education, and is pursuing an M.S. in Forensic and Organizational Psychology at Arizona State University. Her academic research on AI trust and human agency in decision-making directly informs the HCCS™ framework.
                </p>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: '#94a3b8' }}>
                  Her core conviction: AI's greatest underestimated risk is the systematic erosion of human dignity and purpose. HCCS™ exists to ensure that consequential decisions about people are made with governance, evidence, and accountability.
                </p>
                <div style={{ display: 'flex', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
                  <a href="https://www.linkedin.com/in/dianemalefyt/" target="_blank" rel="noopener" style={{ fontSize: 14, color: '#5b9bd5', fontWeight: 500 }}>Connect on LinkedIn &rarr;</a>
                  <Link to="/rights" style={{ fontSize: 14, color: '#5b9bd5', fontWeight: 500 }}>Applicant's Bill of Rights &rarr;</Link>
                  <Link to="/org-rights" style={{ fontSize: 14, color: '#5b9bd5', fontWeight: 500 }}>Organization's Bill of Rights &rarr;</Link>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/assess" style={{ background: '#2563eb', color: '#fff', padding: '14px 32px', borderRadius: 8, fontSize: 16, fontWeight: 600, display: 'inline-block' }}>
              Assess your organization
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
