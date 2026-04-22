import { useState } from 'react'
import { Link } from 'react-router-dom'

function EmailGate({ docName, docUrl, color = '#2563eb' }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')

  const submit = async () => {
    if (!email || !email.includes('@') || !name) return setErr('Please enter your name and work email.')
    setErr('')
    try {
      await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, org: '', interest: `Download: ${docName}`, message: `Requested download of ${docName}` }),
      })
    } catch {}
    setSent(true)
  }

  if (sent) return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <div style={{ fontSize: 24, marginBottom: 8 }}>✓</div>
      <a href={docUrl} download style={{ background: color, color: '#fff', padding: '12px 28px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
        Download {docName}
      </a>
      <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>Check your email for a copy as well.</p>
    </div>
  )

  return (
    <div>
      {err && <p style={{ fontSize: 13, color: '#dc2626', marginBottom: 8 }}>{err}</p>}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" aria-label="Your name"
          style={{ flex: 1, minWidth: 140, padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none' }} />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Work email" aria-label="Work email"
          style={{ flex: 1, minWidth: 180, padding: '10px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none' }} />
        <button onClick={submit}
          style={{ background: color, color: '#fff', padding: '10px 20px', borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Get the download
        </button>
      </div>
    </div>
  )
}

export { EmailGate }

export default function Research() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(165deg, #0a1628 0%, #1a2d4a 40%, #0f3460 100%)', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 500 }}>Original Research</div>
          <h1 className='hero-title' style={{ fontSize: 44, fontWeight: 700, color: '#fff', margin: '0 0 20px', lineHeight: 1.15 }}>
            You cannot fix trust with a design change.
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 680, lineHeight: 1.7, margin: '0 0 32px' }}>
            We studied how people actually form trust in AI decision tools. What we found challenges the core assumption behind most AI adoption strategy: that better design produces better trust. It does not.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/controls" style={{ background: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              See how this shapes the standard →
            </Link>
            <Link to="/assess" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
              Assess your organization
            </Link>
          </div>
        </div>
      </section>

      {/* The question */}
      <section style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 16, fontWeight: 600 }}>The question</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', lineHeight: 1.25, marginBottom: 20 }}>
            If you give people more control over an AI recommendation, do they trust it more?
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 16 }}>
            That is what most organizations assume. It is the logic behind "explainable AI," transparency dashboards, and agency-supportive design. The theory: if people understand the AI and feel they have a choice, they will develop appropriate trust.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 16 }}>
            We tested this directly. 319 people were randomly assigned to one of three conditions: no AI recommendation, a direct AI recommendation, or an agency-supportive version where they could choose whether to see the recommendation at all.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#0f172a', fontWeight: 600 }}>
            The result: it made no difference. Trust scores were statistically identical across all three conditions.
          </p>
        </div>
      </section>

      {/* What we found - plain language */}
      <section style={{ padding: '64px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#993C1D', marginBottom: 16, fontWeight: 600 }}>What we found</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', lineHeight: 1.25, marginBottom: 32 }}>
            Four findings that change how you should think about AI governance
          </h2>

          {[
            {
              num: '01',
              title: 'Trust is something people bring with them. It is not something you create.',
              body: 'The way we framed the AI recommendation had essentially zero effect on how much people trusted it. What mattered was who the person already was: how often they use AI tools, how confident they felt in their own decision-making, and how connected they were to the scenario. These pre-existing characteristics explained over 25% of trust. The design change explained effectively nothing.',
              takeaway: 'You cannot train, design, or communicate your way to warranted trust. Trust is formed through accumulated experience over time.',
              color: '#993C1D',
            },
            {
              num: '02',
              title: 'Giving people control changes what they do, not how they feel.',
              body: 'People who received the agency-supportive version (where they chose whether to see the AI recommendation) made more moderate, calibrated decisions. They were less likely to pick the most extreme response. But their trust scores were identical to everyone else. The design did not build trust. It changed behavior.',
              takeaway: 'Agency-supportive design is worth doing, but not for the reason most organizations think. It promotes better decision-making, not better trust.',
              color: '#185FA5',
            },
            {
              num: '03',
              title: 'People who use AI more, trust AI more. That is not always a good thing.',
              body: 'Daily AI users had significantly higher trust scores than people who rarely or never use AI. This looks like a positive finding until you consider the governance implication: the employees most likely to be assigned AI decision tools are also the most likely to defer to them without critical evaluation. Familiarity breeds confidence, and unchecked confidence in a consequential decision tool is a liability.',
              takeaway: 'Your most experienced AI users may be your highest deference risk. Monitor override rates, not just satisfaction scores.',
              color: '#534AB7',
            },
            {
              num: '04',
              title: 'If design cannot create trust, then accountability cannot be delegated to design.',
              body: 'This is the governance argument. If a better interface does not produce better trust, then organizations cannot claim that transparency features, explainability dashboards, or user-control mechanisms are sufficient governance. Having a human "in the loop" means nothing if that human defers to the AI 100% of the time. Accountability must attach to the organization that deployed the system, not to the presence of a reviewer.',
              takeaway: 'The only durable defense is governance: structured controls, documented evidence, and verified human oversight.',
              color: '#0F6E56',
            },
          ].map(f => (
            <div key={f.num} style={{ marginBottom: 40 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 18, fontWeight: 700, flexShrink: 0 }}>{f.num}</div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: '0 0 12px', lineHeight: 1.3 }}>{f.title}</h3>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', margin: '0 0 12px' }}>{f.body}</p>
                  <div style={{ background: `${f.color}08`, border: `1px solid ${f.color}20`, borderRadius: 10, padding: '14px 18px' }}>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: '#0f172a', margin: 0 }}>
                      <strong>What this means for your organization:</strong> {f.takeaway}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What predicted trust */}
      <section style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 16, fontWeight: 600 }}>What actually predicted trust</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', lineHeight: 1.25, marginBottom: 16 }}>
            It was not the design. It was the person.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: '#475569', marginBottom: 32 }}>
            Three factors explained nearly all the measurable variation in trust. None of them were under the organization's control at the moment of deployment.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { factor: 'AI experience', desc: 'People who use AI tools daily trusted the tool significantly more than people who never use AI. The gap was over 12 points on a 70-point scale.', color: '#993C1D', stat: 'Daily users: 52.0 avg | Non-users: 39.6 avg' },
              { factor: 'Domain proximity', desc: 'People with direct personal connection to the scenario (current dog owners, in a veterinary AI study) trusted the tool significantly more than those without. Emotional stake drove trust independently of tool quality.', color: '#534AB7', stat: 'Dog owners: 52.1 avg | No connection: 43.6 avg' },
              { factor: 'Decision confidence', desc: 'People who already felt confident in their own judgment trusted the tool more. People who felt uncertain trusted it less. The tool did not create confidence. It amplified existing confidence.', color: '#0F6E56', stat: 'Strongest predictor in regression model' },
            ].map(p => (
              <div key={p.factor} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, borderLeft: `4px solid ${p.color}` }}>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{p.factor}</div>
                <p style={{ fontSize: 15, lineHeight: 1.6, color: '#475569', margin: '0 0 8px' }}>{p.desc}</p>
                <div style={{ fontSize: 13, color: p.color, fontWeight: 600 }}>{p.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The paradox */}
      <section style={{ padding: '64px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ background: '#0f172a', borderRadius: 16, padding: 36 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#5b9bd5', marginBottom: 12 }}>The paradox</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 16px', lineHeight: 1.3 }}>
              People who feel they have agency trust the tool more. But you cannot create that feeling.
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: '#94a3b8', margin: 0 }}>
              We found that subjective perceptions of agency, clarity, and helpfulness were powerfully correlated with trust. People who felt the tool helped them make their own decision trusted it more. But here is the problem: all three groups reported feeling the same level of agency, regardless of whether they actually had more control. The feeling of agency is something the person brings with them. It is not something the interface provides.
            </p>
          </div>
        </div>
      </section>

      {/* What this means for governance */}
      <section style={{ background: '#0f172a', padding: '72px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 12, fontWeight: 600 }}>What this means</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#fff', margin: '0 0 24px', lineHeight: 1.2 }}>
            If you deploy AI in consequential decisions, you need governance. Not better design.
          </h2>
          <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.7, marginBottom: 32 }}>
            This research led directly to three new controls in the HCCS™ standard. Each addresses a specific risk that this study made measurable.
          </p>
          <div className='grid-3' style={{ gap: 16 }}>
            {[
              ['AG-011', 'Trust Profile Assessment', 'Assess how your workforce relates to AI tools before you deploy them. Not after something goes wrong.'],
              ['AG-012', 'Substantive Oversight', 'Prove that your human reviewers are actually reviewing. Not just clicking approve.'],
              ['AG-013', 'Deference Monitoring', 'Track whether your people are deferring to AI outputs without critical engagement. Catch it before an auditor does.'],
            ].map(([id, title, desc]) => (
              <div key={id} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#993C1D', letterSpacing: '0.08em', marginBottom: 8 }}>{id}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices from inside the system */}
      <section style={{ padding: '64px 24px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#993C1D', marginBottom: 12, fontWeight: 600 }}>Voices from inside the system</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 8, lineHeight: 1.25 }}>
            The people operating the system are already telling us what is broken.
          </h2>
          <p style={{ fontSize: 15, color: '#64748b', marginBottom: 32, lineHeight: 1.6 }}>
            These are anonymized statements from hiring practitioners, talent leaders, and decision-makers. Collected from public industry discussions. Each one describes a governance failure in their own words.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {[
              { quote: 'Too many teams hide behind process instead of owning the decision.', role: 'Talent Acquisition Leader, Fortune 500', gap: 'DG-001: Decision rationale not documented. If no one "owns the decision," no one is accountable for it.' },
              { quote: 'Feedback invites argument and legal exposure.', role: 'Global Talent Leader', gap: 'If feedback invites legal exposure, that means the decisions being made cannot withstand scrutiny. That is a governance tell.' },
              { quote: 'We do not have time.', role: 'Senior TA Specialist, Fortune 500', gap: 'PI-009: Decision-makers not trained. Volume does not break the governance model. Opacity does.' },
              { quote: 'I randomly picked some.', role: 'Hiring Manager, Financial Services', gap: 'EI-001, EI-002: No evaluation criteria, no consistent method. Arbitrary selection disguised as process.' },
              { quote: 'Candidates are owed closure, not feedback.', role: 'Senior TA Specialist', gap: 'PI-010: No challenge mechanism. DG-006: No substantive rejection rationale. "Closure" without substance is opacity rebranded.' },
              { quote: 'We have never in the history of hiring given applicants reasons they were screened out.', role: 'Global Talent Leader', gap: 'ER-001: No contemporaneous records. DG-006: No rejection rationale. If you have never explained a decision, you have never been required to defend one.' },
            ].map((v, i) => (
              <div key={i} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.4, marginBottom: 8 }}>
                  "{v.quote}"
                </div>
                <div style={{ fontSize: 13, color: '#993C1D', fontWeight: 600, marginBottom: 12 }}>{v.role}</div>
                <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '12px 16px', borderLeft: '3px solid #2563eb' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Governance gap</div>
                  <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, margin: 0 }}>{v.gap}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: '#0f172a', borderRadius: 12, padding: '20px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 15, color: '#94a3b8', margin: 0, lineHeight: 1.6 }}>
              HCCS™ exists because the people inside the system are already telling us what is broken. The standard makes it governable.
            </p>
          </div>
        </div>
      </section>

      {/* Download whitepaper */}
      <section style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 16, padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#993C1D', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Research whitepaper</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>
              The full empirical findings
            </h3>
            <p style={{ fontSize: 15, color: '#64748b', lineHeight: 1.6, marginBottom: 20 }}>
              Complete methodology, statistical results, tables, and governance implications. 319 participants, three experimental conditions, IRB-approved.
            </p>
            <EmailGate docName="Research Whitepaper" docUrl="/docs/HCCS-Case-Study-AI-Trust-Research.docx" color="#993C1D" />
          </div>
        </div>
      </section>

      {/* Study details (collapsed) */}
      <section style={{ padding: '48px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <details>
            <summary style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', cursor: 'pointer', marginBottom: 16 }}>Study details and methodology</summary>
            <div style={{ padding: '16px 0', fontSize: 15, lineHeight: 1.7, color: '#475569' }}>
              <p style={{ marginBottom: 12 }}>
                <strong>Design:</strong> Three-condition between-subjects experiment conducted March 15-30, 2026. IRB-approved, Evangel University. Faculty supervisor: Dr. Heather Kelly.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>Sample:</strong> 319 participants after exclusion of 79 incomplete and 82 suspected automated responses from 480 raw submissions. 47.6% female, 49.5% male. Mean age 32.1 years (range 18-81). 40.4% current dog owners.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>Conditions:</strong> No recommendation (n = 107, M = 48.07), direct recommendation (n = 100, M = 49.20), agency-supportive (n = 112, M = 49.07). Overall M = 48.77, SD = 10.19.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>Measure:</strong> 6-item Trust in Automation scale adapted from Jian et al. (2000), with independent trust and distrust subscales. Internal consistency α = .782.
              </p>
              <p style={{ marginBottom: 12 }}>
                <strong>Primary result:</strong> F(2, 316) = 0.39, p = .676, η² = .002. Non-significant. Confirmed by Tukey HSD (all ps {'>'} .70) and Kruskal-Wallis H(2) = 0.93, p = .628.
              </p>
              <p style={{ marginBottom: 0 }}>
                <strong>Regression:</strong> AI usage frequency, decision confidence, follow-through intention, and condition explained 25.8% of TrustScore variance (adjusted R² = .244). Condition contributed minimally (B = 1.76 and 1.65 for Conditions 2 and 3).
              </p>
            </div>
          </details>
        </div>
      </section>

      {/* Research arc */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 12, fontWeight: 600 }}>Research program</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>This is Study 1 of three.</h2>
          {[
            { n: '1', status: 'Complete (N = 319)', title: 'Design interventions do not move trust.', active: true },
            { n: '2', status: 'In progress: M.S. thesis, ASU', title: 'Trust profiles predict decision quality across domains.', active: false },
            { n: '3', status: 'Planned', title: 'Organizational trust profiles predict AI deployment outcomes.', active: false },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.active ? '#0f172a' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: s.active ? '#fff' : '#94a3b8', flexShrink: 0 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: s.active ? '#2563eb' : '#94a3b8', marginBottom: 2 }}>{s.status}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>{s.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#f1f5f9', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 540, margin: '0 auto' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
            Is your organization governing its AI-assisted decisions?
          </h2>
          <p style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.6 }}>
            The HCCS™ governance assessment evaluates whether your organization has the controls, documentation, and oversight structures this research shows are necessary.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/assess" style={{ background: '#2563eb', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Assess your governance
            </Link>
            <Link to="/about" style={{ background: '#fff', color: '#0f172a', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0' }}>
              About the author
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
