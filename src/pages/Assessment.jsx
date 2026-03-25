import { useState, useRef, useEffect } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

const D = [{"code":"RG","name":"Role Governance","color":"#185FA5","controls":[{"id":"RG-001","text":"Documented role definition exists before sourcing begins","level":"MUST","tier":1,"definition":"A written document describing the role must be completed and approved before any candidate is reviewed or sourced. This is the internal specification, not the job posting.","example":"Role Definition Worksheet completed by hiring manager with timestamp predating first candidate screen. If first resume reviewed March 5 and definition dated March 8, this fails.","remediation":"Create a Role Definition template. Add an ATS gate blocking sourcing until definition uploaded with timestamp. Train hiring managers to complete before opening any req."},{"id":"RG-002","text":"Role definitions specify business outcomes, not only tasks","level":"MUST","tier":1,"definition":"The definition describes what the person will deliver or change, not activities they perform. Outcomes are measurable results; tasks are activities.","example":"Fails: 'Manage team, attend standups, write PRDs.' Passes: 'Reduce production incidents by 40% in 12 months. Owns architecture tradeoff decisions.'","remediation":"Convert task statements to outcomes: 'What result does this produce?' Provide before/after examples. Reject definitions with only task lists."},{"id":"RG-003","text":"Required vs. learnable capabilities are distinguished","level":"MUST","tier":2,"definition":"The definition separates capabilities required at hire from those developed post-hire. Prevents inflated requirements that screen out qualified candidates.","example":"Required: 'Led teams of 20+ through platform migration.' Learnable: 'Company deployment pipeline.' If all listed as 'required,' fails.","remediation":"Add 'Required at Hire' and 'Learnable Post-Hire' sections. For each capability: 'Would you reject someone strong on everything else?' If no, move to Learnable."},{"id":"RG-004","text":"Decision rights and accountability boundaries specified","level":"MUST","tier":2,"definition":"States what decisions this role makes unilaterally, with consultation, or with approval, and where accountability starts and stops.","example":"'Makes implementation decisions independently. Escalates architecture to Staff+. Budget up to $200K.' No mention of decisions = fails.","remediation":"Add Decision Rights section: Decides Independently / With Consultation / Requires Approval. Include budget authority. Ask: 'Most consequential decision in 90 days?'"},{"id":"RG-005","text":"Scope indicators included","level":"SHOULD","tier":3,"definition":"Quantifies operational scope: reports, budget, cross-functional exposure, ambiguity level, stakeholder complexity.","example":"'8 direct, 35 indirect across 3 time zones. $2M budget. Board exposure. High ambiguity.'","remediation":"Add Scope Indicators: headcount, budget, geographic span, stakeholder exposure, ambiguity rating. Feed into Compensable Factor Analysis."},{"id":"RG-006","text":"Role definitions validated by someone other than hiring manager","level":"SHOULD","tier":3,"definition":"Before sourcing, at least one non-hiring-manager reviews the definition for completeness and alignment.","example":"Peer or HRBP reviews and signs off with name and date. Straight to posting with no review = fails.","remediation":"Add Validator field requiring second signature before req opens. Default: HRBP for IC, skip-level for manager+. Build into workflow."},{"id":"RG-007","text":"Role taxonomy links definitions to compensation and career levels","level":"SHOULD","tier":3,"definition":"Structured mapping connects role definitions to compensation bands, career levels, and capability maps.","example":"'Senior Backend Engineer = IC4 = Band 7 = $150-190K. Factor profile: 3/4/3/3/4.'","remediation":"Build taxonomy mapping titles to career level, comp band, factor profile. Start with 10 most-hired roles. Expand in 6 months."},{"id":"RG-008","text":"Role definition quality scored and measured","level":"MAY","tier":4,"definition":"Organization measures definition quality: specificity, clarity, completeness, strategic alignment.","example":"Each scored: Outcome specificity (1-5), Decision clarity (1-5). Below threshold sent back.","remediation":"Create quality rubric. HR reviews before approving. Track scores by manager. Coach below-threshold."},{"id":"RG-009","text":"Periodic audits compare definitions to actual execution","level":"MAY","tier":5,"definition":"Reviews compare what definition says vs. what person does. Detects definition drift.","example":"Definition says 'owns architecture' but person reports all decisions go through committee. Updated.","remediation":"Annual audits for sample positions. Compare actual work to definition. Flag drift >20% for update and comp review."}]},{"code":"EI","name":"Evaluation Integrity","color":"#0F6E56","controls":[{"id":"EI-001","text":"Evaluation criteria derived from role definition before assessment","level":"MUST","tier":1,"definition":"Before any candidate evaluated, criteria documented and derived from role definition. Criteria created after seeing candidates fail.","example":"Role says 'reduce incidents 40%.' Criteria: 'reliability engineering at scale.' Dated before first interview.","remediation":"Extract 4-6 criteria from role definition. Document in Evaluation Criteria form. Lock with timestamp. Distribute before any screen."},{"id":"EI-002","text":"Every candidate evaluated with same criteria and methods","level":"MUST","tier":1,"definition":"All candidates get identical steps, competencies, scoring. No different process regardless of pipeline source.","example":"Five candidates all do same behavioral + design exercise, same rubric. Referral skips exercise = fails.","remediation":"Standard evaluation sequence per role level. Document. Train: no step skipped. ATS flags incomplete sequences."},{"id":"EI-003","text":"Evaluation assesses capabilities, not solely proxies","level":"MUST","tier":2,"definition":"Measures what candidate can do, not titles, company names, years, or credentials.","example":"Passes: 'Demonstrated scaling from 100K to 10M transactions.' Fails: '12 years at Google, MS from Stanford.'","remediation":"Review questions. Flag proxy-based. Replace with behavioral questions about what candidate did. Train on proxy vs. capability."},{"id":"EI-004","text":"Evaluators document rationale for each score","level":"MUST","tier":2,"definition":"Every evaluator writes reasoning per score, referencing criteria and citing evidence. Score without rationale fails.","example":"'System design: 4/5. Redesigned pipeline for 50x load, queue architecture decisions.' Just 'strong, recommend' = fails.","remediation":"Scorecards require text per criterion that can't be blank. Prompt: 'What evidence supports this score?' Reject blank. Show examples."},{"id":"EI-005","text":"Evaluations include behavioral or situational assessments","level":"SHOULD","tier":3,"definition":"At least one method reveals how candidate operates under role-relevant conditions.","example":"Case with incomplete data, or work sample simulating real challenges. Resume screen alone = fails.","remediation":"Design one structured assessment per role level: case, work sample, or simulation from role definition. Document rubric. Pilot internally."},{"id":"EI-006","text":"Evaluators calibrated targeting .70+ inter-rater reliability","level":"SHOULD","tier":3,"definition":"Measures whether evaluators give similar scores to similar performance. .70+ target.","example":"Three evaluators score same recorded interview. One consistently 1 point higher, recalibrated. Quarterly.","remediation":"Record 3-5 interviews. All evaluators score independently. Calculate reliability. Below .70: calibration sessions. Repeat quarterly."},{"id":"EI-010","text":"Evaluation methods demonstrate construct validity","level":"SHOULD","tier":3,"definition":"Documentation shows each method actually measures the capability it claims to. Correlation for unrelated reasons = invalid.","example":"Design exercise validity brief: designed from role challenges, correlates with on-the-job reviews, known bias toward free time.","remediation":"One-page validity brief per method: what measured, evidence, limitations. No evidence = research, study, or replace."},{"id":"EI-011","text":"Evaluator cognitive load and fatigue managed","level":"SHOULD","tier":3,"definition":"Limits evaluations per day and ensures breaks. Quality degrades with fatigue.","example":"Max 4/day, 15-min breaks, no evaluations after 4:30 PM. Six back-to-back = fails.","remediation":"Scheduling rules: max 4/day, 15-min buffer, no late-day. Exceptions documented and flagged for calibration."},{"id":"EI-007","text":"Structured debriefs: evidence before overall assessments","level":"MAY","tier":4,"definition":"Per-criterion evidence presented before hire/no-hire recommendations. Prevents anchoring.","example":"Evidence per criterion first. No 'I think we should hire' until done. 'What does everyone think?' = fails.","remediation":"Debrief Protocol: verify scorecards, criterion-by-criterion evidence, no recs until done, calibrate, decide. Post in every room."},{"id":"EI-008","text":"Validated psychometric instruments supplement structured evaluation","level":"MAY","tier":4,"definition":"Validated psychometric tools (personality, cognitive ability, situational judgment) may supplement but not replace structured evaluation. Tools must have published validity evidence for the relevant role type.","example":"Organization uses a validated situational judgment test for manager roles alongside structured behavioral interviews. The SJT has published validity data for management selection. Using an unvalidated 'culture fit' quiz = fails.","remediation":"If using psychometrics, verify: (1) published validity for this role type, (2) no adverse impact or documented mitigation, (3) used as supplement only, never sole signal. If current tools lack validity evidence, either find it or discontinue use."},{"id":"EI-012","text":"Evaluation environments assessed for stereotype threat","level":"MAY","tier":4,"definition":"Reviews whether conditions disadvantage candidates based on identity characteristics unrelated to role.","example":"All-male interviewers, whiteboard only. Fix: diverse panels, multiple formats, inclusive environment.","remediation":"Audit: interviewer demographics, formats, language. Implement diverse panels, multiple formats, inclusive communications."},{"id":"EI-013","text":"Impression management controls in evaluation design","level":"MAY","tier":4,"definition":"Evaluation methods reduce candidates' ability to substitute rehearsed narratives for demonstrated capability. Uses behavioral anchoring, work samples, and simulations rather than self-report.","example":"Instead of 'tell me about your leadership style' (rehearsable), use 'walk me through the last time you had to deliver bad news to your team, including what you said and how they responded' (behavioral, harder to fake). Or a work sample where the candidate solves a real problem.","remediation":"Review evaluation questions for rehearsability. Replace abstract self-report questions with behavioral probes anchored to specific past events. Add at least one work sample or simulation per evaluation sequence that requires demonstrating capability rather than describing it."},{"id":"EI-009","text":"Post-hire validation compares evaluation to outcomes","level":"MAY","tier":5,"definition":"Tracks whether high scores predict strong performance using signal detection analysis.","example":"12-month study: Criterion 3 lowest validity, Criterion 1 highest. Reweighted.","remediation":"Validation study: scores vs. 6/12-month performance. Correlate each criterion. Adjust weights from predictive data."}]},{"code":"DG","name":"Decision Governance","color":"#534AB7","controls":[{"id":"DG-001","text":"Every hiring decision documented with selection rationale","level":"MUST","tier":1,"definition":"Written record explains why candidate chosen. Standalone document, not email/Slack. Primary audit artifact.","example":"Decision Rationale Form: candidate, date, decision-maker, scores, evidence, comparison. Slack 'let's go with A' = fails.","remediation":"Decision Rationale form required before offer. Include: decision-maker, date, scores, evidence, comparison. HR checks completeness before approval."},{"id":"DG-002","text":"Rationale references criteria and is contemporaneous","level":"MUST","tier":1,"definition":"References evaluation criteria and documented at or near decision time. Late rationale = post-decision rationalization.","example":"Passes: criteria scores + evidence within 24 hours. Fails: 2 weeks later, 'great energy,' no criteria.","remediation":"24-hour deadline after decision meeting. Auto-remind. >72 hours = flagged. Must reference specific criteria and scores."},{"id":"DG-003","text":"Decision authority defined: who approves, who participates","level":"MUST","tier":2,"definition":"Documented matrix: final authority by role level, participation model. Decision-maker named.","example":"'IC: manager decides. Manager+: skip-level approves.' No identifiable decider = fails.","remediation":"Create Decision Authority Matrix: levels x roles. Publish. Each rationale form names the decider, matched to matrix authority."},{"id":"DG-004","text":"Decision-makers disclose conflicts of interest","level":"SHOULD","tier":3,"definition":"Disclose personal/professional relationships or interests before participating in evaluation.","example":"'Candidate B is former colleague.' Documented. Undiscovered after hire = fails.","remediation":"COI question at evaluator briefing. Document all disclosures. Standing question every debrief."},{"id":"DG-005","text":"Mechanisms detect scoring inconsistencies and bias","level":"SHOULD","tier":3,"definition":"Monitors scoring for bias: demographic patterns, anchoring, halo/horn, affinity, contrast, primacy/recency.","example":"Quarterly: Evaluator X scores women 0.8 lower on leadership. Evaluator Y: first candidate always higher. Flagged.","remediation":"Quarterly analysis: scores by demographic, time, sequence. Flag >0.5 systematic deviation. Route to calibration."},{"id":"DG-006","text":"Rejection decisions include substantive rationale","level":"SHOULD","tier":3,"definition":"Rejected qualified candidates get rationale naming unmet criteria. 'Not the best fit' fails.","example":"Passes: 'Gap on org transformation: same-team examples only.' Fails: 'Different direction.'","remediation":"Rationale form for rejections. Final-stage: name unmet criterion + evidence. Train with examples."},{"id":"DG-007","text":"Structured debrief: individual scores before group discussion","level":"SHOULD","tier":3,"definition":"Scorecards submitted before debrief. Prevents loudest voice from anchoring the group.","example":"Scorecards by 1 PM, debrief at 2 PM, criterion-by-criterion. Filled during debrief = fails.","remediation":"Deadline 2 hours before debrief. Calendar: 'Submit scorecard first.' Facilitator verifies before starting."},{"id":"DG-009","text":"Post-decision rationalization detection","level":"SHOULD","tier":3,"definition":"Monitors for late documentation, no criteria reference, contradicts scores, vague language.","example":"Auto-flag: rationale 7 days after decision. Manual flag: 'culture alignment' with no criteria. Both reviewed.","remediation":"Automated flags: >48 hours = flag. Text scan for 'culture fit/gut feel' = flag. Route to manager's manager."},{"id":"DG-008","text":"Decision review boards for senior/high-impact hires","level":"MAY","tier":4,"definition":"Board examines rationale, evidence, and process before offer for exec/high-comp hires.","example":"Director+ reviewed by CHRO + VP + independent exec. Gaps = pause.","remediation":"Talent Review Board for Director+. Checklist: definition, criteria, scorecards, rationale, comp. Before offer."},{"id":"DG-010","text":"Decision quality metrics published","level":"MAY","tier":5,"definition":"Tracks quality: time-to-productivity, score-to-performance correlation, retention by evaluator.","example":"'Q4 hires productive in 4.2 months vs 5.8 Q2. Manager X: 90% retention vs 78% org.'","remediation":"Define metrics: retention, productivity, correlation. Baseline 12 months. Report quarterly. Refine from data."}]},{"code":"AG","name":"AI Governance","color":"#993C1D","controls":[{"id":"AG-001","text":"Inventory of all automated decision tools maintained","level":"MUST","tier":1,"definition":"Documented list of every tool that filters, scores, ranks, or recommends candidates or compensation.","example":"Inventory: (1) Greenhouse auto-screen, (2) HireVue, (3) Radford comp. Each: name, vendor, function, owner. Missing tool = fails.","remediation":"Survey every hiring team: 'What software touches candidate data?' List all. Document per tool. Review annually."},{"id":"AG-002","text":"No ADT sole decision-maker; human with override authority required","level":"MUST","tier":1,"definition":"Human with context and authority reviews every consequential output before it takes effect. Batch 'approve all' = fails.","example":"Recruiter reviews advances + 10% of rejections. Overrides 3. Documented. Auto-reject without review = fails.","remediation":"Define Human Review Point per ADT. Require 10% rejection sample review. Log every review and override."},{"id":"AG-003","text":"Can explain in plain language how each ADT works","level":"MUST","tier":2,"definition":"For every tool: what data in, what rules applied, what comes out. 'Vendor proprietary algorithm' = fails.","example":"Passes: 'Matches 12 keywords weighted by section. Above 60% advances.' Fails: 'AI finds best candidates.'","remediation":"Per ADT, plain-language doc: data, logic, output. If vendor can't explain, request docs or consider replacing."},{"id":"AG-004","text":"ADTs tested for disparate impact before deployment and regularly","level":"MUST","tier":2,"definition":"Before launch and annually: test if tool screens out protected classes disproportionately. Four-fifths rule.","example":"Men 35%, women 22%. 63% < 80% threshold. Over-weights continuous employment. Adjusted. Never tested = fails.","remediation":"Pre-deployment analysis: rates by gender, race, age. Four-fifths rule. Impact found: investigate features, adjust, retest. Annual."},{"id":"AG-005","text":"Candidates told when ADTs used","level":"SHOULD","tier":3,"definition":"Candidates informed when automated tools are involved, with general description.","example":"'Application may be reviewed by automated screening. All recommendations reviewed by human recruiter.'","remediation":"Disclosure in application email, careers page, new ADT stages. Describe function. Confirm human review. Legal review."},{"id":"AG-006","text":"ADT outputs auditable: can reconstruct individual decisions","level":"SHOULD","tier":3,"definition":"For any candidate, explain specifically why tool advanced or rejected them.","example":"'Score 42/100. Threshold 60. Missing: distributed systems, API design.' Can't produce = fails.","remediation":"Verify individual logs per ADT. Test: explanation for 5 candidates. Can't = vendor fix or flag as risk."},{"id":"AG-007","text":"Accountable owner designated for each ADT","level":"SHOULD","tier":3,"definition":"Named person (not department) responsible for monitoring, testing, compliance.","example":"'Owner: Sarah Chen, Dir Talent Ops.' 'HR Department' without name = partial.","remediation":"Named owner per ADT. Responsibilities: tests, docs, audit coordination. Review on personnel changes."},{"id":"AG-008","text":"A/B testing compares ADT vs. human accuracy","level":"MAY","tier":4,"definition":"Both ADT and humans independently assess same candidates; compare against outcomes.","example":"3 months parallel. After 6 months compare to on-the-job performance.","remediation":"Parallel evaluation study. Both assess same candidates. Compare to 6-12 month outcomes. Calibrate thresholds."},{"id":"AG-009","text":"Adversarial testing identifies failure modes","level":"MAY","tier":4,"definition":"Deliberately try to break tools: keyword stuffing, synthetic profiles, demographic bias tests.","example":"Identical resumes, different names. Keyword stuffing. Unusual format + qualified.","remediation":"Adversarial suite: demographics, stuffing, format, unqualified+keywords. Run annually and after updates."},{"id":"AG-010","text":"ADT performance data contributed to benchmarking","level":"MAY","tier":5,"definition":"Anonymized accuracy, bias results, override rates shared with industry groups.","example":"'False rejection 12%. Override 8%. Impact improved 0.63 to 0.81.'","remediation":"Join industry groups. Anonymized data packages annually."}]},{"code":"PI","name":"Process Integrity","color":"#854F0B","controls":[{"id":"PI-001","text":"Every externally posted role is genuinely open","level":"MUST","tier":1,"definition":"If posted externally, external candidates must have real opportunity to be selected. Not predetermined.","example":"5 external + 2 internal evaluated identically, external selected = passes. Manager told internal 'this is yours' = fails.","remediation":"Process Classification before posting. Manager selects: Open/Internal-Preference/Restricted. Open = attests no promise. Pattern detected by PI-004."},{"id":"PI-002","text":"Internal-preference processes documented before posting","level":"MUST","tier":2,"definition":"If internal candidate preferred, document before posting. Failure is not disclosing, not having preference.","example":"Before posting: 'Internal-Preference. Jane Smith. Rationale: promotion. External evaluated on identical criteria.'","remediation":"Classification Record before req approval. Name candidate, rationale, confirm identical criteria. Timestamp before posting."},{"id":"PI-003","text":"All candidates past screening evaluated identically","level":"MUST","tier":2,"definition":"Same criteria, methods, rigor, timeline regardless of source. No shortcuts for referrals.","example":"Referred + cold-apply both complete same 4-stage process = passes. CEO referral gets 30-min chat = fails.","remediation":"Standard sequence per level. ATS tracks completion. Flag skipped stages. No exceptions for referral source."},{"id":"PI-004","text":"Internal-preference hire ratios tracked by department","level":"SHOULD","tier":3,"definition":"Track percentage from internal-preference vs. open, by department and level.","example":"'Eng IC: 70% open, 30% internal. Eng Manager: 40% open.' 90%+ internal = review.","remediation":"ATS report: classification per hire by department/level. Monthly to HR, quarterly to exec. >80% internal = review."},{"id":"PI-005","text":"Timelines communicated; deviations shared proactively","level":"SHOULD","tier":3,"definition":"Candidates get estimates upfront. Material deviations communicated.","example":"'Process 3-4 weeks, update each stage.' Delayed: 'Extended to April 15.' Silence 8 weeks = fails.","remediation":"Standardize: ack within 3 days, status per stage, timeline at screen, proactive notice if >5 day deviation. Templates + ATS."},{"id":"PI-006","text":"Final-stage candidates get substantive feedback","level":"SHOULD","tier":3,"definition":"Feedback references criteria, identifies specific gaps, delivered by a person.","example":"'Gap: org transformation, same-team examples only.' 'Moving forward with another candidate' = fails.","remediation":"Template: 'Gap was [criterion]: [what missing].' Phone for Director+, personal email for others. Train managers."},{"id":"PI-007","text":"Process audits assess consistency across demographics","level":"MAY","tier":4,"definition":"Check whether time-to-decision, pass-through, rounds are consistent across groups.","example":"White candidates 18 days, Black candidates 26 days. Extra round found. Eliminated.","remediation":"Semi-annual: time-in-stage, pass-through by demographics. >15% variance = investigate. Document actions."},{"id":"PI-008","text":"Anonymized process metrics published","level":"MAY","tier":5,"definition":"Publish open/internal ratios, time-to-decision, feedback rates, satisfaction.","example":"'68% open. 21 days average. 92% feedback. NPS 72.'","remediation":"Annual Transparency Report. Publish on careers page."}]},{"code":"CG","name":"Compensation Governance","color":"#3B6D11","controls":[{"id":"CG-001","text":"Compensation uses compensable factors, not title or salary history","level":"MUST","tier":1,"definition":"Pay from role scope analysis, not title matching, salary history, or predecessor pay.","example":"Factor analysis: Authority 5, Complexity 5. Range $280-340K = passes. 'Radford says $310K, candidate makes $280K' = fails.","remediation":"Factor Analysis template. Complete before pay. Remove salary history from apps. Factor analysis required before market data."},{"id":"CG-002","text":"Five factors: authority, complexity, accountability, impact, expertise","level":"MUST","tier":2,"definition":"Framework uses minimum five factors, each scored 1-5 with rationale.","example":"'Accountability 4/5: owns pipeline end-to-end, regulatory exposure on failure.' Just 'High' = fails.","remediation":"Template: five sections, each with definition, 1-5 guide, rationale field. Train. New hires first, backfill in 12 months."},{"id":"CG-003","text":"Rationale connecting factors to pay documented","level":"MUST","tier":2,"definition":"Shows factor range, actual offer, deviation rationale, salary history non-use.","example":"'Range $150-190K. Offer $175K at 65th percentile. Stack expertise justifies above-mid. No salary history.' No doc = fails.","remediation":"Comp Rationale in offer workflow: range, offer, positioning, non-use checkbox. Analyst review before approval."},{"id":"CG-004","text":"Annual scope-to-compensation alignment reviews","level":"SHOULD","tier":3,"definition":"Yearly check whether comp aligns with actual scope, which may have changed.","example":"Hired at Complexity 3. Now owns 3 teams (Complexity 4). Range $190-220K. Adjustment recommended.","remediation":"Annual: managers re-score factors. Compare to hire-date. 1+ point increase = flag for adjustment. Catches scope creep."},{"id":"CG-005","text":"Comp decisions follow same audit trail as hiring","level":"SHOULD","tier":3,"definition":"Same documentation rigor, retention, audit access as hiring decisions.","example":"Every change has Rationale Form, retained 3 years. Changes in HRIS with no doc = fails.","remediation":"Same ER governance for comp. Same forms, system, retention, audit access. Comp is equally consequential."},{"id":"CG-006","text":"Pay equity analysis by demographics, controlling for factors","level":"SHOULD","tier":3,"definition":"Whether equivalent-scope people are paid equivalently regardless of demographics.","example":"Women at equivalent factors paid 97.2% (noise). Sales: 91.4%. Negotiation-driven. Standardize.","remediation":"Equity analysis controlling for factors by gender, race, age. >3% gap = investigate. Common: negotiation, tenure."},{"id":"CG-007","text":"Real-time comp modeling when scope changes","level":"MAY","tier":4,"definition":"System flags scope changes and triggers auto review.","example":"Promoted to tech lead, 5 reports. Auto-generates factor re-analysis request.","remediation":"HRIS triggers: promotion, reporting change, headcount. Auto-generate re-analysis. Continuous vs. annual-only."},{"id":"CG-008","text":"Factor-based benchmarking data contributed","level":"MAY","tier":5,"definition":"Anonymized comp data by factors contributed to surveys.","example":"Factor profile 5/5/5/5/4: $280-340K vs. 3/4/3/3/4: $180-220K. Both VP Eng.","remediation":"Include factor data in survey contributions. Work with vendor. Advocate for factor-based benchmarking."}]},{"code":"ER","name":"Evidence & Records","color":"#993556","controls":[{"id":"ER-001","text":"Contemporaneous records for every decision","level":"MUST","tier":1,"definition":"Created at decision time. Scorecards within 4 hours, rationale within 24 hours, classifications before posting. 72+ hours = retrospective = fails.","example":"Interview 10 AM, scorecard 12:30 PM = passes. Interview March 5, scorecard March 15 = fails.","remediation":"System deadlines: scorecards lock 4 hours post-interview, rationale locks 48 hours. Auto-remind. Late = flagged."},{"id":"ER-002","text":"Records retained minimum 3 years","level":"MUST","tier":1,"definition":"All records kept 3+ years. Exceeds EEOC (1 year), OFCCP (2 years).","example":"Hire Jan 2026, records until Jan 2029. Auto-purge at 12 months = fails.","remediation":"3-year retention (5 recommended). Disable auto-purge. Departing employee records archived, not deleted."},{"id":"ER-003","text":"Records classified and retrievable within 48 hours","level":"MUST","tier":2,"definition":"Organized by domain, type, date. Auditor requests 'Q3 evaluations' and gets them within 48 hours.","example":"System returns 47 scorecards in 4 hours = passes. 3 weeks across Google Drives = fails.","remediation":"Centralized system. Classification: [Domain]-[Type]-[Date]-[ReqID]. Train. Monthly: retrieve random hire within 1 hour."},{"id":"ER-004","text":"Named accountability for records governance","level":"MUST","tier":2,"definition":"Specific person (not department) accountable for creation, storage, retention, producibility.","example":"'Maria Lopez, Sr HR Ops.' Answer 'HR' without name = partial.","remediation":"Named owner with written responsibilities. Include in performance objectives."},{"id":"ER-005","text":"Records linked to specific HCCS control IDs","level":"SHOULD","tier":3,"definition":"System connects documents to controls they satisfy. Enables targeted audit.","example":"'Scorecard 2847 satisfies EI-002, EI-004, Req-0342.' Search by control ID finds all evidence.","remediation":"Add 'Control IDs' metadata. Tag each document. Manual first, automate later. Enables control-based audit search."},{"id":"ER-006","text":"Access restricted and logged","level":"SHOULD","tier":3,"definition":"Role-based access. Every access logged with timestamp and user.","example":"System logs access. Shared Drive anyone can access = fails.","remediation":"Role-based access: managers own, HRBPs department, audit all. Enable logging. Review quarterly."},{"id":"ER-007","text":"Automated evidence collection at point of decision","level":"MAY","tier":4,"definition":"Records auto-created on decision. No manual form-filling after.","example":"Evaluator clicks submit, system creates timestamped scorecard tagged to controls.","remediation":"Evaluate ATS auto-export. Configure structured export. Can't: Zapier/API on submit."},{"id":"ER-008","text":"Records completeness audits","level":"MAY","tier":4,"definition":"Periodic checks that records exist for every decision that should have one.","example":"'47 hires, 47 definitions (100%), 44 rationale (93.6%). 3 Sales gaps flagged.'","remediation":"Quarterly: all hires vs. records by domain. Coverage by department. Route gaps to managers."},{"id":"ER-009","text":"Tamper-evident storage for high-stakes decisions","level":"MAY","tier":5,"definition":"Executive/sensitive records stored where modifications impossible or leave audit trail.","example":"Director+ in version-controlled system. Edits create versions. Dual-auth deletion.","remediation":"Director+ in immutable system. Version history + restricted deletion. No silent modification."}]}];

