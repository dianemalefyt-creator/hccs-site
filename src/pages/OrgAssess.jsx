import { useState, useRef } from "react"
import { Link } from "react-router-dom"

const ORG_CONTROLS = [
  { id: "OG-01", domain: "RG", domainName: "Role & Scope Governance", color: "#185FA5",
    text: "Consequential decisions have defined scope before they are made",
    definition: "Before any consequential decision is executed, a documented scope exists: what is being decided, by whom, under what authority, and within what boundaries.",
    example: "A credit decision has a defined scope document specifying what factors are considered, who has decision authority, and what outcomes are possible. A hiring decision has a role definition predating any candidate evaluation." },
  { id: "OG-02", domain: "EI", domainName: "Evaluation Integrity", color: "#0F6E56",
    text: "Evaluation methods are structured, criteria-based, and applied consistently",
    definition: "Decisions are made using defined criteria applied identically regardless of who executes the evaluation. Unstructured judgment is not the primary method.",
    example: "Every loan application evaluated against the same criteria. Every candidate assessed with the same methods. Every clinical recommendation validated against the same diagnostic standards." },
  { id: "OG-03", domain: "DG", domainName: "Decision Governance", color: "#534AB7",
    text: "Every consequential decision is documented with rationale at the time it is made",
    definition: "A written record explains why the decision was made, what evidence was used, and who made it. Created contemporaneously, not retrospectively.",
    example: "A parole decision documents the risk factors considered, the human reviewer's assessment, and the rationale. A denial of insurance coverage documents the criteria applied and the reviewer's reasoning." },
  { id: "OG-04", domain: "AG", domainName: "AI & Technology Governance", color: "#993C1D",
    text: "The organization maintains an inventory of every technology tool that influences consequential decisions",
    definition: "Every algorithmic tool, scoring model, AI system, or automated workflow that filters, ranks, scores, recommends, or decides is documented with its function, owner, and oversight requirements.",
    example: "An inventory lists: screening algorithm (vendor, function, owner), risk scoring model (data inputs, logic, thresholds), recommendation engine (what it recommends, who reviews). Tools not on the inventory cannot be used." },
  { id: "OG-05", domain: "AG", domainName: "AI & Technology Governance", color: "#993C1D",
    text: "Human oversight of technology-assisted decisions is substantive, not nominal",
    definition: "Human reviewers demonstrate genuine engagement with technology outputs. The organization can distinguish reviewers who independently evaluate from those who approve without modification. Override rates are tracked.",
    example: "Reviewer A modifies 15% of AI recommendations with documented rationale. Reviewer B approves 100% in 3 minutes with no notes. The organization detects and addresses the difference." },
  { id: "OG-06", domain: "AG", domainName: "AI & Technology Governance", color: "#993C1D",
    text: "Technology tools are tested for disparate impact before deployment and regularly thereafter",
    definition: "Before any tool is deployed in a consequential decision pipeline, it is tested for differential outcomes across demographic groups. Testing recurs at least annually.",
    example: "A screening tool is tested against gender, race, and age before launch. Results show 80%+ selection rate parity. Annual retesting catches model drift." },
  { id: "OG-07", domain: "PI", domainName: "Process Integrity", color: "#854F0B",
    text: "Processes are applied consistently regardless of who executes them",
    definition: "The same decision process applies identically regardless of which individual, team, or business unit is executing it. Individual discretion does not override defined process.",
    example: "A referral and a cold application go through identical evaluation steps. A claim from a high-value client follows the same adjudication process as any other claim." },
  { id: "OG-08", domain: "CG", domainName: "Resource & Outcome Governance", color: "#3B6D11",
    text: "Resource allocation and outcomes are aligned to defined scope through structured analysis",
    definition: "Compensation, resource allocation, pricing, and outcome determinations are derived from structured factor analysis, not subjective judgment, historical precedent, or proxy variables.",
    example: "Compensation is set by factor analysis of role scope, not title matching. Insurance pricing is based on documented risk factors, not zip code proxies. Sentencing considers structured risk assessment, not judicial intuition alone." },
  { id: "OG-09", domain: "ER", domainName: "Evidence & Records", color: "#993556",
    text: "Records are retained, classified, and retrievable for audit",
    definition: "All records of consequential decisions are retained for a defined period, classified by type, and retrievable within 48 hours of an audit request.",
    example: "An auditor requests Q3 coverage denial records. The organization produces 247 records within 4 hours, each with decision rationale, reviewer identity, and technology tool outputs." },
  { id: "OG-10", domain: "ER", domainName: "Evidence & Records", color: "#993556",
    text: "A named individual is accountable for decision governance",
    definition: "A specific person (not a department) is accountable for ensuring that governance controls are in place, records are maintained, and audit readiness is verified.",
    example: "'Maria Lopez, VP Governance Operations' with documented responsibilities. 'The compliance department' without a named owner = fails." },
]

