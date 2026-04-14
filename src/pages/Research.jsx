import { Link } from 'react-router-dom'

const FINDINGS = [
  {
    title: 'Trust is a trait, not a state.',
    icon: '◈',
    color: '#993C1D',
    body: 'Three experimental conditions (no recommendation, direct recommendation, and agency-supportive recommendation) produced no statistically significant difference in trust scores, F(2, 316) = 0.39, p = .676, \u03B7\u00B2 = .002. The experimental manipulation explained essentially nothing. An exploratory regression model found that pre-existing individual characteristics (AI usage frequency, decision confidence, follow-through intention) accounted for 25.8% of variance in TrustScore (adjusted R\u00B2 = .244). Condition assignment contributed minimally. Trust in AI tools is formed over time through accumulated experience. It is not meaningfully moved by a single design intervention.',
  },
  {
    title: 'Agency-supportive design changes behavior, not trust.',
    icon: '⬡',
    color: '#185FA5',
    body: 'Participants across all three conditions reported equivalent levels of felt agency (Man4: M = 5.44, 5.55, 5.53; F(2, 316) = 0.16, p = .854). Subjective perceptions of agency were powerfully correlated with trust (r = .731, p < .001), but those perceptions were not shaped by condition assignment. However, the agency-supportive condition did influence decision behavior: 54.5% of Condition 3 participants chose the moderate-urgency response, compared to 38.3% and 41.0% in Conditions 1 and 2. Agency-supportive design may promote more calibrated decision-making even without moving trust scores.',
  },
  {
    title: 'AI experience is the strongest predictor of trust.',
    icon: '◉',
    color: '#534AB7',
    body: 'Daily AI users (n = 125) produced the highest mean trust scores (M = 51.95, SD = 9.85), while participants who never use AI (n = 11) produced the lowest (M = 39.55, SD = 11.60). The correlation between AI usage frequency and TrustScore was significant, r = \u2212.27, p < .001. This pattern is consistent with algorithm appreciation rather than algorithm aversion: people with more accumulated AI experience approached the tool with more confidence, not less. Trust is built through repeated exposure and demonstrated accuracy, not through design features or framing.',
  },
  {
    title: 'Accountability cannot be delegated to design.',
    icon: '⬢',
    color: '#0F6E56',
    body: 'If trust in AI cannot be manufactured through design, then governance frameworks that rely on transparency features, explainability interfaces, or agency-supportive framing to produce warranted trust are insufficient. Warranted trust must be earned through demonstrated accuracy over time, meaningful human oversight, and accountability structures that function when the AI is wrong. The question was never how to build AI that people trust. The question is how to build governance that makes trust warranted when it exists, and protective when it does not.',
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

      {/* Study overview stats */}
      <section style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '40px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24, textAlign: 'center' }}>
            {[
              ['319', 'Participants'],
              ['3', 'Conditions'],
              ['p = .676', 'Non-significant\nmain effect'],
              ['.002', '\u03B7\u00B2 effect size'],
              ['25.8%', 'Variance explained\nby individual traits'],
              ['\u03B1 = .782', 'Scale reliability'],
            ].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: 26, fontWeight: 700, color: '#1e3a5f' }}>{n}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Study design */}
      <section style={{ padding: '48px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 12, fontWeight: 600 }}>Study design</div>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
            A three-condition between-subjects experiment conducted March 15-30, 2026. Participants (N = 319, after exclusion of 79 incomplete and 82 suspected automated responses from 480 raw submissions) were randomly assigned to evaluate a simulated veterinary AI triage scenario under one of three conditions: no AI recommendation, direct AI recommendation, or agency-supportive AI recommendation (participant chooses whether to view).
          </p>
          <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
            Trust was measured via a validated 6-item scale adapted from Jian et al. (2000), with independent trust and distrust subscales (\u03B1 = .782). IRB-approved, Evangel University. Faculty supervisor: Dr. Heather Kelly.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { cond: 'Condition 1', label: 'No recommendation', n: 107, m: '48.07', sd: '10.22' },
              { cond: 'Condition 2', label: 'Direct recommendation', n: 100, m: '49.20', sd: '10.00' },
              { cond: 'Condition 3', label: 'Agency-supportive', n: 112, m: '49.07', sd: '10.40' },
            ].map(c => (
              <div key={c.cond} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#2563eb', marginBottom: 4 }}>{c.cond}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>n = {c.n} | M = {c.m} | SD = {c.sd}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 12 }}>
            Sample: 47.6% female, 49.5% male. M age = 32.1 years (SD = 10.7, range 18-81). 32.6% bachelor's degree, 22.3% some college. 40.4% current dog owners.
          </p>
        </div>
      </section>

      {/* Core findings */}
      <section style={{ padding: '72px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#2563eb', marginBottom: 12, fontWeight: 600 }}>Core findings</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0f172a', marginBottom: 8, lineHeight: 1.2 }}>What the data showed</h2>
          <p style={{ fontSize: 16, color: '#64748b', marginBottom: 48, lineHeight: 1.6 }}>
            The ANOVA did not reach significance: F(2, 316) = 0.39, p = .676, {'\u03B7\u00B2'} = .002. Levene's test confirmed homogeneity of variance (W = 0.37, p = .689). Post-hoc Tukey HSD and non-parametric Kruskal-Wallis (H(2) = 0.93, p = .628) confirmed the null result.
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

      {/* Exploratory findings */}
      <section style={{ background: '#fff', padding: '72px 24px', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.15em', fontSize: 12, textTransform: 'uppercase', color: '#993C1D', marginBottom: 12, fontWeight: 600 }}>Exploratory findings</div>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 32 }}>What predicts trust when design does not</h2>

          {/* AI Usage */}
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>AI usage frequency</h3>
          <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
            The strongest individual-level predictor. More frequent AI use was associated with higher trust (r = {'\u2212'}.27, p {'<'} .001), consistent with algorithm appreciation rather than algorithm aversion.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 32 }}>
            {[
              { freq: 'Daily', n: 125, m: '51.95' },
              { freq: '1-3x/week', n: 107, m: '47.63' },
              { freq: '1-3x/month', n: 56, m: '46.46' },
              { freq: 'Less than monthly', n: 20, m: '46.60' },
              { freq: 'Never', n: 11, m: '39.55' },
            ].map(g => (
              <div key={g.freq} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#1e3a5f' }}>{g.m}</div>
                <div style={{ fontSize: 13, color: '#475569', fontWeight: 600, marginTop: 4 }}>{g.freq}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>n = {g.n}</div>
              </div>
            ))}
          </div>

          {/* Domain proximity */}
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Domain proximity</h3>
          <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
            Emotional and experiential proximity to the scenario was a more powerful determinant of trust than the experimental manipulation. Dog ownership status was significantly associated with TrustScore, F(4, 309) = 8.17, p {'<'} .001.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 32 }}>
            {[
              { status: 'Currently own a dog', n: 129, m: '52.05', sd: '9.35' },
              { status: 'Never owned, but cared for one', n: 43, m: '49.74', sd: '8.48' },
              { status: 'Previously owned', n: 114, m: '46.12', sd: '10.26' },
              { status: 'Never owned or cared for', n: 28, m: '43.57', sd: '9.12' },
            ].map(g => (
              <div key={g.status} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 16 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#1e3a5f' }}>{g.m}</div>
                <div style={{ fontSize: 13, color: '#475569', fontWeight: 600, marginTop: 4 }}>{g.status}</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>n = {g.n} | SD = {g.sd}</div>
              </div>
            ))}
          </div>

          {/* Manipulation check insight */}
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>The manipulation check paradox</h3>
          <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, marginBottom: 16 }}>
            All four manipulation check items were strongly correlated with TrustScore (r = .600 to .739, all p {'<'} .001). Subjective perceptions of agency, clarity, and helpfulness powerfully predicted trust. But those perceptions were not shaped by condition assignment. Participants experienced equivalent felt agency regardless of condition (p = .854).
          </p>
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, borderLeft: '4px solid #534AB7', marginBottom: 32 }}>
            <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.7, margin: 0 }}>
              <strong>Translation:</strong> People who feel they have agency trust the tool more. But you cannot create that feeling through a design change. The feeling of agency is something the person brings with them, not something the interface provides.
            </p>
          </div>

          {/* Gender and age */}
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Demographics</h3>
          <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, marginBottom: 12 }}>
            Gender did not significantly predict trust (t(308) = 0.86, p = .390, d = .10). However, gender differences appeared in decision behavior: female participants more frequently chose higher-urgency responses (26.3% "call a vet now" vs. 16.5% for males), suggesting differential urgency calibration.
          </p>
          <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.7, marginBottom: 0 }}>
            Age did not predict TrustScore (r = .037, p = .512). A one-way ANOVA by age group was non-significant, F(4, 314) = 2.06, p = .086. No meaningful age-related patterns were observed.
          </p>
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
            The research makes the accountability argument concrete. If trust cannot be moved by design, then organizations cannot claim that a well-designed interface produces warranted trust. If AI experience is the primary driver of trust, then organizations deploying AI tools to novice users should expect uncalibrated trust responses. If domain proximity drives trust independently of tool quality, then high-stakes domains will produce trust patterns unrelated to AI accuracy.
          </p>
          <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.7, marginBottom: 40 }}>
            Accountability must attach to the deployment decision, not to the human reviewer's nominal presence. The organization that chose to deploy an AI system in a consequential decision context, without assessing workforce trust profiles, without monitoring for deference behavior, or distinguishing substantive from nominal oversight, owns the outcomes that system produces.
          </p>
          <div className='grid-3' style={{ gap: 16 }}>
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
              { n: '1', status: 'Complete (N = 319)', title: 'Single-session design interventions do not move trust.', desc: 'Trust is predicted by pre-existing individual characteristics (AI experience, domain proximity, decision confidence). Trust is not moved by recommendation framing. Agency-supportive design changes decision behavior without changing trust. Null result on the primary hypothesis with significant theoretical and practical contribution.' },
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
