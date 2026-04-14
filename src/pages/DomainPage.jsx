import { Link, useParams } from 'react-router-dom'

const DOMAINS = {
  'employment': {
    name: 'Employment & Workforce',
    status: 'Active',
    color: '#185FA5',
    tagline: 'Where the fracture became impossible to ignore.',
    hero: 'Every hiring decision is a consequential decision. Most organizations govern none of them.',
    intro: 'Employment decisions determine who enters the organization, how they are evaluated, what they are paid, and whether they stay. These decisions directly impact financial performance, legal exposure, operational consistency, and organizational trust. Despite this, most organizations operate without consistent controls, documentation standards, or auditability across their hiring processes.',
    problem: [
      'Role definitions that describe tasks instead of outcomes, making evaluation criteria arbitrary from the start',
      'Unstructured interviews where each evaluator applies different standards to different candidates',
      'AI screening tools deployed without disparate impact testing, explainability standards, or meaningful human override',
      'Hiring decisions documented in Slack messages rather than auditable rationale forms',
      'Compensation set by salary history and title matching rather than structured factor analysis',
      'Human reviewers who approve 100% of AI recommendations without substantive engagement',
    ],
    governance: 'HCCS™ provides the complete governance architecture for employment decisions. 70 auditable controls across 7 domains cover every stage: how roles are defined, how candidates are evaluated, how decisions are made and documented, how AI tools are governed, how processes maintain integrity, how compensation aligns to scope, and how evidence is retained for audit.',
    controls: [
      { id: 'RG', name: 'Role Governance', count: 9, example: 'Role definitions must specify business outcomes, not task lists. Required vs. learnable capabilities must be distinguished.' },
      { id: 'EI', name: 'Evaluation Integrity', count: 13, example: 'Every candidate evaluated with identical criteria. Evaluators calibrated to .70+ inter-rater reliability.' },
      { id: 'DG', name: 'Decision Governance', count: 10, example: 'Selection rationale documented within 24 hours. AI-assisted decisions must specify what the human changed.' },
      { id: 'AG', name: 'AI Governance', count: 13, example: 'Workforce trust profiles assessed before AI deployment. Substantive vs. nominal oversight demonstrated.' },
      { id: 'PI', name: 'Process Integrity', count: 8, example: 'Every externally posted role is genuinely open. Internal-preference processes documented before posting.' },
      { id: 'CG', name: 'Compensation Governance', count: 8, example: 'Pay derived from compensable factor analysis, not salary history or title matching.' },
      { id: 'ER', name: 'Evidence & Records', count: 9, example: 'Records distinguish substantive review from pass-through approval. 3-year minimum retention.' },
    ],
    regulations: ['Title VII of the Civil Rights Act', 'EU AI Act (high-risk classification)', 'NYC Local Law 144 (automated employment decisions)', 'OFCCP compliance requirements', 'EEOC Uniform Guidelines on Employee Selection', 'State-level AI hiring laws (IL, CO, MD, others)'],
    cta: 'Start employment assessment',
    ctaLink: '/assess/employment',
  },
  'healthcare': {
    name: 'Healthcare',
    status: 'Planned',
    color: '#0F6E56',
    tagline: 'When algorithms influence clinical judgment, patients bear the consequences.',
    hero: 'AI is shaping diagnosis, treatment recommendations, and triage decisions. The governance layer does not exist.',
    intro: 'Healthcare AI systems are already influencing clinical decisions: diagnostic imaging analysis, treatment protocol recommendations, triage prioritization, prior authorization determinations, and clinical risk scoring. These systems operate in life-and-death contexts where the consequences of blind trust or nominal oversight are not theoretical.',
    problem: [
      'Clinical decision support tools that recommend treatment pathways without explainable reasoning',
      'Prior authorization algorithms that deny coverage based on opaque criteria, with human reviewers who rarely override',
      'Diagnostic AI that flags or misses conditions with documented racial and demographic disparities',
      'Triage systems that prioritize patients based on algorithmic risk scores without clinician understanding of the model',
      'EHR-embedded recommendations that create de facto protocols without clinical validation',
      'Human reviewers who approve AI-generated clinical recommendations at 98%+ rates without independent assessment',
    ],
    governance: 'The same governance architecture that governs employment decisions applies to healthcare. Role governance becomes clinical role definition. Evaluation integrity becomes diagnostic accuracy. Decision governance becomes treatment decision documentation. AI governance becomes clinical AI oversight with trust profile assessment and deference risk monitoring.',
    controls: [
      { id: 'RG', name: 'Role Governance', count: null, example: 'Clinical decision authority defined by role. Which decisions require independent physician judgment vs. AI-assisted protocol.' },
      { id: 'EI', name: 'Evaluation Integrity', count: null, example: 'Diagnostic accuracy validated against ground truth. Sensitivity and specificity documented by demographic group.' },
      { id: 'DG', name: 'Decision Governance', count: null, example: 'Treatment decisions document what the AI recommended, what the clinician changed, and the clinical rationale.' },
      { id: 'AG', name: 'AI Governance', count: null, example: 'Clinical AI tools inventoried, tested for demographic disparity, and subject to substantive human oversight.' },
    ],
    regulations: ['FDA AI/ML Software as Medical Device (SaMD)', 'HIPAA Privacy and Security', 'CMS Conditions of Participation', '21st Century Cures Act (information blocking)', 'EU AI Act (high-risk: healthcare)', 'State medical practice acts'],
    cta: 'Get notified when healthcare controls launch',
    ctaLink: '/contact',
  },
  'financial-services': {
    name: 'Financial Services',
    status: 'Planned',
    color: '#534AB7',
    tagline: 'Automated decisioning at scale. Human oversight by name only.',
    hero: 'Credit decisions, lending approvals, and fraud determinations are increasingly algorithmic. The human review is often a formality.',
    intro: 'Financial services was among the first industries to deploy algorithmic decision-making at scale. Credit scoring, loan approvals, insurance underwriting, fraud detection, and trading surveillance all rely on models that shape outcomes for individuals and families. Regulatory frameworks require human review, but the research demonstrates that the presence of a reviewer does not guarantee substantive oversight.',
    problem: [
      'Credit decisions made by models with documented demographic bias, reviewed by humans who override less than 1% of the time',
      'Lending algorithms that use proxy variables correlated with protected characteristics',
      'Fraud detection systems with high false-positive rates disproportionately affecting specific communities',
      'Claims adjudication where AI recommends denial and human reviewers approve the denial without independent assessment',
      'Algorithmic trading oversight where compliance officers cannot explain the models they are responsible for monitoring',
      'Fair lending analyses performed annually rather than continuously, missing emerging disparate impact patterns',
    ],
    governance: 'HCCS™ extends the same governance architecture to financial services. Decision governance becomes credit decision documentation. AI governance becomes model risk management with trust profile assessment. Evidence and records becomes the audit trail that regulators and courts will demand.',
    controls: [
      { id: 'DG', name: 'Decision Governance', count: null, example: 'Every adverse credit action documents the model output, human review, and rationale for acceptance or override.' },
      { id: 'AG', name: 'AI Governance', count: null, example: 'Model risk inventory with disparate impact testing. Override rates tracked. Deference behavior flagged.' },
      { id: 'ER', name: 'Evidence & Records', count: null, example: 'Contemporaneous records of every algorithmic decision. Substantive vs. nominal review distinguished.' },
    ],
    regulations: ['Equal Credit Opportunity Act (ECOA)', 'Fair Housing Act', 'Community Reinvestment Act', 'Dodd-Frank Act', 'OCC/Fed Model Risk Management (SR 11-7)', 'EU AI Act (high-risk: creditworthiness)', 'CFPB adverse action requirements'],
    cta: 'Get notified when financial services controls launch',
    ctaLink: '/contact',
  },
  'criminal-justice': {
    name: 'Criminal Justice',
    status: 'Planned',
    color: '#993C1D',
    tagline: 'The highest stakes. The weakest governance.',
    hero: 'Algorithms influence who gets detained, how long they serve, and whether they are released. Accountability is nearly absent.',
    intro: 'Criminal justice represents the most consequential domain for AI-assisted decision-making. Risk assessment instruments influence pretrial detention, sentencing recommendations, parole decisions, and resource allocation for policing. These tools shape liberty itself. The documented disparate impact is significant, and the governance frameworks are almost nonexistent.',
    problem: [
      'Pretrial risk assessment tools with documented racial bias used to determine detention vs. release',
      'Sentencing algorithms that recommend longer sentences for defendants from specific zip codes',
      'Parole decision support systems where board members report not understanding how scores are calculated',
      'Predictive policing models that concentrate surveillance in communities already over-policed',
      'Facial recognition systems with significantly higher error rates for people of color deployed without accuracy standards',
      'Human reviewers who report feeling unable to override algorithmic recommendations due to institutional pressure',
    ],
    governance: 'The governance gap in criminal justice is the most dangerous and the most urgent. HCCS™ provides the framework: every algorithmic tool inventoried, tested for disparate impact, subject to substantive human oversight, and documented with contemporaneous records that distinguish genuine review from rubber-stamping.',
    controls: [
      { id: 'AG', name: 'AI Governance', count: null, example: 'Every risk assessment tool inventoried, tested for disparate impact by race and geography, with documented override authority.' },
      { id: 'DG', name: 'Decision Governance', count: null, example: 'Sentencing and parole decisions document what the algorithm recommended, what the human decided, and why.' },
      { id: 'EI', name: 'Evaluation Integrity', count: null, example: 'Risk instruments validated against actual outcomes. Predictive accuracy documented by demographic group.' },
    ],
    regulations: ['Due Process Clause (5th and 14th Amendments)', 'Equal Protection Clause', 'Title VI of the Civil Rights Act', 'First Step Act', 'State-level algorithmic accountability laws', 'EU AI Act (prohibited/high-risk: law enforcement)'],
    cta: 'Get notified when criminal justice controls launch',
    ctaLink: '/contact',
  },
  'education': {
    name: 'Education',
    status: 'Planned',
    color: '#854F0B',
    tagline: 'Decisions that compound across a lifetime.',
    hero: 'Admissions algorithms, automated grading, and learning pathway recommendations are shaping educational access with minimal oversight.',
    intro: 'Educational decisions have compounding effects. An admissions algorithm that screens out a qualified applicant does not just affect one semester; it redirects a career trajectory. AI is increasingly embedded in admissions scoring, automated essay grading, plagiarism detection, accommodations eligibility, disciplinary recommendations, and adaptive learning pathways. The governance gap is growing faster than the technology.',
    problem: [
      'Admissions algorithms that weight proxy variables (zip code, school district) correlated with race and socioeconomic status',
      'Automated essay grading systems that reward formulaic structure over original thinking',
      'Plagiarism detection tools with documented bias against non-native English speakers',
      'Learning pathway algorithms that track students into remedial programs based on early performance without human review',
      'Accommodations eligibility determined by scoring models without clinician or educator override',
      'Disciplinary recommendation systems that reproduce existing disparities in suspension and expulsion rates',
    ],
    governance: 'The HCCS™ framework applies directly: evaluation integrity for assessment validity, AI governance for algorithmic tool oversight, decision governance for admissions and disciplinary decisions, and evidence and records for the audit trail that accreditors and courts will eventually require.',
    controls: [
      { id: 'EI', name: 'Evaluation Integrity', count: null, example: 'Assessment methods validated for construct validity. Automated grading tested for demographic bias.' },
      { id: 'AG', name: 'AI Governance', count: null, example: 'Every algorithmic tool in the student decision pipeline inventoried, tested, and subject to human override.' },
      { id: 'DG', name: 'Decision Governance', count: null, example: 'Admissions and disciplinary decisions document criteria, evidence, and rationale.' },
    ],
    regulations: ['Title IV (federal financial aid)', 'Title IX', 'FERPA (student records)', 'ADA and Section 504 (accommodations)', 'State anti-discrimination statutes', 'Accreditation standards'],
    cta: 'Get notified when education controls launch',
    ctaLink: '/contact',
  },
  'insurance': {
    name: 'Insurance',
    status: 'Planned',
    color: '#3B6D11',
    tagline: 'Pricing people algorithmically. Governing the decisions manually.',
    hero: 'Coverage determinations, claims decisions, and risk pricing are driven by models. The human in the loop is often a click-through.',
    intro: 'Insurance decisions, who gets coverage, at what price, and whether a claim is paid, are increasingly driven by algorithmic models. Underwriting, claims adjudication, fraud scoring, and pricing optimization all rely on AI systems that evaluate individuals and assign risk classifications. The consequences are financial and deeply personal.',
    problem: [
      'Underwriting models that use proxy variables producing disparate impact on protected classes',
      'Claims adjudication algorithms that recommend denial, with human reviewers who override at rates below 2%',
      'Pricing models that charge higher premiums based on geographic and demographic proxies',
      'Fraud detection systems with high false-positive rates that delay legitimate claims for vulnerable populations',
      'Coverage eligibility algorithms that cannot explain their determinations in plain language',
      'Human reviewers who process 200+ algorithmic recommendations per day, making substantive review impossible',
    ],
    governance: 'HCCS™ provides the missing governance layer: AI tool inventory, disparate impact testing, substantive human oversight requirements, documented decision rationale, and deference risk monitoring for reviewers processing high-volume algorithmic recommendations.',
    controls: [
      { id: 'AG', name: 'AI Governance', count: null, example: 'Every underwriting and claims model inventoried, tested for disparate impact, with documented human override authority.' },
      { id: 'DG', name: 'Decision Governance', count: null, example: 'Adverse coverage and claims decisions document what the model recommended and what the reviewer determined.' },
      { id: 'PI', name: 'Process Integrity', count: null, example: 'Claimants informed when algorithmic tools are used. Appeals process includes human review by someone other than the original reviewer.' },
    ],
    regulations: ['State insurance regulations', 'NAIC Model Laws', 'Fair Credit Reporting Act (when credit data used)', 'ACA non-discrimination provisions', 'State unfair trade practices acts', 'EU AI Act (high-risk: insurance)'],
    cta: 'Get notified when insurance controls launch',
    ctaLink: '/contact',
  },
  'social-services': {
    name: 'Social Services',
    status: 'Planned',
    color: '#993556',
    tagline: 'The most vulnerable populations. The least transparent decisions.',
    hero: 'Benefits eligibility, child welfare risk scoring, and housing allocation are shaped by algorithms with almost no public accountability.',
    intro: 'Social services decisions affect the most vulnerable populations: children in welfare systems, individuals applying for disability benefits, families seeking housing assistance, and people navigating public health infrastructure. Algorithmic tools are deployed to score risk, determine eligibility, allocate resources, and prioritize cases. The governance gap is acute because the affected populations have the least power to challenge opaque decisions.',
    problem: [
      'Child welfare risk scoring models that flag families based on poverty indicators correlated with race',
      'Benefits eligibility algorithms that deny claims without explainable reasoning or meaningful appeal',
      'Housing allocation systems that prioritize applicants based on scoring models with documented demographic disparities',
      'Disability determination algorithms that reject applications at rates significantly above human-only review',
      'Caseworker decision support tools that create de facto mandates because workers feel unable to override',
      'No contemporaneous documentation distinguishing algorithmic recommendation from caseworker judgment',
    ],
    governance: 'HCCS™ provides the accountability framework that public institutions owe to the populations they serve. Every algorithmic tool inventoried. Every consequential decision documented. Every human reviewer held to a standard of substantive engagement, not nominal presence.',
    controls: [
      { id: 'AG', name: 'AI Governance', count: null, example: 'Every risk scoring and eligibility tool inventoried, tested for demographic impact, with caseworker override authority protected.' },
      { id: 'DG', name: 'Decision Governance', count: null, example: 'Eligibility and risk determinations document the algorithmic output, caseworker assessment, and rationale for final decision.' },
      { id: 'ER', name: 'Evidence & Records', count: null, example: 'Records retained for audit. Substantive vs. nominal review distinguished. Appeals documented.' },
    ],
    regulations: ['Due Process (5th and 14th Amendments)', 'ADA and Section 504', 'Title VI (disparate impact in federally funded programs)', 'Social Security Act', 'Child Abuse Prevention and Treatment Act (CAPTA)', 'State administrative procedure acts'],
    cta: 'Get notified when social services controls launch',
    ctaLink: '/contact',
  },
}

