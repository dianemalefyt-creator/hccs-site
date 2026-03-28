import { useState } from 'react'
import { Link } from 'react-router-dom'

const RIGHTS = [
  { num: 1, title: 'The Right to Respect', text: 'Every applicant has the right to be treated with professionalism, courtesy, and dignity throughout the hiring process, regardless of outcome.' },
  { num: 2, title: 'The Right to Transparency', text: 'Every applicant has the right to understand the basic structure of the hiring process, including expected steps, major decision points, and whether assessments, automation, or AI-supported tools are being used.' },
  { num: 3, title: 'The Right to Fair Evaluation', text: 'Every applicant has the right to be evaluated against job-relevant criteria that are reasonably connected to the actual responsibilities of the role.' },
  { num: 4, title: 'The Right to Consistency', text: 'Every applicant has the right to a hiring process that is applied consistently across candidates, including consistent criteria, interview structure, and decision-making standards, except where reasonable accommodation is required.' },
  { num: 5, title: 'The Right to Human Oversight', text: 'Every applicant has the right to meaningful human review in hiring decisions, especially where automated systems, algorithmic filtering, or AI-supported tools are used to screen, assess, rank, or recommend candidates.' },
  { num: 6, title: 'The Right to Know When Technology Is Involved', text: 'Every applicant has the right to be informed when AI, automated decision tools, algorithmic scoring, résumé screening software, video analysis, or other technology materially influences the hiring process.' },
  { num: 7, title: 'The Right to Relevant and Proportionate Assessment', text: 'Every applicant has the right to an assessment process that is proportionate to the level and nature of the role. Employers should not require excessive, invasive, or unnecessary assessments that do not materially improve hiring decisions.' },
  { num: 8, title: 'The Right to Privacy and Data Stewardship', text: 'Every applicant has the right to have personal information collected, stored, used, and shared responsibly. Candidate data should be limited to what is reasonably necessary for hiring purposes and protected against misuse, over-retention, or unauthorized disclosure.' },
  { num: 9, title: 'The Right to Accessibility and Reasonable Accommodation', text: 'Every applicant has the right to an accessible process and to reasonable accommodation where needed, without penalty, stigma, or unnecessary procedural burden.' },
  { num: 10, title: 'The Right to Timely Communication', text: 'Every applicant has the right to reasonable communication regarding status, next steps, and closure. Silence should not be treated as an acceptable default operating model.' },
  { num: 11, title: 'The Right to Protection from Deceptive Practices', text: 'Every applicant has the right to truthful representation of the role, compensation structure, reporting relationship, work expectations, and material conditions of employment.' },
  { num: 12, title: 'The Right to Freedom from Retaliation or Blacklisting', text: 'Every applicant has the right to raise questions, request clarification, or advocate for fair treatment without fear of retaliation, unnecessary penalization, or informal blacklisting.' },
  { num: 13, title: 'The Right to Contest Meaningful Error', text: 'Every applicant has the right to raise concerns where there is reason to believe a material error, mistaken identity, inaccurate information, or flawed screening outcome affected consideration.' },
  { num: 14, title: 'The Right to Ethical Use of AI in Hiring', text: 'Every applicant has the right to a hiring process in which AI is used as a decision-support tool, not as a substitute for accountability, judgment, or fairness. Organizations remain responsible for the outcomes of the systems they deploy.' },
  { num: 15, title: 'The Right to a Process with Accountability', text: 'Every applicant has the right to a hiring process governed by documented standards, defined ownership, oversight mechanisms, and periodic review for fairness, consistency, and adverse impact.' },
]

const PRINCIPLES = [
  'Hiring processes should be governed, not improvised',
  'Candidate experience is a governance issue, not just a branding issue',
  'Efficiency does not excuse opacity',
  'AI does not remove human responsibility',
  'Process design should reduce avoidable bias, ambiguity, and friction',
  'Applicants should not bear the burden of broken systems',
]

const COLORS = ['#185FA5', '#0F6E56', '#534AB7', '#993C1D', '#854F0B', '#3B6D11', '#993556', '#185FA5', '#0F6E56', '#534AB7', '#993C1D', '#854F0B', '#3B6D11', '#993556', '#185FA5']

