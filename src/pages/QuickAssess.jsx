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
        <h1 style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.15, margin: "0 0 20px", color: "#fff" }}>How audit-ready is your hiring process?</h1>
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

        {/* Pricing tiers */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Self-Assessment</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>$149</div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>One-time payment</div>
            {["Full 67-control assessment", "Remediation roadmap", "Audit-grade report", "Email delivery"].map(t => (
              <div key={t} style={{ fontSize: 13, color: "#475569", marginBottom: 6, display: "flex", gap: 6 }}>
                <span style={{ color: "#059669", fontWeight: 700 }}>✓</span> {t}
              </div>
            ))}
            <a href="https://buy.stripe.com/fZu6oI8BXb7herYgNucIE01" style={{ display: "block", textAlign: "center", background: "#2563eb", color: "#fff", padding: "12px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", marginTop: 16 }}>Get started</a>
          </div>
          <div style={{ background: "#fff", border: "2px solid #2563eb", borderRadius: 12, padding: 24, position: "relative" }}>
            <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "#2563eb", color: "#fff", padding: "3px 12px", borderRadius: 10, fontSize: 11, fontWeight: 600 }}>Recommended</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Guided Assessment</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>$2,500</div>
            <div style={{ fontSize: 13, color: "#64748b", marginBottom: 16 }}>Expert-guided engagement</div>
            {["Everything in Self-Assessment", "Expert-guided walkthrough", "Executive presentation", "30-day follow-up review"].map(t => (
              <div key={t} style={{ fontSize: 13, color: "#475569", marginBottom: 6, display: "flex", gap: 6 }}>
                <span style={{ color: "#2563eb", fontWeight: 700 }}>✓</span> {t}
              </div>
            ))}
            <a href="https://buy.stripe.com/9B65kEf0lcbl5Vs9l2cIE00" style={{ display: "block", textAlign: "center", background: "#0f172a", color: "#fff", padding: "12px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", marginTop: 16 }}>Book consultation</a>
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
          <span style={{ fontSize: 12, color: "#94a3b8" }}>HCCS-1.0 | © 2026 Diane Malefyt. All rights reserved.</span>
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
