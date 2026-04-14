import { useState } from 'react'
import { Link } from 'react-router-dom'

const RIGHTS = [
  { num: 1, title: 'The Right to Defensible Decisions', text: 'Every organization has the right to a hiring process that produces decisions it can reconstruct, explain, and defend under legal, regulatory, or public scrutiny. No organization should be one subpoena away from discovering it cannot explain how a consequential decision was made.' },
  { num: 2, title: 'The Right to Know What Its Own Tools Are Doing', text: 'Every organization has the right to understand, in plain language, how its automated decision tools filter, score, rank, or recommend candidates. Vendor claims of proprietary algorithms do not relieve the organization of accountability for the outcomes those tools produce.' },
  { num: 3, title: 'The Right to Consistent Process Execution', text: 'Every organization has the right to a hiring process that operates consistently regardless of which manager, recruiter, or business unit is executing it. Individual discretion should not be the primary variable determining how candidates experience the organization.' },
  { num: 4, title: 'The Right to Detect Bias Before Regulators Do', text: 'Every organization has the right to monitoring mechanisms that surface scoring inconsistencies, demographic disparities, and pattern deviations proactively. Discovering adverse impact from an EEOC complaint is a governance failure, not an unavoidable surprise.' },
  { num: 5, title: 'The Right to Compensation Decisions Grounded in Scope', text: 'Every organization has the right to a compensation framework that ties pay to the measurable scope of work, not to title matching, salary history, negotiation leverage, or predecessor pay. This protects the organization from pay equity exposure and ensures internal consistency.' },
  { num: 6, title: 'The Right to an Auditable Record', text: 'Every organization has the right to contemporaneous, classified, retrievable documentation for every consequential human capital decision. When regulators, auditors, or litigators request evidence, it should exist, be findable within 48 hours, and tell a coherent story.' },
  { num: 7, title: 'The Right to Evaluate AI Vendors Against a Standard', text: 'Every organization has the right to assess AI and automated hiring tools against defined governance criteria before deployment, not after a compliance incident. "Trust us, our AI is fair" is not evidence. Documented testing, explainability, and human oversight requirements are.' },
  { num: 8, title: 'The Right to Role Clarity Before Sourcing', text: 'Every organization has the right to require that roles are defined by outcomes, decision rights, and scope before any candidate is evaluated. Poorly defined roles produce poor hires, inflated requirements, and compensation misalignment. The cost of a 30-minute definition exercise is trivial compared to the cost of a wrong hire.' },
  { num: 9, title: 'The Right to Structured Evaluation Over Intuition', text: 'Every organization has the right to evaluation methods that outperform gut feel. Six decades of research confirm that structured, criteria-based assessment consistently outperforms unstructured interviews in predictive accuracy. Organizations deserve to use what works.' },
  { num: 10, title: 'The Right to Accountability Without Blame', text: 'Every organization has the right to governance systems that identify process failures without requiring individual fault-finding. Controls detect drift, not villains. A bias flag is a calibration opportunity, not a disciplinary event.' },
  { num: 11, title: 'The Right to Scalable Governance', text: 'Every organization has the right to a governance framework that scales with its maturity. Not every organization needs Level 5 on day one. A credible path from self-attestation to validated audit, with clear milestones at each level, is more valuable than an all-or-nothing mandate.' },
  { num: 12, title: 'The Right to Protect Its Reputation', text: 'Every organization has the right to hiring practices it can stand behind publicly. In an era of Glassdoor reviews, social media scrutiny, and AI transparency legislation, the reputational cost of ungoverned hiring exceeds the cost of governance.' },
]

const PRINCIPLES = [
  'Governance protects organizations, not just candidates',
  'Defensibility is cheaper than litigation',
  'Consistency is a competitive advantage, not a bureaucratic cost',
  'What you cannot reconstruct, you cannot defend',
  'AI accountability starts with the deployer, not the vendor',
  'Structured methods outperform intuition at every scale',
]

const COLORS = ['#185FA5', '#0F6E56', '#534AB7', '#993C1D', '#854F0B', '#3B6D11', '#993556', '#185FA5', '#0F6E56', '#534AB7', '#993C1D', '#854F0B']

