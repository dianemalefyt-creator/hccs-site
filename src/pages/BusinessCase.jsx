import { useState } from 'react'
import { Link } from 'react-router-dom'

const ROI_ITEMS = [
  { category: 'Bad hire costs avoided', items: [
    { label: 'Average cost of a bad hire', value: '1.5-3x annual salary', source: 'SHRM, DOL' },
    { label: 'Mid-level bad hire ($120K salary)', value: '$180,000 - $360,000', source: 'Direct + indirect costs' },
    { label: 'Executive bad hire ($250K salary)', value: '$375,000 - $750,000', source: 'Leadership disruption multiplier' },
    { label: 'Structured hiring reduces bad hires by', value: '25-40%', source: 'Schmidt & Hunter, 1998; Kuncel et al., 2013' },
  ]},
  { category: 'Litigation exposure reduced', items: [
    { label: 'Average employment discrimination settlement', value: '$40,000 - $165,000', source: 'EEOC data' },
    { label: 'Average jury verdict (discrimination)', value: '$200,000 - $500,000+', source: 'Jury Verdict Research' },
    { label: 'OFCCP audit cost (legal + remediation)', value: '$100,000 - $1,000,000+', source: 'Compliance industry data' },
    { label: 'Organizations with documented processes', value: '60% lower litigation risk', source: 'Cornell ILR, 2019' },
  ]},
  { category: 'Regulatory compliance value', items: [
    { label: 'NYC LL144 violation (per violation, per day)', value: '$500 - $1,500', source: 'NYC Admin Code' },
    { label: 'EU AI Act fines (high-risk non-compliance)', value: 'Up to 3% global revenue', source: 'EU AI Act, 2024' },
    { label: 'EEOC charges filed annually (US)', value: '70,000+', source: 'EEOC FY2023' },
    { label: 'HCCS exceeds requirements of', value: 'Title VII, EU AI Act, LL144, OFCCP', source: 'HCCS-1.0 Appendix D' },
  ]},
  { category: 'Operational efficiency gains', items: [
    { label: 'Time-to-fill reduction with structured process', value: '15-25%', source: 'LinkedIn Talent Solutions' },
    { label: 'Interviewer time saved per hire (fewer re-dos)', value: '8-12 hours', source: 'Glassdoor Economic Research' },
    { label: 'Offer acceptance rate improvement', value: '10-20%', source: 'Structured process = better candidate experience' },
    { label: 'First-year retention improvement', value: '15-30%', source: 'Structured selection meta-analysis' },
  ]},
]

const COST_OF_INACTION = [
  { icon: '⚖️', title: 'Legal exposure', cost: '$40K - $1M+ per incident', desc: 'Without documented criteria, decision rationale, and consistent processes, every hiring decision is a potential liability. You cannot defend what you cannot reconstruct.' },
  { icon: '🔍', title: 'Regulatory risk', cost: 'Growing daily', desc: 'NYC LL144, EU AI Act, Illinois BIPA, Maryland HB 1202, Colorado SB 21-169. AI hiring legislation is accelerating. Organizations without governance will be non-compliant by default.' },
  { icon: '📉', title: 'Bad hire costs', cost: '$180K - $750K per occurrence', desc: 'Unstructured hiring produces worse outcomes at every level. The research is not ambiguous. Structured methods outperform intuition in every meta-analysis ever conducted.' },
  { icon: '🚪', title: 'Turnover costs', cost: '50-200% of annual salary', desc: 'Poor role definition leads to misaligned expectations. Misaligned expectations lead to early departure. HCCS RG controls prevent this at the source.' },
  { icon: '🏢', title: 'Reputation damage', cost: 'Unquantifiable', desc: 'Glassdoor reviews, social media, and investigative journalism. One viral hiring horror story costs more than a decade of governance investment.' },
  { icon: '🤖', title: 'AI accountability gap', cost: 'Your next audit', desc: 'If you cannot explain in plain language how your AI screening tools work, you are already non-compliant with emerging regulations. "Vendor proprietary" is not a defense.' },
]

