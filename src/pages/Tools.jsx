import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isPro, canUse, incrementUsage, getRemainingUses, FREE_LIMITS } from '../lib/subscription'
import { ProBadge, UsageBadge, UpgradePrompt } from '../components/ProGate'

const AMBIGUITY = ['Low - well-defined problems, clear solutions', 'Medium - some ambiguity, requires judgment', 'High - novel problems, no established playbook']

export default function Tools() {
  const [active, setActive] = useState(null)

  const tools = [
    { id: 'jd', title: 'Job Description Builder', desc: 'Create HCCS™-compliant role definitions with outcomes, decision rights, and scope indicators.', controls: 'RG-001 to RG-007', color: '#185FA5', component: <JDBuilder /> },
    { id: 'scorecard', title: 'Interview Scorecard Generator', desc: 'Build criteria-based scorecards from your role definition. Structured evaluation in 2 minutes.', controls: 'EI-001 to EI-004', color: '#0F6E56', component: <ScorecardGenerator /> },
    { id: 'bias', title: 'Bias Language Checker', desc: 'Paste a job posting or evaluation criteria. Flags proxy language, inflated requirements, and bias patterns.', controls: 'EI-003, DG-005', color: '#534AB7', component: <BiasChecker /> },
    { id: 'comp', title: 'Compensable Factor Calculator', desc: 'Score 5 factors, get a scope-based compensation framework. Replaces title-matching with factor analysis.', controls: 'CG-001 to CG-003', color: '#3B6D11', component: <CompCalculator /> },
    { id: 'adt', title: 'ADT Audit Checklist', desc: 'Document every AI/automated tool in your hiring pipeline. Generates the inventory AG-001 requires.', controls: 'AG-001, AG-003, AG-007', color: '#993C1D', component: <ADTChecklist /> },
  ]

  const t = active ? tools.find(x => x.id === active) : null

  if (t) return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a)', padding: '60px 24px 40px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <button onClick={() => setActive(null)} style={{ fontSize: 13, color: '#5b9bd5', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 16, fontFamily: 'inherit' }}>← All tools</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 8, height: 40, borderRadius: 4, background: t.color }} />
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 }}>{t.title}</h1>
              <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>Controls: {t.controls}</div>
            </div>
          </div>
        </div>
      </section>
      <section style={{ padding: '32px 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>{t.component}</div>
      </section>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a, #0f3460)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 500 }}>HCCS™ Tools</div>
          <h1 style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>Free governance tools</h1>
          <p style={{ fontSize: 17, color: '#94a3b8', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            {isPro()
              ? 'You have HCCS™ Pro. Unlimited access to all tools.'
              : 'Build HCCS™-compliant artifacts without buying the full assessment. Each tool maps to specific controls and generates audit-ready output.'}
          </p>
          {isPro() && <div style={{ marginTop: 12 }}><ProBadge /></div>}
        </div>
      </section>
      <section style={{ padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 16 }}>
          {tools.map(tool => (
            <div key={tool.id} onClick={() => setActive(tool.id)}
              style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '24px 22px', cursor: 'pointer', borderLeft: `4px solid ${tool.color}`, transition: 'all 0.15s' }}
              onMouseOver={e => { e.currentTarget.style.borderColor = tool.color; e.currentTarget.style.boxShadow = `0 4px 12px ${tool.color}15` }}
              onMouseOut={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = 'none' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{tool.title}</div>
              <div style={{ fontSize: 14, color: '#64748b', lineHeight: 1.55, marginBottom: 12 }}>{tool.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: 12, color: tool.color, fontWeight: 600 }}>Controls: {tool.controls}</div>
                <UsageBadge toolId={tool.id} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          {!isPro() && (
            <div style={{ background: 'linear-gradient(135deg, #064e3b, #065f46)', border: '2px solid #059669', borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Unlock unlimited access</div>
              <div style={{ fontSize: 14, color: '#a7f3d0', marginBottom: 16 }}>HCCS™ Pro gives you unlimited use of all tools, starting at $29/month.</div>
              <Link to="/pricing" style={{ display: 'inline-block', background: '#059669', color: '#fff', padding: '12px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>See Pro plans</Link>
            </div>
          )}
          <p style={{ fontSize: 15, color: '#64748b', marginBottom: 16 }}>Want the full picture? The assessment scores all 67 controls.</p>
          <Link to="/assess" style={{ display: 'inline-block', background: '#2563eb', color: '#fff', padding: '12px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>Take the quick assessment</Link>
        </div>
      </section>
    </div>
  )
}

function JDBuilder() {
  const [d, setD] = useState({ title: '', dept: '', reportsTo: '', outcome1: '', outcome2: '', outcome3: '', decidesAlone: '', decidesConsult: '', needsApproval: '', budget: '', required: '', learnable: '', directs: '', indirects: '', geoSpan: '', stakeholders: '', ambiguity: '', antiReqs: '' })
  const set = (k, v) => setD(p => ({ ...p, [k]: v }))

  const generate = () => {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Role Definition - ${d.title}</title>
<style>
@media print{body{margin:0}.no-print{display:none!important}}
body{font-family:Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.6;max-width:780px;margin:0 auto;padding:40px;font-size:14px}
h1{font-size:24px;margin:0 0 4px}h2{font-size:16px;color:#185FA5;margin:28px 0 10px;padding-bottom:5px;border-bottom:2px solid #185FA520}
.hdr{background:linear-gradient(135deg,#0a1628,#1a2d4a);color:#fff;padding:28px 32px;border-radius:12px;margin-bottom:24px}
.hdr h1{color:#fff}.hdr .s{color:#94a3b8;font-size:13px;margin-top:4px}
.field{margin-bottom:14px}.label{font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.03em;margin-bottom:2px}
.val{font-size:14px;color:#1e293b;white-space:pre-wrap}
.val:empty::after{content:'Not specified';color:#cbd5e1;font-style:italic}
table{width:100%;border-collapse:collapse;margin:12px 0}td{padding:8px 12px;border:1px solid #e2e8f0;font-size:13px;vertical-align:top}
td:first-child{font-weight:600;width:40%;background:#f8fafc}
.badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;margin-right:4px}
.must{background:#fef2f2;color:#991b1b;border:1px solid #fecaca}.should{background:#fefce8;color:#854d0e;border:1px solid #fde68a}
.controls{font-size:11px;color:#94a3b8;margin-top:4px}
.toolbar{display:flex;gap:10px;padding:16px 0;margin-bottom:16px;border-bottom:1px solid #e2e8f0}
.toolbar button{padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;border:none;background:#2563eb;color:#fff}
.ft{margin-top:36px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;text-align:center}
</style></head><body>
<div class="no-print toolbar"><button onclick="window.print()">Save as PDF</button></div>
<div class="hdr">
<div style="font-size:11px;color:#5b9bd5;letter-spacing:0.15em;margin-bottom:4px">HCCS™ ROLE DEFINITION WORKSHEET</div>
<h1>${d.title || 'Role Title'}</h1>
<div class="s">${d.dept || 'Department'} | Reports to: ${d.reportsTo || 'TBD'} | Defined: ${date}</div>
<div class="s">Satisfies: RG-001, RG-002, RG-003, RG-004, RG-005</div>
</div>

<h2>Business outcomes <span class="badge must">MUST</span> <span class="controls">RG-002</span></h2>
<p style="font-size:12px;color:#64748b;margin:0 0 8px">What this role delivers or changes. Measurable results, not activities.</p>
<table>
<tr><td>Primary outcome</td><td>${d.outcome1 || ''}</td></tr>
<tr><td>Secondary outcome</td><td>${d.outcome2 || ''}</td></tr>
${d.outcome3 ? `<tr><td>Tertiary outcome</td><td>${d.outcome3}</td></tr>` : ''}
</table>

<h2>Decision rights & accountability <span class="badge must">MUST</span> <span class="controls">RG-004</span></h2>
<table>
<tr><td>Decides independently</td><td>${d.decidesAlone || ''}</td></tr>
<tr><td>Decides with consultation</td><td>${d.decidesConsult || ''}</td></tr>
<tr><td>Requires approval</td><td>${d.needsApproval || ''}</td></tr>
<tr><td>Budget authority</td><td>${d.budget || ''}</td></tr>
</table>

<h2>Required vs. learnable capabilities <span class="badge must">MUST</span> <span class="controls">RG-003</span></h2>
<p style="font-size:12px;color:#64748b;margin:0 0 8px">Required: would reject an otherwise strong candidate without this. Learnable: can develop in 6-12 months.</p>
<table>
<tr><td>Required at hire</td><td>${d.required || ''}</td></tr>
<tr><td>Learnable post-hire</td><td>${d.learnable || ''}</td></tr>
</table>
${d.antiReqs ? `<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:14px;margin:12px 0"><div style="font-size:12px;font-weight:600;color:#991b1b;margin-bottom:4px">Explicitly NOT required</div><div style="font-size:13px;color:#7f1d1d">${d.antiReqs}</div></div>` : ''}

<h2>Scope indicators <span class="badge should">SHOULD</span> <span class="controls">RG-005</span></h2>
<table>
<tr><td>Direct reports</td><td>${d.directs || 'N/A'}</td></tr>
<tr><td>Indirect / cross-functional</td><td>${d.indirects || 'N/A'}</td></tr>
<tr><td>Geographic span</td><td>${d.geoSpan || 'N/A'}</td></tr>
<tr><td>Stakeholder exposure</td><td>${d.stakeholders || 'N/A'}</td></tr>
<tr><td>Ambiguity level</td><td>${d.ambiguity || 'N/A'}</td></tr>
</table>

<div class="ft">
<div>HCCS™ Role Definition Worksheet | Generated: ${date}</div>
<div style="margin-top:4px">This document satisfies RG-001 (definition exists), RG-002 (outcomes), RG-003 (required vs learnable), RG-004 (decision rights), RG-005 (scope).</div>
<div style="margin-top:4px">© 2026 IngenuityCo LLC | hccsstandard.com</div>
</div>
</body></html>`
    const w = window.open('', '_blank'); w.document.write(html); w.document.close()
  }

  const F = (k, l, ph, type = 'text') => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>{l}</label>
      {type === 'textarea' ? (
        <textarea value={d[k]} onChange={e => set(k, e.target.value)} placeholder={ph} rows={3}
          style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.5 }} />
      ) : (
        <input type="text" value={d[k]} onChange={e => set(k, e.target.value)} placeholder={ph}
          style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
      )}
    </div>
  )

  return (
    <div>
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 10, padding: '16px 20px', marginBottom: 24 }}>
        <div style={{ fontSize: 14, color: '#1e40af', lineHeight: 1.6 }}>
          This tool generates a role definition that satisfies <strong>RG-001 through RG-005</strong>. Complete before sourcing begins. The output is an audit-ready document you can print or save as PDF.
        </div>
      </div>

      <div style={{ fontSize: 16, fontWeight: 700, color: '#185FA5', marginBottom: 12, paddingBottom: 6, borderBottom: '2px solid #185FA520' }}>Role information</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {F('title', 'Role title', 'e.g. Senior Backend Engineer')}
        {F('dept', 'Department', 'e.g. Engineering')}
        {F('reportsTo', 'Reports to', 'e.g. VP Engineering')}
      </div>

      <div style={{ fontSize: 16, fontWeight: 700, color: '#185FA5', marginBottom: 12, paddingBottom: 6, borderBottom: '2px solid #185FA520', marginTop: 20 }}>Business outcomes (RG-002)</div>
      <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 12px' }}>What will this person <strong>deliver or change</strong>? Not activities they perform. "Reduce incidents by 40%" not "attend standups."</p>
      {F('outcome1', 'Primary outcome (the reason this role exists)', 'e.g. Reduce production incidents by 40% in 12 months', 'textarea')}
      {F('outcome2', 'Secondary outcome', 'e.g. Own and execute migration from monolith to microservices', 'textarea')}
      {F('outcome3', 'Tertiary outcome (optional)', 'e.g. Mentor 2 junior engineers to mid-level within 18 months', 'textarea')}

      <div style={{ fontSize: 16, fontWeight: 700, color: '#185FA5', marginBottom: 12, paddingBottom: 6, borderBottom: '2px solid #185FA520', marginTop: 20 }}>Decision rights & accountability (RG-004)</div>
      {F('decidesAlone', 'Decides independently', 'e.g. Implementation approach, code review standards, tool selection under $10K', 'textarea')}
      {F('decidesConsult', 'Decides with consultation', 'e.g. Architecture changes affecting other teams, hiring for their team', 'textarea')}
      {F('needsApproval', 'Requires approval', 'e.g. Budget over $50K, vendor contracts, cross-org commitments', 'textarea')}
      {F('budget', 'Budget authority', 'e.g. Up to $50K independently, $50K-200K with VP approval')}

      <div style={{ fontSize: 16, fontWeight: 700, color: '#185FA5', marginBottom: 12, paddingBottom: 6, borderBottom: '2px solid #185FA520', marginTop: 20 }}>Required vs. learnable capabilities (RG-003)</div>
      <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 12px' }}>For each capability ask: "Would I reject someone strong on everything else if they lacked this?" If no, it's learnable.</p>
      {F('required', 'Required at hire (non-negotiable)', 'e.g. Led teams of 10+ through production migrations\nDesigned systems handling 1M+ daily transactions\nIncident command experience at scale', 'textarea')}
      {F('learnable', 'Learnable post-hire (6-12 months)', 'e.g. Company deployment pipeline\nInternal monitoring toolchain\nDomain-specific business logic', 'textarea')}
      {F('antiReqs', 'Explicitly NOT required (optional but powerful)', 'e.g. CS degree, specific company pedigree, continuous employment history', 'textarea')}

      <div style={{ fontSize: 16, fontWeight: 700, color: '#185FA5', marginBottom: 12, paddingBottom: 6, borderBottom: '2px solid #185FA520', marginTop: 20 }}>Scope indicators (RG-005)</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {F('directs', 'Direct reports', 'e.g. 8')}
        {F('indirects', 'Indirect / cross-functional', 'e.g. 35 across 3 teams')}
        {F('geoSpan', 'Geographic span', 'e.g. 3 time zones, US + EU')}
        {F('stakeholders', 'Stakeholder exposure', 'e.g. VP+, board quarterly')}
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Ambiguity level</label>
        <select value={d.ambiguity} onChange={e => set('ambiguity', e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, background: '#fff' }}>
          <option value="">Select...</option>
          {AMBIGUITY.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
      </div>

      {!canUse('jd') ? <UpgradePrompt toolId="jd" /> : (
      <div style={{ display: 'flex', gap: 12, marginTop: 28, paddingTop: 20, borderTop: '1px solid #e2e8f0' }}>
        <button onClick={() => { incrementUsage('jd'); generate(); }} style={{ padding: '14px 28px', borderRadius: 8, border: 'none', background: '#185FA5', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>Generate role definition</button>
        <button onClick={() => setD({ title: '', dept: '', reportsTo: '', outcome1: '', outcome2: '', outcome3: '', decidesAlone: '', decidesConsult: '', needsApproval: '', budget: '', required: '', learnable: '', directs: '', indirects: '', geoSpan: '', stakeholders: '', ambiguity: '', antiReqs: '' })}
          style={{ padding: '14px 28px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 15, cursor: 'pointer' }}>Clear</button>
      </div>
      )}
    </div>
  )
}

function ScorecardGenerator() {
  const [d, setD] = useState({ role: '', c1: '', c2: '', c3: '', c4: '', c5: '' })
  const set = (k, v) => setD(p => ({ ...p, [k]: v }))
  const criteria = [d.c1, d.c2, d.c3, d.c4, d.c5].filter(Boolean)

  const generate = () => {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const rows = criteria.map((c, i) => `<tr><td style="font-weight:600;width:25%">${c}</td><td style="text-align:center;width:8%"><input type="text" style="width:30px;text-align:center;border:1px solid #ccc;border-radius:4px;padding:4px;font-size:14px" /></td><td><div style="min-height:60px;border:1px solid #e2e8f0;border-radius:6px;padding:8px;font-size:12px;color:#94a3b8">Evidence and rationale...</div></td></tr>`).join('')
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Scorecard - ${d.role}</title>
<style>@media print{body{margin:0}.no-print{display:none!important}}body{font-family:Helvetica,Arial,sans-serif;color:#1e293b;max-width:780px;margin:0 auto;padding:40px;font-size:13px}h1{font-size:20px}table{width:100%;border-collapse:collapse}th{background:#0F6E56;color:#fff;padding:10px;text-align:left;font-size:12px}td{padding:10px;border-bottom:1px solid #f1f5f9;vertical-align:top;font-size:13px}.toolbar{padding:12px 0;margin-bottom:12px;border-bottom:1px solid #e2e8f0}.toolbar button{padding:8px 16px;border-radius:6px;border:none;background:#2563eb;color:#fff;font-size:13px;font-weight:600;cursor:pointer}.ft{margin-top:24px;padding-top:12px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;text-align:center}</style></head><body>
<div class="no-print toolbar"><button onclick="window.print()">Print / Save PDF</button></div>
<h1>Candidate Evaluation Scorecard</h1>
<div style="font-size:13px;color:#64748b;margin-bottom:4px">Role: <strong>${d.role}</strong> | Date: __________ | Evaluator: __________</div>
<div style="font-size:13px;color:#64748b;margin-bottom:16px">Candidate: __________ | Interview type: __________</div>
<div style="font-size:12px;color:#0F6E56;font-weight:600;margin-bottom:8px">Satisfies: EI-002 (consistent criteria), EI-004 (documented rationale)</div>
<table><tr><th>Criterion</th><th>Score (1-5)</th><th>Evidence & rationale (what did the candidate say/do?)</th></tr>${rows}
<tr><td style="font-weight:600">Overall recommendation</td><td colspan="2"><div style="display:flex;gap:16px;font-size:13px;padding:8px 0">☐ Advance &nbsp; ☐ Do not advance &nbsp; ☐ Hold</div><div style="min-height:40px;border:1px solid #e2e8f0;border-radius:6px;padding:8px;font-size:12px;color:#94a3b8">Additional notes...</div></td></tr></table>
<div style="font-size:12px;color:#64748b;margin-top:16px;background:#f8fafc;padding:12px;border-radius:6px"><strong>Scoring guide:</strong> 1 = No evidence demonstrated. 2 = Limited evidence. 3 = Meets expectations. 4 = Exceeds expectations. 5 = Exceptional, among the strongest seen.</div>
<div class="ft">HCCS™ Scorecard | Controls: EI-002, EI-004 | © 2026 IngenuityCo LLC</div></body></html>`
    const w = window.open('', '_blank'); w.document.write(html); w.document.close()
  }

  return (
    <div>
      <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 10, padding: '16px 20px', marginBottom: 24, fontSize: 14, color: '#065f46', lineHeight: 1.6 }}>
        Input your evaluation criteria (derived from the role definition per EI-001). Generates a printable scorecard with scoring guide.
      </div>
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Role title</label>
        <input value={d.role} onChange={e => set('role', e.target.value)} placeholder="e.g. Senior Backend Engineer" style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
      </div>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{ marginBottom: 10 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>Criterion {i}{i > 3 ? ' (optional)' : ''}</label>
          <input value={d[`c${i}`]} onChange={e => set(`c${i}`, e.target.value)} placeholder={['e.g. System design at scale','e.g. Cross-team leadership','e.g. Incident response','',''][i-1]} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
        </div>
      ))}
      {!canUse('scorecard') ? <UpgradePrompt toolId="scorecard" /> :
      <button onClick={() => { incrementUsage('scorecard'); generate(); }} disabled={!d.role || criteria.length < 2} style={{ marginTop: 16, padding: '14px 28px', borderRadius: 8, border: 'none', background: criteria.length >= 2 ? '#0F6E56' : '#94a3b8', color: '#fff', fontSize: 15, fontWeight: 600, cursor: criteria.length >= 2 ? 'pointer' : 'default' }}>Generate scorecard</button>}
    </div>
  )
}

function BiasChecker() {
  const [text, setText] = useState('')
  const [results, setResults] = useState(null)

  const PATTERNS = [
    { pattern: /(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/gi, flag: 'Proxy language', fix: 'Replace years of experience with demonstrated capability. "10 years experience" → "Has led platform migrations at scale."', severity: 'high' },
    { pattern: /rockstar|ninja|guru|wizard|unicorn|hustler|crusher/gi, flag: 'Exclusionary language', fix: 'These terms signal culture fit over capability and discourage diverse applicants.', severity: 'high' },
    { pattern: /culture\s*fit/gi, flag: 'Undefined criterion', fix: '"Culture fit" is not measurable. Replace with specific behavioral criteria.', severity: 'high' },
    { pattern: /top[- ]tier\s*(university|school|college|program)/gi, flag: 'Proxy: institution prestige', fix: 'Credential bias. Assess capability, not pedigree.', severity: 'high' },
    { pattern: /fast[- ]paced|high[- ]energy|work\s*hard\s*play\s*hard/gi, flag: 'Potential age/disability bias', fix: 'May discourage candidates with disabilities or caregiving responsibilities.', severity: 'medium' },
    { pattern: /native\s*(english|speaker)/gi, flag: 'Potential national origin bias', fix: 'If communication is required, specify "professional proficiency" not native status.', severity: 'high' },
    { pattern: /young|energetic|digital\s*native/gi, flag: 'Age bias indicator', fix: 'These terms correlate with age discrimination claims.', severity: 'high' },
    { pattern: /salary\s*history|current\s*(salary|compensation|pay)/gi, flag: 'Salary history (banned in many jurisdictions)', fix: 'HCCS CG-001 requires factor-based compensation, not salary history.', severity: 'high' },
    { pattern: /must\s*have\s*(BA|BS|MBA|PhD|degree|bachelor|master)/gi, flag: 'Credential requirement', fix: 'Is the degree required or is the knowledge? Many capable candidates lack formal degrees.', severity: 'medium' },
    { pattern: /no\s*gaps?\s*(in|on)\s*(resume|employment|work)/gi, flag: 'Employment gap bias', fix: 'Continuous employment is not a predictor of job performance. Remove this requirement.', severity: 'high' },
  ]

  const check = () => {
    const found = []
    PATTERNS.forEach(p => {
      const matches = text.match(p.pattern)
      if (matches) {
        matches.forEach(m => found.push({ text: m, ...p }))
      }
    })
    setResults(found)
  }

  return (
    <div>
      <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 10, padding: '16px 20px', marginBottom: 24, fontSize: 14, color: '#4c1d95', lineHeight: 1.6 }}>
        Paste a job posting, role definition, or evaluation criteria below. The checker flags proxy language, inflated requirements, and bias patterns per EI-003 and DG-005.
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your job posting or role definition here..." rows={10}
        style={{ width: '100%', padding: '14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.6 }} />
      <button onClick={check} disabled={!text.trim()} style={{ marginTop: 12, padding: '14px 28px', borderRadius: 8, border: 'none', background: text.trim() ? '#534AB7' : '#94a3b8', color: '#fff', fontSize: 15, fontWeight: 600, cursor: text.trim() ? 'pointer' : 'default' }}>Check for bias patterns</button>

      {results !== null && (
        <div style={{ marginTop: 24 }}>
          {results.length === 0 ? (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#166534', marginBottom: 4 }}>No common bias patterns detected</div>
              <div style={{ fontSize: 14, color: '#15803d' }}>This doesn't mean it's perfect. Consider having it reviewed against EI-003 (capability vs proxy) manually.</div>
            </div>
          ) : (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#991b1b', marginBottom: 12 }}>{results.length} issue{results.length > 1 ? 's' : ''} found</div>
              {results.map((r, i) => (
                <div key={i} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: i < results.length - 1 ? '1px solid #fecaca' : 'none' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: r.severity === 'high' ? '#dc2626' : '#d97706', color: '#fff' }}>{r.severity}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#991b1b' }}>{r.flag}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#7f1d1d', marginBottom: 4 }}>Found: "<strong>{r.text}</strong>"</div>
                  <div style={{ fontSize: 13, color: '#1e40af', background: '#eff6ff', padding: '8px 10px', borderRadius: 6 }}>Fix: {r.fix}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function CompCalculator() {
  const [scores, setScores] = useState({ authority: 3, complexity: 3, accountability: 3, impact: 3, expertise: 3 })
  const set = (k, v) => setScores(p => ({ ...p, [k]: v }))
  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const avg = total / 5

  const bands = [
    { min: 1, max: 1.8, range: '$45,000 - $70,000', level: 'Entry / Junior' },
    { min: 1.8, max: 2.5, range: '$65,000 - $100,000', level: 'Mid-level' },
    { min: 2.5, max: 3.2, range: '$95,000 - $150,000', level: 'Senior' },
    { min: 3.2, max: 4.0, range: '$140,000 - $220,000', level: 'Staff / Director' },
    { min: 4.0, max: 5.0, range: '$200,000 - $350,000+', level: 'VP / Executive' },
  ]
  const band = bands.find(b => avg >= b.min && avg < b.max) || bands[bands.length - 1]

  const factors = [
    { key: 'authority', label: 'Authority', desc: 'Decision scope, approval power, budget control' },
    { key: 'complexity', label: 'Complexity', desc: 'Ambiguity, cross-functional, technical depth' },
    { key: 'accountability', label: 'Accountability', desc: 'What breaks if this role fails, regulatory exposure' },
    { key: 'impact', label: 'Impact', desc: 'Revenue, cost, strategic, organizational scope' },
    { key: 'expertise', label: 'Expertise', desc: 'Specialization, rarity, depth required' },
  ]

  return (
    <div>
      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '16px 20px', marginBottom: 24, fontSize: 14, color: '#065f46', lineHeight: 1.6 }}>
        Score each factor 1-5. The calculator suggests a compensation band based on role scope, not title or salary history (CG-001).
      </div>
      {factors.map(f => (
        <div key={f.key} style={{ marginBottom: 16, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{f.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#3B6D11' }}>{scores[f.key]}</div>
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>{f.desc}</div>
          <input type="range" min="1" max="5" value={scores[f.key]} onChange={e => set(f.key, +e.target.value)} style={{ width: '100%' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94a3b8' }}>
            <span>1 - Minimal</span><span>3 - Moderate</span><span>5 - Maximum</span>
          </div>
        </div>
      ))}
      <div style={{ background: '#0f172a', borderRadius: 12, padding: 24, textAlign: 'center', marginTop: 20 }}>
        <div style={{ fontSize: 13, color: '#5b9bd5', fontWeight: 600, marginBottom: 4 }}>Factor-derived compensation band</div>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{band.range}</div>
        <div style={{ fontSize: 14, color: '#94a3b8' }}>Average factor score: {avg.toFixed(1)} / 5.0 | Level: {band.level}</div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 8 }}>Factor profile: {Object.values(scores).join('/')}</div>
      </div>
    </div>
  )
}

function ADTChecklist() {
  const [tools, setTools] = useState([{ name: '', vendor: '', function: '', owner: '', explainable: '', tested: '', humanReview: '' }])
  const set = (i, k, v) => setTools(p => p.map((t, j) => j === i ? { ...t, [k]: v } : t))
  const add = () => setTools(p => [...p, { name: '', vendor: '', function: '', owner: '', explainable: '', tested: '', humanReview: '' }])

  const generate = () => {
    const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    const rows = tools.filter(t => t.name).map(t => `<tr><td>${t.name}</td><td>${t.vendor}</td><td>${t.function}</td><td>${t.owner || 'TBD'}</td><td style="color:${t.explainable === 'Yes' ? '#059669' : '#dc2626'};font-weight:600">${t.explainable || 'No'}</td><td style="color:${t.tested === 'Yes' ? '#059669' : '#dc2626'};font-weight:600">${t.tested || 'No'}</td><td style="color:${t.humanReview === 'Yes' ? '#059669' : '#dc2626'};font-weight:600">${t.humanReview || 'No'}</td></tr>`).join('')
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>ADT Inventory</title>
<style>@media print{body{margin:0}.no-print{display:none!important}}body{font-family:Helvetica,Arial,sans-serif;color:#1e293b;max-width:900px;margin:0 auto;padding:40px;font-size:13px}h1{font-size:20px}table{width:100%;border-collapse:collapse}th{background:#993C1D;color:#fff;padding:8px 10px;text-align:left;font-size:11px}td{padding:8px 10px;border-bottom:1px solid #f1f5f9;font-size:12px}.toolbar{padding:12px 0;margin-bottom:12px;border-bottom:1px solid #e2e8f0}.toolbar button{padding:8px 16px;border-radius:6px;border:none;background:#2563eb;color:#fff;font-size:13px;font-weight:600;cursor:pointer}.ft{margin-top:24px;padding-top:12px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;text-align:center}</style></head><body>
<div class="no-print toolbar"><button onclick="window.print()">Print / Save PDF</button></div>
<h1>Automated Decision Tool (ADT) Inventory</h1>
<div style="font-size:12px;color:#64748b;margin-bottom:12px">Generated: ${date} | Satisfies: AG-001, AG-003, AG-007</div>
<table><tr><th>Tool</th><th>Vendor</th><th>Function</th><th>Owner (AG-007)</th><th>Explainable (AG-003)</th><th>Impact Tested (AG-004)</th><th>Human Review (AG-002)</th></tr>${rows}</table>
<div class="ft">HCCS™ ADT Inventory | © 2026 IngenuityCo LLC</div></body></html>`
    const w = window.open('', '_blank'); w.document.write(html); w.document.close()
  }

  return (
    <div>
      <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 10, padding: '16px 20px', marginBottom: 24, fontSize: 14, color: '#9a3412', lineHeight: 1.6 }}>
        Document every tool that filters, scores, ranks, or recommends candidates. AG-001 requires a complete inventory. If you can't list them all, that's your first finding.
      </div>
      {tools.map((t, i) => (
        <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#993C1D', marginBottom: 10 }}>Tool {i + 1}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[['name','Tool name','e.g. Greenhouse auto-screen'],['vendor','Vendor','e.g. Greenhouse'],['function','Function in pipeline','e.g. Resume keyword screening']].map(([k,l,ph]) => (
              <div key={k}>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>{l}</label>
                <input value={t[k]} onChange={e => set(i, k, e.target.value)} placeholder={ph} style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 10, marginTop: 10 }}>
            {[['owner','Accountable owner (AG-007)'],['explainable','Can explain how it works? (AG-003)'],['tested','Disparate impact tested? (AG-004)'],['humanReview','Human review in place? (AG-002)']].map(([k,l]) => (
              <div key={k}>
                <label style={{ fontSize: 11, fontWeight: 600, color: '#334155' }}>{l}</label>
                <select value={t[k]} onChange={e => set(i, k, e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: 6, border: '1px solid #e2e8f0', fontSize: 13, background: '#fff' }}>
                  <option value="">--</option><option value="Yes">Yes</option><option value="No">No</option><option value="Partial">Partial</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={add} style={{ padding: '10px 20px', borderRadius: 8, border: '1px dashed #e2e8f0', background: '#fff', color: '#64748b', fontSize: 13, cursor: 'pointer', width: '100%' }}>+ Add another tool</button>
      {!canUse('adt') ? <UpgradePrompt toolId="adt" /> :
      <button onClick={() => { incrementUsage('adt'); generate(); }} disabled={!tools.some(t => t.name)} style={{ marginTop: 16, padding: '14px 28px', borderRadius: 8, border: 'none', background: tools.some(t => t.name) ? '#993C1D' : '#94a3b8', color: '#fff', fontSize: 15, fontWeight: 600, cursor: tools.some(t => t.name) ? 'pointer' : 'default' }}>Generate inventory report</button>}
    </div>
  )
}
