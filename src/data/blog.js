// Add new blog posts here. Most recent first.
// To add a post: copy the template at the bottom, fill it in, add to top of array.

export const POSTS = [
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
