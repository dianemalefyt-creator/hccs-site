import { useState, useRef } from 'react'

const TEMPLATES = [
  { id: 'T-01', title: 'Role Definition Worksheet', controls: 'RG-001 to RG-007', domain: 'Role Governance', color: '#185FA5',
    desc: 'Complete before any sourcing begins. Defines the role by outcomes, decision rights, scope, and capability requirements.',
    sections: [
      { label: 'Role Information', fields: [
        { key: 'roleTitle', label: 'Role Title', type: 'text' },
        { key: 'department', label: 'Department / Business Unit', type: 'text' },
        { key: 'reportingTo', label: 'Reports To (Name & Title)', type: 'text' },
        { key: 'level', label: 'Career Level (e.g. IC3, M2, Dir)', type: 'text' },
        { key: 'hiringManager', label: 'Hiring Manager', type: 'text' },
        { key: 'definitionDate', label: 'Definition Date', type: 'date' },
      ]},
      { label: 'Business Outcomes (RG-002)', fields: [
        { key: 'outcome1', label: 'Primary outcome this role delivers (measurable)', type: 'textarea' },
        { key: 'outcome2', label: 'Secondary outcome', type: 'textarea' },
        { key: 'outcome3', label: 'Tertiary outcome (if applicable)', type: 'textarea' },
      ]},
      { label: 'Decision Rights & Accountability (RG-004)', fields: [
        { key: 'decidesIndependently', label: 'Decides independently', type: 'textarea', placeholder: 'What decisions does this role make without approval?' },
        { key: 'decidesWithConsultation', label: 'Decides with consultation', type: 'textarea', placeholder: 'What requires input from others before deciding?' },
        { key: 'requiresApproval', label: 'Requires approval', type: 'textarea', placeholder: 'What requires sign-off from above?' },
        { key: 'budgetAuthority', label: 'Budget authority', type: 'text', placeholder: 'e.g. Up to $50K independently' },
      ]},
      { label: 'Required vs. Learnable Capabilities (RG-003)', fields: [
        { key: 'requiredAtHire', label: 'Required at hire (non-negotiable)', type: 'textarea', placeholder: 'Would you reject someone strong on everything else if they lacked this?' },
        { key: 'learnablePostHire', label: 'Learnable post-hire (6-12 months)', type: 'textarea' },
      ]},
      { label: 'Scope Indicators (RG-005)', fields: [
        { key: 'directReports', label: 'Direct reports', type: 'text' },
        { key: 'indirectReports', label: 'Indirect / cross-functional', type: 'text' },
        { key: 'budget', label: 'Budget responsibility', type: 'text' },
        { key: 'geoSpan', label: 'Geographic span', type: 'text' },
        { key: 'stakeholders', label: 'Stakeholder exposure', type: 'text' },
        { key: 'ambiguity', label: 'Ambiguity level (Low/Medium/High)', type: 'text' },
      ]},
      { label: 'Validation (RG-006)', fields: [
        { key: 'validatedBy', label: 'Validated by (name & role)', type: 'text' },
        { key: 'validationDate', label: 'Validation date', type: 'date' },
        { key: 'validationNotes', label: 'Validation notes', type: 'textarea' },
      ]},
    ]},
  { id: 'T-02', title: 'Evaluation Criteria Design', controls: 'EI-001, EI-003, EI-010', domain: 'Evaluation Integrity', color: '#0F6E56',
    desc: 'Derived from the Role Definition before any candidate is evaluated. Locks criteria with timestamp.',
    sections: [
      { label: 'Header', fields: [
        { key: 'roleTitle', label: 'Role Title', type: 'text' },
        { key: 'reqId', label: 'Requisition ID', type: 'text' },
        { key: 'designedBy', label: 'Designed by', type: 'text' },
        { key: 'designDate', label: 'Design date (must predate first screen)', type: 'date' },
      ]},
      { label: 'Criterion 1', fields: [
        { key: 'c1name', label: 'Criterion name', type: 'text', placeholder: 'e.g. System design at scale' },
        { key: 'c1derived', label: 'Derived from role definition (quote the outcome)', type: 'textarea' },
        { key: 'c1method', label: 'Assessment method', type: 'text', placeholder: 'e.g. Live design exercise + behavioral probe' },
        { key: 'c1anchors', label: 'Scoring anchors (1-5)', type: 'textarea', placeholder: '1=No evidence, 3=Meets expectations, 5=Exceptional' },
      ]},
      { label: 'Criterion 2', fields: [
        { key: 'c2name', label: 'Criterion name', type: 'text' },
        { key: 'c2derived', label: 'Derived from role definition', type: 'textarea' },
        { key: 'c2method', label: 'Assessment method', type: 'text' },
        { key: 'c2anchors', label: 'Scoring anchors (1-5)', type: 'textarea' },
      ]},
      { label: 'Criterion 3', fields: [
        { key: 'c3name', label: 'Criterion name', type: 'text' },
        { key: 'c3derived', label: 'Derived from role definition', type: 'textarea' },
        { key: 'c3method', label: 'Assessment method', type: 'text' },
        { key: 'c3anchors', label: 'Scoring anchors (1-5)', type: 'textarea' },
      ]},
      { label: 'Criterion 4', fields: [
        { key: 'c4name', label: 'Criterion name', type: 'text' },
        { key: 'c4derived', label: 'Derived from role definition', type: 'textarea' },
        { key: 'c4method', label: 'Assessment method', type: 'text' },
        { key: 'c4anchors', label: 'Scoring anchors (1-5)', type: 'textarea' },
      ]},
      { label: 'Validity Notes (EI-010)', fields: [
        { key: 'validityBrief', label: 'What evidence supports that these criteria measure what they claim to?', type: 'textarea' },
      ]},
    ]},
  { id: 'T-03', title: 'Candidate Evaluation Scorecard', controls: 'EI-002, EI-004, EI-005', domain: 'Evaluation Integrity', color: '#0F6E56',
    desc: 'Completed per candidate per evaluator. Documents scores, rationale, and evidence for each criterion.',
    sections: [
      { label: 'Candidate & Evaluator', fields: [
        { key: 'candidateName', label: 'Candidate name', type: 'text' },
        { key: 'roleTitle', label: 'Role', type: 'text' },
        { key: 'evaluatorName', label: 'Evaluator name', type: 'text' },
        { key: 'evaluationDate', label: 'Evaluation date', type: 'date' },
        { key: 'interviewType', label: 'Interview type (behavioral, technical, case, etc.)', type: 'text' },
      ]},
      { label: 'Criterion 1', fields: [
        { key: 'sc1name', label: 'Criterion', type: 'text' },
        { key: 'sc1score', label: 'Score (1-5)', type: 'text' },
        { key: 'sc1evidence', label: 'Evidence and rationale (what did the candidate say/do?)', type: 'textarea' },
      ]},
      { label: 'Criterion 2', fields: [
        { key: 'sc2name', label: 'Criterion', type: 'text' },
        { key: 'sc2score', label: 'Score (1-5)', type: 'text' },
        { key: 'sc2evidence', label: 'Evidence and rationale', type: 'textarea' },
      ]},
      { label: 'Criterion 3', fields: [
        { key: 'sc3name', label: 'Criterion', type: 'text' },
        { key: 'sc3score', label: 'Score (1-5)', type: 'text' },
        { key: 'sc3evidence', label: 'Evidence and rationale', type: 'textarea' },
      ]},
      { label: 'Criterion 4', fields: [
        { key: 'sc4name', label: 'Criterion', type: 'text' },
        { key: 'sc4score', label: 'Score (1-5)', type: 'text' },
        { key: 'sc4evidence', label: 'Evidence and rationale', type: 'textarea' },
      ]},
      { label: 'Overall', fields: [
        { key: 'overallRec', label: 'Recommendation (Advance / Do Not Advance / Hold)', type: 'text' },
        { key: 'overallNotes', label: 'Additional observations', type: 'textarea' },
      ]},
    ]},
  { id: 'T-04', title: 'Structured Debrief Record', controls: 'DG-007, DG-009', domain: 'Decision Governance', color: '#534AB7',
    desc: 'Facilitates evidence-first debriefs. Individual scores reviewed before group discussion.',
    sections: [
      { label: 'Debrief Information', fields: [
        { key: 'candidateName', label: 'Candidate name', type: 'text' },
        { key: 'roleTitle', label: 'Role', type: 'text' },
        { key: 'debriefDate', label: 'Debrief date/time', type: 'text' },
        { key: 'facilitator', label: 'Facilitator', type: 'text' },
        { key: 'participants', label: 'Participants (names)', type: 'textarea' },
      ]},
      { label: 'Pre-Debrief Verification', fields: [
        { key: 'scorecardsSubmitted', label: 'All scorecards submitted before debrief? (Yes/No)', type: 'text' },
        { key: 'submissionTime', label: 'Scorecard deadline met?', type: 'text' },
      ]},
      { label: 'Criterion-by-Criterion Review', fields: [
        { key: 'criterion1Review', label: 'Criterion 1: scores across evaluators + discussion notes', type: 'textarea' },
        { key: 'criterion2Review', label: 'Criterion 2: scores + discussion', type: 'textarea' },
        { key: 'criterion3Review', label: 'Criterion 3: scores + discussion', type: 'textarea' },
        { key: 'criterion4Review', label: 'Criterion 4: scores + discussion', type: 'textarea' },
      ]},
      { label: 'Decision', fields: [
        { key: 'groupDecision', label: 'Group recommendation', type: 'text' },
        { key: 'dissent', label: 'Any dissenting views? Document here', type: 'textarea' },
        { key: 'postDecisionFlag', label: 'Any post-decision rationalization flags?', type: 'textarea' },
      ]},
    ]},
  { id: 'T-05', title: 'Hiring Decision Rationale', controls: 'DG-001 to DG-006', domain: 'Decision Governance', color: '#534AB7',
    desc: 'Primary audit artifact. Documents why a candidate was selected, referencing criteria and evidence.',
    sections: [
      { label: 'Decision Information', fields: [
        { key: 'selectedCandidate', label: 'Selected candidate', type: 'text' },
        { key: 'roleTitle', label: 'Role', type: 'text' },
        { key: 'reqId', label: 'Requisition ID', type: 'text' },
        { key: 'decisionMaker', label: 'Decision-maker (name & title)', type: 'text' },
        { key: 'decisionDate', label: 'Decision date', type: 'date' },
      ]},
      { label: 'Selection Rationale (DG-001, DG-002)', fields: [
        { key: 'criteriaRef', label: 'Evaluation criteria referenced (list criteria and scores)', type: 'textarea' },
        { key: 'evidenceSummary', label: 'Evidence summary (specific examples from evaluation)', type: 'textarea' },
        { key: 'comparisonNotes', label: 'How did this candidate compare to other finalists?', type: 'textarea' },
      ]},
      { label: 'Rejection Rationale for Finalists (DG-006)', fields: [
        { key: 'rejected1', label: 'Finalist 2: name + specific unmet criterion', type: 'textarea' },
        { key: 'rejected2', label: 'Finalist 3: name + specific unmet criterion', type: 'textarea' },
      ]},
      { label: 'Governance Checks', fields: [
        { key: 'authorityLevel', label: 'Decision authority per matrix (DG-003)', type: 'text', placeholder: 'e.g. Manager decides for IC roles' },
        { key: 'conflictDisclosure', label: 'Any conflicts of interest disclosed? (DG-004)', type: 'text' },
        { key: 'documentedWithin', label: 'Hours between decision and this documentation', type: 'text' },
      ]},
    ]},
  { id: 'T-06', title: 'ADT Inventory Entry', controls: 'AG-001, AG-003, AG-007', domain: 'AI Governance', color: '#993C1D',
    desc: 'One entry per automated decision tool. Maintains the required inventory with explainability documentation.',
    sections: [
      { label: 'Tool Information', fields: [
        { key: 'toolName', label: 'Tool / system name', type: 'text' },
        { key: 'vendor', label: 'Vendor', type: 'text' },
        { key: 'function', label: 'Function (what does it do in the hiring process?)', type: 'textarea' },
        { key: 'pipelineStage', label: 'Pipeline stage (sourcing, screening, evaluation, offer)', type: 'text' },
        { key: 'deployDate', label: 'Deployment date', type: 'date' },
      ]},
      { label: 'Explainability (AG-003)', fields: [
        { key: 'dataInputs', label: 'What data goes in?', type: 'textarea' },
        { key: 'rulesApplied', label: 'What rules/logic are applied?', type: 'textarea' },
        { key: 'outputProduced', label: 'What comes out? (score, ranking, recommendation, filter)', type: 'textarea' },
      ]},
      { label: 'Accountability (AG-007)', fields: [
        { key: 'owner', label: 'Accountable owner (name, not department)', type: 'text' },
        { key: 'ownerTitle', label: 'Owner title', type: 'text' },
        { key: 'lastReview', label: 'Last review date', type: 'date' },
        { key: 'nextReview', label: 'Next scheduled review', type: 'date' },
      ]},
      { label: 'Impact Testing (AG-004)', fields: [
        { key: 'disparateImpactTested', label: 'Disparate impact tested? (Yes/No/Pending)', type: 'text' },
        { key: 'testDate', label: 'Last test date', type: 'date' },
        { key: 'testResults', label: 'Results summary (pass rates by group, four-fifths rule)', type: 'textarea' },
      ]},
    ]},
  { id: 'T-07', title: 'ADT Human Review Record', controls: 'AG-002, AG-006', domain: 'AI Governance', color: '#993C1D',
    desc: 'Documents human review of automated outputs. Logs overrides and reconstructable decision trails.',
    sections: [
      { label: 'Review Information', fields: [
        { key: 'toolName', label: 'ADT being reviewed', type: 'text' },
        { key: 'reviewerName', label: 'Reviewer name', type: 'text' },
        { key: 'reviewDate', label: 'Review date', type: 'date' },
        { key: 'batchSize', label: 'Batch size reviewed', type: 'text' },
      ]},
      { label: 'Review Results', fields: [
        { key: 'advancesReviewed', label: 'Advances reviewed (count)', type: 'text' },
        { key: 'rejectionsReviewed', label: 'Rejections sampled (count, must be >= 10%)', type: 'text' },
        { key: 'overrides', label: 'Overrides made (count)', type: 'text' },
      ]},
      { label: 'Override Details', fields: [
        { key: 'override1', label: 'Override 1: candidate + original output + reviewer decision + rationale', type: 'textarea' },
        { key: 'override2', label: 'Override 2 (if applicable)', type: 'textarea' },
        { key: 'override3', label: 'Override 3 (if applicable)', type: 'textarea' },
      ]},
      { label: 'Audit Trail (AG-006)', fields: [
        { key: 'reconstructable', label: 'Can you reconstruct why each candidate was advanced/rejected? (Yes/No)', type: 'text' },
        { key: 'auditNotes', label: 'Notes on auditability gaps', type: 'textarea' },
      ]},
    ]},
  { id: 'T-08', title: 'Process Classification Record', controls: 'PI-001, PI-002', domain: 'Process Integrity', color: '#854F0B',
    desc: 'Completed before posting. Classifies whether a process is Open, Internal-Preference, or Restricted.',
    sections: [
      { label: 'Role Information', fields: [
        { key: 'roleTitle', label: 'Role title', type: 'text' },
        { key: 'reqId', label: 'Requisition ID', type: 'text' },
        { key: 'hiringManager', label: 'Hiring manager', type: 'text' },
        { key: 'classificationDate', label: 'Classification date (must predate posting)', type: 'date' },
      ]},
      { label: 'Process Classification', fields: [
        { key: 'classification', label: 'Classification (Open / Internal-Preference / Restricted)', type: 'text' },
      ]},
      { label: 'If Internal-Preference (PI-002)', fields: [
        { key: 'preferredCandidate', label: 'Named internal candidate', type: 'text' },
        { key: 'preferenceRationale', label: 'Rationale for preference', type: 'textarea', placeholder: 'e.g. Promotion from Senior to Lead, 2 years in role, meets all criteria' },
        { key: 'identicalCriteria', label: 'Will external candidates be evaluated on identical criteria? (Yes/No)', type: 'text' },
      ]},
      { label: 'Manager Attestation', fields: [
        { key: 'attestation', label: 'If Open: "I attest no promise has been made to any candidate" (Yes/No)', type: 'text' },
        { key: 'managerSignature', label: 'Manager name (digital signature)', type: 'text' },
        { key: 'attestDate', label: 'Date', type: 'date' },
      ]},
    ]},
  { id: 'T-09', title: 'Compensable Factor Analysis', controls: 'CG-001 to CG-003', domain: 'Compensation Governance', color: '#3B6D11',
    desc: 'Determines compensation from role scope, not title or salary history. Five factors scored 1-5 with rationale.',
    sections: [
      { label: 'Role Information', fields: [
        { key: 'roleTitle', label: 'Role title', type: 'text' },
        { key: 'department', label: 'Department', type: 'text' },
        { key: 'analyst', label: 'Completed by', type: 'text' },
        { key: 'analysisDate', label: 'Analysis date', type: 'date' },
      ]},
      { label: 'Factor 1: Authority (1-5)', fields: [
        { key: 'authorityScore', label: 'Score', type: 'text' },
        { key: 'authorityRationale', label: 'Rationale (decision scope, approval authority, budget)', type: 'textarea' },
      ]},
      { label: 'Factor 2: Complexity (1-5)', fields: [
        { key: 'complexityScore', label: 'Score', type: 'text' },
        { key: 'complexityRationale', label: 'Rationale (ambiguity, cross-functional, technical depth)', type: 'textarea' },
      ]},
      { label: 'Factor 3: Accountability (1-5)', fields: [
        { key: 'accountabilityScore', label: 'Score', type: 'text' },
        { key: 'accountabilityRationale', label: 'Rationale (what breaks if this role fails, regulatory exposure)', type: 'textarea' },
      ]},
      { label: 'Factor 4: Impact (1-5)', fields: [
        { key: 'impactScore', label: 'Score', type: 'text' },
        { key: 'impactRationale', label: 'Rationale (revenue, cost, strategic, organizational scope)', type: 'textarea' },
      ]},
      { label: 'Factor 5: Expertise (1-5)', fields: [
        { key: 'expertiseScore', label: 'Score', type: 'text' },
        { key: 'expertiseRationale', label: 'Rationale (specialization, rarity, depth required)', type: 'textarea' },
      ]},
      { label: 'Compensation Determination (CG-003)', fields: [
        { key: 'factorRange', label: 'Factor-derived range', type: 'text', placeholder: 'e.g. $150,000 - $190,000' },
        { key: 'proposedOffer', label: 'Proposed offer', type: 'text' },
        { key: 'positioning', label: 'Positioning rationale (why this point in range)', type: 'textarea' },
        { key: 'noSalaryHistory', label: 'Confirm: salary history was NOT used (Yes/No)', type: 'text' },
      ]},
    ]},
  { id: 'T-10', title: 'Maturity Self-Assessment Instrument', controls: 'All domains', domain: 'Cross-domain', color: '#993556',
    desc: 'Quick organizational pulse check across all 7 domains. Not a replacement for the full 70-control assessment.',
    sections: [
      { label: 'Organization Information', fields: [
        { key: 'orgName', label: 'Organization', type: 'text' },
        { key: 'assessor', label: 'Assessor name', type: 'text' },
        { key: 'assessDate', label: 'Assessment date', type: 'date' },
      ]},
      ...['Role Governance (RG)', 'Evaluation Integrity (EI)', 'Decision Governance (DG)', 'AI Governance (AG)', 'Process Integrity (PI)', 'Compensation Governance (CG)', 'Evidence & Records (ER)'].map(d => ({
        label: d, fields: [
          { key: d.split(' (')[0].replace(/ /g,'').toLowerCase()+'Level', label: 'Estimated level (0-5)', type: 'text' },
          { key: d.split(' (')[0].replace(/ /g,'').toLowerCase()+'Strengths', label: 'Strengths', type: 'textarea' },
          { key: d.split(' (')[0].replace(/ /g,'').toLowerCase()+'Gaps', label: 'Known gaps', type: 'textarea' },
          { key: d.split(' (')[0].replace(/ /g,'').toLowerCase()+'Priority', label: 'Priority actions', type: 'textarea' },
        ]
      })),
      { label: 'Overall Assessment', fields: [
        { key: 'overallLevel', label: 'Estimated overall maturity (0-5)', type: 'text' },
        { key: 'topPriority', label: 'Top 3 remediation priorities', type: 'textarea' },
        { key: 'timeline', label: 'Target timeline for next level', type: 'text' },
      ]},
    ]},
]

