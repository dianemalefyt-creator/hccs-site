// Add new blog posts here. Most recent first.
// To add a post: copy the template at the bottom, fill it in, add to top of array.

export const POSTS = [
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

That is what HCCS\u2122 provides. 70 auditable controls across 7 governance domains. The architecture is domain-agnostic. Employment is the first vertical. Healthcare, financial services, criminal justice, education, insurance, and social services are next.

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

The HCCS™ Standard defines 70 auditable controls across 7 governance domains. It is not an HR framework. It does not prescribe processes. It governs decision integrity.

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