const DOMAIN_COLORS = {RG:"#185FA5",EI:"#0F6E56",DG:"#534AB7",AG:"#993C1D",PI:"#854F0B",CG:"#3B6D11",ER:"#993556"}

function calcScore(answers) {
  const vals = Object.values(answers)
  if (vals.length === 0) return { score: 0, level: 0, inPlace: 0, partial: 0, gaps: 0 }
  const inPlace = vals.filter(v => v === 'yes').length
  const partial = vals.filter(v => v === 'partial').length
  const gaps = vals.filter(v => v === 'no').length
  const score = Math.round(((inPlace + partial * 0.5) / vals.length) * 100)
  const level = score >= 85 ? 4 : score >= 65 ? 3 : score >= 40 ? 2 : score > 0 ? 1 : 0
  return { score, level, inPlace, partial, gaps }
}

const LN = ['Not Established', 'Initial', 'Developing', 'Defined', 'Managed', 'Optimizing']

export default function OrgAssess() {
  const [answers, setAnswers] = useState({})
  const [current, setCurrent] = useState(0)
  const [done, setDone] = useState(false)
  const ref = useRef(null)

  const c = ORG_CONTROLS[current]
  const { score, level, inPlace, partial, gaps } = calcScore(answers)
  const answered = Object.keys(answers).length
  const progress = Math.round((answered / ORG_CONTROLS.length) * 100)

  const answer = (val) => {
    setAnswers(p => ({ ...p, [c.id]: val }))
    if (current < ORG_CONTROLS.length - 1) {
      setCurrent(current + 1)
      ref.current?.scrollIntoView({ behavior: 'smooth' })
    } else {
      setDone(true)
      ref.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (done) {
    const domainScores = {}
    ORG_CONTROLS.forEach(ctrl => {
      if (!domainScores[ctrl.domain]) domainScores[ctrl.domain] = { name: ctrl.domainName, color: ctrl.color, yes: 0, partial: 0, no: 0, total: 0 }
      domainScores[ctrl.domain].total++
      const a = answers[ctrl.id]
      if (a === 'yes') domainScores[ctrl.domain].yes++
      else if (a === 'partial') domainScores[ctrl.domain].partial++
      else domainScores[ctrl.domain].no++
    })

    return (
      <div ref={ref} style={{ minHeight: '100vh', background: '#f8fafc' }}>
        <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a)', padding: '60px 24px 48px' }}>
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: 64, fontWeight: 700, color: level >= 3 ? '#059669' : level >= 2 ? '#d97706' : '#dc2626' }}>Level {level}</div>
            <div style={{ fontSize: 22, color: '#fff', fontWeight: 600, marginBottom: 8 }}>{LN[level]}</div>
            <div style={{ fontSize: 15, color: '#94a3b8' }}>Organizational Decision Governance Maturity</div>
          </div>
        </section>

        <section style={{ padding: '48px 24px' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
              <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#059669' }}>{inPlace}</div>
                <div style={{ fontSize: 13, color: '#475569' }}>In place</div>
              </div>
              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#d97706' }}>{partial}</div>
                <div style={{ fontSize: 13, color: '#475569' }}>Partial</div>
              </div>
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: 20, textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: '#dc2626' }}>{gaps}</div>
                <div style={{ fontSize: 13, color: '#475569' }}>Gaps</div>
              </div>
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>Domain breakdown</h2>
            {Object.entries(domainScores).map(([code, d]) => (
              <div key={code} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '14px 18px', marginBottom: 8, borderLeft: `4px solid ${d.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{d.name}</div>
                  <div style={{ fontSize: 13, color: d.no > 0 ? '#dc2626' : d.partial > 0 ? '#d97706' : '#059669', fontWeight: 600 }}>
                    {d.yes}/{d.total} in place{d.partial > 0 ? `, ${d.partial} partial` : ''}
                  </div>
                </div>
              </div>
            ))}

            {level < 3 && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 12, padding: 24, marginTop: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#991b1b', margin: '0 0 8px' }}>Below the credibility threshold</h3>
                <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, margin: 0 }}>
                  Level 3 (Defined) is the minimum for organizations making public claims about governed, accountable, or technology-assisted decision practices. Your organization has governance gaps that create unmeasured risk.
                </p>
              </div>
            )}

            <div style={{ marginTop: 32, padding: 24, background: '#0f172a', borderRadius: 12, textAlign: 'center' }}>
              <p style={{ fontSize: 15, color: '#94a3b8', marginBottom: 16 }}>This is a 10-question organizational teaser. For domain-specific assessments:</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/assess/employment" style={{ background: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                  Employment assessment (10 questions)
                </Link>
                <Link to="/assess/full" style={{ background: '#fff', color: '#0f172a', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                  Full 70-control assessment
                </Link>
              </div>
            </div>

            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <button onClick={() => { setAnswers({}); setCurrent(0); setDone(false) }}
                style={{ fontSize: 14, color: '#2563eb', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                Retake assessment
              </button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <section ref={ref} style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a)', padding: '60px 24px 48px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ letterSpacing: '0.2em', fontSize: 11, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 12, fontWeight: 600 }}>Organizational assessment</div>
          <h1 className="hero-title" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px", color: "#fff" }}>Does your organization govern its consequential decisions?</h1>
          <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.6, margin: '0 0 24px', maxWidth: 560 }}>
            10 questions across 7 governance domains. Takes 3 minutes. Identifies whether your organization has the governance infrastructure for decisions shaped by technology.
          </p>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, height: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: '#2563eb', borderRadius: 8, transition: 'width 0.3s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>{answered} of {ORG_CONTROLS.length}</span>
            <span style={{ fontSize: 12, color: '#94a3b8' }}>{progress}%</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: 32, borderLeft: `5px solid ${c.color}` }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: c.color }}>{c.id}</span>
              <span style={{ fontSize: 12, color: '#94a3b8' }}>{c.domainName}</span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: '0 0 12px', lineHeight: 1.3 }}>{c.text}</h2>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 12 }}>{c.definition}</p>
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: 14, marginBottom: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 4 }}>What this looks like</div>
              <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, margin: 0 }}>{c.example}</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {[['yes', 'In place', '#059669'], ['partial', 'Partial', '#d97706'], ['no', 'Not in place', '#dc2626']].map(([val, label, color]) => (
                <button key={val} onClick={() => answer(val)}
                  style={{ flex: 1, padding: '14px 12px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    background: answers[c.id] === val ? color : '#fff',
                    color: answers[c.id] === val ? '#fff' : color,
                    border: `2px solid ${color}` }}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          {current > 0 && (
            <button onClick={() => setCurrent(current - 1)}
              style={{ marginTop: 16, fontSize: 13, color: '#64748b', background: 'none', border: 'none', cursor: 'pointer' }}>
              ← Previous question
            </button>
          )}
        </div>
      </section>
    </div>
  )
}