const LN=["Not Established","Initial","Developing","Defined","Managed","Optimizing"];
const LC=["#dc2626","#888780","#185FA5","#0F6E56","#534AB7","#993C1D"];
const TL=["None","Self-Attest","Self-Attest","Validated","Audited","Audited"];

function calcLv(a,d){let l=0;const m=x=>x.every(c=>a[c.id]==="yes"),mo=x=>!x.length||x.filter(c=>a[c.id]==="yes").length>=x.length*.7;
if(m(d.controls.filter(c=>c.tier<=1&&c.level==="MUST")))l=1;if(l>=1&&m(d.controls.filter(c=>c.tier<=2&&c.level==="MUST")))l=2;
if(l>=2&&mo(d.controls.filter(c=>c.tier<=3&&c.level==="SHOULD")))l=3;if(l>=3&&mo(d.controls.filter(c=>c.tier<=4&&c.level==="MAY")))l=4;
if(l>=4&&m(d.controls.filter(c=>c.tier===5&&c.level==="MAY")))l=5;return l;}
function getGaps(a,d){return d.controls.filter(c=>a[c.id]!=="yes").map(c=>({...c,domain:d.code}));}
function sortG(g){const o={MUST:0,SHOULD:1,MAY:2};return[...g].sort((a,b)=>o[a.level]-o[b.level]||a.tier-b.tier);}