const COMPARISON = [
  { control: 'Financial decisions', governed: 'SOX (2002)', consequence: 'Criminal penalties, personal liability' },
  { control: 'Data handling', governed: 'GDPR, CCPA', consequence: 'Fines up to 4% global revenue' },
  { control: 'AI systems', governed: 'EU AI Act (2024)', consequence: 'Fines up to 3% global revenue' },
  { control: 'Hiring & compensation', governed: 'Nothing equivalent', consequence: 'Largest ungoverned risk surface' },
]

export default function BusinessCase() {
  const [hires, setHires] = useState(50)
  const [avgSalary, setAvgSalary] = useState(120000)

  const badHireCost = Math.round(hires * 0.15 * avgSalary * 2)
  const structuredSavings = Math.round(badHireCost * 0.30)
  const litigationRisk = Math.round(hires * 0.02 * 100000)
  const governanceSavings = Math.round(litigationRisk * 0.60)
  const turnoverCost = Math.round(hires * 0.20 * avgSalary * 0.75)
  const retentionSavings = Math.round(turnoverCost * 0.20)
  const totalRisk = badHireCost + litigationRisk + turnoverCost
  const totalSavings = structuredSavings + governanceSavings + retentionSavings
  const fmt = n => '$' + n.toLocaleString()

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a, #0f3460)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 500 }}>HCCS™ Business Case</div>
          <h1 className='hero-title' style={{ fontSize: 44, fontWeight: 700, color: '#fff', margin: '0 0 20px', lineHeight: 1.15 }}>The ROI of hiring governance</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 600, margin: '0 auto', lineHeight: 1.65 }}>
            Every other consequential business decision has controls. Hiring doesn't. Here's what that costs, and what governance returns.
          </p>
        </div>
      </section>

      {/* The gap */}
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
                {COMPARISON.map((r, i) => (
                  <tr key={r.control} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{r.control}</td>
                    <td style={{ padding: '12px 16px', fontSize: 14, color: r.governed === 'Nothing equivalent' ? '#dc2626' : '#475569', fontWeight: r.governed === 'Nothing equivalent' ? 700 : 400 }}>{r.governed}</td>
                    <td style={{ padding: '12px 16px', fontSize: 14, color: r.governed === 'Nothing equivalent' ? '#dc2626' : '#475569', fontWeight: r.governed === 'Nothing equivalent' ? 700 : 400 }}>{r.consequence}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 12 }}>HCCS™ closes this gap. It is the SOX equivalent for human capital decisions.</p>
        </div>
      </section>

      {/* ROI Calculator */}
      <section style={{ background: '#0f172a', padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 8 }}>Calculate your risk exposure</h2>
          <p style={{ fontSize: 15, color: '#64748b', textAlign: 'center', marginBottom: 32 }}>Adjust the sliders to match your organization</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Annual hires: <strong style={{ color: '#fff' }}>{hires}</strong></label>
              <input type="range" min="10" max="500" value={hires} onChange={e => setHires(+e.target.value)} style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>Average salary: <strong style={{ color: '#fff' }}>{fmt(avgSalary)}</strong></label>
              <input type="range" min="50000" max="300000" step="5000" value={avgSalary} onChange={e => setAvgSalary(+e.target.value)} style={{ width: '100%' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, color: '#fca5a5', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Annual risk exposure (without governance)</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>Bad hire costs (15% rate x 2x salary)</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#fca5a5' }}>{fmt(badHireCost)}</div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>Litigation exposure (2% incident rate)</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#fca5a5' }}>{fmt(litigationRisk)}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>Early turnover (20% rate x 75% salary)</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#fca5a5' }}>{fmt(turnoverCost)}</div>
              </div>
              <div style={{ borderTop: '1px solid rgba(220,38,38,0.2)', paddingTop: 12 }}>
                <div style={{ fontSize: 13, color: '#fca5a5' }}>Total annual risk</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#dc2626' }}>{fmt(totalRisk)}</div>
              </div>
            </div>

            <div style={{ background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: 12, padding: 24 }}>
              <div style={{ fontSize: 13, color: '#6ee7b7', fontWeight: 600, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estimated savings (with HCCS™ governance)</div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>Better hires (30% reduction in bad hires)</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#6ee7b7' }}>{fmt(structuredSavings)}</div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>Defensible decisions (60% lower litigation)</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#6ee7b7' }}>{fmt(governanceSavings)}</div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: '#94a3b8' }}>Retention improvement (20% better)</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#6ee7b7' }}>{fmt(retentionSavings)}</div>
              </div>
              <div style={{ borderTop: '1px solid rgba(5,150,105,0.2)', paddingTop: 12 }}>
                <div style={{ fontSize: 13, color: '#6ee7b7' }}>Estimated annual savings</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#059669' }}>{fmt(totalSavings)}</div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <div style={{ fontSize: 14, color: '#64748b' }}>HCCS™ Self-Assessment: $149 | ROI: <strong style={{ color: '#059669' }}>{Math.round(totalSavings / 149)}x return</strong></div>
          </div>
        </div>
      </section>

      {/* ROI by category */}
      <section style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>The evidence</h2>
          {ROI_ITEMS.map(cat => (
            <div key={cat.category} style={{ marginBottom: 24 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>{cat.category}</h3>
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
                {cat.items.map((item, i) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: i < cat.items.length - 1 ? '1px solid #f1f5f9' : 'none', background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <div>
                      <div style={{ fontSize: 14, color: '#334155' }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>{item.source}</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', textAlign: 'right', whiteSpace: 'nowrap' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cost of inaction */}
      <section style={{ background: '#fef2f2', padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#991b1b', textAlign: 'center', marginBottom: 8 }}>The cost of doing nothing</h2>
          <p style={{ fontSize: 15, color: '#7f1d1d', textAlign: 'center', marginBottom: 32 }}>Every month without governance is a month of compounding risk</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {COST_OF_INACTION.map(c => (
              <div key={c.title} style={{ background: '#fff', border: '1px solid #fecaca', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div style={{ fontSize: 17, fontWeight: 700, color: '#991b1b' }}>{c.title}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#dc2626', whiteSpace: 'nowrap' }}>{c.cost}</div>
                </div>
                <p style={{ fontSize: 14, color: '#7f1d1d', lineHeight: 1.55, margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to sell it internally */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>How to sell HCCS™ internally</h2>

          <div style={{ display: 'grid', gap: 16 }}>
            {[
              { stakeholder: 'CEO / Board', frame: 'Risk mitigation + competitive advantage', pitch: 'We govern every financial decision with SOX controls. We govern data with GDPR/CCPA. But hiring and compensation, our largest operational cost, has no equivalent governance. HCCS closes that gap before regulators force it.' },
              { stakeholder: 'CHRO / VP People', frame: 'Operational credibility + defensibility', pitch: 'HCCS gives us a framework to prove our hiring practices are structured, fair, and auditable. It turns "we think our process is good" into "here is documented evidence of 67 controls in place." That matters when someone files a charge.' },
              { stakeholder: 'General Counsel', frame: 'Legal defensibility + regulatory readiness', pitch: 'Current AI hiring legislation (NYC LL144, EU AI Act, state laws) requires documented governance we don\'t have. HCCS exceeds all current requirements and positions us for what\'s coming. The assessment identifies our gaps before a regulator does.' },
              { stakeholder: 'CFO', frame: 'Cost avoidance + ROI', pitch: 'Bad hires cost 1.5-3x salary. Discrimination settlements average $40K-$165K. One OFCCP audit can cost $1M+. A $149 self-assessment identifies every gap. A $2,500 guided assessment produces an executive presentation with prioritized remediation.' },
            ].map(s => (
              <div key={s.stakeholder} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24 }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{s.stakeholder}</div>
                  <div style={{ fontSize: 13, color: '#2563eb', fontWeight: 500 }}>Frame: {s.frame}</div>
                </div>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, margin: 0 }}>{s.pitch}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0f172a', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Start with the free assessment</h2>
          <p style={{ fontSize: 15, color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>10 questions, 3 minutes, zero cost. See where your organization stands before committing to anything.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link to="/assess" style={{ background: '#2563eb', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Take the quick assessment</Link>
            <Link to="/assess/full" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>View pricing</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
