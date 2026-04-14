import { useState } from 'react'
import { Link } from 'react-router-dom'

const DOMAINS = {
  employment: {
    name: 'Employment & Workforce',
    color: '#185FA5',
    status: 'Active',
    subtitle: 'Every other consequential business decision has controls. Hiring doesn\'t. Here\'s what that costs, and what governance returns.',
    gapRow: { control: 'Hiring & compensation', governed: 'Nothing equivalent', consequence: 'Largest ungoverned risk surface' },
    closingLine: 'HCCS\u2122 closes this gap. It is the SOX equivalent for human capital decisions.',
    sliderA: { label: 'Annual hires', min: 10, max: 500, default: 50, unit: '' },
    sliderB: { label: 'Average salary', min: 50000, max: 300000, step: 5000, default: 120000, unit: '$', format: true },
    risks: [
      { label: 'Bad hire costs (15% rate x 2x salary)', calc: (a, b) => Math.round(a * 0.15 * b * 2) },
      { label: 'Litigation exposure (2% incident rate)', calc: (a, b) => Math.round(a * 0.02 * 100000) },
      { label: 'Early turnover (20% rate x 75% salary)', calc: (a, b) => Math.round(a * 0.20 * b * 0.75) },
    ],
    savings: [
      { label: 'Better hires (30% reduction in bad hires)', pct: 0.30, riskIdx: 0 },
      { label: 'Defensible decisions (60% lower litigation)', pct: 0.60, riskIdx: 1 },
      { label: 'Retention improvement (20% better)', pct: 0.20, riskIdx: 2 },
    ],
    evidence: [
      { category: 'Bad hire costs avoided', items: [
        { label: 'Average cost of a bad hire', value: '1.5-3x annual salary', source: 'SHRM, DOL' },
        { label: 'Mid-level bad hire ($120K salary)', value: '$180,000 - $360,000', source: 'Direct + indirect costs' },
        { label: 'Structured hiring reduces bad hires by', value: '25-40%', source: 'Schmidt & Hunter, 1998' },
      ]},
      { category: 'Litigation exposure reduced', items: [
        { label: 'Average discrimination settlement', value: '$40,000 - $165,000', source: 'EEOC data' },
        { label: 'OFCCP audit cost (legal + remediation)', value: '$100K - $1M+', source: 'Compliance industry data' },
        { label: 'Documented processes lower litigation', value: '60%', source: 'Cornell ILR, 2019' },
      ]},
      { category: 'Regulatory compliance', items: [
        { label: 'NYC LL144 violation (per day)', value: '$500 - $1,500', source: 'NYC Admin Code' },
        { label: 'EU AI Act fines (high-risk)', value: 'Up to 3% global revenue', source: 'EU AI Act, 2024' },
        { label: 'EEOC charges filed annually (US)', value: '70,000+', source: 'EEOC FY2023' },
      ]},
    ],
    costs: [
      { icon: '\u2696\uFE0F', title: 'Legal exposure', cost: '$40K - $1M+', desc: 'Without documented criteria and decision rationale, every hiring decision is a potential liability.' },
      { icon: '\uD83D\uDD0D', title: 'Regulatory risk', cost: 'Growing daily', desc: 'NYC LL144, EU AI Act, Illinois BIPA, Colorado SB 21-169. AI hiring legislation is accelerating.' },
      { icon: '\uD83D\uDCC9', title: 'Bad hire costs', cost: '$180K - $750K each', desc: 'Unstructured hiring produces worse outcomes at every level. Every meta-analysis confirms this.' },
      { icon: '\uD83D\uDEAA', title: 'Turnover costs', cost: '50-200% of salary', desc: 'Poor role definition leads to misaligned expectations. Misaligned expectations lead to early departure.' },
    ],
    stakeholders: [
      { who: 'CFO / Finance', pitch: 'This is a cost-avoidance investment. Ungoverned decisions carry measurable exposure. Governance produces documented, defensible savings.' },
      { who: 'CHRO / People', pitch: 'HCCS gives us a framework to prove our decision practices are structured, fair, and auditable. That matters when someone files a charge.' },
      { who: 'General Counsel', pitch: 'Documented governance controls are the single most effective litigation defense. You cannot defend what you cannot reconstruct.' },
    ],
  },
  healthcare: {
    name: 'Healthcare',
    color: '#0F6E56',
    status: 'Planned',
    subtitle: 'AI-assisted clinical decisions carry patient safety, liability, and regulatory consequences. Governance is not optional.',
    gapRow: { control: 'Clinical AI decisions', governed: 'Fragmented', consequence: 'Patient harm, malpractice, regulatory action' },
    closingLine: 'HCCS\u2122 provides the decision governance layer that HIPAA, FDA, and clinical quality frameworks do not address.',
    sliderA: { label: 'AI-assisted decisions / month', min: 100, max: 10000, default: 1000, unit: '' },
    sliderB: { label: 'Average malpractice claim cost', min: 100000, max: 2000000, step: 50000, default: 500000, unit: '$', format: true },
    risks: [
      { label: 'Misdiagnosis from unchecked AI (1% error rate)', calc: (a, b) => Math.round(a * 12 * 0.01 * b * 0.1) },
      { label: 'Malpractice exposure (0.5% claim rate)', calc: (a, b) => Math.round(a * 12 * 0.005 * b * 0.2) },
      { label: 'Regulatory penalties (FDA, CMS)', calc: (a, b) => Math.round(a * 12 * 0.001 * 50000) },
    ],
    savings: [
      { label: 'Substantive oversight reduces errors (40%)', pct: 0.40, riskIdx: 0 },
      { label: 'Documented decisions lower claims (50%)', pct: 0.50, riskIdx: 1 },
      { label: 'Compliance avoids penalties (80%)', pct: 0.80, riskIdx: 2 },
    ],
    evidence: [
      { category: 'Patient safety', items: [
        { label: 'Diagnostic errors per year (US)', value: '12 million', source: 'BMJ Quality & Safety, 2014' },
        { label: 'AI diagnostic tools error rate', value: '5-15% depending on context', source: 'Nature Medicine, 2023' },
        { label: 'Clinician override of correct AI recommendation', value: '30-40%', source: 'Algorithm aversion research' },
      ]},
      { category: 'Liability', items: [
        { label: 'Average malpractice claim (US)', value: '$242,000 - $500,000+', source: 'Diederich Healthcare' },
        { label: 'AI-involved malpractice (emerging)', value: 'No settled case law yet', source: 'First cases in litigation' },
        { label: 'Who is liable when AI recommends wrong?', value: 'Deploying organization', source: 'Emerging legal consensus' },
      ]},
    ],
    costs: [
      { icon: '\u2695\uFE0F', title: 'Patient harm', cost: 'Incalculable', desc: 'AI triage, diagnostic support, and treatment recommendations affect patient outcomes. Ungoverned tools produce ungoverned outcomes.' },
      { icon: '\u2696\uFE0F', title: 'Malpractice liability', cost: '$250K - $2M+ per case', desc: 'When AI contributes to a clinical decision, accountability must be documented and demonstrable.' },
      { icon: '\uD83D\uDCCB', title: 'Regulatory action', cost: 'CMS/FDA enforcement', desc: 'FDA oversight of clinical AI is expanding. Organizations without governance will be non-compliant by default.' },
      { icon: '\uD83E\uDD16', title: 'Automation bias', cost: 'Systemic risk', desc: 'Clinicians who defer to AI without critical evaluation create systemic patient safety risk.' },
    ],
    stakeholders: [
      { who: 'CMO / Medical Director', pitch: 'Governance distinguishes responsible AI adoption from liability exposure. Document oversight quality, not just tool accuracy.' },
      { who: 'Chief Compliance Officer', pitch: 'FDA and CMS oversight of clinical AI is expanding. Proactive governance is less expensive than reactive compliance.' },
      { who: 'General Counsel', pitch: 'The question in court will be: did the organization verify that the human reviewing the AI recommendation actually exercised judgment?' },
    ],
  },
  'financial-services': {
    name: 'Financial Services',
    color: '#534AB7',
    status: 'Planned',
    subtitle: 'Credit, lending, and underwriting decisions carry fair lending, disparate impact, and fiduciary consequences.',
    gapRow: { control: 'AI-assisted credit/lending', governed: 'Partial (ECOA, FCRA)', consequence: 'Fair lending violations, disparate impact' },
    closingLine: 'ECOA and FCRA govern data use. HCCS\u2122 governs the decision process itself.',
    sliderA: { label: 'AI-assisted decisions / month', min: 500, max: 50000, default: 5000, unit: '' },
    sliderB: { label: 'Average regulatory penalty', min: 500000, max: 50000000, step: 500000, default: 5000000, unit: '$', format: true },
    risks: [
      { label: 'Disparate impact claims (0.1% of decisions)', calc: (a, b) => Math.round(a * 12 * 0.001 * 100000) },
      { label: 'Regulatory enforcement action', calc: (a, b) => Math.round(b * 0.15) },
      { label: 'Reputational damage (customer attrition)', calc: (a, b) => Math.round(a * 12 * 0.005 * 500) },
    ],
    savings: [
      { label: 'Bias detection reduces claims (60%)', pct: 0.60, riskIdx: 0 },
      { label: 'Governance reduces enforcement risk (50%)', pct: 0.50, riskIdx: 1 },
      { label: 'Trust retention improves (30%)', pct: 0.30, riskIdx: 2 },
    ],
    evidence: [
      { category: 'Fair lending risk', items: [
        { label: 'CFPB enforcement actions (2023)', value: '$3.07 billion in relief', source: 'CFPB Annual Report' },
        { label: 'AI lending bias documented', value: 'Multiple peer-reviewed studies', source: 'Bartlett et al., 2022' },
        { label: 'Explainability requirement gap', value: 'Adverse action notices often insufficient for AI', source: 'CFPB guidance, 2022' },
      ]},
    ],
    costs: [
      { icon: '\uD83D\uDCB0', title: 'Fair lending violations', cost: '$1M - $100M+', desc: 'CFPB enforcement actions for algorithmic bias in lending are accelerating.' },
      { icon: '\u2696\uFE0F', title: 'Disparate impact liability', cost: 'Class action scale', desc: 'AI models that produce disparate outcomes across protected classes create systemic legal exposure.' },
      { icon: '\uD83D\uDCC4', title: 'Explainability failures', cost: 'Per-violation fines', desc: 'ECOA requires adverse action explanations. Most AI models cannot produce them at the specificity regulators require.' },
      { icon: '\uD83C\uDFE6', title: 'Charter/license risk', cost: 'Existential', desc: 'Repeated fair lending violations can result in consent orders, charter restrictions, or acquisition by regulators.' },
    ],
    stakeholders: [
      { who: 'Chief Risk Officer', pitch: 'AI model risk management governs model accuracy. Decision governance controls what happens after the model produces an output.' },
      { who: 'Chief Compliance Officer', pitch: 'CFPB, OCC, and FDIC are all increasing scrutiny of AI in lending. Governance documentation is the evidence base for examinations.' },
      { who: 'Board Risk Committee', pitch: 'Ungoverned AI-assisted lending decisions represent a concentration of unmonitored risk that SR 11-7 was designed to prevent.' },
    ],
  },
}

