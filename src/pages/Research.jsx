import { Link } from 'react-router-dom'

const PROFILES = [
  {
    name: 'Blind Trusters',
    pct: '9%',
    n: 9,
    color: '#993C1D',
    bg: '#fef2f2',
    border: '#fecaca',
    desc: 'High trust, low distrust. Cognitively immersed and deferring to the AI without critical engagement.',
    risk: 'Highest risk in high-stakes decisions. Most likely to accept incorrect AI recommendations without override.',
    implication: 'Nominal human oversight does not protect against this profile. Governance must detect and flag deference behavior.',
  },
  {
    name: 'Conflicted',
    pct: '22%',
    n: 21,
    color: '#534AB7',
    bg: '#f5f3ff',
    border: '#ddd6fe',
    desc: 'High trust AND high distrust simultaneously. Finds the tool useful while maintaining critical awareness.',
    risk: 'Healthiest decision-making profile. Neither blindly deferring nor rejecting useful AI output.',
    implication: 'This is what good human-AI collaboration looks like. Governance should protect and enable this profile.',
  },
  {
    name: 'Ambivalent',
    pct: '36%',
    n: 34,
    color: '#185FA5',
    bg: '#eff6ff',
    border: '#bfdbfe',
    desc: 'Moderate on both trust and distrust. Has not yet formed a stable relationship with AI tools.',
    risk: 'Largest group. Susceptible to design nudges in either direction, toward deference or avoidance.',
    implication: 'This group is where governance frameworks matter most. Their trust disposition is still forming.',
  },
  {
    name: 'Skeptics',
    pct: '7%',
    n: 7,
    color: '#0F6E56',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    desc: 'Low trust, high distrust. Withholding judgment regardless of AI output quality.',
    risk: 'May reject accurate AI recommendations. Over-represented in agency-supportive condition.',
    implication: 'Not a failure. May reflect appropriate skepticism for the domain. Governance should understand why, not override it.',
  },
]

const FINDINGS = [
  {
    title: 'Trust is a trait, not a state.',
    icon: '◈',
    color: '#993C1D',
    body: 'Three experimental conditions (no recommendation, direct recommendation, and agency-supportive recommendation) produced no statistically significant difference in trust scores, F(2, 92) = 0.50, p = .610, η² = .011. The manipulation explained essentially nothing. What explained 68.5% of variance in trust was who the participant already was: how often they use AI, how engaged they were with the scenario, what their behavioral intentions already were. Trust in AI tools is formed over time through accumulated experience. It is not meaningfully moved by a single design intervention.',
  },
  {
    title: 'Trust is a profile, not a score.',
    icon: '◉',
    color: '#534AB7',
    body: 'The trust and distrust subscales were essentially uncorrelated, r = .077, p = .457. They measure different psychological constructs, not opposite ends of a single dimension. A composite trust score of 48 looks the same whether the person holds high trust and low distrust (resolved, experience-based confidence) or high trust and high distrust simultaneously (engaged ambivalence). These two profiles carry completely different implications for decision quality and organizational risk. Composite scores obscure the difference.',
  },
  {
    title: 'Agency-supportive design produces deliberate judgment, not trust.',
    icon: '⬡',
    color: '#185FA5',
    body: 'The agency-supportive condition had the lowest blind trust rate (3%), the highest skepticism rate (15%), and the smallest gap between trust and distrust subscales (0.06 vs. 1.09 in the no-recommendation condition). Giving people control over the AI decision did not increase their trust. It activated more careful, ambivalent thinking. This is arguably the correct psychological outcome for a novel AI tool in a high-stakes domain. But it is not what conventional trust measures detect, and it is not what most AI governance frameworks are designed to produce.',
  },
  {
    title: 'Accountability cannot be delegated to design.',
    icon: '⬢',
    color: '#0F6E56',
    body: 'The practical implication is direct: if trust in AI cannot be manufactured through design, then governance frameworks that rely on transparency features, explainability interfaces, or agency-supportive framing to produce warranted trust are insufficient. Warranted trust must be earned through demonstrated accuracy over time, meaningful human oversight, and accountability structures that function when the AI is wrong. The question was never how to build AI that people trust. The question is how to build governance that makes trust warranted when it exists, and protective when it does not.',
  },
]