export default function DomainPage() {
  const { slug } = useParams()
  const d = DOMAINS[slug]

  if (!d) return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '120px 24px', textAlign: 'center' }}>
      <h1 style={{ fontSize: 32, color: '#0f172a' }}>Domain not found</h1>
      <Link to="/" style={{ color: '#2563eb', fontSize: 16 }}>Return home</Link>
    </div>
  )

  const isActive = d.status === 'Active'

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(165deg, #0a1628 0%, #1a2d4a 40%, #0f3460 100%)', padding: '80px 24px 64px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.color }} />
            <span style={{ letterSpacing: '0.2em', fontSize: 12, textTransform: 'uppercase', color: d.color, fontWeight: 600 }}>{d.name}</span>
            <span style={{ fontSize: 11, padding: '2px 10px', borderRadius: 10, background: isActive ? `${d.color}20` : 'rgba(255,255,255,0.06)', color: isActive ? d.color : '#94a3b8', fontWeight: 600 }}>{d.status}</span>
          </div>
          <h1 className='hero-title' style={{ fontSize: 40, fontWeight: 700, color: '#fff', margin: '0 0 20px', lineHeight: 1.15 }}>
            {d.hero}
          </h1>
          <p style={{ fontSize: 16, color: '#94a3b8', fontStyle: 'italic', margin: '0 0 32px' }}>{d.tagline}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to={d.ctaLink} style={{ background: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              {d.cta}
            </Link>
            <Link to="/documents" style={{ border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '12px 24px', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
              Read the standard
            </Link>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section style={{ padding: '64px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 32 }}>{d.intro}</p>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>What ungovernered looks like</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {d.problem.map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, marginTop: 8, flexShrink: 0 }} />
                <p style={{ fontSize: 15, color: '#334155', lineHeight: 1.6, margin: 0 }}>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section style={{ padding: '64px 24px', background: '#f8fafc' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 16 }}>How HCCS™ governs this domain</h2>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: '#475569', marginBottom: 32 }}>{d.governance}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {d.controls.map(c => (
              <div key={c.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, borderLeft: `4px solid ${d.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: d.color }}>{c.id}</span>
                    <span style={{ fontSize: 15, fontWeight: 600, color: '#0f172a' }}>{c.name}</span>
                  </div>
                  {c.count && <span style={{ fontSize: 12, color: '#94a3b8' }}>{c.count} controls</span>}
                </div>
                <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6, margin: 0 }}>{c.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory landscape */}
      <section style={{ padding: '64px 24px', background: '#0f172a' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Regulatory landscape</h2>
          <p style={{ fontSize: 15, color: '#94a3b8', marginBottom: 24, lineHeight: 1.6 }}>HCCS™ is designed to meet or exceed the requirements of current and emerging regulation in this domain.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {d.regulations.map(r => (
              <span key={r} style={{ fontSize: 13, color: '#cbd5e1', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '8px 16px' }}>{r}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          {!isActive && (
            <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 12, padding: 20, marginBottom: 32 }}>
              <p style={{ fontSize: 15, color: '#854d0e', margin: 0, lineHeight: 1.6 }}>
                <strong>{d.name} controls are in development.</strong> The governance architecture is defined. Domain-specific control language, assessment instruments, and implementation guidance are being developed. Contact us to join the early access program.
              </p>
            </div>
          )}
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
            {isActive ? 'Assess your governance maturity' : `Bring governance to ${d.name.toLowerCase()}`}
          </h2>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={d.ctaLink} style={{ background: '#2563eb', color: '#fff', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
              {d.cta}
            </Link>
            <Link to="/research" style={{ background: '#fff', color: '#0f172a', padding: '14px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid #e2e8f0' }}>
              Read the research
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export { DOMAINS }