function Landing({onStart}){return(
<div style={{minHeight:"100vh",background:"linear-gradient(165deg,#0a1628 0%,#1a2d4a 40%,#0f3460 100%)",color:"#e2e8f0",fontFamily:"'IBM Plex Sans',system-ui,sans-serif"}}>
<div style={{maxWidth:760,margin:"0 auto",padding:"80px 24px 60px"}}>
<div style={{letterSpacing:"0.25em",fontSize:12,textTransform:"uppercase",color:"#5b9bd5",marginBottom:16,fontWeight:500}}>Human Capital Control Standard</div>
<h1 style={{fontSize:44,fontWeight:700,lineHeight:1.15,margin:"0 0 20px",color:"#fff"}}>Is your hiring process<br/>audit-ready?</h1>
<p style={{fontSize:18,lineHeight:1.65,color:"#94a3b8",maxWidth:560,margin:"0 0 40px"}}>Most organizations have process steps for hiring. Few have enforceable controls. HCCS™ is the first governance and audit standard for human capital decisions.</p>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:16,marginBottom:48}}>
{[["67","auditable controls"],["7","governance domains"],["5","maturity levels"]].map(([n,l])=>(
<div key={l} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"20px 16px",textAlign:"center"}}>
<div style={{fontSize:32,fontWeight:700,color:"#5b9bd5"}}>{n}</div>
<div style={{fontSize:13,color:"#64748b",marginTop:4}}>{l}</div></div>))}
</div>
<div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:12,padding:28,marginBottom:48}}>
<div style={{fontSize:14,fontWeight:600,color:"#5b9bd5",marginBottom:12}}>This assessment will:</div>
{["Score your organization across 7 control domains","Each control includes definition, example, and remediation recommendation","Calculate maturity level (1-5) per domain and overall","Identify gaps with specific action steps to close them"].map((t,i)=>(
<div key={i} style={{display:"flex",gap:10,marginBottom:10}}><span style={{color:"#5b9bd5",fontWeight:700}}>→</span><span style={{fontSize:15,color:"#cbd5e1",lineHeight:1.5}}>{t}</span></div>))}
<div style={{fontSize:13,color:"#64748b",marginTop:16,fontStyle:"italic"}}>10-15 minutes. Every control tells you what 'in place' looks like and exactly how to fix it if it's not.</div>
</div>
<button onClick={onStart} style={{background:"#2563eb",color:"#fff",border:"none",borderRadius:8,padding:"16px 40px",fontSize:16,fontWeight:600,cursor:"pointer"}}
onMouseOver={e=>e.target.style.background="#1d4ed8"} onMouseOut={e=>e.target.style.background="#2563eb"}>Start assessment</button>
<div style={{marginTop:64,paddingTop:32,borderTop:"1px solid rgba(255,255,255,0.06)",fontSize:13,color:"#475569"}}>
<div>HCCS-1.0 | Aligned to SOX, NIST AI RMF, and ISO governance standards</div>
<div style={{marginTop:4}}>© 2026 Diane Malefyt. All rights reserved.</div></div></div></div>);}

