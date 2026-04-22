import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <h1 className='hero-title' style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>About HCCS™</h1>
          <p style={{ fontSize: 17, color: '#94a3b8', maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
            A governance and assurance standard for consequential decisions shaped by technology.
          </p>
        </div>
      </section>

      <section style={{ padding: '60px 24px 80px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* What HCCS is */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>What HCCS is</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', marginBottom: 12 }}>
              HCCS™ is a governance and assurance framework for consequential human decisions made by, with, or through technology-assisted systems. Its purpose is to ensure that trust is warranted, human oversight is meaningful, and accountability remains visible when algorithmic influence shapes outcomes.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', marginBottom: 12 }}>
              The standard begins with employment decisions, where the market pain is immediate and the legal exposure is obvious. The same governance architecture extends to any domain where consequential decisions about people are shaped by technology: healthcare, financial services, criminal justice, education, insurance, and social services.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569' }}>
              74 auditable controls across 7 governance domains. A 5-level maturity model. A tiered compliance framework from self-attestation to third-party audit. Built to exceed current regulatory requirements and future-proof because it governs the decision layer, not any specific technology.
            </p>
          </div>

          {/* What it is NOT */}
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 28, marginBottom: 48 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 16 }}>What HCCS™ is not</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                ['Not an HR framework', 'HCCS™ does not prescribe HR processes. It governs decision integrity.'],
                ['Not a DEI program', 'Bias controls are one domain of seven. HCCS™ is about governance, not advocacy.'],
                ['Not an AI ethics guideline', 'AI governance is one domain. The standard covers all consequential decisions, with or without AI.'],
                ['Not a hiring tool', 'HCCS™ does not prescribe specific tools or technologies. It requires that controls are satisfied.'],
              ].map(([title, desc]) => (
                <div key={title}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 4 }}>{title}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b', margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Author - Credibility Stack */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>Who built this</h2>

            <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', marginBottom: 32 }}>
              <img src="/di-malefyt.png" alt="Diane Malefyt" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '3px solid #2563eb' }} />
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>Diane Malefyt</h3>
                <p style={{ fontSize: 15, color: '#64748b', margin: '0 0 4px' }}>Founder, IngenuityCo LLC</p>
                <p style={{ fontSize: 15, color: '#64748b', margin: '0 0 12px' }}>Author, HCCS™ Standard</p>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', margin: 0 }}>
                  Most governance frameworks are written by people who studied the problem. HCCS™ was built by someone who lived on every side of it.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
              {[
                { label: 'Builder', color: '#185FA5', icon: '⚡', desc: 'Software engineering and solution architecture background. Built the systems that automate decisions, and understands how they fail.' },
                { label: 'Operator', color: '#0F6E56', icon: '📊', desc: '15+ years in B2B SaaS across GTM strategy, revenue operations, and pre-sales leadership at AWS, Contentsquare, and growth-stage companies.' },
                { label: 'Insider', color: '#993C1D', icon: '🏢', desc: 'TEKsystems, one of the largest staffing firms in the world. Direct exposure to how hiring operates at scale, and where governance breaks down.' },
                { label: 'Researcher', color: '#534AB7', icon: '🔬', desc: 'M.S. in Forensic and Organizational Psychology (ASU). IRB-approved empirical research (N=319) on AI trust and human agency in decision-making.' },
              ].map(c => (
                <div key={c.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, borderTop: `4px solid ${c.color}` }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: c.color, marginBottom: 6 }}>{c.label}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#475569', margin: 0 }}>{c.desc}</p>
                </div>
              ))}
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', margin: '0 0 12px' }}>
                Dual B.S. degrees in Psychology and Computer Science. Harvard Professional Education. The academic research on AI trust directly informs three controls in the standard (AG-011, AG-012, AG-013).
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: '#334155', margin: 0, fontWeight: 500 }}>
                Core conviction: technology's greatest underestimated risk in consequential decisions is not inaccuracy. It is the systematic erosion of meaningful human judgment through unchecked algorithmic deference. HCCS™ exists to make that risk governable.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 16, marginTop: 20, flexWrap: 'wrap' }}>
              <a href="https://www.linkedin.com/in/dianemalefyt/" target="_blank" rel="noopener" style={{ fontSize: 14, color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Connect on LinkedIn →</a>
              <Link to="/research" style={{ fontSize: 14, color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>Read the research →</Link>
              <a href="mailto:info@hccsstandard.com" style={{ fontSize: 14, color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>info@hccsstandard.com</a>
            </div>
          </div>

          {/* Structural analogs */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Structural analogs</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', marginBottom: 20 }}>
              HCCS™ sits at the intersection of three established governance frameworks:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              {[
                ['SOX', 'Financial decision controls', 'Like SOX governs financial reporting integrity, HCCS™ governs decision integrity for consequential outcomes.'],
                ['NIST AI RMF', 'System risk governance', 'Like NIST governs AI system risk, HCCS™ governs the decisions those systems produce.'],
                ['ISO Standards', 'Operational consistency', 'Like ISO ensures repeatable quality systems, HCCS™ ensures repeatable, auditable decision processes.'],
              ].map(([name, cat, desc]) => (
                <div key={name} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#1e3a5f', marginBottom: 4 }}>{name}</div>
                  <div style={{ fontSize: 13, color: '#2563eb', fontWeight: 500, marginBottom: 8 }}>{cat}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b', margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Research */}
          <div style={{ background: '#0f172a', borderRadius: 14, padding: 28, marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#5b9bd5', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Original research</div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>
              You cannot fix trust with a design change.
            </h3>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#94a3b8', marginBottom: 16 }}>
              A 2026 IRB-approved study with 319 participants found that giving people more transparency, more control, or better design did not change how much they trusted an AI tool. What predicted trust was who the person already was. This is the empirical basis for three accountability controls in HCCS™ 2.0.
            </p>
            <Link to="/research" style={{ fontSize: 14, color: '#5b9bd5', fontWeight: 600, textDecoration: 'none' }}>Read the full research findings →</Link>
          </div>

          {/* Accountability Gap Framework teaser */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>The Accountability Gap™</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', marginBottom: 12 }}>
              When decisions are automated or semi-automated at scale, accountability diffuses. The humans in the loop think they are governing. They are often not. The system cannot reconstruct or defend the decisions it made.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', marginBottom: 20 }}>
              Three conditions define the Accountability Gap:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {[
                ['Criteria documented but not visible', 'Evaluation standards exist in policy but are not operationalized in the decision workflow. Evaluators make decisions without reference to them.'],
                ['Decisions made but not reconstructable', 'The organization cannot, after the fact, explain why a specific decision was made, what evidence was used, and who was accountable.'],
                ['Patterns present but not auditable', 'Disparate outcomes exist across demographic groups, but the organization does not measure, detect, or address them.'],
              ].map(([title, desc]) => (
                <div key={title} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, borderLeft: '4px solid #993C1D' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>{title}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#64748b', margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6 }}>
              HCCS™ controls AG-011, AG-012, and AG-013 directly address the Accountability Gap. They were designed from empirical research, not theory.
            </p>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/assess" style={{ background: '#2563eb', color: '#fff', padding: '14px 32px', borderRadius: 8, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
                Assess your governance
              </Link>
              <Link to="/contact" style={{ background: '#fff', color: '#0f172a', padding: '14px 32px', borderRadius: 8, fontSize: 16, fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0' }}>
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
