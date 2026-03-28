import { useState, useRef } from "react";

const TEASER_CONTROLS = [
  { id: "RG-001", domain: "RG", domainName: "Role Governance", color: "#185FA5",
    level: "MUST", tier: 1, text: "Documented role definition exists before sourcing begins",
    definition: "A written document describing the role must be completed and approved before any candidate is reviewed or sourced.",
    example: "Role Definition Worksheet completed with timestamp predating first candidate screen. If first resume reviewed March 5 and definition dated March 8, this fails." },
  { id: "RG-002", domain: "RG", domainName: "Role Governance", color: "#185FA5",
    level: "MUST", tier: 1, text: "Role definitions specify business outcomes, not only tasks",
    definition: "The definition describes what the person will deliver or change, not activities they perform. Outcomes are measurable results; tasks are activities.",
    example: "Fails: 'Manage team, attend standups, write PRDs.' Passes: 'Reduce production incidents by 40% in 12 months.'" },
  { id: "EI-001", domain: "EI", domainName: "Evaluation Integrity", color: "#0F6E56",
    level: "MUST", tier: 1, text: "Evaluation criteria derived from role definition before assessment",
    definition: "Before any candidate evaluated, criteria documented and derived from role definition. Criteria created after seeing candidates fail.",
    example: "Role says 'reduce incidents 40%.' Criteria: 'reliability engineering at scale.' Dated before first interview." },
  { id: "EI-002", domain: "EI", domainName: "Evaluation Integrity", color: "#0F6E56",
    level: "MUST", tier: 1, text: "Every candidate evaluated with same criteria and methods",
    definition: "All candidates get identical steps, competencies, scoring. No different process regardless of pipeline source.",
    example: "Five candidates all do same behavioral + design exercise, same rubric. Referral skips exercise = fails." },
  { id: "DG-001", domain: "DG", domainName: "Decision Governance", color: "#534AB7",
    level: "MUST", tier: 1, text: "Every hiring decision documented with selection rationale",
    definition: "Written record explains why candidate chosen. Standalone document, not email/Slack. Primary audit artifact.",
    example: "Decision Rationale Form: candidate, date, decision-maker, scores, evidence. Slack 'let's go with A' = fails." },
  { id: "DG-002", domain: "DG", domainName: "Decision Governance", color: "#534AB7",
    level: "MUST", tier: 1, text: "Rationale references criteria and is contemporaneous",
    definition: "References evaluation criteria and documented at or near decision time. Late rationale = post-decision rationalization.",
    example: "Passes: criteria scores + evidence within 24 hours. Fails: 2 weeks later, 'great energy,' no criteria." },
  { id: "AG-001", domain: "AG", domainName: "AI Governance", color: "#993C1D",
    level: "MUST", tier: 1, text: "Inventory of all automated decision tools maintained",
    definition: "Documented list of every tool that filters, scores, ranks, or recommends candidates or compensation.",
    example: "Inventory: Greenhouse auto-screen, HireVue, Radford comp. Each: name, vendor, function, owner. Missing tool = fails." },
  { id: "PI-001", domain: "PI", domainName: "Process Integrity", color: "#854F0B",
    level: "MUST", tier: 1, text: "Every externally posted role is genuinely open",
    definition: "If posted externally, external candidates must have real opportunity to be selected. Not predetermined.",
    example: "5 external + 2 internal evaluated identically = passes. Manager told internal 'this is yours' = fails." },
  { id: "CG-001", domain: "CG", domainName: "Compensation Governance", color: "#3B6D11",
    level: "MUST", tier: 1, text: "Compensation uses compensable factors, not title or salary history",
    definition: "Pay from role scope analysis, not title matching, salary history, or predecessor pay.",
    example: "Factor analysis: Authority 5, Complexity 5. Range $280-340K = passes. 'Radford says $310K, candidate makes $280K' = fails." },
  { id: "ER-001", domain: "ER", domainName: "Evidence & Records", color: "#993556",
    level: "MUST", tier: 1, text: "Contemporaneous records for every decision",
    definition: "Created at decision time. Scorecards within 4 hours, rationale within 24 hours. 72+ hours = retrospective = fails.",
    example: "Interview 10 AM, scorecard 12:30 PM = passes. Interview March 5, scorecard March 15 = fails." },
];