export default function OrgBillOfRights() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(165deg, #0a1628 0%, #1a2d4a 40%, #0f3460 100%)', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 500 }}><span style={{ background: '#185FA520', color: '#185FA5', padding: '3px 10px', borderRadius: 10, fontSize: 11, fontWeight: 600, marginRight: 12 }}>Employment &amp; Workforce</span>HCCS™ Standard</div>
          <h1 className='hero-title' style={{ fontSize: 44, fontWeight: 700, color: '#fff', margin: '0 0 20px', lineHeight: 1.15 }}>Organization's Bill of Rights</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 640, margin: '0 auto 32px', lineHeight: 1.65 }}>
            Governance doesn't just protect candidates. It protects the organizations that hire them.
          </p>
          <div style={{ width: 60, height: 3, background: '#2563eb', margin: '0 auto' }} />
        </div>
      </section>

      {/* Preamble */}
      <section style={{ padding: '48px 24px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '32px 36px', borderLeft: '4px solid #2563eb' }}>
            <p style={{ fontSize: 16, color: '#334155', lineHeight: 1.7, margin: 0 }}>
              Organizations invest in financial controls, data governance, and compliance frameworks. Yet the decisions that determine <strong>who enters the organization, how they are evaluated, and what they are paid</strong> often operate without equivalent governance. This Organization's Bill of Rights establishes the minimum protections every employer deserves from its own hiring process.
            </p>
          </div>
        </div>
      </section>

      {/* The 12 Rights */}
      <section style={{ padding: '48px 24px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {RIGHTS.map((r, i) => {
            const isOpen = expanded === r.num
            const color = COLORS[i]
            return (
              <div key={r.num} style={{ marginBottom: 12, cursor: 'pointer' }} onClick={() => setExpanded(isOpen ? null : r.num)}>
                <div style={{
                  background: '#fff', border: `1px solid ${isOpen ? color : '#e2e8f0'}`, borderRadius: 12,
                  padding: '20px 24px', transition: 'all 0.2s',
                  borderLeft: `4px solid ${color}`,
                  boxShadow: isOpen ? '0 4px 16px rgba(0,0,0,0.06)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%', background: `${color}12`, border: `2px solid ${color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, fontWeight: 700, color, flexShrink: 0,
                    }}>{r.num}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 17, fontWeight: 700, color: '#0f172a' }}>{r.title}</div>
                    </div>
                    <div style={{ fontSize: 18, color: '#94a3b8', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>▾</div>
                  </div>
                  {isOpen && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
                      <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.65, margin: 0 }}>{r.text}</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Operating Principles */}
      <section style={{ background: '#0f172a', padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 8 }}>Why governance protects organizations</h2>
          <p style={{ fontSize: 15, color: '#64748b', textAlign: 'center', marginBottom: 32 }}>The business case behind the Bill of Rights</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {PRINCIPLES.map((p, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10, padding: '16px 20px', fontSize: 15, color: '#cbd5e1', lineHeight: 1.5,
              }}>
                <span style={{ color: '#5b9bd5', fontWeight: 700, marginRight: 8 }}>→</span>
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The matched pair */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: '#fff', border: '2px solid #e2e8f0', borderRadius: 14, padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>For candidates</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', margin: '0 0 8px' }}>Applicant's Bill of Rights</h3>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.5, marginBottom: 16 }}>15 rights establishing the minimum expectations for fair and responsible hiring.</p>
              <Link to="/rights" style={{ display: 'inline-block', background: '#f8fafc', color: '#2563eb', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0' }}>Read the Applicant's Bill of Rights</Link>
            </div>
            <div style={{ background: '#0f172a', border: '2px solid #2563eb', borderRadius: 14, padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#5b9bd5', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>For organizations</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>You are here</h3>
              <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.5, marginBottom: 16 }}>12 rights establishing why governance protects the organization, not just the candidate.</p>
              <Link to="/assess" style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Assess your organization</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#f1f5f9', padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Ready to enforce these rights?</h2>
          <p style={{ fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 1.6 }}>The HCCS™ Standard provides the 74 controls, maturity model, and audit framework to make these rights operational.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <Link to="/assess" style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Take the assessment</Link>
            <Link to="/contact" style={{ display: 'inline-block', background: '#fff', color: '#0f172a', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0' }}>Talk to us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