function Assess({onComplete}){
const[di,setDi]=useState(0);const[ans,setAns]=useState({});const[notes,setNotes]=useState({});const[exp,setExp]=useState({});const ref=useRef(null);
const d=D[di];const prog=(di/D.length)*100;const dp=d.controls.filter(c=>ans[c.id]!==undefined).length/d.controls.length*100;
const ok=d.controls.every(c=>ans[c.id]!==undefined);
const badge=lv=>{const c={MUST:{bg:"#fef2f2",t:"#991b1b",b:"#fecaca"},SHOULD:{bg:"#fefce8",t:"#854d0e",b:"#fde68a"},MAY:{bg:"#f0fdf4",t:"#166534",b:"#bbf7d0"}}[lv];
return <span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:4,background:c.bg,color:c.t,border:`1px solid ${c.b}`}}>{lv}</span>;};
return(
<div ref={ref} style={{minHeight:"100vh",background:"#f8fafc",fontFamily:"'IBM Plex Sans',system-ui,sans-serif"}}>
<div style={{position:"sticky",top:64,zIndex:10,background:"#fff",borderBottom:"1px solid #e2e8f0"}}>
<div style={{height:3,background:"#e2e8f0"}}><div style={{height:3,background:"#2563eb",width:`${prog+dp/D.length}%`,transition:"width 0.3s"}}/></div>
<div style={{maxWidth:760,margin:"0 auto",padding:"12px 24px",display:"flex",justifyContent:"space-between"}}>
<span style={{fontSize:13,color:"#64748b"}}>Domain {di+1} of {D.length}</span>
<span style={{fontSize:13,color:"#64748b"}}>{Math.round(prog+dp/D.length)}%</span></div></div>
<div style={{maxWidth:760,margin:"0 auto",padding:"40px 24px 80px"}}>
<div style={{display:"flex",alignItems:"center",gap:12,marginBottom:8}}>
<div style={{width:40,height:40,borderRadius:8,background:d.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700,fontSize:14}}>{d.code}</div>
<div><h2 style={{margin:0,fontSize:24,fontWeight:700,color:"#0f172a"}}>{d.name}</h2><div style={{fontSize:13,color:"#64748b"}}>{d.controls.length} controls</div></div></div>
<div style={{height:1,background:"#e2e8f0",margin:"20px 0 28px"}}/>
{d.controls.map(c=>{const v=ans[c.id],ex=exp[c.id];return(
<div key={c.id} style={{background:"#fff",border:`1px solid ${v?"#e2e8f0":"#cbd5e1"}`,borderRadius:10,padding:"20px 24px",marginBottom:12}}>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
<span style={{fontSize:12,fontWeight:600,color:"#64748b",fontFamily:"monospace"}}>{c.id}</span>
{badge(c.level)}<span style={{fontSize:11,color:"#94a3b8"}}>L{c.tier}+</span></div>
<p style={{margin:"0 0 8px",fontSize:15,lineHeight:1.55,color:"#1e293b",fontWeight:500}}>{c.text}</p>
<button onClick={()=>setExp(p=>({...p,[c.id]:!p[c.id]}))} style={{background:"none",border:"none",padding:0,fontSize:13,color:"#2563eb",cursor:"pointer",marginBottom:ex?12:8,fontWeight:500}}>
{ex?"Hide details ▴":"What does this mean? ▾"}</button>
{ex&&(<div style={{background:"#f8fafc",borderRadius:8,padding:16,marginBottom:12,borderLeft:"3px solid #2563eb"}}>
<div style={{fontSize:13,fontWeight:600,color:"#334155",marginBottom:6}}>Definition</div>
<p style={{margin:"0 0 12px",fontSize:13.5,lineHeight:1.6,color:"#475569"}}>{c.definition}</p>
<div style={{fontSize:13,fontWeight:600,color:"#334155",marginBottom:6}}>What "in place" looks like</div>
<p style={{margin:0,fontSize:13.5,lineHeight:1.6,color:"#475569"}}>{c.example}</p></div>)}
<div style={{display:"flex",gap:8}}>
{[["yes","In place","#059669"],["partial","Partial","#d97706"],["no","Not in place","#dc2626"]].map(([val,label,col])=>(
<button key={val} onClick={()=>setAns(p=>({...p,[c.id]:val}))} style={{flex:1,padding:"8px 12px",borderRadius:6,fontSize:13,fontWeight:500,cursor:"pointer",
background:v===val?`${col}10`:"#f8fafc",border:v===val?`2px solid ${col}`:"1px solid #e2e8f0",color:v===val?col:"#64748b"}}>{label}</button>))}</div>
{v&&(<div style={{marginTop:10}}>
{v!=="yes"&&c.remediation&&(<div style={{background:"#eff6ff",borderRadius:8,padding:"12px 14px",marginBottom:10,borderLeft:"3px solid #3b82f6"}}>
<div style={{fontSize:12,fontWeight:600,color:"#1e40af",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.04em"}}>Recommended remediation</div>
<div style={{fontSize:13.5,lineHeight:1.6,color:"#1e3a5f"}}>{c.remediation}</div></div>)}
{v==="yes"&&(<div style={{background:"#f0fdf4",borderRadius:8,padding:"12px 14px",marginBottom:10,borderLeft:"3px solid #22c55e"}}>
<div style={{fontSize:12,fontWeight:600,color:"#166534",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.04em"}}>Evidence to document</div>
<div style={{fontSize:13.5,lineHeight:1.6,color:"#14532d"}}>{c.remediation}</div></div>)}
<textarea value={notes[c.id]||""} onChange={e=>setNotes(p=>({...p,[c.id]:e.target.value}))}
placeholder={v==="yes"?"Your evidence: system name, document, process owner, last review date":v==="partial"?"What's in place? What's missing? What would close the gap?":"What's blocking this? Planned remediation? Dependencies?"}
style={{width:"100%",minHeight:56,padding:"10px 12px",borderRadius:6,border:"1px solid #e2e8f0",fontSize:13,lineHeight:1.5,color:"#334155",fontFamily:"inherit",resize:"vertical",outline:"none",background:"#fafbfc",boxSizing:"border-box"}}/>
<div style={{fontSize:12,color:"#64748b",marginTop:4}}>
{v==="yes"?"Your notes become part of the audit evidence record.":v==="partial"?"Specificity here accelerates remediation.":"This note carries into your gap analysis and roadmap."}</div>
</div>)}</div>);})}
<div style={{display:"flex",justifyContent:"space-between",marginTop:32}}>
<button onClick={()=>{if(di>0){setDi(di-1);ref.current?.scrollIntoView({behavior:"smooth"});}}} disabled={di===0}
style={{padding:"12px 28px",borderRadius:8,border:"1px solid #e2e8f0",background:"#fff",color:di===0?"#cbd5e1":"#475569",fontSize:14,fontWeight:500,cursor:di===0?"default":"pointer"}}>← Previous</button>
<button onClick={()=>{if(di<D.length-1){setDi(di+1);ref.current?.scrollIntoView({behavior:"smooth"});}else onComplete(ans,notes);}} disabled={!ok}
style={{padding:"12px 28px",borderRadius:8,border:"none",background:ok?"#2563eb":"#94a3b8",color:"#fff",fontSize:14,fontWeight:500,cursor:ok?"pointer":"default"}}>
{di===D.length-1?"See results":"Next domain →"}</button></div></div></div>);}

function genReport(user,ds,ov,answers,notes,mg,sg,ag,ph){
const date=new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
const allControls=D.flatMap(d=>d.controls.map(c=>({...c,domainCode:d.code,domainName:d.name,domainColor:d.color})));
const statusLabel=v=>v==='yes'?'In Place':v==='partial'?'Partial':'Not in Place';
const statusColor=v=>v==='yes'?'#059669':v==='partial'?'#d97706':'#dc2626';

// Pre-compute SVG radar chart
const radarGrids=[1,2,3,4,5].map(lv=>{const pts=ds.map((_,i)=>{const a=(2*Math.PI*i/7)-Math.PI/2;return(200+lv*30*Math.cos(a))+","+(200+lv*30*Math.sin(a));}).join(' ');return '<polygon points="'+pts+'" fill="none" stroke="#e2e8f0" stroke-width="1"/>';}).join('');
const radarAxes=ds.map((_,i)=>{const a=(2*Math.PI*i/7)-Math.PI/2;return '<line x1="200" y1="200" x2="'+(200+150*Math.cos(a))+'" y2="'+(200+150*Math.sin(a))+'" stroke="#e2e8f0" stroke-width="1"/>';}).join('');
const radarData=ds.map((d,i)=>{const a=(2*Math.PI*i/7)-Math.PI/2;return(200+d.level*30*Math.cos(a))+","+(200+d.level*30*Math.sin(a));}).join(' ');
const radarDots=ds.map((d,i)=>{const a=(2*Math.PI*i/7)-Math.PI/2;const x=200+d.level*30*Math.cos(a);const y=200+d.level*30*Math.sin(a);return '<circle cx="'+x+'" cy="'+y+'" r="4" fill="#2563eb"/>';}).join('');
const radarLabels=ds.map((d,i)=>{const a=(2*Math.PI*i/7)-Math.PI/2;const x=200+170*Math.cos(a);const y=200+170*Math.sin(a);return '<text x="'+x+'" y="'+y+'" text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="600" fill="#475569">'+d.domain+'</text>';}).join('');
const radarSvg='<svg width="320" height="320" viewBox="0 0 400 400">'+radarGrids+radarAxes+'<polygon points="'+radarData+'" fill="rgba(37,99,235,0.15)" stroke="#2563eb" stroke-width="2.5"/>'+radarDots+radarLabels+'</svg>';

// Pre-compute bar chart HTML
const barChart=ds.map(d=>'<div style="display:flex;align-items:center;gap:12px;margin-bottom:10px"><div style="width:28px;font-size:12px;font-weight:600;color:#475569">'+d.domain+'</div><div style="flex:1;height:24px;background:#f1f5f9;border-radius:4px;overflow:hidden"><div style="height:100%;width:'+((d.level/5)*100)+'%;background:'+d.color+';border-radius:4px"></div></div><div style="width:80px;font-size:12px;color:#475569">L'+d.level+' '+LN[d.level]+'</div></div>').join('');

// Pre-compute domain cards
const domainCards=ds.map(d=>'<div style="border:1px solid #e2e8f0;border-left:4px solid '+d.color+';border-radius:8px;padding:14px 16px;break-inside:avoid"><div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-weight:600;font-size:13px">'+d.domain+': '+d.name+'</span><span style="font-weight:600;color:'+d.color+';font-size:13px">L'+d.level+'</span></div><div style="font-size:12px;color:#64748b">'+d.met+'/'+d.total+' in place'+(d.partial>0?', '+d.partial+' partial':'')+' | '+d.gaps.length+' gaps</div><div style="height:5px;background:#f1f5f9;border-radius:3px;margin-top:6px;overflow:hidden"><div style="height:100%;background:'+d.color+';width:'+((d.met/d.total)*100)+'%;border-radius:3px"></div></div></div>').join('');
const domainTable=ds.map(d=>'<tr><td><strong>'+d.domain+'</strong></td><td>'+d.name+'</td><td><strong>Level '+d.level+': '+LN[d.level]+'</strong></td><td>'+d.met+'/'+d.total+'</td><td>'+d.partial+'</td><td>'+d.gaps.length+'</td><td>'+TL[d.level]+'</td></tr>').join('');
const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>HCCS™ Assessment Report - ${user?.org||'Organization'}</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'IBM Plex Sans',sans-serif;color:#1e293b;line-height:1.6;font-size:13px}
@page{size:letter;margin:0.75in}
@media print{.no-print{display:none!important}.page-break{page-break-before:always}}
.cover{min-height:100vh;background:linear-gradient(165deg,#0a1628,#1a2d4a,#0f3460);color:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:60px 40px}
.cover h1{font-size:48px;font-weight:700;margin-bottom:8px}
.cover .sub{font-size:20px;color:#5b9bd5;margin-bottom:40px}
.cover .org{font-size:28px;font-weight:600;margin-bottom:8px}
.cover .date{font-size:16px;color:#94a3b8}
.cover .meta{margin-top:40px;font-size:14px;color:#64748b}
.section{padding:40px;max-width:900px;margin:0 auto}
h2{font-size:22px;font-weight:700;color:#0f172a;margin:0 0 16px;padding-bottom:8px;border-bottom:2px solid #e2e8f0}
h3{font-size:16px;font-weight:600;color:#0f172a;margin:24px 0 10px}
p{margin:0 0 12px}
table{width:100%;border-collapse:collapse;margin:16px 0}
th{background:#1B2A4A;color:#fff;padding:8px 12px;text-align:left;font-size:12px;font-weight:600}
td{padding:8px 12px;border-bottom:1px solid #e2e8f0;font-size:12px;vertical-align:top}
tr:nth-child(even) td{background:#f8fafc}
.badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700}
.must{background:#fef2f2;color:#991b1b;border:1px solid #fecaca}
.should{background:#fefce8;color:#854d0e;border:1px solid #fde68a}
.may{background:#f0fdf4;color:#166534;border:1px solid #bbf7d0}
.status-yes{color:#059669;font-weight:600}.status-partial{color:#d97706;font-weight:600}.status-no{color:#dc2626;font-weight:600}
.note{background:#f8fafc;border-left:3px solid #2563eb;padding:8px 12px;margin:4px 0 8px;font-size:12px;color:#475569;border-radius:0 4px 4px 0}
.remediation{background:#eff6ff;border-left:3px solid #3b82f6;padding:8px 12px;margin:4px 0 8px;font-size:12px;color:#1e3a5f;border-radius:0 4px 4px 0}
.gap-critical{background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:16px;margin:12px 0}
.gap-significant{background:#fefce8;border:1px solid #fde68a;border-radius:8px;padding:16px;margin:12px 0}
.level-badge{display:inline-block;padding:4px 16px;border-radius:16px;font-weight:600;font-size:14px}
.quote{background:#0f172a;color:#94a3b8;padding:24px;border-radius:8px;text-align:center;font-style:italic;margin:24px 0}
.footer{text-align:center;font-size:11px;color:#94a3b8;padding:24px;border-top:1px solid #e2e8f0;margin-top:40px}
.print-btn{position:fixed;top:20px;right:20px;background:#2563eb;color:#fff;border:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;z-index:100;box-shadow:0 4px 12px rgba(0,0,0,0.15)}
.print-btn:hover{background:#1d4ed8}
</style></head><body>
<button class="print-btn no-print" onclick="window.print()">Save as PDF / Print</button>

<div class="cover">
<div style="letter-spacing:0.2em;font-size:14px;color:#5b9bd5;margin-bottom:24px">HUMAN CAPITAL CONTROL STANDARD</div>
<h1>HCCS™</h1>
<div class="sub">Maturity Assessment Report</div>
<div class="org">${user?.org||'Organization'}</div>
<div class="date">${date}</div>
<div class="meta">
<div>Prepared for: ${user?.name||'Assessment User'}${user?.title?', '+user.title:''}</div>
<div>${user?.email||''}</div>
<div style="margin-top:16px">HCCS-1.0 | hccsstandard.com</div>
</div>
</div>

<div class="page-break"></div>
<div class="section">
<h2>Executive Summary</h2>
<table>
<tr><td style="width:200px;font-weight:600">Organization</td><td>${user?.org||'N/A'}</td></tr>
<tr><td style="font-weight:600">Assessed By</td><td>${user?.name||'N/A'}${user?.title?', '+user.title:''}</td></tr>
<tr><td style="font-weight:600">Assessment Date</td><td>${date}</td></tr>
<tr><td style="font-weight:600">Company Size</td><td>${user?.size||'N/A'} employees</td></tr>
<tr><td style="font-weight:600">Overall Maturity Level</td><td><strong>Level ${ov}: ${LN[ov]}</strong></td></tr>
<tr><td style="font-weight:600">Compliance Tier</td><td>${TL[ov]}</td></tr>
<tr><td style="font-weight:600">Controls Assessed</td><td>67</td></tr>
<tr><td style="font-weight:600">Controls In Place</td><td>${allControls.filter(c=>answers[c.id]==='yes').length}</td></tr>
<tr><td style="font-weight:600">Controls Partial</td><td>${allControls.filter(c=>answers[c.id]==='partial').length}</td></tr>
<tr><td style="font-weight:600">Controls Not In Place</td><td>${allControls.filter(c=>answers[c.id]==='no').length}</td></tr>
<tr><td style="font-weight:600">Critical Gaps (MUST)</td><td style="color:#dc2626;font-weight:600">${mg.length}</td></tr>
<tr><td style="font-weight:600">Significant Gaps (SHOULD)</td><td style="color:#d97706;font-weight:600">${sg.length}</td></tr>
</table>

<div class="quote">
"If the organization cannot reconstruct how a decision was made, what evidence it relied on, and whether standards were applied consistently, the process must be treated as unreliable."
<div style="margin-top:8px;font-style:normal;color:#475569;font-size:12px">HCCS-1.0, Governing Principle</div>
</div>
</div>

<div class="page-break"></div>
<div class="section">
<h2>Domain Maturity Scores</h2>

<div style="display:flex;gap:32px;margin:24px 0 32px;flex-wrap:wrap;justify-content:center">

<!-- Radar Chart -->
<div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;text-align:center">
<div style="font-size:14px;font-weight:600;margin-bottom:12px">Maturity Profile</div>
${radarSvg}
</div>

<!-- Bar Chart -->
<div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;flex:1;min-width:300px">
<div style="font-size:14px;font-weight:600;margin-bottom:16px">Level by Domain</div>
${barChart}
<div style="display:flex;justify-content:space-between;margin-top:12px;font-size:11px;color:#94a3b8;border-top:1px solid #e2e8f0;padding-top:8px">
<span>L0</span><span>L1</span><span>L2</span><span>L3</span><span>L4</span><span>L5</span>
</div>
</div>
</div>

<!-- Domain Summary Cards -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px">
${domainCards}
</div>

<table>
<tr><th>Domain</th><th>Name</th><th>Level</th><th>In Place</th><th>Partial</th><th>Gaps</th><th>Compliance</th></tr>
${domainTable}
</table>
</div>

<div class="page-break"></div>
<div class="section">
<h2>Control-by-Control Assessment Record</h2>
<p>Complete record of all 67 controls with assessment status, assessor notes, and remediation recommendations.</p>
${D.map(d=>`
<h3 style="color:${d.color};margin-top:32px">${d.code}: ${d.name}</h3>
<table>
<tr><th style="width:90px">Control</th><th style="width:60px">Level</th><th>Control Requirement</th><th style="width:90px">Status</th></tr>
${d.controls.map(c=>{
const s=answers[c.id];const n=notes[c.id];const sl=statusLabel(s);const sc=statusColor(s);
return `<tr><td><code>${c.id}</code></td><td><span class="badge ${c.level.toLowerCase()}">${c.level}</span></td><td>${c.text}</td><td class="status-${s}">${sl}</td></tr>
${n?`<tr><td colspan="4"><div class="note"><strong>Assessor Note:</strong> ${n}</div></td></tr>`:''}
${s!=='yes'&&c.remediation?`<tr><td colspan="4"><div class="remediation"><strong>Recommended Remediation:</strong> ${c.remediation}</div></td></tr>`:''}`;
}).join('')}
</table>`).join('')}
</div>

${mg.length>0?`
<div class="page-break"></div>
<div class="section">
<h2>Priority Gap Analysis</h2>
<div class="gap-critical">
<h3 style="color:#991b1b;margin-top:0">Critical: MUST Controls Not In Place (${mg.length})</h3>
<p style="font-size:12px;color:#7f1d1d">These controls must be remediated before any maturity level can be claimed.</p>
<table>
<tr><th>Control</th><th>Requirement</th><th>Assessor Note</th><th>Remediation</th></tr>
${mg.map(g=>`<tr><td><code>${g.id}</code></td><td>${g.text}</td><td>${notes[g.id]||'<em>No note</em>'}</td><td>${g.remediation||''}</td></tr>`).join('')}
</table>
</div>
${sg.length>0?`
<div class="gap-significant">
<h3 style="color:#854d0e;margin-top:0">Significant: SHOULD Controls Not In Place (${sg.length})</h3>
<p style="font-size:12px;color:#713f12">Required at Level 3+ or must have documented departure rationale.</p>
<table>
<tr><th>Control</th><th>Requirement</th><th>Assessor Note</th><th>Remediation</th></tr>
${sg.map(g=>`<tr><td><code>${g.id}</code></td><td>${g.text}</td><td>${notes[g.id]||'<em>No note</em>'}</td><td>${g.remediation||''}</td></tr>`).join('')}
</table>
</div>`:''}
</div>`:''}

${ov<3?`
<div class="page-break"></div>
<div class="section">
<h2>Remediation Roadmap to Level 3</h2>
<p>Level 3 (Defined) is the minimum maturity level for external credibility and for organizations making public claims of fair, unbiased, or AI-governed hiring practices.</p>
${ph.map((x,i)=>{
const pg=ag.filter(g=>g.tier<=i+1&&g.level==='MUST');
const ps=i===2?sg:[];
if(!pg.length&&!ps.length)return'';
return`<h3>${x.p} (${x.t})</h3><p style="color:#64748b">${x.d}</p>
<table><tr><th>Control</th><th>Requirement</th><th>Action</th><th>Assessor Note</th></tr>
${pg.map(g=>`<tr><td><code>${g.id}</code></td><td>${g.text}</td><td>${g.remediation||''}</td><td>${notes[g.id]||''}</td></tr>`).join('')}
${ps.map(g=>`<tr><td><code>${g.id}</code></td><td>${g.text}</td><td>${g.remediation||''}</td><td>${notes[g.id]||''}</td></tr>`).join('')}
</table>`;}).join('')}
</div>`:''}

<div class="section">
<h2>Assessment Notes Summary</h2>
<p>All notes entered by the assessor during the assessment.</p>
${(()=>{const noted=allControls.filter(c=>notes[c.id]&&notes[c.id].trim());
if(!noted.length)return'<p style="color:#94a3b8"><em>No notes were entered during this assessment.</em></p>';
return`<table><tr><th>Control</th><th>Domain</th><th>Status</th><th>Note</th></tr>
${noted.map(c=>`<tr><td><code>${c.id}</code></td><td>${c.domainCode}</td><td class="status-${answers[c.id]}">${statusLabel(answers[c.id])}</td><td>${notes[c.id]}</td></tr>`).join('')}
</table>`;})()}
</div>

<div class="footer">
<div>HCCS Maturity Assessment Report | ${user?.org||'Organization'} | ${date}</div>
<div style="margin-top:4px">Generated at hccsstandard.com | HCCS-1.0 | &copy; 2026 Diane Malefyt. All rights reserved.</div>
<div style="margin-top:8px;color:#cbd5e1">This report is generated from a self-assessment. It does not constitute certified compliance. For validated assessment (Level 3+), engage a qualified HCCS™ assessor.</div>
</div>
</body></html>`;
const w=window.open('','_blank');w.document.write(html);w.document.close();}

function Results({answers,notes,user,onRestart}){
const[done,setDone]=useState(false);const[sending,setSending]=useState(false);const[emailErr,setEmailErr]=useState('');const[resent,setResent]=useState(false);
const ds=D.map(d=>({domain:d.code,name:d.name,color:d.color,level:calcLv(answers,d),total:d.controls.length,met:d.controls.filter(c=>answers[c.id]==="yes").length,partial:d.controls.filter(c=>answers[c.id]==="partial").length,gaps:getGaps(answers,d)}));
const ov=Math.min(...ds.map(d=>d.level));const ag=sortG(ds.flatMap(d=>d.gaps));const mg=ag.filter(g=>g.level==="MUST"),sg=ag.filter(g=>g.level==="SHOULD");
const rd=ds.map(d=>({domain:d.domain,level:d.level,fullMark:5}));
const ph=[{p:"Phase 1: Foundation",t:"Months 1-3",d:"Establish basic controls and documentation"},{p:"Phase 2: Operationalize",t:"Months 3-6",d:"Standardize evaluation and decisions"},{p:"Phase 3: Compliance",t:"Months 6-9",d:"Activate SHOULD controls and calibration"}];
return(
<div style={{minHeight:"100vh",background:"#f8fafc",fontFamily:"'IBM Plex Sans',system-ui,sans-serif"}}>
<div style={{maxWidth:860,margin:"0 auto",padding:"48px 24px 80px"}}>
<div style={{textAlign:"center",marginBottom:48}}>
<div style={{letterSpacing:"0.2em",fontSize:12,textTransform:"uppercase",color:"#64748b",marginBottom:12}}>HCCS™ Maturity Assessment Results</div>
<h1 style={{fontSize:36,fontWeight:700,color:"#0f172a",margin:"0 0 8px"}}>Overall Maturity: Level {ov}</h1>
<div style={{display:"inline-block",padding:"6px 20px",borderRadius:20,background:LC[ov]+"15",color:LC[ov],fontWeight:600,fontSize:16,border:`1px solid ${LC[ov]}30`}}>{LN[ov]}</div>
<div style={{fontSize:14,color:"#64748b",marginTop:12}}>Compliance tier: {TL[ov]} | {ov<3?`${3-ov} level${3-ov>1?"s":""} below credibility threshold`:"Meets or exceeds credibility threshold"}</div></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:40}}>
<div style={{background:"#fff",borderRadius:12,border:"1px solid #e2e8f0",padding:24}}>
<h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:600}}>Domain maturity profile</h3>
<ResponsiveContainer width="100%" height={280}>
<RadarChart data={rd} cx="50%" cy="50%" outerRadius="70%"><PolarGrid stroke="#e2e8f0"/><PolarAngleAxis dataKey="domain" tick={{fontSize:12,fill:"#475569"}}/><PolarRadiusAxis angle={90} domain={[0,5]} tick={{fontSize:10,fill:"#94a3b8"}} tickCount={6}/><Radar dataKey="level" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} strokeWidth={2} dot={{r:4,fill:"#2563eb"}}/></RadarChart>
</ResponsiveContainer></div>
<div style={{background:"#fff",borderRadius:12,border:"1px solid #e2e8f0",padding:24}}>
<h3 style={{margin:"0 0 16px",fontSize:16,fontWeight:600}}>Level by domain</h3>
<ResponsiveContainer width="100%" height={280}>
<BarChart data={ds} layout="vertical" margin={{left:10,right:20}}><XAxis type="number" domain={[0,5]} ticks={[0,1,2,3,4,5]} tick={{fontSize:11,fill:"#94a3b8"}}/><YAxis type="category" dataKey="domain" tick={{fontSize:12,fill:"#475569"}} width={30}/><Tooltip formatter={v=>[`Level ${v}: ${LN[v]}`,"Maturity"]} contentStyle={{borderRadius:8,fontSize:13}}/><Bar dataKey="level" radius={[0,4,4,0]} barSize={20}>{ds.map((d,i)=><Cell key={i} fill={d.color}/>)}</Bar></BarChart>
</ResponsiveContainer></div></div>
<h3 style={{fontSize:18,fontWeight:600,marginBottom:16}}>Domain detail</h3>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:40}}>
{ds.map(d=>(<div key={d.domain} style={{background:"#fff",borderRadius:10,border:"1px solid #e2e8f0",padding:20,borderLeft:`4px solid ${d.color}`}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontWeight:600,fontSize:14}}>{d.domain}: {d.name}</span><span style={{fontSize:13,fontWeight:600,color:d.color}}>L{d.level}</span></div><div style={{fontSize:13,color:"#64748b",marginBottom:8}}>{d.met}/{d.total} in place{d.partial>0?`, ${d.partial} partial`:""}</div><div style={{height:6,background:"#f1f5f9",borderRadius:3,overflow:"hidden"}}><div style={{height:6,background:d.color,borderRadius:3,width:`${(d.met/d.total)*100}%`}}/></div></div>))}</div>

{(()=>{const dn=D.flatMap(d=>d.controls.filter(c=>notes[c.id]&&notes[c.id].trim()));if(!dn.length)return null;return(<>
<h3 style={{fontSize:18,fontWeight:600,marginBottom:4}}>Assessment notes</h3>
<p style={{fontSize:14,color:"#64748b",marginBottom:16}}>{dn.length} controls documented</p>
<div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:20,marginBottom:40}}>
{D.map(d=>{const wn=d.controls.filter(c=>notes[c.id]&&notes[c.id].trim());if(!wn.length)return null;return(<div key={d.code} style={{marginBottom:16}}>
<div style={{fontSize:13,fontWeight:600,color:d.color,marginBottom:8}}>{d.code}: {d.name}</div>
{wn.map(c=>{const s=answers[c.id],sc=s==="yes"?"#059669":s==="partial"?"#d97706":"#dc2626",sl=s==="yes"?"In place":s==="partial"?"Partial":"Not in place";
return(<div key={c.id} style={{marginBottom:10,paddingLeft:12,borderLeft:`2px solid ${sc}30`}}>
<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
<span style={{fontFamily:"monospace",fontSize:12,fontWeight:600,color:"#64748b"}}>{c.id}</span>
<span style={{fontSize:11,fontWeight:600,color:sc,padding:"1px 6px",borderRadius:3,background:`${sc}10`}}>{sl}</span></div>
<div style={{fontSize:13,color:"#475569",lineHeight:1.5}}>{notes[c.id]}</div></div>);})}</div>);})}</div></>);})()}

<h3 style={{fontSize:18,fontWeight:600,marginBottom:4}}>Priority gap analysis</h3>
<p style={{fontSize:14,color:"#64748b",marginBottom:16}}>{mg.length} critical (MUST) | {sg.length} significant (SHOULD) | {ag.length} total</p>
{mg.length>0&&<div style={{background:"#fef2f2",border:"1px solid #fecaca",borderRadius:10,padding:20,marginBottom:16}}>
<div style={{fontWeight:600,color:"#991b1b",fontSize:14,marginBottom:10}}>Critical: MUST controls not in place</div>
{mg.map(g=><div key={g.id} style={{fontSize:13,color:"#7f1d1d",marginBottom:g.remediation||notes[g.id]?14:6}}>
<div style={{display:"flex",gap:8}}><span style={{fontFamily:"monospace",fontWeight:600,minWidth:72}}>{g.id}</span><span>{g.text}</span></div>
{g.remediation&&<div style={{marginTop:4,marginLeft:80,padding:"6px 10px",background:"#eff6ff",borderRadius:4,fontSize:12,color:"#1e3a5f",lineHeight:1.5,borderLeft:"2px solid #3b82f6"}}><strong>Remediate: </strong>{g.remediation}</div>}
{notes[g.id]&&<div style={{marginTop:4,marginLeft:80,padding:"6px 10px",background:"#fff5f5",borderRadius:4,fontSize:12,color:"#9b2c2c",lineHeight:1.5,borderLeft:"2px solid #feb2b2"}}><strong>Note: </strong>{notes[g.id]}</div>}
</div>)}</div>}
{sg.length>0&&<div style={{background:"#fefce8",border:"1px solid #fde68a",borderRadius:10,padding:20,marginBottom:16}}>
<div style={{fontWeight:600,color:"#854d0e",fontSize:14,marginBottom:10}}>Significant: SHOULD controls not in place</div>
{sg.slice(0,10).map(g=><div key={g.id} style={{fontSize:13,color:"#713f12",marginBottom:g.remediation||notes[g.id]?14:6}}>
<div style={{display:"flex",gap:8}}><span style={{fontFamily:"monospace",fontWeight:600,minWidth:72}}>{g.id}</span><span>{g.text}</span></div>
{g.remediation&&<div style={{marginTop:4,marginLeft:80,padding:"6px 10px",background:"#eff6ff",borderRadius:4,fontSize:12,color:"#1e3a5f",lineHeight:1.5,borderLeft:"2px solid #3b82f6"}}><strong>Remediate: </strong>{g.remediation}</div>}
{notes[g.id]&&<div style={{marginTop:4,marginLeft:80,padding:"6px 10px",background:"#fefdf0",borderRadius:4,fontSize:12,color:"#92400e",lineHeight:1.5,borderLeft:"2px solid #fde68a"}}><strong>Note: </strong>{notes[g.id]}</div>}
</div>)}{sg.length>10&&<div style={{fontSize:13,color:"#a16207",fontStyle:"italic"}}>+ {sg.length-10} more</div>}</div>}

{ov<3&&<><h3 style={{fontSize:18,fontWeight:600,marginTop:40,marginBottom:16}}>Remediation roadmap to Level 3</h3>
{ph.map((x,i)=>{const pg=ag.filter(g=>g.tier<=i+1&&g.level==="MUST");const ps=i===2?sg:[];if(!pg.length&&!ps.length)return null;return(
<div key={i} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:10,padding:20,marginBottom:12,borderLeft:`4px solid ${["#2563eb","#7c3aed","#059669"][i]}`}}>
<div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span style={{fontWeight:600,fontSize:15}}>{x.p}</span><span style={{fontSize:13,color:"#64748b"}}>{x.t}</span></div>
<div style={{fontSize:13,color:"#64748b",marginBottom:10}}>{x.d}</div>
{pg.map(g=><div key={g.id} style={{fontSize:13,color:"#334155",marginBottom:10,paddingLeft:12,borderLeft:"2px solid #e2e8f0"}}>
<div><span style={{fontFamily:"monospace",fontWeight:600,color:"#64748b"}}>{g.id}</span> {g.text}</div>
{g.remediation&&<div style={{marginTop:3,fontSize:12,color:"#1e3a5f"}}><strong>Action: </strong>{g.remediation}</div>}
{notes[g.id]&&<div style={{marginTop:2,fontSize:12,color:"#64748b",fontStyle:"italic"}}>Note: {notes[g.id]}</div>}</div>)}
{ps.map(g=><div key={g.id} style={{fontSize:13,color:"#334155",marginBottom:10,paddingLeft:12,borderLeft:"2px solid #fde68a"}}>
<div><span style={{fontFamily:"monospace",fontWeight:600,color:"#a16207"}}>{g.id}</span> {g.text}</div>
{g.remediation&&<div style={{marginTop:3,fontSize:12,color:"#1e3a5f"}}><strong>Action: </strong>{g.remediation}</div>}
{notes[g.id]&&<div style={{marginTop:2,fontSize:12,color:"#64748b",fontStyle:"italic"}}>Note: {notes[g.id]}</div>}</div>)}
</div>);})}</>}

<div style={{background:"#0f172a",borderRadius:10,padding:24,marginTop:40,marginBottom:32,textAlign:"center"}}>
<p style={{margin:0,fontSize:16,color:"#94a3b8",fontStyle:"italic",lineHeight:1.6}}>"If the organization cannot reconstruct how a decision was made, what evidence it relied on, and whether standards were applied consistently, the process must be treated as unreliable."</p>
<p style={{margin:"12px 0 0",fontSize:13,color:"#475569"}}>HCCS-1.0, Governing Principle</p></div>

{!done?(<div style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:12,padding:32,textAlign:"center"}}>
<h3 style={{margin:"0 0 8px",fontSize:20,fontWeight:600}}>Your HCCS™ Assessment Report</h3>
<p style={{fontSize:14,color:"#64748b",marginBottom:24}}>Full control-by-control record with your notes, gap analysis, remediation recommendations, and implementation roadmap.</p>
<div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
<button onClick={()=>{genReport(user,ds,ov,answers,notes,mg,sg,ag,ph);}}
style={{padding:"14px 28px",borderRadius:8,border:"1px solid #e2e8f0",background:"#fff",color:"#334155",fontSize:14,fontWeight:600,cursor:"pointer"}}>Open Report in Browser</button>
<button onClick={async()=>{setSending(true);setEmailErr('');try{
const payload={user,domainScores:ds.map(d=>({domain:d.domain,name:d.name,level:d.level,met:d.met,total:d.total,partial:d.partial,gaps:d.gaps.length})),
overallLevel:ov,controls:D.map(d=>({code:d.code,name:d.name,color:d.color,controls:d.controls})),answers,notes,
mustGaps:mg,shouldGaps:sg,allGaps:ag};
const res=await fetch('/.netlify/functions/send-report',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
const result=await res.json();if(res.ok){setDone(true);}else{setEmailErr(result.error||'Failed to send. Try downloading instead.');}}catch(e){setEmailErr('Network error. Try downloading instead.');}finally{setSending(false);}}}
disabled={sending} style={{padding:"14px 28px",borderRadius:8,border:"none",background:sending?"#94a3b8":"#2563eb",color:"#fff",fontSize:14,fontWeight:600,cursor:sending?"default":"pointer"}}>
{sending?"Sending...":"Email Report to Me"}</button>
</div>
{emailErr&&<div style={{fontSize:13,color:"#dc2626",marginTop:12}}>{emailErr}</div>}
{user&&<div style={{fontSize:13,color:"#64748b",marginTop:16}}>Report will be emailed to: <strong>{user.email}</strong></div>}
</div>):(
<div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:12,padding:32,textAlign:"center"}}>
<div style={{fontSize:24,marginBottom:8}}>✓</div>
<h3 style={{margin:"0 0 8px",fontSize:18,fontWeight:600,color:"#166534"}}>Report sent</h3>
<p style={{fontSize:14,color:"#15803d",margin:"0 0 16px"}}>Your full HCCS™ assessment report has been emailed to {user?.email}.</p>
<div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
<button onClick={()=>genReport(user,ds,ov,answers,notes,mg,sg,ag,ph)}
style={{padding:"10px 24px",borderRadius:6,border:"1px solid #e2e8f0",background:"#fff",color:"#475569",fontSize:13,fontWeight:500,cursor:"pointer"}}>Open in browser</button>
<button onClick={async()=>{setSending(true);setEmailErr('');try{
const payload={user,domainScores:ds.map(d=>({domain:d.domain,name:d.name,level:d.level,met:d.met,total:d.total,partial:d.partial,gaps:d.gaps.length})),
overallLevel:ov,controls:D.map(d=>({code:d.code,name:d.name,color:d.color,controls:d.controls})),answers,notes,
mustGaps:mg,shouldGaps:sg,allGaps:ag};
const res=await fetch('/.netlify/functions/send-report',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
const result=await res.json();if(res.ok){setResent(true);setTimeout(()=>setResent(false),3000);}else{setEmailErr(result.error||'Failed to resend.');}}catch(e){setEmailErr('Network error.');}finally{setSending(false);}}}
disabled={sending} style={{padding:"10px 24px",borderRadius:6,border:"none",background:sending?"#94a3b8":"#2563eb",color:"#fff",fontSize:13,fontWeight:500,cursor:sending?"default":"pointer"}}>
{sending?"Sending...":resent?"Sent ✓":"Resend email"}</button>
</div>
{emailErr&&<div style={{fontSize:13,color:"#dc2626",marginTop:8}}>{emailErr}</div>}
</div>)}

<div style={{display:"flex",justifyContent:"space-between",marginTop:48,paddingTop:24,borderTop:"1px solid #e2e8f0"}}>
<span style={{fontSize:12,color:"#94a3b8"}}>HCCS-1.0 | © 2026 Diane Malefyt</span>
<button onClick={onRestart} style={{padding:"8px 20px",borderRadius:6,border:"1px solid #e2e8f0",background:"#fff",color:"#64748b",fontSize:13,cursor:"pointer"}}>Retake assessment</button></div>
</div></div>);}

const FREE_DOMAINS = ['gmail.com','yahoo.com','hotmail.com','outlook.com','aol.com','icloud.com','mail.com','protonmail.com','zoho.com','yandex.com','gmx.com','live.com','msn.com','me.com','inbox.com','fastmail.com','hushmail.com','mailfence.com','tutanota.com','proton.me'];
const ADMIN_EMAILS = ['diane.malefyt@gmail.com'];
const SIZES = ['1-50','51-200','201-500','501-1,000','1,001-5,000','5,001-10,000','10,000+'];

function Gate({onComplete}){
const[f,setF]=useState({name:'',email:'',org:'',title:'',size:'',linkedin:'',website:''});
const[err,setErr]=useState({});
const[sub,setSub]=useState(false);
const loadTime=useRef(Date.now());

const validate=()=>{
const e={};
if(!f.name.trim())e.name='Required';
if(!f.email.trim())e.email='Required';
else{const domain=f.email.split('@')[1]?.toLowerCase();
if(!domain||!domain.includes('.'))e.email='Enter a valid email';
else if(FREE_DOMAINS.includes(domain)&&!ADMIN_EMAILS.includes(f.email.toLowerCase()))e.email='Please use your work email';}
if(!f.org.trim())e.org='Required';
if(!f.title.trim())e.title='Required';
if(!f.size)e.size='Required';
if(f.website)e.bot=true;
if(Date.now()-loadTime.current<3000)e.bot=true;
return e;};

const handle=()=>{
const e=validate();setErr(e);
if(Object.keys(e).length===0){setSub(true);setTimeout(()=>onComplete(f),600);}};

const inp=(key,label,placeholder,type='text')=>(
<div style={{marginBottom:16}}>
<label style={{display:'block',fontSize:13,fontWeight:600,color:'#334155',marginBottom:6}}>{label} <span style={{color:'#dc2626'}}>*</span></label>
<input type={type} value={f[key]} onChange={e=>setF(p=>({...p,[key]:e.target.value}))} placeholder={placeholder}
style={{width:'100%',padding:'10px 14px',borderRadius:8,border:`1px solid ${err[key]?'#fca5a5':'#e2e8f0'}`,fontSize:14,outline:'none',background:'#fff',boxSizing:'border-box',transition:'border-color 0.2s'}}
onFocus={e=>e.target.style.borderColor='#2563eb'} onBlur={e=>e.target.style.borderColor=err[key]?'#fca5a5':'#e2e8f0'}/>
{err[key]&&err[key]!==true&&<div style={{fontSize:12,color:'#dc2626',marginTop:4}}>{err[key]}</div>}
</div>);

return(
<div style={{position:'fixed',inset:0,zIndex:100,display:'flex',alignItems:'center',justifyContent:'center',background:'rgba(10,22,40,0.85)',backdropFilter:'blur(4px)',padding:24}}>
<div style={{background:'#fff',borderRadius:16,maxWidth:520,width:'100%',maxHeight:'90vh',overflow:'auto',padding:'36px 32px',boxShadow:'0 24px 48px rgba(0,0,0,0.2)'}}>
<div style={{textAlign:'center',marginBottom:28}}>
<div style={{fontSize:28,fontWeight:700,color:'#0f172a',marginBottom:8}}>Access the HCCS™ Assessment</div>
<p style={{fontSize:15,color:'#64748b',margin:0,lineHeight:1.5}}>Score your organization across 67 auditable controls. Enter your information to begin.</p>
</div>

{inp('name','Full Name','Jane Smith')}
{inp('email','Work Email','jane@company.com','email')}
{inp('org','Organization','Acme Corp')}
{inp('title','Title / Role','VP People Operations')}

<div style={{marginBottom:16}}>
<label style={{display:'block',fontSize:13,fontWeight:600,color:'#334155',marginBottom:6}}>Company Size <span style={{color:'#dc2626'}}>*</span></label>
<select value={f.size} onChange={e=>setF(p=>({...p,size:e.target.value}))}
style={{width:'100%',padding:'10px 14px',borderRadius:8,border:`1px solid ${err.size?'#fca5a5':'#e2e8f0'}`,fontSize:14,outline:'none',background:'#fff',boxSizing:'border-box',appearance:'auto'}}>
<option value="">Select company size</option>
{SIZES.map(s=><option key={s} value={s}>{s} employees</option>)}
</select>
{err.size&&<div style={{fontSize:12,color:'#dc2626',marginTop:4}}>{err.size}</div>}
</div>

<div style={{marginBottom:24}}>
<label style={{display:'block',fontSize:13,fontWeight:600,color:'#334155',marginBottom:6}}>LinkedIn Profile <span style={{fontSize:12,fontWeight:400,color:'#94a3b8'}}>(optional but recommended)</span></label>
<input type="url" value={f.linkedin} onChange={e=>setF(p=>({...p,linkedin:e.target.value}))} placeholder="https://linkedin.com/in/yourprofile"
style={{width:'100%',padding:'10px 14px',borderRadius:8,border:'1px solid #e2e8f0',fontSize:14,outline:'none',background:'#fff',boxSizing:'border-box'}}/>
</div>

{/* Honeypot - hidden from humans */}
<div style={{position:'absolute',left:'-9999px',height:0,overflow:'hidden'}} aria-hidden="true">
<input type="text" value={f.website} onChange={e=>setF(p=>({...p,website:e.target.value}))} tabIndex={-1} autoComplete="off"/>
</div>

<button onClick={handle} disabled={sub}
style={{width:'100%',padding:'14px',borderRadius:8,border:'none',background:sub?'#059669':'#2563eb',color:'#fff',fontSize:16,fontWeight:600,cursor:sub?'default':'pointer',transition:'background 0.2s'}}>
{sub?'Starting assessment...':'Begin assessment'}</button>

<div style={{textAlign:'center',marginTop:16}}>
<p style={{fontSize:12,color:'#94a3b8',margin:0}}>Your information is used to personalize your assessment report. We do not share your data.</p>
</div>
</div>
</div>);}

// Access codes - add new codes here as needed
const ACCESS_CODES = ['HCCS2026', 'LAUNCH', 'PILOT', 'DIMALEFYT', 'PURCHASED'];

const STRIPE_SELF = 'https://buy.stripe.com/fZu6oI8BXb7herYgNucIE01';
const STRIPE_GUIDED = 'https://buy.stripe.com/9B65kEf0lcbl5Vs9l2cIE00';

function CodeGate({onUnlock}) {
const [code, setCode] = useState('');
const [err, setErr] = useState('');
const [showCode, setShowCode] = useState(false);
return (
<div style={{minHeight:'80vh',background:'linear-gradient(165deg,#0a1628 0%,#1a2d4a 40%,#0f3460 100%)',padding:'60px 24px 80px'}}>
<div style={{maxWidth:900,margin:'0 auto'}}>

{/* Header */}
<div style={{textAlign:'center',marginBottom:48}}>
<div style={{letterSpacing:'0.25em',fontSize:12,textTransform:'uppercase',color:'#5b9bd5',marginBottom:12,fontWeight:500}}>Full HCCS™ Assessment</div>
<h1 style={{fontSize:40,fontWeight:700,color:'#fff',margin:'0 0 12px'}}>67 controls. 7 domains. Your complete maturity score.</h1>
<p style={{fontSize:17,color:'#94a3b8',maxWidth:560,margin:'0 auto',lineHeight:1.6}}>Choose the assessment path that fits your organization. Both include the full 67-control assessment, gap analysis, remediation roadmap, and audit-grade report.</p>
</div>

{/* Pricing cards */}
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24,marginBottom:40}}>

{/* Self-Assessment */}
<div style={{background:'#fff',borderRadius:16,padding:'36px 28px',border:'2px solid #e2e8f0',display:'flex',flexDirection:'column'}}>
<div style={{fontSize:13,fontWeight:600,color:'#2563eb',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>Self-Assessment</div>
<div style={{fontSize:36,fontWeight:700,color:'#0f172a',marginBottom:4}}>$149</div>
<div style={{fontSize:14,color:'#64748b',marginBottom:20}}>One-time payment</div>
<div style={{flex:1}}>
{['Full 67-control assessment across 7 domains','Definition, example, and remediation for every control','Notes capture throughout the assessment','Per-domain maturity scoring (L0-L5)','Priority gap analysis with MUST/SHOULD breakdown','Phased remediation roadmap to Level 3','Downloadable audit-grade report','Email delivery of complete results'].map(t=>
<div key={t} style={{fontSize:14,color:'#475569',marginBottom:10,display:'flex',gap:8,lineHeight:1.5}}>
<span style={{color:'#059669',fontWeight:700,marginTop:1}}>&#10003;</span><span>{t}</span></div>)}
</div>
<div style={{fontSize:13,color:'#64748b',fontStyle:'italic',marginBottom:20}}>Best for: HR leaders, TA managers, People Ops who want to assess and build a remediation plan independently.</div>
<a href={STRIPE_SELF} style={{display:'block',textAlign:'center',background:'#2563eb',color:'#fff',padding:'14px 24px',borderRadius:8,fontSize:15,fontWeight:600,textDecoration:'none'}}>Get started</a>
</div>

{/* Guided Assessment */}
<div style={{background:'#fff',borderRadius:16,padding:'36px 28px',border:'2px solid #2563eb',position:'relative',display:'flex',flexDirection:'column'}}>
<div style={{position:'absolute',top:-12,left:'50%',transform:'translateX(-50%)',background:'#2563eb',color:'#fff',padding:'4px 16px',borderRadius:12,fontSize:12,fontWeight:600}}>Recommended</div>
<div style={{fontSize:13,fontWeight:600,color:'#2563eb',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>Guided Assessment</div>
<div style={{fontSize:36,fontWeight:700,color:'#0f172a',marginBottom:4}}>$2,500</div>
<div style={{fontSize:14,color:'#64748b',marginBottom:20}}>Expert-guided engagement</div>
<div style={{flex:1}}>
{['Everything in Self-Assessment, plus:','Expert-guided walkthrough of all 67 controls','Accurate scoring based on evidence review','Interpreted findings for executive stakeholders','Executive presentation deck of results','Strategic remediation prioritization','30-day follow-up review','Direct access to HCCS author for questions'].map((t,i)=>
<div key={t} style={{fontSize:14,color:i===0?'#0f172a':'#475569',fontWeight:i===0?600:400,marginBottom:10,display:'flex',gap:8,lineHeight:1.5}}>
{i>0&&<span style={{color:'#2563eb',fontWeight:700,marginTop:1}}>&#10003;</span>}<span>{t}</span></div>)}
</div>
<div style={{fontSize:13,color:'#64748b',fontStyle:'italic',marginBottom:20}}>Best for: CHROs, VPs of People, organizations that need validated results for leadership or board reporting.</div>
<a href={STRIPE_GUIDED} style={{display:'block',textAlign:'center',background:'#0f172a',color:'#fff',padding:'14px 24px',borderRadius:8,fontSize:15,fontWeight:600,textDecoration:'none'}}>Book guided assessment</a>
</div>
</div>

{/* Access code section */}
<div style={{textAlign:'center'}}>
{!showCode ? (
<button onClick={()=>setShowCode(true)} style={{background:'none',border:'none',fontSize:14,color:'#5b9bd5',cursor:'pointer',fontWeight:500}}>Already have an access code?</button>
) : (
<div style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,padding:24,maxWidth:400,margin:'0 auto'}}>
<div style={{fontSize:15,fontWeight:600,color:'#fff',marginBottom:12}}>Enter access code</div>
<input type="text" value={code} onChange={e=>{setCode(e.target.value.toUpperCase());setErr('');}} placeholder="YOUR CODE"
style={{width:'100%',padding:'12px 16px',borderRadius:8,border:'1px solid '+(err?'#fca5a5':'rgba(255,255,255,0.2)'),fontSize:16,outline:'none',textAlign:'center',letterSpacing:'0.15em',fontWeight:600,boxSizing:'border-box',textTransform:'uppercase',background:'rgba(255,255,255,0.05)',color:'#fff'}}
onKeyDown={e=>{if(e.key==='Enter'){if(ACCESS_CODES.includes(code.trim().toUpperCase()))onUnlock();else setErr('Invalid code');}}}/>
{err&&<div style={{fontSize:13,color:'#fca5a5',marginTop:8}}>{err}</div>}
<button onClick={()=>{if(ACCESS_CODES.includes(code.trim().toUpperCase()))onUnlock();else setErr('Invalid access code');}}
style={{width:'100%',marginTop:12,padding:'12px',borderRadius:8,border:'1px solid rgba(255,255,255,0.2)',background:'transparent',color:'#fff',fontSize:14,fontWeight:600,cursor:'pointer'}}>Unlock</button>
</div>
)}
</div>

{/* Not ready? */}
<div style={{textAlign:'center',marginTop:32}}>
<p style={{fontSize:14,color:'#64748b'}}>Not ready for the full assessment? <a href="/assess" style={{color:'#5b9bd5',fontWeight:500}}>Take the free quick assessment first</a></p>
</div>

{/* Trust signals */}
<div style={{display:'flex',justifyContent:'center',gap:32,marginTop:40,paddingTop:32,borderTop:'1px solid rgba(255,255,255,0.06)'}}>
{['67 auditable controls','Grounded in 60+ years of research','SOX/NIST/ISO aligned'].map(t=>
<div key={t} style={{fontSize:13,color:'#64748b',display:'flex',alignItems:'center',gap:6}}><span style={{color:'#5b9bd5'}}>&#10003;</span>{t}</div>)}
</div>

</div>
</div>);}


export default function HCCSAssessment(){
const[phase,setPhase]=useState("code");const[answers,setAnswers]=useState({});const[notes,setNotes]=useState({});const[user,setUser]=useState(null);

// Admin test mode: add ?test=1 to URL to skip everything and go straight to results
useEffect(()=>{
const params=new URLSearchParams(window.location.search);
if(params.get('test')==='1'){
const testUser={name:'Diane Malefyt (Test)',email:'diane.malefyt@gmail.com',org:'HCCS™ Test',title:'Admin',size:'1-50',linkedin:'https://www.linkedin.com/in/dianemalefyt/'};
const testAnswers={};const testNotes={};
const options=['yes','partial','no'];
D.forEach(d=>{d.controls.forEach((c,i)=>{
if(c.level==='MUST')testAnswers[c.id]=i%3===0?'partial':'yes';
else if(c.level==='SHOULD')testAnswers[c.id]=options[i%3];
else testAnswers[c.id]=i%2===0?'no':'partial';
if(testAnswers[c.id]!=='yes')testNotes[c.id]='Test note for '+c.id;
});});
setUser(testUser);setAnswers(testAnswers);setNotes(testNotes);setPhase("results");
}
// Allow code in URL: ?code=HCCS2026
const urlCode = params.get('code');
if(urlCode && ACCESS_CODES.includes(urlCode.toUpperCase())) setPhase("landing");
},[]);

if(phase==="code")return<CodeGate onUnlock={()=>setPhase("landing")}/>;
if(phase==="landing")return<Landing onStart={()=>setPhase("gate")}/>;
if(phase==="gate")return<><Landing onStart={()=>{}}/><Gate onComplete={(u)=>{setUser(u);setPhase("assess");}}/></>;
if(phase==="assess")return<Assess onComplete={(a,n)=>{setAnswers(a);setNotes(n);setPhase("results");window.scrollTo(0,0);}}/>;
return<Results answers={answers} notes={notes} user={user} onRestart={()=>{setAnswers({});setNotes({});setPhase("landing");window.scrollTo(0,0);}}/>;
}