function generatePDF(template, data) {
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${template.id}: ${template.title}</title>
<style>
@media print { body { margin: 0; } }
body { font-family: Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.5; max-width: 800px; margin: 0 auto; padding: 40px; font-size: 13px; }
h1 { font-size: 22px; color: #0f172a; margin: 0 0 4px; }
h2 { font-size: 16px; color: ${template.color}; margin: 28px 0 12px; padding-bottom: 6px; border-bottom: 2px solid ${template.color}20; }
.header { background: linear-gradient(135deg, #0a1628, #1a2d4a); color: #fff; padding: 28px 32px; border-radius: 12px; margin-bottom: 28px; }
.header h1 { color: #fff; font-size: 24px; }
.header .sub { color: #94a3b8; font-size: 13px; margin-top: 4px; }
.header .id { color: #5b9bd5; font-size: 12px; letter-spacing: 0.1em; margin-bottom: 4px; }
.field { margin-bottom: 14px; }
.label { font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.03em; }
.value { padding: 8px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; min-height: 20px; white-space: pre-wrap; font-size: 13px; line-height: 1.6; }
.value:empty::after { content: '—'; color: #cbd5e1; }
.footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; }
.controls { font-size: 11px; color: #64748b; margin-top: 2px; }
</style></head><body>
<div class="header">
<div class="id">${template.id} | HCCS™ Standard</div>
<h1>${template.title}</h1>
<div class="sub">${template.domain} | Controls: ${template.controls}</div>
<div class="sub">Generated: ${date} at ${time}</div>
</div>
${template.sections.map(s => `
<h2>${s.label}</h2>
${s.fields.map(f => `
<div class="field">
<div class="label">${f.label}</div>
<div class="value">${(data[f.key] || '').replace(/</g, '&lt;').replace(/\n/g, '<br>')}</div>
</div>`).join('')}`).join('')}
<div class="footer">
<div>${template.id}: ${template.title} | HCCS™-1.0 | Controls: ${template.controls}</div>
<div style="margin-top:4px">© 2026 IngenuityCo LLC. All rights reserved.</div>
<div style="margin-top:4px;color:#cbd5e1">This document is generated from the HCCS™ Template Library. It should be retained as part of the organization's audit evidence.</div>
</div>
</body></html>`
  const w = window.open('', '_blank')
  w.document.write(html)
  w.document.close()
}

export default function Templates() {
  const [active, setActive] = useState(null)
  const [data, setData] = useState({})
  const formRef = useRef(null)

  const set = (key, val) => setData(p => ({ ...p, [key]: val }))
  const t = active !== null ? TEMPLATES[active] : null

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(165deg, #0a1628, #1a2d4a, #0f3460)', padding: '80px 24px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ letterSpacing: '0.25em', fontSize: 12, textTransform: 'uppercase', color: '#5b9bd5', marginBottom: 16, fontWeight: 500 }}>HCCS™ Template Library</div>
          <h1 className='hero-title' style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '0 0 16px' }}>Fillable audit templates</h1>
          <p style={{ fontSize: 17, color: '#94a3b8', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            10 templates that produce the evidence required for HCCS™ compliance. Fill them in your browser, generate a PDF, keep the record.
          </p>
        </div>
      </section>

      <section style={{ padding: '48px 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Template selector */}
          {t === null ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 14 }}>
              {TEMPLATES.map((tmpl, i) => (
                <div key={tmpl.id} onClick={() => { setActive(i); setData({}); window.scrollTo(0, 0); }}
                  style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: '20px 22px', cursor: 'pointer', borderLeft: `4px solid ${tmpl.color}`, transition: 'all 0.15s' }}
                  onMouseOver={e => e.currentTarget.style.borderColor = tmpl.color}
                  onMouseOut={e => e.currentTarget.style.borderColor = '#e2e8f0'}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: tmpl.color, letterSpacing: '0.05em' }}>{tmpl.id}</span>
                    <span style={{ fontSize: 11, color: '#94a3b8' }}>{tmpl.domain}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>{tmpl.title}</div>
                  <div style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{tmpl.desc}</div>
                  <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 8 }}>Controls: {tmpl.controls}</div>
                </div>
              ))}
            </div>
          ) : (
            <div ref={formRef}>
              {/* Back + header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <button onClick={() => { setActive(null); setData({}); }} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #e2e8f0', background: '#fff', fontSize: 13, cursor: 'pointer', color: '#475569' }}>← All templates</button>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: t.color, letterSpacing: '0.05em' }}>{t.id} | {t.domain}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#0f172a' }}>{t.title}</div>
                </div>
              </div>
              <div style={{ fontSize: 14, color: '#64748b', marginBottom: 8 }}>{t.desc}</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 32 }}>Controls satisfied: {t.controls}</div>

              {/* Form sections */}
              {t.sections.map((sec, si) => (
                <div key={si} style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: t.color, marginBottom: 12, paddingBottom: 6, borderBottom: `2px solid ${t.color}20` }}>{sec.label}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: sec.fields.length <= 2 ? '1fr' : sec.fields.some(f => f.type === 'textarea') ? '1fr' : '1fr 1fr', gap: 12 }}>
                    {sec.fields.map(f => (
                      <div key={f.key} style={{ gridColumn: f.type === 'textarea' ? '1 / -1' : undefined }}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 4 }}>{f.label}</label>
                        {f.type === 'textarea' ? (
                          <textarea value={data[f.key] || ''} onChange={e => set(f.key, e.target.value)}
                            placeholder={f.placeholder || ''}
                            rows={3} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', lineHeight: 1.5 }} />
                        ) : (
                          <input type={f.type || 'text'} value={data[f.key] || ''} onChange={e => set(f.key, e.target.value)}
                            placeholder={f.placeholder || ''}
                            style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Actions */}
              <div style={{ display: 'flex', gap: 12, marginTop: 32, paddingTop: 24, borderTop: '1px solid #e2e8f0' }}>
                <button onClick={() => generatePDF(t, data)}
                  style={{ padding: '14px 28px', borderRadius: 8, border: 'none', background: t.color, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                  Generate PDF
                </button>
                <button onClick={() => { setData({}); window.scrollTo(0, 0); }}
                  style={{ padding: '14px 28px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
                  Clear form
                </button>
                <button onClick={() => { setActive(null); setData({}); window.scrollTo(0, 0); }}
                  style={{ padding: '14px 28px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', color: '#64748b', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
                  Back to all templates
                </button>
              </div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 12 }}>PDF opens in a new tab. Use your browser's Print → Save as PDF to save it. Your data stays in your browser and is not sent anywhere.</div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
