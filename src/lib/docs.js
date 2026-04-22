// Documents storage - Airtable backend with static fallback

const STATIC_DOCS = [
  {
    docId: 'HCCS-2.0',
    title: 'Core Standard',
    subtitle: 'HCCS-2.0',
    desc: 'The complete governance and assurance standard. 74 controls across 7 domains, with maturity levels, control classifications (MUST/SHOULD/MAY), and the governing principles that anchor every requirement.',
    details: ['7 governance domains with 74 auditable controls', 'Three-tier classification: MUST (28), SHOULD (27), MAY (19)', '5-level maturity model with Level 3 credibility threshold', 'Governing principles and standard interpretation guidance', 'Control cross-reference matrix', 'Glossary of defined terms'],
    file: '/docs/HCCS-1.0-Core-Standard.pdf',
    color: '#185FA5',
    pages: '~40',
    format: 'pdf',
    sortOrder: 1,
    status: 'published',
  },
  {
    docId: 'HCCS-IG-1.0',
    title: 'Implementation Guide',
    subtitle: 'HCCS-IG-1.0',
    desc: 'The operational companion. Translates every control into implementation requirements, scoring rubrics, audit test procedures (Inspect-Verify-Conclude), worked examples across role types, and control failure classifications.',
    details: ['Domain-by-domain implementation guidance', 'Maturity level progression criteria (L1 to L5)', '5-point anchored behavioral scoring rubric', 'Audit test procedures for every control', 'Worked examples: executive, technical, operational, hourly', 'Cognitive bias mitigation guidance', 'Assessor and auditor qualification criteria', 'Level 3 implementation playbook (12-month phased roadmap)'],
    file: '/docs/HCCS-IG-1.0-Implementation-Guide.pdf',
    color: '#0F6E56',
    pages: '~45',
    format: 'pdf',
    sortOrder: 2,
    status: 'published',
  },
  {
    docId: 'HCCS-T-1.0',
    title: 'Template Library',
    subtitle: 'HCCS-T-1.0',
    desc: '10 fillable templates that produce the evidence required for audit. Every template maps to specific control IDs and threads back through the Implementation Guide to the Core Standard.',
    details: ['T-01: Role Definition Worksheet', 'T-02: Evaluation Criteria Design', 'T-03: Candidate Evaluation Scorecard', 'T-04: Structured Debrief Record', 'T-05: Hiring Decision Rationale', 'T-06: ADT Inventory Entry', 'T-07: ADT Human Review Record', 'T-08: Process Classification Record', 'T-09: Compensable Factor Analysis', 'T-10: Maturity Self-Assessment Instrument'],
    file: '/docs/HCCS-T-1.0-Template-Library.docx',
    color: '#534AB7',
    pages: '~35',
    format: 'docx',
    sortOrder: 3,
    status: 'published',
  },
  {
    docId: 'HCCS-RD-Template',
    title: 'Role Definition Template',
    subtitle: 'Fillable Worksheet',
    desc: 'Blank v2 Role Definition Worksheet. Download, fill out offline (print or digital), then upload to the Role Definition Builder tool to auto-populate all fields. Includes every section with guidance text.',
    details: ['Current state and role origin', 'Outcomes with baselines and targets', 'Steady state vs transformation milestones', 'Decision rights and accountability', 'Role boundaries (what is NOT owned)', 'Required vs learnable capabilities with evidence prompts', 'Team scope and composition', 'Operating environment', 'Risk and failure modes', 'Reviewer validation section'],
    file: '/docs/HCCS-Role-Definition-Template.pdf',
    color: '#993C1D',
    pages: '3',
    format: 'pdf',
    sortOrder: 4,
    status: 'published',
  },
]

let cache = null
let cacheTime = 0
const CACHE_TTL = 60000 // 60 seconds for docs (change less often)

export async function fetchDocs(showAll = false) {
  const now = Date.now()
  if (cache && (now - cacheTime) < CACHE_TTL && !showAll) return cache

  try {
    const url = showAll ? '/.netlify/functions/docs-api?all=true' : '/.netlify/functions/docs-api'
    const res = await fetch(url)
    if (!res.ok) throw new Error(`API returned ${res.status}`)
    const data = await res.json()

    if (data.docs && data.docs.length > 0) {
      if (!showAll) {
        cache = data.docs
        cacheTime = now
      }
      return data.docs
    }

    return STATIC_DOCS.filter(d => showAll || d.status === 'published')
  } catch {
    return STATIC_DOCS.filter(d => showAll || d.status === 'published')
  }
}

export function getStaticDocs() {
  if (cache) return cache
  return STATIC_DOCS.filter(d => d.status === 'published')
}

export function clearDocsCache() { cache = null; cacheTime = 0 }

export async function createDoc(doc, adminKey) {
  clearDocsCache()
  const res = await fetch('/.netlify/functions/docs-api', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey || '' },
    body: JSON.stringify({ action: 'create', doc }),
  })
  return res.json()
}

export async function updateDoc(recordId, doc, adminKey) {
  clearDocsCache()
  const res = await fetch('/.netlify/functions/docs-api', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey || '' },
    body: JSON.stringify({ action: 'update', recordId, doc }),
  })
  return res.json()
}

export async function deleteDocApi(recordId, adminKey) {
  clearDocsCache()
  const res = await fetch('/.netlify/functions/docs-api', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey || '' },
    body: JSON.stringify({ action: 'delete', recordId }),
  })
  return res.json()
}

export { STATIC_DOCS }