// Add stub domains
const STUBS = {
  'criminal-justice': { name: 'Criminal Justice', color: '#993C1D' },
  'education': { name: 'Education', color: '#854F0B' },
  'insurance': { name: 'Insurance', color: '#993556' },
  'social-services': { name: 'Social Services', color: '#185FA5' },
}

const COMPARISON = [
  { control: 'Financial decisions', governed: 'SOX (2002)', consequence: 'Criminal penalties, personal liability' },
  { control: 'Data handling', governed: 'GDPR, CCPA', consequence: 'Fines up to 4% global revenue' },
  { control: 'AI systems', governed: 'EU AI Act (2024)', consequence: 'Fines up to 3% global revenue' },
]

const fmt = n => '$' + n.toLocaleString()

export default function BusinessCase() {
  const [domain, setDomain] = useState('employment')
  const d = DOMAINS[domain]
  const isStub = !d

  const [sliderA, setSliderA] = useState(50)
  const [sliderB, setSliderB] = useState(120000)

  const switchDomain = (key) => {
    setDomain(key)
    const dd = DOMAINS[key]
    if (dd) {
      setSliderA(dd.sliderA.default)
      setSliderB(dd.sliderB.default)
    }
  }

  const riskVals = d ? d.risks.map(r => r.calc(sliderA, sliderB)) : []
  const savingsVals = d ? d.savings.map(s => Math.round(riskVals[s.riskIdx] * s.pct)) : []
  const totalRisk = riskVals.reduce((a, b) => a + b, 0)
  const totalSavings = savingsVals.reduce((a, b) => a + b, 0)

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a, #0f3460)', padding: '80px 24px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 500 }}>HCCS™ Business Case</div>
          <h1 className='hero-title' style={{ fontSize: 44, fontWeight: 700, color: '#fff', margin: '0 0 20px', lineHeight: 1.15 }}>The ROI of decision governance</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto 32px', lineHeight: 1.65 }}>
            Choose a domain to see the governance gap, risk exposure, and what governance returns.
          </p>
          {/* Domain selector */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(DOMAINS).map(([key, val]) => (
              <button key={key} onClick={() => switchDomain(key)}
                style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', border: domain === key ? `2px solid ${val.color}` : '2px solid rgba(255,255,255,0.15)',
                  background: domain === key ? val.color : 'transparent', color: '#fff', transition: 'all 0.2s' }}>
                {val.name}
              </button>
            ))}
            {Object.entries(STUBS).map(([key, val]) => (
              <button key={key} disabled
                style={{ padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: 'default', border: '2px solid rgba(255,255,255,0.08)',
                  background: 'transparent', color: '#475569', opacity: 0.6 }}>
                {val.name} <span style={{ fontSize: 10 }}>soon</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {d && (
        <>
          {/* Domain subtitle */}
          <section style={{ background: d.color + '10', padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
              <span style={{ background: d.color + '20', color: d.color, padding: '4px 12px', borderRadius: 10, fontSize: 12, fontWeight: 600 }}>{d.name} {d.status !== 'Active' && '(Coming soon)'}</span>
              <p style={{ fontSize: 15, color: '#475569', marginTop: 8, lineHeight: 1.6 }}>{d.subtitle}</p>
            </div>
          </section>

          {/* Governance gap */}
          <section style={{ padding: '48px 24px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>The governance gap</h2>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#0f172a' }}>
                      {['Decision type', 'Governance standard', 'Non-compliance consequence'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#fff' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...COMPARISON, d.gapRow].map((r, i) => {
                      const isGap = r.governed === 'Nothing equivalent' || r.governed === 'Fragmented' || r.governed?.startsWith('Partial')
                      return (
                        <tr key={r.control} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{r.control}</td>
                          <td style={{ padding: '12px 16px', fontSize: 14, color: isGap ? '#dc2626' : '#475569', fontWeight: isGap ? 700 : 400 }}>{r.governed}</td>
                          <td style={{ padding: '12px 16px', fontSize: 14, color: isGap ? '#dc2626' : '#475569', fontWeight: isGap ? 700 : 400 }}>{r.consequence}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <p style={{ fontSize: 14, color: '#64748b', marginTop: 12 }}>{d.closingLine}</p>
            </div>
          </section>

          {/* ROI Calculator */}
          <section style={{ background: '#0f172a', padding: '60px 24px' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 8 }}>Calculate your risk exposure</h2>
              <p style={{ fontSize: 15, color: '#64748b', textAlign: 'center', marginBottom: 32 }}>Adjust the sliders to match your organization</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>{d.sliderA.label}: <strong style={{ color: '#fff' }}>{d.sliderA.format ? fmt(sliderA) : sliderA.toLocaleString()}</strong></label>
                  <input type="range" min={d.sliderA.min} max={d.sliderA.max} step={d.sliderA.step || 1} aria-label={d.sliderA.label} value={sliderA} onChange={e => setSliderA(+e.target.value)} style={{ width: '100%' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>{d.sliderB.label}: <strong style={{ color: '#fff' }}>{d.sliderB.format ? fmt(sliderB) : sliderB.toLocaleString()}</strong></label>
                  <input type="range" min={d.sliderB.min} max={d.sliderB.max} step={d.sliderB.step || 1} aria-label={d.sliderB.label} value={sliderB} onChange={e => setSliderB(+e.target.value)} style={{ width: '100%' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 12, padding: 24 }}>
                  <div style={{ fontSize: 13, color: '#fca5a5', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Annual risk exposure</div>
                  {d.risks.map((r, i) => (
                    <div key={i} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 13, color: '#94a3b8' }}>{r.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#fca5a5' }}>{fmt(riskVals[i])}</div>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid rgba(220,38,38,0.2)', paddingTop: 12 }}>
                    <div style={{ fontSize: 13, color: '#fca5a5' }}>Total annual risk</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: '#dc2626' }}>{fmt(totalRisk)}</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: 12, padding: 24 }}>
                  <div style={{ fontSize: 13, color: '#6ee7b7', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estimated savings with governance</div>
                  {d.savings.map((s, i) => (
                    <div key={i} style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: 13, color: '#94a3b8' }}>{s.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 700, color: '#6ee7b7' }}>{fmt(savingsVals[i])}</div>
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid rgba(5,150,105,0.2)', paddingTop: 12 }}>
                    <div style={{ fontSize: 13, color: '#6ee7b7' }}>Estimated annual savings</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: '#059669' }}>{fmt(totalSavings)}</div>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <div style={{ fontSize: 14, color: '#64748b' }}>HCCS™ Self-Assessment: $500 | ROI: <strong style={{ color: '#059669' }}>{Math.round(totalSavings / 500)}x return</strong></div>
              </div>
            </div>
          </section>

          {/* Evidence */}
          {d.evidence && d.evidence.length > 0 && (
            <section style={{ padding: '48px 24px' }}>
              <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>The evidence</h2>
                {d.evidence.map(cat => (
                  <div key={cat.category} style={{ marginBottom: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: d.color, marginBottom: 12 }}>{cat.category}</h3>
                    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, overflow: 'hidden' }}>
                      {cat.items.map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: i < cat.items.length - 1 ? '1px solid #f1f5f9' : 'none', flexWrap: 'wrap', gap: 8 }}>
                          <div style={{ fontSize: 14, color: '#334155' }}>{item.label}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <strong style={{ fontSize: 14, color: '#0f172a' }}>{item.value}</strong>
                            <span style={{ fontSize: 11, color: '#94a3b8' }}>{item.source}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Cost of inaction */}
          <section style={{ padding: '48px 24px', background: '#fff', borderTop: '1px solid #e2e8f0' }}>
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>The cost of inaction</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                {d.costs.map(c => (
                  <div key={c.title} style={{ border: '1px solid #e2e8f0', borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{c.title}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#dc2626', marginBottom: 8 }}>{c.cost}</div>
                    <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stakeholder pitches */}
          {d.stakeholders && (
            <section style={{ padding: '48px 24px', background: '#f8fafc' }}>
              <div style={{ maxWidth: 800, margin: '0 auto' }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>Stakeholder talking points</h2>
                {d.stakeholders.map(s => (
                  <div key={s.who} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, marginBottom: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: d.color, marginBottom: 6 }}>{s.who}</div>
                    <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6, margin: 0 }}>{s.pitch}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* CTA */}
      <section style={{ background: '#059669', padding: '48px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#6ee7b7', marginBottom: 4 }}>Need to get this approved?</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>Build a business case for your leadership</div>
            <div style={{ fontSize: 14, color: '#d1fae5', marginTop: 4 }}>ROI calculator, cost of inaction data, and stakeholder-ready talking points.</div>
          </div>
          <Link to="/assess" style={{ background: '#fff', color: '#059669', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            Assess your governance →
          </Link>
        </div>
      </section>
    </div>
  )
}
