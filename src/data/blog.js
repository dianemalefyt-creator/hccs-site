// Add new blog posts here. Most recent first.
// To add a post: copy the template at the bottom, fill it in, add to top of array.

export const POSTS = [
  {
    slug: 'kistler-eightfold-ag002',
    title: 'How HCCS AG-002 addresses the Eightfold AI fact pattern',
    date: '2026-04-22',
    author: 'Diane Malefyt',
    category: 'Controls',
    readTime: '5 min',
    excerpt: 'The Kistler v. Eightfold AI class action alleges that an AI screening tool made automated adverse decisions without human oversight, disclosure, or dispute rights. HCCS control AG-002 was designed to prevent exactly this pattern.',
    body: `In January 2026, a class action was filed against Eightfold AI alleging that its talent screening platform functions as a consumer reporting agency under the Fair Credit Reporting Act without providing required disclosures, consent procedures, or dispute rights.

The legal theory is still being tested. But the fact pattern it describes is not unusual. It is the default operating model for most AI-assisted hiring tools deployed today.

## The fact pattern

The Kistler complaint describes an AI screening system that scores and ranks candidates, filters them before human review, and produces adverse outcomes (rejections) without the affected individual knowing that AI was involved, what criteria were applied, or how to challenge the result.

Three governance failures are embedded in that description.

## Failure 1: Automated adverse decisions without human oversight

The core allegation is that the AI tool made consequential decisions without meaningful human review. Candidates were screened out by the algorithm before a human ever saw their application.

**HCCS Control AG-002** directly addresses this: "No automated decision tool shall be the sole decision-maker. A human with context, authority, and demonstrated override behavior is required for every consequential output before it takes effect."

The key phrase is "demonstrated override behavior." AG-002 does not merely require a human in the loop. It requires evidence that the human is actually exercising judgment. A 0% override rate over 90 days triggers a review. Batch-approving AI recommendations fails this control. The presence of a human who never overrides is not oversight. It is a rubber stamp.

## Failure 2: Opaque decision logic

The complaint alleges that neither candidates nor employers could explain how the AI tool arrived at its scores. This is the black box problem.

**HCCS Control AG-003** requires that organizations "can explain in plain language how each automated decision tool works: what data goes in, what rules are applied, and what comes out." The standard explicitly states that "vendor proprietary algorithm" fails this control.

If you cannot explain how a tool works in plain language, you cannot govern it. And if you cannot govern it, you cannot defend it.

## Failure 3: No dispute rights or adverse action procedures

FCRA requires that when a consumer report leads to an adverse action, the affected person must be notified and given an opportunity to dispute the findings. The complaint alleges that none of this occurred.

**HCCS Control PI-010** (new in v2.0) requires that "affected parties can challenge consequential decisions through a defined process." The challenge must be reviewed by an independent evaluator, responded to within a defined timeline, and documented.

**HCCS Control DG-006** requires that "rejection decisions include substantive rationale" referencing evaluation criteria. "Not the best fit" or silence both fail this control.

## The governance gap

The Eightfold fact pattern is not exotic. It is what happens when organizations deploy AI tools without governance controls. The tool screens, scores, and filters. Humans approve the outputs without critical engagement. No one documents why specific candidates were rejected. No one monitors for patterns. No one can reconstruct the decision when asked.

HCCS calls this the Accountability Gap. Three conditions define it: criteria documented but not visible in the workflow, decisions made but not reconstructable, and patterns present but not auditable.

## What organizations should do now

Regardless of how Kistler v. Eightfold AI is resolved, the governance requirements it highlights are not going away. The EU AI Act, EEOC guidance, Colorado AI Act, and NYC LL144 all require some combination of human oversight, transparency, bias testing, and audit trails.

Three immediate actions:

1. **Inventory every AI tool** in your decision pipeline (AG-001). If you do not have a complete list, you cannot govern what you do not know about.
2. **Verify human oversight is substantive** (AG-002, AG-012). Check override rates. If any reviewer has a 0% override rate over 90+ days, that is a red flag, not a green light.
3. **Confirm you can reconstruct individual decisions** (AG-006). Pick five candidates rejected by AI tools. Can you explain, specifically, why each was rejected? If not, you have the same exposure the Eightfold complaint describes.

HCCS provides 74 auditable controls across 7 governance domains. The standard was designed to exceed the requirements of every current and pending regulation, including the FCRA theory being tested in Kistler. Organizations that implement these controls are positioned to defend their decision processes regardless of how the litigation landscape evolves.`,
  },
  {
    slug: 'regulatory-pressure-map',
    title: 'The regulatory floor is rising. Here is what is already in effect.',
    date: '2026-04-20',
    author: 'Diane Malefyt',
    category: 'Compliance',
    readTime: '4 min',
    excerpt: 'NYC LL144, EU AI Act, EEOC guidance, Colorado AI Act, Illinois AIVI Act, and active class action litigation. The regulatory landscape for AI-assisted decisions is not emerging. It has arrived.',
    body: `If your organization uses AI, algorithms, or automated tools in any consequential decision process, the regulatory landscape is no longer theoretical. Here is what is already in effect, what is pending, and what it means for governance.

## Already in effect

**NYC Local Law 144 (2023):** Requires annual bias audits for automated employment decision tools (AEDTs) used in hiring or promotion in New York City. Employers must publish audit results and notify candidates. Penalties: $500-$1,500 per violation, per day.

**Illinois AI Video Interview Act (2020):** Requires consent before using AI to analyze video interviews. Employers must explain how AI is used and offer alternatives. Applies to any employer interviewing Illinois residents.

**EEOC AI Guidance (2023):** The EEOC has stated that employers are responsible for disparate impact caused by AI tools, even when those tools are provided by third-party vendors. "The employer is always responsible for the consequences of its use of AI."

**Maryland HB 1202 (2020):** Requires consent before using facial recognition in employment interviews.

**Fair Credit Reporting Act (FCRA, 1970):** Federal law requiring disclosure, consent, and dispute rights when consumer reports are used in employment decisions. The theory being tested in Kistler v. Eightfold AI (2026) is that AI screening tools that score and rank candidates function as consumer reporting agencies under FCRA. If this theory holds, every AI hiring tool operating without FCRA-compliant disclosure, consent, and adverse action procedures is already non-compliant under law that has been in force for 55 years. This is not emerging regulation. It is existing federal law with a private right of action and statutory damages.

## Active litigation

**Kistler v. Eightfold AI (January 2026, active):** Class action alleging that Eightfold AI's talent screening platform functions as a consumer reporting agency under FCRA without providing required disclosures, consent procedures, or dispute rights. The case shifts the legal question from "is the model biased?" to "can the system reconstruct and defend its decisions when subpoenaed?" If the FCRA theory succeeds, the implications extend to every AI screening tool that scores, ranks, or filters candidates without FCRA-compliant procedures.

**Mobley v. Workday (2023, ongoing):** Class action alleging that Workday's AI screening tools discriminate based on race, age, and disability. The case is testing whether AI vendors can be held liable as agents of the employer. If it succeeds, every organization using third-party AI screening is exposed.

## Enacted, taking effect

**EU AI Act (2024, phased implementation through 2026):** Classifies employment as a high-risk AI use case. Requires risk assessments, human oversight, transparency, and record-keeping for AI systems used in hiring, evaluation, and workforce management. Fines up to 3% of global annual revenue.

**Colorado AI Act (SB 24-205, effective 2026):** Requires deployers of high-risk AI systems to implement risk management policies, conduct impact assessments, and notify consumers. Employment decisions are classified as high-risk.

## Pending

**California AB 2930 / SB 7:** Would require impact assessments for automated decision systems, including employment. California's market size makes this de facto national policy if enacted.

**Federal AI legislation:** Multiple bills proposed. No comprehensive federal framework yet, but EEOC enforcement is active and expanding.

## What this means for governance

Every regulation listed above requires some combination of: documented criteria, human oversight verification, bias testing, audit trails, and incident response. No single regulation requires all of these. HCCS\u2122 does.

The FCRA theory in Kistler v. Eightfold AI is particularly significant because it reframes the risk. The question is no longer whether future regulation will require governance. The question is whether you are already non-compliant under existing federal law. Three HCCS\u2122 controls directly address the Eightfold fact pattern: AG-003 (explainability, no black boxes), AG-002 (human oversight for every consequential output), and AG-006 (individual decision reconstruction on demand).

The standard was designed to exceed the requirements of every current and pending regulation. Organizations that implement HCCS\u2122 governance controls are positioned to satisfy FCRA disclosure and dispute requirements, LL144 bias audit requirements, EU AI Act human oversight mandates, EEOC disparate impact documentation, and Colorado risk management obligations simultaneously.

The alternative is waiting for each regulation to take effect and retrofitting compliance one jurisdiction at a time. That is more expensive, more disruptive, and less defensible than implementing governance once.

The regulatory floor is rising. HCCS\u2122 is how you get ahead of it.`,
  },
  {
    slug: 'ai-governance-missing-layer',
    title: 'The missing layer in AI governance: who governs the decisions?',
    date: '2026-04-14',
    author: 'Diane Malefyt',
    category: 'Governance',
    readTime: '4 min',
    excerpt: 'Organizations are racing to govern AI identity, AI data, and AI security. Nobody is governing the decisions those systems produce. That is the layer that matters most.',
    body: `Organizations are racing to govern AI. Identity providers are governing who has access to AI systems. Data platforms are governing what data AI can see. Security vendors are governing whether AI systems are secure. Model risk frameworks are governing whether the AI is accurate.

But the decisions those systems produce? The consequential outcomes that affect real people? Nobody is governing those.

## The governance stack has a gap

Think about it as layers:

**Identity governance** controls who can access AI systems. Okta, Microsoft Entra, and others are building this.

**Data governance** controls what information AI systems can use. Snowflake, OneTrust, and privacy frameworks handle this.

**Security governance** controls whether AI systems are protected from attack. CrowdStrike, Palo Alto, and the cybersecurity industry own this.

**Model governance** controls whether the AI itself is accurate and fair. NIST AI RMF, the EU AI Act, and model risk frameworks address this.

**Decision governance** controls whether the human-in-the-loop is actually governing. This layer does not exist in most organizations.

## Why the decision layer matters most

Every other governance layer assumes that once the AI produces an output, a competent human will evaluate it, exercise judgment, and make an accountable decision. Our research (N=319) found that this assumption is wrong.

Trust in AI is not something you create through design. It is something people bring with them. People who use AI frequently trust it more, regardless of its accuracy. People with emotional proximity to the domain trust it more, regardless of the tool's quality. And giving people more control over the AI does not increase their trust. It changes their behavior without changing their judgment.

## What this means for governance

If a human reviewer approves 100% of AI recommendations without modification, that is not governance. That is a rubber stamp with a name attached. The decision layer requires structured controls, documented evidence, and verified human oversight.

That is what HCCS\u2122 provides. 74 auditable controls across 7 governance domains. The architecture is domain-agnostic. Employment is the first vertical. Healthcare, financial services, criminal justice, education, insurance, and social services are next.

The question was never whether to govern AI. The question is whether to govern the decisions AI produces.`,
  },
  {
    slug: 'nominal-vs-substantive-oversight',
    title: 'Nominal oversight is not governance. Here is how to tell the difference.',
    date: '2026-04-10',
    author: 'Diane Malefyt',
    category: 'AI & Hiring',
    readTime: '4 min',
    excerpt: 'A human clicked approve. Is that governance? If the reviewer approved 100% of AI recommendations in 12 minutes with no documented rationale, the answer is no.',
    body: `Most organizations can say "a human reviewed the AI output." Very few can prove that human actually exercised judgment.

This is the difference between nominal oversight and substantive oversight. It is the difference between compliance theater and actual governance. And it is the difference that courts, regulators, and auditors will increasingly demand organizations demonstrate.

## What nominal oversight looks like

Reviewer A receives 47 AI-generated screening recommendations. Approves all 47 in 12 minutes. No modifications. No documented rationale. Override rate: 0%.

The organization can technically claim "human-in-the-loop." A person saw the output and clicked a button. But did governance occur? No. The AI made the decision. The human provided a signature.

## What substantive oversight looks like

Reviewer B receives 15 AI-generated screening recommendations. Reviews each against the defined criteria. Modifies 3 with documented rationale. Accepts 11 with brief notes explaining agreement. Flags 1 for additional review. Override rate: 20%. Average review time: 8 minutes per recommendation.

Same AI tool. Same recommendations. Completely different governance quality.

## Why this matters now

Our research (N=319, IRB-approved) found that trust in AI is a pre-existing trait, not something created by the interface. People who use AI frequently approach tools with higher baseline confidence. This is algorithm appreciation, not calibrated judgment.

The governance implication: your most experienced AI users may be your highest deference risk. They are the most likely to approve without critical engagement, not because they are negligent, but because accumulated positive experience creates unconscious trust.

## Three controls that address this

**AG-012 (Substantive Oversight):** The organization must demonstrate that human review involves genuine judgment. Minimum review times, required documentation of independent assessment, tracked modification rates.

**AG-013 (Deference Risk Monitoring):** Ongoing monitoring detects when reviewers defer to AI outputs without critical engagement. 0% override rates over 90+ days trigger assessment.

**AG-011 (Trust Profile Assessment):** Before deploying AI in consequential decisions, assess the trust disposition of the people who will use it.

The standard is clear: accountability attaches to the organization that deployed the system, not to the presence of a reviewer.`,
  },
  {
    slug: 'trust-cannot-be-designed',
    title: 'We studied 319 people using an AI tool. Design did not move trust.',
    date: '2026-04-05',
    author: 'Diane Malefyt',
    category: 'Research',
    readTime: '5 min',
    excerpt: 'Three experimental conditions. No significant difference in trust. What predicted trust was not the interface. It was who the person already was.',
    body: `Most AI governance strategies assume a specific causal chain: if you make AI more transparent, more explainable, and give users more control, they will develop appropriate trust. This assumption drives billions of dollars in UX investment, transparency dashboards, and agency-supportive design.

We tested it directly. The result challenges the entire framework.

## The study

319 participants were randomly assigned to one of three conditions in a simulated AI decision scenario:

**Condition 1:** No AI recommendation provided. Participant makes the decision independently.

**Condition 2:** Direct AI recommendation. "The AI recommends X."

**Condition 3:** Agency-supportive AI recommendation. Participant chooses whether to view the AI recommendation.

Trust was measured using a validated 6-item scale with independent trust and distrust subscales.

## The result

The ANOVA was non-significant: F(2, 316) = 0.39, p = .676. The effect size was essentially zero. The way we framed the AI recommendation had no measurable impact on how much people trusted it.

## What did predict trust

**AI usage frequency** was the strongest predictor. Daily AI users scored 12 points higher on trust than people who never use AI. This is algorithm appreciation: familiarity breeds confidence, regardless of whether that confidence is warranted.

**Domain proximity** mattered independently. People with personal connection to the scenario (in this case, dog owners evaluating a veterinary AI) trusted the tool significantly more than those without. Emotional stake drove trust regardless of tool quality.

**Decision confidence** was the strongest predictor in the regression model. People who felt confident in their own judgment trusted the tool more. The AI did not create confidence. It amplified existing confidence.

## The paradox

People who felt they had agency trusted the tool more. But all three groups reported identical levels of felt agency (p = .854). The feeling of agency is something the person brings. It is not something the interface provides.

## The governance implication

If design cannot create warranted trust, then accountability cannot be delegated to design. Organizations that deploy AI in consequential decisions need governance at the decision layer: structured controls, documented evidence, and verified human oversight.

This research directly informed three new controls in the HCCS\u2122 standard: trust profile assessment (AG-011), substantive oversight distinction (AG-012), and deference risk monitoring (AG-013).

The full findings are available at hccsstandard.com/research.`,
  },
  {
    slug: 'why-hiring-needs-governance',
    title: 'Why hiring is the largest ungoverned risk surface in your organization',
    date: '2026-03-25',
    author: 'Diane Malefyt',
    category: 'Governance',
    readTime: '5 min',
    excerpt: 'Every financial decision has SOX. Every data decision has GDPR. Every AI system has the EU AI Act. But the decisions that determine who enters your organization, how they are evaluated, and what they are paid? Nothing.',
    body: `Every financial decision has SOX controls. Every data handling decision has GDPR and CCPA. Every AI system deployment now falls under the EU AI Act. But the decisions that determine who enters your organization, how they are evaluated, and what they are paid operate without equivalent governance.

This is not a minor gap. Human capital decisions are among the most consequential an organization makes. A single bad hire at the executive level costs 3-5x annual salary. A single discrimination claim averages $40,000-$165,000 in settlement costs. An OFCCP audit can exceed $1 million in legal and remediation expenses.

## The problem is structural, not individual

Most organizations treat hiring as a workflow rather than a decision system. Roles are poorly defined. Candidates are filtered through weak proxies like years of experience and company pedigree. Hiring managers apply subjective judgment shaped by cognitive biases they cannot detect in themselves.

And now AI is being layered onto these flawed processes, increasing speed without improving integrity.

The result is a unified decision system that governs who enters the organization, how they are evaluated, how they are selected, and how they are paid, operating without formal governance, auditability, or enforceable controls.

## What governance actually looks like

The HCCS™ Standard defines 74 auditable controls across 7 governance domains. It is not an HR framework. It does not prescribe processes. It governs decision integrity.

That means every role definition specifies outcomes, not tasks. Every evaluation uses pre-defined, criteria-based methods. Every decision is documented with contemporaneous rationale. Every AI tool is inventoried, explainable, and bias-tested. Every compensation decision ties to compensable factors, not negotiation leverage.

## The credibility threshold

Level 3 in the HCCS maturity model requires 48 controls in place. This is the minimum for organizations making public claims about fair, unbiased, or AI-governed hiring practices.

Below Level 3, you may have good intentions. But you do not have governance.

## Start with 10 questions

The [HCCS Quick Assessment](/assess) tests the 10 most critical controls in 3 minutes. It is free, requires no login, and will show you exactly where your organization stands. Most organizations score lower than they expect.`,
  },
  {
    slug: 'ai-does-not-remove-human-responsibility',
    title: 'AI does not remove human responsibility. It increases it.',
    date: '2026-03-25',
    author: 'Diane Malefyt',
    category: 'AI Governance',
    readTime: '4 min',
    excerpt: 'When an AI screening tool rejects a qualified candidate, the organization is accountable for that outcome. "The algorithm decided" is not a defense. It never will be.',
    body: `When an automated screening tool rejects a qualified candidate because it over-weights continuous employment history, who is responsible?

Not the vendor. Not the algorithm. The organization that deployed it.

## The accountability transfer illusion

Many organizations adopt AI hiring tools with an implicit assumption: the tool handles the decision, so the tool bears the responsibility. This is legally, ethically, and practically wrong.

Under NYC Local Law 144, organizations must conduct annual bias audits of automated employment decision tools. Under the EU AI Act, AI systems used in employment are classified as "high-risk" and require documented governance. Under Title VII, disparate impact liability attaches to the employer regardless of whether the discrimination was caused by human judgment or algorithmic filtering.

The tool is your tool. Its outputs are your decisions. Its biases are your liability.

## What AI governance actually requires

The HCCS™ Standard defines 10 controls specifically for AI governance (domain AG). The critical ones:

**AG-001**: Maintain an inventory of every automated decision tool in your hiring pipeline. If you cannot list every tool that touches candidate data, you have already failed the first control.

**AG-002**: No ADT may be the sole decision-maker. Every consequential output requires human review by someone with context and override authority. Batch "approve all" fails this control.

**AG-003**: You must be able to explain, in plain language, how each tool works. What data goes in, what rules are applied, what comes out. "Vendor proprietary algorithm" fails this control.

**AG-004**: Every ADT must be tested for disparate impact before deployment and at regular intervals. The four-fifths rule applies.

## The question you should be asking

Not "Is our AI fair?" That question is unanswerable without testing.

The right question: "Can we explain how every automated tool in our hiring pipeline works, demonstrate that it does not produce disparate impact, and produce an audit trail showing human review of its outputs?"

If the answer is no, the [HCCS Assessment](/assess/full) will tell you exactly where the gaps are and how to close them.`,
  },
  {
    slug: 'structured-vs-unstructured-hiring',
    title: 'The research is settled: structured hiring outperforms intuition. Every time.',
    date: '2026-03-25',
    author: 'Diane Malefyt',
    category: 'Research',
    readTime: '4 min',
    excerpt: 'Six decades of research. Hundreds of meta-analyses. One consistent finding: actuarial methods outperform clinical judgment in personnel selection. The debate is over.',
    body: `In 1954, Paul Meehl published "Clinical vs. Statistical Prediction." His finding: statistical methods consistently outperformed expert clinical judgment in predicting outcomes across dozens of domains, including personnel selection.

Seventy years later, this finding has been replicated hundreds of times. It has never been meaningfully reversed.

## The evidence

**Grove et al. (2000)** conducted a meta-analysis of 136 studies. Actuarial prediction equaled or outperformed clinical prediction in 94% of studies. Not some. Ninety-four percent.

**Kuncel, Klieger, Connelly & Ones (2013)** showed that even simple mechanical combinations of predictors outperform expert holistic judgment. The expert's "gut feel" does not add signal. It adds noise.

**Schmidt & Hunter (1998)** demonstrated that structured interviews have predictive validity of .51, compared to .38 for unstructured interviews. That difference, applied across thousands of hires, represents millions of dollars in outcome quality.

## Why organizations resist

If the evidence is this clear, why do most organizations still rely on unstructured processes?

Three reasons:

1. **Competence assumption**: Decision-makers believe they are good at evaluating people. This belief is not supported by the data.

2. **Process friction**: Structured methods require upfront investment in criteria design, evaluator training, and documentation. Unstructured methods feel faster.

3. **Accountability avoidance**: Documenting decisions creates a record that can be audited. Not documenting them feels safer. It is not.

## What HCCS™ operationalizes

The HCCS Standard does not merely recommend structured methods. It requires them, defines what "structured" means in operational terms, and creates an audit trail proving they were used.

Evaluation Integrity controls (EI-001 through EI-013) operationalize the research: criteria derived from role definitions before any candidate is seen (EI-001), identical methods for every candidate (EI-002), capability-based assessment over proxy-based filtering (EI-003), documented rationale for every score (EI-004), and calibration targeting .70+ inter-rater reliability (EI-006).

This is not best practice advice. It is an enforceable control framework.

Take the [quick assessment](/assess) to see where your evaluation integrity stands.`,
  },
]

// TEMPLATE for new posts:
// {
//   slug: 'your-url-slug',
//   title: 'Your Post Title',
//   date: '2026-MM-DD',
//   author: 'Diane Malefyt',
//   category: 'Category',
//   readTime: 'X min',
//   excerpt: 'One or two sentences shown on the listing page.',
//   body: `Your full post content here.
//
// ## Use markdown-style headers
//
// Paragraphs separated by blank lines.
//
// **Bold text** and [links](/path) work.
// `,
// },
