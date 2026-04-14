import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isPro } from '../lib/subscription'
import { getArtifacts, saveArtifact, deleteArtifact, getAIUsage, incrementAIUsage, AI_FREE_LIMIT } from '../lib/artifacts'

const STEPS = [
  { id: 'role', num: 1, title: 'Define the role', desc: 'Outcomes, decision rights, capabilities, scope', control: 'RG-001 to RG-005', color: '#185FA5', aiStep: 'outcomes' },
  { id: 'criteria', num: 2, title: 'Build evaluation criteria', desc: 'Derived from role definition before any candidate is seen', control: 'EI-001, EI-003', color: '#0F6E56', aiStep: 'criteria' },
  { id: 'bias', num: 3, title: 'Check for bias', desc: 'Scan for proxy language and inflated requirements', control: 'EI-003, DG-005', color: '#534AB7', aiStep: null },
  { id: 'comp', num: 4, title: 'Set compensation factors', desc: 'Scope-based pay, not title matching', control: 'CG-001 to CG-003', color: '#3B6D11', aiStep: null },
  { id: 'review', num: 5, title: 'Review & save', desc: 'Download artifacts, save to your workspace', control: 'ER-001', color: '#993556', aiStep: null },
]

function AIButton({ step, context, onSuggestion }) {
  const [loading, setLoading] = useState(false)
  const pro = isPro()
  const used = getAIUsage()
  const canUseAI = pro || used < AI_FREE_LIMIT

  if (!canUseAI) return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      <span style={{ fontSize: 12, color: '#dc2626' }}>AI suggestions: {AI_FREE_LIMIT}/{AI_FREE_LIMIT} used</span>
      <Link to="/pricing" style={{ fontSize: 12, color: '#2563eb', fontWeight: 600 }}>Upgrade to Pro</Link>
    </div>
  )

  return (
    <div style={{ marginBottom: 12 }}>
      <button onClick={async () => {
        setLoading(true)
        incrementAIUsage()
        try {
          const res = await fetch('/.netlify/functions/ai-suggest', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ step, context }),
          })
          const data = await res.json()
          onSuggestion(data.suggestion)
        } catch { onSuggestion('Suggestion unavailable. Try manually.') }
        finally { setLoading(false) }
      }} disabled={loading} style={{
        padding: '8px 16px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: loading ? 'default' : 'pointer',
        background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: '#fff', display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        {loading ? 'Thinking...' : '✦ AI suggest'}
      </button>
      {!pro && <span style={{ fontSize: 11, color: '#94a3b8', marginLeft: 8 }}>{AI_FREE_LIMIT - used} free suggestions left</span>}
    </div>
  )
}