const DOMAINS = ["RG","EI","DG","AG","PI","CG","ER"];
const DOMAIN_NAMES = {RG:"Role Governance",EI:"Evaluation Integrity",DG:"Decision Governance",AG:"AI Governance",PI:"Process Integrity",CG:"Compensation Governance",ER:"Evidence & Records"};
const DOMAIN_COLORS = {RG:"#185FA5",EI:"#0F6E56",DG:"#534AB7",AG:"#993C1D",PI:"#854F0B",CG:"#3B6D11",ER:"#993556"};

function calcScore(answers) {
  const total = TEASER_CONTROLS.length;
  const yes = TEASER_CONTROLS.filter(c => answers[c.id] === "yes").length;
  const partial = TEASER_CONTROLS.filter(c => answers[c.id] === "partial").length;
  const score = Math.round(((yes + partial * 0.5) / total) * 100);
  const domainScores = {};
  DOMAINS.forEach(d => {
    const ctrls = TEASER_CONTROLS.filter(c => c.domain === d);
    if (!ctrls.length) { domainScores[d] = null; return; }
    const dy = ctrls.filter(c => answers[c.id] === "yes").length;
    const dp = ctrls.filter(c => answers[c.id] === "partial").length;
    domainScores[d] = Math.round(((dy + dp * 0.5) / ctrls.length) * 100);
  });
  let level = 0;
  if (score >= 20) level = 1;
  if (score >= 40) level = 2;
  if (score >= 60) level = 3;
  if (score >= 80) level = 4;
  if (score >= 95) level = 5;
  return { score, level, domainScores, yes, partial, no: total - yes - partial };
}

const LN = ["Not Established","Initial","Developing","Defined","Managed","Optimizing"];
const LC = ["#dc2626","#888780","#185FA5","#0F6E56","#534AB7","#993C1D"];

function Landing({ onStart }) {
  return (
    <div style={{ minHeight: "80vh", background: "linear-gradient(165deg, #0a1628 0%, #1a2d4a 40%, #0f3460 100%)", color: "#e2e8f0", display: "flex", alignItems: "center" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "80px 24px 60px" }}>
        <div style={{ letterSpacing: "0.25em", fontSize: 12, textTransform: "uppercase", color: "#5b9bd5", marginBottom: 16, fontWeight: 500 }}>Quick Assessment</div>
        <h1 className="hero-title" style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.15, margin: "0 0 20px", color: "#fff" }}>How audit-ready is your hiring process?</h1>
        <p style={{ fontSize: 18, lineHeight: 1.65, color: "#94a3b8", maxWidth: 540, margin: "0 0 32px" }}>
          10 questions. 3 minutes. Find out where your organization stands across the 7 HCCS™ governance domains.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 40 }}>
          {[["10", "critical controls"], ["7", "domains covered"], ["3 min", "to complete"]].map(([n, l]) => (
            <div key={l} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "16px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#5b9bd5" }}>{n}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: 24, marginBottom: 40 }}>
          <div style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.6 }}>
            This quick assessment samples the most revealing controls from the full 67-control HCCS™ Standard™. Each question includes a definition and example so you know exactly what "in place" means. No login required.
          </div>
        </div>
        <button onClick={onStart} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 8, padding: "16px 40px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}
          onMouseOver={e => e.target.style.background = "#1d4ed8"} onMouseOut={e => e.target.style.background = "#2563eb"}>
          Start quick assessment
        </button>

        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
          <a href="/assess/full" style={{ fontSize: 14, color: "#5b9bd5", fontWeight: 500 }}>Already have an access code? Take the full assessment →</a>
          <a href="/assess/full" style={{ fontSize: 14, color: "#64748b" }}>Want the full 67-control assessment? View pricing →</a>
        </div>
      </div>
    </div>
  );
}