export default function BillOfRights() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(165deg, #0a1628 0%, #1a2d4a 40%, #0f3460 100%)', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 500 }}>HCCS™ Standard</div>
          <h1 className='hero-title' style={{ fontSize: 44, fontWeight: 700, color: '#fff', margin: '0 0 20px', lineHeight: 1.15 }}>Applicant's Bill of Rights</h1>
          <p style={{ fontSize: 18, color: '#94a3b8', maxWidth: 640, margin: '0 auto 32px', lineHeight: 1.65 }}>
            Applying for a job should not require candidates to accept opacity, disrespect, or preventable bias as standard practice.
          </p>
          <div style={{ width: 60, height: 3, background: '#2563eb', margin: '0 auto' }} />
        </div>
      </section>

      {/* Preamble */}
      <section style={{ padding: '48px 24px 0' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 14, padding: '32px 36px', borderLeft: '4px solid #2563eb' }}>
            <p style={{ fontSize: 16, color: '#334155', lineHeight: 1.7, margin: 0 }}>
              At HCCS™, we believe applicants deserve a hiring process grounded in <strong>dignity, transparency, consistency, and accountability</strong>. This Bill of Rights establishes the minimum expectations for fair and responsible hiring practices. It is intended to protect candidate experience, strengthen organizational accountability, and reinforce trust in the employment process, particularly in environments where automation, AI, and third-party technologies influence hiring decisions.
            </p>
          </div>
        </div>
      </section>

      {/* The 15 Rights */}
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
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 8 }}>HCCS™ Operating Principles</h2>
          <p style={{ fontSize: 15, color: '#64748b', textAlign: 'center', marginBottom: 32 }}>The beliefs behind the Bill of Rights</p>
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

      {/* Employer Commitment */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ background: '#fff', border: '2px solid #2563eb', borderRadius: 14, padding: '36px 36px', textAlign: 'center' }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Employer Commitment Statement</div>
            <p style={{ fontSize: 16, color: '#334155', lineHeight: 1.7, margin: '0 0 24px', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto' }}>
              An organization aligned to the HCCS™ Standard affirms that applicants will be evaluated through processes designed to be transparent, job-relevant, accountable, and subject to human oversight. The organization further affirms that candidate data, decision criteria, and enabling technologies will be managed in a manner consistent with fairness, privacy, and responsible governance.
            </p>
            <a href="/assess" style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '12px 28px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Assess your organization</a>
          </div>
        </div>
      </section>

      {/* Cross-link */}
      <section style={{ padding: '0 24px 48px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ background: '#0f172a', borderRadius: 14, padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
            <div>
              <div style={{ fontSize: 13, color: '#5b9bd5', fontWeight: 600, marginBottom: 4 }}>The other side of the table</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Organization's Bill of Rights</div>
              <div style={{ fontSize: 14, color: '#94a3b8' }}>Governance doesn't just protect candidates. It protects the organizations that hire them.</div>
            </div>
            <Link to="/org-rights" style={{ background: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>Read it →</Link>
          </div>
        </div>
      </section>

      {/* Author */}
      <section style={{ background: '#f1f5f9', padding: '48px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', gap: 28, alignItems: 'center' }}>
          <img src="/di-malefyt.png" alt="Diane Malefyt" style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '3px solid #2563eb' }} />
          <div>
            <div style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Written by</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>Diane Malefyt</div>
            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, margin: '0 0 8px' }}>
              Senior B2B SaaS executive, M.S. candidate in Forensic and Organizational Psychology at Arizona State University, and author of the HCCS™ Standard. Yes, she's also #OpenToWork, because the best standards come from people who live on both sides of the table.
            </p>
            <a href="https://www.linkedin.com/in/dianemalefyt/" target="_blank" rel="noopener" style={{ fontSize: 14, color: '#2563eb', fontWeight: 500 }}>Connect on LinkedIn →</a>
          </div>
        </div>
      </section>
    </div>
  )
}