export default function Research() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(165deg, #0a1628 0%, #1a2d4a 40%, #0f3460 100%)', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 500 }}>Empirical Foundation</div>
          <h1 className='hero-title' style={{ fontSize: 44, fontWeight: 700, color: '#fff', margin: '0 0 20px', lineHeight: 1.15 }}>
            You cannot fix trust with a design change.
          </h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 680, lineHeight: 1.7, margin: '0 0 32px' }}>
            HCCS™ is grounded in original empirical research on how humans actually form trust in AI decision systems. The findings challenge the assumptions driving most AI adoption strategy, and explain why governance, not design, is the only durable solution.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/controls" style={{ background: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              See how this shapes the controls →
            </Link>
            <a href="/docs/HCCS-Case-Study-AI-Trust-Research.docx" download style={{ background: '#fff', color: '#0f172a', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Download case study (.docx)
            </a>
            <Link to="/assess" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
              Assess your organization
            </Link>
          </div>
        </div>
      </section>

      {/* Study overview */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '40px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 24, textAlign: 'center' }}>
            {[
              ['Study 1', 'April 2026'],
              ['95', 'Usable participants'],
              ['3', 'Experimental conditions'],
              ['68.5%', 'Variance explained by pre-existing traits'],
              ['0.01', 'Variance explained by design condition'],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#1e3a5f' }}>{n}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 4, lineHeight: 1.4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core findings */}
      <section style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 12, fontWeight: 600 }}>Four core findings</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', marginBottom: 8, lineHeight: 1.2 }}>What the data actually showed</h2>
          <p style={{ fontSize: 16, color: '#64748b', marginBottom: 48, lineHeight: 1.6 }}>
            A three-condition between-subjects experiment with 95 participants across a simulated veterinary AI triage scenario. IRB-approved, Evangel University.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {FINDINGS.map((f, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 32, borderLeft: `5px solid ${f.color}` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: '0 0 12px' }}>{f.title}</h3>
                    <p style={{ fontSize: 15, lineHeight: 1.7, color: '#475569', margin: 0 }}>{f.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust profiles */}
      <section style={{ background: '#0f172a', padding: '72px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 12, fontWeight: 600 }}>The trust profile framework</div>
            <h2 style={{ fontSize: 32, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>Trust is not a score. It is a profile.</h2>
            <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 620, margin: '0 auto', lineHeight: 1.6 }}>
              Four distinct profiles emerged from separating the trust and distrust subscales. Each carries different implications for decision quality, organizational risk, and governance requirements. A composite trust score of 48 tells you nothing about which profile someone belongs to.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 16 }}>
            {PROFILES.map(p => (
              <div key={p.name} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${p.border}20`, borderRadius: 14, padding: 28, borderTop: `4px solid ${p.color}` }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{p.name}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: p.color }}>{p.pct}</div>
                </div>
                <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.6, margin: '0 0 16px' }}>{p.desc}</p>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '12px 16px', marginBottom: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: p.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Risk profile</div>
                  <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>{p.risk}</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '12px 16px' }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#5b9bd5', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Governance implication</div>
                  <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>{p.implication}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age group finding */}
      <section style={{ padding: '72px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 12, fontWeight: 600 }}>Exploratory finding</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>Trust profiles shift with age and experience</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { age: '18-29', trust: '47.00', blind: '9%', note: 'Highest rates of both blind trust and skepticism. Trust disposition not yet stabilized.' },
              { age: '30-39', trust: '46.89', blind: '7%', note: 'Highest conflicted profile rate (30%). Using AI critically while maintaining awareness.' },
              { age: '40-49', trust: '48.11', blind: '21%', note: 'Largest trust/distrust gap (+1.32). Most resolved, experience-based confidence.' },
              { age: '50+', trust: '49.80', blind: '0%', note: 'Zero blind trusters. Highest distrust alongside highest trust. Genuine wisdom-based ambivalence.' },
            ].map(g => (
              <div key={g.age} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#1e3a5f', marginBottom: 4 }}>{g.age}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>Avg TrustScore: {g.trust}</div>
                <div style={{ fontSize: 13, color: '#993C1D', fontWeight: 600, marginBottom: 8 }}>Blind trust: {g.blind}</div>
                <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, margin: 0 }}>{g.note}</p>
              </div>
            ))}
          </div>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, borderLeft: '4px solid #2563eb' }}>
            <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.7, margin: 0 }}>
              <strong>Key insight:</strong> Age does not predict a trust score in a linear direction. It predicts a trust profile. The 50+ group has the numerically highest composite trust score, but also zero blind trusters and the most genuine ambivalence of any group. Organizations that interpret high average trust as a positive governance outcome may be misreading their most experienced employees.
            </p>
          </div>
        </div>
      </section>

      {/* Accountability section */}
      <section style={{ background: '#0f172a', padding: '72px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 12, fontWeight: 600 }}>The governance argument</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#fff', margin: '0 0 24px', lineHeight: 1.2 }}>
            Who is responsible when AI gets it wrong?
          </h2>
          <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.7, marginBottom: 20 }}>
            The research makes the accountability argument concrete. Blind trust is measurable and predictable. Nominal human oversight is demonstrably different from substantive human oversight. Organizations can no longer claim "a human was in the loop" as a defense when that human was operating on full deference, a profile this research shows is real, identifiable, and concentrated in specific demographic and experiential groups.
          </p>
          <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.7, marginBottom: 40 }}>
            Accountability must attach to the deployment decision, not the human reviewer's nominal presence. The organization that chose to deploy an AI system in a high-stakes decision context, without assessing workforce trust profiles, without monitoring for deference behavior, or distinguishing substantive from nominal oversight, owns the outcomes that system produces.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            {[
              ['Trust Profile Assessment', 'AG-011', 'Know your workforce trust profiles before deployment. Not after a liability event.'],
              ['Substantive Oversight', 'AG-012', 'Demonstrate that human review involves genuine judgment, not rubber-stamping.'],
              ['Deference Risk Monitoring', 'AG-013', 'Monitor for blind trust behavior in AI-assisted decision pipelines on an ongoing basis.'],
            ].map(([title, control, desc]) => (
              <div key={control} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#993C1D', letterSpacing: '0.08em', marginBottom: 8 }}>{control}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link to="/controls" style={{ background: '#2563eb', color: '#fff', padding: '14px 32px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }}>
              See the full AG control domain →
            </Link>
          </div>
        </div>
      </section>

      {/* Research arc */}
      <section style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 12, fontWeight: 600 }}>Research program</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 32 }}>This is Study 1 of three.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { n: '1', status: 'Complete', title: 'Single-session design interventions do not move trust.', desc: 'Trust is predicted by pre-existing individual traits. Trust is a profile, not a score. Agency-supportive design promotes deliberate judgment. Null result on the primary hypothesis with significant theoretical contribution.' },
              { n: '2', status: 'In progress: M.S. thesis, ASU', title: 'Trust profiles are stable across domains and individuals.', desc: 'Replication across healthcare, employment, legal, and financial decision scenarios. Profiles predict decision quality differentially. Blind trust predicts deference errors. AI experience is the primary driver of profile formation. Minimum N = 400.' },
              { n: '3', status: 'Planned', title: 'Organizational trust profile distribution predicts AI deployment outcomes.', desc: 'A validated trust profile assessment tool embedded in governance frameworks reduces deference errors and improves decision quality at the workforce level. HCCS-aligned governance structures are associated with healthier trust profiles over time.' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: 20, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: s.n === '1' ? '#0f172a' : '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: s.n === '1' ? '#fff' : '#94a3b8', flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: s.n === '1' ? '#2563eb' : '#94a3b8', marginBottom: 4 }}>{s.status}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>{s.title}</div>
                  <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#f1f5f9', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
            Does your organization know its trust profile?
          </h2>
          <p style={{ fontSize: 15, color: '#64748b', marginBottom: 28, lineHeight: 1.6 }}>
            The HCCS™ assessment evaluates your governance controls, including the three AG domain controls directly informed by this research.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/assess" style={{ background: '#2563eb', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              Start your assessment
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