export function GuidedWorkflow() {
  const [step, setStep] = useState(0)
  const defaultD = { title: '', dept: '', reportsTo: '', outcome1: '', outcome2: '', outcome3: '', decidesAlone: '', decidesConsult: '', needsApproval: '', budget: '', required: '', learnable: '', antiReqs: '', directs: '', indirects: '', geoSpan: '', stakeholders: '', ambiguity: '', c1: '', c2: '', c3: '', c4: '', c5: '', compAuth: 3, compComplex: 3, compAcct: 3, compImpact: 3, compExpert: 3 }
  const [d, setD] = useState(() => {
    try { const v = JSON.parse(localStorage.getItem('hccs_workflow') || 'null'); return v || defaultD } catch { return defaultD }
  })
  const [suggestion, setSuggestion] = useState('')

  const set = (k, v) => setD(p => { const n = { ...p, [k]: v }; localStorage.setItem('hccs_workflow', JSON.stringify(n)); localStorage.setItem('hccs_jd', JSON.stringify(n)); return n })

  const s = STEPS[step]
  const pct = ((step + 1) / STEPS.length) * 100

  const F = (k, l, ph, type = 'text') => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>{l}</label>
      {type === 'textarea' ? (
        <textarea value={d[k] || ''} onChange={e => set(k, e.target.value)} placeholder={ph} rows={3}
          style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.5 }} />
      ) : (
        <input type="text" value={d[k] || ''} onChange={e => set(k, e.target.value)} placeholder={ph}
          style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
      )}
    </div>
  )

  const applySuggestion = (text) => {
    setSuggestion(text)
    if (step === 0) {
      const lines = text.split('\n').filter(Boolean)
      if (lines[0] && !d.outcome1) set('outcome1', lines[0])
      if (lines[1] && !d.outcome2) set('outcome2', lines[1])
      if (lines[2] && !d.outcome3) set('outcome3', lines[2])
    } else if (step === 1) {
      const lines = text.split('\n').filter(Boolean)
      lines.forEach((l, i) => { if (i < 5 && !d[`c${i+1}`]) set(`c${i+1}`, l) })
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a)', padding: '60px 24px 40px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <Link to="/tools" style={{ fontSize: 13, color: '#5b9bd5', display: 'inline-block', marginBottom: 12 }}>← Tools</Link>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Guided governance workflow</h1>
          <p style={{ fontSize: 15, color: '#94a3b8', margin: '0 0 20px' }}>Five steps from role definition to audit-ready documentation. AI assists at every step.</p>
          {/* Progress */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {STEPS.map((st, i) => (
              <div key={st.id} onClick={() => setStep(i)} style={{
                flex: 1, height: 6, borderRadius: 3, cursor: 'pointer',
                background: i <= step ? st.color : 'rgba(255,255,255,0.1)',
                transition: 'background 0.3s',
              }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#64748b' }}>
            <span>Step {step + 1} of {STEPS.length}: {s.title}</span>
            <span>{Math.round(pct)}%</span>
          </div>
        </div>
      </section>

      {/* Step nav pills */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '12px 24px', position: 'sticky', top: 64, zIndex: 10 }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', gap: 8, overflowX: 'auto' }}>
          {STEPS.map((st, i) => (
            <button key={st.id} onClick={() => setStep(i)} style={{
              padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
              border: i === step ? `2px solid ${st.color}` : '1px solid #e2e8f0',
              background: i === step ? `${st.color}10` : i < step ? '#f0fdf4' : '#fff',
              color: i === step ? st.color : i < step ? '#059669' : '#64748b',
            }}>
              {i < step ? '✓ ' : ''}{st.num}. {st.title}
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <section style={{ padding: '32px 24px 80px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>{s.num}</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0f172a', margin: 0 }}>{s.title}</h2>
          </div>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>{s.desc} | Controls: {s.control}</div>

          {/* Suggestion area */}
          {suggestion && (
            <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 10, padding: '14px 18px', marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#7c3aed', marginBottom: 6 }}>✦ AI suggestion</div>
              <pre style={{ fontSize: 13, color: '#4c1d95', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{suggestion}</pre>
              <button onClick={() => { applySuggestion(suggestion); setSuggestion('') }} style={{ marginTop: 8, padding: '6px 14px', borderRadius: 6, border: '1px solid #ddd6fe', background: '#fff', color: '#7c3aed', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Apply to empty fields</button>
            </div>
          )}

          {/* Step 1: Role Definition */}
          {step === 0 && (
            <div>
              {d.title ? (
                <>
                  <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '16px 20px', marginBottom: 20 }}>
                    <div style={{ fontSize: 14, color: '#065f46', lineHeight: 1.6 }}>
                      <strong>Role definition loaded: "{d.title}"</strong>. Review the summary below. To make changes, open the full Role Definition Builder.
                    </div>
                  </div>
                  <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, marginBottom: 20 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      {[
                        ['Role', d.title],['Department', d.dept],['Reports to', d.reportsTo],['Role type', d.roleType],
                        ['Primary outcome', d.outcome1],['Secondary outcome', d.outcome2],
                        ['Why now', d.whyNow],['Current state', d.currentState],
                        ['Decides independently', d.decidesAlone],['Budget authority', d.budget],
                        ['Required capabilities', d.required],['Direct reports', d.directs],
                        ['90-day milestone', d.d90],['Risks reduced', d.riskReduces],
                      ].filter(([,v]) => v).map(([label, val]) => (
                        <div key={label}>
                          <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', marginBottom: 2 }}>{label}</div>
                          <div style={{ fontSize: 13, color: '#1e293b', lineHeight: 1.4 }}>{String(val).slice(0, 120)}{String(val).length > 120 ? '...' : ''}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <a href="/tools" onClick={e => { e.preventDefault(); window.open('/tools', '_self') }} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #185FA5', background: '#fff', color: '#185FA5', fontSize: 13, fontWeight: 600, textDecoration: 'none', cursor: 'pointer' }}>Edit in Role Definition Builder</a>
                    <button onClick={() => { localStorage.removeItem('hccs_jd'); localStorage.removeItem('hccs_workflow'); window.location.reload() }} style={{ padding: '10px 20px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 13, cursor: 'pointer' }}>Start new role</button>
                  </div>
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>Quick additions with AI</div>
                    <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 12px' }}>Use AI to fill gaps in your role definition without leaving this workflow.</p>
                    {!d.outcome1 && <AIButton step="outcomes" context={d} onSuggestion={(text) => {
                      setSuggestion(text)
                      const lines = text.split('\n').filter(Boolean)
                      if (lines[0] && !d.outcome1) set('outcome1', lines[0])
                      if (lines[1] && !d.outcome2) set('outcome2', lines[1])
                      if (lines[2] && !d.outcome3) set('outcome3', lines[2])
                    }} />}
                    {d.outcome1 && !d.required && <AIButton step="capabilities" context={d} onSuggestion={(text) => {
                      setSuggestion(text)
                      const req = text.match(/REQUIRED:\n([\s\S]*?)(?=LEARNABLE:)/)?.[1]
                      const learn = text.match(/LEARNABLE:\n([\s\S]*?)(?=NOT_REQUIRED:)/)?.[1]
                      const anti = text.match(/NOT_REQUIRED:\n([\s\S]*?)$/)?.[1]
                      if (req && !d.required) set('required', req.trim())
                      if (learn && !d.learnable) set('learnable', learn.trim())
                      if (anti && !d.antiReqs) set('antiReqs', anti.trim())
                    }} />}
                    {d.outcome1 && !d.decidesAlone && <AIButton step="decisions" context={d} onSuggestion={(text) => {
                      setSuggestion(text)
                      const sections = text.split(/INDEPENDENT:|CONSULTATION:|APPROVAL:/).filter(Boolean)
                      if (sections[0] && !d.decidesAlone) set('decidesAlone', sections[0].trim())
                      if (sections[1] && !d.decidesConsult) set('decidesConsult', sections[1].trim())
                      if (sections[2] && !d.needsApproval) set('needsApproval', sections[2].trim())
                    }} />}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>No role definition yet</div>
                  <p style={{ fontSize: 15, color: '#64748b', maxWidth: 480, margin: '0 auto 24px', lineHeight: 1.6 }}>
                    Start by building a role definition in the Role Definition Builder. It captures why the role exists, outcomes with baselines, decision rights, team scope, and more. All other workflow steps build on it.
                  </p>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <a href="/tools" style={{ display: 'inline-block', background: '#185FA5', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Open Role Definition Builder</a>
                    <a href="/docs/HCCS-Role-Definition-Template.pdf" download style={{ display: 'inline-block', border: '1px solid #e2e8f0', color: '#475569', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Download blank template</a>
                  </div>
                  <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 13, color: '#94a3b8' }}>Or enter the basics here to get started quickly:</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 12, textAlign: 'left' }}>
                      {F('title', 'Role title', 'e.g. Director of TA')}
                      {F('dept', 'Department', 'e.g. People')}
                      {F('reportsTo', 'Reports to', 'e.g. CPO')}
                    </div>
                    {F('outcome1', 'Primary outcome', 'The #1 thing this role delivers', 'textarea')}
                    <AIButton step="outcomes" context={d} onSuggestion={(text) => {
                      setSuggestion(text)
                      const lines = text.split('\n').filter(Boolean)
                      if (lines[0] && !d.outcome1) set('outcome1', lines[0])
                      if (lines[1] && !d.outcome2) set('outcome2', lines[1])
                    }} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Criteria */}
          {step === 1 && (
            <div>
              <AIButton step="criteria" context={d} onSuggestion={(text) => {
                setSuggestion(text)
                const lines = text.split('\n').filter(Boolean)
                lines.forEach((l, i) => { if (i < 5 && !d[`c${i+1}`]) set(`c${i+1}`, l.replace(/^\d+[\.\)]\s*/, '')) })
              }} />
              {[1,2,3,4,5].map(i => F(`c${i}`, `Criterion ${i}${i > 3 ? ' (optional)' : ''}`, '', 'text'))}
            </div>
          )}

          {/* Step 3: Bias Check */}
          {step === 2 && (
            <div>
              <BiasCheckInline text={[d.title, d.outcome1, d.outcome2, d.outcome3, d.required, d.learnable, d.decidesAlone, d.antiReqs].filter(Boolean).join('\n')} />
            </div>
          )}

          {/* Step 4: Comp */}
          {step === 3 && (
            <div>
              {[['compAuth','Authority','Decision scope, budget'],['compComplex','Complexity','Ambiguity, cross-functional'],['compAcct','Accountability','What breaks if this fails'],['compImpact','Impact','Revenue, strategic scope'],['compExpert','Expertise','Specialization, rarity']].map(([k,l,desc]) => (
                <div key={k} style={{ marginBottom: 14, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '14px 18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{l}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#3B6D11' }}>{d[k]}</div>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{desc}</div>
                  <input type="range" min="1" max="5" value={d[k]} onChange={e => set(k, +e.target.value)} style={{ width: '100%' }} />
                </div>
              ))}
              {(() => {
                const avg = (d.compAuth + d.compComplex + d.compAcct + d.compImpact + d.compExpert) / 5
                const band = avg < 1.8 ? '$45K-$70K' : avg < 2.5 ? '$65K-$100K' : avg < 3.2 ? '$95K-$150K' : avg < 4.0 ? '$140K-$220K' : '$200K-$350K+'
                return (
                  <div style={{ background: '#0f172a', borderRadius: 12, padding: 20, textAlign: 'center', marginTop: 16 }}>
                    <div style={{ fontSize: 13, color: '#5b9bd5' }}>Factor-derived range</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: '#fff' }}>{band}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>Profile: {d.compAuth}/{d.compComplex}/{d.compAcct}/{d.compImpact}/{d.compExpert} | Avg: {avg.toFixed(1)}</div>
                  </div>
                )
              })()}
            </div>
          )}

          {/* Step 5: Review & Save */}
          {step === 4 && (
            <ReviewStep data={d} />
          )}

          {/* Nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
            <button onClick={() => { setStep(Math.max(0, step - 1)); setSuggestion(''); window.scrollTo(0, 0) }} disabled={step === 0}
              style={{ padding: '12px 24px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: step === 0 ? '#cbd5e1' : '#475569', fontSize: 14, fontWeight: 500, cursor: step === 0 ? 'default' : 'pointer' }}>← Previous</button>
            {step < STEPS.length - 1 ? (
              <button onClick={() => { setStep(step + 1); setSuggestion(''); window.scrollTo(0, 0) }}
                style={{ padding: '12px 24px', borderRadius: 8, border: 'none', background: s.color, color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Next: {STEPS[step + 1].title} →</button>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}

function BiasCheckInline({ text }) {
  const PATTERNS = [
    { pattern: /(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/gi, flag: 'Years of experience proxy', severity: 'high' },
    { pattern: /rockstar|ninja|guru|wizard|unicorn|hustler/gi, flag: 'Exclusionary language', severity: 'high' },
    { pattern: /culture\s*fit/gi, flag: 'Undefined criterion', severity: 'high' },
    { pattern: /top[- ]tier\s*(university|school|college)/gi, flag: 'Institution prestige proxy', severity: 'high' },
    { pattern: /fast[- ]paced|high[- ]energy/gi, flag: 'Potential age/disability bias', severity: 'medium' },
    { pattern: /native\s*(english|speaker)/gi, flag: 'National origin bias', severity: 'high' },
    { pattern: /must\s*have\s*(BA|BS|MBA|PhD|degree|bachelor|master)/gi, flag: 'Credential requirement', severity: 'medium' },
    { pattern: /no\s*gaps?\s*(in|on)\s*(resume|employment)/gi, flag: 'Employment gap bias', severity: 'high' },
    { pattern: /salary\s*history|current\s*(salary|compensation)/gi, flag: 'Salary history', severity: 'high' },
  ]

  const found = []
  PATTERNS.forEach(p => {
    const matches = text.match(p.pattern)
    if (matches) matches.forEach(m => found.push({ text: m, ...p }))
  })

  return (
    <div>
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16, marginBottom: 16 }}>
        <div style={{ fontSize: 13, color: '#64748b', marginBottom: 8 }}>Scanning your role definition for bias patterns...</div>
        <div style={{ fontSize: 12, color: '#94a3b8', lineHeight: 1.6, maxHeight: 120, overflow: 'auto' }}>{text}</div>
      </div>
      {found.length === 0 ? (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#166534', marginBottom: 4 }}>No bias patterns detected</div>
          <div style={{ fontSize: 14, color: '#15803d' }}>Your role definition passes the automated bias check. Consider a manual review for nuance.</div>
        </div>
      ) : (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#991b1b', marginBottom: 12 }}>{found.length} issue{found.length > 1 ? 's' : ''} found</div>
          {found.map((r, i) => (
            <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: i < found.length - 1 ? '1px solid #fecaca' : 'none' }}>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: r.severity === 'high' ? '#dc2626' : '#d97706', color: '#fff', marginRight: 8 }}>{r.severity}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#991b1b' }}>{r.flag}</span>
              <span style={{ fontSize: 13, color: '#7f1d1d', marginLeft: 8 }}>Found: "{r.text}"</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ReviewStep({ data }) {
  const [artifacts, setArtifacts] = useState(getArtifacts())
  const [saved, setSaved] = useState(false)

  const saveAll = () => {
    const a = saveArtifact({
      type: 'workflow',
      title: data.title || 'Untitled Role',
      data: { ...data },
      controls: 'RG-001 to RG-005, EI-001, CG-001',
    })
    setArtifacts(a)
    setSaved(true)
  }

  const avg = (data.compAuth + data.compComplex + data.compAcct + data.compImpact + data.compExpert) / 5
  const band = avg < 1.8 ? '$45K-$70K' : avg < 2.5 ? '$65K-$100K' : avg < 3.2 ? '$95K-$150K' : avg < 4.0 ? '$140K-$220K' : '$200K-$350K+'
  const criteria = [data.c1, data.c2, data.c3, data.c4, data.c5].filter(Boolean)

  return (
    <div>
      {/* Summary */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 24, marginBottom: 20 }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: '0 0 16px' }}>{data.title || 'Untitled Role'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 4 }}>Department</div>
            <div style={{ fontSize: 14, color: '#1e293b' }}>{data.dept || 'Not set'}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 4 }}>Reports to</div>
            <div style={{ fontSize: 14, color: '#1e293b' }}>{data.reportsTo || 'Not set'}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 4 }}>Comp range</div>
            <div style={{ fontSize: 14, color: '#1e293b', fontWeight: 600 }}>{band}</div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 4 }}>Evaluation criteria</div>
            <div style={{ fontSize: 14, color: '#1e293b' }}>{criteria.length} defined</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
        <button onClick={() => { window.open('/tools', '_self') }} style={{ padding: 16, borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', textAlign: 'left' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#185FA5' }}>Open in Role Definition Builder</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Generate internal artifact + job posting</div>
        </button>
        <button onClick={() => { window.open('/tools', '_self') }} style={{ padding: 16, borderRadius: 10, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', textAlign: 'left' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#0F6E56' }}>Open in Scorecard Generator</div>
          <div style={{ fontSize: 12, color: '#64748b' }}>Pre-filled with your criteria</div>
        </button>
      </div>

      {/* Save */}
      {saved ? (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#166534', marginBottom: 4 }}>Saved to your workspace</div>
          <div style={{ fontSize: 14, color: '#15803d' }}>You can access this from the Workspace tab anytime.</div>
        </div>
      ) : (
        <button onClick={saveAll} style={{ width: '100%', padding: 16, borderRadius: 10, border: 'none', background: '#993556', color: '#fff', fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>Save to workspace</button>
      )}

      {/* Saved artifacts */}
      {artifacts.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Your workspace ({artifacts.length} items)</h3>
          {artifacts.map(a => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>{a.title}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{new Date(a.savedAt).toLocaleDateString()} · {a.controls}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => {
                  const restored = { ...a.data }
                  localStorage.setItem('hccs_workflow', JSON.stringify(restored))
                  localStorage.setItem('hccs_jd', JSON.stringify(restored))
                  window.location.reload()
                }} style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, color: '#2563eb', cursor: 'pointer' }}>Load</button>
                <button onClick={() => setArtifacts(deleteArtifact(a.id))} style={{ padding: '4px 12px', borderRadius: 6, border: '1px solid #fecaca', background: '#fff', fontSize: 12, color: '#dc2626', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export function Workspace() {
  const [artifacts, setArtifacts] = useState(getArtifacts())

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>Your workspace</h1>
          <p style={{ fontSize: 16, color: '#94a3b8' }}>All your saved role definitions, scorecards, and workflow outputs in one place.</p>
        </div>
      </section>
      <section style={{ padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          {artifacts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 48 }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>No saved artifacts yet</div>
              <div style={{ fontSize: 15, color: '#64748b', marginBottom: 24 }}>Complete a guided workflow or use the tools to generate your first artifact.</div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <Link to="/workflow" style={{ background: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Start guided workflow</Link>
                <Link to="/tools" style={{ border: '1px solid #e2e8f0', color: '#475569', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>Use individual tools</Link>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 14, color: '#64748b' }}>{artifacts.length} saved artifact{artifacts.length > 1 ? 's' : ''}</div>
                <Link to="/workflow" style={{ fontSize: 14, color: '#2563eb', fontWeight: 600 }}>+ New workflow</Link>
              </div>
              {artifacts.map(a => (
                <div key={a.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 24px', marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{a.title}</div>
                      <div style={{ fontSize: 13, color: '#64748b' }}>Saved {new Date(a.savedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · Controls: {a.controls}</div>
                      {a.data?.dept && <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>{a.data.dept}{a.data.reportsTo ? ' · Reports to ' + a.data.reportsTo : ''}</div>}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => {
                        localStorage.setItem('hccs_workflow', JSON.stringify(a.data))
                        localStorage.setItem('hccs_jd', JSON.stringify(a.data))
                        window.location.href = '/workflow'
                      }} style={{ padding: '8px 16px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Open</button>
                      <button onClick={() => setArtifacts(deleteArtifact(a.id))} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #fecaca', background: '#fff', fontSize: 13, color: '#dc2626', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
