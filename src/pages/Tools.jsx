import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isPro, canUse, incrementUsage, getRemainingUses, FREE_LIMITS } from '../lib/subscription'
import { ProBadge, UsageBadge, UpgradePrompt } from '../components/ProGate'

const AMBIGUITY = ['Low - well-defined problems, clear solutions', 'Medium - some ambiguity, requires judgment', 'High - novel problems, no established playbook']

export default function Tools() {
  const [active, setActive] = useState(null)

  const tools = [
    { id: 'jd', title: 'Role Design System', desc: 'v2: Why the role exists, what\'s broken, outcomes with baselines, boundaries, team scope, risk, milestones. Internal artifact + public posting.', controls: 'RG-001 to RG-007', color: '#185FA5', component: <JDBuilder /> },
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
        {(() => { try { const j = JSON.parse(localStorage.getItem('hccs_jd') || '{}'); return j.title || null } catch { return null } })() && (
          <div style={{ maxWidth: 900, margin: '0 auto 20px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1e40af' }}>Active workflow: {(() => { try { return JSON.parse(localStorage.getItem('hccs_jd')).title } catch { return '' } })()}</div>
              <div style={{ fontSize: 13, color: '#3b82f6' }}>Scorecard, bias checker, and comp calculator will pre-fill from this role definition.</div>
            </div>
            <button onClick={() => { localStorage.removeItem('hccs_jd'); window.location.reload() }} style={{ padding: '6px 14px', borderRadius: 6, border: '1px solid #bfdbfe', background: '#fff', color: '#3b82f6', fontSize: 12, cursor: 'pointer' }}>Clear</button>
          </div>
        )}
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
  const defaultJD = { title:'',dept:'',reportsTo:'',roleType:'',whyNow:'',currentState:'',outcome1:'',baseline1:'',target1:'',outcome2:'',baseline2:'',target2:'',outcome3:'',baseline3:'',target3:'',steadyState:'',d90:'',d180:'',d365:'',decidesAlone:'',decidesConsult:'',needsApproval:'',vetoAuthority:'',accountableTo:'',budget:'',notOwned:'',partnerTeams:'',influencedMetrics:'',required:'',learnable:'',antiReqs:'',evidencePrompts:'',directs:'',directRoles:'',directLevels:'',teamMandate:'',openReqs:'',indirects:'',geoSpan:'',stakeholders:'',ambiguity:'',companyStage:'',structure:'',environment:'',travel:'',workModel:'',systemFragmentation:'',scale:'',riskReduces:'',failureImpact:'' }
  const [d, setD] = useState(() => {
    try { const saved = localStorage.getItem('hccs_jd'); return saved ? { ...defaultJD, ...JSON.parse(saved) } : defaultJD } catch { return defaultJD }
  })
  const set = (k, v) => setD(p => { const next = { ...p, [k]: v }; localStorage.setItem('hccs_jd', JSON.stringify(next)); return next })

  // Smart warnings
  const warnings = []
  if (d.outcome1 && !d.baseline1) warnings.push('Outcome 1 has no baseline. Without a starting point, the outcome cannot be audited.')
  if (d.outcome2 && !d.baseline2) warnings.push('Outcome 2 has no baseline.')
  if (d.ambiguity?.includes('High') && !d.decidesAlone) warnings.push('High ambiguity with no independent decision authority. This role will be paralyzed.')
  if (d.directs && !d.directRoles) warnings.push('Direct reports listed but team composition undefined. A Director of 6 recruiters is a different role than a Director of 6 regional leads.')
  if (d.stakeholders?.toLowerCase().includes('board') && !d.budget) warnings.push('Board-level stakeholder exposure with no budget authority defined.')
  if (d.geoSpan?.includes('EU') && !d.environment) warnings.push('EMEA scope defined but no regulatory/legal complexity noted.')
  if (!d.notOwned && d.title) warnings.push('No role boundaries defined. Without explicit edges, scope expands by assumption.')
  if (!d.whyNow && d.title) warnings.push('No context for why this role exists now. Outcomes without context become abstract or inflated.')
  if (d.required && !d.evidencePrompts) warnings.push('Required capabilities listed but no evidence prompts defined. Interviewers won\'t know what to look for.')
  if (!d.d90 && d.title) warnings.push('No 90-day milestone. Without near-term expectations, onboarding drifts.')

  const generate = () => {
    localStorage.setItem('hccs_jd', JSON.stringify(d))
    const date = new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})
    const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Role Definition - ${d.title}</title>
<style>
@media print{body{margin:0}.no-print{display:none!important}}
body{font-family:Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.6;max-width:780px;margin:0 auto;padding:40px;font-size:13px}
h1{font-size:24px;margin:0 0 4px}h2{font-size:15px;color:#185FA5;margin:24px 0 8px;padding-bottom:4px;border-bottom:2px solid #185FA520}
.hdr{background:linear-gradient(135deg,#0a1628,#1a2d4a);color:#fff;padding:28px 32px;border-radius:12px;margin-bottom:20px}
.hdr h1{color:#fff}.hdr .s{color:#94a3b8;font-size:12px;margin-top:4px}
table{width:100%;border-collapse:collapse;margin:8px 0}td{padding:7px 10px;border:1px solid #e2e8f0;font-size:12px;vertical-align:top}
td:first-child{font-weight:600;width:35%;background:#f8fafc}
.badge{display:inline-block;padding:2px 6px;border-radius:4px;font-size:10px;font-weight:700;margin-left:4px}
.must{background:#fef2f2;color:#991b1b;border:1px solid #fecaca}.should{background:#fefce8;color:#854d0e;border:1px solid #fde68a}
.warn{background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px;margin:12px 0;font-size:12px;color:#991b1b}
.ctrls{font-size:10px;color:#94a3b8}
.toolbar{display:flex;gap:8px;padding:12px 0;margin-bottom:12px;border-bottom:1px solid #e2e8f0}
.toolbar button{padding:8px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;border:none;background:#2563eb;color:#fff}
.ft{margin-top:28px;padding-top:12px;border-top:1px solid #e2e8f0;font-size:10px;color:#94a3b8;text-align:center}
</style></head><body>
<div class="no-print toolbar"><button onclick="window.print()">Save as PDF</button></div>
<div class="hdr">
<div style="font-size:10px;color:#5b9bd5;letter-spacing:0.15em;margin-bottom:4px">HCCS\u2122 ROLE DEFINITION WORKSHEET v2</div>
<h1>${d.title||'Role Title'}</h1>
<div class="s">${d.dept||'Department'} | Reports to: ${d.reportsTo||'TBD'} | ${d.roleType||'New role'} | Defined: ${date}</div>
<div class="s">Controls satisfied: RG-001 through RG-007</div>
</div>

<h2>Current state & role origin <span class="badge must">MUST</span></h2>
<table>
<tr><td>Role type</td><td>${d.roleType||'Not specified'}</td></tr>
<tr><td>Why this role exists now</td><td>${d.whyNow||'Not specified'}</td></tr>
<tr><td>Current state / what is broken</td><td>${d.currentState||'Not specified'}</td></tr>
</table>

<h2>Business outcomes with baselines <span class="badge must">MUST</span> <span class="ctrls">RG-002</span></h2>
<table>
<tr style="background:#f1f5f9"><td colspan="2" style="font-weight:600">Primary outcome</td></tr>
<tr><td>Outcome</td><td>${d.outcome1||''}</td></tr>
<tr><td>Current baseline</td><td>${d.baseline1||'Not defined'}</td></tr>
<tr><td>Target state</td><td>${d.target1||'Not defined'}</td></tr>
${d.outcome2?`<tr style="background:#f1f5f9"><td colspan="2" style="font-weight:600">Secondary outcome</td></tr>
<tr><td>Outcome</td><td>${d.outcome2}</td></tr>
<tr><td>Current baseline</td><td>${d.baseline2||'Not defined'}</td></tr>
<tr><td>Target state</td><td>${d.target2||'Not defined'}</td></tr>`:''}
${d.outcome3?`<tr style="background:#f1f5f9"><td colspan="2" style="font-weight:600">Tertiary outcome</td></tr>
<tr><td>Outcome</td><td>${d.outcome3}</td></tr>
<tr><td>Baseline / Target</td><td>${d.baseline3||''} \u2192 ${d.target3||''}</td></tr>`:''}
</table>

<h2>Steady state vs. transformation mandate</h2>
<table>
<tr><td>Ongoing purpose (steady state)</td><td>${d.steadyState||'Not specified'}</td></tr>
<tr><td>90-day milestone</td><td>${d.d90||'Not specified'}</td></tr>
<tr><td>6-month milestone</td><td>${d.d180||'Not specified'}</td></tr>
<tr><td>12-month milestone</td><td>${d.d365||'Not specified'}</td></tr>
</table>

<h2>Decision rights & accountability <span class="badge must">MUST</span> <span class="ctrls">RG-004</span></h2>
<table>
<tr><td>Decides independently</td><td>${d.decidesAlone||''}</td></tr>
<tr><td>Decides with consultation</td><td>${d.decidesConsult||''}</td></tr>
<tr><td>Requires approval</td><td>${d.needsApproval||''}</td></tr>
<tr><td>Budget authority</td><td>${d.budget||''}</td></tr>
<tr><td>Veto authority</td><td>${d.vetoAuthority||'None defined'}</td></tr>
<tr><td>Accountable to (if this fails)</td><td>${d.accountableTo||'Not specified'}</td></tr>
</table>

<h2>Role boundaries: what this role does NOT own</h2>
<table>
<tr><td>Out of scope responsibilities</td><td>${d.notOwned||'Not defined'}</td></tr>
<tr><td>Partner teams (not owned)</td><td>${d.partnerTeams||'Not defined'}</td></tr>
<tr><td>Influenced but not owned metrics</td><td>${d.influencedMetrics||'Not defined'}</td></tr>
</table>

<h2>Required vs. learnable capabilities <span class="badge must">MUST</span> <span class="ctrls">RG-003</span></h2>
<table>
<tr><td>Required at hire</td><td>${d.required||''}</td></tr>
<tr><td>Learnable post-hire</td><td>${d.learnable||''}</td></tr>
<tr><td>Evidence prompts</td><td>${d.evidencePrompts||'Not defined'}</td></tr>
</table>
${d.antiReqs?`<div style="background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:10px;margin:8px 0;font-size:12px"><strong style="color:#991b1b">Explicitly NOT required:</strong> ${d.antiReqs}</div>`:''}

<h2>Team scope <span class="badge should">SHOULD</span> <span class="ctrls">RG-005</span></h2>
<table>
<tr><td>Direct reports</td><td>${d.directs||'N/A'}</td></tr>
<tr><td>Team composition</td><td>${d.directRoles||'Not specified'}</td></tr>
<tr><td>Report levels</td><td>${d.directLevels||'Not specified'}</td></tr>
<tr><td>Team mandate</td><td>${d.teamMandate||'Not specified'}</td></tr>
<tr><td>Open reqs on team</td><td>${d.openReqs||'Not specified'}</td></tr>
<tr><td>Indirect / cross-functional</td><td>${d.indirects||'N/A'}</td></tr>
<tr><td>Geographic span</td><td>${d.geoSpan||'N/A'}</td></tr>
<tr><td>Stakeholder exposure</td><td>${d.stakeholders||'N/A'}</td></tr>
<tr><td>Ambiguity level</td><td>${d.ambiguity||'N/A'}</td></tr>
</table>

<h2>Operating environment</h2>
<table>
<tr><td>Company stage / maturity</td><td>${d.companyStage||'Not specified'}</td></tr>
<tr><td>Centralized vs decentralized</td><td>${d.structure||'Not specified'}</td></tr>
<tr><td>Regulatory / legal complexity</td><td>${d.environment||'Not specified'}</td></tr>
<tr><td>Travel / work model</td><td>${[d.workModel,d.travel].filter(Boolean).join('. ')||'Not specified'}</td></tr>
<tr><td>System / tool fragmentation</td><td>${d.systemFragmentation||'Not specified'}</td></tr>
<tr><td>Volume / scale</td><td>${d.scale||'Not specified'}</td></tr>
</table>

<h2>Risk & failure modes</h2>
<table>
<tr><td>Risks this role reduces</td><td>${d.riskReduces||'Not specified'}</td></tr>
<tr><td>Impact if role underperforms</td><td>${d.failureImpact||'Not specified'}</td></tr>
</table>

${warnings.length>0?`<div class="warn"><strong>Tool-generated warnings (${warnings.length}):</strong><ul style="margin:6px 0 0;padding-left:18px">${warnings.map(w=>`<li>${w}</li>`).join('')}</ul></div>`:''}

<div class="ft">
<div>HCCS\u2122 Role Definition Worksheet v2 | ${date}</div>
<div style="margin-top:3px">Controls: RG-001 (exists), RG-002 (outcomes + baselines), RG-003 (required vs learnable), RG-004 (decision rights + accountability), RG-005 (scope + team + environment)</div>
<div style="margin-top:3px">\u00A9 2026 IngenuityCo LLC | hccsstandard.com</div>
</div></body></html>`
    const w=window.open('','_blank');w.document.write(html);w.document.close()
  }

  const generatePosting = () => {
    const reqList=(d.required||'').split('\n').filter(Boolean).map(r=>`<li>${r.trim()}</li>`).join('')
    const learnList=(d.learnable||'').split('\n').filter(Boolean).map(r=>`<li>${r.trim()}</li>`).join('')
    const antiList=(d.antiReqs||'').split('\n').filter(Boolean)
    const outcomes=[d.outcome1,d.outcome2,d.outcome3].filter(Boolean)
    const milestones=[d.d90?{t:'90 days',v:d.d90}:null,d.d180?{t:'6 months',v:d.d180}:null,d.d365?{t:'12 months',v:d.d365}:null].filter(Boolean)
    const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${d.title||'Job Posting'}</title>
<style>
@media print{body{margin:0}.no-print{display:none!important}}
body{font-family:Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.7;max-width:720px;margin:0 auto;padding:40px;font-size:15px}
h1{font-size:28px;color:#0f172a;margin:0 0 8px}h2{font-size:18px;color:#0f172a;margin:28px 0 10px}h3{font-size:15px;color:#475569;margin:18px 0 8px}
ul{margin:8px 0 14px;padding-left:24px}li{margin-bottom:5px}
.dept{font-size:16px;color:#475569;margin-bottom:4px}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0 20px}
.tag{padding:4px 12px;border-radius:16px;font-size:13px;font-weight:500;background:#f1f5f9;color:#475569}
.note{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px;margin:20px 0;font-size:14px;color:#065f46;line-height:1.6}
.milestone{background:#f8fafc;border-left:3px solid #2563eb;padding:10px 14px;margin:6px 0;border-radius:0 6px 6px 0;font-size:14px}
.milestone strong{color:#1e3a5f}
.apply{display:inline-block;background:#2563eb;color:#fff;padding:14px 32px;border-radius:8px;font-size:16px;font-weight:600;text-decoration:none;margin:20px 0}
.toolbar{display:flex;gap:8px;padding:12px 0;margin-bottom:12px;border-bottom:1px solid #e2e8f0}
.toolbar button{padding:8px 16px;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;border:none;background:#2563eb;color:#fff}
.toolbar .sec{background:#fff;color:#334155;border:1px solid #e2e8f0}
.copy-msg{font-size:13px;color:#059669;font-weight:600;margin-left:8px}
.ft{margin-top:32px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;text-align:center}
</style></head><body>
<div class="no-print toolbar">
<button onclick="window.print()">Save as PDF</button>
<button class="sec" onclick="copyText()">Copy as text</button>
<span id="cm"></span>
</div>
<script>function copyText(){var b=document.querySelector('.jd');var r=document.createRange();r.selectNodeContents(b);var s=window.getSelection();s.removeAllRanges();s.addRange(r);document.execCommand('copy');s.removeAllRanges();document.getElementById('cm').textContent='Copied!';document.getElementById('cm').className='copy-msg';}</script>
<div class="jd">
<h1>${d.title||'Role Title'}</h1>
<div class="dept">${d.dept||'Department'}${d.reportsTo?' \u00B7 Reports to '+d.reportsTo:''}</div>
<div class="tags">
${d.directs?`<span class="tag">${d.directs} direct reports</span>`:''}
${d.geoSpan?`<span class="tag">${d.geoSpan}</span>`:''}
${d.workModel?`<span class="tag">${d.workModel}</span>`:''}
${d.companyStage?`<span class="tag">${d.companyStage}</span>`:''}
</div>

${d.whyNow?`<h2>Why this role, why now</h2><p>${d.whyNow}${d.currentState?' '+d.currentState:''}</p>`:''}

<h2>What success looks like</h2>
<p>This role exists to deliver measurable outcomes, not perform activities:</p>
<ul>${outcomes.map(o=>`<li><strong>${o}</strong></li>`).join('')}</ul>

${milestones.length>0?`<h3>What we expect by when</h3>${milestones.map(m=>`<div class="milestone"><strong>${m.t}:</strong> ${m.v}</div>`).join('')}`:''}

<h2>What you'll own</h2>
<p>This role has real decision-making authority:</p>
<ul>
${d.decidesAlone?`<li><strong>You decide:</strong> ${d.decidesAlone}</li>`:''}
${d.decidesConsult?`<li><strong>You influence:</strong> ${d.decidesConsult}</li>`:''}
${d.needsApproval?`<li><strong>You escalate:</strong> ${d.needsApproval}</li>`:''}
</ul>
${d.notOwned?`<h3>What this role does not own</h3><p>${d.notOwned}${d.partnerTeams?'. Partner teams: '+d.partnerTeams:''}</p>`:''}

${d.directRoles||d.teamMandate?`<h3>The team</h3><p>${d.directs?d.directs+' direct reports. ':''}${d.directRoles||''}${d.teamMandate?' '+d.teamMandate:''}${d.openReqs?' Open reqs: '+d.openReqs:''}</p>`:''}

<h2>What we're looking for</h2>
<p>Capabilities required to succeed from day one:</p>
${reqList?`<ul>${reqList}</ul>`:''}

${learnList?`<h3>What you'll learn here</h3><p>We don't expect you to know everything. These you'll develop in the first 6-12 months:</p><ul>${learnList}</ul>`:''}

${antiList.length>0?`<div class="note"><strong>What we explicitly do NOT require:</strong><br/>${antiList.join(' \u00B7 ')}<br/><br/>We evaluate on demonstrated capability, not credentials, pedigree, or employment continuity. If you can deliver the outcomes above, we want to hear from you.</div>`:''}

${d.environment||d.scale||d.systemFragmentation?`<h2>The environment</h2><p>${[d.companyStage,d.structure,d.environment,d.scale,d.systemFragmentation].filter(Boolean).join('. ')}.</p>`:''}

<h2>How we hire</h2>
<p>This role is governed by the <strong>HCCS\u2122 Standard</strong>:</p>
<ul>
<li>You will be evaluated against the same criteria as every other candidate</li>
<li>Evaluation is based on what you can <em>do</em>, not where you've <em>been</em></li>
<li>Every decision is documented with rationale</li>
<li>If AI tools are used, you will be informed, and a human reviews every output</li>
</ul>
<p>Read our <a href="https://hccsstandard.com/rights" style="color:#2563eb">Applicant's Bill of Rights</a>.</p>
<a href="#" class="apply no-print">Apply for this role</a>
</div>
<div class="ft">Generated with HCCS\u2122 Role Design System | hccsstandard.com/tools<br/>Controls: RG-001 through RG-005</div>
</body></html>`
    const w=window.open('','_blank');w.document.write(html);w.document.close()
  }

  const F=(k,l,ph,type='text')=>(
    <div style={{marginBottom:12}}>
      <label style={{display:'block',fontSize:12,fontWeight:600,color:'#334155',marginBottom:4}}>{l}</label>
      {type==='textarea'?(<textarea value={d[k]||''} onChange={e=>set(k,e.target.value)} placeholder={ph} rows={2}
        style={{width:'100%',padding:'10px 12px',borderRadius:8,border:'1px solid #e2e8f0',fontSize:14,outline:'none',fontFamily:'inherit',resize:'vertical',boxSizing:'border-box',lineHeight:1.5}}/>
      ):type==='select'?null:(
        <input type="text" value={d[k]||''} onChange={e=>set(k,e.target.value)} placeholder={ph}
          style={{width:'100%',padding:'10px 12px',borderRadius:8,border:'1px solid #e2e8f0',fontSize:14,outline:'none',boxSizing:'border-box'}}/>
      )}
    </div>
  )
  const S=(title)=>(<div style={{fontSize:16,fontWeight:700,color:'#185FA5',marginBottom:8,paddingBottom:4,borderBottom:'2px solid #185FA520',marginTop:24}}>{title}</div>)

  return (
    <div>
      <div style={{background:'#eff6ff',border:'1px solid #bfdbfe',borderRadius:10,padding:'14px 18px',marginBottom:20}}>
        <div style={{fontSize:14,color:'#1e40af',lineHeight:1.6}}>
          <strong>v2: Role Design System.</strong> This goes beyond a JD. It captures why the role exists, what's broken today, measurable outcomes with baselines, role boundaries, team composition, operating conditions, risk, and milestones. Generates both an <strong>internal audit artifact</strong> and a <strong>public job posting</strong>.
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:10,padding:'14px 18px',marginBottom:20}}>
          <div style={{fontSize:13,fontWeight:700,color:'#991b1b',marginBottom:6}}>{warnings.length} warning{warnings.length>1?'s':''}</div>
          {warnings.map((w,i)=>(<div key={i} style={{fontSize:13,color:'#7f1d1d',marginBottom:4,paddingLeft:12,borderLeft:'2px solid #fecaca'}}>{w}</div>))}
        </div>
      )}

      {S('Role information')}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
        {F('title','Role title','e.g. Director of Talent Acquisition Strategy')}
        {F('dept','Department','e.g. People / Human Capital')}
        {F('reportsTo','Reports to','e.g. Chief People Officer')}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        <div style={{marginBottom:12}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#334155',marginBottom:4}}>Role type</label>
          <select value={d.roleType||''} onChange={e=>set('roleType',e.target.value)} style={{width:'100%',padding:'10px 12px',borderRadius:8,border:'1px solid #e2e8f0',fontSize:14,background:'#fff'}}>
            <option value="">Select...</option>
            <option value="Net new role">Net new role</option><option value="Backfill">Backfill</option><option value="Transformation role">Transformation role</option><option value="Turnaround role">Turnaround role</option><option value="Expansion / growth">Expansion / growth</option>
          </select>
        </div>
        {F('whyNow','Why does this role exist now?','What triggered the opening? What problem, gap, or opportunity?','textarea')}
      </div>
      {F('currentState','What is broken, slow, risky, or unclear today?','The current state this role is meant to change. Be specific.','textarea')}

      {S('Business outcomes with baselines (RG-002)')}
      <p style={{fontSize:13,color:'#64748b',margin:'0 0 10px'}}>What will this person deliver? Include the baseline you're measuring from.</p>
      {F('outcome1','Primary outcome','e.g. Reduce time-to-decision by 30% within 12 months','textarea')}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        {F('baseline1','Current baseline','e.g. Average 42 days today')}
        {F('target1','Target state + timeline','e.g. 29 days within 12 months')}
      </div>
      {F('outcome2','Secondary outcome','','textarea')}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        {F('baseline2','Current baseline','')}
        {F('target2','Target state + timeline','')}
      </div>
      {F('outcome3','Tertiary outcome (optional)','','textarea')}

      {S('Steady state vs. transformation mandate')}
      <p style={{fontSize:13,color:'#64748b',margin:'0 0 10px'}}>Separate the ongoing job from the first-year mission. They're not always the same.</p>
      {F('steadyState','Why this role exists in steady state','What this person does ongoing, beyond the initial transformation','textarea')}
      {F('d90','90-day milestone','What should be true by day 90?','textarea')}
      {F('d180','6-month milestone','What should be true by month 6?','textarea')}
      {F('d365','12-month milestone','What should be true by month 12?','textarea')}

      {S('Decision rights & accountability (RG-004)')}
      {F('decidesAlone','Decides independently','','textarea')}
      {F('decidesConsult','Decides with consultation','','textarea')}
      {F('needsApproval','Requires approval','','textarea')}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        {F('budget','Budget authority','e.g. Up to $25K independently')}
        {F('vetoAuthority','Who can veto this role\'s decisions?','e.g. CPO on policy, Legal on compliance')}
      </div>
      {F('accountableTo','If this role fails, who is accountable and what breaks?','Be specific about consequences','textarea')}

      {S('Role boundaries: what this role does NOT own')}
      <p style={{fontSize:13,color:'#64748b',margin:'0 0 10px'}}>Good roles have edges. Without explicit boundaries, scope expands by assumption.</p>
      {F('notOwned','Out of scope responsibilities','e.g. Employer brand, compensation design, enterprise workforce planning','textarea')}
      {F('partnerTeams','Partner teams (not owned)','e.g. HR shared services, Legal, Finance','textarea')}
      {F('influencedMetrics','Metrics that influence this role but are not directly owned','e.g. Overall attrition, employee engagement scores','textarea')}

      {S('Required vs. learnable capabilities (RG-003)')}
      {F('required','Required at hire (one per line)','What would you reject someone for lacking?','textarea')}
      {F('learnable','Learnable post-hire (one per line)','What can they develop in 6-12 months?','textarea')}
      {F('antiReqs','Explicitly NOT required','e.g. Specific ATS platform, name brand company, continuous employment','textarea')}
      {F('evidencePrompts','Evidence prompts: what counts as proof for required capabilities?','e.g. "Describe a process you redesigned. Show the before/after metrics."','textarea')}

      {S('Team scope (RG-005)')}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
        {F('directs','Direct reports','e.g. 6')}
        {F('directRoles','Team composition','e.g. 2 recruiters, 2 ops analysts, 2 coordinators')}
        {F('directLevels','Report levels','e.g. Senior Individual Contributors')}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        <div style={{marginBottom:12}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#334155',marginBottom:4}}>Team mandate</label>
          <select value={d.teamMandate||''} onChange={e=>set('teamMandate',e.target.value)} style={{width:'100%',padding:'10px 12px',borderRadius:8,border:'1px solid #e2e8f0',fontSize:14,background:'#fff'}}>
            <option value="">Select...</option>
            <option value="Build: creating from scratch">Build from scratch</option><option value="Fix: repairing broken systems">Fix / repair</option><option value="Optimize: improving working systems">Optimize / improve</option><option value="Scale: growing what works">Scale / grow</option><option value="Lead: sustaining high performance">Sustain / lead</option>
          </select>
        </div>
        {F('openReqs','Open reqs on the team','e.g. 2 open, backfill + new')}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        {F('indirects','Indirect / cross-functional reach','e.g. 25+ hiring managers, HRBPs')}
        {F('geoSpan','Geographic span','e.g. US + EMEA, 3 time zones')}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        {F('stakeholders','Stakeholder exposure','e.g. VP+, quarterly exec reporting')}
        <div style={{marginBottom:12}}>
          <label style={{display:'block',fontSize:12,fontWeight:600,color:'#334155',marginBottom:4}}>Ambiguity level</label>
          <select value={d.ambiguity||''} onChange={e=>set('ambiguity',e.target.value)} style={{width:'100%',padding:'10px 12px',borderRadius:8,border:'1px solid #e2e8f0',fontSize:14,background:'#fff'}}>
            <option value="">Select...</option>
            {AMBIGUITY.map(a=><option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {S('Operating environment')}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
        {F('companyStage','Company stage','e.g. Series C, 800 employees')}
        {F('structure','Centralized vs decentralized','e.g. Centralized TA function')}
        {F('environment','Regulatory / legal complexity','e.g. GDPR, OFCCP, multi-state')}
        {F('workModel','Work model','e.g. Hybrid, 3 days in office')}
        {F('travel','Travel','e.g. 15%, quarterly onsite')}
        {F('systemFragmentation','System/tool fragmentation','e.g. 3 different ATS across BUs')}
        {F('scale','Volume / scale expectations','e.g. 200 hires/year across 4 BUs')}
      </div>

      {S('Risk & failure modes')}
      <p style={{fontSize:13,color:'#64748b',margin:'0 0 10px'}}>A role is also defined by the risks it exists to contain.</p>
      {F('riskReduces','What risks does this role reduce?','e.g. Inconsistent evaluation, undocumented decisions, AI tool compliance gaps','textarea')}
      {F('failureImpact','What happens if this role underperforms?','e.g. Continued legal exposure, manager-driven hiring with no governance','textarea')}

      {!canUse('jd') ? <UpgradePrompt toolId="jd" /> : (
      <div style={{display:'flex',gap:12,marginTop:28,paddingTop:20,borderTop:'1px solid #e2e8f0',flexWrap:'wrap'}}>
        <button onClick={()=>{incrementUsage('jd');generate();}} style={{padding:'14px 28px',borderRadius:8,border:'none',background:'#185FA5',color:'#fff',fontSize:15,fontWeight:600,cursor:'pointer'}}>Generate role definition (internal)</button>
        <button onClick={()=>{incrementUsage('jd');generatePosting();}} style={{padding:'14px 28px',borderRadius:8,border:'none',background:'#059669',color:'#fff',fontSize:15,fontWeight:600,cursor:'pointer'}}>Generate job posting (external)</button>
        <button onClick={()=>{localStorage.removeItem('hccs_jd');setD({...defaultJD});}} style={{padding:'14px 28px',borderRadius:8,border:'1px solid #e2e8f0',background:'#fff',color:'#64748b',fontSize:15,cursor:'pointer'}}>Clear</button>
      </div>
      )}
    </div>
  )
}

function ScorecardGenerator() {
  // Pull from JD builder if available
  const jdRaw = (() => { try { return JSON.parse(localStorage.getItem('hccs_jd') || '{}') } catch { return {} } })()
  const hasJD = !!(jdRaw.title && (jdRaw.outcome1 || jdRaw.required))

  // Build suggestions from JD outcomes + required capabilities
  const suggestions = []
  if (jdRaw.outcome1) suggestions.push(jdRaw.outcome1.split('.')[0].trim())
  if (jdRaw.outcome2) suggestions.push(jdRaw.outcome2.split('.')[0].trim())
  if (jdRaw.outcome3) suggestions.push(jdRaw.outcome3.split('.')[0].trim())
  if (jdRaw.required) {
    jdRaw.required.split('\n').filter(Boolean).forEach(r => {
      if (r.trim().length > 5 && suggestions.length < 7) suggestions.push(r.trim().split('.')[0].trim())
    })
  }

  const [d, setD] = useState({
    role: jdRaw.title || '',
    c1: suggestions[0] || '',
    c2: suggestions[1] || '',
    c3: suggestions[2] || '',
    c4: suggestions[3] || '',
    c5: suggestions[4] || '',
  })
  const set = (k, v) => setD(p => ({ ...p, [k]: v }))
  const criteria = [d.c1, d.c2, d.c3, d.c4, d.c5].filter(Boolean)
  const unusedSuggestions = suggestions.filter(s => !Object.values(d).includes(s))

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
<tr><td style="font-weight:600">Overall recommendation</td><td colspan="2"><div style="display:flex;gap:16px;font-size:13px;padding:8px 0">\u2610 Advance &nbsp; \u2610 Do not advance &nbsp; \u2610 Hold</div><div style="min-height:40px;border:1px solid #e2e8f0;border-radius:6px;padding:8px;font-size:12px;color:#94a3b8">Additional notes...</div></td></tr></table>
<div style="font-size:12px;color:#64748b;margin-top:16px;background:#f8fafc;padding:12px;border-radius:6px"><strong>Scoring guide:</strong> 1 = No evidence demonstrated. 2 = Limited evidence. 3 = Meets expectations. 4 = Exceeds expectations. 5 = Exceptional, among the strongest seen.</div>
<div class="ft">HCCS™ Scorecard | Controls: EI-002, EI-004 | © 2026 IngenuityCo LLC</div></body></html>`
    const w = window.open('', '_blank'); w.document.write(html); w.document.close()
  }

  return (
    <div>
      {hasJD ? (
        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 10, padding: '16px 20px', marginBottom: 24 }}>
          <div style={{ fontSize: 14, color: '#065f46', lineHeight: 1.6 }}>
            <strong>Pre-filled from your role definition for "{jdRaw.title}".</strong> Criteria were derived from your business outcomes and required capabilities (EI-001). Edit or add more below.
          </div>
        </div>
      ) : (
        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 10, padding: '16px 20px', marginBottom: 24, fontSize: 14, color: '#065f46', lineHeight: 1.6 }}>
          Input your evaluation criteria (derived from the role definition per EI-001). Generates a printable scorecard with scoring guide.
          <div style={{ marginTop: 8, fontSize: 13, color: '#0d9488' }}>Tip: Build a role definition first in the JD Builder. Criteria will auto-populate here.</div>
        </div>
      )}
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
      {unusedSuggestions.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#0d9488', marginBottom: 6 }}>More suggestions from your role definition:</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {unusedSuggestions.map(s => (
              <button key={s} onClick={() => {
                const empty = [1,2,3,4,5].find(i => !d[`c${i}`])
                if (empty) set(`c${empty}`, s)
              }} style={{ padding: '4px 12px', borderRadius: 16, border: '1px solid #a7f3d0', background: '#f0fdf4', fontSize: 12, color: '#065f46', cursor: 'pointer' }}>+ {s.length > 50 ? s.slice(0, 50) + '...' : s}</button>
            ))}
          </div>
        </div>
      )}
      {!canUse('scorecard') ? <UpgradePrompt toolId="scorecard" /> :
      <button onClick={() => { incrementUsage('scorecard'); generate(); }} disabled={!d.role || criteria.length < 2} style={{ marginTop: 16, padding: '14px 28px', borderRadius: 8, border: 'none', background: criteria.length >= 2 ? '#0F6E56' : '#94a3b8', color: '#fff', fontSize: 15, fontWeight: 600, cursor: criteria.length >= 2 ? 'pointer' : 'default' }}>Generate scorecard</button>}
    </div>
  )
}

function BiasChecker() {
  const jdRaw = (() => { try { return JSON.parse(localStorage.getItem('hccs_jd') || '{}') } catch { return {} } })()
  const jdText = jdRaw.title ? [jdRaw.title, jdRaw.outcome1, jdRaw.outcome2, jdRaw.outcome3, jdRaw.required, jdRaw.learnable, jdRaw.decidesAlone].filter(Boolean).join('\n') : ''

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
      {jdText && !text && (
        <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '12px 16px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 13, color: '#1e40af' }}>You have a role definition for "{jdRaw.title}". Check it for bias?</div>
          <button onClick={() => setText(jdText)} style={{ padding: '6px 16px', borderRadius: 6, border: 'none', background: '#2563eb', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>Load role definition</button>
        </div>
      )}
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
  const jdRaw = (() => { try { return JSON.parse(localStorage.getItem('hccs_jd') || '{}') } catch { return {} } })()
  const hasJD = !!(jdRaw.title)

  // Infer starting scores from JD scope indicators
  const inferAuth = jdRaw.budget ? (jdRaw.budget.match(/\d+/g) || []).reduce((a,v) => Math.max(a, +v > 200000 ? 5 : +v > 50000 ? 4 : +v > 10000 ? 3 : 2), 3) : 3
  const inferComplex = jdRaw.ambiguity ? (jdRaw.ambiguity.toLowerCase().includes('high') ? 5 : jdRaw.ambiguity.toLowerCase().includes('medium') ? 3 : 2) : 3
  const inferImpact = jdRaw.stakeholders ? (jdRaw.stakeholders.toLowerCase().includes('board') || jdRaw.stakeholders.toLowerCase().includes('vp') ? 4 : 3) : 3
  const inferExpertise = jdRaw.required ? (jdRaw.required.split('\n').filter(Boolean).length >= 4 ? 4 : 3) : 3

  const [scores, setScores] = useState({
    authority: hasJD ? inferAuth : 3,
    complexity: hasJD ? inferComplex : 3,
    accountability: 3,
    impact: hasJD ? inferImpact : 3,
    expertise: hasJD ? inferExpertise : 3,
  })
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

  const jdHints = {
    authority: jdRaw.decidesAlone ? `From JD: "${jdRaw.decidesAlone.split('\n')[0].slice(0,60)}..."` : null,
    complexity: jdRaw.ambiguity ? `From JD: ${jdRaw.ambiguity}` : null,
    accountability: jdRaw.outcome1 ? `From JD: "${jdRaw.outcome1.slice(0,60)}..."` : null,
    impact: jdRaw.stakeholders ? `From JD: ${jdRaw.stakeholders}` : null,
    expertise: jdRaw.required ? `From JD: ${jdRaw.required.split('\n').filter(Boolean).length} required capabilities` : null,
  }

  const factors = [
    { key: 'authority', label: 'Authority', desc: 'Decision scope, approval power, budget control' },
    { key: 'complexity', label: 'Complexity', desc: 'Ambiguity, cross-functional, technical depth' },
    { key: 'accountability', label: 'Accountability', desc: 'What breaks if this role fails, regulatory exposure' },
    { key: 'impact', label: 'Impact', desc: 'Revenue, cost, strategic, organizational scope' },
    { key: 'expertise', label: 'Expertise', desc: 'Specialization, rarity, depth required' },
  ]

  return (
    <div>
      {hasJD ? (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '16px 20px', marginBottom: 24, fontSize: 14, color: '#065f46', lineHeight: 1.6 }}>
          <strong>Pre-scored from your "{jdRaw.title}" role definition.</strong> Factors were inferred from scope indicators, decision rights, and ambiguity level. Adjust as needed.
        </div>
      ) : (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 10, padding: '16px 20px', marginBottom: 24, fontSize: 14, color: '#065f46', lineHeight: 1.6 }}>
          Score each factor 1-5. The calculator suggests a compensation band based on role scope, not title or salary history (CG-001).
          <div style={{ marginTop: 8, fontSize: 13, color: '#0d9488' }}>Tip: Build a role definition first. Factors will auto-score from your scope indicators.</div>
        </div>
      )}
      {factors.map(f => (
        <div key={f.key} style={{ marginBottom: 16, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{f.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#3B6D11' }}>{scores[f.key]}</div>
          </div>
          <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{f.desc}</div>
          {jdHints[f.key] && <div style={{ fontSize: 11, color: '#0d9488', marginBottom: 6, fontStyle: 'italic' }}>{jdHints[f.key]}</div>}
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
