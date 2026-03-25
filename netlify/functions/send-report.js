// netlify/functions/send-report.js
// Sends HCCS assessment report via Resend email API
// Requires RESEND_API_KEY environment variable set in Netlify dashboard

const LEVEL_NAMES = ["Not Established", "Initial", "Developing", "Defined", "Managed", "Optimizing"];
const TIER_LABELS = ["None", "Self-Attest", "Self-Attest", "Validated", "Audited", "Audited"];

function buildReportHTML(user, domainScores, overallLevel, controls, answers, notes, mustGaps, shouldGaps, allGaps) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const statusLabel = v => v === 'yes' ? 'In Place' : v === 'partial' ? 'Partial' : 'Not in Place';
  const statusColor = v => v === 'yes' ? '#059669' : v === 'partial' ? '#d97706' : '#dc2626';
  const allControls = controls.flatMap(d => d.controls.map(c => ({ ...c, domainCode: d.code, domainName: d.name })));

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
body{font-family:'Helvetica Neue',Arial,sans-serif;color:#1e293b;line-height:1.6;font-size:14px;max-width:800px;margin:0 auto;padding:40px 24px}
h1{font-size:28px;font-weight:700;color:#0f172a;border-bottom:3px solid #2563eb;padding-bottom:8px;margin:32px 0 16px}
h2{font-size:20px;font-weight:600;color:#1e3a5f;margin:24px 0 12px}
h3{font-size:16px;font-weight:600;color:#334155;margin:20px 0 8px}
table{width:100%;border-collapse:collapse;margin:12px 0}
th{background:#1B2A4A;color:#fff;padding:8px 12px;text-align:left;font-size:12px}
td{padding:8px 12px;border-bottom:1px solid #e2e8f0;font-size:13px;vertical-align:top}
tr:nth-child(even) td{background:#f8fafc}
.badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700}
.must{background:#fef2f2;color:#991b1b}.should{background:#fefce8;color:#854d0e}.may{background:#f0fdf4;color:#166534}
.yes{color:#059669;font-weight:600}.partial{color:#d97706;font-weight:600}.no{color:#dc2626;font-weight:600}
.note{background:#f8fafc;border-left:3px solid #2563eb;padding:8px 12px;margin:4px 0;font-size:12px;color:#475569}
.remediation{background:#eff6ff;border-left:3px solid #3b82f6;padding:8px 12px;margin:4px 0;font-size:12px;color:#1e3a5f}
.critical-box{background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin:12px 0}
.sig-box{background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:16px;margin:12px 0}
.quote{background:#0f172a;color:#94a3b8;padding:24px;border-radius:8px;text-align:center;font-style:italic;margin:24px 0}
.footer{text-align:center;font-size:11px;color:#94a3b8;padding:24px 0;border-top:1px solid #e2e8f0;margin-top:40px}
.header{background:linear-gradient(135deg,#0a1628,#1a2d4a);color:#fff;padding:40px;border-radius:12px;text-align:center;margin-bottom:32px}
.header h1{color:#fff;border:none;margin:0 0 8px;font-size:32px}
</style></head><body>

<div class="header">
<div style="letter-spacing:0.2em;font-size:12px;color:#5b9bd5;margin-bottom:12px">HUMAN CAPITAL CONTROL STANDARD</div>
<h1>HCCS Maturity Assessment Report</h1>
<div style="font-size:20px;margin:12px 0">${user.org}</div>
<div style="color:#94a3b8">${date}</div>
<div style="color:#64748b;margin-top:8px;font-size:13px">Prepared for: ${user.name}${user.title ? ', ' + user.title : ''}</div>
</div>

<h1>Executive Summary</h1>
<table>
<tr><td style="width:200px;font-weight:600">Organization</td><td>${user.org}</td></tr>
<tr><td style="font-weight:600">Assessed By</td><td>${user.name}${user.title ? ', ' + user.title : ''}</td></tr>
<tr><td style="font-weight:600">Company Size</td><td>${user.size} employees</td></tr>
<tr><td style="font-weight:600">Assessment Date</td><td>${date}</td></tr>
<tr><td style="font-weight:600">Overall Maturity Level</td><td><strong>Level ${overallLevel}: ${LEVEL_NAMES[overallLevel]}</strong></td></tr>
<tr><td style="font-weight:600">Compliance Tier</td><td>${TIER_LABELS[overallLevel]}</td></tr>
<tr><td style="font-weight:600">Controls In Place</td><td>${allControls.filter(c => answers[c.id] === 'yes').length} of 67</td></tr>
<tr><td style="font-weight:600">Controls Partial</td><td>${allControls.filter(c => answers[c.id] === 'partial').length}</td></tr>
<tr><td style="font-weight:600">Controls Not In Place</td><td>${allControls.filter(c => answers[c.id] === 'no').length}</td></tr>
<tr><td style="font-weight:600">Critical Gaps (MUST)</td><td style="color:#dc2626;font-weight:600">${mustGaps.length}</td></tr>
<tr><td style="font-weight:600">Significant Gaps (SHOULD)</td><td style="color:#d97706;font-weight:600">${shouldGaps.length}</td></tr>
</table>

<!-- Visual Overall Score -->
<div style="text-align:center;margin:24px 0;padding:24px;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0">
<div style="font-size:13px;color:#64748b;text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px">Overall Maturity Level</div>
<div style="font-size:48px;font-weight:700;color:${overallLevel === 0 ? '#dc2626' : overallLevel <= 2 ? '#185FA5' : overallLevel === 3 ? '#0F6E56' : '#534AB7'}">Level ${overallLevel}</div>
<div style="font-size:18px;font-weight:600;color:#475569;margin-bottom:12px">${LEVEL_NAMES[overallLevel]}</div>
<table style="width:300px;margin:0 auto;border-collapse:collapse"><tr>
${[1,2,3,4,5].map(l => `<td style="width:20%;height:8px;background:${l <= overallLevel ? '#2563eb' : '#e2e8f0'};padding:0;border:none;${l===1?'border-radius:4px 0 0 4px;':''}${l===5?'border-radius:0 4px 4px 0;':''}">&nbsp;</td>`).join('')}
</tr></table>
<div style="display:flex;justify-content:space-between;width:300px;margin:4px auto 0;font-size:10px;color:#94a3b8">
<span>L1</span><span>L2</span><span>L3</span><span>L4</span><span>L5</span>
</div>
</div>

<div class="quote">
"If the organization cannot reconstruct how a decision was made, what evidence it relied on, and whether standards were applied consistently, the process must be treated as unreliable."
<div style="margin-top:8px;font-style:normal;color:#475569;font-size:12px">HCCS-1.0, Governing Principle</div>
</div>

<h1>Domain Maturity Scores</h1>

<table style="width:100%;border-collapse:collapse;margin:16px 0">
${domainScores.map(d => {
  const colors = {RG:'#185FA5',EI:'#0F6E56',DG:'#534AB7',AG:'#993C1D',PI:'#854F0B',CG:'#3B6D11',ER:'#993556'};
  const col = colors[d.domain] || '#475569';
  const pct = Math.round((d.level/5)*100);
  return `<tr>
<td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;width:36px;font-weight:700;font-size:13px;color:${col}">${d.domain}</td>
<td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;width:160px;font-size:13px">${d.name}</td>
<td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">
<table style="width:100%;border-collapse:collapse"><tr>
<td style="width:${pct}%;background:${col};height:20px;border-radius:4px 0 0 4px;padding:0;border:none;font-size:0">&nbsp;</td>
<td style="width:${100-pct}%;background:#f1f5f9;height:20px;border-radius:0 4px 4px 0;padding:0;border:none;font-size:0">&nbsp;</td>
</tr></table>
</td>
<td style="padding:10px 12px;border-bottom:1px solid #e2e8f0;width:100px;font-weight:600;font-size:13px;white-space:nowrap">L${d.level}: ${LEVEL_NAMES[d.level]}</td>
</tr>`;}).join('')}
</table>

<table style="width:100%;border-collapse:collapse;margin:16px 0">
<tr><th>Domain</th><th>Name</th><th>Level</th><th>In Place</th><th>Partial</th><th>Gaps</th></tr>
${domainScores.map(d => `<tr><td><strong>${d.domain}</strong></td><td>${d.name}</td><td><strong>Level ${d.level}: ${LEVEL_NAMES[d.level]}</strong></td><td>${d.met}/${d.total}</td><td>${d.partial}</td><td>${d.gaps}</td></tr>`).join('')}
</table>

<h1>Control-by-Control Assessment</h1>
${controls.map(d => `
<h2 style="color:${d.color}">${d.code}: ${d.name}</h2>
<table>
<tr><th style="width:80px">Control</th><th style="width:60px">Level</th><th>Requirement</th><th style="width:85px">Status</th></tr>
${d.controls.map(c => {
  const s = answers[c.id]; const n = notes[c.id];
  return `<tr><td><code>${c.id}</code></td><td><span class="badge ${c.level.toLowerCase()}">${c.level}</span></td><td>${c.text}</td><td class="${s}">${statusLabel(s)}</td></tr>
${n ? `<tr><td colspan="4"><div class="note"><strong>Note:</strong> ${n.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div></td></tr>` : ''}
${s !== 'yes' && c.remediation ? `<tr><td colspan="4"><div class="remediation"><strong>Remediation:</strong> ${c.remediation}</div></td></tr>` : ''}`;
}).join('')}
</table>`).join('')}

${mustGaps.length > 0 ? `
<h1>Priority Gap Analysis</h1>
<div class="critical-box">
<h3 style="color:#991b1b;margin-top:0">Critical: MUST Controls Not In Place (${mustGaps.length})</h3>
<table>
<tr><th>Control</th><th>Requirement</th><th>Note</th><th>Remediation</th></tr>
${mustGaps.map(g => `<tr><td><code>${g.id}</code></td><td>${g.text}</td><td>${(notes[g.id] || '<em>-</em>').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td><td>${g.remediation || ''}</td></tr>`).join('')}
</table>
</div>` : ''}

${shouldGaps.length > 0 ? `
<div class="sig-box">
<h3 style="color:#854d0e;margin-top:0">Significant: SHOULD Controls Not In Place (${shouldGaps.length})</h3>
<table>
<tr><th>Control</th><th>Requirement</th><th>Note</th><th>Remediation</th></tr>
${shouldGaps.map(g => `<tr><td><code>${g.id}</code></td><td>${g.text}</td><td>${(notes[g.id] || '<em>-</em>').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td><td>${g.remediation || ''}</td></tr>`).join('')}
</table>
</div>` : ''}

${overallLevel < 3 ? `
<h1>Remediation Roadmap to Level 3</h1>
<p>Level 3 (Defined) is the minimum for external credibility.</p>
${[
  { phase: 'Phase 1: Foundation', time: 'Months 1-3', desc: 'Establish basic controls and documentation', maxTier: 1 },
  { phase: 'Phase 2: Operationalize', time: 'Months 3-6', desc: 'Standardize evaluation and decisions', maxTier: 2 },
  { phase: 'Phase 3: Compliance', time: 'Months 6-9', desc: 'Activate SHOULD controls and calibration', maxTier: 3 },
].map((ph, i) => {
  const pg = allGaps.filter(g => g.tier <= ph.maxTier && g.level === 'MUST');
  const ps = i === 2 ? shouldGaps : [];
  if (!pg.length && !ps.length) return '';
  return `<h3>${ph.phase} (${ph.time})</h3><p style="color:#64748b;font-size:13px">${ph.desc}</p>
<table><tr><th>Control</th><th>Requirement</th><th>Action</th><th>Note</th></tr>
${pg.map(g => `<tr><td><code>${g.id}</code></td><td>${g.text}</td><td>${g.remediation || ''}</td><td>${(notes[g.id] || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td></tr>`).join('')}
${ps.map(g => `<tr><td><code>${g.id}</code></td><td>${g.text}</td><td>${g.remediation || ''}</td><td>${(notes[g.id] || '').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td></tr>`).join('')}
</table>`;
}).join('')}` : ''}

<h1>Assessment Notes</h1>
${(() => {
  const noted = allControls.filter(c => notes[c.id] && notes[c.id].trim());
  if (!noted.length) return '<p style="color:#94a3b8"><em>No notes were entered.</em></p>';
  return `<table><tr><th>Control</th><th>Domain</th><th>Status</th><th>Note</th></tr>
${noted.map(c => `<tr><td><code>${c.id}</code></td><td>${c.domainCode}</td><td class="${answers[c.id]}">${statusLabel(answers[c.id])}</td><td>${notes[c.id].replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td></tr>`).join('')}
</table>`;
})()}

<div class="footer">
<div>HCCS Maturity Assessment Report | ${user.org} | ${date}</div>
<div style="margin-top:4px">Generated at hccsstandard.com | HCCS-1.0 | &copy; 2026 Diane Malefyt</div>
<div style="margin-top:8px;color:#cbd5e1">This report is generated from a self-assessment and does not constitute certified compliance.</div>
</div>
</body></html>`;
}

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Email service not configured' }) };
  }

  try {
    const data = JSON.parse(event.body);
    const { user, domainScores, overallLevel, controls, answers, notes, mustGaps, shouldGaps, allGaps } = data;

    if (!user || !user.email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing user email' }) };
    }

    const html = buildReportHTML(user, domainScores, overallLevel, controls, answers, notes, mustGaps, shouldGaps, allGaps);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'HCCS Assessment <reports@hccsstandard.com>',
        to: [user.email],
        subject: `HCCS Maturity Assessment Report - ${user.org} - Level ${overallLevel}: ${LEVEL_NAMES[overallLevel]}`,
        html: html,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend error:', result);
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to send email', detail: result }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: `Report sent to ${user.email}` }),
    };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