function Questions({ onComplete }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [expanded, setExpanded] = useState({});
  const ref = useRef(null);

  const c = TEASER_CONTROLS[idx];
  const progress = ((idx) / TEASER_CONTROLS.length) * 100;
  const answered = answers[c.id] !== undefined;

  const badge = (level) => {
    return <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: "#fef2f2", color: "#991b1b", border: "1px solid #fecaca" }}>MUST</span>;
  };

  return (
    <div ref={ref} style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}>
      <div style={{ position: "sticky", top: 64, zIndex: 10, background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ height: 3, background: "#e2e8f0" }}><div style={{ height: 3, background: "#2563eb", width: `${progress}%`, transition: "width 0.3s" }} /></div>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "12px 24px", display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "#64748b" }}>Question {idx + 1} of {TEASER_CONTROLS.length}</span>
          <span style={{ fontSize: 13, color: "#64748b" }}>{Math.round(progress)}%</span>
        </div>
      </div>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "40px 24px 80px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: c.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>{c.domain}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{c.domainName}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{c.id}</div>
          </div>
        </div>

        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: "28px 28px", marginBottom: 24 }}>
          <p style={{ margin: "0 0 12px", fontSize: 18, lineHeight: 1.5, color: "#1e293b", fontWeight: 600 }}>{c.text}</p>
          
          <button onClick={() => setExpanded(p => ({ ...p, [c.id]: !p[c.id] }))} style={{ background: "none", border: "none", padding: 0, fontSize: 14, color: "#2563eb", cursor: "pointer", marginBottom: expanded[c.id] ? 16 : 12, fontWeight: 500 }}>
            {expanded[c.id] ? "Hide details \u25B4" : "What does this mean? \u25BE"}
          </button>

          {expanded[c.id] && (
            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, marginBottom: 16, borderLeft: "3px solid #2563eb" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>Definition</div>
              <p style={{ margin: "0 0 12px", fontSize: 14, lineHeight: 1.6, color: "#475569" }}>{c.definition}</p>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#334155", marginBottom: 6 }}>What "in place" looks like</div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#475569" }}>{c.example}</p>
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            {[["yes", "In place", "#059669"], ["partial", "Partial", "#d97706"], ["no", "Not in place", "#dc2626"]].map(([val, label, col]) => (
              <button key={val} onClick={() => setAnswers(p => ({ ...p, [c.id]: val }))}
                style={{ flex: 1, padding: "12px 16px", borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                  background: answers[c.id] === val ? `${col}10` : "#f8fafc",
                  border: answers[c.id] === val ? `2px solid ${col}` : "1px solid #e2e8f0",
                  color: answers[c.id] === val ? col : "#64748b" }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => { if (idx > 0) { setIdx(idx - 1); ref.current?.scrollIntoView({ behavior: "smooth" }); } }} disabled={idx === 0}
            style={{ padding: "12px 28px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", color: idx === 0 ? "#cbd5e1" : "#475569", fontSize: 14, fontWeight: 500, cursor: idx === 0 ? "default" : "pointer" }}>
            ← Previous
          </button>
          <button onClick={() => {
            if (!answered) return;
            if (idx < TEASER_CONTROLS.length - 1) { setIdx(idx + 1); ref.current?.scrollIntoView({ behavior: "smooth" }); }
            else onComplete(answers);
          }} disabled={!answered}
            style={{ padding: "12px 28px", borderRadius: 8, border: "none", background: answered ? "#2563eb" : "#94a3b8", color: "#fff", fontSize: 14, fontWeight: 500, cursor: answered ? "pointer" : "default" }}>
            {idx === TEASER_CONTROLS.length - 1 ? "See my results" : "Next →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Results({ answers }) {
  const { score, level, domainScores, yes, partial, no } = calcScore(answers);
  const gaps = TEASER_CONTROLS.filter(c => answers[c.id] !== "yes");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async () => {
    if (!email || !name) return;
    setSending(true);
    try {
      await fetch("/.netlify/functions/send-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: { name, email, org: org || "N/A", title: "", size: "", linkedin: "" },
          domainScores: DOMAINS.map(d => ({ domain: d, name: DOMAIN_NAMES[d], level: Math.round((domainScores[d] || 0) / 20), met: TEASER_CONTROLS.filter(c => c.domain === d && answers[c.id] === "yes").length, total: TEASER_CONTROLS.filter(c => c.domain === d).length, partial: TEASER_CONTROLS.filter(c => c.domain === d && answers[c.id] === "partial").length, gaps: TEASER_CONTROLS.filter(c => c.domain === d && answers[c.id] !== "yes").length })),
          overallLevel: level,
          controls: [{ code: "TEASER", name: "Quick Assessment", color: "#2563eb", controls: TEASER_CONTROLS }],
          answers, notes: {},
          mustGaps: gaps, shouldGaps: [], allGaps: gaps,
          isTeaser: true,
        }),
      });
      setSubmitted(true);
    } catch (e) { console.error(e); }
    finally { setSending(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'IBM Plex Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 24px 80px" }}>
        
        {/* Score header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ letterSpacing: "0.2em", fontSize: 12, textTransform: "uppercase", color: "#64748b", marginBottom: 12 }}>Quick Assessment Results</div>
          <h1 style={{ fontSize: 36, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>Estimated Maturity: Level {level}</h1>
          <div style={{ display: "inline-block", padding: "6px 20px", borderRadius: 20, background: LC[level] + "15", color: LC[level], fontWeight: 600, fontSize: 16, border: `1px solid ${LC[level]}30` }}>{LN[level]}</div>
          <div style={{ fontSize: 14, color: "#64748b", marginTop: 12 }}>{yes}/10 in place | {partial} partial | {no} gaps</div>
          <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 8 }}>Based on 10 of 67 controls. Full assessment required for validated score.</div>
        </div>

        {/* Score bar */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24, marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>Readiness Score</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: LC[level] }}>{score}%</span>
          </div>
          <div style={{ height: 12, background: "#f1f5f9", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ height: 12, background: LC[level], borderRadius: 6, width: `${score}%`, transition: "width 0.5s" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 11, color: "#94a3b8" }}>
            <span>L0 Not Established</span><span>L3 Credibility Threshold</span><span>L5 Optimizing</span>
          </div>
        </div>

        {/* Domain breakdown */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e2e8f0", padding: 24, marginBottom: 24 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 600 }}>Domain Snapshot</h3>
          {DOMAINS.map(d => {
            const s = domainScores[d];
            if (s === null) return null;
            return (
              <div key={d} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 28, fontSize: 12, fontWeight: 600, color: DOMAIN_COLORS[d] }}>{d}</div>
                <div style={{ flex: 1, height: 20, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${s}%`, background: DOMAIN_COLORS[d], borderRadius: 4 }} />
                </div>
                <div style={{ width: 40, fontSize: 12, fontWeight: 600, color: "#475569", textAlign: "right" }}>{s}%</div>
              </div>
            );
          })}
        </div>

        {/* Gaps */}
        {gaps.length > 0 && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: 24, marginBottom: 24 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, color: "#991b1b" }}>Controls Not Fully In Place ({gaps.length})</h3>
            {gaps.map(g => (
              <div key={g.id} style={{ fontSize: 14, color: "#7f1d1d", marginBottom: 8, display: "flex", gap: 8 }}>
                <span style={{ fontFamily: "monospace", fontWeight: 600, minWidth: 64, color: "#991b1b" }}>{g.id}</span>
                <span>{g.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* What you're missing */}
        <div style={{ background: "#0f172a", borderRadius: 12, padding: 28, marginBottom: 32, textAlign: "center" }}>
          <div style={{ fontSize: 13, color: "#5b9bd5", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12, fontWeight: 600 }}>This was 10 of 67 controls</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: "0 0 12px" }}>The full HCCS™ assessment covers:</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 480, margin: "0 auto", textAlign: "left" }}>
            {[
              "67 auditable controls across 7 domains",
              "Per-control remediation recommendations",
              "Phased roadmap to Level 3 compliance",
              "Full report with gap analysis and notes",
              "Validated maturity level (not estimated)",
              "Evidence documentation guidance",
            ].map(t => (
              <div key={t} style={{ fontSize: 13, color: "#94a3b8", display: "flex", gap: 6 }}>
                <span style={{ color: "#5b9bd5" }}>→</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Business case generator */}
        <div style={{ background: 'linear-gradient(135deg, #064e3b, #065f46)', border: '2px solid #059669', borderRadius: 12, padding: 28, marginBottom: 24, textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: '#6ee7b7', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8, fontWeight: 600 }}>Need budget approval?</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>Generate a business case to share with leadership</h3>
          <p style={{ fontSize: 14, color: '#a7f3d0', marginBottom: 20, maxWidth: 480, margin: '0 auto 20px' }}>
            A one-page executive brief with your risk profile, cost of inaction, and ROI justification. Personalized from your results. Ready to print or email to your CFO.
          </p>
          <button onClick={() => {
            const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const orgName = org || name || 'Your Organization';
            const gapList = gaps.map(g => `<tr><td style="padding:8px 12px;font-family:monospace;font-size:12px;font-weight:600;color:#991b1b">${g.id}</td><td style="padding:8px 12px;font-size:13px">${g.text}</td><td style="padding:8px 12px;font-size:12px;color:#dc2626;font-weight:600">${g.level}</td></tr>`).join('');
            const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>HCCS™ Business Case - ${orgName}</title>
<style>
@media print{body{margin:0}.no-print{display:none!important}}
body{font-family:Helvetica,Arial,sans-serif;color:#1e293b;line-height:1.55;max-width:780px;margin:0 auto;padding:40px;font-size:13px}
h1{font-size:24px;margin:0 0 4px}h2{font-size:17px;color:#1e3a5f;margin:28px 0 10px;padding-bottom:5px;border-bottom:2px solid #e2e8f0}
.hdr{background:linear-gradient(135deg,#0a1628,#1a2d4a);color:#fff;padding:28px 32px;border-radius:12px;margin-bottom:24px}
.hdr h1{color:#fff}.hdr .s{color:#94a3b8;font-size:13px;margin-top:4px}
table{width:100%;border-collapse:collapse;margin:10px 0}
th{background:#0f172a;color:#fff;padding:8px 12px;text-align:left;font-size:12px}
td{padding:8px 12px;border-bottom:1px solid #f1f5f9;font-size:13px}
tr:nth-child(even){background:#f8fafc}
.r{background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:20px;margin:14px 0}
.g{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:20px;margin:14px 0}
.box{background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px;margin:8px 0}
.ft{margin-top:36px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;text-align:center}
.toolbar{display:flex;gap:10px;align-items:center;padding:16px 0;margin-bottom:16px;border-bottom:1px solid #e2e8f0;flex-wrap:wrap}
.toolbar button,.toolbar a{padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.btn-primary{background:#2563eb;color:#fff;border:none}
.btn-secondary{background:#fff;color:#334155;border:1px solid #e2e8f0}
.email-form{display:none;align-items:center;gap:8px;margin-left:auto}
.email-form.show{display:flex}
.email-form input{padding:8px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;width:220px}
.email-form button{padding:8px 16px;border-radius:6px;border:none;background:#059669;color:#fff;font-size:13px;font-weight:600;cursor:pointer}
.sent-msg{color:#059669;font-size:13px;font-weight:600}
</style></head><body>
<div class="no-print toolbar">
<button class="btn-primary" onclick="window.print()">Save as PDF</button>
<button class="btn-secondary" onclick="document.getElementById('ef').classList.toggle('show')">Email this document</button>
<div id="ef" class="email-form">
<input type="email" id="send-email" placeholder="recipient@company.com" />
<button onclick="sendEmail()">Send</button>
<span id="sent-msg"></span>
</div>
</div>
<script>
async function sendEmail(){
var e=document.getElementById('send-email').value;
if(!e)return;
document.getElementById('sent-msg').textContent='Sending...';
try{
var r=await fetch('https://hccsstandard.com/.netlify/functions/send-business-case',{
method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({email:e,html:document.documentElement.outerHTML,org:'${orgName.replace(/'/g,"\\'")}'})
});
if(r.ok){document.getElementById('sent-msg').textContent='Sent ✓';document.getElementById('sent-msg').className='sent-msg';}
else{document.getElementById('sent-msg').textContent='Failed. Try Save as PDF instead.';}
}catch(x){document.getElementById('sent-msg').textContent='Failed. Try Save as PDF instead.';}
}
</script>

<div class="hdr">
<div style="font-size:11px;color:#5b9bd5;letter-spacing:0.15em;margin-bottom:4px">HCCS™ BUDGET REQUEST</div>
<h1>The Case for a Human Capital Governance Assessment</h1>
<div class="s">Prepared for: ${orgName} leadership | ${date}</div>
<div class="s">Based on HCCS™ Quick Assessment (10 of 67 controls sampled)</div>
</div>

<h2>The situation</h2>
<p>${orgName} currently scores at an estimated <strong>HCCS™ Maturity Level ${level} (${['Not Established','Initial','Developing','Defined','Managed','Optimizing'][level]})</strong> based on a sample of 10 critical controls. ${level < 3 ? `This is ${3-level} level${3-level>1?'s':''} below the credibility threshold, the minimum for organizations making defensible claims about hiring fairness or AI governance.` : 'This meets the credibility threshold based on the sample.'}</p>
<p><strong>${yes}</strong> of 10 sampled controls are in place. <strong>${no}</strong> are not in place. <strong>${partial}</strong> are partial. This is a <strong>${score}% readiness score</strong> on a sample that deliberately targets the highest-risk controls.</p>
<p>These 10 controls represent the foundation. The full HCCS™ Standard covers <strong>67 controls across 7 governance domains</strong>. If foundation controls have gaps, deeper controls almost certainly do as well.</p>

<h2>What we found</h2>
${gaps.length > 0 ? `<div class="r"><strong style="color:#991b1b">Controls not fully in place (${gaps.length} of 10):</strong>
<table><tr><th>Control</th><th>Requirement</th><th>Level</th></tr>${gapList}</table>
<p style="font-size:12px;color:#7f1d1d;margin:8px 0 0">Each gap represents a potential compliance, legal, or operational exposure.</p></div>` : '<p>All sampled controls are in place. A full assessment would validate this across all 67 controls.</p>'}

<h2>The cost of not knowing</h2>
<div class="r">
<p style="margin:0 0 8px"><strong>We sampled 10 of 67 controls. We do not know the state of the other 57.</strong></p>
<table>
<tr><td style="font-weight:600">Average cost of one bad hire (mid-level)</td><td style="text-align:right;font-weight:700;color:#dc2626">$180,000 - $360,000</td></tr>
<tr><td style="font-weight:600">Average employment discrimination settlement</td><td style="text-align:right;font-weight:700;color:#dc2626">$40,000 - $165,000</td></tr>
<tr><td style="font-weight:600">OFCCP audit (legal + remediation)</td><td style="text-align:right;font-weight:700;color:#dc2626">$100,000 - $1,000,000+</td></tr>
<tr><td style="font-weight:600">NYC LL144 AI hiring violation (per day)</td><td style="text-align:right;font-weight:700;color:#dc2626">$500 - $1,500</td></tr>
</table>
<p style="font-size:12px;color:#7f1d1d;margin:8px 0 0">Sources: SHRM, DOL, EEOC, NYC Admin Code. The question is not whether these costs exist. It is whether we know where our exposure is.</p>
</div>

<h2>What the full assessment delivers</h2>
<div class="g">
<table>
<tr><td style="font-weight:600">Scope</td><td>All 67 controls across 7 governance domains</td></tr>
<tr><td style="font-weight:600">Per-control detail</td><td>Definition, example, your status, remediation recommendation, your notes</td></tr>
<tr><td style="font-weight:600">Maturity scoring</td><td>Validated level (L0-L5) per domain and overall</td></tr>
<tr><td style="font-weight:600">Gap analysis</td><td>Prioritized by MUST/SHOULD/MAY with specific action steps</td></tr>
<tr><td style="font-weight:600">Remediation roadmap</td><td>Phased plan to reach Level 3 (credibility threshold)</td></tr>
<tr><td style="font-weight:600">Business case document</td><td>Executive-ready report generated from your actual data</td></tr>
<tr><td style="font-weight:600">Audit-grade report</td><td>Downloadable, emailable, presentable to leadership or counsel</td></tr>
</table>
</div>

<h2>Investment options</h2>
<table>
<tr><th>Option</th><th>Investment</th><th>What's included</th><th>Best for</th></tr>
<tr style="background:#eff6ff"><td style="font-weight:700">Self-Assessment</td><td style="font-weight:700">$149</td><td>Full 67-control assessment, gap analysis, remediation roadmap, audit-grade report</td><td>HR/TA leaders assessing independently</td></tr>
<tr><td style="font-weight:700">Guided Assessment</td><td style="font-weight:700">$2,500</td><td>Everything above + expert-guided walkthrough, executive presentation, 30-day follow-up</td><td>CHROs needing validated results for leadership</td></tr>
<tr><td style="font-weight:700">Enterprise</td><td style="font-weight:700">Custom</td><td>Everything above + third-party validation, attestation letter, board-ready report</td><td>Organizations making public hiring claims</td></tr>
</table>
<p><strong>Recommended:</strong> ${level <= 1 ? 'Guided Assessment ($2,500). With foundation-level gaps, expert interpretation and executive presentation will accelerate remediation and internal buy-in.' : level <= 2 ? 'Self-Assessment ($149) for initial gap identification, with Guided Assessment if executive presentation is needed.' : 'Self-Assessment ($149) to validate the full 67-control profile and identify remaining gaps.'}</p>

<h2>The ask</h2>
<div class="box">
<p style="margin:0;font-size:14px"><strong>We are requesting approval for ${level <= 1 ? 'a Guided HCCS™ Assessment ($2,500)' : 'an HCCS™ Self-Assessment ($149)'}.</strong></p>
<p style="margin:8px 0 0">This is a one-time investment that produces: a complete governance gap analysis, a prioritized remediation roadmap, an audit-grade report, and a defensible record that we assessed our practices proactively. The alternative is discovering our gaps when a regulator, litigator, or journalist finds them first.</p>
</div>

<div class="ft">
<div>HCCS™ Budget Request | Generated from Quick Assessment data | ${date}</div>
<div style="margin-top:4px">© 2026 IngenuityCo LLC | hccsstandard.com</div>
</div>
</body></html>`;
            const w = window.open('', '_blank');
            w.document.write(html);
            w.document.close();
          }}
          style={{ padding: '14px 28px', borderRadius: 8, border: 'none', background: '#059669', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
            Generate budget request document
          </button>
          <div style={{ fontSize: 12, color: '#a7f3d0', marginTop: 10 }}>Opens in a new tab. Print or save as PDF to share with your leadership team.</div>
          <div style={{ marginTop: 14 }}>
            <a href="/business-case" style={{ fontSize: 13, color: '#6ee7b7', fontWeight: 500 }}>See the full ROI analysis and cost of inaction data →</a>
          </div>
        </div>


        {/* Pricing tiers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 32 }}>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Self-Assessment</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>$149</div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>One-time payment</div>
            {["Full 67-control assessment", "Remediation roadmap", "Audit-grade report", "Email delivery"].map(t => (
              <div key={t} style={{ fontSize: 12, color: "#475569", marginBottom: 5, display: "flex", gap: 6 }}>
                <span style={{ color: "#059669", fontWeight: 700 }}>✓</span> {t}
              </div>
            ))}
            <a href="https://buy.stripe.com/fZu6oI8BXb7herYgNucIE01" style={{ display: "block", textAlign: "center", background: "#2563eb", color: "#fff", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", marginTop: 14 }}>Get started</a>
          </div>
          <div style={{ background: "#fff", border: "2px solid #2563eb", borderRadius: 12, padding: 20, position: "relative" }}>
            <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#2563eb", color: "#fff", padding: "3px 12px", borderRadius: 10, fontSize: 10, fontWeight: 600 }}>Recommended</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Guided Assessment</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>$2,500</div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>Expert-guided</div>
            {["Everything in Self-Assessment", "Expert-guided walkthrough", "Executive presentation", "30-day follow-up"].map(t => (
              <div key={t} style={{ fontSize: 12, color: "#475569", marginBottom: 5, display: "flex", gap: 6 }}>
                <span style={{ color: "#2563eb", fontWeight: 700 }}>✓</span> {t}
              </div>
            ))}
            <a href="https://buy.stripe.com/9B65kEf0lcbl5Vs9l2cIE00" style={{ display: "block", textAlign: "center", background: "#0f172a", color: "#fff", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", marginTop: 14 }}>Book guided</a>
          </div>
          <div style={{ background: "#fff", border: "2px solid #0f172a", borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Enterprise</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Custom</div>
            <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>Validated audit</div>
            {["Everything in Guided", "Third-party validation", "Attestation letter", "Board-ready report"].map(t => (
              <div key={t} style={{ fontSize: 12, color: "#475569", marginBottom: 5, display: "flex", gap: 6 }}>
                <span style={{ color: "#0f172a", fontWeight: 700 }}>✓</span> {t}
              </div>
            ))}
            <a href="/contact" style={{ display: "block", textAlign: "center", background: "#0f172a", color: "#fff", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none", marginTop: 14 }}>Book consultation</a>
          </div>
        </div>

        {/* Email capture */}
        {!submitted ? (
          <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: 28, textAlign: "center", marginBottom: 24 }}>
            <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600, color: "#0f172a" }}>Get your quick assessment results emailed</h3>
            <p style={{ fontSize: 14, color: "#64748b", marginBottom: 16 }}>We'll send your results summary with next steps.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 400, margin: "0 auto" }}>
              <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
                style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, outline: "none" }} />
              <input type="email" placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)}
                style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, outline: "none" }} />
              <input type="text" placeholder="Organization (optional)" value={org} onChange={e => setOrg(e.target.value)}
                style={{ padding: "12px 16px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, outline: "none" }} />
              <button onClick={handleSubmit} disabled={!email || !name || sending}
                style={{ padding: "14px", borderRadius: 8, border: "none", background: email && name ? "#2563eb" : "#94a3b8", color: "#fff", fontSize: 15, fontWeight: 600, cursor: email && name ? "pointer" : "default", marginTop: 4 }}>
                {sending ? "Sending..." : "Send my results"}
              </button>
            </div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 12 }}>No spam. Your data stays yours.</div>
          </div>
        ) : (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: 28, textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>✓</div>
            <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600, color: "#166534" }}>Results sent</h3>
            <p style={{ fontSize: 14, color: "#15803d", margin: 0 }}>Check your inbox at {email}.</p>
          </div>
        )}

        {/* Have a code */}
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <a href="/assess/full" style={{ fontSize: 14, color: "#2563eb", fontWeight: 500 }}>Already have an access code? Take the full assessment →</a>
        </div>

        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 24, borderTop: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>HCCS-1.0 | © 2026 IngenuityCo LLC. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}

export default function QuickAssess() {
  const [phase, setPhase] = useState("landing");
  const [answers, setAnswers] = useState({});

  if (phase === "landing") return <Landing onStart={() => setPhase("questions")} />;
  if (phase === "questions") return <Questions onComplete={a => { setAnswers(a); setPhase("results"); window.scrollTo(0, 0); }} />;
  return <Results answers={answers} />;
}
